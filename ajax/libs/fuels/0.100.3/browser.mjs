var Wg = Object.defineProperty;
var Ru = (r) => {
  throw TypeError(r);
};
var Xg = (r, t, e) => t in r ? Wg(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var D = (r, t, e) => Xg(r, typeof t != "symbol" ? t + "" : t, e), ic = (r, t, e) => t.has(r) || Ru("Cannot " + e);
var ut = (r, t, e) => (ic(r, t, "read from private field"), e ? e.call(r) : t.get(r)), Ie = (r, t, e) => t.has(r) ? Ru("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), Ut = (r, t, e, n) => (ic(r, t, "write to private field"), n ? n.call(r, e) : t.set(r, e), e), sn = (r, t, e) => (ic(r, t, "access private method"), e);
function Zg(r, t) {
  for (var e = 0; e < t.length; e++) {
    const n = t[e];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const s in n)
        if (s !== "default" && !(s in r)) {
          const i = Object.getOwnPropertyDescriptor(n, s);
          i && Object.defineProperty(r, s, i.get ? i : {
            enumerable: !0,
            get: () => n[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
var jg = Object.defineProperty, Rr = (r, t) => jg(r, "name", { value: t, configurable: !0 });
function fd() {
  return {
    FUEL_CORE: "0.41.9",
    FORC: "0.67.0",
    FUELS: "0.100.3"
  };
}
Rr(fd, "getBuiltinVersions");
function Qc(r) {
  const [t, e, n] = r.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: e, patch: n };
}
Rr(Qc, "parseVersion");
function Gn(r, t) {
  const e = Qc(r), n = Qc(t), s = e.major - n.major, i = e.minor - n.minor, a = e.patch - n.patch;
  return {
    major: s,
    minor: i,
    patch: a,
    fullVersionDiff: s || i || a
  };
}
Rr(Gn, "versionDiffs");
function Jg(r, t) {
  const { fullVersionDiff: e } = Gn(r, t);
  return e > 0;
}
Rr(Jg, "gt");
function qg(r, t) {
  const { fullVersionDiff: e } = Gn(r, t);
  return e === 0;
}
Rr(qg, "eq");
function $g(r, t) {
  const { fullVersionDiff: e } = Gn(r, t);
  return e >= 0;
}
Rr($g, "gte");
function Y_(r, t) {
  const { major: e } = Gn(r, t);
  return e === 0;
}
Rr(Y_, "majorEq");
function H_(r, t) {
  const { minor: e } = Gn(r, t);
  return e === 0;
}
Rr(H_, "minorEq");
function W_(r, t) {
  const { patch: e } = Gn(r, t);
  return e === 0;
}
Rr(W_, "patchEq");
function X_(r) {
  const { FUEL_CORE: t } = fd();
  return /^\d+\.\d+\.\d+\D+/m.test(r) && console.warn(`You're running against an unreleased fuel-core version: ${r}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: Y_(r, t),
    isMinorSupported: H_(r, t),
    isPatchSupported: W_(r, t)
  };
}
Rr(X_, "checkFuelCoreVersionCompatibility");
var Z_ = fd(), Kg = Object.defineProperty, tw = (r, t) => Kg(r, "name", { value: t, configurable: !0 }), L = /* @__PURE__ */ ((r) => (r.NO_ABIS_FOUND = "no-abis-found", r.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", r.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", r.INVALID_COMPONENT = "invalid-component", r.CONFIGURABLE_NOT_FOUND = "configurable-not-found", r.TYPE_NOT_FOUND = "type-not-found", r.LOG_TYPE_NOT_FOUND = "log-type-not-found", r.TYPE_NOT_SUPPORTED = "type-not-supported", r.INVALID_DECODE_VALUE = "invalid-decode-value", r.JSON_ABI_ERROR = "json-abi-error", r.TYPE_ID_NOT_FOUND = "type-id-not-found", r.BIN_FILE_NOT_FOUND = "bin-file-not-found", r.CODER_NOT_FOUND = "coder-not-found", r.INVALID_DATA = "invalid-data", r.FUNCTION_NOT_FOUND = "function-not-found", r.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", r.TIMEOUT_EXCEEDED = "timeout-exceeded", r.CONFIG_FILE_NOT_FOUND = "config-file-not-found", r.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", r.WORKSPACE_NOT_DETECTED = "workspace-not-detected", r.INVALID_ADDRESS = "invalid-address", r.INVALID_EVM_ADDRESS = "invalid-evm-address", r.INVALID_B256_ADDRESS = "invalid-b256-address", r.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", r.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", r.MISSING_PROVIDER = "missing-provider", r.INVALID_PROVIDER = "invalid-provider", r.CONNECTION_REFUSED = "connection-refused", r.INVALID_URL = "invalid-url", r.UNSUPPORTED_FEATURE = "unsupported-feature", r.INVALID_PUBLIC_KEY = "invalid-public-key", r.WALLET_MANAGER_ERROR = "wallet-manager-error", r.HD_WALLET_ERROR = "hd-wallet-error", r.MISSING_CONNECTOR = "missing-connector", r.PARSE_FAILED = "parse-failed", r.ENCODE_ERROR = "encode-error", r.DECODE_ERROR = "decode-error", r.ENV_DEPENDENCY_MISSING = "env-dependency-missing", r.INVALID_TTL = "invalid-ttl", r.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", r.NOT_IMPLEMENTED = "not-implemented", r.NOT_SUPPORTED = "not-supported", r.CONVERTING_FAILED = "converting-error", r.ELEMENT_NOT_FOUND = "element-not-found", r.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", r.INVALID_REQUEST = "invalid-request", r.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", r.INSUFFICIENT_FUNDS_OR_MAX_COINS = "not-enough-funds-or-max-coins-reached", r.INVALID_CREDENTIALS = "invalid-credentials", r.HASHER_LOCKED = "hasher-locked", r.GAS_PRICE_TOO_LOW = "gas-price-too-low", r.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", r.MAX_FEE_TOO_LOW = "max-fee-too-low", r.TRANSACTION_NOT_FOUND = "transaction-not-found", r.TRANSACTION_FAILED = "transaction-failed", r.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", r.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", r.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", r.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", r.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", r.TRANSACTION_ERROR = "transaction-error", r.INVALID_POLICY_TYPE = "invalid-policy-type", r.DUPLICATED_POLICY = "duplicated-policy", r.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", r.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", r.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", r.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", r.FUNDS_TOO_LOW = "funds-too-low", r.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", r.ASSET_BURN_DETECTED = "asset-burn-detected", r.INVALID_RECEIPT_TYPE = "invalid-receipt-type", r.INVALID_WORD_LIST = "invalid-word-list", r.INVALID_MNEMONIC = "invalid-mnemonic", r.INVALID_ENTROPY = "invalid-entropy", r.INVALID_SEED = "invalid-seed", r.INVALID_CHECKSUM = "invalid-checksum", r.INVALID_PASSWORD = "invalid-password", r.ACCOUNT_REQUIRED = "account-required", r.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", r.ASSET_NOT_FOUND = "asset-not-found", r.NUMBER_TOO_BIG = "number-too-big", r.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", r.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", r.SCRIPT_REVERTED = "script-reverted", r.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", r.STREAM_PARSING_ERROR = "stream-parsing-error", r.NODE_LAUNCH_FAILED = "node-launch-failed", r.UNKNOWN = "unknown", r))(L || {}), mr, v = (mr = class extends Error {
  constructor(e, n, s = {}, i = null) {
    super(n);
    D(this, "VERSIONS", Z_);
    D(this, "metadata");
    D(this, "rawError");
    D(this, "code");
    this.code = e, this.name = "FuelError", this.metadata = s, this.rawError = i;
  }
  static parse(e) {
    const n = e;
    if (n.code === void 0)
      throw new mr(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const s = Object.values(L);
    if (!s.includes(n.code))
      throw new mr(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${s.join(", ")}.`
      );
    return new mr(n.code, n.message);
  }
  toObject() {
    const { code: e, name: n, message: s, metadata: i, VERSIONS: a, rawError: o } = this;
    return { code: e, name: n, message: s, metadata: i, VERSIONS: a, rawError: o };
  }
}, tw(mr, "FuelError"), D(mr, "CODES", L), mr), Su = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function j_(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function ew(r) {
  if (r.__esModule) return r;
  var t = r.default;
  if (typeof t == "function") {
    var e = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(e, n, s.get ? s : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), e;
}
var ba = { exports: {} };
const rw = {}, nw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rw
}, Symbol.toStringTag, { value: "Module" })), sw = /* @__PURE__ */ ew(nw);
var iw = ba.exports, Tu;
function aw() {
  return Tu || (Tu = 1, function(r) {
    (function(t, e) {
      function n(C, u) {
        if (!C) throw new Error(u || "Assertion failed");
      }
      function s(C, u) {
        C.super_ = u;
        var h = function() {
        };
        h.prototype = u.prototype, C.prototype = new h(), C.prototype.constructor = C;
      }
      function i(C, u, h) {
        if (i.isBN(C))
          return C;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, C !== null && ((u === "le" || u === "be") && (h = u, u = 10), this._init(C || 0, u || 10, h || "be"));
      }
      typeof t == "object" ? t.exports = i : e.BN = i, i.BN = i, i.wordSize = 26;
      var a;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? a = window.Buffer : a = sw.Buffer;
      } catch {
      }
      i.isBN = function(u) {
        return u instanceof i ? !0 : u !== null && typeof u == "object" && u.constructor.wordSize === i.wordSize && Array.isArray(u.words);
      }, i.max = function(u, h) {
        return u.cmp(h) > 0 ? u : h;
      }, i.min = function(u, h) {
        return u.cmp(h) < 0 ? u : h;
      }, i.prototype._init = function(u, h, f) {
        if (typeof u == "number")
          return this._initNumber(u, h, f);
        if (typeof u == "object")
          return this._initArray(u, h, f);
        h === "hex" && (h = 16), n(h === (h | 0) && h >= 2 && h <= 36), u = u.toString().replace(/\s+/g, "");
        var m = 0;
        u[0] === "-" && (m++, this.negative = 1), m < u.length && (h === 16 ? this._parseHex(u, m, f) : (this._parseBase(u, h, m), f === "le" && this._initArray(this.toArray(), h, f)));
      }, i.prototype._initNumber = function(u, h, f) {
        u < 0 && (this.negative = 1, u = -u), u < 67108864 ? (this.words = [u & 67108863], this.length = 1) : u < 4503599627370496 ? (this.words = [
          u & 67108863,
          u / 67108864 & 67108863
        ], this.length = 2) : (n(u < 9007199254740992), this.words = [
          u & 67108863,
          u / 67108864 & 67108863,
          1
        ], this.length = 3), f === "le" && this._initArray(this.toArray(), h, f);
      }, i.prototype._initArray = function(u, h, f) {
        if (n(typeof u.length == "number"), u.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(u.length / 3), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var b, B, N = 0;
        if (f === "be")
          for (m = u.length - 1, b = 0; m >= 0; m -= 3)
            B = u[m] | u[m - 1] << 8 | u[m - 2] << 16, this.words[b] |= B << N & 67108863, this.words[b + 1] = B >>> 26 - N & 67108863, N += 24, N >= 26 && (N -= 26, b++);
        else if (f === "le")
          for (m = 0, b = 0; m < u.length; m += 3)
            B = u[m] | u[m + 1] << 8 | u[m + 2] << 16, this.words[b] |= B << N & 67108863, this.words[b + 1] = B >>> 26 - N & 67108863, N += 24, N >= 26 && (N -= 26, b++);
        return this._strip();
      };
      function o(C, u) {
        var h = C.charCodeAt(u);
        if (h >= 48 && h <= 57)
          return h - 48;
        if (h >= 65 && h <= 70)
          return h - 55;
        if (h >= 97 && h <= 102)
          return h - 87;
        n(!1, "Invalid character in " + C);
      }
      function d(C, u, h) {
        var f = o(C, h);
        return h - 1 >= u && (f |= o(C, h - 1) << 4), f;
      }
      i.prototype._parseHex = function(u, h, f) {
        this.length = Math.ceil((u.length - h) / 6), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var b = 0, B = 0, N;
        if (f === "be")
          for (m = u.length - 1; m >= h; m -= 2)
            N = d(u, h, m) << b, this.words[B] |= N & 67108863, b >= 18 ? (b -= 18, B += 1, this.words[B] |= N >>> 26) : b += 8;
        else {
          var I = u.length - h;
          for (m = I % 2 === 0 ? h + 1 : h; m < u.length; m += 2)
            N = d(u, h, m) << b, this.words[B] |= N & 67108863, b >= 18 ? (b -= 18, B += 1, this.words[B] |= N >>> 26) : b += 8;
        }
        this._strip();
      };
      function _(C, u, h, f) {
        for (var m = 0, b = 0, B = Math.min(C.length, h), N = u; N < B; N++) {
          var I = C.charCodeAt(N) - 48;
          m *= f, I >= 49 ? b = I - 49 + 10 : I >= 17 ? b = I - 17 + 10 : b = I, n(I >= 0 && b < f, "Invalid character"), m += b;
        }
        return m;
      }
      i.prototype._parseBase = function(u, h, f) {
        this.words = [0], this.length = 1;
        for (var m = 0, b = 1; b <= 67108863; b *= h)
          m++;
        m--, b = b / h | 0;
        for (var B = u.length - f, N = B % m, I = Math.min(B, B - N) + f, p = 0, E = f; E < I; E += m)
          p = _(u, E, E + m, h), this.imuln(b), this.words[0] + p < 67108864 ? this.words[0] += p : this._iaddn(p);
        if (N !== 0) {
          var tt = 1;
          for (p = _(u, E, u.length, h), E = 0; E < N; E++)
            tt *= h;
          this.imuln(tt), this.words[0] + p < 67108864 ? this.words[0] += p : this._iaddn(p);
        }
        this._strip();
      }, i.prototype.copy = function(u) {
        u.words = new Array(this.length);
        for (var h = 0; h < this.length; h++)
          u.words[h] = this.words[h];
        u.length = this.length, u.negative = this.negative, u.red = this.red;
      };
      function A(C, u) {
        C.words = u.words, C.length = u.length, C.negative = u.negative, C.red = u.red;
      }
      if (i.prototype._move = function(u) {
        A(u, this);
      }, i.prototype.clone = function() {
        var u = new i(null);
        return this.copy(u), u;
      }, i.prototype._expand = function(u) {
        for (; this.length < u; )
          this.words[this.length++] = 0;
        return this;
      }, i.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, i.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          i.prototype[Symbol.for("nodejs.util.inspect.custom")] = g;
        } catch {
          i.prototype.inspect = g;
        }
      else
        i.prototype.inspect = g;
      function g() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var y = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], S = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], O = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      i.prototype.toString = function(u, h) {
        u = u || 10, h = h | 0 || 1;
        var f;
        if (u === 16 || u === "hex") {
          f = "";
          for (var m = 0, b = 0, B = 0; B < this.length; B++) {
            var N = this.words[B], I = ((N << m | b) & 16777215).toString(16);
            b = N >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, B--), b !== 0 || B !== this.length - 1 ? f = y[6 - I.length] + I + f : f = I + f;
          }
          for (b !== 0 && (f = b.toString(16) + f); f.length % h !== 0; )
            f = "0" + f;
          return this.negative !== 0 && (f = "-" + f), f;
        }
        if (u === (u | 0) && u >= 2 && u <= 36) {
          var p = S[u], E = O[u];
          f = "";
          var tt = this.clone();
          for (tt.negative = 0; !tt.isZero(); ) {
            var et = tt.modrn(E).toString(u);
            tt = tt.idivn(E), tt.isZero() ? f = et + f : f = y[p - et.length] + et + f;
          }
          for (this.isZero() && (f = "0" + f); f.length % h !== 0; )
            f = "0" + f;
          return this.negative !== 0 && (f = "-" + f), f;
        }
        n(!1, "Base should be between 2 and 36");
      }, i.prototype.toNumber = function() {
        var u = this.words[0];
        return this.length === 2 ? u += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? u += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -u : u;
      }, i.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, a && (i.prototype.toBuffer = function(u, h) {
        return this.toArrayLike(a, u, h);
      }), i.prototype.toArray = function(u, h) {
        return this.toArrayLike(Array, u, h);
      };
      var R = function(u, h) {
        return u.allocUnsafe ? u.allocUnsafe(h) : new u(h);
      };
      i.prototype.toArrayLike = function(u, h, f) {
        this._strip();
        var m = this.byteLength(), b = f || Math.max(1, m);
        n(m <= b, "byte array longer than desired length"), n(b > 0, "Requested array length <= 0");
        var B = R(u, b), N = h === "le" ? "LE" : "BE";
        return this["_toArrayLike" + N](B, m), B;
      }, i.prototype._toArrayLikeLE = function(u, h) {
        for (var f = 0, m = 0, b = 0, B = 0; b < this.length; b++) {
          var N = this.words[b] << B | m;
          u[f++] = N & 255, f < u.length && (u[f++] = N >> 8 & 255), f < u.length && (u[f++] = N >> 16 & 255), B === 6 ? (f < u.length && (u[f++] = N >> 24 & 255), m = 0, B = 0) : (m = N >>> 24, B += 2);
        }
        if (f < u.length)
          for (u[f++] = m; f < u.length; )
            u[f++] = 0;
      }, i.prototype._toArrayLikeBE = function(u, h) {
        for (var f = u.length - 1, m = 0, b = 0, B = 0; b < this.length; b++) {
          var N = this.words[b] << B | m;
          u[f--] = N & 255, f >= 0 && (u[f--] = N >> 8 & 255), f >= 0 && (u[f--] = N >> 16 & 255), B === 6 ? (f >= 0 && (u[f--] = N >> 24 & 255), m = 0, B = 0) : (m = N >>> 24, B += 2);
        }
        if (f >= 0)
          for (u[f--] = m; f >= 0; )
            u[f--] = 0;
      }, Math.clz32 ? i.prototype._countBits = function(u) {
        return 32 - Math.clz32(u);
      } : i.prototype._countBits = function(u) {
        var h = u, f = 0;
        return h >= 4096 && (f += 13, h >>>= 13), h >= 64 && (f += 7, h >>>= 7), h >= 8 && (f += 4, h >>>= 4), h >= 2 && (f += 2, h >>>= 2), f + h;
      }, i.prototype._zeroBits = function(u) {
        if (u === 0) return 26;
        var h = u, f = 0;
        return h & 8191 || (f += 13, h >>>= 13), h & 127 || (f += 7, h >>>= 7), h & 15 || (f += 4, h >>>= 4), h & 3 || (f += 2, h >>>= 2), h & 1 || f++, f;
      }, i.prototype.bitLength = function() {
        var u = this.words[this.length - 1], h = this._countBits(u);
        return (this.length - 1) * 26 + h;
      };
      function F(C) {
        for (var u = new Array(C.bitLength()), h = 0; h < u.length; h++) {
          var f = h / 26 | 0, m = h % 26;
          u[h] = C.words[f] >>> m & 1;
        }
        return u;
      }
      i.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var u = 0, h = 0; h < this.length; h++) {
          var f = this._zeroBits(this.words[h]);
          if (u += f, f !== 26) break;
        }
        return u;
      }, i.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, i.prototype.toTwos = function(u) {
        return this.negative !== 0 ? this.abs().inotn(u).iaddn(1) : this.clone();
      }, i.prototype.fromTwos = function(u) {
        return this.testn(u - 1) ? this.notn(u).iaddn(1).ineg() : this.clone();
      }, i.prototype.isNeg = function() {
        return this.negative !== 0;
      }, i.prototype.neg = function() {
        return this.clone().ineg();
      }, i.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, i.prototype.iuor = function(u) {
        for (; this.length < u.length; )
          this.words[this.length++] = 0;
        for (var h = 0; h < u.length; h++)
          this.words[h] = this.words[h] | u.words[h];
        return this._strip();
      }, i.prototype.ior = function(u) {
        return n((this.negative | u.negative) === 0), this.iuor(u);
      }, i.prototype.or = function(u) {
        return this.length > u.length ? this.clone().ior(u) : u.clone().ior(this);
      }, i.prototype.uor = function(u) {
        return this.length > u.length ? this.clone().iuor(u) : u.clone().iuor(this);
      }, i.prototype.iuand = function(u) {
        var h;
        this.length > u.length ? h = u : h = this;
        for (var f = 0; f < h.length; f++)
          this.words[f] = this.words[f] & u.words[f];
        return this.length = h.length, this._strip();
      }, i.prototype.iand = function(u) {
        return n((this.negative | u.negative) === 0), this.iuand(u);
      }, i.prototype.and = function(u) {
        return this.length > u.length ? this.clone().iand(u) : u.clone().iand(this);
      }, i.prototype.uand = function(u) {
        return this.length > u.length ? this.clone().iuand(u) : u.clone().iuand(this);
      }, i.prototype.iuxor = function(u) {
        var h, f;
        this.length > u.length ? (h = this, f = u) : (h = u, f = this);
        for (var m = 0; m < f.length; m++)
          this.words[m] = h.words[m] ^ f.words[m];
        if (this !== h)
          for (; m < h.length; m++)
            this.words[m] = h.words[m];
        return this.length = h.length, this._strip();
      }, i.prototype.ixor = function(u) {
        return n((this.negative | u.negative) === 0), this.iuxor(u);
      }, i.prototype.xor = function(u) {
        return this.length > u.length ? this.clone().ixor(u) : u.clone().ixor(this);
      }, i.prototype.uxor = function(u) {
        return this.length > u.length ? this.clone().iuxor(u) : u.clone().iuxor(this);
      }, i.prototype.inotn = function(u) {
        n(typeof u == "number" && u >= 0);
        var h = Math.ceil(u / 26) | 0, f = u % 26;
        this._expand(h), f > 0 && h--;
        for (var m = 0; m < h; m++)
          this.words[m] = ~this.words[m] & 67108863;
        return f > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - f), this._strip();
      }, i.prototype.notn = function(u) {
        return this.clone().inotn(u);
      }, i.prototype.setn = function(u, h) {
        n(typeof u == "number" && u >= 0);
        var f = u / 26 | 0, m = u % 26;
        return this._expand(f + 1), h ? this.words[f] = this.words[f] | 1 << m : this.words[f] = this.words[f] & ~(1 << m), this._strip();
      }, i.prototype.iadd = function(u) {
        var h;
        if (this.negative !== 0 && u.negative === 0)
          return this.negative = 0, h = this.isub(u), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && u.negative !== 0)
          return u.negative = 0, h = this.isub(u), u.negative = 1, h._normSign();
        var f, m;
        this.length > u.length ? (f = this, m = u) : (f = u, m = this);
        for (var b = 0, B = 0; B < m.length; B++)
          h = (f.words[B] | 0) + (m.words[B] | 0) + b, this.words[B] = h & 67108863, b = h >>> 26;
        for (; b !== 0 && B < f.length; B++)
          h = (f.words[B] | 0) + b, this.words[B] = h & 67108863, b = h >>> 26;
        if (this.length = f.length, b !== 0)
          this.words[this.length] = b, this.length++;
        else if (f !== this)
          for (; B < f.length; B++)
            this.words[B] = f.words[B];
        return this;
      }, i.prototype.add = function(u) {
        var h;
        return u.negative !== 0 && this.negative === 0 ? (u.negative = 0, h = this.sub(u), u.negative ^= 1, h) : u.negative === 0 && this.negative !== 0 ? (this.negative = 0, h = u.sub(this), this.negative = 1, h) : this.length > u.length ? this.clone().iadd(u) : u.clone().iadd(this);
      }, i.prototype.isub = function(u) {
        if (u.negative !== 0) {
          u.negative = 0;
          var h = this.iadd(u);
          return u.negative = 1, h._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(u), this.negative = 1, this._normSign();
        var f = this.cmp(u);
        if (f === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var m, b;
        f > 0 ? (m = this, b = u) : (m = u, b = this);
        for (var B = 0, N = 0; N < b.length; N++)
          h = (m.words[N] | 0) - (b.words[N] | 0) + B, B = h >> 26, this.words[N] = h & 67108863;
        for (; B !== 0 && N < m.length; N++)
          h = (m.words[N] | 0) + B, B = h >> 26, this.words[N] = h & 67108863;
        if (B === 0 && N < m.length && m !== this)
          for (; N < m.length; N++)
            this.words[N] = m.words[N];
        return this.length = Math.max(this.length, N), m !== this && (this.negative = 1), this._strip();
      }, i.prototype.sub = function(u) {
        return this.clone().isub(u);
      };
      function z(C, u, h) {
        h.negative = u.negative ^ C.negative;
        var f = C.length + u.length | 0;
        h.length = f, f = f - 1 | 0;
        var m = C.words[0] | 0, b = u.words[0] | 0, B = m * b, N = B & 67108863, I = B / 67108864 | 0;
        h.words[0] = N;
        for (var p = 1; p < f; p++) {
          for (var E = I >>> 26, tt = I & 67108863, et = Math.min(p, u.length - 1), nt = Math.max(0, p - C.length + 1); nt <= et; nt++) {
            var Ft = p - nt | 0;
            m = C.words[Ft] | 0, b = u.words[nt] | 0, B = m * b + tt, E += B / 67108864 | 0, tt = B & 67108863;
          }
          h.words[p] = tt | 0, I = E | 0;
        }
        return I !== 0 ? h.words[p] = I | 0 : h.length--, h._strip();
      }
      var H = function(u, h, f) {
        var m = u.words, b = h.words, B = f.words, N = 0, I, p, E, tt = m[0] | 0, et = tt & 8191, nt = tt >>> 13, Ft = m[1] | 0, pt = Ft & 8191, Et = Ft >>> 13, tr = m[2] | 0, vt = tr & 8191, Ct = tr >>> 13, De = m[3] | 0, St = De & 8191, Qt = De >>> 13, lu = m[4] | 0, Vt = lu & 8191, Yt = lu >>> 13, _u = m[5] | 0, Ht = _u & 8191, Wt = _u >>> 13, pu = m[6] | 0, Xt = pu & 8191, Zt = pu >>> 13, fu = m[7] | 0, jt = fu & 8191, Jt = fu >>> 13, Au = m[8] | 0, qt = Au & 8191, $t = Au >>> 13, gu = m[9] | 0, Kt = gu & 8191, te = gu >>> 13, wu = b[0] | 0, ee = wu & 8191, re = wu >>> 13, mu = b[1] | 0, ne = mu & 8191, se = mu >>> 13, yu = b[2] | 0, ie = yu & 8191, ae = yu >>> 13, bu = b[3] | 0, oe = bu & 8191, ce = bu >>> 13, Iu = b[4] | 0, de = Iu & 8191, ue = Iu >>> 13, Eu = b[5] | 0, he = Eu & 8191, le = Eu >>> 13, Cu = b[6] | 0, _e = Cu & 8191, pe = Cu >>> 13, vu = b[7] | 0, fe = vu & 8191, Ae = vu >>> 13, Bu = b[8] | 0, ge = Bu & 8191, we = Bu >>> 13, xu = b[9] | 0, me = xu & 8191, ye = xu >>> 13;
        f.negative = u.negative ^ h.negative, f.length = 19, I = Math.imul(et, ee), p = Math.imul(et, re), p = p + Math.imul(nt, ee) | 0, E = Math.imul(nt, re);
        var Uo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Uo >>> 26) | 0, Uo &= 67108863, I = Math.imul(pt, ee), p = Math.imul(pt, re), p = p + Math.imul(Et, ee) | 0, E = Math.imul(Et, re), I = I + Math.imul(et, ne) | 0, p = p + Math.imul(et, se) | 0, p = p + Math.imul(nt, ne) | 0, E = E + Math.imul(nt, se) | 0;
        var zo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (zo >>> 26) | 0, zo &= 67108863, I = Math.imul(vt, ee), p = Math.imul(vt, re), p = p + Math.imul(Ct, ee) | 0, E = Math.imul(Ct, re), I = I + Math.imul(pt, ne) | 0, p = p + Math.imul(pt, se) | 0, p = p + Math.imul(Et, ne) | 0, E = E + Math.imul(Et, se) | 0, I = I + Math.imul(et, ie) | 0, p = p + Math.imul(et, ae) | 0, p = p + Math.imul(nt, ie) | 0, E = E + Math.imul(nt, ae) | 0;
        var Go = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Go >>> 26) | 0, Go &= 67108863, I = Math.imul(St, ee), p = Math.imul(St, re), p = p + Math.imul(Qt, ee) | 0, E = Math.imul(Qt, re), I = I + Math.imul(vt, ne) | 0, p = p + Math.imul(vt, se) | 0, p = p + Math.imul(Ct, ne) | 0, E = E + Math.imul(Ct, se) | 0, I = I + Math.imul(pt, ie) | 0, p = p + Math.imul(pt, ae) | 0, p = p + Math.imul(Et, ie) | 0, E = E + Math.imul(Et, ae) | 0, I = I + Math.imul(et, oe) | 0, p = p + Math.imul(et, ce) | 0, p = p + Math.imul(nt, oe) | 0, E = E + Math.imul(nt, ce) | 0;
        var Vo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Vo >>> 26) | 0, Vo &= 67108863, I = Math.imul(Vt, ee), p = Math.imul(Vt, re), p = p + Math.imul(Yt, ee) | 0, E = Math.imul(Yt, re), I = I + Math.imul(St, ne) | 0, p = p + Math.imul(St, se) | 0, p = p + Math.imul(Qt, ne) | 0, E = E + Math.imul(Qt, se) | 0, I = I + Math.imul(vt, ie) | 0, p = p + Math.imul(vt, ae) | 0, p = p + Math.imul(Ct, ie) | 0, E = E + Math.imul(Ct, ae) | 0, I = I + Math.imul(pt, oe) | 0, p = p + Math.imul(pt, ce) | 0, p = p + Math.imul(Et, oe) | 0, E = E + Math.imul(Et, ce) | 0, I = I + Math.imul(et, de) | 0, p = p + Math.imul(et, ue) | 0, p = p + Math.imul(nt, de) | 0, E = E + Math.imul(nt, ue) | 0;
        var Yo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Yo >>> 26) | 0, Yo &= 67108863, I = Math.imul(Ht, ee), p = Math.imul(Ht, re), p = p + Math.imul(Wt, ee) | 0, E = Math.imul(Wt, re), I = I + Math.imul(Vt, ne) | 0, p = p + Math.imul(Vt, se) | 0, p = p + Math.imul(Yt, ne) | 0, E = E + Math.imul(Yt, se) | 0, I = I + Math.imul(St, ie) | 0, p = p + Math.imul(St, ae) | 0, p = p + Math.imul(Qt, ie) | 0, E = E + Math.imul(Qt, ae) | 0, I = I + Math.imul(vt, oe) | 0, p = p + Math.imul(vt, ce) | 0, p = p + Math.imul(Ct, oe) | 0, E = E + Math.imul(Ct, ce) | 0, I = I + Math.imul(pt, de) | 0, p = p + Math.imul(pt, ue) | 0, p = p + Math.imul(Et, de) | 0, E = E + Math.imul(Et, ue) | 0, I = I + Math.imul(et, he) | 0, p = p + Math.imul(et, le) | 0, p = p + Math.imul(nt, he) | 0, E = E + Math.imul(nt, le) | 0;
        var Ho = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Ho >>> 26) | 0, Ho &= 67108863, I = Math.imul(Xt, ee), p = Math.imul(Xt, re), p = p + Math.imul(Zt, ee) | 0, E = Math.imul(Zt, re), I = I + Math.imul(Ht, ne) | 0, p = p + Math.imul(Ht, se) | 0, p = p + Math.imul(Wt, ne) | 0, E = E + Math.imul(Wt, se) | 0, I = I + Math.imul(Vt, ie) | 0, p = p + Math.imul(Vt, ae) | 0, p = p + Math.imul(Yt, ie) | 0, E = E + Math.imul(Yt, ae) | 0, I = I + Math.imul(St, oe) | 0, p = p + Math.imul(St, ce) | 0, p = p + Math.imul(Qt, oe) | 0, E = E + Math.imul(Qt, ce) | 0, I = I + Math.imul(vt, de) | 0, p = p + Math.imul(vt, ue) | 0, p = p + Math.imul(Ct, de) | 0, E = E + Math.imul(Ct, ue) | 0, I = I + Math.imul(pt, he) | 0, p = p + Math.imul(pt, le) | 0, p = p + Math.imul(Et, he) | 0, E = E + Math.imul(Et, le) | 0, I = I + Math.imul(et, _e) | 0, p = p + Math.imul(et, pe) | 0, p = p + Math.imul(nt, _e) | 0, E = E + Math.imul(nt, pe) | 0;
        var Wo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Wo >>> 26) | 0, Wo &= 67108863, I = Math.imul(jt, ee), p = Math.imul(jt, re), p = p + Math.imul(Jt, ee) | 0, E = Math.imul(Jt, re), I = I + Math.imul(Xt, ne) | 0, p = p + Math.imul(Xt, se) | 0, p = p + Math.imul(Zt, ne) | 0, E = E + Math.imul(Zt, se) | 0, I = I + Math.imul(Ht, ie) | 0, p = p + Math.imul(Ht, ae) | 0, p = p + Math.imul(Wt, ie) | 0, E = E + Math.imul(Wt, ae) | 0, I = I + Math.imul(Vt, oe) | 0, p = p + Math.imul(Vt, ce) | 0, p = p + Math.imul(Yt, oe) | 0, E = E + Math.imul(Yt, ce) | 0, I = I + Math.imul(St, de) | 0, p = p + Math.imul(St, ue) | 0, p = p + Math.imul(Qt, de) | 0, E = E + Math.imul(Qt, ue) | 0, I = I + Math.imul(vt, he) | 0, p = p + Math.imul(vt, le) | 0, p = p + Math.imul(Ct, he) | 0, E = E + Math.imul(Ct, le) | 0, I = I + Math.imul(pt, _e) | 0, p = p + Math.imul(pt, pe) | 0, p = p + Math.imul(Et, _e) | 0, E = E + Math.imul(Et, pe) | 0, I = I + Math.imul(et, fe) | 0, p = p + Math.imul(et, Ae) | 0, p = p + Math.imul(nt, fe) | 0, E = E + Math.imul(nt, Ae) | 0;
        var Xo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Xo >>> 26) | 0, Xo &= 67108863, I = Math.imul(qt, ee), p = Math.imul(qt, re), p = p + Math.imul($t, ee) | 0, E = Math.imul($t, re), I = I + Math.imul(jt, ne) | 0, p = p + Math.imul(jt, se) | 0, p = p + Math.imul(Jt, ne) | 0, E = E + Math.imul(Jt, se) | 0, I = I + Math.imul(Xt, ie) | 0, p = p + Math.imul(Xt, ae) | 0, p = p + Math.imul(Zt, ie) | 0, E = E + Math.imul(Zt, ae) | 0, I = I + Math.imul(Ht, oe) | 0, p = p + Math.imul(Ht, ce) | 0, p = p + Math.imul(Wt, oe) | 0, E = E + Math.imul(Wt, ce) | 0, I = I + Math.imul(Vt, de) | 0, p = p + Math.imul(Vt, ue) | 0, p = p + Math.imul(Yt, de) | 0, E = E + Math.imul(Yt, ue) | 0, I = I + Math.imul(St, he) | 0, p = p + Math.imul(St, le) | 0, p = p + Math.imul(Qt, he) | 0, E = E + Math.imul(Qt, le) | 0, I = I + Math.imul(vt, _e) | 0, p = p + Math.imul(vt, pe) | 0, p = p + Math.imul(Ct, _e) | 0, E = E + Math.imul(Ct, pe) | 0, I = I + Math.imul(pt, fe) | 0, p = p + Math.imul(pt, Ae) | 0, p = p + Math.imul(Et, fe) | 0, E = E + Math.imul(Et, Ae) | 0, I = I + Math.imul(et, ge) | 0, p = p + Math.imul(et, we) | 0, p = p + Math.imul(nt, ge) | 0, E = E + Math.imul(nt, we) | 0;
        var Zo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Zo >>> 26) | 0, Zo &= 67108863, I = Math.imul(Kt, ee), p = Math.imul(Kt, re), p = p + Math.imul(te, ee) | 0, E = Math.imul(te, re), I = I + Math.imul(qt, ne) | 0, p = p + Math.imul(qt, se) | 0, p = p + Math.imul($t, ne) | 0, E = E + Math.imul($t, se) | 0, I = I + Math.imul(jt, ie) | 0, p = p + Math.imul(jt, ae) | 0, p = p + Math.imul(Jt, ie) | 0, E = E + Math.imul(Jt, ae) | 0, I = I + Math.imul(Xt, oe) | 0, p = p + Math.imul(Xt, ce) | 0, p = p + Math.imul(Zt, oe) | 0, E = E + Math.imul(Zt, ce) | 0, I = I + Math.imul(Ht, de) | 0, p = p + Math.imul(Ht, ue) | 0, p = p + Math.imul(Wt, de) | 0, E = E + Math.imul(Wt, ue) | 0, I = I + Math.imul(Vt, he) | 0, p = p + Math.imul(Vt, le) | 0, p = p + Math.imul(Yt, he) | 0, E = E + Math.imul(Yt, le) | 0, I = I + Math.imul(St, _e) | 0, p = p + Math.imul(St, pe) | 0, p = p + Math.imul(Qt, _e) | 0, E = E + Math.imul(Qt, pe) | 0, I = I + Math.imul(vt, fe) | 0, p = p + Math.imul(vt, Ae) | 0, p = p + Math.imul(Ct, fe) | 0, E = E + Math.imul(Ct, Ae) | 0, I = I + Math.imul(pt, ge) | 0, p = p + Math.imul(pt, we) | 0, p = p + Math.imul(Et, ge) | 0, E = E + Math.imul(Et, we) | 0, I = I + Math.imul(et, me) | 0, p = p + Math.imul(et, ye) | 0, p = p + Math.imul(nt, me) | 0, E = E + Math.imul(nt, ye) | 0;
        var jo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (jo >>> 26) | 0, jo &= 67108863, I = Math.imul(Kt, ne), p = Math.imul(Kt, se), p = p + Math.imul(te, ne) | 0, E = Math.imul(te, se), I = I + Math.imul(qt, ie) | 0, p = p + Math.imul(qt, ae) | 0, p = p + Math.imul($t, ie) | 0, E = E + Math.imul($t, ae) | 0, I = I + Math.imul(jt, oe) | 0, p = p + Math.imul(jt, ce) | 0, p = p + Math.imul(Jt, oe) | 0, E = E + Math.imul(Jt, ce) | 0, I = I + Math.imul(Xt, de) | 0, p = p + Math.imul(Xt, ue) | 0, p = p + Math.imul(Zt, de) | 0, E = E + Math.imul(Zt, ue) | 0, I = I + Math.imul(Ht, he) | 0, p = p + Math.imul(Ht, le) | 0, p = p + Math.imul(Wt, he) | 0, E = E + Math.imul(Wt, le) | 0, I = I + Math.imul(Vt, _e) | 0, p = p + Math.imul(Vt, pe) | 0, p = p + Math.imul(Yt, _e) | 0, E = E + Math.imul(Yt, pe) | 0, I = I + Math.imul(St, fe) | 0, p = p + Math.imul(St, Ae) | 0, p = p + Math.imul(Qt, fe) | 0, E = E + Math.imul(Qt, Ae) | 0, I = I + Math.imul(vt, ge) | 0, p = p + Math.imul(vt, we) | 0, p = p + Math.imul(Ct, ge) | 0, E = E + Math.imul(Ct, we) | 0, I = I + Math.imul(pt, me) | 0, p = p + Math.imul(pt, ye) | 0, p = p + Math.imul(Et, me) | 0, E = E + Math.imul(Et, ye) | 0;
        var Jo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Jo >>> 26) | 0, Jo &= 67108863, I = Math.imul(Kt, ie), p = Math.imul(Kt, ae), p = p + Math.imul(te, ie) | 0, E = Math.imul(te, ae), I = I + Math.imul(qt, oe) | 0, p = p + Math.imul(qt, ce) | 0, p = p + Math.imul($t, oe) | 0, E = E + Math.imul($t, ce) | 0, I = I + Math.imul(jt, de) | 0, p = p + Math.imul(jt, ue) | 0, p = p + Math.imul(Jt, de) | 0, E = E + Math.imul(Jt, ue) | 0, I = I + Math.imul(Xt, he) | 0, p = p + Math.imul(Xt, le) | 0, p = p + Math.imul(Zt, he) | 0, E = E + Math.imul(Zt, le) | 0, I = I + Math.imul(Ht, _e) | 0, p = p + Math.imul(Ht, pe) | 0, p = p + Math.imul(Wt, _e) | 0, E = E + Math.imul(Wt, pe) | 0, I = I + Math.imul(Vt, fe) | 0, p = p + Math.imul(Vt, Ae) | 0, p = p + Math.imul(Yt, fe) | 0, E = E + Math.imul(Yt, Ae) | 0, I = I + Math.imul(St, ge) | 0, p = p + Math.imul(St, we) | 0, p = p + Math.imul(Qt, ge) | 0, E = E + Math.imul(Qt, we) | 0, I = I + Math.imul(vt, me) | 0, p = p + Math.imul(vt, ye) | 0, p = p + Math.imul(Ct, me) | 0, E = E + Math.imul(Ct, ye) | 0;
        var qo = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (qo >>> 26) | 0, qo &= 67108863, I = Math.imul(Kt, oe), p = Math.imul(Kt, ce), p = p + Math.imul(te, oe) | 0, E = Math.imul(te, ce), I = I + Math.imul(qt, de) | 0, p = p + Math.imul(qt, ue) | 0, p = p + Math.imul($t, de) | 0, E = E + Math.imul($t, ue) | 0, I = I + Math.imul(jt, he) | 0, p = p + Math.imul(jt, le) | 0, p = p + Math.imul(Jt, he) | 0, E = E + Math.imul(Jt, le) | 0, I = I + Math.imul(Xt, _e) | 0, p = p + Math.imul(Xt, pe) | 0, p = p + Math.imul(Zt, _e) | 0, E = E + Math.imul(Zt, pe) | 0, I = I + Math.imul(Ht, fe) | 0, p = p + Math.imul(Ht, Ae) | 0, p = p + Math.imul(Wt, fe) | 0, E = E + Math.imul(Wt, Ae) | 0, I = I + Math.imul(Vt, ge) | 0, p = p + Math.imul(Vt, we) | 0, p = p + Math.imul(Yt, ge) | 0, E = E + Math.imul(Yt, we) | 0, I = I + Math.imul(St, me) | 0, p = p + Math.imul(St, ye) | 0, p = p + Math.imul(Qt, me) | 0, E = E + Math.imul(Qt, ye) | 0;
        var $o = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + ($o >>> 26) | 0, $o &= 67108863, I = Math.imul(Kt, de), p = Math.imul(Kt, ue), p = p + Math.imul(te, de) | 0, E = Math.imul(te, ue), I = I + Math.imul(qt, he) | 0, p = p + Math.imul(qt, le) | 0, p = p + Math.imul($t, he) | 0, E = E + Math.imul($t, le) | 0, I = I + Math.imul(jt, _e) | 0, p = p + Math.imul(jt, pe) | 0, p = p + Math.imul(Jt, _e) | 0, E = E + Math.imul(Jt, pe) | 0, I = I + Math.imul(Xt, fe) | 0, p = p + Math.imul(Xt, Ae) | 0, p = p + Math.imul(Zt, fe) | 0, E = E + Math.imul(Zt, Ae) | 0, I = I + Math.imul(Ht, ge) | 0, p = p + Math.imul(Ht, we) | 0, p = p + Math.imul(Wt, ge) | 0, E = E + Math.imul(Wt, we) | 0, I = I + Math.imul(Vt, me) | 0, p = p + Math.imul(Vt, ye) | 0, p = p + Math.imul(Yt, me) | 0, E = E + Math.imul(Yt, ye) | 0;
        var Ko = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (Ko >>> 26) | 0, Ko &= 67108863, I = Math.imul(Kt, he), p = Math.imul(Kt, le), p = p + Math.imul(te, he) | 0, E = Math.imul(te, le), I = I + Math.imul(qt, _e) | 0, p = p + Math.imul(qt, pe) | 0, p = p + Math.imul($t, _e) | 0, E = E + Math.imul($t, pe) | 0, I = I + Math.imul(jt, fe) | 0, p = p + Math.imul(jt, Ae) | 0, p = p + Math.imul(Jt, fe) | 0, E = E + Math.imul(Jt, Ae) | 0, I = I + Math.imul(Xt, ge) | 0, p = p + Math.imul(Xt, we) | 0, p = p + Math.imul(Zt, ge) | 0, E = E + Math.imul(Zt, we) | 0, I = I + Math.imul(Ht, me) | 0, p = p + Math.imul(Ht, ye) | 0, p = p + Math.imul(Wt, me) | 0, E = E + Math.imul(Wt, ye) | 0;
        var tc = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (tc >>> 26) | 0, tc &= 67108863, I = Math.imul(Kt, _e), p = Math.imul(Kt, pe), p = p + Math.imul(te, _e) | 0, E = Math.imul(te, pe), I = I + Math.imul(qt, fe) | 0, p = p + Math.imul(qt, Ae) | 0, p = p + Math.imul($t, fe) | 0, E = E + Math.imul($t, Ae) | 0, I = I + Math.imul(jt, ge) | 0, p = p + Math.imul(jt, we) | 0, p = p + Math.imul(Jt, ge) | 0, E = E + Math.imul(Jt, we) | 0, I = I + Math.imul(Xt, me) | 0, p = p + Math.imul(Xt, ye) | 0, p = p + Math.imul(Zt, me) | 0, E = E + Math.imul(Zt, ye) | 0;
        var ec = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (ec >>> 26) | 0, ec &= 67108863, I = Math.imul(Kt, fe), p = Math.imul(Kt, Ae), p = p + Math.imul(te, fe) | 0, E = Math.imul(te, Ae), I = I + Math.imul(qt, ge) | 0, p = p + Math.imul(qt, we) | 0, p = p + Math.imul($t, ge) | 0, E = E + Math.imul($t, we) | 0, I = I + Math.imul(jt, me) | 0, p = p + Math.imul(jt, ye) | 0, p = p + Math.imul(Jt, me) | 0, E = E + Math.imul(Jt, ye) | 0;
        var rc = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (rc >>> 26) | 0, rc &= 67108863, I = Math.imul(Kt, ge), p = Math.imul(Kt, we), p = p + Math.imul(te, ge) | 0, E = Math.imul(te, we), I = I + Math.imul(qt, me) | 0, p = p + Math.imul(qt, ye) | 0, p = p + Math.imul($t, me) | 0, E = E + Math.imul($t, ye) | 0;
        var nc = (N + I | 0) + ((p & 8191) << 13) | 0;
        N = (E + (p >>> 13) | 0) + (nc >>> 26) | 0, nc &= 67108863, I = Math.imul(Kt, me), p = Math.imul(Kt, ye), p = p + Math.imul(te, me) | 0, E = Math.imul(te, ye);
        var sc = (N + I | 0) + ((p & 8191) << 13) | 0;
        return N = (E + (p >>> 13) | 0) + (sc >>> 26) | 0, sc &= 67108863, B[0] = Uo, B[1] = zo, B[2] = Go, B[3] = Vo, B[4] = Yo, B[5] = Ho, B[6] = Wo, B[7] = Xo, B[8] = Zo, B[9] = jo, B[10] = Jo, B[11] = qo, B[12] = $o, B[13] = Ko, B[14] = tc, B[15] = ec, B[16] = rc, B[17] = nc, B[18] = sc, N !== 0 && (B[19] = N, f.length++), f;
      };
      Math.imul || (H = z);
      function V(C, u, h) {
        h.negative = u.negative ^ C.negative, h.length = C.length + u.length;
        for (var f = 0, m = 0, b = 0; b < h.length - 1; b++) {
          var B = m;
          m = 0;
          for (var N = f & 67108863, I = Math.min(b, u.length - 1), p = Math.max(0, b - C.length + 1); p <= I; p++) {
            var E = b - p, tt = C.words[E] | 0, et = u.words[p] | 0, nt = tt * et, Ft = nt & 67108863;
            B = B + (nt / 67108864 | 0) | 0, Ft = Ft + N | 0, N = Ft & 67108863, B = B + (Ft >>> 26) | 0, m += B >>> 26, B &= 67108863;
          }
          h.words[b] = N, f = B, B = m;
        }
        return f !== 0 ? h.words[b] = f : h.length--, h._strip();
      }
      function P(C, u, h) {
        return V(C, u, h);
      }
      i.prototype.mulTo = function(u, h) {
        var f, m = this.length + u.length;
        return this.length === 10 && u.length === 10 ? f = H(this, u, h) : m < 63 ? f = z(this, u, h) : m < 1024 ? f = V(this, u, h) : f = P(this, u, h), f;
      }, i.prototype.mul = function(u) {
        var h = new i(null);
        return h.words = new Array(this.length + u.length), this.mulTo(u, h);
      }, i.prototype.mulf = function(u) {
        var h = new i(null);
        return h.words = new Array(this.length + u.length), P(this, u, h);
      }, i.prototype.imul = function(u) {
        return this.clone().mulTo(u, this);
      }, i.prototype.imuln = function(u) {
        var h = u < 0;
        h && (u = -u), n(typeof u == "number"), n(u < 67108864);
        for (var f = 0, m = 0; m < this.length; m++) {
          var b = (this.words[m] | 0) * u, B = (b & 67108863) + (f & 67108863);
          f >>= 26, f += b / 67108864 | 0, f += B >>> 26, this.words[m] = B & 67108863;
        }
        return f !== 0 && (this.words[m] = f, this.length++), h ? this.ineg() : this;
      }, i.prototype.muln = function(u) {
        return this.clone().imuln(u);
      }, i.prototype.sqr = function() {
        return this.mul(this);
      }, i.prototype.isqr = function() {
        return this.imul(this.clone());
      }, i.prototype.pow = function(u) {
        var h = F(u);
        if (h.length === 0) return new i(1);
        for (var f = this, m = 0; m < h.length && h[m] === 0; m++, f = f.sqr())
          ;
        if (++m < h.length)
          for (var b = f.sqr(); m < h.length; m++, b = b.sqr())
            h[m] !== 0 && (f = f.mul(b));
        return f;
      }, i.prototype.iushln = function(u) {
        n(typeof u == "number" && u >= 0);
        var h = u % 26, f = (u - h) / 26, m = 67108863 >>> 26 - h << 26 - h, b;
        if (h !== 0) {
          var B = 0;
          for (b = 0; b < this.length; b++) {
            var N = this.words[b] & m, I = (this.words[b] | 0) - N << h;
            this.words[b] = I | B, B = N >>> 26 - h;
          }
          B && (this.words[b] = B, this.length++);
        }
        if (f !== 0) {
          for (b = this.length - 1; b >= 0; b--)
            this.words[b + f] = this.words[b];
          for (b = 0; b < f; b++)
            this.words[b] = 0;
          this.length += f;
        }
        return this._strip();
      }, i.prototype.ishln = function(u) {
        return n(this.negative === 0), this.iushln(u);
      }, i.prototype.iushrn = function(u, h, f) {
        n(typeof u == "number" && u >= 0);
        var m;
        h ? m = (h - h % 26) / 26 : m = 0;
        var b = u % 26, B = Math.min((u - b) / 26, this.length), N = 67108863 ^ 67108863 >>> b << b, I = f;
        if (m -= B, m = Math.max(0, m), I) {
          for (var p = 0; p < B; p++)
            I.words[p] = this.words[p];
          I.length = B;
        }
        if (B !== 0) if (this.length > B)
          for (this.length -= B, p = 0; p < this.length; p++)
            this.words[p] = this.words[p + B];
        else
          this.words[0] = 0, this.length = 1;
        var E = 0;
        for (p = this.length - 1; p >= 0 && (E !== 0 || p >= m); p--) {
          var tt = this.words[p] | 0;
          this.words[p] = E << 26 - b | tt >>> b, E = tt & N;
        }
        return I && E !== 0 && (I.words[I.length++] = E), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, i.prototype.ishrn = function(u, h, f) {
        return n(this.negative === 0), this.iushrn(u, h, f);
      }, i.prototype.shln = function(u) {
        return this.clone().ishln(u);
      }, i.prototype.ushln = function(u) {
        return this.clone().iushln(u);
      }, i.prototype.shrn = function(u) {
        return this.clone().ishrn(u);
      }, i.prototype.ushrn = function(u) {
        return this.clone().iushrn(u);
      }, i.prototype.testn = function(u) {
        n(typeof u == "number" && u >= 0);
        var h = u % 26, f = (u - h) / 26, m = 1 << h;
        if (this.length <= f) return !1;
        var b = this.words[f];
        return !!(b & m);
      }, i.prototype.imaskn = function(u) {
        n(typeof u == "number" && u >= 0);
        var h = u % 26, f = (u - h) / 26;
        if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= f)
          return this;
        if (h !== 0 && f++, this.length = Math.min(f, this.length), h !== 0) {
          var m = 67108863 ^ 67108863 >>> h << h;
          this.words[this.length - 1] &= m;
        }
        return this._strip();
      }, i.prototype.maskn = function(u) {
        return this.clone().imaskn(u);
      }, i.prototype.iaddn = function(u) {
        return n(typeof u == "number"), n(u < 67108864), u < 0 ? this.isubn(-u) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= u ? (this.words[0] = u - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(u), this.negative = 1, this) : this._iaddn(u);
      }, i.prototype._iaddn = function(u) {
        this.words[0] += u;
        for (var h = 0; h < this.length && this.words[h] >= 67108864; h++)
          this.words[h] -= 67108864, h === this.length - 1 ? this.words[h + 1] = 1 : this.words[h + 1]++;
        return this.length = Math.max(this.length, h + 1), this;
      }, i.prototype.isubn = function(u) {
        if (n(typeof u == "number"), n(u < 67108864), u < 0) return this.iaddn(-u);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(u), this.negative = 1, this;
        if (this.words[0] -= u, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var h = 0; h < this.length && this.words[h] < 0; h++)
            this.words[h] += 67108864, this.words[h + 1] -= 1;
        return this._strip();
      }, i.prototype.addn = function(u) {
        return this.clone().iaddn(u);
      }, i.prototype.subn = function(u) {
        return this.clone().isubn(u);
      }, i.prototype.iabs = function() {
        return this.negative = 0, this;
      }, i.prototype.abs = function() {
        return this.clone().iabs();
      }, i.prototype._ishlnsubmul = function(u, h, f) {
        var m = u.length + f, b;
        this._expand(m);
        var B, N = 0;
        for (b = 0; b < u.length; b++) {
          B = (this.words[b + f] | 0) + N;
          var I = (u.words[b] | 0) * h;
          B -= I & 67108863, N = (B >> 26) - (I / 67108864 | 0), this.words[b + f] = B & 67108863;
        }
        for (; b < this.length - f; b++)
          B = (this.words[b + f] | 0) + N, N = B >> 26, this.words[b + f] = B & 67108863;
        if (N === 0) return this._strip();
        for (n(N === -1), N = 0, b = 0; b < this.length; b++)
          B = -(this.words[b] | 0) + N, N = B >> 26, this.words[b] = B & 67108863;
        return this.negative = 1, this._strip();
      }, i.prototype._wordDiv = function(u, h) {
        var f = this.length - u.length, m = this.clone(), b = u, B = b.words[b.length - 1] | 0, N = this._countBits(B);
        f = 26 - N, f !== 0 && (b = b.ushln(f), m.iushln(f), B = b.words[b.length - 1] | 0);
        var I = m.length - b.length, p;
        if (h !== "mod") {
          p = new i(null), p.length = I + 1, p.words = new Array(p.length);
          for (var E = 0; E < p.length; E++)
            p.words[E] = 0;
        }
        var tt = m.clone()._ishlnsubmul(b, 1, I);
        tt.negative === 0 && (m = tt, p && (p.words[I] = 1));
        for (var et = I - 1; et >= 0; et--) {
          var nt = (m.words[b.length + et] | 0) * 67108864 + (m.words[b.length + et - 1] | 0);
          for (nt = Math.min(nt / B | 0, 67108863), m._ishlnsubmul(b, nt, et); m.negative !== 0; )
            nt--, m.negative = 0, m._ishlnsubmul(b, 1, et), m.isZero() || (m.negative ^= 1);
          p && (p.words[et] = nt);
        }
        return p && p._strip(), m._strip(), h !== "div" && f !== 0 && m.iushrn(f), {
          div: p || null,
          mod: m
        };
      }, i.prototype.divmod = function(u, h, f) {
        if (n(!u.isZero()), this.isZero())
          return {
            div: new i(0),
            mod: new i(0)
          };
        var m, b, B;
        return this.negative !== 0 && u.negative === 0 ? (B = this.neg().divmod(u, h), h !== "mod" && (m = B.div.neg()), h !== "div" && (b = B.mod.neg(), f && b.negative !== 0 && b.iadd(u)), {
          div: m,
          mod: b
        }) : this.negative === 0 && u.negative !== 0 ? (B = this.divmod(u.neg(), h), h !== "mod" && (m = B.div.neg()), {
          div: m,
          mod: B.mod
        }) : this.negative & u.negative ? (B = this.neg().divmod(u.neg(), h), h !== "div" && (b = B.mod.neg(), f && b.negative !== 0 && b.isub(u)), {
          div: B.div,
          mod: b
        }) : u.length > this.length || this.cmp(u) < 0 ? {
          div: new i(0),
          mod: this
        } : u.length === 1 ? h === "div" ? {
          div: this.divn(u.words[0]),
          mod: null
        } : h === "mod" ? {
          div: null,
          mod: new i(this.modrn(u.words[0]))
        } : {
          div: this.divn(u.words[0]),
          mod: new i(this.modrn(u.words[0]))
        } : this._wordDiv(u, h);
      }, i.prototype.div = function(u) {
        return this.divmod(u, "div", !1).div;
      }, i.prototype.mod = function(u) {
        return this.divmod(u, "mod", !1).mod;
      }, i.prototype.umod = function(u) {
        return this.divmod(u, "mod", !0).mod;
      }, i.prototype.divRound = function(u) {
        var h = this.divmod(u);
        if (h.mod.isZero()) return h.div;
        var f = h.div.negative !== 0 ? h.mod.isub(u) : h.mod, m = u.ushrn(1), b = u.andln(1), B = f.cmp(m);
        return B < 0 || b === 1 && B === 0 ? h.div : h.div.negative !== 0 ? h.div.isubn(1) : h.div.iaddn(1);
      }, i.prototype.modrn = function(u) {
        var h = u < 0;
        h && (u = -u), n(u <= 67108863);
        for (var f = (1 << 26) % u, m = 0, b = this.length - 1; b >= 0; b--)
          m = (f * m + (this.words[b] | 0)) % u;
        return h ? -m : m;
      }, i.prototype.modn = function(u) {
        return this.modrn(u);
      }, i.prototype.idivn = function(u) {
        var h = u < 0;
        h && (u = -u), n(u <= 67108863);
        for (var f = 0, m = this.length - 1; m >= 0; m--) {
          var b = (this.words[m] | 0) + f * 67108864;
          this.words[m] = b / u | 0, f = b % u;
        }
        return this._strip(), h ? this.ineg() : this;
      }, i.prototype.divn = function(u) {
        return this.clone().idivn(u);
      }, i.prototype.egcd = function(u) {
        n(u.negative === 0), n(!u.isZero());
        var h = this, f = u.clone();
        h.negative !== 0 ? h = h.umod(u) : h = h.clone();
        for (var m = new i(1), b = new i(0), B = new i(0), N = new i(1), I = 0; h.isEven() && f.isEven(); )
          h.iushrn(1), f.iushrn(1), ++I;
        for (var p = f.clone(), E = h.clone(); !h.isZero(); ) {
          for (var tt = 0, et = 1; !(h.words[0] & et) && tt < 26; ++tt, et <<= 1) ;
          if (tt > 0)
            for (h.iushrn(tt); tt-- > 0; )
              (m.isOdd() || b.isOdd()) && (m.iadd(p), b.isub(E)), m.iushrn(1), b.iushrn(1);
          for (var nt = 0, Ft = 1; !(f.words[0] & Ft) && nt < 26; ++nt, Ft <<= 1) ;
          if (nt > 0)
            for (f.iushrn(nt); nt-- > 0; )
              (B.isOdd() || N.isOdd()) && (B.iadd(p), N.isub(E)), B.iushrn(1), N.iushrn(1);
          h.cmp(f) >= 0 ? (h.isub(f), m.isub(B), b.isub(N)) : (f.isub(h), B.isub(m), N.isub(b));
        }
        return {
          a: B,
          b: N,
          gcd: f.iushln(I)
        };
      }, i.prototype._invmp = function(u) {
        n(u.negative === 0), n(!u.isZero());
        var h = this, f = u.clone();
        h.negative !== 0 ? h = h.umod(u) : h = h.clone();
        for (var m = new i(1), b = new i(0), B = f.clone(); h.cmpn(1) > 0 && f.cmpn(1) > 0; ) {
          for (var N = 0, I = 1; !(h.words[0] & I) && N < 26; ++N, I <<= 1) ;
          if (N > 0)
            for (h.iushrn(N); N-- > 0; )
              m.isOdd() && m.iadd(B), m.iushrn(1);
          for (var p = 0, E = 1; !(f.words[0] & E) && p < 26; ++p, E <<= 1) ;
          if (p > 0)
            for (f.iushrn(p); p-- > 0; )
              b.isOdd() && b.iadd(B), b.iushrn(1);
          h.cmp(f) >= 0 ? (h.isub(f), m.isub(b)) : (f.isub(h), b.isub(m));
        }
        var tt;
        return h.cmpn(1) === 0 ? tt = m : tt = b, tt.cmpn(0) < 0 && tt.iadd(u), tt;
      }, i.prototype.gcd = function(u) {
        if (this.isZero()) return u.abs();
        if (u.isZero()) return this.abs();
        var h = this.clone(), f = u.clone();
        h.negative = 0, f.negative = 0;
        for (var m = 0; h.isEven() && f.isEven(); m++)
          h.iushrn(1), f.iushrn(1);
        do {
          for (; h.isEven(); )
            h.iushrn(1);
          for (; f.isEven(); )
            f.iushrn(1);
          var b = h.cmp(f);
          if (b < 0) {
            var B = h;
            h = f, f = B;
          } else if (b === 0 || f.cmpn(1) === 0)
            break;
          h.isub(f);
        } while (!0);
        return f.iushln(m);
      }, i.prototype.invm = function(u) {
        return this.egcd(u).a.umod(u);
      }, i.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, i.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, i.prototype.andln = function(u) {
        return this.words[0] & u;
      }, i.prototype.bincn = function(u) {
        n(typeof u == "number");
        var h = u % 26, f = (u - h) / 26, m = 1 << h;
        if (this.length <= f)
          return this._expand(f + 1), this.words[f] |= m, this;
        for (var b = m, B = f; b !== 0 && B < this.length; B++) {
          var N = this.words[B] | 0;
          N += b, b = N >>> 26, N &= 67108863, this.words[B] = N;
        }
        return b !== 0 && (this.words[B] = b, this.length++), this;
      }, i.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, i.prototype.cmpn = function(u) {
        var h = u < 0;
        if (this.negative !== 0 && !h) return -1;
        if (this.negative === 0 && h) return 1;
        this._strip();
        var f;
        if (this.length > 1)
          f = 1;
        else {
          h && (u = -u), n(u <= 67108863, "Number is too big");
          var m = this.words[0] | 0;
          f = m === u ? 0 : m < u ? -1 : 1;
        }
        return this.negative !== 0 ? -f | 0 : f;
      }, i.prototype.cmp = function(u) {
        if (this.negative !== 0 && u.negative === 0) return -1;
        if (this.negative === 0 && u.negative !== 0) return 1;
        var h = this.ucmp(u);
        return this.negative !== 0 ? -h | 0 : h;
      }, i.prototype.ucmp = function(u) {
        if (this.length > u.length) return 1;
        if (this.length < u.length) return -1;
        for (var h = 0, f = this.length - 1; f >= 0; f--) {
          var m = this.words[f] | 0, b = u.words[f] | 0;
          if (m !== b) {
            m < b ? h = -1 : m > b && (h = 1);
            break;
          }
        }
        return h;
      }, i.prototype.gtn = function(u) {
        return this.cmpn(u) === 1;
      }, i.prototype.gt = function(u) {
        return this.cmp(u) === 1;
      }, i.prototype.gten = function(u) {
        return this.cmpn(u) >= 0;
      }, i.prototype.gte = function(u) {
        return this.cmp(u) >= 0;
      }, i.prototype.ltn = function(u) {
        return this.cmpn(u) === -1;
      }, i.prototype.lt = function(u) {
        return this.cmp(u) === -1;
      }, i.prototype.lten = function(u) {
        return this.cmpn(u) <= 0;
      }, i.prototype.lte = function(u) {
        return this.cmp(u) <= 0;
      }, i.prototype.eqn = function(u) {
        return this.cmpn(u) === 0;
      }, i.prototype.eq = function(u) {
        return this.cmp(u) === 0;
      }, i.red = function(u) {
        return new J(u);
      }, i.prototype.toRed = function(u) {
        return n(!this.red, "Already a number in reduction context"), n(this.negative === 0, "red works only with positives"), u.convertTo(this)._forceRed(u);
      }, i.prototype.fromRed = function() {
        return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, i.prototype._forceRed = function(u) {
        return this.red = u, this;
      }, i.prototype.forceRed = function(u) {
        return n(!this.red, "Already a number in reduction context"), this._forceRed(u);
      }, i.prototype.redAdd = function(u) {
        return n(this.red, "redAdd works only with red numbers"), this.red.add(this, u);
      }, i.prototype.redIAdd = function(u) {
        return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, u);
      }, i.prototype.redSub = function(u) {
        return n(this.red, "redSub works only with red numbers"), this.red.sub(this, u);
      }, i.prototype.redISub = function(u) {
        return n(this.red, "redISub works only with red numbers"), this.red.isub(this, u);
      }, i.prototype.redShl = function(u) {
        return n(this.red, "redShl works only with red numbers"), this.red.shl(this, u);
      }, i.prototype.redMul = function(u) {
        return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, u), this.red.mul(this, u);
      }, i.prototype.redIMul = function(u) {
        return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, u), this.red.imul(this, u);
      }, i.prototype.redSqr = function() {
        return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, i.prototype.redISqr = function() {
        return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, i.prototype.redSqrt = function() {
        return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, i.prototype.redInvm = function() {
        return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, i.prototype.redNeg = function() {
        return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, i.prototype.redPow = function(u) {
        return n(this.red && !u.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, u);
      };
      var M = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function Q(C, u) {
        this.name = C, this.p = new i(u, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      Q.prototype._tmp = function() {
        var u = new i(null);
        return u.words = new Array(Math.ceil(this.n / 13)), u;
      }, Q.prototype.ireduce = function(u) {
        var h = u, f;
        do
          this.split(h, this.tmp), h = this.imulK(h), h = h.iadd(this.tmp), f = h.bitLength();
        while (f > this.n);
        var m = f < this.n ? -1 : h.ucmp(this.p);
        return m === 0 ? (h.words[0] = 0, h.length = 1) : m > 0 ? h.isub(this.p) : h.strip !== void 0 ? h.strip() : h._strip(), h;
      }, Q.prototype.split = function(u, h) {
        u.iushrn(this.n, 0, h);
      }, Q.prototype.imulK = function(u) {
        return u.imul(this.k);
      };
      function k() {
        Q.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      s(k, Q), k.prototype.split = function(u, h) {
        for (var f = 4194303, m = Math.min(u.length, 9), b = 0; b < m; b++)
          h.words[b] = u.words[b];
        if (h.length = m, u.length <= 9) {
          u.words[0] = 0, u.length = 1;
          return;
        }
        var B = u.words[9];
        for (h.words[h.length++] = B & f, b = 10; b < u.length; b++) {
          var N = u.words[b] | 0;
          u.words[b - 10] = (N & f) << 4 | B >>> 22, B = N;
        }
        B >>>= 22, u.words[b - 10] = B, B === 0 && u.length > 10 ? u.length -= 10 : u.length -= 9;
      }, k.prototype.imulK = function(u) {
        u.words[u.length] = 0, u.words[u.length + 1] = 0, u.length += 2;
        for (var h = 0, f = 0; f < u.length; f++) {
          var m = u.words[f] | 0;
          h += m * 977, u.words[f] = h & 67108863, h = m * 64 + (h / 67108864 | 0);
        }
        return u.words[u.length - 1] === 0 && (u.length--, u.words[u.length - 1] === 0 && u.length--), u;
      };
      function U() {
        Q.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      s(U, Q);
      function G() {
        Q.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      s(G, Q);
      function j() {
        Q.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      s(j, Q), j.prototype.imulK = function(u) {
        for (var h = 0, f = 0; f < u.length; f++) {
          var m = (u.words[f] | 0) * 19 + h, b = m & 67108863;
          m >>>= 26, u.words[f] = b, h = m;
        }
        return h !== 0 && (u.words[u.length++] = h), u;
      }, i._prime = function(u) {
        if (M[u]) return M[u];
        var h;
        if (u === "k256")
          h = new k();
        else if (u === "p224")
          h = new U();
        else if (u === "p192")
          h = new G();
        else if (u === "p25519")
          h = new j();
        else
          throw new Error("Unknown prime " + u);
        return M[u] = h, h;
      };
      function J(C) {
        if (typeof C == "string") {
          var u = i._prime(C);
          this.m = u.p, this.prime = u;
        } else
          n(C.gtn(1), "modulus must be greater than 1"), this.m = C, this.prime = null;
      }
      J.prototype._verify1 = function(u) {
        n(u.negative === 0, "red works only with positives"), n(u.red, "red works only with red numbers");
      }, J.prototype._verify2 = function(u, h) {
        n((u.negative | h.negative) === 0, "red works only with positives"), n(
          u.red && u.red === h.red,
          "red works only with red numbers"
        );
      }, J.prototype.imod = function(u) {
        return this.prime ? this.prime.ireduce(u)._forceRed(this) : (A(u, u.umod(this.m)._forceRed(this)), u);
      }, J.prototype.neg = function(u) {
        return u.isZero() ? u.clone() : this.m.sub(u)._forceRed(this);
      }, J.prototype.add = function(u, h) {
        this._verify2(u, h);
        var f = u.add(h);
        return f.cmp(this.m) >= 0 && f.isub(this.m), f._forceRed(this);
      }, J.prototype.iadd = function(u, h) {
        this._verify2(u, h);
        var f = u.iadd(h);
        return f.cmp(this.m) >= 0 && f.isub(this.m), f;
      }, J.prototype.sub = function(u, h) {
        this._verify2(u, h);
        var f = u.sub(h);
        return f.cmpn(0) < 0 && f.iadd(this.m), f._forceRed(this);
      }, J.prototype.isub = function(u, h) {
        this._verify2(u, h);
        var f = u.isub(h);
        return f.cmpn(0) < 0 && f.iadd(this.m), f;
      }, J.prototype.shl = function(u, h) {
        return this._verify1(u), this.imod(u.ushln(h));
      }, J.prototype.imul = function(u, h) {
        return this._verify2(u, h), this.imod(u.imul(h));
      }, J.prototype.mul = function(u, h) {
        return this._verify2(u, h), this.imod(u.mul(h));
      }, J.prototype.isqr = function(u) {
        return this.imul(u, u.clone());
      }, J.prototype.sqr = function(u) {
        return this.mul(u, u);
      }, J.prototype.sqrt = function(u) {
        if (u.isZero()) return u.clone();
        var h = this.m.andln(3);
        if (n(h % 2 === 1), h === 3) {
          var f = this.m.add(new i(1)).iushrn(2);
          return this.pow(u, f);
        }
        for (var m = this.m.subn(1), b = 0; !m.isZero() && m.andln(1) === 0; )
          b++, m.iushrn(1);
        n(!m.isZero());
        var B = new i(1).toRed(this), N = B.redNeg(), I = this.m.subn(1).iushrn(1), p = this.m.bitLength();
        for (p = new i(2 * p * p).toRed(this); this.pow(p, I).cmp(N) !== 0; )
          p.redIAdd(N);
        for (var E = this.pow(p, m), tt = this.pow(u, m.addn(1).iushrn(1)), et = this.pow(u, m), nt = b; et.cmp(B) !== 0; ) {
          for (var Ft = et, pt = 0; Ft.cmp(B) !== 0; pt++)
            Ft = Ft.redSqr();
          n(pt < nt);
          var Et = this.pow(E, new i(1).iushln(nt - pt - 1));
          tt = tt.redMul(Et), E = Et.redSqr(), et = et.redMul(E), nt = pt;
        }
        return tt;
      }, J.prototype.invm = function(u) {
        var h = u._invmp(this.m);
        return h.negative !== 0 ? (h.negative = 0, this.imod(h).redNeg()) : this.imod(h);
      }, J.prototype.pow = function(u, h) {
        if (h.isZero()) return new i(1).toRed(this);
        if (h.cmpn(1) === 0) return u.clone();
        var f = 4, m = new Array(1 << f);
        m[0] = new i(1).toRed(this), m[1] = u;
        for (var b = 2; b < m.length; b++)
          m[b] = this.mul(m[b - 1], u);
        var B = m[0], N = 0, I = 0, p = h.bitLength() % 26;
        for (p === 0 && (p = 26), b = h.length - 1; b >= 0; b--) {
          for (var E = h.words[b], tt = p - 1; tt >= 0; tt--) {
            var et = E >> tt & 1;
            if (B !== m[0] && (B = this.sqr(B)), et === 0 && N === 0) {
              I = 0;
              continue;
            }
            N <<= 1, N |= et, I++, !(I !== f && (b !== 0 || tt !== 0)) && (B = this.mul(B, m[N]), I = 0, N = 0);
          }
          p = 26;
        }
        return B;
      }, J.prototype.convertTo = function(u) {
        var h = u.umod(this.m);
        return h === u ? h.clone() : h;
      }, J.prototype.convertFrom = function(u) {
        var h = u.clone();
        return h.red = null, h;
      }, i.mont = function(u) {
        return new q(u);
      };
      function q(C) {
        J.call(this, C), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      s(q, J), q.prototype.convertTo = function(u) {
        return this.imod(u.ushln(this.shift));
      }, q.prototype.convertFrom = function(u) {
        var h = this.imod(u.mul(this.rinv));
        return h.red = null, h;
      }, q.prototype.imul = function(u, h) {
        if (u.isZero() || h.isZero())
          return u.words[0] = 0, u.length = 1, u;
        var f = u.imul(h), m = f.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), b = f.isub(m).iushrn(this.shift), B = b;
        return b.cmp(this.m) >= 0 ? B = b.isub(this.m) : b.cmpn(0) < 0 && (B = b.iadd(this.m)), B._forceRed(this);
      }, q.prototype.mul = function(u, h) {
        if (u.isZero() || h.isZero()) return new i(0)._forceRed(this);
        var f = u.mul(h), m = f.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), b = f.isub(m).iushrn(this.shift), B = b;
        return b.cmp(this.m) >= 0 ? B = b.isub(this.m) : b.cmpn(0) < 0 && (B = b.iadd(this.m)), B._forceRed(this);
      }, q.prototype.invm = function(u) {
        var h = this.imod(u._invmp(this.m).mul(this.r2));
        return h._forceRed(this);
      };
    })(r, iw);
  }(ba)), ba.exports;
}
var ow = aw();
const la = /* @__PURE__ */ j_(ow);
var cw = Object.defineProperty, Sr = (r, t) => cw(r, "name", { value: t, configurable: !0 }), J_ = 9, q_ = 3, Oc = 9, Lt, $_ = (Lt = class extends la {
  constructor(e, n, s) {
    let i = e, a = n;
    if (Lt.isBN(e) ? i = e.toArray() : typeof e == "string" && e.slice(0, 2) === "0x" && (i = e.substring(2), a = n || "hex"), typeof i == "number" && i > Number.MAX_SAFE_INTEGER)
      throw new v(
        L.NUMBER_TOO_BIG,
        `Value ${i} is too large to be represented as a number, use string instead.`
      );
    super(i ?? 0, a, s);
    D(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
  }
  // ANCHOR: HELPERS
  // make sure we always include `0x` in hex strings
  toString(e, n) {
    const s = super.toString(e, n);
    return e === 16 || e === "hex" ? `0x${s}` : s;
  }
  toHex(e) {
    const s = (e || 0) * 2;
    if (this.isNeg())
      throw new v(L.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (e && this.byteLength() > e)
      throw new v(
        L.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${e} bytes.`
      );
    return this.toString(16, s);
  }
  toBytes(e) {
    if (this.isNeg())
      throw new v(L.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
    return Uint8Array.from(this.toArray(void 0, e));
  }
  toJSON() {
    return this.toString(16);
  }
  valueOf() {
    return this.toString();
  }
  format(e) {
    const {
      units: n = Oc,
      precision: s = J_,
      minPrecision: i = q_
    } = e || {};
    if (n === 0)
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const a = i > s ? s : i, o = s > i ? s : i, d = this.formatUnits(n), [_, A = ""] = d.split("."), g = _.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (o === 0)
      return g;
    let y = A.replace(/0+$/, "");
    if (y.length > o)
      if (_ === "0") {
        const S = y.search(/[1-9]/);
        S >= 0 && S < o ? y = y.slice(0, o) : y = y.slice(0, S + 1);
      } else
        y = y.slice(0, o);
    else
      y = y.slice(0, o);
    return y.length < a && (y = y.padEnd(a, "0")), y === "" && a === 0 ? g : y ? `${g}.${y}` : g;
  }
  formatUnits(e = Oc) {
    const n = this.toString(), s = n.length;
    if (s <= e)
      return `0.${"0".repeat(e - s)}${n}`;
    const i = n.slice(0, s - e), a = n.slice(s - e);
    return `${i}.${a}`;
  }
  // END ANCHOR: HELPERS
  // ANCHOR: OVERRIDES to accept better inputs
  add(e) {
    return this.caller(e, "add");
  }
  pow(e) {
    return this.caller(e, "pow");
  }
  sub(e) {
    return this.caller(e, "sub");
  }
  div(e) {
    return this.caller(e, "div");
  }
  mul(e) {
    return this.caller(e, "mul");
  }
  mod(e) {
    return this.caller(e, "mod");
  }
  divRound(e) {
    return this.caller(e, "divRound");
  }
  lt(e) {
    return this.caller(e, "lt");
  }
  lte(e) {
    return this.caller(e, "lte");
  }
  gt(e) {
    return this.caller(e, "gt");
  }
  gte(e) {
    return this.caller(e, "gte");
  }
  eq(e) {
    return this.caller(e, "eq");
  }
  cmp(e) {
    return this.caller(e, "cmp");
  }
  // END ANCHOR: OVERRIDES to accept better inputs
  // ANCHOR: OVERRIDES to output our BN type
  sqr() {
    return new Lt(super.sqr().toArray());
  }
  neg() {
    return new Lt(super.neg().toArray());
  }
  abs() {
    return new Lt(super.abs().toArray());
  }
  toTwos(e) {
    return new Lt(super.toTwos(e).toArray());
  }
  fromTwos(e) {
    return new Lt(super.fromTwos(e).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(e, n) {
    const s = super[n](new Lt(e));
    return Lt.isBN(s) ? new Lt(s.toArray()) : s;
  }
  clone() {
    return new Lt(this.toArray());
  }
  mulTo(e, n) {
    const s = new la(this.toArray()).mulTo(e, n);
    return new Lt(s.toArray());
  }
  egcd(e) {
    const { a: n, b: s, gcd: i } = new la(this.toArray()).egcd(e);
    return {
      a: new Lt(n.toArray()),
      b: new Lt(s.toArray()),
      gcd: new Lt(i.toArray())
    };
  }
  divmod(e, n, s) {
    const { div: i, mod: a } = new la(this.toArray()).divmod(new Lt(e), n, s);
    return {
      div: new Lt(i == null ? void 0 : i.toArray()),
      mod: new Lt(a == null ? void 0 : a.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Lt(this.MAX_U64) : this;
  }
  max(e) {
    return this.gte(e) ? new Lt(e) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Lt(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, Sr(Lt, "BN"), Lt), x = /* @__PURE__ */ Sr((r, t, e) => new $_(r, t, e), "bn");
x.parseUnits = (r, t = Oc) => {
  const e = r === "." ? "0." : r, [n = "0", s = "0"] = e.split("."), i = s.length;
  if (t === 0) {
    const d = e.replace(",", "").split(".")[0];
    return x(d);
  }
  if (i > t)
    throw new v(
      L.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const a = Array.from({ length: t }).fill("0");
  a.splice(0, i, s);
  const o = `${n.replaceAll(",", "")}${a.join("")}`;
  return x(o);
};
function dw(r, t) {
  const { precision: e = J_, minPrecision: n = q_ } = t || {}, [s = "0", i = "0"] = String(r || "0.0").split("."), a = /(\d)(?=(\d{3})+\b)/g, o = s.replace(a, "$1,");
  let d = i.slice(0, e);
  if (n < e) {
    const A = d.match(/.*[1-9]{1}/), g = (A == null ? void 0 : A[0].length) || 0, y = Math.max(n, g);
    d = d.slice(0, y);
  }
  const _ = d ? `.${d}` : "";
  return `${o}${_}`;
}
Sr(dw, "toFixed");
function Mr(r) {
  return x(r).toNumber();
}
Sr(Mr, "toNumber");
function co(r, t) {
  return x(r).toHex(t);
}
Sr(co, "toHex");
function br(r, t) {
  return x(r).toBytes(t);
}
Sr(br, "toBytes");
function uw(r, t) {
  return x(r).formatUnits(t);
}
Sr(uw, "formatUnits");
function hw(r, t) {
  return x(r).format(t);
}
Sr(hw, "format");
function lw(...r) {
  return r.reduce((t, e) => x(e).gt(t) ? x(e) : t, x(0));
}
Sr(lw, "max");
function _w(...r) {
  return x(Math.ceil(r.reduce((t, e) => x(t).mul(e), x(1)).toNumber()));
}
Sr(_w, "multiply");
var xe = Uint8Array, Ye = Uint16Array, Ad = Int32Array, uo = new xe([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), ho = new xe([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), Mc = new xe([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), K_ = function(r, t) {
  for (var e = new Ye(31), n = 0; n < 31; ++n)
    e[n] = t += 1 << r[n - 1];
  for (var s = new Ad(e[30]), n = 1; n < 30; ++n)
    for (var i = e[n]; i < e[n + 1]; ++i)
      s[i] = i - e[n] << 5 | n;
  return { b: e, r: s };
}, tp = K_(uo, 2), ep = tp.b, Pc = tp.r;
ep[28] = 258, Pc[258] = 28;
var rp = K_(ho, 0), pw = rp.b, Nu = rp.r, Lc = new Ye(32768);
for (var kt = 0; kt < 32768; ++kt) {
  var Ur = (kt & 43690) >> 1 | (kt & 21845) << 1;
  Ur = (Ur & 52428) >> 2 | (Ur & 13107) << 2, Ur = (Ur & 61680) >> 4 | (Ur & 3855) << 4, Lc[kt] = ((Ur & 65280) >> 8 | (Ur & 255) << 8) >> 1;
}
var Ir = function(r, t, e) {
  for (var n = r.length, s = 0, i = new Ye(t); s < n; ++s)
    r[s] && ++i[r[s] - 1];
  var a = new Ye(t);
  for (s = 1; s < t; ++s)
    a[s] = a[s - 1] + i[s - 1] << 1;
  var o;
  if (e) {
    o = new Ye(1 << t);
    var d = 15 - t;
    for (s = 0; s < n; ++s)
      if (r[s])
        for (var _ = s << 4 | r[s], A = t - r[s], g = a[r[s] - 1]++ << A, y = g | (1 << A) - 1; g <= y; ++g)
          o[Lc[g] >> d] = _;
  } else
    for (o = new Ye(n), s = 0; s < n; ++s)
      r[s] && (o[s] = Lc[a[r[s] - 1]++] >> 15 - r[s]);
  return o;
}, tn = new xe(288);
for (var kt = 0; kt < 144; ++kt)
  tn[kt] = 8;
for (var kt = 144; kt < 256; ++kt)
  tn[kt] = 9;
for (var kt = 256; kt < 280; ++kt)
  tn[kt] = 7;
for (var kt = 280; kt < 288; ++kt)
  tn[kt] = 8;
var Xi = new xe(32);
for (var kt = 0; kt < 32; ++kt)
  Xi[kt] = 5;
var fw = /* @__PURE__ */ Ir(tn, 9, 0), Aw = /* @__PURE__ */ Ir(tn, 9, 1), gw = /* @__PURE__ */ Ir(Xi, 5, 0), ww = /* @__PURE__ */ Ir(Xi, 5, 1), ac = function(r) {
  for (var t = r[0], e = 1; e < r.length; ++e)
    r[e] > t && (t = r[e]);
  return t;
}, er = function(r, t, e) {
  var n = t / 8 | 0;
  return (r[n] | r[n + 1] << 8) >> (t & 7) & e;
}, oc = function(r, t) {
  var e = t / 8 | 0;
  return (r[e] | r[e + 1] << 8 | r[e + 2] << 16) >> (t & 7);
}, gd = function(r) {
  return (r + 7) / 8 | 0;
}, np = function(r, t, e) {
  return (e == null || e > r.length) && (e = r.length), new xe(r.subarray(t, e));
}, mw = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], nr = function(r, t, e) {
  var n = new Error(t || mw[r]);
  if (n.code = r, Error.captureStackTrace && Error.captureStackTrace(n, nr), !e)
    throw n;
  return n;
}, yw = function(r, t, e, n) {
  var s = r.length, i = 0;
  if (!s || t.f && !t.l)
    return e || new xe(0);
  var a = !e, o = a || t.i != 2, d = t.i;
  a && (e = new xe(s * 3));
  var _ = function(vt) {
    var Ct = e.length;
    if (vt > Ct) {
      var De = new xe(Math.max(Ct * 2, vt));
      De.set(e), e = De;
    }
  }, A = t.f || 0, g = t.p || 0, y = t.b || 0, S = t.l, O = t.d, R = t.m, F = t.n, z = s * 8;
  do {
    if (!S) {
      A = er(r, g, 1);
      var H = er(r, g + 1, 3);
      if (g += 3, H)
        if (H == 1)
          S = Aw, O = ww, R = 9, F = 5;
        else if (H == 2) {
          var Q = er(r, g, 31) + 257, k = er(r, g + 10, 15) + 4, U = Q + er(r, g + 5, 31) + 1;
          g += 14;
          for (var G = new xe(U), j = new xe(19), J = 0; J < k; ++J)
            j[Mc[J]] = er(r, g + J * 3, 7);
          g += k * 3;
          for (var q = ac(j), C = (1 << q) - 1, u = Ir(j, q, 1), J = 0; J < U; ) {
            var h = u[er(r, g, C)];
            g += h & 15;
            var V = h >> 4;
            if (V < 16)
              G[J++] = V;
            else {
              var f = 0, m = 0;
              for (V == 16 ? (m = 3 + er(r, g, 3), g += 2, f = G[J - 1]) : V == 17 ? (m = 3 + er(r, g, 7), g += 3) : V == 18 && (m = 11 + er(r, g, 127), g += 7); m--; )
                G[J++] = f;
            }
          }
          var b = G.subarray(0, Q), B = G.subarray(Q);
          R = ac(b), F = ac(B), S = Ir(b, R, 1), O = Ir(B, F, 1);
        } else
          nr(1);
      else {
        var V = gd(g) + 4, P = r[V - 4] | r[V - 3] << 8, M = V + P;
        if (M > s) {
          d && nr(0);
          break;
        }
        o && _(y + P), e.set(r.subarray(V, M), y), t.b = y += P, t.p = g = M * 8, t.f = A;
        continue;
      }
      if (g > z) {
        d && nr(0);
        break;
      }
    }
    o && _(y + 131072);
    for (var N = (1 << R) - 1, I = (1 << F) - 1, p = g; ; p = g) {
      var f = S[oc(r, g) & N], E = f >> 4;
      if (g += f & 15, g > z) {
        d && nr(0);
        break;
      }
      if (f || nr(2), E < 256)
        e[y++] = E;
      else if (E == 256) {
        p = g, S = null;
        break;
      } else {
        var tt = E - 254;
        if (E > 264) {
          var J = E - 257, et = uo[J];
          tt = er(r, g, (1 << et) - 1) + ep[J], g += et;
        }
        var nt = O[oc(r, g) & I], Ft = nt >> 4;
        nt || nr(3), g += nt & 15;
        var B = pw[Ft];
        if (Ft > 3) {
          var et = ho[Ft];
          B += oc(r, g) & (1 << et) - 1, g += et;
        }
        if (g > z) {
          d && nr(0);
          break;
        }
        o && _(y + 131072);
        var pt = y + tt;
        if (y < B) {
          var Et = i - B, tr = Math.min(B, pt);
          for (Et + y < 0 && nr(3); y < tr; ++y)
            e[y] = n[Et + y];
        }
        for (; y < pt; ++y)
          e[y] = e[y - B];
      }
    }
    t.l = S, t.p = p, t.b = y, t.f = A, S && (A = 1, t.m = R, t.d = O, t.n = F);
  } while (!A);
  return y != e.length && a ? np(e, 0, y) : e.subarray(0, y);
}, Tr = function(r, t, e) {
  e <<= t & 7;
  var n = t / 8 | 0;
  r[n] |= e, r[n + 1] |= e >> 8;
}, Di = function(r, t, e) {
  e <<= t & 7;
  var n = t / 8 | 0;
  r[n] |= e, r[n + 1] |= e >> 8, r[n + 2] |= e >> 16;
}, cc = function(r, t) {
  for (var e = [], n = 0; n < r.length; ++n)
    r[n] && e.push({ s: n, f: r[n] });
  var s = e.length, i = e.slice();
  if (!s)
    return { t: ip, l: 0 };
  if (s == 1) {
    var a = new xe(e[0].s + 1);
    return a[e[0].s] = 1, { t: a, l: 1 };
  }
  e.sort(function(M, Q) {
    return M.f - Q.f;
  }), e.push({ s: -1, f: 25001 });
  var o = e[0], d = e[1], _ = 0, A = 1, g = 2;
  for (e[0] = { s: -1, f: o.f + d.f, l: o, r: d }; A != s - 1; )
    o = e[e[_].f < e[g].f ? _++ : g++], d = e[_ != A && e[_].f < e[g].f ? _++ : g++], e[A++] = { s: -1, f: o.f + d.f, l: o, r: d };
  for (var y = i[0].s, n = 1; n < s; ++n)
    i[n].s > y && (y = i[n].s);
  var S = new Ye(y + 1), O = kc(e[A - 1], S, 0);
  if (O > t) {
    var n = 0, R = 0, F = O - t, z = 1 << F;
    for (i.sort(function(Q, k) {
      return S[k.s] - S[Q.s] || Q.f - k.f;
    }); n < s; ++n) {
      var H = i[n].s;
      if (S[H] > t)
        R += z - (1 << O - S[H]), S[H] = t;
      else
        break;
    }
    for (R >>= F; R > 0; ) {
      var V = i[n].s;
      S[V] < t ? R -= 1 << t - S[V]++ - 1 : ++n;
    }
    for (; n >= 0 && R; --n) {
      var P = i[n].s;
      S[P] == t && (--S[P], ++R);
    }
    O = t;
  }
  return { t: new xe(S), l: O };
}, kc = function(r, t, e) {
  return r.s == -1 ? Math.max(kc(r.l, t, e + 1), kc(r.r, t, e + 1)) : t[r.s] = e;
}, Du = function(r) {
  for (var t = r.length; t && !r[--t]; )
    ;
  for (var e = new Ye(++t), n = 0, s = r[0], i = 1, a = function(d) {
    e[n++] = d;
  }, o = 1; o <= t; ++o)
    if (r[o] == s && o != t)
      ++i;
    else {
      if (!s && i > 2) {
        for (; i > 138; i -= 138)
          a(32754);
        i > 2 && (a(i > 10 ? i - 11 << 5 | 28690 : i - 3 << 5 | 12305), i = 0);
      } else if (i > 3) {
        for (a(s), --i; i > 6; i -= 6)
          a(8304);
        i > 2 && (a(i - 3 << 5 | 8208), i = 0);
      }
      for (; i--; )
        a(s);
      i = 1, s = r[o];
    }
  return { c: e.subarray(0, n), n: t };
}, Fi = function(r, t) {
  for (var e = 0, n = 0; n < t.length; ++n)
    e += r[n] * t[n];
  return e;
}, sp = function(r, t, e) {
  var n = e.length, s = gd(t + 2);
  r[s] = n & 255, r[s + 1] = n >> 8, r[s + 2] = r[s] ^ 255, r[s + 3] = r[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    r[s + i + 4] = e[i];
  return (s + 4 + n) * 8;
}, Fu = function(r, t, e, n, s, i, a, o, d, _, A) {
  Tr(t, A++, e), ++s[256];
  for (var g = cc(s, 15), y = g.t, S = g.l, O = cc(i, 15), R = O.t, F = O.l, z = Du(y), H = z.c, V = z.n, P = Du(R), M = P.c, Q = P.n, k = new Ye(19), U = 0; U < H.length; ++U)
    ++k[H[U] & 31];
  for (var U = 0; U < M.length; ++U)
    ++k[M[U] & 31];
  for (var G = cc(k, 7), j = G.t, J = G.l, q = 19; q > 4 && !j[Mc[q - 1]]; --q)
    ;
  var C = _ + 5 << 3, u = Fi(s, tn) + Fi(i, Xi) + a, h = Fi(s, y) + Fi(i, R) + a + 14 + 3 * q + Fi(k, j) + 2 * k[16] + 3 * k[17] + 7 * k[18];
  if (d >= 0 && C <= u && C <= h)
    return sp(t, A, r.subarray(d, d + _));
  var f, m, b, B;
  if (Tr(t, A, 1 + (h < u)), A += 2, h < u) {
    f = Ir(y, S, 0), m = y, b = Ir(R, F, 0), B = R;
    var N = Ir(j, J, 0);
    Tr(t, A, V - 257), Tr(t, A + 5, Q - 1), Tr(t, A + 10, q - 4), A += 14;
    for (var U = 0; U < q; ++U)
      Tr(t, A + 3 * U, j[Mc[U]]);
    A += 3 * q;
    for (var I = [H, M], p = 0; p < 2; ++p)
      for (var E = I[p], U = 0; U < E.length; ++U) {
        var tt = E[U] & 31;
        Tr(t, A, N[tt]), A += j[tt], tt > 15 && (Tr(t, A, E[U] >> 5 & 127), A += E[U] >> 12);
      }
  } else
    f = fw, m = tn, b = gw, B = Xi;
  for (var U = 0; U < o; ++U) {
    var et = n[U];
    if (et > 255) {
      var tt = et >> 18 & 31;
      Di(t, A, f[tt + 257]), A += m[tt + 257], tt > 7 && (Tr(t, A, et >> 23 & 31), A += uo[tt]);
      var nt = et & 31;
      Di(t, A, b[nt]), A += B[nt], nt > 3 && (Di(t, A, et >> 5 & 8191), A += ho[nt]);
    } else
      Di(t, A, f[et]), A += m[et];
  }
  return Di(t, A, f[256]), A + m[256];
}, bw = /* @__PURE__ */ new Ad([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), ip = /* @__PURE__ */ new xe(0), Iw = function(r, t, e, n, s, i) {
  var a = i.z || r.length, o = new xe(n + a + 5 * (1 + Math.ceil(a / 7e3)) + s), d = o.subarray(n, o.length - s), _ = i.l, A = (i.r || 0) & 7;
  if (t) {
    A && (d[0] = i.r >> 3);
    for (var g = bw[t - 1], y = g >> 13, S = g & 8191, O = (1 << e) - 1, R = i.p || new Ye(32768), F = i.h || new Ye(O + 1), z = Math.ceil(e / 3), H = 2 * z, V = function(St) {
      return (r[St] ^ r[St + 1] << z ^ r[St + 2] << H) & O;
    }, P = new Ad(25e3), M = new Ye(288), Q = new Ye(32), k = 0, U = 0, G = i.i || 0, j = 0, J = i.w || 0, q = 0; G + 2 < a; ++G) {
      var C = V(G), u = G & 32767, h = F[C];
      if (R[u] = h, F[C] = u, J <= G) {
        var f = a - G;
        if ((k > 7e3 || j > 24576) && (f > 423 || !_)) {
          A = Fu(r, d, 0, P, M, Q, U, j, q, G - q, A), j = k = U = 0, q = G;
          for (var m = 0; m < 286; ++m)
            M[m] = 0;
          for (var m = 0; m < 30; ++m)
            Q[m] = 0;
        }
        var b = 2, B = 0, N = S, I = u - h & 32767;
        if (f > 2 && C == V(G - I))
          for (var p = Math.min(y, f) - 1, E = Math.min(32767, G), tt = Math.min(258, f); I <= E && --N && u != h; ) {
            if (r[G + b] == r[G + b - I]) {
              for (var et = 0; et < tt && r[G + et] == r[G + et - I]; ++et)
                ;
              if (et > b) {
                if (b = et, B = I, et > p)
                  break;
                for (var nt = Math.min(I, et - 2), Ft = 0, m = 0; m < nt; ++m) {
                  var pt = G - I + m & 32767, Et = R[pt], tr = pt - Et & 32767;
                  tr > Ft && (Ft = tr, h = pt);
                }
              }
            }
            u = h, h = R[u], I += u - h & 32767;
          }
        if (B) {
          P[j++] = 268435456 | Pc[b] << 18 | Nu[B];
          var vt = Pc[b] & 31, Ct = Nu[B] & 31;
          U += uo[vt] + ho[Ct], ++M[257 + vt], ++Q[Ct], J = G + b, ++k;
        } else
          P[j++] = r[G], ++M[r[G]];
      }
    }
    for (G = Math.max(G, J); G < a; ++G)
      P[j++] = r[G], ++M[r[G]];
    A = Fu(r, d, _, P, M, Q, U, j, q, G - q, A), _ || (i.r = A & 7 | d[A / 8 | 0] << 3, A -= 7, i.h = F, i.p = R, i.i = G, i.w = J);
  } else {
    for (var G = i.w || 0; G < a + _; G += 65535) {
      var De = G + 65535;
      De >= a && (d[A / 8 | 0] = _, De = a), A = sp(d, A + 1, r.subarray(G, De));
    }
    i.i = a;
  }
  return np(o, 0, n + gd(A) + s);
}, Ew = /* @__PURE__ */ function() {
  for (var r = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var e = t, n = 9; --n; )
      e = (e & 1 && -306674912) ^ e >>> 1;
    r[t] = e;
  }
  return r;
}(), Cw = function() {
  var r = -1;
  return {
    p: function(t) {
      for (var e = r, n = 0; n < t.length; ++n)
        e = Ew[e & 255 ^ t[n]] ^ e >>> 8;
      r = e;
    },
    d: function() {
      return ~r;
    }
  };
}, vw = function(r, t, e, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), a = new xe(i.length + r.length);
    a.set(i), a.set(r, i.length), r = a, s.w = i.length;
  }
  return Iw(r, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(r.length))) * 1.5) : 20 : 12 + t.mem, e, n, s);
}, Uc = function(r, t, e) {
  for (; e; ++t)
    r[t] = e, e >>>= 8;
}, Bw = function(r, t) {
  var e = t.filename;
  if (r[0] = 31, r[1] = 139, r[2] = 8, r[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, r[9] = 3, t.mtime != 0 && Uc(r, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), e) {
    r[3] = 8;
    for (var n = 0; n <= e.length; ++n)
      r[n + 10] = e.charCodeAt(n);
  }
}, xw = function(r) {
  (r[0] != 31 || r[1] != 139 || r[2] != 8) && nr(6, "invalid gzip data");
  var t = r[3], e = 10;
  t & 4 && (e += (r[10] | r[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !r[e++])
    ;
  return e + (t & 2);
}, Rw = function(r) {
  var t = r.length;
  return (r[t - 4] | r[t - 3] << 8 | r[t - 2] << 16 | r[t - 1] << 24) >>> 0;
}, Sw = function(r) {
  return 10 + (r.filename ? r.filename.length + 1 : 0);
};
function Tw(r, t) {
  t || (t = {});
  var e = Cw(), n = r.length;
  e.p(r);
  var s = vw(r, t, Sw(t), 8), i = s.length;
  return Bw(s, t), Uc(s, i - 8, e.d()), Uc(s, i - 4, n), s;
}
function Nw(r, t) {
  var e = xw(r);
  return e + 8 > r.length && nr(6, "invalid gzip data"), yw(r.subarray(e, -8), { i: 2 }, new xe(Rw(r)), t);
}
var Dw = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Fw = 0;
try {
  Dw.decode(ip, { stream: !0 }), Fw = 1;
} catch {
}
var Qw = Object.defineProperty, Pt = (r, t) => Qw(r, "name", { value: t, configurable: !0 }), Ex = /* @__PURE__ */ Pt((r) => r.length ? r[0].toUpperCase() + r.slice(1) : r, "capitalizeString"), ap = /* @__PURE__ */ Pt((r, t) => {
  const e = [];
  for (let o = 0; o < r.length; o += t) {
    const d = new Uint8Array(t);
    d.set(r.slice(o, o + t)), e.push(d);
  }
  const n = e[e.length - 1], s = r.length % t, i = s + (8 - s % 8) % 8, a = n.slice(0, i);
  return e[e.length - 1] = a, e;
}, "chunkAndPadBytes"), Z = /* @__PURE__ */ Pt((r, t, e = !0) => {
  if (r instanceof Uint8Array)
    return e ? new Uint8Array(r) : r;
  if (typeof r == "string" && r.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const i = new Uint8Array((r.length - 2) / 2);
    let a = 2;
    for (let o = 0; o < i.length; o++)
      i[o] = parseInt(r.substring(a, a + 2), 16), a += 2;
    return i;
  }
  const s = `invalid data:${t ? ` ${t} -` : ""} ${r}
If you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.`;
  throw new v(L.INVALID_DATA, s);
}, "arrayify"), lo = /* @__PURE__ */ Pt((r) => {
  const t = r.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), e = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(e);
  return t.reduce((s, i) => (n.set(i, s), s + i.length), 0), n;
}, "concatBytes"), ot = /* @__PURE__ */ Pt((r) => {
  const t = r.map((e) => Z(e));
  return lo(t);
}, "concat"), Qu = "0123456789abcdef";
function X(r) {
  const t = Z(r);
  let e = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    e += Qu[(s & 240) >> 4] + Qu[s & 15];
  }
  return e;
}
Pt(X, "hexlify");
var Cx = /* @__PURE__ */ Pt((r) => {
  const e = [
    (n) => n.replace(/\s+/g, "-"),
    // spaces to -
    (n) => n.replace(/\./g, "-"),
    // dots to -
    (n) => n.replace(/_/g, "-"),
    // underscore to -
    (n) => n.replace(/-[a-z]/g, (s) => s.slice(-1).toUpperCase()),
    // delete '-' and capitalize the letter after them
    (n) => n.replace(/-/g, ""),
    // delete any '-' left
    (n) => n.replace(/^\d+/, ""),
    // removes leading digits
    (n) => n[0].toUpperCase() + n.slice(1)
    // capitalize first letter
  ].reduce((n, s) => s(n), r);
  if (e === "") {
    const n = `The provided string '${r}' results in an empty output after`.concat(
      " normalization, therefore, it can't normalize string."
    );
    throw new v(L.PARSE_FAILED, n);
  }
  return e;
}, "normalizeString"), Ow = 37, op = BigInt(2 ** 62) + BigInt(Ow), Mw = /* @__PURE__ */ Pt((r) => Math.floor(r / 1e3), "msToSeconds"), cp = /* @__PURE__ */ Pt((r) => r * 1e3, "secondsToMs"), Pw = /* @__PURE__ */ Pt((r) => Number(BigInt(r) - op), "tai64ToUnixSeconds"), Lw = /* @__PURE__ */ Pt((r) => String(BigInt(r) + op), "unixSecondsToTai64"), kw = /* @__PURE__ */ Pt((r) => cp(Pw(r)), "tai64ToUnixMilliseconds"), yr, dp = (yr = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(t) {
    return new yr(kw(t));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(t) {
    return new yr(t);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(t) {
    return new yr(cp(t));
  }
  /**
   * Hide the constructor to prevent direct instantiation.
   */
  constructor(t) {
    super(t);
  }
  /**
   * Returns the Tai64 timestamp.
   *
   * @returns the Tai64 timestamp
   */
  toTai64() {
    return Lw(this.toUnixSeconds());
  }
  /**
   * @returns the unix milliseconds timestamp
   */
  toUnixMilliseconds() {
    return this.getTime();
  }
  /**
   * @returns the unix seconds timestamp
   */
  toUnixSeconds() {
    return Mw(this.getTime());
  }
}, Pt(yr, "DateTime"), D(yr, "TAI64_NULL", ""), yr);
function up(r) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, r);
  });
}
Pt(up, "sleep");
var Uw = {
  chain_name: "local_testnet",
  consensus_parameters: {
    V2: {
      tx_params: {
        V1: {
          max_inputs: 255,
          max_outputs: 255,
          max_witnesses: 255,
          max_gas_per_tx: 3e7,
          max_size: 112640,
          max_bytecode_subsections: 256
        }
      },
      predicate_params: {
        V1: {
          max_predicate_length: 24576,
          max_predicate_data_length: 24576,
          max_message_data_length: 102400,
          max_gas_per_predicate: 1e6
        }
      },
      script_params: {
        V1: {
          max_script_length: 102400,
          max_script_data_length: 102400
        }
      },
      contract_params: {
        V1: {
          contract_max_size: 112640,
          max_storage_slots: 1760
        }
      },
      fee_params: {
        V1: {
          gas_price_factor: 115e4,
          gas_per_byte: 63
        }
      },
      chain_id: 0,
      gas_costs: {
        V4: {
          add: 2,
          addi: 2,
          and: 2,
          andi: 2,
          bal: 274,
          bhei: 2,
          bhsh: 2,
          burn: 7566,
          cb: 2,
          cfsi: 2,
          div: 2,
          divi: 2,
          eck1: 1489,
          ecr1: 20513,
          eq: 2,
          exp: 2,
          expi: 2,
          flag: 2,
          gm: 2,
          gt: 2,
          gtf: 3,
          ji: 2,
          jmp: 2,
          jne: 2,
          jnei: 2,
          jnzi: 2,
          jmpf: 2,
          jmpb: 2,
          jnzf: 2,
          jnzb: 2,
          jnef: 2,
          jneb: 2,
          lb: 2,
          log: 80,
          lt: 2,
          lw: 2,
          mint: 6566,
          mlog: 2,
          mod: 2,
          modi: 2,
          move: 2,
          movi: 1,
          mroo: 3,
          mul: 2,
          muli: 2,
          mldv: 3,
          noop: 1,
          not: 2,
          or: 1,
          ori: 2,
          poph: 2,
          popl: 2,
          pshh: 5,
          pshl: 5,
          ret_contract: 43,
          rvrt_contract: 39,
          sb: 2,
          sll: 2,
          slli: 2,
          srl: 2,
          srli: 2,
          srw: 237,
          sub: 2,
          subi: 2,
          sw: 2,
          sww: 5708,
          time: 106,
          tr: 9253,
          tro: 7199,
          wdcm: 2,
          wqcm: 2,
          wdop: 2,
          wqop: 3,
          wdml: 3,
          wqml: 3,
          wddv: 3,
          wqdv: 4,
          wdmd: 6,
          wqmd: 9,
          wdam: 6,
          wqam: 6,
          wdmm: 6,
          wqmm: 6,
          xor: 2,
          xori: 2,
          ecop: 2,
          aloc: {
            LightOperation: {
              base: 2,
              units_per_gas: 35
            }
          },
          bsiz: {
            LightOperation: {
              base: 25,
              units_per_gas: 564
            }
          },
          bldd: {
            LightOperation: {
              base: 33,
              units_per_gas: 130
            }
          },
          cfe: {
            LightOperation: {
              base: 10,
              units_per_gas: 62
            }
          },
          cfei: {
            LightOperation: {
              base: 10,
              units_per_gas: 66
            }
          },
          call: {
            LightOperation: {
              base: 6934,
              units_per_gas: 14
            }
          },
          ccp: {
            LightOperation: {
              base: 21,
              units_per_gas: 155
            }
          },
          croo: {
            LightOperation: {
              base: 69,
              units_per_gas: 4
            }
          },
          csiz: {
            LightOperation: {
              base: 25,
              units_per_gas: 580
            }
          },
          ed19: {
            LightOperation: {
              base: 3232,
              units_per_gas: 7
            }
          },
          k256: {
            LightOperation: {
              base: 21,
              units_per_gas: 6
            }
          },
          ldc: {
            LightOperation: {
              base: 84,
              units_per_gas: 113
            }
          },
          logd: {
            LightOperation: {
              base: 278,
              units_per_gas: 5
            }
          },
          mcl: {
            LightOperation: {
              base: 2,
              units_per_gas: 1282
            }
          },
          mcli: {
            LightOperation: {
              base: 2,
              units_per_gas: 1250
            }
          },
          mcp: {
            LightOperation: {
              base: 3,
              units_per_gas: 385
            }
          },
          mcpi: {
            LightOperation: {
              base: 7,
              units_per_gas: 585
            }
          },
          meq: {
            LightOperation: {
              base: 2,
              units_per_gas: 1234
            }
          },
          retd_contract: {
            LightOperation: {
              base: 227,
              units_per_gas: 5
            }
          },
          s256: {
            LightOperation: {
              base: 25,
              units_per_gas: 5
            }
          },
          scwq: {
            HeavyOperation: {
              base: 5666,
              gas_per_unit: 6628
            }
          },
          smo: {
            LightOperation: {
              base: 14635,
              units_per_gas: 3
            }
          },
          srwq: {
            HeavyOperation: {
              base: 245,
              gas_per_unit: 243
            }
          },
          swwq: {
            HeavyOperation: {
              base: 5661,
              gas_per_unit: 5776
            }
          },
          epar: {
            HeavyOperation: {
              base: 5661,
              gas_per_unit: 5776
            }
          },
          contract_root: {
            LightOperation: {
              base: 24,
              units_per_gas: 3
            }
          },
          state_root: {
            HeavyOperation: {
              base: 189,
              gas_per_unit: 96
            }
          },
          new_storage_per_byte: 63,
          vm_initialization: {
            LightOperation: {
              base: 3127,
              units_per_gas: 61
            }
          }
        }
      },
      base_asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07",
      block_gas_limit: 3e7,
      block_transaction_size_limit: 260096,
      privileged_address: "0000000000000000000000000000000000000000000000000000000000000000"
    }
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, zw = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, Gw = {
  coins: [],
  messages: [],
  contracts: [],
  blobs: [],
  block_height: 0,
  da_block_height: 0
}, vx = {
  chainConfig: Uw,
  metadata: zw,
  stateConfig: Gw
}, Bx = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function qe(r) {
  return r !== void 0;
}
Pt(qe, "isDefined");
var hp = x(0), zc = x(58), Qa = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", _a = null;
function lp(r) {
  if (_a == null) {
    _a = {};
    for (let e = 0; e < Qa.length; e++)
      _a[Qa[e]] = x(e);
  }
  const t = _a[r];
  if (t == null)
    throw new v(L.INVALID_DATA, `invalid base58 value ${r}`);
  return x(t);
}
Pt(lp, "getAlpha");
function wd(r) {
  const t = Z(r);
  let e = x(t), n = "";
  for (; e.gt(hp); )
    n = Qa[Number(e.mod(zc))] + n, e = e.div(zc);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = Qa[0] + n;
  return n;
}
Pt(wd, "encodeBase58");
function _p(r) {
  let t = hp;
  for (let e = 0; e < r.length; e++)
    t = t.mul(zc), t = t.add(lp(r[e].toString()));
  return t;
}
Pt(_p, "decodeBase58");
function _o(r, t, e) {
  const n = Z(r);
  if (e != null && e > n.length)
    throw new v(L.INVALID_DATA, "cannot slice beyond data bounds");
  return X(n.slice(t ?? 0, e ?? n.length));
}
Pt(_o, "dataSlice");
function hr(r, t = !0) {
  let e = r;
  t && (e = r.normalize("NFC"));
  const n = [];
  for (let s = 0; s < e.length; s += 1) {
    const i = e.charCodeAt(s);
    if (i < 128)
      n.push(i);
    else if (i < 2048)
      n.push(i >> 6 | 192), n.push(i & 63 | 128);
    else if ((i & 64512) === 55296) {
      s += 1;
      const a = e.charCodeAt(s);
      if (s >= e.length || (a & 64512) !== 56320)
        throw new v(
          L.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((i & 1023) << 10) + (a & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(i >> 12 | 224), n.push(i >> 6 & 63 | 128), n.push(i & 63 | 128);
  }
  return new Uint8Array(n);
}
Pt(hr, "toUtf8Bytes");
function Hr(r, t, e, n, s) {
  return console.log(`invalid codepoint at offset ${t}; ${r}, bytes: ${e}`), t;
}
Pt(Hr, "onError");
function pp(r) {
  return r.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
Pt(pp, "helper");
function fp(r) {
  const t = Z(r, "bytes"), e = [];
  let n = 0;
  for (; n < t.length; ) {
    const s = t[n++];
    if (!(s >> 7)) {
      e.push(s);
      continue;
    }
    let i = null, a = null;
    if ((s & 224) === 192)
      i = 1, a = 127;
    else if ((s & 240) === 224)
      i = 2, a = 2047;
    else if ((s & 248) === 240)
      i = 3, a = 65535;
    else {
      (s & 192) === 128 ? n += Hr("UNEXPECTED_CONTINUE", n - 1, t) : n += Hr("BAD_PREFIX", n - 1, t);
      continue;
    }
    if (n - 1 + i >= t.length) {
      n += Hr("OVERRUN", n - 1, t);
      continue;
    }
    let o = s & (1 << 8 - i - 1) - 1;
    for (let d = 0; d < i; d++) {
      const _ = t[n];
      if ((_ & 192) !== 128) {
        n += Hr("MISSING_CONTINUE", n, t), o = null;
        break;
      }
      o = o << 6 | _ & 63, n++;
    }
    if (o !== null) {
      if (o > 1114111) {
        n += Hr("OUT_OF_RANGE", n - 1 - i, t);
        continue;
      }
      if (o >= 55296 && o <= 57343) {
        n += Hr("UTF16_SURROGATE", n - 1 - i, t);
        continue;
      }
      if (o <= a) {
        n += Hr("OVERLONG", n - 1 - i, t);
        continue;
      }
      e.push(o);
    }
  }
  return e;
}
Pt(fp, "getUtf8CodePoints");
function po(r) {
  return pp(fp(r));
}
Pt(po, "toUtf8String");
var xx = /* @__PURE__ */ Pt((r) => {
  if (!r)
    return "";
  const t = Z(r), e = Tw(t, { mtime: 0 }), n = String.fromCharCode.apply(
    null,
    new Uint8Array(e)
  );
  return btoa(n);
}, "compressBytecode"), Vw = /* @__PURE__ */ Pt((r) => {
  const t = atob(r), e = new Uint8Array(t.length).map(
    (s, i) => t.charCodeAt(i)
  );
  return Nw(e);
}, "decompressBytecode");
function Ap(r) {
  throw new Error("Didn't expect to get here");
}
Pt(Ap, "assertUnreachable");
function Ve(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error("positive integer expected, got " + r);
}
function Yw(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function na(r, ...t) {
  if (!Yw(r))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + r.length);
}
function gp(r) {
  if (typeof r != "function" || typeof r.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ve(r.outputLen), Ve(r.blockLen);
}
function fi(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function wp(r, t) {
  na(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
const Yn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ia(r) {
  return new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
}
function Ea(r) {
  return new DataView(r.buffer, r.byteOffset, r.byteLength);
}
function _r(r, t) {
  return r << 32 - t | r >>> t;
}
function bt(r, t) {
  return r << t | r >>> 32 - t >>> 0;
}
const Oa = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Hw(r) {
  return r << 24 & 4278190080 | r << 8 & 16711680 | r >>> 8 & 65280 | r >>> 24 & 255;
}
function Ma(r) {
  for (let t = 0; t < r.length; t++)
    r[t] = Hw(r[t]);
}
function Ww(r) {
  if (typeof r != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof r);
  return new Uint8Array(new TextEncoder().encode(r));
}
function Ai(r) {
  return typeof r == "string" && (r = Ww(r)), na(r), r;
}
function Xw(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    na(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, s = 0; n < r.length; n++) {
    const i = r[n];
    e.set(i, s), s += i.length;
  }
  return e;
}
class md {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function mp(r, t) {
  if (t !== void 0 && {}.toString.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(r, t);
}
function fo(r) {
  const t = (n) => r().update(Ai(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function Zw(r = 32) {
  if (Yn && typeof Yn.getRandomValues == "function")
    return Yn.getRandomValues(new Uint8Array(r));
  if (Yn && typeof Yn.randomBytes == "function")
    return Yn.randomBytes(r);
  throw new Error("crypto.getRandomValues must be defined");
}
class yp extends md {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, gp(t);
    const n = Ai(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(n.length > s ? t.create().update(n).digest() : n);
    for (let a = 0; a < i.length; a++)
      i[a] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let a = 0; a < i.length; a++)
      i[a] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return fi(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    fi(this), na(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: n, finished: s, destroyed: i, blockLen: a, outputLen: o } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = a, t.outputLen = o, t.oHash = e._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const Ao = (r, t, e) => new yp(r, t).update(e).digest();
Ao.create = (r, t) => new yp(r, t);
function jw(r, t, e, n) {
  gp(r);
  const s = mp({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: a, asyncTick: o } = s;
  if (Ve(i), Ve(a), Ve(o), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Ai(t), _ = Ai(e), A = new Uint8Array(a), g = Ao.create(r, d), y = g._cloneInto().update(_);
  return { c: i, dkLen: a, asyncTick: o, DK: A, PRF: g, PRFSalt: y };
}
function Jw(r, t, e, n, s) {
  return r.destroy(), t.destroy(), n && n.destroy(), s.fill(0), e;
}
function yd(r, t, e, n) {
  const { c: s, dkLen: i, DK: a, PRF: o, PRFSalt: d } = jw(r, t, e, n);
  let _;
  const A = new Uint8Array(4), g = Ea(A), y = new Uint8Array(o.outputLen);
  for (let S = 1, O = 0; O < i; S++, O += o.outputLen) {
    const R = a.subarray(O, O + o.outputLen);
    g.setInt32(0, S, !1), (_ = d._cloneInto(_)).update(A).digestInto(y), R.set(y.subarray(0, R.length));
    for (let F = 1; F < s; F++) {
      o._cloneInto(_).update(y).digestInto(y);
      for (let z = 0; z < R.length; z++)
        R[z] ^= y[z];
    }
  }
  return Jw(o, d, a, _, y);
}
function qw(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const s = BigInt(32), i = BigInt(4294967295), a = Number(e >> s & i), o = Number(e & i), d = n ? 4 : 0, _ = n ? 0 : 4;
  r.setUint32(t + d, a, n), r.setUint32(t + _, o, n);
}
function $w(r, t, e) {
  return r & t ^ ~r & e;
}
function Kw(r, t, e) {
  return r & t ^ r & e ^ t & e;
}
class bd extends md {
  constructor(t, e, n, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ea(this.buffer);
  }
  update(t) {
    fi(this);
    const { view: e, buffer: n, blockLen: s } = this;
    t = Ai(t);
    const i = t.length;
    for (let a = 0; a < i; ) {
      const o = Math.min(s - this.pos, i - a);
      if (o === s) {
        const d = Ea(t);
        for (; s <= i - a; a += s)
          this.process(d, a);
        continue;
      }
      n.set(t.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    fi(this), wp(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: s, isLE: i } = this;
    let { pos: a } = this;
    e[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(n, 0), a = 0);
    for (let g = a; g < s; g++)
      e[g] = 0;
    qw(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const o = Ea(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const _ = d / 4, A = this.get();
    if (_ > A.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < _; g++)
      o.setUint32(4 * g, A[g], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const n = t.slice(0, e);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: n, length: s, finished: i, destroyed: a, pos: o } = this;
    return t.length = s, t.pos = o, t.finished = i, t.destroyed = a, s % e && t.buffer.set(n), t;
  }
}
const t0 = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), zr = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Gr = /* @__PURE__ */ new Uint32Array(64);
class e0 extends bd {
  constructor() {
    super(64, 32, 8, !1), this.A = zr[0] | 0, this.B = zr[1] | 0, this.C = zr[2] | 0, this.D = zr[3] | 0, this.E = zr[4] | 0, this.F = zr[5] | 0, this.G = zr[6] | 0, this.H = zr[7] | 0;
  }
  get() {
    const { A: t, B: e, C: n, D: s, E: i, F: a, G: o, H: d } = this;
    return [t, e, n, s, i, a, o, d];
  }
  // prettier-ignore
  set(t, e, n, s, i, a, o, d) {
    this.A = t | 0, this.B = e | 0, this.C = n | 0, this.D = s | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = d | 0;
  }
  process(t, e) {
    for (let g = 0; g < 16; g++, e += 4)
      Gr[g] = t.getUint32(e, !1);
    for (let g = 16; g < 64; g++) {
      const y = Gr[g - 15], S = Gr[g - 2], O = _r(y, 7) ^ _r(y, 18) ^ y >>> 3, R = _r(S, 17) ^ _r(S, 19) ^ S >>> 10;
      Gr[g] = R + Gr[g - 7] + O + Gr[g - 16] | 0;
    }
    let { A: n, B: s, C: i, D: a, E: o, F: d, G: _, H: A } = this;
    for (let g = 0; g < 64; g++) {
      const y = _r(o, 6) ^ _r(o, 11) ^ _r(o, 25), S = A + y + $w(o, d, _) + t0[g] + Gr[g] | 0, R = (_r(n, 2) ^ _r(n, 13) ^ _r(n, 22)) + Kw(n, s, i) | 0;
      A = _, _ = d, d = o, o = a + S | 0, a = i, i = s, s = n, n = S + R | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, d = d + this.F | 0, _ = _ + this.G | 0, A = A + this.H | 0, this.set(n, s, i, a, o, d, _, A);
  }
  roundClean() {
    Gr.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const nn = /* @__PURE__ */ fo(() => new e0());
function Ou(r, t, e, n, s, i) {
  let a = r[t++] ^ e[n++], o = r[t++] ^ e[n++], d = r[t++] ^ e[n++], _ = r[t++] ^ e[n++], A = r[t++] ^ e[n++], g = r[t++] ^ e[n++], y = r[t++] ^ e[n++], S = r[t++] ^ e[n++], O = r[t++] ^ e[n++], R = r[t++] ^ e[n++], F = r[t++] ^ e[n++], z = r[t++] ^ e[n++], H = r[t++] ^ e[n++], V = r[t++] ^ e[n++], P = r[t++] ^ e[n++], M = r[t++] ^ e[n++], Q = a, k = o, U = d, G = _, j = A, J = g, q = y, C = S, u = O, h = R, f = F, m = z, b = H, B = V, N = P, I = M;
  for (let p = 0; p < 8; p += 2)
    j ^= bt(Q + b | 0, 7), u ^= bt(j + Q | 0, 9), b ^= bt(u + j | 0, 13), Q ^= bt(b + u | 0, 18), h ^= bt(J + k | 0, 7), B ^= bt(h + J | 0, 9), k ^= bt(B + h | 0, 13), J ^= bt(k + B | 0, 18), N ^= bt(f + q | 0, 7), U ^= bt(N + f | 0, 9), q ^= bt(U + N | 0, 13), f ^= bt(q + U | 0, 18), G ^= bt(I + m | 0, 7), C ^= bt(G + I | 0, 9), m ^= bt(C + G | 0, 13), I ^= bt(m + C | 0, 18), k ^= bt(Q + G | 0, 7), U ^= bt(k + Q | 0, 9), G ^= bt(U + k | 0, 13), Q ^= bt(G + U | 0, 18), q ^= bt(J + j | 0, 7), C ^= bt(q + J | 0, 9), j ^= bt(C + q | 0, 13), J ^= bt(j + C | 0, 18), m ^= bt(f + h | 0, 7), u ^= bt(m + f | 0, 9), h ^= bt(u + m | 0, 13), f ^= bt(h + u | 0, 18), b ^= bt(I + N | 0, 7), B ^= bt(b + I | 0, 9), N ^= bt(B + b | 0, 13), I ^= bt(N + B | 0, 18);
  s[i++] = a + Q | 0, s[i++] = o + k | 0, s[i++] = d + U | 0, s[i++] = _ + G | 0, s[i++] = A + j | 0, s[i++] = g + J | 0, s[i++] = y + q | 0, s[i++] = S + C | 0, s[i++] = O + u | 0, s[i++] = R + h | 0, s[i++] = F + f | 0, s[i++] = z + m | 0, s[i++] = H + b | 0, s[i++] = V + B | 0, s[i++] = P + N | 0, s[i++] = M + I | 0;
}
function dc(r, t, e, n, s) {
  let i = n + 0, a = n + 16 * s;
  for (let o = 0; o < 16; o++)
    e[a + o] = r[t + (2 * s - 1) * 16 + o];
  for (let o = 0; o < s; o++, i += 16, t += 16)
    Ou(e, a, r, t, e, i), o > 0 && (a += 16), Ou(e, i, r, t += 16, e, a);
}
function r0(r, t, e) {
  const n = mp({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, e), { N: s, r: i, p: a, dkLen: o, asyncTick: d, maxmem: _, onProgress: A } = n;
  if (Ve(s), Ve(i), Ve(a), Ve(o), Ve(d), Ve(_), A !== void 0 && typeof A != "function")
    throw new Error("progressCb should be function");
  const g = 128 * i, y = g / 4;
  if (s <= 1 || s & s - 1 || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
  if (a < 0 || a > (2 ** 32 - 1) * 32 / g)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (o < 0 || o > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  if (g * (s + a) > _)
    throw new Error("Scrypt: memused is bigger than maxMem. Expected 128 * r * (N + p) > maxmem of " + _);
  const O = yd(nn, r, t, { c: 1, dkLen: g * a }), R = Ia(O), F = Ia(new Uint8Array(g * s)), z = Ia(new Uint8Array(g));
  let H = () => {
  };
  if (A) {
    const V = 2 * s * a, P = Math.max(Math.floor(V / 1e4), 1);
    let M = 0;
    H = () => {
      M++, A && (!(M % P) || M === V) && A(M / V);
    };
  }
  return { N: s, r: i, p: a, dkLen: o, blockSize32: y, V: F, B32: R, B: O, tmp: z, blockMixCb: H, asyncTick: d };
}
function n0(r, t, e, n, s) {
  const i = yd(nn, r, e, { c: 1, dkLen: t });
  return e.fill(0), n.fill(0), s.fill(0), i;
}
function s0(r, t, e) {
  const { N: n, r: s, p: i, dkLen: a, blockSize32: o, V: d, B32: _, B: A, tmp: g, blockMixCb: y } = r0(r, t, e);
  Oa || Ma(_);
  for (let S = 0; S < i; S++) {
    const O = o * S;
    for (let R = 0; R < o; R++)
      d[R] = _[O + R];
    for (let R = 0, F = 0; R < n - 1; R++)
      dc(d, F, d, F += o, s), y();
    dc(d, (n - 1) * o, _, O, s), y();
    for (let R = 0; R < n; R++) {
      const F = _[O + o - 16] % n;
      for (let z = 0; z < o; z++)
        g[z] = _[O + z] ^ d[F * o + z];
      dc(g, 0, _, O, s), y();
    }
  }
  return Oa || Ma(_), n0(r, a, A, d, g);
}
const pa = /* @__PURE__ */ BigInt(2 ** 32 - 1), Gc = /* @__PURE__ */ BigInt(32);
function bp(r, t = !1) {
  return t ? { h: Number(r & pa), l: Number(r >> Gc & pa) } : { h: Number(r >> Gc & pa) | 0, l: Number(r & pa) | 0 };
}
function Ip(r, t = !1) {
  let e = new Uint32Array(r.length), n = new Uint32Array(r.length);
  for (let s = 0; s < r.length; s++) {
    const { h: i, l: a } = bp(r[s], t);
    [e[s], n[s]] = [i, a];
  }
  return [e, n];
}
const i0 = (r, t) => BigInt(r >>> 0) << Gc | BigInt(t >>> 0), a0 = (r, t, e) => r >>> e, o0 = (r, t, e) => r << 32 - e | t >>> e, c0 = (r, t, e) => r >>> e | t << 32 - e, d0 = (r, t, e) => r << 32 - e | t >>> e, u0 = (r, t, e) => r << 64 - e | t >>> e - 32, h0 = (r, t, e) => r >>> e - 32 | t << 64 - e, l0 = (r, t) => t, _0 = (r, t) => r, Ep = (r, t, e) => r << e | t >>> 32 - e, Cp = (r, t, e) => t << e | r >>> 32 - e, vp = (r, t, e) => t << e - 32 | r >>> 64 - e, Bp = (r, t, e) => r << e - 32 | t >>> 64 - e;
function p0(r, t, e, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: r + e + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const f0 = (r, t, e) => (r >>> 0) + (t >>> 0) + (e >>> 0), A0 = (r, t, e, n) => t + e + n + (r / 2 ** 32 | 0) | 0, g0 = (r, t, e, n) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0), w0 = (r, t, e, n, s) => t + e + n + s + (r / 2 ** 32 | 0) | 0, m0 = (r, t, e, n, s) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0) + (s >>> 0), y0 = (r, t, e, n, s, i) => t + e + n + s + i + (r / 2 ** 32 | 0) | 0, ft = {
  fromBig: bp,
  split: Ip,
  toBig: i0,
  shrSH: a0,
  shrSL: o0,
  rotrSH: c0,
  rotrSL: d0,
  rotrBH: u0,
  rotrBL: h0,
  rotr32H: l0,
  rotr32L: _0,
  rotlSH: Ep,
  rotlSL: Cp,
  rotlBH: vp,
  rotlBL: Bp,
  add: p0,
  add3L: f0,
  add3H: A0,
  add4L: g0,
  add4H: w0,
  add5H: y0,
  add5L: m0
}, xp = [], Rp = [], Sp = [], b0 = /* @__PURE__ */ BigInt(0), Qi = /* @__PURE__ */ BigInt(1), I0 = /* @__PURE__ */ BigInt(2), E0 = /* @__PURE__ */ BigInt(7), C0 = /* @__PURE__ */ BigInt(256), v0 = /* @__PURE__ */ BigInt(113);
for (let r = 0, t = Qi, e = 1, n = 0; r < 24; r++) {
  [e, n] = [n, (2 * e + 3 * n) % 5], xp.push(2 * (5 * n + e)), Rp.push((r + 1) * (r + 2) / 2 % 64);
  let s = b0;
  for (let i = 0; i < 7; i++)
    t = (t << Qi ^ (t >> E0) * v0) % C0, t & I0 && (s ^= Qi << (Qi << /* @__PURE__ */ BigInt(i)) - Qi);
  Sp.push(s);
}
const [B0, x0] = /* @__PURE__ */ Ip(Sp, !0), Mu = (r, t, e) => e > 32 ? vp(r, t, e) : Ep(r, t, e), Pu = (r, t, e) => e > 32 ? Bp(r, t, e) : Cp(r, t, e);
function R0(r, t = 24) {
  const e = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let a = 0; a < 10; a++)
      e[a] = r[a] ^ r[a + 10] ^ r[a + 20] ^ r[a + 30] ^ r[a + 40];
    for (let a = 0; a < 10; a += 2) {
      const o = (a + 8) % 10, d = (a + 2) % 10, _ = e[d], A = e[d + 1], g = Mu(_, A, 1) ^ e[o], y = Pu(_, A, 1) ^ e[o + 1];
      for (let S = 0; S < 50; S += 10)
        r[a + S] ^= g, r[a + S + 1] ^= y;
    }
    let s = r[2], i = r[3];
    for (let a = 0; a < 24; a++) {
      const o = Rp[a], d = Mu(s, i, o), _ = Pu(s, i, o), A = xp[a];
      s = r[A], i = r[A + 1], r[A] = d, r[A + 1] = _;
    }
    for (let a = 0; a < 50; a += 10) {
      for (let o = 0; o < 10; o++)
        e[o] = r[a + o];
      for (let o = 0; o < 10; o++)
        r[a + o] ^= ~e[(o + 2) % 10] & e[(o + 4) % 10];
    }
    r[0] ^= B0[n], r[1] ^= x0[n];
  }
  e.fill(0);
}
class Id extends md {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Ve(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ia(this.state);
  }
  keccak() {
    Oa || Ma(this.state32), R0(this.state32, this.rounds), Oa || Ma(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    fi(this);
    const { blockLen: e, state: n } = this;
    t = Ai(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const a = Math.min(e - this.pos, s - i);
      for (let o = 0; o < a; o++)
        n[this.pos++] ^= t[i++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: e, pos: n, blockLen: s } = this;
    t[n] ^= e, e & 128 && n === s - 1 && this.keccak(), t[s - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    fi(this, !1), na(t), this.finish();
    const e = this.state, { blockLen: n } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= n && this.keccak();
      const a = Math.min(n - this.posOut, i - s);
      t.set(e.subarray(this.posOut, this.posOut + a), s), this.posOut += a, s += a;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Ve(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (wp(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: e, suffix: n, outputLen: s, rounds: i, enableXOF: a } = this;
    return t || (t = new Id(e, n, s, a, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = a, t.destroyed = this.destroyed, t;
  }
}
const S0 = (r, t, e) => fo(() => new Id(t, r, e)), T0 = /* @__PURE__ */ S0(1, 136, 256 / 8), N0 = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), Tp = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((r, t) => t)), D0 = /* @__PURE__ */ Tp.map((r) => (9 * r + 5) % 16);
let Ed = [Tp], Cd = [D0];
for (let r = 0; r < 4; r++)
  for (let t of [Ed, Cd])
    t.push(t[r].map((e) => N0[e]));
const Np = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((r) => new Uint8Array(r)), F0 = /* @__PURE__ */ Ed.map((r, t) => r.map((e) => Np[t][e])), Q0 = /* @__PURE__ */ Cd.map((r, t) => r.map((e) => Np[t][e])), O0 = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), M0 = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function Lu(r, t, e, n) {
  return r === 0 ? t ^ e ^ n : r === 1 ? t & e | ~t & n : r === 2 ? (t | ~e) ^ n : r === 3 ? t & n | e & ~n : t ^ (e | ~n);
}
const fa = /* @__PURE__ */ new Uint32Array(16);
class P0 extends bd {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: t, h1: e, h2: n, h3: s, h4: i } = this;
    return [t, e, n, s, i];
  }
  set(t, e, n, s, i) {
    this.h0 = t | 0, this.h1 = e | 0, this.h2 = n | 0, this.h3 = s | 0, this.h4 = i | 0;
  }
  process(t, e) {
    for (let S = 0; S < 16; S++, e += 4)
      fa[S] = t.getUint32(e, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, a = i, o = this.h2 | 0, d = o, _ = this.h3 | 0, A = _, g = this.h4 | 0, y = g;
    for (let S = 0; S < 5; S++) {
      const O = 4 - S, R = O0[S], F = M0[S], z = Ed[S], H = Cd[S], V = F0[S], P = Q0[S];
      for (let M = 0; M < 16; M++) {
        const Q = bt(n + Lu(S, i, o, _) + fa[z[M]] + R, V[M]) + g | 0;
        n = g, g = _, _ = bt(o, 10) | 0, o = i, i = Q;
      }
      for (let M = 0; M < 16; M++) {
        const Q = bt(s + Lu(O, a, d, A) + fa[H[M]] + F, P[M]) + y | 0;
        s = y, y = A, A = bt(d, 10) | 0, d = a, a = Q;
      }
    }
    this.set(this.h1 + o + A | 0, this.h2 + _ + y | 0, this.h3 + g + s | 0, this.h4 + n + a | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    fa.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const L0 = /* @__PURE__ */ fo(() => new P0()), [k0, U0] = ft.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((r) => BigInt(r))), Vr = /* @__PURE__ */ new Uint32Array(80), Yr = /* @__PURE__ */ new Uint32Array(80);
class z0 extends bd {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: n, Bl: s, Ch: i, Cl: a, Dh: o, Dl: d, Eh: _, El: A, Fh: g, Fl: y, Gh: S, Gl: O, Hh: R, Hl: F } = this;
    return [t, e, n, s, i, a, o, d, _, A, g, y, S, O, R, F];
  }
  // prettier-ignore
  set(t, e, n, s, i, a, o, d, _, A, g, y, S, O, R, F) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = o | 0, this.Dl = d | 0, this.Eh = _ | 0, this.El = A | 0, this.Fh = g | 0, this.Fl = y | 0, this.Gh = S | 0, this.Gl = O | 0, this.Hh = R | 0, this.Hl = F | 0;
  }
  process(t, e) {
    for (let V = 0; V < 16; V++, e += 4)
      Vr[V] = t.getUint32(e), Yr[V] = t.getUint32(e += 4);
    for (let V = 16; V < 80; V++) {
      const P = Vr[V - 15] | 0, M = Yr[V - 15] | 0, Q = ft.rotrSH(P, M, 1) ^ ft.rotrSH(P, M, 8) ^ ft.shrSH(P, M, 7), k = ft.rotrSL(P, M, 1) ^ ft.rotrSL(P, M, 8) ^ ft.shrSL(P, M, 7), U = Vr[V - 2] | 0, G = Yr[V - 2] | 0, j = ft.rotrSH(U, G, 19) ^ ft.rotrBH(U, G, 61) ^ ft.shrSH(U, G, 6), J = ft.rotrSL(U, G, 19) ^ ft.rotrBL(U, G, 61) ^ ft.shrSL(U, G, 6), q = ft.add4L(k, J, Yr[V - 7], Yr[V - 16]), C = ft.add4H(q, Q, j, Vr[V - 7], Vr[V - 16]);
      Vr[V] = C | 0, Yr[V] = q | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: a, Ch: o, Cl: d, Dh: _, Dl: A, Eh: g, El: y, Fh: S, Fl: O, Gh: R, Gl: F, Hh: z, Hl: H } = this;
    for (let V = 0; V < 80; V++) {
      const P = ft.rotrSH(g, y, 14) ^ ft.rotrSH(g, y, 18) ^ ft.rotrBH(g, y, 41), M = ft.rotrSL(g, y, 14) ^ ft.rotrSL(g, y, 18) ^ ft.rotrBL(g, y, 41), Q = g & S ^ ~g & R, k = y & O ^ ~y & F, U = ft.add5L(H, M, k, U0[V], Yr[V]), G = ft.add5H(U, z, P, Q, k0[V], Vr[V]), j = U | 0, J = ft.rotrSH(n, s, 28) ^ ft.rotrBH(n, s, 34) ^ ft.rotrBH(n, s, 39), q = ft.rotrSL(n, s, 28) ^ ft.rotrBL(n, s, 34) ^ ft.rotrBL(n, s, 39), C = n & i ^ n & o ^ i & o, u = s & a ^ s & d ^ a & d;
      z = R | 0, H = F | 0, R = S | 0, F = O | 0, S = g | 0, O = y | 0, { h: g, l: y } = ft.add(_ | 0, A | 0, G | 0, j | 0), _ = o | 0, A = d | 0, o = i | 0, d = a | 0, i = n | 0, a = s | 0;
      const h = ft.add3L(j, q, u);
      n = ft.add3H(h, G, J, C), s = h | 0;
    }
    ({ h: n, l: s } = ft.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: a } = ft.add(this.Bh | 0, this.Bl | 0, i | 0, a | 0), { h: o, l: d } = ft.add(this.Ch | 0, this.Cl | 0, o | 0, d | 0), { h: _, l: A } = ft.add(this.Dh | 0, this.Dl | 0, _ | 0, A | 0), { h: g, l: y } = ft.add(this.Eh | 0, this.El | 0, g | 0, y | 0), { h: S, l: O } = ft.add(this.Fh | 0, this.Fl | 0, S | 0, O | 0), { h: R, l: F } = ft.add(this.Gh | 0, this.Gl | 0, R | 0, F | 0), { h: z, l: H } = ft.add(this.Hh | 0, this.Hl | 0, z | 0, H | 0), this.set(n, s, i, a, o, d, _, A, g, y, S, O, R, F, z, H);
  }
  roundClean() {
    Vr.fill(0), Yr.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Dp = /* @__PURE__ */ fo(() => new z0());
var G0 = Object.defineProperty, Le = (r, t) => G0(r, "name", { value: t, configurable: !0 }), V0 = /* @__PURE__ */ Le((r) => {
  const { password: t, salt: e, n, p: s, r: i, dklen: a } = r;
  return s0(t, e, { N: n, r: i, p: s, dkLen: a });
}, "scrypt"), Y0 = /* @__PURE__ */ Le((r) => T0(r), "keccak256");
function Fp(r) {
  const t = Z(r, "data");
  return L0(t);
}
Le(Fp, "ripemd160");
var $n = /* @__PURE__ */ Le((r, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextEncoder().encode(r);
    case "base64": {
      const e = atob(r), n = e.length;
      return new Uint8Array(n).map((i, a) => e.charCodeAt(a));
    }
    case "hex":
    default: {
      const e = r.length / 2;
      return new Uint8Array(e).map((s, i) => {
        const a = i * 2;
        return parseInt(r.substring(a, a + 2), 16);
      });
    }
  }
}, "bufferFromString"), Qp = /* @__PURE__ */ Le((r, t, e, n, s) => {
  const i = { sha256: nn, sha512: Dp }[s];
  return X(yd(i, r, t, { c: e, dkLen: n }));
}, "pbkdf2"), { crypto: sa, btoa: Op } = globalThis;
if (!sa)
  throw new v(
    L.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Op)
  throw new v(
    L.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Vc = /* @__PURE__ */ Le((r) => sa.getRandomValues(new Uint8Array(r)), "randomBytes"), Ca = /* @__PURE__ */ Le((r, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(r);
    case "base64": {
      const e = String.fromCharCode.apply(null, new Uint8Array(r));
      return Op(e);
    }
    case "hex":
    default: {
      let e = "";
      for (let n = 0; n < r.length; n += 1) {
        const s = r[n].toString(16);
        e += s.length === 1 ? `0${s}` : s;
      }
      return e;
    }
  }
}, "stringFromBuffer"), Mp = "AES-CTR", vd = /* @__PURE__ */ Le((r, t) => {
  const e = $n(String(r).normalize("NFKC"), "utf-8"), n = Qp(e, t, 1e5, 32, "sha256");
  return Z(n);
}, "keyFromPassword"), H0 = /* @__PURE__ */ Le(async (r, t) => {
  const e = Vc(16), n = Vc(32), s = vd(r, n), i = JSON.stringify(t), a = $n(i, "utf-8"), o = {
    name: Mp,
    counter: e,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, o, !1, ["encrypt"]), _ = await crypto.subtle.encrypt(o, d, a);
  return {
    data: Ca(new Uint8Array(_)),
    iv: Ca(e),
    salt: Ca(n)
  };
}, "encrypt"), W0 = /* @__PURE__ */ Le(async (r, t) => {
  const e = $n(t.iv), n = $n(t.salt), s = vd(r, n), i = $n(t.data), a = {
    name: Mp,
    counter: e,
    length: 64
  }, o = await crypto.subtle.importKey("raw", s, a, !1, ["decrypt"]), d = await crypto.subtle.decrypt(a, o, i), _ = new TextDecoder().decode(d);
  try {
    return JSON.parse(_);
  } catch {
    throw new v(L.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, "decrypt"), X0 = /* @__PURE__ */ Le(async (r, t, e) => {
  const n = sa.subtle, s = new Uint8Array(t.subarray(0, 16)), i = e, a = r, o = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await n.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    o,
    a
  );
  return new Uint8Array(d);
}, "encryptJsonWalletData"), Z0 = /* @__PURE__ */ Le(async (r, t, e) => {
  const n = sa.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(e).buffer, a = new Uint8Array(r).buffer, o = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await n.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    o,
    a
  );
  return new Uint8Array(d);
}, "decryptJsonWalletData"), j0 = /* @__PURE__ */ Le((r, t, e) => {
  const n = r === "sha256" ? nn : Dp, s = Ao.create(n, t).update(e).digest();
  return X(s);
}, "computeHmac"), J0 = /* @__PURE__ */ Le(() => sa.randomUUID(), "randomUUID"), q0 = {
  bufferFromString: $n,
  stringFromBuffer: Ca,
  decrypt: W0,
  encrypt: H0,
  keyFromPassword: vd,
  randomBytes: Vc,
  scrypt: V0,
  keccak256: Y0,
  decryptJsonWalletData: Z0,
  encryptJsonWalletData: X0,
  computeHmac: j0,
  pbkdf2: Qp,
  ripemd160: Fp,
  randomUUID: J0
}, $0 = q0, {
  bufferFromString: hn,
  decrypt: K0,
  encrypt: tm,
  keyFromPassword: Rx,
  randomBytes: $e,
  stringFromBuffer: Li,
  scrypt: Pp,
  keccak256: Lp,
  decryptJsonWalletData: em,
  encryptJsonWalletData: rm,
  pbkdf2: nm,
  computeHmac: kp,
  ripemd160: sm,
  randomUUID: im
} = $0, am = Object.defineProperty, go = (r, t) => am(r, "name", { value: t, configurable: !0 }), om = `Fuel Signed Message:
`;
function Gt(r) {
  return X(nn(Z(r)));
}
go(Gt, "sha256");
function lr(r) {
  return Gt(r);
}
go(lr, "hash");
function Up(r) {
  const t = BigInt(r), e = new ArrayBuffer(8), n = new DataView(e);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
go(Up, "uint64ToBytesBE");
function zp(r) {
  if (typeof r == "string")
    return Gt(hr(r));
  const { personalSign: t } = r, e = typeof t == "string" ? hr(t) : t, n = ot([
    hr(om),
    hr(String(e.length)),
    e
  ]);
  return X(Gt(n));
}
go(zp, "hashMessage");
var cm = Object.defineProperty, _t = (r, t) => cm(r, "name", { value: t, configurable: !0 }), Kn, mt = (Kn = class {
  constructor(t, e, n) {
    D(this, "name");
    D(this, "type");
    D(this, "encodedLength");
    this.name = t, this.type = e, this.encodedLength = n;
  }
}, _t(Kn, "Coder"), Kn), dm = "u8", um = "u16", hm = "u32", lm = "u64", _m = "u256", pm = "raw untyped ptr", fm = "raw untyped slice", Am = "bool", gm = "b256", wm = "struct std::b512::B512", Pa = "enum std::option::Option", mm = "struct std::vec::Vec", ym = "struct std::bytes::Bytes", bm = "struct std::string::String", Im = "str", ia = "()", Gp = /^enum (std::option::)?Option$/m, Vp = /^str\[(?<length>[0-9]+)\]/, Yc = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Yp = /^struct.+/, Hp = /^enum.+$/, Em = /^\((?<items>.*)\)$/, Cm = /^generic.+$/, vm = /([^\s]+)$/m, gi = "1", ht = 8, Lr = 32, La = Lr + 2, Zi = Lr, Hc = Lr, Bm = Lr, xm = ht * 4, Rm = ht * 2, Wp = 2 ** 32 - 1, Xp = /* @__PURE__ */ _t(({ maxInputs: r }) => Lr + // Tx ID
Zi + // Base asset ID
// Asset ID/Balance coin input pairs
r * (Zi + ht) + ht, "calculateVmTxMemory"), Zp = ht + // Identifier
ht + // Gas limit
ht + // Script size
ht + // Script data size
ht + // Policies
ht + // Inputs size
ht + // Outputs size
ht + // Witnesses size
Lr, Sx = ht + // Identifier
xm + // Utxo Length
ht + // Output Index
Bm + // Owner
ht + // Amount
Zi + // Asset id
Rm + // TxPointer
ht + // Witnesses index
ht + // Predicate size
ht + // Predicate data size
ht, ku = /* @__PURE__ */ _t((r) => r instanceof Uint8Array, "isUint8Array"), Bi = /* @__PURE__ */ _t((r) => {
  const t = Array.isArray(r) ? r : Object.values(r);
  for (const e of t)
    if (e.type === Pa || "coder" in e && e.coder.type === Pa || "coders" in e && Bi(e.coders))
      return !0;
  return !1;
}, "hasNestedOption"), Ki, ts, wt = (ts = class extends mt {
  constructor(e, n) {
    super("array", `[${e.type}; ${n}]`, n * e.encodedLength);
    D(this, "coder");
    D(this, "length");
    Ie(this, Ki);
    this.coder = e, this.length = n, Ut(this, Ki, Bi([e]));
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(L.ENCODE_ERROR, "Expected array value.");
    if (this.length !== e.length)
      throw new v(L.ENCODE_ERROR, "Types/values length mismatch.");
    return ot(Array.from(e).map((n) => this.coder.encode(n)));
  }
  decode(e, n) {
    if (!ut(this, Ki) && e.length < this.encodedLength || e.length > Wp)
      throw new v(L.DECODE_ERROR, "Invalid array data size.");
    let s = n;
    return [Array(this.length).fill(0).map(() => {
      let a;
      return [a, s] = this.coder.decode(e, s), a;
    }), s];
  }
}, Ki = new WeakMap(), _t(ts, "ArrayCoder"), ts), es, at = (es = class extends mt {
  constructor() {
    super("b256", "b256", ht * 4);
  }
  encode(t) {
    let e;
    try {
      e = Z(t);
    } catch {
      throw new v(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (e.length !== this.encodedLength)
      throw new v(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid b256 data size.");
    let n = t.slice(e, e + this.encodedLength);
    if (x(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid b256 byte data size.");
    return [co(n, 32), e + 32];
  }
}, _t(es, "B256Coder"), es), rs, Sm = (rs = class extends mt {
  constructor() {
    super("b512", "struct B512", ht * 8);
  }
  encode(t) {
    let e;
    try {
      e = Z(t);
    } catch {
      throw new v(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (e.length !== this.encodedLength)
      throw new v(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid b512 data size.");
    let n = t.slice(e, e + this.encodedLength);
    if (x(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid b512 byte data size.");
    return [co(n, this.encodedLength), e + this.encodedLength];
  }
}, _t(rs, "B512Coder"), rs), Tm = {
  u64: ht,
  u256: ht * 4
}, ns, rt = (ns = class extends mt {
  constructor(t) {
    super("bigNumber", t, Tm[t]);
  }
  encode(t) {
    let e;
    if (typeof t == "number" && t > Number.MAX_SAFE_INTEGER)
      throw new v(
        L.ENCODE_ERROR,
        `Invalid ${this.type} type - number value is too large. Number can only safely handle up to 53 bits.`
      );
    try {
      e = br(t, this.encodedLength);
    } catch {
      throw new v(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = t.slice(e, e + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new v(L.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [x(n), e + this.encodedLength];
  }
}, _t(ns, "BigNumberCoder"), ns), ss, Nm = (ss = class extends mt {
  constructor(e = {
    padToWordSize: !1
  }) {
    const n = e.padToWordSize ? ht : 1;
    super("boolean", "boolean", n);
    D(this, "options");
    this.options = e;
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new v(L.ENCODE_ERROR, "Invalid boolean value.");
    return br(e ? 1 : 0, this.encodedLength);
  }
  decode(e, n) {
    if (e.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid boolean data size.");
    const s = x(e.slice(n, n + this.encodedLength));
    if (s.isZero())
      return [!1, n + this.encodedLength];
    if (!s.eq(x(1)))
      throw new v(L.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.encodedLength];
  }
}, _t(ss, "BooleanCoder"), ss), wn, Dm = (wn = class extends mt {
  constructor() {
    super("struct", "struct Bytes", ht);
  }
  encode(t) {
    const e = t instanceof Uint8Array ? t : new Uint8Array(t), n = new rt("u64").encode(e.length);
    return new Uint8Array([...n, ...e]);
  }
  decode(t, e) {
    if (t.length < ht)
      throw new v(L.DECODE_ERROR, "Invalid byte data size.");
    const n = e + ht, s = t.slice(e, n), i = x(new rt("u64").decode(s, 0)[0]).toNumber(), a = t.slice(n, n + i);
    if (a.length !== i)
      throw new v(L.DECODE_ERROR, "Invalid bytes byte data size.");
    return [a, n + i];
  }
}, _t(wn, "ByteCoder"), D(wn, "memorySize", 1), wn), mn, ta, is, rn, Jp, qp, $p, as, jp = (as = class extends mt {
  constructor(e, n) {
    const s = new rt("u64"), i = Object.values(n).reduce(
      (a, o) => Math.min(a, o.encodedLength),
      0
    );
    super(`enum ${e}`, `enum ${e}`, s.encodedLength + i);
    Ie(this, rn);
    D(this, "name");
    D(this, "coders");
    Ie(this, mn);
    Ie(this, ta);
    Ie(this, is);
    this.name = e, this.coders = n, Ut(this, mn, s), Ut(this, ta, i), Ut(this, is, !(Gp.test(this.type) || Bi(n)));
  }
  encode(e) {
    if (typeof e == "string" && this.coders[e])
      return sn(this, rn, qp).call(this, e);
    const [n, ...s] = Object.keys(e);
    if (!n)
      throw new v(L.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (s.length !== 0)
      throw new v(L.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const i = this.coders[n], a = Object.keys(this.coders).indexOf(n);
    if (a === -1) {
      const d = Object.keys(this.coders).map((_) => `'${_}'`).join(", ");
      throw new v(
        L.INVALID_DECODE_VALUE,
        `Invalid case '${n}'. Valid cases: ${d}.`
      );
    }
    const o = i.encode(e[n]);
    return new Uint8Array([...ut(this, mn).encode(a), ...o]);
  }
  decode(e, n) {
    if (ut(this, is) && e.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid enum data size.");
    const s = new rt("u64").decode(e, n)[0], i = Mr(s), a = Object.keys(this.coders)[i];
    if (!a)
      throw new v(
        L.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[a], d = n + ut(this, mn).encodedLength;
    if (ut(this, is) && e.length < d + o.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid enum data size.");
    const [_, A] = o.decode(e, d);
    return sn(this, rn, Jp).call(this, this.coders[a]) ? sn(this, rn, $p).call(this, a, A) : [{ [a]: _ }, A];
  }
}, mn = new WeakMap(), ta = new WeakMap(), is = new WeakMap(), rn = new WeakSet(), // Checks that we're handling a native enum that is of type void.
Jp = function(e) {
  return this.type !== Pa && e.type === ia;
}, qp = function(e) {
  const n = this.coders[e], s = n.encode([]), i = Object.keys(this.coders).indexOf(e), a = new Uint8Array(ut(this, ta) - n.encodedLength);
  return ot([ut(this, mn).encode(i), a, s]);
}, $p = function(e, n) {
  return [e, n];
}, _t(as, "EnumCoder"), as), Fm = /* @__PURE__ */ _t((r) => {
  switch (r) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new v(L.TYPE_NOT_SUPPORTED, `Invalid number type: ${r}`);
  }
}, "getLength"), os, $ = (os = class extends mt {
  constructor(e, n = {
    padToWordSize: !1
  }) {
    const s = n.padToWordSize ? ht : Fm(e);
    super("number", e, s);
    D(this, "baseType");
    D(this, "options");
    this.baseType = e, this.options = n;
  }
  encode(e) {
    let n;
    try {
      n = br(e);
    } catch {
      throw new v(L.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.encodedLength)
      throw new v(L.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return br(n, this.encodedLength);
  }
  decode(e, n) {
    if (e.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid number data size.");
    const s = e.slice(n, n + this.encodedLength);
    if (s.length !== this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid number byte data size.");
    return [Mr(s), n + this.encodedLength];
  }
}, _t(os, "NumberCoder"), os), cs, Kp = (cs = class extends jp {
  encode(t) {
    return super.encode(this.toSwayOption(t));
  }
  toSwayOption(t) {
    return t !== void 0 ? { Some: t } : { None: [] };
  }
  decode(t, e) {
    const [n, s] = super.decode(t, e);
    return [this.toOption(n), s];
  }
  toOption(t) {
    if (t && "Some" in t)
      return t.Some;
  }
}, _t(cs, "OptionCoder"), cs), ds, Qm = (ds = class extends mt {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ht);
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(L.ENCODE_ERROR, "Expected array value.");
    const n = new wt(new $("u8"), t.length).encode(t), s = new rt("u64").encode(n.length);
    return new Uint8Array([...s, ...n]);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid raw slice data size.");
    const n = e + ht, s = t.slice(e, n), i = x(new rt("u64").decode(s, 0)[0]).toNumber(), a = t.slice(n, n + i);
    if (a.length !== i)
      throw new v(L.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new wt(new $("u8"), i), [d] = o.decode(a, 0);
    return [d, n + i];
  }
}, _t(ds, "RawSliceCoder"), ds), yn, Bd = (yn = class extends mt {
  constructor() {
    super("struct", "struct String", ht);
  }
  encode(t) {
    const e = hr(t), n = new rt("u64").encode(t.length);
    return new Uint8Array([...n, ...e]);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid std string data size.");
    const n = e + ht, s = t.slice(e, n), i = x(new rt("u64").decode(s, 0)[0]).toNumber(), a = t.slice(n, n + i);
    if (a.length !== i)
      throw new v(L.DECODE_ERROR, "Invalid std string byte data size.");
    return [po(a), n + i];
  }
}, _t(yn, "StdStringCoder"), D(yn, "memorySize", 1), yn), bn, Om = (bn = class extends mt {
  constructor() {
    super("strSlice", "str", ht);
  }
  encode(t) {
    const e = hr(t), n = new rt("u64").encode(t.length);
    return new Uint8Array([...n, ...e]);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid string slice data size.");
    const n = e + ht, s = t.slice(e, n), i = x(new rt("u64").decode(s, 0)[0]).toNumber(), a = t.slice(n, n + i);
    if (a.length !== i)
      throw new v(L.DECODE_ERROR, "Invalid string slice byte data size.");
    return [po(a), n + i];
  }
}, _t(bn, "StrSliceCoder"), D(bn, "memorySize", 1), bn), us, Mm = (us = class extends mt {
  constructor(t) {
    super("string", `str[${t}]`, t);
  }
  encode(t) {
    if (t.length !== this.encodedLength)
      throw new v(L.ENCODE_ERROR, "Value length mismatch during encode.");
    return hr(t);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid string data size.");
    const n = t.slice(e, e + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid string byte data size.");
    return [po(n), e + this.encodedLength];
  }
}, _t(us, "StringCoder"), us), ea, hs, wo = (hs = class extends mt {
  constructor(e, n) {
    const s = Object.values(n).reduce(
      (i, a) => i + a.encodedLength,
      0
    );
    super("struct", `struct ${e}`, s);
    D(this, "name");
    D(this, "coders");
    Ie(this, ea);
    this.name = e, this.coders = n, Ut(this, ea, Bi(n));
  }
  encode(e) {
    return lo(
      Object.keys(this.coders).map((n) => {
        const s = this.coders[n], i = e[n];
        if (!(s instanceof Kp) && i == null)
          throw new v(
            L.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return s.encode(i);
      })
    );
  }
  decode(e, n) {
    if (!ut(this, ea) && e.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid struct data size.");
    let s = n;
    return [Object.keys(this.coders).reduce((a, o) => {
      const d = this.coders[o];
      let _;
      return [_, s] = d.decode(e, s), a[o] = _, a;
    }, {}), s];
  }
}, ea = new WeakMap(), _t(hs, "StructCoder"), hs), ra, ls, tf = (ls = class extends mt {
  constructor(e) {
    const n = e.reduce((s, i) => s + i.encodedLength, 0);
    super("tuple", `(${e.map((s) => s.type).join(", ")})`, n);
    D(this, "coders");
    Ie(this, ra);
    this.coders = e, Ut(this, ra, Bi(e));
  }
  encode(e) {
    if (this.coders.length !== e.length)
      throw new v(L.ENCODE_ERROR, "Types/values length mismatch.");
    return lo(this.coders.map((n, s) => n.encode(e[s])));
  }
  decode(e, n) {
    if (!ut(this, ra) && e.length < this.encodedLength)
      throw new v(L.DECODE_ERROR, "Invalid tuple data size.");
    let s = n;
    return [this.coders.map((a) => {
      let o;
      return [o, s] = a.decode(e, s), o;
    }), s];
  }
}, ra = new WeakMap(), _t(ls, "TupleCoder"), ls), _s, ps, Pm = (ps = class extends mt {
  constructor(e) {
    super("struct", "struct Vec", ht);
    D(this, "coder");
    Ie(this, _s);
    this.coder = e, Ut(this, _s, Bi([e]));
  }
  encode(e) {
    if (!Array.isArray(e) && !ku(e))
      throw new v(
        L.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = new rt("u64");
    if (ku(e))
      return new Uint8Array([...n.encode(e.length), ...e]);
    const s = e.map((a) => this.coder.encode(a)), i = n.encode(e.length);
    return new Uint8Array([...i, ...lo(s)]);
  }
  decode(e, n) {
    if (!ut(this, _s) && e.length < this.encodedLength || e.length > Wp)
      throw new v(L.DECODE_ERROR, "Invalid vec data size.");
    const s = n + ht, i = e.slice(n, s), a = x(new rt("u64").decode(i, 0)[0]).toNumber(), o = a * this.coder.encodedLength, d = e.slice(s, s + o);
    if (!ut(this, _s) && d.length !== o)
      throw new v(L.DECODE_ERROR, "Invalid vec byte data size.");
    let _ = s;
    const A = [];
    for (let g = 0; g < a; g++) {
      const [y, S] = this.coder.decode(e, _);
      A.push(y), _ = S;
    }
    return [A, _];
  }
}, _s = new WeakMap(), _t(ps, "VecCoder"), ps), ef = /* @__PURE__ */ _t((r) => {
  switch (r) {
    case void 0:
    case gi:
      return gi;
    default:
      throw new v(
        L.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${r}' is unsupported.`
      );
  }
}, "getEncodingVersion"), Vi = /* @__PURE__ */ _t((r, t) => {
  const e = r.types.find((n) => n.typeId === t);
  if (!e)
    throw new v(
      L.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return e;
}, "findTypeById"), Lm = /* @__PURE__ */ _t((r, t) => t.filter((e) => Vi(r, e.type).type !== ia), "findNonVoidInputs"), km = /* @__PURE__ */ _t((r) => {
  var n;
  const t = r.find((s) => s.name === "buf"), e = (n = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : n[0];
  if (!t || !e)
    throw new v(
      L.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return e;
}, "findVectorBufferArgument"), or, xd = (or = class {
  constructor(t, e) {
    D(this, "abi");
    D(this, "name");
    D(this, "type");
    D(this, "originalTypeArguments");
    D(this, "components");
    this.abi = t, this.name = e.name;
    const n = Vi(t, e.type);
    if (n.type.length > 256)
      throw new v(
        L.INVALID_COMPONENT,
        `The provided ABI type is too long: ${n.type}.`
      );
    this.type = n.type, this.originalTypeArguments = e.typeArguments, this.components = or.getResolvedGenericComponents(
      t,
      e,
      n.components,
      n.typeParameters ?? or.getImplicitGenericTypeParameters(t, n.components)
    );
  }
  static getResolvedGenericComponents(t, e, n, s) {
    if (n === null)
      return null;
    if (s === null || s.length === 0)
      return n.map((o) => new or(t, o));
    const i = s.reduce(
      (o, d, _) => {
        var g;
        const A = { ...o };
        return A[d] = structuredClone(
          (g = e.typeArguments) == null ? void 0 : g[_]
        ), A;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      t,
      n,
      i
    ).map((o) => new or(t, o));
  }
  static resolveGenericArgTypes(t, e, n) {
    return e.map((s) => {
      if (n[s.type] !== void 0)
        return {
          ...n[s.type],
          name: s.name
        };
      if (s.typeArguments)
        return {
          ...structuredClone(s),
          typeArguments: this.resolveGenericArgTypes(
            t,
            s.typeArguments,
            n
          )
        };
      const i = Vi(t, s.type), a = this.getImplicitGenericTypeParameters(t, i.components);
      return a && a.length > 0 ? {
        ...structuredClone(s),
        typeArguments: a.map((o) => n[o])
      } : s;
    });
  }
  static getImplicitGenericTypeParameters(t, e, n) {
    if (!Array.isArray(e))
      return null;
    const s = n ?? [];
    return e.forEach((i) => {
      const a = Vi(t, i.type);
      if (Cm.test(a.type)) {
        s.push(a.typeId);
        return;
      }
      Array.isArray(i.typeArguments) && this.getImplicitGenericTypeParameters(t, i.typeArguments, s);
    }), s.length > 0 ? s : null;
  }
  getSignature() {
    const t = this.getArgSignaturePrefix(), e = this.getArgSignatureContent();
    return `${t}${e}`;
  }
  getArgSignaturePrefix() {
    return Yp.test(this.type) ? "s" : Yc.test(this.type) ? "a" : Hp.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var i, a;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const t = (i = Vp.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `str[${t.length}]`;
    if (this.components === null)
      return this.type;
    const e = (a = Yc.exec(this.type)) == null ? void 0 : a.groups;
    if (e)
      return `[${this.components[0].getSignature()};${e.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new or(this.abi, o).getSignature()).join(",")}>` : "", s = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${s}`;
  }
}, _t(or, "ResolvedAbiType"), or), fs, Um = (fs = class extends mt {
  constructor() {
    super("void", ia, 0);
  }
  encode(t) {
    return new Uint8Array([]);
  }
  decode(t, e) {
    return [void 0, e];
  }
}, _t(fs, "VoidCoder"), fs);
function Wc(r, t) {
  const { getCoder: e } = t;
  return r.reduce((n, s) => {
    const i = n;
    return i[s.name] = e(s, t), i;
  }, {});
}
_t(Wc, "getCoders");
var Xn = /* @__PURE__ */ _t((r, t) => {
  var _, A, g, y;
  switch (r.type) {
    case dm:
    case um:
    case hm:
      return new $(r.type);
    case lm:
    case pm:
      return new rt("u64");
    case _m:
      return new rt("u256");
    case fm:
      return new Qm();
    case Am:
      return new Nm();
    case gm:
      return new at();
    case wm:
      return new Sm();
    case ym:
      return new Dm();
    case bm:
      return new Bd();
    case Im:
      return new Om();
    case ia:
      return new Um();
  }
  const e = (_ = Vp.exec(r.type)) == null ? void 0 : _.groups;
  if (e) {
    const S = parseInt(e.length, 10);
    return new Mm(S);
  }
  const n = r.components, s = (A = Yc.exec(r.type)) == null ? void 0 : A.groups;
  if (s) {
    const S = parseInt(s.length, 10), O = n[0];
    if (!O)
      throw new v(
        L.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const R = Xn(O);
    return new wt(R, S);
  }
  if (r.type === mm) {
    const S = km(n), O = new xd(r.abi, S), R = Xn(O, { encoding: gi });
    return new Pm(R);
  }
  const i = (g = r.type.match(vm)) == null ? void 0 : g[0];
  if (Yp.test(r.type) && i) {
    const S = Wc(n, { getCoder: Xn });
    return new wo(i, S);
  }
  if (Hp.test(r.type) && i) {
    const S = Wc(n, { getCoder: Xn });
    return r.type === Pa ? new Kp(i, S) : new jp(i, S);
  }
  if ((y = Em.exec(r.type)) == null ? void 0 : y.groups) {
    const S = n.map((O) => Xn(O, { encoding: gi }));
    return new tf(S);
  }
  throw new v(
    L.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(r)}.`
  );
}, "getCoder");
function rf(r = gi) {
  switch (r) {
    case gi:
      return Xn;
    default:
      throw new v(
        L.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${r} is unsupported.`
      );
  }
}
_t(rf, "getCoderForEncoding");
var As, ln = (As = class {
  static getCoder(t, e, n = {
    padToWordSize: !1
  }) {
    const s = new xd(t, e);
    return rf(n.encoding)(s, n);
  }
  static encode(t, e, n, s) {
    return this.getCoder(t, e, s).encode(n);
  }
  static decode(t, e, n, s, i) {
    return this.getCoder(t, e, i).decode(n, s);
  }
}, _t(As, "AbiCoder"), As), zm = /* @__PURE__ */ _t((r) => {
  const { jsonAbi: t, inputs: e } = r;
  let n = !1;
  return e.reduceRight((s, i) => {
    const a = Vi(t, i.type);
    return n = n || a.type !== ia && !Gp.test(a.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, "getFunctionInputs"), Gm = /* @__PURE__ */ _t((r, t) => {
  if (r.length >= t.length)
    return r;
  const e = r.slice();
  return e.length = t.length, e.fill(void 0, r.length), e;
}, "padValuesWithUndefined"), Kr, Vm = (Kr = class {
  constructor(t, e) {
    D(this, "signature");
    D(this, "selector");
    D(this, "selectorBytes");
    D(this, "encoding");
    D(this, "name");
    D(this, "jsonFn");
    D(this, "attributes");
    D(this, "jsonAbiOld");
    D(this, "jsonFnOld");
    this.jsonFn = e, this.jsonAbiOld = t, this.jsonFnOld = t.functions.find((n) => n.name === e.name), this.name = e.name, this.signature = Kr.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = Kr.getFunctionSelector(this.signature), this.selectorBytes = new Bd().encode(this.name), this.encoding = ef(t.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(t, e) {
    const n = e.inputs.map(
      (s) => new xd(t, s).getSignature()
    );
    return `${e.name}(${n.join(",")})`;
  }
  static getFunctionSelector(t) {
    const e = Gt(hn(t, "utf-8"));
    return x(e.slice(0, 10)).toHex(8);
  }
  encodeArguments(t) {
    const n = zm({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((a) => !a.isOptional).length;
    if (t.length < n)
      throw new v(
        L.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${n} arguments, received ${t.length}`
      );
    const s = this.jsonFnOld.inputs.map(
      (a) => ln.getCoder(this.jsonAbiOld, a, {
        encoding: this.encoding
      })
    ), i = Gm(t, this.jsonFn.inputs);
    return new tf(s).encode(i);
  }
  decodeArguments(t) {
    const e = Z(t), n = Lm(this.jsonAbiOld, this.jsonFnOld.inputs);
    if (n.length === 0) {
      if (e.length === 0)
        return;
      throw new v(
        L.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonVoidInputs: n.length,
            values: e.length
          },
          value: {
            args: this.jsonFn.inputs,
            nonVoidInputs: n,
            values: e
          }
        })}`
      );
    }
    return this.jsonFnOld.inputs.reduce(
      (i, a) => {
        const o = ln.getCoder(this.jsonAbiOld, a, { encoding: this.encoding }), [d, _] = o.decode(e, i.offset);
        return {
          decoded: [...i.decoded, d],
          offset: _
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(t) {
    const e = Z(t);
    return ln.getCoder(this.jsonAbiOld, this.jsonFnOld.output, {
      encoding: this.encoding
    }).decode(e, 0);
  }
  /**
   * Checks if the function is read-only i.e. it only reads from storage, does not write to it.
   *
   * @returns True if the function is read-only or pure, false otherwise.
   */
  isReadOnly() {
    var e;
    const t = this.attributes.find((n) => n.name === "storage");
    return !((e = t == null ? void 0 : t.arguments) != null && e.includes("write"));
  }
}, _t(Kr, "FunctionFragment"), Kr), Ym = /* @__PURE__ */ _t((r, t) => r.find((e) => e.concreteTypeId === t), "findTypeByConcreteId"), Rd = /* @__PURE__ */ _t((r, t) => r.concreteTypes.find((e) => e.concreteTypeId === t), "findConcreteTypeById");
function mo(r, t, e) {
  const n = Rd(r, e);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = Ym(t, e);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: yo(n.components),
    concreteTypeId: e,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
_t(mo, "finsertTypeIdByConcreteTypeId");
function Sd(r, t, e) {
  var n;
  return ((n = e.typeArguments) == null ? void 0 : n.map((s) => {
    const i = Rd(r, s);
    return {
      name: "",
      type: isNaN(s) ? mo(r, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: Sd(r, t, i)
    };
  })) ?? null;
}
_t(Sd, "parseFunctionTypeArguments");
function _n(r, t, e, n) {
  const s = mo(r, t, e), i = Rd(r, e);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: Sd(r, t, i)
  };
}
_t(_n, "parseConcreteType");
function yo(r, t, e) {
  return (e == null ? void 0 : e.map((n) => {
    const { typeId: s, name: i, typeArguments: a } = n, o = isNaN(s) ? mo(r, t, s) : s;
    return {
      name: i,
      type: o,
      // originalTypeId: typeId,
      typeArguments: yo(r, t, a)
    };
  })) ?? null;
}
_t(yo, "parseComponents");
function nf(r) {
  if (!r.specVersion)
    return r;
  const t = [];
  r.metadataTypes.forEach((a) => {
    const o = {
      typeId: a.metadataTypeId,
      type: a.type,
      components: a.components ?? (a.type === "()" ? [] : null),
      typeParameters: a.typeParameters ?? null
    };
    t.push(o);
  }), t.forEach((a) => {
    a.components = yo(r, t, a.components);
  });
  const e = r.functions.map((a) => {
    const o = a.inputs.map(
      ({ concreteTypeId: _, name: A }) => _n(r, t, _, A)
    ), d = _n(r, t, a.output, "");
    return { ...a, inputs: o, output: d };
  }), n = r.configurables.map((a) => ({
    name: a.name,
    configurableType: _n(r, t, a.concreteTypeId),
    offset: a.offset
  })), s = r.loggedTypes.map((a) => ({
    logId: a.logId,
    loggedType: _n(r, t, a.concreteTypeId)
  }));
  return {
    encoding: r.encodingVersion,
    types: t,
    functions: e,
    loggedTypes: s,
    messagesTypes: r.messagesTypes,
    configurables: n
  };
}
_t(nf, "transpileAbi");
var gs, Ke = (gs = class {
  constructor(t) {
    D(this, "functions");
    D(this, "configurables");
    D(this, "jsonAbi");
    D(this, "encoding");
    D(this, "jsonAbiOld");
    this.jsonAbi = t, this.encoding = ef(t.encodingVersion), this.jsonAbiOld = nf(t), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((e) => [e.name, new Vm(this.jsonAbiOld, e)])
    ), this.configurables = Object.fromEntries(this.jsonAbi.configurables.map((e) => [e.name, e]));
  }
  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(t) {
    const e = Object.values(this.functions).find(
      (n) => n.name === t || n.signature === t || n.selector === t
    );
    if (e !== void 0)
      return e;
    throw new v(
      L.FUNCTION_NOT_FOUND,
      `function ${t} not found: ${JSON.stringify(e)}.`
    );
  }
  // Decode the result of a function call
  decodeFunctionResult(t, e) {
    return (typeof t == "string" ? this.getFunction(t) : t).decodeOutput(e);
  }
  decodeLog(t, e) {
    const n = this.jsonAbiOld.loggedTypes.find((s) => s.logId === e);
    if (!n)
      throw new v(
        L.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${e}' doesn't exist in the ABI.`
      );
    return ln.decode(this.jsonAbiOld, n.loggedType, Z(t), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(t, e) {
    const n = this.jsonAbiOld.configurables.find((s) => s.name === t);
    if (!n)
      throw new v(
        L.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${t}' was not found in the ABI.`
      );
    return ln.encode(this.jsonAbiOld, n.configurableType, e, {
      encoding: this.encoding
    });
  }
  encodeType(t, e) {
    const n = _n(
      this.jsonAbi,
      this.jsonAbiOld.types,
      t,
      ""
    );
    return ln.encode(this.jsonAbiOld, n, e, {
      encoding: this.encoding
    });
  }
  decodeType(t, e) {
    const n = _n(
      this.jsonAbi,
      this.jsonAbiOld.types,
      t,
      ""
    );
    return ln.decode(this.jsonAbiOld, n, e, 0, { encoding: this.encoding });
  }
}, _t(gs, "Interface"), gs), Tx = /* @__PURE__ */ _t((r, t) => {
  const [e, n] = new rt("u64").decode(r, 0), [s, i] = new at().decode(r, n), [a, o] = new at().decode(r, i), [d, _] = new Bd().decode(
    r,
    o + ht + ht
  ), A = r.slice(_), g = t ? new Ke(t).getFunction(d).decodeArguments(A) : void 0;
  return {
    amount: e,
    assetId: s,
    contractId: a,
    functionSelector: d,
    functionArgs: g
  };
}, "decodeScriptData"), Hm = Object.defineProperty, He = (r, t) => Hm(r, "name", { value: t, configurable: !0 });
function Pn(r) {
  return r.length === 66 && /(0x)[0-9a-f]{64}$/i.test(r);
}
He(Pn, "isB256");
function Td(r) {
  return r.length === 130 && /(0x)[0-9a-f]{128}$/i.test(r);
}
He(Td, "isPublicKey");
function bo(r) {
  return r.length === 42 && /(0x)[0-9a-f]{40}$/i.test(r);
}
He(bo, "isEvmAddress");
function sf(r) {
  return r.toLowerCase();
}
He(sf, "normalizeB256");
function va(r) {
  return "b256Address" in r;
}
He(va, "isAddress");
var ki = /* @__PURE__ */ He((r) => {
  if (va(r))
    return r;
  if ("address" in r && va(r.address))
    return r.address;
  if ("id" in r && va(r.id))
    return r.id;
  throw new v(v.CODES.INVALID_ADDRESS, "Invalid address");
}, "addressify"), Wm = /* @__PURE__ */ He(() => X($e(32)), "getRandomB256"), Xm = /* @__PURE__ */ He((r) => {
  try {
    if (!Pn(r))
      throw new v(v.CODES.INVALID_B256_ADDRESS, `Invalid B256 Address: ${r}.`);
    const t = Z(r).slice(12), e = new Uint8Array(12).fill(0);
    return X(ot([e, t]));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${r}.`
    );
  }
}, "toB256AddressEvm"), Zm = /* @__PURE__ */ He((r) => {
  if (!bo(r))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return r.replace("0x", "0x000000000000000000000000");
}, "padFirst12BytesOfEvmAddress"), jm = /* @__PURE__ */ He((r) => Zm(r), "fromEvmAddressToB256"), af = /* @__PURE__ */ He((r) => {
  if (!Td(r))
    throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${r}.`);
  return X(nn(Z(r)));
}, "fromPublicKeyToB256"), Jm = /* @__PURE__ */ He((r) => {
  if (typeof r != "string" && "toB256" in r)
    return r.toB256();
  if (Pn(r))
    return r;
  if (Td(r))
    return af(r);
  if (bo(r))
    return jm(r);
  throw new v(
    v.CODES.PARSE_FAILED,
    "Unknown address format: only 'B256', 'Public Key (512)', or 'EVM Address' are supported."
  );
}, "fromDynamicInputToB256"), Qe, gt = (Qe = class {
  // #endregion address-2
  /**
   * @param address - A B256 address, public key, EVM address, or Address instance
   */
  constructor(t) {
    // #region address-2
    D(this, "b256Address");
    const e = Jm(t);
    this.b256Address = sf(e);
  }
  /**
   * Takes an B256 Address and returns back an checksum address.
   * The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.
   *
   * @returns A new `ChecksumAddress` instance
   */
  toChecksum() {
    return Qe.toChecksum(this.b256Address);
  }
  /**
   * Returns the `b256Address` property
   */
  toAddress() {
    return this.b256Address;
  }
  /**
   * Returns the B256 hash address as a string
   *
   * @returns The B256 address
   */
  toB256() {
    return this.b256Address;
  }
  /**
   * Returns the B256 hash address as a Uint8Array
   *
   * @returns The B256 address as a Uint8Array
   */
  toBytes() {
    return Z(this.b256Address);
  }
  /**
   * Returns the B256 hash address as a string
   *
   * @returns The B256 address
   */
  toHexString() {
    return this.toB256();
  }
  /**
   * returns the address `checksum` as a string
   *
   * @returns The `b256Address` property as a string
   */
  toString() {
    return this.toChecksum();
  }
  /**
   * Converts and returns the `b256Address` property as a string
   * @returns The `b256Address` property as a JSON string
   */
  toJSON() {
    return this.b256Address;
  }
  /**
   * Converts to an EVM address
   *
   * @returns an {@link EvmAddress | `EvmAddress`} representation of the address
   */
  toEvmAddress() {
    return {
      bits: Xm(this.b256Address)
    };
  }
  /**
   * Wraps the B256 property and returns as an `AssetId`.
   * @returns The B256 property as an {@link AssetId | `AssetId`}
   */
  toAssetId() {
    return {
      bits: this.b256Address
    };
  }
  /**
   * Wraps the B256 address `checksum` and returns it as a string
   * @returns The B256 address `checksum` as a string
   */
  valueOf() {
    return this.toChecksum();
  }
  /**
   * Compares this the `b256Address` property to another for direct equality
   * @param other - Another address to compare against
   * @returns The equality of the comparison
   */
  equals(t) {
    return this.toChecksum() === t.toChecksum();
  }
  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromPublicKey(t) {
    const e = af(t);
    return new Qe(e);
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromB256(t) {
    if (!Pn(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new Qe(t);
  }
  /**
   * Creates an `Address` with a randomized `b256Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return new Qe(Wm());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromString(t) {
    return new Qe(t);
  }
  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromAddressOrString(t) {
    return new Qe(t);
  }
  /**
   * Takes a dynamic string or `Address` and creates an `Address`
   *
   * @param addressId - A string containing B256, or Public Key
   * @throws Error - Unknown address if the format is not recognized
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromDynamicInput(t) {
    return new Qe(t);
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromEvmAddress(t) {
    if (!bo(t))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    return new Qe(t);
  }
  /**
   * Takes an ChecksumAddress and validates if it is a valid checksum address.
   *
   * @returns A `boolean` instance indicating if the address is valid.
   */
  static isChecksumValid(t) {
    let e = t;
    return t.startsWith("0x") || (e = `0x${t}`), e.trim().length !== 66 ? !1 : Qe.toChecksum(X(e)) === e;
  }
  /** @hidden */
  static toChecksum(t) {
    if (!Pn(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    const e = X(t).toLowerCase().slice(2), n = nn(e);
    let s = "0x";
    for (let i = 0; i < 32; ++i) {
      const a = n[i], o = e.charAt(i * 2), d = e.charAt(i * 2 + 1);
      s += (a & 240) >= 128 ? o.toUpperCase() : o, s += (a & 15) >= 8 ? d.toUpperCase() : d;
    }
    return s;
  }
}, He(Qe, "Address"), Qe), qm = Object.defineProperty, Nt = (r, t) => qm(r, "name", { value: t, configurable: !0 }), Xr, ws, Ot = (ws = class extends mt {
  constructor(e) {
    const n = (8 - e % 8) % 8, s = e + n;
    super(
      "ByteArray",
      // While this might sound like a [u8; N] coder it's actually not.
      // A [u8; N] coder would pad every u8 to 8 bytes which would
      // make every u8 have the same size as a u64.
      // We are packing four u8s into u64s here, avoiding this padding.
      `[u64; ${s / 4}]`,
      s
    );
    D(this, "length");
    Ie(this, Xr);
    this.length = e, Ut(this, Xr, n);
  }
  encode(e) {
    const n = [], s = Z(e);
    return n.push(s), ut(this, Xr) && n.push(new Uint8Array(ut(this, Xr))), ot(n);
  }
  decode(e, n) {
    let s, i = n;
    [s, i] = [X(e.slice(i, i + this.length)), i + this.length];
    const a = s;
    return ut(this, Xr) && ([s, i] = [null, i + ut(this, Xr)]), [a, i];
  }
}, Xr = new WeakMap(), Nt(ws, "ByteArrayCoder"), ws), ms, Ln = (ms = class extends wo {
  constructor() {
    super("TxPointer", {
      blockHeight: new $("u32", { padToWordSize: !0 }),
      txIndex: new $("u16", { padToWordSize: !0 })
    });
  }
  static decodeFromGqlScalar(t) {
    if (t.length !== 12)
      throw new v(
        L.DECODE_ERROR,
        `Invalid TxPointer scalar string length ${t.length}. It must have length 12.`
      );
    const [e, n] = [t.substring(0, 8), t.substring(8)];
    return {
      blockHeight: parseInt(e, 16),
      txIndex: parseInt(n, 16)
    };
  }
}, Nt(ms, "TxPointerCoder"), ms), Tt = /* @__PURE__ */ ((r) => (r[r.Coin = 0] = "Coin", r[r.Contract = 1] = "Contract", r[r.Message = 2] = "Message", r))(Tt || {}), ys, Uu = (ys = class extends mt {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new at().encode(t.txID)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.outputIndex)), e.push(new at().encode(t.owner)), e.push(new rt("u64").encode(t.amount)), e.push(new at().encode(t.assetId)), e.push(new Ln().encode(t.txPointer)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessIndex)), e.push(new rt("u64").encode(t.predicateGasUsed)), e.push(new rt("u64").encode(t.predicateLength)), e.push(new rt("u64").encode(t.predicateDataLength)), e.push(new Ot(t.predicateLength.toNumber()).encode(t.predicate)), e.push(
      new Ot(t.predicateDataLength.toNumber()).encode(t.predicateData)
    ), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new at().decode(t, s);
    const o = n;
    [n, s] = new rt("u64").decode(t, s);
    const d = n;
    [n, s] = new at().decode(t, s);
    const _ = n;
    [n, s] = new Ln().decode(t, s);
    const A = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const g = Number(n);
    [n, s] = new rt("u64").decode(t, s);
    const y = n;
    [n, s] = new rt("u64").decode(t, s);
    const S = n;
    [n, s] = new rt("u64").decode(t, s);
    const O = n;
    [n, s] = new Ot(S.toNumber()).decode(t, s);
    const R = n;
    return [n, s] = new Ot(O.toNumber()).decode(t, s), [
      {
        type: 0,
        txID: i,
        outputIndex: a,
        owner: o,
        amount: d,
        assetId: _,
        txPointer: A,
        witnessIndex: g,
        predicateGasUsed: y,
        predicateLength: S,
        predicateDataLength: O,
        predicate: R,
        predicateData: n
      },
      s
    ];
  }
}, Nt(ys, "InputCoinCoder"), ys), bs, ka = (bs = class extends mt {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new at().encode(t.txID)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.outputIndex)), e.push(new at().encode(t.balanceRoot)), e.push(new at().encode(t.stateRoot)), e.push(new Ln().encode(t.txPointer)), e.push(new at().encode(t.contractID)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new at().decode(t, s);
    const o = n;
    [n, s] = new at().decode(t, s);
    const d = n;
    [n, s] = new Ln().decode(t, s);
    const _ = n;
    return [n, s] = new at().decode(t, s), [
      {
        type: 1,
        txID: i,
        outputIndex: a,
        balanceRoot: o,
        stateRoot: d,
        txPointer: _,
        contractID: n
      },
      s
    ];
  }
}, Nt(bs, "InputContractCoder"), bs), Rn, pn = (Rn = class extends mt {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(t) {
    const e = [];
    return e.push(new Ot(32).encode(t.sender)), e.push(new Ot(32).encode(t.recipient)), e.push(new Ot(32).encode(t.nonce)), e.push(new rt("u64").encode(t.amount)), e.push(Z(t.data || "0x")), Gt(ot(e));
  }
  static encodeData(t) {
    const e = Z(t || "0x"), n = e.length;
    return new Ot(n).encode(e);
  }
  encode(t) {
    const e = [], n = Rn.encodeData(t.data);
    return e.push(new Ot(32).encode(t.sender)), e.push(new Ot(32).encode(t.recipient)), e.push(new rt("u64").encode(t.amount)), e.push(new Ot(32).encode(t.nonce)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessIndex)), e.push(new rt("u64").encode(t.predicateGasUsed)), e.push(new rt("u64").encode(n.length)), e.push(new rt("u64").encode(t.predicateLength)), e.push(new rt("u64").encode(t.predicateDataLength)), e.push(new Ot(n.length).encode(n)), e.push(new Ot(t.predicateLength.toNumber()).encode(t.predicate)), e.push(
      new Ot(t.predicateDataLength.toNumber()).encode(t.predicateData)
    ), ot(e);
  }
  static decodeData(t) {
    const e = Z(t), n = e.length, [s] = new Ot(n).decode(e, 0);
    return Z(s);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    [n, s] = new at().decode(t, s);
    const a = n;
    [n, s] = new rt("u64").decode(t, s);
    const o = n;
    [n, s] = new at().decode(t, s);
    const d = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const _ = Number(n);
    [n, s] = new rt("u64").decode(t, s);
    const A = n;
    [n, s] = new $("u32", { padToWordSize: !0 }).decode(t, s);
    const g = n;
    [n, s] = new rt("u64").decode(t, s);
    const y = n;
    [n, s] = new rt("u64").decode(t, s);
    const S = n;
    [n, s] = new Ot(g).decode(t, s);
    const O = n;
    [n, s] = new Ot(y.toNumber()).decode(t, s);
    const R = n;
    return [n, s] = new Ot(S.toNumber()).decode(t, s), [
      {
        type: 2,
        sender: i,
        recipient: a,
        amount: o,
        witnessIndex: _,
        nonce: d,
        predicateGasUsed: A,
        dataLength: g,
        predicateLength: y,
        predicateDataLength: S,
        data: O,
        predicate: R,
        predicateData: n
      },
      s
    ];
  }
}, Nt(Rn, "InputMessageCoder"), Rn), Is, Cr = (Is = class extends mt {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(t) {
    const e = [];
    e.push(new $("u8", { padToWordSize: !0 }).encode(t.type));
    const { type: n } = t;
    switch (n) {
      case 0: {
        e.push(new Uu().encode(t));
        break;
      }
      case 1: {
        e.push(new ka().encode(t));
        break;
      }
      case 2: {
        e.push(new pn().encode(t));
        break;
      }
      default:
        throw new v(
          L.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new $("u8", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    switch (i) {
      case 0:
        return [n, s] = new Uu().decode(t, s), [n, s];
      case 1:
        return [n, s] = new ka().decode(t, s), [n, s];
      case 2:
        return [n, s] = new pn().decode(t, s), [n, s];
      default:
        throw new v(
          L.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${i}.`
        );
    }
  }
}, Nt(Is, "InputCoder"), Is), It = /* @__PURE__ */ ((r) => (r[r.Coin = 0] = "Coin", r[r.Contract = 1] = "Contract", r[r.Change = 2] = "Change", r[r.Variable = 3] = "Variable", r[r.ContractCreated = 4] = "ContractCreated", r))(It || {}), Es, zu = (Es = class extends mt {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new at().encode(t.to)), e.push(new rt("u64").encode(t.amount)), e.push(new at().encode(t.assetId)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    [n, s] = new rt("u64").decode(t, s);
    const a = n;
    return [n, s] = new at().decode(t, s), [
      {
        type: 0,
        to: i,
        amount: a,
        assetId: n
      },
      s
    ];
  }
}, Nt(Es, "OutputCoinCoder"), Es), Cs, Ua = (Cs = class extends mt {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new $("u8", { padToWordSize: !0 }).encode(t.inputIndex)), e.push(new at().encode(t.balanceRoot)), e.push(new at().encode(t.stateRoot)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new $("u8", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    [n, s] = new at().decode(t, s);
    const a = n;
    return [n, s] = new at().decode(t, s), [
      {
        type: 1,
        inputIndex: i,
        balanceRoot: a,
        stateRoot: n
      },
      s
    ];
  }
}, Nt(Cs, "OutputContractCoder"), Cs), vs, Gu = (vs = class extends mt {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new at().encode(t.to)), e.push(new rt("u64").encode(t.amount)), e.push(new at().encode(t.assetId)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    [n, s] = new rt("u64").decode(t, s);
    const a = n;
    return [n, s] = new at().decode(t, s), [
      {
        type: 2,
        to: i,
        amount: a,
        assetId: n
      },
      s
    ];
  }
}, Nt(vs, "OutputChangeCoder"), vs), Bs, Vu = (Bs = class extends mt {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new at().encode(t.to)), e.push(new rt("u64").encode(t.amount)), e.push(new at().encode(t.assetId)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    [n, s] = new rt("u64").decode(t, s);
    const a = n;
    return [n, s] = new at().decode(t, s), [
      {
        type: 3,
        to: i,
        amount: a,
        assetId: n
      },
      s
    ];
  }
}, Nt(Bs, "OutputVariableCoder"), Bs), xs, Yu = (xs = class extends mt {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new at().encode(t.contractId)), e.push(new at().encode(t.stateRoot)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    return [n, s] = new at().decode(t, s), [
      {
        type: 4,
        contractId: i,
        stateRoot: n
      },
      s
    ];
  }
}, Nt(xs, "OutputContractCreatedCoder"), xs), Rs, vr = (Rs = class extends mt {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(t) {
    const e = [];
    e.push(new $("u8", { padToWordSize: !0 }).encode(t.type));
    const { type: n } = t;
    switch (n) {
      case 0: {
        e.push(new zu().encode(t));
        break;
      }
      case 1: {
        e.push(new Ua().encode(t));
        break;
      }
      case 2: {
        e.push(new Gu().encode(t));
        break;
      }
      case 3: {
        e.push(new Vu().encode(t));
        break;
      }
      case 4: {
        e.push(new Yu().encode(t));
        break;
      }
      default:
        throw new v(
          L.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new $("u8", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    switch (i) {
      case 0:
        return [n, s] = new zu().decode(t, s), [n, s];
      case 1:
        return [n, s] = new Ua().decode(t, s), [n, s];
      case 2:
        return [n, s] = new Gu().decode(t, s), [n, s];
      case 3:
        return [n, s] = new Vu().decode(t, s), [n, s];
      case 4:
        return [n, s] = new Yu().decode(t, s), [n, s];
      default:
        throw new v(
          L.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${i}.`
        );
    }
  }
}, Nt(Rs, "OutputCoder"), Rs), Ue = /* @__PURE__ */ ((r) => (r[r.Tip = 1] = "Tip", r[r.WitnessLimit = 2] = "WitnessLimit", r[r.Maturity = 4] = "Maturity", r[r.MaxFee = 8] = "MaxFee", r[r.Expiration = 16] = "Expiration", r))(Ue || {}), $m = /* @__PURE__ */ Nt((r) => r.sort((t, e) => t.type - e.type), "sortPolicies");
function of(r) {
  const t = /* @__PURE__ */ new Set();
  r.forEach((e) => {
    if (t.has(e.type))
      throw new v(
        L.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(e.type);
  });
}
Nt(of, "validateDuplicatedPolicies");
var Ss, Br = (Ss = class extends mt {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(t) {
    of(t);
    const e = $m(t), n = [];
    return e.forEach(({ data: s, type: i }) => {
      switch (i) {
        case 8:
        case 1:
        case 2:
          n.push(new rt("u64").encode(s));
          break;
        case 4:
        case 16:
          n.push(new $("u32", { padToWordSize: !0 }).encode(s));
          break;
        default:
          throw new v(L.INVALID_POLICY_TYPE, `Invalid policy type: ${i}`);
      }
    }), ot(n);
  }
  decode(t, e, n) {
    let s = e;
    const i = [];
    if (n & 1) {
      const [a, o] = new rt("u64").decode(t, s);
      s = o, i.push({ type: 1, data: a });
    }
    if (n & 2) {
      const [a, o] = new rt("u64").decode(t, s);
      s = o, i.push({ type: 2, data: a });
    }
    if (n & 4) {
      const [a, o] = new $("u32", { padToWordSize: !0 }).decode(
        t,
        s
      );
      s = o, i.push({ type: 4, data: a });
    }
    if (n & 8) {
      const [a, o] = new rt("u64").decode(t, s);
      s = o, i.push({ type: 8, data: a });
    }
    if (n & 16) {
      const [a, o] = new $("u32", { padToWordSize: !0 }).decode(
        t,
        s
      );
      s = o, i.push({ type: 16, data: a });
    }
    return [i, s];
  }
}, Nt(Ss, "PoliciesCoder"), Ss), dt = /* @__PURE__ */ ((r) => (r[r.Call = 0] = "Call", r[r.Return = 1] = "Return", r[r.ReturnData = 2] = "ReturnData", r[r.Panic = 3] = "Panic", r[r.Revert = 4] = "Revert", r[r.Log = 5] = "Log", r[r.LogData = 6] = "LogData", r[r.Transfer = 7] = "Transfer", r[r.TransferOut = 8] = "TransferOut", r[r.ScriptResult = 9] = "ScriptResult", r[r.MessageOut = 10] = "MessageOut", r[r.Mint = 11] = "Mint", r[r.Burn = 12] = "Burn", r))(dt || {}), Xc = /* @__PURE__ */ Nt((r, t) => {
  const e = Z(r), n = Z(t);
  return Gt(ot([e, n]));
}, "getMintedAssetId"), Nx = /* @__PURE__ */ Nt((r, t) => ({
  bits: Xc(r, t)
}), "createAssetId"), Dx = /* @__PURE__ */ Nt((r) => {
  const t = [];
  return t.push(new Ot(32).encode(r.sender)), t.push(new Ot(32).encode(r.recipient)), t.push(new Ot(32).encode(r.nonce)), t.push(new rt("u64").encode(r.amount)), t.push(Z(r.data || "0x")), Gt(ot(t));
}, "getMessageId"), Ts, Hu = (Ts = class extends wo {
  constructor() {
    super("StorageSlot", {
      key: new at(),
      value: new at()
    });
  }
}, Nt(Ts, "StorageSlotCoder"), Ts), Ze = /* @__PURE__ */ ((r) => (r[r.ConsensusParameters = 0] = "ConsensusParameters", r[r.StateTransition = 1] = "StateTransition", r))(Ze || {}), Ns, Wu = (Ns = class extends mt {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(t) {
    const e = [], { type: n } = t;
    switch (e.push(new $("u8", { padToWordSize: !0 }).encode(n)), n) {
      case 0: {
        const s = t.data;
        e.push(new $("u16", { padToWordSize: !0 }).encode(s.witnessIndex)), e.push(new at().encode(s.checksum));
        break;
      }
      case 1: {
        const s = t.data;
        e.push(new at().encode(s.bytecodeRoot));
        break;
      }
      default:
        throw new v(
          L.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${n}`
        );
    }
    return ot(e);
  }
  decode(t, e) {
    let n = e, s;
    [s, n] = new $("u8", { padToWordSize: !0 }).decode(t, n);
    const i = s;
    switch (i) {
      case 0: {
        [s, n] = new $("u16", { padToWordSize: !0 }).decode(t, n);
        const a = s;
        return [s, n] = new at().decode(t, n), [{ type: i, data: { witnessIndex: a, checksum: s } }, n];
      }
      case 1:
        return [s, n] = new at().decode(t, n), [{ type: i, data: { bytecodeRoot: s } }, n];
      default:
        throw new v(
          L.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${i}`
        );
    }
  }
}, Nt(Ns, "UpgradePurposeCoder"), Ns), Ds, xr = (Ds = class extends mt {
  constructor() {
    super(
      "Witness",
      // Types of dynamic length are not supported in the ABI
      "unknown",
      0
    );
  }
  encode(t) {
    const e = [];
    return e.push(new $("u32", { padToWordSize: !0 }).encode(t.dataLength)), e.push(new Ot(t.dataLength).encode(t.data)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new $("u32", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    return [n, s] = new Ot(i).decode(t, s), [
      {
        dataLength: i,
        data: n
      },
      s
    ];
  }
}, Nt(Ds, "WitnessCoder"), Ds), Bt = /* @__PURE__ */ ((r) => (r[r.Script = 0] = "Script", r[r.Create = 1] = "Create", r[r.Mint = 2] = "Mint", r[r.Upgrade = 3] = "Upgrade", r[r.Upload = 4] = "Upload", r[r.Blob = 5] = "Blob", r))(Bt || {}), Fs, Xu = (Fs = class extends mt {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new rt("u64").encode(t.scriptGasLimit)), e.push(new at().encode(t.receiptsRoot)), e.push(new rt("u64").encode(t.scriptLength)), e.push(new rt("u64").encode(t.scriptDataLength)), e.push(new $("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(new Ot(t.scriptLength.toNumber()).encode(t.script)), e.push(new Ot(t.scriptDataLength.toNumber()).encode(t.scriptData)), e.push(new Br().encode(t.policies)), e.push(new wt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new wt(new vr(), t.outputsCount).encode(t.outputs)), e.push(new wt(new xr(), t.witnessesCount).encode(t.witnesses)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new rt("u64").decode(t, s);
    const i = n;
    [n, s] = new at().decode(t, s);
    const a = n;
    [n, s] = new rt("u64").decode(t, s);
    const o = n;
    [n, s] = new rt("u64").decode(t, s);
    const d = n;
    [n, s] = new $("u32", { padToWordSize: !0 }).decode(t, s);
    const _ = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const A = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const g = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const y = n;
    [n, s] = new Ot(o.toNumber()).decode(t, s);
    const S = n;
    [n, s] = new Ot(d.toNumber()).decode(t, s);
    const O = n;
    [n, s] = new Br().decode(t, s, _);
    const R = n;
    [n, s] = new wt(new Cr(), A).decode(t, s);
    const F = n;
    [n, s] = new wt(new vr(), g).decode(t, s);
    const z = n;
    return [n, s] = new wt(new xr(), y).decode(t, s), [
      {
        type: 0,
        scriptGasLimit: i,
        scriptLength: o,
        scriptDataLength: d,
        policyTypes: _,
        inputsCount: A,
        outputsCount: g,
        witnessesCount: y,
        receiptsRoot: a,
        script: S,
        scriptData: O,
        policies: R,
        inputs: F,
        outputs: z,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Fs, "TransactionScriptCoder"), Fs), Qs, Zu = (Qs = class extends mt {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new $("u16", { padToWordSize: !0 }).encode(t.bytecodeWitnessIndex)), e.push(new at().encode(t.salt)), e.push(new rt("u64").encode(t.storageSlotsCount)), e.push(new $("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(
      new wt(new Hu(), t.storageSlotsCount.toNumber()).encode(
        t.storageSlots
      )
    ), e.push(new Br().encode(t.policies)), e.push(new wt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new wt(new vr(), t.outputsCount).encode(t.outputs)), e.push(new wt(new xr(), t.witnessesCount).encode(t.witnesses)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    [n, s] = new at().decode(t, s);
    const a = n;
    [n, s] = new rt("u64").decode(t, s);
    const o = n;
    [n, s] = new $("u32", { padToWordSize: !0 }).decode(t, s);
    const d = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const _ = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const A = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const g = n;
    [n, s] = new wt(new Hu(), o.toNumber()).decode(
      t,
      s
    );
    const y = n;
    [n, s] = new Br().decode(t, s, d);
    const S = n;
    [n, s] = new wt(new Cr(), _).decode(t, s);
    const O = n;
    [n, s] = new wt(new vr(), A).decode(t, s);
    const R = n;
    return [n, s] = new wt(new xr(), g).decode(t, s), [
      {
        type: 1,
        bytecodeWitnessIndex: i,
        policyTypes: d,
        storageSlotsCount: o,
        inputsCount: _,
        outputsCount: A,
        witnessesCount: g,
        salt: a,
        policies: S,
        storageSlots: y,
        inputs: O,
        outputs: R,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Qs, "TransactionCreateCoder"), Qs), Os, ju = (Os = class extends mt {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new Ln().encode(t.txPointer)), e.push(new ka().encode(t.inputContract)), e.push(new Ua().encode(t.outputContract)), e.push(new rt("u64").encode(t.mintAmount)), e.push(new at().encode(t.mintAssetId)), e.push(new rt("u64").encode(t.gasPrice)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new Ln().decode(t, s);
    const i = n;
    [n, s] = new ka().decode(t, s);
    const a = n;
    [n, s] = new Ua().decode(t, s);
    const o = n;
    [n, s] = new rt("u64").decode(t, s);
    const d = n;
    [n, s] = new at().decode(t, s);
    const _ = n;
    return [n, s] = new rt("u64").decode(t, s), [
      {
        type: 2,
        txPointer: i,
        inputContract: a,
        outputContract: o,
        mintAmount: d,
        mintAssetId: _,
        gasPrice: n
      },
      s
    ];
  }
}, Nt(Os, "TransactionMintCoder"), Os), Ms, Ju = (Ms = class extends mt {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new Wu().encode(t.upgradePurpose)), e.push(new $("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(new Br().encode(t.policies)), e.push(new wt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new wt(new vr(), t.outputsCount).encode(t.outputs)), e.push(new wt(new xr(), t.witnessesCount).encode(t.witnesses)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new Wu().decode(t, s);
    const i = n;
    [n, s] = new $("u32", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const o = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const d = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const _ = n;
    [n, s] = new Br().decode(t, s, a);
    const A = n;
    [n, s] = new wt(new Cr(), o).decode(t, s);
    const g = n;
    [n, s] = new wt(new vr(), d).decode(t, s);
    const y = n;
    return [n, s] = new wt(new xr(), _).decode(t, s), [
      {
        type: 3,
        upgradePurpose: i,
        policyTypes: a,
        inputsCount: o,
        outputsCount: d,
        witnessesCount: _,
        policies: A,
        inputs: g,
        outputs: y,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Ms, "TransactionUpgradeCoder"), Ms), Ps, qu = (Ps = class extends mt {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new at().encode(t.root)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessIndex)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.subsectionIndex)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.subsectionsNumber)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.proofSetCount)), e.push(new $("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(new wt(new at(), t.proofSetCount).encode(t.proofSet)), e.push(new Br().encode(t.policies)), e.push(new wt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new wt(new vr(), t.outputsCount).encode(t.outputs)), e.push(new wt(new xr(), t.witnessesCount).encode(t.witnesses)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const o = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const d = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const _ = n;
    [n, s] = new $("u32", { padToWordSize: !0 }).decode(t, s);
    const A = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const g = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const y = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const S = n;
    [n, s] = new wt(new at(), _).decode(t, s);
    const O = n;
    [n, s] = new Br().decode(t, s, A);
    const R = n;
    [n, s] = new wt(new Cr(), g).decode(t, s);
    const F = n;
    [n, s] = new wt(new vr(), y).decode(t, s);
    const z = n;
    return [n, s] = new wt(new xr(), S).decode(t, s), [
      {
        type: 4,
        root: i,
        witnessIndex: a,
        subsectionIndex: o,
        subsectionsNumber: d,
        proofSetCount: _,
        policyTypes: A,
        inputsCount: g,
        outputsCount: y,
        witnessesCount: S,
        proofSet: O,
        policies: R,
        inputs: F,
        outputs: z,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Ps, "TransactionUploadCoder"), Ps), Ls, $u = (Ls = class extends mt {
  constructor() {
    super("TransactionBlob", "struct TransactionBlob", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new at().encode(t.blobId)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessIndex)), e.push(new $("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new $("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(new Br().encode(t.policies)), e.push(new wt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new wt(new vr(), t.outputsCount).encode(t.outputs)), e.push(new wt(new xr(), t.witnessesCount).encode(t.witnesses)), ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new at().decode(t, s);
    const i = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new $("u32", { padToWordSize: !0 }).decode(t, s);
    const o = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const d = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const _ = n;
    [n, s] = new $("u16", { padToWordSize: !0 }).decode(t, s);
    const A = n;
    [n, s] = new Br().decode(t, s, o);
    const g = n;
    [n, s] = new wt(new Cr(), d).decode(t, s);
    const y = n;
    [n, s] = new wt(new vr(), _).decode(t, s);
    const S = n;
    return [n, s] = new wt(new xr(), A).decode(t, s), [
      {
        type: 5,
        blobId: i,
        witnessIndex: a,
        policyTypes: o,
        inputsCount: d,
        outputsCount: _,
        witnessesCount: A,
        policies: g,
        inputs: y,
        outputs: S,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Ls, "TransactionBlobCoder"), Ls), ks, Er = (ks = class extends mt {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(t) {
    const e = [];
    e.push(new $("u8", { padToWordSize: !0 }).encode(t.type));
    const { type: n } = t;
    switch (t.type) {
      case 0: {
        e.push(
          new Xu().encode(t)
        );
        break;
      }
      case 1: {
        e.push(
          new Zu().encode(t)
        );
        break;
      }
      case 2: {
        e.push(new ju().encode(t));
        break;
      }
      case 3: {
        e.push(
          new Ju().encode(t)
        );
        break;
      }
      case 4: {
        e.push(
          new qu().encode(t)
        );
        break;
      }
      case 5: {
        e.push(new $u().encode(t));
        break;
      }
      default:
        throw new v(
          L.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${n}`
        );
    }
    return ot(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new $("u8", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    switch (i) {
      case 0:
        return [n, s] = new Xu().decode(t, s), [n, s];
      case 1:
        return [n, s] = new Zu().decode(t, s), [n, s];
      case 2:
        return [n, s] = new ju().decode(t, s), [n, s];
      case 3:
        return [n, s] = new Ju().decode(t, s), [n, s];
      case 4:
        return [n, s] = new qu().decode(t, s), [n, s];
      case 5:
        return [n, s] = new $u().decode(t, s), [n, s];
      default:
        throw new v(
          L.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${i}`
        );
    }
  }
}, Nt(ks, "TransactionCoder"), ks), Us, Fx = (Us = class extends wo {
  constructor() {
    super("UtxoId", {
      transactionId: new at(),
      outputIndex: new $("u16", { padToWordSize: !0 })
    });
  }
}, Nt(Us, "UtxoIdCoder"), Us);
function Km(r) {
  return r != null && typeof r == "object" && r["@@functional/placeholder"] === !0;
}
function cf(r) {
  return function t(e) {
    return arguments.length === 0 || Km(e) ? t : r.apply(this, arguments);
  };
}
var ty = /* @__PURE__ */ cf(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function ey(r) {
  return new RegExp(r.source, r.flags ? r.flags : (r.global ? "g" : "") + (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.sticky ? "y" : "") + (r.unicode ? "u" : "") + (r.dotAll ? "s" : ""));
}
function df(r, t, e) {
  if (e || (e = new ny()), ry(r))
    return r;
  var n = function(i) {
    var a = e.get(r);
    if (a)
      return a;
    e.set(r, i);
    for (var o in r)
      Object.prototype.hasOwnProperty.call(r, o) && (i[o] = df(r[o], !0, e));
    return i;
  };
  switch (ty(r)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(r)));
    case "Array":
      return n(Array(r.length));
    case "Date":
      return new Date(r.valueOf());
    case "RegExp":
      return ey(r);
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      return r.slice();
    default:
      return r;
  }
}
function ry(r) {
  var t = typeof r;
  return r == null || t != "object" && t != "function";
}
var ny = /* @__PURE__ */ function() {
  function r() {
    this.map = {}, this.length = 0;
  }
  return r.prototype.set = function(t, e) {
    var n = this.hash(t), s = this.map[n];
    s || (this.map[n] = s = []), s.push([t, e]), this.length += 1;
  }, r.prototype.hash = function(t) {
    var e = [];
    for (var n in t)
      e.push(Object.prototype.toString.call(t[n]));
    return e.join();
  }, r.prototype.get = function(t) {
    if (this.length <= 180) {
      for (var e in this.map)
        for (var a = this.map[e], n = 0; n < a.length; n += 1) {
          var s = a[n];
          if (s[0] === t)
            return s[1];
        }
      return;
    }
    var i = this.hash(t), a = this.map[i];
    if (a)
      for (var n = 0; n < a.length; n += 1) {
        var s = a[n];
        if (s[0] === t)
          return s[1];
      }
  }, r;
}(), Ne = /* @__PURE__ */ cf(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : df(t);
});
const Nd = JSON, sy = (r) => r.toUpperCase(), iy = (r) => {
  const t = {};
  return r.forEach((e, n) => {
    t[n] = e;
  }), t;
}, ay = (r, t, e) => r.document ? r : {
  document: r,
  variables: t,
  requestHeaders: e,
  signal: void 0
}, oy = (r, t, e) => r.query ? r : {
  query: r,
  variables: t,
  requestHeaders: e,
  signal: void 0
}, cy = (r, t) => r.documents ? r : {
  documents: r,
  requestHeaders: t,
  signal: void 0
};
function Ba(r, t) {
  if (!!!r)
    throw new Error(t);
}
function dy(r) {
  return typeof r == "object" && r !== null;
}
function uy(r, t) {
  if (!!!r)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const hy = /\r\n|[\n\r]/g;
function Zc(r, t) {
  let e = 0, n = 1;
  for (const s of r.body.matchAll(hy)) {
    if (typeof s.index == "number" || uy(!1), s.index >= t)
      break;
    e = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - e
  };
}
function ly(r) {
  return uf(
    r.source,
    Zc(r.source, r.start)
  );
}
function uf(r, t) {
  const e = r.locationOffset.column - 1, n = "".padStart(e) + r.body, s = t.line - 1, i = r.locationOffset.line - 1, a = t.line + i, o = t.line === 1 ? e : 0, d = t.column + o, _ = `${r.name}:${a}:${d}
`, A = n.split(/\r\n|[\n\r]/g), g = A[s];
  if (g.length > 120) {
    const y = Math.floor(d / 80), S = d % 80, O = [];
    for (let R = 0; R < g.length; R += 80)
      O.push(g.slice(R, R + 80));
    return _ + Ku([
      [`${a} |`, O[0]],
      ...O.slice(1, y + 1).map((R) => ["|", R]),
      ["|", "^".padStart(S)],
      ["|", O[y + 1]]
    ]);
  }
  return _ + Ku([
    // Lines specified like this: ["prefix", "string"],
    [`${a - 1} |`, A[s - 1]],
    [`${a} |`, g],
    ["|", "^".padStart(d)],
    [`${a + 1} |`, A[s + 1]]
  ]);
}
function Ku(r) {
  const t = r.filter(([n, s]) => s !== void 0), e = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(e) + (s ? " " + s : "")).join(`
`);
}
function _y(r) {
  const t = r[0];
  return t == null || "kind" in t || "length" in t ? {
    nodes: t,
    source: r[1],
    positions: r[2],
    path: r[3],
    originalError: r[4],
    extensions: r[5]
  } : t;
}
class Dd extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(t, ...e) {
    var n, s, i;
    const { nodes: a, source: o, positions: d, path: _, originalError: A, extensions: g } = _y(e);
    super(t), this.name = "GraphQLError", this.path = _ ?? void 0, this.originalError = A ?? void 0, this.nodes = th(
      Array.isArray(a) ? a : a ? [a] : void 0
    );
    const y = th(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((O) => O.loc).filter((O) => O != null)
    );
    this.source = o ?? (y == null || (s = y[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (y == null ? void 0 : y.map((O) => O.start)), this.locations = d && o ? d.map((O) => Zc(o, O)) : y == null ? void 0 : y.map((O) => Zc(O.source, O.start));
    const S = dy(
      A == null ? void 0 : A.extensions
    ) ? A == null ? void 0 : A.extensions : void 0;
    this.extensions = (i = g ?? S) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), A != null && A.stack ? Object.defineProperty(this, "stack", {
      value: A.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Dd) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let t = this.message;
    if (this.nodes)
      for (const e of this.nodes)
        e.loc && (t += `

` + ly(e.loc));
    else if (this.source && this.locations)
      for (const e of this.locations)
        t += `

` + uf(this.source, e);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function th(r) {
  return r === void 0 || r.length === 0 ? void 0 : r;
}
function Ce(r, t, e) {
  return new Dd(`Syntax Error: ${e}`, {
    source: r,
    positions: [t]
  });
}
class py {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(t, e, n) {
    this.start = t.start, this.end = e.end, this.startToken = t, this.endToken = e, this.source = n;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class hf {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(t, e, n, s, i, a) {
    this.kind = t, this.start = e, this.end = n, this.line = s, this.column = i, this.value = a, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const lf = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
}, fy = new Set(Object.keys(lf));
function eh(r) {
  const t = r == null ? void 0 : r.kind;
  return typeof t == "string" && fy.has(t);
}
var jn;
(function(r) {
  r.QUERY = "query", r.MUTATION = "mutation", r.SUBSCRIPTION = "subscription";
})(jn || (jn = {}));
var jc;
(function(r) {
  r.QUERY = "QUERY", r.MUTATION = "MUTATION", r.SUBSCRIPTION = "SUBSCRIPTION", r.FIELD = "FIELD", r.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", r.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", r.INLINE_FRAGMENT = "INLINE_FRAGMENT", r.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", r.SCHEMA = "SCHEMA", r.SCALAR = "SCALAR", r.OBJECT = "OBJECT", r.FIELD_DEFINITION = "FIELD_DEFINITION", r.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", r.INTERFACE = "INTERFACE", r.UNION = "UNION", r.ENUM = "ENUM", r.ENUM_VALUE = "ENUM_VALUE", r.INPUT_OBJECT = "INPUT_OBJECT", r.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(jc || (jc = {}));
var ct;
(function(r) {
  r.NAME = "Name", r.DOCUMENT = "Document", r.OPERATION_DEFINITION = "OperationDefinition", r.VARIABLE_DEFINITION = "VariableDefinition", r.SELECTION_SET = "SelectionSet", r.FIELD = "Field", r.ARGUMENT = "Argument", r.FRAGMENT_SPREAD = "FragmentSpread", r.INLINE_FRAGMENT = "InlineFragment", r.FRAGMENT_DEFINITION = "FragmentDefinition", r.VARIABLE = "Variable", r.INT = "IntValue", r.FLOAT = "FloatValue", r.STRING = "StringValue", r.BOOLEAN = "BooleanValue", r.NULL = "NullValue", r.ENUM = "EnumValue", r.LIST = "ListValue", r.OBJECT = "ObjectValue", r.OBJECT_FIELD = "ObjectField", r.DIRECTIVE = "Directive", r.NAMED_TYPE = "NamedType", r.LIST_TYPE = "ListType", r.NON_NULL_TYPE = "NonNullType", r.SCHEMA_DEFINITION = "SchemaDefinition", r.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", r.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", r.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", r.FIELD_DEFINITION = "FieldDefinition", r.INPUT_VALUE_DEFINITION = "InputValueDefinition", r.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", r.UNION_TYPE_DEFINITION = "UnionTypeDefinition", r.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", r.ENUM_VALUE_DEFINITION = "EnumValueDefinition", r.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", r.DIRECTIVE_DEFINITION = "DirectiveDefinition", r.SCHEMA_EXTENSION = "SchemaExtension", r.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", r.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", r.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", r.UNION_TYPE_EXTENSION = "UnionTypeExtension", r.ENUM_TYPE_EXTENSION = "EnumTypeExtension", r.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ct || (ct = {}));
function Jc(r) {
  return r === 9 || r === 32;
}
function ji(r) {
  return r >= 48 && r <= 57;
}
function _f(r) {
  return r >= 97 && r <= 122 || // A-Z
  r >= 65 && r <= 90;
}
function pf(r) {
  return _f(r) || r === 95;
}
function Ay(r) {
  return _f(r) || ji(r) || r === 95;
}
function gy(r) {
  var t;
  let e = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let a = 0; a < r.length; ++a) {
    var i;
    const o = r[a], d = wy(o);
    d !== o.length && (n = (i = n) !== null && i !== void 0 ? i : a, s = a, a !== 0 && d < e && (e = d));
  }
  return r.map((a, o) => o === 0 ? a : a.slice(e)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function wy(r) {
  let t = 0;
  for (; t < r.length && Jc(r.charCodeAt(t)); )
    ++t;
  return t;
}
function my(r, t) {
  const e = r.replace(/"""/g, '\\"""'), n = e.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((S) => S.length === 0 || Jc(S.charCodeAt(0))), a = e.endsWith('\\"""'), o = r.endsWith('"') && !a, d = r.endsWith("\\"), _ = o || d, A = (
    // add leading and trailing new lines only if it improves readability
    !s || r.length > 70 || _ || i || a
  );
  let g = "";
  const y = s && Jc(r.charCodeAt(0));
  return (A && !y || i) && (g += `
`), g += e, (A || _) && (g += `
`), '"""' + g + '"""';
}
var W;
(function(r) {
  r.SOF = "<SOF>", r.EOF = "<EOF>", r.BANG = "!", r.DOLLAR = "$", r.AMP = "&", r.PAREN_L = "(", r.PAREN_R = ")", r.SPREAD = "...", r.COLON = ":", r.EQUALS = "=", r.AT = "@", r.BRACKET_L = "[", r.BRACKET_R = "]", r.BRACE_L = "{", r.PIPE = "|", r.BRACE_R = "}", r.NAME = "Name", r.INT = "Int", r.FLOAT = "Float", r.STRING = "String", r.BLOCK_STRING = "BlockString", r.COMMENT = "Comment";
})(W || (W = {}));
class yy {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(t) {
    const e = new hf(W.SOF, 0, 0, 0, 0);
    this.source = t, this.lastToken = e, this.token = e, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let t = this.token;
    if (t.kind !== W.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const e = Iy(this, t.end);
          t.next = e, e.prev = t, t = e;
        }
      while (t.kind === W.COMMENT);
    return t;
  }
}
function by(r) {
  return r === W.BANG || r === W.DOLLAR || r === W.AMP || r === W.PAREN_L || r === W.PAREN_R || r === W.SPREAD || r === W.COLON || r === W.EQUALS || r === W.AT || r === W.BRACKET_L || r === W.BRACKET_R || r === W.BRACE_L || r === W.PIPE || r === W.BRACE_R;
}
function xi(r) {
  return r >= 0 && r <= 55295 || r >= 57344 && r <= 1114111;
}
function Io(r, t) {
  return ff(r.charCodeAt(t)) && Af(r.charCodeAt(t + 1));
}
function ff(r) {
  return r >= 55296 && r <= 56319;
}
function Af(r) {
  return r >= 56320 && r <= 57343;
}
function kn(r, t) {
  const e = r.source.body.codePointAt(t);
  if (e === void 0)
    return W.EOF;
  if (e >= 32 && e <= 126) {
    const n = String.fromCodePoint(e);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + e.toString(16).toUpperCase().padStart(4, "0");
}
function be(r, t, e, n, s) {
  const i = r.line, a = 1 + e - r.lineStart;
  return new hf(t, e, n, i, a, s);
}
function Iy(r, t) {
  const e = r.source.body, n = e.length;
  let s = t;
  for (; s < n; ) {
    const i = e.charCodeAt(s);
    switch (i) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++s;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++s, ++r.line, r.lineStart = s;
        continue;
      case 13:
        e.charCodeAt(s + 1) === 10 ? s += 2 : ++s, ++r.line, r.lineStart = s;
        continue;
      // Comment
      case 35:
        return Ey(r, s);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return be(r, W.BANG, s, s + 1);
      case 36:
        return be(r, W.DOLLAR, s, s + 1);
      case 38:
        return be(r, W.AMP, s, s + 1);
      case 40:
        return be(r, W.PAREN_L, s, s + 1);
      case 41:
        return be(r, W.PAREN_R, s, s + 1);
      case 46:
        if (e.charCodeAt(s + 1) === 46 && e.charCodeAt(s + 2) === 46)
          return be(r, W.SPREAD, s, s + 3);
        break;
      case 58:
        return be(r, W.COLON, s, s + 1);
      case 61:
        return be(r, W.EQUALS, s, s + 1);
      case 64:
        return be(r, W.AT, s, s + 1);
      case 91:
        return be(r, W.BRACKET_L, s, s + 1);
      case 93:
        return be(r, W.BRACKET_R, s, s + 1);
      case 123:
        return be(r, W.BRACE_L, s, s + 1);
      case 124:
        return be(r, W.PIPE, s, s + 1);
      case 125:
        return be(r, W.BRACE_R, s, s + 1);
      // StringValue
      case 34:
        return e.charCodeAt(s + 1) === 34 && e.charCodeAt(s + 2) === 34 ? Sy(r, s) : vy(r, s);
    }
    if (ji(i) || i === 45)
      return Cy(r, s, i);
    if (pf(i))
      return Ty(r, s);
    throw Ce(
      r.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : xi(i) || Io(e, s) ? `Unexpected character: ${kn(r, s)}.` : `Invalid character: ${kn(r, s)}.`
    );
  }
  return be(r, W.EOF, n, n);
}
function Ey(r, t) {
  const e = r.source.body, n = e.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = e.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (xi(i))
      ++s;
    else if (Io(e, s))
      s += 2;
    else
      break;
  }
  return be(
    r,
    W.COMMENT,
    t,
    s,
    e.slice(t + 1, s)
  );
}
function Cy(r, t, e) {
  const n = r.source.body;
  let s = t, i = e, a = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), ji(i))
      throw Ce(
        r.source,
        s,
        `Invalid number, unexpected digit after 0: ${kn(
          r,
          s
        )}.`
      );
  } else
    s = uc(r, s, i), i = n.charCodeAt(s);
  if (i === 46 && (a = !0, i = n.charCodeAt(++s), s = uc(r, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (a = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = uc(r, s, i), i = n.charCodeAt(s)), i === 46 || pf(i))
    throw Ce(
      r.source,
      s,
      `Invalid number, expected digit but got: ${kn(
        r,
        s
      )}.`
    );
  return be(
    r,
    a ? W.FLOAT : W.INT,
    t,
    s,
    n.slice(t, s)
  );
}
function uc(r, t, e) {
  if (!ji(e))
    throw Ce(
      r.source,
      t,
      `Invalid number, expected digit but got: ${kn(
        r,
        t
      )}.`
    );
  const n = r.source.body;
  let s = t + 1;
  for (; ji(n.charCodeAt(s)); )
    ++s;
  return s;
}
function vy(r, t) {
  const e = r.source.body, n = e.length;
  let s = t + 1, i = s, a = "";
  for (; s < n; ) {
    const o = e.charCodeAt(s);
    if (o === 34)
      return a += e.slice(i, s), be(r, W.STRING, t, s + 1, a);
    if (o === 92) {
      a += e.slice(i, s);
      const d = e.charCodeAt(s + 1) === 117 ? e.charCodeAt(s + 2) === 123 ? By(r, s) : xy(r, s) : Ry(r, s);
      a += d.value, s += d.size, i = s;
      continue;
    }
    if (o === 10 || o === 13)
      break;
    if (xi(o))
      ++s;
    else if (Io(e, s))
      s += 2;
    else
      throw Ce(
        r.source,
        s,
        `Invalid character within String: ${kn(
          r,
          s
        )}.`
      );
  }
  throw Ce(r.source, s, "Unterminated string.");
}
function By(r, t) {
  const e = r.source.body;
  let n = 0, s = 3;
  for (; s < 12; ) {
    const i = e.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !xi(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: s
      };
    }
    if (n = n << 4 | Ui(i), n < 0)
      break;
  }
  throw Ce(
    r.source,
    t,
    `Invalid Unicode escape sequence: "${e.slice(
      t,
      t + s
    )}".`
  );
}
function xy(r, t) {
  const e = r.source.body, n = rh(e, t + 2);
  if (xi(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (ff(n) && e.charCodeAt(t + 6) === 92 && e.charCodeAt(t + 7) === 117) {
    const s = rh(e, t + 8);
    if (Af(s))
      return {
        value: String.fromCodePoint(n, s),
        size: 12
      };
  }
  throw Ce(
    r.source,
    t,
    `Invalid Unicode escape sequence: "${e.slice(t, t + 6)}".`
  );
}
function rh(r, t) {
  return Ui(r.charCodeAt(t)) << 12 | Ui(r.charCodeAt(t + 1)) << 8 | Ui(r.charCodeAt(t + 2)) << 4 | Ui(r.charCodeAt(t + 3));
}
function Ui(r) {
  return r >= 48 && r <= 57 ? r - 48 : r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : -1;
}
function Ry(r, t) {
  const e = r.source.body;
  switch (e.charCodeAt(t + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw Ce(
    r.source,
    t,
    `Invalid character escape sequence: "${e.slice(
      t,
      t + 2
    )}".`
  );
}
function Sy(r, t) {
  const e = r.source.body, n = e.length;
  let s = r.lineStart, i = t + 3, a = i, o = "";
  const d = [];
  for (; i < n; ) {
    const _ = e.charCodeAt(i);
    if (_ === 34 && e.charCodeAt(i + 1) === 34 && e.charCodeAt(i + 2) === 34) {
      o += e.slice(a, i), d.push(o);
      const A = be(
        r,
        W.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        gy(d).join(`
`)
      );
      return r.line += d.length - 1, r.lineStart = s, A;
    }
    if (_ === 92 && e.charCodeAt(i + 1) === 34 && e.charCodeAt(i + 2) === 34 && e.charCodeAt(i + 3) === 34) {
      o += e.slice(a, i), a = i + 1, i += 4;
      continue;
    }
    if (_ === 10 || _ === 13) {
      o += e.slice(a, i), d.push(o), _ === 13 && e.charCodeAt(i + 1) === 10 ? i += 2 : ++i, o = "", a = i, s = i;
      continue;
    }
    if (xi(_))
      ++i;
    else if (Io(e, i))
      i += 2;
    else
      throw Ce(
        r.source,
        i,
        `Invalid character within String: ${kn(
          r,
          i
        )}.`
      );
  }
  throw Ce(r.source, i, "Unterminated string.");
}
function Ty(r, t) {
  const e = r.source.body, n = e.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = e.charCodeAt(s);
    if (Ay(i))
      ++s;
    else
      break;
  }
  return be(
    r,
    W.NAME,
    t,
    s,
    e.slice(t, s)
  );
}
const Ny = 10, gf = 2;
function Fd(r) {
  return Eo(r, []);
}
function Eo(r, t) {
  switch (typeof r) {
    case "string":
      return JSON.stringify(r);
    case "function":
      return r.name ? `[function ${r.name}]` : "[function]";
    case "object":
      return Dy(r, t);
    default:
      return String(r);
  }
}
function Dy(r, t) {
  if (r === null)
    return "null";
  if (t.includes(r))
    return "[Circular]";
  const e = [...t, r];
  if (Fy(r)) {
    const n = r.toJSON();
    if (n !== r)
      return typeof n == "string" ? n : Eo(n, e);
  } else if (Array.isArray(r))
    return Oy(r, e);
  return Qy(r, e);
}
function Fy(r) {
  return typeof r.toJSON == "function";
}
function Qy(r, t) {
  const e = Object.entries(r);
  return e.length === 0 ? "{}" : t.length > gf ? "[" + My(r) + "]" : "{ " + e.map(
    ([s, i]) => s + ": " + Eo(i, t)
  ).join(", ") + " }";
}
function Oy(r, t) {
  if (r.length === 0)
    return "[]";
  if (t.length > gf)
    return "[Array]";
  const e = Math.min(Ny, r.length), n = r.length - e, s = [];
  for (let i = 0; i < e; ++i)
    s.push(Eo(r[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function My(r) {
  const t = Object.prototype.toString.call(r).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof r.constructor == "function") {
    const e = r.constructor.name;
    if (typeof e == "string" && e !== "")
      return e;
  }
  return t;
}
const Py = globalThis.process && // eslint-disable-next-line no-undef
!0, Ly = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  Py ? function(t, e) {
    return t instanceof e;
  } : function(t, e) {
    if (t instanceof e)
      return !0;
    if (typeof t == "object" && t !== null) {
      var n;
      const s = e.prototype[Symbol.toStringTag], i = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in t ? t[Symbol.toStringTag] : (n = t.constructor) === null || n === void 0 ? void 0 : n.name
      );
      if (s === i) {
        const a = Fd(t);
        throw new Error(`Cannot use ${s} "${a}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return !1;
  }
);
class wf {
  constructor(t, e = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Ba(!1, `Body must be a string. Received: ${Fd(t)}.`), this.body = t, this.name = e, this.locationOffset = n, this.locationOffset.line > 0 || Ba(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Ba(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function ky(r) {
  return Ly(r, wf);
}
function mf(r, t) {
  const e = new Uy(r, t), n = e.parseDocument();
  return Object.defineProperty(n, "tokenCount", {
    enumerable: !1,
    value: e.tokenCount
  }), n;
}
class Uy {
  constructor(t, e = {}) {
    const n = ky(t) ? t : new wf(t);
    this._lexer = new yy(n), this._options = e, this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(W.NAME);
    return this.node(t, {
      kind: ct.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ct.DOCUMENT,
      definitions: this.many(
        W.SOF,
        this.parseDefinition,
        W.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(W.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), e = t ? this._lexer.lookahead() : this._lexer.token;
    if (e.kind === W.NAME) {
      switch (e.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (t)
        throw Ce(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (e.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(e);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const t = this._lexer.token;
    if (this.peek(W.BRACE_L))
      return this.node(t, {
        kind: ct.OPERATION_DEFINITION,
        operation: jn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const e = this.parseOperationType();
    let n;
    return this.peek(W.NAME) && (n = this.parseName()), this.node(t, {
      kind: ct.OPERATION_DEFINITION,
      operation: e,
      name: n,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const t = this.expectToken(W.NAME);
    switch (t.value) {
      case "query":
        return jn.QUERY;
      case "mutation":
        return jn.MUTATION;
      case "subscription":
        return jn.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      W.PAREN_L,
      this.parseVariableDefinition,
      W.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ct.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(W.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(W.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(W.DOLLAR), this.node(t, {
      kind: ct.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: ct.SELECTION_SET,
      selections: this.many(
        W.BRACE_L,
        this.parseSelection,
        W.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(W.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, e = this.parseName();
    let n, s;
    return this.expectOptionalToken(W.COLON) ? (n = e, s = this.parseName()) : s = e, this.node(t, {
      kind: ct.FIELD,
      alias: n,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(W.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const e = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(W.PAREN_L, e, W.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const e = this._lexer.token, n = this.parseName();
    return this.expectToken(W.COLON), this.node(e, {
      kind: ct.ARGUMENT,
      name: n,
      value: this.parseValueLiteral(t)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const t = this._lexer.token;
    this.expectToken(W.SPREAD);
    const e = this.expectOptionalKeyword("on");
    return !e && this.peek(W.NAME) ? this.node(t, {
      kind: ct.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: ct.INLINE_FRAGMENT,
      typeCondition: e ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const t = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(t, {
      kind: ct.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: ct.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(t) {
    const e = this._lexer.token;
    switch (e.kind) {
      case W.BRACKET_L:
        return this.parseList(t);
      case W.BRACE_L:
        return this.parseObject(t);
      case W.INT:
        return this.advanceLexer(), this.node(e, {
          kind: ct.INT,
          value: e.value
        });
      case W.FLOAT:
        return this.advanceLexer(), this.node(e, {
          kind: ct.FLOAT,
          value: e.value
        });
      case W.STRING:
      case W.BLOCK_STRING:
        return this.parseStringLiteral();
      case W.NAME:
        switch (this.advanceLexer(), e.value) {
          case "true":
            return this.node(e, {
              kind: ct.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(e, {
              kind: ct.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(e, {
              kind: ct.NULL
            });
          default:
            return this.node(e, {
              kind: ct.ENUM,
              value: e.value
            });
        }
      case W.DOLLAR:
        if (t)
          if (this.expectToken(W.DOLLAR), this._lexer.token.kind === W.NAME) {
            const n = this._lexer.token.value;
            throw Ce(
              this._lexer.source,
              e.start,
              `Unexpected variable "$${n}" in constant value.`
            );
          } else
            throw this.unexpected(e);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const t = this._lexer.token;
    return this.advanceLexer(), this.node(t, {
      kind: ct.STRING,
      value: t.value,
      block: t.kind === W.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(t) {
    const e = () => this.parseValueLiteral(t);
    return this.node(this._lexer.token, {
      kind: ct.LIST,
      values: this.any(W.BRACKET_L, e, W.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(t) {
    const e = () => this.parseObjectField(t);
    return this.node(this._lexer.token, {
      kind: ct.OBJECT,
      fields: this.any(W.BRACE_L, e, W.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const e = this._lexer.token, n = this.parseName();
    return this.expectToken(W.COLON), this.node(e, {
      kind: ct.OBJECT_FIELD,
      name: n,
      value: this.parseValueLiteral(t)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(t) {
    const e = [];
    for (; this.peek(W.AT); )
      e.push(this.parseDirective(t));
    return e;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(t) {
    const e = this._lexer.token;
    return this.expectToken(W.AT), this.node(e, {
      kind: ct.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(t)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const t = this._lexer.token;
    let e;
    if (this.expectOptionalToken(W.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(W.BRACKET_R), e = this.node(t, {
        kind: ct.LIST_TYPE,
        type: n
      });
    } else
      e = this.parseNamedType();
    return this.expectOptionalToken(W.BANG) ? this.node(t, {
      kind: ct.NON_NULL_TYPE,
      type: e
    }) : e;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ct.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(W.STRING) || this.peek(W.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("schema");
    const n = this.parseConstDirectives(), s = this.many(
      W.BRACE_L,
      this.parseOperationTypeDefinition,
      W.BRACE_R
    );
    return this.node(t, {
      kind: ct.SCHEMA_DEFINITION,
      description: e,
      directives: n,
      operationTypes: s
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const t = this._lexer.token, e = this.parseOperationType();
    this.expectToken(W.COLON);
    const n = this.parseNamedType();
    return this.node(t, {
      kind: ct.OPERATION_TYPE_DEFINITION,
      operation: e,
      type: n
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("scalar");
    const n = this.parseName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: ct.SCALAR_TYPE_DEFINITION,
      description: e,
      name: n,
      directives: s
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("type");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ct.OBJECT_TYPE_DEFINITION,
      description: e,
      name: n,
      interfaces: s,
      directives: i,
      fields: a
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(W.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      W.BRACE_L,
      this.parseFieldDefinition,
      W.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, e = this.parseDescription(), n = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(W.COLON);
    const i = this.parseTypeReference(), a = this.parseConstDirectives();
    return this.node(t, {
      kind: ct.FIELD_DEFINITION,
      description: e,
      name: n,
      arguments: s,
      type: i,
      directives: a
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      W.PAREN_L,
      this.parseInputValueDef,
      W.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, e = this.parseDescription(), n = this.parseName();
    this.expectToken(W.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(W.EQUALS) && (i = this.parseConstValueLiteral());
    const a = this.parseConstDirectives();
    return this.node(t, {
      kind: ct.INPUT_VALUE_DEFINITION,
      description: e,
      name: n,
      type: s,
      defaultValue: i,
      directives: a
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("interface");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ct.INTERFACE_TYPE_DEFINITION,
      description: e,
      name: n,
      interfaces: s,
      directives: i,
      fields: a
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("union");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    return this.node(t, {
      kind: ct.UNION_TYPE_DEFINITION,
      description: e,
      name: n,
      directives: s,
      types: i
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(W.EQUALS) ? this.delimitedMany(W.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("enum");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    return this.node(t, {
      kind: ct.ENUM_TYPE_DEFINITION,
      description: e,
      name: n,
      directives: s,
      values: i
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      W.BRACE_L,
      this.parseEnumValueDefinition,
      W.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, e = this.parseDescription(), n = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: ct.ENUM_VALUE_DEFINITION,
      description: e,
      name: n,
      directives: s
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw Ce(
        this._lexer.source,
        this._lexer.token.start,
        `${Aa(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("input");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    return this.node(t, {
      kind: ct.INPUT_OBJECT_TYPE_DEFINITION,
      description: e,
      name: n,
      directives: s,
      fields: i
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      W.BRACE_L,
      this.parseInputValueDef,
      W.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const t = this._lexer.lookahead();
    if (t.kind === W.NAME)
      switch (t.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(t);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const e = this.parseConstDirectives(), n = this.optionalMany(
      W.BRACE_L,
      this.parseOperationTypeDefinition,
      W.BRACE_R
    );
    if (e.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.SCHEMA_EXTENSION,
      directives: e,
      operationTypes: n
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const e = this.parseName(), n = this.parseConstDirectives();
    if (n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.SCALAR_TYPE_EXTENSION,
      name: e,
      directives: n
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const e = this.parseName(), n = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (n.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.OBJECT_TYPE_EXTENSION,
      name: e,
      interfaces: n,
      directives: s,
      fields: i
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const e = this.parseName(), n = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (n.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.INTERFACE_TYPE_EXTENSION,
      name: e,
      interfaces: n,
      directives: s,
      fields: i
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const e = this.parseName(), n = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.UNION_TYPE_EXTENSION,
      name: e,
      directives: n,
      types: s
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const e = this.parseName(), n = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.ENUM_TYPE_EXTENSION,
      name: e,
      directives: n,
      values: s
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const e = this.parseName(), n = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ct.INPUT_OBJECT_TYPE_EXTENSION,
      name: e,
      directives: n,
      fields: s
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(W.AT);
    const n = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const a = this.parseDirectiveLocations();
    return this.node(t, {
      kind: ct.DIRECTIVE_DEFINITION,
      description: e,
      name: n,
      arguments: s,
      repeatable: i,
      locations: a
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(W.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const t = this._lexer.token, e = this.parseName();
    if (Object.prototype.hasOwnProperty.call(jc, e.value))
      return e;
    throw this.unexpected(t);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(t, e) {
    return this._options.noLocation !== !0 && (e.loc = new py(
      t,
      this._lexer.lastToken,
      this._lexer.source
    )), e;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(t) {
    return this._lexer.token.kind === t;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(t) {
    const e = this._lexer.token;
    if (e.kind === t)
      return this.advanceLexer(), e;
    throw Ce(
      this._lexer.source,
      e.start,
      `Expected ${yf(t)}, found ${Aa(e)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(t) {
    return this._lexer.token.kind === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(t) {
    const e = this._lexer.token;
    if (e.kind === W.NAME && e.value === t)
      this.advanceLexer();
    else
      throw Ce(
        this._lexer.source,
        e.start,
        `Expected "${t}", found ${Aa(e)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const e = this._lexer.token;
    return e.kind === W.NAME && e.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const e = t ?? this._lexer.token;
    return Ce(
      this._lexer.source,
      e.start,
      `Unexpected ${Aa(e)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(t, e, n) {
    this.expectToken(t);
    const s = [];
    for (; !this.expectOptionalToken(n); )
      s.push(e.call(this));
    return s;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(t, e, n) {
    if (this.expectOptionalToken(t)) {
      const s = [];
      do
        s.push(e.call(this));
      while (!this.expectOptionalToken(n));
      return s;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(t, e, n) {
    this.expectToken(t);
    const s = [];
    do
      s.push(e.call(this));
    while (!this.expectOptionalToken(n));
    return s;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(t, e) {
    this.expectOptionalToken(t);
    const n = [];
    do
      n.push(e.call(this));
    while (this.expectOptionalToken(t));
    return n;
  }
  advanceLexer() {
    const { maxTokens: t } = this._options, e = this._lexer.advance();
    if (e.kind !== W.EOF && (++this._tokenCounter, t !== void 0 && this._tokenCounter > t))
      throw Ce(
        this._lexer.source,
        e.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function Aa(r) {
  const t = r.value;
  return yf(r.kind) + (t != null ? ` "${t}"` : "");
}
function yf(r) {
  return by(r) ? `"${r}"` : r;
}
function zy(r) {
  return `"${r.replace(Gy, Vy)}"`;
}
const Gy = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Vy(r) {
  return Yy[r.charCodeAt(0)];
}
const Yy = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
], Hy = Object.freeze({});
function Wy(r, t, e = lf) {
  const n = /* @__PURE__ */ new Map();
  for (const z of Object.values(ct))
    n.set(z, Xy(t, z));
  let s, i = Array.isArray(r), a = [r], o = -1, d = [], _ = r, A, g;
  const y = [], S = [];
  do {
    o++;
    const z = o === a.length, H = z && d.length !== 0;
    if (z) {
      if (A = S.length === 0 ? void 0 : y[y.length - 1], _ = g, g = S.pop(), H)
        if (i) {
          _ = _.slice();
          let P = 0;
          for (const [M, Q] of d) {
            const k = M - P;
            Q === null ? (_.splice(k, 1), P++) : _[k] = Q;
          }
        } else {
          _ = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(_)
          );
          for (const [P, M] of d)
            _[P] = M;
        }
      o = s.index, a = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (A = i ? o : a[o], _ = g[A], _ == null)
        continue;
      y.push(A);
    }
    let V;
    if (!Array.isArray(_)) {
      var O, R;
      eh(_) || Ba(!1, `Invalid AST Node: ${Fd(_)}.`);
      const P = z ? (O = n.get(_.kind)) === null || O === void 0 ? void 0 : O.leave : (R = n.get(_.kind)) === null || R === void 0 ? void 0 : R.enter;
      if (V = P == null ? void 0 : P.call(t, _, A, g, y, S), V === Hy)
        break;
      if (V === !1) {
        if (!z) {
          y.pop();
          continue;
        }
      } else if (V !== void 0 && (d.push([A, V]), !z))
        if (eh(V))
          _ = V;
        else {
          y.pop();
          continue;
        }
    }
    if (V === void 0 && H && d.push([A, _]), z)
      y.pop();
    else {
      var F;
      s = {
        inArray: i,
        index: o,
        keys: a,
        edits: d,
        prev: s
      }, i = Array.isArray(_), a = i ? _ : (F = e[_.kind]) !== null && F !== void 0 ? F : [], o = -1, d = [], g && S.push(g), g = _;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : r;
}
function Xy(r, t) {
  const e = r[t];
  return typeof e == "object" ? e : typeof e == "function" ? {
    enter: e,
    leave: void 0
  } : {
    enter: r.enter,
    leave: r.leave
  };
}
function bf(r) {
  return Wy(r, jy);
}
const Zy = 80, jy = {
  Name: {
    leave: (r) => r.value
  },
  Variable: {
    leave: (r) => "$" + r.name
  },
  // Document
  Document: {
    leave: (r) => st(r.definitions, `

`)
  },
  OperationDefinition: {
    leave(r) {
      const t = yt("(", st(r.variableDefinitions, ", "), ")"), e = st(
        [
          r.operation,
          st([r.name, t]),
          st(r.directives, " ")
        ],
        " "
      );
      return (e === "query" ? "" : e + " ") + r.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: r, type: t, defaultValue: e, directives: n }) => r + ": " + t + yt(" = ", e) + yt(" ", st(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: r }) => rr(r)
  },
  Field: {
    leave({ alias: r, name: t, arguments: e, directives: n, selectionSet: s }) {
      const i = yt("", r, ": ") + t;
      let a = i + yt("(", st(e, ", "), ")");
      return a.length > Zy && (a = i + yt(`(
`, xa(st(e, `
`)), `
)`)), st([a, st(n, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: r, value: t }) => r + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: r, directives: t }) => "..." + r + yt(" ", st(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: r, directives: t, selectionSet: e }) => st(
      [
        "...",
        yt("on ", r),
        st(t, " "),
        e
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: r, typeCondition: t, variableDefinitions: e, directives: n, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${r}${yt("(", st(e, ", "), ")")} on ${t} ${yt("", st(n, " "), " ")}` + s
    )
  },
  // Value
  IntValue: {
    leave: ({ value: r }) => r
  },
  FloatValue: {
    leave: ({ value: r }) => r
  },
  StringValue: {
    leave: ({ value: r, block: t }) => t ? my(r) : zy(r)
  },
  BooleanValue: {
    leave: ({ value: r }) => r ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: r }) => r
  },
  ListValue: {
    leave: ({ values: r }) => "[" + st(r, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: r }) => "{" + st(r, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: r, value: t }) => r + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: r, arguments: t }) => "@" + r + yt("(", st(t, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: r }) => r
  },
  ListType: {
    leave: ({ type: r }) => "[" + r + "]"
  },
  NonNullType: {
    leave: ({ type: r }) => r + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: r, directives: t, operationTypes: e }) => yt("", r, `
`) + st(["schema", st(t, " "), rr(e)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: r, type: t }) => r + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: r, name: t, directives: e }) => yt("", r, `
`) + st(["scalar", t, st(e, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: r, name: t, interfaces: e, directives: n, fields: s }) => yt("", r, `
`) + st(
      [
        "type",
        t,
        yt("implements ", st(e, " & ")),
        st(n, " "),
        rr(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: r, name: t, arguments: e, type: n, directives: s }) => yt("", r, `
`) + t + (nh(e) ? yt(`(
`, xa(st(e, `
`)), `
)`) : yt("(", st(e, ", "), ")")) + ": " + n + yt(" ", st(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: r, name: t, type: e, defaultValue: n, directives: s }) => yt("", r, `
`) + st(
      [t + ": " + e, yt("= ", n), st(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: r, name: t, interfaces: e, directives: n, fields: s }) => yt("", r, `
`) + st(
      [
        "interface",
        t,
        yt("implements ", st(e, " & ")),
        st(n, " "),
        rr(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: r, name: t, directives: e, types: n }) => yt("", r, `
`) + st(
      ["union", t, st(e, " "), yt("= ", st(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: r, name: t, directives: e, values: n }) => yt("", r, `
`) + st(["enum", t, st(e, " "), rr(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: r, name: t, directives: e }) => yt("", r, `
`) + st([t, st(e, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: r, name: t, directives: e, fields: n }) => yt("", r, `
`) + st(["input", t, st(e, " "), rr(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: r, name: t, arguments: e, repeatable: n, locations: s }) => yt("", r, `
`) + "directive @" + t + (nh(e) ? yt(`(
`, xa(st(e, `
`)), `
)`) : yt("(", st(e, ", "), ")")) + (n ? " repeatable" : "") + " on " + st(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: r, operationTypes: t }) => st(
      ["extend schema", st(r, " "), rr(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: r, directives: t }) => st(["extend scalar", r, st(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: r, interfaces: t, directives: e, fields: n }) => st(
      [
        "extend type",
        r,
        yt("implements ", st(t, " & ")),
        st(e, " "),
        rr(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: r, interfaces: t, directives: e, fields: n }) => st(
      [
        "extend interface",
        r,
        yt("implements ", st(t, " & ")),
        st(e, " "),
        rr(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: r, directives: t, types: e }) => st(
      [
        "extend union",
        r,
        st(t, " "),
        yt("= ", st(e, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: r, directives: t, values: e }) => st(["extend enum", r, st(t, " "), rr(e)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: r, directives: t, fields: e }) => st(["extend input", r, st(t, " "), rr(e)], " ")
  }
};
function st(r, t = "") {
  var e;
  return (e = r == null ? void 0 : r.filter((n) => n).join(t)) !== null && e !== void 0 ? e : "";
}
function rr(r) {
  return yt(`{
`, xa(st(r, `
`)), `
}`);
}
function yt(r, t, e = "") {
  return t != null && t !== "" ? r + t + e : "";
}
function xa(r) {
  return yt("  ", r.replace(/\n/g, `
  `));
}
function nh(r) {
  var t;
  return (t = r == null ? void 0 : r.some((e) => e.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const sh = (r) => {
  var n, s;
  let t;
  const e = r.definitions.filter((i) => i.kind === "OperationDefinition");
  return e.length === 1 && (t = (s = (n = e[0]) == null ? void 0 : n.name) == null ? void 0 : s.value), t;
}, hc = (r) => {
  if (typeof r == "string") {
    let e;
    try {
      const n = mf(r);
      e = sh(n);
    } catch {
    }
    return { query: r, operationName: e };
  }
  const t = sh(r);
  return { query: bf(r), operationName: t };
};
class Yi extends Error {
  constructor(t, e) {
    const n = `${Yi.extractMessage(t)}: ${JSON.stringify({
      response: t,
      request: e
    })}`;
    super(n), Object.setPrototypeOf(this, Yi.prototype), this.response = t, this.request = e, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Yi);
  }
  static extractMessage(t) {
    var e, n;
    return ((n = (e = t.errors) == null ? void 0 : e[0]) == null ? void 0 : n.message) ?? `GraphQL Error (Code: ${t.status})`;
  }
}
var ga = { exports: {} }, ih;
function Jy() {
  return ih || (ih = 1, function(r, t) {
    var e = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Su < "u" && Su, n = function() {
      function i() {
        this.fetch = !1, this.DOMException = e.DOMException;
      }
      return i.prototype = e, new i();
    }();
    (function(i) {
      (function(a) {
        var o = typeof i < "u" && i || typeof self < "u" && self || typeof o < "u" && o, d = {
          searchParams: "URLSearchParams" in o,
          iterable: "Symbol" in o && "iterator" in Symbol,
          blob: "FileReader" in o && "Blob" in o && function() {
            try {
              return new Blob(), !0;
            } catch {
              return !1;
            }
          }(),
          formData: "FormData" in o,
          arrayBuffer: "ArrayBuffer" in o
        };
        function _(h) {
          return h && DataView.prototype.isPrototypeOf(h);
        }
        if (d.arrayBuffer)
          var A = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ], g = ArrayBuffer.isView || function(h) {
            return h && A.indexOf(Object.prototype.toString.call(h)) > -1;
          };
        function y(h) {
          if (typeof h != "string" && (h = String(h)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(h) || h === "")
            throw new TypeError('Invalid character in header field name: "' + h + '"');
          return h.toLowerCase();
        }
        function S(h) {
          return typeof h != "string" && (h = String(h)), h;
        }
        function O(h) {
          var f = {
            next: function() {
              var m = h.shift();
              return { done: m === void 0, value: m };
            }
          };
          return d.iterable && (f[Symbol.iterator] = function() {
            return f;
          }), f;
        }
        function R(h) {
          this.map = {}, h instanceof R ? h.forEach(function(f, m) {
            this.append(m, f);
          }, this) : Array.isArray(h) ? h.forEach(function(f) {
            this.append(f[0], f[1]);
          }, this) : h && Object.getOwnPropertyNames(h).forEach(function(f) {
            this.append(f, h[f]);
          }, this);
        }
        R.prototype.append = function(h, f) {
          h = y(h), f = S(f);
          var m = this.map[h];
          this.map[h] = m ? m + ", " + f : f;
        }, R.prototype.delete = function(h) {
          delete this.map[y(h)];
        }, R.prototype.get = function(h) {
          return h = y(h), this.has(h) ? this.map[h] : null;
        }, R.prototype.has = function(h) {
          return this.map.hasOwnProperty(y(h));
        }, R.prototype.set = function(h, f) {
          this.map[y(h)] = S(f);
        }, R.prototype.forEach = function(h, f) {
          for (var m in this.map)
            this.map.hasOwnProperty(m) && h.call(f, this.map[m], m, this);
        }, R.prototype.keys = function() {
          var h = [];
          return this.forEach(function(f, m) {
            h.push(m);
          }), O(h);
        }, R.prototype.values = function() {
          var h = [];
          return this.forEach(function(f) {
            h.push(f);
          }), O(h);
        }, R.prototype.entries = function() {
          var h = [];
          return this.forEach(function(f, m) {
            h.push([m, f]);
          }), O(h);
        }, d.iterable && (R.prototype[Symbol.iterator] = R.prototype.entries);
        function F(h) {
          if (h.bodyUsed)
            return Promise.reject(new TypeError("Already read"));
          h.bodyUsed = !0;
        }
        function z(h) {
          return new Promise(function(f, m) {
            h.onload = function() {
              f(h.result);
            }, h.onerror = function() {
              m(h.error);
            };
          });
        }
        function H(h) {
          var f = new FileReader(), m = z(f);
          return f.readAsArrayBuffer(h), m;
        }
        function V(h) {
          var f = new FileReader(), m = z(f);
          return f.readAsText(h), m;
        }
        function P(h) {
          for (var f = new Uint8Array(h), m = new Array(f.length), b = 0; b < f.length; b++)
            m[b] = String.fromCharCode(f[b]);
          return m.join("");
        }
        function M(h) {
          if (h.slice)
            return h.slice(0);
          var f = new Uint8Array(h.byteLength);
          return f.set(new Uint8Array(h)), f.buffer;
        }
        function Q() {
          return this.bodyUsed = !1, this._initBody = function(h) {
            this.bodyUsed = this.bodyUsed, this._bodyInit = h, h ? typeof h == "string" ? this._bodyText = h : d.blob && Blob.prototype.isPrototypeOf(h) ? this._bodyBlob = h : d.formData && FormData.prototype.isPrototypeOf(h) ? this._bodyFormData = h : d.searchParams && URLSearchParams.prototype.isPrototypeOf(h) ? this._bodyText = h.toString() : d.arrayBuffer && d.blob && _(h) ? (this._bodyArrayBuffer = M(h.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(h) || g(h)) ? this._bodyArrayBuffer = M(h) : this._bodyText = h = Object.prototype.toString.call(h) : this._bodyText = "", this.headers.get("content-type") || (typeof h == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(h) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
          }, d.blob && (this.blob = function() {
            var h = F(this);
            if (h)
              return h;
            if (this._bodyBlob)
              return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }, this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              var h = F(this);
              return h || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              ) : Promise.resolve(this._bodyArrayBuffer));
            } else
              return this.blob().then(H);
          }), this.text = function() {
            var h = F(this);
            if (h)
              return h;
            if (this._bodyBlob)
              return V(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(P(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }, d.formData && (this.formData = function() {
            return this.text().then(j);
          }), this.json = function() {
            return this.text().then(JSON.parse);
          }, this;
        }
        var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function U(h) {
          var f = h.toUpperCase();
          return k.indexOf(f) > -1 ? f : h;
        }
        function G(h, f) {
          if (!(this instanceof G))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          f = f || {};
          var m = f.body;
          if (h instanceof G) {
            if (h.bodyUsed)
              throw new TypeError("Already read");
            this.url = h.url, this.credentials = h.credentials, f.headers || (this.headers = new R(h.headers)), this.method = h.method, this.mode = h.mode, this.signal = h.signal, !m && h._bodyInit != null && (m = h._bodyInit, h.bodyUsed = !0);
          } else
            this.url = String(h);
          if (this.credentials = f.credentials || this.credentials || "same-origin", (f.headers || !this.headers) && (this.headers = new R(f.headers)), this.method = U(f.method || this.method || "GET"), this.mode = f.mode || this.mode || null, this.signal = f.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && m)
            throw new TypeError("Body not allowed for GET or HEAD requests");
          if (this._initBody(m), (this.method === "GET" || this.method === "HEAD") && (f.cache === "no-store" || f.cache === "no-cache")) {
            var b = /([?&])_=[^&]*/;
            if (b.test(this.url))
              this.url = this.url.replace(b, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
            else {
              var B = /\?/;
              this.url += (B.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
        }
        G.prototype.clone = function() {
          return new G(this, { body: this._bodyInit });
        };
        function j(h) {
          var f = new FormData();
          return h.trim().split("&").forEach(function(m) {
            if (m) {
              var b = m.split("="), B = b.shift().replace(/\+/g, " "), N = b.join("=").replace(/\+/g, " ");
              f.append(decodeURIComponent(B), decodeURIComponent(N));
            }
          }), f;
        }
        function J(h) {
          var f = new R(), m = h.replace(/\r?\n[\t ]+/g, " ");
          return m.split("\r").map(function(b) {
            return b.indexOf(`
`) === 0 ? b.substr(1, b.length) : b;
          }).forEach(function(b) {
            var B = b.split(":"), N = B.shift().trim();
            if (N) {
              var I = B.join(":").trim();
              f.append(N, I);
            }
          }), f;
        }
        Q.call(G.prototype);
        function q(h, f) {
          if (!(this instanceof q))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          f || (f = {}), this.type = "default", this.status = f.status === void 0 ? 200 : f.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = f.statusText === void 0 ? "" : "" + f.statusText, this.headers = new R(f.headers), this.url = f.url || "", this._initBody(h);
        }
        Q.call(q.prototype), q.prototype.clone = function() {
          return new q(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new R(this.headers),
            url: this.url
          });
        }, q.error = function() {
          var h = new q(null, { status: 0, statusText: "" });
          return h.type = "error", h;
        };
        var C = [301, 302, 303, 307, 308];
        q.redirect = function(h, f) {
          if (C.indexOf(f) === -1)
            throw new RangeError("Invalid status code");
          return new q(null, { status: f, headers: { location: h } });
        }, a.DOMException = o.DOMException;
        try {
          new a.DOMException();
        } catch {
          a.DOMException = function(f, m) {
            this.message = f, this.name = m;
            var b = Error(f);
            this.stack = b.stack;
          }, a.DOMException.prototype = Object.create(Error.prototype), a.DOMException.prototype.constructor = a.DOMException;
        }
        function u(h, f) {
          return new Promise(function(m, b) {
            var B = new G(h, f);
            if (B.signal && B.signal.aborted)
              return b(new a.DOMException("Aborted", "AbortError"));
            var N = new XMLHttpRequest();
            function I() {
              N.abort();
            }
            N.onload = function() {
              var E = {
                status: N.status,
                statusText: N.statusText,
                headers: J(N.getAllResponseHeaders() || "")
              };
              E.url = "responseURL" in N ? N.responseURL : E.headers.get("X-Request-URL");
              var tt = "response" in N ? N.response : N.responseText;
              setTimeout(function() {
                m(new q(tt, E));
              }, 0);
            }, N.onerror = function() {
              setTimeout(function() {
                b(new TypeError("Network request failed"));
              }, 0);
            }, N.ontimeout = function() {
              setTimeout(function() {
                b(new TypeError("Network request failed"));
              }, 0);
            }, N.onabort = function() {
              setTimeout(function() {
                b(new a.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function p(E) {
              try {
                return E === "" && o.location.href ? o.location.href : E;
              } catch {
                return E;
              }
            }
            N.open(B.method, p(B.url), !0), B.credentials === "include" ? N.withCredentials = !0 : B.credentials === "omit" && (N.withCredentials = !1), "responseType" in N && (d.blob ? N.responseType = "blob" : d.arrayBuffer && B.headers.get("Content-Type") && B.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (N.responseType = "arraybuffer")), f && typeof f.headers == "object" && !(f.headers instanceof R) ? Object.getOwnPropertyNames(f.headers).forEach(function(E) {
              N.setRequestHeader(E, S(f.headers[E]));
            }) : B.headers.forEach(function(E, tt) {
              N.setRequestHeader(tt, E);
            }), B.signal && (B.signal.addEventListener("abort", I), N.onreadystatechange = function() {
              N.readyState === 4 && B.signal.removeEventListener("abort", I);
            }), N.send(typeof B._bodyInit > "u" ? null : B._bodyInit);
          });
        }
        return u.polyfill = !0, o.fetch || (o.fetch = u, o.Headers = R, o.Request = G, o.Response = q), a.Headers = R, a.Request = G, a.Response = q, a.fetch = u, a;
      })({});
    })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
    var s = e.fetch ? e : n;
    t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, r.exports = t;
  }(ga, ga.exports)), ga.exports;
}
var za = Jy();
const Ra = /* @__PURE__ */ j_(za), qy = /* @__PURE__ */ Zg({
  __proto__: null,
  default: Ra
}, [za]), Hn = (r) => {
  let t = {};
  return r && (typeof Headers < "u" && r instanceof Headers || qy && za.Headers && r instanceof za.Headers ? t = iy(r) : Array.isArray(r) ? r.forEach(([e, n]) => {
    e && n !== void 0 && (t[e] = n);
  }) : t = r), t;
}, ah = (r) => r.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(), $y = (r) => {
  if (!Array.isArray(r.query)) {
    const n = r, s = [`query=${encodeURIComponent(ah(n.query))}`];
    return r.variables && s.push(`variables=${encodeURIComponent(n.jsonSerializer.stringify(n.variables))}`), n.operationName && s.push(`operationName=${encodeURIComponent(n.operationName)}`), s.join("&");
  }
  if (typeof r.variables < "u" && !Array.isArray(r.variables))
    throw new Error("Cannot create query with given variable type, array expected");
  const t = r, e = r.query.reduce((n, s, i) => (n.push({
    query: ah(s),
    variables: t.variables ? t.jsonSerializer.stringify(t.variables[i]) : void 0
  }), n), []);
  return `query=${encodeURIComponent(t.jsonSerializer.stringify(e))}`;
}, Ky = (r) => async (t) => {
  const { url: e, query: n, variables: s, operationName: i, fetch: a, fetchOptions: o, middleware: d } = t, _ = { ...t.headers };
  let A = "", g;
  r === "POST" ? (g = eb(n, s, i, o.jsonSerializer), typeof g == "string" && (_["Content-Type"] = "application/json")) : A = $y({
    query: n,
    variables: s,
    operationName: i,
    jsonSerializer: o.jsonSerializer ?? Nd
  });
  const y = {
    method: r,
    headers: _,
    body: g,
    ...o
  };
  let S = e, O = y;
  if (d) {
    const R = await Promise.resolve(d({ ...y, url: e, operationName: i, variables: s })), { url: F, ...z } = R;
    S = F, O = z;
  }
  return A && (S = `${S}?${A}`), await a(S, O);
};
class tb {
  constructor(t, e = {}) {
    this.url = t, this.requestConfig = e, this.rawRequest = async (...n) => {
      const [s, i, a] = n, o = oy(s, i, a), { headers: d, fetch: _ = Ra, method: A = "POST", requestMiddleware: g, responseMiddleware: y, ...S } = this.requestConfig, { url: O } = this;
      o.signal !== void 0 && (S.signal = o.signal);
      const { operationName: R } = hc(o.query);
      return lc({
        url: O,
        query: o.query,
        variables: o.variables,
        headers: {
          ...Hn(_c(d)),
          ...Hn(o.requestHeaders)
        },
        operationName: R,
        fetch: _,
        method: A,
        fetchOptions: S,
        middleware: g
      }).then((F) => (y && y(F), F)).catch((F) => {
        throw y && y(F), F;
      });
    };
  }
  async request(t, ...e) {
    const [n, s] = e, i = ay(t, n, s), { headers: a, fetch: o = Ra, method: d = "POST", requestMiddleware: _, responseMiddleware: A, ...g } = this.requestConfig, { url: y } = this;
    i.signal !== void 0 && (g.signal = i.signal);
    const { query: S, operationName: O } = hc(i.document);
    return lc({
      url: y,
      query: S,
      variables: i.variables,
      headers: {
        ...Hn(_c(a)),
        ...Hn(i.requestHeaders)
      },
      operationName: O,
      fetch: o,
      method: d,
      fetchOptions: g,
      middleware: _
    }).then((R) => (A && A(R), R.data)).catch((R) => {
      throw A && A(R), R;
    });
  }
  // prettier-ignore
  batchRequests(t, e) {
    const n = cy(t, e), { headers: s, ...i } = this.requestConfig;
    n.signal !== void 0 && (i.signal = n.signal);
    const a = n.documents.map(({ document: d }) => hc(d).query), o = n.documents.map(({ variables: d }) => d);
    return lc({
      url: this.url,
      query: a,
      // @ts-expect-error TODO reconcile batch variables into system.
      variables: o,
      headers: {
        ...Hn(_c(s)),
        ...Hn(n.requestHeaders)
      },
      operationName: void 0,
      fetch: this.requestConfig.fetch ?? Ra,
      method: this.requestConfig.method || "POST",
      fetchOptions: i,
      middleware: this.requestConfig.requestMiddleware
    }).then((d) => (this.requestConfig.responseMiddleware && this.requestConfig.responseMiddleware(d), d.data)).catch((d) => {
      throw this.requestConfig.responseMiddleware && this.requestConfig.responseMiddleware(d), d;
    });
  }
  setHeaders(t) {
    return this.requestConfig.headers = t, this;
  }
  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(t, e) {
    const { headers: n } = this.requestConfig;
    return n ? n[t] = e : this.requestConfig.headers = { [t]: e }, this;
  }
  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(t) {
    return this.url = t, this;
  }
}
const lc = async (r) => {
  const { query: t, variables: e, fetchOptions: n } = r, s = Ky(sy(r.method ?? "post")), i = Array.isArray(r.query), a = await s(r), o = await rb(a, n.jsonSerializer ?? Nd), d = Array.isArray(o) ? !o.some(({ data: A }) => !A) : !!o.data, _ = Array.isArray(o) || !o.errors || Array.isArray(o.errors) && !o.errors.length || n.errorPolicy === "all" || n.errorPolicy === "ignore";
  if (a.ok && _ && d) {
    const { errors: A, ...g } = (Array.isArray(o), o), y = n.errorPolicy === "ignore" ? g : o;
    return {
      ...i ? { data: y } : y,
      headers: a.headers,
      status: a.status
    };
  } else {
    const A = typeof o == "string" ? {
      error: o
    } : o;
    throw new Yi(
      // @ts-expect-error TODO
      { ...A, status: a.status, headers: a.headers },
      { query: t, variables: e }
    );
  }
}, eb = (r, t, e, n) => {
  const s = n ?? Nd;
  if (!Array.isArray(r))
    return s.stringify({ query: r, variables: t, operationName: e });
  if (typeof t < "u" && !Array.isArray(t))
    throw new Error("Cannot create request body with given variable type, array expected");
  const i = r.reduce((a, o, d) => (a.push({ query: o, variables: t ? t[d] : void 0 }), a), []);
  return s.stringify(i);
}, rb = async (r, t) => {
  let e;
  return r.headers.forEach((n, s) => {
    s.toLowerCase() === "content-type" && (e = n);
  }), e && (e.toLowerCase().startsWith("application/json") || e.toLowerCase().startsWith("application/graphql+json") || e.toLowerCase().startsWith("application/graphql-response+json")) ? t.parse(await r.text()) : r.text();
}, _c = (r) => typeof r == "function" ? r() : r;
var Ga = function() {
  return Ga = Object.assign || function(t) {
    for (var e, n = 1, s = arguments.length; n < s; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, Ga.apply(this, arguments);
};
var Sa = /* @__PURE__ */ new Map(), qc = /* @__PURE__ */ new Map(), If = !0, Va = !1;
function Ef(r) {
  return r.replace(/[\s,]+/g, " ").trim();
}
function nb(r) {
  return Ef(r.source.body.substring(r.start, r.end));
}
function sb(r) {
  var t = /* @__PURE__ */ new Set(), e = [];
  return r.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = nb(n.loc), a = qc.get(s);
      a && !a.has(i) ? If && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : a || qc.set(s, a = /* @__PURE__ */ new Set()), a.add(i), t.has(i) || (t.add(i), e.push(n));
    } else
      e.push(n);
  }), Ga(Ga({}, r), { definitions: e });
}
function ib(r) {
  var t = new Set(r.definitions);
  t.forEach(function(n) {
    n.loc && delete n.loc, Object.keys(n).forEach(function(s) {
      var i = n[s];
      i && typeof i == "object" && t.add(i);
    });
  });
  var e = r.loc;
  return e && (delete e.startToken, delete e.endToken), r;
}
function ab(r) {
  var t = Ef(r);
  if (!Sa.has(t)) {
    var e = mf(r, {
      experimentalFragmentVariables: Va,
      allowLegacyFragmentVariables: Va
    });
    if (!e || e.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Sa.set(t, ib(sb(e)));
  }
  return Sa.get(t);
}
function K(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  typeof r == "string" && (r = [r]);
  var n = r[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += r[i + 1];
  }), ab(n);
}
function ob() {
  Sa.clear(), qc.clear();
}
function cb() {
  If = !1;
}
function db() {
  Va = !0;
}
function ub() {
  Va = !1;
}
var Oi = {
  gql: K,
  resetCaches: ob,
  disableFragmentWarnings: cb,
  enableExperimentalFragmentVariables: db,
  disableExperimentalFragmentVariables: ub
};
(function(r) {
  r.gql = Oi.gql, r.resetCaches = Oi.resetCaches, r.disableFragmentWarnings = Oi.disableFragmentWarnings, r.enableExperimentalFragmentVariables = Oi.enableExperimentalFragmentVariables, r.disableExperimentalFragmentVariables = Oi.disableExperimentalFragmentVariables;
})(K || (K = {}));
K.default = K;
var Rt = "0x0000000000000000000000000000000000000000000000000000000000000000", Qx = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Ox = 16 * 1024, Mx = 16, Px = 1024 * 1024 * 1024, Lx = 1024 * 1024 * 1024, kx = 255, Ux = 1024 * 1024, zx = 1024 * 1024, hb = "0xffffffffffff0000", Cf = "0xffffffffffff0001", lb = "0xffffffffffff0003", _b = "0xffffffffffff0004", pb = "0xffffffffffff0005", Gx = "0x0", fb = [
  "ArithmeticError",
  "ArithmeticOverflow",
  "AssetIdNotFound",
  "BalanceOverflow",
  "BlobIdAlreadyUploaded",
  "BlobNotFound",
  "BytecodeAlreadyUploaded",
  "ContractIdAlreadyDeployed",
  "ContractInstructionNotAllowed",
  "ContractMaxSize",
  "ContractMismatch",
  "ContractNotFound",
  "ContractNotInInputs",
  "EcalError",
  "ExpectedCoinInput",
  "ExpectedInternalContext",
  "ExpectedNestedCaller",
  "ExpectedOutputVariable",
  "ExpectedParentInternalContext",
  "ExpectedUnallocatedStack",
  "GasCostNotDefined",
  "InputContractDoesNotExist",
  "InputNotFound",
  "InternalBalanceOverflow",
  "InvalidBlockHeight",
  "InvalidEllipticCurvePoint",
  "InvalidFlags",
  "InvalidImmediateValue",
  "InvalidInstruction",
  "InvalidMetadataIdentifier",
  "MalformedCallStructure",
  "MaxStaticContractsReached",
  "MemoryGrowthOverlap",
  "MemoryNotExecutable",
  "MemoryOverflow",
  "MemoryOwnership",
  "MemoryWriteOverlap",
  "MessageDataTooLong",
  "NotEnoughBalance",
  "OutOfGas",
  "OutputNotFound",
  "OverridingConsensusParameters",
  "OverridingStateTransactionBytecode",
  "PolicyIsNotSet",
  "PolicyNotFound",
  "PredicateReturnedNonOne",
  "ReservedRegisterNotWritable",
  "Revert",
  "ThePartIsNotSequentiallyConnected",
  "TooManyReceipts",
  "TooManySlots",
  "TransactionMaturity",
  "TransactionValidity",
  "TransferAmountCannotBeZero",
  "TransferZeroCoins",
  "UninitalizedMemoryAccess",
  "UnknownPanicReason",
  "UnknownStateTransactionBytecodeRoot",
  "UnsupportedCurveId",
  "UnsupportedOperationType",
  "WitnessNotFound"
], Ab = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let c;
const vf = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && vf.decode();
let zi = null;
function Bf() {
  return (zi === null || zi.byteLength === 0) && (zi = new Uint8Array(c.memory.buffer)), zi;
}
function gb(r, t) {
  return r = r >>> 0, vf.decode(Bf().subarray(r, r + t));
}
function w(r, t) {
  if (!(r instanceof t))
    throw new Error(`expected instance of ${t.name}`);
}
function wb(r, t) {
  const e = c.gm_args(r, t);
  return Y.__wrap(e);
}
function mb(r, t, e) {
  const n = c.gtf_args(r, t, e);
  return Y.__wrap(n);
}
function yb(r, t, e, n) {
  w(n, en);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(r, t, e, s);
  return Y.__wrap(i);
}
function bb(r, t, e, n) {
  w(n, en);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(r, t, e, s);
  return Y.__wrap(i);
}
function Ib(r, t, e, n) {
  w(n, oa);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(r, t, e, s);
  return Y.__wrap(i);
}
function Eb(r, t, e, n) {
  w(n, oa);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(r, t, e, s);
  return Y.__wrap(i);
}
function Cb(r, t, e, n) {
  w(n, ca);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(r, t, e, s);
  return Y.__wrap(i);
}
function vb(r, t, e, n) {
  w(n, ca);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(r, t, e, s);
  return Y.__wrap(i);
}
function Bb(r, t, e, n) {
  w(n, aa);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(r, t, e, s);
  return Y.__wrap(i);
}
function xb(r, t, e, n) {
  w(n, aa);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(r, t, e, s);
  return Y.__wrap(i);
}
function Rb(r, t, e) {
  const n = c.add(r, t, e);
  return Y.__wrap(n);
}
function Sb(r, t, e) {
  const n = c.and(r, t, e);
  return Y.__wrap(n);
}
function Tb(r, t, e) {
  const n = c.div(r, t, e);
  return Y.__wrap(n);
}
function Nb(r, t, e) {
  const n = c.eq(r, t, e);
  return Y.__wrap(n);
}
function Db(r, t, e) {
  const n = c.exp(r, t, e);
  return Y.__wrap(n);
}
function Fb(r, t, e) {
  const n = c.gt(r, t, e);
  return Y.__wrap(n);
}
function Qb(r, t, e) {
  const n = c.lt(r, t, e);
  return Y.__wrap(n);
}
function Ob(r, t, e) {
  const n = c.mlog(r, t, e);
  return Y.__wrap(n);
}
function Mb(r, t, e) {
  const n = c.mroo(r, t, e);
  return Y.__wrap(n);
}
function Pb(r, t, e) {
  const n = c.mod_(r, t, e);
  return Y.__wrap(n);
}
function fn(r, t) {
  const e = c.move_(r, t);
  return Y.__wrap(e);
}
function Lb(r, t, e) {
  const n = c.mul(r, t, e);
  return Y.__wrap(n);
}
function kb(r, t) {
  const e = c.not(r, t);
  return Y.__wrap(e);
}
function Ub(r, t, e) {
  const n = c.or(r, t, e);
  return Y.__wrap(n);
}
function zb(r, t, e) {
  const n = c.sll(r, t, e);
  return Y.__wrap(n);
}
function Gb(r, t, e) {
  const n = c.srl(r, t, e);
  return Y.__wrap(n);
}
function Ya(r, t, e) {
  const n = c.sub(r, t, e);
  return Y.__wrap(n);
}
function Vb(r, t, e) {
  const n = c.xor(r, t, e);
  return Y.__wrap(n);
}
function Yb(r, t, e, n) {
  const s = c.mldv(r, t, e, n);
  return Y.__wrap(s);
}
function Qd(r) {
  const t = c.ret(r);
  return Y.__wrap(t);
}
function Hb(r, t) {
  const e = c.retd(r, t);
  return Y.__wrap(e);
}
function Wb(r) {
  const t = c.aloc(r);
  return Y.__wrap(t);
}
function Xb(r, t) {
  const e = c.mcl(r, t);
  return Y.__wrap(e);
}
function Zb(r, t, e) {
  const n = c.mcp(r, t, e);
  return Y.__wrap(n);
}
function jb(r, t, e, n) {
  const s = c.meq(r, t, e, n);
  return Y.__wrap(s);
}
function Jb(r, t) {
  const e = c.bhsh(r, t);
  return Y.__wrap(e);
}
function qb(r) {
  const t = c.bhei(r);
  return Y.__wrap(t);
}
function $b(r, t) {
  const e = c.burn(r, t);
  return Y.__wrap(e);
}
function $c(r, t, e, n) {
  const s = c.call(r, t, e, n);
  return Y.__wrap(s);
}
function Kb(r, t, e, n) {
  const s = c.ccp(r, t, e, n);
  return Y.__wrap(s);
}
function tI(r, t) {
  const e = c.croo(r, t);
  return Y.__wrap(e);
}
function eI(r, t) {
  const e = c.csiz(r, t);
  return Y.__wrap(e);
}
function rI(r) {
  const t = c.cb(r);
  return Y.__wrap(t);
}
function Hi(r, t, e, n) {
  const s = c.ldc(r, t, e, n);
  return Y.__wrap(s);
}
function nI(r, t, e, n) {
  const s = c.log(r, t, e, n);
  return Y.__wrap(s);
}
function sI(r, t, e, n) {
  const s = c.logd(r, t, e, n);
  return Y.__wrap(s);
}
function iI(r, t) {
  const e = c.mint(r, t);
  return Y.__wrap(e);
}
function aI(r) {
  const t = c.rvrt(r);
  return Y.__wrap(t);
}
function oI(r, t, e) {
  const n = c.scwq(r, t, e);
  return Y.__wrap(n);
}
function cI(r, t, e) {
  const n = c.srw(r, t, e);
  return Y.__wrap(n);
}
function dI(r, t, e, n) {
  const s = c.srwq(r, t, e, n);
  return Y.__wrap(s);
}
function uI(r, t, e) {
  const n = c.sww(r, t, e);
  return Y.__wrap(n);
}
function hI(r, t, e, n) {
  const s = c.swwq(r, t, e, n);
  return Y.__wrap(s);
}
function xf(r, t, e) {
  const n = c.tr(r, t, e);
  return Y.__wrap(n);
}
function lI(r, t, e, n) {
  const s = c.tro(r, t, e, n);
  return Y.__wrap(s);
}
function _I(r, t, e) {
  const n = c.eck1(r, t, e);
  return Y.__wrap(n);
}
function pI(r, t, e) {
  const n = c.ecr1(r, t, e);
  return Y.__wrap(n);
}
function fI(r, t, e, n) {
  const s = c.ed19(r, t, e, n);
  return Y.__wrap(s);
}
function AI(r, t, e) {
  const n = c.k256(r, t, e);
  return Y.__wrap(n);
}
function gI(r, t, e) {
  const n = c.s256(r, t, e);
  return Y.__wrap(n);
}
function wI(r, t) {
  const e = c.time(r, t);
  return Y.__wrap(e);
}
function mI() {
  const r = c.noop();
  return Y.__wrap(r);
}
function yI(r) {
  const t = c.flag(r);
  return Y.__wrap(t);
}
function bI(r, t, e) {
  const n = c.bal(r, t, e);
  return Y.__wrap(n);
}
function Ha(r) {
  const t = c.jmp(r);
  return Y.__wrap(t);
}
function II(r, t, e) {
  const n = c.jne(r, t, e);
  return Y.__wrap(n);
}
function EI(r, t, e, n) {
  const s = c.smo(r, t, e, n);
  return Y.__wrap(s);
}
function wr(r, t, e) {
  const n = c.addi(r, t, e);
  return Y.__wrap(n);
}
function CI(r, t, e) {
  const n = c.andi(r, t, e);
  return Y.__wrap(n);
}
function Wa(r, t, e) {
  const n = c.divi(r, t, e);
  return Y.__wrap(n);
}
function vI(r, t, e) {
  const n = c.expi(r, t, e);
  return Y.__wrap(n);
}
function BI(r, t, e) {
  const n = c.modi(r, t, e);
  return Y.__wrap(n);
}
function xI(r, t, e) {
  const n = c.muli(r, t, e);
  return Y.__wrap(n);
}
function RI(r, t, e) {
  const n = c.ori(r, t, e);
  return Y.__wrap(n);
}
function SI(r, t, e) {
  const n = c.slli(r, t, e);
  return Y.__wrap(n);
}
function TI(r, t, e) {
  const n = c.srli(r, t, e);
  return Y.__wrap(n);
}
function Rf(r, t, e) {
  const n = c.subi(r, t, e);
  return Y.__wrap(n);
}
function NI(r, t, e) {
  const n = c.xori(r, t, e);
  return Y.__wrap(n);
}
function DI(r, t, e) {
  const n = c.jnei(r, t, e);
  return Y.__wrap(n);
}
function FI(r, t, e) {
  const n = c.lb(r, t, e);
  return Y.__wrap(n);
}
function Ji(r, t, e) {
  const n = c.lw(r, t, e);
  return Y.__wrap(n);
}
function QI(r, t, e) {
  const n = c.sb(r, t, e);
  return Y.__wrap(n);
}
function OI(r, t, e) {
  const n = c.sw(r, t, e);
  return Y.__wrap(n);
}
function MI(r, t, e) {
  const n = c.mcpi(r, t, e);
  return Y.__wrap(n);
}
function Sf(r, t, e) {
  const n = c.gtf(r, t, e);
  return Y.__wrap(n);
}
function PI(r, t) {
  const e = c.mcli(r, t);
  return Y.__wrap(e);
}
function LI(r, t) {
  const e = c.gm(r, t);
  return Y.__wrap(e);
}
function Jn(r, t) {
  const e = c.movi(r, t);
  return Y.__wrap(e);
}
function kI(r, t) {
  const e = c.jnzi(r, t);
  return Y.__wrap(e);
}
function UI(r, t) {
  const e = c.jmpf(r, t);
  return Y.__wrap(e);
}
function zI(r, t) {
  const e = c.jmpb(r, t);
  return Y.__wrap(e);
}
function GI(r, t, e) {
  const n = c.jnzf(r, t, e);
  return Y.__wrap(n);
}
function Tf(r, t, e) {
  const n = c.jnzb(r, t, e);
  return Y.__wrap(n);
}
function VI(r, t, e, n) {
  const s = c.jnef(r, t, e, n);
  return Y.__wrap(s);
}
function YI(r, t, e, n) {
  const s = c.jneb(r, t, e, n);
  return Y.__wrap(s);
}
function HI(r) {
  const t = c.ji(r);
  return Y.__wrap(t);
}
function WI(r) {
  const t = c.cfei(r);
  return Y.__wrap(t);
}
function XI(r) {
  const t = c.cfsi(r);
  return Y.__wrap(t);
}
function ZI(r) {
  const t = c.cfe(r);
  return Y.__wrap(t);
}
function jI(r) {
  const t = c.cfs(r);
  return Y.__wrap(t);
}
function JI(r) {
  const t = c.pshl(r);
  return Y.__wrap(t);
}
function qI(r) {
  const t = c.pshh(r);
  return Y.__wrap(t);
}
function $I(r) {
  const t = c.popl(r);
  return Y.__wrap(t);
}
function KI(r) {
  const t = c.poph(r);
  return Y.__wrap(t);
}
function tE(r, t, e, n) {
  const s = c.wdcm(r, t, e, n);
  return Y.__wrap(s);
}
function eE(r, t, e, n) {
  const s = c.wqcm(r, t, e, n);
  return Y.__wrap(s);
}
function rE(r, t, e, n) {
  const s = c.wdop(r, t, e, n);
  return Y.__wrap(s);
}
function nE(r, t, e, n) {
  const s = c.wqop(r, t, e, n);
  return Y.__wrap(s);
}
function sE(r, t, e, n) {
  const s = c.wdml(r, t, e, n);
  return Y.__wrap(s);
}
function iE(r, t, e, n) {
  const s = c.wqml(r, t, e, n);
  return Y.__wrap(s);
}
function aE(r, t, e, n) {
  const s = c.wddv(r, t, e, n);
  return Y.__wrap(s);
}
function oE(r, t, e, n) {
  const s = c.wqdv(r, t, e, n);
  return Y.__wrap(s);
}
function cE(r, t, e, n) {
  const s = c.wdmd(r, t, e, n);
  return Y.__wrap(s);
}
function dE(r, t, e, n) {
  const s = c.wqmd(r, t, e, n);
  return Y.__wrap(s);
}
function uE(r, t, e, n) {
  const s = c.wdam(r, t, e, n);
  return Y.__wrap(s);
}
function hE(r, t, e, n) {
  const s = c.wqam(r, t, e, n);
  return Y.__wrap(s);
}
function lE(r, t, e, n) {
  const s = c.wdmm(r, t, e, n);
  return Y.__wrap(s);
}
function _E(r, t, e, n) {
  const s = c.wqmm(r, t, e, n);
  return Y.__wrap(s);
}
function pE(r, t, e, n) {
  const s = c.ecal(r, t, e, n);
  return Y.__wrap(s);
}
function Xa(r, t) {
  const e = c.bsiz(r, t);
  return Y.__wrap(e);
}
function fE(r, t, e, n) {
  const s = c.bldd(r, t, e, n);
  return Y.__wrap(s);
}
function AE(r, t, e, n) {
  const s = c.ecop(r, t, e, n);
  return Y.__wrap(s);
}
function gE(r, t, e, n) {
  const s = c.epar(r, t, e, n);
  return Y.__wrap(s);
}
let on = null;
function oh() {
  return (on === null || on.buffer.detached === !0 || on.buffer.detached === void 0 && on.buffer !== c.memory.buffer) && (on = new DataView(c.memory.buffer)), on;
}
function wE(r, t) {
  return r = r >>> 0, Bf().subarray(r / 1, r / 1 + t);
}
const mE = Object.freeze({
  /**
   * Equality (`==`)
   */
  EQ: 0,
  0: "EQ",
  /**
   * Inequality (`!=`)
   */
  NE: 1,
  1: "NE",
  /**
   * Less than (`<`)
   */
  LT: 2,
  2: "LT",
  /**
   * Greater than (`>`)
   */
  GT: 3,
  3: "GT",
  /**
   * Less than or equals (`>=`)
   */
  LTE: 4,
  4: "LTE",
  /**
   * Greater than or equals (`>=`)
   */
  GTE: 5,
  5: "GTE",
  /**
   * Number of leading zeroes in lhs (`lzcnt`) (discards rhs)
   */
  LZC: 6,
  6: "LZC"
}), yE = Object.freeze({
  /**
   * r" Get if caller is external.
   */
  IsCallerExternal: 1,
  1: "IsCallerExternal",
  /**
   * r" Get caller's contract ID.
   */
  GetCaller: 2,
  2: "GetCaller",
  /**
   * r" Get index of current predicate.
   */
  GetVerifyingPredicate: 3,
  3: "GetVerifyingPredicate",
  /**
   * r" Get the Chain ID this VM is operating within
   */
  GetChainId: 4,
  4: "GetChainId",
  /**
   * r" Get memory address where the transaction is located
   */
  TxStart: 5,
  5: "TxStart",
  /**
   * r" Get memory address of base asset ID
   */
  BaseAssetId: 6,
  6: "BaseAssetId"
}), Nf = Object.freeze({
  /**
   * r" Set `$rA` to `tx.type`
   */
  Type: 1,
  1: "Type",
  /**
   * r" Set `$rA` to `tx.scriptGasLimit`
   */
  ScriptGasLimit: 2,
  2: "ScriptGasLimit",
  /**
   * r" Set `$rA` to `tx.scriptLength`
   */
  ScriptLength: 3,
  3: "ScriptLength",
  /**
   * r" Set `$rA` to `tx.scriptDataLength`
   */
  ScriptDataLength: 4,
  4: "ScriptDataLength",
  /**
   * r" Set `$rA` to `tx.inputsCount`
   */
  ScriptInputsCount: 5,
  5: "ScriptInputsCount",
  /**
   * r" Set `$rA` to `tx.outputsCount`
   */
  ScriptOutputsCount: 6,
  6: "ScriptOutputsCount",
  /**
   * r" Set `$rA` to `tx.witnessesCount`
   */
  ScriptWitnessesCount: 7,
  7: "ScriptWitnessesCount",
  /**
   * r" Set `$rA` to `Memory address of tx.script`
   */
  Script: 9,
  9: "Script",
  /**
   * r" Set `$rA` to `Memory address of tx.scriptData`
   */
  ScriptData: 10,
  10: "ScriptData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB]`
   */
  ScriptInputAtIndex: 11,
  11: "ScriptInputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of t.outputs[$rB]`
   */
  ScriptOutputAtIndex: 12,
  12: "ScriptOutputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
   */
  ScriptWitnessAtIndex: 13,
  13: "ScriptWitnessAtIndex",
  /**
   * r" Set `$rA` to size of the transaction in memory, in bytes
   */
  TxLength: 14,
  14: "TxLength",
  /**
   * r" Set `$rA` to `tx.bytecodeWitnessIndex`
   */
  CreateBytecodeWitnessIndex: 257,
  257: "CreateBytecodeWitnessIndex",
  /**
   * r" Set `$rA` to `tx.storageSlotsCount`
   */
  CreateStorageSlotsCount: 258,
  258: "CreateStorageSlotsCount",
  /**
   * r" Set `$rA` to `tx.inputsCount`
   */
  CreateInputsCount: 259,
  259: "CreateInputsCount",
  /**
   * r" Set `$rA` to `tx.outputsCount`
   */
  CreateOutputsCount: 260,
  260: "CreateOutputsCount",
  /**
   * r" Set `$rA` to `tx.witnessesCount`
   */
  CreateWitnessesCount: 261,
  261: "CreateWitnessesCount",
  /**
   * r" Set `$rA` to `Memory address of tx.salt`
   */
  CreateSalt: 262,
  262: "CreateSalt",
  /**
   * r" Set `$rA` to `Memory address of tx.storageSlots[$rB]`
   */
  CreateStorageSlotAtIndex: 263,
  263: "CreateStorageSlotAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB]`
   */
  CreateInputAtIndex: 264,
  264: "CreateInputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of t.outputs[$rB]`
   */
  CreateOutputAtIndex: 265,
  265: "CreateOutputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
   */
  CreateWitnessAtIndex: 266,
  266: "CreateWitnessAtIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].type`
   */
  InputType: 512,
  512: "InputType",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
   */
  InputCoinTxId: 513,
  513: "InputCoinTxId",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].outputIndex`
   */
  InputCoinOutputIndex: 514,
  514: "InputCoinOutputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].owner`
   */
  InputCoinOwner: 515,
  515: "InputCoinOwner",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].amount`
   */
  InputCoinAmount: 516,
  516: "InputCoinAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].asset_id`
   */
  InputCoinAssetId: 517,
  517: "InputCoinAssetId",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
   */
  InputCoinTxPointer: 518,
  518: "InputCoinTxPointer",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
   */
  InputCoinWitnessIndex: 519,
  519: "InputCoinWitnessIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateLength`
   */
  InputCoinPredicateLength: 521,
  521: "InputCoinPredicateLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
   */
  InputCoinPredicateDataLength: 522,
  522: "InputCoinPredicateDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
   */
  InputCoinPredicate: 523,
  523: "InputCoinPredicate",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
   */
  InputCoinPredicateData: 524,
  524: "InputCoinPredicateData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
   */
  InputCoinPredicateGasUsed: 525,
  525: "InputCoinPredicateGasUsed",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
   */
  InputContractTxId: 544,
  544: "InputContractTxId",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].outputIndex`
   */
  InputContractOutputIndex: 545,
  545: "InputContractOutputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].contractID`
   */
  InputContractId: 549,
  549: "InputContractId",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].sender`
   */
  InputMessageSender: 576,
  576: "InputMessageSender",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].recipient`
   */
  InputMessageRecipient: 577,
  577: "InputMessageRecipient",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].amount`
   */
  InputMessageAmount: 578,
  578: "InputMessageAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].nonce`
   */
  InputMessageNonce: 579,
  579: "InputMessageNonce",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
   */
  InputMessageWitnessIndex: 580,
  580: "InputMessageWitnessIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].dataLength`
   */
  InputMessageDataLength: 581,
  581: "InputMessageDataLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateLength`
   */
  InputMessagePredicateLength: 582,
  582: "InputMessagePredicateLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
   */
  InputMessagePredicateDataLength: 583,
  583: "InputMessagePredicateDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].data`
   */
  InputMessageData: 584,
  584: "InputMessageData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
   */
  InputMessagePredicate: 585,
  585: "InputMessagePredicate",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
   */
  InputMessagePredicateData: 586,
  586: "InputMessagePredicateData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
   */
  InputMessagePredicateGasUsed: 587,
  587: "InputMessagePredicateGasUsed",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].type`
   */
  OutputType: 768,
  768: "OutputType",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].to`
   */
  OutputCoinTo: 769,
  769: "OutputCoinTo",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].amount`
   */
  OutputCoinAmount: 770,
  770: "OutputCoinAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].asset_id`
   */
  OutputCoinAssetId: 771,
  771: "OutputCoinAssetId",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].inputIndex`
   */
  OutputContractInputIndex: 772,
  772: "OutputContractInputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].contractID`
   */
  OutputContractCreatedContractId: 775,
  775: "OutputContractCreatedContractId",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
   */
  OutputContractCreatedStateRoot: 776,
  776: "OutputContractCreatedStateRoot",
  /**
   * r" Set `$rA` to `tx.witnesses[$rB].dataLength`
   */
  WitnessDataLength: 1024,
  1024: "WitnessDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB].data`
   */
  WitnessData: 1025,
  1025: "WitnessData",
  /**
   * r" Set `$rA` to `tx.policyTypes`
   */
  PolicyTypes: 1280,
  1280: "PolicyTypes",
  /**
   * r" Set `$rA` to `tx.policies[0x00].gasPrice`
   */
  PolicyTip: 1281,
  1281: "PolicyTip",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b11 & tx.policyTypes) - 1].witnessLimit`
   */
  PolicyWitnessLimit: 1282,
  1282: "PolicyWitnessLimit",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b111 & tx.policyTypes) - 1].maturity`
   */
  PolicyMaturity: 1283,
  1283: "PolicyMaturity",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b1111 & tx.policyTypes) - 1].maxFee`
   */
  PolicyMaxFee: 1284,
  1284: "PolicyMaxFee",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b11111 & tx.policyTypes) - 1].expiration`
   */
  PolicyExpiration: 1285,
  1285: "PolicyExpiration"
}), bE = Object.freeze({
  /**
   * Add
   */
  ADD: 0,
  0: "ADD",
  /**
   * Subtract
   */
  SUB: 1,
  1: "SUB",
  /**
   * Invert bits (discards rhs)
   */
  NOT: 2,
  2: "NOT",
  /**
   * Bitwise or
   */
  OR: 3,
  3: "OR",
  /**
   * Bitwise exclusive or
   */
  XOR: 4,
  4: "XOR",
  /**
   * Bitwise and
   */
  AND: 5,
  5: "AND",
  /**
   * Shift left
   */
  SHL: 6,
  6: "SHL",
  /**
   * Shift right
   */
  SHR: 7,
  7: "SHR"
}), IE = Object.freeze({
  /**
   * r" The byte can't be mapped to any known `PanicReason`.
   */
  UnknownPanicReason: 0,
  0: "UnknownPanicReason",
  /**
   * r" Found `RVRT` instruction.
   */
  Revert: 1,
  1: "Revert",
  /**
   * r" Execution ran out of gas.
   */
  OutOfGas: 2,
  2: "OutOfGas",
  /**
   * r" The transaction validity is violated.
   */
  TransactionValidity: 3,
  3: "TransactionValidity",
  /**
   * r" Attempt to write outside interpreter memory boundaries.
   */
  MemoryOverflow: 4,
  4: "MemoryOverflow",
  /**
   * r" Overflow while executing arithmetic operation.
   * r" These errors are ignored using the WRAPPING flag.
   */
  ArithmeticOverflow: 5,
  5: "ArithmeticOverflow",
  /**
   * r" Designed contract was not found in the storage.
   */
  ContractNotFound: 6,
  6: "ContractNotFound",
  /**
   * r" Memory ownership rules are violated.
   */
  MemoryOwnership: 7,
  7: "MemoryOwnership",
  /**
   * r" The asset ID balance isn't enough for the instruction.
   */
  NotEnoughBalance: 8,
  8: "NotEnoughBalance",
  /**
   * r" The interpreter is expected to be in internal context.
   */
  ExpectedInternalContext: 9,
  9: "ExpectedInternalContext",
  /**
   * r" The queried asset ID was not found in the state.
   */
  AssetIdNotFound: 10,
  10: "AssetIdNotFound",
  /**
   * r" The provided input is not found in the transaction.
   */
  InputNotFound: 11,
  11: "InputNotFound",
  /**
   * r" The provided output is not found in the transaction.
   */
  OutputNotFound: 12,
  12: "OutputNotFound",
  /**
   * r" The provided witness is not found in the transaction.
   */
  WitnessNotFound: 13,
  13: "WitnessNotFound",
  /**
   * r" The transaction maturity is not valid for this request.
   */
  TransactionMaturity: 14,
  14: "TransactionMaturity",
  /**
   * r" The metadata identifier is invalid.
   */
  InvalidMetadataIdentifier: 15,
  15: "InvalidMetadataIdentifier",
  /**
   * r" The call structure is not valid.
   */
  MalformedCallStructure: 16,
  16: "MalformedCallStructure",
  /**
   * r" The provided register does not allow write operations.
   */
  ReservedRegisterNotWritable: 17,
  17: "ReservedRegisterNotWritable",
  /**
   * r" The execution resulted in an erroneous state of the interpreter.
   */
  InvalidFlags: 18,
  18: "InvalidFlags",
  /**
   * r" The provided immediate value is not valid for this instruction.
   */
  InvalidImmediateValue: 19,
  19: "InvalidImmediateValue",
  /**
   * r" The provided transaction input is not of type `Coin`.
   */
  ExpectedCoinInput: 20,
  20: "ExpectedCoinInput",
  /**
   * r" `ECAL` instruction failed.
   */
  EcalError: 21,
  21: "EcalError",
  /**
   * r" Two segments of the interpreter memory should not intersect for write operations.
   */
  MemoryWriteOverlap: 22,
  22: "MemoryWriteOverlap",
  /**
   * r" The requested contract is not listed in the transaction inputs.
   */
  ContractNotInInputs: 23,
  23: "ContractNotInInputs",
  /**
   * r" The internal asset ID balance overflowed with the provided instruction.
   */
  InternalBalanceOverflow: 24,
  24: "InternalBalanceOverflow",
  /**
   * r" The maximum allowed contract size is violated.
   */
  ContractMaxSize: 25,
  25: "ContractMaxSize",
  /**
   * r" This instruction expects the stack area to be unallocated for this call.
   */
  ExpectedUnallocatedStack: 26,
  26: "ExpectedUnallocatedStack",
  /**
   * r" The maximum allowed number of static contracts was reached for this transaction.
   */
  MaxStaticContractsReached: 27,
  27: "MaxStaticContractsReached",
  /**
   * r" The requested transfer amount cannot be zero.
   */
  TransferAmountCannotBeZero: 28,
  28: "TransferAmountCannotBeZero",
  /**
   * r" The provided transaction output should be of type `Variable`.
   */
  ExpectedOutputVariable: 29,
  29: "ExpectedOutputVariable",
  /**
   * r" The expected context of the stack parent is internal.
   */
  ExpectedParentInternalContext: 30,
  30: "ExpectedParentInternalContext",
  /**
   * r" The predicate returned non `1`. The `1` means successful verification
   * r" of the predicate, all other values means unsuccessful.
   */
  PredicateReturnedNonOne: 31,
  31: "PredicateReturnedNonOne",
  /**
   * r" The contract ID is already deployed and can't be overwritten.
   */
  ContractIdAlreadyDeployed: 32,
  32: "ContractIdAlreadyDeployed",
  /**
   * r" The loaded contract mismatch expectations.
   */
  ContractMismatch: 33,
  33: "ContractMismatch",
  /**
   * r" Attempting to send message data longer than `MAX_MESSAGE_DATA_LENGTH`
   */
  MessageDataTooLong: 34,
  34: "MessageDataTooLong",
  /**
   * r" Mathematically invalid arguments where given to an arithmetic instruction.
   * r" For instance, division by zero produces this.
   * r" These errors are ignored using the UNSAFEMATH flag.
   */
  ArithmeticError: 35,
  35: "ArithmeticError",
  /**
   * r" The contract instruction is not allowed in predicates.
   */
  ContractInstructionNotAllowed: 36,
  36: "ContractInstructionNotAllowed",
  /**
   * r" Transfer of zero coins is not allowed.
   */
  TransferZeroCoins: 37,
  37: "TransferZeroCoins",
  /**
   * r" Attempted to execute an invalid instruction
   */
  InvalidInstruction: 38,
  38: "InvalidInstruction",
  /**
   * r" Memory outside $is..$ssp range is not executable
   */
  MemoryNotExecutable: 39,
  39: "MemoryNotExecutable",
  /**
   * r" The policy is not set.
   */
  PolicyIsNotSet: 40,
  40: "PolicyIsNotSet",
  /**
   * r" The policy is not found across policies.
   */
  PolicyNotFound: 41,
  41: "PolicyNotFound",
  /**
   * r" Receipt context is full
   */
  TooManyReceipts: 42,
  42: "TooManyReceipts",
  /**
   * r" Balance of a contract overflowed
   */
  BalanceOverflow: 43,
  43: "BalanceOverflow",
  /**
   * r" Block height value is invalid, typically because it is too large
   */
  InvalidBlockHeight: 44,
  44: "InvalidBlockHeight",
  /**
   * r" Attempt to use sequential memory instructions with too large slot count,
   * r" typically because it cannot fit into usize
   */
  TooManySlots: 45,
  45: "TooManySlots",
  /**
   * r" Caller of this internal context is also expected to be internal,
   * r" i.e. $fp->$fp must be non-zero.
   */
  ExpectedNestedCaller: 46,
  46: "ExpectedNestedCaller",
  /**
   * r" During memory growth, the stack overlapped with the heap
   */
  MemoryGrowthOverlap: 47,
  47: "MemoryGrowthOverlap",
  /**
   * r" Attempting to read or write uninitialized memory.
   * r" Also occurs when boundary crosses from stack to heap.
   */
  UninitalizedMemoryAccess: 48,
  48: "UninitalizedMemoryAccess",
  /**
   * r" Overriding consensus parameters is not allowed.
   */
  OverridingConsensusParameters: 49,
  49: "OverridingConsensusParameters",
  /**
   * r" The storage doesn't know about the hash of the state transition bytecode.
   */
  UnknownStateTransactionBytecodeRoot: 50,
  50: "UnknownStateTransactionBytecodeRoot",
  /**
   * r" Overriding the state transition bytecode is not allowed.
   */
  OverridingStateTransactionBytecode: 51,
  51: "OverridingStateTransactionBytecode",
  /**
   * r" The bytecode is already uploaded and cannot be uploaded again.
   */
  BytecodeAlreadyUploaded: 52,
  52: "BytecodeAlreadyUploaded",
  /**
   * r" The part of the bytecode is not sequentially connected to the previous parts.
   */
  ThePartIsNotSequentiallyConnected: 53,
  53: "ThePartIsNotSequentiallyConnected",
  /**
   * r" The requested blob is not found.
   */
  BlobNotFound: 54,
  54: "BlobNotFound",
  /**
   * r" The blob was already
   */
  BlobIdAlreadyUploaded: 55,
  55: "BlobIdAlreadyUploaded",
  /**
   * r" Active gas costs do not define the cost for this instruction.
   */
  GasCostNotDefined: 56,
  56: "GasCostNotDefined",
  /**
   * r" The curve id is not supported.
   */
  UnsupportedCurveId: 57,
  57: "UnsupportedCurveId",
  /**
   * r" The operation type is not supported.
   */
  UnsupportedOperationType: 58,
  58: "UnsupportedOperationType",
  /**
   * r" Read alt_bn_128 curve point is invalid.
   */
  InvalidEllipticCurvePoint: 59,
  59: "InvalidEllipticCurvePoint",
  /**
   * r" Given input contract does not exist.
   */
  InputContractDoesNotExist: 60,
  60: "InputContractDoesNotExist"
}), ch = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_add_free(r >>> 0, 1));
class EE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ch.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_add_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ch.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const dh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_addi_free(r >>> 0, 1));
class CE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_addi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, dh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const uh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_aloc_free(r >>> 0, 1));
class vE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_aloc_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} bytes
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, uh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const hh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_and_free(r >>> 0, 1));
class BE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_and_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, hh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const lh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_andi_free(r >>> 0, 1));
class xE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_andi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, lh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const _h = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bal_free(r >>> 0, 1));
class RE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _h.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bal_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} asset_id_addr
   * @param {RegId} contract_id_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, _h.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ph = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bhei_free(r >>> 0, 1));
class SE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ph.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bhei_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, ph.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const fh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bhsh_free(r >>> 0, 1));
class TE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bhsh_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} heigth
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, fh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ah = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bldd_free(r >>> 0, 1));
class NE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ah.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bldd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_ptr
   * @param {RegId} blob_id_ptr
   * @param {RegId} offset
   * @param {RegId} len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Ah.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const gh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bsiz_free(r >>> 0, 1));
class DE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bsiz_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} blob_id_ptr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, gh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const wh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_burn_free(r >>> 0, 1));
class FE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_burn_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} amount
   * @param {RegId} sub_id_addr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, wh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const mh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_call_free(r >>> 0, 1));
class QE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_call_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} target_struct
   * @param {RegId} fwd_coins
   * @param {RegId} asset_id_addr
   * @param {RegId} fwd_gas
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, mh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const yh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cb_free(r >>> 0, 1));
class OE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, yh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const bh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ccp_free(r >>> 0, 1));
class ME {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ccp_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} contract_id_addr
   * @param {RegId} offset
   * @param {RegId} len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, bh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ih = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cfe_free(r >>> 0, 1));
class PE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ih.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfe_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} amount
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Ih.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Eh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cfei_free(r >>> 0, 1));
class LE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Eh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfei_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} amount
   */
  constructor(t) {
    w(t, Re);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Eh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Re.__wrap(t);
  }
}
const Ch = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cfs_free(r >>> 0, 1));
class kE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ch.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfs_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} amount
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Ch.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const vh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cfsi_free(r >>> 0, 1));
class UE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfsi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} amount
   */
  constructor(t) {
    w(t, Re);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, vh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Re.__wrap(t);
  }
}
const Bh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_croo_free(r >>> 0, 1));
class zE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_croo_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} contract_id_addr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Bh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const xh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_csiz_free(r >>> 0, 1));
class GE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_csiz_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} contract_id_addr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, xh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Rh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_compareargs_free(r >>> 0, 1));
class en {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(en.prototype);
    return e.__wbg_ptr = t, Rh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_compareargs_free(t, 0);
  }
  /**
   * Comparison mode
   * @returns {CompareMode}
   */
  get mode() {
    return c.__wbg_get_compareargs_mode(this.__wbg_ptr);
  }
  /**
   * Comparison mode
   * @param {CompareMode} arg0
   */
  set mode(t) {
    c.__wbg_set_compareargs_mode(this.__wbg_ptr, t);
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_rhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_rhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
  /**
   * Convert to immediate value.
   * @returns {Imm06}
   */
  to_imm() {
    const t = this.__destroy_into_raw(), e = c.compareargs_to_imm(t);
    return Mt.__wrap(e);
  }
  /**
   * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
   * @param {Imm06} bits
   * @returns {CompareArgs | undefined}
   */
  static from_imm(t) {
    w(t, Mt);
    var e = t.__destroy_into_raw();
    const n = c.compareargs_from_imm(e);
    return n === 0 ? void 0 : en.__wrap(n);
  }
}
const Sh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_div_free(r >>> 0, 1));
class VE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_div_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Sh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Th = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_divi_free(r >>> 0, 1));
class YE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Th.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_divi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Th.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const HE = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_divargs_free(r >>> 0, 1));
class aa {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, HE.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_divargs_free(t, 0);
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_rhs() {
    return c.__wbg_get_divargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_rhs(t) {
    c.__wbg_set_divargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const Nh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ecal_free(r >>> 0, 1));
class WE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecal_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} a
   * @param {RegId} b
   * @param {RegId} c
   * @param {RegId} d
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Nh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Dh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_eck1_free(r >>> 0, 1));
class XE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_eck1_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} sig_addr
   * @param {RegId} msg_hash_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Dh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Fh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ecop_free(r >>> 0, 1));
class ZE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecop_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} curve_id
   * @param {RegId} operation_type
   * @param {RegId} points_ptr
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Fh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Qh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ecr1_free(r >>> 0, 1));
class jE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecr1_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} sig_addr
   * @param {RegId} msg_hash_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Qh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Oh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ed19_free(r >>> 0, 1));
class JE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Oh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ed19_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} pub_key_addr
   * @param {RegId} sig_addr
   * @param {RegId} msg_addr
   * @param {RegId} msg_len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Oh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Mh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_epar_free(r >>> 0, 1));
class qE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_epar_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} success
   * @param {RegId} curve_id
   * @param {RegId} number_elements
   * @param {RegId} points_ptr
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Mh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ph = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_eq_free(r >>> 0, 1));
class $E {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ph.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_eq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ph.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Lh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_exp_free(r >>> 0, 1));
class KE {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_exp_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Lh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const kh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_expi_free(r >>> 0, 1));
class tC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_expi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, kh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const Uh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_flag_free(r >>> 0, 1));
class eC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Uh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_flag_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} value
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Uh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const pc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_gm_free(r >>> 0, 1));
class Za {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Za.prototype);
    return e.__wbg_ptr = t, pc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gm_free(t, 0);
  }
  /**
   * Construct a `GM` instruction from its arguments.
   * @param {RegId} ra
   * @param {GMArgs} args
   * @returns {GM}
   */
  static from_args(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    const s = c.gm_from_args(n, e);
    return Za.__wrap(s);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {Imm18} selector
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Me);
    var s = e.__destroy_into_raw();
    const i = c.gm_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, pc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Me.__wrap(t);
  }
}
const zh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_gt_free(r >>> 0, 1));
class rC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gt_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, zh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const fc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_gtf_free(r >>> 0, 1));
class ja {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(ja.prototype);
    return e.__wbg_ptr = t, fc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gtf_free(t, 0);
  }
  /**
   * Construct a `GTF` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {GTFArgs} args
   * @returns {GTF}
   */
  static from_args(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    const a = c.gtf_from_args(s, i, n);
    return ja.__wrap(a);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} arg
   * @param {Imm12} selector
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.gtf_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, fc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const Gh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_imm06_free(r >>> 0, 1));
class Mt {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Mt.prototype);
    return e.__wbg_ptr = t, Gh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm06_free(t, 0);
  }
}
const Vh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_imm12_free(r >>> 0, 1));
class lt {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(lt.prototype);
    return e.__wbg_ptr = t, Vh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm12_free(t, 0);
  }
}
const Yh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_imm18_free(r >>> 0, 1));
class Me {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Me.prototype);
    return e.__wbg_ptr = t, Yh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm18_free(t, 0);
  }
}
const Hh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_imm24_free(r >>> 0, 1));
class Re {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Re.prototype);
    return e.__wbg_ptr = t, Hh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm24_free(t, 0);
  }
}
const Wh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_instruction_free(r >>> 0, 1));
class Y {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Y.prototype);
    return e.__wbg_ptr = t, Wh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_instruction_free(t, 0);
  }
  /**
   * Convenience method for converting to bytes
   * @returns {Uint8Array}
   */
  to_bytes() {
    try {
      const s = c.__wbindgen_add_to_stack_pointer(-16);
      c.instruction_to_bytes(s, this.__wbg_ptr);
      var t = oh().getInt32(s + 4 * 0, !0), e = oh().getInt32(s + 4 * 1, !0), n = wE(t, e).slice();
      return c.__wbindgen_export_0(t, e * 1, 1), n;
    } finally {
      c.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Size of an instruction in bytes
   * @returns {number}
   */
  static size() {
    return c.instruction_size() >>> 0;
  }
}
const Xh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ji_free(r >>> 0, 1));
class nC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ji_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} abs_target
   */
  constructor(t) {
    w(t, Re);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Xh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Re.__wrap(t);
  }
}
const Zh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jmp_free(r >>> 0, 1));
class sC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmp_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} abs_target
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Zh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const jh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jmpb_free(r >>> 0, 1));
class iC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmpb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dynamic
   * @param {Imm18} fixed
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Me);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, jh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Me.__wrap(t);
  }
}
const Jh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jmpf_free(r >>> 0, 1));
class aC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmpf_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dynamic
   * @param {Imm18} fixed
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Me);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Jh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Me.__wrap(t);
  }
}
const qh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jne_free(r >>> 0, 1));
class oC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jne_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} abs_target
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, qh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const $h = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jneb_free(r >>> 0, 1));
class cC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $h.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jneb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_lhs
   * @param {RegId} cond_rhs
   * @param {RegId} dynamic
   * @param {Imm06} fixed
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, $h.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const Kh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnef_free(r >>> 0, 1));
class dC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnef_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_lhs
   * @param {RegId} cond_rhs
   * @param {RegId} dynamic
   * @param {Imm06} fixed
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Kh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const tl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnei_free(r >>> 0, 1));
class uC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnei_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_lhs
   * @param {RegId} cond_rhs
   * @param {Imm12} abs_target
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, tl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const el = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnzb_free(r >>> 0, 1));
class hC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, el.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_nz
   * @param {RegId} dynamic
   * @param {Imm12} fixed
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, el.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const rl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnzf_free(r >>> 0, 1));
class lC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzf_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_nz
   * @param {RegId} dynamic
   * @param {Imm12} fixed
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, rl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const nl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnzi_free(r >>> 0, 1));
class _C {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_nz
   * @param {Imm18} abs_target
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Me);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, nl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Me.__wrap(t);
  }
}
const sl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_k256_free(r >>> 0, 1));
class pC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_k256_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} src_addr
   * @param {RegId} len
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, sl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const il = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_lb_free(r >>> 0, 1));
class fC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, il.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} addr
   * @param {Imm12} offset
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, il.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const al = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ldc_free(r >>> 0, 1));
class AC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, al.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ldc_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} src_addr
   * @param {RegId} offset
   * @param {RegId} len
   * @param {Imm06} mode
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, al.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const ol = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_log_free(r >>> 0, 1));
class gC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ol.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_log_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} a
   * @param {RegId} b
   * @param {RegId} c
   * @param {RegId} d
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, ol.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const cl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_logd_free(r >>> 0, 1));
class wC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_logd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} a
   * @param {RegId} b
   * @param {RegId} addr
   * @param {RegId} len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, cl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const dl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_lt_free(r >>> 0, 1));
class mC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lt_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, dl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ul = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_lw_free(r >>> 0, 1));
class yC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ul.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lw_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} addr
   * @param {Imm12} offset
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ul.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const hl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mcl_free(r >>> 0, 1));
class bC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcl_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} len
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, hl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ll = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mcli_free(r >>> 0, 1));
class IC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ll.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcli_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} addr
   * @param {Imm18} count
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Me);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, ll.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Me.__wrap(t);
  }
}
const _l = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mcp_free(r >>> 0, 1));
class EC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _l.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcp_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} src_addr
   * @param {RegId} len
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, _l.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const pl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mcpi_free(r >>> 0, 1));
class CC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcpi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} src_addr
   * @param {Imm12} len
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, pl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const fl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_meq_free(r >>> 0, 1));
class vC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_meq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} result
   * @param {RegId} lhs_addr
   * @param {RegId} rhs_addr
   * @param {RegId} len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, fl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Al = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mint_free(r >>> 0, 1));
class BC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Al.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mint_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} amount
   * @param {RegId} sub_id_addr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Al.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const gl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mldv_free(r >>> 0, 1));
class xC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mldv_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} divisor
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, gl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const wl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mlog_free(r >>> 0, 1));
class RC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mlog_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, wl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ml = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mod_free(r >>> 0, 1));
class SC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ml.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mod_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ml.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const yl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_modi_free(r >>> 0, 1));
class TC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_modi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, yl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const bl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_move_free(r >>> 0, 1));
class NC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_move_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} src
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, bl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Il = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_movi_free(r >>> 0, 1));
class DC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Il.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_movi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {Imm18} val
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Me);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Il.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Me.__wrap(t);
  }
}
const El = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mroo_free(r >>> 0, 1));
class FC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, El.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mroo_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, El.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Cl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mul_free(r >>> 0, 1));
class QC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mul_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Cl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const vl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_muli_free(r >>> 0, 1));
class OC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_muli_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, vl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const MC = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mathargs_free(r >>> 0, 1));
class oa {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, MC.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mathargs_free(t, 0);
  }
  /**
   * The operation to perform
   * @returns {MathOp}
   */
  get op() {
    return c.__wbg_get_mathargs_op(this.__wbg_ptr);
  }
  /**
   * The operation to perform
   * @param {MathOp} arg0
   */
  set op(t) {
    c.__wbg_set_mathargs_op(this.__wbg_ptr, t);
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_rhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_rhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const PC = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mulargs_free(r >>> 0, 1));
class ca {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, PC.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mulargs_free(t, 0);
  }
  /**
   * Load LHSS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_lhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load LHSS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_lhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_rhs() {
    return c.__wbg_get_mulargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_rhs(t) {
    c.__wbg_set_mulargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const Bl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_noop_free(r >>> 0, 1));
class LC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_noop_free(t, 0);
  }
  /**
   * Construct the instruction.
   */
  constructor() {
    const t = c.noop_new_typescript();
    return this.__wbg_ptr = t >>> 0, Bl.register(this, this.__wbg_ptr, this), this;
  }
}
const xl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_not_free(r >>> 0, 1));
class kC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_not_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} arg
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, xl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Rl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_or_free(r >>> 0, 1));
class UC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_or_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Rl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Sl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ori_free(r >>> 0, 1));
class zC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ori_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Sl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const Tl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_poph_free(r >>> 0, 1));
class GC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Tl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_poph_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} bitmask
   */
  constructor(t) {
    w(t, Re);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Tl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Re.__wrap(t);
  }
}
const Nl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_popl_free(r >>> 0, 1));
class VC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_popl_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} bitmask
   */
  constructor(t) {
    w(t, Re);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Nl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Re.__wrap(t);
  }
}
const Dl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_pshh_free(r >>> 0, 1));
class YC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_pshh_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} bitmask
   */
  constructor(t) {
    w(t, Re);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Dl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Re.__wrap(t);
  }
}
const Fl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_pshl_free(r >>> 0, 1));
class HC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_pshl_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} bitmask
   */
  constructor(t) {
    w(t, Re);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Fl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Re.__wrap(t);
  }
}
const Ql = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_panicinstruction_free(r >>> 0, 1));
class WC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ql.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_panicinstruction_free(t, 0);
  }
  /**
   * Represents an error described by a reason and an instruction.
   * @param {PanicReason} reason
   * @param {number} instruction
   */
  constructor(t, e) {
    const n = c.panicinstruction_error_typescript(t, e);
    return this.__wbg_ptr = n >>> 0, Ql.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Underlying panic reason
   * @returns {PanicReason}
   */
  reason() {
    return c.panicinstruction_reason(this.__wbg_ptr);
  }
  /**
   * Underlying instruction
   * @returns {number}
   */
  instruction() {
    return c.panicinstruction_instruction(this.__wbg_ptr) >>> 0;
  }
}
const Ol = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ret_free(r >>> 0, 1));
class XC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ol.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ret_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} value
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Ol.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ml = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_retd_free(r >>> 0, 1));
class ZC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ml.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_retd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} addr
   * @param {RegId} len
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Ml.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Pl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_rvrt_free(r >>> 0, 1));
class jC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_rvrt_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} value
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Pl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ac = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_regid_free(r >>> 0, 1));
class l {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(l.prototype);
    return e.__wbg_ptr = t, Ac.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ac.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_regid_free(t, 0);
  }
  /**
   * Construct a register ID from the given value.
   *
   * Returns `None` if the value is outside the 6-bit value range.
   * @param {number} u
   * @returns {RegId | undefined}
   */
  static new_checked(t) {
    const e = c.regid_new_checked(t);
    return e === 0 ? void 0 : l.__wrap(e);
  }
  /**
   * Received balance for this context.
   * @returns {RegId}
   */
  static bal() {
    const t = c.regid_bal();
    return l.__wrap(t);
  }
  /**
   * Remaining gas in the context.
   * @returns {RegId}
   */
  static cgas() {
    const t = c.regid_cgas();
    return l.__wrap(t);
  }
  /**
   * Error codes for particular operations.
   * @returns {RegId}
   */
  static err() {
    const t = c.regid_err();
    return l.__wrap(t);
  }
  /**
   * Flags register.
   * @returns {RegId}
   */
  static flag() {
    const t = c.regid_flag();
    return l.__wrap(t);
  }
  /**
   * Frame pointer. Memory address of beginning of current call frame.
   * @returns {RegId}
   */
  static fp() {
    const t = c.regid_fp();
    return l.__wrap(t);
  }
  /**
   * Remaining gas globally.
   * @returns {RegId}
   */
  static ggas() {
    const t = c.regid_ggas();
    return l.__wrap(t);
  }
  /**
   * Heap pointer. Memory address below the current bottom of the heap (points to free
   * memory).
   * @returns {RegId}
   */
  static hp() {
    const t = c.regid_hp();
    return l.__wrap(t);
  }
  /**
   * Instructions start. Pointer to the start of the currently-executing code.
   * @returns {RegId}
   */
  static is() {
    const t = c.regid_is();
    return l.__wrap(t);
  }
  /**
   * Contains overflow/underflow of addition, subtraction, and multiplication.
   * @returns {RegId}
   */
  static of() {
    const t = c.regid_of();
    return l.__wrap(t);
  }
  /**
   * Contains one (1), for convenience.
   * @returns {RegId}
   */
  static one() {
    const t = c.regid_one();
    return l.__wrap(t);
  }
  /**
   * The program counter. Memory address of the current instruction.
   * @returns {RegId}
   */
  static pc() {
    const t = c.regid_pc();
    return l.__wrap(t);
  }
  /**
   * Return value or pointer.
   * @returns {RegId}
   */
  static ret() {
    const t = c.regid_ret();
    return l.__wrap(t);
  }
  /**
   * Return value length in bytes.
   * @returns {RegId}
   */
  static retl() {
    const t = c.regid_retl();
    return l.__wrap(t);
  }
  /**
   * Stack pointer. Memory address on top of current writable stack area (points to
   * free memory).
   * @returns {RegId}
   */
  static sp() {
    const t = c.regid_sp();
    return l.__wrap(t);
  }
  /**
   * Stack start pointer. Memory address of bottom of current writable stack area.
   * @returns {RegId}
   */
  static spp() {
    const t = c.regid_spp();
    return l.__wrap(t);
  }
  /**
   * Smallest writable register.
   * @returns {RegId}
   */
  static writable() {
    const t = c.regid_writable();
    return l.__wrap(t);
  }
  /**
   * Contains zero (0), for convenience.
   * @returns {RegId}
   */
  static zero() {
    const t = c.regid_zero();
    return l.__wrap(t);
  }
  /**
   * Construct a register ID from the given value.
   *
   * The given value will be masked to 6 bits.
   * @param {number} u
   */
  constructor(t) {
    const e = c.regid_new_typescript(t);
    return this.__wbg_ptr = e >>> 0, Ac.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * A const alternative to the `Into<u8>` implementation.
   * @returns {number}
   */
  to_u8() {
    const t = this.__destroy_into_raw();
    return c.regid_to_u8(t);
  }
}
const Ll = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_s256_free(r >>> 0, 1));
class JC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ll.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_s256_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} src_addr
   * @param {RegId} len
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ll.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const kl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sb_free(r >>> 0, 1));
class qC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} addr
   * @param {RegId} value
   * @param {Imm12} offset
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, kl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const Ul = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_scwq_free(r >>> 0, 1));
class $C {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ul.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_scwq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} key_addr
   * @param {RegId} status
   * @param {RegId} lenq
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ul.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const zl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sll_free(r >>> 0, 1));
class KC {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sll_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, zl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Gl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_slli_free(r >>> 0, 1));
class tv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_slli_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Gl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const Vl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_smo_free(r >>> 0, 1));
class ev {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_smo_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} recipient_addr
   * @param {RegId} data_addr
   * @param {RegId} data_len
   * @param {RegId} coins
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Vl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Yl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_srl_free(r >>> 0, 1));
class rv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srl_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Yl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Hl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_srli_free(r >>> 0, 1));
class nv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srli_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Hl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const Wl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_srw_free(r >>> 0, 1));
class sv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srw_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} status
   * @param {RegId} key_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Wl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Xl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_srwq_free(r >>> 0, 1));
class iv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srwq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} status
   * @param {RegId} key_addr
   * @param {RegId} lenq
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Xl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Zl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sub_free(r >>> 0, 1));
class av {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sub_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Zl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const jl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_subi_free(r >>> 0, 1));
class ov {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_subi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, jl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const Jl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sw_free(r >>> 0, 1));
class cv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sw_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} addr
   * @param {RegId} value
   * @param {Imm12} offset
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Jl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
const ql = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sww_free(r >>> 0, 1));
class dv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ql.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sww_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} key_addr
   * @param {RegId} status
   * @param {RegId} value
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ql.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const $l = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_swwq_free(r >>> 0, 1));
class uv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $l.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_swwq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} key_addr
   * @param {RegId} status
   * @param {RegId} src_addr
   * @param {RegId} lenq
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, $l.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Kl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_time_free(r >>> 0, 1));
class hv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_time_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} heigth
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Kl.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const t_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_tr_free(r >>> 0, 1));
class lv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_tr_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} contract_id_addr
   * @param {RegId} amount
   * @param {RegId} asset_id_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, t_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const e_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_tro_free(r >>> 0, 1));
class _v {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, e_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_tro_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} contract_id_addr
   * @param {RegId} output_index
   * @param {RegId} amount
   * @param {RegId} asset_id_addr
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, e_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const r_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdam_free(r >>> 0, 1));
class pv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, r_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdam_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} add_lhs
   * @param {RegId} add_rhs
   * @param {RegId} modulo
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, r_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const gc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdcm_free(r >>> 0, 1));
class Ja {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ja.prototype);
    return e.__wbg_ptr = t, gc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdcm_free(t, 0);
  }
  /**
   * Construct a `WDCM` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {CompareArgs} args
   * @returns {WDCM}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, en);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_from_args(i, a, o, d);
    return Ja.__wrap(_);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, gc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const wc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wddv_free(r >>> 0, 1));
class qa {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(qa.prototype);
    return e.__wbg_ptr = t, wc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wddv_free(t, 0);
  }
  /**
   * Construct a `WDDV` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {DivArgs} args
   * @returns {WDDV}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, aa);
    var d = s.__destroy_into_raw();
    const _ = c.wddv_from_args(i, a, o, d);
    return qa.__wrap(_);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, wc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const n_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdmd_free(r >>> 0, 1));
class fv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, n_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdmd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} divisor
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, n_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const mc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdml_free(r >>> 0, 1));
class $a {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create($a.prototype);
    return e.__wbg_ptr = t, mc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdml_free(t, 0);
  }
  /**
   * Construct a `WDML` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {MulArgs} args
   * @returns {WDML}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, ca);
    var d = s.__destroy_into_raw();
    const _ = c.wdml_from_args(i, a, o, d);
    return $a.__wrap(_);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, mc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const s_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdmm_free(r >>> 0, 1));
class Av {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, s_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdmm_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} modulo
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, s_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const yc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdop_free(r >>> 0, 1));
class Ka {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ka.prototype);
    return e.__wbg_ptr = t, yc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdop_free(t, 0);
  }
  /**
   * Construct a `WDOP` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {MathArgs} args
   * @returns {WDOP}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, oa);
    var d = s.__destroy_into_raw();
    const _ = c.wdop_from_args(i, a, o, d);
    return Ka.__wrap(_);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, yc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const i_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqam_free(r >>> 0, 1));
class gv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, i_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqam_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} add_lhs
   * @param {RegId} add_rhs
   * @param {RegId} modulo
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, i_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const bc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqcm_free(r >>> 0, 1));
class to {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(to.prototype);
    return e.__wbg_ptr = t, bc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqcm_free(t, 0);
  }
  /**
   * Construct a `WQCM` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {CompareArgs} args
   * @returns {WQCM}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, en);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_from_args(i, a, o, d);
    return to.__wrap(_);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, bc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const Ic = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqdv_free(r >>> 0, 1));
class eo {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(eo.prototype);
    return e.__wbg_ptr = t, Ic.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ic.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqdv_free(t, 0);
  }
  /**
   * Construct a `WQDV` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {DivArgs} args
   * @returns {WQDV}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, aa);
    var d = s.__destroy_into_raw();
    const _ = c.wddv_from_args(i, a, o, d);
    return eo.__wrap(_);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Ic.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const a_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqmd_free(r >>> 0, 1));
class wv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, a_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqmd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} divisor
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, a_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ec = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqml_free(r >>> 0, 1));
class ro {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(ro.prototype);
    return e.__wbg_ptr = t, Ec.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ec.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqml_free(t, 0);
  }
  /**
   * Construct a `WQML` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {MulArgs} args
   * @returns {WQML}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, ca);
    var d = s.__destroy_into_raw();
    const _ = c.wdml_from_args(i, a, o, d);
    return ro.__wrap(_);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Ec.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const o_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqmm_free(r >>> 0, 1));
class mv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, o_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqmm_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} modulo
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const _ = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, o_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Cc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqop_free(r >>> 0, 1));
class no {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(no.prototype);
    return e.__wbg_ptr = t, Cc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqop_free(t, 0);
  }
  /**
   * Construct a `WQOP` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {MathArgs} args
   * @returns {WQOP}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, oa);
    var d = s.__destroy_into_raw();
    const _ = c.wdop_from_args(i, a, o, d);
    return no.__wrap(_);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const _ = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = _ >>> 0, Cc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const c_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_xor_free(r >>> 0, 1));
class yv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, c_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_xor_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, c_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const d_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_xori_free(r >>> 0, 1));
class bv {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, d_.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_xori_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, lt);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, d_.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return lt.__wrap(t);
  }
}
async function Iv(r, t) {
  if (typeof Response == "function" && r instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(r, t);
      } catch (n) {
        if (r.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    const e = await r.arrayBuffer();
    return await WebAssembly.instantiate(e, t);
  } else {
    const e = await WebAssembly.instantiate(r, t);
    return e instanceof WebAssembly.Instance ? { instance: e, module: r } : e;
  }
}
function Df() {
  const r = {};
  return r.wbg = {}, r.wbg.__wbindgen_throw = function(t, e) {
    throw new Error(gb(t, e));
  }, r;
}
function Ff(r, t) {
  return c = r.exports, Qf.__wbindgen_wasm_module = t, on = null, zi = null, c;
}
function Ev(r) {
  if (c !== void 0) return c;
  typeof r < "u" && (Object.getPrototypeOf(r) === Object.prototype ? { module: r } = r : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
  const t = Df();
  r instanceof WebAssembly.Module || (r = new WebAssembly.Module(r));
  const e = new WebAssembly.Instance(r, t);
  return Ff(e, r);
}
async function Qf(r) {
  if (c !== void 0) return c;
  typeof r < "u" && (Object.getPrototypeOf(r) === Object.prototype ? { module_or_path: r } = r : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
  const t = Df(), { instance: e, module: n } = await Iv(await r, t);
  return Ff(e, n);
}
function Cv(r, t, e, n) {
  var s = null, i = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (i)
    s = Buffer.from(e, "base64");
  else {
    var a = globalThis.atob(e), o = a.length;
    s = new Uint8Array(new ArrayBuffer(o));
    for (var d = 0; d < o; d++)
      s[d] = a.charCodeAt(d);
  }
  {
    var _ = new WebAssembly.Module(s);
    return n ? new WebAssembly.Instance(_, n) : _;
  }
}
function vv(r) {
  return Cv(1, null, "AGFzbQEAAAABOgpgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38AYAJ/fwF/YAABf2AFf39/f38Bf2ABfwBgA39/fwBgAAACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cAAwOBAv8BAQEDAwMDAwMBAQMDAQEBAwMBAQEEAQMDAwEBAwEBAQQCAQMCAgICAgIDAwMEBAQEBAQEBAEBAQMDAAICBAQEBAQEBAQEBAABAQgDAwQBAQEBAQEBAgcDAQAAAQEDBwcBAwEDAgIBAQEAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBBQEBAQEEAAQBBgICAwMAAgAHAQgEAQQBCQMBAQcBBQUFBQUFBQUFBQUFBQUFBQUFBQMGBgICBAIGBgAACAAEBQMBABEGCQF/AUGAgMAACwe9Td0FBm1lbW9yeQIAFl9fd2JnX2NvbXBhcmVhcmdzX2ZyZWUAEBpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQBIGl9fd2JnX3NldF9jb21wYXJlYXJnc19tb2RlADgiX193YmdfZ2V0X2NvbXBhcmVhcmdzX2luZGlyZWN0X3JocwBJIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMASxJjb21wYXJlYXJnc190b19pbW0AWBRjb21wYXJlYXJnc19mcm9tX2ltbQAfFV9fd2JnX2dldF9tYXRoYXJnc19vcABIFV9fd2JnX3NldF9tYXRoYXJnc19vcAA5El9fd2JnX211bGFyZ3NfZnJlZQARHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X3JocwBIHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwBMEl9fd2JnX2RpdmFyZ3NfZnJlZQAjHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwC7AR5fX3diZ19zZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMAYxtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAFyFwYW5pY2luc3RydWN0aW9uX2Vycm9yX3R5cGVzY3JpcHQATRdwYW5pY2luc3RydWN0aW9uX3JlYXNvbgBbHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AXAxnbV9mcm9tX2FyZ3MA1wENZ3RmX2Zyb21fYXJncwDPAQdnbV9hcmdzAIoBCGd0Zl9hcmdzAGkOd2RjbV9mcm9tX2FyZ3MAOw53ZG9wX2Zyb21fYXJncwA7DndkbWxfZnJvbV9hcmdzADwOd2Rkdl9mcm9tX2FyZ3MAywEJd2RjbV9hcmdzACQJd3FjbV9hcmdzACUJd2RvcF9hcmdzACYJd3FvcF9hcmdzACcJd2RtbF9hcmdzACgJd3FtbF9hcmdzACkJd2Rkdl9hcmdzAGQJd3Fkdl9hcmdzAGUQX193YmdfaW1tMDZfZnJlZQAqEF9fd2JnX2ltbTEyX2ZyZWUAKxBfX3diZ19pbW0xOF9mcmVlACwOX193YmdfYWRkX2ZyZWUAGA9fX3diZ19ub29wX2ZyZWUABxJhZGRfbmV3X3R5cGVzY3JpcHQAWQZhZGRfcmEANQZhZGRfcmIAEgZhZGRfcmMAGgNhZGQAxwEDYW5kAIwBA2RpdgCNAQJlcQCOAQNleHAAjwECZ3QAkAECbHQAkQEEbWxvZwCSAQRtcm9vAJMBBG1vZF8AlAEFbW92ZV8APQNtdWwAlQEDbm90AD4Cb3IAlgEDc2xsAJcBA3NybACYAQNzdWIAmQEDeG9yAJoBBG1sZHYAagNyZXQAvAEEcmV0ZAA/E2Fsb2NfbmV3X3R5cGVzY3JpcHQAYAdhbG9jX3JhACIEYWxvYwC9AQNtY2wAQANtY3AAmwEDbWVxAGsTYmhzaF9uZXdfdHlwZXNjcmlwdAAgBGJoc2gALQRiaGVpAL4BBGJ1cm4AQQRjYWxsAGwDY2NwAG0EY3JvbwBCBGNzaXoAQwJjYgC/AQNsZGMAbgNsb2cAbwRsb2dkAHAEbWludABEBHJ2cnQAwAEEc2N3cQCcAQNzcncAnQEEc3J3cQBxA3N3dwCeAQRzd3dxAHICdHIAnwEDdHJvAHMEZWNrMQCgAQRlY3IxAKEBBGVkMTkAdARrMjU2AKIBBHMyNTYAowEEdGltZQBFE25vb3BfbmV3X3R5cGVzY3JpcHQAwQEEbm9vcADfAQRmbGFnAMIBA2JhbACkAQNqbXAAwwEDam5lAKUBA3NtbwB1E2FkZGlfbmV3X3R5cGVzY3JpcHQAWgphZGRpX2ltbTEyAAkEYWRkaQCmAQRhbmRpAKcBBGRpdmkAqAEEZXhwaQCpAQRtb2RpAKoBBG11bGkAqwEDb3JpAKwBBHNsbGkArQEEc3JsaQCuAQRzdWJpAK8BBHhvcmkAsAEEam5laQCxAQJsYgCyAQJsdwCzAQJzYgC0AQJzdwC1AQRtY3BpALYBEmd0Zl9uZXdfdHlwZXNjcmlwdADRAQNndGYAtwEEbWNsaQAuEWdtX25ld190eXBlc2NyaXB0AEYIZ21faW1tMTgADQJnbQAvBG1vdmkAMARqbnppADEEam1wZgAyE2ptcGJfbmV3X3R5cGVzY3JpcHQAFQRqbXBiADMEam56ZgC4AQRqbnpiALkBBGpuZWYAdgpqbmViX2ltbTA2ADYEam5lYgB3AmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdAA3CmNmZWlfaW1tMjQACgRjZmVpAE8EY2ZzaQBQA2NmZQDEAQNjZnMAxQEEcHNobABRBHBzaGgAUgRwb3BsAFMEcG9waABUE3dkY21fbmV3X3R5cGVzY3JpcHQAzAEEd2RjbQB4BHdxY20AeQR3ZG9wAHoEd3FvcAB7BHdkbWwAfAR3cW1sAH0Ed2RkdgB+BHdxZHYAfwR3ZG1kAIABBHdxbWQAgQEEd2RhbQCCAQR3cWFtAIMBBHdkbW0AhAEEd3FtbQCFAQRlY2FsAIYBBGJzaXoANBNibGRkX25ld190eXBlc2NyaXB0AFUHYmxkZF9yZAA2BGJsZGQAhwEEZWNvcACIAQRlcGFyAIkBFl9fd2JnX2luc3RydWN0aW9uX2ZyZWUADBRpbnN0cnVjdGlvbl90b19ieXRlcwAGEGluc3RydWN0aW9uX3NpemUA8QERcmVnaWRfbmV3X2NoZWNrZWQAugEJcmVnaWRfYmFsAOABCnJlZ2lkX2NnYXMA4QEJcmVnaWRfZXJyAOIBCnJlZ2lkX2ZsYWcA4wEIcmVnaWRfZnAA5AEKcmVnaWRfZ2dhcwDlAQhyZWdpZF9ocADmAQhyZWdpZF9pcwDnAQhyZWdpZF9vZgDoAQlyZWdpZF9vbmUA6QEIcmVnaWRfcGMA6gEJcmVnaWRfcmV0AOsBCnJlZ2lkX3JldGwA7AEIcmVnaWRfc3AA7QEJcmVnaWRfc3BwAO4BDnJlZ2lkX3dyaXRhYmxlAO8BCnJlZ2lkX3plcm8A8AEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA2wELcmVnaWRfdG9fdTgA3AESYW5kX25ld190eXBlc2NyaXB0AFkSZGl2X25ld190eXBlc2NyaXB0AFkRZXFfbmV3X3R5cGVzY3JpcHQAWRJleHBfbmV3X3R5cGVzY3JpcHQAWRFndF9uZXdfdHlwZXNjcmlwdABZEWx0X25ld190eXBlc2NyaXB0AFkTbWxvZ19uZXdfdHlwZXNjcmlwdABZE21yb29fbmV3X3R5cGVzY3JpcHQAWRJtb2RfbmV3X3R5cGVzY3JpcHQAWRJtdWxfbmV3X3R5cGVzY3JpcHQAWRFvcl9uZXdfdHlwZXNjcmlwdABZEnNsbF9uZXdfdHlwZXNjcmlwdABZEnNybF9uZXdfdHlwZXNjcmlwdABZEnN1Yl9uZXdfdHlwZXNjcmlwdABZEnhvcl9uZXdfdHlwZXNjcmlwdABZEm1jcF9uZXdfdHlwZXNjcmlwdABZE3Njd3FfbmV3X3R5cGVzY3JpcHQAWRJzcndfbmV3X3R5cGVzY3JpcHQAWRJzd3dfbmV3X3R5cGVzY3JpcHQAWRF0cl9uZXdfdHlwZXNjcmlwdABZE2VjazFfbmV3X3R5cGVzY3JpcHQAWRNlY3IxX25ld190eXBlc2NyaXB0AFkTazI1Nl9uZXdfdHlwZXNjcmlwdABZE3MyNTZfbmV3X3R5cGVzY3JpcHQAWRJiYWxfbmV3X3R5cGVzY3JpcHQAWRJqbmVfbmV3X3R5cGVzY3JpcHQAWRNhbmRpX25ld190eXBlc2NyaXB0AFoTZGl2aV9uZXdfdHlwZXNjcmlwdABaE2V4cGlfbmV3X3R5cGVzY3JpcHQAWhNtb2RpX25ld190eXBlc2NyaXB0AFoTbXVsaV9uZXdfdHlwZXNjcmlwdABaEm9yaV9uZXdfdHlwZXNjcmlwdABaE3NsbGlfbmV3X3R5cGVzY3JpcHQAWhNzcmxpX25ld190eXBlc2NyaXB0AFoTc3ViaV9uZXdfdHlwZXNjcmlwdABaE3hvcmlfbmV3X3R5cGVzY3JpcHQAWhNqbmVpX25ld190eXBlc2NyaXB0AFoRbGJfbmV3X3R5cGVzY3JpcHQAWhFsd19uZXdfdHlwZXNjcmlwdABaEXNiX25ld190eXBlc2NyaXB0AFoRc3dfbmV3X3R5cGVzY3JpcHQAWhNtY3BpX25ld190eXBlc2NyaXB0AFoTam56Zl9uZXdfdHlwZXNjcmlwdABaE2puemJfbmV3X3R5cGVzY3JpcHQAWhFqaV9uZXdfdHlwZXNjcmlwdAA3E2Nmc2lfbmV3X3R5cGVzY3JpcHQANxNwc2hsX25ld190eXBlc2NyaXB0ADcTcHNoaF9uZXdfdHlwZXNjcmlwdAA3E3BvcGxfbmV3X3R5cGVzY3JpcHQANxNwb3BoX25ld190eXBlc2NyaXB0ADcTbW92aV9uZXdfdHlwZXNjcmlwdAAVE21jbGlfbmV3X3R5cGVzY3JpcHQAFRNqbnppX25ld190eXBlc2NyaXB0ABUTam1wZl9uZXdfdHlwZXNjcmlwdAAVEm5vdF9uZXdfdHlwZXNjcmlwdAAgE3JldGRfbmV3X3R5cGVzY3JpcHQAIBNtb3ZlX25ld190eXBlc2NyaXB0ACASbWNsX25ld190eXBlc2NyaXB0ACATYnVybl9uZXdfdHlwZXNjcmlwdAAgE2Nyb29fbmV3X3R5cGVzY3JpcHQAIBNjc2l6X25ld190eXBlc2NyaXB0ACATbWludF9uZXdfdHlwZXNjcmlwdAAgE3RpbWVfbmV3X3R5cGVzY3JpcHQAIBNic2l6X25ld190eXBlc2NyaXB0ACAGcmV0X3JhACIHYmhlaV9yYQAiBWNiX3JhACIHcnZydF9yYQAiB2ZsYWdfcmEAIgZqbXBfcmEAIghqaV9pbW0yNAAKCmNmc2lfaW1tMjQACgZjZmVfcmEAIgZjZnNfcmEAIgpwc2hsX2ltbTI0AAoKcHNoaF9pbW0yNAAKCnBvcGxfaW1tMjQACgpwb3BoX2ltbTI0AAoTbWxkdl9uZXdfdHlwZXNjcmlwdABVEm1lcV9uZXdfdHlwZXNjcmlwdABVEmNjcF9uZXdfdHlwZXNjcmlwdABVEmxvZ19uZXdfdHlwZXNjcmlwdABVE2xvZ2RfbmV3X3R5cGVzY3JpcHQAVRNzcndxX25ld190eXBlc2NyaXB0AFUTc3d3cV9uZXdfdHlwZXNjcmlwdABVEnRyb19uZXdfdHlwZXNjcmlwdABVE2VkMTlfbmV3X3R5cGVzY3JpcHQAVRJzbW9fbmV3X3R5cGVzY3JpcHQAVRJsZGNfbmV3X3R5cGVzY3JpcHQAVRNqbmVmX25ld190eXBlc2NyaXB0AFUTd2RtZF9uZXdfdHlwZXNjcmlwdABVE3dxbWRfbmV3X3R5cGVzY3JpcHQAVRN3ZGFtX25ld190eXBlc2NyaXB0AFUTd3FhbV9uZXdfdHlwZXNjcmlwdABVE3dkbW1fbmV3X3R5cGVzY3JpcHQAVRN3cW1tX25ld190eXBlc2NyaXB0AFUTZWNhbF9uZXdfdHlwZXNjcmlwdABVE2NhbGxfbmV3X3R5cGVzY3JpcHQAVRNlY29wX25ld190eXBlc2NyaXB0AFUTZXBhcl9uZXdfdHlwZXNjcmlwdABVE19fd2JnX21hdGhhcmdzX2ZyZWUAEB9fX3diZ19zZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzAEseX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAEsfX193YmdfZ2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwBJHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X2xocwBJEnJldF9uZXdfdHlwZXNjcmlwdABgE2JoZWlfbmV3X3R5cGVzY3JpcHQAYBFjYl9uZXdfdHlwZXNjcmlwdABgE3J2cnRfbmV3X3R5cGVzY3JpcHQAYBNmbGFnX25ld190eXBlc2NyaXB0AGASam1wX25ld190eXBlc2NyaXB0AGASY2ZlX25ld190eXBlc2NyaXB0AGASY2ZzX25ld190eXBlc2NyaXB0AGAPX193Ymdfam1wZl9mcmVlABgPX193Ymdfc3ViaV9mcmVlABgNX193YmdfamlfZnJlZQAYD19fd2JnX2VjYWxfZnJlZQAYD19fd2JnX3BvcGxfZnJlZQAYDl9fd2JnX2xkY19mcmVlABgPX193Ymdfd2RtbF9mcmVlABgNX193YmdfbHdfZnJlZQAYD19fd2JnX3dxbWxfZnJlZQAYD19fd2JnX2V4cGlfZnJlZQAYD19fd2JnX2puZWZfZnJlZQAYDl9fd2JnX3Nyd19mcmVlABgPX193YmdfYmxkZF9mcmVlABgOX193YmdfbWNwX2ZyZWUAGA9fX3diZ193ZG9wX2ZyZWUAGA9fX3diZ190aW1lX2ZyZWUAGA9fX3diZ19zcndxX2ZyZWUAGA5fX3diZ19jZmVfZnJlZQAYDV9fd2JnX2x0X2ZyZWUAGA9fX3diZ19ydnJ0X2ZyZWUAGA9fX3diZ19kaXZpX2ZyZWUAGA9fX3diZ19tbGR2X2ZyZWUAGA1fX3diZ19sYl9mcmVlABgNX193YmdfY2JfZnJlZQAYDl9fd2JnX2xvZ19mcmVlABgOX193YmdfbWNsX2ZyZWUAGA9fX3diZ193cW1tX2ZyZWUAGA9fX3diZ19zd3dxX2ZyZWUAGA9fX3diZ19idXJuX2ZyZWUAGA5fX3diZ194b3JfZnJlZQAYDl9fd2JnX2V4cF9mcmVlABgPX193Ymdfd3FvcF9mcmVlABgPX193YmdfczI1Nl9mcmVlABgPX193Ymdfd2RhbV9mcmVlABgPX193Ymdfam5lYl9mcmVlABgPX193YmdfbW92aV9mcmVlABgOX193Ymdfam1wX2ZyZWUAGA5fX3diZ19zbW9fZnJlZQAYD19fd2JnX2Joc2hfZnJlZQAYD19fd2JnX211bGlfZnJlZQAYD19fd2JnX21vZGlfZnJlZQAYDl9fd2JnX3Ryb19mcmVlABgPX193Ymdfc2N3cV9mcmVlABgPX193Ymdfd3FjbV9mcmVlABgPX193Ymdfd3FtZF9mcmVlABgPX193YmdfZWNyMV9mcmVlABgNX193Ymdfc3dfZnJlZQAYD19fd2JnX2xvZ2RfZnJlZQAYD19fd2JnX21pbnRfZnJlZQAYD19fd2JnX3dkbWRfZnJlZQAYD19fd2JnX3hvcmlfZnJlZQAYD19fd2JnX2FuZGlfZnJlZQAYD19fd2JnX3NybGlfZnJlZQAYD19fd2JnX2NhbGxfZnJlZQAYD19fd2JnX21vdmVfZnJlZQAYDV9fd2JnX2VxX2ZyZWUAGA9fX3diZ19qbmVpX2ZyZWUAGA9fX3diZ19lZDE5X2ZyZWUAGA9fX3diZ19wc2hoX2ZyZWUAGA5fX3diZ19zbGxfZnJlZQAYD19fd2JnX2FkZGlfZnJlZQAYD19fd2JnX2puemJfZnJlZQAYDl9fd2JnX3N3d19mcmVlABgOX193YmdfY2NwX2ZyZWUAGA9fX3diZ19qbXBiX2ZyZWUAGA9fX3diZ19tbG9nX2ZyZWUAGA9fX3diZ19tY3BpX2ZyZWUAGA1fX3diZ19ndF9mcmVlABgPX193YmdfYnNpel9mcmVlABgPX193Ymdfam56aV9mcmVlABgOX193Ymdfc3ViX2ZyZWUAGA5fX3diZ19kaXZfZnJlZQAYDl9fd2JnX2puZV9mcmVlABgOX193YmdfcmV0X2ZyZWUAGA9fX3diZ19lY29wX2ZyZWUAGA9fX3diZ19yZXRkX2ZyZWUAGA1fX3diZ19vcl9mcmVlABgPX193YmdfY2ZzaV9mcmVlABgPX193YmdfcG9waF9mcmVlABgOX193YmdfYmFsX2ZyZWUAGA9fX3diZ193ZGR2X2ZyZWUAGA9fX3diZ19tcm9vX2ZyZWUAGA9fX3diZ19rMjU2X2ZyZWUAGA1fX3diZ190cl9mcmVlABgOX193YmdfY2ZzX2ZyZWUAGA9fX3diZ193cWFtX2ZyZWUAGA1fX3diZ19zYl9mcmVlABgOX193YmdfZ3RmX2ZyZWUAGA9fX3diZ19qbnpmX2ZyZWUAGA9fX3diZ19mbGFnX2ZyZWUAGA5fX3diZ19tZXFfZnJlZQAYD19fd2JnX2VwYXJfZnJlZQAYD19fd2JnX21jbGlfZnJlZQAYD19fd2JnX3dkY21fZnJlZQAYD19fd2JnX2NmZWlfZnJlZQAYD19fd2JnX2Fsb2NfZnJlZQAYDV9fd2JnX2dtX2ZyZWUAGA9fX3diZ193cWR2X2ZyZWUAGA5fX3diZ19zcmxfZnJlZQAYDl9fd2JnX25vdF9mcmVlABgPX193YmdfY3Npel9mcmVlABgOX193YmdfbW9kX2ZyZWUAGA9fX3diZ193ZG1tX2ZyZWUAGA9fX3diZ19zbGxpX2ZyZWUAGA9fX3diZ19iaGVpX2ZyZWUAGA9fX3diZ19lY2sxX2ZyZWUAGA9fX3diZ19wc2hsX2ZyZWUAGA9fX3diZ19jcm9vX2ZyZWUAGA5fX3diZ19tdWxfZnJlZQAYDl9fd2JnX2FuZF9mcmVlABgOX193Ymdfb3JpX2ZyZWUAGBN3cWR2X25ld190eXBlc2NyaXB0AMwBE3dxbWxfbmV3X3R5cGVzY3JpcHQAzAETd2RtbF9uZXdfdHlwZXNjcmlwdADMARN3cW9wX25ld190eXBlc2NyaXB0AMwBE3dkb3BfbmV3X3R5cGVzY3JpcHQAzAETd3FjbV9uZXdfdHlwZXNjcmlwdADMARN3ZGR2X25ld190eXBlc2NyaXB0AMwBDndxY21fZnJvbV9hcmdzADsKd3Fkdl9pbW0wNgA2CndxbWxfaW1tMDYANgp3ZG1sX2ltbTA2ADYKd3FvcF9pbW0wNgA2Cndkb3BfaW1tMDYANgp3cWNtX2ltbTA2ADYKd2Rkdl9pbW0wNgA2CndkY21faW1tMDYANgpqbmVmX2ltbTA2ADYJbGRjX2ltbTA2ADYOd3Fkdl9mcm9tX2FyZ3MAywEOd3FvcF9mcm9tX2FyZ3MAOwVnbV9yYQA1BWd0X3JjABoFZ3RfcmIAEgVndF9yYQA1BWxiX3JiABIFbGJfcmEANQVsdF9yYwAaBWx0X3JiABIFbHRfcmEANQhsd19pbW0xMgAJBWx3X3JiABIFbHdfcmEANQVvcl9yYwAaBW9yX3JiABIFb3JfcmEANQhzYl9pbW0xMgAJBXNiX3JiABIFc2JfcmEANQhzd19pbW0xMgAJBXN3X3JiABIFc3dfcmEANQV0cl9yYwAaBXRyX3JiABIFdHJfcmEANQVlcV9yYwAaBWVxX3JiABIFZXFfcmEANQZhbmRfcmMAGgZhbmRfcmIAEgZhbmRfcmEANQZiYWxfcmMAGgZiYWxfcmIAEgZiYWxfcmEANQZjY3BfcmMAGgZjY3BfcmIAEgZjY3BfcmEANQZkaXZfcmMAGgZkaXZfcmIAEgZkaXZfcmEANQZleHBfcmMAGgZleHBfcmIAEgZleHBfcmEANQhsYl9pbW0xMgAJBmd0Zl9yYgASBmd0Zl9yYQA1BmpuZV9yYwAaBmpuZV9yYgASBmpuZV9yYQA1BmxkY19yYwAaBmxkY19yYgASBmxkY19yYQA1BmxvZ19yZAA2BmxvZ19yYwAaBmxvZ19yYgASBmxvZ19yYQA1Bm1jbF9yYgASBm1jbF9yYQA1Bm1jcF9yYwAaBm1jcF9yYgASBm1jcF9yYQA1Bm1lcV9yZAA2Bm1lcV9yYwAaBm1lcV9yYgASBm1lcV9yYQA1Bm1vZF9yYwAaBm1vZF9yYgASBm1vZF9yYQA1Bm11bF9yYwAaBm11bF9yYgASBm11bF9yYQA1Bm5vdF9yYgASBm5vdF9yYQA1CW9yaV9pbW0xMgAJBm9yaV9yYgASBm9yaV9yYQA1BnNsbF9yYwAaBnNsbF9yYgASBnNsbF9yYQA1BnNtb19yZAA2BnNtb19yYwAaBnNtb19yYgASBnNtb19yYQA1BnNybF9yYwAaBnNybF9yYgASBnNybF9yYQA1BnNyd19yYwAaBnNyd19yYgASBnNyd19yYQA1BnN1Yl9yYwAaBnN1Yl9yYgASBnN1Yl9yYQA1BnN3d19yYwAaBnN3d19yYgASBnN3d19yYQA1BnRyb19yZAA2BnRyb19yYwAaBnRyb19yYgASBnRyb19yYQA1Bnhvcl9yYwAaBnhvcl9yYgASBnhvcl9yYQA1CWd0Zl9pbW0xMgAJB2FkZGlfcmIAEgdhZGRpX3JhADUKYW5kaV9pbW0xMgAJB2FuZGlfcmIAEgdhbmRpX3JhADUHYmhzaF9yYgASB2Joc2hfcmEANQZjY3BfcmQANgdibGRkX3JjABoHYmxkZF9yYgASB2JsZGRfcmEANQdic2l6X3JiABIHYnNpel9yYQA1B2J1cm5fcmIAEgdidXJuX3JhADUHY2FsbF9yZAA2B2NhbGxfcmMAGgdjYWxsX3JiABIHY2FsbF9yYQA1B2Nyb29fcmIAEgdjcm9vX3JhADUHY3Npel9yYgASB2NzaXpfcmEANQpkaXZpX2ltbTEyAAkHZGl2aV9yYgASB2RpdmlfcmEANQdlY2FsX3JkADYHZWNhbF9yYwAaB2VjYWxfcmIAEgdlY2FsX3JhADUHZWNrMV9yYwAaB2VjazFfcmIAEgdlY2sxX3JhADUHZWNvcF9yZAA2B2Vjb3BfcmMAGgdlY29wX3JiABIHZWNvcF9yYQA1B2VjcjFfcmMAGgdlY3IxX3JiABIHZWNyMV9yYQA1B2VkMTlfcmQANgdlZDE5X3JjABoHZWQxOV9yYgASB2VkMTlfcmEANQdlcGFyX3JkADYHZXBhcl9yYwAaB2VwYXJfcmIAEgdlcGFyX3JhADUKZXhwaV9pbW0xMgAJB2V4cGlfcmIAEgdleHBpX3JhADUKam1wYl9pbW0xOAANB2ptcGJfcmEANQpqbXBmX2ltbTE4AA0Ham1wZl9yYQA1B2puZWJfcmMAGgdqbmViX3JiABIHam5lYl9yYQA1B2puZWZfcmMAGgdqbmVmX3JiABIHam5lZl9yYQA1CmpuZWlfaW1tMTIACQdqbmVpX3JiABIHam5laV9yYQA1CmpuemJfaW1tMTIACQdqbnpiX3JiABIHam56Yl9yYQA1CmpuemZfaW1tMTIACQdqbnpmX3JiABIHam56Zl9yYQA1CmpuemlfaW1tMTgADQdqbnppX3JhADUHazI1Nl9yYwAaB2syNTZfcmIAEgdrMjU2X3JhADUHbG9nZF9yZAA2B2xvZ2RfcmMAGgdsb2dkX3JiABIHbG9nZF9yYQA1Cm1jbGlfaW1tMTgADQdtY2xpX3JhADUKbWNwaV9pbW0xMgAJB21jcGlfcmIAEgdtY3BpX3JhADUHbWludF9yYgASB21pbnRfcmEANQdtbGR2X3JkADYHbWxkdl9yYwAaB21sZHZfcmIAEgdtbGR2X3JhADUHbWxvZ19yYwAaB21sb2dfcmIAEgdtbG9nX3JhADUKbW9kaV9pbW0xMgAJB21vZGlfcmIAEgdtb2RpX3JhADUHbW92ZV9yYgASB21vdmVfcmEANQptb3ZpX2ltbTE4AA0HbW92aV9yYQA1B21yb29fcmMAGgdtcm9vX3JiABIHbXJvb19yYQA1Cm11bGlfaW1tMTIACQdtdWxpX3JiABIHbXVsaV9yYQA1B3JldGRfcmIAEgdyZXRkX3JhADUHczI1Nl9yYwAaB3MyNTZfcmIAEgdzMjU2X3JhADUHc2N3cV9yYwAaB3Njd3FfcmIAEgdzY3dxX3JhADUKc2xsaV9pbW0xMgAJB3NsbGlfcmIAEgdzbGxpX3JhADUKc3JsaV9pbW0xMgAJB3NybGlfcmIAEgdzcmxpX3JhADUHc3J3cV9yZAA2B3Nyd3FfcmMAGgdzcndxX3JiABIHc3J3cV9yYQA1CnN1YmlfaW1tMTIACQdzdWJpX3JiABIHc3ViaV9yYQA1B3N3d3FfcmQANgdzd3dxX3JjABoHc3d3cV9yYgASB3N3d3FfcmEANQd0aW1lX3JiABIHdGltZV9yYQA1B3dkYW1fcmQANgd3ZGFtX3JjABoHd2RhbV9yYgASB3dkYW1fcmEANQd3ZGNtX3JjABoHd2RjbV9yYgASB3dkY21fcmEANQd3ZGR2X3JjABoHd2Rkdl9yYgASB3dkZHZfcmEANQd3ZG1kX3JkADYHd2RtZF9yYwAaB3dkbWRfcmIAEgd3ZG1kX3JhADUHd2RtbF9yYwAaB3dkbWxfcmIAEgd3ZG1sX3JhADUHd2RtbV9yZAA2B3dkbW1fcmMAGgd3ZG1tX3JiABIHd2RtbV9yYQA1B3dkb3BfcmMAGgd3ZG9wX3JiABIHd2RvcF9yYQA1B3dxYW1fcmQANgd3cWFtX3JjABoHd3FhbV9yYgASB3dxYW1fcmEANQd3cWNtX3JjABoHd3FjbV9yYgASB3dxY21fcmEANQd3cWR2X3JjABoHd3Fkdl9yYgASB3dxZHZfcmEANQd3cW1kX3JkADYHd3FtZF9yYwAaB3dxbWRfcmIAEgd3cW1kX3JhADUHd3FtbF9yYwAaB3dxbWxfcmIAEgd3cW1sX3JhADUHd3FtbV9yZAA2B3dxbW1fcmMAGgd3cW1tX3JiABIHd3FtbV9yYQA1B3dxb3BfcmMAGgd3cW9wX3JiABIHd3FvcF9yYQA1CnhvcmlfaW1tMTIACQd4b3JpX3JiABIHeG9yaV9yYQA1E2puZWJfbmV3X3R5cGVzY3JpcHQAVRBfX3diZ19yZWdpZF9mcmVlACoOd3FtbF9mcm9tX2FyZ3MAPBBfX3diZ19pbW0yNF9mcmVlACwfX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcgDYARNfX3diaW5kZ2VuX2V4cG9ydF8wANQBCqt7/wHtIgIIfwF+AkACQAJAAkACQAJAAkACQCAAQfUBTwRAIABBzf97Tw0FIABBC2oiAEF4cSEFQeyOwAAoAgAiCEUNBEEAIAVrIQQCf0EAIAVBgAJJDQAaQR8gBUH///8HSw0AGiAFQQYgAEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QdCLwABqKAIAIgJFBEBBACEADAILQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAwNAAkAgAigCBEF4cSIGIAVJDQAgBiAFayIGIARPDQAgAiEBIAYiBA0AQQAhBCABIQAMBAsgAigCFCIGIAAgBiACIANBHXZBBHFqQRBqKAIAIgJHGyAAIAYbIQAgA0EBdCEDIAINAAsMAQtB6I7AACgCACICQRAgAEELakH4A3EgAEELSRsiBUEDdiIAdiIBQQNxBEACQCABQX9zQQFxIABqIgFBA3QiAEHgjMAAaiIDIABB6IzAAGooAgAiACgCCCIERwRAIAQgAzYCDCADIAQ2AggMAQtB6I7AACACQX4gAXdxNgIACyAAIAFBA3QiAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwICyAFQfCOwAAoAgBNDQMCQAJAIAFFBEBB7I7AACgCACIARQ0GIABoQQJ0QdCLwABqKAIAIgEoAgRBeHEgBWshBCABIQIDQAJAIAEoAhAiAA0AIAEoAhQiAA0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAigCFCIAG2ooAgAiAQ0BQQAhAAwCCyACKAIIIgEgADYCDCAAIAE2AggMAQsgAkEUaiACQRBqIAAbIQMDQCADIQYgASIAQRRqIABBEGogACgCFCIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRB0IvAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNB7I7AAEHsjsAAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASAEIAEgBEkiARshBCAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiA0EAIANrciABIAB0cWgiAEEDdCIBQeCMwABqIgMgAUHojMAAaigCACIBKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0HojsAAIAJBfiAAd3E2AgALIAEgBUEDcjYCBCABIAVqIgYgAEEDdCIAIAVrIgRBAXI2AgQgACABaiAENgIAQfCOwAAoAgAiAgRAIAJBeHFB4IzAAGohAEH4jsAAKAIAIQMCf0HojsAAKAIAIgVBASACQQN2dCICcUUEQEHojsAAIAIgBXI2AgAgAAwBCyAAKAIICyECIAAgAzYCCCACIAM2AgwgAyAANgIMIAMgAjYCCAtB+I7AACAGNgIAQfCOwAAgBDYCACABQQhqDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAAkAgBEEQTwRAIAIgBUEDcjYCBCACIAVqIgUgBEEBcjYCBCAEIAVqIAQ2AgBB8I7AACgCACIDRQ0BIANBeHFB4IzAAGohAEH4jsAAKAIAIQECf0HojsAAKAIAIgZBASADQQN2dCIDcUUEQEHojsAAIAMgBnI2AgAgAAwBCyAAKAIICyEDIAAgATYCCCADIAE2AgwgASAANgIMIAEgAzYCCAwBCyACIAQgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0H4jsAAIAU2AgBB8I7AACAENgIACyACQQhqDwsgACABckUEQEEAIQFBAiAHdCIAQQAgAGtyIAhxIgBFDQMgAGhBAnRB0IvAAGooAgAhAAsgAEUNAQsDQCAAIAEgACgCBEF4cSIDIAVrIgYgBEkiBxshCCAAKAIQIgJFBEAgACgCFCECCyABIAggAyAFSSIAGyEBIAQgBiAEIAcbIAAbIQQgAiIADQALCyABRQ0AIAVB8I7AACgCACIATSAEIAAgBWtPcQ0AIAEoAhghBwJAAkAgASABKAIMIgBGBEAgAUEUQRAgASgCFCIAG2ooAgAiAg0BQQAhAAwCCyABKAIIIgIgADYCDCAAIAI2AggMAQsgAUEUaiABQRBqIAAbIQMDQCADIQYgAiIAQRRqIABBEGogACgCFCICGyEDIABBFEEQIAIbaigCACICDQALIAZBADYCAAsgB0UNAyABIAEoAhxBAnRB0IvAAGoiAigCAEcEQCAHQRBBFCAHKAIQIAFGG2ogADYCACAARQ0EDAMLIAIgADYCACAADQJB7I7AAEHsjsAAKAIAQX4gASgCHHdxNgIADAMLAkACQAJAAkACQCAFQfCOwAAoAgAiAUsEQCAFQfSOwAAoAgAiAE8EQEEAIQQgBUGvgARqIgBBEHZAACIBQX9GIgMNByABQRB0IgJFDQdBgI/AAEEAIABBgIB8cSADGyIEQYCPwAAoAgBqIgA2AgBBhI/AAEGEj8AAKAIAIgEgACAAIAFJGzYCAAJAAkBB/I7AACgCACIDBEBB0IzAACEAA0AgACgCACIBIAAoAgQiBmogAkYNAiAAKAIIIgANAAsMAgtBjI/AACgCACIAQQAgACACTRtFBEBBjI/AACACNgIAC0GQj8AAQf8fNgIAQdSMwAAgBDYCAEHQjMAAIAI2AgBB7IzAAEHgjMAANgIAQfSMwABB6IzAADYCAEHojMAAQeCMwAA2AgBB/IzAAEHwjMAANgIAQfCMwABB6IzAADYCAEGEjcAAQfiMwAA2AgBB+IzAAEHwjMAANgIAQYyNwABBgI3AADYCAEGAjcAAQfiMwAA2AgBBlI3AAEGIjcAANgIAQYiNwABBgI3AADYCAEGcjcAAQZCNwAA2AgBBkI3AAEGIjcAANgIAQaSNwABBmI3AADYCAEGYjcAAQZCNwAA2AgBB3IzAAEEANgIAQayNwABBoI3AADYCAEGgjcAAQZiNwAA2AgBBqI3AAEGgjcAANgIAQbSNwABBqI3AADYCAEGwjcAAQaiNwAA2AgBBvI3AAEGwjcAANgIAQbiNwABBsI3AADYCAEHEjcAAQbiNwAA2AgBBwI3AAEG4jcAANgIAQcyNwABBwI3AADYCAEHIjcAAQcCNwAA2AgBB1I3AAEHIjcAANgIAQdCNwABByI3AADYCAEHcjcAAQdCNwAA2AgBB2I3AAEHQjcAANgIAQeSNwABB2I3AADYCAEHgjcAAQdiNwAA2AgBB7I3AAEHgjcAANgIAQfSNwABB6I3AADYCAEHojcAAQeCNwAA2AgBB/I3AAEHwjcAANgIAQfCNwABB6I3AADYCAEGEjsAAQfiNwAA2AgBB+I3AAEHwjcAANgIAQYyOwABBgI7AADYCAEGAjsAAQfiNwAA2AgBBlI7AAEGIjsAANgIAQYiOwABBgI7AADYCAEGcjsAAQZCOwAA2AgBBkI7AAEGIjsAANgIAQaSOwABBmI7AADYCAEGYjsAAQZCOwAA2AgBBrI7AAEGgjsAANgIAQaCOwABBmI7AADYCAEG0jsAAQaiOwAA2AgBBqI7AAEGgjsAANgIAQbyOwABBsI7AADYCAEGwjsAAQaiOwAA2AgBBxI7AAEG4jsAANgIAQbiOwABBsI7AADYCAEHMjsAAQcCOwAA2AgBBwI7AAEG4jsAANgIAQdSOwABByI7AADYCAEHIjsAAQcCOwAA2AgBB3I7AAEHQjsAANgIAQdCOwABByI7AADYCAEHkjsAAQdiOwAA2AgBB2I7AAEHQjsAANgIAQfyOwAAgAjYCAEHgjsAAQdiOwAA2AgBB9I7AACAEQShrIgA2AgAgAiAAQQFyNgIEIAAgAmpBKDYCBEGIj8AAQYCAgAE2AgAMCAsgAiADTSABIANLcg0AIAAoAgxFDQMLQYyPwABBjI/AACgCACIAIAIgACACSRs2AgAgAiAEaiEBQdCMwAAhAAJAAkADQCABIAAoAgBHBEAgACgCCCIADQEMAgsLIAAoAgxFDQELQdCMwAAhAANAAkAgAyAAKAIAIgFPBEAgASAAKAIEaiIGIANLDQELIAAoAgghAAwBCwtB/I7AACACNgIAQfSOwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBiI/AAEGAgIABNgIAIAMgBkEga0F4cUEIayIAIAAgA0EQakkbIgFBGzYCBEHQjMAAKQIAIQkgAUEQakHYjMAAKQIANwIAIAEgCTcCCEHUjMAAIAQ2AgBB0IzAACACNgIAQdiMwAAgAUEIajYCAEHcjMAAQQA2AgAgAUEcaiEAA0AgAEEHNgIAIABBBGoiACAGSQ0ACyABIANGDQcgASABKAIEQX5xNgIEIAMgASADayIAQQFyNgIEIAEgADYCACAAQYACTwRAIAMgABAFDAgLIABBeHFB4IzAAGohAQJ/QeiOwAAoAgAiAkEBIABBA3Z0IgBxRQRAQeiOwAAgACACcjYCACABDAELIAEoAggLIQAgASADNgIIIAAgAzYCDCADIAE2AgwgAyAANgIIDAcLIAAgAjYCACAAIAAoAgQgBGo2AgQgAiAFQQNyNgIEIAEgAiAFaiIDayEFIAFB/I7AACgCAEYNAyABQfiOwAAoAgBGDQQgASgCBCIEQQNxQQFGBEAgASAEQXhxIgAQBCAAIAVqIQUgACABaiIBKAIEIQQLIAEgBEF+cTYCBCADIAVBAXI2AgQgAyAFaiAFNgIAIAVBgAJPBEAgAyAFEAUMBgsgBUF4cUHgjMAAaiEAAn9B6I7AACgCACIBQQEgBUEDdnQiBHFFBEBB6I7AACABIARyNgIAIAAMAQsgACgCCAshBSAAIAM2AgggBSADNgIMIAMgADYCDCADIAU2AggMBQtB9I7AACAAIAVrIgE2AgBB/I7AAEH8jsAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGohBAwGC0H4jsAAKAIAIQACQCABIAVrIgJBD00EQEH4jsAAQQA2AgBB8I7AAEEANgIAIAAgAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwBC0HwjsAAIAI2AgBB+I7AACAAIAVqIgM2AgAgAyACQQFyNgIEIAAgAWogAjYCACAAIAVBA3I2AgQLDAgLIAAgBCAGajYCBEH8jsAAQfyOwAAoAgAiAEEPakF4cSIBQQhrIgI2AgBB9I7AAEH0jsAAKAIAIARqIgMgACABa2pBCGoiATYCACACIAFBAXI2AgQgACADakEoNgIEQYiPwABBgICAATYCAAwDC0H8jsAAIAM2AgBB9I7AAEH0jsAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEDAELQfiOwAAgAzYCAEHwjsAAQfCOwAAoAgAgBWoiADYCACADIABBAXI2AgQgACADaiAANgIACyACQQhqDwtBACEEQfSOwAAoAgAiACAFTQ0AQfSOwAAgACAFayIBNgIAQfyOwABB/I7AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBAwDCyAEDwsgACAHNgIYIAEoAhAiAgRAIAAgAjYCECACIAA2AhgLIAEoAhQiAkUNACAAIAI2AhQgAiAANgIYCwJAIARBEE8EQCABIAVBA3I2AgQgASAFaiICIARBAXI2AgQgAiAEaiAENgIAIARBgAJPBEAgAiAEEAUMAgsgBEF4cUHgjMAAaiEAAn9B6I7AACgCACIDQQEgBEEDdnQiBHFFBEBB6I7AACADIARyNgIAIAAMAQsgACgCCAshBCAAIAI2AgggBCACNgIMIAIgADYCDCACIAQ2AggMAQsgASAEIAVqIgBBA3I2AgQgACABaiIAIAAoAgRBAXI2AgQLIAFBCGoPCyAAQQhqC4MFAQF/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEGABGsOJgECAwQFBgcILQkKCwwNLS0tLS0tLS0tLS0tLS0tLS0tDg8tLS0QAAtBASEBAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQQFrDg5CAQIDBAUGQwcICQoLDAALAkAgAEHABGsODCcoKSorLC0uLzAxMgALAkAgAEGBAmsOCg0ODxAREhMUFRYACwJAIABBgAZrDgkzNDU2N0NDODkACwJAIABBgAprDgY8PT4/QEEACyAAQYAIaw4COTpCC0ECDwtBAw8LQQQPC0EFDwtBBg8LQQcPC0EJDwtBCg8LQQsPC0EMDwtBDQ8LQQ4PC0GBAg8LQYICDwtBgwIPC0GEAg8LQYUCDwtBhgIPC0GHAg8LQYgCDwtBiQIPC0GKAg8LQYAEDwtBgQQPC0GCBA8LQYMEDwtBhAQPC0GFBA8LQYYEDwtBhwQPC0GJBA8LQYoEDwtBiwQPC0GMBA8LQY0EDwtBoAQPC0GhBA8LQaUEDwtBwAQPC0HBBA8LQcIEDwtBwwQPC0HEBA8LQcUEDwtBxgQPC0HHBA8LQcgEDwtByQQPC0HKBA8LQcsEDwtBgAYPC0GBBg8LQYIGDwtBgwYPC0GEBg8LQYcGDwtBiAYPC0GACA8LQYEIDwtBgAoPC0GBCg8LQYIKDwtBgwoPC0GECg8LQYUKIQELIAEPC0HggsAAQRkQ2gEAC/gDAQJ/IAAgAWohAgJAAkAgACgCBCIDQQFxDQAgA0ECcUUNASAAKAIAIgMgAWohASAAIANrIgBB+I7AACgCAEYEQCACKAIEQQNxQQNHDQFB8I7AACABNgIAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgAiABNgIADAILIAAgAxAECwJAAkACQCACKAIEIgNBAnFFBEAgAkH8jsAAKAIARg0CIAJB+I7AACgCAEYNAyACIANBeHEiAhAEIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQfiOwAAoAgBHDQFB8I7AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAUPCyABQXhxQeCMwABqIQICf0HojsAAKAIAIgNBASABQQN2dCIBcUUEQEHojsAAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfyOwAAgADYCAEH0jsAAQfSOwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEH4jsAAKAIARw0BQfCOwABBADYCAEH4jsAAQQA2AgAPC0H4jsAAIAA2AgBB8I7AAEHwjsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsL8QIBBH8gACgCDCECAkACQCABQYACTwRAIAAoAhghAwJAAkAgACACRgRAIABBFEEQIAAoAhQiAhtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIABBFGogAEEQaiACGyEEA0AgBCEFIAEiAkEUaiACQRBqIAIoAhQiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdCLwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQeyOwABB7I7AACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB6I7AAEHojsAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIAAoAhQiAEUNACACIAA2AhQgACACNgIYCwu6AgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdCLwABqIQRBASACdCIDQeyOwAAoAgBxRQRAIAQgADYCACAAIAQ2AhggACAANgIMIAAgADYCCEHsjsAAQeyOwAAoAgAgA3I2AgAPCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEFA0AgAyAFQR12QQRxakEQaiIEKAIAIgJFDQIgBUEBdCEFIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAEIAA2AgAgACADNgIYIAAgADYCDCAAIAA2AggLlAEBBH8gARDSASABQQhrIgMgAygCAEEBaiICNgIAAkACQCACBEAgASgCACICQX9GDQEgASACQQFqNgIAIAEoAgQoAAAiBMBBAnRBuIPAAGooAgAhBUEBQQQQ1QEiAg0CCwALENkBAAsgAiAFIARBgH5xcjYAACABIAEoAgBBAWs2AgAgAxBWIABBBDYCBCAAIAI2AgALiwEBAn8gABDSASAAQQhrIgIoAgAhAwJAAkAgAUUEQCADQQFGBEAgAkEANgIAIAJBf0YNAyAAQQRrIgAgACgCAEEBayIANgIAIABFDQIMAwtB+YLAAEE/ENoBAAsgAiADQQFrIgE2AgAgAQ0BIABBBGsiACAAKAIAQQFrIgA2AgAgAA0BCyACQRAQGQsLdQIBfwF+IAEQ0gEgAUEIayICKAIAQQFGBEAgATUCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQgGDPAAAIAAgA6dBCHZBAXE6AAEPC0H5gsAAQT8Q2gEAC3cBAn8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCIALwAAIABBAmotAABBEHRyEN4BIQIgASgCCCABKAIMEM0BQRBBBBDIASIAIAJBCHZBgB5xIAJBGHZyOwEMIABBADYCCCAAQoGAgIAQNwIAIAFBEGokACAAQQhqC2wBAn8gABDSASAAQQhrIgEgASgCAEEBaiICNgIAAkAgAgRAIAAoAgBBf0YNASAALwAEIABBBmotAABBEHRyEN4BIQAgARBeIABBCHZBgP4DcSAAQRh2ciAAQYD+A3FBCHRyEGcPCwALENkBAAtvAQJ/IAEQ0gEgAUEIayICKAIAQQFGBEAgASgCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQQh2OgABIAAgA0EBcToAAA8LQfmCwABBPxDaAQALawEBfyAAENIBIABBCGshAgJAIAFFBEAgAigCAEEBRw0BIAAoAgQgAkEANgIAAkAgAkF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAJBEBAZCxDdAQ8LIAIQVg8LQfmCwABBPxDaAQALYQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3gEhACABKAIIIAEoAgwQzQEgAEEIdkGA/gNxIABBGHZyIABBgAZxQQh0chBnIAFBEGokAAtqAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQQI2AhQgAUH0gMAANgIQIAFCATcCHCABQQE2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQVwALIAFBMGokACAAC2sBAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQQI2AhQgAUG4gcAANgIQIAFCATcCHCABQQI2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQVwALIAFBMGokACAAC2MBAn8jAEEQayICJAACQCABRQRAIAJBCGogABALDAELIAAQ0gEgAEEIayIBIAEoAgBBAWsiAzYCACADDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLIAJBEGokAAtjAQJ/IwBBEGsiAiQAAkAgAUUEQCACQQhqIAAQCAwBCyAAENIBIABBCGsiASABKAIAQQFrIgM2AgAgAw0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCyACQRBqJAALXgEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3gEhACABKAIIIAEoAgwQzQEgAEEIdkGA4ANxIABBgAZxQQh0ckEMdhBoIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ+AELFgAgAEHQgsAAQcCCwABBgICACBD4AQtgAQF/IAAQGyECIAEQHiEAQRBBBBDIASIBQoGAgIAQNwIAIAEgAEEQdEGAgPwHcSAAIAJB/wFxQRJ0ciIAQYD+A3FBCHQgAEEIdkGA/gNxckEIdnKtQiCGNwIIIAFBCGoLXAECfyAAENIBIABBCGsiASgCAEEBRgRAIAAtAAQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZC0EBcQ8LQfmCwABBPxDaAQALYAEBfyAAENIBIABBCGshAgJAIAFFBEAgAigCAEEBRgRAIAJBADYCACACQX9GDQIgAEEEayIAIAAoAgBBAWsiADYCACAADQIgAkEUEBkPC0H5gsAAQT8Q2gEACyACEF8LC2ABAX8gABDSASAAQQhrIQICQCABRQRAIAIoAgBBAUYEQCACQQA2AgAgAkF/Rg0CIABBBGsiACAAKAIAQQFrIgA2AgAgAA0CIAJBEBAZDwtB+YLAAEE/ENoBAAsgAhBeCwvQBgEEfwJAIABBBGsoAgAiBCICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgAEEIayIBIAQiA0F4cSIAaiECAkACQCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFB+I7AACgCAEYEQCACKAIEQQNxQQNHDQFB8I7AACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADAILIAEgAxAECwJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfyOwAAoAgBGDQIgAkH4jsAAKAIARg0EIAIgA0F4cSICEAQgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB+I7AACgCAEcNAUHwjsAAIAA2AgAMBQsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQEgASAAEAVBACEBQZCPwABBkI/AACgCAEEBayIANgIAIAANA0HYjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQZCPwABB/x8gASABQf8fTRs2AgAMAwtB/I7AACABNgIAQfSOwABB9I7AACgCACAAaiIANgIAIAEgAEEBcjYCBEH4jsAAKAIAIAFGBEBB8I7AAEEANgIAQfiOwABBADYCAAsgAEGIj8AAKAIAIgNNDQJB/I7AACgCACICRQ0CQQAhAQJAQfSOwAAoAgAiBEEpSQ0AQdCMwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0HYjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQZCPwABB/x8gASABQf8fTRs2AgAgAyAETw0CQYiPwABBfzYCAAwCCyAAQXhxQeCMwABqIQICf0HojsAAKAIAIgNBASAAQQN2dCIAcUUEQEHojsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCAwBC0H4jsAAIAE2AgBB8I7AAEHwjsAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAsPC0GxicAAQS5B4InAABBKAAtB8InAAEEuQaCKwAAQSgALVQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3gEhACABKAIIIAEoAgwQzQEgAEEOdkE8cSAAQR52chBoIAFBEGokAAtZAQJ/IAAQ0gEgAEEIayIBKAIAQQFGBEAgAC0ABCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENoBAAtZAQJ/IAEQ0gEgAUEIayIDIAMoAgBBAWoiAjYCAAJAIAIEQCABKAIAIgJBf0YNASAAIAM2AgggACABNgIEIAAgAUEEajYCACABIAJBAWo2AgAPCwALENkBAAtZAQJ/IAAQ0gEgAEEIayIBKAIAQQFGBEAgAC8BBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENoBAAtZAQJ/IAAQ0gEgAEEIayIBKAIAQQFGBEAgACgCBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENoBAAtRAQJ/AkAgABAbIgBBGHENACAAQQdxIgJBB0YNAEEQQQQQyAEiAUKBgICAEDcCACABIABBBXZBAXGtQiCGIAKtQiiGhDcCCCABQQhqIQELIAELVwEBfyAAEBshAiABEBshAUEQQQQQyAEiAEKBgICAEDcCACAAIAFB/wFxQQx0IAJBEnRyIgFBgOADcUEIdCABQQh2QYD+A3FyQQh2rUIghjcCCCAAQQhqC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILTwECfyAAENIBIABBCGsiASABKAIAQQFqIgI2AgACQCACBEAgACgCAEF/Rg0BIAAvAAQgAEEGai0AAEEQdHIQ1gEgARBeEGgPCwALENkBAAtOAQF/IAFFBEAgABAWGg8LIAAQ0gEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLEAAgACABIAIgA0HeABD5AQsQACAAIAEgAiADQd8AEPkBCxAAIAAgASACIANB4AAQ+QELEAAgACABIAIgA0HhABD5AQsQACAAIAEgAiADQeIAEPoBCxAAIAAgASACIANB4wAQ+gELTgEBfyABRQRAIAAQGxoPCyAAENIBIABBCGsiASABKAIAQQFrIgI2AgACQCACDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLC04BAX8gAUUEQCAAEB0aDwsgABDSASAAQQhrIgEgASgCAEEBayICNgIAAkAgAg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCwtOAQF/IAFFBEAgABAeGg8LIAAQ0gEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLDwAgACABQYCAgMgBEPsBCwwAIAAgAUHLABD8AQsMACAAIAFBzAAQ/AELDAAgACABQc0AEPwBCwwAIAAgAUHOABD8AQsMACAAIAFBzwAQ/AELDAAgACABQdAAEPwBCw8AIAAgAUGAgIDoBhD7AQtFAQF/IwBBEGsiASQAIAFBBGogABAcIAEoAgQiAC8AACAAQQJqLQAAQRB0chDWASABKAIIIAEoAgwQzQEQaCABQRBqJAALSwEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3gFBGHZBP3EgASgCCCABKAIMEM0BEGggAUEQaiQAC04BAX8gABAeIQBBEEEEEMgBIgFCgYCAgBA3AgAgASAAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2cq1CIIY3AgggAUEIagsLACAAIAFBBxD9AQsLACAAIAFBCBD9AQs/ACACQRZ0QYCAgAZxIAFB/wFxQQx0IgEgAkH8AXFBBnRyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCyAELQAIIAQtAAkQygEQYiAEQRBqJAALOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCCAELQAIIAQtAAkQiwEQYiAEQRBqJAALCwAgACABQQoQ/gELCwAgACABQQwQ/gELCwAgACABQRQQ/gELCwAgACABQRYQ/gELCwAgACABQRsQ/gELCwAgACABQR4Q/gELCwAgACABQR8Q/gELCwAgACABQSQQ/gELCwAgACABQTIQ/gELPgAgABAbIQAgARAeIgFBEHRBgID8B3EgAEH/AXFBEnQgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyEGILOAAgAkEQdEGAgPwHcSABQf8BcUEMdCIBIAJyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILPAECfyMAQRBrIgEkACAAENIBIAFBCGogABBdIAEoAggtAAEgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzwBAn8jAEEQayIBJAAgABDSASABQQhqIAAQXSABKAIILQAAIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAtBAQF/IwBBIGsiAyQAIANBADYCECADQQE2AgQgA0IENwIIIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhBXAAs5AQF/IwBBEGsiAiQAIAAQ0gEgAkEIaiAAEGEgAigCDCACKAIIIAFBAEc6AABBADYCACACQRBqJAALOQEBfyMAQRBrIgIkACAAENIBIAJBCGogABBhIAIoAgwgAigCCCABQQBHOgABQQA2AgAgAkEQaiQAC0MBAX8gAEE9TwRAQeCCwABBGRDaAQALQRRBBBDIASICIAA6ABAgAiABNgIMIAJBADYCCCACQoGAgIAQNwIAIAJBCGoLCgAgAEHVABD/AQsKACAAQdYAEP8BCwoAIABB1wAQ/wELCgAgAEHaABD/AQsKACAAQdsAEP8BCwoAIABB3AAQ/wELCgAgAEHdABD/AQs+ACAAEBsgARAbIAIQGyADEBsQISEBQRBBBBDIASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags7AQF/IAAgACgCAEEBayIBNgIAAkAgAQ0AIAAoAgwQ3QEgACAAKAIEQQFrIgE2AgQgAQ0AIABBEBAZCwvIAQEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQbCHwAA2AhAgAkEBNgIMIAJBDGoiACgCCCIBRQRAQYSHwABBK0HMisAAEEoACyABKAIMGiABKAIEGiAALQAQIQEgAC0AERpBzIvAAEHMi8AAKAIAIgBBAWo2AgACQCAAQQBIDQBBmI/AAC0AAEEBcQ0AQZSPwABBlI/AACgCAEEBajYCAEHIi8AAKAIAQQBIDQBBmI/AAEEAOgAAIAFFDQAACwALLwEBfyMAQRBrIgEkACABQQhqIAAQCyABLQAJQSBBACABLQAIG3IQaCABQRBqJAALOgAgABAbIAEQGyACEBsQOiEBQRBBBBDIASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags6ACAAEBsgARAbIAIQHRBHIQFBEEEEEMgBIgBCgYCAgBA3AgAgACABrUL///8Hg0IghjcCCCAAQQhqCzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBC0ABCABKAIIIAEoAgwQzgEgAUEQaiQACzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCgCACABKAIIIAEoAgwQzgEgAUEQaiQACzEBAX8gASgCACICQX9HBEAgASACQQFqNgIAIAAgATYCBCAAIAFBBGo2AgAPCxDZAQALCQAgAEEQEPIBCwkAIABBFBDyAQszAQF/IAAQGyEBQRBBBBDIASIAQoGAgIAQNwIAIAAgAUECdEH8AXGtQiCGNwIIIABBCGoLKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LENkBAAssAQF/QRBBBBDIASIBQoGAgIAQNwIAIAEgAK1C////B4NCIIY3AgggAUEIagskACAAENIBIAAoAgAEQBDZAQALIABBADYCACAAIAFBAEc6AAQLKAAgAxAWIQMgABDJASABEMkBIAIQyQEgAxDQAUEIdEHkAHIQ0wEQZwsoACADEBYhAyAAEMkBIAEQyQEgAhDJASADENABQQh0QeUAchDTARBnCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ2gEACykBAX9BEEEEEMgBIgEgADYCDCABQQA2AgggAUKBgICAEDcCACABQQhqCykBAX9BEEEEEMgBIgEgADoADCABQQA2AgggAUKBgICAEDcCACABQQhqCyIAIAIQAiECIAAQyQEgARDJASACEEdBCHRBygByENMBEGcLDwAgACABIAIgA0ESEPMBCw8AIAAgASACIANBGBDzAQsPACAAIAEgAiADQRwQ8wELDwAgACABIAIgA0EdEPMBCw8AIAAgASACIANBIRD0AQsPACAAIAEgAiADQSIQ8wELDwAgACABIAIgA0EjEPMBCw8AIAAgASACIANBKBDzAQsPACAAIAEgAiADQSoQ8wELDwAgACABIAIgA0EsEPMBCw8AIAAgASACIANBLxDzAQsPACAAIAEgAiADQTgQ8wELEAAgACABIAIgA0HTABD0AQsQACAAIAEgAiADQdQAEPQBCxAAIAAgASACIANB3gAQ9AELEAAgACABIAIgA0HfABD0AQsQACAAIAEgAiADQeAAEPQBCxAAIAAgASACIANB4QAQ9AELEAAgACABIAIgA0HiABD0AQsQACAAIAEgAiADQeMAEPQBCxAAIAAgASACIANB5AAQ9AELEAAgACABIAIgA0HlABD0AQsQACAAIAEgAiADQeYAEPMBCxAAIAAgASACIANB5wAQ8wELEAAgACABIAIgA0HoABDzAQsQACAAIAEgAiADQekAEPMBCxAAIAAgASACIANB6gAQ8wELEAAgACABIAIgA0HrABDzAQsQACAAIAEgAiADQewAEPMBCxAAIAAgASACIANB7gAQ8wELEAAgACABIAIgA0HvABDzAQsQACAAIAEgAiADQfAAEPMBCx4AIAEQZiEBIAAQyQEgARDGAUEIdEHMAHIQ0wEQZwsZACAAIAEgAkEgQQAgBBtBEEEAIAMbchAhCw0AIAAgASACQQEQ9QELDQAgACABIAJBAhD1AQsNACAAIAEgAkEDEPUBCw0AIAAgASACQQQQ9QELDQAgACABIAJBBRD1AQsNACAAIAEgAkEGEPUBCw0AIAAgASACQQcQ9QELDQAgACABIAJBCBD1AQsNACAAIAEgAkEJEPUBCw0AIAAgASACQQsQ9QELDQAgACABIAJBDRD1AQsNACAAIAEgAkEOEPUBCw0AIAAgASACQQ8Q9QELDQAgACABIAJBEBD1AQsNACAAIAEgAkEREPUBCw0AIAAgASACQRcQ9QELDQAgACABIAJBJhD1AQsNACAAIAEgAkEnEPUBCw0AIAAgASACQSkQ9QELDQAgACABIAJBKxD1AQsNACAAIAEgAkEtEPUBCw0AIAAgASACQS4Q9QELDQAgACABIAJBMBD1AQsNACAAIAEgAkExEPUBCw0AIAAgASACQTUQ9QELDQAgACABIAJBNxD1AQsNACAAIAEgAkE5EPYBCw0AIAAgASACQToQ9gELDQAgACABIAJBOxD2AQsNACAAIAEgAkE8EPYBCw0AIAAgASACQT0Q9gELDQAgACABIAJBPhD2AQsNACAAIAEgAkE/EPYBCw4AIAAgASACQcAAEPYBCw4AIAAgASACQcEAEPYBCw4AIAAgASACQcIAEPYBCw4AIAAgASACQcMAEPYBCw4AIAAgASACQcQAEPYBCw4AIAAgASACQcUAEPYBCw4AIAAgASACQcYAEPYBCw4AIAAgASACQccAEPYBCw4AIAAgASACQcgAEPYBCw4AIAAgASACQckAEPYBCw4AIAAgASACQcoAEPYBCw4AIAAgASACQdEAEPYBCw4AIAAgASACQdIAEPYBCxcBAX8gAEH/AXFBP00EfyAAEGgFQQALCxsAIAAQ0gEgACgCAEF/RgRAENkBAAsgAC0ABAsJACAAQRMQ9wELCQAgAEEVEPcBCwkAIABBGhD3AQsJACAAQSAQ9wELCQAgAEElEPcBCyIBAX9BEEEEEMgBIgBCADcCCCAAQoGAgIAQNwIAIABBCGoLCQAgAEE0EPcBCwkAIABBNhD3AQsKACAAQdgAEPcBCwoAIABB2QAQ9wELFwAgAUEQdEGAgPwDcSAAQQJ0QfwBcXILGwAgABDJASABEMkBIAIQyQEQOkEIdBDTARBnCxIAIAEgABDVASIABEAgAA8LAAt1AQF/IABB/wFxQcAATwRAIwBBEGsiASQAIAFBIjYCDCABQYCAwAA2AggjAEEgayIAJAAgAEEBNgIEIABB/IbAADYCACAAQgE3AgwgACABQQhqrUKAgICAwACENwMYIAAgAEEYajYCCCAAQbiAwAAQVwALIAALFAAgACABIAJBIEEAIAMbIARyECELFwAgABAbIAEQGyACEBsgAxAWENABEGILFgAgABAbIAEQGyACEBsgAxAbECEQYgsTACAAIAAoAgBBAWs2AgAgARBeCxMAIAAgACgCAEEBazYCACABEF8LEgAgABAbIAEQGyACEAIQRxBiCxEAIAAgASACQSBBACADGxAhCxIAIAAQGyABEBsgAhAdEEcQYgsTACAABEAPC0HcisAAQRsQ2gEACxQBAX9BBEEBEMgBIgEgADYAACABCw0AIAEEQCAAIAEQGQsLgQMBBX9BmY/AAC0AABoCfyAAQQlPBEACQEHN/3tBECAAIABBEE0bIgBrIAFNDQAgAEEQIAFBC2pBeHEgAUELSRsiBGpBDGoQASICRQ0AIAJBCGshAQJAIABBAWsiAyACcUUEQCABIQAMAQsgAkEEayIFKAIAIgZBeHEgAiADakEAIABrcUEIayICIABBACACIAFrQRBNG2oiACABayICayEDIAZBA3EEQCAAIAMgACgCBEEBcXJBAnI2AgQgACADaiIDIAMoAgRBAXI2AgQgBSACIAUoAgBBAXFyQQJyNgIAIAEgAmoiAyADKAIEQQFyNgIEIAEgAhADDAELIAEoAgAhASAAIAM2AgQgACABIAJqNgIACwJAIAAoAgQiAUEDcUUNACABQXhxIgIgBEEQak0NACAAIAQgAUEBcXJBAnI2AgQgACAEaiIBIAIgBGsiBEEDcjYCBCAAIAJqIgIgAigCBEEBcjYCBCABIAQQAwsgAEEIaiEDCyADDAELIAEQAQsLDQAgABDeAUEKdkE/cQsPACAAEBsgARBmEMYBEGILCwAgACMAaiQAIwALDgBB94rAAEHPABDaAQALCQAgACABEAAACwkAIABBP3EQaAsKACAAEBtB/wFxCwgAIABBBBAZCwcAIABBCHQLCQBBMxDTARBnCwYAQQsQaAsGAEEKEGgLBgBBCBBoCwYAQQ8QaAsGAEEGEGgLBgBBCRBoCwYAQQcQaAsGAEEMEGgLBgBBAhBoCwYAQQEQaAsGAEEDEGgLBgBBDRBoCwYAQQ4QaAsGAEEFEGgLBgBBBBBoCwYAQRAQaAsGAEEAEGgLBABBBAszAQF/IAAgACgCAEEBayICNgIAAkAgAg0AIAAgACgCBEEBayICNgIEIAINACAAIAEQGQsLIwAgABDJASABEMkBIAIQyQEgAxDJARAhQQh0IARyENMBEGcLIgAgABDJASABEMkBIAIQyQEgAxAOECFBCHQgBHIQ0wEQZwseACAAEMkBIAEQyQEgAhDJARA6QQh0IANyENMBEGcLHQAgABDJASABEMkBIAIQDxBHQQh0IANyENMBEGcLGgAgABDJARogAEEKdEGA+ANxIAFyENMBEGcLXwEBfyMAQTBrIgQkACAEIAA2AgwgACADTwRAIARBAjYCFCAEIAI2AhAgBEIBNwIcIARBAzYCLCAEIARBKGo2AhggBCAEQQxqNgIoIARBEGogARBXAAsgBEEwaiQAIAALTAECfyMAQRBrIgUkACAFQQhqIAMQCyAFLQAJIQMgBS0ACCEGIAAQyQEgARDJASACEMkBIAYgAxDKAUEIdCAEchDTARBnIAVBEGokAAtMAQJ/IwBBEGsiBSQAIAVBCGogAxAIIAUtAAkhAyAFLQAIIQYgABDJASABEMkBIAIQyQEgBiADEIsBQQh0IARyENMBEGcgBUEQaiQAC0kAIAAQyQEaIAEQyQEaIABBEnRBgIDwF3EiACABQQx0QYDgP3FyIgFBgOADcUEIdCABQQh2QYD+A3EgACACckEYdnJyENMBEGcLSQAgABDJARogARATIgFBEHRBgID8B3EgAEESdEGAgPAfcSABciIAQYD+A3FBCHQgAEEIdkGA/gNxckEIdnJBCHQgAnIQ0wEQZwtJAQF/IwBBEGsiAyQAIAAQ0gEgASACTwRAQeCCwABBGRDaAQALIANBCGogABBhIAMoAgwgAygCCCABOgABQQA2AgAgA0EQaiQAC0EAIAAQyQEaIAEQyQEaIABBEnRBgIDwB3EgAUEMdEGA4D9xciIAQQh2QYD+A3EgAEGA4ANxQQh0ciACchDTARBnCzUAIAAQFCIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDTARBnCwvQCwEAQYCAwAALxgtDaGVja1JlZ0lkIHdhcyBnaXZlbiBpbnZhbGlkIFJlZ0lkZnVlbC1hc20vc3JjL2xpYi5ycwAAACIAEAATAAAAbgAAACIAAABWYWx1ZSBgYCBvdXQgb2YgcmFuZ2UgZm9yIDYtYml0IGltbWVkaWF0ZQAAAEgAEAAHAAAATwAQACIAAAAiABAAEwAAALMDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDEyLWJpdCBpbW1lZGlhdGUASAAQAAcAAACUABAAIwAAACIAEAATAAAAuAMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMTgtYml0IGltbWVkaWF0ZQBIABAABwAAANgAEAAjAAAAIgAQABMAAAC9AwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAyNC1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAHAEQACMAAAAiABAAEwAAAMIDAAAcAAAAaW52YWxpZCBlbnVtIHZhbHVlIHBhc3NlZGF0dGVtcHRlZCB0byB0YWtlIG93bmVyc2hpcCBvZiBSdXN0IHZhbHVlIHdoaWxlIGl0IHdhcyBib3Jyb3dlZBAAAAARAAAAEgAAABMAAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAB8AAAAgAAAAIQAAACIAAAAkAAAAJQAAACYAAAAnAAAAKAAAACkAAAAqAAAAKwAAACwAAAAtAAAALgAAAC8AAAAwAAAAMQAAADIAAAAzAAAANAAAADUAAAA2AAAANwAAADgAAAA5AAAAOgAAADsAAAA8AAAAPQAAAD4AAAA/AAAAQAAAAEEAAABCAAAAQwAAAEcAAABIAAAASQAAAEoAAABLAAAATAAAAFAAAABRAAAAUgAAAFMAAABUAAAAVQAAAFYAAABXAAAAWAAAAFkAAABaAAAAWwAAAFwAAABdAAAAXgAAAF8AAABgAAAAYQAAAHAAAABxAAAAcgAAAHMAAAB0AAAAdQAAAHYAAAB3AAAAeAAAAHkAAACQAAAAkQAAAJIAAACTAAAAlAAAAJUAAACWAAAAlwAAAJgAAACgAAAAoQAAAKIAAACjAAAApAAAAKUAAACmAAAApwAAAKgAAACpAAAAqgAAAKsAAACsAAAArQAAALAAAAC6AAAAuwAAALwAAAC+AAAAAQAAAAAAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAAUAAAAAAAAAAQAAAAYAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OS9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACIBBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAiAQQACkAAACuBAAADQAAAGxpYnJhcnkvc3RkL3NyYy9wYW5pY2tpbmcucnMwBRAAHAAAAIsCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMy4zDHdhc20tYmluZGdlbgYwLjIuOTk=", r);
}
async function Co() {
  return await Qf(vv());
}
Co();
const Of = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: EE,
  ADDI: CE,
  ALOC: vE,
  AND: BE,
  ANDI: xE,
  BAL: RE,
  BHEI: SE,
  BHSH: TE,
  BLDD: NE,
  BSIZ: DE,
  BURN: FE,
  CALL: QE,
  CB: OE,
  CCP: ME,
  CFE: PE,
  CFEI: LE,
  CFS: kE,
  CFSI: UE,
  CROO: zE,
  CSIZ: GE,
  CompareArgs: en,
  CompareMode: mE,
  DIV: VE,
  DIVI: YE,
  DivArgs: aa,
  ECAL: WE,
  ECK1: XE,
  ECOP: ZE,
  ECR1: jE,
  ED19: JE,
  EPAR: qE,
  EQ: $E,
  EXP: KE,
  EXPI: tC,
  FLAG: eC,
  GM: Za,
  GMArgs: yE,
  GT: rC,
  GTF: ja,
  GTFArgs: Nf,
  Imm06: Mt,
  Imm12: lt,
  Imm18: Me,
  Imm24: Re,
  Instruction: Y,
  JI: nC,
  JMP: sC,
  JMPB: iC,
  JMPF: aC,
  JNE: oC,
  JNEB: cC,
  JNEF: dC,
  JNEI: uC,
  JNZB: hC,
  JNZF: lC,
  JNZI: _C,
  K256: pC,
  LB: fC,
  LDC: AC,
  LOG: gC,
  LOGD: wC,
  LT: mC,
  LW: yC,
  MCL: bC,
  MCLI: IC,
  MCP: EC,
  MCPI: CC,
  MEQ: vC,
  MINT: BC,
  MLDV: xC,
  MLOG: RC,
  MOD: SC,
  MODI: TC,
  MOVE: NC,
  MOVI: DC,
  MROO: FC,
  MUL: QC,
  MULI: OC,
  MathArgs: oa,
  MathOp: bE,
  MulArgs: ca,
  NOOP: LC,
  NOT: kC,
  OR: UC,
  ORI: zC,
  POPH: GC,
  POPL: VC,
  PSHH: YC,
  PSHL: HC,
  PanicInstruction: WC,
  PanicReason: IE,
  RET: XC,
  RETD: ZC,
  RVRT: jC,
  RegId: l,
  S256: JC,
  SB: qC,
  SCWQ: $C,
  SLL: KC,
  SLLI: tv,
  SMO: ev,
  SRL: rv,
  SRLI: nv,
  SRW: sv,
  SRWQ: iv,
  SUB: av,
  SUBI: ov,
  SW: cv,
  SWW: dv,
  SWWQ: uv,
  TIME: hv,
  TR: lv,
  TRO: _v,
  WDAM: pv,
  WDCM: Ja,
  WDDV: qa,
  WDMD: fv,
  WDML: $a,
  WDMM: Av,
  WDOP: Ka,
  WQAM: gv,
  WQCM: to,
  WQDV: eo,
  WQMD: wv,
  WQML: ro,
  WQMM: mv,
  WQOP: no,
  XOR: yv,
  XORI: bv,
  add: Rb,
  addi: wr,
  aloc: Wb,
  and: Sb,
  andi: CI,
  bal: bI,
  bhei: qb,
  bhsh: Jb,
  bldd: fE,
  bsiz: Xa,
  burn: $b,
  call: $c,
  cb: rI,
  ccp: Kb,
  cfe: ZI,
  cfei: WI,
  cfs: jI,
  cfsi: XI,
  croo: tI,
  csiz: eI,
  div: Tb,
  divi: Wa,
  ecal: pE,
  eck1: _I,
  ecop: AE,
  ecr1: pI,
  ed19: fI,
  epar: gE,
  eq: Nb,
  exp: Db,
  expi: vI,
  flag: yI,
  gm: LI,
  gm_args: wb,
  gt: Fb,
  gtf: Sf,
  gtf_args: mb,
  initSync: Ev,
  initWasm: Co,
  ji: HI,
  jmp: Ha,
  jmpb: zI,
  jmpf: UI,
  jne: II,
  jneb: YI,
  jnef: VI,
  jnei: DI,
  jnzb: Tf,
  jnzf: GI,
  jnzi: kI,
  k256: AI,
  lb: FI,
  ldc: Hi,
  log: nI,
  logd: sI,
  lt: Qb,
  lw: Ji,
  mcl: Xb,
  mcli: PI,
  mcp: Zb,
  mcpi: MI,
  meq: jb,
  mint: iI,
  mldv: Yb,
  mlog: Ob,
  mod_: Pb,
  modi: BI,
  move_: fn,
  movi: Jn,
  mroo: Mb,
  mul: Lb,
  muli: xI,
  noop: mI,
  not: kb,
  or: Ub,
  ori: RI,
  poph: KI,
  popl: $I,
  pshh: qI,
  pshl: JI,
  ret: Qd,
  retd: Hb,
  rvrt: aI,
  s256: gI,
  sb: QI,
  scwq: oI,
  sll: zb,
  slli: SI,
  smo: EI,
  srl: Gb,
  srli: TI,
  srw: cI,
  srwq: dI,
  sub: Ya,
  subi: Rf,
  sw: OI,
  sww: uI,
  swwq: hI,
  time: wI,
  tr: xf,
  tro: lI,
  wdam: uE,
  wdcm: tE,
  wdcm_args: yb,
  wddv: aE,
  wddv_args: Bb,
  wdmd: cE,
  wdml: sE,
  wdml_args: Cb,
  wdmm: lE,
  wdop: rE,
  wdop_args: Ib,
  wqam: hE,
  wqcm: eE,
  wqcm_args: bb,
  wqdv: oE,
  wqdv_args: xb,
  wqmd: dE,
  wqml: iE,
  wqml_args: vb,
  wqmm: _E,
  wqop: nE,
  wqop_args: Eb,
  xor: Vb,
  xori: NI
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const vo = /* @__PURE__ */ BigInt(0), Bo = /* @__PURE__ */ BigInt(1), Bv = /* @__PURE__ */ BigInt(2);
function Un(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function da(r) {
  if (!Un(r))
    throw new Error("Uint8Array expected");
}
function wi(r, t) {
  if (typeof t != "boolean")
    throw new Error(r + " boolean expected, got " + t);
}
const xv = /* @__PURE__ */ Array.from({ length: 256 }, (r, t) => t.toString(16).padStart(2, "0"));
function mi(r) {
  da(r);
  let t = "";
  for (let e = 0; e < r.length; e++)
    t += xv[r[e]];
  return t;
}
function qn(r) {
  const t = r.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function Od(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  return r === "" ? vo : BigInt("0x" + r);
}
const Nr = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function u_(r) {
  if (r >= Nr._0 && r <= Nr._9)
    return r - Nr._0;
  if (r >= Nr.A && r <= Nr.F)
    return r - (Nr.A - 10);
  if (r >= Nr.a && r <= Nr.f)
    return r - (Nr.a - 10);
}
function yi(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  const t = r.length, e = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(e);
  for (let s = 0, i = 0; s < e; s++, i += 2) {
    const a = u_(r.charCodeAt(i)), o = u_(r.charCodeAt(i + 1));
    if (a === void 0 || o === void 0) {
      const d = r[i] + r[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    n[s] = a * 16 + o;
  }
  return n;
}
function Bn(r) {
  return Od(mi(r));
}
function Md(r) {
  return da(r), Od(mi(Uint8Array.from(r).reverse()));
}
function bi(r, t) {
  return yi(r.toString(16).padStart(t * 2, "0"));
}
function Pd(r, t) {
  return bi(r, t).reverse();
}
function Rv(r) {
  return yi(qn(r));
}
function sr(r, t, e) {
  let n;
  if (typeof t == "string")
    try {
      n = yi(t);
    } catch (i) {
      throw new Error(r + " must be hex string or Uint8Array, cause: " + i);
    }
  else if (Un(t))
    n = Uint8Array.from(t);
  else
    throw new Error(r + " must be hex string or Uint8Array");
  const s = n.length;
  if (typeof e == "number" && s !== e)
    throw new Error(r + " of length " + e + " expected, got " + s);
  return n;
}
function qi(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    da(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, s = 0; n < r.length; n++) {
    const i = r[n];
    e.set(i, s), s += i.length;
  }
  return e;
}
function Sv(r, t) {
  if (r.length !== t.length)
    return !1;
  let e = 0;
  for (let n = 0; n < r.length; n++)
    e |= r[n] ^ t[n];
  return e === 0;
}
function Tv(r) {
  if (typeof r != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(r));
}
const vc = (r) => typeof r == "bigint" && vo <= r;
function xo(r, t, e) {
  return vc(r) && vc(t) && vc(e) && t <= r && r < e;
}
function xn(r, t, e, n) {
  if (!xo(t, e, n))
    throw new Error("expected valid " + r + ": " + e + " <= n < " + n + ", got " + t);
}
function Mf(r) {
  let t;
  for (t = 0; r > vo; r >>= Bo, t += 1)
    ;
  return t;
}
function Nv(r, t) {
  return r >> BigInt(t) & Bo;
}
function Dv(r, t, e) {
  return r | (e ? Bo : vo) << BigInt(t);
}
const Ld = (r) => (Bv << BigInt(r - 1)) - Bo, Bc = (r) => new Uint8Array(r), h_ = (r) => Uint8Array.from(r);
function Pf(r, t, e) {
  if (typeof r != "number" || r < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let n = Bc(r), s = Bc(r), i = 0;
  const a = () => {
    n.fill(1), s.fill(0), i = 0;
  }, o = (...g) => e(s, n, ...g), d = (g = Bc()) => {
    s = o(h_([0]), g), n = o(), g.length !== 0 && (s = o(h_([1]), g), n = o());
  }, _ = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let g = 0;
    const y = [];
    for (; g < t; ) {
      n = o();
      const S = n.slice();
      y.push(S), g += n.length;
    }
    return qi(...y);
  };
  return (g, y) => {
    a(), d(g);
    let S;
    for (; !(S = y(_())); )
      d();
    return a(), S;
  };
}
const Fv = {
  bigint: (r) => typeof r == "bigint",
  function: (r) => typeof r == "function",
  boolean: (r) => typeof r == "boolean",
  string: (r) => typeof r == "string",
  stringOrUint8Array: (r) => typeof r == "string" || Un(r),
  isSafeInteger: (r) => Number.isSafeInteger(r),
  array: (r) => Array.isArray(r),
  field: (r, t) => t.Fp.isValid(r),
  hash: (r) => typeof r == "function" && Number.isSafeInteger(r.outputLen)
};
function ua(r, t, e = {}) {
  const n = (s, i, a) => {
    const o = Fv[i];
    if (typeof o != "function")
      throw new Error("invalid validator function");
    const d = r[s];
    if (!(a && d === void 0) && !o(d, r))
      throw new Error("param " + String(s) + " is invalid. Expected " + i + ", got " + d);
  };
  for (const [s, i] of Object.entries(t))
    n(s, i, !1);
  for (const [s, i] of Object.entries(e))
    n(s, i, !0);
  return r;
}
const Qv = () => {
  throw new Error("not implemented");
};
function Kc(r) {
  const t = /* @__PURE__ */ new WeakMap();
  return (e, ...n) => {
    const s = t.get(e);
    if (s !== void 0)
      return s;
    const i = r(e, ...n);
    return t.set(e, i), i;
  };
}
const Ov = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: xn,
  abool: wi,
  abytes: da,
  bitGet: Nv,
  bitLen: Mf,
  bitMask: Ld,
  bitSet: Dv,
  bytesToHex: mi,
  bytesToNumberBE: Bn,
  bytesToNumberLE: Md,
  concatBytes: qi,
  createHmacDrbg: Pf,
  ensureBytes: sr,
  equalBytes: Sv,
  hexToBytes: yi,
  hexToNumber: Od,
  inRange: xo,
  isBytes: Un,
  memoized: Kc,
  notImplemented: Qv,
  numberToBytesBE: bi,
  numberToBytesLE: Pd,
  numberToHexUnpadded: qn,
  numberToVarBytesBE: Rv,
  utf8ToBytes: Tv,
  validateObject: ua
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ve = BigInt(0), zt = BigInt(1), un = /* @__PURE__ */ BigInt(2), Mv = /* @__PURE__ */ BigInt(3), td = /* @__PURE__ */ BigInt(4), l_ = /* @__PURE__ */ BigInt(5), __ = /* @__PURE__ */ BigInt(8);
function Pe(r, t) {
  const e = r % t;
  return e >= ve ? e : t + e;
}
function Pv(r, t, e) {
  if (t < ve)
    throw new Error("invalid exponent, negatives unsupported");
  if (e <= ve)
    throw new Error("invalid modulus");
  if (e === zt)
    return ve;
  let n = zt;
  for (; t > ve; )
    t & zt && (n = n * r % e), r = r * r % e, t >>= zt;
  return n;
}
function We(r, t, e) {
  let n = r;
  for (; t-- > ve; )
    n *= n, n %= e;
  return n;
}
function ed(r, t) {
  if (r === ve)
    throw new Error("invert: expected non-zero number");
  if (t <= ve)
    throw new Error("invert: expected positive modulus, got " + t);
  let e = Pe(r, t), n = t, s = ve, i = zt;
  for (; e !== ve; ) {
    const o = n / e, d = n % e, _ = s - i * o;
    n = e, e = d, s = i, i = _;
  }
  if (n !== zt)
    throw new Error("invert: does not exist");
  return Pe(s, t);
}
function Lv(r) {
  const t = (r - zt) / un;
  let e, n, s;
  for (e = r - zt, n = 0; e % un === ve; e /= un, n++)
    ;
  for (s = un; s < r && Pv(s, t, r) !== r - zt; s++)
    if (s > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (n === 1) {
    const a = (r + zt) / td;
    return function(d, _) {
      const A = d.pow(_, a);
      if (!d.eql(d.sqr(A), _))
        throw new Error("Cannot find square root");
      return A;
    };
  }
  const i = (e + zt) / un;
  return function(o, d) {
    if (o.pow(d, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let _ = n, A = o.pow(o.mul(o.ONE, s), e), g = o.pow(d, i), y = o.pow(d, e);
    for (; !o.eql(y, o.ONE); ) {
      if (o.eql(y, o.ZERO))
        return o.ZERO;
      let S = 1;
      for (let R = o.sqr(y); S < _ && !o.eql(R, o.ONE); S++)
        R = o.sqr(R);
      const O = o.pow(A, zt << BigInt(_ - S - 1));
      A = o.sqr(O), g = o.mul(g, O), y = o.mul(y, A), _ = S;
    }
    return g;
  };
}
function kv(r) {
  if (r % td === Mv) {
    const t = (r + zt) / td;
    return function(n, s) {
      const i = n.pow(s, t);
      if (!n.eql(n.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (r % __ === l_) {
    const t = (r - l_) / __;
    return function(n, s) {
      const i = n.mul(s, un), a = n.pow(i, t), o = n.mul(s, a), d = n.mul(n.mul(o, un), a), _ = n.mul(o, n.sub(d, n.ONE));
      if (!n.eql(n.sqr(_), s))
        throw new Error("Cannot find square root");
      return _;
    };
  }
  return Lv(r);
}
const Uv = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function zv(r) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = Uv.reduce((n, s) => (n[s] = "function", n), t);
  return ua(r, e);
}
function Gv(r, t, e) {
  if (e < ve)
    throw new Error("invalid exponent, negatives unsupported");
  if (e === ve)
    return r.ONE;
  if (e === zt)
    return t;
  let n = r.ONE, s = t;
  for (; e > ve; )
    e & zt && (n = r.mul(n, s)), s = r.sqr(s), e >>= zt;
  return n;
}
function Vv(r, t) {
  const e = new Array(t.length), n = t.reduce((i, a, o) => r.is0(a) ? i : (e[o] = i, r.mul(i, a)), r.ONE), s = r.inv(n);
  return t.reduceRight((i, a, o) => r.is0(a) ? i : (e[o] = r.mul(i, e[o]), r.mul(i, a)), s), e;
}
function Lf(r, t) {
  const e = t !== void 0 ? t : r.toString(2).length, n = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: n };
}
function kf(r, t, e = !1, n = {}) {
  if (r <= ve)
    throw new Error("invalid field: expected ORDER > 0, got " + r);
  const { nBitLength: s, nByteLength: i } = Lf(r, t);
  if (i > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a;
  const o = Object.freeze({
    ORDER: r,
    isLE: e,
    BITS: s,
    BYTES: i,
    MASK: Ld(s),
    ZERO: ve,
    ONE: zt,
    create: (d) => Pe(d, r),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof d);
      return ve <= d && d < r;
    },
    is0: (d) => d === ve,
    isOdd: (d) => (d & zt) === zt,
    neg: (d) => Pe(-d, r),
    eql: (d, _) => d === _,
    sqr: (d) => Pe(d * d, r),
    add: (d, _) => Pe(d + _, r),
    sub: (d, _) => Pe(d - _, r),
    mul: (d, _) => Pe(d * _, r),
    pow: (d, _) => Gv(o, d, _),
    div: (d, _) => Pe(d * ed(_, r), r),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, _) => d + _,
    subN: (d, _) => d - _,
    mulN: (d, _) => d * _,
    inv: (d) => ed(d, r),
    sqrt: n.sqrt || ((d) => (a || (a = kv(r)), a(o, d))),
    invertBatch: (d) => Vv(o, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, _, A) => A ? _ : d,
    toBytes: (d) => e ? Pd(d, i) : bi(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error("Field.fromBytes: expected " + i + " bytes, got " + d.length);
      return e ? Md(d) : Bn(d);
    }
  });
  return Object.freeze(o);
}
function Uf(r) {
  if (typeof r != "bigint")
    throw new Error("field order must be bigint");
  const t = r.toString(2).length;
  return Math.ceil(t / 8);
}
function zf(r) {
  const t = Uf(r);
  return t + Math.ceil(t / 2);
}
function Yv(r, t, e = !1) {
  const n = r.length, s = Uf(t), i = zf(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error("expected " + i + "-1024 bytes of input, got " + n);
  const a = e ? Md(r) : Bn(r), o = Pe(a, t - zt) + zt;
  return e ? Pd(o, s) : bi(o, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const p_ = BigInt(0), wa = BigInt(1);
function xc(r, t) {
  const e = t.negate();
  return r ? e : t;
}
function Gf(r, t) {
  if (!Number.isSafeInteger(r) || r <= 0 || r > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + r);
}
function Rc(r, t) {
  Gf(r, t);
  const e = Math.ceil(t / r) + 1, n = 2 ** (r - 1);
  return { windows: e, windowSize: n };
}
function Hv(r, t) {
  if (!Array.isArray(r))
    throw new Error("array expected");
  r.forEach((e, n) => {
    if (!(e instanceof t))
      throw new Error("invalid point at index " + n);
  });
}
function Wv(r, t) {
  if (!Array.isArray(r))
    throw new Error("array of scalars expected");
  r.forEach((e, n) => {
    if (!t.isValid(e))
      throw new Error("invalid scalar at index " + n);
  });
}
const Sc = /* @__PURE__ */ new WeakMap(), Vf = /* @__PURE__ */ new WeakMap();
function Tc(r) {
  return Vf.get(r) || 1;
}
function Xv(r, t) {
  return {
    constTimeNegate: xc,
    hasPrecomputes(e) {
      return Tc(e) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(e, n, s = r.ZERO) {
      let i = e;
      for (; n > p_; )
        n & wa && (s = s.add(i)), i = i.double(), n >>= wa;
      return s;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(e, n) {
      const { windows: s, windowSize: i } = Rc(n, t), a = [];
      let o = e, d = o;
      for (let _ = 0; _ < s; _++) {
        d = o, a.push(d);
        for (let A = 1; A < i; A++)
          d = d.add(o), a.push(d);
        o = d.double();
      }
      return a;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(e, n, s) {
      const { windows: i, windowSize: a } = Rc(e, t);
      let o = r.ZERO, d = r.BASE;
      const _ = BigInt(2 ** e - 1), A = 2 ** e, g = BigInt(e);
      for (let y = 0; y < i; y++) {
        const S = y * a;
        let O = Number(s & _);
        s >>= g, O > a && (O -= A, s += wa);
        const R = S, F = S + Math.abs(O) - 1, z = y % 2 !== 0, H = O < 0;
        O === 0 ? d = d.add(xc(z, n[R])) : o = o.add(xc(H, n[F]));
      }
      return { p: o, f: d };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(e, n, s, i = r.ZERO) {
      const { windows: a, windowSize: o } = Rc(e, t), d = BigInt(2 ** e - 1), _ = 2 ** e, A = BigInt(e);
      for (let g = 0; g < a; g++) {
        const y = g * o;
        if (s === p_)
          break;
        let S = Number(s & d);
        if (s >>= A, S > o && (S -= _, s += wa), S === 0)
          continue;
        let O = n[y + Math.abs(S) - 1];
        S < 0 && (O = O.negate()), i = i.add(O);
      }
      return i;
    },
    getPrecomputes(e, n, s) {
      let i = Sc.get(n);
      return i || (i = this.precomputeWindow(n, e), e !== 1 && Sc.set(n, s(i))), i;
    },
    wNAFCached(e, n, s) {
      const i = Tc(e);
      return this.wNAF(i, this.getPrecomputes(i, e, s), n);
    },
    wNAFCachedUnsafe(e, n, s, i) {
      const a = Tc(e);
      return a === 1 ? this.unsafeLadder(e, n, i) : this.wNAFUnsafe(a, this.getPrecomputes(a, e, s), n, i);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(e, n) {
      Gf(n, t), Vf.set(e, n), Sc.delete(e);
    }
  };
}
function Zv(r, t, e, n) {
  if (Hv(e, r), Wv(n, t), e.length !== n.length)
    throw new Error("arrays of points and scalars must have equal length");
  const s = r.ZERO, i = Mf(BigInt(e.length)), a = i > 12 ? i - 3 : i > 4 ? i - 2 : i ? 2 : 1, o = (1 << a) - 1, d = new Array(o + 1).fill(s), _ = Math.floor((t.BITS - 1) / a) * a;
  let A = s;
  for (let g = _; g >= 0; g -= a) {
    d.fill(s);
    for (let S = 0; S < n.length; S++) {
      const O = n[S], R = Number(O >> BigInt(g) & BigInt(o));
      d[R] = d[R].add(e[S]);
    }
    let y = s;
    for (let S = d.length - 1, O = s; S > 0; S--)
      O = O.add(d[S]), y = y.add(O);
    if (A = A.add(y), g !== 0)
      for (let S = 0; S < a; S++)
        A = A.double();
  }
  return A;
}
function Yf(r) {
  return zv(r.Fp), ua(r, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Lf(r.n, r.nBitLength),
    ...r,
    p: r.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function f_(r) {
  r.lowS !== void 0 && wi("lowS", r.lowS), r.prehash !== void 0 && wi("prehash", r.prehash);
}
function jv(r) {
  const t = Yf(r);
  ua(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: e, Fp: n, a: s } = t;
  if (e) {
    if (!n.eql(s, n.ZERO))
      throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: Jv, hexToBytes: qv } = Ov;
class $v extends Error {
  constructor(t = "") {
    super(t);
  }
}
const Qr = {
  // asn.1 DER encoding utils
  Err: $v,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (r, t) => {
      const { Err: e } = Qr;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new e("tlv.encode: unpadded data");
      const n = t.length / 2, s = qn(n);
      if (s.length / 2 & 128)
        throw new e("tlv.encode: long form length too big");
      const i = n > 127 ? qn(s.length / 2 | 128) : "";
      return qn(r) + i + s + t;
    },
    // v - value, l - left bytes (unparsed)
    decode(r, t) {
      const { Err: e } = Qr;
      let n = 0;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length < 2 || t[n++] !== r)
        throw new e("tlv.decode: wrong tlv");
      const s = t[n++], i = !!(s & 128);
      let a = 0;
      if (!i)
        a = s;
      else {
        const d = s & 127;
        if (!d)
          throw new e("tlv.decode(long): indefinite length not supported");
        if (d > 4)
          throw new e("tlv.decode(long): byte length is too big");
        const _ = t.subarray(n, n + d);
        if (_.length !== d)
          throw new e("tlv.decode: length bytes not complete");
        if (_[0] === 0)
          throw new e("tlv.decode(long): zero leftmost byte");
        for (const A of _)
          a = a << 8 | A;
        if (n += d, a < 128)
          throw new e("tlv.decode(long): not minimal encoding");
      }
      const o = t.subarray(n, n + a);
      if (o.length !== a)
        throw new e("tlv.decode: wrong value length");
      return { v: o, l: t.subarray(n + a) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(r) {
      const { Err: t } = Qr;
      if (r < Pr)
        throw new t("integer: negative integers are not allowed");
      let e = qn(r);
      if (Number.parseInt(e[0], 16) & 8 && (e = "00" + e), e.length & 1)
        throw new t("unexpected DER parsing assertion: unpadded hex");
      return e;
    },
    decode(r) {
      const { Err: t } = Qr;
      if (r[0] & 128)
        throw new t("invalid signature integer: negative");
      if (r[0] === 0 && !(r[1] & 128))
        throw new t("invalid signature integer: unnecessary leading zero");
      return Jv(r);
    }
  },
  toSig(r) {
    const { Err: t, _int: e, _tlv: n } = Qr, s = typeof r == "string" ? qv(r) : r;
    da(s);
    const { v: i, l: a } = n.decode(48, s);
    if (a.length)
      throw new t("invalid signature: left bytes after parsing");
    const { v: o, l: d } = n.decode(2, i), { v: _, l: A } = n.decode(2, d);
    if (A.length)
      throw new t("invalid signature: left bytes after parsing");
    return { r: e.decode(o), s: e.decode(_) };
  },
  hexFromSig(r) {
    const { _tlv: t, _int: e } = Qr, n = t.encode(2, e.encode(r.r)), s = t.encode(2, e.encode(r.s)), i = n + s;
    return t.encode(48, i);
  }
}, Pr = BigInt(0), Ee = BigInt(1);
BigInt(2);
const A_ = BigInt(3);
BigInt(4);
function Kv(r) {
  const t = jv(r), { Fp: e } = t, n = kf(t.n, t.nBitLength), s = t.toBytes || ((R, F, z) => {
    const H = F.toAffine();
    return qi(Uint8Array.from([4]), e.toBytes(H.x), e.toBytes(H.y));
  }), i = t.fromBytes || ((R) => {
    const F = R.subarray(1), z = e.fromBytes(F.subarray(0, e.BYTES)), H = e.fromBytes(F.subarray(e.BYTES, 2 * e.BYTES));
    return { x: z, y: H };
  });
  function a(R) {
    const { a: F, b: z } = t, H = e.sqr(R), V = e.mul(H, R);
    return e.add(e.add(V, e.mul(R, F)), z);
  }
  if (!e.eql(e.sqr(t.Gy), a(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(R) {
    return xo(R, Ee, t.n);
  }
  function d(R) {
    const { allowedPrivateKeyLengths: F, nByteLength: z, wrapPrivateKey: H, n: V } = t;
    if (F && typeof R != "bigint") {
      if (Un(R) && (R = mi(R)), typeof R != "string" || !F.includes(R.length))
        throw new Error("invalid private key");
      R = R.padStart(z * 2, "0");
    }
    let P;
    try {
      P = typeof R == "bigint" ? R : Bn(sr("private key", R, z));
    } catch {
      throw new Error("invalid private key, expected hex or " + z + " bytes, got " + typeof R);
    }
    return H && (P = Pe(P, V)), xn("private key", P, Ee, V), P;
  }
  function _(R) {
    if (!(R instanceof y))
      throw new Error("ProjectivePoint expected");
  }
  const A = Kc((R, F) => {
    const { px: z, py: H, pz: V } = R;
    if (e.eql(V, e.ONE))
      return { x: z, y: H };
    const P = R.is0();
    F == null && (F = P ? e.ONE : e.inv(V));
    const M = e.mul(z, F), Q = e.mul(H, F), k = e.mul(V, F);
    if (P)
      return { x: e.ZERO, y: e.ZERO };
    if (!e.eql(k, e.ONE))
      throw new Error("invZ was invalid");
    return { x: M, y: Q };
  }), g = Kc((R) => {
    if (R.is0()) {
      if (t.allowInfinityPoint && !e.is0(R.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: F, y: z } = R.toAffine();
    if (!e.isValid(F) || !e.isValid(z))
      throw new Error("bad point: x or y not FE");
    const H = e.sqr(z), V = a(F);
    if (!e.eql(H, V))
      throw new Error("bad point: equation left != right");
    if (!R.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class y {
    constructor(F, z, H) {
      if (this.px = F, this.py = z, this.pz = H, F == null || !e.isValid(F))
        throw new Error("x required");
      if (z == null || !e.isValid(z))
        throw new Error("y required");
      if (H == null || !e.isValid(H))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(F) {
      const { x: z, y: H } = F || {};
      if (!F || !e.isValid(z) || !e.isValid(H))
        throw new Error("invalid affine point");
      if (F instanceof y)
        throw new Error("projective point not allowed");
      const V = (P) => e.eql(P, e.ZERO);
      return V(z) && V(H) ? y.ZERO : new y(z, H, e.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(F) {
      const z = e.invertBatch(F.map((H) => H.pz));
      return F.map((H, V) => H.toAffine(z[V])).map(y.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(F) {
      const z = y.fromAffine(i(sr("pointHex", F)));
      return z.assertValidity(), z;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(F) {
      return y.BASE.multiply(d(F));
    }
    // Multiscalar Multiplication
    static msm(F, z) {
      return Zv(y, n, F, z);
    }
    // "Private method", don't use it directly
    _setWindowSize(F) {
      O.setWindowSize(this, F);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      g(this);
    }
    hasEvenY() {
      const { y: F } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(F);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(F) {
      _(F);
      const { px: z, py: H, pz: V } = this, { px: P, py: M, pz: Q } = F, k = e.eql(e.mul(z, Q), e.mul(P, V)), U = e.eql(e.mul(H, Q), e.mul(M, V));
      return k && U;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new y(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: F, b: z } = t, H = e.mul(z, A_), { px: V, py: P, pz: M } = this;
      let Q = e.ZERO, k = e.ZERO, U = e.ZERO, G = e.mul(V, V), j = e.mul(P, P), J = e.mul(M, M), q = e.mul(V, P);
      return q = e.add(q, q), U = e.mul(V, M), U = e.add(U, U), Q = e.mul(F, U), k = e.mul(H, J), k = e.add(Q, k), Q = e.sub(j, k), k = e.add(j, k), k = e.mul(Q, k), Q = e.mul(q, Q), U = e.mul(H, U), J = e.mul(F, J), q = e.sub(G, J), q = e.mul(F, q), q = e.add(q, U), U = e.add(G, G), G = e.add(U, G), G = e.add(G, J), G = e.mul(G, q), k = e.add(k, G), J = e.mul(P, M), J = e.add(J, J), G = e.mul(J, q), Q = e.sub(Q, G), U = e.mul(J, j), U = e.add(U, U), U = e.add(U, U), new y(Q, k, U);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(F) {
      _(F);
      const { px: z, py: H, pz: V } = this, { px: P, py: M, pz: Q } = F;
      let k = e.ZERO, U = e.ZERO, G = e.ZERO;
      const j = t.a, J = e.mul(t.b, A_);
      let q = e.mul(z, P), C = e.mul(H, M), u = e.mul(V, Q), h = e.add(z, H), f = e.add(P, M);
      h = e.mul(h, f), f = e.add(q, C), h = e.sub(h, f), f = e.add(z, V);
      let m = e.add(P, Q);
      return f = e.mul(f, m), m = e.add(q, u), f = e.sub(f, m), m = e.add(H, V), k = e.add(M, Q), m = e.mul(m, k), k = e.add(C, u), m = e.sub(m, k), G = e.mul(j, f), k = e.mul(J, u), G = e.add(k, G), k = e.sub(C, G), G = e.add(C, G), U = e.mul(k, G), C = e.add(q, q), C = e.add(C, q), u = e.mul(j, u), f = e.mul(J, f), C = e.add(C, u), u = e.sub(q, u), u = e.mul(j, u), f = e.add(f, u), q = e.mul(C, f), U = e.add(U, q), q = e.mul(m, f), k = e.mul(h, k), k = e.sub(k, q), q = e.mul(h, C), G = e.mul(m, G), G = e.add(G, q), new y(k, U, G);
    }
    subtract(F) {
      return this.add(F.negate());
    }
    is0() {
      return this.equals(y.ZERO);
    }
    wNAF(F) {
      return O.wNAFCached(this, F, y.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(F) {
      const { endo: z, n: H } = t;
      xn("scalar", F, Pr, H);
      const V = y.ZERO;
      if (F === Pr)
        return V;
      if (this.is0() || F === Ee)
        return this;
      if (!z || O.hasPrecomputes(this))
        return O.wNAFCachedUnsafe(this, F, y.normalizeZ);
      let { k1neg: P, k1: M, k2neg: Q, k2: k } = z.splitScalar(F), U = V, G = V, j = this;
      for (; M > Pr || k > Pr; )
        M & Ee && (U = U.add(j)), k & Ee && (G = G.add(j)), j = j.double(), M >>= Ee, k >>= Ee;
      return P && (U = U.negate()), Q && (G = G.negate()), G = new y(e.mul(G.px, z.beta), G.py, G.pz), U.add(G);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(F) {
      const { endo: z, n: H } = t;
      xn("scalar", F, Ee, H);
      let V, P;
      if (z) {
        const { k1neg: M, k1: Q, k2neg: k, k2: U } = z.splitScalar(F);
        let { p: G, f: j } = this.wNAF(Q), { p: J, f: q } = this.wNAF(U);
        G = O.constTimeNegate(M, G), J = O.constTimeNegate(k, J), J = new y(e.mul(J.px, z.beta), J.py, J.pz), V = G.add(J), P = j.add(q);
      } else {
        const { p: M, f: Q } = this.wNAF(F);
        V = M, P = Q;
      }
      return y.normalizeZ([V, P])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(F, z, H) {
      const V = y.BASE, P = (Q, k) => k === Pr || k === Ee || !Q.equals(V) ? Q.multiplyUnsafe(k) : Q.multiply(k), M = P(this, z).add(P(F, H));
      return M.is0() ? void 0 : M;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(F) {
      return A(this, F);
    }
    isTorsionFree() {
      const { h: F, isTorsionFree: z } = t;
      if (F === Ee)
        return !0;
      if (z)
        return z(y, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: F, clearCofactor: z } = t;
      return F === Ee ? this : z ? z(y, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(F = !0) {
      return wi("isCompressed", F), this.assertValidity(), s(y, this, F);
    }
    toHex(F = !0) {
      return wi("isCompressed", F), mi(this.toRawBytes(F));
    }
  }
  y.BASE = new y(t.Gx, t.Gy, e.ONE), y.ZERO = new y(e.ZERO, e.ONE, e.ZERO);
  const S = t.nBitLength, O = Xv(y, t.endo ? Math.ceil(S / 2) : S);
  return {
    CURVE: t,
    ProjectivePoint: y,
    normPrivateKeyToScalar: d,
    weierstrassEquation: a,
    isWithinCurveOrder: o
  };
}
function tB(r) {
  const t = Yf(r);
  return ua(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function eB(r) {
  const t = tB(r), { Fp: e, n } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function a(u) {
    return Pe(u, n);
  }
  function o(u) {
    return ed(u, n);
  }
  const { ProjectivePoint: d, normPrivateKeyToScalar: _, weierstrassEquation: A, isWithinCurveOrder: g } = Kv({
    ...t,
    toBytes(u, h, f) {
      const m = h.toAffine(), b = e.toBytes(m.x), B = qi;
      return wi("isCompressed", f), f ? B(Uint8Array.from([h.hasEvenY() ? 2 : 3]), b) : B(Uint8Array.from([4]), b, e.toBytes(m.y));
    },
    fromBytes(u) {
      const h = u.length, f = u[0], m = u.subarray(1);
      if (h === s && (f === 2 || f === 3)) {
        const b = Bn(m);
        if (!xo(b, Ee, e.ORDER))
          throw new Error("Point is not on curve");
        const B = A(b);
        let N;
        try {
          N = e.sqrt(B);
        } catch (E) {
          const tt = E instanceof Error ? ": " + E.message : "";
          throw new Error("Point is not on curve" + tt);
        }
        const I = (N & Ee) === Ee;
        return (f & 1) === 1 !== I && (N = e.neg(N)), { x: b, y: N };
      } else if (h === i && f === 4) {
        const b = e.fromBytes(m.subarray(0, e.BYTES)), B = e.fromBytes(m.subarray(e.BYTES, 2 * e.BYTES));
        return { x: b, y: B };
      } else {
        const b = s, B = i;
        throw new Error("invalid Point, expected length of " + b + ", or uncompressed " + B + ", got " + h);
      }
    }
  }), y = (u) => mi(bi(u, t.nByteLength));
  function S(u) {
    const h = n >> Ee;
    return u > h;
  }
  function O(u) {
    return S(u) ? a(-u) : u;
  }
  const R = (u, h, f) => Bn(u.slice(h, f));
  class F {
    constructor(h, f, m) {
      this.r = h, this.s = f, this.recovery = m, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(h) {
      const f = t.nByteLength;
      return h = sr("compactSignature", h, f * 2), new F(R(h, 0, f), R(h, f, 2 * f));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(h) {
      const { r: f, s: m } = Qr.toSig(sr("DER", h));
      return new F(f, m);
    }
    assertValidity() {
      xn("r", this.r, Ee, n), xn("s", this.s, Ee, n);
    }
    addRecoveryBit(h) {
      return new F(this.r, this.s, h);
    }
    recoverPublicKey(h) {
      const { r: f, s: m, recovery: b } = this, B = Q(sr("msgHash", h));
      if (b == null || ![0, 1, 2, 3].includes(b))
        throw new Error("recovery id invalid");
      const N = b === 2 || b === 3 ? f + t.n : f;
      if (N >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const I = b & 1 ? "03" : "02", p = d.fromHex(I + y(N)), E = o(N), tt = a(-B * E), et = a(m * E), nt = d.BASE.multiplyAndAddUnsafe(p, tt, et);
      if (!nt)
        throw new Error("point at infinify");
      return nt.assertValidity(), nt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return S(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new F(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return yi(this.toDERHex());
    }
    toDERHex() {
      return Qr.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return yi(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const z = {
    isValidPrivateKey(u) {
      try {
        return _(u), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: _,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const u = zf(t.n);
      return Yv(t.randomBytes(u), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(u = 8, h = d.BASE) {
      return h._setWindowSize(u), h.multiply(BigInt(3)), h;
    }
  };
  function H(u, h = !0) {
    return d.fromPrivateKey(u).toRawBytes(h);
  }
  function V(u) {
    const h = Un(u), f = typeof u == "string", m = (h || f) && u.length;
    return h ? m === s || m === i : f ? m === 2 * s || m === 2 * i : u instanceof d;
  }
  function P(u, h, f = !0) {
    if (V(u))
      throw new Error("first arg must be private key");
    if (!V(h))
      throw new Error("second arg must be public key");
    return d.fromHex(h).multiply(_(u)).toRawBytes(f);
  }
  const M = t.bits2int || function(u) {
    if (u.length > 8192)
      throw new Error("input is too large");
    const h = Bn(u), f = u.length * 8 - t.nBitLength;
    return f > 0 ? h >> BigInt(f) : h;
  }, Q = t.bits2int_modN || function(u) {
    return a(M(u));
  }, k = Ld(t.nBitLength);
  function U(u) {
    return xn("num < 2^" + t.nBitLength, u, Pr, k), bi(u, t.nByteLength);
  }
  function G(u, h, f = j) {
    if (["recovered", "canonical"].some((pt) => pt in f))
      throw new Error("sign() legacy options not supported");
    const { hash: m, randomBytes: b } = t;
    let { lowS: B, prehash: N, extraEntropy: I } = f;
    B == null && (B = !0), u = sr("msgHash", u), f_(f), N && (u = sr("prehashed msgHash", m(u)));
    const p = Q(u), E = _(h), tt = [U(E), U(p)];
    if (I != null && I !== !1) {
      const pt = I === !0 ? b(e.BYTES) : I;
      tt.push(sr("extraEntropy", pt));
    }
    const et = qi(...tt), nt = p;
    function Ft(pt) {
      const Et = M(pt);
      if (!g(Et))
        return;
      const tr = o(Et), vt = d.BASE.multiply(Et).toAffine(), Ct = a(vt.x);
      if (Ct === Pr)
        return;
      const De = a(tr * a(nt + Ct * E));
      if (De === Pr)
        return;
      let St = (vt.x === Ct ? 0 : 2) | Number(vt.y & Ee), Qt = De;
      return B && S(De) && (Qt = O(De), St ^= 1), new F(Ct, Qt, St);
    }
    return { seed: et, k2sig: Ft };
  }
  const j = { lowS: t.lowS, prehash: !1 }, J = { lowS: t.lowS, prehash: !1 };
  function q(u, h, f = j) {
    const { seed: m, k2sig: b } = G(u, h, f), B = t;
    return Pf(B.hash.outputLen, B.nByteLength, B.hmac)(m, b);
  }
  d.BASE._setWindowSize(8);
  function C(u, h, f, m = J) {
    var St;
    const b = u;
    h = sr("msgHash", h), f = sr("publicKey", f);
    const { lowS: B, prehash: N, format: I } = m;
    if (f_(m), "strict" in m)
      throw new Error("options.strict was renamed to lowS");
    if (I !== void 0 && I !== "compact" && I !== "der")
      throw new Error("format must be compact or der");
    const p = typeof b == "string" || Un(b), E = !p && !I && typeof b == "object" && b !== null && typeof b.r == "bigint" && typeof b.s == "bigint";
    if (!p && !E)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let tt, et;
    try {
      if (E && (tt = new F(b.r, b.s)), p) {
        try {
          I !== "compact" && (tt = F.fromDER(b));
        } catch (Qt) {
          if (!(Qt instanceof Qr.Err))
            throw Qt;
        }
        !tt && I !== "der" && (tt = F.fromCompact(b));
      }
      et = d.fromHex(f);
    } catch {
      return !1;
    }
    if (!tt || B && tt.hasHighS())
      return !1;
    N && (h = t.hash(h));
    const { r: nt, s: Ft } = tt, pt = Q(h), Et = o(Ft), tr = a(pt * Et), vt = a(nt * Et), Ct = (St = d.BASE.multiplyAndAddUnsafe(et, tr, vt)) == null ? void 0 : St.toAffine();
    return Ct ? a(Ct.x) === nt : !1;
  }
  return {
    CURVE: t,
    getPublicKey: H,
    getSharedSecret: P,
    sign: q,
    verify: C,
    ProjectivePoint: d,
    Signature: F,
    utils: z
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function rB(r) {
  return {
    hash: r,
    hmac: (t, ...e) => Ao(r, t, Xw(...e)),
    randomBytes: Zw
  };
}
function nB(r, t) {
  const e = (n) => eB({ ...r, ...rB(n) });
  return { ...e(t), create: e };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Hf = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), g_ = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), sB = BigInt(1), rd = BigInt(2), w_ = (r, t) => (r + t / rd) / t;
function iB(r) {
  const t = Hf, e = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), a = BigInt(23), o = BigInt(44), d = BigInt(88), _ = r * r * r % t, A = _ * _ * r % t, g = We(A, e, t) * A % t, y = We(g, e, t) * A % t, S = We(y, rd, t) * _ % t, O = We(S, s, t) * S % t, R = We(O, i, t) * O % t, F = We(R, o, t) * R % t, z = We(F, d, t) * F % t, H = We(z, o, t) * R % t, V = We(H, e, t) * A % t, P = We(V, a, t) * O % t, M = We(P, n, t) * _ % t, Q = We(M, rd, t);
  if (!nd.eql(nd.sqr(Q), r))
    throw new Error("Cannot find square root");
  return Q;
}
const nd = kf(Hf, void 0, void 0, { sqrt: iB }), Wr = nB({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  Fp: nd,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: g_,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (r) => {
      const t = g_, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -sB * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = e, a = BigInt("0x100000000000000000000000000000000"), o = w_(i * r, t), d = w_(-n * r, t);
      let _ = Pe(r - o * e - d * s, t), A = Pe(-o * n - d * i, t);
      const g = _ > a, y = A > a;
      if (g && (_ = t - _), y && (A = t - A), _ > a || A > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + r);
      return { k1neg: g, k1: _, k2neg: y, k2: A };
    }
  }
}, nn);
BigInt(0);
Wr.ProjectivePoint;
var ma = { exports: {} }, m_;
function aB() {
  if (m_) return ma.exports;
  m_ = 1;
  var r = typeof Reflect == "object" ? Reflect : null, t = r && typeof r.apply == "function" ? r.apply : function(M, Q, k) {
    return Function.prototype.apply.call(M, Q, k);
  }, e;
  r && typeof r.ownKeys == "function" ? e = r.ownKeys : Object.getOwnPropertySymbols ? e = function(M) {
    return Object.getOwnPropertyNames(M).concat(Object.getOwnPropertySymbols(M));
  } : e = function(M) {
    return Object.getOwnPropertyNames(M);
  };
  function n(P) {
    console && console.warn && console.warn(P);
  }
  var s = Number.isNaN || function(M) {
    return M !== M;
  };
  function i() {
    i.init.call(this);
  }
  ma.exports = i, ma.exports.once = z, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._eventsCount = 0, i.prototype._maxListeners = void 0;
  var a = 10;
  function o(P) {
    if (typeof P != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof P);
  }
  Object.defineProperty(i, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return a;
    },
    set: function(P) {
      if (typeof P != "number" || P < 0 || s(P))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + P + ".");
      a = P;
    }
  }), i.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, i.prototype.setMaxListeners = function(M) {
    if (typeof M != "number" || M < 0 || s(M))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + M + ".");
    return this._maxListeners = M, this;
  };
  function d(P) {
    return P._maxListeners === void 0 ? i.defaultMaxListeners : P._maxListeners;
  }
  i.prototype.getMaxListeners = function() {
    return d(this);
  }, i.prototype.emit = function(M) {
    for (var Q = [], k = 1; k < arguments.length; k++) Q.push(arguments[k]);
    var U = M === "error", G = this._events;
    if (G !== void 0)
      U = U && G.error === void 0;
    else if (!U)
      return !1;
    if (U) {
      var j;
      if (Q.length > 0 && (j = Q[0]), j instanceof Error)
        throw j;
      var J = new Error("Unhandled error." + (j ? " (" + j.message + ")" : ""));
      throw J.context = j, J;
    }
    var q = G[M];
    if (q === void 0)
      return !1;
    if (typeof q == "function")
      t(q, this, Q);
    else
      for (var C = q.length, u = O(q, C), k = 0; k < C; ++k)
        t(u[k], this, Q);
    return !0;
  };
  function _(P, M, Q, k) {
    var U, G, j;
    if (o(Q), G = P._events, G === void 0 ? (G = P._events = /* @__PURE__ */ Object.create(null), P._eventsCount = 0) : (G.newListener !== void 0 && (P.emit(
      "newListener",
      M,
      Q.listener ? Q.listener : Q
    ), G = P._events), j = G[M]), j === void 0)
      j = G[M] = Q, ++P._eventsCount;
    else if (typeof j == "function" ? j = G[M] = k ? [Q, j] : [j, Q] : k ? j.unshift(Q) : j.push(Q), U = d(P), U > 0 && j.length > U && !j.warned) {
      j.warned = !0;
      var J = new Error("Possible EventEmitter memory leak detected. " + j.length + " " + String(M) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      J.name = "MaxListenersExceededWarning", J.emitter = P, J.type = M, J.count = j.length, n(J);
    }
    return P;
  }
  i.prototype.addListener = function(M, Q) {
    return _(this, M, Q, !1);
  }, i.prototype.on = i.prototype.addListener, i.prototype.prependListener = function(M, Q) {
    return _(this, M, Q, !0);
  };
  function A() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function g(P, M, Q) {
    var k = { fired: !1, wrapFn: void 0, target: P, type: M, listener: Q }, U = A.bind(k);
    return U.listener = Q, k.wrapFn = U, U;
  }
  i.prototype.once = function(M, Q) {
    return o(Q), this.on(M, g(this, M, Q)), this;
  }, i.prototype.prependOnceListener = function(M, Q) {
    return o(Q), this.prependListener(M, g(this, M, Q)), this;
  }, i.prototype.removeListener = function(M, Q) {
    var k, U, G, j, J;
    if (o(Q), U = this._events, U === void 0)
      return this;
    if (k = U[M], k === void 0)
      return this;
    if (k === Q || k.listener === Q)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete U[M], U.removeListener && this.emit("removeListener", M, k.listener || Q));
    else if (typeof k != "function") {
      for (G = -1, j = k.length - 1; j >= 0; j--)
        if (k[j] === Q || k[j].listener === Q) {
          J = k[j].listener, G = j;
          break;
        }
      if (G < 0)
        return this;
      G === 0 ? k.shift() : R(k, G), k.length === 1 && (U[M] = k[0]), U.removeListener !== void 0 && this.emit("removeListener", M, J || Q);
    }
    return this;
  }, i.prototype.off = i.prototype.removeListener, i.prototype.removeAllListeners = function(M) {
    var Q, k, U;
    if (k = this._events, k === void 0)
      return this;
    if (k.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : k[M] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete k[M]), this;
    if (arguments.length === 0) {
      var G = Object.keys(k), j;
      for (U = 0; U < G.length; ++U)
        j = G[U], j !== "removeListener" && this.removeAllListeners(j);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (Q = k[M], typeof Q == "function")
      this.removeListener(M, Q);
    else if (Q !== void 0)
      for (U = Q.length - 1; U >= 0; U--)
        this.removeListener(M, Q[U]);
    return this;
  };
  function y(P, M, Q) {
    var k = P._events;
    if (k === void 0)
      return [];
    var U = k[M];
    return U === void 0 ? [] : typeof U == "function" ? Q ? [U.listener || U] : [U] : Q ? F(U) : O(U, U.length);
  }
  i.prototype.listeners = function(M) {
    return y(this, M, !0);
  }, i.prototype.rawListeners = function(M) {
    return y(this, M, !1);
  }, i.listenerCount = function(P, M) {
    return typeof P.listenerCount == "function" ? P.listenerCount(M) : S.call(P, M);
  }, i.prototype.listenerCount = S;
  function S(P) {
    var M = this._events;
    if (M !== void 0) {
      var Q = M[P];
      if (typeof Q == "function")
        return 1;
      if (Q !== void 0)
        return Q.length;
    }
    return 0;
  }
  i.prototype.eventNames = function() {
    return this._eventsCount > 0 ? e(this._events) : [];
  };
  function O(P, M) {
    for (var Q = new Array(M), k = 0; k < M; ++k)
      Q[k] = P[k];
    return Q;
  }
  function R(P, M) {
    for (; M + 1 < P.length; M++)
      P[M] = P[M + 1];
    P.pop();
  }
  function F(P) {
    for (var M = new Array(P.length), Q = 0; Q < M.length; ++Q)
      M[Q] = P[Q].listener || P[Q];
    return M;
  }
  function z(P, M) {
    return new Promise(function(Q, k) {
      function U(j) {
        P.removeListener(M, G), k(j);
      }
      function G() {
        typeof P.removeListener == "function" && P.removeListener("error", U), Q([].slice.call(arguments));
      }
      V(P, M, G, { once: !0 }), M !== "error" && H(P, U, { once: !0 });
    });
  }
  function H(P, M, Q) {
    typeof P.on == "function" && V(P, "error", M, Q);
  }
  function V(P, M, Q, k) {
    if (typeof P.on == "function")
      k.once ? P.once(M, Q) : P.on(M, Q);
    else if (typeof P.addEventListener == "function")
      P.addEventListener(M, function U(G) {
        k.once && P.removeEventListener(M, U), Q(G);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof P);
  }
  return ma.exports;
}
var Wf = aB(), oB = Object.defineProperty, Be = (r, t) => oB(r, "name", { value: t, configurable: !0 }), cB = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", zs, dB = (zs = class {
  constructor(t, e, n, s, i, a = 0) {
    D(this, "left");
    D(this, "right");
    D(this, "parent");
    D(this, "hash");
    D(this, "data");
    D(this, "index");
    this.left = t, this.right = e, this.parent = n, this.hash = s, this.data = i, this.index = a;
  }
}, Be(zs, "Node"), zs), so = dB;
function kd(r) {
  return lr("0x00".concat(r.slice(2)));
}
Be(kd, "hashLeaf");
function Ud(r, t) {
  return lr("0x01".concat(r.slice(2)).concat(t.slice(2)));
}
Be(Ud, "hashNode");
function uB(r) {
  const t = [];
  for (let a = 0; a < r.length; a += 1) {
    const o = kd(r[a]), d = new so(-1, -1, -1, o, r[a]);
    d.index = a, t.push(d);
  }
  const e = [...t];
  let n = [...t], s = t.length + 1 >> 1, i = t.length & 1;
  for (; ; ) {
    let a = 0;
    for (; a < s - i; a += 1) {
      const o = a << 1, d = Ud(n[o].hash, n[o + 1].hash);
      t[a] = new so(n[o].index, n[o + 1].index, -1, d, "");
      const _ = e.length;
      t[a].index = _, e[n[o].index].parent = _, e[n[o + 1].index].parent = _, e.push(t[a]);
    }
    if (s === 1)
      break;
    i === 1 && (t[a] = n[a << 1]), i = s & 1, s = s + 1 >> 1, n = [...t];
  }
  return e;
}
Be(uB, "constructTree");
function zd(r) {
  if (!r.length)
    return cB;
  const t = [];
  for (let i = 0; i < r.length; i += 1) {
    const a = kd(r[i]);
    t.push(new so(-1, -1, -1, a, r[i]));
  }
  let e = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const a = i << 1, o = Ud(e[a].hash, e[a + 1].hash);
      t[i] = new so(e[a].index, e[a + 1].index, -1, o, "");
    }
    if (s === 1 && (t[i] = e[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, e = t;
  }
  return t[0].hash;
}
Be(zd, "calcRoot");
function hB(r, t) {
  const e = [];
  for (let n = t, s = r[t].parent; s !== -1; n = s, s = r[s].parent)
    r[s].left === n ? e.push(r[r[s].right].hash) : e.push(r[r[s].left].hash);
  return e;
}
Be(hB, "getProof");
var lB = "0x00", Xf = "0x01";
function Zf(r, t) {
  const e = "0x00".concat(r.slice(2)).concat(lr(t).slice(2));
  return [lr(e), e];
}
Be(Zf, "hashLeaf");
function cn(r, t) {
  const e = "0x01".concat(r.slice(2)).concat(t.slice(2));
  return [lr(e), e];
}
Be(cn, "hashNode");
function Ta(r) {
  const t = Xf.length;
  return ["0x".concat(r.slice(t, t + 64)), "0x".concat(r.slice(t + 64))];
}
Be(Ta, "parseLeaf");
function jf(r) {
  const t = Xf.length;
  return ["0x".concat(r.slice(t, t + 64)), "0x".concat(r.slice(t + 64))];
}
Be(jf, "parseNode");
function Na(r) {
  return r.slice(0, 4) === lB;
}
Be(Na, "isLeaf");
var Gs, _B = (Gs = class {
  constructor(t, e, n, s, i) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "BitMask");
    D(this, "NumSideNodes");
    D(this, "SiblingData");
    this.SideNodes = t, this.NonMembershipLeafData = e, this.BitMask = n, this.NumSideNodes = s, this.SiblingData = i;
  }
}, Be(Gs, "SparseCompactMerkleProof"), Gs), pB = _B, Vs, fB = (Vs = class {
  constructor(t, e, n) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "SiblingData");
    this.SideNodes = t, this.NonMembershipLeafData = e, this.SiblingData = n;
  }
}, Be(Vs, "SparseMerkleProof"), Vs), AB = fB, ke = "0x0000000000000000000000000000000000000000000000000000000000000000", Fr = 256;
function An(r, t) {
  const e = r.slice(2), n = "0x".concat(
    e.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
Be(An, "getBitAtFromMSB");
function Jf(r) {
  let t = 0, e = r.length - 1;
  const n = r;
  for (; t < e; )
    [n[t], n[e]] = [
      n[e],
      n[t]
    ], t += 1, e -= 1;
  return n;
}
Be(Jf, "reverseSideNodes");
function qf(r, t) {
  let e = 0;
  for (let n = 0; n < Fr && An(r, n) === An(t, n); n += 1)
    e += 1;
  return e;
}
Be(qf, "countCommonPrefix");
function $f(r) {
  const t = [], e = [];
  let n;
  for (let i = 0; i < r.SideNodes.length; i += 1)
    n = r.SideNodes[i], n === ke ? t.push(0) : (e.push(n), t.push(1));
  return new pB(
    e,
    r.NonMembershipLeafData,
    t,
    r.SideNodes.length,
    r.SiblingData
  );
}
Be($f, "compactProof");
var Ys, gB = (Ys = class {
  constructor() {
    D(this, "ms");
    D(this, "root");
    const t = {};
    this.ms = t, this.root = ke, this.ms[this.root] = ke;
  }
  get(t) {
    return this.ms[t];
  }
  set(t, e) {
    this.ms[t] = e;
  }
  setRoot(t) {
    this.root = t;
  }
  sideNodesForRoot(t, e) {
    const n = [];
    if (e === ke)
      return [n, ke, "", ""];
    let s = this.get(e);
    if (Na(s))
      return [n, e, s, ""];
    let i, a, o = "", d = "";
    for (let A = 0; A < Fr; A += 1) {
      if ([i, a] = jf(s), An(t, A) === 1 ? (d = i, o = a) : (d = a, o = i), n.push(d), o === ke) {
        s = "";
        break;
      }
      if (s = this.get(o), Na(s))
        break;
    }
    const _ = this.get(d);
    return [Jf(n), o, s, _];
  }
  deleteWithSideNodes(t, e, n, s) {
    if (n === ke)
      return this.root;
    const [i] = Ta(s);
    if (i !== t)
      return this.root;
    let a = "", o = "", d = "", _ = "", A = !1;
    for (let g = 0; g < e.length; g += 1)
      if (e[g] !== "") {
        if (d = e[g], o === "")
          if (_ = this.get(d), Na(_)) {
            a = d, o = d;
            continue;
          } else
            o = ke, A = !0;
        !A && d === ke || (A || (A = !0), An(t, e.length - 1 - g) === 1 ? [a, o] = cn(d, o) : [a, o] = cn(o, d), this.set(a, o), o = a);
      }
    return a === "" && (a = ke), a;
  }
  updateWithSideNodes(t, e, n, s, i) {
    let a, o;
    this.set(lr(e), e), [a, o] = Zf(t, e), this.set(a, o), o = a;
    let d;
    if (s === ke)
      d = Fr;
    else {
      const [_] = Ta(i);
      d = qf(t, _);
    }
    d !== Fr && (An(t, d) === 1 ? [a, o] = cn(s, o) : [a, o] = cn(o, s), this.set(a, o), o = a);
    for (let _ = 0; _ < Fr; _ += 1) {
      let A;
      const g = Fr - n.length;
      if (_ - g < 0 || n[_ - g] === "")
        if (d !== Fr && d > Fr - 1 - _)
          A = ke;
        else
          continue;
      else
        A = n[_ - g];
      An(t, Fr - 1 - _) === 1 ? [a, o] = cn(A, o) : [a, o] = cn(o, A), this.set(a, o), o = a;
    }
    return a;
  }
  update(t, e) {
    const [n, s, i] = this.sideNodesForRoot(t, this.root), a = this.updateWithSideNodes(t, e, n, s, i);
    this.setRoot(a);
  }
  delete(t) {
    const [e, n, s] = this.sideNodesForRoot(t, this.root), i = this.deleteWithSideNodes(t, e, n, s);
    this.setRoot(i);
  }
  prove(t) {
    const [e, n, s, i] = this.sideNodesForRoot(t, this.root), a = [];
    for (let _ = 0; _ < e.length; _ += 1)
      e[_] !== "" && a.push(e[_]);
    let o = "";
    if (n !== ke) {
      const [_] = Ta(s);
      _ !== t && (o = s);
    }
    return new AB(a, o, i);
  }
  proveCompacted(t) {
    const e = this.prove(t);
    return $f(e);
  }
}, Be(Ys, "SparseMerkleTree"), Ys), wB = Object.defineProperty, T = (r, t) => wB(r, "name", { value: t, configurable: !0 }), it = {
  eth: {
    mainnet: 1,
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    devnet: 0,
    testnet: 0,
    mainnet: 9889
  }
}, mB = /* @__PURE__ */ T((r) => {
  if (r === "ethereum")
    return it.eth.sepolia;
  if (r === "fuel")
    return it.fuel.testnet;
}, "getDefaultChainId"), yB = /* @__PURE__ */ T(({
  asset: r,
  chainId: t,
  networkType: e
}) => r.networks.find(
  (s) => s.chainId === t && s.type === e
), "getAssetNetwork"), Kf = /* @__PURE__ */ T(({
  asset: r,
  chainId: t,
  networkType: e
}) => {
  const { networks: n, ...s } = r, i = t ?? mB(e);
  if (i === void 0)
    return;
  const a = yB({
    asset: r,
    chainId: i,
    networkType: e
  });
  if (a)
    return {
      ...s,
      ...a
    };
}, "getAssetWithNetwork"), Vx = /* @__PURE__ */ T((r, t) => Kf({
  asset: r,
  networkType: "ethereum",
  chainId: t
}), "getAssetEth"), Yx = /* @__PURE__ */ T((r, t) => Kf({
  asset: r,
  networkType: "fuel",
  chainId: t
}), "getAssetFuel"), bB = "/", IB = /^\/|\/$/g, EB = /* @__PURE__ */ T((r = "") => r.replace(IB, ""), "trimPath");
function tA(r, ...t) {
  const e = r != null, n = (r == null ? void 0 : r[0]) === "/" && r.length > 1, s = [r, ...t].filter(Boolean).map(EB);
  return n && e && s.unshift(""), s.join(bB);
}
T(tA, "urlJoin");
function eA(r, t = "./") {
  return r.map((e) => ({
    ...e,
    icon: tA(t, e.icon)
  }));
}
T(eA, "resolveIconPaths");
var CB = "https://assets.fuel.network/providers/", vB = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: it.eth.foundry,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: it.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      }
    ]
  },
  {
    name: "WETH",
    symbol: "WETH",
    icon: "weth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xa38a5a8beeb08d95744bc7f58528073f4052b254def59eba20c99c202b5acaa3",
        decimals: 9
      }
    ]
  },
  {
    name: "weETH",
    symbol: "weETH",
    icon: "weETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x239ed6e12b7ce4089ee245244e3bf906999a6429c2a9a445a1e1faf56914a4ab",
        decimals: 9
      }
    ]
  },
  {
    name: "rsETH",
    symbol: "rsETH",
    icon: "rsETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xbae80f7fb8aa6b90d9b01ef726ec847cc4f59419c4d5f2ea88fec785d1b0e849",
        decimals: 9
      }
    ]
  },
  {
    name: "rETH",
    symbol: "rETH",
    icon: "reth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xae78736cd615f374d3085123a210448e74fc6393",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xf3f9a0ed0ce8eac5f89d6b83e41b3848212d5b5f56108c54a205bb228ca30c16",
        decimals: 9
      }
    ]
  },
  {
    name: "wbETH",
    symbol: "wbETH",
    icon: "wbeth.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xa2E3356610840701BDf5611a53974510Ae27E2e1",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x7843c74bef935e837f2bcf67b5d64ecb46dd53ff86375530b0caf3699e8ffafe",
        decimals: 9
      }
    ]
  },
  {
    name: "rstETH",
    symbol: "rstETH",
    icon: "rstETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x7a4EffD87C2f3C55CA251080b1343b605f327E3a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x962792286fbc9b1d5860b4551362a12249362c21594c77abf4b3fe2bbe8d977a",
        decimals: 9
      }
    ]
  },
  {
    name: "amphrETH",
    symbol: "amphrETH",
    icon: "amphrETH.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x5fD13359Ba15A84B76f7F87568309040176167cd",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x05fc623e57bd7bc1258efa8e4f62b05af5471d73df6f2c2dc11ecc81134c4f36",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mBTC",
    symbol: "Manta mBTC",
    icon: "manta-mbtc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x4041381e947CFD3D483d67a25C6aa9Dc924250c5",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xaf3111a248ff7a3238cdeea845bb2d43cf3835f1f6b8c9d28360728b55b9ce5b",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mETH",
    symbol: "Manta mETH",
    icon: "manta-meth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x8CdF550C04Bc9B9F10938368349C9c8051A772b6",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xafd219f513317b1750783c6581f55530d6cf189a5863fd18bd1b3ffcec1714b4",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mUSD",
    symbol: "Manta mUSD",
    icon: "manta-musd.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x3f24E1d7a973867fC2A03fE199E5502514E0e11E",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x89cb9401e55d49c3269654dd1cdfb0e80e57823a4a7db98ba8fc5953b120fef4",
        decimals: 9
      }
    ]
  },
  {
    name: "pumpBTC",
    symbol: "pumpBTC",
    icon: "pumpbtc.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x0aa5eb2bb97ca915288b653a2529355d4dc66de2b37533213f0e4aeee3d3421f",
        decimals: 8
      }
    ]
  },
  {
    name: "FBTC",
    symbol: "FBTC",
    icon: "fbtc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xc96de26018a54d51c097160568752c4e3bd6c364",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xb5ecb0a1e08e2abbabf624ffea089df933376855f468ade35c6375b00c33996a",
        decimals: 8
      }
    ]
  },
  {
    name: "SolvBTC",
    symbol: "SolvBTC",
    icon: "solvBTC.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1186afea9affb88809c210e13e2330b5258c2cef04bb8fff5eff372b7bd3f40f",
        decimals: 9
      }
    ]
  },
  {
    name: "SolvBTC.BBN",
    symbol: "SolvBTC.BBN",
    icon: "SolvBTC.BBN.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xd9d920aa40f578ab794426f5c90f6c731d159def",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x7a4f087c957d30218223c2baaaa365355c9ca81b6ea49004cfb1590a5399216f",
        decimals: 9
      }
    ]
  },
  {
    name: "Mantle mETH",
    symbol: "Mantle mETH",
    icon: "mantle-meth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x642a5db59ec323c2f846d4d4cf3e58d78aff64accf4f8f6455ba0aa3ef000a3b",
        decimals: 9
      }
    ]
  },
  {
    name: "sDAI",
    symbol: "sDAI",
    icon: "sdai.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x83f20f44975d03b1b09e64809b757c47f942beea",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x9e46f919fbf978f3cad7cd34cca982d5613af63ff8aab6c379e4faa179552958",
        decimals: 9
      }
    ]
  },
  {
    name: "USDT",
    symbol: "USDT",
    icon: "usdt.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xa0265fb5c32f6e8db3197af3c7eb05c48ae373605b8165b6f4a51c5b0ba4812e",
        decimals: 6
      }
    ]
  },
  {
    name: "USDC",
    symbol: "USDC",
    icon: "usdc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x286c479da40dc953bddc3bb4c453b608bba2e0ac483b077bd475174115395e6b",
        decimals: 6
      }
    ]
  },
  {
    name: "USDe",
    symbol: "USDe",
    icon: "USDe.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xb6133b2ef9f6153eb869125d23dcf20d1e735331b5e41b15a6a7a6cec70e8651",
        decimals: 9
      }
    ]
  },
  {
    name: "sUSDe",
    symbol: "sUSDe",
    icon: "sUSDe.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xd05563025104fc36496c15c7021ad6b31034b0e89a356f4f818045d1f48808bc",
        decimals: 9
      }
    ]
  },
  {
    name: "rsUSDe",
    symbol: "rsUSDe",
    icon: "rsUSDe.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x82f5104b23FF2FA54C2345F821dAc9369e9E0B26",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x78d4522ec607f6e8efb66ea49439d1ee48623cf763f9688a8eada025def033d9",
        decimals: 9
      }
    ]
  },
  {
    name: "wstETH",
    symbol: "wstETH",
    icon: "wsteth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1a7815cc9f75db5c24a5b0814bfb706bb9fe485333e98254015de8f48f84c67b",
        decimals: 9
      }
    ]
  },
  {
    name: "ezETH",
    symbol: "ezETH",
    icon: "ezeth.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x91b3559edb2619cde8ffb2aa7b3c3be97efd794ea46700db7092abeee62281b0",
        decimals: 9
      }
    ]
  },
  {
    name: "pzETH",
    symbol: "pzETH",
    icon: "pzETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x8c9532a60e0e7c6bbd2b2c1303f63ace1c3e9811",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1493d4ec82124de8f9b625682de69dcccda79e882b89a55a8c737b12de67bd68",
        decimals: 9
      }
    ]
  },
  {
    name: "Re7LRT",
    symbol: "Re7LRT",
    icon: "Re7LRT.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0x84631c0d0081FDe56DeB72F6DE77abBbF6A9f93a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xf2fc648c23a5db24610a1cf696acc4f0f6d9a7d6028dd9944964ab23f6e35995",
        decimals: 9
      }
    ]
  },
  {
    name: "steakLRT",
    symbol: "steakLRT",
    icon: "steakLRT.png",
    networks: [
      {
        type: "ethereum",
        chainId: it.eth.mainnet,
        address: "0xBEEF69Ac7870777598A04B2bd4771c71212E6aBc",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: it.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30",
        decimals: 9
      }
    ]
  }
], Hx = eA(vB, CB), rA = {
  mainnet: "https://mainnet-explorer.fuel.network",
  testnet: "https://explorer-indexer-testnet.fuel.network"
}, nA = /* @__PURE__ */ T(async (r, t) => {
  const e = await fetch(`${r}${t}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  try {
    return await e.json();
  } catch {
    return null;
  }
}, "request"), BB = /* @__PURE__ */ T((r) => {
  const t = new URLSearchParams();
  return Object.entries(r).forEach(([e, n]) => {
    t.set(e, n.toString());
  }), t.size > 0 ? `?${t.toString()}` : "";
}, "buildQueryString"), Wx = /* @__PURE__ */ T((r) => {
  const { network: t = "mainnet", assetId: e } = r, n = rA[t];
  return nA(n, `/assets/${e}`);
}, "getAssetById"), Xx = /* @__PURE__ */ T(async (r) => {
  const { network: t = "mainnet", owner: e, pagination: n = { last: 10 } } = r, s = rA[t], { last: i } = n, a = BB({ last: i }), o = await nA(s, `/accounts/${e}/assets${a}`);
  return o || { data: [], pageInfo: { count: 0 } };
}, "getAssetsByOwner"), Gd = /* @__PURE__ */ T((r) => {
  let t, e, n;
  return Array.isArray(r) ? (e = r[0], t = r[1], n = r[2] ?? void 0) : (e = r.amount, t = r.assetId, n = r.max ?? void 0), {
    assetId: X(t),
    amount: x(e),
    max: n ? x(n) : void 0
  };
}, "coinQuantityfy"), xB = /* @__PURE__ */ T((r) => {
  const { amount: t, assetId: e } = r, n = [...r.coinQuantities], s = n.findIndex((i) => i.assetId === e);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: e, amount: t }), n;
}, "addAmountToCoinQuantities"), Vd = K`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Yd = K`
    fragment receiptFragment on Receipt {
  id
  pc
  is
  to
  toAddress
  amount
  assetId
  gas
  param1
  param2
  val
  ptr
  digest
  reason
  ra
  rb
  rc
  rd
  len
  receiptType
  result
  gasUsed
  data
  sender
  recipient
  nonce
  contractId
  subId
}
    `, sA = K`
    fragment SuccessStatusFragment on SuccessStatus {
  type: __typename
  time
  programState {
    returnType
    data
  }
  receipts {
    ...receiptFragment
  }
  totalGas
  totalFee
}
    ${Yd}`, iA = K`
    fragment SuccessStatusWithBlockIdFragment on SuccessStatus {
  ...SuccessStatusFragment
  block {
    id
  }
}
    ${sA}`, RB = K`
    fragment malleableTransactionFieldsFragment on Transaction {
  receiptsRoot
  inputs {
    type: __typename
    ... on InputCoin {
      txPointer
    }
    ... on InputContract {
      txPointer
    }
  }
  outputs {
    type: __typename
    ... on CoinOutput {
      to
      amount
      assetId
    }
    ... on ContractOutput {
      inputIndex
      balanceRoot
      stateRoot
    }
    ... on ChangeOutput {
      to
      amount
      assetId
    }
    ... on VariableOutput {
      to
      amount
      assetId
    }
    ... on ContractCreated {
      contract
      stateRoot
    }
  }
}
    `, aA = K`
    fragment FailureStatusFragment on FailureStatus {
  type: __typename
  totalGas
  totalFee
  time
  reason
  receipts {
    ...receiptFragment
  }
}
    ${Yd}`, oA = K`
    fragment FailureStatusWithBlockIdFragment on FailureStatus {
  ...FailureStatusFragment
  block {
    id
  }
}
    ${aA}`, Hd = K`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, cA = K`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  ... on SubmittedStatus {
    ...SubmittedStatusFragment
  }
  ... on SuccessStatus {
    ...SuccessStatusWithBlockIdFragment
    transaction {
      ...malleableTransactionFieldsFragment
    }
  }
  ... on FailureStatus {
    ...FailureStatusWithBlockIdFragment
    transaction {
      ...malleableTransactionFieldsFragment
    }
  }
  ... on SqueezedOutStatus {
    ...SqueezedOutStatusFragment
  }
}
    ${Vd}
${iA}
${RB}
${oA}
${Hd}`, SB = K`
    fragment transactionStatusFragment on TransactionStatus {
  ... on SubmittedStatus {
    ...SubmittedStatusFragment
  }
  ... on SuccessStatus {
    ...SuccessStatusFragment
  }
  ... on FailureStatus {
    ...FailureStatusFragment
  }
  ... on SqueezedOutStatus {
    ...SqueezedOutStatusFragment
  }
}
    ${Vd}
${sA}
${aA}
${Hd}`, dA = K`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${SB}`, TB = K`
    fragment transactionRawPayloadFragment on Transaction {
  id
  rawPayload
}
    `, NB = K`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, uA = K`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${NB}`, DB = K`
    fragment dryRunFailureStatusFragment on DryRunFailureStatus {
  type: __typename
  totalGas
  totalFee
  reason
  programState {
    returnType
    data
  }
}
    `, FB = K`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, QB = K`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${DB}
${FB}`, OB = K`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${QB}
${Yd}`, Ro = K`
    fragment blockFragment on Block {
  id
  height
  header {
    time
    daHeight
    stateTransitionBytecodeVersion
    transactionsCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    prevRoot
    applicationHash
  }
  transactions {
    id
  }
}
    `, Wd = K`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, MB = K`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, hA = K`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  daHeight
}
    `, PB = K`
    fragment getMessageFragment on Message {
  ...messageFragment
  nonce
}
    ${hA}`, LB = K`
    fragment messageProofFragment on MessageProof {
  messageProof {
    proofSet
    proofIndex
  }
  blockProof {
    proofSet
    proofIndex
  }
  messageBlockHeader {
    version
    id
    daHeight
    consensusParametersVersion
    stateTransitionBytecodeVersion
    transactionsCount
    messageReceiptCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    height
    prevRoot
    time
    applicationHash
  }
  commitBlockHeader {
    version
    id
    daHeight
    consensusParametersVersion
    stateTransitionBytecodeVersion
    transactionsCount
    messageReceiptCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    height
    prevRoot
    time
    applicationHash
  }
  sender
  recipient
  amount
  data
}
    `, kB = K`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, UB = K`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, zB = K`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, GB = K`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, VB = K`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, YB = K`
    fragment DependentCostFragment on DependentCost {
  ... on LightOperation {
    type: __typename
    base
    unitsPerGas
  }
  ... on HeavyOperation {
    type: __typename
    base
    gasPerUnit
  }
}
    `, HB = K`
    fragment GasCostsFragment on GasCosts {
  contractRoot {
    ...DependentCostFragment
  }
  stateRoot {
    ...DependentCostFragment
  }
  vmInitialization {
    ...DependentCostFragment
  }
  s256 {
    ...DependentCostFragment
  }
  ecr1
  newStoragePerByte
}
    ${YB}`, WB = K`
    fragment consensusParametersFragment on ConsensusParameters {
  version
  txParams {
    ...TxParametersFragment
  }
  predicateParams {
    ...PredicateParametersFragment
  }
  scriptParams {
    ...ScriptParametersFragment
  }
  contractParams {
    ...ContractParametersFragment
  }
  feeParams {
    ...FeeParametersFragment
  }
  gasCosts {
    ...GasCostsFragment
  }
  baseAssetId
  chainId
}
    ${kB}
${UB}
${zB}
${GB}
${VB}
${HB}`, lA = K`
    fragment chainInfoFragment on ChainInfo {
  name
  daHeight
  consensusParameters {
    ...consensusParametersFragment
  }
}
    ${WB}`, XB = K`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Ri = K`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, _A = K`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
  indexation {
    balances
    coinsToSpend
    assetMetadata
  }
}
    `, ZB = K`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, jB = K`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, JB = K`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${_A}`, qB = K`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${lA}`, $B = K`
    query getChainAndNodeInfo {
  chain {
    ...chainInfoFragment
  }
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${lA}
${_A}`, KB = K`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${dA}`, t1 = K`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    id
    rawPayload
    status {
      ... on SubmittedStatus {
        ...SubmittedStatusFragment
      }
      ... on SuccessStatus {
        ...SuccessStatusWithBlockIdFragment
      }
      ... on FailureStatus {
        ...FailureStatusWithBlockIdFragment
      }
      ... on SqueezedOutStatus {
        ...SqueezedOutStatusFragment
      }
    }
  }
}
    ${Vd}
${iA}
${oA}
${Hd}`, e1 = K`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        rawPayload
      }
    }
    pageInfo {
      ...pageInfoFragment
    }
  }
}
    ${Ri}`, r1 = K`
    query getTransactionsByOwner($owner: Address!, $after: String, $before: String, $first: Int, $last: Int) {
  transactionsByOwner(
    owner: $owner
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${Ri}
${dA}`, n1 = K`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${uA}`, s1 = K`
    query estimatePredicatesAndGasPrice($encodedTransaction: HexString!, $blockHorizon: U32!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    ${uA}`, i1 = K`
    query getLatestBlock {
  chain {
    latestBlock {
      ...blockFragment
    }
  }
}
    ${Ro}`, a1 = K`
    query getLatestBlockHeight {
  chain {
    latestBlock {
      height
    }
  }
}
    `, o1 = K`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Ro}`, c1 = K`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionRawPayloadFragment
    }
  }
}
    ${Ro}
${TB}`, d1 = K`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Ri}
${Ro}`, u1 = K`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
    owner
  }
}
    ${Wd}`, h1 = K`
    query getCoins($filter: CoinFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  coins(
    filter: $filter
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...coinFragment
      }
    }
  }
}
    ${Ri}
${Wd}`, l1 = K`
    query getCoinsToSpend($owner: Address!, $queryPerAsset: [SpendQueryElementInput!]!, $excludedIds: ExcludeInput) {
  coinsToSpend(
    owner: $owner
    queryPerAsset: $queryPerAsset
    excludedIds: $excludedIds
  ) {
    ...coinFragment
    ...messageCoinFragment
  }
}
    ${Wd}
${MB}`, _1 = K`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, p1 = K`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${XB}`, f1 = K`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amount
  }
}
    `, A1 = K`
    query getBalanceV2($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amountU128
  }
}
    `, g1 = K`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, w1 = K`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, m1 = K`
    query getBalances($filter: BalanceFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  balances(
    filter: $filter
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    edges {
      node {
        assetId
        amount
      }
    }
  }
}
    `, y1 = K`
    query getBalancesV2($filter: BalanceFilterInput!, $after: String, $before: String, $first: Int, $last: Int, $supportsPagination: Boolean!) {
  balances(
    filter: $filter
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo @include(if: $supportsPagination) {
      ...pageInfoFragment
    }
    edges {
      node {
        assetId
        amountU128
      }
    }
  }
}
    ${Ri}`, b1 = K`
    query getMessages($owner: Address!, $after: String, $before: String, $first: Int, $last: Int) {
  messages(
    owner: $owner
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...getMessageFragment
      }
    }
  }
}
    ${Ri}
${PB}`, I1 = K`
    query daCompressedBlock($height: U32!) {
  daCompressedBlock(height: $height) {
    bytes
  }
}
    `, E1 = K`
    query getMessageProof($transactionId: TransactionId!, $nonce: Nonce!, $commitBlockId: BlockId, $commitBlockHeight: U32) {
  messageProof(
    transactionId: $transactionId
    nonce: $nonce
    commitBlockId: $commitBlockId
    commitBlockHeight: $commitBlockHeight
  ) {
    ...messageProofFragment
  }
}
    ${LB}`, C1 = K`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, v1 = K`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${ZB}`, B1 = K`
    query getAssetDetails($assetId: AssetId!) {
  assetDetails(id: $assetId) {
    subId
    contractId
    totalSupply
  }
}
    `, x1 = K`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${OB}`, R1 = K`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, S1 = K`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, T1 = K`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${hA}`, N1 = K`
    query isUserAccount($blobId: BlobId!, $contractId: ContractId!, $transactionId: TransactionId!) {
  blob(id: $blobId) {
    id
  }
  contract(id: $contractId) {
    id
  }
  transaction(id: $transactionId) {
    id
  }
}
    `, D1 = K`
    query getConsensusParametersVersion {
  chain {
    latestBlock {
      header {
        consensusParametersVersion
      }
    }
  }
}
    `, F1 = K`
    subscription submitAndAwaitStatus($encodedTransaction: HexString!) {
  submitAndAwaitStatus(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${cA}`, Q1 = K`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${cA}`;
function pA(r) {
  return {
    getVersion(t, e) {
      return r(jB, t, e);
    },
    getNodeInfo(t, e) {
      return r(JB, t, e);
    },
    getChain(t, e) {
      return r(qB, t, e);
    },
    getChainAndNodeInfo(t, e) {
      return r($B, t, e);
    },
    getTransaction(t, e) {
      return r(KB, t, e);
    },
    getTransactionWithReceipts(t, e) {
      return r(t1, t, e);
    },
    getTransactions(t, e) {
      return r(e1, t, e);
    },
    getTransactionsByOwner(t, e) {
      return r(r1, t, e);
    },
    estimatePredicates(t, e) {
      return r(n1, t, e);
    },
    estimatePredicatesAndGasPrice(t, e) {
      return r(s1, t, e);
    },
    getLatestBlock(t, e) {
      return r(i1, t, e);
    },
    getLatestBlockHeight(t, e) {
      return r(a1, t, e);
    },
    getBlock(t, e) {
      return r(o1, t, e);
    },
    getBlockWithTransactions(t, e) {
      return r(c1, t, e);
    },
    getBlocks(t, e) {
      return r(d1, t, e);
    },
    getCoin(t, e) {
      return r(u1, t, e);
    },
    getCoins(t, e) {
      return r(h1, t, e);
    },
    getCoinsToSpend(t, e) {
      return r(l1, t, e);
    },
    getContract(t, e) {
      return r(_1, t, e);
    },
    getContractBalance(t, e) {
      return r(p1, t, e);
    },
    getBalance(t, e) {
      return r(f1, t, e);
    },
    getBalanceV2(t, e) {
      return r(A1, t, e);
    },
    getLatestGasPrice(t, e) {
      return r(g1, t, e);
    },
    estimateGasPrice(t, e) {
      return r(w1, t, e);
    },
    getBalances(t, e) {
      return r(m1, t, e);
    },
    getBalancesV2(t, e) {
      return r(y1, t, e);
    },
    getMessages(t, e) {
      return r(b1, t, e);
    },
    daCompressedBlock(t, e) {
      return r(I1, t, e);
    },
    getMessageProof(t, e) {
      return r(E1, t, e);
    },
    getMessageStatus(t, e) {
      return r(C1, t, e);
    },
    getRelayedTransactionStatus(t, e) {
      return r(v1, t, e);
    },
    getAssetDetails(t, e) {
      return r(B1, t, e);
    },
    dryRun(t, e) {
      return r(x1, t, e);
    },
    submit(t, e) {
      return r(R1, t, e);
    },
    produceBlocks(t, e) {
      return r(S1, t, e);
    },
    getMessageByNonce(t, e) {
      return r(T1, t, e);
    },
    isUserAccount(t, e) {
      return r(N1, t, e);
    },
    getConsensusParametersVersion(t, e) {
      return r(D1, t, e);
    },
    submitAndAwaitStatus(t, e) {
      return r(F1, t, e);
    },
    statusChange(t, e) {
      return r(Q1, t, e);
    }
  };
}
T(pA, "getSdk");
var O1 = /* @__PURE__ */ T((r) => new RegExp(
  "the target cannot be met due to no coins available or exceeding the \\d+ coin limit."
  /* NOT_ENOUGH_COINS_MAX_COINS */
).test(r.message) ? new v(
  L.INSUFFICIENT_FUNDS_OR_MAX_COINS,
  "Insufficient funds or too many small value coins. Consider combining UTXOs.",
  {},
  r
) : new RegExp(
  "resource was not found in table"
  /* ASSET_NOT_FOUND */
).test(r.message) ? new v(
  L.ASSET_NOT_FOUND,
  "Asset not found for given asset id.",
  {},
  r
) : new v(L.INVALID_REQUEST, r.message, {}, r), "mapGqlErrorMessage"), y_ = /* @__PURE__ */ T((r, t) => t ? new v(
  r.code,
  `${r.message}

${t}`,
  r.metadata,
  r.rawError
) : r, "mapGqlErrorWithIncompatibleNodeVersion"), fA = /* @__PURE__ */ T((r, t = !1) => {
  if (!Array.isArray(r))
    return;
  const e = r.map(O1);
  if (e.length === 1)
    throw y_(e[0], t);
  const n = e.map((s) => s.message).join(`
`);
  throw y_(
    new v(L.INVALID_REQUEST, n, {}, e),
    t
  );
}, "assertGqlResponseHasNoErrors"), je, b_ = (je = class {
  constructor(t) {
    D(this, "events", []);
    D(this, "parsingLeftover", "");
    this.stream = t;
  }
  static async create(t) {
    const { url: e, query: n, variables: s, fetchFn: i } = t, a = await i(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: bf(n),
        variables: s
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    }), [o, d] = a.body.tee().map((_) => _.getReader());
    return await new je(o).next(), new je(d);
  }
  async next() {
    for (; ; ) {
      if (this.events.length > 0) {
        const { data: o, errors: d } = this.events.shift();
        return fA(d, je.incompatibleNodeVersionMessage), { value: o, done: !1 };
      }
      const { value: t, done: e } = await this.stream.read();
      if (e)
        return { value: t, done: e };
      const n = je.textDecoder.decode(t).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const s = `${this.parsingLeftover}${n}`, i = /data:.*\n\n/g, a = [...s.matchAll(i)].flatMap((o) => o);
      a.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new v(
            L.STREAM_PARSING_ERROR,
            `Error while parsing stream data response: ${s}`
          );
        }
      }), this.parsingLeftover = s.replace(a.join(), "");
    }
  }
  /**
   * Gets called when `break` is called in a `for-await-of` loop.
   */
  return() {
    return Promise.resolve({ done: !0, value: void 0 });
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}, T(je, "FuelGraphqlSubscriber"), D(je, "incompatibleNodeVersionMessage", !1), D(je, "textDecoder", new TextDecoder()), je), M1 = /* @__PURE__ */ T((r) => {
  const { type: t } = r;
  switch (r.type) {
    case Tt.Coin: {
      const e = Z(r.predicate ?? "0x"), n = Z(r.predicateData ?? "0x");
      return {
        type: Tt.Coin,
        txID: X(Z(r.id).slice(0, Lr)),
        outputIndex: Mr(Z(r.id).slice(Lr, La)),
        owner: X(r.owner),
        amount: x(r.amount),
        assetId: X(r.assetId),
        txPointer: {
          blockHeight: Mr(Z(r.txPointer).slice(0, 8)),
          txIndex: Mr(Z(r.txPointer).slice(8, 16))
        },
        witnessIndex: r.witnessIndex,
        predicateGasUsed: x(r.predicateGasUsed),
        predicateLength: x(e.length),
        predicateDataLength: x(n.length),
        predicate: X(e),
        predicateData: X(n)
      };
    }
    case Tt.Contract:
      return {
        type: Tt.Contract,
        txID: Rt,
        outputIndex: 0,
        balanceRoot: Rt,
        stateRoot: Rt,
        txPointer: {
          blockHeight: Mr(Z(r.txPointer).slice(0, 8)),
          txIndex: Mr(Z(r.txPointer).slice(8, 16))
        },
        contractID: X(r.contractId)
      };
    case Tt.Message: {
      const e = Z(r.predicate ?? "0x"), n = Z(r.predicateData ?? "0x"), s = Z(r.data ?? "0x");
      return {
        type: Tt.Message,
        sender: X(r.sender),
        recipient: X(r.recipient),
        amount: x(r.amount),
        nonce: X(r.nonce),
        witnessIndex: r.witnessIndex,
        predicateGasUsed: x(r.predicateGasUsed),
        predicateLength: x(e.length),
        predicateDataLength: x(n.length),
        predicate: X(e),
        predicateData: X(n),
        data: X(s),
        dataLength: s.length
      };
    }
    default:
      throw new v(
        L.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, "inputify"), P1 = /* @__PURE__ */ T((r) => {
  const { type: t } = r;
  switch (t) {
    case It.Coin:
      return {
        type: It.Coin,
        to: X(r.to),
        amount: x(r.amount),
        assetId: X(r.assetId)
      };
    case It.Contract:
      return {
        type: It.Contract,
        inputIndex: r.inputIndex,
        balanceRoot: Rt,
        stateRoot: Rt
      };
    case It.Change:
      return {
        type: It.Change,
        to: X(r.to),
        amount: x(0),
        assetId: X(r.assetId)
      };
    case It.Variable:
      return {
        type: It.Variable,
        to: Rt,
        amount: x(0),
        assetId: Rt
      };
    case It.ContractCreated:
      return {
        type: It.ContractCreated,
        contractId: X(r.contractId),
        stateRoot: X(r.stateRoot)
      };
    default:
      throw new v(
        L.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, "outputify"), I_ = /* @__PURE__ */ T((r) => !("data" in r), "isMessageCoin"), Zx = /* @__PURE__ */ T((r) => "utxoId" in r, "isRawCoin"), jx = /* @__PURE__ */ T((r) => "recipient" in r, "isRawMessage"), L1 = /* @__PURE__ */ T((r) => "id" in r, "isCoin"), Jx = /* @__PURE__ */ T((r) => "recipient" in r, "isMessage"), sd = /* @__PURE__ */ T((r) => {
  const { name: t, daHeight: e, consensusParameters: n } = r, {
    contractParams: s,
    feeParams: i,
    predicateParams: a,
    scriptParams: o,
    txParams: d,
    gasCosts: _,
    baseAssetId: A,
    chainId: g,
    version: y
  } = n;
  return {
    name: t,
    baseChainHeight: x(e),
    consensusParameters: {
      version: y,
      chainId: x(g),
      baseAssetId: A,
      feeParameters: {
        version: i.version,
        gasPerByte: x(i.gasPerByte),
        gasPriceFactor: x(i.gasPriceFactor)
      },
      contractParameters: {
        version: s.version,
        contractMaxSize: x(s.contractMaxSize),
        maxStorageSlots: x(s.maxStorageSlots)
      },
      txParameters: {
        version: d.version,
        maxInputs: x(d.maxInputs),
        maxOutputs: x(d.maxOutputs),
        maxWitnesses: x(d.maxWitnesses),
        maxGasPerTx: x(d.maxGasPerTx),
        maxSize: x(d.maxSize),
        maxBytecodeSubsections: x(d.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: a.version,
        maxPredicateLength: x(a.maxPredicateLength),
        maxPredicateDataLength: x(a.maxPredicateDataLength),
        maxGasPerPredicate: x(a.maxGasPerPredicate),
        maxMessageDataLength: x(a.maxMessageDataLength)
      },
      scriptParameters: {
        version: o.version,
        maxScriptLength: x(o.maxScriptLength),
        maxScriptDataLength: x(o.maxScriptDataLength)
      },
      gasCosts: _
    }
  };
}, "deserializeChain"), k1 = /* @__PURE__ */ T((r) => {
  const { name: t, baseChainHeight: e, consensusParameters: n } = r, {
    contractParameters: s,
    feeParameters: i,
    predicateParameters: a,
    scriptParameters: o,
    txParameters: d,
    gasCosts: _,
    baseAssetId: A,
    chainId: g,
    version: y
  } = n;
  return {
    name: t,
    daHeight: e.toString(),
    consensusParameters: {
      version: y,
      chainId: g.toString(),
      baseAssetId: A,
      feeParams: {
        version: i.version,
        gasPerByte: i.gasPerByte.toString(),
        gasPriceFactor: i.gasPriceFactor.toString()
      },
      contractParams: {
        version: s.version,
        contractMaxSize: s.contractMaxSize.toString(),
        maxStorageSlots: s.maxStorageSlots.toString()
      },
      txParams: {
        version: d.version,
        maxInputs: d.maxInputs.toString(),
        maxOutputs: d.maxOutputs.toString(),
        maxWitnesses: d.maxWitnesses.toString(),
        maxGasPerTx: d.maxGasPerTx.toString(),
        maxSize: d.maxSize.toString(),
        maxBytecodeSubsections: d.maxBytecodeSubsections.toString()
      },
      predicateParams: {
        version: a.version,
        maxPredicateLength: a.maxPredicateLength.toString(),
        maxPredicateDataLength: a.maxPredicateDataLength.toString(),
        maxGasPerPredicate: a.maxGasPerPredicate.toString(),
        maxMessageDataLength: a.maxMessageDataLength.toString()
      },
      scriptParams: {
        version: o.version,
        maxScriptLength: o.maxScriptLength.toString(),
        maxScriptDataLength: o.maxScriptDataLength.toString()
      },
      gasCosts: _
    }
  };
}, "serializeChain"), id = /* @__PURE__ */ T((r) => {
  const { maxDepth: t, maxTx: e, nodeVersion: n, utxoValidation: s, vmBacktrace: i, indexation: a } = r;
  return {
    maxDepth: x(t),
    maxTx: x(e),
    nodeVersion: n,
    utxoValidation: s,
    vmBacktrace: i,
    indexation: a
  };
}, "deserializeNodeInfo"), U1 = /* @__PURE__ */ T((r) => {
  const { maxDepth: t, maxTx: e, nodeVersion: n, utxoValidation: s, vmBacktrace: i, indexation: a } = r;
  return {
    maxDepth: t.toString(),
    maxTx: e.toString(),
    nodeVersion: n,
    utxoValidation: s,
    vmBacktrace: i,
    indexation: a
  };
}, "serializeNodeInfo"), z1 = /* @__PURE__ */ T((r) => ({
  consensusParametersTimestamp: r.consensusParametersTimestamp,
  chain: sd(r.chain),
  nodeInfo: id(r.nodeInfo)
}), "deserializeProviderCache"), G1 = /* @__PURE__ */ T(async (r) => ({
  consensusParametersTimestamp: r.consensusParametersTimestamp,
  chain: k1(await r.getChain()),
  nodeInfo: U1(await r.getNode())
}), "serializeProviderCache"), Dt = /* @__PURE__ */ T((r) => r || Rt, "hexOrZero"), dr = /* @__PURE__ */ T((r) => {
  const { receiptType: t } = r;
  switch (t) {
    case "CALL": {
      const e = Dt(r.id || r.contractId);
      return {
        type: dt.Call,
        id: e,
        to: Dt(r == null ? void 0 : r.to),
        amount: x(r.amount),
        assetId: Dt(r.assetId),
        gas: x(r.gas),
        param1: x(r.param1),
        param2: x(r.param2),
        pc: x(r.pc),
        is: x(r.is)
      };
    }
    case "RETURN":
      return {
        type: dt.Return,
        id: Dt(r.id || r.contractId),
        val: x(r.val),
        pc: x(r.pc),
        is: x(r.is)
      };
    case "RETURN_DATA":
      return {
        type: dt.ReturnData,
        id: Dt(r.id || r.contractId),
        ptr: x(r.ptr),
        len: x(r.len),
        digest: Dt(r.digest),
        pc: x(r.pc),
        data: Dt(r.data),
        is: x(r.is)
      };
    case "PANIC":
      return {
        type: dt.Panic,
        id: Dt(r.id),
        reason: x(r.reason),
        pc: x(r.pc),
        is: x(r.is),
        contractId: Dt(r.contractId)
      };
    case "REVERT":
      return {
        type: dt.Revert,
        id: Dt(r.id || r.contractId),
        val: x(r.ra),
        pc: x(r.pc),
        is: x(r.is)
      };
    case "LOG": {
      const e = x(r.ra), n = x(r.rb), s = x(r.rc), i = x(r.rd);
      return {
        type: dt.Log,
        id: Dt(r.id || r.contractId),
        ra: e,
        rb: n,
        rc: s,
        rd: i,
        pc: x(r.pc),
        is: x(r.is)
      };
    }
    case "LOG_DATA": {
      const e = x(r.ra), n = x(r.rb);
      return {
        type: dt.LogData,
        id: Dt(r.id || r.contractId),
        ra: e,
        rb: n,
        ptr: x(r.ptr),
        len: x(r.len),
        digest: Dt(r.digest),
        pc: x(r.pc),
        data: Dt(r.data),
        is: x(r.is)
      };
    }
    case "TRANSFER": {
      const e = Dt(r.id || r.contractId);
      return {
        type: dt.Transfer,
        id: e,
        to: Dt(r.toAddress || (r == null ? void 0 : r.to)),
        amount: x(r.amount),
        assetId: Dt(r.assetId),
        pc: x(r.pc),
        is: x(r.is)
      };
    }
    case "TRANSFER_OUT": {
      const e = Dt(r.id || r.contractId);
      return {
        type: dt.TransferOut,
        id: e,
        to: Dt(r.toAddress || r.to),
        amount: x(r.amount),
        assetId: Dt(r.assetId),
        pc: x(r.pc),
        is: x(r.is)
      };
    }
    case "SCRIPT_RESULT":
      return {
        type: dt.ScriptResult,
        result: x(r.result),
        gasUsed: x(r.gasUsed)
      };
    case "MESSAGE_OUT": {
      const e = Dt(r.sender), n = Dt(r.recipient), s = Dt(r.nonce), i = x(r.amount), a = r.data ? Z(r.data) : Uint8Array.from([]), o = Dt(r.digest), d = x(r.len).toNumber(), _ = pn.getMessageId({
        sender: e,
        recipient: n,
        nonce: s,
        amount: i,
        data: X(a)
      });
      return {
        type: dt.MessageOut,
        sender: e,
        recipient: n,
        amount: i,
        nonce: s,
        len: d,
        data: a,
        digest: o,
        messageId: _
      };
    }
    case "MINT": {
      const e = Dt(r.id || r.contractId), n = Dt(r.subId), s = Xc(e, n);
      return {
        type: dt.Mint,
        subId: n,
        contractId: e,
        assetId: s,
        val: x(r.val),
        pc: x(r.pc),
        is: x(r.is)
      };
    }
    case "BURN": {
      const e = Dt(r.id || r.contractId), n = Dt(r.subId), s = Xc(e, n);
      return {
        type: dt.Burn,
        subId: n,
        contractId: e,
        assetId: s,
        val: x(r.val),
        pc: x(r.pc),
        is: x(r.is)
      };
    }
    default:
      throw new v(L.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}, "deserializeReceipt"), V1 = /* @__PURE__ */ T((r) => r.type === dt.Revert && r.val.toString("hex") === Cf, "doesReceiptHaveMissingOutputVariables"), Y1 = /* @__PURE__ */ T((r) => r.type === dt.Panic && r.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", "doesReceiptHaveMissingContractId"), E_ = /* @__PURE__ */ T((r) => r.reduce(
  (t, e) => (V1(e) && t.missingOutputVariables.push(e), Y1(e) && t.missingOutputContractIds.push(e), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), "getReceiptsWithMissingData"), qx = /* @__PURE__ */ T((r) => dr(r), "assembleReceiptByType"), H1 = "https://app.fuel.network", W1 = /* @__PURE__ */ T((r, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[r] || r}/${t}`, "getPathFromInput"), $x = /* @__PURE__ */ T((r = {}) => {
  const { blockExplorerUrl: t, path: e, providerUrl: n, address: s, txId: i, blockNumber: a } = r, o = t || H1, d = [
    {
      key: "address",
      value: s
    },
    {
      key: "txId",
      value: i
    },
    {
      key: "blockNumber",
      value: a
    }
  ], _ = d.filter((P) => !!P.value).map(({ key: P, value: M }) => ({
    key: P,
    value: M
  })), A = _.length > 0;
  if (_.length > 1)
    throw new v(
      L.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((P) => P.key).join(", ")}.`
    );
  if (e && _.length > 0) {
    const P = d.map(({ key: M }) => M).join(", ");
    throw new v(
      L.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${P}.`
    );
  }
  const g = A ? W1(
    _[0].key,
    _[0].value
  ) : "", y = /^\/|\/$/gm, S = e ? e.replace(y, "") : g, O = o.replace(y, ""), R = n == null ? void 0 : n.replace(y, ""), F = R ? encodeURIComponent(R) : void 0, z = O.match(/^https?:\/\//) ? "" : "https://", H = R != null && R.match(/^https?:\/\//) ? "" : "https://";
  return `${z}${O}/${S}${F ? `?providerUrl=${H}${F}` : ""}`;
}, "buildBlockExplorerUrl"), So = /* @__PURE__ */ T((r) => r.filter(
  (n) => n.type === dt.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), x(0)), "getGasUsedFromReceipts");
function Te(r, t) {
  const e = x(t.base);
  let n = x(0);
  return "unitsPerGas" in t ? n = x(r).div(x(t.unitsPerGas)) : n = x(r).mul(x(t.gasPerUnit)), e.add(n);
}
T(Te, "resolveGasDependentCosts");
function AA(r, t, e) {
  const n = [], s = r.filter((o) => {
    if ("owner" in o || "sender" in o) {
      if ("predicate" in o && o.predicate && o.predicate !== "0x")
        return !0;
      if (!n.includes(o.witnessIndex))
        return n.push(o.witnessIndex), !0;
    }
    return !1;
  }), i = Te(t, e.vmInitialization);
  return s.reduce((o, d) => "predicate" in d && d.predicate && d.predicate !== "0x" ? o.add(
    i.add(Te(Z(d.predicate).length, e.contractRoot)).add(x(d.predicateGasUsed))
  ) : o.add(e.ecr1), x(0));
}
T(AA, "gasUsedByInputs");
function Xd(r) {
  const { gasCosts: t, gasPerByte: e, inputs: n, metadataGas: s, txBytesSize: i } = r, a = Te(i, t.vmInitialization), o = x(i).mul(e), d = AA(n, i, t);
  return a.add(o).add(d).add(s).maxU64();
}
T(Xd, "getMinGas");
function To(r) {
  const {
    gasPerByte: t,
    witnessesLength: e,
    witnessLimit: n,
    minGas: s,
    gasLimit: i = x(0),
    maxGasPerTx: a
  } = r;
  let o = x(0);
  n != null && n.gt(0) && n.gte(e) && (o = x(n).sub(e).mul(t));
  const d = o.add(s).add(i);
  return d.gte(a) ? a : d;
}
T(To, "getMaxGas");
function Zd({
  gasCosts: r,
  stateRootSize: t,
  txBytesSize: e,
  contractBytesSize: n
}) {
  const s = Te(n, r.contractRoot), i = Te(t, r.stateRoot), a = Te(e, r.s256), o = x(100), d = Te(o, r.s256);
  return s.add(i).add(a).add(d).maxU64();
}
T(Zd, "calculateMetadataGasForTxCreate");
function jd({
  gasCosts: r,
  txBytesSize: t
}) {
  return Te(t, r.s256);
}
T(jd, "calculateMetadataGasForTxScript");
function gA({
  gasCosts: r,
  txBytesSize: t,
  witnessBytesSize: e
}) {
  const n = Te(t, r.s256), s = Te(e, r.s256);
  return n.add(s);
}
T(gA, "calculateMetadataGasForTxBlob");
function ad({
  gasCosts: r,
  txBytesSize: t,
  consensusSize: e
}) {
  const n = Te(t, r.s256);
  if (e) {
    const s = Te(e, r.s256);
    n.add(s);
  }
  return n;
}
T(ad, "calculateMetadataGasForTxUpgrade");
function wA({
  gasCosts: r,
  txBytesSize: t,
  subsectionSize: e,
  subsectionsSize: n
}) {
  const s = Te(t, r.s256), i = Te(e, r.s256);
  s.add(i);
  const a = Te(n, r.stateRoot);
  return s.add(a), s;
}
T(wA, "calculateMetadataGasForTxUpload");
function mA({
  gasCosts: r,
  baseMinGas: t,
  subsectionSize: e
}) {
  const n = x(r.newStoragePerByte).mul(e);
  return x(t).add(n);
}
T(mA, "calculateMinGasForTxUpload");
var Ii = /* @__PURE__ */ T((r) => {
  const { gas: t, gasPrice: e, priceFactor: n, tip: s } = r;
  return t.mul(e).div(n).add(x(s));
}, "calculateGasFee");
function io(r) {
  return Object.keys(r).forEach((t) => {
    var e;
    switch ((e = r[t]) == null ? void 0 : e.constructor.name) {
      case "Uint8Array":
        r[t] = X(r[t]);
        break;
      case "Array":
        r[t] = io(r[t]);
        break;
      case "BN":
        r[t] = r[t].toHex();
        break;
      case "Address":
        r[t] = r[t].toB256();
        break;
      case "Object":
        r[t] = io(r[t]);
        break;
    }
  }), r;
}
T(io, "normalize");
function yA(r) {
  return io(Ne(r));
}
T(yA, "normalizeJSON");
var X1 = /* @__PURE__ */ T((r, t) => {
  let e = `The transaction reverted with reason: "${r}".`;
  return fb.includes(r) && (e = `${e}

You can read more about this error at:

${Ab}#variant.${r}`), new v(L.SCRIPT_REVERTED, e, {
    ...t,
    reason: r
  });
}, "assemblePanicError"), Mi = /* @__PURE__ */ T((r) => JSON.stringify(r, null, 2), "stringify"), Z1 = /* @__PURE__ */ T((r, t, e) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = r.find(({ type: a }) => a === dt.Revert);
  let i = "";
  if (s) {
    const a = x(s.val).toHex(), o = t[t.length - 1], d = t[t.length - 2];
    switch (a) {
      case hb: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Mi(o) : "an error."}.`;
        break;
      }
      case lb: {
        const _ = t.length >= 2 ? ` comparing ${Mi(o)} and ${Mi(d)}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${_}`;
        break;
      }
      case pb: {
        const _ = t.length >= 2 ? ` comparing ${Mi(d)} and ${Mi(o)}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${_}`;
        break;
      }
      case _b:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case Cf:
        i = "MissingOutputVariable", n = `The transaction reverted because it's missing an "OutputVariable".`;
        break;
      default:
        throw new v(
          L.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...e,
            reason: "unknown"
          }
        );
    }
  }
  return new v(L.SCRIPT_REVERTED, n, {
    ...e,
    reason: i
  });
}, "assembleRevertError"), Jd = /* @__PURE__ */ T((r) => {
  const { receipts: t, statusReason: e, logs: n, groupedLogs: s } = r, i = t.some(({ type: d }) => d === dt.Panic), a = t.some(({ type: d }) => d === dt.Revert), o = {
    logs: n,
    groupedLogs: s,
    receipts: t,
    panic: i,
    revert: a,
    reason: ""
  };
  return i ? X1(e, o) : Z1(t, n, o);
}, "extractTxError"), Hs, Kx = (Hs = class extends Error {
  constructor() {
    super(...arguments);
    D(this, "name", "ChangeOutputCollisionError");
    D(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, T(Hs, "ChangeOutputCollisionError"), Hs), Ws, j1 = (Ws = class extends Error {
  constructor(e) {
    super();
    D(this, "name", "NoWitnessAtIndexError");
    this.index = e, this.message = `Witness at index "${e}" was not found`;
  }
}, T(Ws, "NoWitnessAtIndexError"), Ws), Xs, tR = (Xs = class extends Error {
  constructor(e) {
    super();
    D(this, "name", "NoWitnessByOwnerError");
    this.owner = e, this.message = `A witness for the given owner "${e}" was not found`;
  }
}, T(Xs, "NoWitnessByOwnerError"), Xs), kr = /* @__PURE__ */ T((r) => r.type === Tt.Coin, "isRequestInputCoin"), No = /* @__PURE__ */ T((r) => r.type === Tt.Message, "isRequestInputMessage"), bA = /* @__PURE__ */ T((r) => r.type === Tt.Message && x(r.data).isZero(), "isRequestInputMessageWithoutData"), Do = /* @__PURE__ */ T((r) => kr(r) || No(r), "isRequestInputCoinOrMessage"), zn = /* @__PURE__ */ T((r) => kr(r) || bA(r), "isRequestInputResource"), IA = /* @__PURE__ */ T((r) => kr(r) ? r.owner : r.recipient, "getRequestInputResourceOwner"), od = /* @__PURE__ */ T((r, t) => IA(r) === t.toB256(), "isRequestInputResourceFromOwner"), C_ = /* @__PURE__ */ T((r) => Do(r) && !!r.predicate && X(r.predicate) !== "0x", "isPredicate"), J1 = /* @__PURE__ */ T((r, t, e) => r.filter(zn).reduce((n, s) => kr(s) && s.assetId === t || No(s) && t === e ? n.add(s.amount) : n, x(0)), "getAssetAmountInRequestInputs"), eR = /* @__PURE__ */ T((r) => r.filter(zn).reduce(
  (t, e) => (kr(e) ? t.utxos.push(e.id) : t.messages.push(e.nonce), t),
  {
    utxos: [],
    messages: []
  }
), "cacheRequestInputsResources"), q1 = /* @__PURE__ */ T((r, t) => r.reduce(
  (e, n) => (kr(n) && n.owner === t.toB256() ? e.utxos.push(n.id) : No(n) && n.recipient === t.toB256() && e.messages.push(n.nonce), e),
  {
    utxos: [],
    messages: []
  }
), "cacheRequestInputsResourcesFromOwner"), $1 = /* @__PURE__ */ T((r, t) => {
  const { inputs: e, outputs: n } = t, s = new Set(e.filter(kr).map((o) => o.assetId));
  e.some((o) => No(o) && x(o.amount).gt(0)) && s.add(r);
  const i = new Set(
    n.filter((o) => o.type === It.Change).map((o) => o.assetId)
  );
  return new Set([...s].filter((o) => !i.has(o))).size;
}, "getBurnableAssetCount"), EA = /* @__PURE__ */ T((r, t, e = !1) => {
  if (e === !0 || $1(r, t) <= 0)
    return;
  const n = [
    "Asset burn detected.",
    "Add the relevant change outputs to the transaction to avoid burning assets.",
    "Or enable asset burn, upon sending the transaction."
  ].join(`
`);
  throw new v(L.ASSET_BURN_DETECTED, n);
}, "validateTransactionForAssetBurn"), K1 = /* @__PURE__ */ T((r) => {
  const t = Z(r);
  return {
    data: X(t),
    dataLength: t.length
  };
}, "witnessify"), Sn, ha = (Sn = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    tip: t,
    maturity: e,
    expiration: n,
    maxFee: s,
    witnessLimit: i,
    inputs: a,
    outputs: o,
    witnesses: d
  } = {}) {
    /** Gas price for transaction */
    D(this, "tip");
    /** Block until which tx cannot be included */
    D(this, "maturity");
    /** The block number after which the transaction is no longer valid. */
    D(this, "expiration");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    D(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    D(this, "witnessLimit");
    /** List of inputs */
    D(this, "inputs", []);
    /** List of outputs */
    D(this, "outputs", []);
    /** List of witnesses */
    D(this, "witnesses", []);
    /**
     * @hidden
     *
     * The current status of the transaction
     */
    D(this, "flag", { state: void 0, transactionId: void 0, summary: void 0 });
    this.tip = t ? x(t) : void 0, this.maturity = e && e > 0 ? e : void 0, this.expiration = n && n > 0 ? n : void 0, this.witnessLimit = qe(i) ? x(i) : void 0, this.maxFee = x(s), this.inputs = a ?? [], this.outputs = o ?? [], this.witnesses = d ?? [];
  }
  static getPolicyMeta(t) {
    let e = 0;
    const n = [], { tip: s, witnessLimit: i, maturity: a, expiration: o } = t;
    return x(s).gt(0) && (e += Ue.Tip, n.push({ data: x(s), type: Ue.Tip })), qe(i) && x(i).gte(0) && (e += Ue.WitnessLimit, n.push({ data: x(i), type: Ue.WitnessLimit })), a && a > 0 && (e += Ue.Maturity, n.push({ data: a, type: Ue.Maturity })), e += Ue.MaxFee, n.push({ data: t.maxFee, type: Ue.MaxFee }), o && o > 0 && (e += Ue.Expiration, n.push({ data: o, type: Ue.Expiration })), {
      policyTypes: e,
      policies: n
    };
  }
  /**
   * Method to obtain the base transaction details.
   *
   * @returns The base transaction details.
   */
  getBaseTransaction() {
    var a, o, d;
    const t = ((a = this.inputs) == null ? void 0 : a.map(M1)) ?? [], e = ((o = this.outputs) == null ? void 0 : o.map(P1)) ?? [], n = ((d = this.witnesses) == null ? void 0 : d.map(K1)) ?? [], { policyTypes: s, policies: i } = Sn.getPolicyMeta(this);
    return {
      policyTypes: s,
      inputs: t,
      outputs: e,
      policies: i,
      witnesses: n,
      inputsCount: t.length,
      outputsCount: e.length,
      witnessesCount: n.length
    };
  }
  /**
   * Converts the transaction request to a byte array.
   *
   * @returns The transaction bytes.
   */
  toTransactionBytes() {
    return new Er().encode(this.toTransaction());
  }
  /**
   * @hidden
   *
   * Pushes an input to the list without any side effects and returns the index
   */
  pushInput(t) {
    return this.inputs.push(t), this.inputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes an output to the list without any side effects and returns the index
   */
  pushOutput(t) {
    return this.outputs.push(t), this.outputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes a witness to the list and returns the index
   *
   * @param signature - The signature to add to the witness.
   * @returns The index of the created witness.
   */
  addWitness(t) {
    return this.witnesses.push(t), this.witnesses.length - 1;
  }
  /**
   * @hidden
   *
   * Creates an empty witness without any side effects and returns the index
   *
   * @returns The index of the created witness.
   */
  addEmptyWitness() {
    return this.addWitness(ot([Rt, Rt]));
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(t, e) {
    const n = new gt(t), s = this.getCoinInputWitnessIndexByOwner(n);
    typeof s == "number" && this.updateWitness(s, e);
  }
  /**
   * Updates an existing witness without any side effects.
   *
   * @param index - The index of the witness to update.
   * @param witness - The new witness.
   * @throws If the witness does not exist.
   */
  updateWitness(t, e) {
    if (!this.witnesses[t])
      throw new j1(t);
    this.witnesses[t] = e;
  }
  /**
   * Helper function to add an external signature to the transaction.
   *
   * @param account - The account/s to sign to the transaction.
   * @returns The transaction with the signature witness added.
   */
  async addAccountWitnesses(t) {
    const e = Array.isArray(t) ? t : [t];
    return await Promise.all(
      e.map(async (n) => {
        this.addWitness(await n.signTransaction(this));
      })
    ), this;
  }
  /**
   * Gets the coin inputs for a transaction.
   *
   * @returns The coin inputs.
   */
  getCoinInputs() {
    return this.inputs.filter(
      (t) => t.type === Tt.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (t) => t.type === It.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (t) => t.type === It.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(t) {
    const e = ki(t), n = this.inputs.find((s) => {
      switch (s.type) {
        case Tt.Coin:
          return X(s.owner) === e.toB256();
        case Tt.Message:
          return X(s.recipient) === e.toB256();
        default:
          return !1;
      }
    });
    return n == null ? void 0 : n.witnessIndex;
  }
  /**
   * Adds a single coin input to the transaction and a change output for the related
   * assetId, if one it was not added yet.
   *
   * @param coin - Coin resource.
   */
  addCoinInput(t) {
    const { assetId: e, owner: n, amount: s, id: i, predicate: a, predicateData: o } = t;
    let d;
    t.predicate ? d = 0 : (d = this.getCoinInputWitnessIndexByOwner(n), typeof d != "number" && (d = this.addEmptyWitness()));
    const _ = {
      id: i,
      type: Tt.Coin,
      owner: n.toB256(),
      amount: s,
      assetId: e,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: d,
      predicate: a,
      predicateData: o
    };
    this.pushInput(_), this.addChangeOutput(n, e);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(t) {
    const { recipient: e, sender: n, amount: s, predicate: i, nonce: a, predicateData: o } = t;
    let d;
    t.predicate ? d = 0 : (d = this.getCoinInputWitnessIndexByOwner(e), typeof d != "number" && (d = this.addEmptyWitness()));
    const _ = {
      nonce: a,
      type: Tt.Message,
      sender: n.toB256(),
      recipient: e.toB256(),
      data: I_(t) ? "0x" : t.data,
      amount: s,
      witnessIndex: d,
      predicate: i,
      predicateData: o
    };
    this.pushInput(_), I_(t) && this.addChangeOutput(e, t.assetId);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(t) {
    return L1(t) ? this.addCoinInput(t) : this.addMessageInput(t), this;
  }
  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addResources(t) {
    return t.forEach((e) => this.addResource(e)), this;
  }
  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(t, e, n) {
    return this.pushOutput({
      type: It.Coin,
      to: ki(t).toB256(),
      amount: e,
      assetId: n
    }), this;
  }
  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
  addCoinOutputs(t, e) {
    return e.map(Gd).forEach((n) => {
      this.pushOutput({
        type: It.Coin,
        to: ki(t).toB256(),
        amount: n.amount,
        assetId: n.assetId
      });
    }), this;
  }
  /**
   * Adds a change output to the transaction.
   *
   * @param to - Address of the owner.
   * @param assetId - Asset ID of coin.
   */
  addChangeOutput(t, e) {
    this.getChangeOutputs().find(
      (s) => X(s.assetId) === e
    ) || this.pushOutput({
      type: It.Change,
      to: ki(t).toB256(),
      assetId: e
    });
  }
  /**
   * @hidden
   */
  byteSize() {
    return this.toTransactionBytes().length;
  }
  /**
   * @hidden
   */
  metadataGas(t) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(t) {
    const { consensusParameters: e } = t, {
      gasCosts: n,
      feeParameters: { gasPerByte: s }
    } = e;
    return Xd({
      gasPerByte: s,
      gasCosts: n,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(n)
    });
  }
  calculateMaxGas(t, e) {
    const { consensusParameters: n } = t, {
      feeParameters: { gasPerByte: s },
      txParameters: { maxGasPerTx: i }
    } = n, a = this.toTransaction().witnesses.reduce(
      (o, d) => o + d.dataLength,
      0
    );
    return To({
      gasPerByte: s,
      minGas: e,
      witnessesLength: a,
      witnessLimit: this.witnessLimit,
      maxGasPerTx: i
    });
  }
  /**
   * Funds the transaction with fake UTXOs for each assetId and amount in the
   * quantities array.
   *
   * @param quantities - CoinQuantity Array.
   * @param baseAssetId - The base asset to fund the transaction.
   * @deprecated - This method is deprecated and will be removed in future versions.
   * Please use `Account.generateFakeResources` along with `this.addResources` instead.
   */
  fundWithFakeUtxos(t, e, n) {
    const s = /* @__PURE__ */ T((a) => this.inputs.find((o) => "assetId" in o ? o.assetId === a : !1), "findAssetInput"), i = /* @__PURE__ */ T((a, o) => {
      const d = s(a);
      let _ = o;
      a === e && (_ = x("1000000000000000000")), d && "assetId" in d ? (d.id = X($e(La)), d.amount = _) : this.addResources([
        {
          id: X($e(La)),
          amount: _,
          assetId: a,
          owner: n || gt.fromRandom(),
          blockCreated: x(1),
          txCreatedIdx: x(1)
        }
      ]);
    }, "updateAssetInput");
    return i(e, x(1e11)), t.forEach((a) => i(a.assetId, a.amount)), this;
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: e, assetId: n }) => ({
      amount: x(e),
      assetId: n.toString()
    }));
  }
  /**
   * Return the minimum amount in native coins required to create
   * a transaction.
   *
   * @returns The transaction as a JSON object.
   */
  toJSON() {
    return yA(this);
  }
  removeWitness(t) {
    this.witnesses.splice(t, 1), this.adjustWitnessIndexes(t);
  }
  adjustWitnessIndexes(t) {
    this.inputs.filter(zn).forEach((e) => {
      e.witnessIndex > t && (e.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(t) {
    const e = t.filter(Do);
    this.inputs.filter(zn).forEach((n) => {
      const s = IA(n), i = e.find(
        (a) => od(a, new gt(String(s)))
      );
      i && "predicateGasUsed" in i && x(i.predicateGasUsed).gt(0) && (n.predicateGasUsed = i.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
  /**
   * @hidden
   *
   * Used internally to update the state of a transaction request.
   *
   * @param state - The state to update.
   */
  updateState(t, e, n) {
    if (!e) {
      this.flag = { state: void 0, transactionId: void 0, summary: void 0 };
      return;
    }
    const s = this.getTransactionId(t);
    this.flag = { state: e, transactionId: s, summary: n };
  }
}, T(Sn, "BaseTransactionRequest"), Sn);
function Si(r, t) {
  const e = r.toTransaction();
  e.type === Bt.Script && (e.receiptsRoot = Rt), e.inputs = e.inputs.map((i) => {
    const a = Ne(i);
    switch (a.type) {
      // Zero out on signing: txPointer, predicateGasUsed
      case Tt.Coin:
        return a.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, a.predicateGasUsed = x(0), a;
      // Zero out on signing: predicateGasUsed
      case Tt.Message:
        return a.predicateGasUsed = x(0), a;
      // Zero out on signing: txID, outputIndex, balanceRoot, stateRoot, and txPointer
      case Tt.Contract:
        return a.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, a.txID = Rt, a.outputIndex = 0, a.balanceRoot = Rt, a.stateRoot = Rt, a;
      default:
        return a;
    }
  }), e.outputs = e.outputs.map((i) => {
    const a = Ne(i);
    switch (a.type) {
      // Zero out on signing: balanceRoot, stateRoot
      case It.Contract:
        return a.balanceRoot = Rt, a.stateRoot = Rt, a;
      // Zero out on signing: amount
      case It.Change:
        return a.amount = x(0), a;
      // Zero out on signing: amount, to and assetId
      case It.Variable:
        return a.to = Rt, a.amount = x(0), a.assetId = Rt, a;
      default:
        return a;
    }
  }), e.witnessesCount = 0, e.witnesses = [];
  const n = Up(t), s = ot([n, new Er().encode(e)]);
  return Gt(s);
}
T(Si, "hashTransaction");
var Zs, ao = (Zs = class extends ha {
  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: e, blobId: n, ...s }) {
    super(s);
    /** Type of the transaction */
    D(this, "type", Bt.Blob);
    /** Blob ID */
    D(this, "blobId");
    /** Witness index of the bytecode to create */
    D(this, "witnessIndex");
    this.blobId = n, this.witnessIndex = e ?? 0;
  }
  static from(e) {
    return new this(Ne(e));
  }
  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const e = this.getBaseTransaction(), { witnessIndex: n, blobId: s } = this;
    return {
      type: Bt.Blob,
      ...e,
      blobId: s,
      witnessIndex: n
    };
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Si(this, e);
  }
  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  metadataGas(e) {
    return gA({
      gasCosts: e,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length
    });
  }
}, T(Zs, "BlobTransactionRequest"), Zs), t2 = /* @__PURE__ */ T((r) => {
  const t = new Uint8Array(32);
  return t.set(Z(r)), t;
}, "getStorageValue"), e2 = /* @__PURE__ */ T((r) => {
  let t, e;
  return Array.isArray(r) ? (t = r[0], e = r[1]) : (t = r.key, e = r.value), {
    key: X(t),
    value: X(t2(e))
  };
}, "storageSlotify"), js, cd = (js = class extends ha {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: e, salt: n, storageSlots: s, ...i }) {
    super(i);
    /** Type of the transaction */
    D(this, "type", Bt.Create);
    /** Witness index of contract bytecode to create */
    D(this, "bytecodeWitnessIndex");
    /** Salt */
    D(this, "salt");
    /** List of storage slots to initialize */
    D(this, "storageSlots");
    this.bytecodeWitnessIndex = e ?? 0, this.salt = X(n ?? Rt), this.storageSlots = [...s ?? []];
  }
  static from(e) {
    return new this(Ne(e));
  }
  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    var i;
    const e = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, s = ((i = this.storageSlots) == null ? void 0 : i.map(e2)) ?? [];
    return {
      type: Bt.Create,
      ...e,
      bytecodeWitnessIndex: n,
      storageSlotsCount: x(s.length),
      salt: this.salt ? X(this.salt) : Rt,
      storageSlots: s
    };
  }
  /**
   * Get contract created outputs for the transaction.
   *
   * @returns An array of contract created transaction request outputs.
   */
  getContractCreatedOutputs() {
    return this.outputs.filter(
      (e) => e.type === It.ContractCreated
    );
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Si(this, e);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(e, n) {
    this.pushOutput({
      type: It.ContractCreated,
      contractId: e,
      stateRoot: n
    });
  }
  metadataGas(e) {
    return Zd({
      contractBytesSize: x(Z(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: e,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, T(js, "CreateTransactionRequest"), js), v_ = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Z("0x24000000"),
  encodeScriptData: /* @__PURE__ */ T(() => new Uint8Array(0), "encodeScriptData")
}, r2 = {
  /*
          The following code loads some basic values into registers and calls SMO to create an output message
          5040C010 	- ADDI r16 $is i16   [r16 now points to memory 16 bytes from the start of this program (start of receiver data)]
          5D44C006	- LW r17 $is i6      [r17 set to the 6th word in this program (6*8=48 bytes from the start of this program)]
          4C400011	- SMO r16 r0 r0 r17  [send message out to address starting at memory position r16 with amount in r17]
          24000000	- RET                [return 0]
          00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 [recipient address]
          00000000 00000000 [amount value]
      */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Z("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: /* @__PURE__ */ T(() => new Uint8Array(0), "encodeScriptData")
}, Js, gn = (Js = class extends ha {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: e, scriptData: n, gasLimit: s, ...i } = {}) {
    super(i);
    /** Type of the transaction */
    D(this, "type", Bt.Script);
    /** Gas limit for transaction */
    D(this, "gasLimit");
    /** Script to execute */
    D(this, "script");
    /** Script input data (parameters) */
    D(this, "scriptData");
    D(this, "abis");
    this.gasLimit = x(s), this.script = Z(e ?? v_.bytes), this.scriptData = Z(n ?? v_.encodeScriptData()), this.abis = i.abis;
  }
  static from(e) {
    return new this(Ne(e));
  }
  /**
   * Helper function to estimate and fund the transaction request with a specified account.
   *
   * @param account - The account to fund the transaction.
   * @param params - The parameters for the transaction cost.
   * @returns The current instance of the `ScriptTransactionRequest` funded.
   */
  async estimateAndFund(e, { signatureCallback: n, quantities: s = [] } = {}) {
    const i = await e.getTransactionCost(this, { signatureCallback: n, quantities: s });
    return this.maxFee = i.maxFee, this.gasLimit = i.gasUsed, await e.fund(this, i), this;
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const e = Z(this.script ?? "0x"), n = Z(this.scriptData ?? "0x");
    return {
      type: Bt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: x(e.length),
      scriptDataLength: x(n.length),
      receiptsRoot: Rt,
      script: X(e),
      scriptData: X(n)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (e) => e.type === Tt.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (e) => e.type === It.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (e) => e.type === It.Variable
    );
  }
  /**
   * Set the script and its data.
   *
   * @param script - The abstract script request.
   * @param data - The script data.
   */
  setScript(e, n) {
    this.scriptData = e.encodeScriptData(n), this.script = e.bytes;
  }
  /**
   * Adds variable outputs to the transaction request.
   *
   * @param numberOfVariables - The number of variables to add.
   * @returns The new length of the outputs array.
   */
  addVariableOutputs(e = 1) {
    let n = e;
    for (; n; )
      this.pushOutput({
        type: It.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  /**
   * Calculates the maximum gas for the transaction.
   *
   * @param chainInfo - The chain information.
   * @param minGas - The minimum gas.
   * @returns the maximum gas.
   */
  calculateMaxGas(e, n) {
    const { consensusParameters: s } = e, {
      feeParameters: { gasPerByte: i },
      txParameters: { maxGasPerTx: a }
    } = s, o = this.toTransaction().witnesses.reduce(
      (d, _) => d + _.dataLength,
      0
    );
    return To({
      gasPerByte: i,
      minGas: n,
      witnessesLength: o,
      witnessLimit: this.witnessLimit,
      gasLimit: this.gasLimit,
      maxGasPerTx: a
    });
  }
  /**
   * Adds a contract input and output to the transaction request.
   *
   * @param contract - The contract ID.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  addContractInputAndOutput(e) {
    const n = ki(e);
    if (this.getContractInputs().find((i) => i.contractId === n.toB256()))
      return this;
    const s = super.pushInput({
      type: Tt.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: It.Contract,
      inputIndex: s
    }), this;
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Si(this, e);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(e, n) {
    const s = new Ke(e);
    return this.scriptData = s.functions.main.encodeArguments(n), this;
  }
  metadataGas(e) {
    return jd({
      gasCosts: e,
      txBytesSize: this.byteSize()
    });
  }
}, T(Js, "ScriptTransactionRequest"), Js), Tn, B_ = (Tn = class extends ha {
  /**
   * Creates an instance `UpgradeTransactionRequest`.
   *
   * @param upgradeTransactionRequestLike - The initial values for the instance
   */
  constructor({
    upgradePurpose: e,
    bytecodeWitnessIndex: n,
    ...s
  } = {}) {
    super(s);
    /** The type of transaction */
    D(this, "type", Bt.Upgrade);
    /** The upgrade purpose */
    D(this, "upgradePurpose");
    /** Witness index of consensus */
    D(this, "bytecodeWitnessIndex");
    this.bytecodeWitnessIndex = n ?? 0, this.upgradePurpose = e ?? {
      type: Ze.ConsensusParameters,
      checksum: "0x"
    };
  }
  static from(e) {
    return e instanceof Tn ? e : new this(Ne(e));
  }
  /**
   * Adds a consensus parameters upgrade purpose.
   *
   * @param consensus - The consensus bytecode.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addConsensusParametersUpgradePurpose(e) {
    return this.bytecodeWitnessIndex = this.addWitness(e), this.upgradePurpose = {
      type: Ze.ConsensusParameters,
      checksum: lr(e)
    }, this;
  }
  /**
   * Adds a state transition upgrade purpose.
   *
   * @param bytecodeRoot - The Merkle root of the state transition.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addStateTransitionUpgradePurpose(e) {
    return this.upgradePurpose = {
      type: Ze.StateTransition,
      data: X(e)
    }, this;
  }
  /**
   * Adds an upgrade purpose.
   *
   * @param type - The upgrade purpose type.
   * @param data - The bytecode or merkle root of upgrade purpose
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addUpgradePurpose(e, n) {
    return e === Ze.ConsensusParameters && this.addConsensusParametersUpgradePurpose(n), e === Ze.StateTransition && this.addStateTransitionUpgradePurpose(n), this;
  }
  /**
   * Converts the transaction request to a `TransactionUpgrade`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    let e;
    if (this.upgradePurpose.type === Ze.ConsensusParameters)
      e = {
        type: Ze.ConsensusParameters,
        data: {
          witnessIndex: this.bytecodeWitnessIndex,
          checksum: this.upgradePurpose.checksum
        }
      };
    else if (this.upgradePurpose.type === Ze.StateTransition)
      e = {
        type: Ze.StateTransition,
        data: {
          bytecodeRoot: X(this.upgradePurpose.data)
        }
      };
    else
      throw new v(v.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
    return {
      type: Bt.Upgrade,
      ...super.getBaseTransaction(),
      upgradePurpose: e
    };
  }
  /**
   * Gets the Transaction ID by hashing the transaction
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Si(this, e);
  }
  /**
   * Calculates the metadata gas cost for an upgrade transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upgrade transaction.
   */
  metadataGas(e) {
    const n = this.byteSize();
    if (this.upgradePurpose.type === Ze.ConsensusParameters) {
      const s = this.bytecodeWitnessIndex, i = this.witnesses[s].length;
      return ad({
        gasCosts: e,
        txBytesSize: n,
        consensusSize: i
      });
    }
    if (this.upgradePurpose.type === Ze.StateTransition)
      return ad({
        gasCosts: e,
        txBytesSize: n
      });
    throw new v(v.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
  }
}, T(Tn, "UpgradeTransactionRequest"), Tn), Nn, x_ = (Nn = class extends ha {
  /**
   * Creates an instance `UploadTransactionRequest`.
   *
   * @param uploadTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: e, subsection: n, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    D(this, "type", Bt.Upload);
    /** The witness index of the subsection of the bytecode. */
    D(this, "witnessIndex");
    /** The subsection data. */
    D(this, "subsection");
    this.witnessIndex = e ?? 0, this.subsection = n ?? {
      proofSet: [],
      root: Rt,
      subsectionIndex: 0,
      subsectionsNumber: 0
    };
  }
  static from(e) {
    return e instanceof Nn ? e : new this(Ne(e));
  }
  /**
   * Adds the subsection.
   *
   * @param subsection - The subsection data.
   */
  addSubsection(e) {
    const { subsection: n, ...s } = e;
    this.subsection = s, this.witnessIndex = this.addWitness(n);
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Si(this, e);
  }
  /**
   * Converts the transaction request to a `TransactionUpload`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const e = this.getBaseTransaction(), { subsectionIndex: n, subsectionsNumber: s, root: i, proofSet: a } = this.subsection;
    return {
      type: Bt.Upload,
      ...e,
      subsectionIndex: n,
      subsectionsNumber: s,
      root: X(i),
      proofSet: a.map(X),
      witnessIndex: this.witnessIndex,
      proofSetCount: a.length
    };
  }
  /**
   * Calculates the metadata gas cost for an upload transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upload transaction.
   */
  metadataGas(e) {
    return wA({
      gasCosts: e,
      txBytesSize: this.byteSize(),
      subsectionSize: Z(this.witnesses[this.witnessIndex]).length,
      subsectionsSize: this.subsection.subsectionsNumber
    });
  }
  /**
   * Calculates the minimum gas for an upload transaction.
   *
   * @param chainInfo - The chain information.
   *
   * @returns the minimum gas for the upload transaction
   */
  calculateMinGas(e) {
    const n = super.calculateMinGas(e), { gasCosts: s } = e.consensusParameters, i = this.witnesses[this.witnessIndex] ?? Rt;
    return mA({
      gasCosts: s,
      baseMinGas: n.toNumber(),
      subsectionSize: Z(i).length
    });
  }
}, T(Nn, "UploadTransactionRequest"), Nn), qs, rR = (qs = class {
}, T(qs, "AbstractScriptRequest"), qs), Oe = /* @__PURE__ */ T((r) => {
  if (r instanceof gn || r instanceof cd || r instanceof ao || r instanceof B_ || r instanceof x_)
    return r;
  const { type: t } = r;
  switch (r.type) {
    case Bt.Script:
      return gn.from(r);
    case Bt.Create:
      return cd.from(r);
    case Bt.Blob:
      return ao.from(r);
    case Bt.Upgrade:
      return B_.from(r);
    case Bt.Upload:
      return x_.from(r);
    default:
      throw new v(
        L.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, "transactionRequestify"), an = /* @__PURE__ */ T((r) => r.type === Bt.Script, "isTransactionTypeScript"), n2 = /* @__PURE__ */ T((r) => r.type === Bt.Create, "isTransactionTypeCreate"), nR = /* @__PURE__ */ T((r) => r.type === Bt.Blob, "isTransactionTypeBlob"), sR = /* @__PURE__ */ T((r) => r.type === Bt.Upgrade, "isTransactionTypeUpgrade"), iR = /* @__PURE__ */ T((r) => r.type === Bt.Upload, "isTransactionTypeUpload"), Pi = /* @__PURE__ */ new Map(), $s, R_ = ($s = class {
  constructor(t) {
    D(this, "ttl");
    if (this.ttl = t, typeof t != "number" || this.ttl <= 0)
      throw new v(
        L.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  // Add resources to the cache
  set(t, e) {
    const n = this.setupResourcesCache(e);
    Pi.set(t, n);
  }
  unset(t) {
    Pi.delete(t);
  }
  getActiveData(t) {
    const e = { utxos: [], messages: [] }, n = Date.now(), s = [];
    return Pi.forEach((i, a) => {
      if (n - i.timestamp < this.ttl) {
        const d = i.owners.get(t);
        d && (e.utxos.push(...d.utxos), e.messages.push(...d.messages));
      } else
        s.push(a);
    }), s.forEach(this.unset), e.utxos.reverse(), e.messages.reverse(), e;
  }
  isCached(t, e) {
    const n = Date.now();
    let s = !1;
    const i = [];
    for (const [a, o] of Pi.entries())
      if (n - o.timestamp < this.ttl) {
        const _ = o.owners.get(t);
        if (_ != null && _.utxos.has(e) || _ != null && _.messages.has(e)) {
          s = !0;
          break;
        }
      } else
        i.push(a);
    return i.forEach(this.unset), s;
  }
  clear() {
    Pi.clear();
  }
  setupResourcesCache(t) {
    const e = Date.now(), n = {
      owners: /* @__PURE__ */ new Map(),
      timestamp: e
    };
    return t.filter(Do).forEach((s) => {
      var d, _;
      const { owner: i, key: a, type: o } = this.extractResourceData(s);
      n.owners.has(i) || n.owners.set(i, { utxos: /* @__PURE__ */ new Set(), messages: /* @__PURE__ */ new Set() }), o === "utxo" ? (d = n.owners.get(i)) == null || d.utxos.add(a) : (_ = n.owners.get(i)) == null || _.messages.add(a);
    }), n;
  }
  extractResourceData(t) {
    return kr(t) ? { owner: X(t.owner), key: X(t.id), type: "utxo" } : { owner: X(t.recipient), key: X(t.nonce), type: "message" };
  }
}, T($s, "ResourceCache"), $s), s2 = /* @__PURE__ */ T((r) => {
  var Q;
  const {
    gasPrice: t,
    rawPayload: e,
    tip: n,
    consensusParameters: { gasCosts: s, feeParams: i, maxGasPerTx: a }
  } = r, o = x(i.gasPerByte), d = x(i.gasPriceFactor), _ = Z(e), [A] = new Er().decode(_, 0), { type: g, witnesses: y, inputs: S, policies: O } = A;
  let R = x(0), F = x(0);
  if (g !== Bt.Create && g !== Bt.Script)
    return x(0);
  if (g === Bt.Create) {
    const { bytecodeWitnessIndex: k, storageSlots: U } = A, G = x(Z(y[k].data).length);
    R = Zd({
      contractBytesSize: G,
      gasCosts: s,
      stateRootSize: U.length || 0,
      txBytesSize: _.length
    });
  } else {
    const { scriptGasLimit: k } = A;
    k && (F = k), R = jd({
      gasCosts: s,
      txBytesSize: _.length
    });
  }
  const z = Xd({
    gasCosts: s,
    gasPerByte: x(o),
    inputs: S,
    metadataGas: R,
    txBytesSize: _.length
  }), H = (Q = O.find((k) => k.type === Ue.WitnessLimit)) == null ? void 0 : Q.data, V = y.reduce((k, U) => k + U.dataLength, 0), P = To({
    gasPerByte: o,
    minGas: z,
    witnessesLength: V,
    gasLimit: F,
    witnessLimit: H,
    maxGasPerTx: a
  });
  return Ii({
    gasPrice: t,
    gas: P,
    priceFactor: d,
    tip: n
  });
}, "calculateTXFeeForSummary");
function CA(r, t) {
  return r.filter((e) => t.includes(e.type));
}
T(CA, "getInputsByTypes");
function Fo(r, t) {
  return r.filter((e) => e.type === t);
}
T(Fo, "getInputsByType");
function vA(r) {
  return Fo(r, Tt.Coin);
}
T(vA, "getInputsCoin");
function BA(r) {
  return Fo(r, Tt.Message);
}
T(BA, "getInputsMessage");
function qd(r) {
  return CA(r, [Tt.Coin, Tt.Message]);
}
T(qd, "getInputsCoinAndMessage");
function dd(r) {
  return r.type === Tt.Coin;
}
T(dd, "isInputCoin");
function xA(r) {
  return Fo(r, Tt.Contract);
}
T(xA, "getInputsContract");
function RA(r, t) {
  return vA(r).find((n) => n.assetId === t);
}
T(RA, "findCoinInput");
function SA(r, t) {
  const e = /* @__PURE__ */ new Map();
  return qd(r).forEach((n) => {
    const s = dd(n) ? n.assetId : t, i = dd(n) ? n.owner : n.recipient;
    let a = e.get(s);
    a || (a = /* @__PURE__ */ new Map(), e.set(s, a));
    let o = a.get(i);
    o || (o = new $_(0), a.set(i, o)), a.set(i, o.add(n.amount));
  }), e;
}
T(SA, "aggregateInputsAmountsByAssetAndOwner");
function TA(r) {
  var t;
  return (t = BA(r)) == null ? void 0 : t[0];
}
T(TA, "findMessageInput");
function $d(r, t, e = !1) {
  const n = RA(r, t);
  if (n)
    return n;
  if (e)
    return TA(r);
}
T($d, "getInputFromAssetId");
function NA(r, t) {
  if (t == null)
    return;
  const e = r == null ? void 0 : r[t];
  if (e) {
    if (e.type !== Tt.Contract)
      throw new v(
        L.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return e;
  }
}
T(NA, "getInputContractFromIndex");
function Qo(r) {
  return r.type === Tt.Coin ? r.owner.toString() : r.type === Tt.Message ? r.recipient.toString() : "";
}
T(Qo, "getInputAccountAddress");
function Ti(r, t) {
  return r.filter((e) => e.type === t);
}
T(Ti, "getOutputsByType");
function DA(r) {
  return Ti(r, It.ContractCreated);
}
T(DA, "getOutputsContractCreated");
function Kd(r) {
  return Ti(r, It.Coin);
}
T(Kd, "getOutputsCoin");
function FA(r) {
  return Ti(r, It.Change);
}
T(FA, "getOutputsChange");
function QA(r) {
  return Ti(r, It.Contract);
}
T(QA, "getOutputsContract");
function i2(r) {
  return Ti(r, It.Variable);
}
T(i2, "getOutputsVariable");
var a2 = /* @__PURE__ */ ((r) => (r.Create = "Create", r.Mint = "Mint", r.Script = "Script", r.Upgrade = "Upgrade", r.Upload = "Upload", r.Blob = "Blob", r))(a2 || {}), OA = /* @__PURE__ */ ((r) => (r.submitted = "submitted", r.success = "success", r.squeezedout = "squeezedout", r.failure = "failure", r))(OA || {}), o2 = /* @__PURE__ */ ((r) => (r.payBlockProducer = "Pay network fee to block producer", r.contractCreated = "Contract created", r.transfer = "Transfer asset", r.contractCall = "Contract call", r.receive = "Receive asset", r.withdrawFromFuel = "Withdraw from Fuel", r))(o2 || {}), c2 = /* @__PURE__ */ ((r) => (r[r.contract = 0] = "contract", r[r.account = 1] = "account", r))(c2 || {}), d2 = /* @__PURE__ */ ((r) => (r.ethereum = "ethereum", r.fuel = "fuel", r))(d2 || {});
function Ei(r, t) {
  return (r ?? []).filter((e) => e.type === t);
}
T(Ei, "getReceiptsByType");
function tu(r) {
  switch (r) {
    case Bt.Mint:
      return "Mint";
    case Bt.Create:
      return "Create";
    case Bt.Script:
      return "Script";
    case Bt.Blob:
      return "Blob";
    case Bt.Upgrade:
      return "Upgrade";
    case Bt.Upload:
      return "Upload";
    default:
      throw new v(
        L.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${r}.`
      );
  }
}
T(tu, "getTransactionTypeName");
function Vn(r, t) {
  return tu(r) === t;
}
T(Vn, "isType");
function MA(r) {
  return Vn(
    r,
    "Mint"
    /* Mint */
  );
}
T(MA, "isTypeMint");
function eu(r) {
  return Vn(
    r,
    "Create"
    /* Create */
  );
}
T(eu, "isTypeCreate");
function ru(r) {
  return Vn(
    r,
    "Script"
    /* Script */
  );
}
T(ru, "isTypeScript");
function PA(r) {
  return Vn(
    r,
    "Upgrade"
    /* Upgrade */
  );
}
T(PA, "isTypeUpgrade");
function LA(r) {
  return Vn(
    r,
    "Upload"
    /* Upload */
  );
}
T(LA, "isTypeUpload");
function kA(r) {
  return Vn(
    r,
    "Blob"
    /* Blob */
  );
}
T(kA, "isTypeBlob");
function u2(r) {
  return (t) => r.assetId === t.assetId;
}
T(u2, "hasSameAssetId");
function UA(r) {
  return Ei(r, dt.Call);
}
T(UA, "getReceiptsCall");
function zA(r) {
  return Ei(r, dt.MessageOut);
}
T(zA, "getReceiptsMessageOut");
function GA(r, t) {
  const e = r.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return e.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const a = s.get(i.assetId);
    a ? a.amount = x(a.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
T(GA, "mergeAssets");
function VA(r, t) {
  var e, n, s, i, a, o, d, _;
  return r.name === t.name && ((e = r.from) == null ? void 0 : e.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = r.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((a = r.from) == null ? void 0 : a.type) === ((o = t.from) == null ? void 0 : o.type) && ((d = r.to) == null ? void 0 : d.type) === ((_ = t.to) == null ? void 0 : _.type);
}
T(VA, "isSameOperation");
function YA(r, t) {
  var e, n;
  return (e = t.assetsSent) != null && e.length ? (n = r.assetsSent) != null && n.length ? GA(r, t) : t.assetsSent : r.assetsSent;
}
T(YA, "mergeAssetsSent");
function HA(r, t) {
  var e;
  return (e = t.calls) != null && e.length ? [...r.calls || [], ...t.calls] : r.calls;
}
T(HA, "mergeCalls");
function WA(r, t) {
  var e;
  return {
    ...r,
    assetsSent: YA(r, t),
    calls: HA(r, t),
    receipts: [
      ...r.receipts || [],
      ...((e = t.receipts) == null ? void 0 : e.filter((n) => {
        var s;
        return !((s = r.receipts) != null && s.some((i) => i === n));
      })) || []
    ]
  };
}
T(WA, "mergeOperations");
function Ci(r, t) {
  const e = r.findIndex((n) => VA(n, t));
  return e === -1 ? [...r, t] : r.map((n, s) => s === e ? WA(n, t) : n);
}
T(Ci, "addOperation");
function h2(r) {
  return Ei(r, dt.TransferOut);
}
T(h2, "getReceiptsTransferOut");
function XA({
  inputs: r,
  receipts: t,
  baseAssetId: e
}) {
  return zA(t).reduce(
    (i, a) => {
      const o = $d(r, e, !0);
      if (o) {
        const d = Qo(o);
        return Ci(i, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: d
          },
          to: {
            type: 1,
            address: a.recipient.toString(),
            chain: "ethereum"
            /* ethereum */
          },
          assetsSent: [
            {
              amount: a.amount,
              assetId: e
            }
          ],
          receipts: [a]
        });
      }
      return i;
    },
    []
  );
}
T(XA, "getWithdrawFromFuelOperations");
function ZA(r, t, e, n, s) {
  return (t == null ? void 0 : t[r.contractID]) ? [] : [];
}
T(ZA, "getContractCalls");
function jA(r) {
  var t;
  return (t = r.amount) != null && t.isZero() ? void 0 : [
    {
      amount: r.amount,
      assetId: r.assetId
    }
  ];
}
T(jA, "getAssetsSent");
function JA(r, t, e, n, s, i, a) {
  const o = r.assetId === Rt ? a : r.assetId, d = $d(e, o, o === a);
  if (!d)
    return [];
  const _ = Qo(d), A = ZA(t, n);
  return [
    {
      name: "Contract call",
      from: {
        type: 1,
        address: _
      },
      to: {
        type: 0,
        address: r.to
      },
      assetsSent: jA(r),
      calls: A,
      receipts: [r]
    }
  ];
}
T(JA, "processCallReceipt");
function qA({
  inputs: r,
  outputs: t,
  receipts: e,
  abiMap: n,
  rawPayload: s,
  maxInputs: i,
  baseAssetId: a
}) {
  const o = UA(e);
  return QA(t).flatMap((_) => {
    const A = NA(r, _.inputIndex);
    return A ? o.filter((g) => g.to === A.contractID).flatMap(
      (g) => JA(
        g,
        A,
        r,
        n,
        s,
        i,
        a
      )
    ) : [];
  });
}
T(qA, "getContractCallOperations");
function $A(r, t, e) {
  const { to: n, assetId: s, amount: i } = r;
  let { id: a } = r;
  const o = t.some((_) => _.contractID === n) ? 0 : 1;
  if (Rt === a) {
    const _ = e.find((A) => A.assetId === s);
    a = (_ == null ? void 0 : _.to) || a;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((_) => _.contractID === a) ? 0 : 1,
      address: a
    },
    to: {
      type: o,
      address: n
    },
    assetsSent: [
      {
        assetId: s.toString(),
        amount: i
      }
    ],
    receipts: [r]
  };
}
T($A, "extractTransferOperationFromReceipt");
function KA({
  inputs: r,
  outputs: t,
  receipts: e,
  baseAssetId: n
}) {
  let s = [];
  const i = Kd(t), a = xA(r), o = FA(t), d = SA(r, n);
  i.forEach(({ amount: g, assetId: y, to: S }) => {
    const O = d.get(y) || /* @__PURE__ */ new Map();
    let R, F;
    for (const [z, H] of O)
      if (F || (F = z), H.gte(g)) {
        R = z;
        break;
      }
    R = R || F, R && (s = Ci(s, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: R
      },
      to: {
        type: 1,
        address: S
      },
      assetsSent: [{ assetId: y, amount: g }]
    }));
  });
  const _ = Ei(
    e,
    dt.Transfer
  ), A = Ei(
    e,
    dt.TransferOut
  );
  return [..._, ...A].forEach((g) => {
    const y = $A(g, a, o);
    s = Ci(s, y);
  }), s;
}
T(KA, "getTransferOperations");
function tg(r) {
  return Kd(r).reduce((n, s) => Ci(n, {
    name: "Pay network fee to block producer",
    from: {
      type: 1,
      address: "Network"
    },
    to: {
      type: 1,
      address: s.to.toString()
    },
    assetsSent: [
      {
        assetId: s.assetId.toString(),
        amount: s.amount
      }
    ]
  }), []);
}
T(tg, "getPayProducerOperations");
function eg({ inputs: r, outputs: t }) {
  const e = DA(t), n = qd(r)[0], s = Qo(n);
  return e.reduce((a, o) => Ci(a, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (o == null ? void 0 : o.contractId) || ""
    }
  }), []);
}
T(eg, "getContractCreatedOperations");
function rg({
  transactionType: r,
  inputs: t,
  outputs: e,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: a,
  baseAssetId: o
}) {
  return eu(r) ? [...eg({ inputs: t, outputs: e })] : ru(r) ? [
    ...KA({ inputs: t, outputs: e, receipts: n, baseAssetId: o }),
    ...qA({
      inputs: t,
      outputs: e,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: a,
      baseAssetId: o
    }),
    ...XA({ inputs: t, receipts: n, baseAssetId: o })
  ] : [...tg(e)];
}
T(rg, "getOperations");
var aR = /* @__PURE__ */ T((r) => dr(r), "processGqlReceipt"), l2 = /* @__PURE__ */ T((r) => {
  const t = [];
  return r.forEach((e) => {
    e.type === dt.Mint && t.push({
      subId: e.subId,
      contractId: e.contractId,
      assetId: e.assetId,
      amount: e.val
    });
  }), t;
}, "extractMintedAssetsFromReceipts"), _2 = /* @__PURE__ */ T((r) => {
  const t = [];
  return r.forEach((e) => {
    e.type === dt.Burn && t.push({
      subId: e.subId,
      contractId: e.contractId,
      assetId: e.assetId,
      amount: e.val
    });
  }), t;
}, "extractBurnedAssetsFromReceipts"), p2 = /* @__PURE__ */ T((r) => {
  switch (r) {
    case "FailureStatus":
      return "failure";
    case "SuccessStatus":
      return "success";
    case "SubmittedStatus":
      return "submitted";
    case "SqueezedOutStatus":
      return "squeezedout";
    default:
      throw new v(
        L.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${r}.`
      );
  }
}, "getTransactionStatusName"), f2 = /* @__PURE__ */ T((r) => {
  var A, g;
  let t, e, n, s, i, a = !1, o = !1, d = !1;
  if (r != null && r.type)
    switch (n = p2(r.type), r.type) {
      case "SuccessStatus":
        t = r.time, e = (A = r.block) == null ? void 0 : A.id, o = !0, s = x(r.totalFee), i = x(r.totalGas);
        break;
      case "FailureStatus":
        t = r.time, e = (g = r.block) == null ? void 0 : g.id, a = !0, s = x(r.totalFee), i = x(r.totalGas);
        break;
      case "SubmittedStatus":
        t = r.time, d = !0;
        break;
    }
  return {
    time: t,
    blockId: e,
    status: n,
    totalFee: s,
    totalGas: i,
    isStatusFailure: a,
    isStatusSuccess: o,
    isStatusPending: d
  };
}, "processGraphqlStatus"), ng = /* @__PURE__ */ T((r) => r && "totalFee" in r ? x(r.totalFee) : void 0, "getTotalFeeFromStatus");
function Ni(r) {
  var h, f;
  const {
    id: t,
    receipts: e,
    gasPerByte: n,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: a,
    gqlTransactionStatus: o,
    abiMap: d = {},
    maxInputs: _,
    gasCosts: A,
    maxGasPerTx: g,
    gasPrice: y,
    baseAssetId: S
  } = r, O = So(e), R = X(a), F = rg({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: e,
    rawPayload: R,
    abiMap: d,
    maxInputs: _,
    baseAssetId: S
  }), z = tu(i.type), H = x((f = (h = i.policies) == null ? void 0 : h.find((m) => m.type === Ue.Tip)) == null ? void 0 : f.data), { isStatusFailure: V, isStatusPending: P, isStatusSuccess: M, blockId: Q, status: k, time: U, totalFee: G } = f2(o), j = G ?? s2({
    gasPrice: y,
    rawPayload: R,
    tip: H,
    consensusParameters: {
      gasCosts: A,
      maxGasPerTx: g,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), J = l2(e), q = _2(e);
  let C;
  return U && (C = dp.fromTai64(U)), {
    id: t,
    tip: H,
    fee: j,
    gasUsed: O,
    operations: F,
    type: z,
    blockId: Q,
    time: U,
    status: k,
    receipts: e,
    mintedAssets: J,
    burnedAssets: q,
    isTypeMint: MA(i.type),
    isTypeCreate: eu(i.type),
    isTypeScript: ru(i.type),
    isTypeUpgrade: PA(i.type),
    isTypeUpload: LA(i.type),
    isTypeBlob: kA(i.type),
    isStatusFailure: V,
    isStatusSuccess: M,
    isStatusPending: P,
    date: C,
    transaction: i
  };
}
T(Ni, "assembleTransactionSummary");
function Oo(r) {
  const { receipts: t, mainAbi: e, externalAbis: n = {} } = r;
  let s = "";
  return e.programType === "contract" && (s = t.find(
    (a) => a.type === dt.Call && a.id === Rt
  ).to), t.reduce(
    ({ logs: i, groupedLogs: a }, o) => {
      if (o.type === dt.LogData || o.type === dt.Log) {
        const d = o.id === Rt || s === o.id;
        if (d || n[o.id]) {
          const A = d ? new Ke(e) : new Ke(n[o.id]), g = o.type === dt.Log ? new rt("u64").encode(o.ra) : o.data, [y] = A.decodeLog(g, o.rb.toString());
          i.push(y), a[o.id] = [...a[o.id] || [], y];
        }
      }
      return { logs: i, groupedLogs: a };
    },
    { logs: [], groupedLogs: {} }
  );
}
T(Oo, "getAllDecodedLogs");
function sg(r) {
  return r.map((t) => {
    const e = "amount" in t ? { ...t, amount: x(t.amount) } : t;
    switch (e.type) {
      case "CoinOutput":
        return { ...e, type: It.Coin };
      case "ContractOutput":
        return {
          ...e,
          type: It.Contract,
          inputIndex: parseInt(e.inputIndex, 10)
        };
      case "ChangeOutput":
        return {
          ...e,
          type: It.Change
        };
      case "VariableOutput":
        return { ...e, type: It.Variable };
      case "ContractCreated":
        return {
          ...e,
          type: It.ContractCreated,
          contractId: e.contract
        };
      default:
        return Ap();
    }
  });
}
T(sg, "mapGqlOutputsToTxOutputs");
var Dn, S_ = (Dn = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(t, e, n, s, i) {
    /** Transaction ID */
    D(this, "id");
    /** Current provider */
    D(this, "provider");
    /** Gas used on the transaction */
    D(this, "gasUsed", x(0));
    /** The graphql Transaction with receipts object. */
    D(this, "gqlTransaction");
    D(this, "request");
    D(this, "status");
    D(this, "abis");
    this.submitTxSubscription = i, this.id = typeof t == "string" ? t : t.getTransactionId(n), this.provider = e, this.abis = s, this.request = typeof t == "string" ? void 0 : t, this.waitForResult = this.waitForResult.bind(this);
  }
  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(t, e, n) {
    const s = await e.getChainId(), i = new Dn(t, e, s, n);
    return await i.fetch(), i;
  }
  applyMalleableSubscriptionFields(t) {
    const e = this.status;
    if (!e)
      return;
    const n = t;
    (e.type === "SuccessStatus" || e.type === "FailureStatus") && (n.inputs = n.inputs.map((s, i) => {
      var a;
      if ("txPointer" in s) {
        const o = (a = e.transaction.inputs) == null ? void 0 : a[i];
        return {
          ...s,
          txPointer: Ln.decodeFromGqlScalar(o.txPointer)
        };
      }
      return s;
    }), n.outputs = sg(e.transaction.outputs), "receiptsRoot" in e.transaction && (n.receiptsRoot = e.transaction.receiptsRoot));
  }
  async getTransaction() {
    if (this.request) {
      const e = this.request.toTransaction();
      return this.applyMalleableSubscriptionFields(e), {
        tx: e,
        bytes: this.request.toTransactionBytes()
      };
    }
    const t = this.gqlTransaction ?? await this.fetch();
    return {
      tx: this.decodeTransaction(t),
      bytes: Z(t.rawPayload)
    };
  }
  getReceipts() {
    var e;
    const t = this.status ?? ((e = this.gqlTransaction) == null ? void 0 : e.status);
    switch (t == null ? void 0 : t.type) {
      case "SuccessStatus":
      case "FailureStatus":
        return t.receipts.map(dr);
      default:
        return [];
    }
  }
  /**
   * Fetch the transaction with receipts from the provider.
   *
   * @returns Transaction with receipts query result.
   */
  async fetch() {
    const t = await this.provider.operations.getTransactionWithReceipts({
      transactionId: this.id
    });
    if (!t.transaction) {
      const e = await this.provider.operations.statusChange({
        transactionId: this.id
      });
      for await (const { statusChange: n } of e)
        if (n) {
          this.status = n;
          break;
        }
      return this.fetch();
    }
    return this.gqlTransaction = t.transaction, t.transaction;
  }
  /**
   * Decode the raw payload of the transaction.
   *
   * @param transactionWithReceipts - The transaction with receipts object.
   * @returns The decoded transaction.
   */
  decodeTransaction(t) {
    var e;
    return (e = new Er().decode(
      Z(t.rawPayload),
      0
    )) == null ? void 0 : e[0];
  }
  /**
   * Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
   * fetch it from the provider
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns
   */
  async getTransactionSummary(t) {
    var S, O;
    const { tx: e, bytes: n } = await this.getTransaction(), { gasPerByte: s, gasPriceFactor: i, gasCosts: a, maxGasPerTx: o } = await this.provider.getGasConfig(), _ = ng(this.status ?? ((S = this.gqlTransaction) == null ? void 0 : S.status)) ? x(0) : await this.provider.getLatestGasPrice(), A = (await this.provider.getChain()).consensusParameters.txParameters.maxInputs, g = await this.provider.getBaseAssetId();
    return Ni({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: e,
      transactionBytes: n,
      gqlTransactionStatus: this.status ?? ((O = this.gqlTransaction) == null ? void 0 : O.status),
      gasPerByte: s,
      gasPriceFactor: i,
      abiMap: t,
      maxInputs: A,
      gasCosts: a,
      maxGasPerTx: o,
      gasPrice: _,
      baseAssetId: g
    });
  }
  async waitForStatusChange() {
    var n, s;
    const t = (s = (n = this.gqlTransaction) == null ? void 0 : n.status) == null ? void 0 : s.type;
    if (t && t !== "SubmittedStatus")
      return;
    const e = this.submitTxSubscription ?? await this.provider.operations.statusChange({
      transactionId: this.id
    });
    for await (const i of e) {
      const a = "statusChange" in i ? i.statusChange : i.submitAndAwaitStatus;
      if (this.status = a, a.type === "SqueezedOutStatus")
        throw this.unsetResourceCache(), new v(
          L.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${a.reason}`
        );
      if (a.type !== "SubmittedStatus")
        break;
    }
  }
  /**
   * Assembles the result of a transaction by retrieving the transaction summary,
   * decoding logs (if available), and handling transaction failure.
   *
   * This method can be used to obtain the result of a transaction that has just
   * been submitted or one that has already been processed.
   *
   * @template TTransactionType - The type of the transaction.
   * @param contractsAbiMap - The map of contract ABIs.
   * @returns - The assembled transaction result.
   * @throws If the transaction status is a failure.
   */
  async assembleResult(t) {
    var d;
    const e = await this.getTransactionSummary(t), n = {
      ...e
    };
    let { logs: s, groupedLogs: i } = { logs: [], groupedLogs: {} };
    this.abis && ({ logs: s, groupedLogs: i } = Oo({
      receipts: e.receipts,
      mainAbi: this.abis.main,
      externalAbis: this.abis.otherContractsAbis
    }), n.logs = s, n.groupedLogs = i);
    const { receipts: a } = n, o = this.status ?? ((d = this.gqlTransaction) == null ? void 0 : d.status);
    if ((o == null ? void 0 : o.type) === "FailureStatus") {
      const { reason: _ } = o;
      throw Jd({
        receipts: a,
        statusReason: _,
        logs: s,
        groupedLogs: i
      });
    }
    return n;
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult(t) {
    return await this.waitForStatusChange(), this.unsetResourceCache(), this.assembleResult(t);
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait(t) {
    return this.waitForResult(t);
  }
  unsetResourceCache() {
    var t;
    (t = this.provider.cache) == null || t.unset(this.id);
  }
}, T(Dn, "TransactionResponse"), Dn);
function ig(r, t, e = {}) {
  let n = "";
  return t.programType === "contract" && (n = r.find(
    (i) => i.type === dt.Call && i.id === Rt
  ).to), r.reduce((s, i) => {
    if (i.type === dt.LogData || i.type === dt.Log) {
      const a = i.id === Rt || n === i.id;
      if (a || e[i.id]) {
        const d = a ? new Ke(t) : new Ke(e[i.id]), _ = i.type === dt.Log ? new rt("u64").encode(i.ra) : i.data, [A] = d.decodeLog(_, i.rb.toString());
        s.push(A);
      }
    }
    return s;
  }, []);
}
T(ig, "getDecodedLogs");
function ag(r, t) {
  const e = r.baseDelay ?? 150;
  switch (r.backoff) {
    case "linear":
      return e * t;
    case "fixed":
      return e;
    case "exponential":
    default:
      return 2 ** (t - 1) * e;
  }
}
T(ag, "getWaitDelay");
function nu(r, t, e = 0) {
  return t === void 0 ? r : async (...n) => {
    var s;
    try {
      return await r(...n);
    } catch (i) {
      const a = i;
      if (((s = a.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw a;
      const o = e + 1;
      if (o > t.maxRetries)
        throw a;
      const d = ag(t, o);
      return await up(d), nu(r, t, o)(...n);
    }
  };
}
T(nu, "autoRetryFetch");
var A2 = /* @__PURE__ */ T((r) => {
  const { userInput: t, cached: e, maxInputs: n } = r, s = { ...t };
  let i = s.utxos.length + s.messages.length;
  return i >= n || (s.utxos = [...s.utxos, ...e.utxos.slice(0, n - i)], i = s.utxos.length + s.messages.length, i < n && (s.messages = [...s.messages, ...e.messages.slice(0, n - i)])), s;
}, "adjustResourcesToExclude"), Zn = /* @__PURE__ */ T((r) => {
  const { paginationLimit: t, inputArgs: e = {} } = r, { first: n, last: s, after: i, before: a } = e;
  if (i && a)
    throw new v(
      L.INVALID_INPUT_PARAMETERS,
      'Pagination arguments "after" and "before" cannot be used together'
    );
  if ((n || 0) > t || (s || 0) > t)
    throw new v(
      L.INVALID_INPUT_PARAMETERS,
      `Pagination limit for this query cannot exceed ${t} items`
    );
  if (n && a)
    throw new v(
      L.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "first" with "before" is not supported'
    );
  if (s && i)
    throw new v(
      L.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "last" with "after" is not supported'
    );
  return !n && !s && (e.first = t), e;
}, "validatePaginationArgs"), T_ = 10, N_ = 512, og = 60, g2 = 100, w2 = 1e4, m2 = 5, y2 = 2e4, b2 = 1.2, At, oo, cg, D_ = (At = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(t, e = {}) {
    Ie(this, oo);
    D(this, "operations");
    D(this, "cache");
    /** @hidden */
    D(this, "url");
    /** @hidden */
    D(this, "urlWithoutAuth");
    /** @hidden */
    D(this, "consensusParametersTimestamp");
    D(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0,
      headers: void 0,
      cache: void 0
    });
    const { url: n, urlWithoutAuth: s, headers: i } = At.extractBasicAuth(t);
    this.url = n, this.urlWithoutAuth = s, this.url = t;
    const { FUELS: a } = Z_, o = { ...i, ...e.headers, Source: `ts-sdk-${a}` };
    this.options = {
      ...this.options,
      ...e,
      headers: o
    }, this.operations = this.createOperations();
    const { resourceCacheTTL: d, cache: _ } = this.options;
    if (_) {
      const { consensusParametersTimestamp: A, chain: g, nodeInfo: y } = z1(_);
      this.consensusParametersTimestamp = A, At.chainInfoCache[this.urlWithoutAuth] = g, At.nodeInfoCache[this.urlWithoutAuth] = y;
    }
    qe(d) ? d !== -1 ? this.cache = new R_(d) : this.cache = void 0 : this.cache = new R_(y2);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    At.inflightFetchChainAndNodeInfoRequests = {}, At.nodeInfoCache = {}, At.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(t) {
    const { retryOptions: e, timeout: n, headers: s } = t;
    return nu(async (...i) => {
      const a = i[0], o = i[1], d = n ? AbortSignal.timeout(n) : void 0;
      let _ = {
        ...o,
        signal: d,
        headers: { ...o == null ? void 0 : o.headers, ...s }
      };
      return t.requestMiddleware && (_ = await t.requestMiddleware(_)), t.fetch ? t.fetch(a, _, t) : fetch(a, _);
    }, e);
  }
  static extractBasicAuth(t) {
    let e;
    try {
      e = new URL(t);
    } catch (a) {
      throw new v(v.CODES.INVALID_URL, "Invalid URL provided.", { url: t }, a);
    }
    const n = e.username, s = e.password, i = `${e.origin}${e.pathname}`;
    return n && s ? {
      url: t,
      urlWithoutAuth: i,
      headers: { Authorization: `Basic ${btoa(`${n}:${s}`)}` }
    } : { url: t, urlWithoutAuth: t, headers: void 0 };
  }
  /**
   * Initialize Provider async stuff
   */
  async init() {
    return await this.fetchChainAndNodeInfo(), this;
  }
  /**
   * Returns the `chainInfo` for the current network.
   *
   * @returns the chain information configuration.
   */
  async getChain() {
    return await this.init(), At.chainInfoCache[this.urlWithoutAuth];
  }
  /**
   * Returns the `nodeInfo` for the current network.
   *
   * @returns the node information configuration.
   */
  async getNode() {
    return await this.init(), At.nodeInfoCache[this.urlWithoutAuth];
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  async getGasConfig() {
    const {
      txParameters: { maxGasPerTx: t },
      predicateParameters: { maxGasPerPredicate: e },
      feeParameters: { gasPriceFactor: n, gasPerByte: s },
      gasCosts: i
    } = (await this.getChain()).consensusParameters;
    return {
      maxGasPerTx: t,
      maxGasPerPredicate: e,
      gasPriceFactor: n,
      gasPerByte: s,
      gasCosts: i
    };
  }
  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   *
   * @param url - The URL to connect to.
   * @param options - Additional options for the provider.
   */
  async connect(t, e) {
    const { url: n, urlWithoutAuth: s, headers: i } = At.extractBasicAuth(t);
    this.url = n, this.urlWithoutAuth = s, this.options = e ?? this.options, this.options = { ...this.options, headers: { ...this.options.headers, ...i } }, this.operations = this.createOperations(), await this.init();
  }
  /**
   * Return the chain and node information.
   * @param ignoreCache - If true, ignores the cache and re-fetch configs.
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo(t = !1) {
    const e = At.nodeInfoCache[this.urlWithoutAuth], n = At.chainInfoCache[this.urlWithoutAuth];
    if (e && n && !t)
      return { nodeInfo: e, chain: n };
    const i = At.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth];
    if (i)
      return i.then((o) => (this.consensusParametersTimestamp = o.consensusParametersTimestamp, {
        nodeInfo: At.nodeInfoCache[this.urlWithoutAuth],
        chain: At.chainInfoCache[this.urlWithoutAuth]
      }));
    const a = this.operations.getChainAndNodeInfo().then((o) => ({
      chain: sd(o.chain),
      nodeInfo: id(o.nodeInfo),
      consensusParametersTimestamp: Date.now()
    })).then((o) => (At.setIncompatibleNodeVersionMessage(o.nodeInfo), At.chainInfoCache[this.urlWithoutAuth] = o.chain, At.nodeInfoCache[this.urlWithoutAuth] = o.nodeInfo, this.consensusParametersTimestamp = o.consensusParametersTimestamp, o)).catch((o) => {
      const d = new v(
        v.CODES.CONNECTION_REFUSED,
        "Unable to fetch chain and node info from the network",
        { url: this.urlWithoutAuth },
        o
      );
      throw d.cause = { code: "ECONNREFUSED" }, d;
    }).finally(() => {
      delete At.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth];
    });
    return At.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth] = a, At.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth].then((o) => (this.consensusParametersTimestamp = o.consensusParametersTimestamp, {
      nodeInfo: At.nodeInfoCache[this.urlWithoutAuth],
      chain: At.chainInfoCache[this.urlWithoutAuth]
    }));
  }
  /**
   * @hidden
   */
  static setIncompatibleNodeVersionMessage(t) {
    const { isMajorSupported: e, isMinorSupported: n, supportedVersion: s } = X_(t.nodeVersion);
    (!e || !n) && (At.incompatibleNodeVersionMessage = [
      `The Fuel Node that you are trying to connect to is using fuel-core version ${t.nodeVersion}.`,
      `The TS SDK currently supports fuel-core version ${s}.`,
      "Things may not work as expected."
    ].join(`
`), b_.incompatibleNodeVersionMessage = At.incompatibleNodeVersionMessage);
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   * @hidden
   */
  createOperations() {
    const t = At.getFetchFn(this.options), e = new tb(this.urlWithoutAuth, {
      fetch: /* @__PURE__ */ T((i, a) => t(i.toString(), a || {}, this.options), "fetch"),
      responseMiddleware: /* @__PURE__ */ T((i) => {
        if ("response" in i) {
          const a = i.response;
          fA(
            a.errors,
            At.incompatibleNodeVersionMessage
          );
        }
      }, "responseMiddleware")
    }), n = /* @__PURE__ */ T((i, a) => {
      const o = i.definitions.find((_) => _.kind === "OperationDefinition");
      return (o == null ? void 0 : o.operation) === "subscription" ? b_.create({
        url: this.urlWithoutAuth,
        query: i,
        fetchFn: /* @__PURE__ */ T((_, A) => t(_, A, this.options), "fetchFn"),
        variables: a
      }) : e.request(i, a);
    }, "executeQuery"), s = /* @__PURE__ */ T((i) => ({
      getBlobs(a) {
        const o = a.blobIds.map((g, y) => `$blobId${y}: BlobId!`).join(", "), d = a.blobIds.map((g, y) => `blob${y}: blob(id: $blobId${y}) { id }`).join(`
`), _ = a.blobIds.reduce(
          (g, y, S) => (g[`blobId${S}`] = y, g),
          {}
        ), A = K`
          query getBlobs(${o}) {
            ${d}
          }
        `;
        return i(A, _);
      }
    }), "customOperations");
    return { ...pA(n), ...s(n) };
  }
  /**
   * Returns the version of the connected node.
   *
   * @returns A promise that resolves to the version string.
   */
  async getVersion() {
    const {
      nodeInfo: { nodeVersion: t }
    } = await this.operations.getVersion();
    return t;
  }
  /**
   * Returns the latest block number.
   *
   * @returns A promise that resolves to the latest block number.
   */
  async getBlockNumber() {
    const {
      chain: {
        latestBlock: { height: t }
      }
    } = await this.operations.getLatestBlockHeight();
    return x(t);
  }
  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode() {
    const { nodeInfo: t } = await this.operations.getNodeInfo(), e = id(t);
    return At.nodeInfoCache[this.urlWithoutAuth] = e, e;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: t } = await this.operations.getChain(), e = sd(t);
    return At.chainInfoCache[this.urlWithoutAuth] = e, e;
  }
  /**
   * Returns the chain ID for the current provider network.
   *
   * @returns A promise that resolves to the chain ID number.
   */
  async getChainId() {
    const {
      consensusParameters: { chainId: t }
    } = await this.getChain();
    return t.toNumber();
  }
  /**
   * Returns the base asset ID for the current provider network.
   *
   * @returns the base asset ID.
   */
  async getBaseAssetId() {
    const t = await this.getChain(), {
      consensusParameters: { baseAssetId: e }
    } = t;
    return e;
  }
  /**
   * Retrieves the details of an asset given its ID.
   *
   * @param assetId - The unique identifier of the asset.
   * @returns A promise that resolves to an object containing the asset details.
   */
  async getAssetDetails(t) {
    const { assetMetadata: e } = await this.getNodeFeatures();
    if (!e)
      throw new v(
        L.UNSUPPORTED_FEATURE,
        "The current node does not supports fetching asset details"
      );
    const { assetDetails: n } = await this.operations.getAssetDetails({ assetId: t }), { contractId: s, subId: i, totalSupply: a } = n;
    return {
      subId: i,
      contractId: s,
      totalSupply: x(a)
    };
  }
  /**
   * @hidden
   */
  async validateTransaction(t) {
    const {
      consensusParameters: {
        txParameters: { maxInputs: e, maxOutputs: n }
      }
    } = await this.getChain();
    if (x(t.inputs.length).gt(e))
      throw new v(
        L.MAX_INPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of inputs. Tx inputs: ${t.inputs.length}, max inputs: ${e}`
      );
    if (x(t.outputs.length).gt(n))
      throw new v(
        L.MAX_OUTPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of outputs. Tx outputs: ${t.outputs.length}, max outputs: ${n}`
      );
  }
  /**
   * Submits a transaction to the chain to be executed.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response object.
   */
  async sendTransaction(t, { estimateTxDependencies: e = !0, enableAssetBurn: n } = {}) {
    const s = Oe(t);
    EA(
      await this.getBaseAssetId(),
      s,
      n
    ), e && await this.estimateTxDependencies(s), await this.validateTransaction(s);
    const i = X(s.toTransactionBytes());
    let a;
    an(s) && (a = s.abis);
    const o = await this.operations.submitAndAwaitStatus({ encodedTransaction: i });
    sn(this, oo, cg).call(this, s.inputs, s.getTransactionId(await this.getChainId()));
    const d = await this.getChainId();
    return new S_(s, this, d, a, o);
  }
  /**
   * Executes a transaction without actually submitting it to the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param sendTransactionParams - The provider call parameters (optional).
   * @returns A promise that resolves to the call result object.
   */
  async dryRun(t, { utxoValidation: e, estimateTxDependencies: n = !0 } = {}) {
    const s = Oe(t);
    if (n)
      return this.estimateTxDependencies(s);
    const i = X(s.toTransactionBytes()), { dryRun: a } = await this.operations.dryRun({
      encodedTransactions: i,
      utxoValidation: e || !1
    }), [{ receipts: o, status: d }] = a;
    return { receipts: o.map(dr), dryRunStatus: d };
  }
  /**
   * Estimates the gas usage for predicates in a transaction request.
   *
   * @template T - The type of the transaction request object.
   *
   * @param transactionRequest - The transaction request to estimate predicates for.
   * @returns A promise that resolves to the updated transaction request with estimated gas usage for predicates.
   */
  async estimatePredicates(t) {
    if (!t.inputs.some(
      (a) => C_(a) && x(a.predicateGasUsed).isZero()
    ))
      return t;
    const n = X(t.toTransactionBytes()), s = await this.operations.estimatePredicates({
      encodedTransaction: n
    }), { estimatePredicates: i } = s;
    return t = this.parseEstimatePredicatesResponse(
      t,
      i
    ), t;
  }
  /**
   * Estimates the gas price and predicates for a given transaction request and block horizon.
   *
   * @param transactionRequest - The transaction request to estimate predicates and gas price for.
   * @param blockHorizon - The block horizon to use for gas price estimation.
   * @returns A promise that resolves to an object containing the updated transaction
   * request and the estimated gas price.
   */
  async estimatePredicatesAndGasPrice(t, e) {
    if (!t.inputs.some(
      (a) => C_(a) && x(a.predicateGasUsed).isZero()
    )) {
      const a = await this.estimateGasPrice(e);
      return { transactionRequest: t, gasPrice: a };
    }
    const {
      estimateGasPrice: { gasPrice: s },
      estimatePredicates: i
    } = await this.operations.estimatePredicatesAndGasPrice({
      blockHorizon: String(e),
      encodedTransaction: X(t.toTransactionBytes())
    });
    return t = this.parseEstimatePredicatesResponse(
      t,
      i
    ), { transactionRequest: t, gasPrice: x(s) };
  }
  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @param gasPrice - The gas price to use for the transaction, if not provided it will be fetched.
   * @returns A promise that resolves to the estimate transaction dependencies.
   */
  async estimateTxDependencies(t, { gasPrice: e } = {}) {
    if (n2(t))
      return {
        rawReceipts: [],
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let n = [], s = [];
    const i = [];
    let a = 0, o;
    await this.validateTransaction(t);
    const d = e ?? await this.estimateGasPrice(10);
    for (let _ = 0; _ < T_; _++) {
      const {
        dryRun: [{ receipts: A, status: g }]
      } = await this.operations.dryRun({
        encodedTransactions: [X(t.toTransactionBytes())],
        utxoValidation: !1,
        gasPrice: d.toString()
      });
      n = A, s = A.map(dr), o = g;
      const { missingOutputVariables: y, missingOutputContractIds: S } = E_(s);
      if ((y.length !== 0 || S.length !== 0) && an(t)) {
        a += y.length, t.addVariableOutputs(y.length), S.forEach(({ contractId: F }) => {
          t.addContractInputAndOutput(new gt(F)), i.push(F);
        });
        const { maxFee: R } = await this.estimateTxGasAndFee({
          transactionRequest: t,
          gasPrice: d
        });
        t.maxFee = R;
      } else
        break;
    }
    return {
      rawReceipts: n,
      receipts: s,
      outputVariables: a,
      missingContractIds: i,
      dryRunStatus: o
    };
  }
  /**
   * Dry runs multiple transactions and checks for missing dependencies in batches.
   *
   * Transactions are dry run in batches. After each dry run, transactions requiring
   * further modifications are identified. The method iteratively updates these transactions
   * and performs subsequent dry runs until all dependencies for each transaction are satisfied.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @returns A promise that resolves to an array of results for each transaction.
   */
  async estimateMultipleTxDependencies(t) {
    const e = t.map(() => ({
      rawReceipts: [],
      receipts: [],
      outputVariables: 0,
      missingContractIds: [],
      dryRunStatus: void 0
    })), n = Ne(t), s = /* @__PURE__ */ new Map();
    n.forEach((o, d) => {
      an(o) && s.set(d, X(o.toTransactionBytes()));
    });
    let i = Array.from(s.keys()), a = 0;
    for (; i.length > 0 && a < T_; ) {
      const o = i.map(
        (A) => s.get(A)
      ), d = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), _ = [];
      for (let A = 0; A < d.dryRun.length; A++) {
        const g = i[A], { receipts: y, status: S } = d.dryRun[A], O = e[g];
        O.receipts = y.map(dr), O.dryRunStatus = S;
        const { missingOutputVariables: R, missingOutputContractIds: F } = E_(
          O.receipts
        ), z = R.length > 0 || F.length > 0, H = n[g];
        if (z && an(H)) {
          O.outputVariables += R.length, H.addVariableOutputs(R.length), F.forEach(({ contractId: P }) => {
            H.addContractInputAndOutput(new gt(P)), O.missingContractIds.push(P);
          });
          const { maxFee: V } = await this.estimateTxGasAndFee({
            transactionRequest: H
          });
          H.maxFee = V, s.set(g, X(H.toTransactionBytes())), _.push(g);
        }
      }
      i = _, a += 1;
    }
    return e;
  }
  /**
   * Dry runs multiple transactions.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @param sendTransactionParams - The provider call parameters (optional).
   *
   * @returns A promise that resolves to an array of results for each transaction call.
   */
  async dryRunMultipleTransactions(t, { utxoValidation: e, estimateTxDependencies: n = !0 } = {}) {
    if (n)
      return this.estimateMultipleTxDependencies(t);
    const s = t.map((o) => X(o.toTransactionBytes())), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: e || !1
    });
    return i.map(({ receipts: o, status: d }) => ({ receipts: o.map(dr), dryRunStatus: d }));
  }
  async autoRefetchConfigs() {
    var a;
    if (Date.now() - (this.consensusParametersTimestamp ?? 0) < 6e4)
      return;
    if (!((a = At.chainInfoCache) != null && a[this.urlWithoutAuth])) {
      await this.fetchChainAndNodeInfo(!0);
      return;
    }
    const n = At.chainInfoCache[this.urlWithoutAuth], {
      consensusParameters: { version: s }
    } = n, {
      chain: {
        latestBlock: {
          header: { consensusParametersVersion: i }
        }
      }
    } = await this.operations.getConsensusParametersVersion();
    s !== i && await this.fetchChainAndNodeInfo(!0);
  }
  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param params - The parameters for estimating the transaction gas and fee.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(t) {
    const { transactionRequest: e, gasPrice: n } = t;
    let s = n;
    await this.autoRefetchConfigs();
    const i = await this.getChain(), { gasPriceFactor: a, maxGasPerTx: o } = await this.getGasConfig(), d = e.calculateMinGas(i);
    qe(s) || (s = await this.estimateGasPrice(10));
    const _ = Ii({
      gasPrice: x(s),
      gas: d,
      priceFactor: a,
      tip: e.tip
    }).add(1);
    let A = x(0);
    an(e) && (A = e.gasLimit, e.gasLimit.eq(0) && (e.gasLimit = d, e.gasLimit = o.sub(
      e.calculateMaxGas(i, d)
    ), A = e.gasLimit));
    const g = e.calculateMaxGas(i, d), y = Ii({
      gasPrice: x(s),
      gas: g,
      priceFactor: a,
      tip: e.tip
    }).add(1);
    return {
      minGas: d,
      minFee: _,
      maxGas: g,
      maxFee: y,
      gasPrice: s,
      gasLimit: A
    };
  }
  /**
   * Executes a signed transaction without applying the states changes
   * on the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added
   *
   * @param transactionRequestLike - The transaction request object.
   * @param estimateTxParams - The estimate transaction params (optional).
   * @returns A promise that resolves to the call result object.
   */
  async simulate(t, { estimateTxDependencies: e = !0 } = {}) {
    const n = Oe(t);
    if (e)
      return this.estimateTxDependencies(n);
    const s = [X(n.toTransactionBytes())], { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: !0
    });
    return { receipts: i.map((o) => {
      const { id: d, receipts: _, status: A } = o, g = _.map(dr);
      return { id: d, receipts: g, status: A };
    })[0].receipts };
  }
  /**
   * @hidden
   *
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   */
  async getTransactionCost(t, { signatureCallback: e, gasPrice: n } = {}) {
    const s = Ne(Oe(t)), i = s.maxFee.eq(0), a = an(s);
    a && (s.gasLimit = x(0));
    const o = Ne(s);
    let d = 0;
    if (e && an(o)) {
      const Q = o.witnesses.length;
      await e(o), d = o.witnesses.length - Q;
    }
    let _;
    n ? (_ = n, await this.estimatePredicates(o)) : { gasPrice: _ } = await this.estimatePredicatesAndGasPrice(o, 10), s.updatePredicateGasUsed(o.inputs);
    let { maxFee: A, maxGas: g, minFee: y, minGas: S, gasLimit: O } = await this.estimateTxGasAndFee({
      // Fetches and returns a gas price
      transactionRequest: o,
      gasPrice: _
    }), R = [], F = [], z, H = [], V = 0, P = x(0);
    if (s.maxFee = A, a) {
      if (s.gasLimit = O, e && await e(s), { rawReceipts: R, receipts: F, missingContractIds: H, outputVariables: V, dryRunStatus: z } = await this.estimateTxDependencies(s, { gasPrice: _ }), z && "reason" in z)
        throw this.extractDryRunError(s, F, z);
      const { maxGasPerTx: Q } = await this.getGasConfig(), k = So(F);
      P = x(k.muln(b2)).max(Q.sub(S)), s.gasLimit = P, { maxFee: A, maxGas: g, minFee: y, minGas: S } = await this.estimateTxGasAndFee({
        transactionRequest: s,
        gasPrice: _
      });
    }
    const M = {
      gasPrice: _.toString(),
      receipts: R
    };
    return {
      rawReceipts: R,
      receipts: F,
      gasUsed: P,
      gasPrice: _,
      minGas: S,
      maxGas: g,
      minFee: y,
      maxFee: A,
      outputVariables: V,
      missingContractIds: H,
      addedSignatures: d,
      estimatedPredicates: s.inputs,
      dryRunStatus: z,
      updateMaxFee: i,
      transactionSummary: M
    };
  }
  /**
   * Returns coins for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get (optional).
   * @param paginationArgs - Pagination arguments (optional).
   *
   * @returns A promise that resolves to the coins.
   */
  async getCoins(t, e, n) {
    const s = new gt(t), {
      coins: { edges: i, pageInfo: a }
    } = await this.operations.getCoins({
      ...Zn({
        paginationLimit: N_,
        inputArgs: n
      }),
      filter: { owner: s.toB256(), assetId: e && X(e) }
    });
    return {
      coins: i.map(({ node: d }) => ({
        id: d.utxoId,
        assetId: d.assetId,
        amount: x(d.amount),
        owner: s,
        blockCreated: x(d.blockCreated),
        txCreatedIdx: x(d.txCreatedIdx)
      })),
      pageInfo: a
    };
  }
  /**
   * Returns resources for the given owner satisfying the spend query.
   *
   * @param owner - The address to get resources for.
   * @param quantities - The coin quantities to get.
   * @param excludedIds - IDs of excluded resources from the selection (optional).
   * @returns A promise that resolves to the resources.
   */
  async getResourcesToSpend(t, e, n) {
    var _, A;
    const s = new gt(t);
    let i = {
      messages: ((_ = n == null ? void 0 : n.messages) == null ? void 0 : _.map((g) => X(g))) || [],
      utxos: ((A = n == null ? void 0 : n.utxos) == null ? void 0 : A.map((g) => X(g))) || []
    };
    if (this.cache) {
      const g = this.cache.getActiveData(s.toB256());
      if (g.utxos.length || g.messages.length) {
        const {
          consensusParameters: {
            txParameters: { maxInputs: y }
          }
        } = await this.getChain();
        i = A2({
          userInput: i,
          cached: g,
          maxInputs: y.toNumber()
        });
      }
    }
    const a = {
      owner: s.toB256(),
      queryPerAsset: e.map(Gd).map(({ assetId: g, amount: y, max: S }) => ({
        assetId: X(g),
        amount: (y.eqn(0) ? x(1) : y).toString(10),
        max: S ? S.toString(10) : void 0
      })),
      excludedIds: i
    };
    return (await this.operations.getCoinsToSpend(a)).coinsToSpend.flat().map((g) => {
      switch (g.type) {
        case "MessageCoin":
          return {
            amount: x(g.amount),
            assetId: g.assetId,
            daHeight: x(g.daHeight),
            sender: new gt(g.sender),
            recipient: new gt(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: x(g.amount),
            assetId: g.assetId,
            owner: s,
            blockCreated: x(g.blockCreated),
            txCreatedIdx: x(g.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((g) => !!g);
  }
  /**
   * Returns an array of blobIds that exist on chain, for a given array of blobIds.
   *
   * @param blobIds - blobIds to check.
   * @returns - A promise that resolves to an array of blobIds that exist on chain.
   */
  async getBlobs(t) {
    const e = await this.operations.getBlobs({ blobIds: t }), n = [];
    return Object.keys(e).forEach((s) => {
      const i = e[s];
      n.push((i == null ? void 0 : i.id) ?? null);
    }), n.filter((s) => s);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block or null.
   */
  async getBlock(t) {
    let e;
    if (t === "latest") {
      const {
        chain: { latestBlock: o }
      } = await this.operations.getLatestBlock();
      e = o;
    } else {
      const d = typeof t == "string" && Pn(t) ? { blockId: t } : { height: x(t).toString(10) };
      e = (await this.operations.getBlock(d)).block;
    }
    if (!e)
      return null;
    const { header: n, height: s, id: i, transactions: a } = e;
    return {
      id: i,
      height: x(s),
      time: n.time,
      header: {
        applicationHash: n.applicationHash,
        daHeight: x(n.daHeight),
        eventInboxRoot: n.eventInboxRoot,
        messageOutboxRoot: n.messageOutboxRoot,
        prevRoot: n.prevRoot,
        stateTransitionBytecodeVersion: n.stateTransitionBytecodeVersion,
        transactionsCount: n.transactionsCount,
        transactionsRoot: n.transactionsRoot
      },
      transactionIds: a.map((o) => o.id)
    };
  }
  /**
   * Returns all the blocks matching the given parameters.
   *
   * @param params - The parameters to query blocks.
   * @returns A promise that resolves to the blocks.
   */
  async getBlocks(t) {
    const {
      blocks: { edges: e, pageInfo: n }
    } = await this.operations.getBlocks({
      ...Zn({
        paginationLimit: m2,
        inputArgs: t
      })
    });
    return { blocks: e.map(({ node: i }) => ({
      id: i.id,
      height: x(i.height),
      time: i.header.time,
      header: {
        applicationHash: i.header.applicationHash,
        daHeight: x(i.header.daHeight),
        eventInboxRoot: i.header.eventInboxRoot,
        messageOutboxRoot: i.header.messageOutboxRoot,
        prevRoot: i.header.prevRoot,
        stateTransitionBytecodeVersion: i.header.stateTransitionBytecodeVersion,
        transactionsCount: i.header.transactionsCount,
        transactionsRoot: i.header.transactionsRoot
      },
      transactionIds: i.transactions.map((a) => a.id)
    })), pageInfo: n };
  }
  /**
   * Returns block matching the given ID or type, including transaction data.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlockWithTransactions(t) {
    let e;
    typeof t == "number" ? e = { blockHeight: x(t).toString(10) } : t === "latest" ? e = { blockHeight: (await this.getBlockNumber()).toString() } : typeof t == "string" && Pn(t) ? e = { blockId: t } : e = { blockHeight: x(t).toString() };
    const { block: n } = await this.operations.getBlockWithTransactions(e);
    return n ? {
      id: n.id,
      height: x(n.height, 10),
      time: n.header.time,
      header: {
        applicationHash: n.header.applicationHash,
        daHeight: x(n.header.daHeight),
        eventInboxRoot: n.header.eventInboxRoot,
        messageOutboxRoot: n.header.messageOutboxRoot,
        prevRoot: n.header.prevRoot,
        stateTransitionBytecodeVersion: n.header.stateTransitionBytecodeVersion,
        transactionsCount: n.header.transactionsCount,
        transactionsRoot: n.header.transactionsRoot
      },
      transactionIds: n.transactions.map((s) => s.id),
      transactions: n.transactions.map(
        (s) => {
          var i;
          return (i = new Er().decode(Z(s.rawPayload), 0)) == null ? void 0 : i[0];
        }
      )
    } : null;
  }
  /**
   * Get transaction with the given ID.
   *
   * @param transactionId - ID of the transaction.
   * @returns A promise that resolves to the transaction.
   */
  async getTransaction(t) {
    var n;
    const { transaction: e } = await this.operations.getTransaction({ transactionId: t });
    if (!e)
      return null;
    try {
      return (n = new Er().decode(
        Z(e.rawPayload),
        0
      )) == null ? void 0 : n[0];
    } catch (s) {
      if (s instanceof v && s.code === L.UNSUPPORTED_TRANSACTION_TYPE)
        return console.warn("Unsupported transaction type encountered"), null;
      throw s;
    }
  }
  /**
   * Retrieves transactions based on the provided pagination arguments.
   * @param paginationArgs - The pagination arguments for retrieving transactions.
   * @returns A promise that resolves to an object containing the retrieved transactions and pagination information.
   */
  async getTransactions(t) {
    const {
      transactions: { edges: e, pageInfo: n }
    } = await this.operations.getTransactions({
      ...Zn({
        inputArgs: t,
        paginationLimit: og
      })
    }), s = new Er();
    return { transactions: e.map(({ node: { rawPayload: a } }) => {
      try {
        return s.decode(Z(a), 0)[0];
      } catch (o) {
        if (o instanceof v && o.code === L.UNSUPPORTED_TRANSACTION_TYPE)
          return console.warn("Unsupported transaction type encountered"), null;
        throw o;
      }
    }).filter((a) => a !== null), pageInfo: n };
  }
  /**
   * Fetches a compressed block at the specified height.
   *
   * @param height - The height of the block to fetch.
   * @returns The compressed block if available, otherwise `null`.
   */
  async daCompressedBlock(t) {
    const { daCompressedBlock: e } = await this.operations.daCompressedBlock({
      height: t
    });
    return e || null;
  }
  /**
   * Get deployed contract with the given ID.
   *
   * @param contractId - ID of the contract.
   * @returns A promise that resolves to the contract.
   */
  async getContract(t) {
    const { contract: e } = await this.operations.getContract({ contractId: t });
    return e || null;
  }
  /**
   * Returns the balance for the given contract for the given asset ID.
   *
   * @param contractId - The contract ID to get the balance for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getContractBalance(t, e) {
    const { contractBalance: n } = await this.operations.getContractBalance({
      contract: new gt(t).toB256(),
      asset: X(e)
    });
    return x(n.amount, 10);
  }
  /**
   * Returns the balance for the given owner for the given asset ID.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getBalance(t, e) {
    const { balance: n } = await this.operations.getBalanceV2({
      owner: new gt(t).toB256(),
      assetId: X(e)
    });
    return x(n.amountU128, 10);
  }
  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the balances.
   */
  async getBalances(t, e) {
    let n = { first: w2 };
    const { balancesPagination: s } = await this.getNodeFeatures();
    s && (n = Zn({
      inputArgs: e,
      paginationLimit: g2
    }));
    const {
      balances: { edges: i, pageInfo: a }
    } = await this.operations.getBalancesV2({
      ...n,
      filter: { owner: new gt(t).toB256() },
      supportsPagination: s
    });
    return {
      balances: i.map(({ node: d }) => ({
        assetId: d.assetId,
        amount: x(d.amountU128)
      })),
      ...s ? { pageInfo: a } : {}
    };
  }
  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the messages.
   */
  async getMessages(t, e) {
    const {
      messages: { edges: n, pageInfo: s }
    } = await this.operations.getMessages({
      ...Zn({
        inputArgs: e,
        paginationLimit: N_
      }),
      owner: new gt(t).toB256()
    });
    return {
      messages: n.map(({ node: a }) => ({
        messageId: pn.getMessageId({
          sender: a.sender,
          recipient: a.recipient,
          nonce: a.nonce,
          amount: x(a.amount),
          data: a.data
        }),
        sender: new gt(a.sender),
        recipient: new gt(a.recipient),
        nonce: a.nonce,
        amount: x(a.amount),
        data: pn.decodeData(a.data),
        daHeight: x(a.daHeight)
      })),
      pageInfo: s
    };
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param transactionId - The transaction to get message from.
   * @param messageId - The message id from MessageOut receipt.
   * @param commitBlockId - The commit block id (optional).
   * @param commitBlockHeight - The commit block height (optional).
   * @returns A promise that resolves to the message proof.
   */
  async getMessageProof(t, e, n, s) {
    let i = {
      transactionId: t,
      nonce: e
    };
    if (n && s)
      throw new v(
        L.INVALID_INPUT_PARAMETERS,
        "commitBlockId and commitBlockHeight cannot be used together"
      );
    n && (i = {
      ...i,
      commitBlockId: n
    }), s && (i = {
      ...i,
      // Convert BN into a number string required on the query
      // This should probably be fixed on the fuel client side
      commitBlockHeight: s.toNumber().toString()
    });
    const a = await this.operations.getMessageProof(i), {
      messageProof: o,
      messageBlockHeader: d,
      commitBlockHeader: _,
      blockProof: A,
      sender: g,
      recipient: y,
      amount: S,
      data: O
    } = a.messageProof;
    return {
      messageProof: {
        proofIndex: x(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: x(A.proofIndex),
        proofSet: A.proofSet
      },
      messageBlockHeader: {
        id: d.id,
        daHeight: x(d.daHeight),
        transactionsCount: Number(d.transactionsCount),
        transactionsRoot: d.transactionsRoot,
        height: x(d.height),
        prevRoot: d.prevRoot,
        time: d.time,
        applicationHash: d.applicationHash,
        messageReceiptCount: Number(d.messageReceiptCount),
        messageOutboxRoot: d.messageOutboxRoot,
        consensusParametersVersion: Number(d.consensusParametersVersion),
        eventInboxRoot: d.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(d.stateTransitionBytecodeVersion)
      },
      commitBlockHeader: {
        id: _.id,
        daHeight: x(_.daHeight),
        transactionsCount: Number(_.transactionsCount),
        transactionsRoot: _.transactionsRoot,
        height: x(_.height),
        prevRoot: _.prevRoot,
        time: _.time,
        applicationHash: _.applicationHash,
        messageReceiptCount: Number(_.messageReceiptCount),
        messageOutboxRoot: _.messageOutboxRoot,
        consensusParametersVersion: Number(_.consensusParametersVersion),
        eventInboxRoot: _.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(_.stateTransitionBytecodeVersion)
      },
      sender: new gt(g),
      recipient: new gt(y),
      nonce: e,
      amount: x(S),
      data: O
    };
  }
  /**
   * Get the latest gas price from the node.
   *
   * @returns A promise that resolves to the latest gas price.
   */
  async getLatestGasPrice() {
    const { latestGasPrice: t } = await this.operations.getLatestGasPrice();
    return x(t.gasPrice);
  }
  /**
   * Returns the estimate gas price for the given block horizon.
   *
   * @param blockHorizon - The block horizon to estimate gas price for.
   * @returns A promise that resolves to the estimated gas price.
   */
  async estimateGasPrice(t) {
    const { estimateGasPrice: e } = await this.operations.estimateGasPrice({
      blockHorizon: String(t)
    });
    return x(e.gasPrice);
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param nonce - The nonce of the message to get status from.
   * @returns A promise that resolves to the message status
   */
  async getMessageStatus(t) {
    return (await this.operations.getMessageStatus({ nonce: t })).messageStatus;
  }
  /**
   * Lets you produce blocks with custom timestamps and the block number of the last block produced.
   *
   * @param amount - The amount of blocks to produce.
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block (optional).
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(t, e) {
    const { produceBlocks: n } = await this.operations.produceBlocks({
      blocksToProduce: x(t).toString(10),
      startTimestamp: e ? dp.fromUnixMilliseconds(e).toTai64() : void 0
    });
    return x(n);
  }
  /**
   * Check if the given ID is an account.
   *
   * @param id - The ID to check.
   * @returns A promise that resolves to the result of the check.
   */
  async isUserAccount(t) {
    return await this.getAddressType(t) === "Account";
  }
  /**
   * Determines the type of address based on the provided ID.
   *
   * @param id - The ID to be checked.
   * @returns A promise that resolves to a string indicating the type of address.
   */
  async getAddressType(t) {
    const { contract: e, blob: n, transaction: s } = await this.operations.isUserAccount({
      blobId: t,
      contractId: t,
      transactionId: t
    });
    if (e)
      return "Contract";
    if (n)
      return "Blob";
    if (s)
      return "Transaction";
    try {
      if (await this.getAssetDetails(t))
        return "Asset";
    } catch {
    }
    return "Account";
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  async getTransactionResponse(t) {
    const e = await this.getChainId();
    return new S_(t, this, e);
  }
  /**
   * Returns Message for given nonce.
   *
   * @param nonce - The nonce of the message to retrieve.
   * @returns A promise that resolves to the Message object or null.
   */
  async getMessageByNonce(t) {
    const { message: e } = await this.operations.getMessageByNonce({ nonce: t });
    return e ? {
      messageId: pn.getMessageId({
        sender: e.sender,
        recipient: e.recipient,
        nonce: t,
        amount: x(e.amount),
        data: e.data
      }),
      sender: new gt(e.sender),
      recipient: new gt(e.recipient),
      nonce: t,
      amount: x(e.amount),
      data: pn.decodeData(e.data),
      daHeight: x(e.daHeight)
    } : null;
  }
  /**
   * Get the relayed transaction for the given transaction ID.
   *
   * @param relayedTransactionId - The relayed transaction ID to get the response for.
   * @returns A promise that resolves to the relayed transaction.
   */
  async getRelayedTransactionStatus(t) {
    const { relayedTransactionStatus: e } = await this.operations.getRelayedTransactionStatus({
      relayedTransactionId: t
    });
    return e || null;
  }
  /**
   * @hidden
   */
  extractDryRunError(t, e, n) {
    const s = n;
    let i = [], a = {};
    return t.abis && ({ logs: i, groupedLogs: a } = Oo({
      receipts: e,
      mainAbi: t.abis.main,
      externalAbis: t.abis.otherContractsAbis
    })), Jd({
      logs: i,
      groupedLogs: a,
      receipts: e,
      statusReason: s.reason
    });
  }
  /**
   * @hidden
   */
  async getNodeFeatures() {
    const { indexation: t } = await this.getNode();
    return {
      assetMetadata: !!(t != null && t.assetMetadata),
      balancesPagination: !!(t != null && t.balances),
      coinsToSpend: !!(t != null && t.coinsToSpend)
    };
  }
  /**
   * @hidden
   */
  parseEstimatePredicatesResponse(t, { inputs: e }) {
    return e && e.forEach((n, s) => {
      n && "predicateGasUsed" in n && x(n.predicateGasUsed).gt(0) && (t.inputs[s].predicateGasUsed = n.predicateGasUsed);
    }), t;
  }
}, oo = new WeakSet(), /**
 * @hidden
 */
cg = function(t, e) {
  this.cache && this.cache.set(e, t);
}, T(At, "Provider"), /** @hidden */
D(At, "inflightFetchChainAndNodeInfoRequests", {}), /** @hidden */
D(At, "chainInfoCache", {}), /** @hidden */
D(At, "nodeInfoCache", {}), /** @hidden */
D(At, "incompatibleNodeVersionMessage", ""), At);
async function I2(r) {
  const { id: t, provider: e, abiMap: n } = r, { transaction: s } = await e.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      L.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Er().decode(
    Z(s.rawPayload),
    0
  );
  let a = [];
  s != null && s.status && "receipts" in s.status && (a = s.status.receipts);
  const o = a.map(dr), {
    consensusParameters: {
      feeParameters: { gasPerByte: d, gasPriceFactor: _ },
      txParameters: { maxInputs: A, maxGasPerTx: g },
      gasCosts: y
    }
  } = await e.getChain(), O = ng(s.status) ? x(0) : await e.getLatestGasPrice(), R = await e.getBaseAssetId();
  return {
    ...Ni({
      id: s.id,
      receipts: o,
      transaction: i,
      transactionBytes: Z(s.rawPayload),
      gqlTransactionStatus: s.status,
      gasPerByte: x(d),
      gasPriceFactor: x(_),
      abiMap: n,
      maxInputs: A,
      gasCosts: y,
      maxGasPerTx: g,
      gasPrice: O,
      baseAssetId: R
    })
  };
}
T(I2, "getTransactionSummary");
async function E2(r) {
  const { provider: t, transactionRequest: e, abiMap: n } = r, { receipts: s } = await t.dryRun(e), { gasPerByte: i, gasPriceFactor: a, gasCosts: o, maxGasPerTx: d } = await t.getGasConfig(), _ = (await t.getChain()).consensusParameters.txParameters.maxInputs, A = e.toTransaction(), g = e.toTransactionBytes(), y = await t.getLatestGasPrice(), S = await t.getBaseAssetId();
  return Ni({
    id: e.getTransactionId(await t.getChainId()),
    receipts: s,
    transaction: A,
    transactionBytes: g,
    abiMap: n,
    gasPerByte: i,
    gasPriceFactor: a,
    maxInputs: _,
    gasCosts: o,
    maxGasPerTx: d,
    gasPrice: y,
    baseAssetId: S
  });
}
T(E2, "getTransactionSummaryFromRequest");
async function C2(r) {
  const { filters: t, provider: e, abiMap: n } = r, { owner: s, ...i } = t, a = Zn({
    inputArgs: i,
    paginationLimit: og
  }), { transactionsByOwner: o } = await e.operations.getTransactionsByOwner({
    ...a,
    owner: s
  }), { edges: d, pageInfo: _ } = o, {
    consensusParameters: {
      feeParameters: { gasPerByte: A, gasPriceFactor: g },
      txParameters: { maxInputs: y, maxGasPerTx: S },
      gasCosts: O
    }
  } = await e.getChain(), R = await e.getLatestGasPrice(), F = await e.getBaseAssetId();
  return {
    transactions: d.map((H) => {
      const { node: V } = H, { id: P, rawPayload: M, status: Q } = V, [k] = new Er().decode(Z(M), 0);
      let U = [];
      V != null && V.status && "receipts" in V.status && (U = V.status.receipts);
      const G = U.map(dr);
      return {
        ...Ni({
          id: P,
          receipts: G,
          transaction: k,
          transactionBytes: Z(M),
          gqlTransactionStatus: Q,
          abiMap: n,
          gasPerByte: A,
          gasPriceFactor: g,
          maxInputs: y,
          gasCosts: O,
          maxGasPerTx: S,
          gasPrice: R,
          baseAssetId: F
        })
      };
    }),
    pageInfo: _
  };
}
T(C2, "getTransactionsSummaries");
var oR = /* @__PURE__ */ T(async (r) => {
  const { provider: t, transactionSummary: e } = r, { id: n, transactionBytes: s, gasPrice: i, receipts: a } = e, {
    consensusParameters: {
      baseAssetId: o,
      txParameters: { maxInputs: d, maxGasPerTx: _ },
      feeParameters: { gasPriceFactor: A, gasPerByte: g },
      gasCosts: y
    }
  } = await t.getChain(), S = Z(s), [O] = new Er().decode(S, 0);
  return Ni({
    id: n,
    transaction: O,
    transactionBytes: S,
    receipts: a.map(dr),
    gasPrice: x(i),
    // From chain
    baseAssetId: o,
    maxInputs: d,
    gasCosts: y,
    maxGasPerTx: _,
    gasPerByte: g,
    gasPriceFactor: A
  });
}, "assembleTransactionSummaryFromJson"), F_ = /* @__PURE__ */ T((...r) => {
  const t = {};
  function e({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return T(e, "addToMap"), r.forEach((n) => n.forEach(e)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, "mergeQuantities"), Ks, v2 = (Ks = class {
}, T(Ks, "AbstractAccount"), Ks), B2 = /* @__PURE__ */ T((r) => {
  const t = new rt("u64");
  return r.reduce((e, n) => {
    const { assetId: s, amount: i, contractId: a } = n, o = t.encode(i), d = ot([new gt(a).toBytes(), o, Z(s)]);
    return ot([e, d]);
  }, new Uint8Array());
}, "formatTransferToContractScriptData"), x2 = /* @__PURE__ */ T(async (r) => {
  const t = B2(r);
  await Co();
  let e = new Uint8Array();
  return r.forEach((n, s) => {
    const i = (Hc + ht + Zi) * s;
    e = ot([
      e,
      // Load ScriptData into register 0x10.
      Sf(16, 0, Nf.ScriptData).to_bytes(),
      // Add the offset to 0x10 so it will point to the current contract ID, store in 0x11.
      wr(17, 16, i).to_bytes(),
      // Add CONTRACT_ID_LEN to 0x11 to point to the amount in the ScriptData, store in 0x12.
      wr(18, 17, Hc).to_bytes(),
      // Load word to the amount at 0x12 into register 0x13.
      Ji(19, 18, 0).to_bytes(),
      // Add WORD_SIZE to 0x12 to point to the asset ID in the ScriptData, store in 0x14.
      wr(20, 18, ht).to_bytes(),
      // Perform the transfer using contract ID in 0x11, amount in 0x13, and asset ID in 0x14.
      xf(17, 19, 20).to_bytes()
    ]);
  }), e = ot([e, Qd(1).to_bytes()]), { script: e, scriptData: t };
}, "assembleTransferToContractScript"), R2 = 5, ti, Mo = (ti = class extends v2 {
  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   * @param connector - A FuelConnector instance (optional).
   */
  constructor(e, n, s) {
    super();
    /**
     * The address associated with the account.
     */
    D(this, "address");
    /**
     * The provider used to interact with the network.
     */
    D(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    D(this, "_connector");
    this._provider = n, this._connector = s, this.address = new gt(e);
  }
  /**
   * The provider used to interact with the network.
   *
   * @returns A Provider instance.
   *
   * @throws `FuelError` if the provider is not set.
   */
  get provider() {
    if (!this._provider)
      throw new v(L.MISSING_PROVIDER, "Provider not set");
    return this._provider;
  }
  /**
   * Sets the provider for the account.
   *
   * @param provider - A Provider instance.
   */
  set provider(e) {
    this._provider = e;
  }
  /**
   * Changes the provider connection for the account.
   *
   * @param provider - A Provider instance.
   * @returns The updated Provider instance.
   */
  connect(e) {
    return this._provider = e, this.provider;
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - Quantities of resources to be obtained.
   * @param excludedIds - IDs of resources to be excluded from the query (optional).
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(e, n) {
    return this.provider.getResourcesToSpend(this.address, e, n);
  }
  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve (optional).
   * @returns A promise that resolves to an array of Coins.
   */
  async getCoins(e, n) {
    return this.provider.getCoins(this.address, e, n);
  }
  /**
   * Retrieves messages owned by the account.
   *
   * @returns A promise that resolves to an array of Messages.
   */
  async getMessages(e) {
    return this.provider.getMessages(this.address, e);
  }
  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for (optional).
   * @returns A promise that resolves to the balance amount.
   */
  async getBalance(e) {
    const n = e ?? await this.provider.getBaseAssetId();
    return await this.provider.getBalance(this.address, n);
  }
  /**
   * Retrieves all the balances for the account.
   *
   * @returns A promise that resolves to an array of Coins and their quantities.
   */
  async getBalances() {
    return this.provider.getBalances(this.address);
  }
  /**
   * Funds a transaction request by adding the necessary resources.
   *
   * @typeParam T - The type of the TransactionRequest.
   * @param request - The transaction request to fund.
   * @param params - The estimated transaction parameters.
   * @returns A promise that resolves to the funded transaction request.
   */
  async fund(e, n) {
    var M;
    const {
      addedSignatures: s,
      estimatedPredicates: i,
      requiredQuantities: a,
      updateMaxFee: o,
      gasPrice: d,
      transactionSummary: _
    } = n, A = await this.provider.getChainId(), g = e.maxFee, y = await this.provider.getBaseAssetId(), S = ((M = a.find((Q) => Q.assetId === y)) == null ? void 0 : M.amount) || x(0), O = xB({
      amount: x(g),
      assetId: y,
      coinQuantities: a
    }), R = {};
    O.forEach(({ amount: Q, assetId: k }) => {
      R[k] = {
        required: Q,
        owned: x(0)
      };
    }), e.inputs.filter(zn).forEach((Q) => {
      const U = kr(Q) ? String(Q.assetId) : y;
      R[U] && (R[U].owned = R[U].owned.add(Q.amount));
    });
    let F = [];
    Object.entries(R).forEach(([Q, { owned: k, required: U }]) => {
      k.lt(U) && F.push({
        assetId: Q,
        amount: U.sub(k)
      });
    });
    let z = F.length > 0, H = 0;
    for (; z && H < R2; ) {
      const Q = await this.getResourcesToSpend(
        F,
        q1(e.inputs, this.address)
      );
      e.addResources(Q), e.updatePredicateGasUsed(i);
      const k = Ne(e);
      if (s && Array.from({ length: s }).forEach(
        () => k.addEmptyWitness()
      ), !o) {
        z = !1;
        break;
      }
      const { maxFee: U } = await this.provider.estimateTxGasAndFee({
        transactionRequest: k,
        gasPrice: d
      }), G = J1(
        e.inputs.filter(zn),
        y,
        y
      ), j = S.add(U);
      G.gt(j) ? z = !1 : F = [
        {
          amount: j.sub(G),
          assetId: y
        }
      ], H += 1;
    }
    if (z)
      throw new v(
        L.INSUFFICIENT_FUNDS_OR_MAX_COINS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
    e.updateState(A, "funded", _), await this.provider.validateTransaction(e), e.updatePredicateGasUsed(i);
    const V = Ne(e);
    if (s && Array.from({ length: s }).forEach(() => V.addEmptyWitness()), !o)
      return e;
    const { maxFee: P } = await this.provider.estimateTxGasAndFee({
      transactionRequest: V,
      gasPrice: d
    });
    return e.maxFee = P, e;
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(e, n, s, i = {}) {
    let a = new gn(i);
    return a = this.addTransfer(a, {
      destination: e,
      amount: n,
      assetId: s || await this.provider.getBaseAssetId()
    }), a = await this.estimateAndFundTransaction(a, i), a;
  }
  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(e, n, s, i = {}) {
    const a = await this.createTransfer(e, n, s, i);
    return this.sendTransaction(a, { estimateTxDependencies: !1 });
  }
  /**
   * Transfers multiple amounts of a token to multiple recipients.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @param txParams - Optional transaction parameters.
   * @returns A promise that resolves to a `TransactionResponse` object representing the transaction result.
   */
  async batchTransfer(e, n = {}) {
    let s = new gn(n);
    return s = this.addBatchTransfer(s, e), s = await this.estimateAndFundTransaction(s, n), this.sendTransaction(s, { estimateTxDependencies: !1 });
  }
  /**
   * Adds a transfer to the given transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - The object representing the transfer to be made.
   * @returns The updated transaction request with the added transfer.
   */
  addTransfer(e, n) {
    const { destination: s, amount: i, assetId: a } = n;
    return this.validateTransferAmount(i), e.addCoinOutput(new gt(s), i, a), e;
  }
  /**
   * Adds multiple transfers to a script transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The updated script transaction request.
   */
  addBatchTransfer(e, n) {
    return n.forEach(({ destination: s, amount: i, assetId: a }) => {
      this.addTransfer(e, {
        destination: s,
        amount: i,
        assetId: a
      });
    }), e;
  }
  /**
   * Transfers coins to a contract address.
   *
   * @param contractId - The address of the contract.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async transferToContract(e, n, s, i = {}) {
    return this.batchTransferToContracts([{ amount: n, assetId: s, contractId: e }], i);
  }
  async batchTransferToContracts(e, n = {}) {
    let s = new gn({
      ...n
    });
    const i = [], a = await this.provider.getBaseAssetId(), o = e.map((A) => {
      const g = x(A.amount), y = new gt(A.contractId), S = A.assetId ? X(A.assetId) : a;
      if (g.lte(0))
        throw new v(
          L.INVALID_TRANSFER_AMOUNT,
          "Transfer amount must be a positive number."
        );
      return s.addContractInputAndOutput(y), i.push({ amount: g, assetId: S }), {
        amount: g,
        contractId: y.toB256(),
        assetId: S
      };
    }), { script: d, scriptData: _ } = await x2(o);
    return s.script = d, s.scriptData = _, s = await this.estimateAndFundTransaction(s, n, { quantities: i }), this.sendTransaction(s);
  }
  /**
   * Withdraws an amount of the base asset to the base chain.
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(e, n, s = {}) {
    const i = new gt(e), a = Z(
      "0x".concat(i.toHexString().substring(2).padStart(64, "0"))
    ), o = Z(
      "0x".concat(x(n).toHex().substring(2).padStart(16, "0"))
    ), _ = { script: new Uint8Array([
      ...Z(r2.bytes),
      ...a,
      ...o
    ]), ...s }, A = await this.provider.getBaseAssetId();
    let g = new gn(_);
    const y = [{ amount: x(n), assetId: A }], S = await this.getTransactionCost(g, { quantities: y });
    return g = this.validateGasLimitAndMaxFee({
      transactionRequest: g,
      gasUsed: S.gasUsed,
      maxFee: S.maxFee,
      txParams: s
    }), await this.fund(g, S), this.sendTransaction(g);
  }
  /**
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   */
  async getTransactionCost(e, { signatureCallback: n, quantities: s = [], gasPrice: i } = {}) {
    const a = Ne(Oe(e)), o = await this.provider.getBaseAssetId(), d = a.getCoinOutputsQuantities(), _ = F_(d, s), A = [{ assetId: o, amount: x("100000000000000000") }], g = /* @__PURE__ */ T((O) => a.inputs.find((R) => R.type === Tt.Coin ? R.assetId === O : bA(R) ? o === O : !1), "findAssetInput"), y = /* @__PURE__ */ T((O, R) => {
      const F = g(O), z = R;
      F && "amount" in F ? F.amount = z : a.addResources(
        this.generateFakeResources([
          {
            amount: R,
            assetId: O
          }
        ])
      );
    }, "updateAssetInput");
    return F_(_, A).forEach(
      ({ amount: O, assetId: R }) => y(R, O)
    ), {
      ...await this.provider.getTransactionCost(a, {
        signatureCallback: n,
        gasPrice: i
      }),
      requiredQuantities: _
    };
  }
  /**
   * Sign a message from the account via the connector.
   *
   * @param message - the message to sign.
   * @returns a promise that resolves to the signature.
   *
   * @hidden
   */
  async signMessage(e) {
    if (!this._connector)
      throw new v(L.MISSING_CONNECTOR, "A connector is required to sign messages.");
    return this._connector.signMessage(this.address.toString(), e);
  }
  /**
   * Signs a transaction from the account via the connector..
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature of the transaction.
   */
  async signTransaction(e) {
    if (!this._connector)
      throw new v(
        L.MISSING_CONNECTOR,
        "A connector is required to sign transactions."
      );
    return this._connector.signTransaction(this.address.toString(), e);
  }
  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(e, { estimateTxDependencies: n = !0, ...s } = {}) {
    let i = Oe(e);
    if (this._connector) {
      const { onBeforeSend: a, skipCustomFee: o = !1 } = s;
      i = await this.prepareTransactionForSend(i);
      const d = {
        onBeforeSend: a,
        skipCustomFee: o,
        provider: {
          url: this.provider.url,
          cache: await G1(this.provider)
        },
        transactionState: i.flag.state,
        transactionSummary: await this.prepareTransactionSummary(i)
      }, _ = await this._connector.sendTransaction(
        this.address.toString(),
        i,
        d
      );
      return typeof _ == "string" ? this.provider.getTransactionResponse(_) : _;
    }
    return n && await this.provider.estimateTxDependencies(i), this.provider.sendTransaction(i, {
      estimateTxDependencies: !1
    });
  }
  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @param estimateTxParams - The estimate transaction params (optional).
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(e, { estimateTxDependencies: n = !0 } = {}) {
    const s = Oe(e);
    return n && await this.provider.estimateTxDependencies(s), this.provider.simulate(s, { estimateTxDependencies: !1 });
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(e) {
    return e.map((n) => ({
      id: X($e(La)),
      owner: this.address,
      blockCreated: x(1),
      txCreatedIdx: x(1),
      ...n
    }));
  }
  /** @hidden */
  async prepareTransactionForSend(e) {
    const { transactionId: n } = e.flag;
    if (!qe(n))
      return e;
    const s = await this.provider.getChainId(), i = e.getTransactionId(s);
    return n !== i && e.updateState(s), e;
  }
  /** @hidden */
  async prepareTransactionSummary(e) {
    const n = await this.provider.getChainId();
    return qe(e.flag.summary) ? {
      ...e.flag.summary,
      id: e.getTransactionId(n),
      transactionBytes: X(e.toTransactionBytes())
    } : void 0;
  }
  /** @hidden * */
  validateTransferAmount(e) {
    if (x(e).lte(0))
      throw new v(
        L.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
  }
  /** @hidden * */
  async estimateAndFundTransaction(e, n, s) {
    let i = e;
    const a = await this.getTransactionCost(i, s);
    return i = this.validateGasLimitAndMaxFee({
      transactionRequest: i,
      gasUsed: a.gasUsed,
      maxFee: a.maxFee,
      txParams: n
    }), i = await this.fund(i, a), i;
  }
  /** @hidden * */
  validateGasLimitAndMaxFee({
    gasUsed: e,
    maxFee: n,
    transactionRequest: s,
    txParams: { gasLimit: i, maxFee: a }
  }) {
    const o = Oe(s);
    if (!qe(i))
      o.gasLimit = e;
    else if (e.gt(i))
      throw new v(
        L.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${e}'.`
      );
    if (!qe(a))
      o.maxFee = n;
    else if (n.gt(a))
      throw new v(
        L.MAX_FEE_TOO_LOW,
        `Max fee '${a}' is lower than the required: '${n}'.`
      );
    return o;
  }
}, T(ti, "Account"), ti), Fn, $i = (Fn = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(t) {
    D(this, "address");
    D(this, "publicKey");
    D(this, "compressedPublicKey");
    D(this, "privateKey");
    typeof t == "string" && t.match(/^[0-9a-f]*$/i) && t.length === 64 && (t = `0x${t}`);
    const e = br(t, 32);
    this.privateKey = X(e), this.publicKey = X(Wr.getPublicKey(e, !1).slice(1)), this.compressedPublicKey = X(Wr.getPublicKey(e, !0)), this.address = new gt(this.publicKey);
  }
  /**
   * Sign data using the Signer instance
   *
   * Signature is a 64 byte array of the concatenated r and s values with the compressed recoveryParam byte.
   * @ignore
   * [Read more](FuelLabs/fuel-specs/specs/protocol/cryptographic_primitives.md#public-key-cryptography)
   *
   * @param data - The data to be sign
   * @returns hashed signature
   */
  sign(t) {
    const e = Wr.sign(Z(t), Z(this.privateKey)), n = br(`0x${e.r.toString(16)}`, 32), s = br(`0x${e.s.toString(16)}`, 32);
    return s[0] |= (e.recovery || 0) << 7, X(ot([n, s]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(t) {
    const e = Wr.ProjectivePoint.fromHex(Z(this.compressedPublicKey)), n = Wr.ProjectivePoint.fromHex(Z(t));
    return `0x${e.add(n).toHex(!0)}`;
  }
  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
  static recoverPublicKey(t, e) {
    const n = Z(e), s = n.slice(0, 32), i = n.slice(32, 64), a = (i[0] & 128) >> 7;
    i[0] &= 127;
    const d = new Wr.Signature(BigInt(X(s)), BigInt(X(i))).addRecoveryBit(
      a
    ).recoverPublicKey(Z(t)).toRawBytes(!1).slice(1);
    return X(d);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(t, e) {
    return new gt(Fn.recoverPublicKey(t, e));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(t) {
    return t ? lr(ot([$e(32), Z(t)])) : $e(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(t) {
    const e = Wr.ProjectivePoint.fromHex(Z(t));
    return X(e.toRawBytes(!1).slice(1));
  }
}, T(Fn, "Signer"), Fn), Q_ = 13, O_ = 8, M_ = 1, Nc = 32, S2 = 16, P_ = /* @__PURE__ */ T((r) => /^0x/.test(r) ? r.slice(2) : r, "removeHexPrefix");
async function dg(r, t, e) {
  const n = hn(P_(r), "hex"), s = new gt(t), i = $e(Nc), a = Pp({
    password: hn(e),
    salt: i,
    dklen: Nc,
    n: 2 ** Q_,
    r: O_,
    p: M_
  }), o = $e(S2), d = await rm(n, a, o), _ = Uint8Array.from([...a.subarray(16, 32), ...d]), A = Lp(_), g = Li(A, "hex"), y = {
    id: im(),
    version: 3,
    address: P_(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Li(o, "hex") },
      ciphertext: Li(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Nc,
        n: 2 ** Q_,
        p: M_,
        r: O_,
        salt: Li(i, "hex")
      }
    }
  };
  return JSON.stringify(y);
}
T(dg, "encryptKeystoreWallet");
async function ug(r, t) {
  const e = JSON.parse(r), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: a, n: o, r: d, p: _, salt: A }
    }
  } = e, g = hn(s, "hex"), y = hn(i, "hex"), S = hn(A, "hex"), O = hn(t), R = Pp({
    password: O,
    salt: S,
    n: o,
    p: _,
    r: d,
    dklen: a
  }), F = Uint8Array.from([...R.subarray(16, 32), ...g]), z = Lp(F), H = Li(z, "hex");
  if (n !== H)
    throw new v(
      L.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const V = await em(g, R, y);
  return X(V);
}
T(ug, "decryptKeystoreWallet");
var In, T2 = (In = class extends Mo {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(e, n) {
    const s = new $i(e);
    super(s.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    D(this, "signer");
    this.signer = () => s;
  }
  /**
   * Gets the private key of the wallet.
   *
   * @returns The private key of the wallet.
   */
  get privateKey() {
    return this.signer().privateKey;
  }
  /**
   * Gets the public key of the wallet.
   *
   * @returns
   */
  get publicKey() {
    return this.signer().publicKey;
  }
  /**
   * Signs a message with the wallet's private key.
   *
   * @param message - The message to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signMessage(e) {
    const n = await this.signer().sign(zp(e));
    return X(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(e) {
    const n = Oe(e), s = await this.provider.getChainId(), i = n.getTransactionId(s), a = await this.signer().sign(i);
    return X(a);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(e) {
    const n = Oe(e), s = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, s), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @param estimateTxDependencies - Whether to estimate the transaction dependencies.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(e, { estimateTxDependencies: n = !1, enableAssetBurn: s } = {}) {
    const i = Oe(e);
    return EA(
      await this.provider.getBaseAssetId(),
      i,
      s
    ), n && await this.provider.estimateTxDependencies(i), this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(i),
      { estimateTxDependencies: !1, enableAssetBurn: s }
    );
  }
  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(e, { estimateTxDependencies: n = !0 } = {}) {
    const s = Oe(e);
    return n && await this.provider.estimateTxDependencies(s), this.provider.dryRun(
      await this.populateTransactionWitnessesSignature(s),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  /**
   * Encrypts an unlocked wallet with a password.
   *
   * @param password - the password to encrypt the wallet with.
   * @returns - the encrypted wallet.
   */
  async encrypt(e) {
    return dg(this.privateKey, this.address, e);
  }
}, T(In, "BaseWalletUnlocked"), /**
 * Default HDWallet path.
 */
D(In, "defaultPath", "m/44'/1179993420'/0'/0/0"), In), ya = [
  "abandon",
  "ability",
  "able",
  "about",
  "above",
  "absent",
  "absorb",
  "abstract",
  "absurd",
  "abuse",
  "access",
  "accident",
  "account",
  "accuse",
  "achieve",
  "acid",
  "acoustic",
  "acquire",
  "across",
  "act",
  "action",
  "actor",
  "actress",
  "actual",
  "adapt",
  "add",
  "addict",
  "address",
  "adjust",
  "admit",
  "adult",
  "advance",
  "advice",
  "aerobic",
  "affair",
  "afford",
  "afraid",
  "again",
  "age",
  "agent",
  "agree",
  "ahead",
  "aim",
  "air",
  "airport",
  "aisle",
  "alarm",
  "album",
  "alcohol",
  "alert",
  "alien",
  "all",
  "alley",
  "allow",
  "almost",
  "alone",
  "alpha",
  "already",
  "also",
  "alter",
  "always",
  "amateur",
  "amazing",
  "among",
  "amount",
  "amused",
  "analyst",
  "anchor",
  "ancient",
  "anger",
  "angle",
  "angry",
  "animal",
  "ankle",
  "announce",
  "annual",
  "another",
  "answer",
  "antenna",
  "antique",
  "anxiety",
  "any",
  "apart",
  "apology",
  "appear",
  "apple",
  "approve",
  "april",
  "arch",
  "arctic",
  "area",
  "arena",
  "argue",
  "arm",
  "armed",
  "armor",
  "army",
  "around",
  "arrange",
  "arrest",
  "arrive",
  "arrow",
  "art",
  "artefact",
  "artist",
  "artwork",
  "ask",
  "aspect",
  "assault",
  "asset",
  "assist",
  "assume",
  "asthma",
  "athlete",
  "atom",
  "attack",
  "attend",
  "attitude",
  "attract",
  "auction",
  "audit",
  "august",
  "aunt",
  "author",
  "auto",
  "autumn",
  "average",
  "avocado",
  "avoid",
  "awake",
  "aware",
  "away",
  "awesome",
  "awful",
  "awkward",
  "axis",
  "baby",
  "bachelor",
  "bacon",
  "badge",
  "bag",
  "balance",
  "balcony",
  "ball",
  "bamboo",
  "banana",
  "banner",
  "bar",
  "barely",
  "bargain",
  "barrel",
  "base",
  "basic",
  "basket",
  "battle",
  "beach",
  "bean",
  "beauty",
  "because",
  "become",
  "beef",
  "before",
  "begin",
  "behave",
  "behind",
  "believe",
  "below",
  "belt",
  "bench",
  "benefit",
  "best",
  "betray",
  "better",
  "between",
  "beyond",
  "bicycle",
  "bid",
  "bike",
  "bind",
  "biology",
  "bird",
  "birth",
  "bitter",
  "black",
  "blade",
  "blame",
  "blanket",
  "blast",
  "bleak",
  "bless",
  "blind",
  "blood",
  "blossom",
  "blouse",
  "blue",
  "blur",
  "blush",
  "board",
  "boat",
  "body",
  "boil",
  "bomb",
  "bone",
  "bonus",
  "book",
  "boost",
  "border",
  "boring",
  "borrow",
  "boss",
  "bottom",
  "bounce",
  "box",
  "boy",
  "bracket",
  "brain",
  "brand",
  "brass",
  "brave",
  "bread",
  "breeze",
  "brick",
  "bridge",
  "brief",
  "bright",
  "bring",
  "brisk",
  "broccoli",
  "broken",
  "bronze",
  "broom",
  "brother",
  "brown",
  "brush",
  "bubble",
  "buddy",
  "budget",
  "buffalo",
  "build",
  "bulb",
  "bulk",
  "bullet",
  "bundle",
  "bunker",
  "burden",
  "burger",
  "burst",
  "bus",
  "business",
  "busy",
  "butter",
  "buyer",
  "buzz",
  "cabbage",
  "cabin",
  "cable",
  "cactus",
  "cage",
  "cake",
  "call",
  "calm",
  "camera",
  "camp",
  "can",
  "canal",
  "cancel",
  "candy",
  "cannon",
  "canoe",
  "canvas",
  "canyon",
  "capable",
  "capital",
  "captain",
  "car",
  "carbon",
  "card",
  "cargo",
  "carpet",
  "carry",
  "cart",
  "case",
  "cash",
  "casino",
  "castle",
  "casual",
  "cat",
  "catalog",
  "catch",
  "category",
  "cattle",
  "caught",
  "cause",
  "caution",
  "cave",
  "ceiling",
  "celery",
  "cement",
  "census",
  "century",
  "cereal",
  "certain",
  "chair",
  "chalk",
  "champion",
  "change",
  "chaos",
  "chapter",
  "charge",
  "chase",
  "chat",
  "cheap",
  "check",
  "cheese",
  "chef",
  "cherry",
  "chest",
  "chicken",
  "chief",
  "child",
  "chimney",
  "choice",
  "choose",
  "chronic",
  "chuckle",
  "chunk",
  "churn",
  "cigar",
  "cinnamon",
  "circle",
  "citizen",
  "city",
  "civil",
  "claim",
  "clap",
  "clarify",
  "claw",
  "clay",
  "clean",
  "clerk",
  "clever",
  "click",
  "client",
  "cliff",
  "climb",
  "clinic",
  "clip",
  "clock",
  "clog",
  "close",
  "cloth",
  "cloud",
  "clown",
  "club",
  "clump",
  "cluster",
  "clutch",
  "coach",
  "coast",
  "coconut",
  "code",
  "coffee",
  "coil",
  "coin",
  "collect",
  "color",
  "column",
  "combine",
  "come",
  "comfort",
  "comic",
  "common",
  "company",
  "concert",
  "conduct",
  "confirm",
  "congress",
  "connect",
  "consider",
  "control",
  "convince",
  "cook",
  "cool",
  "copper",
  "copy",
  "coral",
  "core",
  "corn",
  "correct",
  "cost",
  "cotton",
  "couch",
  "country",
  "couple",
  "course",
  "cousin",
  "cover",
  "coyote",
  "crack",
  "cradle",
  "craft",
  "cram",
  "crane",
  "crash",
  "crater",
  "crawl",
  "crazy",
  "cream",
  "credit",
  "creek",
  "crew",
  "cricket",
  "crime",
  "crisp",
  "critic",
  "crop",
  "cross",
  "crouch",
  "crowd",
  "crucial",
  "cruel",
  "cruise",
  "crumble",
  "crunch",
  "crush",
  "cry",
  "crystal",
  "cube",
  "culture",
  "cup",
  "cupboard",
  "curious",
  "current",
  "curtain",
  "curve",
  "cushion",
  "custom",
  "cute",
  "cycle",
  "dad",
  "damage",
  "damp",
  "dance",
  "danger",
  "daring",
  "dash",
  "daughter",
  "dawn",
  "day",
  "deal",
  "debate",
  "debris",
  "decade",
  "december",
  "decide",
  "decline",
  "decorate",
  "decrease",
  "deer",
  "defense",
  "define",
  "defy",
  "degree",
  "delay",
  "deliver",
  "demand",
  "demise",
  "denial",
  "dentist",
  "deny",
  "depart",
  "depend",
  "deposit",
  "depth",
  "deputy",
  "derive",
  "describe",
  "desert",
  "design",
  "desk",
  "despair",
  "destroy",
  "detail",
  "detect",
  "develop",
  "device",
  "devote",
  "diagram",
  "dial",
  "diamond",
  "diary",
  "dice",
  "diesel",
  "diet",
  "differ",
  "digital",
  "dignity",
  "dilemma",
  "dinner",
  "dinosaur",
  "direct",
  "dirt",
  "disagree",
  "discover",
  "disease",
  "dish",
  "dismiss",
  "disorder",
  "display",
  "distance",
  "divert",
  "divide",
  "divorce",
  "dizzy",
  "doctor",
  "document",
  "dog",
  "doll",
  "dolphin",
  "domain",
  "donate",
  "donkey",
  "donor",
  "door",
  "dose",
  "double",
  "dove",
  "draft",
  "dragon",
  "drama",
  "drastic",
  "draw",
  "dream",
  "dress",
  "drift",
  "drill",
  "drink",
  "drip",
  "drive",
  "drop",
  "drum",
  "dry",
  "duck",
  "dumb",
  "dune",
  "during",
  "dust",
  "dutch",
  "duty",
  "dwarf",
  "dynamic",
  "eager",
  "eagle",
  "early",
  "earn",
  "earth",
  "easily",
  "east",
  "easy",
  "echo",
  "ecology",
  "economy",
  "edge",
  "edit",
  "educate",
  "effort",
  "egg",
  "eight",
  "either",
  "elbow",
  "elder",
  "electric",
  "elegant",
  "element",
  "elephant",
  "elevator",
  "elite",
  "else",
  "embark",
  "embody",
  "embrace",
  "emerge",
  "emotion",
  "employ",
  "empower",
  "empty",
  "enable",
  "enact",
  "end",
  "endless",
  "endorse",
  "enemy",
  "energy",
  "enforce",
  "engage",
  "engine",
  "enhance",
  "enjoy",
  "enlist",
  "enough",
  "enrich",
  "enroll",
  "ensure",
  "enter",
  "entire",
  "entry",
  "envelope",
  "episode",
  "equal",
  "equip",
  "era",
  "erase",
  "erode",
  "erosion",
  "error",
  "erupt",
  "escape",
  "essay",
  "essence",
  "estate",
  "eternal",
  "ethics",
  "evidence",
  "evil",
  "evoke",
  "evolve",
  "exact",
  "example",
  "excess",
  "exchange",
  "excite",
  "exclude",
  "excuse",
  "execute",
  "exercise",
  "exhaust",
  "exhibit",
  "exile",
  "exist",
  "exit",
  "exotic",
  "expand",
  "expect",
  "expire",
  "explain",
  "expose",
  "express",
  "extend",
  "extra",
  "eye",
  "eyebrow",
  "fabric",
  "face",
  "faculty",
  "fade",
  "faint",
  "faith",
  "fall",
  "false",
  "fame",
  "family",
  "famous",
  "fan",
  "fancy",
  "fantasy",
  "farm",
  "fashion",
  "fat",
  "fatal",
  "father",
  "fatigue",
  "fault",
  "favorite",
  "feature",
  "february",
  "federal",
  "fee",
  "feed",
  "feel",
  "female",
  "fence",
  "festival",
  "fetch",
  "fever",
  "few",
  "fiber",
  "fiction",
  "field",
  "figure",
  "file",
  "film",
  "filter",
  "final",
  "find",
  "fine",
  "finger",
  "finish",
  "fire",
  "firm",
  "first",
  "fiscal",
  "fish",
  "fit",
  "fitness",
  "fix",
  "flag",
  "flame",
  "flash",
  "flat",
  "flavor",
  "flee",
  "flight",
  "flip",
  "float",
  "flock",
  "floor",
  "flower",
  "fluid",
  "flush",
  "fly",
  "foam",
  "focus",
  "fog",
  "foil",
  "fold",
  "follow",
  "food",
  "foot",
  "force",
  "forest",
  "forget",
  "fork",
  "fortune",
  "forum",
  "forward",
  "fossil",
  "foster",
  "found",
  "fox",
  "fragile",
  "frame",
  "frequent",
  "fresh",
  "friend",
  "fringe",
  "frog",
  "front",
  "frost",
  "frown",
  "frozen",
  "fruit",
  "fuel",
  "fun",
  "funny",
  "furnace",
  "fury",
  "future",
  "gadget",
  "gain",
  "galaxy",
  "gallery",
  "game",
  "gap",
  "garage",
  "garbage",
  "garden",
  "garlic",
  "garment",
  "gas",
  "gasp",
  "gate",
  "gather",
  "gauge",
  "gaze",
  "general",
  "genius",
  "genre",
  "gentle",
  "genuine",
  "gesture",
  "ghost",
  "giant",
  "gift",
  "giggle",
  "ginger",
  "giraffe",
  "girl",
  "give",
  "glad",
  "glance",
  "glare",
  "glass",
  "glide",
  "glimpse",
  "globe",
  "gloom",
  "glory",
  "glove",
  "glow",
  "glue",
  "goat",
  "goddess",
  "gold",
  "good",
  "goose",
  "gorilla",
  "gospel",
  "gossip",
  "govern",
  "gown",
  "grab",
  "grace",
  "grain",
  "grant",
  "grape",
  "grass",
  "gravity",
  "great",
  "green",
  "grid",
  "grief",
  "grit",
  "grocery",
  "group",
  "grow",
  "grunt",
  "guard",
  "guess",
  "guide",
  "guilt",
  "guitar",
  "gun",
  "gym",
  "habit",
  "hair",
  "half",
  "hammer",
  "hamster",
  "hand",
  "happy",
  "harbor",
  "hard",
  "harsh",
  "harvest",
  "hat",
  "have",
  "hawk",
  "hazard",
  "head",
  "health",
  "heart",
  "heavy",
  "hedgehog",
  "height",
  "hello",
  "helmet",
  "help",
  "hen",
  "hero",
  "hidden",
  "high",
  "hill",
  "hint",
  "hip",
  "hire",
  "history",
  "hobby",
  "hockey",
  "hold",
  "hole",
  "holiday",
  "hollow",
  "home",
  "honey",
  "hood",
  "hope",
  "horn",
  "horror",
  "horse",
  "hospital",
  "host",
  "hotel",
  "hour",
  "hover",
  "hub",
  "huge",
  "human",
  "humble",
  "humor",
  "hundred",
  "hungry",
  "hunt",
  "hurdle",
  "hurry",
  "hurt",
  "husband",
  "hybrid",
  "ice",
  "icon",
  "idea",
  "identify",
  "idle",
  "ignore",
  "ill",
  "illegal",
  "illness",
  "image",
  "imitate",
  "immense",
  "immune",
  "impact",
  "impose",
  "improve",
  "impulse",
  "inch",
  "include",
  "income",
  "increase",
  "index",
  "indicate",
  "indoor",
  "industry",
  "infant",
  "inflict",
  "inform",
  "inhale",
  "inherit",
  "initial",
  "inject",
  "injury",
  "inmate",
  "inner",
  "innocent",
  "input",
  "inquiry",
  "insane",
  "insect",
  "inside",
  "inspire",
  "install",
  "intact",
  "interest",
  "into",
  "invest",
  "invite",
  "involve",
  "iron",
  "island",
  "isolate",
  "issue",
  "item",
  "ivory",
  "jacket",
  "jaguar",
  "jar",
  "jazz",
  "jealous",
  "jeans",
  "jelly",
  "jewel",
  "job",
  "join",
  "joke",
  "journey",
  "joy",
  "judge",
  "juice",
  "jump",
  "jungle",
  "junior",
  "junk",
  "just",
  "kangaroo",
  "keen",
  "keep",
  "ketchup",
  "key",
  "kick",
  "kid",
  "kidney",
  "kind",
  "kingdom",
  "kiss",
  "kit",
  "kitchen",
  "kite",
  "kitten",
  "kiwi",
  "knee",
  "knife",
  "knock",
  "know",
  "lab",
  "label",
  "labor",
  "ladder",
  "lady",
  "lake",
  "lamp",
  "language",
  "laptop",
  "large",
  "later",
  "latin",
  "laugh",
  "laundry",
  "lava",
  "law",
  "lawn",
  "lawsuit",
  "layer",
  "lazy",
  "leader",
  "leaf",
  "learn",
  "leave",
  "lecture",
  "left",
  "leg",
  "legal",
  "legend",
  "leisure",
  "lemon",
  "lend",
  "length",
  "lens",
  "leopard",
  "lesson",
  "letter",
  "level",
  "liar",
  "liberty",
  "library",
  "license",
  "life",
  "lift",
  "light",
  "like",
  "limb",
  "limit",
  "link",
  "lion",
  "liquid",
  "list",
  "little",
  "live",
  "lizard",
  "load",
  "loan",
  "lobster",
  "local",
  "lock",
  "logic",
  "lonely",
  "long",
  "loop",
  "lottery",
  "loud",
  "lounge",
  "love",
  "loyal",
  "lucky",
  "luggage",
  "lumber",
  "lunar",
  "lunch",
  "luxury",
  "lyrics",
  "machine",
  "mad",
  "magic",
  "magnet",
  "maid",
  "mail",
  "main",
  "major",
  "make",
  "mammal",
  "man",
  "manage",
  "mandate",
  "mango",
  "mansion",
  "manual",
  "maple",
  "marble",
  "march",
  "margin",
  "marine",
  "market",
  "marriage",
  "mask",
  "mass",
  "master",
  "match",
  "material",
  "math",
  "matrix",
  "matter",
  "maximum",
  "maze",
  "meadow",
  "mean",
  "measure",
  "meat",
  "mechanic",
  "medal",
  "media",
  "melody",
  "melt",
  "member",
  "memory",
  "mention",
  "menu",
  "mercy",
  "merge",
  "merit",
  "merry",
  "mesh",
  "message",
  "metal",
  "method",
  "middle",
  "midnight",
  "milk",
  "million",
  "mimic",
  "mind",
  "minimum",
  "minor",
  "minute",
  "miracle",
  "mirror",
  "misery",
  "miss",
  "mistake",
  "mix",
  "mixed",
  "mixture",
  "mobile",
  "model",
  "modify",
  "mom",
  "moment",
  "monitor",
  "monkey",
  "monster",
  "month",
  "moon",
  "moral",
  "more",
  "morning",
  "mosquito",
  "mother",
  "motion",
  "motor",
  "mountain",
  "mouse",
  "move",
  "movie",
  "much",
  "muffin",
  "mule",
  "multiply",
  "muscle",
  "museum",
  "mushroom",
  "music",
  "must",
  "mutual",
  "myself",
  "mystery",
  "myth",
  "naive",
  "name",
  "napkin",
  "narrow",
  "nasty",
  "nation",
  "nature",
  "near",
  "neck",
  "need",
  "negative",
  "neglect",
  "neither",
  "nephew",
  "nerve",
  "nest",
  "net",
  "network",
  "neutral",
  "never",
  "news",
  "next",
  "nice",
  "night",
  "noble",
  "noise",
  "nominee",
  "noodle",
  "normal",
  "north",
  "nose",
  "notable",
  "note",
  "nothing",
  "notice",
  "novel",
  "now",
  "nuclear",
  "number",
  "nurse",
  "nut",
  "oak",
  "obey",
  "object",
  "oblige",
  "obscure",
  "observe",
  "obtain",
  "obvious",
  "occur",
  "ocean",
  "october",
  "odor",
  "off",
  "offer",
  "office",
  "often",
  "oil",
  "okay",
  "old",
  "olive",
  "olympic",
  "omit",
  "once",
  "one",
  "onion",
  "online",
  "only",
  "open",
  "opera",
  "opinion",
  "oppose",
  "option",
  "orange",
  "orbit",
  "orchard",
  "order",
  "ordinary",
  "organ",
  "orient",
  "original",
  "orphan",
  "ostrich",
  "other",
  "outdoor",
  "outer",
  "output",
  "outside",
  "oval",
  "oven",
  "over",
  "own",
  "owner",
  "oxygen",
  "oyster",
  "ozone",
  "pact",
  "paddle",
  "page",
  "pair",
  "palace",
  "palm",
  "panda",
  "panel",
  "panic",
  "panther",
  "paper",
  "parade",
  "parent",
  "park",
  "parrot",
  "party",
  "pass",
  "patch",
  "path",
  "patient",
  "patrol",
  "pattern",
  "pause",
  "pave",
  "payment",
  "peace",
  "peanut",
  "pear",
  "peasant",
  "pelican",
  "pen",
  "penalty",
  "pencil",
  "people",
  "pepper",
  "perfect",
  "permit",
  "person",
  "pet",
  "phone",
  "photo",
  "phrase",
  "physical",
  "piano",
  "picnic",
  "picture",
  "piece",
  "pig",
  "pigeon",
  "pill",
  "pilot",
  "pink",
  "pioneer",
  "pipe",
  "pistol",
  "pitch",
  "pizza",
  "place",
  "planet",
  "plastic",
  "plate",
  "play",
  "please",
  "pledge",
  "pluck",
  "plug",
  "plunge",
  "poem",
  "poet",
  "point",
  "polar",
  "pole",
  "police",
  "pond",
  "pony",
  "pool",
  "popular",
  "portion",
  "position",
  "possible",
  "post",
  "potato",
  "pottery",
  "poverty",
  "powder",
  "power",
  "practice",
  "praise",
  "predict",
  "prefer",
  "prepare",
  "present",
  "pretty",
  "prevent",
  "price",
  "pride",
  "primary",
  "print",
  "priority",
  "prison",
  "private",
  "prize",
  "problem",
  "process",
  "produce",
  "profit",
  "program",
  "project",
  "promote",
  "proof",
  "property",
  "prosper",
  "protect",
  "proud",
  "provide",
  "public",
  "pudding",
  "pull",
  "pulp",
  "pulse",
  "pumpkin",
  "punch",
  "pupil",
  "puppy",
  "purchase",
  "purity",
  "purpose",
  "purse",
  "push",
  "put",
  "puzzle",
  "pyramid",
  "quality",
  "quantum",
  "quarter",
  "question",
  "quick",
  "quit",
  "quiz",
  "quote",
  "rabbit",
  "raccoon",
  "race",
  "rack",
  "radar",
  "radio",
  "rail",
  "rain",
  "raise",
  "rally",
  "ramp",
  "ranch",
  "random",
  "range",
  "rapid",
  "rare",
  "rate",
  "rather",
  "raven",
  "raw",
  "razor",
  "ready",
  "real",
  "reason",
  "rebel",
  "rebuild",
  "recall",
  "receive",
  "recipe",
  "record",
  "recycle",
  "reduce",
  "reflect",
  "reform",
  "refuse",
  "region",
  "regret",
  "regular",
  "reject",
  "relax",
  "release",
  "relief",
  "rely",
  "remain",
  "remember",
  "remind",
  "remove",
  "render",
  "renew",
  "rent",
  "reopen",
  "repair",
  "repeat",
  "replace",
  "report",
  "require",
  "rescue",
  "resemble",
  "resist",
  "resource",
  "response",
  "result",
  "retire",
  "retreat",
  "return",
  "reunion",
  "reveal",
  "review",
  "reward",
  "rhythm",
  "rib",
  "ribbon",
  "rice",
  "rich",
  "ride",
  "ridge",
  "rifle",
  "right",
  "rigid",
  "ring",
  "riot",
  "ripple",
  "risk",
  "ritual",
  "rival",
  "river",
  "road",
  "roast",
  "robot",
  "robust",
  "rocket",
  "romance",
  "roof",
  "rookie",
  "room",
  "rose",
  "rotate",
  "rough",
  "round",
  "route",
  "royal",
  "rubber",
  "rude",
  "rug",
  "rule",
  "run",
  "runway",
  "rural",
  "sad",
  "saddle",
  "sadness",
  "safe",
  "sail",
  "salad",
  "salmon",
  "salon",
  "salt",
  "salute",
  "same",
  "sample",
  "sand",
  "satisfy",
  "satoshi",
  "sauce",
  "sausage",
  "save",
  "say",
  "scale",
  "scan",
  "scare",
  "scatter",
  "scene",
  "scheme",
  "school",
  "science",
  "scissors",
  "scorpion",
  "scout",
  "scrap",
  "screen",
  "script",
  "scrub",
  "sea",
  "search",
  "season",
  "seat",
  "second",
  "secret",
  "section",
  "security",
  "seed",
  "seek",
  "segment",
  "select",
  "sell",
  "seminar",
  "senior",
  "sense",
  "sentence",
  "series",
  "service",
  "session",
  "settle",
  "setup",
  "seven",
  "shadow",
  "shaft",
  "shallow",
  "share",
  "shed",
  "shell",
  "sheriff",
  "shield",
  "shift",
  "shine",
  "ship",
  "shiver",
  "shock",
  "shoe",
  "shoot",
  "shop",
  "short",
  "shoulder",
  "shove",
  "shrimp",
  "shrug",
  "shuffle",
  "shy",
  "sibling",
  "sick",
  "side",
  "siege",
  "sight",
  "sign",
  "silent",
  "silk",
  "silly",
  "silver",
  "similar",
  "simple",
  "since",
  "sing",
  "siren",
  "sister",
  "situate",
  "six",
  "size",
  "skate",
  "sketch",
  "ski",
  "skill",
  "skin",
  "skirt",
  "skull",
  "slab",
  "slam",
  "sleep",
  "slender",
  "slice",
  "slide",
  "slight",
  "slim",
  "slogan",
  "slot",
  "slow",
  "slush",
  "small",
  "smart",
  "smile",
  "smoke",
  "smooth",
  "snack",
  "snake",
  "snap",
  "sniff",
  "snow",
  "soap",
  "soccer",
  "social",
  "sock",
  "soda",
  "soft",
  "solar",
  "soldier",
  "solid",
  "solution",
  "solve",
  "someone",
  "song",
  "soon",
  "sorry",
  "sort",
  "soul",
  "sound",
  "soup",
  "source",
  "south",
  "space",
  "spare",
  "spatial",
  "spawn",
  "speak",
  "special",
  "speed",
  "spell",
  "spend",
  "sphere",
  "spice",
  "spider",
  "spike",
  "spin",
  "spirit",
  "split",
  "spoil",
  "sponsor",
  "spoon",
  "sport",
  "spot",
  "spray",
  "spread",
  "spring",
  "spy",
  "square",
  "squeeze",
  "squirrel",
  "stable",
  "stadium",
  "staff",
  "stage",
  "stairs",
  "stamp",
  "stand",
  "start",
  "state",
  "stay",
  "steak",
  "steel",
  "stem",
  "step",
  "stereo",
  "stick",
  "still",
  "sting",
  "stock",
  "stomach",
  "stone",
  "stool",
  "story",
  "stove",
  "strategy",
  "street",
  "strike",
  "strong",
  "struggle",
  "student",
  "stuff",
  "stumble",
  "style",
  "subject",
  "submit",
  "subway",
  "success",
  "such",
  "sudden",
  "suffer",
  "sugar",
  "suggest",
  "suit",
  "summer",
  "sun",
  "sunny",
  "sunset",
  "super",
  "supply",
  "supreme",
  "sure",
  "surface",
  "surge",
  "surprise",
  "surround",
  "survey",
  "suspect",
  "sustain",
  "swallow",
  "swamp",
  "swap",
  "swarm",
  "swear",
  "sweet",
  "swift",
  "swim",
  "swing",
  "switch",
  "sword",
  "symbol",
  "symptom",
  "syrup",
  "system",
  "table",
  "tackle",
  "tag",
  "tail",
  "talent",
  "talk",
  "tank",
  "tape",
  "target",
  "task",
  "taste",
  "tattoo",
  "taxi",
  "teach",
  "team",
  "tell",
  "ten",
  "tenant",
  "tennis",
  "tent",
  "term",
  "test",
  "text",
  "thank",
  "that",
  "theme",
  "then",
  "theory",
  "there",
  "they",
  "thing",
  "this",
  "thought",
  "three",
  "thrive",
  "throw",
  "thumb",
  "thunder",
  "ticket",
  "tide",
  "tiger",
  "tilt",
  "timber",
  "time",
  "tiny",
  "tip",
  "tired",
  "tissue",
  "title",
  "toast",
  "tobacco",
  "today",
  "toddler",
  "toe",
  "together",
  "toilet",
  "token",
  "tomato",
  "tomorrow",
  "tone",
  "tongue",
  "tonight",
  "tool",
  "tooth",
  "top",
  "topic",
  "topple",
  "torch",
  "tornado",
  "tortoise",
  "toss",
  "total",
  "tourist",
  "toward",
  "tower",
  "town",
  "toy",
  "track",
  "trade",
  "traffic",
  "tragic",
  "train",
  "transfer",
  "trap",
  "trash",
  "travel",
  "tray",
  "treat",
  "tree",
  "trend",
  "trial",
  "tribe",
  "trick",
  "trigger",
  "trim",
  "trip",
  "trophy",
  "trouble",
  "truck",
  "true",
  "truly",
  "trumpet",
  "trust",
  "truth",
  "try",
  "tube",
  "tuition",
  "tumble",
  "tuna",
  "tunnel",
  "turkey",
  "turn",
  "turtle",
  "twelve",
  "twenty",
  "twice",
  "twin",
  "twist",
  "two",
  "type",
  "typical",
  "ugly",
  "umbrella",
  "unable",
  "unaware",
  "uncle",
  "uncover",
  "under",
  "undo",
  "unfair",
  "unfold",
  "unhappy",
  "uniform",
  "unique",
  "unit",
  "universe",
  "unknown",
  "unlock",
  "until",
  "unusual",
  "unveil",
  "update",
  "upgrade",
  "uphold",
  "upon",
  "upper",
  "upset",
  "urban",
  "urge",
  "usage",
  "use",
  "used",
  "useful",
  "useless",
  "usual",
  "utility",
  "vacant",
  "vacuum",
  "vague",
  "valid",
  "valley",
  "valve",
  "van",
  "vanish",
  "vapor",
  "various",
  "vast",
  "vault",
  "vehicle",
  "velvet",
  "vendor",
  "venture",
  "venue",
  "verb",
  "verify",
  "version",
  "very",
  "vessel",
  "veteran",
  "viable",
  "vibrant",
  "vicious",
  "victory",
  "video",
  "view",
  "village",
  "vintage",
  "violin",
  "virtual",
  "virus",
  "visa",
  "visit",
  "visual",
  "vital",
  "vivid",
  "vocal",
  "voice",
  "void",
  "volcano",
  "volume",
  "vote",
  "voyage",
  "wage",
  "wagon",
  "wait",
  "walk",
  "wall",
  "walnut",
  "want",
  "warfare",
  "warm",
  "warrior",
  "wash",
  "wasp",
  "waste",
  "water",
  "wave",
  "way",
  "wealth",
  "weapon",
  "wear",
  "weasel",
  "weather",
  "web",
  "wedding",
  "weekend",
  "weird",
  "welcome",
  "west",
  "wet",
  "whale",
  "what",
  "wheat",
  "wheel",
  "when",
  "where",
  "whip",
  "whisper",
  "wide",
  "width",
  "wife",
  "wild",
  "will",
  "win",
  "window",
  "wine",
  "wing",
  "wink",
  "winner",
  "winter",
  "wire",
  "wisdom",
  "wise",
  "wish",
  "witness",
  "wolf",
  "woman",
  "wonder",
  "wood",
  "wool",
  "word",
  "work",
  "world",
  "worry",
  "worth",
  "wrap",
  "wreck",
  "wrestle",
  "wrist",
  "write",
  "wrong",
  "yard",
  "year",
  "yellow",
  "you",
  "young",
  "youth",
  "zebra",
  "zero",
  "zone",
  "zoo"
], N2 = /* @__PURE__ */ ((r) => (r.english = "english", r))(N2 || {});
function hg(r) {
  return (1 << r) - 1;
}
T(hg, "getLowerMask");
function su(r) {
  return (1 << r) - 1 << 8 - r;
}
T(su, "getUpperMask");
function Da(r) {
  return Array.isArray(r) ? r : r.split(/\s+/);
}
T(Da, "getWords");
function lg(r) {
  return Array.isArray(r) ? r.join(" ") : r;
}
T(lg, "getPhrase");
function _g(r) {
  const t = [0];
  let e = 11;
  for (let i = 0; i < r.length; i += 1)
    e > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= r[i], e -= 8) : (t[t.length - 1] <<= e, t[t.length - 1] |= r[i] >> 8 - e, t.push(r[i] & hg(8 - e)), e += 3);
  const n = r.length / 4, s = Z(Gt(r))[0] & su(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
T(_g, "entropyToMnemonicIndices");
function pg(r, t) {
  const e = Math.ceil(11 * r.length / 8), n = Z(new Uint8Array(e));
  let s = 0;
  for (let _ = 0; _ < r.length; _ += 1) {
    const A = t.indexOf(r[_].normalize("NFKD"));
    if (A === -1)
      throw new v(
        L.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${r[_]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      A & 1 << 10 - g && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * r.length / 3, a = r.length / 3, o = su(a);
  if ((Z(Gt(n.slice(0, i / 8)))[0] & o) !== (n[n.length - 1] & o))
    throw new v(
      L.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
T(pg, "mnemonicWordsToEntropy");
var D2 = hr("Bitcoin seed"), F2 = "0x0488ade4", Q2 = "0x04358394", L_ = [12, 15, 18, 21, 24];
function ud(r) {
  if (r.length !== 2048)
    throw new v(
      L.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${r.length}.`
    );
}
T(ud, "assertWordList");
function fg(r) {
  if (r.length % 4 !== 0 || r.length < 16 || r.length > 32)
    throw new v(
      L.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${r.length} bytes.`
    );
}
T(fg, "assertEntropy");
function Fa(r) {
  if (!L_.includes(r.length)) {
    const t = `Invalid mnemonic size. Expected one of [${L_.join(
      ", "
    )}] words, but got ${r.length}.`;
    throw new v(L.INVALID_MNEMONIC, t);
  }
}
T(Fa, "assertMnemonic");
var ze, O2 = (ze = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(t = ya) {
    D(this, "wordlist");
    this.wordlist = t, ud(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(t) {
    return ze.mnemonicToEntropy(t, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(t) {
    return ze.entropyToMnemonic(t, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(t, e = ya) {
    const n = Da(t);
    return Fa(n), X(pg(n, e));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(t, e = ya) {
    const n = Z(t);
    return ud(e), fg(n), _g(n).map((s) => e[s]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(t, e = "") {
    Fa(Da(t));
    const n = hr(lg(t)), s = hr(`mnemonic${e}`);
    return nm(n, s, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(t, e = "") {
    const n = ze.mnemonicToSeed(t, e);
    return ze.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(t) {
    const e = Da(t);
    let n = 0;
    try {
      Fa(e);
    } catch {
      return !1;
    }
    for (; n < e.length; ) {
      if (ze.binarySearch(e[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(t) {
    const e = ya;
    let n = 0, s = e.length - 1;
    for (; n <= s; ) {
      const i = Math.floor((n + s) / 2);
      if (e[i] === t)
        return !0;
      t < e[i] ? s = i - 1 : n = i + 1;
    }
    return !1;
  }
  /**
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, the default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static masterKeysFromSeed(t) {
    const e = Z(t);
    if (e.length < 16 || e.length > 64)
      throw new v(
        L.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${e.length} bytes.`
      );
    return Z(kp("sha512", D2, e));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(t, e = !1) {
    const n = ze.masterKeysFromSeed(t), s = Z(e ? Q2 : F2), i = "0x00", a = "0x00000000", o = "0x00000000", d = n.slice(32), _ = n.slice(0, 32), A = ot([
      s,
      i,
      a,
      o,
      d,
      ot(["0x00", _])
    ]), g = _o(Gt(Gt(A)), 0, 4);
    return wd(ot([A, g]));
  }
  /**
   *  Create a new mnemonic using a randomly generated number as entropy.
   *  As defined in BIP39, the entropy must be a multiple of 32 bits, and its size must be between 128 and 256 bits.
   *  Therefore, the possible values for `strength` are 128, 160, 192, 224, and 256.
   *  If not provided, the default entropy length will be set to 256 bits.
   *  The return is a list of words that encodes the generated entropy.
   *
   *
   * @param size - Number of bytes used as an entropy
   * @param extraEntropy - Optional extra entropy to increase randomness
   * @returns A randomly generated mnemonic
   */
  static generate(t = 32, e = "") {
    const n = e ? Gt(ot([$e(t), Z(e)])) : $e(t);
    return ze.entropyToMnemonic(n);
  }
}, T(ze, "Mnemonic"), ze), iu = O2, Ag = 2147483648, gg = X("0x0488ade4"), au = X("0x0488b21e"), wg = X("0x04358394"), ou = X("0x043587cf");
function hd(r) {
  return wd(ot([r, _o(Gt(Gt(r)), 0, 4)]));
}
T(hd, "base58check");
function mg(r = !1, t = !1) {
  return r ? t ? ou : au : t ? wg : gg;
}
T(mg, "getExtendedKeyPrefix");
function yg(r) {
  return [au, ou].includes(X(r.slice(0, 4)));
}
T(yg, "isPublicExtendedKey");
function bg(r) {
  return [gg, wg, au, ou].includes(
    X(r.slice(0, 4))
  );
}
T(bg, "isValidExtendedKey");
function Ig(r, t = 0) {
  const e = r.split("/");
  if (e.length === 0 || e[0] === "m" && t !== 0)
    throw new v(L.HD_WALLET_ERROR, `invalid path - ${r}`);
  return e[0] === "m" && e.shift(), e.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + Ag : parseInt(n, 10)
  );
}
T(Ig, "parsePath");
var cr, M2 = (cr = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(t) {
    D(this, "depth", 0);
    D(this, "index", 0);
    D(this, "fingerprint", X("0x00000000"));
    D(this, "parentFingerprint", X("0x00000000"));
    D(this, "privateKey");
    D(this, "publicKey");
    D(this, "chainCode");
    if (t.privateKey) {
      const e = new $i(t.privateKey);
      this.publicKey = X(e.compressedPublicKey), this.privateKey = X(t.privateKey);
    } else {
      if (!t.publicKey)
        throw new v(
          L.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = X(t.publicKey);
    }
    this.parentFingerprint = t.parentFingerprint || this.parentFingerprint, this.fingerprint = _o(sm(Gt(this.publicKey)), 0, 4), this.depth = t.depth || this.depth, this.index = t.index || this.index, this.chainCode = t.chainCode;
  }
  get extendedKey() {
    return this.toExtendedKey();
  }
  /**
   * Derive the current HDWallet instance navigating only on the index.
   * `Ex.: m/44'/0 -> Ex.: m/44'/1 -> m/44'/2`. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
   *
   * @param index - Index of the child HDWallet.
   * @returns A new instance of HDWallet on the derived index
   */
  deriveIndex(t) {
    const e = this.privateKey && Z(this.privateKey), n = Z(this.publicKey), s = Z(this.chainCode), i = new Uint8Array(37);
    if (t & Ag) {
      if (!e)
        throw new v(
          L.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      i.set(e, 1);
    } else
      i.set(Z(this.publicKey));
    i.set(br(t, 4), 33);
    const a = Z(kp("sha512", s, i)), o = a.slice(0, 32), d = a.slice(32);
    if (e) {
      const y = x(o).add(e).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new cr({
        privateKey: y,
        chainCode: d,
        index: t,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const A = new $i(X(o)).addPoint(n);
    return new cr({
      publicKey: A,
      chainCode: d,
      index: t,
      depth: this.depth + 1,
      parentFingerprint: this.fingerprint
    });
  }
  /**
   * Derive the current HDWallet instance to the path. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
   *
   * @param path - The string representation of the child HDWallet. `Ex.: m/44'/0'/0'/0/0`
   * @returns A new instance of HDWallet on the derived path
   */
  derivePath(t) {
    return Ig(t, this.depth).reduce((n, s) => n.deriveIndex(s), this);
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param isPublic - enable to export public extendedKey, it not required when HDWallet didn't have the privateKey.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  toExtendedKey(t = !1, e = !1) {
    if (this.depth >= 256)
      throw new v(
        L.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = mg(this.privateKey == null || t, e), s = X(Uint8Array.from([this.depth])), i = this.parentFingerprint, a = co(this.index, 4), o = this.chainCode, d = this.privateKey != null && !t ? ot(["0x00", this.privateKey]) : this.publicKey, _ = Z(ot([n, s, i, a, o, d]));
    return hd(_);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(t) {
    const e = iu.masterKeysFromSeed(t);
    return new cr({
      chainCode: Z(e.slice(32)),
      privateKey: Z(e.slice(0, 32))
    });
  }
  static fromExtendedKey(t) {
    const e = X(br(_p(t))), n = Z(e), s = hd(n.slice(0, 78)) === t;
    if (n.length !== 82 || !bg(n))
      throw new v(L.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!s)
      throw new v(L.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const i = n[4], a = X(n.slice(5, 9)), o = parseInt(X(n.slice(9, 13)).substring(2), 16), d = X(n.slice(13, 45)), _ = n.slice(45, 78);
    if (i === 0 && a !== "0x00000000" || i === 0 && o !== 0)
      throw new v(
        L.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (yg(n)) {
      if (_[0] !== 3)
        throw new v(L.HD_WALLET_ERROR, "Invalid public extended key.");
      return new cr({
        publicKey: _,
        chainCode: d,
        index: o,
        depth: i,
        parentFingerprint: a
      });
    }
    if (_[0] !== 0)
      throw new v(L.HD_WALLET_ERROR, "Invalid private extended key.");
    return new cr({
      privateKey: _.slice(1),
      chainCode: d,
      index: o,
      depth: i,
      parentFingerprint: a
    });
  }
}, T(cr, "HDWallet"), cr), Dc = M2, ei, Eg = (ei = class extends Mo {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(t) {
    return new dn(t, this._provider);
  }
}, T(ei, "WalletLocked"), ei), Ge, dn = (Ge = class extends T2 {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new $i("0x00"), new Eg(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(t) {
    const e = $i.generatePrivateKey(t == null ? void 0 : t.entropy);
    return new Ge(e, t == null ? void 0 : t.provider);
  }
  /**
   * Create a Wallet Unlocked from a seed.
   *
   * @param seed - The seed phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromSeed(t, e, n) {
    const i = Dc.fromSeed(t).derivePath(e || Ge.defaultPath);
    return new Ge(i.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from a mnemonic phrase.
   *
   * @param mnemonic - The mnemonic phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @param passphrase - The passphrase for the mnemonic (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromMnemonic(t, e, n, s) {
    const i = iu.mnemonicToSeed(t, n), o = Dc.fromSeed(i).derivePath(e || Ge.defaultPath);
    return new Ge(o.privateKey, s);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(t, e) {
    const n = Dc.fromExtendedKey(t);
    return new Ge(n.privateKey, e);
  }
  /**
   * Create a Wallet Unlocked from an encrypted JSON.
   *
   * @param jsonWallet - The encrypted JSON keystore.
   * @param password - The password to decrypt the JSON.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static async fromEncryptedJson(t, e, n) {
    const s = await ug(t, e);
    return new Ge(s, n);
  }
}, T(Ge, "WalletUnlocked"), Ge), ir, Ar = (ir = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(t, e) {
    return new Eg(t, e);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(t, e) {
    return new dn(t, e);
  }
}, T(ir, "Wallet"), /**
 * Generate a new Wallet Unlocked with a random key pair.
 *
 * @param generateOptions - Options to customize the generation process (optional).
 * @returns An unlocked wallet instance.
 */
D(ir, "generate", dn.generate), /**
 * Create a Wallet Unlocked from a seed.
 *
 * @param seed - The seed phrase.
 * @param provider - A Provider instance (optional).
 * @param path - The derivation path (optional).
 * @returns An unlocked wallet instance.
 */
D(ir, "fromSeed", dn.fromSeed), /**
 * Create a Wallet Unlocked from a mnemonic phrase.
 *
 * @param mnemonic - The mnemonic phrase.
 * @param provider - A Provider instance (optional).
 * @param path - The derivation path (optional).
 * @param passphrase - The passphrase for the mnemonic (optional).
 * @returns An unlocked wallet instance.
 */
D(ir, "fromMnemonic", dn.fromMnemonic), /**
 * Create a Wallet Unlocked from an extended key.
 *
 * @param extendedKey - The extended key.
 * @param provider - A Provider instance (optional).
 * @returns An unlocked wallet instance.
 */
D(ir, "fromExtendedKey", dn.fromExtendedKey), /**
 * Create a Wallet Unlocked from an encrypted JSON.
 *
 * @param jsonWallet - The encrypted JSON keystore.
 * @param password - The password to decrypt the JSON.
 * @param provider - A Provider instance (optional).
 * @returns An unlocked wallet instance.
 */
D(ir, "fromEncryptedJson", dn.fromEncryptedJson), ir), ri, P2 = (ri = class {
  constructor() {
    D(this, "storage", /* @__PURE__ */ new Map());
  }
  async getItem(t) {
    return await this.storage.get(t);
  }
  async setItem(t, e) {
    await this.storage.set(t, e);
  }
  async removeItem(t) {
    await this.storage.delete(t);
  }
  async clear() {
    await this.storage.clear();
  }
}, T(ri, "MemoryStorage"), ri), En, Zr, L2 = (En = class {
  constructor(t) {
    Ie(this, Zr);
    D(this, "pathKey", "{}");
    D(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`);
    D(this, "numberOfAccounts", 0);
    Ut(this, Zr, t.secret || iu.generate()), this.rootPath = t.rootPath || this.rootPath, this.numberOfAccounts = t.numberOfAccounts || 1;
  }
  getDerivePath(t) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(t)) : `${this.rootPath}/${t}`;
  }
  serialize() {
    return {
      secret: ut(this, Zr),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const t = [];
    let e = 0;
    do {
      const n = Ar.fromMnemonic(ut(this, Zr), this.getDerivePath(e));
      t.push({
        publicKey: n.publicKey,
        address: n.address
      }), e += 1;
    } while (e < this.numberOfAccounts);
    return t;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const t = Ar.fromMnemonic(ut(this, Zr), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: t.publicKey,
      address: t.address
    };
  }
  exportAccount(t) {
    let e = 0;
    const n = new gt(t);
    do {
      const s = Ar.fromMnemonic(ut(this, Zr), this.getDerivePath(e));
      if (s.address.equals(n))
        return s.privateKey;
      e += 1;
    } while (e < this.numberOfAccounts);
    throw new v(
      L.WALLET_MANAGER_ERROR,
      `Account with address '${t}' not found in derived wallets.`
    );
  }
  getWallet(t) {
    const e = this.exportAccount(t);
    return Ar.fromPrivateKey(e);
  }
}, Zr = new WeakMap(), T(En, "MnemonicVault"), D(En, "type", "mnemonic"), En), Cn, Or, k2 = (Cn = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(t = {}) {
    Ie(this, Or, []);
    t.secret ? Ut(this, Or, [t.secret]) : Ut(this, Or, t.accounts || [Ar.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: ut(this, Or)
    };
  }
  getPublicAccount(t) {
    const e = Ar.fromPrivateKey(t);
    return {
      address: e.address,
      publicKey: e.publicKey
    };
  }
  getAccounts() {
    return ut(this, Or).map((t) => this.getPublicAccount(t));
  }
  addAccount() {
    const t = Ar.generate();
    return ut(this, Or).push(t.privateKey), this.getPublicAccount(t.privateKey);
  }
  exportAccount(t) {
    const e = new gt(t), n = ut(this, Or).find(
      (s) => Ar.fromPrivateKey(s).address.equals(e)
    );
    if (!n)
      throw new v(
        L.WALLET_MANAGER_ERROR,
        `No private key found for address '${t}'.`
      );
    return n;
  }
  getWallet(t) {
    const e = this.exportAccount(t);
    return Ar.fromPrivateKey(e);
  }
}, Or = new WeakMap(), T(Cn, "PrivateKeyVault"), D(Cn, "type", "privateKey"), Cn), Dr = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked."
};
function pr(r, t) {
  if (!r)
    throw new v(L.WALLET_MANAGER_ERROR, t);
}
T(pr, "assert");
var qr, Fe, jr, ar, vi, Cg, vg, cR = (qr = class extends Wf.EventEmitter {
  constructor(e) {
    super();
    Ie(this, vi);
    /**
     * Storage
     *
     * Persistent encrypted data. `The default storage works only on memory`.
     */
    D(this, "storage", new P2());
    /* Key name passed to the storage */
    D(this, "STORAGE_KEY", "WalletManager");
    // `This variables are only accessible from inside the class`
    Ie(this, Fe, []);
    Ie(this, jr, "");
    Ie(this, ar, !0);
    this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return ut(this, ar);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    pr(!ut(this, ar), Dr.wallet_not_unlocked);
    const n = ut(this, Fe).find((s, i) => i === e);
    return pr(n, Dr.vault_not_found), n.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return ut(this, Fe).map((e, n) => ({
      title: e.title,
      type: e.type,
      vaultId: n
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return ut(this, Fe).flatMap(
      (e, n) => e.vault.getAccounts().map((s) => ({ ...s, vaultId: n }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const n = new gt(e), s = ut(this, Fe).find(
      (i) => i.vault.getAccounts().find((a) => a.address.equals(n))
    );
    return pr(s, Dr.address_not_found), s.vault.getWallet(n);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const n = new gt(e);
    pr(!ut(this, ar), Dr.wallet_not_unlocked);
    const s = ut(this, Fe).find(
      (i) => i.vault.getAccounts().find((a) => a.address.equals(n))
    );
    return pr(s, Dr.address_not_found), s.vault.exportAccount(n);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const n = ut(this, Fe)[(e == null ? void 0 : e.vaultId) || 0];
    await pr(n, Dr.vault_not_found);
    const s = n.vault.addAccount();
    return await this.saveState(), s;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    ut(this, Fe).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const n = this.getVaultClass(e.type), s = new n(e);
    Ut(this, Fe, ut(this, Fe).concat({
      title: e.title,
      type: e.type,
      vault: s
    })), await this.saveState();
  }
  /**
   * Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
   * secrets.
   */
  lock() {
    Ut(this, ar, !0), Ut(this, Fe, []), Ut(this, jr, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Ut(this, jr, e), Ut(this, ar, !1);
    try {
      await this.loadState(), this.emit("unlock");
    } catch (n) {
      throw await this.lock(), n;
    }
  }
  /**
   * Update WalletManager encryption passphrase
   */
  async updatePassphrase(e, n) {
    const s = ut(this, ar);
    await this.unlock(e), Ut(this, jr, n), await this.saveState(), await this.loadState(), s && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await pr(!ut(this, ar), Dr.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const n = await K0(ut(this, jr), JSON.parse(e));
      Ut(this, Fe, sn(this, vi, vg).call(this, n.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await pr(!ut(this, ar), Dr.wallet_not_unlocked);
    const e = await tm(ut(this, jr), {
      vaults: sn(this, vi, Cg).call(this, ut(this, Fe))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const n = qr.Vaults.find((s) => s.type === e);
    return pr(n, Dr.invalid_vault_type), n;
  }
}, Fe = new WeakMap(), jr = new WeakMap(), ar = new WeakMap(), vi = new WeakSet(), /**
 * Serialize all vaults to store
 *
 * `This is only accessible from inside the class`
 */
Cg = function(e) {
  return e.map(({ title: n, type: s, vault: i }) => ({
    title: n,
    type: s,
    data: i.serialize()
  }));
}, /**
 * Deserialize all vaults to state
 *
 * `This is only accessible from inside the class`
 */
vg = function(e) {
  return e.map(({ title: n, type: s, data: i }) => {
    const a = this.getVaultClass(s);
    return {
      title: n,
      type: s,
      vault: new a(i)
    };
  });
}, T(qr, "WalletManager"), /**
 * Vaults
 *
 * Vaults are responsible to store secret keys and return an `Wallet` instance,
 * to interact with the network.
 *
 * Each vault has access to its own state
 *
 */
D(qr, "Vaults", [L2, k2]), qr), vn, dR = (vn = class {
  constructor(t) {
    throw new v(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new v(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new v(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new v(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(t) {
    throw new v(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(t) {
    throw new v(L.NOT_IMPLEMENTED, "Not implemented.");
  }
}, T(vn, "Vault"), D(vn, "type"), vn), ni, uR = (ni = class {
}, T(ni, "StorageAbstract"), ni), U2 = 32, Se = 16, Xe = 17, Wn = 18, z2 = 8, G2 = 8, V2 = 16;
function Bg(r) {
  const [t] = new rt("u64").decode(r, G2);
  return t.toNumber();
}
T(Bg, "getBytecodeDataOffset");
function Po(r) {
  const [t] = new rt("u64").decode(r, V2);
  return t.toNumber();
}
T(Po, "getBytecodeConfigurableOffset");
function xg(r) {
  const t = Po(r), e = r.slice(0, t);
  return Gt(e);
}
T(xg, "getBytecodeId");
function Y2(r) {
  const t = Bg(r), e = r.slice(0, t);
  return Gt(e);
}
T(Y2, "getLegacyBlobId");
function Rg(r, t) {
  const { RegId: e, Instruction: n } = Of, s = e.pc().to_u8(), i = e.sp().to_u8(), a = e.is().to_u8(), o = /* @__PURE__ */ T((R) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    fn(Se, s),
    // hold the address of the blob ID.
    wr(
      Se,
      Se,
      R * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    fn(Xe, i),
    // REG_GENERAL_USE to hold the size of the blob.
    Xa(Wn, Se),
    // Push the blob contents onto the stack.
    Hi(Se, 0, Wn, 1),
    // Move on to the data section length
    wr(Se, Se, U2),
    // load the size of the data section into REG_GENERAL_USE
    Ji(Wn, Se, 0),
    // after we have read the length of the data section, we move the pointer to the actual
    // data by skipping WORD_SIZE bytes.
    wr(Se, Se, z2),
    // load the data section of the executable
    Hi(Se, 0, Wn, 2),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    Ya(Xe, Xe, a),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    Wa(Xe, Xe, 4),
    // Jump to the start of the contract we loaded.
    Ha(Xe)
  ], "getInstructions"), d = /* @__PURE__ */ T((R) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    fn(Se, s),
    // hold the address of the blob ID.
    wr(
      Se,
      Se,
      R * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    fn(Xe, i),
    // REG_GENERAL_USE to hold the size of the blob.
    Xa(Wn, Se),
    // Push the blob contents onto the stack.
    Hi(Se, 0, Wn, 1),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    Ya(Xe, Xe, a),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    Wa(Xe, Xe, 4),
    // Jump to the start of the contract we loaded.
    Ha(Xe)
  ], "getInstructionsNoDataSection"), _ = Po(r);
  if (r.length < _)
    throw new Error(
      `Data section offset is out of bounds, offset: ${_}, binary length: ${r.length}`
    );
  const A = r.slice(_);
  if (A.length > 0) {
    const R = o(0).length;
    if (R > 65535)
      throw new Error("Too many instructions, exceeding u16::MAX.");
    const F = new Uint8Array(
      o(R).flatMap(
        (M) => Array.from(M.to_bytes())
      )
    ), z = new Uint8Array(t), H = new Uint8Array(8);
    new DataView(H.buffer).setBigUint64(0, BigInt(A.length), !1);
    const P = new Uint8Array([
      ...F,
      ...z,
      ...H
    ]);
    return {
      loaderBytecode: ot([P, A]),
      blobOffset: P.length
    };
  }
  const g = d(0).length;
  if (g > 65535)
    throw new Error("Too many instructions, exceeding u16::MAX.");
  const y = new Uint8Array(
    d(g).flatMap(
      (R) => Array.from(R.to_bytes())
    )
  ), S = new Uint8Array(t);
  return { loaderBytecode: new Uint8Array([...y, ...S]) };
}
T(Rg, "getPredicateScriptLoaderInstructions");
async function Sg(r, t) {
  let e = x(0);
  const n = await r.provider.getChain(), s = await r.provider.estimateGasPrice(10), i = n.consensusParameters.feeParameters.gasPriceFactor, a = t.calculateMinGas(n), o = Ii({
    gasPrice: s,
    gas: a,
    priceFactor: i,
    tip: t.tip
  }).add(1);
  if (e = e.add(o), e.gt(await r.getBalance()))
    throw new v(L.FUNDS_TOO_LOW, "Insufficient balance to deploy predicate.");
  const d = await r.getTransactionCost(t);
  return t.maxFee = d.maxFee, r.fund(t, d);
}
T(Sg, "fundBlobTx");
function Tg(r, t) {
  const { configurables: e } = r, n = [];
  return e.forEach((s) => {
    n.push({ ...s, offset: s.offset - t });
  }), { ...r, configurables: n };
}
T(Tg, "adjustConfigurableOffsets");
async function cu({
  deployer: r,
  bytecode: t,
  abi: e,
  loaderInstanceCallback: n
}) {
  const s = xg(Z(t)), i = Po(Z(t)), a = t.slice(0, i), o = new ao({
    blobId: s,
    witnessIndex: 0,
    witnesses: [a]
  }), { loaderBytecode: d, blobOffset: _ } = Rg(
    Z(t),
    Z(s)
  ), A = a.length - (_ || 0), g = Tg(e, A), y = (await r.provider.getBlobs([s])).length > 0, S = n(d, g);
  if (y)
    return {
      waitForResult: /* @__PURE__ */ T(() => Promise.resolve(S), "waitForResult"),
      blobId: s
    };
  const O = await Sg(r, o);
  return {
    waitForResult: /* @__PURE__ */ T(async () => {
      try {
        if ((await (await r.sendTransaction(O)).waitForResult()).status !== "success")
          throw new Error();
      } catch {
        throw new v(L.TRANSACTION_FAILED, "Failed to deploy predicate chunk");
      }
      return S;
    }, "waitForResult"),
    blobId: s
  };
}
T(cu, "deployScriptOrPredicate");
var H2 = /* @__PURE__ */ T((r) => {
  const e = Z(r), n = ap(e, 16384), s = zd(n.map((a) => X(a)));
  return lr(ot(["0x4655454C", s]));
}, "getPredicateRoot"), gr, hR = (gr = class extends Mo {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytecode - The bytecode of the predicate.
   * @param abi - The JSON ABI of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param data - The predicate input data (optional).
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor({
    bytecode: e,
    abi: n,
    provider: s,
    data: i,
    configurableConstants: a
  }) {
    const { predicateBytes: o, predicateInterface: d } = gr.processPredicateData(
      e,
      n,
      a
    ), _ = new gt(H2(o));
    super(_, s);
    D(this, "bytes");
    D(this, "predicateData", []);
    D(this, "interface");
    D(this, "initialBytecode");
    D(this, "configurableConstants");
    this.initialBytecode = Z(e), this.bytes = o, this.interface = d, this.configurableConstants = a, i !== void 0 && i.length > 0 && (this.predicateData = i);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(e) {
    const n = Oe(e), s = this.getIndexFromPlaceholderWitness(n);
    return s !== -1 && n.removeWitness(s), n.inputs.filter(Do).forEach((i) => {
      od(i, this.address) && (i.predicate = X(this.bytes), i.predicateData = X(this.getPredicateData()), i.witnessIndex = 0);
    }), n;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(e) {
    const n = Oe(e);
    return super.sendTransaction(n, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(e) {
    const n = Oe(e);
    return super.simulateTransaction(n, { estimateTxDependencies: !1 });
  }
  getPredicateData() {
    var n;
    if (!this.predicateData.length)
      return new Uint8Array();
    const e = (n = this.interface) == null ? void 0 : n.functions.main;
    return (e == null ? void 0 : e.encodeArguments(this.predicateData)) || new Uint8Array();
  }
  /**
   * Creates a new Predicate instance from an existing Predicate instance.
   * @param overrides - The data and configurable constants to override.
   * @returns A new Predicate instance with the same bytecode, ABI and provider but with the ability to set the data and configurable constants.
   */
  toNewInstance(e = {}) {
    return new gr({
      bytecode: this.initialBytecode,
      abi: this.interface.jsonAbi,
      provider: this.provider,
      data: e.data ?? this.predicateData,
      configurableConstants: e.configurableConstants ?? this.configurableConstants
    });
  }
  /**
   * Processes the predicate data and returns the altered bytecode and interface.
   *
   * @param bytes - The bytes of the predicate.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   * @returns An object containing the new predicate bytes and interface.
   */
  static processPredicateData(e, n, s) {
    let i = Z(e);
    const a = new Ke(n);
    if (a.functions.main === void 0)
      throw new v(
        L.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return s && Object.keys(s).length && (i = gr.setConfigurableConstants(
      i,
      s,
      a
    )), {
      predicateBytes: i,
      predicateInterface: a
    };
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(e, n) {
    return (await this.provider.getResourcesToSpend(
      this.address,
      e,
      n
    )).map((i) => ({
      ...i,
      predicate: X(this.bytes),
      predicateData: X(this.getPredicateData())
    }));
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(e) {
    return super.generateFakeResources(e).map((n) => ({
      ...n,
      predicate: X(this.bytes),
      predicateData: X(this.getPredicateData())
    }));
  }
  /**
   * Sets the configurable constants for the predicate.
   *
   * @param bytes - The bytes of the predicate.
   * @param configurableConstants - Configurable constants to be set.
   * @param abiInterface - The ABI interface of the predicate.
   * @returns The mutated bytes with the configurable constants set.
   */
  static setConfigurableConstants(e, n, s) {
    const i = e;
    try {
      if (Object.keys(s.configurables).length === 0)
        throw new v(
          L.INVALID_CONFIGURABLE_CONSTANTS,
          "Predicate has no configurable constants to be set"
        );
      Object.entries(n).forEach(([a, o]) => {
        if (!(s != null && s.configurables[a]))
          throw new v(
            L.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${a}' found in the Predicate`
          );
        const { offset: d } = s.configurables[a], _ = s.encodeConfigurable(a, o);
        i.set(_, d);
      });
    } catch (a) {
      throw new v(
        L.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${a.message}.`
      );
    }
    return i;
  }
  /**
   * Returns the index of the witness placeholder that was added to this predicate.
   * If no witness placeholder was added, it returns -1.
   * @param request - The transaction request.
   * @returns The index of the witness placeholder, or -1 if there is no witness placeholder.
   */
  getIndexFromPlaceholderWitness(e) {
    var a;
    const n = e.inputs.filter(zn).filter((o) => od(o, this.address));
    let s = -1;
    const i = n.find((o) => !o.predicate);
    return i && (s = i.witnessIndex, n.every((d) => !d.predicate) || (a = n[0]) != null && a.predicate && (s = -1)), s;
  }
  /**
   *
   * @param account - The account used to pay the deployment costs.
   * @returns The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
   * once the blob deployment transaction finishes.
   *
   * The returned loader predicate will have the same configurable constants
   * as the original predicate which was used to generate the loader predicate.
   */
  async deploy(e) {
    return cu({
      deployer: e,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: /* @__PURE__ */ T((n, s) => new gr({
        bytecode: n,
        abi: s,
        provider: this.provider,
        data: this.predicateData
      }), "loaderInstanceCallback")
    });
  }
}, T(gr, "Predicate"), gr), Ng = /* @__PURE__ */ ((r) => (r.ping = "ping", r.version = "version", r.connect = "connect", r.disconnect = "disconnect", r.isConnected = "isConnected", r.accounts = "accounts", r.currentAccount = "currentAccount", r.signMessage = "signMessage", r.sendTransaction = "sendTransaction", r.assets = "assets", r.addAsset = "addAsset", r.addAssets = "addAssets", r.networks = "networks", r.currentNetwork = "currentNetwork", r.addNetwork = "addNetwork", r.selectNetwork = "selectNetwork", r.addABI = "addABI", r.getABI = "getABI", r.hasABI = "hasABI", r))(Ng || {}), du = /* @__PURE__ */ ((r) => (r.connectors = "connectors", r.currentConnector = "currentConnector", r.connection = "connection", r.accounts = "accounts", r.currentAccount = "currentAccount", r.networks = "networks", r.currentNetwork = "currentNetwork", r.assets = "assets", r.abis = "abis", r))(du || {}), Dg = "FuelConnector", si, W2 = (si = class {
  constructor(t) {
    D(this, "storage");
    this.storage = t;
  }
  async setItem(t, e) {
    this.storage.setItem(t, e);
  }
  async getItem(t) {
    return this.storage.getItem(t);
  }
  async removeItem(t) {
    this.storage.removeItem(t);
  }
  async clear() {
    this.storage.clear();
  }
}, T(si, "LocalStorage"), si), ii, X2 = (ii = class extends Wf.EventEmitter {
  constructor() {
    super(...arguments);
    D(this, "name", "");
    D(this, "metadata", {});
    D(this, "connected", !1);
    D(this, "installed", !1);
    D(this, "external", !0);
    D(this, "events", du);
  }
  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the connection process and return
   * true if the account authorize the connection.
   *
   * and return false if the user reject the connection.
   *
   * @emits accounts
   * @returns boolean - connection status.
   */
  async connect() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the sign message process and return
   * the signed message.
   *
   * @param address - The address to sign the message
   * @param message - The message to sign all text will be treated as text utf-8
   *
   * @returns Message signature
   */
  async signMessage(e, n) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the sign transaction process and return
   * the signed transaction.
   *
   * @param address - The address to sign the transaction
   * @param transaction - The transaction to sign
   *
   * @returns Transaction signature
   */
  async signTransaction(e, n) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the send transaction process and return
   * the transaction id submitted to the network.
   *
   * If the network is not available for the connection
   * it should throw an error to avoid the transaction
   * to be sent to the wrong network and lost.
   *
   * @param address - The address to sign the transaction
   * @param transaction - The transaction to send
   * @param params - Optional parameters to send the transaction
   * @returns The transaction id or transaction response
   */
  async sendTransaction(e, n, s) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current account selected inside the connector, if the account
   * is authorized for the connection.
   *
   * If the account is not authorized it should return null.
   *
   * @returns The current account selected otherwise null.
   */
  async currentAccount() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the assets metadata to the connector and return true if the asset
   * was added successfully.
   *
   * If the asset already exists it should throw an error.
   *
   * @emits assets
   * @param assets - The assets to add the metadata to the connection.
   * @throws Error if the asset already exists
   * @returns True if the asset was added successfully
   */
  async addAssets(e) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the asset metadata to the connector and return true if the asset
   * was added successfully.
   *
   * If the asset already exists it should throw an error.
   *
   * @emits assets
   * @param asset - The asset to add the metadata to the connection.
   * @throws Error if the asset already exists
   * @returns True if the asset was added successfully
   */
  async addAsset(e) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the add network process and return true if the network was added successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param networkUrl - The URL of the network to be added.
   * @returns Return true if the network was added successfully
   */
  async addNetwork(e) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the select network process and return true if the network has change successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param network - The network to be selected.
   * @returns Return true if the network was added successfully
   */
  async selectNetwork(e) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork() {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(e, n) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(e) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(e) {
    throw new v(v.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Event listener for the connector.
   *
   * @param eventName - The event name to listen
   * @param listener - The listener function
   */
  on(e, n) {
    return super.on(e, n), this;
  }
}, T(ii, "FuelConnector"), ii);
function Fg(r, { cache: t, cacheTime: e, key: n }) {
  return async (...s) => {
    var a, o, d;
    if (t[n] && ((a = t[n]) != null && a.value))
      return (o = t[n]) == null ? void 0 : o.value;
    clearTimeout((d = t[n]) == null ? void 0 : d.timeout);
    const i = await r(...s);
    return t[n] = {
      timeout: Number(
        setTimeout(() => {
          t[n] = null;
        }, e)
      ),
      value: i
    }, i;
  };
}
T(Fg, "cacheFor");
function Z2(r) {
  window.dispatchEvent(
    new CustomEvent(Dg, {
      detail: r
    })
  );
}
T(Z2, "dispatchFuelConnectorEvent");
function Qg() {
  const r = {};
  return r.promise = new Promise((t, e) => {
    r.reject = e, r.resolve = t;
  }), r;
}
T(Qg, "deferPromise");
async function Gi(r, t = 1050) {
  const e = new Promise((n, s) => {
    setTimeout(() => {
      s(new v(v.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([e, r]);
}
T(Gi, "withTimeout");
var j2 = 2e3, J2 = 5e3, { warn: q2 } = console, Je, lR = (Je = class extends X2 {
  constructor(e = Je.defaultConfig) {
    super();
    D(this, "_storage", null);
    D(this, "_connectors", []);
    D(this, "_targetObject", null);
    D(this, "_unsubscribes", []);
    D(this, "_targetUnsubscribe", /* @__PURE__ */ T(() => {
    }, "_targetUnsubscribe"));
    D(this, "_pingCache", {});
    D(this, "_currentConnector");
    D(this, "_initializationPromise", null);
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    D(this, "setupConnectorListener", /* @__PURE__ */ T(() => {
      const { _targetObject: e } = this, n = Dg;
      if (e != null && e.on)
        return e.on(n, this.addConnector), () => {
          var s;
          (s = e.off) == null || s.call(e, n, this.addConnector);
        };
      if (e != null && e.addEventListener) {
        const s = /* @__PURE__ */ T((i) => {
          this.addConnector(i.detail);
        }, "handler");
        return e.addEventListener(n, s), () => {
          var i;
          (i = e.removeEventListener) == null || i.call(e, n, s);
        };
      }
      return () => {
      };
    }, "setupConnectorListener"));
    /**
     * Add a new connector to the list of connectors.
     */
    D(this, "addConnector", /* @__PURE__ */ T(async (e) => {
      this.getConnector(e) || this._connectors.push(e), await this.fetchConnectorStatus(e), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(e.name, {
        emitEvents: !1
      });
    }, "addConnector"));
    D(this, "triggerConnectorEvents", /* @__PURE__ */ T(async () => {
      const [e, n, s] = await Promise.all([
        this.isConnected(),
        this.networks(),
        this.currentNetwork()
      ]);
      if (this.emit(this.events.connection, e), this.emit(this.events.networks, n), this.emit(this.events.currentNetwork, s), e) {
        const [i, a] = await Promise.all([
          this.accounts(),
          this.currentAccount()
        ]);
        this.emit(this.events.accounts, i), this.emit(this.events.currentAccount, a);
      }
    }, "triggerConnectorEvents"));
    /**
     * Get a connector from the list of connectors.
     */
    D(this, "getConnector", /* @__PURE__ */ T((e) => this._connectors.find((n) => {
      const s = typeof e == "string" ? e : e.name;
      return n.name === s || n === e;
    }) || null, "getConnector"));
    this.setMaxListeners(1e3), this._connectors = e.connectors ?? [], this._targetObject = this.getTargetObject(e.targetObject), this._storage = e.storage === void 0 ? this.getStorage() : e.storage, this.setupMethods(), this._initializationPromise = this.initialize();
  }
  async initialize() {
    try {
      const e = this.setDefaultConnector();
      this._targetUnsubscribe = this.setupConnectorListener(), await e;
    } catch {
      throw new v(L.INVALID_PROVIDER, "Error initializing Fuel Connector");
    }
  }
  async init() {
    return await this._initializationPromise, this;
  }
  /**
   * Return the target object to listen for global events.
   */
  getTargetObject(e) {
    return e || (typeof window < "u" ? window : typeof document < "u" ? document : null);
  }
  /**
   * Return the storage used.
   */
  getStorage() {
    if (typeof window < "u")
      return new W2(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, s;
    const e = await ((n = this._storage) == null ? void 0 : n.getItem(Je.STORAGE_KEY)) || ((s = this._connectors[0]) == null ? void 0 : s.name);
    if (e)
      return this.selectConnector(e, {
        emitEvents: !1
      });
  }
  /**
   * Start listener for all the events of the current
   * connector and emit them to the Fuel instance
   */
  setupConnectorEvents(e) {
    if (!this._currentConnector)
      return;
    const n = this._currentConnector;
    this._unsubscribes.map((s) => s()), this._unsubscribes = e.map((s) => {
      const i = /* @__PURE__ */ T((...a) => this.emit(s, ...a), "handler");
      return n.on(s, i), () => n.off(s, i);
    });
  }
  /**
   * Call method from the current connector.
   */
  async callMethod(e, ...n) {
    const s = await this.hasConnector();
    if (await this.pingConnector(), !this._currentConnector || !s)
      throw new v(
        L.MISSING_CONNECTOR,
        `No connector selected for calling ${e}. Use hasConnector before executing other methods.`
      );
    if (typeof this._currentConnector[e] == "function")
      return this._currentConnector[e](...n);
  }
  /**
   * Create a method for each method proxy that is available on the Common interface
   * and call the method from the current connector.
   */
  setupMethods() {
    Object.values(Ng).forEach((e) => {
      this[e] = async (...n) => this.callMethod(e, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(e) {
    const n = Date.now(), [s, i] = await Promise.allSettled([
      Gi(e.isConnected()),
      Gi(this.pingConnector(e))
    ]);
    return n < (e._latestUpdate || 0) || (e._latestUpdate = Date.now(), e.installed = i.status === "fulfilled" && i.value, e.connected = s.status === "fulfilled" && s.value), {
      installed: e.installed,
      connected: e.connected
    };
  }
  /**
   * Fetch the status of all connectors and set the installed and connected
   * status.
   */
  async fetchConnectorsStatus() {
    return Promise.all(
      this._connectors.map(async (e) => this.fetchConnectorStatus(e))
    );
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status. If no connector is provided it will ping the current connector.
   */
  async pingConnector(e) {
    const n = e || this._currentConnector;
    if (!n)
      return !1;
    try {
      return await Fg(async () => Gi(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: J2
      })();
    } catch {
      throw new v(L.INVALID_PROVIDER, "Current connector is not available.");
    }
  }
  /**
   * Return the list of connectors with the status of installed and connected.
   */
  async connectors() {
    return await this.fetchConnectorsStatus(), this._connectors;
  }
  /**
   * Set the current connector to be used.
   */
  async selectConnector(e, n = {
    emitEvents: !0
  }) {
    var a, o;
    const s = this.getConnector(e);
    if (!s)
      return !1;
    if (((a = this._currentConnector) == null ? void 0 : a.name) === e)
      return !0;
    const { installed: i } = await this.fetchConnectorStatus(s);
    return i ? (this._currentConnector = s, this.emit(this.events.currentConnector, s), this.setupConnectorEvents(Object.values(du)), await ((o = this._storage) == null ? void 0 : o.setItem(Je.STORAGE_KEY, s.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
  }
  /**
   * Return the current selected connector.
   */
  currentConnector() {
    return this._currentConnector;
  }
  /**
   * Return true if any connector is available.
   */
  async hasConnector() {
    if (this._currentConnector)
      return !0;
    const e = Qg();
    return this.once(this.events.currentConnector, () => {
      e.resolve(!0);
    }), Gi(e.promise, j2).then(() => !0).catch(() => !1);
  }
  async hasWallet() {
    return this.hasConnector();
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   *
   * @deprecated getProvider is deprecated and is going to be removed in the future, use getWallet instead.
   */
  async getProvider(e) {
    return q2(
      "getProvider is deprecated and is going to be removed in the future, use getWallet instead."
    ), this._getProvider(e);
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   */
  async _getProvider(e) {
    let n;
    if (e && "getTransactionResponse" in e)
      n = e;
    else if (e && "chainId" in e && "url" in e)
      n = new D_(e.url);
    else {
      if (e)
        throw new v(L.INVALID_PROVIDER, "Provider is not valid.");
      {
        const s = await this.currentNetwork();
        n = new D_(s.url);
      }
    }
    return n;
  }
  /**
   * Return a Fuel Wallet Locked instance with extends features to work with
   * connectors.
   */
  async getWallet(e, n) {
    const s = await this._getProvider(n);
    return new Mo(e, s, this);
  }
  /**
   * Remove all open listeners this is useful when you want to
   * remove the Fuel instance and avoid memory leaks.
   */
  unsubscribe() {
    this._unsubscribes.map((e) => e()), this._targetUnsubscribe(), this.removeAllListeners();
  }
  /**
   * Clean all the data from the storage.
   */
  async clean() {
    var e;
    await ((e = this._storage) == null ? void 0 : e.removeItem(Je.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, T(Je, "Fuel"), D(Je, "STORAGE_KEY", "fuel-current-connector"), D(Je, "defaultConfig", {}), Je), $2 = Object.defineProperty, xt = (r, t) => $2(r, "name", { value: t, configurable: !0 }), ai, Og = (ai = class {
}, xt(ai, "AbstractProgram"), ai), oi, _R = (oi = class extends Og {
}, xt(oi, "AbstractContract"), oi);
function ld(r, t) {
  if (!r)
    throw new v(L.TRANSACTION_ERROR, t);
}
xt(ld, "assert");
function Lo(r) {
  return r.reduce((t, e, n) => {
    const { program: s, externalAbis: i } = e.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
xt(Lo, "getAbisFromAllCalls");
var pR = /* @__PURE__ */ xt((r, t, e) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = Lo(e);
  return ig(r, n, s);
}, "getResultLogs"), Mg = /* @__PURE__ */ xt((r) => {
  const { receipts: t, mainCallConfig: e, functionScopes: n } = r;
  if (!e)
    return { logs: [], groupedLogs: {} };
  const { main: s, otherContractsAbis: i } = Lo(n);
  return Oo({ receipts: t, mainAbi: s, externalAbis: i });
}, "getAllResultLogs"), fr, ci, uu = (ci = class {
  constructor(...t) {
    Ie(this, fr);
    Ut(this, fr, t || []);
  }
  entries() {
    return ut(this, fr);
  }
  push(...t) {
    ut(this, fr).push(...t);
  }
  concat(t) {
    return ut(this, fr).concat(t);
  }
  extend(t) {
    ut(this, fr).push(...t);
  }
  toBytes() {
    return ot(
      ut(this, fr).reduce((t, e) => (t.push(e.to_bytes()), t), [])
    );
  }
  toHex() {
    return X(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(ut(this, fr), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, fr = new WeakMap(), xt(ci, "InstructionSet"), ci), K2 = /* @__PURE__ */ xt((r) => Zp + Xp({ maxInputs: r }), "calculateScriptDataBaseOffset");
function Pg(r) {
  const t = [...r.receipts];
  let e, n;
  if (t.forEach((i) => {
    i.type === dt.ScriptResult ? e = i : (i.type === dt.Return || i.type === dt.ReturnData || i.type === dt.Revert) && (n = i);
  }), !e || !n)
    throw new v(L.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: e.result,
    gasUsed: e.gasUsed,
    receipts: t,
    scriptResultReceipt: e,
    returnReceipt: n,
    callResult: r
  };
}
xt(Pg, "callResultToScriptResult");
function ko(r, t, e = [], n = {}) {
  var s;
  try {
    const i = Pg(r);
    return t(i);
  } catch (i) {
    if (i.code === L.SCRIPT_REVERTED) {
      const a = (s = r == null ? void 0 : r.dryRunStatus) == null ? void 0 : s.reason;
      throw Jd({
        logs: e,
        groupedLogs: n,
        receipts: r.receipts,
        statusReason: a
      });
    }
    throw i;
  }
}
xt(ko, "decodeCallResult");
function Lg(r, t, e, n) {
  return ko(
    r,
    (s) => {
      if (s.returnReceipt.type === dt.Revert)
        throw new v(
          L.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(e)}`
        );
      if (s.returnReceipt.type !== dt.Return && s.returnReceipt.type !== dt.ReturnData) {
        const { type: a } = s.returnReceipt;
        throw new v(
          L.SCRIPT_REVERTED,
          `Script Return Type [${a}] Invalid. Logs: ${JSON.stringify({
            logs: e,
            groupedLogs: n,
            receipt: s.returnReceipt
          })}`
        );
      }
      let i;
      return s.returnReceipt.type === dt.Return && (i = s.returnReceipt.val), s.returnReceipt.type === dt.ReturnData && (i = t.func.decodeOutput(s.returnReceipt.data)[0]), i;
    },
    e
  );
}
xt(Lg, "callResultToInvocationResult");
var Qn, hu = (Qn = class {
  /**
   * Creates an instance of the ScriptRequest class.
   *
   * @param bytes - The bytes of the script.
   * @param scriptDataEncoder - The script data encoder function.
   * @param scriptResultDecoder - The script result decoder function.
   */
  constructor(t, e, n) {
    /**
     * The bytes of the script.
     */
    D(this, "bytes");
    /**
     * A function to encode the script data.
     */
    D(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    D(this, "scriptResultDecoder");
    this.bytes = Z(t), this.scriptDataEncoder = e, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(t, e) {
    return Xp({ maxInputs: e }) + Zp + t;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(t) {
    return Qn.getScriptDataOffsetWithScriptBytes(this.bytes.length, t);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(t) {
    const e = this.scriptDataEncoder(t);
    return ArrayBuffer.isView(e) ? e : (this.bytes = Z(e.script), e.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(t, e = []) {
    return ko(t, this.scriptResultDecoder, e);
  }
}, xt(Qn, "ScriptRequest"), Qn), kg = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, tx = Rt, Ug = /* @__PURE__ */ xt(({
  callDataOffset: r,
  gasForwardedOffset: t,
  amountOffset: e,
  assetIdOffset: n
}) => {
  const s = new uu(
    Jn(16, r),
    Jn(17, e),
    Ji(17, 17, 0),
    Jn(18, n)
  );
  return t ? s.push(
    Jn(19, t),
    Ji(19, 19, 0),
    $c(16, 17, 18, 19)
  ) : s.push($c(16, 17, 18, l.cgas().to_u8())), s;
}, "getSingleCallInstructions");
function _d(r) {
  if (!r.length)
    return new Uint8Array();
  const t = new uu();
  for (let e = 0; e < r.length; e += 1)
    t.extend(Ug(r[e]).entries());
  return t.push(Qd(1)), t.toBytes();
}
xt(_d, "getInstructions");
var ex = /* @__PURE__ */ xt((r) => r === dt.Return || r === dt.ReturnData, "isReturnType"), rx = /* @__PURE__ */ xt((r, t) => r.find(
  ({ type: e, id: n, to: s }) => e === dt.Call && n === tx && s === t
), "getMainCallReceipt"), nx = /* @__PURE__ */ xt((r) => (t) => {
  if (Mr(t.code) !== 0)
    throw new v(L.SCRIPT_REVERTED, "Transaction reverted.");
  const e = rx(
    t.receipts,
    r.toB256()
  ), n = x(e == null ? void 0 : e.is);
  return t.receipts.filter(({ type: i }) => ex(i)).flatMap((i) => n.eq(x(i.is)) ? i.type === dt.Return ? [new rt("u64").encode(i.val)] : i.type === dt.ReturnData ? [Z(i.data)] : [new Uint8Array()] : []);
}, "scriptResultDecoder"), sx = /* @__PURE__ */ xt((r, t, e = [], n = {}) => ko(r, nx(t), e, n), "decodeContractCallScriptResult"), ix = /* @__PURE__ */ xt((r) => r.reduce(
  (t, e) => {
    const n = { ...kg };
    return e.gas && (n.gasForwardedOffset = 1), t + Ug(n).byteLength();
  },
  Y.size()
  // placeholder for single RET instruction which is added later
), "getCallInstructionsLength"), ax = /* @__PURE__ */ xt((r, t) => new hu(
  // Script to call the contract, start with stub size matching length of calls
  _d(new Array(r.length).fill(kg)),
  (e) => {
    var S;
    const n = e.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = ix(e), i = (8 - s % 8) % 8, a = s + i, o = K2(t.toNumber()) + a, d = [];
    let _ = o;
    const A = [];
    for (let O = 0; O < n; O += 1) {
      const R = e[O], F = _, z = F + ht, H = z + Zi, V = H + Hc + ht + ht, P = V + R.fnSelectorBytes.byteLength, M = Z(R.data);
      let Q = 0;
      A.push(new rt("u64").encode(R.amount || 0)), A.push(new at().encode(((S = R.assetId) == null ? void 0 : S.toString()) || Rt)), A.push(R.contractId.toBytes()), A.push(new rt("u64").encode(V)), A.push(new rt("u64").encode(P)), A.push(R.fnSelectorBytes), A.push(M), R.gas && (A.push(new rt("u64").encode(R.gas)), Q = P + M.byteLength);
      const k = {
        amountOffset: F,
        assetIdOffset: z,
        gasForwardedOffset: Q,
        callDataOffset: H
      };
      d.push(k), _ = o + ot(A).byteLength;
    }
    const g = _d(d);
    return { data: ot(A), script: g };
  },
  () => [new Uint8Array()]
), "getContractCallScript"), zg = /* @__PURE__ */ xt((r, t, e, n, s = {}) => {
  var d;
  const i = (d = r[0]) == null ? void 0 : d.getCallConfig();
  if (r.length === 1 && i && "bytes" in i.program)
    return Lg({ receipts: t }, i, n, s);
  const o = sx(
    { receipts: t },
    (i == null ? void 0 : i.program).id,
    n,
    s
  ).map((_, A) => {
    var y;
    const { func: g } = r[A].getCallConfig();
    return (y = g.decodeOutput(_)) == null ? void 0 : y[0];
  });
  return e ? o : o == null ? void 0 : o[0];
}, "extractInvocationResult"), ox = /* @__PURE__ */ xt(async (r) => {
  var O;
  const { funcScope: t, isMultiCall: e, program: n, transactionResponse: s } = r, i = await s.waitForResult(), { receipts: a } = i, o = Array.isArray(t) ? t : [t], d = (O = o[0]) == null ? void 0 : O.getCallConfig(), { logs: _, groupedLogs: A } = Mg({ receipts: a, mainCallConfig: d, functionScopes: o }), g = zg(
    o,
    a,
    e,
    _,
    A
  ), y = So(a);
  return {
    isMultiCall: e,
    functionScopes: o,
    value: g,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: _,
    groupedLogs: A,
    gasUsed: y
  };
}, "buildFunctionResult"), Fc = /* @__PURE__ */ xt((r) => {
  var y;
  const { funcScopes: t, callResult: e, isMultiCall: n } = r, { receipts: s } = e, i = Array.isArray(t) ? t : [t], a = (y = i[0]) == null ? void 0 : y.getCallConfig(), { logs: o, groupedLogs: d } = Mg({ receipts: s, mainCallConfig: a, functionScopes: i }), _ = zg(
    i,
    s,
    n,
    o,
    d
  ), A = So(s);
  return {
    functionScopes: i,
    callResult: e,
    isMultiCall: n,
    gasUsed: A,
    value: _
  };
}, "buildDryRunResult");
function Gg(r) {
  const { program: t, args: e, forward: n, func: s, callParameters: i, externalAbis: a } = r.getCallConfig(), o = s.encodeArguments(e);
  return {
    contractId: t.id,
    fnSelectorBytes: s.selectorBytes,
    data: o,
    assetId: n == null ? void 0 : n.assetId,
    amount: n == null ? void 0 : n.amount,
    gas: i == null ? void 0 : i.gasLimit,
    externalContractsAbis: a
  };
}
xt(Gg, "createContractCall");
var di, Vg = (di = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(t, e) {
    D(this, "transactionRequest");
    D(this, "program");
    D(this, "functionInvocationScopes", []);
    D(this, "txParameters");
    D(this, "requiredCoins", []);
    D(this, "isMultiCall", !1);
    D(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    D(this, "externalAbis", {});
    D(this, "addSignersCallback");
    this.program = t, this.isMultiCall = e, this.transactionRequest = new gn();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    return this.functionInvocationScopes.map((t) => Gg(t));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  async updateScriptRequest() {
    const t = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: e }
      }
    } = await t.getChain(), n = ax(this.functionInvocationScopes, e);
    this.transactionRequest.setScript(n, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((e) => {
      e.contractId && this.transactionRequest.addContractInputAndOutput(e.contractId), e.externalContractsAbis && Object.keys(e.externalContractsAbis).forEach(
        (n) => this.transactionRequest.addContractInputAndOutput(new gt(n))
      );
    });
  }
  /**
   * Gets the required coins for the transaction.
   *
   * @returns An array of required coin quantities.
   */
  getRequiredCoins() {
    return this.calls.map((e) => ({
      assetId: String(e.assetId),
      amount: x(e.amount || 0)
    })).filter(({ assetId: e, amount: n }) => e && !x(n).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const t = this.getRequiredCoins(), e = /* @__PURE__ */ xt((n, { assetId: s, amount: i }) => {
      var o;
      const a = ((o = n.get(s)) == null ? void 0 : o.amount) || x(0);
      return n.set(s, {
        assetId: String(s),
        amount: a.add(i)
      });
    }, "reduceForwardCoins");
    this.requiredCoins = Array.from(
      t.reduce(e, /* @__PURE__ */ new Map()).values()
    );
  }
  /**
   * Adds a single call to the invocation scope.
   *
   * @param funcScope - The function scope to add.
   * @returns The current instance of the class.
   */
  addCall(t) {
    return this.addCalls([t]), this;
  }
  /**
   * Adds multiple calls to the invocation scope.
   *
   * @param funcScopes - An array of function scopes to add.
   * @returns The current instance of the class.
   */
  addCalls(t) {
    return this.functionInvocationScopes.push(...t), this.updateContractInputAndOutput(), this.updateRequiredCoins(), this;
  }
  /**
   * Prepares the transaction by updating the script request, required coins, and checking the gas limit.
   */
  async prepareTransaction() {
    await Co(), await this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Bt.Script && (this.transactionRequest.abis = Lo(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const t = this.calls.reduce((e, n) => e.add(n.gas || 0), x(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = t;
    else if (t.gt(this.transactionRequest.gasLimit))
      throw new v(
        L.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost for dry running the transaction.
   *
   * @returns The transaction cost details.
   */
  async getTransactionCost() {
    const t = Ne(await this.getTransactionRequest());
    return (this.program.account ?? Ar.generate({ provider: this.getProvider() })).getTransactionCost(t, {
      quantities: this.getRequiredCoins(),
      signatureCallback: this.addSignersCallback
    });
  }
  /**
   * Costs and funds the underlying transaction request.
   *
   * @returns The invocation scope as a funded transaction request.
   */
  async fundWithRequiredCoins() {
    var o;
    let t = await this.getTransactionRequest();
    t = Ne(t);
    const e = await this.getTransactionCost(), { gasUsed: n, missingContractIds: s, outputVariables: i, maxFee: a } = e;
    return this.setDefaultTxParams(t, n, a), s.forEach((d) => {
      t.addContractInputAndOutput(new gt(d));
    }), t.addVariableOutputs(i), await ((o = this.program.account) == null ? void 0 : o.fund(t, e)), this.addSignersCallback && await this.addSignersCallback(t), t;
  }
  /**
   * Sets the transaction parameters.
   *
   * @param txParams - The transaction parameters to set.
   * @returns The current instance of the class.
   */
  txParams(t) {
    var n;
    this.txParameters = t;
    const e = this.transactionRequest;
    return e.tip = x(t.tip || e.tip), e.gasLimit = x(t.gasLimit || e.gasLimit), e.maxFee = t.maxFee ? x(t.maxFee) : e.maxFee, e.witnessLimit = t.witnessLimit ? x(t.witnessLimit) : e.witnessLimit, e.maturity = t.maturity || e.maturity, e.expiration = t.expiration || e.expiration, e.addVariableOutputs(((n = this.txParameters) == null ? void 0 : n.variableOutputs) || 0), this;
  }
  /**
   * Adds contracts to the invocation scope.
   *
   * @param contracts - An array of contracts to add.
   * @returns The current instance of the class.
   */
  addContracts(t) {
    return t.forEach((e) => {
      typeof e == "string" ? this.transactionRequest.addContractInputAndOutput(new gt(e)) : (this.transactionRequest.addContractInputAndOutput(e.id), this.externalAbis[e.id.toB256()] = e.interface.jsonAbi);
    }), this;
  }
  /**
   * Adds an asset transfer to an Account on the contract call transaction request.
   *
   * @param transferParams - The object representing the transfer to be made.
   * @returns The current instance of the class.
   */
  addTransfer(t) {
    const { amount: e, destination: n, assetId: s } = t;
    return this.transactionRequest = this.transactionRequest.addCoinOutput(
      new gt(n),
      e,
      s
    ), this;
  }
  /**
   * Adds multiple transfers to the contract call transaction request.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The current instance of the class.
   */
  addBatchTransfer(t) {
    return t.forEach(({ destination: e, amount: n, assetId: s }) => {
      this.transactionRequest = this.transactionRequest.addCoinOutput(
        new gt(e),
        n,
        s
      );
    }), this;
  }
  addSigners(t) {
    return this.addSignersCallback = (e) => e.addAccountWitnesses(t), this;
  }
  /**
   * Prepares and returns the transaction request object.
   *
   * @returns The prepared transaction request.
   */
  async getTransactionRequest() {
    return await this.prepareTransaction(), this.transactionRequest;
  }
  /**
   * Submits the contract call transaction and returns a promise that resolves to an object
   * containing the transaction ID and a function to wait for the result. The promise will resolve
   * as soon as the transaction is submitted to the node.
   *
   * @returns A promise that resolves to an object containing:
   * - `transactionId`: The ID of the submitted transaction.
   * - `waitForResult`: A function that waits for the transaction result.
   * @template T - The type of the return value.
   */
  async call() {
    ld(this.program.account, "Wallet is required!");
    const t = await this.fundWithRequiredCoins(), e = await this.program.account.sendTransaction(t, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: e.id,
      waitForResult: /* @__PURE__ */ xt(async () => ox({
        funcScope: this.functionInvocationScopes,
        isMultiCall: this.isMultiCall,
        program: this.program,
        transactionResponse: e
      }), "waitForResult")
    };
  }
  /**
   * Simulates a transaction.
   *
   * @returns The result of the invocation call.
   */
  async simulate() {
    if (ld(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new v(
        L.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const t = await this.fundWithRequiredCoins(), e = await this.program.account.simulateTransaction(t, {
      estimateTxDependencies: !1
    });
    return Fc({
      funcScopes: this.functionInvocationScopes,
      callResult: e,
      isMultiCall: this.isMultiCall
    });
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    const { receipts: t } = await this.getTransactionCost(), e = {
      receipts: t
    };
    return Fc({
      funcScopes: this.functionInvocationScopes,
      callResult: e,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: t } = await this.getTransactionCost(), e = {
      receipts: t
    };
    return Fc({
      funcScopes: this.functionInvocationScopes,
      callResult: e,
      isMultiCall: this.isMultiCall
    });
  }
  getProvider() {
    return this.program.provider;
  }
  /**
   * Obtains the ID of a transaction.
   *
   * @param chainId - the chainId to use to hash the transaction with
   * @returns the ID of the transaction.
   */
  async getTransactionId(t) {
    const e = t ?? await this.getProvider().getChainId();
    return (await this.getTransactionRequest()).getTransactionId(e);
  }
  /**
   * In case the gasLimit is *not* set by the user, this method sets a default value.
   */
  setDefaultTxParams(t, e, n) {
    var d, _;
    const s = qe((d = this.txParameters) == null ? void 0 : d.gasLimit) || this.hasCallParamsGasLimit, i = qe((_ = this.txParameters) == null ? void 0 : _.maxFee), { gasLimit: a, maxFee: o } = t;
    if (!s)
      t.gasLimit = e;
    else if (a.lt(e))
      throw new v(
        L.GAS_LIMIT_TOO_LOW,
        `Gas limit '${a}' is lower than the required: '${e}'.`
      );
    if (!i)
      t.maxFee = n;
    else if (n.gt(o))
      throw new v(
        L.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${n}'.`
      );
  }
}, xt(di, "BaseInvocationScope"), di), ui, Yg = (ui = class extends Vg {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(e, n, s) {
    super(e, !1);
    D(this, "func");
    D(this, "callParameters");
    D(this, "forward");
    D(this, "args");
    this.func = n, this.args = s || [], this.setArguments(...s), super.addCall(this);
  }
  /**
   * Gets the call configuration.
   *
   * @returns The call configuration.
   */
  getCallConfig() {
    return {
      func: this.func,
      program: this.program,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
      externalAbis: this.externalAbis
    };
  }
  /**
   * Sets the arguments for the function invocation.
   *
   * @param args - The arguments.
   * @returns The instance of FunctionInvocationScope.
   */
  setArguments(...e) {
    return this.args = e || [], this;
  }
  /**
   * Sets the call parameters for the function invocation.
   *
   * @param callParams - The call parameters.
   * @returns The instance of FunctionInvocationScope.
   * @throws If the function is not payable and forward is set.
   */
  callParams(e) {
    if (!this.hasCallParamsGasLimit && (e == null ? void 0 : e.gasLimit) !== void 0 && (this.hasCallParamsGasLimit = !0), this.callParameters = e, e != null && e.forward) {
      if (!this.func.attributes.find((n) => n.name === "payable"))
        throw new v(
          L.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Gd(e.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, xt(ui, "FunctionInvocationScope"), ui), hi, cx = (hi = class extends Vg {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(t, e) {
    super(t, !0), this.addCalls(e);
  }
  /**
   * Adds a single function invocation scope to the multi-call invocation scope.
   *
   * @param funcScope - The function invocation scope.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCall(t) {
    return super.addCalls([t]);
  }
  /**
   * Adds multiple function invocation scopes to the multi-call invocation scope.
   *
   * @param funcScopes - An array of function invocation scopes.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCalls(t) {
    return super.addCalls(t);
  }
}, xt(hi, "MultiCallInvocationScope"), hi), li, pd = (li = class {
  /**
   * Creates an instance of the Contract class.
   *
   * @param id - The contract's address.
   * @param abi - The contract's ABI (JSON ABI or Interface instance).
   * @param accountOrProvider - The account or provider for interaction.
   */
  constructor(t, e, n) {
    /**
     * The unique contract identifier.
     */
    D(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    D(this, "provider");
    /**
     * The contract's ABI interface.
     */
    D(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    D(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    D(this, "functions", {});
    this.interface = e instanceof Ke ? e : new Ke(e), this.id = new gt(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((s) => {
      const i = this.interface.getFunction(s);
      Object.defineProperty(this.functions, i.name, {
        value: this.buildFunction(i),
        writable: !1
      });
    });
  }
  /**
   * Build a function invocation scope for the provided function fragment.
   *
   * @param func - The function fragment to build a scope for.
   * @returns A function that creates a FunctionInvocationScope.
   */
  buildFunction(t) {
    return (() => {
      const e = /* @__PURE__ */ xt((...n) => new Yg(this, t, n), "funcInvocationScopeCreator");
      return Object.defineProperty(e, "isReadOnly", {
        value: /* @__PURE__ */ xt(() => t.isReadOnly(), "value"),
        writable: !1
      }), e;
    })();
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(t) {
    return new cx(this, t);
  }
  /**
   * Get the balance for a given asset ID for this contract.
   *
   * @param assetId - The specified asset ID.
   * @returns The balance of the contract for the specified asset.
   */
  getBalance(t) {
    return this.provider.getContractBalance(this.id, t);
  }
}, xt(li, "Contract"), li), dx = Object.defineProperty, Wi = (r, t) => dx(r, "name", { value: t, configurable: !0 }), _i, ux = (_i = class extends Yg {
  constructor() {
    super(...arguments);
    D(this, "scriptRequest");
  }
  async updateScriptRequest() {
    this.scriptRequest || await this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  async buildScriptRequest() {
    const e = this.program.bytes;
    if (!await this.program.provider.getChain())
      throw new v(
        v.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `new Provider()`"
      );
    this.scriptRequest = new hu(
      e,
      (s) => this.func.encodeArguments(s),
      () => []
    );
  }
}, Wi(_i, "ScriptInvocationScope"), _i), pi, hx = (pi = class extends Og {
}, Wi(pi, "AbstractScript"), pi), On, fR = (On = class extends hx {
  /**
   * Create a new instance of the Script class.
   *
   * @param bytecode - The compiled bytecode of the script.
   * @param abi - The ABI interface for the script.
   * @param account - The account associated with the script.
   */
  constructor(e, n, s) {
    super();
    /**
     * The compiled bytecode of the script.
     */
    D(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    D(this, "interface");
    /**
     * The account associated with the script.
     */
    D(this, "account");
    /**
     * The script request object.
     */
    D(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    D(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    D(this, "functions");
    this.bytes = Z(e), this.interface = new Ke(n), this.provider = s.provider, this.account = s, this.functions = {
      main: /* @__PURE__ */ Wi((...i) => new ux(this, this.interface.getFunction("main"), i), "main")
    };
  }
  /**
   * Set the configurable constants of the script.
   *
   * @param configurables - An object containing the configurable constants and their values.
   * @throws Will throw an error if the script has no configurable constants to be set or if an invalid constant is provided.
   * @returns This instance of the `Script`.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new v(
          v.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          "The script does not have configurable constants to be set"
        );
      Object.entries(e).forEach(([n, s]) => {
        if (!this.interface.configurables[n])
          throw new v(
            v.CODES.CONFIGURABLE_NOT_FOUND,
            `The script does not have a configurable constant named: '${n}'`
          );
        const { offset: i } = this.interface.configurables[n], a = this.interface.encodeConfigurable(n, s);
        this.bytes.set(a, i);
      });
    } catch (n) {
      throw new v(
        v.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
  /**
   *
   * @param account - The account used to pay the deployment costs.
   * @returns The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
   * once the blob deployment transaction finishes.
   *
   * The returned loader script will have the same configurable constants
   * as the original script which was used to generate the loader script.
   */
  deploy(e) {
    return cu({
      deployer: e,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: /* @__PURE__ */ Wi((n, s) => new On(n, s, this.account), "loaderInstanceCallback")
    });
  }
}, Wi(On, "Script"), On);
new hu(
  /*
    Opcode::RET(REG_ZERO)
    Opcode::NOOP
  */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  "0x24000000",
  () => new Uint8Array(0),
  () => {
  }
);
function AR(r) {
  return r;
}
var lx = /* @__PURE__ */ ((r) => (r.build = "build", r.deploy = "deploy", r.dev = "dev", r.init = "init", r.versions = "versions", r.node = "node", r))(lx || {}), _x = Object.defineProperty, ur = (r, t) => _x(r, "name", { value: t, configurable: !0 }), px = /* @__PURE__ */ ur((r) => {
  const { RegId: t, Instruction: e } = Of, n = 12, s = r.length, i = Lr, a = ot(r.map((d) => Z(d))), o = new uu(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    fn(16, t.pc().to_u8()),
    // 0x10 to hold the address of the current blob id
    wr(16, 16, n * e.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    fn(22, t.sp().to_u8()),
    // loop counter
    Jn(19, s),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    Xa(17, 16),
    // push the blob contents onto the stack
    Hi(16, 0, 17, 1),
    // move on to the next blob
    wr(16, 16, i),
    // decrement the loop counter
    Rf(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    Tf(19, t.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    Ya(22, 22, t.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    Wa(22, 22, 4),
    // jump to the start of the contract we loaded
    Ha(22)
  ).toBytes();
  return ot([o, a]);
}, "getLoaderInstructions"), fx = /* @__PURE__ */ ur((r, t) => {
  const e = [];
  for (let n = 0, s = 0; n < r.length; n += t, s++) {
    let i = r.slice(n, n + t), a = i.length;
    a % ht !== 0 && (i = ot([i, new Uint8Array(t - i.length)]), a = i.length), e.push({ id: s, size: a, bytecode: i });
  }
  return e;
}, "getContractChunks"), Ax = /* @__PURE__ */ ur((r) => {
  const e = Z(r), n = ap(e, 16384);
  return zd(n.map((s) => X(s)));
}, "getContractRoot"), gx = /* @__PURE__ */ ur((r) => {
  const t = new gB();
  return r.forEach(({ key: e, value: n }) => t.update(Gt(e), n)), t.root;
}, "getContractStorageRoot"), wx = /* @__PURE__ */ ur((r, t, e) => {
  const n = Ax(Z(r));
  return Gt(ot(["0x4655454C", t, n, e]));
}, "getContractId"), k_ = /* @__PURE__ */ ur((r) => X(r.startsWith("0x") ? r : `0x${r}`), "hexlifyWithPrefix"), U_ = 0.95, Mn, mx = (Mn = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(t, e, n = null, s = []) {
    D(this, "bytecode");
    D(this, "interface");
    D(this, "provider");
    D(this, "account");
    D(this, "storageSlots");
    this.bytecode = Z(t), e instanceof Ke ? this.interface = e : this.interface = new Ke(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), this.storageSlots = s;
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(t) {
    return new Mn(this.bytecode, this.interface, t);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(t) {
    const e = ((t == null ? void 0 : t.storageSlots) ?? []).concat(this.storageSlots).map(({ key: d, value: _ }) => ({
      key: k_(d),
      value: k_(_)
    })).filter((d, _, A) => A.findIndex((g) => g.key === d.key) === _).sort(({ key: d }, { key: _ }) => d.localeCompare(_)), n = {
      salt: $e(32),
      ...t ?? {},
      storageSlots: e
    };
    if (!this.provider)
      throw new v(
        L.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const s = (t == null ? void 0 : t.bytecode) || this.bytecode, i = n.stateRoot || gx(n.storageSlots), a = wx(s, n.salt, i), o = new cd({
      bytecodeWitnessIndex: 0,
      witnesses: [s],
      ...n
    });
    return o.addContractCreatedOutput(a, i), {
      contractId: a,
      transactionRequest: o
    };
  }
  /**
   * Takes a transaction request, estimates it and funds it.
   *
   * @param request - the request to fund.
   * @param options - options for funding the request.
   * @returns a funded transaction request.
   */
  async fundTransactionRequest(t, e = {}) {
    const n = this.getAccount(), { maxFee: s } = e, i = await n.getTransactionCost(t);
    if (qe(s)) {
      if (i.maxFee.gt(s))
        throw new v(
          L.MAX_FEE_TOO_LOW,
          `Max fee '${e.maxFee}' is lower than the required: '${i.maxFee}'.`
        );
    } else
      t.maxFee = i.maxFee;
    return await n.fund(t, i), t;
  }
  /**
   * Deploy a contract of any length with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deploy(t = {}) {
    const e = this.getAccount(), { consensusParameters: n } = await e.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber();
    return this.bytecode.length > s ? this.deployAsBlobTx(t) : this.deployAsCreateTx(t);
  }
  /**
   * Deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsCreateTx(t = {}) {
    const e = this.getAccount(), { consensusParameters: n } = await e.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber();
    if (this.bytecode.length > s)
      throw new v(
        L.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Please use `deployAsBlobTx` instead."
      );
    const { contractId: i, transactionRequest: a } = await this.prepareDeploy(t), o = await e.sendTransaction(a);
    return {
      contractId: i,
      waitForTransactionId: /* @__PURE__ */ ur(() => Promise.resolve(o.id), "waitForTransactionId"),
      waitForResult: /* @__PURE__ */ ur(async () => {
        const _ = await o.waitForResult();
        return { contract: new pd(i, this.interface, e), transactionResult: _ };
      }, "waitForResult")
    };
  }
  /**
   * Chunks and deploys a contract via a loader contract. Suitable for deploying contracts larger than the max contract size.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsBlobTx(t = {
    chunkSizeMultiplier: U_
  }) {
    const e = this.getAccount(), { configurableConstants: n, chunkSizeMultiplier: s } = t;
    n && this.setConfigurableConstants(n);
    const i = await this.getMaxChunkSize(t, s), a = fx(Z(this.bytecode), i).map((Q) => {
      const k = this.blobTransactionRequest({
        ...t,
        bytecode: Q.bytecode
      });
      return {
        ...Q,
        transactionRequest: k,
        blobId: k.blobId
      };
    }), o = a.map(({ blobId: Q }) => Q), d = px(o), { contractId: _, transactionRequest: A } = this.createTransactionRequest({
      bytecode: d,
      ...t
    }), g = [...new Set(o)], y = await e.provider.getBlobs(g), S = g.filter((Q) => !y.includes(Q));
    let O = x(0);
    const R = await e.provider.getChain(), F = await e.provider.estimateGasPrice(10), z = R.consensusParameters.feeParameters.gasPriceFactor;
    for (const { transactionRequest: Q, blobId: k } of a) {
      if (S.includes(k)) {
        const j = Q.calculateMinGas(R), J = Ii({
          gasPrice: F,
          gas: j,
          priceFactor: z,
          tip: Q.tip
        }).add(1);
        O = O.add(J);
      }
      const U = A.calculateMinGas(R), G = Ii({
        gasPrice: F,
        gas: U,
        priceFactor: z,
        tip: A.tip
      }).add(1);
      O = O.add(G);
    }
    if (O.gt(await e.getBalance()))
      throw new v(L.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    let H;
    const V = new Promise((Q) => {
      H = Q;
    });
    return { waitForResult: /* @__PURE__ */ ur(async () => {
      const Q = [];
      for (const { blobId: j, transactionRequest: J } of a)
        if (!Q.includes(j) && S.includes(j)) {
          const q = await this.fundTransactionRequest(
            J,
            t
          );
          let C;
          try {
            C = await (await e.sendTransaction(q)).waitForResult();
          } catch (u) {
            if (u.message.indexOf(`BlobId is already taken ${j}`) > -1) {
              Q.push(j);
              continue;
            }
            throw new v(L.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          }
          if (!C.status || C.status !== OA.success)
            throw new v(L.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          Q.push(j);
        }
      await this.fundTransactionRequest(A, t), H(A.getTransactionId(await e.provider.getChainId()));
      const U = await (await e.sendTransaction(A)).waitForResult();
      return { contract: new pd(_, this.interface, e), transactionResult: U };
    }, "waitForResult"), contractId: _, waitForTransactionId: /* @__PURE__ */ ur(() => V, "waitForTransactionId") };
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(t) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new v(
          L.CONFIGURABLE_NOT_FOUND,
          "Contract does not have configurables to be set"
        );
      Object.entries(t).forEach(([n, s]) => {
        if (!this.interface.configurables[n])
          throw new v(
            L.CONFIGURABLE_NOT_FOUND,
            `Contract does not have a configurable named: '${n}'`
          );
        const { offset: i } = this.interface.configurables[n], a = this.interface.encodeConfigurable(n, s), o = Z(this.bytecode);
        o.set(a, i), this.bytecode = o;
      });
    } catch (e) {
      throw new v(
        L.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${e.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new v(L.ACCOUNT_REQUIRED, "Account not assigned to contract.");
    return this.account;
  }
  async prepareDeploy(t) {
    const { configurableConstants: e } = t;
    e && this.setConfigurableConstants(e);
    const { contractId: n, transactionRequest: s } = this.createTransactionRequest(t);
    return await this.fundTransactionRequest(s, t), {
      contractId: n,
      transactionRequest: s
    };
  }
  /**
   * Create a blob transaction request, used for deploying contract chunks.
   *
   * @param options - options for creating a blob transaction request.
   * @returns a populated BlobTransactionRequest.
   */
  blobTransactionRequest(t) {
    const { bytecode: e } = t;
    return new ao({
      blobId: lr(e),
      witnessIndex: 0,
      witnesses: [e],
      ...t
    });
  }
  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  async getMaxChunkSize(t, e = U_) {
    if (e < 0 || e > 1)
      throw new v(
        L.INVALID_CHUNK_SIZE_MULTIPLIER,
        "Chunk size multiplier must be between 0 and 1"
      );
    const n = this.getAccount(), { consensusParameters: s } = await n.provider.getChain(), i = s.contractParameters.contractMaxSize.toNumber(), a = s.txParameters.maxSize.toNumber(), o = 64e3, d = a < i ? a : i, _ = d < o ? d : o, A = this.blobTransactionRequest({
      ...t,
      bytecode: $e(32)
    }).addResources(
      n.generateFakeResources([
        { assetId: await n.provider.getBaseAssetId(), amount: x(1) }
      ])
    ), g = (_ - A.byteLength() - ht) * e;
    return Math.round(g / ht) * ht;
  }
}, ur(Mn, "ContractFactory"), Mn), gR = 9, wR = 3, mR = 9, yR = 9, bR = 18, IR = 15, ER = 12, CR = 9, vR = "https://devnet.fuel.network/v1/graphql", BR = "https://testnet.fuel.network/v1/graphql", yx = Object.defineProperty, Hg = (r, t) => yx(r, "name", { value: t, configurable: !0 }), z_ = {
  programType: "contract",
  specVersion: "1",
  encodingVersion: "1",
  concreteTypes: [
    {
      type: "()",
      concreteTypeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
    },
    {
      type: "enum standards::src5::AccessError",
      concreteTypeId: "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d",
      metadataTypeId: 1
    },
    {
      type: "enum standards::src5::State",
      concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      metadataTypeId: 2
    },
    {
      type: "enum std::option::Option<struct std::contract_id::ContractId>",
      concreteTypeId: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      metadataTypeId: 4,
      typeArguments: [
        "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
      ]
    },
    {
      type: "enum sway_libs::ownership::errors::InitializationError",
      concreteTypeId: "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893",
      metadataTypeId: 5
    },
    {
      type: "enum sway_libs::upgradability::errors::SetProxyOwnerError",
      concreteTypeId: "3c6e90ae504df6aad8b34a93ba77dc62623e00b777eecacfa034a8ac6e890c74",
      metadataTypeId: 6
    },
    {
      type: "str",
      concreteTypeId: "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    },
    {
      type: "struct std::contract_id::ContractId",
      concreteTypeId: "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      metadataTypeId: 9
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyOwnerSet",
      concreteTypeId: "96dd838b44f99d8ccae2a7948137ab6256c48ca4abc6168abc880de07fba7247",
      metadataTypeId: 10
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyTargetSet",
      concreteTypeId: "1ddc0adda1270a016c08ffd614f29f599b4725407c8954c8b960bdf651a9a6c8",
      metadataTypeId: 11
    }
  ],
  metadataTypes: [
    {
      type: "b256",
      metadataTypeId: 0
    },
    {
      type: "enum standards::src5::AccessError",
      metadataTypeId: 1,
      components: [
        {
          name: "NotOwner",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum standards::src5::State",
      metadataTypeId: 2,
      components: [
        {
          name: "Uninitialized",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          name: "Initialized",
          typeId: 3
        },
        {
          name: "Revoked",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum std::identity::Identity",
      metadataTypeId: 3,
      components: [
        {
          name: "Address",
          typeId: 8
        },
        {
          name: "ContractId",
          typeId: 9
        }
      ]
    },
    {
      type: "enum std::option::Option",
      metadataTypeId: 4,
      components: [
        {
          name: "None",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          name: "Some",
          typeId: 7
        }
      ],
      typeParameters: [7]
    },
    {
      type: "enum sway_libs::ownership::errors::InitializationError",
      metadataTypeId: 5,
      components: [
        {
          name: "CannotReinitialized",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum sway_libs::upgradability::errors::SetProxyOwnerError",
      metadataTypeId: 6,
      components: [
        {
          name: "CannotUninitialize",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "generic T",
      metadataTypeId: 7
    },
    {
      type: "struct std::address::Address",
      metadataTypeId: 8,
      components: [
        {
          name: "bits",
          typeId: 0
        }
      ]
    },
    {
      type: "struct std::contract_id::ContractId",
      metadataTypeId: 9,
      components: [
        {
          name: "bits",
          typeId: 0
        }
      ]
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyOwnerSet",
      metadataTypeId: 10,
      components: [
        {
          name: "new_proxy_owner",
          typeId: 2
        }
      ]
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyTargetSet",
      metadataTypeId: 11,
      components: [
        {
          name: "new_target",
          typeId: 9
        }
      ]
    }
  ],
  functions: [
    {
      inputs: [],
      name: "proxy_target",
      output: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Returns the target contract of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Returns"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * [Option<ContractId>] - The new proxy contract to which all fallback calls will be passed or `None`."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "storage",
          arguments: ["read"]
        }
      ]
    },
    {
      inputs: [
        {
          name: "new_target",
          concreteTypeId: "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
        }
      ],
      name: "set_proxy_target",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Change the target contract of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" This method can only be called by the `proxy_owner`."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Arguments"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * `new_target`: [ContractId] - The new proxy contract to which all fallback calls will be passed."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * When not called by `proxy_owner`."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "doc-comment",
          arguments: [" * Write: `1`"]
        },
        {
          name: "storage",
          arguments: ["read", "write"]
        }
      ]
    },
    {
      inputs: [],
      name: "proxy_owner",
      output: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Returns the owner of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Returns"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * [State] - Represents the state of ownership for this contract."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "storage",
          arguments: ["read"]
        }
      ]
    },
    {
      inputs: [],
      name: "initialize_proxy",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Initializes the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " This method sets the storage values using the values of the configurable constants `INITIAL_TARGET` and `INITIAL_OWNER`."
          ]
        },
        {
          name: "doc-comment",
          arguments: [
            " This then allows methods that write to storage to be called."
          ]
        },
        {
          name: "doc-comment",
          arguments: [" This method can only be called once."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * When `storage::SRC14.proxy_owner` is not [State::Uninitialized]."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Writes: `2`"]
        },
        {
          name: "storage",
          arguments: ["write"]
        }
      ]
    },
    {
      inputs: [
        {
          name: "new_proxy_owner",
          concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c"
        }
      ],
      name: "set_proxy_owner",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Changes proxy ownership to the passed State."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " This method can be used to transfer ownership between Identities or to revoke ownership."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Arguments"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * `new_proxy_owner`: [State] - The new state of the proxy ownership."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * When the sender is not the current proxy owner."]
        },
        {
          name: "doc-comment",
          arguments: [
            " * When the new state of the proxy ownership is [State::Uninitialized]."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "doc-comment",
          arguments: [" * Writes: `1`"]
        },
        {
          name: "storage",
          arguments: ["write"]
        }
      ]
    }
  ],
  loggedTypes: [
    {
      logId: "4571204900286667806",
      concreteTypeId: "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d"
    },
    {
      logId: "2151606668983994881",
      concreteTypeId: "1ddc0adda1270a016c08ffd614f29f599b4725407c8954c8b960bdf651a9a6c8"
    },
    {
      logId: "2161305517876418151",
      concreteTypeId: "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893"
    },
    {
      logId: "4354576968059844266",
      concreteTypeId: "3c6e90ae504df6aad8b34a93ba77dc62623e00b777eecacfa034a8ac6e890c74"
    },
    {
      logId: "10870989709723147660",
      concreteTypeId: "96dd838b44f99d8ccae2a7948137ab6256c48ca4abc6168abc880de07fba7247"
    },
    {
      logId: "10098701174489624218",
      concreteTypeId: "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    }
  ],
  messagesTypes: [],
  configurables: [
    {
      name: "INITIAL_TARGET",
      concreteTypeId: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      offset: 13368
    },
    {
      name: "INITIAL_OWNER",
      concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      offset: 13320
    }
  ]
}, bx = [
  {
    key: "7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd55",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd56",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "bb79927b15d9259ea316f2ecb2297d6cc8851888a98278c0a2e03e1a091ea754",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "bb79927b15d9259ea316f2ecb2297d6cc8851888a98278c0a2e03e1a091ea755",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  }
], Jr, G_ = (Jr = class extends pd {
  constructor(t, e) {
    super(t, z_, e);
  }
}, Hg(Jr, "Src14OwnedProxy"), D(Jr, "abi", z_), D(Jr, "storageSlots", bx), Jr), V_ = Vw(
  "H4sIAAAAAAAAA9Vbe3Abx3lfgCAFvayz+TAFSjaUUjJkRwosUQ4ly9IhIATSEM2DSVpUGBhg64c0cSyIlVQ5tsccN001aSZlHcdlO06GrtOp6z4GAB+C7T7YR2bUiTtlZhxbTeMWmiatFAst60YZqm6j/r5v93DHw4GOJ84f0QznFne73+5+j9/32FVgISxOCOEV/K/Dn7o259GuXRO/JcSQ8c6CML4nwkZJF8HFnWLovZLXeK/kOyG89+JbGN9C+BZe+q2uEfRE4LIBGiv1VHThdi0i5gJdGTHa7TW0WNNY4JLmoFfXE4jPi3T5ep/q112j337Vr8WIF3PV373nAol5YfTls6OG8Id6m9E3+DG0tVB5F96/onG7b0akejWh9XaMpWNhYcSnL44exPv49JzLnNtoTtDMpMvaR0FvmxHPaaPd6B/rGDMSxRCP7WmaMxJ5I10Wt47qYg2etxnR/CJ/i7Tj29nuSr/42Tlux3yYLygC36+aMxiIzotTuuck+LeD+If9hoxEIQS6MdDX8DxgRAudNvrzNvql96Hvl/TFJdDfaaPfDbo9oL8az7tBf8hGf8GiXxTL0/cuKPpPg36Hjf4R0O1V678H9E9b9IuaRX+m9X3on1f0HwD9XTb6Z0A3Cfrr8LwX9Ccs+jOWnOIzkm+16c8p+juXvl/9f0Z0GnonHP19CeqfigmR6hGeVER4jb5Z7FH7a+jL32Atf2tEp84ELoUxV9XYQzQWOnVO6pRvzIi+AhugdTehPVtpV8/r/TyPTcxWdIv246CfIf3dHNGEES0GjXihRHSq9+z5slrHBOYLy3XkJ7nN6zg7brar17F6c0AXYjP+lr5fNWW+x/4nqsc1PK3mHLLmLGatOaddxtSxboHPsGHF6/7Zc6MDGJNs1o347CJ4/i/pcrgEvl/AvOcCl3Teb+CCk5b/tmq5zVyE3P4cNP4C4/8S40+7y63uklr7GUtuReKXktuMfxm5tSq5ST10lVvdu6bcoON3KB0PGokpjTAq8H1nf8/vME4lcoRlQann+TFux9rnHLTfgQ2QzuCbbw57PgJcDIZ660lOYab/PejIBez77aq1vyH3nfdjfDePjxaL3I5gzmh+Pn1Z22P0Cr+kuRnYOTuEdjfhMeQziXYoFKsXkq9OPVxxCnbrH+3C2Eg75Dnt5geO0V5TPeBNr+ZJxTTowNkh6EAwlKzXoaunIb//hA4sQJb/ZcSnFqUO0J6ctPyHXXRgHuNeBY3XoAN/Bj08X0MHjigd6LZ0oPCSKXfIbX0qnhtMJXL3dXh891q2MA0ZOmmt/JaiFcR48If1qZPb0haOuNjCtiW2kBTe1CDah9U+0oXiaAbjUy0C6/A1xjRxqktsT0VzhxojQge+ebHGwB28pkLRiAi/EX8lyHyMgY/xmUnwYBp8nEmX9VkjMW0ELpLukS059c/7lotMNJtMwqD1b6D17+DtRcgEOFRLJit+6JQJYgoN6wG+G/l0OVOAXKbAk87ARYll1bbtnXKRaxFzn8U68BSvYDywwU2u3neVLM7bbDtj2fb0Ym3b9mxStl3xN9W27X3PtO2vCHHzc34zXhKTgeikCMTHRSAxJgJ9JWH052CP5h6dcZgI8B4jAnGOWIv1HjGiuU6JD851iTbqC7sKh8o+yCOX5XZ02mr3+PTAD4V4htZxNSwmsK7fxvruXhS0zhXmOuUasb5ESaTB38AVzHc1aPZfofo/Ze3Lc5HHDGNfh0qw+6q1fZL40QjdOdUt7sZTx3M1/Li3MdJEfthzB2JKrHMB6/RChjch1jpjrhnjd5PfAu40utCOUkzY2BsUpw6KGxt7gkRb0kvkzmHMesR2uuRx2Dm2i2XZB5s08TESlLgWoXgyn8EaQ6HedoqhbwC9bPqyuA7vgzXohVkGhLtl4CbRonZ0Ghhs0TIiGvkO2D3Fl9inTvtsIswtcjvG89WDHzrmg83ivfKf/P1wE2SSgRzB96uGKZenlFwq+iblWJL40RMkDBEUN2u9u0Q6Aru4gtjoqubUA7u+ZphGAnKFrpKtMW/KhPM5ndtxxNrqvRZDPM5xCPhJ+A7d4yfpHeaC3mVc9M4+H3x/lX1ka9nHSSH+2GYfrZgXtrhUP9AnyrqXhO4ZogUYqQMjpX4A16EfKzEHYgCao4r+J1ievGfSDciN2tEZWtcEyzPZZMoqCFn5+H0XvWcbPMftSJfVtmxwwYUXdVWyw94CV/BnyanOaa/gm2b2Z9wq+8YC0VxlLObSbONN+91vG29YfAcNwjXob+CdXLV+98Fe+pEfDaAP4jHCeEefWwL9ZI+78AcdMwTZ5QbYWJhzM9gYYbJjzK2Krr4M3U0c//RDt7hPvVsfznu2JjuMwBWd9m3YcGv/B+CbZxm+fYh8rzsXOITx/ZBzdOHjMgbMXwQtituADYiTONajGCxvWHEb7LYqbhMPKfzvlvg/NcZtxv9Cd6Udz8MnuuUHvqwt1pHzRwuUE9A4Fz/oOy79YIH8oBmPIp6nfMvN54tBRf+IlQtMEQ6qXGAqo74Beym2yl2PmOYG+t3WA9w7KPxtPR1jW7pBuzsLbJ7K7O7xzcN3NJDfgO3BZxTO23zGdYQHsG/KNf1tsQ5diyHeTMA+D5IdYr0xxLDURvxsHwteE35hXe2ob+SGVSylfFQ+KOOoKRm7ESaTXQ8SxhmQOWR6VXfqnN3WupdiXJblz3FUuV6H7/Nh3SEzPgbGdIf6pqFPYdKnbhfa12x+2MLPYdCGL8Yawbcm4l9I62mnusTN6ll/s3z61qea5jAfeHRC534x/KZ+8ll/M56w35zpI7EmrLWDeEE1CenfIANT9g6575R6Aru1dFnlOFV9Q8ofS9/C+UqecAO8QJ6RyMs19LBvzr7Y63uB7IJ1BjqK71m8H8f7SV4b6xJ8bDRntRO5jLWOnMyfUD8A35vS5Wwzy/0wyZL9KzC64l+vKX6vs8lSt+Mm4T/+6vHXAH+0gv2gigWYZ3GSo0Zy1G24tK46nhLjLn7wNHSklbARa2wNleFT4oypreyDh3MNqUO5FbAZ8lF+LdksmpMxHT7PQ/4J77xtg4NiywCYvPEBPTCUFVryAT2dhO/W0R9xGPvDcmYlYvBVWP9qrL+V6UfY32e4jbwO/VspXlE+fdzmx8wYxM4jpe+kiz5h2W+uFXF6Hb3Dk/kGGWFfLKMw+NYaSkyT/mH+9jmFp9D/Cp6afLPbFvI1Sx6Yw+A1S50l2hSbEF61ks6m+nL1sGWN/A7yFr/Rq/vBY9QVKZ/B3rm21GXV8qTsjnz4PsVjs2H/PNktchCOSRx5xXa2jzTHyeFQClg1nA8D47YcBz4Bo6j+cx68HKY8H+8fOt5NeZFpu2RDs0XLhmaGpM06/XHdE7LOCrsxx/WofJ/G9SAOYgwlGzpLORRjOHKjuxzr/W/269H8ONa0g2p4JmZSXNAC3mLN7ci9QqgD6Oa3VDRfrzB3DfD3DNqUI9hy2akh7O3T+DuGuuWQGVdBz9eCb7rE5yL5FunH4lN+zD+i1i1tn8ZR/MZx91mKq8kPUCyHmtL0S2bu6tjPd5SPJblCR4qEm5r0sVMU33Ebaxamz6DaO35/Vu1hFdqP2b7V0TfKeRojPs7XtaSuI+6MEW2su5KfgietDppPKJoRtB930HzCheYnZT7suq+vK99MMlD58BTlHKrOkfM76J+20Yf/RV32skiCp1TXMWVxI+Regoz2jsQ+EYHeTaBWAd63YJ4Z5LCuddl/VjUuo9KXfDS1Y1vw3qIPmYVtMtuFvRVr7O0zam+qpk97m6Y4w9wb9rGEr19SfKV9ZbCvg1h7ybGvIvb1ceyrDt9O2/bVWmNfL6l9Bd33ZdG37ws6QLVaVR8iG5mi2HCJjQS6eK2eQBfXfr5CY1CDq9iZrG25+doKX6geq+I9qrHPEu+xlgbCINTV3Hy6937l08flfqjvzEVuR4gPs5W9uceagmurWPfDdMYBXsbB5wTbYWXdUxR78t4hkwUlo1a0R13wYFzZ/GnL5gtk89C7Qg7P+4xelddzjq/wS557vGTm31jXKkULOIrzoMvaR4EZ5C/8CjMqfRn3VIwI7CLd4pgW63tPrU/Fi9OaWhvFKXJvsYzM/3mfM7LOETlB9TiV5z/A8bYL3zg+MvdPeSTe3YQzBML8f8J4lcdW1VPvUzVdqj2a9k28NuuYbYgbsqhjHqc6Jn5vIL5K3PCg5kQ6ZWG3ev/oM+SrKvGRx4yPbPm8p1TxxxTj0t7gD+Fbw1bcD9/UJTI1cHOD+t2EdovJV9s3wXqP8yz6bsMkE6c2mO9UP9gJ8yxK80q54BnTwvjzq9hQ+rVIkORO+sfxKugYKh9Y41jHLer3BrQ/4lg/favYKNeQQEvOi2dMC8l5cQ5jxcYUb1AOpM6uqmLkAGHJMrRs8a06H6hNawXRknENZGXlFmY9omasW6lxmTEu5nghOh1UMY5bfGvPexdteW+nzHuR61p5r8opeQ+o/9TOe08q3bblvaRPZt57xJb3XqxhUwWXvDdXO+8VXHems1Rb3gvfUzPv3eeS99r0H3jzwfLecSvvzVPOgTOjwiL22WnLe7nu6ZL3EnaZeS/VGSnvrYwFvU5uSz1PO/LeTpX3Up1c1iIJt6y8d/GnyE3DP2FuGv4wc1PozuhPmpui75M/T7lpla2q/MXFLt1qjr73qzkGoiUxgjqqqunX2+uqhLXQQ8Za9b1Bfa/47JEuTx31AY16uS7hrJPZ68LIoaz9OGq07ZRjNCd9c5TrNsrntpGIF/VHrj0G8dTxbAIfyBdQzkE1I1lb70esSfkdxhEekm+C7TRQX+SEK+zfIXuq4aOG2UX7Ixqo+WrIXbV6/qbqm1Sz5n7JDrOfhj5ezFfH3xQ97hPrYvxFP8qBSX/pnopZJxizycsNkxEPLJFziDCZ6o9LbRc1AZsOgG7IRQ/sdHE/pRrrHTWM4PI1DJu9Uz5LfKT4IQnMg79ifGWsz827nXdDrgXyTWwbZR5Ddwh4jPO8GH1zCmMXuD/OlEF30rRj51nmSeF73XYW63IXIj+vvpmY7Acmr6yNyfn53T0dhDcW3vYhRxqi857YmDwPBy7E8/N3xnzjsv6/xH7NuokNL71WTT4NvBy24iclX4opvmCLmW6kNvqQjo8tjY8RE1BthfYWz1GM6a3lr8CbF1zOZo+RDgHD6O6BjI8SeaqPUB0I/g9nNHxuDJrV9Gaqz40R/w2QLtSTn2lQe6Fza2o7zq1zYfY7/QUaI8+a+/OoUwW3wj5vBTbehvkn5fzI/6rn/3b1/MDqyrk17jOUg3tA607Q2gtaiBNqnVuLAy68CdnWaJ2H96MuUw5uAd1bQBe5W+6MPMt2XeOPXdZI9T5zjROgtRO0OkBrF2jBZmqucaPLGtdRrGDTgSG5Fjf51/P5tn18OqWJdCroSaegN1ey0F3o5tWM0/fYdFfI8+Cl9ctWaz/QQaplRsxaJp+VGdymPGA4twq1TIrp11AdXIv59OZYM/sXrmXCj7QNDuiqlimolskx1KcI42JzqGsKbiebKXYIaoj/if+obV6P2uYNqG020jm6rbZJd1a4tsn+2HxPbVqTdX6J89ZKrdPct73+uMRPAQNCzrMu8PcA+atUMixSg2FPqjfstdmzXe9x11BHHdbAXb3wGtDSLJlV0fwSywz+DndE5F2IQzncxQuvBY3rsF/IP4fzMvjtqrimvk+dWfOZ3zL+x4zpbBjvteIMC+NxT4vxmvDTxHjcBXHDeO9tDoynOLgGxnu3qhxW9pcYz3dE3THe+zUXjKe43sT40gfE+JILxo8B48MK4zEHY3zJwnjwZ5nzefhI1IoRb8UXdmsxDZiawx0g5z5WrKZarPTtFK9TjV5bCb1sw3MV363j+jR/O8/9UDfHeuncGvEI67c6l8N5bDVebFe1Kds5HuxT3SujGo/7fTTRoPwY6tmV2M3tTF/FEuy/KI7gengYdxICB6lgnRTPoha8Q4d8dKFvge6nN8I29KwIRurEvYhF78Y7GW9U3VWwxxvFKswZ5lhdCx0GD/rhryyf8wvKz9yv2g7bk/dFlsqhoYPthM8ouIZR4jbH9nxWQDhBcTvdeeUzC2DYuhTOyimnQx95V1jyl843TJmNm++hf42UE9HdaIV5VNOzMC/ZpW8Br0IbB0RggDFP3kdEvUiLDQicZzTzfWfUAVDLaWL68EvAP5ozByxpAR7cqO5KkK2a/oDupgL/2EaoLiTfo61s0vyG8wK33KgB90QqOa6qL+H+oFVf2oy9bcKaPkL1JZVPtqraxQTnTYy9aC+5LwKZLn+2pGIkyBr662I737HbDseflNPLGgV8WNVZkh3bcFcLdBGrVmORb4fCLcRjzD+ZS+B+OOfV0v4kJsD+3M5YQOPv+F6KvLO3AxiwhzAglVi4U+sJ4mxqYa/WG55L9S/chXrbHPA8C6wJhgabxzDXDUbMCPHv2OYxo0sPc/45BOzsGRwzDuFeOsWe6CvnBoOXYuMlFQdiPO7IXxZtqs4J3nfNGd068A41mMqdzgLdtwe+bXa904la4OdULbIFtRO6B9MFvqk7V1V9v6l0hWogpq5U7kBDV7ZDV4LQlU32WiSwFHfWKjhj6oJNXnXynBFxskM33yS9xJrWgkeEj3TGD/mg3rSsfOpvN+WjZPQpyGifxGlVVyNb7kPewPUAxlnEjqBVuVvr3Lvfo7CW7sJDVoQFU6Sf8Hmw1XjhTKWdKJCv4bW6+07PBcddbr5H6ND/keq71Pg/BZW71HRfP9iLOOEeYEKftG/3u9Sof2ypvm+Zp9pEJ2jsxvg9GN/tdt8S6zDv0VIOp2Su7l5KmX8MMm+DzDfwPVqpS83QJdJNA7pUuQPm0GM+h7DO4/iOlTqDWwiD5nrQDCzVI+iJFbsu55P31/bJ/oWfpU+GbDln+qA+GePeruWTf1b/sqPHTj+WPjEy+vCD9N+CxC8/eCJtf/f49NCf/NW3Wo/vXP/7r06u2ub76pu9W1viT24589bR7LmJvx+UfY/9yqMPjjK9o48ePXF05JGjn31QkrHoyT4bv7vq7RduWeV5nf8J7/7s9hd3bXj+pmv8T4jXHnvm8eZ/3Py1F1vevVzY+uQj536t9cwfPn167vdK+wIrb/qDgQMjjzzyiyO/9OnY6Oix0T17BniR9xw70S+XL764+Zt3fP7A9t/N/+ZE57Nf/vrLvkvPvzZ7cNOb//qZYwfLl18+uv/V/5j8h4eu+8Ku/xk+uePbe3/06xf23ZVr+sG7/m8Uv9HxR0fvemvl2vu9D6f3bfzxUz/47sbnHn7u7V/9ja6rX/3i3kfH/9To/dHLkms7/1c+d7yuns+r50H5vF19335ePtvfkM8W9X3lEfn0qff1n1PPDvV8Vj7rJuXT88b/AzdExjYINgAA"
), $r, xR = ($r = class extends mx {
  constructor(t) {
    super(
      V_,
      G_.abi,
      t,
      G_.storageSlots
    );
  }
  static deploy(t, e = {}) {
    return new $r(t).deploy(e);
  }
}, Hg($r, "Src14OwnedProxyFactory"), D($r, "bytecode", V_), $r);
export {
  Zi as ASSET_ID_LEN,
  v2 as AbstractAccount,
  _R as AbstractContract,
  Og as AbstractProgram,
  rR as AbstractScriptRequest,
  Mo as Account,
  gt as Address,
  c2 as AddressType,
  wt as ArrayCoder,
  at as B256Coder,
  Sm as B512Coder,
  g2 as BALANCES_PAGE_SIZE_LIMIT,
  m2 as BLOCKS_PAGE_SIZE_LIMIT,
  $_ as BN,
  Lr as BYTES_32,
  ha as BaseTransactionRequest,
  T2 as BaseWalletUnlocked,
  rt as BigNumberCoder,
  ao as BlobTransactionRequest,
  Nm as BooleanCoder,
  Ot as ByteArrayCoder,
  Dm as ByteCoder,
  it as CHAIN_IDS,
  Hc as CONTRACT_ID_LEN,
  Ox as CONTRACT_MAX_SIZE,
  d2 as ChainName,
  Kx as ChangeOutputCollisionError,
  mt as Coder,
  lx as Commands,
  pd as Contract,
  mx as ContractFactory,
  cd as CreateTransactionRequest,
  yR as DECIMAL_FUEL,
  CR as DECIMAL_GWEI,
  IR as DECIMAL_KWEI,
  ER as DECIMAL_MWEI,
  bR as DECIMAL_WEI,
  mR as DEFAULT_DECIMAL_UNITS,
  wR as DEFAULT_MIN_PRECISION,
  gR as DEFAULT_PRECISION,
  y2 as DEFAULT_RESOURCE_CACHE_TTL,
  vR as DEVNET_NETWORK_URL,
  dp as DateTime,
  gi as ENCODING_V1,
  Qx as EmptyRoot,
  jp as EnumCoder,
  L as ErrorCode,
  lb as FAILED_ASSERT_EQ_SIGNAL,
  pb as FAILED_ASSERT_NE_SIGNAL,
  _b as FAILED_ASSERT_SIGNAL,
  hb as FAILED_REQUIRE_SIGNAL,
  Cf as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  Gx as FAILED_UNKNOWN_SIGNAL,
  lR as Fuel,
  X2 as FuelConnector,
  Dg as FuelConnectorEventType,
  du as FuelConnectorEventTypes,
  Ng as FuelConnectorMethods,
  v as FuelError,
  Yg as FunctionInvocationScope,
  b2 as GAS_USED_MODIFIER,
  Dc as HDWallet,
  Sx as INPUT_COIN_FIXED_SIZE,
  Cr as InputCoder,
  Uu as InputCoinCoder,
  ka as InputContractCoder,
  pn as InputMessageCoder,
  Tt as InputType,
  uu as InstructionSet,
  Ke as Interface,
  N2 as Language,
  W2 as LocalStorage,
  zx as MAX_PREDICATE_DATA_LENGTH,
  Ux as MAX_PREDICATE_LENGTH,
  Lx as MAX_SCRIPT_DATA_LENGTH,
  Px as MAX_SCRIPT_LENGTH,
  kx as MAX_STATIC_CONTRACTS,
  Mx as MAX_WITNESSES,
  L_ as MNEMONIC_SIZES,
  P2 as MemoryStorage,
  iu as Mnemonic,
  L2 as MnemonicVault,
  cx as MultiCallInvocationScope,
  w2 as NON_PAGINATED_BALANCES_SIZE,
  j1 as NoWitnessAtIndexError,
  tR as NoWitnessByOwnerError,
  $ as NumberCoder,
  o2 as OperationName,
  Kp as OptionCoder,
  Gu as OutputChangeCoder,
  vr as OutputCoder,
  zu as OutputCoinCoder,
  Ua as OutputContractCoder,
  Yu as OutputContractCreatedCoder,
  It as OutputType,
  Vu as OutputVariableCoder,
  Ab as PANIC_DOC_URL,
  fb as PANIC_REASONS,
  Br as PoliciesCoder,
  Ue as PolicyType,
  hR as Predicate,
  k2 as PrivateKeyVault,
  D_ as Provider,
  N_ as RESOURCES_PAGE_SIZE_LIMIT,
  Qm as RawSliceCoder,
  dt as ReceiptType,
  Zp as SCRIPT_FIXED_SIZE,
  fR as Script,
  hu as ScriptRequest,
  gn as ScriptTransactionRequest,
  $i as Signer,
  G_ as Src14OwnedProxy,
  xR as Src14OwnedProxyFactory,
  Bd as StdStringCoder,
  uR as StorageAbstract,
  Hu as StorageSlotCoder,
  Om as StrSliceCoder,
  Mm as StringCoder,
  wo as StructCoder,
  BR as TESTNET_NETWORK_URL,
  og as TRANSACTIONS_PAGE_SIZE_LIMIT,
  $u as TransactionBlobCoder,
  Er as TransactionCoder,
  Zu as TransactionCreateCoder,
  ju as TransactionMintCoder,
  S_ as TransactionResponse,
  Xu as TransactionScriptCoder,
  OA as TransactionStatus,
  Bt as TransactionType,
  a2 as TransactionTypeName,
  Ju as TransactionUpgradeCoder,
  qu as TransactionUploadCoder,
  tf as TupleCoder,
  Ln as TxPointerCoder,
  La as UTXO_ID_LEN,
  Wu as UpgradePurposeCoder,
  Ze as UpgradePurposeTypeEnum,
  B_ as UpgradeTransactionRequest,
  x_ as UploadTransactionRequest,
  Fx as UtxoIdCoder,
  dR as Vault,
  Pm as VecCoder,
  ht as WORD_SIZE,
  Ar as Wallet,
  Eg as WalletLocked,
  cR as WalletManager,
  dn as WalletUnlocked,
  xr as WitnessCoder,
  Rt as ZeroBytes32,
  xB as addAmountToCoinQuantities,
  Ci as addOperation,
  ki as addressify,
  SA as aggregateInputsAmountsByAssetAndOwner,
  Z as arrayify,
  X1 as assemblePanicError,
  qx as assembleReceiptByType,
  Z1 as assembleRevertError,
  Ni as assembleTransactionSummary,
  oR as assembleTransactionSummaryFromJson,
  ld as assert,
  Ap as assertUnreachable,
  Hx as assets,
  x as bn,
  hn as bufferFromString,
  $x as buildBlockExplorerUrl,
  Fc as buildDryRunResult,
  ox as buildFunctionResult,
  Fg as cacheFor,
  eR as cacheRequestInputsResources,
  q1 as cacheRequestInputsResourcesFromOwner,
  Ii as calculateGasFee,
  gA as calculateMetadataGasForTxBlob,
  Zd as calculateMetadataGasForTxCreate,
  jd as calculateMetadataGasForTxScript,
  ad as calculateMetadataGasForTxUpgrade,
  wA as calculateMetadataGasForTxUpload,
  mA as calculateMinGasForTxUpload,
  s2 as calculateTXFeeForSummary,
  Xp as calculateVmTxMemory,
  Ex as capitalizeString,
  ap as chunkAndPadBytes,
  Gd as coinQuantityfy,
  xx as compressBytecode,
  kp as computeHmac,
  ot as concat,
  lo as concatBytes,
  Nx as createAssetId,
  AR as createConfig,
  _o as dataSlice,
  _p as decodeBase58,
  Tx as decodeScriptData,
  Vw as decompressBytecode,
  K0 as decrypt,
  em as decryptJsonWalletData,
  Bx as defaultConsensusKey,
  vx as defaultSnapshotConfigs,
  Qg as deferPromise,
  cu as deployScriptOrPredicate,
  sd as deserializeChain,
  id as deserializeNodeInfo,
  z1 as deserializeProviderCache,
  dr as deserializeReceipt,
  Z2 as dispatchFuelConnectorEvent,
  wd as encodeBase58,
  tm as encrypt,
  rm as encryptJsonWalletData,
  ya as english,
  _2 as extractBurnedAssetsFromReceipts,
  zg as extractInvocationResult,
  l2 as extractMintedAssetsFromReceipts,
  Jd as extractTxError,
  hw as format,
  uw as formatUnits,
  Jm as fromDynamicInputToB256,
  jm as fromEvmAddressToB256,
  af as fromPublicKeyToB256,
  CB as fuelAssetsBaseUrl,
  AA as gasUsedByInputs,
  Lo as getAbisFromAllCalls,
  Oo as getAllDecodedLogs,
  Mg as getAllResultLogs,
  J1 as getAssetAmountInRequestInputs,
  Wx as getAssetById,
  Vx as getAssetEth,
  Yx as getAssetFuel,
  yB as getAssetNetwork,
  Kf as getAssetWithNetwork,
  Xx as getAssetsByOwner,
  $1 as getBurnableAssetCount,
  Po as getBytecodeConfigurableOffset,
  Bg as getBytecodeDataOffset,
  xg as getBytecodeId,
  qA as getContractCallOperations,
  eg as getContractCreatedOperations,
  wx as getContractId,
  Ax as getContractRoot,
  gx as getContractStorageRoot,
  ig as getDecodedLogs,
  mB as getDefaultChainId,
  So as getGasUsedFromReceipts,
  Qo as getInputAccountAddress,
  NA as getInputContractFromIndex,
  $d as getInputFromAssetId,
  Fo as getInputsByType,
  CA as getInputsByTypes,
  vA as getInputsCoin,
  qd as getInputsCoinAndMessage,
  xA as getInputsContract,
  BA as getInputsMessage,
  Y2 as getLegacyBlobId,
  To as getMaxGas,
  Dx as getMessageId,
  Xd as getMinGas,
  Xc as getMintedAssetId,
  rg as getOperations,
  Ti as getOutputsByType,
  FA as getOutputsChange,
  Kd as getOutputsCoin,
  QA as getOutputsContract,
  DA as getOutputsContractCreated,
  i2 as getOutputsVariable,
  tg as getPayProducerOperations,
  H2 as getPredicateRoot,
  Wm as getRandomB256,
  Ei as getReceiptsByType,
  UA as getReceiptsCall,
  zA as getReceiptsMessageOut,
  h2 as getReceiptsTransferOut,
  E_ as getReceiptsWithMissingData,
  IA as getRequestInputResourceOwner,
  pR as getResultLogs,
  ng as getTotalFeeFromStatus,
  p2 as getTransactionStatusName,
  I2 as getTransactionSummary,
  E2 as getTransactionSummaryFromRequest,
  tu as getTransactionTypeName,
  C2 as getTransactionsSummaries,
  KA as getTransferOperations,
  XA as getWithdrawFromFuelOperations,
  u2 as hasSameAssetId,
  lr as hash,
  zp as hashMessage,
  X as hexlify,
  k_ as hexlifyWithPrefix,
  M1 as inputify,
  va as isAddress,
  Pn as isB256,
  L1 as isCoin,
  qe as isDefined,
  bo as isEvmAddress,
  dd as isInputCoin,
  Jx as isMessage,
  I_ as isMessageCoin,
  C_ as isPredicate,
  Td as isPublicKey,
  Zx as isRawCoin,
  jx as isRawMessage,
  kr as isRequestInputCoin,
  Do as isRequestInputCoinOrMessage,
  No as isRequestInputMessage,
  bA as isRequestInputMessageWithoutData,
  zn as isRequestInputResource,
  od as isRequestInputResourceFromOwner,
  nR as isTransactionTypeBlob,
  n2 as isTransactionTypeCreate,
  an as isTransactionTypeScript,
  sR as isTransactionTypeUpgrade,
  iR as isTransactionTypeUpload,
  Vn as isType,
  kA as isTypeBlob,
  eu as isTypeCreate,
  MA as isTypeMint,
  ru as isTypeScript,
  PA as isTypeUpgrade,
  LA as isTypeUpload,
  Lp as keccak256,
  Rx as keyFromPassword,
  lw as max,
  _w as multiply,
  sf as normalizeB256,
  yA as normalizeJSON,
  Cx as normalizeString,
  P1 as outputify,
  Zm as padFirst12BytesOfEvmAddress,
  nm as pbkdf2,
  aR as processGqlReceipt,
  f2 as processGraphqlStatus,
  $e as randomBytes,
  im as randomUUID,
  vB as rawAssets,
  Te as resolveGasDependentCosts,
  eA as resolveIconPaths,
  v_ as returnZeroScript,
  sm as ripemd160,
  Pp as scrypt,
  k1 as serializeChain,
  U1 as serializeNodeInfo,
  G1 as serializeProviderCache,
  Gt as sha256,
  up as sleep,
  $m as sortPolicies,
  Li as stringFromBuffer,
  Xm as toB256AddressEvm,
  br as toBytes,
  dw as toFixed,
  co as toHex,
  Mr as toNumber,
  hr as toUtf8Bytes,
  po as toUtf8String,
  Oe as transactionRequestify,
  Up as uint64ToBytesBE,
  tA as urlJoin,
  EA as validateTransactionForAssetBurn,
  Gi as withTimeout,
  r2 as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
