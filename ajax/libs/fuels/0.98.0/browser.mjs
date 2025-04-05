var PA = Object.defineProperty;
var gc = (e) => {
  throw TypeError(e);
};
var kA = (e, t, r) => t in e ? PA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Q = (e, t, r) => kA(e, typeof t != "symbol" ? t + "" : t, r), Yi = (e, t, r) => t.has(e) || gc("Cannot " + r);
var Mt = (e, t, r) => (Yi(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Ge = (e, t, r) => t.has(e) ? gc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Je = (e, t, r, n) => (Yi(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), ls = (e, t, r) => (Yi(e, t, "access private method"), r);
function UA(e, t) {
  for (var r = 0; r < t.length; r++) {
    const n = t[r];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const s in n)
        if (s !== "default" && !(s in e)) {
          const i = Object.getOwnPropertyDescriptor(n, s);
          i && Object.defineProperty(e, s, i.get ? i : {
            enumerable: !0,
            get: () => n[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function M_() {
  return {
    FORC: "0.66.5",
    FUEL_CORE: "0.40.2",
    FUELS: "0.98.0"
  };
}
function wc(e) {
  const [t, r, n] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: r, patch: n };
}
function ao(e, t) {
  const r = wc(e), n = wc(t), s = r.major - n.major, i = r.minor - n.minor, a = r.patch - n.patch;
  return {
    major: s,
    minor: i,
    patch: a,
    fullVersionDiff: s || i || a
  };
}
function zA(e, t) {
  const { major: r } = ao(e, t);
  return r === 0;
}
function GA(e, t) {
  const { minor: r } = ao(e, t);
  return r === 0;
}
function VA(e, t) {
  const { patch: r } = ao(e, t);
  return r === 0;
}
function YA(e) {
  const { FUEL_CORE: t } = M_();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: zA(e, t),
    isMinorSupported: GA(e, t),
    isPatchSupported: VA(e, t)
  };
}
var L_ = M_(), HA = Object.defineProperty, XA = (e, t, r) => t in e ? HA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ZA = (e, t, r) => (XA(e, t + "", r), r), D = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.TIMEOUT_EXCEEDED = "timeout-exceeded", e.CONFIG_FILE_NOT_FOUND = "config-file-not-found", e.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", e.WORKSPACE_NOT_DETECTED = "workspace-not-detected", e.INVALID_ADDRESS = "invalid-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_URL = "invalid-url", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.NOT_ENOUGH_FUNDS = "not-enough-funds", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", e.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", e.FUNDS_TOO_LOW = "funds-too-low", e.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", e.MAX_COINS_REACHED = "max-coins-reached", e.ASSET_BURN_DETECTED = "asset-burn-detected", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(D || {}), Is = class extends Error {
  constructor(t, r, n = {}, s = null) {
    super(r);
    Q(this, "VERSIONS", L_);
    Q(this, "metadata");
    Q(this, "rawError");
    Q(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = n, this.rawError = s;
  }
  static parse(t) {
    const r = t;
    if (r.code === void 0)
      throw new Is(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const n = Object.values(D);
    if (!n.includes(r.code))
      throw new Is(
        "parse-failed",
        `Unknown error code: ${r.code}. Accepted codes: ${n.join(", ")}.`
      );
    return new Is(r.code, r.message);
  }
  toObject() {
    const { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: a } = this;
    return { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: a };
  }
}, C = Is;
ZA(C, "CODES", D);
var Ia = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function P_(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function WA(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, s.get ? s : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var oo = { exports: {} };
const jA = {}, JA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jA
}, Symbol.toStringTag, { value: "Module" })), qA = /* @__PURE__ */ WA(JA);
oo.exports;
(function(e) {
  (function(t, r) {
    function n(v, d) {
      if (!v) throw new Error(d || "Assertion failed");
    }
    function s(v, d) {
      v.super_ = d;
      var _ = function() {
      };
      _.prototype = d.prototype, v.prototype = new _(), v.prototype.constructor = v;
    }
    function i(v, d, _) {
      if (i.isBN(v))
        return v;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, v !== null && ((d === "le" || d === "be") && (_ = d, d = 10), this._init(v || 0, d || 10, _ || "be"));
    }
    typeof t == "object" ? t.exports = i : r.BN = i, i.BN = i, i.wordSize = 26;
    var a;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? a = window.Buffer : a = qA.Buffer;
    } catch {
    }
    i.isBN = function(d) {
      return d instanceof i ? !0 : d !== null && typeof d == "object" && d.constructor.wordSize === i.wordSize && Array.isArray(d.words);
    }, i.max = function(d, _) {
      return d.cmp(_) > 0 ? d : _;
    }, i.min = function(d, _) {
      return d.cmp(_) < 0 ? d : _;
    }, i.prototype._init = function(d, _, f) {
      if (typeof d == "number")
        return this._initNumber(d, _, f);
      if (typeof d == "object")
        return this._initArray(d, _, f);
      _ === "hex" && (_ = 16), n(_ === (_ | 0) && _ >= 2 && _ <= 36), d = d.toString().replace(/\s+/g, "");
      var g = 0;
      d[0] === "-" && (g++, this.negative = 1), g < d.length && (_ === 16 ? this._parseHex(d, g, f) : (this._parseBase(d, _, g), f === "le" && this._initArray(this.toArray(), _, f)));
    }, i.prototype._initNumber = function(d, _, f) {
      d < 0 && (this.negative = 1, d = -d), d < 67108864 ? (this.words = [d & 67108863], this.length = 1) : d < 4503599627370496 ? (this.words = [
        d & 67108863,
        d / 67108864 & 67108863
      ], this.length = 2) : (n(d < 9007199254740992), this.words = [
        d & 67108863,
        d / 67108864 & 67108863,
        1
      ], this.length = 3), f === "le" && this._initArray(this.toArray(), _, f);
    }, i.prototype._initArray = function(d, _, f) {
      if (n(typeof d.length == "number"), d.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(d.length / 3), this.words = new Array(this.length);
      for (var g = 0; g < this.length; g++)
        this.words[g] = 0;
      var y, B, T = 0;
      if (f === "be")
        for (g = d.length - 1, y = 0; g >= 0; g -= 3)
          B = d[g] | d[g - 1] << 8 | d[g - 2] << 16, this.words[y] |= B << T & 67108863, this.words[y + 1] = B >>> 26 - T & 67108863, T += 24, T >= 26 && (T -= 26, y++);
      else if (f === "le")
        for (g = 0, y = 0; g < d.length; g += 3)
          B = d[g] | d[g + 1] << 8 | d[g + 2] << 16, this.words[y] |= B << T & 67108863, this.words[y + 1] = B >>> 26 - T & 67108863, T += 24, T >= 26 && (T -= 26, y++);
      return this._strip();
    };
    function o(v, d) {
      var _ = v.charCodeAt(d);
      if (_ >= 48 && _ <= 57)
        return _ - 48;
      if (_ >= 65 && _ <= 70)
        return _ - 55;
      if (_ >= 97 && _ <= 102)
        return _ - 87;
      n(!1, "Invalid character in " + v);
    }
    function u(v, d, _) {
      var f = o(v, _);
      return _ - 1 >= d && (f |= o(v, _ - 1) << 4), f;
    }
    i.prototype._parseHex = function(d, _, f) {
      this.length = Math.ceil((d.length - _) / 6), this.words = new Array(this.length);
      for (var g = 0; g < this.length; g++)
        this.words[g] = 0;
      var y = 0, B = 0, T;
      if (f === "be")
        for (g = d.length - 1; g >= _; g -= 2)
          T = u(d, _, g) << y, this.words[B] |= T & 67108863, y >= 18 ? (y -= 18, B += 1, this.words[B] |= T >>> 26) : y += 8;
      else {
        var I = d.length - _;
        for (g = I % 2 === 0 ? _ + 1 : _; g < d.length; g += 2)
          T = u(d, _, g) << y, this.words[B] |= T & 67108863, y >= 18 ? (y -= 18, B += 1, this.words[B] |= T >>> 26) : y += 8;
      }
      this._strip();
    };
    function A(v, d, _, f) {
      for (var g = 0, y = 0, B = Math.min(v.length, _), T = d; T < B; T++) {
        var I = v.charCodeAt(T) - 48;
        g *= f, I >= 49 ? y = I - 49 + 10 : I >= 17 ? y = I - 17 + 10 : y = I, n(I >= 0 && y < f, "Invalid character"), g += y;
      }
      return g;
    }
    i.prototype._parseBase = function(d, _, f) {
      this.words = [0], this.length = 1;
      for (var g = 0, y = 1; y <= 67108863; y *= _)
        g++;
      g--, y = y / _ | 0;
      for (var B = d.length - f, T = B % g, I = Math.min(B, B - T) + f, l = 0, E = f; E < I; E += g)
        l = A(d, E, E + g, _), this.imuln(y), this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
      if (T !== 0) {
        var K = 1;
        for (l = A(d, E, d.length, _), E = 0; E < T; E++)
          K *= _;
        this.imuln(K), this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
      }
      this._strip();
    }, i.prototype.copy = function(d) {
      d.words = new Array(this.length);
      for (var _ = 0; _ < this.length; _++)
        d.words[_] = this.words[_];
      d.length = this.length, d.negative = this.negative, d.red = this.red;
    };
    function p(v, d) {
      v.words = d.words, v.length = d.length, v.negative = d.negative, v.red = d.red;
    }
    if (i.prototype._move = function(d) {
      p(d, this);
    }, i.prototype.clone = function() {
      var d = new i(null);
      return this.copy(d), d;
    }, i.prototype._expand = function(d) {
      for (; this.length < d; )
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = m;
      } catch {
        i.prototype.inspect = m;
      }
    else
      i.prototype.inspect = m;
    function m() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var b = [
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
    ], F = [
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
    i.prototype.toString = function(d, _) {
      d = d || 10, _ = _ | 0 || 1;
      var f;
      if (d === 16 || d === "hex") {
        f = "";
        for (var g = 0, y = 0, B = 0; B < this.length; B++) {
          var T = this.words[B], I = ((T << g | y) & 16777215).toString(16);
          y = T >>> 24 - g & 16777215, g += 2, g >= 26 && (g -= 26, B--), y !== 0 || B !== this.length - 1 ? f = b[6 - I.length] + I + f : f = I + f;
        }
        for (y !== 0 && (f = y.toString(16) + f); f.length % _ !== 0; )
          f = "0" + f;
        return this.negative !== 0 && (f = "-" + f), f;
      }
      if (d === (d | 0) && d >= 2 && d <= 36) {
        var l = S[d], E = F[d];
        f = "";
        var K = this.clone();
        for (K.negative = 0; !K.isZero(); ) {
          var $ = K.modrn(E).toString(d);
          K = K.idivn(E), K.isZero() ? f = $ + f : f = b[l - $.length] + $ + f;
        }
        for (this.isZero() && (f = "0" + f); f.length % _ !== 0; )
          f = "0" + f;
        return this.negative !== 0 && (f = "-" + f), f;
      }
      n(!1, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var d = this.words[0];
      return this.length === 2 ? d += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? d += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -d : d;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, a && (i.prototype.toBuffer = function(d, _) {
      return this.toArrayLike(a, d, _);
    }), i.prototype.toArray = function(d, _) {
      return this.toArrayLike(Array, d, _);
    };
    var R = function(d, _) {
      return d.allocUnsafe ? d.allocUnsafe(_) : new d(_);
    };
    i.prototype.toArrayLike = function(d, _, f) {
      this._strip();
      var g = this.byteLength(), y = f || Math.max(1, g);
      n(g <= y, "byte array longer than desired length"), n(y > 0, "Requested array length <= 0");
      var B = R(d, y), T = _ === "le" ? "LE" : "BE";
      return this["_toArrayLike" + T](B, g), B;
    }, i.prototype._toArrayLikeLE = function(d, _) {
      for (var f = 0, g = 0, y = 0, B = 0; y < this.length; y++) {
        var T = this.words[y] << B | g;
        d[f++] = T & 255, f < d.length && (d[f++] = T >> 8 & 255), f < d.length && (d[f++] = T >> 16 & 255), B === 6 ? (f < d.length && (d[f++] = T >> 24 & 255), g = 0, B = 0) : (g = T >>> 24, B += 2);
      }
      if (f < d.length)
        for (d[f++] = g; f < d.length; )
          d[f++] = 0;
    }, i.prototype._toArrayLikeBE = function(d, _) {
      for (var f = d.length - 1, g = 0, y = 0, B = 0; y < this.length; y++) {
        var T = this.words[y] << B | g;
        d[f--] = T & 255, f >= 0 && (d[f--] = T >> 8 & 255), f >= 0 && (d[f--] = T >> 16 & 255), B === 6 ? (f >= 0 && (d[f--] = T >> 24 & 255), g = 0, B = 0) : (g = T >>> 24, B += 2);
      }
      if (f >= 0)
        for (d[f--] = g; f >= 0; )
          d[f--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(d) {
      return 32 - Math.clz32(d);
    } : i.prototype._countBits = function(d) {
      var _ = d, f = 0;
      return _ >= 4096 && (f += 13, _ >>>= 13), _ >= 64 && (f += 7, _ >>>= 7), _ >= 8 && (f += 4, _ >>>= 4), _ >= 2 && (f += 2, _ >>>= 2), f + _;
    }, i.prototype._zeroBits = function(d) {
      if (d === 0) return 26;
      var _ = d, f = 0;
      return _ & 8191 || (f += 13, _ >>>= 13), _ & 127 || (f += 7, _ >>>= 7), _ & 15 || (f += 4, _ >>>= 4), _ & 3 || (f += 2, _ >>>= 2), _ & 1 || f++, f;
    }, i.prototype.bitLength = function() {
      var d = this.words[this.length - 1], _ = this._countBits(d);
      return (this.length - 1) * 26 + _;
    };
    function N(v) {
      for (var d = new Array(v.bitLength()), _ = 0; _ < d.length; _++) {
        var f = _ / 26 | 0, g = _ % 26;
        d[_] = v.words[f] >>> g & 1;
      }
      return d;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero()) return 0;
      for (var d = 0, _ = 0; _ < this.length; _++) {
        var f = this._zeroBits(this.words[_]);
        if (d += f, f !== 26) break;
      }
      return d;
    }, i.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, i.prototype.toTwos = function(d) {
      return this.negative !== 0 ? this.abs().inotn(d).iaddn(1) : this.clone();
    }, i.prototype.fromTwos = function(d) {
      return this.testn(d - 1) ? this.notn(d).iaddn(1).ineg() : this.clone();
    }, i.prototype.isNeg = function() {
      return this.negative !== 0;
    }, i.prototype.neg = function() {
      return this.clone().ineg();
    }, i.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, i.prototype.iuor = function(d) {
      for (; this.length < d.length; )
        this.words[this.length++] = 0;
      for (var _ = 0; _ < d.length; _++)
        this.words[_] = this.words[_] | d.words[_];
      return this._strip();
    }, i.prototype.ior = function(d) {
      return n((this.negative | d.negative) === 0), this.iuor(d);
    }, i.prototype.or = function(d) {
      return this.length > d.length ? this.clone().ior(d) : d.clone().ior(this);
    }, i.prototype.uor = function(d) {
      return this.length > d.length ? this.clone().iuor(d) : d.clone().iuor(this);
    }, i.prototype.iuand = function(d) {
      var _;
      this.length > d.length ? _ = d : _ = this;
      for (var f = 0; f < _.length; f++)
        this.words[f] = this.words[f] & d.words[f];
      return this.length = _.length, this._strip();
    }, i.prototype.iand = function(d) {
      return n((this.negative | d.negative) === 0), this.iuand(d);
    }, i.prototype.and = function(d) {
      return this.length > d.length ? this.clone().iand(d) : d.clone().iand(this);
    }, i.prototype.uand = function(d) {
      return this.length > d.length ? this.clone().iuand(d) : d.clone().iuand(this);
    }, i.prototype.iuxor = function(d) {
      var _, f;
      this.length > d.length ? (_ = this, f = d) : (_ = d, f = this);
      for (var g = 0; g < f.length; g++)
        this.words[g] = _.words[g] ^ f.words[g];
      if (this !== _)
        for (; g < _.length; g++)
          this.words[g] = _.words[g];
      return this.length = _.length, this._strip();
    }, i.prototype.ixor = function(d) {
      return n((this.negative | d.negative) === 0), this.iuxor(d);
    }, i.prototype.xor = function(d) {
      return this.length > d.length ? this.clone().ixor(d) : d.clone().ixor(this);
    }, i.prototype.uxor = function(d) {
      return this.length > d.length ? this.clone().iuxor(d) : d.clone().iuxor(this);
    }, i.prototype.inotn = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = Math.ceil(d / 26) | 0, f = d % 26;
      this._expand(_), f > 0 && _--;
      for (var g = 0; g < _; g++)
        this.words[g] = ~this.words[g] & 67108863;
      return f > 0 && (this.words[g] = ~this.words[g] & 67108863 >> 26 - f), this._strip();
    }, i.prototype.notn = function(d) {
      return this.clone().inotn(d);
    }, i.prototype.setn = function(d, _) {
      n(typeof d == "number" && d >= 0);
      var f = d / 26 | 0, g = d % 26;
      return this._expand(f + 1), _ ? this.words[f] = this.words[f] | 1 << g : this.words[f] = this.words[f] & ~(1 << g), this._strip();
    }, i.prototype.iadd = function(d) {
      var _;
      if (this.negative !== 0 && d.negative === 0)
        return this.negative = 0, _ = this.isub(d), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && d.negative !== 0)
        return d.negative = 0, _ = this.isub(d), d.negative = 1, _._normSign();
      var f, g;
      this.length > d.length ? (f = this, g = d) : (f = d, g = this);
      for (var y = 0, B = 0; B < g.length; B++)
        _ = (f.words[B] | 0) + (g.words[B] | 0) + y, this.words[B] = _ & 67108863, y = _ >>> 26;
      for (; y !== 0 && B < f.length; B++)
        _ = (f.words[B] | 0) + y, this.words[B] = _ & 67108863, y = _ >>> 26;
      if (this.length = f.length, y !== 0)
        this.words[this.length] = y, this.length++;
      else if (f !== this)
        for (; B < f.length; B++)
          this.words[B] = f.words[B];
      return this;
    }, i.prototype.add = function(d) {
      var _;
      return d.negative !== 0 && this.negative === 0 ? (d.negative = 0, _ = this.sub(d), d.negative ^= 1, _) : d.negative === 0 && this.negative !== 0 ? (this.negative = 0, _ = d.sub(this), this.negative = 1, _) : this.length > d.length ? this.clone().iadd(d) : d.clone().iadd(this);
    }, i.prototype.isub = function(d) {
      if (d.negative !== 0) {
        d.negative = 0;
        var _ = this.iadd(d);
        return d.negative = 1, _._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(d), this.negative = 1, this._normSign();
      var f = this.cmp(d);
      if (f === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var g, y;
      f > 0 ? (g = this, y = d) : (g = d, y = this);
      for (var B = 0, T = 0; T < y.length; T++)
        _ = (g.words[T] | 0) - (y.words[T] | 0) + B, B = _ >> 26, this.words[T] = _ & 67108863;
      for (; B !== 0 && T < g.length; T++)
        _ = (g.words[T] | 0) + B, B = _ >> 26, this.words[T] = _ & 67108863;
      if (B === 0 && T < g.length && g !== this)
        for (; T < g.length; T++)
          this.words[T] = g.words[T];
      return this.length = Math.max(this.length, T), g !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(d) {
      return this.clone().isub(d);
    };
    function O(v, d, _) {
      _.negative = d.negative ^ v.negative;
      var f = v.length + d.length | 0;
      _.length = f, f = f - 1 | 0;
      var g = v.words[0] | 0, y = d.words[0] | 0, B = g * y, T = B & 67108863, I = B / 67108864 | 0;
      _.words[0] = T;
      for (var l = 1; l < f; l++) {
        for (var E = I >>> 26, K = I & 67108863, $ = Math.min(l, d.length - 1), tt = Math.max(0, l - v.length + 1); tt <= $; tt++) {
          var Bt = l - tt | 0;
          g = v.words[Bt] | 0, y = d.words[tt] | 0, B = g * y + K, E += B / 67108864 | 0, K = B & 67108863;
        }
        _.words[l] = K | 0, I = E | 0;
      }
      return I !== 0 ? _.words[l] = I | 0 : _.length--, _._strip();
    }
    var z = function(d, _, f) {
      var g = d.words, y = _.words, B = f.words, T = 0, I, l, E, K = g[0] | 0, $ = K & 8191, tt = K >>> 13, Bt = g[1] | 0, ht = Bt & 8191, yt = Bt >>> 13, je = g[2] | 0, bt = je & 8191, At = je >>> 13, Ee = g[3] | 0, xt = Ee & 8191, Ft = Ee >>> 13, ec = g[4] | 0, Pt = ec & 8191, kt = ec >>> 13, rc = g[5] | 0, Ut = rc & 8191, zt = rc >>> 13, nc = g[6] | 0, Gt = nc & 8191, Vt = nc >>> 13, sc = g[7] | 0, Yt = sc & 8191, Ht = sc >>> 13, ic = g[8] | 0, Xt = ic & 8191, Zt = ic >>> 13, ac = g[9] | 0, Wt = ac & 8191, jt = ac >>> 13, oc = y[0] | 0, Jt = oc & 8191, qt = oc >>> 13, cc = y[1] | 0, $t = cc & 8191, Kt = cc >>> 13, dc = y[2] | 0, te = dc & 8191, ee = dc >>> 13, uc = y[3] | 0, re = uc & 8191, ne = uc >>> 13, _c = y[4] | 0, se = _c & 8191, ie = _c >>> 13, hc = y[5] | 0, ae = hc & 8191, oe = hc >>> 13, lc = y[6] | 0, ce = lc & 8191, de = lc >>> 13, Ac = y[7] | 0, ue = Ac & 8191, _e = Ac >>> 13, fc = y[8] | 0, he = fc & 8191, le = fc >>> 13, pc = y[9] | 0, Ae = pc & 8191, fe = pc >>> 13;
      f.negative = d.negative ^ _.negative, f.length = 19, I = Math.imul($, Jt), l = Math.imul($, qt), l = l + Math.imul(tt, Jt) | 0, E = Math.imul(tt, qt);
      var Ci = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, I = Math.imul(ht, Jt), l = Math.imul(ht, qt), l = l + Math.imul(yt, Jt) | 0, E = Math.imul(yt, qt), I = I + Math.imul($, $t) | 0, l = l + Math.imul($, Kt) | 0, l = l + Math.imul(tt, $t) | 0, E = E + Math.imul(tt, Kt) | 0;
      var Bi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, I = Math.imul(bt, Jt), l = Math.imul(bt, qt), l = l + Math.imul(At, Jt) | 0, E = Math.imul(At, qt), I = I + Math.imul(ht, $t) | 0, l = l + Math.imul(ht, Kt) | 0, l = l + Math.imul(yt, $t) | 0, E = E + Math.imul(yt, Kt) | 0, I = I + Math.imul($, te) | 0, l = l + Math.imul($, ee) | 0, l = l + Math.imul(tt, te) | 0, E = E + Math.imul(tt, ee) | 0;
      var xi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, I = Math.imul(xt, Jt), l = Math.imul(xt, qt), l = l + Math.imul(Ft, Jt) | 0, E = Math.imul(Ft, qt), I = I + Math.imul(bt, $t) | 0, l = l + Math.imul(bt, Kt) | 0, l = l + Math.imul(At, $t) | 0, E = E + Math.imul(At, Kt) | 0, I = I + Math.imul(ht, te) | 0, l = l + Math.imul(ht, ee) | 0, l = l + Math.imul(yt, te) | 0, E = E + Math.imul(yt, ee) | 0, I = I + Math.imul($, re) | 0, l = l + Math.imul($, ne) | 0, l = l + Math.imul(tt, re) | 0, E = E + Math.imul(tt, ne) | 0;
      var Ri = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, I = Math.imul(Pt, Jt), l = Math.imul(Pt, qt), l = l + Math.imul(kt, Jt) | 0, E = Math.imul(kt, qt), I = I + Math.imul(xt, $t) | 0, l = l + Math.imul(xt, Kt) | 0, l = l + Math.imul(Ft, $t) | 0, E = E + Math.imul(Ft, Kt) | 0, I = I + Math.imul(bt, te) | 0, l = l + Math.imul(bt, ee) | 0, l = l + Math.imul(At, te) | 0, E = E + Math.imul(At, ee) | 0, I = I + Math.imul(ht, re) | 0, l = l + Math.imul(ht, ne) | 0, l = l + Math.imul(yt, re) | 0, E = E + Math.imul(yt, ne) | 0, I = I + Math.imul($, se) | 0, l = l + Math.imul($, ie) | 0, l = l + Math.imul(tt, se) | 0, E = E + Math.imul(tt, ie) | 0;
      var Si = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Si >>> 26) | 0, Si &= 67108863, I = Math.imul(Ut, Jt), l = Math.imul(Ut, qt), l = l + Math.imul(zt, Jt) | 0, E = Math.imul(zt, qt), I = I + Math.imul(Pt, $t) | 0, l = l + Math.imul(Pt, Kt) | 0, l = l + Math.imul(kt, $t) | 0, E = E + Math.imul(kt, Kt) | 0, I = I + Math.imul(xt, te) | 0, l = l + Math.imul(xt, ee) | 0, l = l + Math.imul(Ft, te) | 0, E = E + Math.imul(Ft, ee) | 0, I = I + Math.imul(bt, re) | 0, l = l + Math.imul(bt, ne) | 0, l = l + Math.imul(At, re) | 0, E = E + Math.imul(At, ne) | 0, I = I + Math.imul(ht, se) | 0, l = l + Math.imul(ht, ie) | 0, l = l + Math.imul(yt, se) | 0, E = E + Math.imul(yt, ie) | 0, I = I + Math.imul($, ae) | 0, l = l + Math.imul($, oe) | 0, l = l + Math.imul(tt, ae) | 0, E = E + Math.imul(tt, oe) | 0;
      var Ti = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, I = Math.imul(Gt, Jt), l = Math.imul(Gt, qt), l = l + Math.imul(Vt, Jt) | 0, E = Math.imul(Vt, qt), I = I + Math.imul(Ut, $t) | 0, l = l + Math.imul(Ut, Kt) | 0, l = l + Math.imul(zt, $t) | 0, E = E + Math.imul(zt, Kt) | 0, I = I + Math.imul(Pt, te) | 0, l = l + Math.imul(Pt, ee) | 0, l = l + Math.imul(kt, te) | 0, E = E + Math.imul(kt, ee) | 0, I = I + Math.imul(xt, re) | 0, l = l + Math.imul(xt, ne) | 0, l = l + Math.imul(Ft, re) | 0, E = E + Math.imul(Ft, ne) | 0, I = I + Math.imul(bt, se) | 0, l = l + Math.imul(bt, ie) | 0, l = l + Math.imul(At, se) | 0, E = E + Math.imul(At, ie) | 0, I = I + Math.imul(ht, ae) | 0, l = l + Math.imul(ht, oe) | 0, l = l + Math.imul(yt, ae) | 0, E = E + Math.imul(yt, oe) | 0, I = I + Math.imul($, ce) | 0, l = l + Math.imul($, de) | 0, l = l + Math.imul(tt, ce) | 0, E = E + Math.imul(tt, de) | 0;
      var Ni = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, I = Math.imul(Yt, Jt), l = Math.imul(Yt, qt), l = l + Math.imul(Ht, Jt) | 0, E = Math.imul(Ht, qt), I = I + Math.imul(Gt, $t) | 0, l = l + Math.imul(Gt, Kt) | 0, l = l + Math.imul(Vt, $t) | 0, E = E + Math.imul(Vt, Kt) | 0, I = I + Math.imul(Ut, te) | 0, l = l + Math.imul(Ut, ee) | 0, l = l + Math.imul(zt, te) | 0, E = E + Math.imul(zt, ee) | 0, I = I + Math.imul(Pt, re) | 0, l = l + Math.imul(Pt, ne) | 0, l = l + Math.imul(kt, re) | 0, E = E + Math.imul(kt, ne) | 0, I = I + Math.imul(xt, se) | 0, l = l + Math.imul(xt, ie) | 0, l = l + Math.imul(Ft, se) | 0, E = E + Math.imul(Ft, ie) | 0, I = I + Math.imul(bt, ae) | 0, l = l + Math.imul(bt, oe) | 0, l = l + Math.imul(At, ae) | 0, E = E + Math.imul(At, oe) | 0, I = I + Math.imul(ht, ce) | 0, l = l + Math.imul(ht, de) | 0, l = l + Math.imul(yt, ce) | 0, E = E + Math.imul(yt, de) | 0, I = I + Math.imul($, ue) | 0, l = l + Math.imul($, _e) | 0, l = l + Math.imul(tt, ue) | 0, E = E + Math.imul(tt, _e) | 0;
      var Di = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, I = Math.imul(Xt, Jt), l = Math.imul(Xt, qt), l = l + Math.imul(Zt, Jt) | 0, E = Math.imul(Zt, qt), I = I + Math.imul(Yt, $t) | 0, l = l + Math.imul(Yt, Kt) | 0, l = l + Math.imul(Ht, $t) | 0, E = E + Math.imul(Ht, Kt) | 0, I = I + Math.imul(Gt, te) | 0, l = l + Math.imul(Gt, ee) | 0, l = l + Math.imul(Vt, te) | 0, E = E + Math.imul(Vt, ee) | 0, I = I + Math.imul(Ut, re) | 0, l = l + Math.imul(Ut, ne) | 0, l = l + Math.imul(zt, re) | 0, E = E + Math.imul(zt, ne) | 0, I = I + Math.imul(Pt, se) | 0, l = l + Math.imul(Pt, ie) | 0, l = l + Math.imul(kt, se) | 0, E = E + Math.imul(kt, ie) | 0, I = I + Math.imul(xt, ae) | 0, l = l + Math.imul(xt, oe) | 0, l = l + Math.imul(Ft, ae) | 0, E = E + Math.imul(Ft, oe) | 0, I = I + Math.imul(bt, ce) | 0, l = l + Math.imul(bt, de) | 0, l = l + Math.imul(At, ce) | 0, E = E + Math.imul(At, de) | 0, I = I + Math.imul(ht, ue) | 0, l = l + Math.imul(ht, _e) | 0, l = l + Math.imul(yt, ue) | 0, E = E + Math.imul(yt, _e) | 0, I = I + Math.imul($, he) | 0, l = l + Math.imul($, le) | 0, l = l + Math.imul(tt, he) | 0, E = E + Math.imul(tt, le) | 0;
      var Qi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, I = Math.imul(Wt, Jt), l = Math.imul(Wt, qt), l = l + Math.imul(jt, Jt) | 0, E = Math.imul(jt, qt), I = I + Math.imul(Xt, $t) | 0, l = l + Math.imul(Xt, Kt) | 0, l = l + Math.imul(Zt, $t) | 0, E = E + Math.imul(Zt, Kt) | 0, I = I + Math.imul(Yt, te) | 0, l = l + Math.imul(Yt, ee) | 0, l = l + Math.imul(Ht, te) | 0, E = E + Math.imul(Ht, ee) | 0, I = I + Math.imul(Gt, re) | 0, l = l + Math.imul(Gt, ne) | 0, l = l + Math.imul(Vt, re) | 0, E = E + Math.imul(Vt, ne) | 0, I = I + Math.imul(Ut, se) | 0, l = l + Math.imul(Ut, ie) | 0, l = l + Math.imul(zt, se) | 0, E = E + Math.imul(zt, ie) | 0, I = I + Math.imul(Pt, ae) | 0, l = l + Math.imul(Pt, oe) | 0, l = l + Math.imul(kt, ae) | 0, E = E + Math.imul(kt, oe) | 0, I = I + Math.imul(xt, ce) | 0, l = l + Math.imul(xt, de) | 0, l = l + Math.imul(Ft, ce) | 0, E = E + Math.imul(Ft, de) | 0, I = I + Math.imul(bt, ue) | 0, l = l + Math.imul(bt, _e) | 0, l = l + Math.imul(At, ue) | 0, E = E + Math.imul(At, _e) | 0, I = I + Math.imul(ht, he) | 0, l = l + Math.imul(ht, le) | 0, l = l + Math.imul(yt, he) | 0, E = E + Math.imul(yt, le) | 0, I = I + Math.imul($, Ae) | 0, l = l + Math.imul($, fe) | 0, l = l + Math.imul(tt, Ae) | 0, E = E + Math.imul(tt, fe) | 0;
      var Fi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, I = Math.imul(Wt, $t), l = Math.imul(Wt, Kt), l = l + Math.imul(jt, $t) | 0, E = Math.imul(jt, Kt), I = I + Math.imul(Xt, te) | 0, l = l + Math.imul(Xt, ee) | 0, l = l + Math.imul(Zt, te) | 0, E = E + Math.imul(Zt, ee) | 0, I = I + Math.imul(Yt, re) | 0, l = l + Math.imul(Yt, ne) | 0, l = l + Math.imul(Ht, re) | 0, E = E + Math.imul(Ht, ne) | 0, I = I + Math.imul(Gt, se) | 0, l = l + Math.imul(Gt, ie) | 0, l = l + Math.imul(Vt, se) | 0, E = E + Math.imul(Vt, ie) | 0, I = I + Math.imul(Ut, ae) | 0, l = l + Math.imul(Ut, oe) | 0, l = l + Math.imul(zt, ae) | 0, E = E + Math.imul(zt, oe) | 0, I = I + Math.imul(Pt, ce) | 0, l = l + Math.imul(Pt, de) | 0, l = l + Math.imul(kt, ce) | 0, E = E + Math.imul(kt, de) | 0, I = I + Math.imul(xt, ue) | 0, l = l + Math.imul(xt, _e) | 0, l = l + Math.imul(Ft, ue) | 0, E = E + Math.imul(Ft, _e) | 0, I = I + Math.imul(bt, he) | 0, l = l + Math.imul(bt, le) | 0, l = l + Math.imul(At, he) | 0, E = E + Math.imul(At, le) | 0, I = I + Math.imul(ht, Ae) | 0, l = l + Math.imul(ht, fe) | 0, l = l + Math.imul(yt, Ae) | 0, E = E + Math.imul(yt, fe) | 0;
      var Oi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, I = Math.imul(Wt, te), l = Math.imul(Wt, ee), l = l + Math.imul(jt, te) | 0, E = Math.imul(jt, ee), I = I + Math.imul(Xt, re) | 0, l = l + Math.imul(Xt, ne) | 0, l = l + Math.imul(Zt, re) | 0, E = E + Math.imul(Zt, ne) | 0, I = I + Math.imul(Yt, se) | 0, l = l + Math.imul(Yt, ie) | 0, l = l + Math.imul(Ht, se) | 0, E = E + Math.imul(Ht, ie) | 0, I = I + Math.imul(Gt, ae) | 0, l = l + Math.imul(Gt, oe) | 0, l = l + Math.imul(Vt, ae) | 0, E = E + Math.imul(Vt, oe) | 0, I = I + Math.imul(Ut, ce) | 0, l = l + Math.imul(Ut, de) | 0, l = l + Math.imul(zt, ce) | 0, E = E + Math.imul(zt, de) | 0, I = I + Math.imul(Pt, ue) | 0, l = l + Math.imul(Pt, _e) | 0, l = l + Math.imul(kt, ue) | 0, E = E + Math.imul(kt, _e) | 0, I = I + Math.imul(xt, he) | 0, l = l + Math.imul(xt, le) | 0, l = l + Math.imul(Ft, he) | 0, E = E + Math.imul(Ft, le) | 0, I = I + Math.imul(bt, Ae) | 0, l = l + Math.imul(bt, fe) | 0, l = l + Math.imul(At, Ae) | 0, E = E + Math.imul(At, fe) | 0;
      var Mi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, I = Math.imul(Wt, re), l = Math.imul(Wt, ne), l = l + Math.imul(jt, re) | 0, E = Math.imul(jt, ne), I = I + Math.imul(Xt, se) | 0, l = l + Math.imul(Xt, ie) | 0, l = l + Math.imul(Zt, se) | 0, E = E + Math.imul(Zt, ie) | 0, I = I + Math.imul(Yt, ae) | 0, l = l + Math.imul(Yt, oe) | 0, l = l + Math.imul(Ht, ae) | 0, E = E + Math.imul(Ht, oe) | 0, I = I + Math.imul(Gt, ce) | 0, l = l + Math.imul(Gt, de) | 0, l = l + Math.imul(Vt, ce) | 0, E = E + Math.imul(Vt, de) | 0, I = I + Math.imul(Ut, ue) | 0, l = l + Math.imul(Ut, _e) | 0, l = l + Math.imul(zt, ue) | 0, E = E + Math.imul(zt, _e) | 0, I = I + Math.imul(Pt, he) | 0, l = l + Math.imul(Pt, le) | 0, l = l + Math.imul(kt, he) | 0, E = E + Math.imul(kt, le) | 0, I = I + Math.imul(xt, Ae) | 0, l = l + Math.imul(xt, fe) | 0, l = l + Math.imul(Ft, Ae) | 0, E = E + Math.imul(Ft, fe) | 0;
      var Li = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, I = Math.imul(Wt, se), l = Math.imul(Wt, ie), l = l + Math.imul(jt, se) | 0, E = Math.imul(jt, ie), I = I + Math.imul(Xt, ae) | 0, l = l + Math.imul(Xt, oe) | 0, l = l + Math.imul(Zt, ae) | 0, E = E + Math.imul(Zt, oe) | 0, I = I + Math.imul(Yt, ce) | 0, l = l + Math.imul(Yt, de) | 0, l = l + Math.imul(Ht, ce) | 0, E = E + Math.imul(Ht, de) | 0, I = I + Math.imul(Gt, ue) | 0, l = l + Math.imul(Gt, _e) | 0, l = l + Math.imul(Vt, ue) | 0, E = E + Math.imul(Vt, _e) | 0, I = I + Math.imul(Ut, he) | 0, l = l + Math.imul(Ut, le) | 0, l = l + Math.imul(zt, he) | 0, E = E + Math.imul(zt, le) | 0, I = I + Math.imul(Pt, Ae) | 0, l = l + Math.imul(Pt, fe) | 0, l = l + Math.imul(kt, Ae) | 0, E = E + Math.imul(kt, fe) | 0;
      var Pi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, I = Math.imul(Wt, ae), l = Math.imul(Wt, oe), l = l + Math.imul(jt, ae) | 0, E = Math.imul(jt, oe), I = I + Math.imul(Xt, ce) | 0, l = l + Math.imul(Xt, de) | 0, l = l + Math.imul(Zt, ce) | 0, E = E + Math.imul(Zt, de) | 0, I = I + Math.imul(Yt, ue) | 0, l = l + Math.imul(Yt, _e) | 0, l = l + Math.imul(Ht, ue) | 0, E = E + Math.imul(Ht, _e) | 0, I = I + Math.imul(Gt, he) | 0, l = l + Math.imul(Gt, le) | 0, l = l + Math.imul(Vt, he) | 0, E = E + Math.imul(Vt, le) | 0, I = I + Math.imul(Ut, Ae) | 0, l = l + Math.imul(Ut, fe) | 0, l = l + Math.imul(zt, Ae) | 0, E = E + Math.imul(zt, fe) | 0;
      var ki = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, I = Math.imul(Wt, ce), l = Math.imul(Wt, de), l = l + Math.imul(jt, ce) | 0, E = Math.imul(jt, de), I = I + Math.imul(Xt, ue) | 0, l = l + Math.imul(Xt, _e) | 0, l = l + Math.imul(Zt, ue) | 0, E = E + Math.imul(Zt, _e) | 0, I = I + Math.imul(Yt, he) | 0, l = l + Math.imul(Yt, le) | 0, l = l + Math.imul(Ht, he) | 0, E = E + Math.imul(Ht, le) | 0, I = I + Math.imul(Gt, Ae) | 0, l = l + Math.imul(Gt, fe) | 0, l = l + Math.imul(Vt, Ae) | 0, E = E + Math.imul(Vt, fe) | 0;
      var Ui = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, I = Math.imul(Wt, ue), l = Math.imul(Wt, _e), l = l + Math.imul(jt, ue) | 0, E = Math.imul(jt, _e), I = I + Math.imul(Xt, he) | 0, l = l + Math.imul(Xt, le) | 0, l = l + Math.imul(Zt, he) | 0, E = E + Math.imul(Zt, le) | 0, I = I + Math.imul(Yt, Ae) | 0, l = l + Math.imul(Yt, fe) | 0, l = l + Math.imul(Ht, Ae) | 0, E = E + Math.imul(Ht, fe) | 0;
      var zi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, I = Math.imul(Wt, he), l = Math.imul(Wt, le), l = l + Math.imul(jt, he) | 0, E = Math.imul(jt, le), I = I + Math.imul(Xt, Ae) | 0, l = l + Math.imul(Xt, fe) | 0, l = l + Math.imul(Zt, Ae) | 0, E = E + Math.imul(Zt, fe) | 0;
      var Gi = (T + I | 0) + ((l & 8191) << 13) | 0;
      T = (E + (l >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, I = Math.imul(Wt, Ae), l = Math.imul(Wt, fe), l = l + Math.imul(jt, Ae) | 0, E = Math.imul(jt, fe);
      var Vi = (T + I | 0) + ((l & 8191) << 13) | 0;
      return T = (E + (l >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, B[0] = Ci, B[1] = Bi, B[2] = xi, B[3] = Ri, B[4] = Si, B[5] = Ti, B[6] = Ni, B[7] = Di, B[8] = Qi, B[9] = Fi, B[10] = Oi, B[11] = Mi, B[12] = Li, B[13] = Pi, B[14] = ki, B[15] = Ui, B[16] = zi, B[17] = Gi, B[18] = Vi, T !== 0 && (B[19] = T, f.length++), f;
    };
    Math.imul || (z = O);
    function M(v, d, _) {
      _.negative = d.negative ^ v.negative, _.length = v.length + d.length;
      for (var f = 0, g = 0, y = 0; y < _.length - 1; y++) {
        var B = g;
        g = 0;
        for (var T = f & 67108863, I = Math.min(y, d.length - 1), l = Math.max(0, y - v.length + 1); l <= I; l++) {
          var E = y - l, K = v.words[E] | 0, $ = d.words[l] | 0, tt = K * $, Bt = tt & 67108863;
          B = B + (tt / 67108864 | 0) | 0, Bt = Bt + T | 0, T = Bt & 67108863, B = B + (Bt >>> 26) | 0, g += B >>> 26, B &= 67108863;
        }
        _.words[y] = T, f = B, B = g;
      }
      return f !== 0 ? _.words[y] = f : _.length--, _._strip();
    }
    function U(v, d, _) {
      return M(v, d, _);
    }
    i.prototype.mulTo = function(d, _) {
      var f, g = this.length + d.length;
      return this.length === 10 && d.length === 10 ? f = z(this, d, _) : g < 63 ? f = O(this, d, _) : g < 1024 ? f = M(this, d, _) : f = U(this, d, _), f;
    }, i.prototype.mul = function(d) {
      var _ = new i(null);
      return _.words = new Array(this.length + d.length), this.mulTo(d, _);
    }, i.prototype.mulf = function(d) {
      var _ = new i(null);
      return _.words = new Array(this.length + d.length), U(this, d, _);
    }, i.prototype.imul = function(d) {
      return this.clone().mulTo(d, this);
    }, i.prototype.imuln = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(typeof d == "number"), n(d < 67108864);
      for (var f = 0, g = 0; g < this.length; g++) {
        var y = (this.words[g] | 0) * d, B = (y & 67108863) + (f & 67108863);
        f >>= 26, f += y / 67108864 | 0, f += B >>> 26, this.words[g] = B & 67108863;
      }
      return f !== 0 && (this.words[g] = f, this.length++), _ ? this.ineg() : this;
    }, i.prototype.muln = function(d) {
      return this.clone().imuln(d);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(d) {
      var _ = N(d);
      if (_.length === 0) return new i(1);
      for (var f = this, g = 0; g < _.length && _[g] === 0; g++, f = f.sqr())
        ;
      if (++g < _.length)
        for (var y = f.sqr(); g < _.length; g++, y = y.sqr())
          _[g] !== 0 && (f = f.mul(y));
      return f;
    }, i.prototype.iushln = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, f = (d - _) / 26, g = 67108863 >>> 26 - _ << 26 - _, y;
      if (_ !== 0) {
        var B = 0;
        for (y = 0; y < this.length; y++) {
          var T = this.words[y] & g, I = (this.words[y] | 0) - T << _;
          this.words[y] = I | B, B = T >>> 26 - _;
        }
        B && (this.words[y] = B, this.length++);
      }
      if (f !== 0) {
        for (y = this.length - 1; y >= 0; y--)
          this.words[y + f] = this.words[y];
        for (y = 0; y < f; y++)
          this.words[y] = 0;
        this.length += f;
      }
      return this._strip();
    }, i.prototype.ishln = function(d) {
      return n(this.negative === 0), this.iushln(d);
    }, i.prototype.iushrn = function(d, _, f) {
      n(typeof d == "number" && d >= 0);
      var g;
      _ ? g = (_ - _ % 26) / 26 : g = 0;
      var y = d % 26, B = Math.min((d - y) / 26, this.length), T = 67108863 ^ 67108863 >>> y << y, I = f;
      if (g -= B, g = Math.max(0, g), I) {
        for (var l = 0; l < B; l++)
          I.words[l] = this.words[l];
        I.length = B;
      }
      if (B !== 0) if (this.length > B)
        for (this.length -= B, l = 0; l < this.length; l++)
          this.words[l] = this.words[l + B];
      else
        this.words[0] = 0, this.length = 1;
      var E = 0;
      for (l = this.length - 1; l >= 0 && (E !== 0 || l >= g); l--) {
        var K = this.words[l] | 0;
        this.words[l] = E << 26 - y | K >>> y, E = K & T;
      }
      return I && E !== 0 && (I.words[I.length++] = E), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(d, _, f) {
      return n(this.negative === 0), this.iushrn(d, _, f);
    }, i.prototype.shln = function(d) {
      return this.clone().ishln(d);
    }, i.prototype.ushln = function(d) {
      return this.clone().iushln(d);
    }, i.prototype.shrn = function(d) {
      return this.clone().ishrn(d);
    }, i.prototype.ushrn = function(d) {
      return this.clone().iushrn(d);
    }, i.prototype.testn = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, f = (d - _) / 26, g = 1 << _;
      if (this.length <= f) return !1;
      var y = this.words[f];
      return !!(y & g);
    }, i.prototype.imaskn = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, f = (d - _) / 26;
      if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= f)
        return this;
      if (_ !== 0 && f++, this.length = Math.min(f, this.length), _ !== 0) {
        var g = 67108863 ^ 67108863 >>> _ << _;
        this.words[this.length - 1] &= g;
      }
      return this._strip();
    }, i.prototype.maskn = function(d) {
      return this.clone().imaskn(d);
    }, i.prototype.iaddn = function(d) {
      return n(typeof d == "number"), n(d < 67108864), d < 0 ? this.isubn(-d) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= d ? (this.words[0] = d - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(d), this.negative = 1, this) : this._iaddn(d);
    }, i.prototype._iaddn = function(d) {
      this.words[0] += d;
      for (var _ = 0; _ < this.length && this.words[_] >= 67108864; _++)
        this.words[_] -= 67108864, _ === this.length - 1 ? this.words[_ + 1] = 1 : this.words[_ + 1]++;
      return this.length = Math.max(this.length, _ + 1), this;
    }, i.prototype.isubn = function(d) {
      if (n(typeof d == "number"), n(d < 67108864), d < 0) return this.iaddn(-d);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(d), this.negative = 1, this;
      if (this.words[0] -= d, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var _ = 0; _ < this.length && this.words[_] < 0; _++)
          this.words[_] += 67108864, this.words[_ + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(d) {
      return this.clone().iaddn(d);
    }, i.prototype.subn = function(d) {
      return this.clone().isubn(d);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(d, _, f) {
      var g = d.length + f, y;
      this._expand(g);
      var B, T = 0;
      for (y = 0; y < d.length; y++) {
        B = (this.words[y + f] | 0) + T;
        var I = (d.words[y] | 0) * _;
        B -= I & 67108863, T = (B >> 26) - (I / 67108864 | 0), this.words[y + f] = B & 67108863;
      }
      for (; y < this.length - f; y++)
        B = (this.words[y + f] | 0) + T, T = B >> 26, this.words[y + f] = B & 67108863;
      if (T === 0) return this._strip();
      for (n(T === -1), T = 0, y = 0; y < this.length; y++)
        B = -(this.words[y] | 0) + T, T = B >> 26, this.words[y] = B & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(d, _) {
      var f = this.length - d.length, g = this.clone(), y = d, B = y.words[y.length - 1] | 0, T = this._countBits(B);
      f = 26 - T, f !== 0 && (y = y.ushln(f), g.iushln(f), B = y.words[y.length - 1] | 0);
      var I = g.length - y.length, l;
      if (_ !== "mod") {
        l = new i(null), l.length = I + 1, l.words = new Array(l.length);
        for (var E = 0; E < l.length; E++)
          l.words[E] = 0;
      }
      var K = g.clone()._ishlnsubmul(y, 1, I);
      K.negative === 0 && (g = K, l && (l.words[I] = 1));
      for (var $ = I - 1; $ >= 0; $--) {
        var tt = (g.words[y.length + $] | 0) * 67108864 + (g.words[y.length + $ - 1] | 0);
        for (tt = Math.min(tt / B | 0, 67108863), g._ishlnsubmul(y, tt, $); g.negative !== 0; )
          tt--, g.negative = 0, g._ishlnsubmul(y, 1, $), g.isZero() || (g.negative ^= 1);
        l && (l.words[$] = tt);
      }
      return l && l._strip(), g._strip(), _ !== "div" && f !== 0 && g.iushrn(f), {
        div: l || null,
        mod: g
      };
    }, i.prototype.divmod = function(d, _, f) {
      if (n(!d.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var g, y, B;
      return this.negative !== 0 && d.negative === 0 ? (B = this.neg().divmod(d, _), _ !== "mod" && (g = B.div.neg()), _ !== "div" && (y = B.mod.neg(), f && y.negative !== 0 && y.iadd(d)), {
        div: g,
        mod: y
      }) : this.negative === 0 && d.negative !== 0 ? (B = this.divmod(d.neg(), _), _ !== "mod" && (g = B.div.neg()), {
        div: g,
        mod: B.mod
      }) : this.negative & d.negative ? (B = this.neg().divmod(d.neg(), _), _ !== "div" && (y = B.mod.neg(), f && y.negative !== 0 && y.isub(d)), {
        div: B.div,
        mod: y
      }) : d.length > this.length || this.cmp(d) < 0 ? {
        div: new i(0),
        mod: this
      } : d.length === 1 ? _ === "div" ? {
        div: this.divn(d.words[0]),
        mod: null
      } : _ === "mod" ? {
        div: null,
        mod: new i(this.modrn(d.words[0]))
      } : {
        div: this.divn(d.words[0]),
        mod: new i(this.modrn(d.words[0]))
      } : this._wordDiv(d, _);
    }, i.prototype.div = function(d) {
      return this.divmod(d, "div", !1).div;
    }, i.prototype.mod = function(d) {
      return this.divmod(d, "mod", !1).mod;
    }, i.prototype.umod = function(d) {
      return this.divmod(d, "mod", !0).mod;
    }, i.prototype.divRound = function(d) {
      var _ = this.divmod(d);
      if (_.mod.isZero()) return _.div;
      var f = _.div.negative !== 0 ? _.mod.isub(d) : _.mod, g = d.ushrn(1), y = d.andln(1), B = f.cmp(g);
      return B < 0 || y === 1 && B === 0 ? _.div : _.div.negative !== 0 ? _.div.isubn(1) : _.div.iaddn(1);
    }, i.prototype.modrn = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(d <= 67108863);
      for (var f = (1 << 26) % d, g = 0, y = this.length - 1; y >= 0; y--)
        g = (f * g + (this.words[y] | 0)) % d;
      return _ ? -g : g;
    }, i.prototype.modn = function(d) {
      return this.modrn(d);
    }, i.prototype.idivn = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(d <= 67108863);
      for (var f = 0, g = this.length - 1; g >= 0; g--) {
        var y = (this.words[g] | 0) + f * 67108864;
        this.words[g] = y / d | 0, f = y % d;
      }
      return this._strip(), _ ? this.ineg() : this;
    }, i.prototype.divn = function(d) {
      return this.clone().idivn(d);
    }, i.prototype.egcd = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, f = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var g = new i(1), y = new i(0), B = new i(0), T = new i(1), I = 0; _.isEven() && f.isEven(); )
        _.iushrn(1), f.iushrn(1), ++I;
      for (var l = f.clone(), E = _.clone(); !_.isZero(); ) {
        for (var K = 0, $ = 1; !(_.words[0] & $) && K < 26; ++K, $ <<= 1) ;
        if (K > 0)
          for (_.iushrn(K); K-- > 0; )
            (g.isOdd() || y.isOdd()) && (g.iadd(l), y.isub(E)), g.iushrn(1), y.iushrn(1);
        for (var tt = 0, Bt = 1; !(f.words[0] & Bt) && tt < 26; ++tt, Bt <<= 1) ;
        if (tt > 0)
          for (f.iushrn(tt); tt-- > 0; )
            (B.isOdd() || T.isOdd()) && (B.iadd(l), T.isub(E)), B.iushrn(1), T.iushrn(1);
        _.cmp(f) >= 0 ? (_.isub(f), g.isub(B), y.isub(T)) : (f.isub(_), B.isub(g), T.isub(y));
      }
      return {
        a: B,
        b: T,
        gcd: f.iushln(I)
      };
    }, i.prototype._invmp = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, f = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var g = new i(1), y = new i(0), B = f.clone(); _.cmpn(1) > 0 && f.cmpn(1) > 0; ) {
        for (var T = 0, I = 1; !(_.words[0] & I) && T < 26; ++T, I <<= 1) ;
        if (T > 0)
          for (_.iushrn(T); T-- > 0; )
            g.isOdd() && g.iadd(B), g.iushrn(1);
        for (var l = 0, E = 1; !(f.words[0] & E) && l < 26; ++l, E <<= 1) ;
        if (l > 0)
          for (f.iushrn(l); l-- > 0; )
            y.isOdd() && y.iadd(B), y.iushrn(1);
        _.cmp(f) >= 0 ? (_.isub(f), g.isub(y)) : (f.isub(_), y.isub(g));
      }
      var K;
      return _.cmpn(1) === 0 ? K = g : K = y, K.cmpn(0) < 0 && K.iadd(d), K;
    }, i.prototype.gcd = function(d) {
      if (this.isZero()) return d.abs();
      if (d.isZero()) return this.abs();
      var _ = this.clone(), f = d.clone();
      _.negative = 0, f.negative = 0;
      for (var g = 0; _.isEven() && f.isEven(); g++)
        _.iushrn(1), f.iushrn(1);
      do {
        for (; _.isEven(); )
          _.iushrn(1);
        for (; f.isEven(); )
          f.iushrn(1);
        var y = _.cmp(f);
        if (y < 0) {
          var B = _;
          _ = f, f = B;
        } else if (y === 0 || f.cmpn(1) === 0)
          break;
        _.isub(f);
      } while (!0);
      return f.iushln(g);
    }, i.prototype.invm = function(d) {
      return this.egcd(d).a.umod(d);
    }, i.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, i.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, i.prototype.andln = function(d) {
      return this.words[0] & d;
    }, i.prototype.bincn = function(d) {
      n(typeof d == "number");
      var _ = d % 26, f = (d - _) / 26, g = 1 << _;
      if (this.length <= f)
        return this._expand(f + 1), this.words[f] |= g, this;
      for (var y = g, B = f; y !== 0 && B < this.length; B++) {
        var T = this.words[B] | 0;
        T += y, y = T >>> 26, T &= 67108863, this.words[B] = T;
      }
      return y !== 0 && (this.words[B] = y, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(d) {
      var _ = d < 0;
      if (this.negative !== 0 && !_) return -1;
      if (this.negative === 0 && _) return 1;
      this._strip();
      var f;
      if (this.length > 1)
        f = 1;
      else {
        _ && (d = -d), n(d <= 67108863, "Number is too big");
        var g = this.words[0] | 0;
        f = g === d ? 0 : g < d ? -1 : 1;
      }
      return this.negative !== 0 ? -f | 0 : f;
    }, i.prototype.cmp = function(d) {
      if (this.negative !== 0 && d.negative === 0) return -1;
      if (this.negative === 0 && d.negative !== 0) return 1;
      var _ = this.ucmp(d);
      return this.negative !== 0 ? -_ | 0 : _;
    }, i.prototype.ucmp = function(d) {
      if (this.length > d.length) return 1;
      if (this.length < d.length) return -1;
      for (var _ = 0, f = this.length - 1; f >= 0; f--) {
        var g = this.words[f] | 0, y = d.words[f] | 0;
        if (g !== y) {
          g < y ? _ = -1 : g > y && (_ = 1);
          break;
        }
      }
      return _;
    }, i.prototype.gtn = function(d) {
      return this.cmpn(d) === 1;
    }, i.prototype.gt = function(d) {
      return this.cmp(d) === 1;
    }, i.prototype.gten = function(d) {
      return this.cmpn(d) >= 0;
    }, i.prototype.gte = function(d) {
      return this.cmp(d) >= 0;
    }, i.prototype.ltn = function(d) {
      return this.cmpn(d) === -1;
    }, i.prototype.lt = function(d) {
      return this.cmp(d) === -1;
    }, i.prototype.lten = function(d) {
      return this.cmpn(d) <= 0;
    }, i.prototype.lte = function(d) {
      return this.cmp(d) <= 0;
    }, i.prototype.eqn = function(d) {
      return this.cmpn(d) === 0;
    }, i.prototype.eq = function(d) {
      return this.cmp(d) === 0;
    }, i.red = function(d) {
      return new W(d);
    }, i.prototype.toRed = function(d) {
      return n(!this.red, "Already a number in reduction context"), n(this.negative === 0, "red works only with positives"), d.convertTo(this)._forceRed(d);
    }, i.prototype.fromRed = function() {
      return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, i.prototype._forceRed = function(d) {
      return this.red = d, this;
    }, i.prototype.forceRed = function(d) {
      return n(!this.red, "Already a number in reduction context"), this._forceRed(d);
    }, i.prototype.redAdd = function(d) {
      return n(this.red, "redAdd works only with red numbers"), this.red.add(this, d);
    }, i.prototype.redIAdd = function(d) {
      return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, d);
    }, i.prototype.redSub = function(d) {
      return n(this.red, "redSub works only with red numbers"), this.red.sub(this, d);
    }, i.prototype.redISub = function(d) {
      return n(this.red, "redISub works only with red numbers"), this.red.isub(this, d);
    }, i.prototype.redShl = function(d) {
      return n(this.red, "redShl works only with red numbers"), this.red.shl(this, d);
    }, i.prototype.redMul = function(d) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, d), this.red.mul(this, d);
    }, i.prototype.redIMul = function(d) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, d), this.red.imul(this, d);
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
    }, i.prototype.redPow = function(d) {
      return n(this.red && !d.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, d);
    };
    var P = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function H(v, d) {
      this.name = v, this.p = new i(d, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    H.prototype._tmp = function() {
      var d = new i(null);
      return d.words = new Array(Math.ceil(this.n / 13)), d;
    }, H.prototype.ireduce = function(d) {
      var _ = d, f;
      do
        this.split(_, this.tmp), _ = this.imulK(_), _ = _.iadd(this.tmp), f = _.bitLength();
      while (f > this.n);
      var g = f < this.n ? -1 : _.ucmp(this.p);
      return g === 0 ? (_.words[0] = 0, _.length = 1) : g > 0 ? _.isub(this.p) : _.strip !== void 0 ? _.strip() : _._strip(), _;
    }, H.prototype.split = function(d, _) {
      d.iushrn(this.n, 0, _);
    }, H.prototype.imulK = function(d) {
      return d.imul(this.k);
    };
    function X() {
      H.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(X, H), X.prototype.split = function(d, _) {
      for (var f = 4194303, g = Math.min(d.length, 9), y = 0; y < g; y++)
        _.words[y] = d.words[y];
      if (_.length = g, d.length <= 9) {
        d.words[0] = 0, d.length = 1;
        return;
      }
      var B = d.words[9];
      for (_.words[_.length++] = B & f, y = 10; y < d.length; y++) {
        var T = d.words[y] | 0;
        d.words[y - 10] = (T & f) << 4 | B >>> 22, B = T;
      }
      B >>>= 22, d.words[y - 10] = B, B === 0 && d.length > 10 ? d.length -= 10 : d.length -= 9;
    }, X.prototype.imulK = function(d) {
      d.words[d.length] = 0, d.words[d.length + 1] = 0, d.length += 2;
      for (var _ = 0, f = 0; f < d.length; f++) {
        var g = d.words[f] | 0;
        _ += g * 977, d.words[f] = _ & 67108863, _ = g * 64 + (_ / 67108864 | 0);
      }
      return d.words[d.length - 1] === 0 && (d.length--, d.words[d.length - 1] === 0 && d.length--), d;
    };
    function V() {
      H.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(V, H);
    function k() {
      H.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(k, H);
    function it() {
      H.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(it, H), it.prototype.imulK = function(d) {
      for (var _ = 0, f = 0; f < d.length; f++) {
        var g = (d.words[f] | 0) * 19 + _, y = g & 67108863;
        g >>>= 26, d.words[f] = y, _ = g;
      }
      return _ !== 0 && (d.words[d.length++] = _), d;
    }, i._prime = function(d) {
      if (P[d]) return P[d];
      var _;
      if (d === "k256")
        _ = new X();
      else if (d === "p224")
        _ = new V();
      else if (d === "p192")
        _ = new k();
      else if (d === "p25519")
        _ = new it();
      else
        throw new Error("Unknown prime " + d);
      return P[d] = _, _;
    };
    function W(v) {
      if (typeof v == "string") {
        var d = i._prime(v);
        this.m = d.p, this.prime = d;
      } else
        n(v.gtn(1), "modulus must be greater than 1"), this.m = v, this.prime = null;
    }
    W.prototype._verify1 = function(d) {
      n(d.negative === 0, "red works only with positives"), n(d.red, "red works only with red numbers");
    }, W.prototype._verify2 = function(d, _) {
      n((d.negative | _.negative) === 0, "red works only with positives"), n(
        d.red && d.red === _.red,
        "red works only with red numbers"
      );
    }, W.prototype.imod = function(d) {
      return this.prime ? this.prime.ireduce(d)._forceRed(this) : (p(d, d.umod(this.m)._forceRed(this)), d);
    }, W.prototype.neg = function(d) {
      return d.isZero() ? d.clone() : this.m.sub(d)._forceRed(this);
    }, W.prototype.add = function(d, _) {
      this._verify2(d, _);
      var f = d.add(_);
      return f.cmp(this.m) >= 0 && f.isub(this.m), f._forceRed(this);
    }, W.prototype.iadd = function(d, _) {
      this._verify2(d, _);
      var f = d.iadd(_);
      return f.cmp(this.m) >= 0 && f.isub(this.m), f;
    }, W.prototype.sub = function(d, _) {
      this._verify2(d, _);
      var f = d.sub(_);
      return f.cmpn(0) < 0 && f.iadd(this.m), f._forceRed(this);
    }, W.prototype.isub = function(d, _) {
      this._verify2(d, _);
      var f = d.isub(_);
      return f.cmpn(0) < 0 && f.iadd(this.m), f;
    }, W.prototype.shl = function(d, _) {
      return this._verify1(d), this.imod(d.ushln(_));
    }, W.prototype.imul = function(d, _) {
      return this._verify2(d, _), this.imod(d.imul(_));
    }, W.prototype.mul = function(d, _) {
      return this._verify2(d, _), this.imod(d.mul(_));
    }, W.prototype.isqr = function(d) {
      return this.imul(d, d.clone());
    }, W.prototype.sqr = function(d) {
      return this.mul(d, d);
    }, W.prototype.sqrt = function(d) {
      if (d.isZero()) return d.clone();
      var _ = this.m.andln(3);
      if (n(_ % 2 === 1), _ === 3) {
        var f = this.m.add(new i(1)).iushrn(2);
        return this.pow(d, f);
      }
      for (var g = this.m.subn(1), y = 0; !g.isZero() && g.andln(1) === 0; )
        y++, g.iushrn(1);
      n(!g.isZero());
      var B = new i(1).toRed(this), T = B.redNeg(), I = this.m.subn(1).iushrn(1), l = this.m.bitLength();
      for (l = new i(2 * l * l).toRed(this); this.pow(l, I).cmp(T) !== 0; )
        l.redIAdd(T);
      for (var E = this.pow(l, g), K = this.pow(d, g.addn(1).iushrn(1)), $ = this.pow(d, g), tt = y; $.cmp(B) !== 0; ) {
        for (var Bt = $, ht = 0; Bt.cmp(B) !== 0; ht++)
          Bt = Bt.redSqr();
        n(ht < tt);
        var yt = this.pow(E, new i(1).iushln(tt - ht - 1));
        K = K.redMul(yt), E = yt.redSqr(), $ = $.redMul(E), tt = ht;
      }
      return K;
    }, W.prototype.invm = function(d) {
      var _ = d._invmp(this.m);
      return _.negative !== 0 ? (_.negative = 0, this.imod(_).redNeg()) : this.imod(_);
    }, W.prototype.pow = function(d, _) {
      if (_.isZero()) return new i(1).toRed(this);
      if (_.cmpn(1) === 0) return d.clone();
      var f = 4, g = new Array(1 << f);
      g[0] = new i(1).toRed(this), g[1] = d;
      for (var y = 2; y < g.length; y++)
        g[y] = this.mul(g[y - 1], d);
      var B = g[0], T = 0, I = 0, l = _.bitLength() % 26;
      for (l === 0 && (l = 26), y = _.length - 1; y >= 0; y--) {
        for (var E = _.words[y], K = l - 1; K >= 0; K--) {
          var $ = E >> K & 1;
          if (B !== g[0] && (B = this.sqr(B)), $ === 0 && T === 0) {
            I = 0;
            continue;
          }
          T <<= 1, T |= $, I++, !(I !== f && (y !== 0 || K !== 0)) && (B = this.mul(B, g[T]), I = 0, T = 0);
        }
        l = 26;
      }
      return B;
    }, W.prototype.convertTo = function(d) {
      var _ = d.umod(this.m);
      return _ === d ? _.clone() : _;
    }, W.prototype.convertFrom = function(d) {
      var _ = d.clone();
      return _.red = null, _;
    }, i.mont = function(d) {
      return new j(d);
    };
    function j(v) {
      W.call(this, v), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(j, W), j.prototype.convertTo = function(d) {
      return this.imod(d.ushln(this.shift));
    }, j.prototype.convertFrom = function(d) {
      var _ = this.imod(d.mul(this.rinv));
      return _.red = null, _;
    }, j.prototype.imul = function(d, _) {
      if (d.isZero() || _.isZero())
        return d.words[0] = 0, d.length = 1, d;
      var f = d.imul(_), g = f.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = f.isub(g).iushrn(this.shift), B = y;
      return y.cmp(this.m) >= 0 ? B = y.isub(this.m) : y.cmpn(0) < 0 && (B = y.iadd(this.m)), B._forceRed(this);
    }, j.prototype.mul = function(d, _) {
      if (d.isZero() || _.isZero()) return new i(0)._forceRed(this);
      var f = d.mul(_), g = f.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = f.isub(g).iushrn(this.shift), B = y;
      return y.cmp(this.m) >= 0 ? B = y.isub(this.m) : y.cmpn(0) < 0 && (B = y.iadd(this.m)), B._forceRed(this);
    }, j.prototype.invm = function(d) {
      var _ = this.imod(d._invmp(this.m).mul(this.r2));
      return _._forceRed(this);
    };
  })(e, Ia);
})(oo);
var $A = oo.exports;
const As = /* @__PURE__ */ P_($A);
var k_ = 9, U_ = 3, Ea = 9, Ot = class extends As {
  constructor(t, r, n) {
    let s = t, i = r;
    Ot.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = r || "hex");
    super(s ?? 0, i, n);
    Q(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
  }
  // ANCHOR: HELPERS
  // make sure we always include `0x` in hex strings
  toString(t, r) {
    const n = super.toString(t, r);
    return t === 16 || t === "hex" ? `0x${n}` : n;
  }
  toHex(t) {
    const n = (t || 0) * 2;
    if (this.isNeg())
      throw new C(D.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new C(
        D.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, n);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new C(D.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
    return Uint8Array.from(this.toArray(void 0, t));
  }
  toJSON() {
    return this.toString(16);
  }
  valueOf() {
    return this.toString();
  }
  format(t) {
    const {
      units: r = Ea,
      precision: n = k_,
      minPrecision: s = U_
    } = t || {};
    if (r === 0)
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const i = s > n ? n : s, a = n > s ? n : s, o = this.formatUnits(r), [u, A = ""] = o.split("."), p = u.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (a === 0)
      return p;
    let m = A.replace(/0+$/, "");
    if (m.length > a)
      if (u === "0") {
        const b = m.search(/[1-9]/);
        b >= 0 && b < a ? m = m.slice(0, a) : m = m.slice(0, b + 1);
      } else
        m = m.slice(0, a);
    else
      m = m.slice(0, a);
    return m.length < i && (m = m.padEnd(i, "0")), m === "" && i === 0 ? p : m ? `${p}.${m}` : p;
  }
  formatUnits(t = Ea) {
    const r = this.toString(), n = r.length;
    if (n <= t)
      return `0.${"0".repeat(t - n)}${r}`;
    const s = r.slice(0, n - t), i = r.slice(n - t);
    return `${s}.${i}`;
  }
  // END ANCHOR: HELPERS
  // ANCHOR: OVERRIDES to accept better inputs
  add(t) {
    return this.caller(t, "add");
  }
  pow(t) {
    return this.caller(t, "pow");
  }
  sub(t) {
    return this.caller(t, "sub");
  }
  div(t) {
    return this.caller(t, "div");
  }
  mul(t) {
    return this.caller(t, "mul");
  }
  mod(t) {
    return this.caller(t, "mod");
  }
  divRound(t) {
    return this.caller(t, "divRound");
  }
  lt(t) {
    return this.caller(t, "lt");
  }
  lte(t) {
    return this.caller(t, "lte");
  }
  gt(t) {
    return this.caller(t, "gt");
  }
  gte(t) {
    return this.caller(t, "gte");
  }
  eq(t) {
    return this.caller(t, "eq");
  }
  cmp(t) {
    return this.caller(t, "cmp");
  }
  // END ANCHOR: OVERRIDES to accept better inputs
  // ANCHOR: OVERRIDES to output our BN type
  sqr() {
    return new Ot(super.sqr().toArray());
  }
  neg() {
    return new Ot(super.neg().toArray());
  }
  abs() {
    return new Ot(super.abs().toArray());
  }
  toTwos(t) {
    return new Ot(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Ot(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, r) {
    const n = super[r](new Ot(t));
    return Ot.isBN(n) ? new Ot(n.toArray()) : n;
  }
  clone() {
    return new Ot(this.toArray());
  }
  mulTo(t, r) {
    const n = new As(this.toArray()).mulTo(t, r);
    return new Ot(n.toArray());
  }
  egcd(t) {
    const { a: r, b: n, gcd: s } = new As(this.toArray()).egcd(t);
    return {
      a: new Ot(r.toArray()),
      b: new Ot(n.toArray()),
      gcd: new Ot(s.toArray())
    };
  }
  divmod(t, r, n) {
    const { div: s, mod: i } = new As(this.toArray()).divmod(new Ot(t), r, n);
    return {
      div: new Ot(s == null ? void 0 : s.toArray()),
      mod: new Ot(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Ot(this.MAX_U64) : this;
  }
  max(t) {
    return this.gte(t) ? new Ot(t) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Ot(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, x = (e, t, r) => new Ot(e, t, r);
x.parseUnits = (e, t = Ea) => {
  const r = e === "." ? "0." : e, [n = "0", s = "0"] = r.split("."), i = s.length;
  if (t === 0) {
    const u = r.replace(",", "").split(".")[0];
    return x(u);
  }
  if (i > t)
    throw new C(
      D.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const a = Array.from({ length: t }).fill("0");
  a.splice(0, i, s);
  const o = `${n.replaceAll(",", "")}${a.join("")}`;
  return x(o);
};
function eB(e, t) {
  const { precision: r = k_, minPrecision: n = U_ } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), a = /(\d)(?=(\d{3})+\b)/g, o = s.replace(a, "$1,");
  let u = i.slice(0, r);
  if (n < r) {
    const p = u.match(/.*[1-9]{1}/), m = (p == null ? void 0 : p[0].length) || 0, b = Math.max(n, m);
    u = u.slice(0, b);
  }
  const A = u ? `.${u}` : "";
  return `${o}${A}`;
}
function xr(e) {
  return x(e).toNumber();
}
function co(e, t) {
  return x(e).toHex(t);
}
function lr(e, t) {
  return x(e).toBytes(t);
}
function rB(e, t) {
  return x(e).formatUnits(t);
}
function nB(e, t) {
  return x(e).format(t);
}
function sB(...e) {
  return e.reduce((t, r) => x(r).gt(t) ? x(r) : t, x(0));
}
function iB(...e) {
  return x(Math.ceil(e.reduce((t, r) => x(t).mul(r), x(1)).toNumber()));
}
var be = Uint8Array, Me = Uint16Array, uo = Int32Array, oi = new be([
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
]), ci = new be([
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
]), va = new be([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), z_ = function(e, t) {
  for (var r = new Me(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var s = new uo(r[30]), n = 1; n < 30; ++n)
    for (var i = r[n]; i < r[n + 1]; ++i)
      s[i] = i - r[n] << 5 | n;
  return { b: r, r: s };
}, G_ = z_(oi, 2), V_ = G_.b, Ca = G_.r;
V_[28] = 258, Ca[258] = 28;
var Y_ = z_(ci, 0), KA = Y_.b, mc = Y_.r, Ba = new Me(32768);
for (var Qt = 0; Qt < 32768; ++Qt) {
  var wr = (Qt & 43690) >> 1 | (Qt & 21845) << 1;
  wr = (wr & 52428) >> 2 | (wr & 13107) << 2, wr = (wr & 61680) >> 4 | (wr & 3855) << 4, Ba[Qt] = ((wr & 65280) >> 8 | (wr & 255) << 8) >> 1;
}
var er = function(e, t, r) {
  for (var n = e.length, s = 0, i = new Me(t); s < n; ++s)
    e[s] && ++i[e[s] - 1];
  var a = new Me(t);
  for (s = 1; s < t; ++s)
    a[s] = a[s - 1] + i[s - 1] << 1;
  var o;
  if (r) {
    o = new Me(1 << t);
    var u = 15 - t;
    for (s = 0; s < n; ++s)
      if (e[s])
        for (var A = s << 4 | e[s], p = t - e[s], m = a[e[s] - 1]++ << p, b = m | (1 << p) - 1; m <= b; ++m)
          o[Ba[m] >> u] = A;
  } else
    for (o = new Me(n), s = 0; s < n; ++s)
      e[s] && (o[s] = Ba[a[e[s] - 1]++] >> 15 - e[s]);
  return o;
}, Fr = new be(288);
for (var Qt = 0; Qt < 144; ++Qt)
  Fr[Qt] = 8;
for (var Qt = 144; Qt < 256; ++Qt)
  Fr[Qt] = 9;
for (var Qt = 256; Qt < 280; ++Qt)
  Fr[Qt] = 7;
for (var Qt = 280; Qt < 288; ++Qt)
  Fr[Qt] = 8;
var Xn = new be(32);
for (var Qt = 0; Qt < 32; ++Qt)
  Xn[Qt] = 5;
var tf = /* @__PURE__ */ er(Fr, 9, 0), ef = /* @__PURE__ */ er(Fr, 9, 1), rf = /* @__PURE__ */ er(Xn, 5, 0), nf = /* @__PURE__ */ er(Xn, 5, 1), Hi = function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
}, Ve = function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
}, Xi = function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
}, _o = function(e) {
  return (e + 7) / 8 | 0;
}, H_ = function(e, t, r) {
  return (r == null || r > e.length) && (r = e.length), new be(e.subarray(t, r));
}, sf = [
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
], He = function(e, t, r) {
  var n = new Error(t || sf[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, He), !r)
    throw n;
  return n;
}, af = function(e, t, r, n) {
  var s = e.length, i = 0;
  if (!s || t.f && !t.l)
    return r || new be(0);
  var a = !r, o = a || t.i != 2, u = t.i;
  a && (r = new be(s * 3));
  var A = function(bt) {
    var At = r.length;
    if (bt > At) {
      var Ee = new be(Math.max(At * 2, bt));
      Ee.set(r), r = Ee;
    }
  }, p = t.f || 0, m = t.p || 0, b = t.b || 0, S = t.l, F = t.d, R = t.m, N = t.n, O = s * 8;
  do {
    if (!S) {
      p = Ve(e, m, 1);
      var z = Ve(e, m + 1, 3);
      if (m += 3, z)
        if (z == 1)
          S = ef, F = nf, R = 9, N = 5;
        else if (z == 2) {
          var H = Ve(e, m, 31) + 257, X = Ve(e, m + 10, 15) + 4, V = H + Ve(e, m + 5, 31) + 1;
          m += 14;
          for (var k = new be(V), it = new be(19), W = 0; W < X; ++W)
            it[va[W]] = Ve(e, m + W * 3, 7);
          m += X * 3;
          for (var j = Hi(it), v = (1 << j) - 1, d = er(it, j, 1), W = 0; W < V; ) {
            var _ = d[Ve(e, m, v)];
            m += _ & 15;
            var M = _ >> 4;
            if (M < 16)
              k[W++] = M;
            else {
              var f = 0, g = 0;
              for (M == 16 ? (g = 3 + Ve(e, m, 3), m += 2, f = k[W - 1]) : M == 17 ? (g = 3 + Ve(e, m, 7), m += 3) : M == 18 && (g = 11 + Ve(e, m, 127), m += 7); g--; )
                k[W++] = f;
            }
          }
          var y = k.subarray(0, H), B = k.subarray(H);
          R = Hi(y), N = Hi(B), S = er(y, R, 1), F = er(B, N, 1);
        } else
          He(1);
      else {
        var M = _o(m) + 4, U = e[M - 4] | e[M - 3] << 8, P = M + U;
        if (P > s) {
          u && He(0);
          break;
        }
        o && A(b + U), r.set(e.subarray(M, P), b), t.b = b += U, t.p = m = P * 8, t.f = p;
        continue;
      }
      if (m > O) {
        u && He(0);
        break;
      }
    }
    o && A(b + 131072);
    for (var T = (1 << R) - 1, I = (1 << N) - 1, l = m; ; l = m) {
      var f = S[Xi(e, m) & T], E = f >> 4;
      if (m += f & 15, m > O) {
        u && He(0);
        break;
      }
      if (f || He(2), E < 256)
        r[b++] = E;
      else if (E == 256) {
        l = m, S = null;
        break;
      } else {
        var K = E - 254;
        if (E > 264) {
          var W = E - 257, $ = oi[W];
          K = Ve(e, m, (1 << $) - 1) + V_[W], m += $;
        }
        var tt = F[Xi(e, m) & I], Bt = tt >> 4;
        tt || He(3), m += tt & 15;
        var B = KA[Bt];
        if (Bt > 3) {
          var $ = ci[Bt];
          B += Xi(e, m) & (1 << $) - 1, m += $;
        }
        if (m > O) {
          u && He(0);
          break;
        }
        o && A(b + 131072);
        var ht = b + K;
        if (b < B) {
          var yt = i - B, je = Math.min(B, ht);
          for (yt + b < 0 && He(3); b < je; ++b)
            r[b] = n[yt + b];
        }
        for (; b < ht; ++b)
          r[b] = r[b - B];
      }
    }
    t.l = S, t.p = l, t.b = b, t.f = p, S && (p = 1, t.m = R, t.d = F, t.n = N);
  } while (!p);
  return b != r.length && a ? H_(r, 0, b) : r.subarray(0, b);
}, ar = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8;
}, Nn = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8, e[n + 2] |= r >> 16;
}, Zi = function(e, t) {
  for (var r = [], n = 0; n < e.length; ++n)
    e[n] && r.push({ s: n, f: e[n] });
  var s = r.length, i = r.slice();
  if (!s)
    return { t: Z_, l: 0 };
  if (s == 1) {
    var a = new be(r[0].s + 1);
    return a[r[0].s] = 1, { t: a, l: 1 };
  }
  r.sort(function(P, H) {
    return P.f - H.f;
  }), r.push({ s: -1, f: 25001 });
  var o = r[0], u = r[1], A = 0, p = 1, m = 2;
  for (r[0] = { s: -1, f: o.f + u.f, l: o, r: u }; p != s - 1; )
    o = r[r[A].f < r[m].f ? A++ : m++], u = r[A != p && r[A].f < r[m].f ? A++ : m++], r[p++] = { s: -1, f: o.f + u.f, l: o, r: u };
  for (var b = i[0].s, n = 1; n < s; ++n)
    i[n].s > b && (b = i[n].s);
  var S = new Me(b + 1), F = xa(r[p - 1], S, 0);
  if (F > t) {
    var n = 0, R = 0, N = F - t, O = 1 << N;
    for (i.sort(function(H, X) {
      return S[X.s] - S[H.s] || H.f - X.f;
    }); n < s; ++n) {
      var z = i[n].s;
      if (S[z] > t)
        R += O - (1 << F - S[z]), S[z] = t;
      else
        break;
    }
    for (R >>= N; R > 0; ) {
      var M = i[n].s;
      S[M] < t ? R -= 1 << t - S[M]++ - 1 : ++n;
    }
    for (; n >= 0 && R; --n) {
      var U = i[n].s;
      S[U] == t && (--S[U], ++R);
    }
    F = t;
  }
  return { t: new be(S), l: F };
}, xa = function(e, t, r) {
  return e.s == -1 ? Math.max(xa(e.l, t, r + 1), xa(e.r, t, r + 1)) : t[e.s] = r;
}, yc = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var r = new Me(++t), n = 0, s = e[0], i = 1, a = function(u) {
    r[n++] = u;
  }, o = 1; o <= t; ++o)
    if (e[o] == s && o != t)
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
      i = 1, s = e[o];
    }
  return { c: r.subarray(0, n), n: t };
}, Dn = function(e, t) {
  for (var r = 0, n = 0; n < t.length; ++n)
    r += e[n] * t[n];
  return r;
}, X_ = function(e, t, r) {
  var n = r.length, s = _o(t + 2);
  e[s] = n & 255, e[s + 1] = n >> 8, e[s + 2] = e[s] ^ 255, e[s + 3] = e[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    e[s + i + 4] = r[i];
  return (s + 4 + n) * 8;
}, bc = function(e, t, r, n, s, i, a, o, u, A, p) {
  ar(t, p++, r), ++s[256];
  for (var m = Zi(s, 15), b = m.t, S = m.l, F = Zi(i, 15), R = F.t, N = F.l, O = yc(b), z = O.c, M = O.n, U = yc(R), P = U.c, H = U.n, X = new Me(19), V = 0; V < z.length; ++V)
    ++X[z[V] & 31];
  for (var V = 0; V < P.length; ++V)
    ++X[P[V] & 31];
  for (var k = Zi(X, 7), it = k.t, W = k.l, j = 19; j > 4 && !it[va[j - 1]]; --j)
    ;
  var v = A + 5 << 3, d = Dn(s, Fr) + Dn(i, Xn) + a, _ = Dn(s, b) + Dn(i, R) + a + 14 + 3 * j + Dn(X, it) + 2 * X[16] + 3 * X[17] + 7 * X[18];
  if (u >= 0 && v <= d && v <= _)
    return X_(t, p, e.subarray(u, u + A));
  var f, g, y, B;
  if (ar(t, p, 1 + (_ < d)), p += 2, _ < d) {
    f = er(b, S, 0), g = b, y = er(R, N, 0), B = R;
    var T = er(it, W, 0);
    ar(t, p, M - 257), ar(t, p + 5, H - 1), ar(t, p + 10, j - 4), p += 14;
    for (var V = 0; V < j; ++V)
      ar(t, p + 3 * V, it[va[V]]);
    p += 3 * j;
    for (var I = [z, P], l = 0; l < 2; ++l)
      for (var E = I[l], V = 0; V < E.length; ++V) {
        var K = E[V] & 31;
        ar(t, p, T[K]), p += it[K], K > 15 && (ar(t, p, E[V] >> 5 & 127), p += E[V] >> 12);
      }
  } else
    f = tf, g = Fr, y = rf, B = Xn;
  for (var V = 0; V < o; ++V) {
    var $ = n[V];
    if ($ > 255) {
      var K = $ >> 18 & 31;
      Nn(t, p, f[K + 257]), p += g[K + 257], K > 7 && (ar(t, p, $ >> 23 & 31), p += oi[K]);
      var tt = $ & 31;
      Nn(t, p, y[tt]), p += B[tt], tt > 3 && (Nn(t, p, $ >> 5 & 8191), p += ci[tt]);
    } else
      Nn(t, p, f[$]), p += g[$];
  }
  return Nn(t, p, f[256]), p + g[256];
}, of = /* @__PURE__ */ new uo([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Z_ = /* @__PURE__ */ new be(0), cf = function(e, t, r, n, s, i) {
  var a = i.z || e.length, o = new be(n + a + 5 * (1 + Math.ceil(a / 7e3)) + s), u = o.subarray(n, o.length - s), A = i.l, p = (i.r || 0) & 7;
  if (t) {
    p && (u[0] = i.r >> 3);
    for (var m = of[t - 1], b = m >> 13, S = m & 8191, F = (1 << r) - 1, R = i.p || new Me(32768), N = i.h || new Me(F + 1), O = Math.ceil(r / 3), z = 2 * O, M = function(xt) {
      return (e[xt] ^ e[xt + 1] << O ^ e[xt + 2] << z) & F;
    }, U = new uo(25e3), P = new Me(288), H = new Me(32), X = 0, V = 0, k = i.i || 0, it = 0, W = i.w || 0, j = 0; k + 2 < a; ++k) {
      var v = M(k), d = k & 32767, _ = N[v];
      if (R[d] = _, N[v] = d, W <= k) {
        var f = a - k;
        if ((X > 7e3 || it > 24576) && (f > 423 || !A)) {
          p = bc(e, u, 0, U, P, H, V, it, j, k - j, p), it = X = V = 0, j = k;
          for (var g = 0; g < 286; ++g)
            P[g] = 0;
          for (var g = 0; g < 30; ++g)
            H[g] = 0;
        }
        var y = 2, B = 0, T = S, I = d - _ & 32767;
        if (f > 2 && v == M(k - I))
          for (var l = Math.min(b, f) - 1, E = Math.min(32767, k), K = Math.min(258, f); I <= E && --T && d != _; ) {
            if (e[k + y] == e[k + y - I]) {
              for (var $ = 0; $ < K && e[k + $] == e[k + $ - I]; ++$)
                ;
              if ($ > y) {
                if (y = $, B = I, $ > l)
                  break;
                for (var tt = Math.min(I, $ - 2), Bt = 0, g = 0; g < tt; ++g) {
                  var ht = k - I + g & 32767, yt = R[ht], je = ht - yt & 32767;
                  je > Bt && (Bt = je, _ = ht);
                }
              }
            }
            d = _, _ = R[d], I += d - _ & 32767;
          }
        if (B) {
          U[it++] = 268435456 | Ca[y] << 18 | mc[B];
          var bt = Ca[y] & 31, At = mc[B] & 31;
          V += oi[bt] + ci[At], ++P[257 + bt], ++H[At], W = k + y, ++X;
        } else
          U[it++] = e[k], ++P[e[k]];
      }
    }
    for (k = Math.max(k, W); k < a; ++k)
      U[it++] = e[k], ++P[e[k]];
    p = bc(e, u, A, U, P, H, V, it, j, k - j, p), A || (i.r = p & 7 | u[p / 8 | 0] << 3, p -= 7, i.h = N, i.p = R, i.i = k, i.w = W);
  } else {
    for (var k = i.w || 0; k < a + A; k += 65535) {
      var Ee = k + 65535;
      Ee >= a && (u[p / 8 | 0] = A, Ee = a), p = X_(u, p + 1, e.subarray(k, Ee));
    }
    i.i = a;
  }
  return H_(o, 0, n + _o(p) + s);
}, df = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var r = t, n = 9; --n; )
      r = (r & 1 && -306674912) ^ r >>> 1;
    e[t] = r;
  }
  return e;
}(), uf = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var r = e, n = 0; n < t.length; ++n)
        r = df[r & 255 ^ t[n]] ^ r >>> 8;
      e = r;
    },
    d: function() {
      return ~e;
    }
  };
}, _f = function(e, t, r, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), a = new be(i.length + e.length);
    a.set(i), a.set(e, i.length), e = a, s.w = i.length;
  }
  return cf(e, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, r, n, s);
}, Ra = function(e, t, r) {
  for (; r; ++t)
    e[t] = r, r >>>= 8;
}, hf = function(e, t) {
  var r = t.filename;
  if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Ra(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), r) {
    e[3] = 8;
    for (var n = 0; n <= r.length; ++n)
      e[n + 10] = r.charCodeAt(n);
  }
}, lf = function(e) {
  (e[0] != 31 || e[1] != 139 || e[2] != 8) && He(6, "invalid gzip data");
  var t = e[3], r = 10;
  t & 4 && (r += (e[10] | e[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++])
    ;
  return r + (t & 2);
}, Af = function(e) {
  var t = e.length;
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, ff = function(e) {
  return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function pf(e, t) {
  t || (t = {});
  var r = uf(), n = e.length;
  r.p(e);
  var s = _f(e, t, ff(t), 8), i = s.length;
  return hf(s, t), Ra(s, i - 8, r.d()), Ra(s, i - 4, n), s;
}
function gf(e, t) {
  var r = lf(e);
  return r + 8 > e.length && He(6, "invalid gzip data"), af(e.subarray(r, -8), { i: 2 }, new be(Af(e)), t);
}
var wf = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), mf = 0;
try {
  wf.decode(Z_, { stream: !0 }), mf = 1;
} catch {
}
var yf = Object.defineProperty, bf = (e, t, r) => t in e ? yf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, If = (e, t, r) => (bf(e, t + "", r), r), aB = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, W_ = (e, t) => {
  const r = [];
  for (let o = 0; o < e.length; o += t) {
    const u = new Uint8Array(t);
    u.set(e.slice(o, o + t)), r.push(u);
  }
  const n = r[r.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, a = n.slice(0, i);
  return r[r.length - 1] = a, r;
}, Y = (e, t, r = !0) => {
  if (e instanceof Uint8Array)
    return r ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const i = new Uint8Array((e.length - 2) / 2);
    let a = 2;
    for (let o = 0; o < i.length; o++)
      i[o] = parseInt(e.substring(a, a + 2), 16), a += 2;
    return i;
  }
  const s = `invalid data:${t ? ` ${t} -` : ""} ${e}
If you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.`;
  throw new C(D.INVALID_DATA, s);
}, di = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), r = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(r);
  return t.reduce((s, i) => (n.set(i, s), s + i.length), 0), n;
}, at = (e) => {
  const t = e.map((r) => Y(r));
  return di(t);
}, Ic = "0123456789abcdef";
function Z(e) {
  const t = Y(e);
  let r = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    r += Ic[(s & 240) >> 4] + Ic[s & 15];
  }
  return r;
}
var oB = (e) => {
  const r = [
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
  ].reduce((n, s) => s(n), e);
  if (r === "") {
    const n = `The provided string '${e}' results in an empty output after`.concat(
      " normalization, therefore, it can't normalize string."
    );
    throw new C(D.PARSE_FAILED, n);
  }
  return r;
}, Ef = 37, j_ = BigInt(2 ** 62) + BigInt(Ef), vf = (e) => Math.floor(e / 1e3), J_ = (e) => e * 1e3, Cf = (e) => Number(BigInt(e) - j_), Bf = (e) => String(BigInt(e) + j_), xf = (e) => J_(Cf(e)), Es = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Es(xf(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Es(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Es(J_(e));
  }
  /**
   * Hide the constructor to prevent direct instantiation.
   */
  constructor(e) {
    super(e);
  }
  /**
   * Returns the Tai64 timestamp.
   *
   * @returns the Tai64 timestamp
   */
  toTai64() {
    return Bf(this.toUnixSeconds());
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
    return vf(this.getTime());
  }
}, ho = Es;
If(ho, "TAI64_NULL", "");
function Rf(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var Sf = {
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
}, Tf = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, Nf = {
  coins: [],
  messages: [],
  contracts: [],
  blobs: [],
  block_height: 0,
  da_block_height: 0
}, cB = {
  chainConfig: Sf,
  metadata: Tf,
  stateConfig: Nf
}, dB = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function fr(e) {
  return e !== void 0;
}
var q_ = x(0), Sa = x(58), Qs = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", fs = null;
function Df(e) {
  if (fs == null) {
    fs = {};
    for (let r = 0; r < Qs.length; r++)
      fs[Qs[r]] = x(r);
  }
  const t = fs[e];
  if (t == null)
    throw new C(D.INVALID_DATA, `invalid base58 value ${e}`);
  return x(t);
}
function $_(e) {
  const t = Y(e);
  let r = x(t), n = "";
  for (; r.gt(q_); )
    n = Qs[Number(r.mod(Sa))] + n, r = r.div(Sa);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = Qs[0] + n;
  return n;
}
function Qf(e) {
  let t = q_;
  for (let r = 0; r < e.length; r++)
    t = t.mul(Sa), t = t.add(Df(e[r].toString()));
  return t;
}
function lo(e, t, r) {
  const n = Y(e);
  if (r != null && r > n.length)
    throw new C(D.INVALID_DATA, "cannot slice beyond data bounds");
  return Z(n.slice(t ?? 0, r ?? n.length));
}
function gn(e, t = !0) {
  let r = e;
  t && (r = e.normalize("NFC"));
  const n = [];
  for (let s = 0; s < r.length; s += 1) {
    const i = r.charCodeAt(s);
    if (i < 128)
      n.push(i);
    else if (i < 2048)
      n.push(i >> 6 | 192), n.push(i & 63 | 128);
    else if ((i & 64512) === 55296) {
      s += 1;
      const a = r.charCodeAt(s);
      if (s >= r.length || (a & 64512) !== 56320)
        throw new C(
          D.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((i & 1023) << 10) + (a & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(i >> 12 | 224), n.push(i >> 6 & 63 | 128), n.push(i & 63 | 128);
  }
  return new Uint8Array(n);
}
function kr(e, t, r, n, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${r}`), t;
}
function Ff(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function Of(e) {
  const t = Y(e, "bytes"), r = [];
  let n = 0;
  for (; n < t.length; ) {
    const s = t[n++];
    if (!(s >> 7)) {
      r.push(s);
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
      (s & 192) === 128 ? n += kr("UNEXPECTED_CONTINUE", n - 1, t) : n += kr("BAD_PREFIX", n - 1, t);
      continue;
    }
    if (n - 1 + i >= t.length) {
      n += kr("OVERRUN", n - 1, t);
      continue;
    }
    let o = s & (1 << 8 - i - 1) - 1;
    for (let u = 0; u < i; u++) {
      const A = t[n];
      if ((A & 192) !== 128) {
        n += kr("MISSING_CONTINUE", n, t), o = null;
        break;
      }
      o = o << 6 | A & 63, n++;
    }
    if (o !== null) {
      if (o > 1114111) {
        n += kr("OUT_OF_RANGE", n - 1 - i, t);
        continue;
      }
      if (o >= 55296 && o <= 57343) {
        n += kr("UTF16_SURROGATE", n - 1 - i, t);
        continue;
      }
      if (o <= a) {
        n += kr("OVERLONG", n - 1 - i, t);
        continue;
      }
      r.push(o);
    }
  }
  return r;
}
function Ao(e) {
  return Ff(Of(e));
}
var uB = (e) => {
  if (!e)
    return "";
  const t = Y(e), r = pf(t, { mtime: 0 }), n = String.fromCharCode.apply(
    null,
    new Uint8Array(r)
  );
  return btoa(n);
}, Mf = (e) => {
  const t = atob(e), r = new Uint8Array(t.length).map(
    (s, i) => t.charCodeAt(i)
  );
  return gf(r);
};
function Lf(e) {
  throw new Error("Didn't expect to get here");
}
function Oe(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function Pf(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function ns(e, ...t) {
  if (!Pf(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function K_(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Oe(e.outputLen), Oe(e.blockLen);
}
function wn(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function th(e, t) {
  ns(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(`digestInto() expects output buffer of length at least ${r}`);
}
const en = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const vs = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Cs = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), qe = (e, t) => e << 32 - t | e >>> t, wt = (e, t) => e << t | e >>> 32 - t >>> 0, Fs = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, kf = (e) => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
function Os(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = kf(e[t]);
}
function Uf(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function mn(e) {
  return typeof e == "string" && (e = Uf(e)), ns(e), e;
}
function zf(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    ns(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
class fo {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const Gf = {}.toString;
function eh(e, t) {
  if (t !== void 0 && Gf.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function ui(e) {
  const t = (n) => e().update(mn(n)).digest(), r = e();
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
}
function Vf(e = 32) {
  if (en && typeof en.getRandomValues == "function")
    return en.getRandomValues(new Uint8Array(e));
  if (en && typeof en.randomBytes == "function")
    return en.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
function Yf(e, t, r, n) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, r, n);
  const s = BigInt(32), i = BigInt(4294967295), a = Number(r >> s & i), o = Number(r & i), u = n ? 4 : 0, A = n ? 0 : 4;
  e.setUint32(t + u, a, n), e.setUint32(t + A, o, n);
}
const Hf = (e, t, r) => e & t ^ ~e & r, Xf = (e, t, r) => e & t ^ e & r ^ t & r;
class po extends fo {
  constructor(t, r, n, s) {
    super(), this.blockLen = t, this.outputLen = r, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Cs(this.buffer);
  }
  update(t) {
    wn(this);
    const { view: r, buffer: n, blockLen: s } = this;
    t = mn(t);
    const i = t.length;
    for (let a = 0; a < i; ) {
      const o = Math.min(s - this.pos, i - a);
      if (o === s) {
        const u = Cs(t);
        for (; s <= i - a; a += s)
          this.process(u, a);
        continue;
      }
      n.set(t.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === s && (this.process(r, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    wn(this), th(t, this), this.finished = !0;
    const { buffer: r, view: n, blockLen: s, isLE: i } = this;
    let { pos: a } = this;
    r[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(n, 0), a = 0);
    for (let m = a; m < s; m++)
      r[m] = 0;
    Yf(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const o = Cs(t), u = this.outputLen;
    if (u % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const A = u / 4, p = this.get();
    if (A > p.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let m = 0; m < A; m++)
      o.setUint32(4 * m, p[m], i);
  }
  digest() {
    const { buffer: t, outputLen: r } = this;
    this.digestInto(t);
    const n = t.slice(0, r);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: r, buffer: n, length: s, finished: i, destroyed: a, pos: o } = this;
    return t.length = s, t.pos = o, t.finished = i, t.destroyed = a, s % r && t.buffer.set(n), t;
  }
}
const Zf = /* @__PURE__ */ new Uint32Array([
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
]), mr = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), yr = /* @__PURE__ */ new Uint32Array(64);
class Wf extends po {
  constructor() {
    super(64, 32, 8, !1), this.A = mr[0] | 0, this.B = mr[1] | 0, this.C = mr[2] | 0, this.D = mr[3] | 0, this.E = mr[4] | 0, this.F = mr[5] | 0, this.G = mr[6] | 0, this.H = mr[7] | 0;
  }
  get() {
    const { A: t, B: r, C: n, D: s, E: i, F: a, G: o, H: u } = this;
    return [t, r, n, s, i, a, o, u];
  }
  // prettier-ignore
  set(t, r, n, s, i, a, o, u) {
    this.A = t | 0, this.B = r | 0, this.C = n | 0, this.D = s | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = u | 0;
  }
  process(t, r) {
    for (let m = 0; m < 16; m++, r += 4)
      yr[m] = t.getUint32(r, !1);
    for (let m = 16; m < 64; m++) {
      const b = yr[m - 15], S = yr[m - 2], F = qe(b, 7) ^ qe(b, 18) ^ b >>> 3, R = qe(S, 17) ^ qe(S, 19) ^ S >>> 10;
      yr[m] = R + yr[m - 7] + F + yr[m - 16] | 0;
    }
    let { A: n, B: s, C: i, D: a, E: o, F: u, G: A, H: p } = this;
    for (let m = 0; m < 64; m++) {
      const b = qe(o, 6) ^ qe(o, 11) ^ qe(o, 25), S = p + b + Hf(o, u, A) + Zf[m] + yr[m] | 0, R = (qe(n, 2) ^ qe(n, 13) ^ qe(n, 22)) + Xf(n, s, i) | 0;
      p = A, A = u, u = o, o = a + S | 0, a = i, i = s, s = n, n = S + R | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, u = u + this.F | 0, A = A + this.G | 0, p = p + this.H | 0, this.set(n, s, i, a, o, u, A, p);
  }
  roundClean() {
    yr.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Or = /* @__PURE__ */ ui(() => new Wf());
class rh extends fo {
  constructor(t, r) {
    super(), this.finished = !1, this.destroyed = !1, K_(t);
    const n = mn(r);
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
    return wn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    wn(this), ns(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: r, iHash: n, finished: s, destroyed: i, blockLen: a, outputLen: o } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = a, t.outputLen = o, t.oHash = r._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const _i = (e, t, r) => new rh(e, t).update(r).digest();
_i.create = (e, t) => new rh(e, t);
function jf(e, t, r, n) {
  K_(e);
  const s = eh({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: a, asyncTick: o } = s;
  if (Oe(i), Oe(a), Oe(o), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const u = mn(t), A = mn(r), p = new Uint8Array(a), m = _i.create(e, u), b = m._cloneInto().update(A);
  return { c: i, dkLen: a, asyncTick: o, DK: p, PRF: m, PRFSalt: b };
}
function Jf(e, t, r, n, s) {
  return e.destroy(), t.destroy(), n && n.destroy(), s.fill(0), r;
}
function go(e, t, r, n) {
  const { c: s, dkLen: i, DK: a, PRF: o, PRFSalt: u } = jf(e, t, r, n);
  let A;
  const p = new Uint8Array(4), m = Cs(p), b = new Uint8Array(o.outputLen);
  for (let S = 1, F = 0; F < i; S++, F += o.outputLen) {
    const R = a.subarray(F, F + o.outputLen);
    m.setInt32(0, S, !1), (A = u._cloneInto(A)).update(p).digestInto(b), R.set(b.subarray(0, R.length));
    for (let N = 1; N < s; N++) {
      o._cloneInto(A).update(b).digestInto(b);
      for (let O = 0; O < R.length; O++)
        R[O] ^= b[O];
    }
  }
  return Jf(o, u, a, A, b);
}
function Ec(e, t, r, n, s, i) {
  let a = e[t++] ^ r[n++], o = e[t++] ^ r[n++], u = e[t++] ^ r[n++], A = e[t++] ^ r[n++], p = e[t++] ^ r[n++], m = e[t++] ^ r[n++], b = e[t++] ^ r[n++], S = e[t++] ^ r[n++], F = e[t++] ^ r[n++], R = e[t++] ^ r[n++], N = e[t++] ^ r[n++], O = e[t++] ^ r[n++], z = e[t++] ^ r[n++], M = e[t++] ^ r[n++], U = e[t++] ^ r[n++], P = e[t++] ^ r[n++], H = a, X = o, V = u, k = A, it = p, W = m, j = b, v = S, d = F, _ = R, f = N, g = O, y = z, B = M, T = U, I = P;
  for (let l = 0; l < 8; l += 2)
    it ^= wt(H + y | 0, 7), d ^= wt(it + H | 0, 9), y ^= wt(d + it | 0, 13), H ^= wt(y + d | 0, 18), _ ^= wt(W + X | 0, 7), B ^= wt(_ + W | 0, 9), X ^= wt(B + _ | 0, 13), W ^= wt(X + B | 0, 18), T ^= wt(f + j | 0, 7), V ^= wt(T + f | 0, 9), j ^= wt(V + T | 0, 13), f ^= wt(j + V | 0, 18), k ^= wt(I + g | 0, 7), v ^= wt(k + I | 0, 9), g ^= wt(v + k | 0, 13), I ^= wt(g + v | 0, 18), X ^= wt(H + k | 0, 7), V ^= wt(X + H | 0, 9), k ^= wt(V + X | 0, 13), H ^= wt(k + V | 0, 18), j ^= wt(W + it | 0, 7), v ^= wt(j + W | 0, 9), it ^= wt(v + j | 0, 13), W ^= wt(it + v | 0, 18), g ^= wt(f + _ | 0, 7), d ^= wt(g + f | 0, 9), _ ^= wt(d + g | 0, 13), f ^= wt(_ + d | 0, 18), y ^= wt(I + T | 0, 7), B ^= wt(y + I | 0, 9), T ^= wt(B + y | 0, 13), I ^= wt(T + B | 0, 18);
  s[i++] = a + H | 0, s[i++] = o + X | 0, s[i++] = u + V | 0, s[i++] = A + k | 0, s[i++] = p + it | 0, s[i++] = m + W | 0, s[i++] = b + j | 0, s[i++] = S + v | 0, s[i++] = F + d | 0, s[i++] = R + _ | 0, s[i++] = N + f | 0, s[i++] = O + g | 0, s[i++] = z + y | 0, s[i++] = M + B | 0, s[i++] = U + T | 0, s[i++] = P + I | 0;
}
function Wi(e, t, r, n, s) {
  let i = n + 0, a = n + 16 * s;
  for (let o = 0; o < 16; o++)
    r[a + o] = e[t + (2 * s - 1) * 16 + o];
  for (let o = 0; o < s; o++, i += 16, t += 16)
    Ec(r, a, e, t, r, i), o > 0 && (a += 16), Ec(r, i, e, t += 16, r, a);
}
function qf(e, t, r) {
  const n = eh({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, r), { N: s, r: i, p: a, dkLen: o, asyncTick: u, maxmem: A, onProgress: p } = n;
  if (Oe(s), Oe(i), Oe(a), Oe(o), Oe(u), Oe(A), p !== void 0 && typeof p != "function")
    throw new Error("progressCb should be function");
  const m = 128 * i, b = m / 4;
  if (s <= 1 || s & s - 1 || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
  if (a < 0 || a > (2 ** 32 - 1) * 32 / m)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (o < 0 || o > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const S = m * (s + a);
  if (S > A)
    throw new Error(`Scrypt: parameters too large, ${S} (128 * r * (N + p)) > ${A} (maxmem)`);
  const F = go(Or, e, t, { c: 1, dkLen: m * a }), R = vs(F), N = vs(new Uint8Array(m * s)), O = vs(new Uint8Array(m));
  let z = () => {
  };
  if (p) {
    const M = 2 * s * a, U = Math.max(Math.floor(M / 1e4), 1);
    let P = 0;
    z = () => {
      P++, p && (!(P % U) || P === M) && p(P / M);
    };
  }
  return { N: s, r: i, p: a, dkLen: o, blockSize32: b, V: N, B32: R, B: F, tmp: O, blockMixCb: z, asyncTick: u };
}
function $f(e, t, r, n, s) {
  const i = go(Or, e, r, { c: 1, dkLen: t });
  return r.fill(0), n.fill(0), s.fill(0), i;
}
function Kf(e, t, r) {
  const { N: n, r: s, p: i, dkLen: a, blockSize32: o, V: u, B32: A, B: p, tmp: m, blockMixCb: b } = qf(e, t, r);
  Fs || Os(A);
  for (let S = 0; S < i; S++) {
    const F = o * S;
    for (let R = 0; R < o; R++)
      u[R] = A[F + R];
    for (let R = 0, N = 0; R < n - 1; R++)
      Wi(u, N, u, N += o, s), b();
    Wi(u, (n - 1) * o, A, F, s), b();
    for (let R = 0; R < n; R++) {
      const N = A[F + o - 16] % n;
      for (let O = 0; O < o; O++)
        m[O] = A[F + O] ^ u[N * o + O];
      Wi(m, 0, A, F, s), b();
    }
  }
  return Fs || Os(A), $f(e, a, p, u, m);
}
const ps = /* @__PURE__ */ BigInt(2 ** 32 - 1), Ta = /* @__PURE__ */ BigInt(32);
function nh(e, t = !1) {
  return t ? { h: Number(e & ps), l: Number(e >> Ta & ps) } : { h: Number(e >> Ta & ps) | 0, l: Number(e & ps) | 0 };
}
function sh(e, t = !1) {
  let r = new Uint32Array(e.length), n = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: a } = nh(e[s], t);
    [r[s], n[s]] = [i, a];
  }
  return [r, n];
}
const tp = (e, t) => BigInt(e >>> 0) << Ta | BigInt(t >>> 0), ep = (e, t, r) => e >>> r, rp = (e, t, r) => e << 32 - r | t >>> r, np = (e, t, r) => e >>> r | t << 32 - r, sp = (e, t, r) => e << 32 - r | t >>> r, ip = (e, t, r) => e << 64 - r | t >>> r - 32, ap = (e, t, r) => e >>> r - 32 | t << 64 - r, op = (e, t) => t, cp = (e, t) => e, ih = (e, t, r) => e << r | t >>> 32 - r, ah = (e, t, r) => t << r | e >>> 32 - r, oh = (e, t, r) => t << r - 32 | e >>> 64 - r, ch = (e, t, r) => e << r - 32 | t >>> 64 - r;
function dp(e, t, r, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: e + r + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const up = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0), _p = (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0, hp = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), lp = (e, t, r, n, s) => t + r + n + s + (e / 2 ** 32 | 0) | 0, Ap = (e, t, r, n, s) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (s >>> 0), fp = (e, t, r, n, s, i) => t + r + n + s + i + (e / 2 ** 32 | 0) | 0, lt = {
  fromBig: nh,
  split: sh,
  toBig: tp,
  shrSH: ep,
  shrSL: rp,
  rotrSH: np,
  rotrSL: sp,
  rotrBH: ip,
  rotrBL: ap,
  rotr32H: op,
  rotr32L: cp,
  rotlSH: ih,
  rotlSL: ah,
  rotlBH: oh,
  rotlBL: ch,
  add: dp,
  add3L: up,
  add3H: _p,
  add4L: hp,
  add4H: lp,
  add5H: fp,
  add5L: Ap
}, dh = [], uh = [], _h = [], pp = /* @__PURE__ */ BigInt(0), Qn = /* @__PURE__ */ BigInt(1), gp = /* @__PURE__ */ BigInt(2), wp = /* @__PURE__ */ BigInt(7), mp = /* @__PURE__ */ BigInt(256), yp = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = Qn, r = 1, n = 0; e < 24; e++) {
  [r, n] = [n, (2 * r + 3 * n) % 5], dh.push(2 * (5 * n + r)), uh.push((e + 1) * (e + 2) / 2 % 64);
  let s = pp;
  for (let i = 0; i < 7; i++)
    t = (t << Qn ^ (t >> wp) * yp) % mp, t & gp && (s ^= Qn << (Qn << /* @__PURE__ */ BigInt(i)) - Qn);
  _h.push(s);
}
const [bp, Ip] = /* @__PURE__ */ sh(_h, !0), vc = (e, t, r) => r > 32 ? oh(e, t, r) : ih(e, t, r), Cc = (e, t, r) => r > 32 ? ch(e, t, r) : ah(e, t, r);
function Ep(e, t = 24) {
  const r = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let a = 0; a < 10; a++)
      r[a] = e[a] ^ e[a + 10] ^ e[a + 20] ^ e[a + 30] ^ e[a + 40];
    for (let a = 0; a < 10; a += 2) {
      const o = (a + 8) % 10, u = (a + 2) % 10, A = r[u], p = r[u + 1], m = vc(A, p, 1) ^ r[o], b = Cc(A, p, 1) ^ r[o + 1];
      for (let S = 0; S < 50; S += 10)
        e[a + S] ^= m, e[a + S + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let a = 0; a < 24; a++) {
      const o = uh[a], u = vc(s, i, o), A = Cc(s, i, o), p = dh[a];
      s = e[p], i = e[p + 1], e[p] = u, e[p + 1] = A;
    }
    for (let a = 0; a < 50; a += 10) {
      for (let o = 0; o < 10; o++)
        r[o] = e[a + o];
      for (let o = 0; o < 10; o++)
        e[a + o] ^= ~r[(o + 2) % 10] & r[(o + 4) % 10];
    }
    e[0] ^= bp[n], e[1] ^= Ip[n];
  }
  r.fill(0);
}
class wo extends fo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, r, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Oe(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = vs(this.state);
  }
  keccak() {
    Fs || Os(this.state32), Ep(this.state32, this.rounds), Fs || Os(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    wn(this);
    const { blockLen: r, state: n } = this;
    t = mn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const a = Math.min(r - this.pos, s - i);
      for (let o = 0; o < a; o++)
        n[this.pos++] ^= t[i++];
      this.pos === r && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: r, pos: n, blockLen: s } = this;
    t[n] ^= r, r & 128 && n === s - 1 && this.keccak(), t[s - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    wn(this, !1), ns(t), this.finish();
    const r = this.state, { blockLen: n } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= n && this.keccak();
      const a = Math.min(n - this.posOut, i - s);
      t.set(r.subarray(this.posOut, this.posOut + a), s), this.posOut += a, s += a;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Oe(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (th(t, this), this.finished)
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
    const { blockLen: r, suffix: n, outputLen: s, rounds: i, enableXOF: a } = this;
    return t || (t = new wo(r, n, s, a, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = a, t.destroyed = this.destroyed, t;
  }
}
const vp = (e, t, r) => ui(() => new wo(t, e, r)), Cp = /* @__PURE__ */ vp(1, 136, 256 / 8), Bp = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), hh = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((e, t) => t)), xp = /* @__PURE__ */ hh.map((e) => (9 * e + 5) % 16);
let mo = [hh], yo = [xp];
for (let e = 0; e < 4; e++)
  for (let t of [mo, yo])
    t.push(t[e].map((r) => Bp[r]));
const lh = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Rp = /* @__PURE__ */ mo.map((e, t) => e.map((r) => lh[t][r])), Sp = /* @__PURE__ */ yo.map((e, t) => e.map((r) => lh[t][r])), Tp = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), Np = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function Bc(e, t, r, n) {
  return e === 0 ? t ^ r ^ n : e === 1 ? t & r | ~t & n : e === 2 ? (t | ~r) ^ n : e === 3 ? t & n | r & ~n : t ^ (r | ~n);
}
const gs = /* @__PURE__ */ new Uint32Array(16);
class Dp extends po {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: t, h1: r, h2: n, h3: s, h4: i } = this;
    return [t, r, n, s, i];
  }
  set(t, r, n, s, i) {
    this.h0 = t | 0, this.h1 = r | 0, this.h2 = n | 0, this.h3 = s | 0, this.h4 = i | 0;
  }
  process(t, r) {
    for (let S = 0; S < 16; S++, r += 4)
      gs[S] = t.getUint32(r, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, a = i, o = this.h2 | 0, u = o, A = this.h3 | 0, p = A, m = this.h4 | 0, b = m;
    for (let S = 0; S < 5; S++) {
      const F = 4 - S, R = Tp[S], N = Np[S], O = mo[S], z = yo[S], M = Rp[S], U = Sp[S];
      for (let P = 0; P < 16; P++) {
        const H = wt(n + Bc(S, i, o, A) + gs[O[P]] + R, M[P]) + m | 0;
        n = m, m = A, A = wt(o, 10) | 0, o = i, i = H;
      }
      for (let P = 0; P < 16; P++) {
        const H = wt(s + Bc(F, a, u, p) + gs[z[P]] + N, U[P]) + b | 0;
        s = b, b = p, p = wt(u, 10) | 0, u = a, a = H;
      }
    }
    this.set(this.h1 + o + p | 0, this.h2 + A + b | 0, this.h3 + m + s | 0, this.h4 + n + a | 0, this.h0 + i + u | 0);
  }
  roundClean() {
    gs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Qp = /* @__PURE__ */ ui(() => new Dp()), [Fp, Op] = lt.split([
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
].map((e) => BigInt(e))), br = /* @__PURE__ */ new Uint32Array(80), Ir = /* @__PURE__ */ new Uint32Array(80);
class Mp extends po {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: r, Bh: n, Bl: s, Ch: i, Cl: a, Dh: o, Dl: u, Eh: A, El: p, Fh: m, Fl: b, Gh: S, Gl: F, Hh: R, Hl: N } = this;
    return [t, r, n, s, i, a, o, u, A, p, m, b, S, F, R, N];
  }
  // prettier-ignore
  set(t, r, n, s, i, a, o, u, A, p, m, b, S, F, R, N) {
    this.Ah = t | 0, this.Al = r | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = o | 0, this.Dl = u | 0, this.Eh = A | 0, this.El = p | 0, this.Fh = m | 0, this.Fl = b | 0, this.Gh = S | 0, this.Gl = F | 0, this.Hh = R | 0, this.Hl = N | 0;
  }
  process(t, r) {
    for (let M = 0; M < 16; M++, r += 4)
      br[M] = t.getUint32(r), Ir[M] = t.getUint32(r += 4);
    for (let M = 16; M < 80; M++) {
      const U = br[M - 15] | 0, P = Ir[M - 15] | 0, H = lt.rotrSH(U, P, 1) ^ lt.rotrSH(U, P, 8) ^ lt.shrSH(U, P, 7), X = lt.rotrSL(U, P, 1) ^ lt.rotrSL(U, P, 8) ^ lt.shrSL(U, P, 7), V = br[M - 2] | 0, k = Ir[M - 2] | 0, it = lt.rotrSH(V, k, 19) ^ lt.rotrBH(V, k, 61) ^ lt.shrSH(V, k, 6), W = lt.rotrSL(V, k, 19) ^ lt.rotrBL(V, k, 61) ^ lt.shrSL(V, k, 6), j = lt.add4L(X, W, Ir[M - 7], Ir[M - 16]), v = lt.add4H(j, H, it, br[M - 7], br[M - 16]);
      br[M] = v | 0, Ir[M] = j | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: a, Ch: o, Cl: u, Dh: A, Dl: p, Eh: m, El: b, Fh: S, Fl: F, Gh: R, Gl: N, Hh: O, Hl: z } = this;
    for (let M = 0; M < 80; M++) {
      const U = lt.rotrSH(m, b, 14) ^ lt.rotrSH(m, b, 18) ^ lt.rotrBH(m, b, 41), P = lt.rotrSL(m, b, 14) ^ lt.rotrSL(m, b, 18) ^ lt.rotrBL(m, b, 41), H = m & S ^ ~m & R, X = b & F ^ ~b & N, V = lt.add5L(z, P, X, Op[M], Ir[M]), k = lt.add5H(V, O, U, H, Fp[M], br[M]), it = V | 0, W = lt.rotrSH(n, s, 28) ^ lt.rotrBH(n, s, 34) ^ lt.rotrBH(n, s, 39), j = lt.rotrSL(n, s, 28) ^ lt.rotrBL(n, s, 34) ^ lt.rotrBL(n, s, 39), v = n & i ^ n & o ^ i & o, d = s & a ^ s & u ^ a & u;
      O = R | 0, z = N | 0, R = S | 0, N = F | 0, S = m | 0, F = b | 0, { h: m, l: b } = lt.add(A | 0, p | 0, k | 0, it | 0), A = o | 0, p = u | 0, o = i | 0, u = a | 0, i = n | 0, a = s | 0;
      const _ = lt.add3L(it, j, d);
      n = lt.add3H(_, k, W, v), s = _ | 0;
    }
    ({ h: n, l: s } = lt.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: a } = lt.add(this.Bh | 0, this.Bl | 0, i | 0, a | 0), { h: o, l: u } = lt.add(this.Ch | 0, this.Cl | 0, o | 0, u | 0), { h: A, l: p } = lt.add(this.Dh | 0, this.Dl | 0, A | 0, p | 0), { h: m, l: b } = lt.add(this.Eh | 0, this.El | 0, m | 0, b | 0), { h: S, l: F } = lt.add(this.Fh | 0, this.Fl | 0, S | 0, F | 0), { h: R, l: N } = lt.add(this.Gh | 0, this.Gl | 0, R | 0, N | 0), { h: O, l: z } = lt.add(this.Hh | 0, this.Hl | 0, O | 0, z | 0), this.set(n, s, i, a, o, u, A, p, m, b, S, F, R, N, O, z);
  }
  roundClean() {
    br.fill(0), Ir.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Ah = /* @__PURE__ */ ui(() => new Mp());
var Lp = (e) => {
  const { password: t, salt: r, n, p: s, r: i, dklen: a } = e;
  return Kf(t, r, { N: n, r: i, p: s, dkLen: a });
}, Pp = (e) => Cp(e);
function kp(e) {
  const t = Y(e, "data");
  return Qp(t);
}
var ln = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextEncoder().encode(e);
    case "base64": {
      const r = atob(e), n = r.length;
      return new Uint8Array(n).map((i, a) => r.charCodeAt(a));
    }
    case "hex":
    default: {
      const r = e.length / 2;
      return new Uint8Array(r).map((s, i) => {
        const a = i * 2;
        return parseInt(e.substring(a, a + 2), 16);
      });
    }
  }
}, fh = (e, t, r, n, s) => {
  const i = { sha256: Or, sha512: Ah }[s];
  return Z(go(i, e, t, { c: r, dkLen: n }));
}, { crypto: ss, btoa: ph } = globalThis;
if (!ss)
  throw new C(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!ph)
  throw new C(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Na = (e) => ss.getRandomValues(new Uint8Array(e)), Bs = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const r = String.fromCharCode.apply(null, new Uint8Array(e));
      return ph(r);
    }
    case "hex":
    default: {
      let r = "";
      for (let n = 0; n < e.length; n += 1) {
        const s = e[n].toString(16);
        r += s.length === 1 ? `0${s}` : s;
      }
      return r;
    }
  }
}, gh = "AES-CTR", bo = (e, t) => {
  const r = ln(String(e).normalize("NFKC"), "utf-8"), n = fh(r, t, 1e5, 32, "sha256");
  return Y(n);
}, Up = async (e, t) => {
  const r = Na(16), n = Na(32), s = bo(e, n), i = JSON.stringify(t), a = ln(i, "utf-8"), o = {
    name: gh,
    counter: r,
    length: 64
  }, u = await crypto.subtle.importKey("raw", s, o, !1, ["encrypt"]), A = await crypto.subtle.encrypt(o, u, a);
  return {
    data: Bs(new Uint8Array(A)),
    iv: Bs(r),
    salt: Bs(n)
  };
}, zp = async (e, t) => {
  const r = ln(t.iv), n = ln(t.salt), s = bo(e, n), i = ln(t.data), a = {
    name: gh,
    counter: r,
    length: 64
  }, o = await crypto.subtle.importKey("raw", s, a, !1, ["decrypt"]), u = await crypto.subtle.decrypt(a, o, i), A = new TextDecoder().decode(u);
  try {
    return JSON.parse(A);
  } catch {
    throw new C(D.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, Gp = async (e, t, r) => {
  const n = ss.subtle, s = new Uint8Array(t.subarray(0, 16)), i = r, a = e, o = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), u = await n.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    o,
    a
  );
  return new Uint8Array(u);
}, Vp = async (e, t, r) => {
  const n = ss.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(r).buffer, a = new Uint8Array(e).buffer, o = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), u = await n.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    o,
    a
  );
  return new Uint8Array(u);
}, Yp = (e, t, r) => {
  const n = e === "sha256" ? Or : Ah, s = _i.create(n, t).update(r).digest();
  return Z(s);
}, Hp = () => ss.randomUUID(), Xp = {
  bufferFromString: ln,
  stringFromBuffer: Bs,
  decrypt: zp,
  encrypt: Up,
  keyFromPassword: bo,
  randomBytes: Na,
  scrypt: Lp,
  keccak256: Pp,
  decryptJsonWalletData: Vp,
  encryptJsonWalletData: Gp,
  computeHmac: Yp,
  pbkdf2: fh,
  ripemd160: kp,
  randomUUID: Hp
}, Zp = Xp, {
  bufferFromString: Dr,
  decrypt: Wp,
  encrypt: jp,
  keyFromPassword: _B,
  randomBytes: Ue,
  stringFromBuffer: Mn,
  scrypt: wh,
  keccak256: mh,
  decryptJsonWalletData: Jp,
  encryptJsonWalletData: qp,
  pbkdf2: $p,
  computeHmac: yh,
  ripemd160: Kp,
  randomUUID: tg
} = Zp;
function Ce(e) {
  return Z(Or(Y(e)));
}
function ze(e) {
  return Ce(e);
}
function eg(e) {
  const t = BigInt(e), r = new ArrayBuffer(8), n = new DataView(r);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
function rg(e) {
  return ze(Dr(e, "utf-8"));
}
var ng = Object.defineProperty, sg = (e, t, r) => t in e ? ng(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Io = (e, t, r) => (sg(e, t + "", r), r), pt = class {
  constructor(e, t, r) {
    Q(this, "name");
    Q(this, "type");
    Q(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = r;
  }
}, ig = "u8", ag = "u16", og = "u32", cg = "u64", dg = "u256", ug = "raw untyped ptr", _g = "raw untyped slice", hg = "bool", lg = "b256", Ag = "struct std::b512::B512", Ms = "enum std::option::Option", fg = "struct std::vec::Vec", pg = "struct std::bytes::Bytes", gg = "struct std::string::String", wg = "str", is = "()", bh = /^enum (std::option::)?Option$/m, Ih = /^str\[(?<length>[0-9]+)\]/, Da = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Eh = /^struct.+/, vh = /^enum.+$/, mg = /^\((?<items>.*)\)$/, yg = /^generic.+$/, bg = /([^\s]+)$/m, Ls = "1", dt = 8, pr = 32, Ps = pr + 2, Zn = pr, Qa = pr, Ig = pr, Eg = dt * 4, vg = dt * 2, Ch = 2 ** 32 - 1, Bh = ({ maxInputs: e }) => pr + // Tx ID
Zn + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Zn + dt) + dt, xh = dt + // Identifier
dt + // Gas limit
dt + // Script size
dt + // Script data size
dt + // Policies
dt + // Inputs size
dt + // Outputs size
dt + // Witnesses size
pr, hB = dt + // Identifier
Eg + // Utxo Length
dt + // Output Index
Ig + // Owner
dt + // Amount
Zn + // Asset id
vg + // TxPointer
dt + // Witnesses index
dt + // Predicate size
dt + // Predicate data size
dt, xc = (e) => e instanceof Uint8Array, Bn = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const r of t)
    if (r.type === Ms || "coder" in r && r.coder.type === Ms || "coders" in r && Bn(r.coders))
      return !0;
  return !1;
}, Kn, S_, ft = (S_ = class extends pt {
  constructor(t, r) {
    super("array", `[${t.type}; ${r}]`, r * t.encodedLength);
    Q(this, "coder");
    Q(this, "length");
    Ge(this, Kn);
    this.coder = t, this.length = r, Je(this, Kn, Bn([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new C(D.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new C(D.ENCODE_ERROR, "Types/values length mismatch.");
    return at(Array.from(t).map((r) => this.coder.encode(r)));
  }
  decode(t, r) {
    if (!Mt(this, Kn) && t.length < this.encodedLength || t.length > Ch)
      throw new C(D.DECODE_ERROR, "Invalid array data size.");
    let n = r;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, n] = this.coder.decode(t, n), i;
    }), n];
  }
}, Kn = new WeakMap(), S_), st = class extends pt {
  constructor() {
    super("b256", "b256", dt * 4);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
    } catch {
      throw new C(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new C(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid b256 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (x(r).isZero() && (r = new Uint8Array(32)), r.length !== this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid b256 byte data size.");
    return [co(r, 32), t + 32];
  }
}, Cg = class extends pt {
  constructor() {
    super("b512", "struct B512", dt * 8);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
    } catch {
      throw new C(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new C(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid b512 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (x(r).isZero() && (r = new Uint8Array(64)), r.length !== this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid b512 byte data size.");
    return [co(r, this.encodedLength), t + this.encodedLength];
  }
}, Bg = {
  u64: dt,
  u256: dt * 4
}, rt = class extends pt {
  constructor(e) {
    super("bigNumber", e, Bg[e]);
  }
  encode(e) {
    let t;
    if (typeof e == "number" && e > Number.MAX_SAFE_INTEGER)
      throw new C(
        D.ENCODE_ERROR,
        `Invalid ${this.type} type - number value is too large. Number can only safely handle up to 53 bits.`
      );
    try {
      t = lr(e, this.encodedLength);
    } catch {
      throw new C(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let r = e.slice(t, t + this.encodedLength);
    if (r = r.slice(0, this.encodedLength), r.length !== this.encodedLength)
      throw new C(D.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [x(r), t + this.encodedLength];
  }
}, xg = class extends pt {
  constructor(t = {
    padToWordSize: !1
  }) {
    const r = t.padToWordSize ? dt : 1;
    super("boolean", "boolean", r);
    Q(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new C(D.ENCODE_ERROR, "Invalid boolean value.");
    return lr(t ? 1 : 0, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid boolean data size.");
    const n = x(t.slice(r, r + this.encodedLength));
    if (n.isZero())
      return [!1, r + this.encodedLength];
    if (!n.eq(x(1)))
      throw new C(D.DECODE_ERROR, "Invalid boolean value.");
    return [!0, r + this.encodedLength];
  }
}, Rh = class extends pt {
  constructor() {
    super("struct", "struct Bytes", dt);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), r = new rt("u64").encode(t.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < dt)
      throw new C(D.DECODE_ERROR, "Invalid byte data size.");
    const r = t + dt, n = e.slice(t, r), s = x(new rt("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new C(D.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, r + s];
  }
};
Io(Rh, "memorySize", 1);
var Wr, ts, fn, Lr, Th, Nh, Dh, T_, Sh = (T_ = class extends pt {
  constructor(t, r) {
    const n = new rt("u64"), s = Object.values(r).reduce(
      (i, a) => Math.min(i, a.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, n.encodedLength + s);
    Ge(this, Lr);
    Q(this, "name");
    Q(this, "coders");
    Ge(this, Wr);
    Ge(this, ts);
    Ge(this, fn);
    this.name = t, this.coders = r, Je(this, Wr, n), Je(this, ts, s), Je(this, fn, !(bh.test(this.type) || Bn(r)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return ls(this, Lr, Nh).call(this, t);
    const [r, ...n] = Object.keys(t);
    if (!r)
      throw new C(D.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (n.length !== 0)
      throw new C(D.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[r], i = Object.keys(this.coders).indexOf(r);
    if (i === -1) {
      const o = Object.keys(this.coders).map((u) => `'${u}'`).join(", ");
      throw new C(
        D.INVALID_DECODE_VALUE,
        `Invalid case '${r}'. Valid cases: ${o}.`
      );
    }
    const a = s.encode(t[r]);
    return new Uint8Array([...Mt(this, Wr).encode(i), ...a]);
  }
  decode(t, r) {
    if (Mt(this, fn) && t.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid enum data size.");
    const n = new rt("u64").decode(t, r)[0], s = xr(n), i = Object.keys(this.coders)[s];
    if (!i)
      throw new C(
        D.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const a = this.coders[i], o = r + Mt(this, Wr).encodedLength;
    if (Mt(this, fn) && t.length < o + a.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid enum data size.");
    const [u, A] = a.decode(t, o);
    return ls(this, Lr, Th).call(this, this.coders[i]) ? ls(this, Lr, Dh).call(this, i, A) : [{ [i]: u }, A];
  }
}, Wr = new WeakMap(), ts = new WeakMap(), fn = new WeakMap(), Lr = new WeakSet(), // Checks that we're handling a native enum that is of type void.
Th = function(t) {
  return this.type !== Ms && t.type === is;
}, Nh = function(t) {
  const r = this.coders[t], n = r.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Mt(this, ts) - r.encodedLength);
  return at([Mt(this, Wr).encode(s), i, n]);
}, Dh = function(t, r) {
  return [t, r];
}, T_), Rg = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new C(D.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, J = class extends pt {
  constructor(t, r = {
    padToWordSize: !1
  }) {
    const n = r.padToWordSize ? dt : Rg(t);
    super("number", t, n);
    Q(this, "baseType");
    Q(this, "options");
    this.baseType = t, this.options = r;
  }
  encode(t) {
    let r;
    try {
      r = lr(t);
    } catch {
      throw new C(D.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (r.length > this.encodedLength)
      throw new C(D.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return lr(r, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid number data size.");
    const n = t.slice(r, r + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid number byte data size.");
    return [xr(n), r + this.encodedLength];
  }
}, Qh = class extends Sh {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    const [r, n] = super.decode(e, t);
    return [this.toOption(r), n];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, Sg = class extends pt {
  constructor() {
    super("raw untyped slice", "raw untyped slice", dt);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new C(D.ENCODE_ERROR, "Expected array value.");
    const r = new ft(new J("u8"), e.length).encode(e), n = new rt("u64").encode(r.length);
    return new Uint8Array([...n, ...r]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid raw slice data size.");
    const r = t + dt, n = e.slice(t, r), s = x(new rt("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new C(D.DECODE_ERROR, "Invalid raw slice byte data size.");
    const a = new ft(new J("u8"), s), [o] = a.decode(i, 0);
    return [o, r + s];
  }
}, Eo = class extends pt {
  constructor() {
    super("struct", "struct String", dt);
  }
  encode(e) {
    const t = gn(e), r = new rt("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid std string data size.");
    const r = t + dt, n = e.slice(t, r), s = x(new rt("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new C(D.DECODE_ERROR, "Invalid std string byte data size.");
    return [Ao(i), r + s];
  }
};
Io(Eo, "memorySize", 1);
var Fh = class extends pt {
  constructor() {
    super("strSlice", "str", dt);
  }
  encode(e) {
    const t = gn(e), r = new rt("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid string slice data size.");
    const r = t + dt, n = e.slice(t, r), s = x(new rt("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new C(D.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Ao(i), r + s];
  }
};
Io(Fh, "memorySize", 1);
var Tg = class extends pt {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new C(D.ENCODE_ERROR, "Value length mismatch during encode.");
    return gn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid string data size.");
    const r = e.slice(t, t + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid string byte data size.");
    return [Ao(r), t + this.encodedLength];
  }
}, es, N_, hi = (N_ = class extends pt {
  constructor(t, r) {
    const n = Object.values(r).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, n);
    Q(this, "name");
    Q(this, "coders");
    Ge(this, es);
    this.name = t, this.coders = r, Je(this, es, Bn(r));
  }
  encode(t) {
    return di(
      Object.keys(this.coders).map((r) => {
        const n = this.coders[r], s = t[r];
        if (!(n instanceof Qh) && s == null)
          throw new C(
            D.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${r}" not present.`
          );
        return n.encode(s);
      })
    );
  }
  decode(t, r) {
    if (!Mt(this, es) && t.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid struct data size.");
    let n = r;
    return [Object.keys(this.coders).reduce((i, a) => {
      const o = this.coders[a];
      let u;
      return [u, n] = o.decode(t, n), i[a] = u, i;
    }, {}), n];
  }
}, es = new WeakMap(), N_), rs, D_, Oh = (D_ = class extends pt {
  constructor(t) {
    const r = t.reduce((n, s) => n + s.encodedLength, 0);
    super("tuple", `(${t.map((n) => n.type).join(", ")})`, r);
    Q(this, "coders");
    Ge(this, rs);
    this.coders = t, Je(this, rs, Bn(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new C(D.ENCODE_ERROR, "Types/values length mismatch.");
    return di(this.coders.map((r, n) => r.encode(t[n])));
  }
  decode(t, r) {
    if (!Mt(this, rs) && t.length < this.encodedLength)
      throw new C(D.DECODE_ERROR, "Invalid tuple data size.");
    let n = r;
    return [this.coders.map((i) => {
      let a;
      return [a, n] = i.decode(t, n), a;
    }), n];
  }
}, rs = new WeakMap(), D_), pn, Q_, Ng = (Q_ = class extends pt {
  constructor(t) {
    super("struct", "struct Vec", dt);
    Q(this, "coder");
    Ge(this, pn);
    this.coder = t, Je(this, pn, Bn([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !xc(t))
      throw new C(
        D.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const r = new rt("u64");
    if (xc(t))
      return new Uint8Array([...r.encode(t.length), ...t]);
    const n = t.map((i) => this.coder.encode(i)), s = r.encode(t.length);
    return new Uint8Array([...s, ...di(n)]);
  }
  decode(t, r) {
    if (!Mt(this, pn) && t.length < this.encodedLength || t.length > Ch)
      throw new C(D.DECODE_ERROR, "Invalid vec data size.");
    const n = r + dt, s = t.slice(r, n), i = x(new rt("u64").decode(s, 0)[0]).toNumber(), a = i * this.coder.encodedLength, o = t.slice(n, n + a);
    if (!Mt(this, pn) && o.length !== a)
      throw new C(D.DECODE_ERROR, "Invalid vec byte data size.");
    let u = n;
    const A = [];
    for (let p = 0; p < i; p++) {
      const [m, b] = this.coder.decode(t, u);
      A.push(m), u = b;
    }
    return [A, u];
  }
}, pn = new WeakMap(), Q_), Mh = (e) => {
  switch (e) {
    case void 0:
    case Ls:
      return Ls;
    default:
      throw new C(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Vn = (e, t) => {
  const r = e.types.find((n) => n.typeId === t);
  if (!r)
    throw new C(
      D.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return r;
}, Dg = (e, t) => t.filter((r) => Vn(e, r.type).type !== is), Qg = (e) => {
  var n;
  const t = e.find((s) => s.name === "buf"), r = (n = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : n[0];
  if (!t || !r)
    throw new C(
      D.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return r;
}, Rr = class {
  constructor(e, t) {
    Q(this, "abi");
    Q(this, "name");
    Q(this, "type");
    Q(this, "originalTypeArguments");
    Q(this, "components");
    this.abi = e, this.name = t.name;
    const r = Vn(e, t.type);
    if (r.type.length > 256)
      throw new C(
        D.INVALID_COMPONENT,
        `The provided ABI type is too long: ${r.type}.`
      );
    this.type = r.type, this.originalTypeArguments = t.typeArguments, this.components = Rr.getResolvedGenericComponents(
      e,
      t,
      r.components,
      r.typeParameters ?? Rr.getImplicitGenericTypeParameters(e, r.components)
    );
  }
  static getResolvedGenericComponents(e, t, r, n) {
    if (r === null)
      return null;
    if (n === null || n.length === 0)
      return r.map((a) => new Rr(e, a));
    const s = n.reduce(
      (a, o, u) => {
        var p;
        const A = { ...a };
        return A[o] = structuredClone(
          (p = t.typeArguments) == null ? void 0 : p[u]
        ), A;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      r,
      s
    ).map((a) => new Rr(e, a));
  }
  static resolveGenericArgTypes(e, t, r) {
    return t.map((n) => {
      if (r[n.type] !== void 0)
        return {
          ...r[n.type],
          name: n.name
        };
      if (n.typeArguments)
        return {
          ...structuredClone(n),
          typeArguments: this.resolveGenericArgTypes(
            e,
            n.typeArguments,
            r
          )
        };
      const s = Vn(e, n.type), i = this.getImplicitGenericTypeParameters(e, s.components);
      return i && i.length > 0 ? {
        ...structuredClone(n),
        typeArguments: i.map((a) => r[a])
      } : n;
    });
  }
  static getImplicitGenericTypeParameters(e, t, r) {
    if (!Array.isArray(t))
      return null;
    const n = r ?? [];
    return t.forEach((s) => {
      const i = Vn(e, s.type);
      if (yg.test(i.type)) {
        n.push(i.typeId);
        return;
      }
      Array.isArray(s.typeArguments) && this.getImplicitGenericTypeParameters(e, s.typeArguments, n);
    }), n.length > 0 ? n : null;
  }
  getSignature() {
    const e = this.getArgSignaturePrefix(), t = this.getArgSignatureContent();
    return `${e}${t}`;
  }
  getArgSignaturePrefix() {
    return Eh.test(this.type) ? "s" : Da.test(this.type) ? "a" : vh.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Ih.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Da.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const r = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((a) => new Rr(this.abi, a).getSignature()).join(",")}>` : "", n = `(${this.components.map((a) => a.getSignature()).join(",")})`;
    return `${r}${n}`;
  }
}, Fg = class extends pt {
  constructor() {
    super("void", is, 0);
  }
  encode(e) {
    return new Uint8Array([]);
  }
  decode(e, t) {
    return [void 0, t];
  }
};
function Rc(e, t) {
  const { getCoder: r } = t;
  return e.reduce((n, s) => {
    const i = n;
    return i[s.name] = r(s, t), i;
  }, {});
}
var an = (e, t) => {
  var A, p, m, b;
  switch (e.type) {
    case ig:
    case ag:
    case og:
      return new J(e.type);
    case cg:
    case ug:
      return new rt("u64");
    case dg:
      return new rt("u256");
    case _g:
      return new Sg();
    case hg:
      return new xg();
    case lg:
      return new st();
    case Ag:
      return new Cg();
    case pg:
      return new Rh();
    case gg:
      return new Eo();
    case wg:
      return new Fh();
    case is:
      return new Fg();
  }
  const r = (A = Ih.exec(e.type)) == null ? void 0 : A.groups;
  if (r) {
    const S = parseInt(r.length, 10);
    return new Tg(S);
  }
  const n = e.components, s = (p = Da.exec(e.type)) == null ? void 0 : p.groups;
  if (s) {
    const S = parseInt(s.length, 10), F = n[0];
    if (!F)
      throw new C(
        D.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const R = an(F);
    return new ft(R, S);
  }
  if (e.type === fg) {
    const S = Qg(n), F = new Rr(e.abi, S), R = an(F);
    return new Ng(R);
  }
  const i = (m = e.type.match(bg)) == null ? void 0 : m[0];
  if (Eh.test(e.type) && i) {
    const S = Rc(n, { getCoder: an });
    return new hi(i, S);
  }
  if (vh.test(e.type) && i) {
    const S = Rc(n, { getCoder: an });
    return e.type === Ms ? new Qh(i, S) : new Sh(i, S);
  }
  if ((b = mg.exec(e.type)) == null ? void 0 : b.groups) {
    const S = n.map((F) => an(F));
    return new Oh(S);
  }
  throw new C(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function Og(e = Ls) {
  switch (e) {
    case Ls:
      return an;
    default:
      throw new C(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Hr = class {
  static getCoder(e, t, r = {
    padToWordSize: !1
  }) {
    const n = new Rr(e, t);
    return Og(r.encoding)(n, r);
  }
  static encode(e, t, r, n) {
    return this.getCoder(e, t, n).encode(r);
  }
  static decode(e, t, r, n, s) {
    return this.getCoder(e, t, s).decode(r, n);
  }
}, Mg = (e) => {
  const { jsonAbi: t, inputs: r } = e;
  let n = !1;
  return r.reduceRight((s, i) => {
    const a = Vn(t, i.type);
    return n = n || a.type !== is && !bh.test(a.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, Lg = (e, t) => {
  if (e.length >= t.length)
    return e;
  const r = e.slice();
  return r.length = t.length, r.fill(void 0, e.length), r;
}, Fa = class {
  constructor(e, t) {
    Q(this, "signature");
    Q(this, "selector");
    Q(this, "selectorBytes");
    Q(this, "encoding");
    Q(this, "name");
    Q(this, "jsonFn");
    Q(this, "attributes");
    Q(this, "jsonAbiOld");
    Q(this, "jsonFnOld");
    this.jsonFn = t, this.jsonAbiOld = e, this.jsonFnOld = e.functions.find((r) => r.name === t.name), this.name = t.name, this.signature = Fa.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = Fa.getFunctionSelector(this.signature), this.selectorBytes = new Eo().encode(this.name), this.encoding = Mh(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const r = t.inputs.map(
      (n) => new Rr(e, n).getSignature()
    );
    return `${t.name}(${r.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Ce(Dr(e, "utf-8"));
    return x(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    const r = Mg({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((i) => !i.isOptional).length;
    if (e.length < r)
      throw new C(
        D.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${r} arguments, received ${e.length}`
      );
    const n = this.jsonFnOld.inputs.map(
      (i) => Hr.getCoder(this.jsonAbiOld, i, {
        encoding: this.encoding
      })
    ), s = Lg(e, this.jsonFn.inputs);
    return new Oh(n).encode(s);
  }
  decodeArguments(e) {
    const t = Y(e), r = Dg(this.jsonAbiOld, this.jsonFnOld.inputs);
    if (r.length === 0) {
      if (t.length === 0)
        return;
      throw new C(
        D.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonVoidInputs: r.length,
            values: t.length
          },
          value: {
            args: this.jsonFn.inputs,
            nonVoidInputs: r,
            values: t
          }
        })}`
      );
    }
    return this.jsonFnOld.inputs.reduce(
      (s, i) => {
        const a = Hr.getCoder(this.jsonAbiOld, i, { encoding: this.encoding }), [o, u] = a.decode(t, s.offset);
        return {
          decoded: [...s.decoded, o],
          offset: s.offset + u
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    const t = Y(e);
    return Hr.getCoder(this.jsonAbiOld, this.jsonFnOld.output, {
      encoding: this.encoding
    }).decode(t, 0);
  }
  /**
   * Checks if the function is read-only i.e. it only reads from storage, does not write to it.
   *
   * @returns True if the function is read-only or pure, false otherwise.
   */
  isReadOnly() {
    var t;
    const e = this.attributes.find((r) => r.name === "storage");
    return !((t = e == null ? void 0 : e.arguments) != null && t.includes("write"));
  }
}, Pg = (e, t) => e.find((r) => r.concreteTypeId === t), vo = (e, t) => e.concreteTypes.find((r) => r.concreteTypeId === t);
function Co(e, t, r) {
  const n = vo(e, r);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = Pg(t, r);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: Bo(n.components),
    concreteTypeId: r,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
function Lh(e, t, r) {
  var n;
  return ((n = r.typeArguments) == null ? void 0 : n.map((s) => {
    const i = vo(e, s);
    return {
      name: "",
      type: isNaN(s) ? Co(e, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: Lh(e, t, i)
    };
  })) ?? null;
}
function cn(e, t, r, n) {
  const s = Co(e, t, r), i = vo(e, r);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: Lh(e, t, i)
  };
}
function Bo(e, t, r) {
  return (r == null ? void 0 : r.map((n) => {
    const { typeId: s, name: i, typeArguments: a } = n, o = isNaN(s) ? Co(e, t, s) : s;
    return {
      name: i,
      type: o,
      // originalTypeId: typeId,
      typeArguments: Bo(e, t, a)
    };
  })) ?? null;
}
function kg(e) {
  if (!e.specVersion)
    return e;
  const t = [];
  e.metadataTypes.forEach((a) => {
    const o = {
      typeId: a.metadataTypeId,
      type: a.type,
      components: a.components ?? (a.type === "()" ? [] : null),
      typeParameters: a.typeParameters ?? null
    };
    t.push(o);
  }), t.forEach((a) => {
    a.components = Bo(e, t, a.components);
  });
  const r = e.functions.map((a) => {
    const o = a.inputs.map(
      ({ concreteTypeId: A, name: p }) => cn(e, t, A, p)
    ), u = cn(e, t, a.output, "");
    return { ...a, inputs: o, output: u };
  }), n = e.configurables.map((a) => ({
    name: a.name,
    configurableType: cn(e, t, a.concreteTypeId),
    offset: a.offset
  })), s = e.loggedTypes.map((a) => ({
    logId: a.logId,
    loggedType: cn(e, t, a.concreteTypeId)
  }));
  return {
    encoding: e.encodingVersion,
    types: t,
    functions: r,
    loggedTypes: s,
    messagesTypes: e.messagesTypes,
    configurables: n
  };
}
var gr = class {
  constructor(e) {
    Q(this, "functions");
    Q(this, "configurables");
    Q(this, "jsonAbi");
    Q(this, "encoding");
    Q(this, "jsonAbiOld");
    this.jsonAbi = e, this.encoding = Mh(e.encodingVersion), this.jsonAbiOld = kg(e), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new Fa(this.jsonAbiOld, t)])
    ), this.configurables = Object.fromEntries(this.jsonAbi.configurables.map((t) => [t.name, t]));
  }
  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(e) {
    const t = Object.values(this.functions).find(
      (r) => r.name === e || r.signature === e || r.selector === e
    );
    if (t !== void 0)
      return t;
    throw new C(
      D.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t) {
    const r = this.jsonAbiOld.loggedTypes.find((n) => n.logId === t);
    if (!r)
      throw new C(
        D.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Hr.decode(this.jsonAbiOld, r.loggedType, Y(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const r = this.jsonAbiOld.configurables.find((n) => n.name === e);
    if (!r)
      throw new C(
        D.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Hr.encode(this.jsonAbiOld, r.configurableType, t, {
      encoding: this.encoding
    });
  }
  encodeType(e, t) {
    const r = cn(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Hr.encode(this.jsonAbiOld, r, t, {
      encoding: this.encoding
    });
  }
  decodeType(e, t) {
    const r = cn(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Hr.decode(this.jsonAbiOld, r, t, 0, { encoding: this.encoding });
  }
};
function Ln(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Sc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Oa(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function Ug(e) {
  return e.toLowerCase();
}
function ji(e) {
  return "b256Address" in e;
}
var Pn = (e) => {
  if (ji(e))
    return e;
  if ("address" in e && ji(e.address))
    return e.address;
  if ("id" in e && ji(e.id))
    return e.id;
  throw new C(C.CODES.INVALID_ADDRESS, "Invalid address");
}, zg = () => Z(Ue(32)), Gg = (e) => {
  try {
    if (!Ln(e))
      throw new C(C.CODES.INVALID_B256_ADDRESS, `Invalid B256 Address: ${e}.`);
    const t = Y(e).slice(12), r = new Uint8Array(12).fill(0);
    return Z(at([r, t]));
  } catch {
    throw new C(
      C.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
}, Vg = (e) => {
  if (!Oa(e))
    throw new C(C.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, ct = class {
  // #endregion address-2
  /**
   * @param address - A B256 address
   */
  constructor(e) {
    // #region address-2
    Q(this, "b256Address");
    if (!Ln(e))
      throw new C(
        C.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${e}.`
      );
    this.b256Address = Ug(e);
  }
  /**
   * Takes an B256 Address and returns back an checksum address.
   * The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.
   *
   * @returns A new `ChecksumAddress` instance
   */
  toChecksum() {
    return ct.toChecksum(this.b256Address);
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
    return Y(this.b256Address);
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
      bits: Gg(this.b256Address)
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
  equals(e) {
    return this.toChecksum() === e.toChecksum();
  }
  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   */
  static fromPublicKey(e) {
    if (!Sc(e))
      throw new C(C.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${e}.`);
    const t = Z(Or(Y(e)));
    return new ct(t);
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(e) {
    if (!Ln(e))
      throw new C(
        C.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${e}.`
      );
    return new ct(e);
  }
  /**
   * Creates an `Address` with a randomized `b256Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(zg());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(e) {
    return this.fromB256(e);
  }
  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   */
  static fromAddressOrString(e) {
    return typeof e == "string" ? this.fromString(e) : e;
  }
  /**
   * Takes a dynamic string or `Address` and creates an `Address`
   *
   * @param addressId - A string containing B256, or Public Key
   * @throws Error - Unknown address if the format is not recognised
   * @returns A new `Address` instance
   */
  static fromDynamicInput(e) {
    if (typeof e != "string" && "toB256" in e)
      return ct.fromB256(e.toB256());
    if (Sc(e))
      return ct.fromPublicKey(e);
    if (Ln(e))
      return ct.fromB256(e);
    if (Oa(e))
      return ct.fromEvmAddress(e);
    throw new C(
      C.CODES.PARSE_FAILED,
      "Unknown address format: only 'B256', or 'Public Key (512)' are supported."
    );
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   */
  static fromEvmAddress(e) {
    if (!Oa(e))
      throw new C(
        C.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${e}.`
      );
    const t = Vg(e);
    return new ct(t);
  }
  /**
   * Takes an ChecksumAddress and validates if it is a valid checksum address.
   *
   * @returns A `boolean` instance indicating if the address is valid.
   */
  static isChecksumValid(e) {
    let t = e;
    return e.startsWith("0x") || (t = `0x${e}`), t.trim().length !== 66 ? !1 : ct.toChecksum(Z(t)) === t;
  }
  /** @hidden */
  static toChecksum(e) {
    if (!Ln(e))
      throw new C(
        C.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${e}.`
      );
    const t = Z(e).toLowerCase().slice(2), r = Or(t);
    let n = "0x";
    for (let s = 0; s < 32; ++s) {
      const i = r[s], a = t.charAt(s * 2), o = t.charAt(s * 2 + 1);
      n += (i & 240) >= 128 ? a.toUpperCase() : a, n += (i & 15) >= 8 ? o.toUpperCase() : o;
    }
    return n;
  }
}, Nr, F_, Rt = (F_ = class extends pt {
  constructor(t) {
    const r = (8 - t % 8) % 8, n = t + r;
    super(
      "ByteArray",
      // While this might sound like a [u8; N] coder it's actually not.
      // A [u8; N] coder would pad every u8 to 8 bytes which would
      // make every u8 have the same size as a u64.
      // We are packing four u8s into u64s here, avoiding this padding.
      `[u64; ${n / 4}]`,
      n
    );
    Q(this, "length");
    Ge(this, Nr);
    this.length = t, Je(this, Nr, r);
  }
  encode(t) {
    const r = [], n = Y(t);
    return r.push(n), Mt(this, Nr) && r.push(new Uint8Array(Mt(this, Nr))), at(r);
  }
  decode(t, r) {
    let n, s = r;
    [n, s] = [Z(t.slice(s, s + this.length)), s + this.length];
    const i = n;
    return Mt(this, Nr) && ([n, s] = [null, s + Mt(this, Nr)]), [i, s];
  }
}, Nr = new WeakMap(), F_), qr = class extends hi {
  constructor() {
    super("TxPointer", {
      blockHeight: new J("u32", { padToWordSize: !0 }),
      txIndex: new J("u16", { padToWordSize: !0 })
    });
  }
  static decodeFromGqlScalar(e) {
    if (e.length !== 12)
      throw new C(
        D.DECODE_ERROR,
        `Invalid TxPointer scalar string length ${e.length}. It must have length 12.`
      );
    const [t, r] = [e.substring(0, 8), e.substring(8)];
    return {
      blockHeight: parseInt(t, 16),
      txIndex: parseInt(r, 16)
    };
  }
}, It = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(It || {}), Tc = class extends pt {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new st().encode(e.txID)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new st().encode(e.owner)), t.push(new rt("u64").encode(e.amount)), t.push(new st().encode(e.assetId)), t.push(new qr().encode(e.txPointer)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new rt("u64").encode(e.predicateGasUsed)), t.push(new rt("u64").encode(e.predicateLength)), t.push(new rt("u64").encode(e.predicateDataLength)), t.push(new Rt(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Rt(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new st().decode(e, n);
    const a = r;
    [r, n] = new rt("u64").decode(e, n);
    const o = r;
    [r, n] = new st().decode(e, n);
    const u = r;
    [r, n] = new qr().decode(e, n);
    const A = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const p = Number(r);
    [r, n] = new rt("u64").decode(e, n);
    const m = r;
    [r, n] = new rt("u64").decode(e, n);
    const b = r;
    [r, n] = new rt("u64").decode(e, n);
    const S = r;
    [r, n] = new Rt(b.toNumber()).decode(e, n);
    const F = r;
    return [r, n] = new Rt(S.toNumber()).decode(e, n), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: a,
        amount: o,
        assetId: u,
        txPointer: A,
        witnessIndex: p,
        predicateGasUsed: m,
        predicateLength: b,
        predicateDataLength: S,
        predicate: F,
        predicateData: r
      },
      n
    ];
  }
}, ks = class extends pt {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new st().encode(e.txID)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new st().encode(e.balanceRoot)), t.push(new st().encode(e.stateRoot)), t.push(new qr().encode(e.txPointer)), t.push(new st().encode(e.contractID)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new st().decode(e, n);
    const a = r;
    [r, n] = new st().decode(e, n);
    const o = r;
    [r, n] = new qr().decode(e, n);
    const u = r;
    return [r, n] = new st().decode(e, n), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: a,
        stateRoot: o,
        txPointer: u,
        contractID: r
      },
      n
    ];
  }
}, Qr = class extends pt {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Rt(32).encode(e.sender)), t.push(new Rt(32).encode(e.recipient)), t.push(new Rt(32).encode(e.nonce)), t.push(new rt("u64").encode(e.amount)), t.push(Y(e.data || "0x")), Ce(at(t));
  }
  static encodeData(e) {
    const t = Y(e || "0x"), r = t.length;
    return new Rt(r).encode(t);
  }
  encode(e) {
    const t = [], r = Qr.encodeData(e.data);
    return t.push(new Rt(32).encode(e.sender)), t.push(new Rt(32).encode(e.recipient)), t.push(new rt("u64").encode(e.amount)), t.push(new Rt(32).encode(e.nonce)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new rt("u64").encode(e.predicateGasUsed)), t.push(new rt("u64").encode(r.length)), t.push(new rt("u64").encode(e.predicateLength)), t.push(new rt("u64").encode(e.predicateDataLength)), t.push(new Rt(r.length).encode(r)), t.push(new Rt(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Rt(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), at(t);
  }
  static decodeData(e) {
    const t = Y(e), r = t.length, [n] = new Rt(r).decode(t, 0);
    return Y(n);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    [r, n] = new st().decode(e, n);
    const i = r;
    [r, n] = new rt("u64").decode(e, n);
    const a = r;
    [r, n] = new st().decode(e, n);
    const o = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = Number(r);
    [r, n] = new rt("u64").decode(e, n);
    const A = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const p = r;
    [r, n] = new rt("u64").decode(e, n);
    const m = r;
    [r, n] = new rt("u64").decode(e, n);
    const b = r;
    [r, n] = new Rt(p).decode(e, n);
    const S = r;
    [r, n] = new Rt(m.toNumber()).decode(e, n);
    const F = r;
    return [r, n] = new Rt(b.toNumber()).decode(e, n), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: a,
        witnessIndex: u,
        nonce: o,
        predicateGasUsed: A,
        dataLength: p,
        predicateLength: m,
        predicateDataLength: b,
        data: S,
        predicate: F,
        predicateData: r
      },
      n
    ];
  }
}, rr = class extends pt {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new J("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new Tc().encode(e));
        break;
      }
      case 1: {
        t.push(new ks().encode(e));
        break;
      }
      case 2: {
        t.push(new Qr().encode(e));
        break;
      }
      default:
        throw new C(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${r}.`
        );
    }
    return at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Tc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new ks().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Qr().decode(e, n), [r, n];
      default:
        throw new C(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, mt = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(mt || {}), Nc = class extends pt {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new st().encode(e.to)), t.push(new rt("u64").encode(e.amount)), t.push(new st().encode(e.assetId)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    [r, n] = new rt("u64").decode(e, n);
    const i = r;
    return [r, n] = new st().decode(e, n), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Us = class extends pt {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new st().encode(e.balanceRoot)), t.push(new st().encode(e.stateRoot)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new st().decode(e, n);
    const i = r;
    return [r, n] = new st().decode(e, n), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: r
      },
      n
    ];
  }
}, Dc = class extends pt {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new st().encode(e.to)), t.push(new rt("u64").encode(e.amount)), t.push(new st().encode(e.assetId)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    [r, n] = new rt("u64").decode(e, n);
    const i = r;
    return [r, n] = new st().decode(e, n), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Qc = class extends pt {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new st().encode(e.to)), t.push(new rt("u64").encode(e.amount)), t.push(new st().encode(e.assetId)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    [r, n] = new rt("u64").decode(e, n);
    const i = r;
    return [r, n] = new st().decode(e, n), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Fc = class extends pt {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new st().encode(e.contractId)), t.push(new st().encode(e.stateRoot)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    return [r, n] = new st().decode(e, n), [
      {
        type: 4,
        contractId: s,
        stateRoot: r
      },
      n
    ];
  }
}, nr = class extends pt {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new J("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new Nc().encode(e));
        break;
      }
      case 1: {
        t.push(new Us().encode(e));
        break;
      }
      case 2: {
        t.push(new Dc().encode(e));
        break;
      }
      case 3: {
        t.push(new Qc().encode(e));
        break;
      }
      case 4: {
        t.push(new Fc().encode(e));
        break;
      }
      default:
        throw new C(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${r}.`
        );
    }
    return at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Nc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Us().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Dc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Qc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Fc().decode(e, n), [r, n];
      default:
        throw new C(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Xe = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Xe || {}), Yg = (e) => e.sort((t, r) => t.type - r.type);
function Hg(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((r) => {
    if (t.has(r.type))
      throw new C(
        D.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(r.type);
  });
}
var sr = class extends pt {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Hg(e);
    const t = Yg(e), r = [];
    return t.forEach(({ data: n, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          r.push(new rt("u64").encode(n));
          break;
        case 4:
          r.push(new J("u32", { padToWordSize: !0 }).encode(n));
          break;
        default:
          throw new C(D.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), at(r);
  }
  decode(e, t, r) {
    let n = t;
    const s = [];
    if (r & 1) {
      const [i, a] = new rt("u64").decode(e, n);
      n = a, s.push({ type: 1, data: i });
    }
    if (r & 2) {
      const [i, a] = new rt("u64").decode(e, n);
      n = a, s.push({ type: 2, data: i });
    }
    if (r & 4) {
      const [i, a] = new J("u32", { padToWordSize: !0 }).decode(
        e,
        n
      );
      n = a, s.push({ type: 4, data: i });
    }
    if (r & 8) {
      const [i, a] = new rt("u64").decode(e, n);
      n = a, s.push({ type: 8, data: i });
    }
    return [s, n];
  }
}, ut = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(ut || {}), Ma = (e, t) => {
  const r = Y(e), n = Y(t);
  return Ce(at([r, n]));
}, lB = (e, t) => ({
  bits: Ma(e, t)
}), AB = (e) => {
  const t = [];
  return t.push(new Rt(32).encode(e.sender)), t.push(new Rt(32).encode(e.recipient)), t.push(new Rt(32).encode(e.nonce)), t.push(new rt("u64").encode(e.amount)), t.push(Y(e.data || "0x")), Ce(at(t));
}, Oc = class extends hi {
  constructor() {
    super("StorageSlot", {
      key: new st(),
      value: new st()
    });
  }
}, ke = /* @__PURE__ */ ((e) => (e[e.ConsensusParameters = 0] = "ConsensusParameters", e[e.StateTransition = 1] = "StateTransition", e))(ke || {}), Mc = class extends pt {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: r } = e;
    switch (t.push(new J("u8", { padToWordSize: !0 }).encode(r)), r) {
      case 0: {
        const n = e.data;
        t.push(new J("u16", { padToWordSize: !0 }).encode(n.witnessIndex)), t.push(new st().encode(n.checksum));
        break;
      }
      case 1: {
        const n = e.data;
        t.push(new st().encode(n.bytecodeRoot));
        break;
      }
      default:
        throw new C(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return at(t);
  }
  decode(e, t) {
    let r = t, n;
    [n, r] = new J("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0: {
        [n, r] = new J("u16", { padToWordSize: !0 }).decode(e, r);
        const i = n;
        return [n, r] = new st().decode(e, r), [{ type: s, data: { witnessIndex: i, checksum: n } }, r];
      }
      case 1:
        return [n, r] = new st().decode(e, r), [{ type: s, data: { bytecodeRoot: n } }, r];
      default:
        throw new C(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, ir = class extends pt {
  constructor() {
    super(
      "Witness",
      // Types of dynamic length are not supported in the ABI
      "unknown",
      0
    );
  }
  encode(e) {
    const t = [];
    return t.push(new J("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new Rt(e.dataLength).encode(e.data)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    return [r, n] = new Rt(s).decode(e, n), [
      {
        dataLength: s,
        data: r
      },
      n
    ];
  }
}, Et = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e[e.Blob = 5] = "Blob", e))(Et || {}), Lc = class extends pt {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new rt("u64").encode(e.scriptGasLimit)), t.push(new st().encode(e.receiptsRoot)), t.push(new rt("u64").encode(e.scriptLength)), t.push(new rt("u64").encode(e.scriptDataLength)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new Rt(e.scriptLength.toNumber()).encode(e.script)), t.push(new Rt(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u64").decode(e, n);
    const s = r;
    [r, n] = new st().decode(e, n);
    const i = r;
    [r, n] = new rt("u64").decode(e, n);
    const a = r;
    [r, n] = new rt("u64").decode(e, n);
    const o = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const p = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const m = r;
    [r, n] = new Rt(a.toNumber()).decode(e, n);
    const b = r;
    [r, n] = new Rt(o.toNumber()).decode(e, n);
    const S = r;
    [r, n] = new sr().decode(e, n, u);
    const F = r;
    [r, n] = new ft(new rr(), A).decode(e, n);
    const R = r;
    [r, n] = new ft(new nr(), p).decode(e, n);
    const N = r;
    return [r, n] = new ft(new ir(), m).decode(e, n), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: a,
        scriptDataLength: o,
        policyTypes: u,
        inputsCount: A,
        outputsCount: p,
        witnessesCount: m,
        receiptsRoot: i,
        script: b,
        scriptData: S,
        policies: F,
        inputs: R,
        outputs: N,
        witnesses: r
      },
      n
    ];
  }
}, Pc = class extends pt {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new st().encode(e.salt)), t.push(new rt("u64").encode(e.storageSlotsCount)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new ft(new Oc(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new st().decode(e, n);
    const i = r;
    [r, n] = new rt("u64").decode(e, n);
    const a = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const p = r;
    [r, n] = new ft(new Oc(), a.toNumber()).decode(
      e,
      n
    );
    const m = r;
    [r, n] = new sr().decode(e, n, o);
    const b = r;
    [r, n] = new ft(new rr(), u).decode(e, n);
    const S = r;
    [r, n] = new ft(new nr(), A).decode(e, n);
    const F = r;
    return [r, n] = new ft(new ir(), p).decode(e, n), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: o,
        storageSlotsCount: a,
        inputsCount: u,
        outputsCount: A,
        witnessesCount: p,
        salt: i,
        policies: b,
        storageSlots: m,
        inputs: S,
        outputs: F,
        witnesses: r
      },
      n
    ];
  }
}, kc = class extends pt {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new qr().encode(e.txPointer)), t.push(new ks().encode(e.inputContract)), t.push(new Us().encode(e.outputContract)), t.push(new rt("u64").encode(e.mintAmount)), t.push(new st().encode(e.mintAssetId)), t.push(new rt("u64").encode(e.gasPrice)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new qr().decode(e, n);
    const s = r;
    [r, n] = new ks().decode(e, n);
    const i = r;
    [r, n] = new Us().decode(e, n);
    const a = r;
    [r, n] = new rt("u64").decode(e, n);
    const o = r;
    [r, n] = new st().decode(e, n);
    const u = r;
    return [r, n] = new rt("u64").decode(e, n), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: a,
        mintAmount: o,
        mintAssetId: u,
        gasPrice: r
      },
      n
    ];
  }
}, Uc = class extends pt {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Mc().encode(e.upgradePurpose)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Mc().decode(e, n);
    const s = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new sr().decode(e, n, i);
    const A = r;
    [r, n] = new ft(new rr(), a).decode(e, n);
    const p = r;
    [r, n] = new ft(new nr(), o).decode(e, n);
    const m = r;
    return [r, n] = new ft(new ir(), u).decode(e, n), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: a,
        outputsCount: o,
        witnessesCount: u,
        policies: A,
        inputs: p,
        outputs: m,
        witnesses: r
      },
      n
    ];
  }
}, zc = class extends pt {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new st().encode(e.root)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new ft(new st(), e.proofSetCount).encode(e.proofSet)), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const p = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const m = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const b = r;
    [r, n] = new ft(new st(), u).decode(e, n);
    const S = r;
    [r, n] = new sr().decode(e, n, A);
    const F = r;
    [r, n] = new ft(new rr(), p).decode(e, n);
    const R = r;
    [r, n] = new ft(new nr(), m).decode(e, n);
    const N = r;
    return [r, n] = new ft(new ir(), b).decode(e, n), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: a,
        subsectionsNumber: o,
        proofSetCount: u,
        policyTypes: A,
        inputsCount: p,
        outputsCount: m,
        witnessesCount: b,
        proofSet: S,
        policies: F,
        inputs: R,
        outputs: N,
        witnesses: r
      },
      n
    ];
  }
}, Gc = class extends pt {
  constructor() {
    super("TransactionBlob", "struct TransactionBlob", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new st().encode(e.blobId)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new J("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new J("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new sr().encode(e.policies)), t.push(new ft(new rr(), e.inputsCount).encode(e.inputs)), t.push(new ft(new nr(), e.outputsCount).encode(e.outputs)), t.push(new ft(new ir(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new st().decode(e, n);
    const s = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new J("u32", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new sr().decode(e, n, a);
    const p = r;
    [r, n] = new ft(new rr(), o).decode(e, n);
    const m = r;
    [r, n] = new ft(new nr(), u).decode(e, n);
    const b = r;
    return [r, n] = new ft(new ir(), A).decode(e, n), [
      {
        type: 5,
        blobId: s,
        witnessIndex: i,
        policyTypes: a,
        inputsCount: o,
        outputsCount: u,
        witnessesCount: A,
        policies: p,
        inputs: m,
        outputs: b,
        witnesses: r
      },
      n
    ];
  }
}, Ar = class extends pt {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new J("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new Lc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Pc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new kc().encode(e));
        break;
      }
      case 3: {
        t.push(
          new Uc().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new zc().encode(e)
        );
        break;
      }
      case 5: {
        t.push(new Gc().encode(e));
        break;
      }
      default:
        throw new C(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Lc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Pc().decode(e, n), [r, n];
      case 2:
        return [r, n] = new kc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Uc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new zc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new Gc().decode(e, n), [r, n];
      default:
        throw new C(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, fB = class extends hi {
  constructor() {
    super("UtxoId", {
      transactionId: new st(),
      outputIndex: new J("u16", { padToWordSize: !0 })
    });
  }
};
function Xg(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function Ph(e) {
  return function t(r) {
    return arguments.length === 0 || Xg(r) ? t : e.apply(this, arguments);
  };
}
var Zg = /* @__PURE__ */ Ph(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Wg(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function kh(e, t, r) {
  if (r || (r = new Jg()), jg(e))
    return e;
  var n = function(i) {
    var a = r.get(e);
    if (a)
      return a;
    r.set(e, i);
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) && (i[o] = kh(e[o], !0, r));
    return i;
  };
  switch (Zg(e)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return n(Array(e.length));
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Wg(e);
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
      return e.slice();
    default:
      return e;
  }
}
function jg(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var Jg = /* @__PURE__ */ function() {
  function e() {
    this.map = {}, this.length = 0;
  }
  return e.prototype.set = function(t, r) {
    var n = this.hash(t), s = this.map[n];
    s || (this.map[n] = s = []), s.push([t, r]), this.length += 1;
  }, e.prototype.hash = function(t) {
    var r = [];
    for (var n in t)
      r.push(Object.prototype.toString.call(t[n]));
    return r.join();
  }, e.prototype.get = function(t) {
    if (this.length <= 180) {
      for (var r in this.map)
        for (var a = this.map[r], n = 0; n < a.length; n += 1) {
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
  }, e;
}(), Be = /* @__PURE__ */ Ph(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : kh(t);
});
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const xo = /* @__PURE__ */ BigInt(0), li = /* @__PURE__ */ BigInt(1), qg = /* @__PURE__ */ BigInt(2);
function $r(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function as(e) {
  if (!$r(e))
    throw new Error("Uint8Array expected");
}
function yn(e, t) {
  if (typeof t != "boolean")
    throw new Error(`${e} must be valid boolean, got "${t}".`);
}
const $g = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function bn(e) {
  as(e);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += $g[e[r]];
  return t;
}
function dn(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Ro(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const or = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Vc(e) {
  if (e >= or._0 && e <= or._9)
    return e - or._0;
  if (e >= or._A && e <= or._F)
    return e - (or._A - 10);
  if (e >= or._a && e <= or._f)
    return e - (or._a - 10);
}
function In(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, r = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(r);
  for (let s = 0, i = 0; s < r; s++, i += 2) {
    const a = Vc(e.charCodeAt(i)), o = Vc(e.charCodeAt(i + 1));
    if (a === void 0 || o === void 0) {
      const u = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + u + '" at index ' + i);
    }
    n[s] = a * 16 + o;
  }
  return n;
}
function jr(e) {
  return Ro(bn(e));
}
function So(e) {
  return as(e), Ro(bn(Uint8Array.from(e).reverse()));
}
function En(e, t) {
  return In(e.toString(16).padStart(t * 2, "0"));
}
function To(e, t) {
  return En(e, t).reverse();
}
function Kg(e) {
  return In(dn(e));
}
function Ze(e, t, r) {
  let n;
  if (typeof t == "string")
    try {
      n = In(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if ($r(t))
    n = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = n.length;
  if (typeof r == "number" && s !== r)
    throw new Error(`${e} expected ${r} bytes, got ${s}`);
  return n;
}
function Wn(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    as(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
function Uh(e, t) {
  if (e.length !== t.length)
    return !1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r |= e[n] ^ t[n];
  return r === 0;
}
function tw(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
const Ji = (e) => typeof e == "bigint" && xo <= e;
function Ai(e, t, r) {
  return Ji(e) && Ji(t) && Ji(r) && t <= e && e < r;
}
function Jr(e, t, r, n) {
  if (!Ai(t, r, n))
    throw new Error(`expected valid ${e}: ${r} <= n < ${n}, got ${typeof t} ${t}`);
}
function zh(e) {
  let t;
  for (t = 0; e > xo; e >>= li, t += 1)
    ;
  return t;
}
function ew(e, t) {
  return e >> BigInt(t) & li;
}
function rw(e, t, r) {
  return e | (r ? li : xo) << BigInt(t);
}
const No = (e) => (qg << BigInt(e - 1)) - li, qi = (e) => new Uint8Array(e), Yc = (e) => Uint8Array.from(e);
function Gh(e, t, r) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof r != "function")
    throw new Error("hmacFn must be a function");
  let n = qi(e), s = qi(e), i = 0;
  const a = () => {
    n.fill(1), s.fill(0), i = 0;
  }, o = (...m) => r(s, n, ...m), u = (m = qi()) => {
    s = o(Yc([0]), m), n = o(), m.length !== 0 && (s = o(Yc([1]), m), n = o());
  }, A = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let m = 0;
    const b = [];
    for (; m < t; ) {
      n = o();
      const S = n.slice();
      b.push(S), m += n.length;
    }
    return Wn(...b);
  };
  return (m, b) => {
    a(), u(m);
    let S;
    for (; !(S = b(A())); )
      u();
    return a(), S;
  };
}
const nw = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || $r(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function os(e, t, r = {}) {
  const n = (s, i, a) => {
    const o = nw[i];
    if (typeof o != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const u = e[s];
    if (!(a && u === void 0) && !o(u, e))
      throw new Error(`Invalid param ${String(s)}=${u} (${typeof u}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    n(s, i, !1);
  for (const [s, i] of Object.entries(r))
    n(s, i, !0);
  return e;
}
const sw = () => {
  throw new Error("not implemented");
};
function La(e) {
  const t = /* @__PURE__ */ new WeakMap();
  return (r, ...n) => {
    const s = t.get(r);
    if (s !== void 0)
      return s;
    const i = e(r, ...n);
    return t.set(r, i), i;
  };
}
const iw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: Jr,
  abool: yn,
  abytes: as,
  bitGet: ew,
  bitLen: zh,
  bitMask: No,
  bitSet: rw,
  bytesToHex: bn,
  bytesToNumberBE: jr,
  bytesToNumberLE: So,
  concatBytes: Wn,
  createHmacDrbg: Gh,
  ensureBytes: Ze,
  equalBytes: Uh,
  hexToBytes: In,
  hexToNumber: Ro,
  inRange: Ai,
  isBytes: $r,
  memoized: La,
  notImplemented: sw,
  numberToBytesBE: En,
  numberToBytesLE: To,
  numberToHexUnpadded: dn,
  numberToVarBytesBE: Kg,
  utf8ToBytes: tw,
  validateObject: os
}, Symbol.toStringTag, { value: "Module" })), Do = JSON, aw = (e) => e.toUpperCase(), ow = (e) => {
  const t = {};
  return e.forEach((r, n) => {
    t[n] = r;
  }), t;
}, cw = (e, t, r) => e.document ? e : {
  document: e,
  variables: t,
  requestHeaders: r,
  signal: void 0
}, dw = (e, t, r) => e.query ? e : {
  query: e,
  variables: t,
  requestHeaders: r,
  signal: void 0
}, uw = (e, t) => e.documents ? e : {
  documents: e,
  requestHeaders: t,
  signal: void 0
};
function xs(e, t) {
  if (!!!e)
    throw new Error(t);
}
function _w(e) {
  return typeof e == "object" && e !== null;
}
function hw(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const lw = /\r\n|[\n\r]/g;
function Pa(e, t) {
  let r = 0, n = 1;
  for (const s of e.body.matchAll(lw)) {
    if (typeof s.index == "number" || hw(!1), s.index >= t)
      break;
    r = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - r
  };
}
function Aw(e) {
  return Vh(
    e.source,
    Pa(e.source, e.start)
  );
}
function Vh(e, t) {
  const r = e.locationOffset.column - 1, n = "".padStart(r) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, a = t.line + i, o = t.line === 1 ? r : 0, u = t.column + o, A = `${e.name}:${a}:${u}
`, p = n.split(/\r\n|[\n\r]/g), m = p[s];
  if (m.length > 120) {
    const b = Math.floor(u / 80), S = u % 80, F = [];
    for (let R = 0; R < m.length; R += 80)
      F.push(m.slice(R, R + 80));
    return A + Hc([
      [`${a} |`, F[0]],
      ...F.slice(1, b + 1).map((R) => ["|", R]),
      ["|", "^".padStart(S)],
      ["|", F[b + 1]]
    ]);
  }
  return A + Hc([
    // Lines specified like this: ["prefix", "string"],
    [`${a - 1} |`, p[s - 1]],
    [`${a} |`, m],
    ["|", "^".padStart(u)],
    [`${a + 1} |`, p[s + 1]]
  ]);
}
function Hc(e) {
  const t = e.filter(([n, s]) => s !== void 0), r = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(r) + (s ? " " + s : "")).join(`
`);
}
function fw(e) {
  const t = e[0];
  return t == null || "kind" in t || "length" in t ? {
    nodes: t,
    source: e[1],
    positions: e[2],
    path: e[3],
    originalError: e[4],
    extensions: e[5]
  } : t;
}
class Qo extends Error {
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
  constructor(t, ...r) {
    var n, s, i;
    const { nodes: a, source: o, positions: u, path: A, originalError: p, extensions: m } = fw(r);
    super(t), this.name = "GraphQLError", this.path = A ?? void 0, this.originalError = p ?? void 0, this.nodes = Xc(
      Array.isArray(a) ? a : a ? [a] : void 0
    );
    const b = Xc(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((F) => F.loc).filter((F) => F != null)
    );
    this.source = o ?? (b == null || (s = b[0]) === null || s === void 0 ? void 0 : s.source), this.positions = u ?? (b == null ? void 0 : b.map((F) => F.start)), this.locations = u && o ? u.map((F) => Pa(o, F)) : b == null ? void 0 : b.map((F) => Pa(F.source, F.start));
    const S = _w(
      p == null ? void 0 : p.extensions
    ) ? p == null ? void 0 : p.extensions : void 0;
    this.extensions = (i = m ?? S) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), p != null && p.stack ? Object.defineProperty(this, "stack", {
      value: p.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Qo) : Object.defineProperty(this, "stack", {
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
      for (const r of this.nodes)
        r.loc && (t += `

` + Aw(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        t += `

` + Vh(this.source, r);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Xc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function we(e, t, r) {
  return new Qo(`Syntax Error: ${r}`, {
    source: e,
    positions: [t]
  });
}
class pw {
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
  constructor(t, r, n) {
    this.start = t.start, this.end = r.end, this.startToken = t, this.endToken = r, this.source = n;
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
class Yh {
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
  constructor(t, r, n, s, i, a) {
    this.kind = t, this.start = r, this.end = n, this.line = s, this.column = i, this.value = a, this.prev = null, this.next = null;
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
const Hh = {
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
}, gw = new Set(Object.keys(Hh));
function Zc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && gw.has(t);
}
var un;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(un || (un = {}));
var ka;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(ka || (ka = {}));
var ot;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ot || (ot = {}));
function Ua(e) {
  return e === 9 || e === 32;
}
function jn(e) {
  return e >= 48 && e <= 57;
}
function Xh(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Zh(e) {
  return Xh(e) || e === 95;
}
function ww(e) {
  return Xh(e) || jn(e) || e === 95;
}
function mw(e) {
  var t;
  let r = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let a = 0; a < e.length; ++a) {
    var i;
    const o = e[a], u = yw(o);
    u !== o.length && (n = (i = n) !== null && i !== void 0 ? i : a, s = a, a !== 0 && u < r && (r = u));
  }
  return e.map((a, o) => o === 0 ? a : a.slice(r)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function yw(e) {
  let t = 0;
  for (; t < e.length && Ua(e.charCodeAt(t)); )
    ++t;
  return t;
}
function bw(e, t) {
  const r = e.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((S) => S.length === 0 || Ua(S.charCodeAt(0))), a = r.endsWith('\\"""'), o = e.endsWith('"') && !a, u = e.endsWith("\\"), A = o || u, p = (
    // add leading and trailing new lines only if it improves readability
    !s || e.length > 70 || A || i || a
  );
  let m = "";
  const b = s && Ua(e.charCodeAt(0));
  return (p && !b || i) && (m += `
`), m += r, (p || A) && (m += `
`), '"""' + m + '"""';
}
var G;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(G || (G = {}));
class Iw {
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
    const r = new Yh(G.SOF, 0, 0, 0, 0);
    this.source = t, this.lastToken = r, this.token = r, this.line = 1, this.lineStart = 0;
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
    if (t.kind !== G.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const r = vw(this, t.end);
          t.next = r, r.prev = t, t = r;
        }
      while (t.kind === G.COMMENT);
    return t;
  }
}
function Ew(e) {
  return e === G.BANG || e === G.DOLLAR || e === G.AMP || e === G.PAREN_L || e === G.PAREN_R || e === G.SPREAD || e === G.COLON || e === G.EQUALS || e === G.AT || e === G.BRACKET_L || e === G.BRACKET_R || e === G.BRACE_L || e === G.PIPE || e === G.BRACE_R;
}
function xn(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function fi(e, t) {
  return Wh(e.charCodeAt(t)) && jh(e.charCodeAt(t + 1));
}
function Wh(e) {
  return e >= 55296 && e <= 56319;
}
function jh(e) {
  return e >= 56320 && e <= 57343;
}
function Kr(e, t) {
  const r = e.source.body.codePointAt(t);
  if (r === void 0)
    return G.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function pe(e, t, r, n, s) {
  const i = e.line, a = 1 + r - e.lineStart;
  return new Yh(t, r, n, i, a, s);
}
function vw(e, t) {
  const r = e.source.body, n = r.length;
  let s = t;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    switch (i) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++s;
        continue;
      case 10:
        ++s, ++e.line, e.lineStart = s;
        continue;
      case 13:
        r.charCodeAt(s + 1) === 10 ? s += 2 : ++s, ++e.line, e.lineStart = s;
        continue;
      case 35:
        return Cw(e, s);
      case 33:
        return pe(e, G.BANG, s, s + 1);
      case 36:
        return pe(e, G.DOLLAR, s, s + 1);
      case 38:
        return pe(e, G.AMP, s, s + 1);
      case 40:
        return pe(e, G.PAREN_L, s, s + 1);
      case 41:
        return pe(e, G.PAREN_R, s, s + 1);
      case 46:
        if (r.charCodeAt(s + 1) === 46 && r.charCodeAt(s + 2) === 46)
          return pe(e, G.SPREAD, s, s + 3);
        break;
      case 58:
        return pe(e, G.COLON, s, s + 1);
      case 61:
        return pe(e, G.EQUALS, s, s + 1);
      case 64:
        return pe(e, G.AT, s, s + 1);
      case 91:
        return pe(e, G.BRACKET_L, s, s + 1);
      case 93:
        return pe(e, G.BRACKET_R, s, s + 1);
      case 123:
        return pe(e, G.BRACE_L, s, s + 1);
      case 124:
        return pe(e, G.PIPE, s, s + 1);
      case 125:
        return pe(e, G.BRACE_R, s, s + 1);
      case 34:
        return r.charCodeAt(s + 1) === 34 && r.charCodeAt(s + 2) === 34 ? Nw(e, s) : xw(e, s);
    }
    if (jn(i) || i === 45)
      return Bw(e, s, i);
    if (Zh(i))
      return Dw(e, s);
    throw we(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : xn(i) || fi(r, s) ? `Unexpected character: ${Kr(e, s)}.` : `Invalid character: ${Kr(e, s)}.`
    );
  }
  return pe(e, G.EOF, n, n);
}
function Cw(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (xn(i))
      ++s;
    else if (fi(r, s))
      s += 2;
    else
      break;
  }
  return pe(
    e,
    G.COMMENT,
    t,
    s,
    r.slice(t + 1, s)
  );
}
function Bw(e, t, r) {
  const n = e.source.body;
  let s = t, i = r, a = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), jn(i))
      throw we(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Kr(
          e,
          s
        )}.`
      );
  } else
    s = $i(e, s, i), i = n.charCodeAt(s);
  if (i === 46 && (a = !0, i = n.charCodeAt(++s), s = $i(e, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (a = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = $i(e, s, i), i = n.charCodeAt(s)), i === 46 || Zh(i))
    throw we(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Kr(
        e,
        s
      )}.`
    );
  return pe(
    e,
    a ? G.FLOAT : G.INT,
    t,
    s,
    n.slice(t, s)
  );
}
function $i(e, t, r) {
  if (!jn(r))
    throw we(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Kr(
        e,
        t
      )}.`
    );
  const n = e.source.body;
  let s = t + 1;
  for (; jn(n.charCodeAt(s)); )
    ++s;
  return s;
}
function xw(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1, i = s, a = "";
  for (; s < n; ) {
    const o = r.charCodeAt(s);
    if (o === 34)
      return a += r.slice(i, s), pe(e, G.STRING, t, s + 1, a);
    if (o === 92) {
      a += r.slice(i, s);
      const u = r.charCodeAt(s + 1) === 117 ? r.charCodeAt(s + 2) === 123 ? Rw(e, s) : Sw(e, s) : Tw(e, s);
      a += u.value, s += u.size, i = s;
      continue;
    }
    if (o === 10 || o === 13)
      break;
    if (xn(o))
      ++s;
    else if (fi(r, s))
      s += 2;
    else
      throw we(
        e.source,
        s,
        `Invalid character within String: ${Kr(
          e,
          s
        )}.`
      );
  }
  throw we(e.source, s, "Unterminated string.");
}
function Rw(e, t) {
  const r = e.source.body;
  let n = 0, s = 3;
  for (; s < 12; ) {
    const i = r.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !xn(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: s
      };
    }
    if (n = n << 4 | kn(i), n < 0)
      break;
  }
  throw we(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${r.slice(
      t,
      t + s
    )}".`
  );
}
function Sw(e, t) {
  const r = e.source.body, n = Wc(r, t + 2);
  if (xn(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (Wh(n) && r.charCodeAt(t + 6) === 92 && r.charCodeAt(t + 7) === 117) {
    const s = Wc(r, t + 8);
    if (jh(s))
      return {
        value: String.fromCodePoint(n, s),
        size: 12
      };
  }
  throw we(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${r.slice(t, t + 6)}".`
  );
}
function Wc(e, t) {
  return kn(e.charCodeAt(t)) << 12 | kn(e.charCodeAt(t + 1)) << 8 | kn(e.charCodeAt(t + 2)) << 4 | kn(e.charCodeAt(t + 3));
}
function kn(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Tw(e, t) {
  const r = e.source.body;
  switch (r.charCodeAt(t + 1)) {
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
  throw we(
    e.source,
    t,
    `Invalid character escape sequence: "${r.slice(
      t,
      t + 2
    )}".`
  );
}
function Nw(e, t) {
  const r = e.source.body, n = r.length;
  let s = e.lineStart, i = t + 3, a = i, o = "";
  const u = [];
  for (; i < n; ) {
    const A = r.charCodeAt(i);
    if (A === 34 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34) {
      o += r.slice(a, i), u.push(o);
      const p = pe(
        e,
        G.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        mw(u).join(`
`)
      );
      return e.line += u.length - 1, e.lineStart = s, p;
    }
    if (A === 92 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34 && r.charCodeAt(i + 3) === 34) {
      o += r.slice(a, i), a = i + 1, i += 4;
      continue;
    }
    if (A === 10 || A === 13) {
      o += r.slice(a, i), u.push(o), A === 13 && r.charCodeAt(i + 1) === 10 ? i += 2 : ++i, o = "", a = i, s = i;
      continue;
    }
    if (xn(A))
      ++i;
    else if (fi(r, i))
      i += 2;
    else
      throw we(
        e.source,
        i,
        `Invalid character within String: ${Kr(
          e,
          i
        )}.`
      );
  }
  throw we(e.source, i, "Unterminated string.");
}
function Dw(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (ww(i))
      ++s;
    else
      break;
  }
  return pe(
    e,
    G.NAME,
    t,
    s,
    r.slice(t, s)
  );
}
const Qw = 10, Jh = 2;
function Fo(e) {
  return pi(e, []);
}
function pi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Fw(e, t);
    default:
      return String(e);
  }
}
function Fw(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const r = [...t, e];
  if (Ow(e)) {
    const n = e.toJSON();
    if (n !== e)
      return typeof n == "string" ? n : pi(n, r);
  } else if (Array.isArray(e))
    return Lw(e, r);
  return Mw(e, r);
}
function Ow(e) {
  return typeof e.toJSON == "function";
}
function Mw(e, t) {
  const r = Object.entries(e);
  return r.length === 0 ? "{}" : t.length > Jh ? "[" + Pw(e) + "]" : "{ " + r.map(
    ([s, i]) => s + ": " + pi(i, t)
  ).join(", ") + " }";
}
function Lw(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > Jh)
    return "[Array]";
  const r = Math.min(Qw, e.length), n = e.length - r, s = [];
  for (let i = 0; i < r; ++i)
    s.push(pi(e[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function Pw(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const r = e.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return t;
}
const kw = globalThis.process && // eslint-disable-next-line no-undef
!0, Uw = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  kw ? function(t, r) {
    return t instanceof r;
  } : function(t, r) {
    if (t instanceof r)
      return !0;
    if (typeof t == "object" && t !== null) {
      var n;
      const s = r.prototype[Symbol.toStringTag], i = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in t ? t[Symbol.toStringTag] : (n = t.constructor) === null || n === void 0 ? void 0 : n.name
      );
      if (s === i) {
        const a = Fo(t);
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
class qh {
  constructor(t, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || xs(!1, `Body must be a string. Received: ${Fo(t)}.`), this.body = t, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || xs(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || xs(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function zw(e) {
  return Uw(e, qh);
}
function $h(e, t) {
  return new Gw(e, t).parseDocument();
}
class Gw {
  constructor(t, r = {}) {
    const n = zw(t) ? t : new qh(t);
    this._lexer = new Iw(n), this._options = r, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(G.NAME);
    return this.node(t, {
      kind: ot.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ot.DOCUMENT,
      definitions: this.many(
        G.SOF,
        this.parseDefinition,
        G.EOF
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
    if (this.peek(G.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), r = t ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === G.NAME) {
      switch (r.value) {
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
        throw we(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (r.value) {
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
    throw this.unexpected(r);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const t = this._lexer.token;
    if (this.peek(G.BRACE_L))
      return this.node(t, {
        kind: ot.OPERATION_DEFINITION,
        operation: un.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let n;
    return this.peek(G.NAME) && (n = this.parseName()), this.node(t, {
      kind: ot.OPERATION_DEFINITION,
      operation: r,
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
    const t = this.expectToken(G.NAME);
    switch (t.value) {
      case "query":
        return un.QUERY;
      case "mutation":
        return un.MUTATION;
      case "subscription":
        return un.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      G.PAREN_L,
      this.parseVariableDefinition,
      G.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ot.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(G.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(G.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(G.DOLLAR), this.node(t, {
      kind: ot.VARIABLE,
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
      kind: ot.SELECTION_SET,
      selections: this.many(
        G.BRACE_L,
        this.parseSelection,
        G.BRACE_R
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
    return this.peek(G.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, r = this.parseName();
    let n, s;
    return this.expectOptionalToken(G.COLON) ? (n = r, s = this.parseName()) : s = r, this.node(t, {
      kind: ot.FIELD,
      alias: n,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(G.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const r = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(G.PAREN_L, r, G.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(G.COLON), this.node(r, {
      kind: ot.ARGUMENT,
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
    this.expectToken(G.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(G.NAME) ? this.node(t, {
      kind: ot.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: ot.INLINE_FRAGMENT,
      typeCondition: r ? this.parseNamedType() : void 0,
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
      kind: ot.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: ot.FRAGMENT_DEFINITION,
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
    const r = this._lexer.token;
    switch (r.kind) {
      case G.BRACKET_L:
        return this.parseList(t);
      case G.BRACE_L:
        return this.parseObject(t);
      case G.INT:
        return this.advanceLexer(), this.node(r, {
          kind: ot.INT,
          value: r.value
        });
      case G.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: ot.FLOAT,
          value: r.value
        });
      case G.STRING:
      case G.BLOCK_STRING:
        return this.parseStringLiteral();
      case G.NAME:
        switch (this.advanceLexer(), r.value) {
          case "true":
            return this.node(r, {
              kind: ot.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(r, {
              kind: ot.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(r, {
              kind: ot.NULL
            });
          default:
            return this.node(r, {
              kind: ot.ENUM,
              value: r.value
            });
        }
      case G.DOLLAR:
        if (t)
          if (this.expectToken(G.DOLLAR), this._lexer.token.kind === G.NAME) {
            const n = this._lexer.token.value;
            throw we(
              this._lexer.source,
              r.start,
              `Unexpected variable "$${n}" in constant value.`
            );
          } else
            throw this.unexpected(r);
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
      kind: ot.STRING,
      value: t.value,
      block: t.kind === G.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(t) {
    const r = () => this.parseValueLiteral(t);
    return this.node(this._lexer.token, {
      kind: ot.LIST,
      values: this.any(G.BRACKET_L, r, G.BRACKET_R)
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
    const r = () => this.parseObjectField(t);
    return this.node(this._lexer.token, {
      kind: ot.OBJECT,
      fields: this.any(G.BRACE_L, r, G.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(G.COLON), this.node(r, {
      kind: ot.OBJECT_FIELD,
      name: n,
      value: this.parseValueLiteral(t)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(t) {
    const r = [];
    for (; this.peek(G.AT); )
      r.push(this.parseDirective(t));
    return r;
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
    const r = this._lexer.token;
    return this.expectToken(G.AT), this.node(r, {
      kind: ot.DIRECTIVE,
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
    let r;
    if (this.expectOptionalToken(G.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(G.BRACKET_R), r = this.node(t, {
        kind: ot.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(G.BANG) ? this.node(t, {
      kind: ot.NON_NULL_TYPE,
      type: r
    }) : r;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ot.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(G.STRING) || this.peek(G.BLOCK_STRING);
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("schema");
    const n = this.parseConstDirectives(), s = this.many(
      G.BRACE_L,
      this.parseOperationTypeDefinition,
      G.BRACE_R
    );
    return this.node(t, {
      kind: ot.SCHEMA_DEFINITION,
      description: r,
      directives: n,
      operationTypes: s
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const t = this._lexer.token, r = this.parseOperationType();
    this.expectToken(G.COLON);
    const n = this.parseNamedType();
    return this.node(t, {
      kind: ot.OPERATION_TYPE_DEFINITION,
      operation: r,
      type: n
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("scalar");
    const n = this.parseName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: ot.SCALAR_TYPE_DEFINITION,
      description: r,
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("type");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ot.OBJECT_TYPE_DEFINITION,
      description: r,
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(G.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      G.BRACE_L,
      this.parseFieldDefinition,
      G.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(G.COLON);
    const i = this.parseTypeReference(), a = this.parseConstDirectives();
    return this.node(t, {
      kind: ot.FIELD_DEFINITION,
      description: r,
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
      G.PAREN_L,
      this.parseInputValueDef,
      G.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName();
    this.expectToken(G.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(G.EQUALS) && (i = this.parseConstValueLiteral());
    const a = this.parseConstDirectives();
    return this.node(t, {
      kind: ot.INPUT_VALUE_DEFINITION,
      description: r,
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("interface");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ot.INTERFACE_TYPE_DEFINITION,
      description: r,
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("union");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    return this.node(t, {
      kind: ot.UNION_TYPE_DEFINITION,
      description: r,
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
    return this.expectOptionalToken(G.EQUALS) ? this.delimitedMany(G.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("enum");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    return this.node(t, {
      kind: ot.ENUM_TYPE_DEFINITION,
      description: r,
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
      G.BRACE_L,
      this.parseEnumValueDefinition,
      G.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: ot.ENUM_VALUE_DEFINITION,
      description: r,
      name: n,
      directives: s
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw we(
        this._lexer.source,
        this._lexer.token.start,
        `${ws(
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("input");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    return this.node(t, {
      kind: ot.INPUT_OBJECT_TYPE_DEFINITION,
      description: r,
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
      G.BRACE_L,
      this.parseInputValueDef,
      G.BRACE_R
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
    if (t.kind === G.NAME)
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
    const r = this.parseConstDirectives(), n = this.optionalMany(
      G.BRACE_L,
      this.parseOperationTypeDefinition,
      G.BRACE_R
    );
    if (r.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ot.SCHEMA_EXTENSION,
      directives: r,
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
    const r = this.parseName(), n = this.parseConstDirectives();
    if (n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ot.SCALAR_TYPE_EXTENSION,
      name: r,
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
    const r = this.parseName(), n = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (n.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ot.OBJECT_TYPE_EXTENSION,
      name: r,
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
    const r = this.parseName(), n = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (n.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ot.INTERFACE_TYPE_EXTENSION,
      name: r,
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
    const r = this.parseName(), n = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ot.UNION_TYPE_EXTENSION,
      name: r,
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
    const r = this.parseName(), n = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ot.ENUM_TYPE_EXTENSION,
      name: r,
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
    const r = this.parseName(), n = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: ot.INPUT_OBJECT_TYPE_EXTENSION,
      name: r,
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
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(G.AT);
    const n = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const a = this.parseDirectiveLocations();
    return this.node(t, {
      kind: ot.DIRECTIVE_DEFINITION,
      description: r,
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
    return this.delimitedMany(G.PIPE, this.parseDirectiveLocation);
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
    const t = this._lexer.token, r = this.parseName();
    if (Object.prototype.hasOwnProperty.call(ka, r.value))
      return r;
    throw this.unexpected(t);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(t, r) {
    return this._options.noLocation !== !0 && (r.loc = new pw(
      t,
      this._lexer.lastToken,
      this._lexer.source
    )), r;
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
    const r = this._lexer.token;
    if (r.kind === t)
      return this.advanceLexer(), r;
    throw we(
      this._lexer.source,
      r.start,
      `Expected ${Kh(t)}, found ${ws(r)}.`
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
    const r = this._lexer.token;
    if (r.kind === G.NAME && r.value === t)
      this.advanceLexer();
    else
      throw we(
        this._lexer.source,
        r.start,
        `Expected "${t}", found ${ws(r)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const r = this._lexer.token;
    return r.kind === G.NAME && r.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const r = t ?? this._lexer.token;
    return we(
      this._lexer.source,
      r.start,
      `Unexpected ${ws(r)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(t, r, n) {
    this.expectToken(t);
    const s = [];
    for (; !this.expectOptionalToken(n); )
      s.push(r.call(this));
    return s;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(t, r, n) {
    if (this.expectOptionalToken(t)) {
      const s = [];
      do
        s.push(r.call(this));
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
  many(t, r, n) {
    this.expectToken(t);
    const s = [];
    do
      s.push(r.call(this));
    while (!this.expectOptionalToken(n));
    return s;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(t, r) {
    this.expectOptionalToken(t);
    const n = [];
    do
      n.push(r.call(this));
    while (this.expectOptionalToken(t));
    return n;
  }
  advanceLexer() {
    const { maxTokens: t } = this._options, r = this._lexer.advance();
    if (t !== void 0 && r.kind !== G.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw we(
        this._lexer.source,
        r.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function ws(e) {
  const t = e.value;
  return Kh(e.kind) + (t != null ? ` "${t}"` : "");
}
function Kh(e) {
  return Ew(e) ? `"${e}"` : e;
}
function Vw(e) {
  return `"${e.replace(Yw, Hw)}"`;
}
const Yw = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Hw(e) {
  return Xw[e.charCodeAt(0)];
}
const Xw = [
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
], Zw = Object.freeze({});
function Ww(e, t, r = Hh) {
  const n = /* @__PURE__ */ new Map();
  for (const O of Object.values(ot))
    n.set(O, jw(t, O));
  let s, i = Array.isArray(e), a = [e], o = -1, u = [], A = e, p, m;
  const b = [], S = [];
  do {
    o++;
    const O = o === a.length, z = O && u.length !== 0;
    if (O) {
      if (p = S.length === 0 ? void 0 : b[b.length - 1], A = m, m = S.pop(), z)
        if (i) {
          A = A.slice();
          let U = 0;
          for (const [P, H] of u) {
            const X = P - U;
            H === null ? (A.splice(X, 1), U++) : A[X] = H;
          }
        } else {
          A = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(A)
          );
          for (const [U, P] of u)
            A[U] = P;
        }
      o = s.index, a = s.keys, u = s.edits, i = s.inArray, s = s.prev;
    } else if (m) {
      if (p = i ? o : a[o], A = m[p], A == null)
        continue;
      b.push(p);
    }
    let M;
    if (!Array.isArray(A)) {
      var F, R;
      Zc(A) || xs(!1, `Invalid AST Node: ${Fo(A)}.`);
      const U = O ? (F = n.get(A.kind)) === null || F === void 0 ? void 0 : F.leave : (R = n.get(A.kind)) === null || R === void 0 ? void 0 : R.enter;
      if (M = U == null ? void 0 : U.call(t, A, p, m, b, S), M === Zw)
        break;
      if (M === !1) {
        if (!O) {
          b.pop();
          continue;
        }
      } else if (M !== void 0 && (u.push([p, M]), !O))
        if (Zc(M))
          A = M;
        else {
          b.pop();
          continue;
        }
    }
    if (M === void 0 && z && u.push([p, A]), O)
      b.pop();
    else {
      var N;
      s = {
        inArray: i,
        index: o,
        keys: a,
        edits: u,
        prev: s
      }, i = Array.isArray(A), a = i ? A : (N = r[A.kind]) !== null && N !== void 0 ? N : [], o = -1, u = [], m && S.push(m), m = A;
    }
  } while (s !== void 0);
  return u.length !== 0 ? u[u.length - 1][1] : e;
}
function jw(e, t) {
  const r = e[t];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function tl(e) {
  return Ww(e, qw);
}
const Jw = 80, qw = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => et(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = gt("(", et(e.variableDefinitions, ", "), ")"), r = et(
        [
          e.operation,
          et([e.name, t]),
          et(e.directives, " ")
        ],
        " "
      );
      return (r === "query" ? "" : r + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: r, directives: n }) => e + ": " + t + gt(" = ", r) + gt(" ", et(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Ye(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: r, directives: n, selectionSet: s }) {
      const i = gt("", e, ": ") + t;
      let a = i + gt("(", et(r, ", "), ")");
      return a.length > Jw && (a = i + gt(`(
`, Rs(et(r, `
`)), `
)`)), et([a, et(n, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + gt(" ", et(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: r }) => et(
      [
        "...",
        gt("on ", e),
        et(t, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: r, directives: n, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${gt("(", et(r, ", "), ")")} on ${t} ${gt("", et(n, " "), " ")}` + s
    )
  },
  // Value
  IntValue: {
    leave: ({ value: e }) => e
  },
  FloatValue: {
    leave: ({ value: e }) => e
  },
  StringValue: {
    leave: ({ value: e, block: t }) => t ? bw(e) : Vw(e)
  },
  BooleanValue: {
    leave: ({ value: e }) => e ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: e }) => e
  },
  ListValue: {
    leave: ({ values: e }) => "[" + et(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + et(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + gt("(", et(t, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: e }) => e
  },
  ListType: {
    leave: ({ type: e }) => "[" + e + "]"
  },
  NonNullType: {
    leave: ({ type: e }) => e + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: e, directives: t, operationTypes: r }) => gt("", e, `
`) + et(["schema", et(t, " "), Ye(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: r }) => gt("", e, `
`) + et(["scalar", t, et(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => gt("", e, `
`) + et(
      [
        "type",
        t,
        gt("implements ", et(r, " & ")),
        et(n, " "),
        Ye(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: r, type: n, directives: s }) => gt("", e, `
`) + t + (jc(r) ? gt(`(
`, Rs(et(r, `
`)), `
)`) : gt("(", et(r, ", "), ")")) + ": " + n + gt(" ", et(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: r, defaultValue: n, directives: s }) => gt("", e, `
`) + et(
      [t + ": " + r, gt("= ", n), et(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => gt("", e, `
`) + et(
      [
        "interface",
        t,
        gt("implements ", et(r, " & ")),
        et(n, " "),
        Ye(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, types: n }) => gt("", e, `
`) + et(
      ["union", t, et(r, " "), gt("= ", et(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, values: n }) => gt("", e, `
`) + et(["enum", t, et(r, " "), Ye(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: r }) => gt("", e, `
`) + et([t, et(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, fields: n }) => gt("", e, `
`) + et(["input", t, et(r, " "), Ye(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: r, repeatable: n, locations: s }) => gt("", e, `
`) + "directive @" + t + (jc(r) ? gt(`(
`, Rs(et(r, `
`)), `
)`) : gt("(", et(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + et(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => et(
      ["extend schema", et(e, " "), Ye(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => et(["extend scalar", e, et(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => et(
      [
        "extend type",
        e,
        gt("implements ", et(t, " & ")),
        et(r, " "),
        Ye(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => et(
      [
        "extend interface",
        e,
        gt("implements ", et(t, " & ")),
        et(r, " "),
        Ye(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: r }) => et(
      [
        "extend union",
        e,
        et(t, " "),
        gt("= ", et(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: r }) => et(["extend enum", e, et(t, " "), Ye(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: r }) => et(["extend input", e, et(t, " "), Ye(r)], " ")
  }
};
function et(e, t = "") {
  var r;
  return (r = e == null ? void 0 : e.filter((n) => n).join(t)) !== null && r !== void 0 ? r : "";
}
function Ye(e) {
  return gt(`{
`, Rs(et(e, `
`)), `
}`);
}
function gt(e, t, r = "") {
  return t != null && t !== "" ? e + t + r : "";
}
function Rs(e) {
  return gt("  ", e.replace(/\n/g, `
  `));
}
function jc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((r) => r.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const Jc = (e) => {
  var n, s;
  let t;
  const r = e.definitions.filter((i) => i.kind === "OperationDefinition");
  return r.length === 1 && (t = (s = (n = r[0]) == null ? void 0 : n.name) == null ? void 0 : s.value), t;
}, Ki = (e) => {
  if (typeof e == "string") {
    let r;
    try {
      const n = $h(e);
      r = Jc(n);
    } catch {
    }
    return { query: e, operationName: r };
  }
  const t = Jc(e);
  return { query: tl(e), operationName: t };
};
class Yn extends Error {
  constructor(t, r) {
    const n = `${Yn.extractMessage(t)}: ${JSON.stringify({
      response: t,
      request: r
    })}`;
    super(n), Object.setPrototypeOf(this, Yn.prototype), this.response = t, this.request = r, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Yn);
  }
  static extractMessage(t) {
    var r, n;
    return ((n = (r = t.errors) == null ? void 0 : r[0]) == null ? void 0 : n.message) ?? `GraphQL Error (Code: ${t.status})`;
  }
}
var za = { exports: {} };
(function(e, t) {
  var r = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Ia < "u" && Ia, n = function() {
    function i() {
      this.fetch = !1, this.DOMException = r.DOMException;
    }
    return i.prototype = r, new i();
  }();
  (function(i) {
    (function(a) {
      var o = typeof i < "u" && i || typeof self < "u" && self || typeof o < "u" && o, u = {
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
      function A(_) {
        return _ && DataView.prototype.isPrototypeOf(_);
      }
      if (u.arrayBuffer)
        var p = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], m = ArrayBuffer.isView || function(_) {
          return _ && p.indexOf(Object.prototype.toString.call(_)) > -1;
        };
      function b(_) {
        if (typeof _ != "string" && (_ = String(_)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(_) || _ === "")
          throw new TypeError('Invalid character in header field name: "' + _ + '"');
        return _.toLowerCase();
      }
      function S(_) {
        return typeof _ != "string" && (_ = String(_)), _;
      }
      function F(_) {
        var f = {
          next: function() {
            var g = _.shift();
            return { done: g === void 0, value: g };
          }
        };
        return u.iterable && (f[Symbol.iterator] = function() {
          return f;
        }), f;
      }
      function R(_) {
        this.map = {}, _ instanceof R ? _.forEach(function(f, g) {
          this.append(g, f);
        }, this) : Array.isArray(_) ? _.forEach(function(f) {
          this.append(f[0], f[1]);
        }, this) : _ && Object.getOwnPropertyNames(_).forEach(function(f) {
          this.append(f, _[f]);
        }, this);
      }
      R.prototype.append = function(_, f) {
        _ = b(_), f = S(f);
        var g = this.map[_];
        this.map[_] = g ? g + ", " + f : f;
      }, R.prototype.delete = function(_) {
        delete this.map[b(_)];
      }, R.prototype.get = function(_) {
        return _ = b(_), this.has(_) ? this.map[_] : null;
      }, R.prototype.has = function(_) {
        return this.map.hasOwnProperty(b(_));
      }, R.prototype.set = function(_, f) {
        this.map[b(_)] = S(f);
      }, R.prototype.forEach = function(_, f) {
        for (var g in this.map)
          this.map.hasOwnProperty(g) && _.call(f, this.map[g], g, this);
      }, R.prototype.keys = function() {
        var _ = [];
        return this.forEach(function(f, g) {
          _.push(g);
        }), F(_);
      }, R.prototype.values = function() {
        var _ = [];
        return this.forEach(function(f) {
          _.push(f);
        }), F(_);
      }, R.prototype.entries = function() {
        var _ = [];
        return this.forEach(function(f, g) {
          _.push([g, f]);
        }), F(_);
      }, u.iterable && (R.prototype[Symbol.iterator] = R.prototype.entries);
      function N(_) {
        if (_.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        _.bodyUsed = !0;
      }
      function O(_) {
        return new Promise(function(f, g) {
          _.onload = function() {
            f(_.result);
          }, _.onerror = function() {
            g(_.error);
          };
        });
      }
      function z(_) {
        var f = new FileReader(), g = O(f);
        return f.readAsArrayBuffer(_), g;
      }
      function M(_) {
        var f = new FileReader(), g = O(f);
        return f.readAsText(_), g;
      }
      function U(_) {
        for (var f = new Uint8Array(_), g = new Array(f.length), y = 0; y < f.length; y++)
          g[y] = String.fromCharCode(f[y]);
        return g.join("");
      }
      function P(_) {
        if (_.slice)
          return _.slice(0);
        var f = new Uint8Array(_.byteLength);
        return f.set(new Uint8Array(_)), f.buffer;
      }
      function H() {
        return this.bodyUsed = !1, this._initBody = function(_) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = _, _ ? typeof _ == "string" ? this._bodyText = _ : u.blob && Blob.prototype.isPrototypeOf(_) ? this._bodyBlob = _ : u.formData && FormData.prototype.isPrototypeOf(_) ? this._bodyFormData = _ : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) ? this._bodyText = _.toString() : u.arrayBuffer && u.blob && A(_) ? (this._bodyArrayBuffer = P(_.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(_) || m(_)) ? this._bodyArrayBuffer = P(_) : this._bodyText = _ = Object.prototype.toString.call(_) : this._bodyText = "", this.headers.get("content-type") || (typeof _ == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, u.blob && (this.blob = function() {
          var _ = N(this);
          if (_)
            return _;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }, this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var _ = N(this);
            return _ || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(z);
        }), this.text = function() {
          var _ = N(this);
          if (_)
            return _;
          if (this._bodyBlob)
            return M(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(U(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, u.formData && (this.formData = function() {
          return this.text().then(it);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var X = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function V(_) {
        var f = _.toUpperCase();
        return X.indexOf(f) > -1 ? f : _;
      }
      function k(_, f) {
        if (!(this instanceof k))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        f = f || {};
        var g = f.body;
        if (_ instanceof k) {
          if (_.bodyUsed)
            throw new TypeError("Already read");
          this.url = _.url, this.credentials = _.credentials, f.headers || (this.headers = new R(_.headers)), this.method = _.method, this.mode = _.mode, this.signal = _.signal, !g && _._bodyInit != null && (g = _._bodyInit, _.bodyUsed = !0);
        } else
          this.url = String(_);
        if (this.credentials = f.credentials || this.credentials || "same-origin", (f.headers || !this.headers) && (this.headers = new R(f.headers)), this.method = V(f.method || this.method || "GET"), this.mode = f.mode || this.mode || null, this.signal = f.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && g)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(g), (this.method === "GET" || this.method === "HEAD") && (f.cache === "no-store" || f.cache === "no-cache")) {
          var y = /([?&])_=[^&]*/;
          if (y.test(this.url))
            this.url = this.url.replace(y, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var B = /\?/;
            this.url += (B.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      k.prototype.clone = function() {
        return new k(this, { body: this._bodyInit });
      };
      function it(_) {
        var f = new FormData();
        return _.trim().split("&").forEach(function(g) {
          if (g) {
            var y = g.split("="), B = y.shift().replace(/\+/g, " "), T = y.join("=").replace(/\+/g, " ");
            f.append(decodeURIComponent(B), decodeURIComponent(T));
          }
        }), f;
      }
      function W(_) {
        var f = new R(), g = _.replace(/\r?\n[\t ]+/g, " ");
        return g.split("\r").map(function(y) {
          return y.indexOf(`
`) === 0 ? y.substr(1, y.length) : y;
        }).forEach(function(y) {
          var B = y.split(":"), T = B.shift().trim();
          if (T) {
            var I = B.join(":").trim();
            f.append(T, I);
          }
        }), f;
      }
      H.call(k.prototype);
      function j(_, f) {
        if (!(this instanceof j))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        f || (f = {}), this.type = "default", this.status = f.status === void 0 ? 200 : f.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = f.statusText === void 0 ? "" : "" + f.statusText, this.headers = new R(f.headers), this.url = f.url || "", this._initBody(_);
      }
      H.call(j.prototype), j.prototype.clone = function() {
        return new j(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new R(this.headers),
          url: this.url
        });
      }, j.error = function() {
        var _ = new j(null, { status: 0, statusText: "" });
        return _.type = "error", _;
      };
      var v = [301, 302, 303, 307, 308];
      j.redirect = function(_, f) {
        if (v.indexOf(f) === -1)
          throw new RangeError("Invalid status code");
        return new j(null, { status: f, headers: { location: _ } });
      }, a.DOMException = o.DOMException;
      try {
        new a.DOMException();
      } catch {
        a.DOMException = function(f, g) {
          this.message = f, this.name = g;
          var y = Error(f);
          this.stack = y.stack;
        }, a.DOMException.prototype = Object.create(Error.prototype), a.DOMException.prototype.constructor = a.DOMException;
      }
      function d(_, f) {
        return new Promise(function(g, y) {
          var B = new k(_, f);
          if (B.signal && B.signal.aborted)
            return y(new a.DOMException("Aborted", "AbortError"));
          var T = new XMLHttpRequest();
          function I() {
            T.abort();
          }
          T.onload = function() {
            var E = {
              status: T.status,
              statusText: T.statusText,
              headers: W(T.getAllResponseHeaders() || "")
            };
            E.url = "responseURL" in T ? T.responseURL : E.headers.get("X-Request-URL");
            var K = "response" in T ? T.response : T.responseText;
            setTimeout(function() {
              g(new j(K, E));
            }, 0);
          }, T.onerror = function() {
            setTimeout(function() {
              y(new TypeError("Network request failed"));
            }, 0);
          }, T.ontimeout = function() {
            setTimeout(function() {
              y(new TypeError("Network request failed"));
            }, 0);
          }, T.onabort = function() {
            setTimeout(function() {
              y(new a.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function l(E) {
            try {
              return E === "" && o.location.href ? o.location.href : E;
            } catch {
              return E;
            }
          }
          T.open(B.method, l(B.url), !0), B.credentials === "include" ? T.withCredentials = !0 : B.credentials === "omit" && (T.withCredentials = !1), "responseType" in T && (u.blob ? T.responseType = "blob" : u.arrayBuffer && B.headers.get("Content-Type") && B.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (T.responseType = "arraybuffer")), f && typeof f.headers == "object" && !(f.headers instanceof R) ? Object.getOwnPropertyNames(f.headers).forEach(function(E) {
            T.setRequestHeader(E, S(f.headers[E]));
          }) : B.headers.forEach(function(E, K) {
            T.setRequestHeader(K, E);
          }), B.signal && (B.signal.addEventListener("abort", I), T.onreadystatechange = function() {
            T.readyState === 4 && B.signal.removeEventListener("abort", I);
          }), T.send(typeof B._bodyInit > "u" ? null : B._bodyInit);
        });
      }
      return d.polyfill = !0, o.fetch || (o.fetch = d, o.Headers = R, o.Request = k, o.Response = j), a.Headers = R, a.Request = k, a.Response = j, a.fetch = d, a;
    })({});
  })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
  var s = r.fetch ? r : n;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(za, za.exports);
var zs = za.exports;
const Ss = /* @__PURE__ */ P_(zs), $w = /* @__PURE__ */ UA({
  __proto__: null,
  default: Ss
}, [zs]), rn = (e) => {
  let t = {};
  return e && (typeof Headers < "u" && e instanceof Headers || $w && zs.Headers && e instanceof zs.Headers ? t = ow(e) : Array.isArray(e) ? e.forEach(([r, n]) => {
    r && n !== void 0 && (t[r] = n);
  }) : t = e), t;
}, qc = (e) => e.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(), Kw = (e) => {
  if (!Array.isArray(e.query)) {
    const n = e, s = [`query=${encodeURIComponent(qc(n.query))}`];
    return e.variables && s.push(`variables=${encodeURIComponent(n.jsonSerializer.stringify(n.variables))}`), n.operationName && s.push(`operationName=${encodeURIComponent(n.operationName)}`), s.join("&");
  }
  if (typeof e.variables < "u" && !Array.isArray(e.variables))
    throw new Error("Cannot create query with given variable type, array expected");
  const t = e, r = e.query.reduce((n, s, i) => (n.push({
    query: qc(s),
    variables: t.variables ? t.jsonSerializer.stringify(t.variables[i]) : void 0
  }), n), []);
  return `query=${encodeURIComponent(t.jsonSerializer.stringify(r))}`;
}, t0 = (e) => async (t) => {
  const { url: r, query: n, variables: s, operationName: i, fetch: a, fetchOptions: o, middleware: u } = t, A = { ...t.headers };
  let p = "", m;
  e === "POST" ? (m = r0(n, s, i, o.jsonSerializer), typeof m == "string" && (A["Content-Type"] = "application/json")) : p = Kw({
    query: n,
    variables: s,
    operationName: i,
    jsonSerializer: o.jsonSerializer ?? Do
  });
  const b = {
    method: e,
    headers: A,
    body: m,
    ...o
  };
  let S = r, F = b;
  if (u) {
    const R = await Promise.resolve(u({ ...b, url: r, operationName: i, variables: s })), { url: N, ...O } = R;
    S = N, F = O;
  }
  return p && (S = `${S}?${p}`), await a(S, F);
};
class e0 {
  constructor(t, r = {}) {
    this.url = t, this.requestConfig = r, this.rawRequest = async (...n) => {
      const [s, i, a] = n, o = dw(s, i, a), { headers: u, fetch: A = Ss, method: p = "POST", requestMiddleware: m, responseMiddleware: b, ...S } = this.requestConfig, { url: F } = this;
      o.signal !== void 0 && (S.signal = o.signal);
      const { operationName: R } = Ki(o.query);
      return ta({
        url: F,
        query: o.query,
        variables: o.variables,
        headers: {
          ...rn(ea(u)),
          ...rn(o.requestHeaders)
        },
        operationName: R,
        fetch: A,
        method: p,
        fetchOptions: S,
        middleware: m
      }).then((N) => (b && b(N), N)).catch((N) => {
        throw b && b(N), N;
      });
    };
  }
  async request(t, ...r) {
    const [n, s] = r, i = cw(t, n, s), { headers: a, fetch: o = Ss, method: u = "POST", requestMiddleware: A, responseMiddleware: p, ...m } = this.requestConfig, { url: b } = this;
    i.signal !== void 0 && (m.signal = i.signal);
    const { query: S, operationName: F } = Ki(i.document);
    return ta({
      url: b,
      query: S,
      variables: i.variables,
      headers: {
        ...rn(ea(a)),
        ...rn(i.requestHeaders)
      },
      operationName: F,
      fetch: o,
      method: u,
      fetchOptions: m,
      middleware: A
    }).then((R) => (p && p(R), R.data)).catch((R) => {
      throw p && p(R), R;
    });
  }
  // prettier-ignore
  batchRequests(t, r) {
    const n = uw(t, r), { headers: s, ...i } = this.requestConfig;
    n.signal !== void 0 && (i.signal = n.signal);
    const a = n.documents.map(({ document: u }) => Ki(u).query), o = n.documents.map(({ variables: u }) => u);
    return ta({
      url: this.url,
      query: a,
      // @ts-expect-error TODO reconcile batch variables into system.
      variables: o,
      headers: {
        ...rn(ea(s)),
        ...rn(n.requestHeaders)
      },
      operationName: void 0,
      fetch: this.requestConfig.fetch ?? Ss,
      method: this.requestConfig.method || "POST",
      fetchOptions: i,
      middleware: this.requestConfig.requestMiddleware
    }).then((u) => (this.requestConfig.responseMiddleware && this.requestConfig.responseMiddleware(u), u.data)).catch((u) => {
      throw this.requestConfig.responseMiddleware && this.requestConfig.responseMiddleware(u), u;
    });
  }
  setHeaders(t) {
    return this.requestConfig.headers = t, this;
  }
  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(t, r) {
    const { headers: n } = this.requestConfig;
    return n ? n[t] = r : this.requestConfig.headers = { [t]: r }, this;
  }
  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(t) {
    return this.url = t, this;
  }
}
const ta = async (e) => {
  const { query: t, variables: r, fetchOptions: n } = e, s = t0(aw(e.method ?? "post")), i = Array.isArray(e.query), a = await s(e), o = await n0(a, n.jsonSerializer ?? Do), u = Array.isArray(o) ? !o.some(({ data: p }) => !p) : !!o.data, A = Array.isArray(o) || !o.errors || Array.isArray(o.errors) && !o.errors.length || n.errorPolicy === "all" || n.errorPolicy === "ignore";
  if (a.ok && A && u) {
    const { errors: p, ...m } = (Array.isArray(o), o), b = n.errorPolicy === "ignore" ? m : o;
    return {
      ...i ? { data: b } : b,
      headers: a.headers,
      status: a.status
    };
  } else {
    const p = typeof o == "string" ? {
      error: o
    } : o;
    throw new Yn(
      // @ts-expect-error TODO
      { ...p, status: a.status, headers: a.headers },
      { query: t, variables: r }
    );
  }
}, r0 = (e, t, r, n) => {
  const s = n ?? Do;
  if (!Array.isArray(e))
    return s.stringify({ query: e, variables: t, operationName: r });
  if (typeof t < "u" && !Array.isArray(t))
    throw new Error("Cannot create request body with given variable type, array expected");
  const i = e.reduce((a, o, u) => (a.push({ query: o, variables: t ? t[u] : void 0 }), a), []);
  return s.stringify(i);
}, n0 = async (e, t) => {
  let r;
  return e.headers.forEach((n, s) => {
    s.toLowerCase() === "content-type" && (r = n);
  }), r && (r.toLowerCase().startsWith("application/json") || r.toLowerCase().startsWith("application/graphql+json") || r.toLowerCase().startsWith("application/graphql-response+json")) ? t.parse(await e.text()) : e.text();
}, ea = (e) => typeof e == "function" ? e() : e;
var Gs = function() {
  return Gs = Object.assign || function(t) {
    for (var r, n = 1, s = arguments.length; n < s; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, Gs.apply(this, arguments);
};
var Ts = /* @__PURE__ */ new Map(), Ga = /* @__PURE__ */ new Map(), el = !0, Vs = !1;
function rl(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function s0(e) {
  return rl(e.source.body.substring(e.start, e.end));
}
function i0(e) {
  var t = /* @__PURE__ */ new Set(), r = [];
  return e.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = s0(n.loc), a = Ga.get(s);
      a && !a.has(i) ? el && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : a || Ga.set(s, a = /* @__PURE__ */ new Set()), a.add(i), t.has(i) || (t.add(i), r.push(n));
    } else
      r.push(n);
  }), Gs(Gs({}, e), { definitions: r });
}
function a0(e) {
  var t = new Set(e.definitions);
  t.forEach(function(n) {
    n.loc && delete n.loc, Object.keys(n).forEach(function(s) {
      var i = n[s];
      i && typeof i == "object" && t.add(i);
    });
  });
  var r = e.loc;
  return r && (delete r.startToken, delete r.endToken), e;
}
function o0(e) {
  var t = rl(e);
  if (!Ts.has(t)) {
    var r = $h(e, {
      experimentalFragmentVariables: Vs,
      allowLegacyFragmentVariables: Vs
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Ts.set(t, a0(i0(r)));
  }
  return Ts.get(t);
}
function q(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  typeof e == "string" && (e = [e]);
  var n = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += e[i + 1];
  }), o0(n);
}
function c0() {
  Ts.clear(), Ga.clear();
}
function d0() {
  el = !1;
}
function u0() {
  Vs = !0;
}
function _0() {
  Vs = !1;
}
var Fn = {
  gql: q,
  resetCaches: c0,
  disableFragmentWarnings: d0,
  enableExperimentalFragmentVariables: u0,
  disableExperimentalFragmentVariables: _0
};
(function(e) {
  e.gql = Fn.gql, e.resetCaches = Fn.resetCaches, e.disableFragmentWarnings = Fn.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Fn.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Fn.disableExperimentalFragmentVariables;
})(q || (q = {}));
q.default = q;
var St = "0x0000000000000000000000000000000000000000000000000000000000000000", pB = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", gB = 16 * 1024, wB = 16, mB = 1024 * 1024 * 1024, yB = 1024 * 1024 * 1024, bB = 255, IB = 1024 * 1024, EB = 1024 * 1024, h0 = "0xffffffffffff0000", nl = "0xffffffffffff0001", l0 = "0xffffffffffff0003", A0 = "0xffffffffffff0004", f0 = "0xffffffffffff0005", vB = "0x0", p0 = [
  "UnknownPanicReason",
  "Revert",
  "OutOfGas",
  "TransactionValidity",
  "MemoryOverflow",
  "ArithmeticOverflow",
  "ContractNotFound",
  "MemoryOwnership",
  "NotEnoughBalance",
  "ExpectedInternalContext",
  "AssetIdNotFound",
  "InputNotFound",
  "OutputNotFound",
  "WitnessNotFound",
  "TransactionMaturity",
  "InvalidMetadataIdentifier",
  "MalformedCallStructure",
  "ReservedRegisterNotWritable",
  "InvalidFlags",
  "InvalidImmediateValue",
  "ExpectedCoinInput",
  "EcalError",
  "MemoryWriteOverlap",
  "ContractNotInInputs",
  "InternalBalanceOverflow",
  "ContractMaxSize",
  "ExpectedUnallocatedStack",
  "MaxStaticContractsReached",
  "TransferAmountCannotBeZero",
  "ExpectedOutputVariable",
  "ExpectedParentInternalContext",
  "PredicateReturnedNonOne",
  "ContractIdAlreadyDeployed",
  "ContractMismatch",
  "MessageDataTooLong",
  "ArithmeticError",
  "ContractInstructionNotAllowed",
  "TransferZeroCoins",
  "InvalidInstruction",
  "MemoryNotExecutable",
  "PolicyIsNotSet",
  "PolicyNotFound",
  "TooManyReceipts",
  "BalanceOverflow",
  "InvalidBlockHeight",
  "TooManySlots",
  "ExpectedNestedCaller",
  "MemoryGrowthOverlap",
  "UninitalizedMemoryAccess",
  "OverridingConsensusParameters",
  "UnknownStateTransactionBytecodeRoot",
  "OverridingStateTransactionBytecode",
  "BytecodeAlreadyUploaded",
  "ThePartIsNotSequentiallyConnected",
  "BlobIdAlreadyUploaded",
  "BlobNotFound",
  "GasCostNotDefined"
], g0 = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let c;
const sl = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && sl.decode();
let Un = null;
function il() {
  return (Un === null || Un.byteLength === 0) && (Un = new Uint8Array(c.memory.buffer)), Un;
}
function w0(e, t) {
  return e = e >>> 0, sl.decode(il().subarray(e, e + t));
}
function w(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return e.ptr;
}
function m0(e, t) {
  const r = c.gm_args(e, t);
  return L.__wrap(r);
}
function y0(e, t, r) {
  const n = c.gtf_args(e, t, r);
  return L.__wrap(n);
}
function b0(e, t, r, n) {
  w(n, Mr);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(e, t, r, s);
  return L.__wrap(i);
}
function I0(e, t, r, n) {
  w(n, Mr);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(e, t, r, s);
  return L.__wrap(i);
}
function E0(e, t, r, n) {
  w(n, ds);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(e, t, r, s);
  return L.__wrap(i);
}
function v0(e, t, r, n) {
  w(n, ds);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(e, t, r, s);
  return L.__wrap(i);
}
function C0(e, t, r, n) {
  w(n, us);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(e, t, r, s);
  return L.__wrap(i);
}
function B0(e, t, r, n) {
  w(n, us);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(e, t, r, s);
  return L.__wrap(i);
}
function x0(e, t, r, n) {
  w(n, cs);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(e, t, r, s);
  return L.__wrap(i);
}
function R0(e, t, r, n) {
  w(n, cs);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(e, t, r, s);
  return L.__wrap(i);
}
function S0(e, t, r) {
  const n = c.add(e, t, r);
  return L.__wrap(n);
}
function T0(e, t, r) {
  const n = c.and(e, t, r);
  return L.__wrap(n);
}
function N0(e, t, r) {
  const n = c.div(e, t, r);
  return L.__wrap(n);
}
function D0(e, t, r) {
  const n = c.eq(e, t, r);
  return L.__wrap(n);
}
function Q0(e, t, r) {
  const n = c.exp(e, t, r);
  return L.__wrap(n);
}
function F0(e, t, r) {
  const n = c.gt(e, t, r);
  return L.__wrap(n);
}
function O0(e, t, r) {
  const n = c.lt(e, t, r);
  return L.__wrap(n);
}
function M0(e, t, r) {
  const n = c.mlog(e, t, r);
  return L.__wrap(n);
}
function L0(e, t, r) {
  const n = c.mroo(e, t, r);
  return L.__wrap(n);
}
function P0(e, t, r) {
  const n = c.mod_(e, t, r);
  return L.__wrap(n);
}
function Xr(e, t) {
  const r = c.move_(e, t);
  return L.__wrap(r);
}
function k0(e, t, r) {
  const n = c.mul(e, t, r);
  return L.__wrap(n);
}
function U0(e, t) {
  const r = c.not(e, t);
  return L.__wrap(r);
}
function z0(e, t, r) {
  const n = c.or(e, t, r);
  return L.__wrap(n);
}
function G0(e, t, r) {
  const n = c.sll(e, t, r);
  return L.__wrap(n);
}
function V0(e, t, r) {
  const n = c.srl(e, t, r);
  return L.__wrap(n);
}
function Ys(e, t, r) {
  const n = c.sub(e, t, r);
  return L.__wrap(n);
}
function Y0(e, t, r) {
  const n = c.xor(e, t, r);
  return L.__wrap(n);
}
function H0(e, t, r, n) {
  const s = c.mldv(e, t, r, n);
  return L.__wrap(s);
}
function Oo(e) {
  const t = c.ret(e);
  return L.__wrap(t);
}
function X0(e, t) {
  const r = c.retd(e, t);
  return L.__wrap(r);
}
function Z0(e) {
  const t = c.aloc(e);
  return L.__wrap(t);
}
function W0(e, t) {
  const r = c.mcl(e, t);
  return L.__wrap(r);
}
function j0(e, t, r) {
  const n = c.mcp(e, t, r);
  return L.__wrap(n);
}
function J0(e, t, r, n) {
  const s = c.meq(e, t, r, n);
  return L.__wrap(s);
}
function q0(e, t) {
  const r = c.bhsh(e, t);
  return L.__wrap(r);
}
function $0(e) {
  const t = c.bhei(e);
  return L.__wrap(t);
}
function K0(e, t) {
  const r = c.burn(e, t);
  return L.__wrap(r);
}
function Va(e, t, r, n) {
  const s = c.call(e, t, r, n);
  return L.__wrap(s);
}
function tm(e, t, r, n) {
  const s = c.ccp(e, t, r, n);
  return L.__wrap(s);
}
function em(e, t) {
  const r = c.croo(e, t);
  return L.__wrap(r);
}
function rm(e, t) {
  const r = c.csiz(e, t);
  return L.__wrap(r);
}
function nm(e) {
  const t = c.cb(e);
  return L.__wrap(t);
}
function Hn(e, t, r, n) {
  const s = c.ldc(e, t, r, n);
  return L.__wrap(s);
}
function sm(e, t, r, n) {
  const s = c.log(e, t, r, n);
  return L.__wrap(s);
}
function im(e, t, r, n) {
  const s = c.logd(e, t, r, n);
  return L.__wrap(s);
}
function am(e, t) {
  const r = c.mint(e, t);
  return L.__wrap(r);
}
function om(e) {
  const t = c.rvrt(e);
  return L.__wrap(t);
}
function cm(e, t, r) {
  const n = c.scwq(e, t, r);
  return L.__wrap(n);
}
function dm(e, t, r) {
  const n = c.srw(e, t, r);
  return L.__wrap(n);
}
function um(e, t, r, n) {
  const s = c.srwq(e, t, r, n);
  return L.__wrap(s);
}
function _m(e, t, r) {
  const n = c.sww(e, t, r);
  return L.__wrap(n);
}
function hm(e, t, r, n) {
  const s = c.swwq(e, t, r, n);
  return L.__wrap(s);
}
function al(e, t, r) {
  const n = c.tr(e, t, r);
  return L.__wrap(n);
}
function lm(e, t, r, n) {
  const s = c.tro(e, t, r, n);
  return L.__wrap(s);
}
function Am(e, t, r) {
  const n = c.eck1(e, t, r);
  return L.__wrap(n);
}
function fm(e, t, r) {
  const n = c.ecr1(e, t, r);
  return L.__wrap(n);
}
function pm(e, t, r, n) {
  const s = c.ed19(e, t, r, n);
  return L.__wrap(s);
}
function gm(e, t, r) {
  const n = c.k256(e, t, r);
  return L.__wrap(n);
}
function wm(e, t, r) {
  const n = c.s256(e, t, r);
  return L.__wrap(n);
}
function mm(e, t) {
  const r = c.time(e, t);
  return L.__wrap(r);
}
function ym() {
  const e = c.noop();
  return L.__wrap(e);
}
function bm(e) {
  const t = c.flag(e);
  return L.__wrap(t);
}
function Im(e, t, r) {
  const n = c.bal(e, t, r);
  return L.__wrap(n);
}
function Hs(e) {
  const t = c.jmp(e);
  return L.__wrap(t);
}
function Em(e, t, r) {
  const n = c.jne(e, t, r);
  return L.__wrap(n);
}
function vm(e, t, r, n) {
  const s = c.smo(e, t, r, n);
  return L.__wrap(s);
}
function tr(e, t, r) {
  const n = c.addi(e, t, r);
  return L.__wrap(n);
}
function Cm(e, t, r) {
  const n = c.andi(e, t, r);
  return L.__wrap(n);
}
function Xs(e, t, r) {
  const n = c.divi(e, t, r);
  return L.__wrap(n);
}
function Bm(e, t, r) {
  const n = c.expi(e, t, r);
  return L.__wrap(n);
}
function xm(e, t, r) {
  const n = c.modi(e, t, r);
  return L.__wrap(n);
}
function Rm(e, t, r) {
  const n = c.muli(e, t, r);
  return L.__wrap(n);
}
function Sm(e, t, r) {
  const n = c.ori(e, t, r);
  return L.__wrap(n);
}
function Tm(e, t, r) {
  const n = c.slli(e, t, r);
  return L.__wrap(n);
}
function Nm(e, t, r) {
  const n = c.srli(e, t, r);
  return L.__wrap(n);
}
function ol(e, t, r) {
  const n = c.subi(e, t, r);
  return L.__wrap(n);
}
function Dm(e, t, r) {
  const n = c.xori(e, t, r);
  return L.__wrap(n);
}
function Qm(e, t, r) {
  const n = c.jnei(e, t, r);
  return L.__wrap(n);
}
function Fm(e, t, r) {
  const n = c.lb(e, t, r);
  return L.__wrap(n);
}
function Jn(e, t, r) {
  const n = c.lw(e, t, r);
  return L.__wrap(n);
}
function Om(e, t, r) {
  const n = c.sb(e, t, r);
  return L.__wrap(n);
}
function Mm(e, t, r) {
  const n = c.sw(e, t, r);
  return L.__wrap(n);
}
function Lm(e, t, r) {
  const n = c.mcpi(e, t, r);
  return L.__wrap(n);
}
function cl(e, t, r) {
  const n = c.gtf(e, t, r);
  return L.__wrap(n);
}
function Pm(e, t) {
  const r = c.mcli(e, t);
  return L.__wrap(r);
}
function km(e, t) {
  const r = c.gm(e, t);
  return L.__wrap(r);
}
function _n(e, t) {
  const r = c.movi(e, t);
  return L.__wrap(r);
}
function Um(e, t) {
  const r = c.jnzi(e, t);
  return L.__wrap(r);
}
function zm(e, t) {
  const r = c.jmpf(e, t);
  return L.__wrap(r);
}
function Gm(e, t) {
  const r = c.jmpb(e, t);
  return L.__wrap(r);
}
function Vm(e, t, r) {
  const n = c.jnzf(e, t, r);
  return L.__wrap(n);
}
function dl(e, t, r) {
  const n = c.jnzb(e, t, r);
  return L.__wrap(n);
}
function Ym(e, t, r, n) {
  const s = c.jnef(e, t, r, n);
  return L.__wrap(s);
}
function Hm(e, t, r, n) {
  const s = c.jneb(e, t, r, n);
  return L.__wrap(s);
}
function Xm(e) {
  const t = c.ji(e);
  return L.__wrap(t);
}
function Zm(e) {
  const t = c.cfei(e);
  return L.__wrap(t);
}
function Wm(e) {
  const t = c.cfsi(e);
  return L.__wrap(t);
}
function jm(e) {
  const t = c.cfe(e);
  return L.__wrap(t);
}
function Jm(e) {
  const t = c.cfs(e);
  return L.__wrap(t);
}
function qm(e) {
  const t = c.pshl(e);
  return L.__wrap(t);
}
function $m(e) {
  const t = c.pshh(e);
  return L.__wrap(t);
}
function Km(e) {
  const t = c.popl(e);
  return L.__wrap(t);
}
function ty(e) {
  const t = c.poph(e);
  return L.__wrap(t);
}
function ey(e, t, r, n) {
  const s = c.wdcm(e, t, r, n);
  return L.__wrap(s);
}
function ry(e, t, r, n) {
  const s = c.wqcm(e, t, r, n);
  return L.__wrap(s);
}
function ny(e, t, r, n) {
  const s = c.wdop(e, t, r, n);
  return L.__wrap(s);
}
function sy(e, t, r, n) {
  const s = c.wqop(e, t, r, n);
  return L.__wrap(s);
}
function iy(e, t, r, n) {
  const s = c.wdml(e, t, r, n);
  return L.__wrap(s);
}
function ay(e, t, r, n) {
  const s = c.wqml(e, t, r, n);
  return L.__wrap(s);
}
function oy(e, t, r, n) {
  const s = c.wddv(e, t, r, n);
  return L.__wrap(s);
}
function cy(e, t, r, n) {
  const s = c.wqdv(e, t, r, n);
  return L.__wrap(s);
}
function dy(e, t, r, n) {
  const s = c.wdmd(e, t, r, n);
  return L.__wrap(s);
}
function uy(e, t, r, n) {
  const s = c.wqmd(e, t, r, n);
  return L.__wrap(s);
}
function _y(e, t, r, n) {
  const s = c.wdam(e, t, r, n);
  return L.__wrap(s);
}
function hy(e, t, r, n) {
  const s = c.wqam(e, t, r, n);
  return L.__wrap(s);
}
function ly(e, t, r, n) {
  const s = c.wdmm(e, t, r, n);
  return L.__wrap(s);
}
function Ay(e, t, r, n) {
  const s = c.wqmm(e, t, r, n);
  return L.__wrap(s);
}
function fy(e, t, r, n) {
  const s = c.ecal(e, t, r, n);
  return L.__wrap(s);
}
function Zs(e, t) {
  const r = c.bsiz(e, t);
  return L.__wrap(r);
}
function py(e, t, r, n) {
  const s = c.bldd(e, t, r, n);
  return L.__wrap(s);
}
let zr = null;
function $c() {
  return (zr === null || zr.buffer.detached === !0 || zr.buffer.detached === void 0 && zr.buffer !== c.memory.buffer) && (zr = new DataView(c.memory.buffer)), zr;
}
function gy(e, t) {
  return e = e >>> 0, il().subarray(e / 1, e / 1 + t);
}
const ul = Object.freeze({
  /**
  *r" Set `$rA` to `tx.type`
  */
  Type: 1,
  1: "Type",
  /**
  *r" Set `$rA` to `tx.scriptGasLimit`
  */
  ScriptGasLimit: 2,
  2: "ScriptGasLimit",
  /**
  *r" Set `$rA` to `tx.scriptLength`
  */
  ScriptLength: 3,
  3: "ScriptLength",
  /**
  *r" Set `$rA` to `tx.scriptDataLength`
  */
  ScriptDataLength: 4,
  4: "ScriptDataLength",
  /**
  *r" Set `$rA` to `tx.inputsCount`
  */
  ScriptInputsCount: 5,
  5: "ScriptInputsCount",
  /**
  *r" Set `$rA` to `tx.outputsCount`
  */
  ScriptOutputsCount: 6,
  6: "ScriptOutputsCount",
  /**
  *r" Set `$rA` to `tx.witnessesCount`
  */
  ScriptWitnessesCount: 7,
  7: "ScriptWitnessesCount",
  /**
  *r" Set `$rA` to `Memory address of tx.script`
  */
  Script: 9,
  9: "Script",
  /**
  *r" Set `$rA` to `Memory address of tx.scriptData`
  */
  ScriptData: 10,
  10: "ScriptData",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB]`
  */
  ScriptInputAtIndex: 11,
  11: "ScriptInputAtIndex",
  /**
  *r" Set `$rA` to `Memory address of t.outputs[$rB]`
  */
  ScriptOutputAtIndex: 12,
  12: "ScriptOutputAtIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
  */
  ScriptWitnessAtIndex: 13,
  13: "ScriptWitnessAtIndex",
  /**
  *r" Set `$rA` to size of the transaction in memory, in bytes
  */
  TxLength: 14,
  14: "TxLength",
  /**
  *r" Set `$rA` to `tx.bytecodeWitnessIndex`
  */
  CreateBytecodeWitnessIndex: 257,
  257: "CreateBytecodeWitnessIndex",
  /**
  *r" Set `$rA` to `tx.storageSlotsCount`
  */
  CreateStorageSlotsCount: 258,
  258: "CreateStorageSlotsCount",
  /**
  *r" Set `$rA` to `tx.inputsCount`
  */
  CreateInputsCount: 259,
  259: "CreateInputsCount",
  /**
  *r" Set `$rA` to `tx.outputsCount`
  */
  CreateOutputsCount: 260,
  260: "CreateOutputsCount",
  /**
  *r" Set `$rA` to `tx.witnessesCount`
  */
  CreateWitnessesCount: 261,
  261: "CreateWitnessesCount",
  /**
  *r" Set `$rA` to `Memory address of tx.salt`
  */
  CreateSalt: 262,
  262: "CreateSalt",
  /**
  *r" Set `$rA` to `Memory address of tx.storageSlots[$rB]`
  */
  CreateStorageSlotAtIndex: 263,
  263: "CreateStorageSlotAtIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB]`
  */
  CreateInputAtIndex: 264,
  264: "CreateInputAtIndex",
  /**
  *r" Set `$rA` to `Memory address of t.outputs[$rB]`
  */
  CreateOutputAtIndex: 265,
  265: "CreateOutputAtIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
  */
  CreateWitnessAtIndex: 266,
  266: "CreateWitnessAtIndex",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].type`
  */
  InputType: 512,
  512: "InputType",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
  */
  InputCoinTxId: 513,
  513: "InputCoinTxId",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].outputIndex`
  */
  InputCoinOutputIndex: 514,
  514: "InputCoinOutputIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].owner`
  */
  InputCoinOwner: 515,
  515: "InputCoinOwner",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].amount`
  */
  InputCoinAmount: 516,
  516: "InputCoinAmount",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].asset_id`
  */
  InputCoinAssetId: 517,
  517: "InputCoinAssetId",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
  */
  InputCoinTxPointer: 518,
  518: "InputCoinTxPointer",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
  */
  InputCoinWitnessIndex: 519,
  519: "InputCoinWitnessIndex",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].predicateLength`
  */
  InputCoinPredicateLength: 521,
  521: "InputCoinPredicateLength",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
  */
  InputCoinPredicateDataLength: 522,
  522: "InputCoinPredicateDataLength",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
  */
  InputCoinPredicate: 523,
  523: "InputCoinPredicate",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
  */
  InputCoinPredicateData: 524,
  524: "InputCoinPredicateData",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
  */
  InputCoinPredicateGasUsed: 525,
  525: "InputCoinPredicateGasUsed",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
  */
  InputContractTxId: 544,
  544: "InputContractTxId",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].outputIndex`
  */
  InputContractOutputIndex: 545,
  545: "InputContractOutputIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].contractID`
  */
  InputContractId: 549,
  549: "InputContractId",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].sender`
  */
  InputMessageSender: 576,
  576: "InputMessageSender",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].recipient`
  */
  InputMessageRecipient: 577,
  577: "InputMessageRecipient",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].amount`
  */
  InputMessageAmount: 578,
  578: "InputMessageAmount",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].nonce`
  */
  InputMessageNonce: 579,
  579: "InputMessageNonce",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
  */
  InputMessageWitnessIndex: 580,
  580: "InputMessageWitnessIndex",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].dataLength`
  */
  InputMessageDataLength: 581,
  581: "InputMessageDataLength",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].predicateLength`
  */
  InputMessagePredicateLength: 582,
  582: "InputMessagePredicateLength",
  /**
  *r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
  */
  InputMessagePredicateDataLength: 583,
  583: "InputMessagePredicateDataLength",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].data`
  */
  InputMessageData: 584,
  584: "InputMessageData",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
  */
  InputMessagePredicate: 585,
  585: "InputMessagePredicate",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
  */
  InputMessagePredicateData: 586,
  586: "InputMessagePredicateData",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
  */
  InputMessagePredicateGasUsed: 587,
  587: "InputMessagePredicateGasUsed",
  /**
  *r" Set `$rA` to `tx.outputs[$rB].type`
  */
  OutputType: 768,
  768: "OutputType",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].to`
  */
  OutputCoinTo: 769,
  769: "OutputCoinTo",
  /**
  *r" Set `$rA` to `tx.outputs[$rB].amount`
  */
  OutputCoinAmount: 770,
  770: "OutputCoinAmount",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].asset_id`
  */
  OutputCoinAssetId: 771,
  771: "OutputCoinAssetId",
  /**
  *r" Set `$rA` to `tx.outputs[$rB].inputIndex`
  */
  OutputContractInputIndex: 772,
  772: "OutputContractInputIndex",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].contractID`
  */
  OutputContractCreatedContractId: 775,
  775: "OutputContractCreatedContractId",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
  */
  OutputContractCreatedStateRoot: 776,
  776: "OutputContractCreatedStateRoot",
  /**
  *r" Set `$rA` to `tx.witnesses[$rB].dataLength`
  */
  WitnessDataLength: 1024,
  1024: "WitnessDataLength",
  /**
  *r" Set `$rA` to `Memory address of tx.witnesses[$rB].data`
  */
  WitnessData: 1025,
  1025: "WitnessData",
  /**
  *r" Set `$rA` to `tx.policyTypes`
  */
  PolicyTypes: 1280,
  1280: "PolicyTypes",
  /**
  *r" Set `$rA` to `tx.policies[0x00].gasPrice`
  */
  PolicyTip: 1281,
  1281: "PolicyTip",
  /**
  *r" Set `$rA` to `tx.policies[count_ones(0b11 & tx.policyTypes) - 1].witnessLimit`
  */
  PolicyWitnessLimit: 1282,
  1282: "PolicyWitnessLimit",
  /**
  *r" Set `$rA` to `tx.policies[count_ones(0b111 & tx.policyTypes) - 1].maturity`
  */
  PolicyMaturity: 1283,
  1283: "PolicyMaturity",
  /**
  *r" Set `$rA` to `tx.policies[count_ones(0b1111 & tx.policyTypes) - 1].maxFee`
  */
  PolicyMaxFee: 1284,
  1284: "PolicyMaxFee"
}), wy = Object.freeze({
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
}), my = Object.freeze({
  /**
  *r" The byte can't be mapped to any known `PanicReason`.
  */
  UnknownPanicReason: 0,
  0: "UnknownPanicReason",
  /**
  *r" Found `RVRT` instruction.
  */
  Revert: 1,
  1: "Revert",
  /**
  *r" Execution ran out of gas.
  */
  OutOfGas: 2,
  2: "OutOfGas",
  /**
  *r" The transaction validity is violated.
  */
  TransactionValidity: 3,
  3: "TransactionValidity",
  /**
  *r" Attempt to write outside interpreter memory boundaries.
  */
  MemoryOverflow: 4,
  4: "MemoryOverflow",
  /**
  *r" Overflow while executing arithmetic operation.
  *r" These errors are ignored using the WRAPPING flag.
  */
  ArithmeticOverflow: 5,
  5: "ArithmeticOverflow",
  /**
  *r" Designed contract was not found in the storage.
  */
  ContractNotFound: 6,
  6: "ContractNotFound",
  /**
  *r" Memory ownership rules are violated.
  */
  MemoryOwnership: 7,
  7: "MemoryOwnership",
  /**
  *r" The asset ID balance isn't enough for the instruction.
  */
  NotEnoughBalance: 8,
  8: "NotEnoughBalance",
  /**
  *r" The interpreter is expected to be in internal context.
  */
  ExpectedInternalContext: 9,
  9: "ExpectedInternalContext",
  /**
  *r" The queried asset ID was not found in the state.
  */
  AssetIdNotFound: 10,
  10: "AssetIdNotFound",
  /**
  *r" The provided input is not found in the transaction.
  */
  InputNotFound: 11,
  11: "InputNotFound",
  /**
  *r" The provided output is not found in the transaction.
  */
  OutputNotFound: 12,
  12: "OutputNotFound",
  /**
  *r" The provided witness is not found in the transaction.
  */
  WitnessNotFound: 13,
  13: "WitnessNotFound",
  /**
  *r" The transaction maturity is not valid for this request.
  */
  TransactionMaturity: 14,
  14: "TransactionMaturity",
  /**
  *r" The metadata identifier is invalid.
  */
  InvalidMetadataIdentifier: 15,
  15: "InvalidMetadataIdentifier",
  /**
  *r" The call structure is not valid.
  */
  MalformedCallStructure: 16,
  16: "MalformedCallStructure",
  /**
  *r" The provided register does not allow write operations.
  */
  ReservedRegisterNotWritable: 17,
  17: "ReservedRegisterNotWritable",
  /**
  *r" The execution resulted in an erroneous state of the interpreter.
  */
  InvalidFlags: 18,
  18: "InvalidFlags",
  /**
  *r" The provided immediate value is not valid for this instruction.
  */
  InvalidImmediateValue: 19,
  19: "InvalidImmediateValue",
  /**
  *r" The provided transaction input is not of type `Coin`.
  */
  ExpectedCoinInput: 20,
  20: "ExpectedCoinInput",
  /**
  *r" `ECAL` instruction failed.
  */
  EcalError: 21,
  21: "EcalError",
  /**
  *r" Two segments of the interpreter memory should not intersect for write operations.
  */
  MemoryWriteOverlap: 22,
  22: "MemoryWriteOverlap",
  /**
  *r" The requested contract is not listed in the transaction inputs.
  */
  ContractNotInInputs: 23,
  23: "ContractNotInInputs",
  /**
  *r" The internal asset ID balance overflowed with the provided instruction.
  */
  InternalBalanceOverflow: 24,
  24: "InternalBalanceOverflow",
  /**
  *r" The maximum allowed contract size is violated.
  */
  ContractMaxSize: 25,
  25: "ContractMaxSize",
  /**
  *r" This instruction expects the stack area to be unallocated for this call.
  */
  ExpectedUnallocatedStack: 26,
  26: "ExpectedUnallocatedStack",
  /**
  *r" The maximum allowed number of static contracts was reached for this transaction.
  */
  MaxStaticContractsReached: 27,
  27: "MaxStaticContractsReached",
  /**
  *r" The requested transfer amount cannot be zero.
  */
  TransferAmountCannotBeZero: 28,
  28: "TransferAmountCannotBeZero",
  /**
  *r" The provided transaction output should be of type `Variable`.
  */
  ExpectedOutputVariable: 29,
  29: "ExpectedOutputVariable",
  /**
  *r" The expected context of the stack parent is internal.
  */
  ExpectedParentInternalContext: 30,
  30: "ExpectedParentInternalContext",
  /**
  *r" The predicate returned non `1`. The `1` means successful verification
  *r" of the predicate, all other values means unsuccessful.
  */
  PredicateReturnedNonOne: 31,
  31: "PredicateReturnedNonOne",
  /**
  *r" The contract ID is already deployed and can't be overwritten.
  */
  ContractIdAlreadyDeployed: 32,
  32: "ContractIdAlreadyDeployed",
  /**
  *r" The loaded contract mismatch expectations.
  */
  ContractMismatch: 33,
  33: "ContractMismatch",
  /**
  *r" Attempting to send message data longer than `MAX_MESSAGE_DATA_LENGTH`
  */
  MessageDataTooLong: 34,
  34: "MessageDataTooLong",
  /**
  *r" Mathematically invalid arguments where given to an arithmetic instruction.
  *r" For instance, division by zero produces this.
  *r" These errors are ignored using the UNSAFEMATH flag.
  */
  ArithmeticError: 35,
  35: "ArithmeticError",
  /**
  *r" The contract instruction is not allowed in predicates.
  */
  ContractInstructionNotAllowed: 36,
  36: "ContractInstructionNotAllowed",
  /**
  *r" Transfer of zero coins is not allowed.
  */
  TransferZeroCoins: 37,
  37: "TransferZeroCoins",
  /**
  *r" Attempted to execute an invalid instruction
  */
  InvalidInstruction: 38,
  38: "InvalidInstruction",
  /**
  *r" Memory outside $is..$ssp range is not executable
  */
  MemoryNotExecutable: 39,
  39: "MemoryNotExecutable",
  /**
  *r" The policy is not set.
  */
  PolicyIsNotSet: 40,
  40: "PolicyIsNotSet",
  /**
  *r" The policy is not found across policies.
  */
  PolicyNotFound: 41,
  41: "PolicyNotFound",
  /**
  *r" Receipt context is full
  */
  TooManyReceipts: 42,
  42: "TooManyReceipts",
  /**
  *r" Balance of a contract overflowed
  */
  BalanceOverflow: 43,
  43: "BalanceOverflow",
  /**
  *r" Block height value is invalid, typically because it is too large
  */
  InvalidBlockHeight: 44,
  44: "InvalidBlockHeight",
  /**
  *r" Attempt to use sequential memory instructions with too large slot count,
  *r" typically because it cannot fit into usize
  */
  TooManySlots: 45,
  45: "TooManySlots",
  /**
  *r" Caller of this internal context is also expected to be internal,
  *r" i.e. $fp->$fp must be non-zero.
  */
  ExpectedNestedCaller: 46,
  46: "ExpectedNestedCaller",
  /**
  *r" During memory growth, the stack overlapped with the heap
  */
  MemoryGrowthOverlap: 47,
  47: "MemoryGrowthOverlap",
  /**
  *r" Attempting to read or write uninitialized memory.
  *r" Also occurs when boundary crosses from stack to heap.
  */
  UninitalizedMemoryAccess: 48,
  48: "UninitalizedMemoryAccess",
  /**
  *r" Overriding consensus parameters is not allowed.
  */
  OverridingConsensusParameters: 49,
  49: "OverridingConsensusParameters",
  /**
  *r" The storage doesn't know about the hash of the state transition bytecode.
  */
  UnknownStateTransactionBytecodeRoot: 50,
  50: "UnknownStateTransactionBytecodeRoot",
  /**
  *r" Overriding the state transition bytecode is not allowed.
  */
  OverridingStateTransactionBytecode: 51,
  51: "OverridingStateTransactionBytecode",
  /**
  *r" The bytecode is already uploaded and cannot be uploaded again.
  */
  BytecodeAlreadyUploaded: 52,
  52: "BytecodeAlreadyUploaded",
  /**
  *r" The part of the bytecode is not sequentially connected to the previous parts.
  */
  ThePartIsNotSequentiallyConnected: 53,
  53: "ThePartIsNotSequentiallyConnected",
  /**
  *r" The requested blob is not found.
  */
  BlobNotFound: 54,
  54: "BlobNotFound",
  /**
  *r" The blob was already
  */
  BlobIdAlreadyUploaded: 55,
  55: "BlobIdAlreadyUploaded",
  /**
  *r" Active gas costs do not define the cost for this instruction.
  */
  GasCostNotDefined: 56,
  56: "GasCostNotDefined"
}), yy = Object.freeze({
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
}), by = Object.freeze({
  /**
  *r" Get if caller is external.
  */
  IsCallerExternal: 1,
  1: "IsCallerExternal",
  /**
  *r" Get caller's contract ID.
  */
  GetCaller: 2,
  2: "GetCaller",
  /**
  *r" Get index of current predicate.
  */
  GetVerifyingPredicate: 3,
  3: "GetVerifyingPredicate",
  /**
  *r" Get the Chain ID this VM is operating within
  */
  GetChainId: 4,
  4: "GetChainId",
  /**
  *r" Get memory address where the transaction is located
  */
  TxStart: 5,
  5: "TxStart",
  /**
  *r" Get memory address of base asset ID
  */
  BaseAssetId: 6,
  6: "BaseAssetId"
}), Kc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_add_free(e >>> 0, 1));
class Iy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kc.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Kc.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const td = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_addi_free(e >>> 0, 1));
class Ey {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, td.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, td.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const ed = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_aloc_free(e >>> 0, 1));
class vy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ed.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, ed.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const rd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_and_free(e >>> 0, 1));
class Cy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, rd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const nd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_andi_free(e >>> 0, 1));
class By {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, nd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const sd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bal_free(e >>> 0, 1));
class xy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, sd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const id = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhei_free(e >>> 0, 1));
class Ry {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, id.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, id.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ad = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhsh_free(e >>> 0, 1));
class Sy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ad.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, ad.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const od = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bldd_free(e >>> 0, 1));
class Ty {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, od.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, od.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const cd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bsiz_free(e >>> 0, 1));
class Ny {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cd.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, cd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const dd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_burn_free(e >>> 0, 1));
class Dy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dd.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, dd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ud = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_call_free(e >>> 0, 1));
class Qy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ud.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, ud.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const _d = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cb_free(e >>> 0, 1));
class Fy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _d.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, _d.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const hd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ccp_free(e >>> 0, 1));
class Oy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hd.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, hd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ld = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfe_free(e >>> 0, 1));
class My {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ld.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, ld.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Ad = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfei_free(e >>> 0, 1));
class Ly {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ad.unregister(this), t;
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
    w(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Ad.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const fd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfs_free(e >>> 0, 1));
class Py {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fd.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, fd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const pd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfsi_free(e >>> 0, 1));
class ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pd.unregister(this), t;
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
    w(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, pd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const gd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_croo_free(e >>> 0, 1));
class Uy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gd.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, gd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const wd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_csiz_free(e >>> 0, 1));
class zy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wd.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, wd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const md = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_compareargs_free(e >>> 0, 1));
class Mr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Mr.prototype);
    return r.__wbg_ptr = t, md.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, md.unregister(this), t;
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
    const t = this.__destroy_into_raw(), r = c.compareargs_to_imm(t);
    return Tt.__wrap(r);
  }
  /**
  * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
  * @param {Imm06} bits
  * @returns {CompareArgs | undefined}
  */
  static from_imm(t) {
    w(t, Tt);
    var r = t.__destroy_into_raw();
    const n = c.compareargs_from_imm(r);
    return n === 0 ? void 0 : Mr.__wrap(n);
  }
}
const yd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_div_free(e >>> 0, 1));
class Gy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, yd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const bd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divi_free(e >>> 0, 1));
class Vy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, bd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Yy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divargs_free(e >>> 0, 1));
class cs {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yy.unregister(this), t;
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
const Id = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecal_free(e >>> 0, 1));
class Hy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Id.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Id.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Ed = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eck1_free(e >>> 0, 1));
class Xy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ed.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ed.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const vd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecr1_free(e >>> 0, 1));
class Zy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, vd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Cd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ed19_free(e >>> 0, 1));
class Wy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cd.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Cd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Bd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eq_free(e >>> 0, 1));
class jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Bd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_exp_free(e >>> 0, 1));
class Jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, xd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Rd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_expi_free(e >>> 0, 1));
class qy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Rd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Sd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_flag_free(e >>> 0, 1));
class $y {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sd.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Sd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ra = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gm_free(e >>> 0, 1));
class Ws {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ws.prototype);
    return r.__wbg_ptr = t, ra.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ra.unregister(this), t;
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
  static from_args(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    const s = c.gm_from_args(n, r);
    return Ws.__wrap(s);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {Imm18} selector
  */
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.gm_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, ra.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Te.__wrap(t);
  }
}
const Td = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gt_free(e >>> 0, 1));
class Ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Td.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Td.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const na = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gtf_free(e >>> 0, 1));
class js {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(js.prototype);
    return r.__wbg_ptr = t, na.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, na.unregister(this), t;
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
  static from_args(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    const a = c.gtf_from_args(s, i, n);
    return js.__wrap(a);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} arg
  * @param {Imm12} selector
  */
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.gtf_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, na.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Nd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm06_free(e >>> 0, 1));
class Tt {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Tt.prototype);
    return r.__wbg_ptr = t, Nd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm06_free(t, 0);
  }
}
const Dd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm12_free(e >>> 0, 1));
class _t {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(_t.prototype);
    return r.__wbg_ptr = t, Dd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm12_free(t, 0);
  }
}
const Qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm18_free(e >>> 0, 1));
class Te {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Te.prototype);
    return r.__wbg_ptr = t, Qd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm18_free(t, 0);
  }
}
const Fd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm24_free(e >>> 0, 1));
class Ie {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ie.prototype);
    return r.__wbg_ptr = t, Fd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm24_free(t, 0);
  }
}
const Od = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_instruction_free(e >>> 0, 1));
class L {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(L.prototype);
    return r.__wbg_ptr = t, Od.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Od.unregister(this), t;
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
      var t = $c().getInt32(s + 4 * 0, !0), r = $c().getInt32(s + 4 * 1, !0), n = gy(t, r).slice();
      return c.__wbindgen_export_0(t, r * 1, 1), n;
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
const Md = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ji_free(e >>> 0, 1));
class tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Md.unregister(this), t;
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
    w(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Md.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const Ld = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmp_free(e >>> 0, 1));
class eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ld.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Ld.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Pd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpb_free(e >>> 0, 1));
class rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pd.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Pd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Te.__wrap(t);
  }
}
const kd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpf_free(e >>> 0, 1));
class nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kd.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, kd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Te.__wrap(t);
  }
}
const Ud = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jne_free(e >>> 0, 1));
class sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ud.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ud.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jneb_free(e >>> 0, 1));
class ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zd.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, zd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const Gd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnef_free(e >>> 0, 1));
class ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gd.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Gd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const Vd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnei_free(e >>> 0, 1));
class ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Vd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Yd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzb_free(e >>> 0, 1));
class cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Yd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Hd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzf_free(e >>> 0, 1));
class db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Hd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzi_free(e >>> 0, 1));
class ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xd.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Xd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Te.__wrap(t);
  }
}
const Zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_k256_free(e >>> 0, 1));
class _b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Zd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Wd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lb_free(e >>> 0, 1));
class hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Wd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ldc_free(e >>> 0, 1));
class lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jd.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, jd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const Jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_log_free(e >>> 0, 1));
class Ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jd.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Jd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_logd_free(e >>> 0, 1));
class fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qd.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, qd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const $d = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lt_free(e >>> 0, 1));
class pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $d.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, $d.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Kd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lw_free(e >>> 0, 1));
class gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kd.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Kd.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcl_free(e >>> 0, 1));
class wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tu.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, tu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcli_free(e >>> 0, 1));
class mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eu.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, eu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Te.__wrap(t);
  }
}
const ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcp_free(e >>> 0, 1));
class yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ru.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ru.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcpi_free(e >>> 0, 1));
class bb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, nu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_meq_free(e >>> 0, 1));
class Ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, su.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, su.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mint_free(e >>> 0, 1));
class Eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, iu.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, iu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mldv_free(e >>> 0, 1));
class vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, au.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, au.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mlog_free(e >>> 0, 1));
class Cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ou.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ou.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mod_free(e >>> 0, 1));
class Bb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, cu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_modi_free(e >>> 0, 1));
class xb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, du.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, du.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_move_free(e >>> 0, 1));
class Rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uu.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, uu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const _u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_movi_free(e >>> 0, 1));
class Sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _u.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, _u.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Te.__wrap(t);
  }
}
const hu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mroo_free(e >>> 0, 1));
class Tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, hu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const lu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mul_free(e >>> 0, 1));
class Nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, lu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_muli_free(e >>> 0, 1));
class Db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Au.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Au.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Qb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mathargs_free(e >>> 0, 1));
class ds {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qb.unregister(this), t;
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
const Fb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mulargs_free(e >>> 0, 1));
class us {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fb.unregister(this), t;
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
const fu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_noop_free(e >>> 0, 1));
class Ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fu.unregister(this), t;
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
    return this.__wbg_ptr = t >>> 0, fu.register(this, this.__wbg_ptr, this), this;
  }
}
const pu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_not_free(e >>> 0, 1));
class Mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pu.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, pu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const gu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_or_free(e >>> 0, 1));
class Lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, gu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ori_free(e >>> 0, 1));
class Pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, wu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const mu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_poph_free(e >>> 0, 1));
class kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mu.unregister(this), t;
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
    w(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, mu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_popl_free(e >>> 0, 1));
class Ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yu.unregister(this), t;
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
    w(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, yu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const bu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshh_free(e >>> 0, 1));
class zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bu.unregister(this), t;
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
    w(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, bu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const Iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshl_free(e >>> 0, 1));
class Gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Iu.unregister(this), t;
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
    w(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Iu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const Eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_panicinstruction_free(e >>> 0, 1));
class Vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Eu.unregister(this), t;
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
  constructor(t, r) {
    const n = c.panicinstruction_error_typescript(t, r);
    return this.__wbg_ptr = n >>> 0, Eu.register(this, this.__wbg_ptr, this), this;
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
const vu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ret_free(e >>> 0, 1));
class Yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vu.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, vu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_retd_free(e >>> 0, 1));
class Hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cu.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Cu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Bu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_rvrt_free(e >>> 0, 1));
class Xb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bu.unregister(this), t;
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
    w(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Bu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const sa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_regid_free(e >>> 0, 1));
class h {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(h.prototype);
    return r.__wbg_ptr = t, sa.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sa.unregister(this), t;
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
    const r = c.regid_new_checked(t);
    return r === 0 ? void 0 : h.__wrap(r);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = c.regid_bal();
    return h.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = c.regid_cgas();
    return h.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = c.regid_err();
    return h.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = c.regid_flag();
    return h.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = c.regid_fp();
    return h.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = c.regid_ggas();
    return h.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = c.regid_hp();
    return h.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = c.regid_is();
    return h.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = c.regid_of();
    return h.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = c.regid_one();
    return h.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = c.regid_pc();
    return h.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = c.regid_ret();
    return h.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = c.regid_retl();
    return h.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = c.regid_sp();
    return h.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = c.regid_spp();
    return h.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = c.regid_writable();
    return h.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = c.regid_zero();
    return h.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const r = c.regid_new_typescript(t);
    return this.__wbg_ptr = r >>> 0, sa.register(this, this.__wbg_ptr, this), this;
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
const xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_s256_free(e >>> 0, 1));
class Zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, xu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sb_free(e >>> 0, 1));
class Wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ru.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ru.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_scwq_free(e >>> 0, 1));
class jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Su.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Su.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sll_free(e >>> 0, 1));
class Jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Tu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Tu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_slli_free(e >>> 0, 1));
class qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Nu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_smo_free(e >>> 0, 1));
class $b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Du.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Du.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Qu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srl_free(e >>> 0, 1));
class Kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Qu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Fu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srli_free(e >>> 0, 1));
class tI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Fu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srw_free(e >>> 0, 1));
class eI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ou.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ou.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Mu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srwq_free(e >>> 0, 1));
class rI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mu.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Mu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Lu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sub_free(e >>> 0, 1));
class nI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Lu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Pu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_subi_free(e >>> 0, 1));
class sI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Pu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const ku = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sw_free(e >>> 0, 1));
class iI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ku.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ku.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sww_free(e >>> 0, 1));
class aI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Uu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Uu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_swwq_free(e >>> 0, 1));
class oI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zu.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, zu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Gu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_time_free(e >>> 0, 1));
class cI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gu.unregister(this), t;
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
  constructor(t, r) {
    w(t, h);
    var n = t.__destroy_into_raw();
    w(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Gu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Vu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tr_free(e >>> 0, 1));
class dI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Vu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tro_free(e >>> 0, 1));
class uI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yu.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Yu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const Hu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdam_free(e >>> 0, 1));
class _I {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hu.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Hu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ia = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdcm_free(e >>> 0, 1));
class Js {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Js.prototype);
    return r.__wbg_ptr = t, ia.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ia.unregister(this), t;
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
  static from_args(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Mr);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_from_args(i, a, o, u);
    return Js.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, ia.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const aa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wddv_free(e >>> 0, 1));
class qs {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(qs.prototype);
    return r.__wbg_ptr = t, aa.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, aa.unregister(this), t;
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
  static from_args(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, cs);
    var u = s.__destroy_into_raw();
    const A = c.wddv_from_args(i, a, o, u);
    return qs.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, aa.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const Xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmd_free(e >>> 0, 1));
class hI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xu.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Xu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const oa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdml_free(e >>> 0, 1));
class $s {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create($s.prototype);
    return r.__wbg_ptr = t, oa.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, oa.unregister(this), t;
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
  static from_args(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, us);
    var u = s.__destroy_into_raw();
    const A = c.wdml_from_args(i, a, o, u);
    return $s.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, oa.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const Zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmm_free(e >>> 0, 1));
class lI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zu.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Zu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ca = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdop_free(e >>> 0, 1));
class Ks {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ks.prototype);
    return r.__wbg_ptr = t, ca.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ca.unregister(this), t;
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
  static from_args(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, ds);
    var u = s.__destroy_into_raw();
    const A = c.wdop_from_args(i, a, o, u);
    return Ks.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, ca.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const Wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqam_free(e >>> 0, 1));
class AI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wu.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Wu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const da = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqcm_free(e >>> 0, 1));
class ti {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ti.prototype);
    return r.__wbg_ptr = t, da.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, da.unregister(this), t;
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
  static from_args(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Mr);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_from_args(i, a, o, u);
    return ti.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, da.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const ua = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqdv_free(e >>> 0, 1));
class ei {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ei.prototype);
    return r.__wbg_ptr = t, ua.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ua.unregister(this), t;
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
  static from_args(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, cs);
    var u = s.__destroy_into_raw();
    const A = c.wddv_from_args(i, a, o, u);
    return ei.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, ua.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmd_free(e >>> 0, 1));
class fI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ju.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, ju.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const _a = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqml_free(e >>> 0, 1));
class ri {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ri.prototype);
    return r.__wbg_ptr = t, _a.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _a.unregister(this), t;
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
  static from_args(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, us);
    var u = s.__destroy_into_raw();
    const A = c.wdml_from_args(i, a, o, u);
    return ri.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, _a.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const Ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmm_free(e >>> 0, 1));
class pI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ju.unregister(this), t;
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
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, h);
    var u = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, Ju.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const ha = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqop_free(e >>> 0, 1));
class ni {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ni.prototype);
    return r.__wbg_ptr = t, ha.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ha.unregister(this), t;
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
  static from_args(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, ds);
    var u = s.__destroy_into_raw();
    const A = c.wdop_from_args(i, a, o, u);
    return ni.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    w(t, h);
    var i = t.__destroy_into_raw();
    w(r, h);
    var a = r.__destroy_into_raw();
    w(n, h);
    var o = n.__destroy_into_raw();
    w(s, Tt);
    var u = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = A >>> 0, ha.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Tt.__wrap(t);
  }
}
const qu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xor_free(e >>> 0, 1));
class gI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qu.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, qu.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const $u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xori_free(e >>> 0, 1));
class wI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $u.unregister(this), t;
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
  constructor(t, r, n) {
    w(t, h);
    var s = t.__destroy_into_raw();
    w(r, h);
    var i = r.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, $u.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
async function mI(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (n) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    const r = await e.arrayBuffer();
    return await WebAssembly.instantiate(r, t);
  } else {
    const r = await WebAssembly.instantiate(e, t);
    return r instanceof WebAssembly.Instance ? { instance: r, module: e } : r;
  }
}
function _l() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(w0(t, r));
  }, e;
}
function hl(e, t) {
  return c = e.exports, ll.__wbindgen_wasm_module = t, zr = null, Un = null, c;
}
function yI(e) {
  if (c !== void 0) return c;
  typeof e < "u" && Object.getPrototypeOf(e) === Object.prototype ? { module: e } = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
  const t = _l();
  e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
  const r = new WebAssembly.Instance(e, t);
  return hl(r, e);
}
async function ll(e) {
  if (c !== void 0) return c;
  typeof e < "u" && Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead");
  const t = _l(), { instance: r, module: n } = await mI(await e, t);
  return hl(r, n);
}
function bI(e, t, r, n) {
  var s = null, i = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (i)
    s = Buffer.from(r, "base64");
  else {
    var a = globalThis.atob(r), o = a.length;
    s = new Uint8Array(new ArrayBuffer(o));
    for (var u = 0; u < o; u++)
      s[u] = a.charCodeAt(u);
  }
  {
    var A = new WebAssembly.Module(s);
    return n ? new WebAssembly.Instance(A, n) : A;
  }
}
function II(e) {
  return bI(1, null, "AGFzbQEAAAABOgpgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38AYAJ/fwF/YAABf2AFf39/f38Bf2ABfwBgA39/fwBgAAACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cAAwP/Af0BAQEDAwMDAwMBAQMDAQEBAwMBAQEEAQMDAwEBAwEBAQQCAQMCAgICAgIDAwMEBAQEBAQEBAEBAQMDAAICBAQEBAQEBAQEBAABAQgDAwQBAQEBAQEBAgcDAQAAAQEDBwcBAwEDAgIBAQEAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQUBAQEBBAAEAQYCAgMDAAIABwEIBAEEAQkDAQEHAQUFBQUFBQUFBQUFBQUFBQUFBQUDBgYCAgQCBgYAAAgABAUDAQARBgkBfwFBgIDAAAsHjUzPBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlABAaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUASBpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQA4Il9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMASSJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAEsSY29tcGFyZWFyZ3NfdG9faW1tAFgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AHxVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AASBVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAORJfX3diZ19tdWxhcmdzX2ZyZWUAER5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMASB5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMATBJfX3diZ19kaXZhcmdzX2ZyZWUAIx5fX3diZ19nZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMAuQEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAGMbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlABchcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AE0XcGFuaWNpbnN0cnVjdGlvbl9yZWFzb24AWxxwYW5pY2luc3RydWN0aW9uX2luc3RydWN0aW9uAFwMZ21fZnJvbV9hcmdzANUBDWd0Zl9mcm9tX2FyZ3MAzQEHZ21fYXJncwCIAQhndGZfYXJncwBpDndkY21fZnJvbV9hcmdzADsOd2RvcF9mcm9tX2FyZ3MAOw53ZG1sX2Zyb21fYXJncwA8DndkZHZfZnJvbV9hcmdzAMkBCXdkY21fYXJncwAkCXdxY21fYXJncwAlCXdkb3BfYXJncwAmCXdxb3BfYXJncwAnCXdkbWxfYXJncwAoCXdxbWxfYXJncwApCXdkZHZfYXJncwBkCXdxZHZfYXJncwBlEF9fd2JnX2ltbTA2X2ZyZWUAKhBfX3diZ19pbW0xMl9mcmVlACsQX193YmdfaW1tMThfZnJlZQAsDl9fd2JnX2FkZF9mcmVlABgPX193Ymdfbm9vcF9mcmVlAAcSYWRkX25ld190eXBlc2NyaXB0AFkGYWRkX3JhADUGYWRkX3JiABIGYWRkX3JjABoDYWRkAMUBA2FuZACKAQNkaXYAiwECZXEAjAEDZXhwAI0BAmd0AI4BAmx0AI8BBG1sb2cAkAEEbXJvbwCRAQRtb2RfAJIBBW1vdmVfAD0DbXVsAJMBA25vdAA+Am9yAJQBA3NsbACVAQNzcmwAlgEDc3ViAJcBA3hvcgCYAQRtbGR2AGoDcmV0ALoBBHJldGQAPxNhbG9jX25ld190eXBlc2NyaXB0AGAHYWxvY19yYQAiBGFsb2MAuwEDbWNsAEADbWNwAJkBA21lcQBrE2Joc2hfbmV3X3R5cGVzY3JpcHQAIARiaHNoAC0EYmhlaQC8AQRidXJuAEEEY2FsbABsA2NjcABtBGNyb28AQgRjc2l6AEMCY2IAvQEDbGRjAG4DbG9nAG8EbG9nZABwBG1pbnQARARydnJ0AL4BBHNjd3EAmgEDc3J3AJsBBHNyd3EAcQNzd3cAnAEEc3d3cQByAnRyAJ0BA3RybwBzBGVjazEAngEEZWNyMQCfAQRlZDE5AHQEazI1NgCgAQRzMjU2AKEBBHRpbWUARRNub29wX25ld190eXBlc2NyaXB0AL8BBG5vb3AA3QEEZmxhZwDAAQNiYWwAogEDam1wAMEBA2puZQCjAQNzbW8AdRNhZGRpX25ld190eXBlc2NyaXB0AFoKYWRkaV9pbW0xMgAJBGFkZGkApAEEYW5kaQClAQRkaXZpAKYBBGV4cGkApwEEbW9kaQCoAQRtdWxpAKkBA29yaQCqAQRzbGxpAKsBBHNybGkArAEEc3ViaQCtAQR4b3JpAK4BBGpuZWkArwECbGIAsAECbHcAsQECc2IAsgECc3cAswEEbWNwaQC0ARJndGZfbmV3X3R5cGVzY3JpcHQAzwEDZ3RmALUBBG1jbGkALhFnbV9uZXdfdHlwZXNjcmlwdABGCGdtX2ltbTE4AA0CZ20ALwRtb3ZpADAEam56aQAxBGptcGYAMhNqbXBiX25ld190eXBlc2NyaXB0ABUEam1wYgAzBGpuemYAtgEEam56YgC3AQRqbmVmAHYKam5lYl9pbW0wNgA2BGpuZWIAdwJqaQBOE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0AAoEY2ZlaQBPBGNmc2kAUANjZmUAwgEDY2ZzAMMBBHBzaGwAUQRwc2hoAFIEcG9wbABTBHBvcGgAVBN3ZGNtX25ld190eXBlc2NyaXB0AMoBBHdkY20AeAR3cWNtAHkEd2RvcAB6BHdxb3AAewR3ZG1sAHwEd3FtbAB9BHdkZHYAfgR3cWR2AH8Ed2RtZACAAQR3cW1kAIEBBHdkYW0AggEEd3FhbQCDAQR3ZG1tAIQBBHdxbW0AhQEEZWNhbACGAQRic2l6ADQTYmxkZF9uZXdfdHlwZXNjcmlwdABVB2JsZGRfcmQANgRibGRkAIcBFl9fd2JnX2luc3RydWN0aW9uX2ZyZWUADBRpbnN0cnVjdGlvbl90b19ieXRlcwAGEGluc3RydWN0aW9uX3NpemUA7wERcmVnaWRfbmV3X2NoZWNrZWQAuAEJcmVnaWRfYmFsAN4BCnJlZ2lkX2NnYXMA3wEJcmVnaWRfZXJyAOABCnJlZ2lkX2ZsYWcA4QEIcmVnaWRfZnAA4gEKcmVnaWRfZ2dhcwDjAQhyZWdpZF9ocADkAQhyZWdpZF9pcwDlAQhyZWdpZF9vZgDmAQlyZWdpZF9vbmUA5wEIcmVnaWRfcGMA6AEJcmVnaWRfcmV0AOkBCnJlZ2lkX3JldGwA6gEIcmVnaWRfc3AA6wEJcmVnaWRfc3BwAOwBDnJlZ2lkX3dyaXRhYmxlAO0BCnJlZ2lkX3plcm8A7gEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA2QELcmVnaWRfdG9fdTgA2gESYW5kX25ld190eXBlc2NyaXB0AFkSZGl2X25ld190eXBlc2NyaXB0AFkRZXFfbmV3X3R5cGVzY3JpcHQAWRJleHBfbmV3X3R5cGVzY3JpcHQAWRFndF9uZXdfdHlwZXNjcmlwdABZEWx0X25ld190eXBlc2NyaXB0AFkTbWxvZ19uZXdfdHlwZXNjcmlwdABZE21yb29fbmV3X3R5cGVzY3JpcHQAWRJtb2RfbmV3X3R5cGVzY3JpcHQAWRJtdWxfbmV3X3R5cGVzY3JpcHQAWRFvcl9uZXdfdHlwZXNjcmlwdABZEnNsbF9uZXdfdHlwZXNjcmlwdABZEnNybF9uZXdfdHlwZXNjcmlwdABZEnN1Yl9uZXdfdHlwZXNjcmlwdABZEnhvcl9uZXdfdHlwZXNjcmlwdABZEm1jcF9uZXdfdHlwZXNjcmlwdABZE3Njd3FfbmV3X3R5cGVzY3JpcHQAWRJzcndfbmV3X3R5cGVzY3JpcHQAWRJzd3dfbmV3X3R5cGVzY3JpcHQAWRF0cl9uZXdfdHlwZXNjcmlwdABZE2VjazFfbmV3X3R5cGVzY3JpcHQAWRNlY3IxX25ld190eXBlc2NyaXB0AFkTazI1Nl9uZXdfdHlwZXNjcmlwdABZE3MyNTZfbmV3X3R5cGVzY3JpcHQAWRJiYWxfbmV3X3R5cGVzY3JpcHQAWRJqbmVfbmV3X3R5cGVzY3JpcHQAWRNhbmRpX25ld190eXBlc2NyaXB0AFoTZGl2aV9uZXdfdHlwZXNjcmlwdABaE2V4cGlfbmV3X3R5cGVzY3JpcHQAWhNtb2RpX25ld190eXBlc2NyaXB0AFoTbXVsaV9uZXdfdHlwZXNjcmlwdABaEm9yaV9uZXdfdHlwZXNjcmlwdABaE3NsbGlfbmV3X3R5cGVzY3JpcHQAWhNzcmxpX25ld190eXBlc2NyaXB0AFoTc3ViaV9uZXdfdHlwZXNjcmlwdABaE3hvcmlfbmV3X3R5cGVzY3JpcHQAWhNqbmVpX25ld190eXBlc2NyaXB0AFoRbGJfbmV3X3R5cGVzY3JpcHQAWhFsd19uZXdfdHlwZXNjcmlwdABaEXNiX25ld190eXBlc2NyaXB0AFoRc3dfbmV3X3R5cGVzY3JpcHQAWhNtY3BpX25ld190eXBlc2NyaXB0AFoTam56Zl9uZXdfdHlwZXNjcmlwdABaE2puemJfbmV3X3R5cGVzY3JpcHQAWhFqaV9uZXdfdHlwZXNjcmlwdAA3E2Nmc2lfbmV3X3R5cGVzY3JpcHQANxNwc2hsX25ld190eXBlc2NyaXB0ADcTcHNoaF9uZXdfdHlwZXNjcmlwdAA3E3BvcGxfbmV3X3R5cGVzY3JpcHQANxNwb3BoX25ld190eXBlc2NyaXB0ADcTbW92aV9uZXdfdHlwZXNjcmlwdAAVE21jbGlfbmV3X3R5cGVzY3JpcHQAFRNqbnppX25ld190eXBlc2NyaXB0ABUTam1wZl9uZXdfdHlwZXNjcmlwdAAVEm5vdF9uZXdfdHlwZXNjcmlwdAAgE3JldGRfbmV3X3R5cGVzY3JpcHQAIBNtb3ZlX25ld190eXBlc2NyaXB0ACASbWNsX25ld190eXBlc2NyaXB0ACATYnVybl9uZXdfdHlwZXNjcmlwdAAgE2Nyb29fbmV3X3R5cGVzY3JpcHQAIBNjc2l6X25ld190eXBlc2NyaXB0ACATbWludF9uZXdfdHlwZXNjcmlwdAAgE3RpbWVfbmV3X3R5cGVzY3JpcHQAIBNic2l6X25ld190eXBlc2NyaXB0ACAGcmV0X3JhACIHYmhlaV9yYQAiBWNiX3JhACIHcnZydF9yYQAiB2ZsYWdfcmEAIgZqbXBfcmEAIghqaV9pbW0yNAAKCmNmc2lfaW1tMjQACgZjZmVfcmEAIgZjZnNfcmEAIgpwc2hsX2ltbTI0AAoKcHNoaF9pbW0yNAAKCnBvcGxfaW1tMjQACgpwb3BoX2ltbTI0AAoTbWxkdl9uZXdfdHlwZXNjcmlwdABVEm1lcV9uZXdfdHlwZXNjcmlwdABVEmNjcF9uZXdfdHlwZXNjcmlwdABVEmxvZ19uZXdfdHlwZXNjcmlwdABVE2xvZ2RfbmV3X3R5cGVzY3JpcHQAVRNzcndxX25ld190eXBlc2NyaXB0AFUTc3d3cV9uZXdfdHlwZXNjcmlwdABVEnRyb19uZXdfdHlwZXNjcmlwdABVE2VkMTlfbmV3X3R5cGVzY3JpcHQAVRJzbW9fbmV3X3R5cGVzY3JpcHQAVRJsZGNfbmV3X3R5cGVzY3JpcHQAVRNqbmVmX25ld190eXBlc2NyaXB0AFUTd2RtZF9uZXdfdHlwZXNjcmlwdABVE3dxbWRfbmV3X3R5cGVzY3JpcHQAVRN3ZGFtX25ld190eXBlc2NyaXB0AFUTd3FhbV9uZXdfdHlwZXNjcmlwdABVE3dkbW1fbmV3X3R5cGVzY3JpcHQAVRN3cW1tX25ld190eXBlc2NyaXB0AFUTZWNhbF9uZXdfdHlwZXNjcmlwdABVE2NhbGxfbmV3X3R5cGVzY3JpcHQAVRNfX3diZ19tYXRoYXJnc19mcmVlABAfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwBLHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X2xocwBLH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMASR5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9saHMASRJyZXRfbmV3X3R5cGVzY3JpcHQAYBNiaGVpX25ld190eXBlc2NyaXB0AGARY2JfbmV3X3R5cGVzY3JpcHQAYBNydnJ0X25ld190eXBlc2NyaXB0AGATZmxhZ19uZXdfdHlwZXNjcmlwdABgEmptcF9uZXdfdHlwZXNjcmlwdABgEmNmZV9uZXdfdHlwZXNjcmlwdABgEmNmc19uZXdfdHlwZXNjcmlwdABgD19fd2JnX3dkb3BfZnJlZQAYDl9fd2JnX21vZF9mcmVlABgPX193Ymdfd3Fkdl9mcmVlABgNX193Ymdfc2JfZnJlZQAYDl9fd2JnX3Ntb19mcmVlABgPX193YmdfcHNobF9mcmVlABgOX193YmdfbG9nX2ZyZWUAGA9fX3diZ193cWFtX2ZyZWUAGA9fX3diZ193cW1sX2ZyZWUAGA5fX3diZ19ub3RfZnJlZQAYD19fd2JnX2puemlfZnJlZQAYD19fd2JnX2puZWlfZnJlZQAYD19fd2JnX3N1YmlfZnJlZQAYD19fd2JnX2ZsYWdfZnJlZQAYD19fd2JnX2NzaXpfZnJlZQAYD19fd2JnX3Nyd3FfZnJlZQAYD19fd2JnX3NsbGlfZnJlZQAYD19fd2JnX2ptcGJfZnJlZQAYD19fd2JnX3dkbWxfZnJlZQAYD19fd2JnX3MyNTZfZnJlZQAYDl9fd2JnX3hvcl9mcmVlABgOX193YmdfY2ZlX2ZyZWUAGA1fX3diZ19ndF9mcmVlABgPX193YmdfcHNoaF9mcmVlABgPX193YmdfbWNsaV9mcmVlABgNX193YmdfbHRfZnJlZQAYD19fd2JnX2puZWZfZnJlZQAYDV9fd2JnX3N3X2ZyZWUAGA9fX3diZ19zcmxpX2ZyZWUAGA9fX3diZ19idXJuX2ZyZWUAGA9fX3diZ19ic2l6X2ZyZWUAGA9fX3diZ19ydnJ0X2ZyZWUAGA9fX3diZ194b3JpX2ZyZWUAGA9fX3diZ19tdWxpX2ZyZWUAGA1fX3diZ19sYl9mcmVlABgNX193YmdfZ21fZnJlZQAYD19fd2JnX2Joc2hfZnJlZQAYDV9fd2JnX2VxX2ZyZWUAGA5fX3diZ19zbGxfZnJlZQAYDl9fd2JnX29yaV9mcmVlABgPX193YmdfZWQxOV9mcmVlABgPX193YmdfY2ZlaV9mcmVlABgPX193YmdfY2ZzaV9mcmVlABgPX193Ymdfam56Yl9mcmVlABgPX193YmdfYWxvY19mcmVlABgOX193Ymdfc3JsX2ZyZWUAGA9fX3diZ19tcm9vX2ZyZWUAGA5fX3diZ19jZnNfZnJlZQAYDl9fd2JnX2ptcF9mcmVlABgPX193YmdfYmhlaV9mcmVlABgPX193YmdfbG9nZF9mcmVlABgPX193Ymdfam5lYl9mcmVlABgPX193Ymdfd3FtbV9mcmVlABgPX193YmdfcG9waF9mcmVlABgPX193Ymdfd2RjbV9mcmVlABgPX193YmdfZXhwaV9mcmVlABgPX193YmdfYWRkaV9mcmVlABgPX193YmdfYmxkZF9mcmVlABgOX193YmdfbGRjX2ZyZWUAGA5fX3diZ19kaXZfZnJlZQAYD19fd2JnX3dkZHZfZnJlZQAYD19fd2JnX21sZHZfZnJlZQAYDl9fd2JnX21jbF9mcmVlABgOX193YmdfbXVsX2ZyZWUAGA9fX3diZ193ZGFtX2ZyZWUAGA9fX3diZ19jYWxsX2ZyZWUAGA1fX3diZ19sd19mcmVlABgPX193YmdfZWNhbF9mcmVlABgPX193YmdfbWxvZ19mcmVlABgPX193YmdfcmV0ZF9mcmVlABgPX193YmdfdGltZV9mcmVlABgOX193YmdfZ3RmX2ZyZWUAGA5fX3diZ19qbmVfZnJlZQAYDV9fd2JnX29yX2ZyZWUAGA9fX3diZ19kaXZpX2ZyZWUAGA9fX3diZ19qbnpmX2ZyZWUAGA5fX3diZ190cm9fZnJlZQAYDl9fd2JnX21jcF9mcmVlABgPX193YmdfbWludF9mcmVlABgOX193Ymdfc3ViX2ZyZWUAGA1fX3diZ19jYl9mcmVlABgPX193Ymdfd3FvcF9mcmVlABgOX193Ymdfc3J3X2ZyZWUAGA9fX3diZ19lY3IxX2ZyZWUAGA9fX3diZ19qbXBmX2ZyZWUAGA9fX3diZ19rMjU2X2ZyZWUAGA5fX3diZ19yZXRfZnJlZQAYD19fd2JnX3Njd3FfZnJlZQAYDl9fd2JnX21lcV9mcmVlABgPX193Ymdfc3d3cV9mcmVlABgOX193YmdfYmFsX2ZyZWUAGA9fX3diZ19tb3ZpX2ZyZWUAGA9fX3diZ193ZG1kX2ZyZWUAGA9fX3diZ19wb3BsX2ZyZWUAGA9fX3diZ193ZG1tX2ZyZWUAGA5fX3diZ19leHBfZnJlZQAYDV9fd2JnX2ppX2ZyZWUAGA9fX3diZ193cWNtX2ZyZWUAGA9fX3diZ19tY3BpX2ZyZWUAGA9fX3diZ19tb2RpX2ZyZWUAGA1fX3diZ190cl9mcmVlABgPX193YmdfYW5kaV9mcmVlABgOX193YmdfY2NwX2ZyZWUAGA5fX3diZ19zd3dfZnJlZQAYD19fd2JnX2Nyb29fZnJlZQAYD19fd2JnX3dxbWRfZnJlZQAYD19fd2JnX21vdmVfZnJlZQAYD19fd2JnX2VjazFfZnJlZQAYDl9fd2JnX2FuZF9mcmVlABgTd3Fkdl9uZXdfdHlwZXNjcmlwdADKARN3cW1sX25ld190eXBlc2NyaXB0AMoBE3dkbWxfbmV3X3R5cGVzY3JpcHQAygETd3FvcF9uZXdfdHlwZXNjcmlwdADKARN3ZG9wX25ld190eXBlc2NyaXB0AMoBE3dxY21fbmV3X3R5cGVzY3JpcHQAygETd2Rkdl9uZXdfdHlwZXNjcmlwdADKAQ53cWNtX2Zyb21fYXJncwA7CndxZHZfaW1tMDYANgp3cW1sX2ltbTA2ADYKd2RtbF9pbW0wNgA2Cndxb3BfaW1tMDYANgp3ZG9wX2ltbTA2ADYKd3FjbV9pbW0wNgA2CndkZHZfaW1tMDYANgp3ZGNtX2ltbTA2ADYKam5lZl9pbW0wNgA2CWxkY19pbW0wNgA2DndxbWxfZnJvbV9hcmdzADwOd3FvcF9mcm9tX2FyZ3MAOwVnbV9yYQA1BWd0X3JjABoFZ3RfcmIAEgVndF9yYQA1BWxiX3JiABIFbGJfcmEANQVsdF9yYwAaBWx0X3JiABIFbHRfcmEANQhsd19pbW0xMgAJBWx3X3JiABIFbHdfcmEANQVvcl9yYwAaBW9yX3JiABIFb3JfcmEANQhzYl9pbW0xMgAJBXNiX3JiABIFc2JfcmEANQhzd19pbW0xMgAJBXN3X3JiABIFc3dfcmEANQV0cl9yYwAaBXRyX3JiABIFdHJfcmEANQVlcV9yYwAaBWVxX3JiABIFZXFfcmEANQZhbmRfcmMAGgZhbmRfcmIAEgZhbmRfcmEANQZiYWxfcmMAGgZiYWxfcmIAEgZiYWxfcmEANQZjY3BfcmMAGgZjY3BfcmIAEgZjY3BfcmEANQZkaXZfcmMAGgZkaXZfcmIAEgZkaXZfcmEANQZleHBfcmMAGgZleHBfcmIAEgZleHBfcmEANQhsYl9pbW0xMgAJBmd0Zl9yYgASBmd0Zl9yYQA1BmpuZV9yYwAaBmpuZV9yYgASBmpuZV9yYQA1BmxkY19yYwAaBmxkY19yYgASBmxkY19yYQA1BmxvZ19yZAA2BmxvZ19yYwAaBmxvZ19yYgASBmxvZ19yYQA1Bm1jbF9yYgASBm1jbF9yYQA1Bm1jcF9yYwAaBm1jcF9yYgASBm1jcF9yYQA1Bm1lcV9yZAA2Bm1lcV9yYwAaBm1lcV9yYgASBm1lcV9yYQA1Bm1vZF9yYwAaBm1vZF9yYgASBm1vZF9yYQA1Bm11bF9yYwAaBm11bF9yYgASBm11bF9yYQA1Bm5vdF9yYgASBm5vdF9yYQA1CW9yaV9pbW0xMgAJBm9yaV9yYgASBm9yaV9yYQA1BnNsbF9yYwAaBnNsbF9yYgASBnNsbF9yYQA1BnNtb19yZAA2BnNtb19yYwAaBnNtb19yYgASBnNtb19yYQA1BnNybF9yYwAaBnNybF9yYgASBnNybF9yYQA1BnNyd19yYwAaBnNyd19yYgASBnNyd19yYQA1BnN1Yl9yYwAaBnN1Yl9yYgASBnN1Yl9yYQA1BnN3d19yYwAaBnN3d19yYgASBnN3d19yYQA1BnRyb19yZAA2BnRyb19yYwAaBnRyb19yYgASBnRyb19yYQA1Bnhvcl9yYwAaBnhvcl9yYgASBnhvcl9yYQA1CWd0Zl9pbW0xMgAJB2FkZGlfcmIAEgdhZGRpX3JhADUKYW5kaV9pbW0xMgAJB2FuZGlfcmIAEgdhbmRpX3JhADUHYmhzaF9yYgASB2Joc2hfcmEANQZjY3BfcmQANgdibGRkX3JjABoHYmxkZF9yYgASB2JsZGRfcmEANQdic2l6X3JiABIHYnNpel9yYQA1B2J1cm5fcmIAEgdidXJuX3JhADUHY2FsbF9yZAA2B2NhbGxfcmMAGgdjYWxsX3JiABIHY2FsbF9yYQA1B2Nyb29fcmIAEgdjcm9vX3JhADUHY3Npel9yYgASB2NzaXpfcmEANQpkaXZpX2ltbTEyAAkHZGl2aV9yYgASB2RpdmlfcmEANQdlY2FsX3JkADYHZWNhbF9yYwAaB2VjYWxfcmIAEgdlY2FsX3JhADUHZWNrMV9yYwAaB2VjazFfcmIAEgdlY2sxX3JhADUHZWNyMV9yYwAaB2VjcjFfcmIAEgdlY3IxX3JhADUHZWQxOV9yZAA2B2VkMTlfcmMAGgdlZDE5X3JiABIHZWQxOV9yYQA1CmV4cGlfaW1tMTIACQdleHBpX3JiABIHZXhwaV9yYQA1CmptcGJfaW1tMTgADQdqbXBiX3JhADUKam1wZl9pbW0xOAANB2ptcGZfcmEANQdqbmViX3JjABoHam5lYl9yYgASB2puZWJfcmEANQdqbmVmX3JjABoHam5lZl9yYgASB2puZWZfcmEANQpqbmVpX2ltbTEyAAkHam5laV9yYgASB2puZWlfcmEANQpqbnpiX2ltbTEyAAkHam56Yl9yYgASB2puemJfcmEANQpqbnpmX2ltbTEyAAkHam56Zl9yYgASB2puemZfcmEANQpqbnppX2ltbTE4AA0Ham56aV9yYQA1B2syNTZfcmMAGgdrMjU2X3JiABIHazI1Nl9yYQA1B2xvZ2RfcmQANgdsb2dkX3JjABoHbG9nZF9yYgASB2xvZ2RfcmEANQptY2xpX2ltbTE4AA0HbWNsaV9yYQA1Cm1jcGlfaW1tMTIACQdtY3BpX3JiABIHbWNwaV9yYQA1B21pbnRfcmIAEgdtaW50X3JhADUHbWxkdl9yZAA2B21sZHZfcmMAGgdtbGR2X3JiABIHbWxkdl9yYQA1B21sb2dfcmMAGgdtbG9nX3JiABIHbWxvZ19yYQA1Cm1vZGlfaW1tMTIACQdtb2RpX3JiABIHbW9kaV9yYQA1B21vdmVfcmIAEgdtb3ZlX3JhADUKbW92aV9pbW0xOAANB21vdmlfcmEANQdtcm9vX3JjABoHbXJvb19yYgASB21yb29fcmEANQptdWxpX2ltbTEyAAkHbXVsaV9yYgASB211bGlfcmEANQdyZXRkX3JiABIHcmV0ZF9yYQA1B3MyNTZfcmMAGgdzMjU2X3JiABIHczI1Nl9yYQA1B3Njd3FfcmMAGgdzY3dxX3JiABIHc2N3cV9yYQA1CnNsbGlfaW1tMTIACQdzbGxpX3JiABIHc2xsaV9yYQA1CnNybGlfaW1tMTIACQdzcmxpX3JiABIHc3JsaV9yYQA1B3Nyd3FfcmQANgdzcndxX3JjABoHc3J3cV9yYgASB3Nyd3FfcmEANQpzdWJpX2ltbTEyAAkHc3ViaV9yYgASB3N1YmlfcmEANQdzd3dxX3JkADYHc3d3cV9yYwAaB3N3d3FfcmIAEgdzd3dxX3JhADUHdGltZV9yYgASB3RpbWVfcmEANQd3ZGFtX3JkADYHd2RhbV9yYwAaB3dkYW1fcmIAEgd3ZGFtX3JhADUHd2RjbV9yYwAaB3dkY21fcmIAEgd3ZGNtX3JhADUHd2Rkdl9yYwAaB3dkZHZfcmIAEgd3ZGR2X3JhADUHd2RtZF9yZAA2B3dkbWRfcmMAGgd3ZG1kX3JiABIHd2RtZF9yYQA1B3dkbWxfcmMAGgd3ZG1sX3JiABIHd2RtbF9yYQA1B3dkbW1fcmQANgd3ZG1tX3JjABoHd2RtbV9yYgASB3dkbW1fcmEANQd3ZG9wX3JjABoHd2RvcF9yYgASB3dkb3BfcmEANQd3cWFtX3JkADYHd3FhbV9yYwAaB3dxYW1fcmIAEgd3cWFtX3JhADUHd3FjbV9yYwAaB3dxY21fcmIAEgd3cWNtX3JhADUHd3Fkdl9yYwAaB3dxZHZfcmIAEgd3cWR2X3JhADUHd3FtZF9yZAA2B3dxbWRfcmMAGgd3cW1kX3JiABIHd3FtZF9yYQA1B3dxbWxfcmMAGgd3cW1sX3JiABIHd3FtbF9yYQA1B3dxbW1fcmQANgd3cW1tX3JjABoHd3FtbV9yYgASB3dxbW1fcmEANQd3cW9wX3JjABoHd3FvcF9yYgASB3dxb3BfcmEANQp4b3JpX2ltbTEyAAkHeG9yaV9yYgASB3hvcmlfcmEANRNqbmViX25ld190eXBlc2NyaXB0AFUQX193YmdfcmVnaWRfZnJlZQAqDndxZHZfZnJvbV9hcmdzAMkBEF9fd2JnX2ltbTI0X2ZyZWUALB9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyANYBE19fd2JpbmRnZW5fZXhwb3J0XzAA0gEKgXv9Ae0iAgh/AX4CQAJAAkACQAJAAkACQAJAIABB9QFPBEAgAEHN/3tPDQUgAEELaiIAQXhxIQVB5I7AACgCACIIRQ0EQQAgBWshBAJ/QQAgBUGAAkkNABpBHyAFQf///wdLDQAaIAVBBiAAQQh2ZyIAa3ZBAXEgAEEBdGtBPmoLIgdBAnRByIvAAGooAgAiAkUEQEEAIQAMAgtBACEAIAVBGSAHQQF2a0EAIAdBH0cbdCEDA0ACQCACKAIEQXhxIgYgBUkNACAGIAVrIgYgBE8NACACIQEgBiIEDQBBACEEIAEhAAwECyACKAIUIgYgACAGIAIgA0EddkEEcWpBEGooAgAiAkcbIAAgBhshACADQQF0IQMgAg0ACwwBC0HgjsAAKAIAIgJBECAAQQtqQfgDcSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQdiMwABqIgMgAEHgjMAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0HgjsAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB6I7AACgCAE0NAwJAAkAgAUUEQEHkjsAAKAIAIgBFDQYgAGhBAnRByIvAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgASgCFCIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACKAIUIgAbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyACQRRqIAJBEGogABshAwNAIAMhBiABIgBBFGogAEEQaiAAKAIUIgEbIQMgAEEUQRAgARtqKAIAIgENAAsgBkEANgIACyAHRQ0EIAIgAigCHEECdEHIi8AAaiIBKAIARwRAIAdBEEEUIAcoAhAgAkYbaiAANgIAIABFDQUMBAsgASAANgIAIAANA0HkjsAAQeSOwAAoAgBBfiACKAIcd3E2AgAMBAsgACgCBEF4cSAFayIBIAQgASAESSIBGyEEIAAgAiABGyECIAAhAQwACwALAkBBAiAAdCIDQQAgA2tyIAEgAHRxaCIAQQN0IgFB2IzAAGoiAyABQeCMwABqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQeCOwAAgAkF+IAB3cTYCAAsgASAFQQNyNgIEIAEgBWoiBiAAQQN0IgAgBWsiBEEBcjYCBCAAIAFqIAQ2AgBB6I7AACgCACICBEAgAkF4cUHYjMAAaiEAQfCOwAAoAgAhAwJ/QeCOwAAoAgAiBUEBIAJBA3Z0IgJxRQRAQeCOwAAgAiAFcjYCACAADAELIAAoAggLIQIgACADNgIIIAIgAzYCDCADIAA2AgwgAyACNgIIC0HwjsAAIAY2AgBB6I7AACAENgIAIAFBCGoPCyAAIAc2AhggAigCECIBBEAgACABNgIQIAEgADYCGAsgAigCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkACQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiBSAEQQFyNgIEIAQgBWogBDYCAEHojsAAKAIAIgNFDQEgA0F4cUHYjMAAaiEAQfCOwAAoAgAhAQJ/QeCOwAAoAgAiBkEBIANBA3Z0IgNxRQRAQeCOwAAgAyAGcjYCACAADAELIAAoAggLIQMgACABNgIIIAMgATYCDCABIAA2AgwgASADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIEDAELQfCOwAAgBTYCAEHojsAAIAQ2AgALIAJBCGoPCyAAIAFyRQRAQQAhAUECIAd0IgBBACAAa3IgCHEiAEUNAyAAaEECdEHIi8AAaigCACEACyAARQ0BCwNAIAAgASAAKAIEQXhxIgMgBWsiBiAESSIHGyEIIAAoAhAiAkUEQCAAKAIUIQILIAEgCCADIAVJIgAbIQEgBCAGIAQgBxsgABshBCACIgANAAsLIAFFDQAgBUHojsAAKAIAIgBNIAQgACAFa09xDQAgASgCGCEHAkACQCABIAEoAgwiAEYEQCABQRRBECABKAIUIgAbaigCACICDQFBACEADAILIAEoAggiAiAANgIMIAAgAjYCCAwBCyABQRRqIAFBEGogABshAwNAIAMhBiACIgBBFGogAEEQaiAAKAIUIgIbIQMgAEEUQRAgAhtqKAIAIgINAAsgBkEANgIACyAHRQ0DIAEgASgCHEECdEHIi8AAaiICKAIARwRAIAdBEEEUIAcoAhAgAUYbaiAANgIAIABFDQQMAwsgAiAANgIAIAANAkHkjsAAQeSOwAAoAgBBfiABKAIcd3E2AgAMAwsCQAJAAkACQAJAIAVB6I7AACgCACIBSwRAIAVB7I7AACgCACIATwRAQQAhBCAFQa+ABGoiAEEQdkAAIgFBf0YiAw0HIAFBEHQiAkUNB0H4jsAAQQAgAEGAgHxxIAMbIgRB+I7AACgCAGoiADYCAEH8jsAAQfyOwAAoAgAiASAAIAAgAUkbNgIAAkACQEH0jsAAKAIAIgMEQEHIjMAAIQADQCAAKAIAIgEgACgCBCIGaiACRg0CIAAoAggiAA0ACwwCC0GEj8AAKAIAIgBBACAAIAJNG0UEQEGEj8AAIAI2AgALQYiPwABB/x82AgBBzIzAACAENgIAQciMwAAgAjYCAEHkjMAAQdiMwAA2AgBB7IzAAEHgjMAANgIAQeCMwABB2IzAADYCAEH0jMAAQeiMwAA2AgBB6IzAAEHgjMAANgIAQfyMwABB8IzAADYCAEHwjMAAQeiMwAA2AgBBhI3AAEH4jMAANgIAQfiMwABB8IzAADYCAEGMjcAAQYCNwAA2AgBBgI3AAEH4jMAANgIAQZSNwABBiI3AADYCAEGIjcAAQYCNwAA2AgBBnI3AAEGQjcAANgIAQZCNwABBiI3AADYCAEHUjMAAQQA2AgBBpI3AAEGYjcAANgIAQZiNwABBkI3AADYCAEGgjcAAQZiNwAA2AgBBrI3AAEGgjcAANgIAQaiNwABBoI3AADYCAEG0jcAAQaiNwAA2AgBBsI3AAEGojcAANgIAQbyNwABBsI3AADYCAEG4jcAAQbCNwAA2AgBBxI3AAEG4jcAANgIAQcCNwABBuI3AADYCAEHMjcAAQcCNwAA2AgBByI3AAEHAjcAANgIAQdSNwABByI3AADYCAEHQjcAAQciNwAA2AgBB3I3AAEHQjcAANgIAQdiNwABB0I3AADYCAEHkjcAAQdiNwAA2AgBB7I3AAEHgjcAANgIAQeCNwABB2I3AADYCAEH0jcAAQeiNwAA2AgBB6I3AAEHgjcAANgIAQfyNwABB8I3AADYCAEHwjcAAQeiNwAA2AgBBhI7AAEH4jcAANgIAQfiNwABB8I3AADYCAEGMjsAAQYCOwAA2AgBBgI7AAEH4jcAANgIAQZSOwABBiI7AADYCAEGIjsAAQYCOwAA2AgBBnI7AAEGQjsAANgIAQZCOwABBiI7AADYCAEGkjsAAQZiOwAA2AgBBmI7AAEGQjsAANgIAQayOwABBoI7AADYCAEGgjsAAQZiOwAA2AgBBtI7AAEGojsAANgIAQaiOwABBoI7AADYCAEG8jsAAQbCOwAA2AgBBsI7AAEGojsAANgIAQcSOwABBuI7AADYCAEG4jsAAQbCOwAA2AgBBzI7AAEHAjsAANgIAQcCOwABBuI7AADYCAEHUjsAAQciOwAA2AgBByI7AAEHAjsAANgIAQdyOwABB0I7AADYCAEHQjsAAQciOwAA2AgBB9I7AACACNgIAQdiOwABB0I7AADYCAEHsjsAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQYCPwABBgICAATYCAAwICyACIANNIAEgA0tyDQAgACgCDEUNAwtBhI/AAEGEj8AAKAIAIgAgAiAAIAJJGzYCACACIARqIQFByIzAACEAAkACQANAIAEgACgCAEcEQCAAKAIIIgANAQwCCwsgACgCDEUNAQtByIzAACEAA0ACQCADIAAoAgAiAU8EQCABIAAoAgRqIgYgA0sNAQsgACgCCCEADAELC0H0jsAAIAI2AgBB7I7AACAEQShrIgA2AgAgAiAAQQFyNgIEIAAgAmpBKDYCBEGAj8AAQYCAgAE2AgAgAyAGQSBrQXhxQQhrIgAgACADQRBqSRsiAUEbNgIEQciMwAApAgAhCSABQRBqQdCMwAApAgA3AgAgASAJNwIIQcyMwAAgBDYCAEHIjMAAIAI2AgBB0IzAACABQQhqNgIAQdSMwABBADYCACABQRxqIQADQCAAQQc2AgAgAEEEaiIAIAZJDQALIAEgA0YNByABIAEoAgRBfnE2AgQgAyABIANrIgBBAXI2AgQgASAANgIAIABBgAJPBEAgAyAAEAUMCAsgAEF4cUHYjMAAaiEBAn9B4I7AACgCACICQQEgAEEDdnQiAHFFBEBB4I7AACAAIAJyNgIAIAEMAQsgASgCCAshACABIAM2AgggACADNgIMIAMgATYCDCADIAA2AggMBwsgACACNgIAIAAgACgCBCAEajYCBCACIAVBA3I2AgQgASACIAVqIgNrIQUgAUH0jsAAKAIARg0DIAFB8I7AACgCAEYNBCABKAIEIgRBA3FBAUYEQCABIARBeHEiABAEIAAgBWohBSAAIAFqIgEoAgQhBAsgASAEQX5xNgIEIAMgBUEBcjYCBCADIAVqIAU2AgAgBUGAAk8EQCADIAUQBQwGCyAFQXhxQdiMwABqIQACf0HgjsAAKAIAIgFBASAFQQN2dCIEcUUEQEHgjsAAIAEgBHI2AgAgAAwBCyAAKAIICyEFIAAgAzYCCCAFIAM2AgwgAyAANgIMIAMgBTYCCAwFC0HsjsAAIAAgBWsiATYCAEH0jsAAQfSOwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIaiEEDAYLQfCOwAAoAgAhAAJAIAEgBWsiAkEPTQRAQfCOwABBADYCAEHojsAAQQA2AgAgACABQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAELQeiOwAAgAjYCAEHwjsAAIAAgBWoiAzYCACADIAJBAXI2AgQgACABaiACNgIAIAAgBUEDcjYCBAsMCAsgACAEIAZqNgIEQfSOwABB9I7AACgCACIAQQ9qQXhxIgFBCGsiAjYCAEHsjsAAQeyOwAAoAgAgBGoiAyAAIAFrakEIaiIBNgIAIAIgAUEBcjYCBCAAIANqQSg2AgRBgI/AAEGAgIABNgIADAMLQfSOwAAgAzYCAEHsjsAAQeyOwAAoAgAgBWoiADYCACADIABBAXI2AgQMAQtB8I7AACADNgIAQeiOwABB6I7AACgCACAFaiIANgIAIAMgAEEBcjYCBCAAIANqIAA2AgALIAJBCGoPC0EAIQRB7I7AACgCACIAIAVNDQBB7I7AACAAIAVrIgE2AgBB9I7AAEH0jsAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEDAMLIAQPCyAAIAc2AhggASgCECICBEAgACACNgIQIAIgADYCGAsgASgCFCICRQ0AIAAgAjYCFCACIAA2AhgLAkAgBEEQTwRAIAEgBUEDcjYCBCABIAVqIgIgBEEBcjYCBCACIARqIAQ2AgAgBEGAAk8EQCACIAQQBQwCCyAEQXhxQdiMwABqIQACf0HgjsAAKAIAIgNBASAEQQN2dCIEcUUEQEHgjsAAIAMgBHI2AgAgAAwBCyAAKAIICyEEIAAgAjYCCCAEIAI2AgwgAiAANgIMIAIgBDYCCAwBCyABIAQgBWoiAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAsgAUEIag8LIABBCGoL+wQBAX8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEGABGsOJgECAwQFBgcILAkKCwwNLCwsLCwsLCwsLCwsLCwsLCwsDg8sLCwQAAtBASEBAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQQFrDg5BAQIDBAUGQgcICQoLDAALAkAgAEHABGsODCcoKSorLC0uLzAxMgALAkAgAEGBAmsOCg0ODxAREhMUFRYACwJAIABBgAZrDgkzNDU2N0JCODkACwJAIABBgAprDgU8PT4/QAALIABBgAhrDgI5OkELQQIPC0EDDwtBBA8LQQUPC0EGDwtBBw8LQQkPC0EKDwtBCw8LQQwPC0ENDwtBDg8LQYECDwtBggIPC0GDAg8LQYQCDwtBhQIPC0GGAg8LQYcCDwtBiAIPC0GJAg8LQYoCDwtBgAQPC0GBBA8LQYIEDwtBgwQPC0GEBA8LQYUEDwtBhgQPC0GHBA8LQYkEDwtBigQPC0GLBA8LQYwEDwtBjQQPC0GgBA8LQaEEDwtBpQQPC0HABA8LQcEEDwtBwgQPC0HDBA8LQcQEDwtBxQQPC0HGBA8LQccEDwtByAQPC0HJBA8LQcoEDwtBywQPC0GABg8LQYEGDwtBggYPC0GDBg8LQYQGDwtBhwYPC0GIBg8LQYAIDwtBgQgPC0GACg8LQYEKDwtBggoPC0GDCg8LQYQKIQELIAEPC0HggsAAQRkQ2AEAC/gDAQJ/IAAgAWohAgJAAkAgACgCBCIDQQFxDQAgA0ECcUUNASAAKAIAIgMgAWohASAAIANrIgBB8I7AACgCAEYEQCACKAIEQQNxQQNHDQFB6I7AACABNgIAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgAiABNgIADAILIAAgAxAECwJAAkACQCACKAIEIgNBAnFFBEAgAkH0jsAAKAIARg0CIAJB8I7AACgCAEYNAyACIANBeHEiAhAEIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQfCOwAAoAgBHDQFB6I7AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAUPCyABQXhxQdiMwABqIQICf0HgjsAAKAIAIgNBASABQQN2dCIBcUUEQEHgjsAAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfSOwAAgADYCAEHsjsAAQeyOwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEHwjsAAKAIARw0BQeiOwABBADYCAEHwjsAAQQA2AgAPC0HwjsAAIAA2AgBB6I7AAEHojsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsL8QIBBH8gACgCDCECAkACQCABQYACTwRAIAAoAhghAwJAAkAgACACRgRAIABBFEEQIAAoAhQiAhtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIABBFGogAEEQaiACGyEEA0AgBCEFIAEiAkEUaiACQRBqIAIoAhQiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QciLwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQeSOwABB5I7AACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB4I7AAEHgjsAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIAAoAhQiAEUNACACIAA2AhQgACACNgIYCwu6AgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QciLwABqIQRBASACdCIDQeSOwAAoAgBxRQRAIAQgADYCACAAIAQ2AhggACAANgIMIAAgADYCCEHkjsAAQeSOwAAoAgAgA3I2AgAPCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEFA0AgAyAFQR12QQRxakEQaiIEKAIAIgJFDQIgBUEBdCEFIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAEIAA2AgAgACADNgIYIAAgADYCDCAAIAA2AggLlAEBBH8gARDQASABQQhrIgMgAygCAEEBaiICNgIAAkACQCACBEAgASgCACICQX9GDQEgASACQQFqNgIAIAEoAgQoAAAiBMBBAnRBuIPAAGooAgAhBUEBQQQQ0wEiAg0CCwALENcBAAsgAiAFIARBgH5xcjYAACABIAEoAgBBAWs2AgAgAxBWIABBBDYCBCAAIAI2AgALiwEBAn8gABDQASAAQQhrIgIoAgAhAwJAAkAgAUUEQCADQQFGBEAgAkEANgIAIAJBf0YNAyAAQQRrIgAgACgCAEEBayIANgIAIABFDQIMAwtB+YLAAEE/ENgBAAsgAiADQQFrIgE2AgAgAQ0BIABBBGsiACAAKAIAQQFrIgA2AgAgAA0BCyACQRAQGQsLdQIBfwF+IAEQ0AEgAUEIayICKAIAQQFGBEAgATUCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQgGDPAAAIAAgA6dBCHZBAXE6AAEPC0H5gsAAQT8Q2AEAC3cBAn8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCIALwAAIABBAmotAABBEHRyENwBIQIgASgCCCABKAIMEMsBQRBBBBDGASIAIAJBCHZBgB5xIAJBGHZyOwEMIABBADYCCCAAQoGAgIAQNwIAIAFBEGokACAAQQhqC2wBAn8gABDQASAAQQhrIgEgASgCAEEBaiICNgIAAkAgAgRAIAAoAgBBf0YNASAALwAEIABBBmotAABBEHRyENwBIQAgARBeIABBCHZBgP4DcSAAQRh2ciAAQYD+A3FBCHRyEGgPCwALENcBAAtvAQJ/IAEQ0AEgAUEIayICKAIAQQFGBEAgASgCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQQh2OgABIAAgA0EBcToAAA8LQfmCwABBPxDYAQALawEBfyAAENABIABBCGshAgJAIAFFBEAgAigCAEEBRw0BIAAoAgQgAkEANgIAAkAgAkF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAJBEBAZCxDbAQ8LIAIQVg8LQfmCwABBPxDYAQALYQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEIdkGA/gNxIABBGHZyIABBgAZxQQh0chBoIAFBEGokAAtqAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQQI2AhQgAUH0gMAANgIQIAFCATcCHCABQQE2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQVwALIAFBMGokACAAC2sBAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQQI2AhQgAUG4gcAANgIQIAFCATcCHCABQQI2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQVwALIAFBMGokACAAC2MBAn8jAEEQayICJAACQCABRQRAIAJBCGogABALDAELIAAQ0AEgAEEIayIBIAEoAgBBAWsiAzYCACADDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLIAJBEGokAAtjAQJ/IwBBEGsiAiQAAkAgAUUEQCACQQhqIAAQCAwBCyAAENABIABBCGsiASABKAIAQQFrIgM2AgAgAw0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCyACQRBqJAALXgEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEIdkGA4ANxIABBgAZxQQh0ckEMdhBnIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ9gELFgAgAEHQgsAAQcCCwABBgICACBD2AQtgAQF/IAAQGyECIAEQHiEAQRBBBBDGASIBQoGAgIAQNwIAIAEgAEEQdEGAgPwHcSAAIAJB/wFxQRJ0ciIAQYD+A3FBCHQgAEEIdkGA/gNxckEIdnKtQiCGNwIIIAFBCGoLXAECfyAAENABIABBCGsiASgCAEEBRgRAIAAtAAQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZC0EBcQ8LQfmCwABBPxDYAQALYAEBfyAAENABIABBCGshAgJAIAFFBEAgAigCAEEBRgRAIAJBADYCACACQX9GDQIgAEEEayIAIAAoAgBBAWsiADYCACAADQIgAkEUEBkPC0H5gsAAQT8Q2AEACyACEF8LC2ABAX8gABDQASAAQQhrIQICQCABRQRAIAIoAgBBAUYEQCACQQA2AgAgAkF/Rg0CIABBBGsiACAAKAIAQQFrIgA2AgAgAA0CIAJBEBAZDwtB+YLAAEE/ENgBAAsgAhBeCwvQBgEEfwJAIABBBGsoAgAiBCICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgAEEIayIBIAQiA0F4cSIAaiECAkACQCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFB8I7AACgCAEYEQCACKAIEQQNxQQNHDQFB6I7AACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADAILIAEgAxAECwJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfSOwAAoAgBGDQIgAkHwjsAAKAIARg0EIAIgA0F4cSICEAQgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB8I7AACgCAEcNAUHojsAAIAA2AgAMBQsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQEgASAAEAVBACEBQYiPwABBiI/AACgCAEEBayIANgIAIAANA0HQjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQYiPwABB/x8gASABQf8fTRs2AgAMAwtB9I7AACABNgIAQeyOwABB7I7AACgCACAAaiIANgIAIAEgAEEBcjYCBEHwjsAAKAIAIAFGBEBB6I7AAEEANgIAQfCOwABBADYCAAsgAEGAj8AAKAIAIgNNDQJB9I7AACgCACICRQ0CQQAhAQJAQeyOwAAoAgAiBEEpSQ0AQciMwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0HQjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQYiPwABB/x8gASABQf8fTRs2AgAgAyAETw0CQYCPwABBfzYCAAwCCyAAQXhxQdiMwABqIQICf0HgjsAAKAIAIgNBASAAQQN2dCIAcUUEQEHgjsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCAwBC0HwjsAAIAE2AgBB6I7AAEHojsAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAsPC0GpicAAQS5B2InAABBKAAtB6InAAEEuQZiKwAAQSgALVQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEOdkE8cSAAQR52chBnIAFBEGokAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgAC0ABCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtZAQJ/IAEQ0AEgAUEIayIDIAMoAgBBAWoiAjYCAAJAIAIEQCABKAIAIgJBf0YNASAAIAM2AgggACABNgIEIAAgAUEEajYCACABIAJBAWo2AgAPCwALENcBAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgAC8BBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgACgCBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtRAQJ/AkAgABAbIgBBGHENACAAQQdxIgJBB0YNAEEQQQQQxgEiAUKBgICAEDcCACABIABBBXZBAXGtQiCGIAKtQiiGhDcCCCABQQhqIQELIAELVwEBfyAAEBshAiABEBshAUEQQQQQxgEiAEKBgICAEDcCACAAIAFB/wFxQQx0IAJBEnRyIgFBgOADcUEIdCABQQh2QYD+A3FyQQh2rUIghjcCCCAAQQhqC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILTwECfyAAENABIABBCGsiASABKAIAQQFqIgI2AgACQCACBEAgACgCAEF/Rg0BIAAvAAQgAEEGai0AAEEQdHIQ1AEgARBeEGcPCwALENcBAAtOAQF/IAFFBEAgABAWGg8LIAAQ0AEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPgBCxAAIAAgASACIANB4wAQ+AELTgEBfyABRQRAIAAQGxoPCyAAENABIABBCGsiASABKAIAQQFrIgI2AgACQCACDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLC04BAX8gAUUEQCAAEB0aDwsgABDQASAAQQhrIgEgASgCAEEBayICNgIAAkAgAg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCwtOAQF/IAFFBEAgABAeGg8LIAAQ0AEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLDwAgACABQYCAgMgBEPkBCwwAIAAgAUHLABD6AQsMACAAIAFBzAAQ+gELDAAgACABQc0AEPoBCwwAIAAgAUHOABD6AQsMACAAIAFBzwAQ+gELDAAgACABQdAAEPoBCw8AIAAgAUGAgIDoBhD5AQtFAQF/IwBBEGsiASQAIAFBBGogABAcIAEoAgQiAC8AACAAQQJqLQAAQRB0chDUASABKAIIIAEoAgwQywEQZyABQRBqJAALSwEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AFBGHZBP3EgASgCCCABKAIMEMsBEGcgAUEQaiQAC04BAX8gABAeIQBBEEEEEMYBIgFCgYCAgBA3AgAgASAAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2cq1CIIY3AgggAUEIagsLACAAIAFBBxD7AQsLACAAIAFBCBD7AQs/ACACQRZ0QYCAgAZxIAFB/wFxQQx0IgEgAkH8AXFBBnRyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCyAELQAIIAQtAAkQyAEQYiAEQRBqJAALOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCCAELQAIIAQtAAkQiQEQYiAEQRBqJAALCwAgACABQQoQ/AELCwAgACABQQwQ/AELCwAgACABQRQQ/AELCwAgACABQRYQ/AELCwAgACABQRsQ/AELCwAgACABQR4Q/AELCwAgACABQR8Q/AELCwAgACABQSQQ/AELCwAgACABQTIQ/AELPgAgABAbIQAgARAeIgFBEHRBgID8B3EgAEH/AXFBEnQgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyEGILOAAgAkEQdEGAgPwHcSABQf8BcUEMdCIBIAJyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILPAECfyMAQRBrIgEkACAAENABIAFBCGogABBdIAEoAggtAAEgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzwBAn8jAEEQayIBJAAgABDQASABQQhqIAAQXSABKAIILQAAIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAtBAQF/IwBBIGsiAyQAIANBADYCECADQQE2AgQgA0IENwIIIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhBXAAs5AQF/IwBBEGsiAiQAIAAQ0AEgAkEIaiAAEGEgAigCDCACKAIIIAFBAEc6AABBADYCACACQRBqJAALOQEBfyMAQRBrIgIkACAAENABIAJBCGogABBhIAIoAgwgAigCCCABQQBHOgABQQA2AgAgAkEQaiQAC0MBAX8gAEE5TwRAQeCCwABBGRDYAQALQRRBBBDGASICIAA6ABAgAiABNgIMIAJBADYCCCACQoGAgIAQNwIAIAJBCGoLCgAgAEHVABD9AQsKACAAQdYAEP0BCwoAIABB1wAQ/QELCgAgAEHaABD9AQsKACAAQdsAEP0BCwoAIABB3AAQ/QELCgAgAEHdABD9AQs+ACAAEBsgARAbIAIQGyADEBsQISEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags7AQF/IAAgACgCAEEBayIBNgIAAkAgAQ0AIAAoAgwQ2wEgACAAKAIEQQFrIgE2AgQgAQ0AIABBEBAZCwvIAQEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQaiHwAA2AhAgAkEBNgIMIAJBDGoiACgCCCIBRQRAQfyGwABBK0HEisAAEEoACyABKAIMGiABKAIEGiAALQAQIQEgAC0AERpBxIvAAEHEi8AAKAIAIgBBAWo2AgACQCAAQQBIDQBBkI/AAC0AAEEBcQ0AQYyPwABBjI/AACgCAEEBajYCAEHAi8AAKAIAQQBIDQBBkI/AAEEAOgAAIAFFDQAACwALLwEBfyMAQRBrIgEkACABQQhqIAAQCyABLQAJQSBBACABLQAIG3IQZyABQRBqJAALOgAgABAbIAEQGyACEBsQOiEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags6ACAAEBsgARAbIAIQHRBHIQFBEEEEEMYBIgBCgYCAgBA3AgAgACABrUL///8Hg0IghjcCCCAAQQhqCzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBC0ABCABKAIIIAEoAgwQzAEgAUEQaiQACzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCgCACABKAIIIAEoAgwQzAEgAUEQaiQACzEBAX8gASgCACICQX9HBEAgASACQQFqNgIAIAAgATYCBCAAIAFBBGo2AgAPCxDXAQALCQAgAEEQEPABCwkAIABBFBDwAQszAQF/IAAQGyEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAUECdEH8AXGtQiCGNwIIIABBCGoLKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LENcBAAssAQF/QRBBBBDGASIBQoGAgIAQNwIAIAEgAK1C////B4NCIIY3AgggAUEIagskACAAENABIAAoAgAEQBDXAQALIABBADYCACAAIAFBAEc6AAQLKAAgAxAWIQMgABDHASABEMcBIAIQxwEgAxDOAUEIdEHkAHIQ0QEQaAsoACADEBYhAyAAEMcBIAEQxwEgAhDHASADEM4BQQh0QeUAchDRARBoCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ2AEACykBAX9BEEEEEMYBIgEgADoADCABQQA2AgggAUKBgICAEDcCACABQQhqCykBAX9BEEEEEMYBIgEgADYCDCABQQA2AgggAUKBgICAEDcCACABQQhqCyIAIAIQAiECIAAQxwEgARDHASACEEdBCHRBygByENEBEGgLDwAgACABIAIgA0ESEPEBCw8AIAAgASACIANBGBDxAQsPACAAIAEgAiADQRwQ8QELDwAgACABIAIgA0EdEPEBCw8AIAAgASACIANBIRDyAQsPACAAIAEgAiADQSIQ8QELDwAgACABIAIgA0EjEPEBCw8AIAAgASACIANBKBDxAQsPACAAIAEgAiADQSoQ8QELDwAgACABIAIgA0EsEPEBCw8AIAAgASACIANBLxDxAQsPACAAIAEgAiADQTgQ8QELEAAgACABIAIgA0HTABDyAQsQACAAIAEgAiADQdQAEPIBCxAAIAAgASACIANB3gAQ8gELEAAgACABIAIgA0HfABDyAQsQACAAIAEgAiADQeAAEPIBCxAAIAAgASACIANB4QAQ8gELEAAgACABIAIgA0HiABDyAQsQACAAIAEgAiADQeMAEPIBCxAAIAAgASACIANB5AAQ8gELEAAgACABIAIgA0HlABDyAQsQACAAIAEgAiADQeYAEPEBCxAAIAAgASACIANB5wAQ8QELEAAgACABIAIgA0HoABDxAQsQACAAIAEgAiADQekAEPEBCxAAIAAgASACIANB6gAQ8QELEAAgACABIAIgA0HrABDxAQsQACAAIAEgAiADQewAEPEBCxAAIAAgASACIANB7gAQ8QELHgAgARBmIQEgABDHASABEMQBQQh0QcwAchDRARBoCxkAIAAgASACQSBBACAEG0EQQQAgAxtyECELDQAgACABIAJBARDzAQsNACAAIAEgAkECEPMBCw0AIAAgASACQQMQ8wELDQAgACABIAJBBBDzAQsNACAAIAEgAkEFEPMBCw0AIAAgASACQQYQ8wELDQAgACABIAJBBxDzAQsNACAAIAEgAkEIEPMBCw0AIAAgASACQQkQ8wELDQAgACABIAJBCxDzAQsNACAAIAEgAkENEPMBCw0AIAAgASACQQ4Q8wELDQAgACABIAJBDxDzAQsNACAAIAEgAkEQEPMBCw0AIAAgASACQREQ8wELDQAgACABIAJBFxDzAQsNACAAIAEgAkEmEPMBCw0AIAAgASACQScQ8wELDQAgACABIAJBKRDzAQsNACAAIAEgAkErEPMBCw0AIAAgASACQS0Q8wELDQAgACABIAJBLhDzAQsNACAAIAEgAkEwEPMBCw0AIAAgASACQTEQ8wELDQAgACABIAJBNRDzAQsNACAAIAEgAkE3EPMBCw0AIAAgASACQTkQ9AELDQAgACABIAJBOhD0AQsNACAAIAEgAkE7EPQBCw0AIAAgASACQTwQ9AELDQAgACABIAJBPRD0AQsNACAAIAEgAkE+EPQBCw0AIAAgASACQT8Q9AELDgAgACABIAJBwAAQ9AELDgAgACABIAJBwQAQ9AELDgAgACABIAJBwgAQ9AELDgAgACABIAJBwwAQ9AELDgAgACABIAJBxAAQ9AELDgAgACABIAJBxQAQ9AELDgAgACABIAJBxgAQ9AELDgAgACABIAJBxwAQ9AELDgAgACABIAJByAAQ9AELDgAgACABIAJByQAQ9AELDgAgACABIAJBygAQ9AELDgAgACABIAJB0QAQ9AELDgAgACABIAJB0gAQ9AELFwEBfyAAQf8BcUE/TQR/IAAQZwVBAAsLGwAgABDQASAAKAIAQX9GBEAQ1wEACyAALQAECwkAIABBExD1AQsJACAAQRUQ9QELCQAgAEEaEPUBCwkAIABBIBD1AQsJACAAQSUQ9QELIgEBf0EQQQQQxgEiAEIANwIIIABCgYCAgBA3AgAgAEEIagsJACAAQTQQ9QELCQAgAEE2EPUBCwoAIABB2AAQ9QELCgAgAEHZABD1AQsXACABQRB0QYCA/ANxIABBAnRB/AFxcgsbACAAEMcBIAEQxwEgAhDHARA6QQh0ENEBEGgLEgAgASAAENMBIgAEQCAADwsAC3UBAX8gAEH/AXFBwABPBEAjAEEQayIBJAAgAUEiNgIMIAFBgIDAADYCCCMAQSBrIgAkACAAQQE2AgQgAEH0hsAANgIAIABCATcCDCAAIAFBCGqtQoCAgIDAAIQ3AxggACAAQRhqNgIIIABBuIDAABBXAAsgAAsUACAAIAEgAkEgQQAgAxsgBHIQIQsXACAAEBsgARAbIAIQGyADEBYQzgEQYgsWACAAEBsgARAbIAIQGyADEBsQIRBiCxMAIAAgACgCAEEBazYCACABEF4LEwAgACAAKAIAQQFrNgIAIAEQXwsSACAAEBsgARAbIAIQAhBHEGILEQAgACABIAJBIEEAIAMbECELEgAgABAbIAEQGyACEB0QRxBiCxMAIAAEQA8LQdSKwABBGxDYAQALFAEBf0EEQQEQxgEiASAANgAAIAELDQAgAQRAIAAgARAZCwuBAwEFf0GRj8AALQAAGgJ/IABBCU8EQAJAQc3/e0EQIAAgAEEQTRsiAGsgAU0NACAAQRAgAUELakF4cSABQQtJGyIEakEMahABIgJFDQAgAkEIayEBAkAgAEEBayIDIAJxRQRAIAEhAAwBCyACQQRrIgUoAgAiBkF4cSACIANqQQAgAGtxQQhrIgIgAEEAIAIgAWtBEE0baiIAIAFrIgJrIQMgBkEDcQRAIAAgAyAAKAIEQQFxckECcjYCBCAAIANqIgMgAygCBEEBcjYCBCAFIAIgBSgCAEEBcXJBAnI2AgAgASACaiIDIAMoAgRBAXI2AgQgASACEAMMAQsgASgCACEBIAAgAzYCBCAAIAEgAmo2AgALAkAgACgCBCIBQQNxRQ0AIAFBeHEiAiAEQRBqTQ0AIAAgBCABQQFxckECcjYCBCAAIARqIgEgAiAEayIEQQNyNgIEIAAgAmoiAiACKAIEQQFyNgIEIAEgBBADCyAAQQhqIQMLIAMMAQsgARABCwsNACAAENwBQQp2QT9xCw8AIAAQGyABEGYQxAEQYgsLACAAIwBqJAAjAAsOAEHvisAAQc8AENgBAAsJACAAIAEQAAALCQAgAEE/cRBnCwoAIAAQG0H/AXELCAAgAEEEEBkLBwAgAEEIdAsJAEEzENEBEGgLBgBBCxBnCwYAQQoQZwsGAEEIEGcLBgBBDxBnCwYAQQYQZwsGAEEJEGcLBgBBBxBnCwYAQQwQZwsGAEECEGcLBgBBARBnCwYAQQMQZwsGAEENEGcLBgBBDhBnCwYAQQUQZwsGAEEEEGcLBgBBEBBnCwYAQQAQZwsEAEEECzMBAX8gACAAKAIAQQFrIgI2AgACQCACDQAgACAAKAIEQQFrIgI2AgQgAg0AIAAgARAZCwsjACAAEMcBIAEQxwEgAhDHASADEMcBECFBCHQgBHIQ0QEQaAsiACAAEMcBIAEQxwEgAhDHASADEA4QIUEIdCAEchDRARBoCx4AIAAQxwEgARDHASACEMcBEDpBCHQgA3IQ0QEQaAsdACAAEMcBIAEQxwEgAhAPEEdBCHQgA3IQ0QEQaAsaACAAEMcBGiAAQQp0QYD4A3EgAXIQ0QEQaAtfAQF/IwBBMGsiBCQAIAQgADYCDCAAIANPBEAgBEECNgIUIAQgAjYCECAEQgE3AhwgBEEDNgIsIAQgBEEoajYCGCAEIARBDGo2AiggBEEQaiABEFcACyAEQTBqJAAgAAtMAQJ/IwBBEGsiBSQAIAVBCGogAxALIAUtAAkhAyAFLQAIIQYgABDHASABEMcBIAIQxwEgBiADEMgBQQh0IARyENEBEGggBUEQaiQAC0wBAn8jAEEQayIFJAAgBUEIaiADEAggBS0ACSEDIAUtAAghBiAAEMcBIAEQxwEgAhDHASAGIAMQiQFBCHQgBHIQ0QEQaCAFQRBqJAALSQAgABDHARogARDHARogAEESdEGAgPAXcSIAIAFBDHRBgOA/cXIiAUGA4ANxQQh0IAFBCHZBgP4DcSAAIAJyQRh2cnIQ0QEQaAtJACAAEMcBGiABEBMiAUEQdEGAgPwHcSAAQRJ0QYCA8B9xIAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2ckEIdCACchDRARBoC0kBAX8jAEEQayIDJAAgABDQASABIAJPBEBB4ILAAEEZENgBAAsgA0EIaiAAEGEgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQQAgABDHARogARDHARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyENEBEGgLNQAgABAUIgBBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyQQh0IAFyENEBEGgLC8gLAQBBgIDAAAu+C0NoZWNrUmVnSWQgd2FzIGdpdmVuIGludmFsaWQgUmVnSWRmdWVsLWFzbS9zcmMvbGliLnJzAAAAIgAQABMAAABuAAAAIgAAAFZhbHVlIGBgIG91dCBvZiByYW5nZSBmb3IgNi1iaXQgaW1tZWRpYXRlAAAASAAQAAcAAABPABAAIgAAACIAEAATAAAAsAMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMTItYml0IGltbWVkaWF0ZQBIABAABwAAAJQAEAAjAAAAIgAQABMAAAC1AwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxOC1iaXQgaW1tZWRpYXRlAEgAEAAHAAAA2AAQACMAAAAiABAAEwAAALoDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDI0LWJpdCBpbW1lZGlhdGUASAAQAAcAAAAcARAAIwAAACIAEAATAAAAvwMAABwAAABpbnZhbGlkIGVudW0gdmFsdWUgcGFzc2VkYXR0ZW1wdGVkIHRvIHRha2Ugb3duZXJzaGlwIG9mIFJ1c3QgdmFsdWUgd2hpbGUgaXQgd2FzIGJvcnJvd2VkEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAhAAAAIgAAACQAAAAlAAAAJgAAACcAAAAoAAAAKQAAACoAAAArAAAALAAAAC0AAAAuAAAALwAAADAAAAAxAAAAMgAAADMAAAA0AAAANQAAADYAAAA3AAAAOAAAADkAAAA6AAAAOwAAADwAAAA9AAAAPgAAAD8AAABAAAAAQQAAAEIAAABDAAAARwAAAEgAAABJAAAASgAAAEsAAABMAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAABhAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAdgAAAHcAAAB4AAAAeQAAAJAAAACRAAAAkgAAAJMAAACUAAAAlQAAAJYAAACXAAAAmAAAAKAAAAChAAAAogAAAKMAAACkAAAApQAAAKYAAACnAAAAqAAAAKkAAACqAAAAqwAAAKwAAACtAAAAsAAAALoAAAC7AAAAAQAAAAAAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAAUAAAAAAAAAAQAAAAYAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OS9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACABBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAgAQQACkAAACuBAAADQAAAGxpYnJhcnkvc3RkL3NyYy9wYW5pY2tpbmcucnMoBRAAHAAAAIsCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMS4zDHdhc20tYmluZGdlbgYwLjIuOTM=", e);
}
async function gi() {
  return await ll(II());
}
gi();
const Al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: Iy,
  ADDI: Ey,
  ALOC: vy,
  AND: Cy,
  ANDI: By,
  BAL: xy,
  BHEI: Ry,
  BHSH: Sy,
  BLDD: Ty,
  BSIZ: Ny,
  BURN: Dy,
  CALL: Qy,
  CB: Fy,
  CCP: Oy,
  CFE: My,
  CFEI: Ly,
  CFS: Py,
  CFSI: ky,
  CROO: Uy,
  CSIZ: zy,
  CompareArgs: Mr,
  CompareMode: wy,
  DIV: Gy,
  DIVI: Vy,
  DivArgs: cs,
  ECAL: Hy,
  ECK1: Xy,
  ECR1: Zy,
  ED19: Wy,
  EQ: jy,
  EXP: Jy,
  EXPI: qy,
  FLAG: $y,
  GM: Ws,
  GMArgs: by,
  GT: Ky,
  GTF: js,
  GTFArgs: ul,
  Imm06: Tt,
  Imm12: _t,
  Imm18: Te,
  Imm24: Ie,
  Instruction: L,
  JI: tb,
  JMP: eb,
  JMPB: rb,
  JMPF: nb,
  JNE: sb,
  JNEB: ib,
  JNEF: ab,
  JNEI: ob,
  JNZB: cb,
  JNZF: db,
  JNZI: ub,
  K256: _b,
  LB: hb,
  LDC: lb,
  LOG: Ab,
  LOGD: fb,
  LT: pb,
  LW: gb,
  MCL: wb,
  MCLI: mb,
  MCP: yb,
  MCPI: bb,
  MEQ: Ib,
  MINT: Eb,
  MLDV: vb,
  MLOG: Cb,
  MOD: Bb,
  MODI: xb,
  MOVE: Rb,
  MOVI: Sb,
  MROO: Tb,
  MUL: Nb,
  MULI: Db,
  MathArgs: ds,
  MathOp: yy,
  MulArgs: us,
  NOOP: Ob,
  NOT: Mb,
  OR: Lb,
  ORI: Pb,
  POPH: kb,
  POPL: Ub,
  PSHH: zb,
  PSHL: Gb,
  PanicInstruction: Vb,
  PanicReason: my,
  RET: Yb,
  RETD: Hb,
  RVRT: Xb,
  RegId: h,
  S256: Zb,
  SB: Wb,
  SCWQ: jb,
  SLL: Jb,
  SLLI: qb,
  SMO: $b,
  SRL: Kb,
  SRLI: tI,
  SRW: eI,
  SRWQ: rI,
  SUB: nI,
  SUBI: sI,
  SW: iI,
  SWW: aI,
  SWWQ: oI,
  TIME: cI,
  TR: dI,
  TRO: uI,
  WDAM: _I,
  WDCM: Js,
  WDDV: qs,
  WDMD: hI,
  WDML: $s,
  WDMM: lI,
  WDOP: Ks,
  WQAM: AI,
  WQCM: ti,
  WQDV: ei,
  WQMD: fI,
  WQML: ri,
  WQMM: pI,
  WQOP: ni,
  XOR: gI,
  XORI: wI,
  add: S0,
  addi: tr,
  aloc: Z0,
  and: T0,
  andi: Cm,
  bal: Im,
  bhei: $0,
  bhsh: q0,
  bldd: py,
  bsiz: Zs,
  burn: K0,
  call: Va,
  cb: nm,
  ccp: tm,
  cfe: jm,
  cfei: Zm,
  cfs: Jm,
  cfsi: Wm,
  croo: em,
  csiz: rm,
  div: N0,
  divi: Xs,
  ecal: fy,
  eck1: Am,
  ecr1: fm,
  ed19: pm,
  eq: D0,
  exp: Q0,
  expi: Bm,
  flag: bm,
  gm: km,
  gm_args: m0,
  gt: F0,
  gtf: cl,
  gtf_args: y0,
  initSync: yI,
  initWasm: gi,
  ji: Xm,
  jmp: Hs,
  jmpb: Gm,
  jmpf: zm,
  jne: Em,
  jneb: Hm,
  jnef: Ym,
  jnei: Qm,
  jnzb: dl,
  jnzf: Vm,
  jnzi: Um,
  k256: gm,
  lb: Fm,
  ldc: Hn,
  log: sm,
  logd: im,
  lt: O0,
  lw: Jn,
  mcl: W0,
  mcli: Pm,
  mcp: j0,
  mcpi: Lm,
  meq: J0,
  mint: am,
  mldv: H0,
  mlog: M0,
  mod_: P0,
  modi: xm,
  move_: Xr,
  movi: _n,
  mroo: L0,
  mul: k0,
  muli: Rm,
  noop: ym,
  not: U0,
  or: z0,
  ori: Sm,
  poph: ty,
  popl: Km,
  pshh: $m,
  pshl: qm,
  ret: Oo,
  retd: X0,
  rvrt: om,
  s256: wm,
  sb: Om,
  scwq: cm,
  sll: G0,
  slli: Tm,
  smo: vm,
  srl: V0,
  srli: Nm,
  srw: dm,
  srwq: um,
  sub: Ys,
  subi: ol,
  sw: Mm,
  sww: _m,
  swwq: hm,
  time: mm,
  tr: al,
  tro: lm,
  wdam: _y,
  wdcm: ey,
  wdcm_args: b0,
  wddv: oy,
  wddv_args: x0,
  wdmd: dy,
  wdml: iy,
  wdml_args: C0,
  wdmm: ly,
  wdop: ny,
  wdop_args: E0,
  wqam: hy,
  wqcm: ry,
  wqcm_args: I0,
  wqdv: cy,
  wqdv_args: R0,
  wqmd: uy,
  wqml: ay,
  wqml_args: B0,
  wqmm: Ay,
  wqop: sy,
  wqop_args: v0,
  xor: Y0,
  xori: Dm
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const me = BigInt(0), Lt = BigInt(1), Yr = BigInt(2), EI = BigInt(3), Ya = BigInt(4), Ku = BigInt(5), t_ = BigInt(8);
BigInt(9);
BigInt(16);
function De(e, t) {
  const r = e % t;
  return r >= me ? r : t + r;
}
function vI(e, t, r) {
  if (r <= me || t < me)
    throw new Error("Expected power/modulo > 0");
  if (r === Lt)
    return me;
  let n = Lt;
  for (; t > me; )
    t & Lt && (n = n * e % r), e = e * e % r, t >>= Lt;
  return n;
}
function Le(e, t, r) {
  let n = e;
  for (; t-- > me; )
    n *= n, n %= r;
  return n;
}
function Ha(e, t) {
  if (e === me || t <= me)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let r = De(e, t), n = t, s = me, i = Lt;
  for (; r !== me; ) {
    const o = n / r, u = n % r, A = s - i * o;
    n = r, r = u, s = i, i = A;
  }
  if (n !== Lt)
    throw new Error("invert: does not exist");
  return De(s, t);
}
function CI(e) {
  const t = (e - Lt) / Yr;
  let r, n, s;
  for (r = e - Lt, n = 0; r % Yr === me; r /= Yr, n++)
    ;
  for (s = Yr; s < e && vI(s, t, e) !== e - Lt; s++)
    ;
  if (n === 1) {
    const a = (e + Lt) / Ya;
    return function(u, A) {
      const p = u.pow(A, a);
      if (!u.eql(u.sqr(p), A))
        throw new Error("Cannot find square root");
      return p;
    };
  }
  const i = (r + Lt) / Yr;
  return function(o, u) {
    if (o.pow(u, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let A = n, p = o.pow(o.mul(o.ONE, s), r), m = o.pow(u, i), b = o.pow(u, r);
    for (; !o.eql(b, o.ONE); ) {
      if (o.eql(b, o.ZERO))
        return o.ZERO;
      let S = 1;
      for (let R = o.sqr(b); S < A && !o.eql(R, o.ONE); S++)
        R = o.sqr(R);
      const F = o.pow(p, Lt << BigInt(A - S - 1));
      p = o.sqr(F), m = o.mul(m, F), b = o.mul(b, p), A = S;
    }
    return m;
  };
}
function BI(e) {
  if (e % Ya === EI) {
    const t = (e + Lt) / Ya;
    return function(n, s) {
      const i = n.pow(s, t);
      if (!n.eql(n.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % t_ === Ku) {
    const t = (e - Ku) / t_;
    return function(n, s) {
      const i = n.mul(s, Yr), a = n.pow(i, t), o = n.mul(s, a), u = n.mul(n.mul(o, Yr), a), A = n.mul(o, n.sub(u, n.ONE));
      if (!n.eql(n.sqr(A), s))
        throw new Error("Cannot find square root");
      return A;
    };
  }
  return CI(e);
}
const xI = [
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
function RI(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, r = xI.reduce((n, s) => (n[s] = "function", n), t);
  return os(e, r);
}
function SI(e, t, r) {
  if (r < me)
    throw new Error("Expected power > 0");
  if (r === me)
    return e.ONE;
  if (r === Lt)
    return t;
  let n = e.ONE, s = t;
  for (; r > me; )
    r & Lt && (n = e.mul(n, s)), s = e.sqr(s), r >>= Lt;
  return n;
}
function TI(e, t) {
  const r = new Array(t.length), n = t.reduce((i, a, o) => e.is0(a) ? i : (r[o] = i, e.mul(i, a)), e.ONE), s = e.inv(n);
  return t.reduceRight((i, a, o) => e.is0(a) ? i : (r[o] = e.mul(i, r[o]), e.mul(i, a)), s), r;
}
function fl(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length, n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function pl(e, t, r = !1, n = {}) {
  if (e <= me)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = fl(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const a = BI(e), o = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: No(s),
    ZERO: me,
    ONE: Lt,
    create: (u) => De(u, e),
    isValid: (u) => {
      if (typeof u != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof u}`);
      return me <= u && u < e;
    },
    is0: (u) => u === me,
    isOdd: (u) => (u & Lt) === Lt,
    neg: (u) => De(-u, e),
    eql: (u, A) => u === A,
    sqr: (u) => De(u * u, e),
    add: (u, A) => De(u + A, e),
    sub: (u, A) => De(u - A, e),
    mul: (u, A) => De(u * A, e),
    pow: (u, A) => SI(o, u, A),
    div: (u, A) => De(u * Ha(A, e), e),
    // Same as above, but doesn't normalize
    sqrN: (u) => u * u,
    addN: (u, A) => u + A,
    subN: (u, A) => u - A,
    mulN: (u, A) => u * A,
    inv: (u) => Ha(u, e),
    sqrt: n.sqrt || ((u) => a(o, u)),
    invertBatch: (u) => TI(o, u),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (u, A, p) => p ? A : u,
    toBytes: (u) => r ? To(u, i) : En(u, i),
    fromBytes: (u) => {
      if (u.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${u.length}`);
      return r ? So(u) : jr(u);
    }
  });
  return Object.freeze(o);
}
function gl(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function wl(e) {
  const t = gl(e);
  return t + Math.ceil(t / 2);
}
function NI(e, t, r = !1) {
  const n = e.length, s = gl(t), i = wl(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${n}`);
  const a = r ? jr(e) : So(e), o = De(a, t - Lt) + Lt;
  return r ? To(o, s) : En(o, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const DI = BigInt(0), la = BigInt(1), Aa = /* @__PURE__ */ new WeakMap(), e_ = /* @__PURE__ */ new WeakMap();
function QI(e, t) {
  const r = (i, a) => {
    const o = a.negate();
    return i ? o : a;
  }, n = (i) => {
    if (!Number.isSafeInteger(i) || i <= 0 || i > t)
      throw new Error(`Wrong window size=${i}, should be [1..${t}]`);
  }, s = (i) => {
    n(i);
    const a = Math.ceil(t / i) + 1, o = 2 ** (i - 1);
    return { windows: a, windowSize: o };
  };
  return {
    constTimeNegate: r,
    // non-const time multiplication ladder
    unsafeLadder(i, a) {
      let o = e.ZERO, u = i;
      for (; a > DI; )
        a & la && (o = o.add(u)), u = u.double(), a >>= la;
      return o;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(i, a) {
      const { windows: o, windowSize: u } = s(a), A = [];
      let p = i, m = p;
      for (let b = 0; b < o; b++) {
        m = p, A.push(m);
        for (let S = 1; S < u; S++)
          m = m.add(p), A.push(m);
        p = m.double();
      }
      return A;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(i, a, o) {
      const { windows: u, windowSize: A } = s(i);
      let p = e.ZERO, m = e.BASE;
      const b = BigInt(2 ** i - 1), S = 2 ** i, F = BigInt(i);
      for (let R = 0; R < u; R++) {
        const N = R * A;
        let O = Number(o & b);
        o >>= F, O > A && (O -= S, o += la);
        const z = N, M = N + Math.abs(O) - 1, U = R % 2 !== 0, P = O < 0;
        O === 0 ? m = m.add(r(U, a[z])) : p = p.add(r(P, a[M]));
      }
      return { p, f: m };
    },
    wNAFCached(i, a, o) {
      const u = e_.get(i) || 1;
      let A = Aa.get(i);
      return A || (A = this.precomputeWindow(i, u), u !== 1 && Aa.set(i, o(A))), this.wNAF(u, A, a);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(i, a) {
      n(a), e_.set(i, a), Aa.delete(i);
    }
  };
}
function FI(e, t, r, n) {
  if (!Array.isArray(r) || !Array.isArray(n) || n.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  n.forEach((p, m) => {
    if (!t.isValid(p))
      throw new Error(`wrong scalar at index ${m}`);
  }), r.forEach((p, m) => {
    if (!(p instanceof e))
      throw new Error(`wrong point at index ${m}`);
  });
  const s = zh(BigInt(r.length)), i = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, a = (1 << i) - 1, o = new Array(a + 1).fill(e.ZERO), u = Math.floor((t.BITS - 1) / i) * i;
  let A = e.ZERO;
  for (let p = u; p >= 0; p -= i) {
    o.fill(e.ZERO);
    for (let b = 0; b < n.length; b++) {
      const S = n[b], F = Number(S >> BigInt(p) & BigInt(a));
      o[F] = o[F].add(r[b]);
    }
    let m = e.ZERO;
    for (let b = o.length - 1, S = e.ZERO; b > 0; b--)
      S = S.add(o[b]), m = m.add(S);
    if (A = A.add(m), p !== 0)
      for (let b = 0; b < i; b++)
        A = A.double();
  }
  return A;
}
function ml(e) {
  return RI(e.Fp), os(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...fl(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function r_(e) {
  e.lowS !== void 0 && yn("lowS", e.lowS), e.prehash !== void 0 && yn("prehash", e.prehash);
}
function OI(e) {
  const t = ml(e);
  os(t, {
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
  const { endo: r, Fp: n, a: s } = t;
  if (r) {
    if (!n.eql(s, n.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof r != "object" || typeof r.beta != "bigint" || typeof r.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: MI, hexToBytes: LI } = iw, _r = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (e, t) => {
      const { Err: r } = _r;
      if (e < 0 || e > 256)
        throw new r("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new r("tlv.encode: unpadded data");
      const n = t.length / 2, s = dn(n);
      if (s.length / 2 & 128)
        throw new r("tlv.encode: long form length too big");
      const i = n > 127 ? dn(s.length / 2 | 128) : "";
      return `${dn(e)}${i}${s}${t}`;
    },
    // v - value, l - left bytes (unparsed)
    decode(e, t) {
      const { Err: r } = _r;
      let n = 0;
      if (e < 0 || e > 256)
        throw new r("tlv.encode: wrong tag");
      if (t.length < 2 || t[n++] !== e)
        throw new r("tlv.decode: wrong tlv");
      const s = t[n++], i = !!(s & 128);
      let a = 0;
      if (!i)
        a = s;
      else {
        const u = s & 127;
        if (!u)
          throw new r("tlv.decode(long): indefinite length not supported");
        if (u > 4)
          throw new r("tlv.decode(long): byte length is too big");
        const A = t.subarray(n, n + u);
        if (A.length !== u)
          throw new r("tlv.decode: length bytes not complete");
        if (A[0] === 0)
          throw new r("tlv.decode(long): zero leftmost byte");
        for (const p of A)
          a = a << 8 | p;
        if (n += u, a < 128)
          throw new r("tlv.decode(long): not minimal encoding");
      }
      const o = t.subarray(n, n + a);
      if (o.length !== a)
        throw new r("tlv.decode: wrong value length");
      return { v: o, l: t.subarray(n + a) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(e) {
      const { Err: t } = _r;
      if (e < hr)
        throw new t("integer: negative integers are not allowed");
      let r = dn(e);
      if (Number.parseInt(r[0], 16) & 8 && (r = "00" + r), r.length & 1)
        throw new t("unexpected assertion");
      return r;
    },
    decode(e) {
      const { Err: t } = _r;
      if (e[0] & 128)
        throw new t("Invalid signature integer: negative");
      if (e[0] === 0 && !(e[1] & 128))
        throw new t("Invalid signature integer: unnecessary leading zero");
      return MI(e);
    }
  },
  toSig(e) {
    const { Err: t, _int: r, _tlv: n } = _r, s = typeof e == "string" ? LI(e) : e;
    as(s);
    const { v: i, l: a } = n.decode(48, s);
    if (a.length)
      throw new t("Invalid signature: left bytes after parsing");
    const { v: o, l: u } = n.decode(2, i), { v: A, l: p } = n.decode(2, u);
    if (p.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: r.decode(o), s: r.decode(A) };
  },
  hexFromSig(e) {
    const { _tlv: t, _int: r } = _r, n = `${t.encode(2, r.encode(e.r))}${t.encode(2, r.encode(e.s))}`;
    return t.encode(48, n);
  }
}, hr = BigInt(0), ge = BigInt(1);
BigInt(2);
const n_ = BigInt(3);
BigInt(4);
function PI(e) {
  const t = OI(e), { Fp: r } = t, n = pl(t.n, t.nBitLength), s = t.toBytes || ((R, N, O) => {
    const z = N.toAffine();
    return Wn(Uint8Array.from([4]), r.toBytes(z.x), r.toBytes(z.y));
  }), i = t.fromBytes || ((R) => {
    const N = R.subarray(1), O = r.fromBytes(N.subarray(0, r.BYTES)), z = r.fromBytes(N.subarray(r.BYTES, 2 * r.BYTES));
    return { x: O, y: z };
  });
  function a(R) {
    const { a: N, b: O } = t, z = r.sqr(R), M = r.mul(z, R);
    return r.add(r.add(M, r.mul(R, N)), O);
  }
  if (!r.eql(r.sqr(t.Gy), a(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(R) {
    return Ai(R, ge, t.n);
  }
  function u(R) {
    const { allowedPrivateKeyLengths: N, nByteLength: O, wrapPrivateKey: z, n: M } = t;
    if (N && typeof R != "bigint") {
      if ($r(R) && (R = bn(R)), typeof R != "string" || !N.includes(R.length))
        throw new Error("Invalid key");
      R = R.padStart(O * 2, "0");
    }
    let U;
    try {
      U = typeof R == "bigint" ? R : jr(Ze("private key", R, O));
    } catch {
      throw new Error(`private key must be ${O} bytes, hex or bigint, not ${typeof R}`);
    }
    return z && (U = De(U, M)), Jr("private key", U, ge, M), U;
  }
  function A(R) {
    if (!(R instanceof b))
      throw new Error("ProjectivePoint expected");
  }
  const p = La((R, N) => {
    const { px: O, py: z, pz: M } = R;
    if (r.eql(M, r.ONE))
      return { x: O, y: z };
    const U = R.is0();
    N == null && (N = U ? r.ONE : r.inv(M));
    const P = r.mul(O, N), H = r.mul(z, N), X = r.mul(M, N);
    if (U)
      return { x: r.ZERO, y: r.ZERO };
    if (!r.eql(X, r.ONE))
      throw new Error("invZ was invalid");
    return { x: P, y: H };
  }), m = La((R) => {
    if (R.is0()) {
      if (t.allowInfinityPoint && !r.is0(R.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: N, y: O } = R.toAffine();
    if (!r.isValid(N) || !r.isValid(O))
      throw new Error("bad point: x or y not FE");
    const z = r.sqr(O), M = a(N);
    if (!r.eql(z, M))
      throw new Error("bad point: equation left != right");
    if (!R.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class b {
    constructor(N, O, z) {
      if (this.px = N, this.py = O, this.pz = z, N == null || !r.isValid(N))
        throw new Error("x required");
      if (O == null || !r.isValid(O))
        throw new Error("y required");
      if (z == null || !r.isValid(z))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(N) {
      const { x: O, y: z } = N || {};
      if (!N || !r.isValid(O) || !r.isValid(z))
        throw new Error("invalid affine point");
      if (N instanceof b)
        throw new Error("projective point not allowed");
      const M = (U) => r.eql(U, r.ZERO);
      return M(O) && M(z) ? b.ZERO : new b(O, z, r.ONE);
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
    static normalizeZ(N) {
      const O = r.invertBatch(N.map((z) => z.pz));
      return N.map((z, M) => z.toAffine(O[M])).map(b.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(N) {
      const O = b.fromAffine(i(Ze("pointHex", N)));
      return O.assertValidity(), O;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(N) {
      return b.BASE.multiply(u(N));
    }
    // Multiscalar Multiplication
    static msm(N, O) {
      return FI(b, n, N, O);
    }
    // "Private method", don't use it directly
    _setWindowSize(N) {
      F.setWindowSize(this, N);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      m(this);
    }
    hasEvenY() {
      const { y: N } = this.toAffine();
      if (r.isOdd)
        return !r.isOdd(N);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(N) {
      A(N);
      const { px: O, py: z, pz: M } = this, { px: U, py: P, pz: H } = N, X = r.eql(r.mul(O, H), r.mul(U, M)), V = r.eql(r.mul(z, H), r.mul(P, M));
      return X && V;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new b(this.px, r.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: N, b: O } = t, z = r.mul(O, n_), { px: M, py: U, pz: P } = this;
      let H = r.ZERO, X = r.ZERO, V = r.ZERO, k = r.mul(M, M), it = r.mul(U, U), W = r.mul(P, P), j = r.mul(M, U);
      return j = r.add(j, j), V = r.mul(M, P), V = r.add(V, V), H = r.mul(N, V), X = r.mul(z, W), X = r.add(H, X), H = r.sub(it, X), X = r.add(it, X), X = r.mul(H, X), H = r.mul(j, H), V = r.mul(z, V), W = r.mul(N, W), j = r.sub(k, W), j = r.mul(N, j), j = r.add(j, V), V = r.add(k, k), k = r.add(V, k), k = r.add(k, W), k = r.mul(k, j), X = r.add(X, k), W = r.mul(U, P), W = r.add(W, W), k = r.mul(W, j), H = r.sub(H, k), V = r.mul(W, it), V = r.add(V, V), V = r.add(V, V), new b(H, X, V);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(N) {
      A(N);
      const { px: O, py: z, pz: M } = this, { px: U, py: P, pz: H } = N;
      let X = r.ZERO, V = r.ZERO, k = r.ZERO;
      const it = t.a, W = r.mul(t.b, n_);
      let j = r.mul(O, U), v = r.mul(z, P), d = r.mul(M, H), _ = r.add(O, z), f = r.add(U, P);
      _ = r.mul(_, f), f = r.add(j, v), _ = r.sub(_, f), f = r.add(O, M);
      let g = r.add(U, H);
      return f = r.mul(f, g), g = r.add(j, d), f = r.sub(f, g), g = r.add(z, M), X = r.add(P, H), g = r.mul(g, X), X = r.add(v, d), g = r.sub(g, X), k = r.mul(it, f), X = r.mul(W, d), k = r.add(X, k), X = r.sub(v, k), k = r.add(v, k), V = r.mul(X, k), v = r.add(j, j), v = r.add(v, j), d = r.mul(it, d), f = r.mul(W, f), v = r.add(v, d), d = r.sub(j, d), d = r.mul(it, d), f = r.add(f, d), j = r.mul(v, f), V = r.add(V, j), j = r.mul(g, f), X = r.mul(_, X), X = r.sub(X, j), j = r.mul(_, v), k = r.mul(g, k), k = r.add(k, j), new b(X, V, k);
    }
    subtract(N) {
      return this.add(N.negate());
    }
    is0() {
      return this.equals(b.ZERO);
    }
    wNAF(N) {
      return F.wNAFCached(this, N, b.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(N) {
      Jr("scalar", N, hr, t.n);
      const O = b.ZERO;
      if (N === hr)
        return O;
      if (N === ge)
        return this;
      const { endo: z } = t;
      if (!z)
        return F.unsafeLadder(this, N);
      let { k1neg: M, k1: U, k2neg: P, k2: H } = z.splitScalar(N), X = O, V = O, k = this;
      for (; U > hr || H > hr; )
        U & ge && (X = X.add(k)), H & ge && (V = V.add(k)), k = k.double(), U >>= ge, H >>= ge;
      return M && (X = X.negate()), P && (V = V.negate()), V = new b(r.mul(V.px, z.beta), V.py, V.pz), X.add(V);
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
    multiply(N) {
      const { endo: O, n: z } = t;
      Jr("scalar", N, ge, z);
      let M, U;
      if (O) {
        const { k1neg: P, k1: H, k2neg: X, k2: V } = O.splitScalar(N);
        let { p: k, f: it } = this.wNAF(H), { p: W, f: j } = this.wNAF(V);
        k = F.constTimeNegate(P, k), W = F.constTimeNegate(X, W), W = new b(r.mul(W.px, O.beta), W.py, W.pz), M = k.add(W), U = it.add(j);
      } else {
        const { p: P, f: H } = this.wNAF(N);
        M = P, U = H;
      }
      return b.normalizeZ([M, U])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(N, O, z) {
      const M = b.BASE, U = (H, X) => X === hr || X === ge || !H.equals(M) ? H.multiplyUnsafe(X) : H.multiply(X), P = U(this, O).add(U(N, z));
      return P.is0() ? void 0 : P;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(N) {
      return p(this, N);
    }
    isTorsionFree() {
      const { h: N, isTorsionFree: O } = t;
      if (N === ge)
        return !0;
      if (O)
        return O(b, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: N, clearCofactor: O } = t;
      return N === ge ? this : O ? O(b, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(N = !0) {
      return yn("isCompressed", N), this.assertValidity(), s(b, this, N);
    }
    toHex(N = !0) {
      return yn("isCompressed", N), bn(this.toRawBytes(N));
    }
  }
  b.BASE = new b(t.Gx, t.Gy, r.ONE), b.ZERO = new b(r.ZERO, r.ONE, r.ZERO);
  const S = t.nBitLength, F = QI(b, t.endo ? Math.ceil(S / 2) : S);
  return {
    CURVE: t,
    ProjectivePoint: b,
    normPrivateKeyToScalar: u,
    weierstrassEquation: a,
    isWithinCurveOrder: o
  };
}
function kI(e) {
  const t = ml(e);
  return os(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function UI(e) {
  const t = kI(e), { Fp: r, n } = t, s = r.BYTES + 1, i = 2 * r.BYTES + 1;
  function a(d) {
    return De(d, n);
  }
  function o(d) {
    return Ha(d, n);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: A, weierstrassEquation: p, isWithinCurveOrder: m } = PI({
    ...t,
    toBytes(d, _, f) {
      const g = _.toAffine(), y = r.toBytes(g.x), B = Wn;
      return yn("isCompressed", f), f ? B(Uint8Array.from([_.hasEvenY() ? 2 : 3]), y) : B(Uint8Array.from([4]), y, r.toBytes(g.y));
    },
    fromBytes(d) {
      const _ = d.length, f = d[0], g = d.subarray(1);
      if (_ === s && (f === 2 || f === 3)) {
        const y = jr(g);
        if (!Ai(y, ge, r.ORDER))
          throw new Error("Point is not on curve");
        const B = p(y);
        let T;
        try {
          T = r.sqrt(B);
        } catch (E) {
          const K = E instanceof Error ? ": " + E.message : "";
          throw new Error("Point is not on curve" + K);
        }
        const I = (T & ge) === ge;
        return (f & 1) === 1 !== I && (T = r.neg(T)), { x: y, y: T };
      } else if (_ === i && f === 4) {
        const y = r.fromBytes(g.subarray(0, r.BYTES)), B = r.fromBytes(g.subarray(r.BYTES, 2 * r.BYTES));
        return { x: y, y: B };
      } else
        throw new Error(`Point of length ${_} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), b = (d) => bn(En(d, t.nByteLength));
  function S(d) {
    const _ = n >> ge;
    return d > _;
  }
  function F(d) {
    return S(d) ? a(-d) : d;
  }
  const R = (d, _, f) => jr(d.slice(_, f));
  class N {
    constructor(_, f, g) {
      this.r = _, this.s = f, this.recovery = g, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(_) {
      const f = t.nByteLength;
      return _ = Ze("compactSignature", _, f * 2), new N(R(_, 0, f), R(_, f, 2 * f));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(_) {
      const { r: f, s: g } = _r.toSig(Ze("DER", _));
      return new N(f, g);
    }
    assertValidity() {
      Jr("r", this.r, ge, n), Jr("s", this.s, ge, n);
    }
    addRecoveryBit(_) {
      return new N(this.r, this.s, _);
    }
    recoverPublicKey(_) {
      const { r: f, s: g, recovery: y } = this, B = H(Ze("msgHash", _));
      if (y == null || ![0, 1, 2, 3].includes(y))
        throw new Error("recovery id invalid");
      const T = y === 2 || y === 3 ? f + t.n : f;
      if (T >= r.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const I = y & 1 ? "03" : "02", l = u.fromHex(I + b(T)), E = o(T), K = a(-B * E), $ = a(g * E), tt = u.BASE.multiplyAndAddUnsafe(l, K, $);
      if (!tt)
        throw new Error("point at infinify");
      return tt.assertValidity(), tt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return S(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new N(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return In(this.toDERHex());
    }
    toDERHex() {
      return _r.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return In(this.toCompactHex());
    }
    toCompactHex() {
      return b(this.r) + b(this.s);
    }
  }
  const O = {
    isValidPrivateKey(d) {
      try {
        return A(d), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: A,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const d = wl(t.n);
      return NI(t.randomBytes(d), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(d = 8, _ = u.BASE) {
      return _._setWindowSize(d), _.multiply(BigInt(3)), _;
    }
  };
  function z(d, _ = !0) {
    return u.fromPrivateKey(d).toRawBytes(_);
  }
  function M(d) {
    const _ = $r(d), f = typeof d == "string", g = (_ || f) && d.length;
    return _ ? g === s || g === i : f ? g === 2 * s || g === 2 * i : d instanceof u;
  }
  function U(d, _, f = !0) {
    if (M(d))
      throw new Error("first arg must be private key");
    if (!M(_))
      throw new Error("second arg must be public key");
    return u.fromHex(_).multiply(A(d)).toRawBytes(f);
  }
  const P = t.bits2int || function(d) {
    const _ = jr(d), f = d.length * 8 - t.nBitLength;
    return f > 0 ? _ >> BigInt(f) : _;
  }, H = t.bits2int_modN || function(d) {
    return a(P(d));
  }, X = No(t.nBitLength);
  function V(d) {
    return Jr(`num < 2^${t.nBitLength}`, d, hr, X), En(d, t.nByteLength);
  }
  function k(d, _, f = it) {
    if (["recovered", "canonical"].some((ht) => ht in f))
      throw new Error("sign() legacy options not supported");
    const { hash: g, randomBytes: y } = t;
    let { lowS: B, prehash: T, extraEntropy: I } = f;
    B == null && (B = !0), d = Ze("msgHash", d), r_(f), T && (d = Ze("prehashed msgHash", g(d)));
    const l = H(d), E = A(_), K = [V(E), V(l)];
    if (I != null && I !== !1) {
      const ht = I === !0 ? y(r.BYTES) : I;
      K.push(Ze("extraEntropy", ht));
    }
    const $ = Wn(...K), tt = l;
    function Bt(ht) {
      const yt = P(ht);
      if (!m(yt))
        return;
      const je = o(yt), bt = u.BASE.multiply(yt).toAffine(), At = a(bt.x);
      if (At === hr)
        return;
      const Ee = a(je * a(tt + At * E));
      if (Ee === hr)
        return;
      let xt = (bt.x === At ? 0 : 2) | Number(bt.y & ge), Ft = Ee;
      return B && S(Ee) && (Ft = F(Ee), xt ^= 1), new N(At, Ft, xt);
    }
    return { seed: $, k2sig: Bt };
  }
  const it = { lowS: t.lowS, prehash: !1 }, W = { lowS: t.lowS, prehash: !1 };
  function j(d, _, f = it) {
    const { seed: g, k2sig: y } = k(d, _, f), B = t;
    return Gh(B.hash.outputLen, B.nByteLength, B.hmac)(g, y);
  }
  u.BASE._setWindowSize(8);
  function v(d, _, f, g = W) {
    var bt;
    const y = d;
    if (_ = Ze("msgHash", _), f = Ze("publicKey", f), "strict" in g)
      throw new Error("options.strict was renamed to lowS");
    r_(g);
    const { lowS: B, prehash: T } = g;
    let I, l;
    try {
      if (typeof y == "string" || $r(y))
        try {
          I = N.fromDER(y);
        } catch (At) {
          if (!(At instanceof _r.Err))
            throw At;
          I = N.fromCompact(y);
        }
      else if (typeof y == "object" && typeof y.r == "bigint" && typeof y.s == "bigint") {
        const { r: At, s: Ee } = y;
        I = new N(At, Ee);
      } else
        throw new Error("PARSE");
      l = u.fromHex(f);
    } catch (At) {
      if (At.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (B && I.hasHighS())
      return !1;
    T && (_ = t.hash(_));
    const { r: E, s: K } = I, $ = H(_), tt = o(K), Bt = a($ * tt), ht = a(E * tt), yt = (bt = u.BASE.multiplyAndAddUnsafe(l, Bt, ht)) == null ? void 0 : bt.toAffine();
    return yt ? a(yt.x) === E : !1;
  }
  return {
    CURVE: t,
    getPublicKey: z,
    getSharedSecret: U,
    sign: j,
    verify: v,
    ProjectivePoint: u,
    Signature: N,
    utils: O
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function zI(e) {
  return {
    hash: e,
    hmac: (t, ...r) => _i(e, t, zf(...r)),
    randomBytes: Vf
  };
}
function GI(e, t) {
  const r = (n) => UI({ ...e, ...zI(n) });
  return Object.freeze({ ...r(t), create: r });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const yl = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), s_ = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), VI = BigInt(1), Xa = BigInt(2), i_ = (e, t) => (e + t / Xa) / t;
function YI(e) {
  const t = yl, r = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), a = BigInt(23), o = BigInt(44), u = BigInt(88), A = e * e * e % t, p = A * A * e % t, m = Le(p, r, t) * p % t, b = Le(m, r, t) * p % t, S = Le(b, Xa, t) * A % t, F = Le(S, s, t) * S % t, R = Le(F, i, t) * F % t, N = Le(R, o, t) * R % t, O = Le(N, u, t) * N % t, z = Le(O, o, t) * R % t, M = Le(z, r, t) * p % t, U = Le(M, a, t) * F % t, P = Le(U, n, t) * A % t, H = Le(P, Xa, t);
  if (!Za.eql(Za.sqr(H), e))
    throw new Error("Cannot find square root");
  return H;
}
const Za = pl(yl, void 0, void 0, { sqrt: YI }), vr = GI({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Za,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: s_,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (e) => {
      const t = s_, r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -VI * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = r, a = BigInt("0x100000000000000000000000000000000"), o = i_(i * e, t), u = i_(-n * e, t);
      let A = De(e - o * r - u * s, t), p = De(-o * n - u * i, t);
      const m = A > a, b = p > a;
      if (m && (A = t - A), b && (p = t - p), A > a || p > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: m, k1: A, k2neg: b, k2: p };
    }
  }
}, Or);
BigInt(0);
vr.ProjectivePoint;
var Mo = { exports: {} }, An = typeof Reflect == "object" ? Reflect : null, a_ = An && typeof An.apply == "function" ? An.apply : function(t, r, n) {
  return Function.prototype.apply.call(t, r, n);
}, Ns;
An && typeof An.ownKeys == "function" ? Ns = An.ownKeys : Object.getOwnPropertySymbols ? Ns = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Ns = function(t) {
  return Object.getOwnPropertyNames(t);
};
function HI(e) {
  console && console.warn && console.warn(e);
}
var bl = Number.isNaN || function(t) {
  return t !== t;
};
function Ct() {
  Ct.init.call(this);
}
Mo.exports = Ct;
Mo.exports.once = jI;
Ct.EventEmitter = Ct;
Ct.prototype._events = void 0;
Ct.prototype._eventsCount = 0;
Ct.prototype._maxListeners = void 0;
var o_ = 10;
function wi(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Ct, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return o_;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || bl(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    o_ = e;
  }
});
Ct.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Ct.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || bl(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Il(e) {
  return e._maxListeners === void 0 ? Ct.defaultMaxListeners : e._maxListeners;
}
Ct.prototype.getMaxListeners = function() {
  return Il(this);
};
Ct.prototype.emit = function(t) {
  for (var r = [], n = 1; n < arguments.length; n++) r.push(arguments[n]);
  var s = t === "error", i = this._events;
  if (i !== void 0)
    s = s && i.error === void 0;
  else if (!s)
    return !1;
  if (s) {
    var a;
    if (r.length > 0 && (a = r[0]), a instanceof Error)
      throw a;
    var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw o.context = a, o;
  }
  var u = i[t];
  if (u === void 0)
    return !1;
  if (typeof u == "function")
    a_(u, this, r);
  else
    for (var A = u.length, p = xl(u, A), n = 0; n < A; ++n)
      a_(p[n], this, r);
  return !0;
};
function El(e, t, r, n) {
  var s, i, a;
  if (wi(r), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    r.listener ? r.listener : r
  ), i = e._events), a = i[t]), a === void 0)
    a = i[t] = r, ++e._eventsCount;
  else if (typeof a == "function" ? a = i[t] = n ? [r, a] : [a, r] : n ? a.unshift(r) : a.push(r), s = Il(e), s > 0 && a.length > s && !a.warned) {
    a.warned = !0;
    var o = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = a.length, HI(o);
  }
  return e;
}
Ct.prototype.addListener = function(t, r) {
  return El(this, t, r, !1);
};
Ct.prototype.on = Ct.prototype.addListener;
Ct.prototype.prependListener = function(t, r) {
  return El(this, t, r, !0);
};
function XI() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function vl(e, t, r) {
  var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r }, s = XI.bind(n);
  return s.listener = r, n.wrapFn = s, s;
}
Ct.prototype.once = function(t, r) {
  return wi(r), this.on(t, vl(this, t, r)), this;
};
Ct.prototype.prependOnceListener = function(t, r) {
  return wi(r), this.prependListener(t, vl(this, t, r)), this;
};
Ct.prototype.removeListener = function(t, r) {
  var n, s, i, a, o;
  if (wi(r), s = this._events, s === void 0)
    return this;
  if (n = s[t], n === void 0)
    return this;
  if (n === r || n.listener === r)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[t], s.removeListener && this.emit("removeListener", t, n.listener || r));
  else if (typeof n != "function") {
    for (i = -1, a = n.length - 1; a >= 0; a--)
      if (n[a] === r || n[a].listener === r) {
        o = n[a].listener, i = a;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? n.shift() : ZI(n, i), n.length === 1 && (s[t] = n[0]), s.removeListener !== void 0 && this.emit("removeListener", t, o || r);
  }
  return this;
};
Ct.prototype.off = Ct.prototype.removeListener;
Ct.prototype.removeAllListeners = function(t) {
  var r, n, s;
  if (n = this._events, n === void 0)
    return this;
  if (n.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[t] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[t]), this;
  if (arguments.length === 0) {
    var i = Object.keys(n), a;
    for (s = 0; s < i.length; ++s)
      a = i[s], a !== "removeListener" && this.removeAllListeners(a);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (r = n[t], typeof r == "function")
    this.removeListener(t, r);
  else if (r !== void 0)
    for (s = r.length - 1; s >= 0; s--)
      this.removeListener(t, r[s]);
  return this;
};
function Cl(e, t, r) {
  var n = e._events;
  if (n === void 0)
    return [];
  var s = n[t];
  return s === void 0 ? [] : typeof s == "function" ? r ? [s.listener || s] : [s] : r ? WI(s) : xl(s, s.length);
}
Ct.prototype.listeners = function(t) {
  return Cl(this, t, !0);
};
Ct.prototype.rawListeners = function(t) {
  return Cl(this, t, !1);
};
Ct.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Bl.call(e, t);
};
Ct.prototype.listenerCount = Bl;
function Bl(e) {
  var t = this._events;
  if (t !== void 0) {
    var r = t[e];
    if (typeof r == "function")
      return 1;
    if (r !== void 0)
      return r.length;
  }
  return 0;
}
Ct.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Ns(this._events) : [];
};
function xl(e, t) {
  for (var r = new Array(t), n = 0; n < t; ++n)
    r[n] = e[n];
  return r;
}
function ZI(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function WI(e) {
  for (var t = new Array(e.length), r = 0; r < t.length; ++r)
    t[r] = e[r].listener || e[r];
  return t;
}
function jI(e, t) {
  return new Promise(function(r, n) {
    function s(a) {
      e.removeListener(t, i), n(a);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), r([].slice.call(arguments));
    }
    Rl(e, t, i, { once: !0 }), t !== "error" && JI(e, s, { once: !0 });
  });
}
function JI(e, t, r) {
  typeof e.on == "function" && Rl(e, "error", t, r);
}
function Rl(e, t, r, n) {
  if (typeof e.on == "function")
    n.once ? e.once(t, r) : e.on(t, r);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      n.once && e.removeEventListener(t, s), r(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var Sl = Mo.exports, qI = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", $I = class {
  constructor(e, t, r, n, s, i = 0) {
    Q(this, "left");
    Q(this, "right");
    Q(this, "parent");
    Q(this, "hash");
    Q(this, "data");
    Q(this, "index");
    this.left = e, this.right = t, this.parent = r, this.hash = n, this.data = s, this.index = i;
  }
}, c_ = $I;
function KI(e) {
  return ze("0x00".concat(e.slice(2)));
}
function tE(e, t) {
  return ze("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function Tl(e) {
  if (!e.length)
    return qI;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const a = KI(e[i]);
    t.push(new c_(-1, -1, -1, a, e[i]));
  }
  let r = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const a = i << 1, o = tE(r[a].hash, r[a + 1].hash);
      t[i] = new c_(r[a].index, r[a + 1].index, -1, o, "");
    }
    if (s === 1 && (t[i] = r[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, r = t;
  }
  return t[0].hash;
}
var eE = "0x00", Nl = "0x01";
function rE(e, t) {
  const r = "0x00".concat(e.slice(2)).concat(ze(t).slice(2));
  return [ze(r), r];
}
function nn(e, t) {
  const r = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [ze(r), r];
}
function fa(e) {
  const t = Nl.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function nE(e) {
  const t = Nl.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function pa(e) {
  return e.slice(0, 4) === eE;
}
var sE = class {
  constructor(e, t, r, n, s) {
    Q(this, "SideNodes");
    Q(this, "NonMembershipLeafData");
    Q(this, "BitMask");
    Q(this, "NumSideNodes");
    Q(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = r, this.NumSideNodes = n, this.SiblingData = s;
  }
}, iE = sE, aE = class {
  constructor(e, t, r) {
    Q(this, "SideNodes");
    Q(this, "NonMembershipLeafData");
    Q(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = r;
  }
}, oE = aE, Fe = "0x0000000000000000000000000000000000000000000000000000000000000000", ur = 256;
function hn(e, t) {
  const r = e.slice(2), n = "0x".concat(
    r.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function cE(e) {
  let t = 0, r = e.length - 1;
  const n = e;
  for (; t < r; )
    [n[t], n[r]] = [
      n[r],
      n[t]
    ], t += 1, r -= 1;
  return n;
}
function dE(e, t) {
  let r = 0;
  for (let n = 0; n < ur && hn(e, n) === hn(t, n); n += 1)
    r += 1;
  return r;
}
function uE(e) {
  const t = [], r = [];
  let n;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    n = e.SideNodes[i], n === Fe ? t.push(0) : (r.push(n), t.push(1));
  return new iE(
    r,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var _E = class {
  constructor() {
    Q(this, "ms");
    Q(this, "root");
    const e = {};
    this.ms = e, this.root = Fe, this.ms[this.root] = Fe;
  }
  get(e) {
    return this.ms[e];
  }
  set(e, t) {
    this.ms[e] = t;
  }
  setRoot(e) {
    this.root = e;
  }
  sideNodesForRoot(e, t) {
    const r = [];
    if (t === Fe)
      return [r, Fe, "", ""];
    let n = this.get(t);
    if (pa(n))
      return [r, t, n, ""];
    let s, i, a = "", o = "";
    for (let A = 0; A < ur; A += 1) {
      if ([s, i] = nE(n), hn(e, A) === 1 ? (o = s, a = i) : (o = i, a = s), r.push(o), a === Fe) {
        n = "";
        break;
      }
      if (n = this.get(a), pa(n))
        break;
    }
    const u = this.get(o);
    return [cE(r), a, n, u];
  }
  deleteWithSideNodes(e, t, r, n) {
    if (r === Fe)
      return this.root;
    const [s] = fa(n);
    if (s !== e)
      return this.root;
    let i = "", a = "", o = "", u = "", A = !1;
    for (let p = 0; p < t.length; p += 1)
      if (t[p] !== "") {
        if (o = t[p], a === "")
          if (u = this.get(o), pa(u)) {
            i = o, a = o;
            continue;
          } else
            a = Fe, A = !0;
        !A && o === Fe || (A || (A = !0), hn(e, t.length - 1 - p) === 1 ? [i, a] = nn(o, a) : [i, a] = nn(a, o), this.set(i, a), a = i);
      }
    return i === "" && (i = Fe), i;
  }
  updateWithSideNodes(e, t, r, n, s) {
    let i, a;
    this.set(ze(t), t), [i, a] = rE(e, t), this.set(i, a), a = i;
    let o;
    if (n === Fe)
      o = ur;
    else {
      const [u] = fa(s);
      o = dE(e, u);
    }
    o !== ur && (hn(e, o) === 1 ? [i, a] = nn(n, a) : [i, a] = nn(a, n), this.set(i, a), a = i);
    for (let u = 0; u < ur; u += 1) {
      let A;
      const p = ur - r.length;
      if (u - p < 0 || r[u - p] === "")
        if (o !== ur && o > ur - 1 - u)
          A = Fe;
        else
          continue;
      else
        A = r[u - p];
      hn(e, ur - 1 - u) === 1 ? [i, a] = nn(A, a) : [i, a] = nn(a, A), this.set(i, a), a = i;
    }
    return i;
  }
  update(e, t) {
    const [r, n, s] = this.sideNodesForRoot(e, this.root), i = this.updateWithSideNodes(e, t, r, n, s);
    this.setRoot(i);
  }
  delete(e) {
    const [t, r, n] = this.sideNodesForRoot(e, this.root), s = this.deleteWithSideNodes(e, t, r, n);
    this.setRoot(s);
  }
  prove(e) {
    const [t, r, n, s] = this.sideNodesForRoot(e, this.root), i = [];
    for (let u = 0; u < t.length; u += 1)
      t[u] !== "" && i.push(t[u]);
    let a = "";
    if (r !== Fe) {
      const [u] = fa(n);
      u !== e && (a = n);
    }
    return new oE(i, a, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return uE(t);
  }
}, hE = Object.defineProperty, lE = (e, t, r) => t in e ? hE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Nt = (e, t, r) => (lE(e, typeof t != "symbol" ? t + "" : t, r), r), Lo = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, Dt = (e, t, r) => (Lo(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Sr = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, We = (e, t, r, n) => (Lo(e, t, "write to private field"), t.set(e, r), r), Wa = (e, t, r) => (Lo(e, t, "access private method"), r), Po = (e) => {
  let t, r, n;
  Array.isArray(e) ? (r = e[0], t = e[1], n = e[2] ?? void 0) : (r = e.amount, t = e.assetId, n = e.max ?? void 0);
  const s = x(r);
  return {
    assetId: Z(t),
    amount: s.lt(1) ? x(1) : s,
    max: n ? x(n) : void 0
  };
}, AE = (e) => {
  const { amount: t, assetId: r } = e, n = [...e.coinQuantities], s = n.findIndex((i) => i.assetId === r);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: r, amount: t }), n;
}, ko = q`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Uo = q`
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
    `, Dl = q`
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
    ${Uo}`, Ql = q`
    fragment SuccessStatusWithBlockIdFragment on SuccessStatus {
  ...SuccessStatusFragment
  block {
    id
  }
}
    ${Dl}`, fE = q`
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
    `, Fl = q`
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
    ${Uo}`, Ol = q`
    fragment FailureStatusWithBlockIdFragment on FailureStatus {
  ...FailureStatusFragment
  block {
    id
  }
}
    ${Fl}`, zo = q`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, Ml = q`
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
    ${ko}
${Ql}
${fE}
${Ol}
${zo}`, pE = q`
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
    ${ko}
${Dl}
${Fl}
${zo}`, Ll = q`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${pE}`, gE = q`
    fragment transactionRawPayloadFragment on Transaction {
  id
  rawPayload
}
    `, wE = q`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, mE = q`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${wE}`, yE = q`
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
    `, bE = q`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, IE = q`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${yE}
${bE}`, EE = q`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${IE}
${Uo}`, mi = q`
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
    `, Go = q`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, vE = q`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Pl = q`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  daHeight
}
    `, CE = q`
    fragment getMessageFragment on Message {
  ...messageFragment
  nonce
}
    ${Pl}`, BE = q`
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
    `, xE = q`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, RE = q`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, SE = q`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, TE = q`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, NE = q`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, DE = q`
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
    `, QE = q`
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
    ${DE}`, FE = q`
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
    ${xE}
${RE}
${SE}
${TE}
${NE}
${QE}`, kl = q`
    fragment chainInfoFragment on ChainInfo {
  name
  daHeight
  consensusParameters {
    ...consensusParametersFragment
  }
}
    ${FE}`, OE = q`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Rn = q`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, Ul = q`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, ME = q`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, LE = q`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, PE = q`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${Ul}`, kE = q`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${kl}`, UE = q`
    query getChainAndNodeInfo {
  chain {
    ...chainInfoFragment
  }
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${kl}
${Ul}`, zE = q`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Ll}`, GE = q`
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
    ${ko}
${Ql}
${Ol}
${zo}`, VE = q`
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
    ${Rn}`, YE = q`
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
    ${Rn}
${Ll}`, HE = q`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${mE}`, XE = q`
    query getLatestBlock {
  chain {
    latestBlock {
      ...blockFragment
    }
  }
}
    ${mi}`, ZE = q`
    query getLatestBlockHeight {
  chain {
    latestBlock {
      height
    }
  }
}
    `, WE = q`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${mi}`, jE = q`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionRawPayloadFragment
    }
  }
}
    ${mi}
${gE}`, JE = q`
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
    ${Rn}
${mi}`, qE = q`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
    owner
  }
}
    ${Go}`, $E = q`
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
    ${Rn}
${Go}`, KE = q`
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
    ${Go}
${vE}`, tv = q`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, ev = q`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${OE}`, rv = q`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amount
  }
}
    `, nv = q`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, sv = q`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, iv = q`
    query getBalances($filter: BalanceFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  balances(
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
        assetId
        amount
      }
    }
  }
}
    ${Rn}`, av = q`
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
    ${Rn}
${CE}`, ov = q`
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
    ${BE}`, cv = q`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, dv = q`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${ME}`, uv = q`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${EE}`, _v = q`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, hv = q`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, lv = q`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${Pl}`, Av = q`
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
    `, fv = q`
    query getConsensusParametersVersion {
  chain {
    latestBlock {
      header {
        consensusParametersVersion
      }
    }
  }
}
    `, pv = q`
    subscription submitAndAwaitStatus($encodedTransaction: HexString!) {
  submitAndAwaitStatus(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Ml}`, gv = q`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Ml}`;
function wv(e) {
  return {
    getVersion(t, r) {
      return e(LE, t, r);
    },
    getNodeInfo(t, r) {
      return e(PE, t, r);
    },
    getChain(t, r) {
      return e(kE, t, r);
    },
    getChainAndNodeInfo(t, r) {
      return e(UE, t, r);
    },
    getTransaction(t, r) {
      return e(zE, t, r);
    },
    getTransactionWithReceipts(t, r) {
      return e(GE, t, r);
    },
    getTransactions(t, r) {
      return e(VE, t, r);
    },
    getTransactionsByOwner(t, r) {
      return e(YE, t, r);
    },
    estimatePredicates(t, r) {
      return e(HE, t, r);
    },
    getLatestBlock(t, r) {
      return e(XE, t, r);
    },
    getLatestBlockHeight(t, r) {
      return e(ZE, t, r);
    },
    getBlock(t, r) {
      return e(WE, t, r);
    },
    getBlockWithTransactions(t, r) {
      return e(jE, t, r);
    },
    getBlocks(t, r) {
      return e(JE, t, r);
    },
    getCoin(t, r) {
      return e(qE, t, r);
    },
    getCoins(t, r) {
      return e($E, t, r);
    },
    getCoinsToSpend(t, r) {
      return e(KE, t, r);
    },
    getContract(t, r) {
      return e(tv, t, r);
    },
    getContractBalance(t, r) {
      return e(ev, t, r);
    },
    getBalance(t, r) {
      return e(rv, t, r);
    },
    getLatestGasPrice(t, r) {
      return e(nv, t, r);
    },
    estimateGasPrice(t, r) {
      return e(sv, t, r);
    },
    getBalances(t, r) {
      return e(iv, t, r);
    },
    getMessages(t, r) {
      return e(av, t, r);
    },
    getMessageProof(t, r) {
      return e(ov, t, r);
    },
    getMessageStatus(t, r) {
      return e(cv, t, r);
    },
    getRelayedTransactionStatus(t, r) {
      return e(dv, t, r);
    },
    dryRun(t, r) {
      return e(uv, t, r);
    },
    submit(t, r) {
      return e(_v, t, r);
    },
    produceBlocks(t, r) {
      return e(hv, t, r);
    },
    getMessageByNonce(t, r) {
      return e(lv, t, r);
    },
    isUserAccount(t, r) {
      return e(Av, t, r);
    },
    getConsensusParametersVersion(t, r) {
      return e(fv, t, r);
    },
    submitAndAwaitStatus(t, r) {
      return e(pv, t, r);
    },
    statusChange(t, r) {
      return e(gv, t, r);
    }
  };
}
var Ds = class {
  constructor(e) {
    Q(this, "events", []);
    Q(this, "parsingLeftover", "");
    this.stream = e;
  }
  static async create(e) {
    const { url: t, query: r, variables: n, fetchFn: s } = e, i = await s(`${t}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: tl(r),
        variables: n
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    }), [a, o] = i.body.tee().map((u) => u.getReader());
    return await new Ds(a).next(), new Ds(o);
  }
  async next() {
    for (; ; ) {
      if (this.events.length > 0) {
        const { data: a, errors: o } = this.events.shift();
        if (Array.isArray(o))
          throw new C(
            C.CODES.INVALID_REQUEST,
            o.map((u) => u.message).join(`

`)
          );
        return { value: a, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const r = Ds.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (r === "")
        continue;
      const n = `${this.parsingLeftover}${r}`, s = /data:.*\n\n/g, i = [...n.matchAll(s)].flatMap((a) => a);
      i.forEach((a) => {
        try {
          this.events.push(JSON.parse(a.replace(/^data:/, "")));
        } catch {
          throw new C(
            D.STREAM_PARSING_ERROR,
            `Error while parsing stream data response: ${n}`
          );
        }
      }), this.parsingLeftover = n.replace(i.join(), "");
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
}, zl = Ds;
Nt(zl, "textDecoder", new TextDecoder());
var Er = /* @__PURE__ */ new Map(), d_ = class {
  constructor(e) {
    Q(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new C(
        D.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  // Add resources to the cache
  set(e, t) {
    const r = Date.now(), n = Er.get(e) || {
      utxos: /* @__PURE__ */ new Set(),
      messages: /* @__PURE__ */ new Set(),
      timestamp: r
    };
    t.utxos.forEach((s) => n.utxos.add(Z(s))), t.messages.forEach((s) => n.messages.add(Z(s))), Er.set(e, n);
  }
  // Remove resources from the cache for a given transaction ID
  unset(e) {
    Er.delete(e);
  }
  // Get all cached resources and remove expired ones
  getActiveData() {
    const e = { utxos: [], messages: [] }, t = Date.now();
    return Er.forEach((r, n) => {
      t - r.timestamp < this.ttl ? (e.utxos.push(...r.utxos), e.messages.push(...r.messages)) : Er.delete(n);
    }), e;
  }
  // Check if a UTXO ID or message nonce is already cached and not expired
  isCached(e) {
    const t = Date.now();
    for (const [r, n] of Er.entries())
      if (t - n.timestamp > this.ttl)
        Er.delete(r);
      else if (n.utxos.has(e) || n.messages.has(e))
        return !0;
    return !1;
  }
  clear() {
    Er.clear();
  }
}, mv = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case It.Coin: {
      const r = Y(e.predicate ?? "0x"), n = Y(e.predicateData ?? "0x");
      return {
        type: It.Coin,
        txID: Z(Y(e.id).slice(0, pr)),
        outputIndex: xr(Y(e.id).slice(pr, Ps)),
        owner: Z(e.owner),
        amount: x(e.amount),
        assetId: Z(e.assetId),
        txPointer: {
          blockHeight: xr(Y(e.txPointer).slice(0, 8)),
          txIndex: xr(Y(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: x(e.predicateGasUsed),
        predicateLength: x(r.length),
        predicateDataLength: x(n.length),
        predicate: Z(r),
        predicateData: Z(n)
      };
    }
    case It.Contract:
      return {
        type: It.Contract,
        txID: St,
        outputIndex: 0,
        balanceRoot: St,
        stateRoot: St,
        txPointer: {
          blockHeight: xr(Y(e.txPointer).slice(0, 8)),
          txIndex: xr(Y(e.txPointer).slice(8, 16))
        },
        contractID: Z(e.contractId)
      };
    case It.Message: {
      const r = Y(e.predicate ?? "0x"), n = Y(e.predicateData ?? "0x"), s = Y(e.data ?? "0x");
      return {
        type: It.Message,
        sender: Z(e.sender),
        recipient: Z(e.recipient),
        amount: x(e.amount),
        nonce: Z(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: x(e.predicateGasUsed),
        predicateLength: x(r.length),
        predicateDataLength: x(n.length),
        predicate: Z(r),
        predicateData: Z(n),
        data: Z(s),
        dataLength: s.length
      };
    }
    default:
      throw new C(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, yv = (e) => {
  const { type: t } = e;
  switch (t) {
    case mt.Coin:
      return {
        type: mt.Coin,
        to: Z(e.to),
        amount: x(e.amount),
        assetId: Z(e.assetId)
      };
    case mt.Contract:
      return {
        type: mt.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: St,
        stateRoot: St
      };
    case mt.Change:
      return {
        type: mt.Change,
        to: Z(e.to),
        amount: x(0),
        assetId: Z(e.assetId)
      };
    case mt.Variable:
      return {
        type: mt.Variable,
        to: St,
        amount: x(0),
        assetId: St
      };
    case mt.ContractCreated:
      return {
        type: mt.ContractCreated,
        contractId: Z(e.contractId),
        stateRoot: Z(e.stateRoot)
      };
    default:
      throw new C(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, u_ = (e) => !("data" in e), BB = (e) => "utxoId" in e, xB = (e) => "recipient" in e, bv = (e) => "id" in e, RB = (e) => "recipient" in e, Iv = (e) => e.type === ut.Revert && e.val.toString("hex") === nl, Ev = (e) => e.type === ut.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", __ = (e) => e.reduce(
  (t, r) => (Iv(r) && t.missingOutputVariables.push(r), Ev(r) && t.missingOutputContractIds.push(r), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), vt = (e) => e || St;
function vv(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL": {
      const r = vt(e.id || e.contractId);
      return {
        type: ut.Call,
        id: r,
        to: vt(e == null ? void 0 : e.to),
        amount: x(e.amount),
        assetId: vt(e.assetId),
        gas: x(e.gas),
        param1: x(e.param1),
        param2: x(e.param2),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "RETURN":
      return {
        type: ut.Return,
        id: vt(e.id || e.contractId),
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "RETURN_DATA":
      return {
        type: ut.ReturnData,
        id: vt(e.id || e.contractId),
        ptr: x(e.ptr),
        len: x(e.len),
        digest: vt(e.digest),
        pc: x(e.pc),
        data: vt(e.data),
        is: x(e.is)
      };
    case "PANIC":
      return {
        type: ut.Panic,
        id: vt(e.id),
        reason: x(e.reason),
        pc: x(e.pc),
        is: x(e.is),
        contractId: vt(e.contractId)
      };
    case "REVERT":
      return {
        type: ut.Revert,
        id: vt(e.id || e.contractId),
        val: x(e.ra),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "LOG": {
      const r = x(e.ra), n = x(e.rb), s = x(e.rc), i = x(e.rd);
      return {
        type: ut.Log,
        id: vt(e.id || e.contractId),
        ra: r,
        rb: n,
        rc: s,
        rd: i,
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "LOG_DATA": {
      const r = x(e.ra), n = x(e.rb);
      return {
        type: ut.LogData,
        id: vt(e.id || e.contractId),
        ra: r,
        rb: n,
        ptr: x(e.ptr),
        len: x(e.len),
        digest: vt(e.digest),
        pc: x(e.pc),
        data: vt(e.data),
        is: x(e.is)
      };
    }
    case "TRANSFER": {
      const r = vt(e.id || e.contractId);
      return {
        type: ut.Transfer,
        id: r,
        to: vt(e.toAddress || (e == null ? void 0 : e.to)),
        amount: x(e.amount),
        assetId: vt(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "TRANSFER_OUT": {
      const r = vt(e.id || e.contractId);
      return {
        type: ut.TransferOut,
        id: r,
        to: vt(e.toAddress || e.to),
        amount: x(e.amount),
        assetId: vt(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "SCRIPT_RESULT":
      return {
        type: ut.ScriptResult,
        result: x(e.result),
        gasUsed: x(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const r = vt(e.sender), n = vt(e.recipient), s = vt(e.nonce), i = x(e.amount), a = e.data ? Y(e.data) : Uint8Array.from([]), o = vt(e.digest), u = x(e.len).toNumber(), A = Qr.getMessageId({
        sender: r,
        recipient: n,
        nonce: s,
        amount: i,
        data: Z(a)
      });
      return {
        type: ut.MessageOut,
        sender: r,
        recipient: n,
        amount: i,
        nonce: s,
        len: u,
        data: a,
        digest: o,
        messageId: A
      };
    }
    case "MINT": {
      const r = vt(e.id || e.contractId), n = vt(e.subId), s = Ma(r, n);
      return {
        type: ut.Mint,
        subId: n,
        contractId: r,
        assetId: s,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "BURN": {
      const r = vt(e.id || e.contractId), n = vt(e.subId), s = Ma(r, n);
      return {
        type: ut.Burn,
        subId: n,
        contractId: r,
        assetId: s,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    default:
      throw new C(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var Cv = "https://app.fuel.network", Bv = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, SB = (e = {}) => {
  const { blockExplorerUrl: t, path: r, providerUrl: n, address: s, txId: i, blockNumber: a } = e, o = t || Cv, u = [
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
  ], A = u.filter((U) => !!U.value).map(({ key: U, value: P }) => ({
    key: U,
    value: P
  })), p = A.length > 0;
  if (A.length > 1)
    throw new C(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${u.map((U) => U.key).join(", ")}.`
    );
  if (r && A.length > 0) {
    const U = u.map(({ key: P }) => P).join(", ");
    throw new C(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${U}.`
    );
  }
  const m = p ? Bv(
    A[0].key,
    A[0].value
  ) : "", b = /^\/|\/$/gm, S = r ? r.replace(b, "") : m, F = o.replace(b, ""), R = n == null ? void 0 : n.replace(b, ""), N = R ? encodeURIComponent(R) : void 0, O = F.match(/^https?:\/\//) ? "" : "https://", z = R != null && R.match(/^https?:\/\//) ? "" : "https://";
  return `${O}${F}/${S}${N ? `?providerUrl=${z}${N}` : ""}`;
}, yi = (e) => e.filter(
  (n) => n.type === ut.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), x(0));
function Re(e, t) {
  const r = x(t.base);
  let n = x(0);
  return "unitsPerGas" in t ? n = x(e).div(x(t.unitsPerGas)) : n = x(e).mul(x(t.gasPerUnit)), r.add(n);
}
function xv(e, t, r) {
  const n = [], s = e.filter((o) => {
    if ("owner" in o || "sender" in o) {
      if ("predicate" in o && o.predicate && o.predicate !== "0x")
        return !0;
      if (!n.includes(o.witnessIndex))
        return n.push(o.witnessIndex), !0;
    }
    return !1;
  }), i = Re(t, r.vmInitialization);
  return s.reduce((o, u) => "predicate" in u && u.predicate && u.predicate !== "0x" ? o.add(
    i.add(Re(Y(u.predicate).length, r.contractRoot)).add(x(u.predicateGasUsed))
  ) : o.add(r.ecr1), x(0));
}
function Gl(e) {
  const { gasCosts: t, gasPerByte: r, inputs: n, metadataGas: s, txBytesSize: i } = e, a = Re(i, t.vmInitialization), o = x(i).mul(r), u = xv(n, i, t);
  return a.add(o).add(u).add(s).maxU64();
}
function Vo(e) {
  const {
    gasPerByte: t,
    witnessesLength: r,
    witnessLimit: n,
    minGas: s,
    gasLimit: i = x(0),
    maxGasPerTx: a
  } = e;
  let o = x(0);
  n != null && n.gt(0) && n.gte(r) && (o = x(n).sub(r).mul(t));
  const u = o.add(s).add(i);
  return u.gte(a) ? a : u;
}
function Vl({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: r,
  contractBytesSize: n
}) {
  const s = Re(n, e.contractRoot), i = Re(t, e.stateRoot), a = Re(r, e.s256), o = x(100), u = Re(o, e.s256);
  return s.add(i).add(a).add(u).maxU64();
}
function Yl({
  gasCosts: e,
  txBytesSize: t
}) {
  return Re(t, e.s256);
}
function Rv({
  gasCosts: e,
  txBytesSize: t,
  witnessBytesSize: r
}) {
  const n = Re(t, e.s256), s = Re(r, e.s256);
  return n.add(s);
}
function h_({
  gasCosts: e,
  txBytesSize: t,
  consensusSize: r
}) {
  const n = Re(t, e.s256);
  if (r) {
    const s = Re(r, e.s256);
    n.add(s);
  }
  return n;
}
function Sv({
  gasCosts: e,
  txBytesSize: t,
  subsectionSize: r,
  subsectionsSize: n
}) {
  const s = Re(t, e.s256), i = Re(r, e.s256);
  s.add(i);
  const a = Re(n, e.stateRoot);
  return s.add(a), s;
}
function Tv({
  gasCosts: e,
  baseMinGas: t,
  subsectionSize: r
}) {
  const n = x(e.newStoragePerByte).mul(r);
  return x(t).add(n);
}
var vn = (e) => {
  const { gas: t, gasPrice: r, priceFactor: n, tip: s } = e;
  return t.mul(r).div(n).add(x(s));
};
function ja(e) {
  return Object.keys(e).forEach((t) => {
    var r;
    switch ((r = e[t]) == null ? void 0 : r.constructor.name) {
      case "Uint8Array":
        e[t] = Z(e[t]);
        break;
      case "Array":
        e[t] = ja(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = ja(e[t]);
        break;
    }
  }), e;
}
function Nv(e) {
  return ja(Be(e));
}
var Dv = (e, t) => {
  let r = `The transaction reverted with reason: "${e}".`;
  return p0.includes(e) && (r = `${r}

You can read more about this error at:

${g0}#variant.${e}`), new C(D.SCRIPT_REVERTED, r, {
    ...t,
    reason: e
  });
}, On = (e) => JSON.stringify(e, null, 2), Qv = (e, t, r) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: a }) => a === ut.Revert);
  let i = "";
  if (s) {
    const a = x(s.val).toHex(), o = t[t.length - 1], u = t[t.length - 2];
    switch (a) {
      case h0: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? On(o) : "an error."}.`;
        break;
      }
      case l0: {
        const A = t.length >= 2 ? ` comparing ${On(o)} and ${On(u)}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${A}`;
        break;
      }
      case f0: {
        const A = t.length >= 2 ? ` comparing ${On(u)} and ${On(o)}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${A}`;
        break;
      }
      case A0:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case nl:
        i = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        throw new C(
          D.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...r,
            reason: "unknown"
          }
        );
    }
  }
  return new C(D.SCRIPT_REVERTED, n, {
    ...r,
    reason: i
  });
}, Yo = (e) => {
  const { receipts: t, statusReason: r, logs: n } = e, s = t.some(({ type: o }) => o === ut.Panic), i = t.some(({ type: o }) => o === ut.Revert), a = {
    logs: n,
    receipts: t,
    panic: s,
    revert: i,
    reason: ""
  };
  return s ? Dv(r, a) : Qv(t, n, a);
}, TB = class extends Error {
  constructor() {
    super(...arguments);
    Q(this, "name", "ChangeOutputCollisionError");
    Q(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, Fv = class extends Error {
  constructor(t) {
    super();
    Q(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, NB = class extends Error {
  constructor(t) {
    super();
    Q(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, Pr = (e) => e.type === It.Coin, bi = (e) => e.type === It.Message, Hl = (e) => e.type === It.Message && x(e.data).isZero(), Xl = (e) => Pr(e) || bi(e), tn = (e) => Pr(e) || Hl(e), Zl = (e) => Pr(e) ? e.owner : e.recipient, Ja = (e, t) => Zl(e) === t.toB256(), Ov = (e, t, r) => e.filter(tn).reduce((n, s) => Pr(s) && s.assetId === t || bi(s) && t === r ? n.add(s.amount) : n, x(0)), DB = (e) => e.filter(tn).reduce(
  (t, r) => (Pr(r) ? t.utxos.push(r.id) : t.messages.push(r.nonce), t),
  {
    utxos: [],
    messages: []
  }
), Mv = (e, t) => e.reduce(
  (r, n) => (Pr(n) && n.owner === t.toB256() ? r.utxos.push(n.id) : bi(n) && n.recipient === t.toB256() && r.messages.push(n.nonce), r),
  {
    utxos: [],
    messages: []
  }
), Lv = (e, t) => {
  const { inputs: r, outputs: n } = t, s = new Set(r.filter(Pr).map((o) => o.assetId));
  r.some((o) => bi(o) && x(o.amount).gt(0)) && s.add(e);
  const i = new Set(
    n.filter((o) => o.type === mt.Change).map((o) => o.assetId)
  );
  return new Set([...s].filter((o) => !i.has(o))).size;
}, Wl = (e, t, r = !1) => {
  if (r === !0 || Lv(e, t) <= 0)
    return;
  const n = [
    "Asset burn detected.",
    "Add the relevant change outputs to the transaction to avoid burning assets.",
    "Or enable asset burn, upon sending the transaction."
  ].join(`
`);
  throw new C(D.ASSET_BURN_DETECTED, n);
}, Pv = (e) => {
  const t = Y(e);
  return {
    data: Z(t),
    dataLength: t.length
  };
}, Sn = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    tip: e,
    maturity: t,
    maxFee: r,
    witnessLimit: n,
    inputs: s,
    outputs: i,
    witnesses: a
  } = {}) {
    /** Gas price for transaction */
    Q(this, "tip");
    /** Block until which tx cannot be included */
    Q(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    Q(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    Q(this, "witnessLimit");
    /** List of inputs */
    Q(this, "inputs", []);
    /** List of outputs */
    Q(this, "outputs", []);
    /** List of witnesses */
    Q(this, "witnesses", []);
    this.tip = e ? x(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = fr(n) ? x(n) : void 0, this.maxFee = x(r), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = a ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const r = [], { tip: n, witnessLimit: s, maturity: i } = e;
    return x(n).gt(0) && (t += Xe.Tip, r.push({ data: x(n), type: Xe.Tip })), fr(s) && x(s).gte(0) && (t += Xe.WitnessLimit, r.push({ data: x(s), type: Xe.WitnessLimit })), i && i > 0 && (t += Xe.Maturity, r.push({ data: i, type: Xe.Maturity })), t += Xe.MaxFee, r.push({ data: e.maxFee, type: Xe.MaxFee }), {
      policyTypes: t,
      policies: r
    };
  }
  /**
   * Method to obtain the base transaction details.
   *
   * @returns The base transaction details.
   */
  getBaseTransaction() {
    var i, a, o;
    const e = ((i = this.inputs) == null ? void 0 : i.map(mv)) ?? [], t = ((a = this.outputs) == null ? void 0 : a.map(yv)) ?? [], r = ((o = this.witnesses) == null ? void 0 : o.map(Pv)) ?? [], { policyTypes: n, policies: s } = Sn.getPolicyMeta(this);
    return {
      policyTypes: n,
      inputs: e,
      outputs: t,
      policies: s,
      witnesses: r,
      inputsCount: e.length,
      outputsCount: t.length,
      witnessesCount: r.length
    };
  }
  /**
   * Converts the transaction request to a byte array.
   *
   * @returns The transaction bytes.
   */
  toTransactionBytes() {
    return new Ar().encode(this.toTransaction());
  }
  /**
   * @hidden
   *
   * Pushes an input to the list without any side effects and returns the index
   */
  pushInput(e) {
    return this.inputs.push(e), this.inputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes an output to the list without any side effects and returns the index
   */
  pushOutput(e) {
    return this.outputs.push(e), this.outputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes a witness to the list and returns the index
   *
   * @param signature - The signature to add to the witness.
   * @returns The index of the created witness.
   */
  addWitness(e) {
    return this.witnesses.push(e), this.witnesses.length - 1;
  }
  /**
   * @hidden
   *
   * Creates an empty witness without any side effects and returns the index
   *
   * @returns The index of the created witness.
   */
  addEmptyWitness() {
    return this.addWitness(at([St, St])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const r = ct.fromAddressOrString(e), n = this.getCoinInputWitnessIndexByOwner(r);
    typeof n == "number" && this.updateWitness(n, t);
  }
  /**
   * Updates an existing witness without any side effects.
   *
   * @param index - The index of the witness to update.
   * @param witness - The new witness.
   * @throws If the witness does not exist.
   */
  updateWitness(e, t) {
    if (!this.witnesses[e])
      throw new Fv(e);
    this.witnesses[e] = t;
  }
  /**
   * Helper function to add an external signature to the transaction.
   *
   * @param account - The account/s to sign to the transaction.
   * @returns The transaction with the signature witness added.
   */
  async addAccountWitnesses(e) {
    const t = Array.isArray(e) ? e : [e];
    return await Promise.all(
      t.map(async (r) => {
        this.addWitness(await r.signTransaction(this));
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
      (e) => e.type === It.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === mt.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === mt.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = Pn(e), r = this.inputs.find((n) => {
      switch (n.type) {
        case It.Coin:
          return Z(n.owner) === t.toB256();
        case It.Message:
          return Z(n.recipient) === t.toB256();
        default:
          return !1;
      }
    });
    return r == null ? void 0 : r.witnessIndex;
  }
  /**
   * Adds a single coin input to the transaction and a change output for the related
   * assetId, if one it was not added yet.
   *
   * @param coin - Coin resource.
   */
  addCoinInput(e) {
    const { assetId: t, owner: r, amount: n, id: s, predicate: i, predicateData: a } = e;
    let o;
    e.predicate ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(r), typeof o != "number" && (o = this.addEmptyWitness()));
    const u = {
      id: s,
      type: It.Coin,
      owner: r.toB256(),
      amount: n,
      assetId: t,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: o,
      predicate: i,
      predicateData: a
    };
    this.pushInput(u), this.addChangeOutput(r, t);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(e) {
    const { recipient: t, sender: r, amount: n, predicate: s, nonce: i, predicateData: a } = e;
    let o;
    e.predicate ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(t), typeof o != "number" && (o = this.addEmptyWitness()));
    const u = {
      nonce: i,
      type: It.Message,
      sender: r.toB256(),
      recipient: t.toB256(),
      data: u_(e) ? "0x" : e.data,
      amount: n,
      witnessIndex: o,
      predicate: s,
      predicateData: a
    };
    this.pushInput(u), u_(e) && this.addChangeOutput(t, e.assetId);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return bv(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
  }
  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addResources(e) {
    return e.forEach((t) => this.addResource(t)), this;
  }
  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(e, t, r) {
    return this.pushOutput({
      type: mt.Coin,
      to: Pn(e).toB256(),
      amount: t,
      assetId: r
    }), this;
  }
  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
  addCoinOutputs(e, t) {
    return t.map(Po).forEach((r) => {
      this.pushOutput({
        type: mt.Coin,
        to: Pn(e).toB256(),
        amount: r.amount,
        assetId: r.assetId
      });
    }), this;
  }
  /**
   * Adds a change output to the transaction.
   *
   * @param to - Address of the owner.
   * @param assetId - Asset ID of coin.
   */
  addChangeOutput(e, t) {
    this.getChangeOutputs().find(
      (n) => Z(n.assetId) === t
    ) || this.pushOutput({
      type: mt.Change,
      to: Pn(e).toB256(),
      assetId: t
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
  metadataGas(e) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(e) {
    const { consensusParameters: t } = e, {
      gasCosts: r,
      feeParameters: { gasPerByte: n }
    } = t;
    return Gl({
      gasPerByte: n,
      gasCosts: r,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(r)
    });
  }
  calculateMaxGas(e, t) {
    const { consensusParameters: r } = e, {
      feeParameters: { gasPerByte: n },
      txParameters: { maxGasPerTx: s }
    } = r, i = this.toTransaction().witnesses.reduce(
      (a, o) => a + o.dataLength,
      0
    );
    return Vo({
      gasPerByte: n,
      minGas: t,
      witnessesLength: i,
      witnessLimit: this.witnessLimit,
      maxGasPerTx: s
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
  fundWithFakeUtxos(e, t, r) {
    const n = (i) => this.inputs.find((a) => "assetId" in a ? a.assetId === i : !1), s = (i, a) => {
      const o = n(i);
      let u = a;
      i === t && (u = x("1000000000000000000")), o && "assetId" in o ? (o.id = Z(Ue(Ps)), o.amount = u) : this.addResources([
        {
          id: Z(Ue(Ps)),
          amount: u,
          assetId: i,
          owner: r || ct.fromRandom(),
          blockCreated: x(1),
          txCreatedIdx: x(1)
        }
      ]);
    };
    return s(t, x(1e11)), e.forEach((i) => s(i.assetId, i.amount)), this;
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: r }) => ({
      amount: x(t),
      assetId: r.toString()
    }));
  }
  /**
   * Return the minimum amount in native coins required to create
   * a transaction.
   *
   * @returns The transaction as a JSON object.
   */
  toJSON() {
    return Nv(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(tn).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(Xl);
    this.inputs.filter(tn).forEach((r) => {
      const n = Zl(r), s = t.find(
        (i) => Ja(i, ct.fromString(String(n)))
      );
      s && "predicateGasUsed" in s && x(s.predicateGasUsed).gt(0) && (r.predicateGasUsed = s.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
};
function _s(e, t) {
  const r = e.toTransaction();
  r.type === Et.Script && (r.receiptsRoot = St), r.inputs = r.inputs.map((i) => {
    const a = Be(i);
    switch (a.type) {
      case It.Coin:
        return a.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, a.predicateGasUsed = x(0), a;
      case It.Message:
        return a.predicateGasUsed = x(0), a;
      case It.Contract:
        return a.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, a.txID = St, a.outputIndex = 0, a.balanceRoot = St, a.stateRoot = St, a;
      default:
        return a;
    }
  }), r.outputs = r.outputs.map((i) => {
    const a = Be(i);
    switch (a.type) {
      case mt.Contract:
        return a.balanceRoot = St, a.stateRoot = St, a;
      case mt.Change:
        return a.amount = x(0), a;
      case mt.Variable:
        return a.to = St, a.amount = x(0), a.assetId = St, a;
      default:
        return a;
    }
  }), r.witnessesCount = 0, r.witnesses = [];
  const n = eg(t), s = at([n, new Ar().encode(r)]);
  return Ce(s);
}
var si = class extends Sn {
  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, blobId: r, ...n }) {
    super(n);
    /** Type of the transaction */
    Q(this, "type", Et.Blob);
    /** Blob ID */
    Q(this, "blobId");
    /** Witness index of the bytecode to create */
    Q(this, "witnessIndex");
    this.blobId = r, this.witnessIndex = t ?? 0;
  }
  static from(t) {
    return new this(Be(t));
  }
  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { witnessIndex: r, blobId: n } = this;
    return {
      type: Et.Blob,
      ...t,
      blobId: n,
      witnessIndex: r
    };
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return _s(this, t);
  }
  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  metadataGas(t) {
    return Rv({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length
    });
  }
}, kv = (e) => {
  const t = new Uint8Array(32);
  return t.set(Y(e)), t;
}, Uv = (e) => {
  let t, r;
  return Array.isArray(e) ? (t = e[0], r = e[1]) : (t = e.key, r = e.value), {
    key: Z(t),
    value: Z(kv(r))
  };
}, qa = class extends Sn {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: r, storageSlots: n, ...s }) {
    super(s);
    /** Type of the transaction */
    Q(this, "type", Et.Create);
    /** Witness index of contract bytecode to create */
    Q(this, "bytecodeWitnessIndex");
    /** Salt */
    Q(this, "salt");
    /** List of storage slots to initialize */
    Q(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = Z(r ?? St), this.storageSlots = [...n ?? []];
  }
  static from(t) {
    return new this(Be(t));
  }
  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    var s;
    const t = this.getBaseTransaction(), r = this.bytecodeWitnessIndex, n = ((s = this.storageSlots) == null ? void 0 : s.map(Uv)) ?? [];
    return {
      type: Et.Create,
      ...t,
      bytecodeWitnessIndex: r,
      storageSlotsCount: x(n.length),
      salt: this.salt ? Z(this.salt) : St,
      storageSlots: n
    };
  }
  /**
   * Get contract created outputs for the transaction.
   *
   * @returns An array of contract created transaction request outputs.
   */
  getContractCreatedOutputs() {
    return this.outputs.filter(
      (t) => t.type === mt.ContractCreated
    );
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return _s(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, r) {
    this.pushOutput({
      type: mt.ContractCreated,
      contractId: t,
      stateRoot: r
    });
  }
  metadataGas(t) {
    return Vl({
      contractBytesSize: x(Y(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, l_ = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Y("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, zv = {
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
  bytes: Y("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Zr = class extends Sn {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: r, gasLimit: n, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    Q(this, "type", Et.Script);
    /** Gas limit for transaction */
    Q(this, "gasLimit");
    /** Script to execute */
    Q(this, "script");
    /** Script input data (parameters) */
    Q(this, "scriptData");
    Q(this, "abis");
    this.gasLimit = x(n), this.script = Y(t ?? l_.bytes), this.scriptData = Y(r ?? l_.encodeScriptData()), this.abis = s.abis;
  }
  static from(t) {
    return new this(Be(t));
  }
  /**
   * Helper function to estimate and fund the transaction request with a specified account.
   *
   * @param account - The account to fund the transaction.
   * @param params - The parameters for the transaction cost.
   * @returns The current instance of the `ScriptTransactionRequest` funded.
   */
  async estimateAndFund(t, { signatureCallback: r, quantities: n = [] } = {}) {
    const s = await t.getTransactionCost(this, { signatureCallback: r, quantities: n });
    return this.maxFee = s.maxFee, this.gasLimit = s.gasUsed, await t.fund(this, s), this;
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const t = Y(this.script ?? "0x"), r = Y(this.scriptData ?? "0x");
    return {
      type: Et.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: x(t.length),
      scriptDataLength: x(r.length),
      receiptsRoot: St,
      script: Z(t),
      scriptData: Z(r)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === It.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === mt.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === mt.Variable
    );
  }
  /**
   * Set the script and its data.
   *
   * @param script - The abstract script request.
   * @param data - The script data.
   */
  setScript(t, r) {
    this.scriptData = t.encodeScriptData(r), this.script = t.bytes;
  }
  /**
   * Adds variable outputs to the transaction request.
   *
   * @param numberOfVariables - The number of variables to add.
   * @returns The new length of the outputs array.
   */
  addVariableOutputs(t = 1) {
    let r = t;
    for (; r; )
      this.pushOutput({
        type: mt.Variable
      }), r -= 1;
    return this.outputs.length - 1;
  }
  /**
   * Calculates the maximum gas for the transaction.
   *
   * @param chainInfo - The chain information.
   * @param minGas - The minimum gas.
   * @returns the maximum gas.
   */
  calculateMaxGas(t, r) {
    const { consensusParameters: n } = t, {
      feeParameters: { gasPerByte: s },
      txParameters: { maxGasPerTx: i }
    } = n, a = this.toTransaction().witnesses.reduce(
      (o, u) => o + u.dataLength,
      0
    );
    return Vo({
      gasPerByte: s,
      minGas: r,
      witnessesLength: a,
      witnessLimit: this.witnessLimit,
      gasLimit: this.gasLimit,
      maxGasPerTx: i
    });
  }
  /**
   * Adds a contract input and output to the transaction request.
   *
   * @param contract - The contract ID.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  addContractInputAndOutput(t) {
    const r = Pn(t);
    if (this.getContractInputs().find((s) => s.contractId === r.toB256()))
      return this;
    const n = super.pushInput({
      type: It.Contract,
      contractId: r.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: mt.Contract,
      inputIndex: n
    }), this;
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return _s(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, r) {
    const n = new gr(t);
    return this.scriptData = n.functions.main.encodeArguments(r), this;
  }
  metadataGas(t) {
    return Yl({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, $a = class extends Sn {
  /**
   * Creates an instance `UpgradeTransactionRequest`.
   *
   * @param upgradeTransactionRequestLike - The initial values for the instance
   */
  constructor({
    upgradePurpose: t,
    bytecodeWitnessIndex: r,
    ...n
  } = {}) {
    super(n);
    /** The type of transaction */
    Q(this, "type", Et.Upgrade);
    /** The upgrade purpose */
    Q(this, "upgradePurpose");
    /** Witness index of consensus */
    Q(this, "bytecodeWitnessIndex");
    this.bytecodeWitnessIndex = r ?? 0, this.upgradePurpose = t ?? {
      type: ke.ConsensusParameters,
      checksum: "0x"
    };
  }
  static from(t) {
    return t instanceof $a ? t : new this(Be(t));
  }
  /**
   * Adds a consensus parameters upgrade purpose.
   *
   * @param consensus - The consensus bytecode.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addConsensusParametersUpgradePurpose(t) {
    return this.bytecodeWitnessIndex = this.addWitness(t), this.upgradePurpose = {
      type: ke.ConsensusParameters,
      checksum: ze(t)
    }, this;
  }
  /**
   * Adds a state transition upgrade purpose.
   *
   * @param bytecodeRoot - The Merkle root of the state transition.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addStateTransitionUpgradePurpose(t) {
    return this.upgradePurpose = {
      type: ke.StateTransition,
      data: Z(t)
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
  addUpgradePurpose(t, r) {
    return t === ke.ConsensusParameters && this.addConsensusParametersUpgradePurpose(r), t === ke.StateTransition && this.addStateTransitionUpgradePurpose(r), this;
  }
  /**
   * Converts the transaction request to a `TransactionUpgrade`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    let t;
    if (this.upgradePurpose.type === ke.ConsensusParameters)
      t = {
        type: ke.ConsensusParameters,
        data: {
          witnessIndex: this.bytecodeWitnessIndex,
          checksum: this.upgradePurpose.checksum
        }
      };
    else if (this.upgradePurpose.type === ke.StateTransition)
      t = {
        type: ke.StateTransition,
        data: {
          bytecodeRoot: Z(this.upgradePurpose.data)
        }
      };
    else
      throw new C(C.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
    return {
      type: Et.Upgrade,
      ...super.getBaseTransaction(),
      upgradePurpose: t
    };
  }
  /**
   * Gets the Transaction ID by hashing the transaction
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return _s(this, t);
  }
  /**
   * Calculates the metadata gas cost for an upgrade transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upgrade transaction.
   */
  metadataGas(t) {
    const r = this.byteSize();
    if (this.upgradePurpose.type === ke.ConsensusParameters) {
      const n = this.bytecodeWitnessIndex, s = this.witnesses[n].length;
      return h_({
        gasCosts: t,
        txBytesSize: r,
        consensusSize: s
      });
    }
    if (this.upgradePurpose.type === ke.StateTransition)
      return h_({
        gasCosts: t,
        txBytesSize: r
      });
    throw new C(C.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
  }
}, Ka = class extends Sn {
  /**
   * Creates an instance `UploadTransactionRequest`.
   *
   * @param uploadTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, subsection: r, ...n } = {}) {
    super(n);
    /** Type of the transaction */
    Q(this, "type", Et.Upload);
    /** The witness index of the subsection of the bytecode. */
    Q(this, "witnessIndex");
    /** The subsection data. */
    Q(this, "subsection");
    this.witnessIndex = t ?? 0, this.subsection = r ?? {
      proofSet: [],
      root: St,
      subsectionIndex: 0,
      subsectionsNumber: 0
    };
  }
  static from(t) {
    return t instanceof Ka ? t : new this(Be(t));
  }
  /**
   * Adds the subsection.
   *
   * @param subsection - The subsection data.
   */
  addSubsection(t) {
    const { subsection: r, ...n } = t;
    this.subsection = n, this.witnessIndex = this.addWitness(r);
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(t) {
    return _s(this, t);
  }
  /**
   * Converts the transaction request to a `TransactionUpload`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { subsectionIndex: r, subsectionsNumber: n, root: s, proofSet: i } = this.subsection;
    return {
      type: Et.Upload,
      ...t,
      subsectionIndex: r,
      subsectionsNumber: n,
      root: Z(s),
      proofSet: i.map(Z),
      witnessIndex: this.witnessIndex,
      proofSetCount: i.length
    };
  }
  /**
   * Calculates the metadata gas cost for an upload transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upload transaction.
   */
  metadataGas(t) {
    return Sv({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      subsectionSize: Y(this.witnesses[this.witnessIndex]).length,
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
  calculateMinGas(t) {
    const r = super.calculateMinGas(t), { gasCosts: n } = t.consensusParameters, s = this.witnesses[this.witnessIndex] ?? St;
    return Tv({
      gasCosts: n,
      baseMinGas: r.toNumber(),
      subsectionSize: Y(s).length
    });
  }
}, QB = class {
}, Se = (e) => {
  if (e instanceof Zr || e instanceof qa || e instanceof si || e instanceof $a || e instanceof Ka)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Et.Script:
      return Zr.from(e);
    case Et.Create:
      return qa.from(e);
    case Et.Blob:
      return si.from(e);
    case Et.Upgrade:
      return $a.from(e);
    case Et.Upload:
      return Ka.from(e);
    default:
      throw new C(
        D.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, Ur = (e) => e.type === Et.Script, Gv = (e) => e.type === Et.Create, FB = (e) => e.type === Et.Blob, OB = (e) => e.type === Et.Upgrade, MB = (e) => e.type === Et.Upload, Vv = (e) => {
  var H;
  const {
    gasPrice: t,
    rawPayload: r,
    tip: n,
    consensusParameters: { gasCosts: s, feeParams: i, maxGasPerTx: a }
  } = e, o = x(i.gasPerByte), u = x(i.gasPriceFactor), A = Y(r), [p] = new Ar().decode(A, 0), { type: m, witnesses: b, inputs: S, policies: F } = p;
  let R = x(0), N = x(0);
  if (m !== Et.Create && m !== Et.Script)
    return x(0);
  if (m === Et.Create) {
    const { bytecodeWitnessIndex: X, storageSlots: V } = p, k = x(Y(b[X].data).length);
    R = Vl({
      contractBytesSize: k,
      gasCosts: s,
      stateRootSize: V.length || 0,
      txBytesSize: A.length
    });
  } else {
    const { scriptGasLimit: X } = p;
    X && (N = X), R = Yl({
      gasCosts: s,
      txBytesSize: A.length
    });
  }
  const O = Gl({
    gasCosts: s,
    gasPerByte: x(o),
    inputs: S,
    metadataGas: R,
    txBytesSize: A.length
  }), z = (H = F.find((X) => X.type === Xe.WitnessLimit)) == null ? void 0 : H.data, M = b.reduce((X, V) => X + V.dataLength, 0), U = Vo({
    gasPerByte: o,
    minGas: O,
    witnessesLength: M,
    gasLimit: N,
    witnessLimit: z,
    maxGasPerTx: a
  });
  return vn({
    gasPrice: t,
    gas: U,
    priceFactor: u,
    tip: n
  });
}, Yv = ({ abi: e, receipt: t }) => {
  var p;
  const r = new gr(e), n = t.param1.toHex(8), s = r.getFunction(n), i = s.jsonFn.inputs, a = t.param2.toHex();
  let o;
  const u = s.decodeArguments(a);
  return u && (o = i.reduce((m, b, S) => {
    const F = u[S], R = b.name;
    return R ? {
      ...m,
      // reparse to remove bn
      [R]: JSON.parse(JSON.stringify(F))
    } : m;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: o,
    ...(p = t.amount) != null && p.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function Hv(e, t) {
  return e.filter((r) => t.includes(r.type));
}
function Ho(e, t) {
  return e.filter((r) => r.type === t);
}
function Xv(e) {
  return Ho(e, It.Coin);
}
function Zv(e) {
  return Ho(e, It.Message);
}
function jl(e) {
  return Hv(e, [It.Coin, It.Message]);
}
function A_(e) {
  return e.type === It.Coin;
}
function Wv(e) {
  return Ho(e, It.Contract);
}
function jv(e, t) {
  return Xv(e).find((n) => n.assetId === t);
}
function Jv(e, t) {
  const r = /* @__PURE__ */ new Map();
  return jl(e).forEach((n) => {
    const s = A_(n) ? n.assetId : t, i = A_(n) ? n.owner : n.recipient;
    let a = r.get(s);
    a || (a = /* @__PURE__ */ new Map(), r.set(s, a));
    let o = a.get(i);
    o || (o = new Ot(0), a.set(i, o)), a.set(i, o.add(n.amount));
  }), r;
}
function qv(e) {
  var t;
  return (t = Zv(e)) == null ? void 0 : t[0];
}
function Jl(e, t, r = !1) {
  const n = jv(e, t);
  if (n)
    return n;
  if (r)
    return qv(e);
}
function $v(e, t) {
  if (t == null)
    return;
  const r = e == null ? void 0 : e[t];
  if (r) {
    if (r.type !== It.Contract)
      throw new C(
        D.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return r;
  }
}
function Xo(e) {
  return e.type === It.Coin ? e.owner.toString() : e.type === It.Message ? e.recipient.toString() : "";
}
function hs(e, t) {
  return e.filter((r) => r.type === t);
}
function Kv(e) {
  return hs(e, mt.ContractCreated);
}
function ql(e) {
  return hs(e, mt.Coin);
}
function t1(e) {
  return hs(e, mt.Change);
}
function e1(e) {
  return hs(e, mt.Contract);
}
function LB(e) {
  return hs(e, mt.Variable);
}
var r1 = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e.Blob = "Blob", e))(r1 || {}), $l = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))($l || {}), n1 = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(n1 || {}), s1 = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(s1 || {}), i1 = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(i1 || {});
function qn(e, t) {
  return (e ?? []).filter((r) => r.type === t);
}
function Kl(e) {
  switch (e) {
    case Et.Mint:
      return "Mint";
    case Et.Create:
      return "Create";
    case Et.Script:
      return "Script";
    case Et.Blob:
      return "Blob";
    case Et.Upgrade:
      return "Upgrade";
    case Et.Upload:
      return "Upload";
    default:
      throw new C(
        D.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${e}.`
      );
  }
}
function Tn(e, t) {
  return Kl(e) === t;
}
function a1(e) {
  return Tn(
    e,
    "Mint"
    /* Mint */
  );
}
function tA(e) {
  return Tn(
    e,
    "Create"
    /* Create */
  );
}
function eA(e) {
  return Tn(
    e,
    "Script"
    /* Script */
  );
}
function o1(e) {
  return Tn(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function c1(e) {
  return Tn(
    e,
    "Upload"
    /* Upload */
  );
}
function d1(e) {
  return Tn(
    e,
    "Blob"
    /* Blob */
  );
}
function PB(e) {
  return (t) => e.assetId === t.assetId;
}
function u1(e) {
  return qn(e, ut.Call);
}
function _1(e) {
  return qn(e, ut.MessageOut);
}
function h1(e, t) {
  const r = e.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return r.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const a = s.get(i.assetId);
    a ? a.amount = x(a.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
function l1(e, t) {
  var r, n, s, i, a, o, u, A;
  return e.name === t.name && ((r = e.from) == null ? void 0 : r.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((a = e.from) == null ? void 0 : a.type) === ((o = t.from) == null ? void 0 : o.type) && ((u = e.to) == null ? void 0 : u.type) === ((A = t.to) == null ? void 0 : A.type);
}
function A1(e, t) {
  var r, n;
  return (r = t.assetsSent) != null && r.length ? (n = e.assetsSent) != null && n.length ? h1(e, t) : t.assetsSent : e.assetsSent;
}
function f1(e, t) {
  var r;
  return (r = t.calls) != null && r.length ? [...e.calls || [], ...t.calls] : e.calls;
}
function p1(e, t) {
  return {
    ...e,
    assetsSent: A1(e, t),
    calls: f1(e, t)
  };
}
function $n(e, t) {
  const r = e.findIndex((n) => l1(n, t));
  return r === -1 ? [...e, t] : e.map((n, s) => s === r ? p1(n, t) : n);
}
function kB(e) {
  return qn(e, ut.TransferOut);
}
function g1({
  inputs: e,
  receipts: t,
  baseAssetId: r
}) {
  return _1(t).reduce(
    (i, a) => {
      const o = Jl(e, r, !0);
      if (o) {
        const u = Xo(o);
        return $n(i, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: u
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
              assetId: r
            }
          ]
        });
      }
      return i;
    },
    []
  );
}
function w1(e, t, r, n, s) {
  const i = t == null ? void 0 : t[e.contractID];
  return i ? [
    Yv({
      abi: i,
      receipt: r,
      rawPayload: n,
      maxInputs: s
    })
  ] : [];
}
function m1(e) {
  var t;
  return (t = e.amount) != null && t.isZero() ? void 0 : [
    {
      amount: e.amount,
      assetId: e.assetId
    }
  ];
}
function y1(e, t, r, n, s, i, a) {
  const o = e.assetId === St ? a : e.assetId, u = Jl(r, o, o === a);
  if (!u)
    return [];
  const A = Xo(u), p = w1(t, n, e, s, i);
  return [
    {
      name: "Contract call",
      from: {
        type: 1,
        address: A
      },
      to: {
        type: 0,
        address: e.to
      },
      assetsSent: m1(e),
      calls: p
    }
  ];
}
function b1({
  inputs: e,
  outputs: t,
  receipts: r,
  abiMap: n,
  rawPayload: s,
  maxInputs: i,
  baseAssetId: a
}) {
  const o = u1(r);
  return e1(t).flatMap((A) => {
    const p = $v(e, A.inputIndex);
    return p ? o.filter((m) => m.to === p.contractID).flatMap(
      (m) => y1(
        m,
        p,
        e,
        n,
        s,
        i,
        a
      )
    ) : [];
  });
}
function I1(e, t, r) {
  const { to: n, assetId: s, amount: i } = e;
  let { id: a } = e;
  const o = t.some((A) => A.contractID === n) ? 0 : 1;
  if (St === a) {
    const A = r.find((p) => p.assetId === s);
    a = (A == null ? void 0 : A.to) || a;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((A) => A.contractID === a) ? 0 : 1,
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
    ]
  };
}
function E1({
  inputs: e,
  outputs: t,
  receipts: r,
  baseAssetId: n
}) {
  let s = [];
  const i = ql(t), a = Wv(e), o = t1(t), u = Jv(e, n);
  i.forEach(({ amount: m, assetId: b, to: S }) => {
    const F = u.get(b) || /* @__PURE__ */ new Map();
    let R, N;
    for (const [O, z] of F)
      if (N || (N = O), z.gte(m)) {
        R = O;
        break;
      }
    R = R || N, R && (s = $n(s, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: R
      },
      to: {
        type: 1,
        address: S
      },
      assetsSent: [{ assetId: b, amount: m }]
    }));
  });
  const A = qn(
    r,
    ut.Transfer
  ), p = qn(
    r,
    ut.TransferOut
  );
  return [...A, ...p].forEach((m) => {
    const b = I1(m, a, o);
    s = $n(s, b);
  }), s;
}
function v1(e) {
  return ql(e).reduce((n, s) => $n(n, {
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
function C1({ inputs: e, outputs: t }) {
  const r = Kv(t), n = jl(e)[0], s = Xo(n);
  return r.reduce((a, o) => $n(a, {
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
function B1({
  transactionType: e,
  inputs: t,
  outputs: r,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: a,
  baseAssetId: o
}) {
  return tA(e) ? [...C1({ inputs: t, outputs: r })] : eA(e) ? [
    ...E1({ inputs: t, outputs: r, receipts: n, baseAssetId: o }),
    ...b1({
      inputs: t,
      outputs: r,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: a,
      baseAssetId: o
    }),
    ...g1({ inputs: t, receipts: n, baseAssetId: o })
  ] : [...v1(r)];
}
var Tr = (e) => vv(e), x1 = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === ut.Mint && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, R1 = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === ut.Burn && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, S1 = (e) => {
  switch (e) {
    case "FailureStatus":
      return "failure";
    case "SuccessStatus":
      return "success";
    case "SubmittedStatus":
      return "submitted";
    case "SqueezedOutStatus":
      return "squeezedout";
    default:
      throw new C(
        D.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, T1 = (e) => {
  var p, m;
  let t, r, n, s, i, a = !1, o = !1, u = !1;
  if (e != null && e.type)
    switch (n = S1(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, r = (p = e.block) == null ? void 0 : p.id, o = !0, s = x(e.totalFee), i = x(e.totalGas);
        break;
      case "FailureStatus":
        t = e.time, r = (m = e.block) == null ? void 0 : m.id, a = !0, s = x(e.totalFee), i = x(e.totalGas);
        break;
      case "SubmittedStatus":
        t = e.time, u = !0;
        break;
    }
  return {
    time: t,
    blockId: r,
    status: n,
    totalFee: s,
    totalGas: i,
    isStatusFailure: a,
    isStatusSuccess: o,
    isStatusPending: u
  };
}, rA = (e) => e && "totalFee" in e ? x(e.totalFee) : void 0;
function Ii(e) {
  var _, f;
  const {
    id: t,
    receipts: r,
    gasPerByte: n,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: a,
    gqlTransactionStatus: o,
    abiMap: u = {},
    maxInputs: A,
    gasCosts: p,
    maxGasPerTx: m,
    gasPrice: b,
    baseAssetId: S
  } = e, F = yi(r), R = Z(a), N = B1({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: r,
    rawPayload: R,
    abiMap: u,
    maxInputs: A,
    baseAssetId: S
  }), O = Kl(i.type), z = x((f = (_ = i.policies) == null ? void 0 : _.find((g) => g.type === Xe.Tip)) == null ? void 0 : f.data), { isStatusFailure: M, isStatusPending: U, isStatusSuccess: P, blockId: H, status: X, time: V, totalFee: k } = T1(o), it = k ?? Vv({
    gasPrice: b,
    rawPayload: R,
    tip: z,
    consensusParameters: {
      gasCosts: p,
      maxGasPerTx: m,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), W = x1(r), j = R1(r);
  let v;
  return V && (v = ho.fromTai64(V)), {
    id: t,
    tip: z,
    fee: it,
    gasUsed: F,
    operations: N,
    type: O,
    blockId: H,
    time: V,
    status: X,
    receipts: r,
    mintedAssets: W,
    burnedAssets: j,
    isTypeMint: a1(i.type),
    isTypeCreate: tA(i.type),
    isTypeScript: eA(i.type),
    isTypeUpgrade: o1(i.type),
    isTypeUpload: c1(i.type),
    isTypeBlob: d1(i.type),
    isStatusFailure: M,
    isStatusSuccess: P,
    isStatusPending: U,
    date: v,
    transaction: i
  };
}
function Zo(e, t, r = {}) {
  return e.reduce((n, s) => {
    if (s.type === ut.LogData || s.type === ut.Log) {
      const i = new gr(r[s.id] || t), a = s.type === ut.Log ? new rt("u64").encode(s.ra) : s.data, [o] = i.decodeLog(a, s.rb.toString());
      n.push(o);
    }
    return n;
  }, []);
}
function N1(e) {
  return e.map((t) => {
    const r = "amount" in t ? { ...t, amount: x(t.amount) } : t;
    switch (r.type) {
      case "CoinOutput":
        return { ...r, type: mt.Coin };
      case "ContractOutput":
        return {
          ...r,
          type: mt.Contract,
          inputIndex: parseInt(r.inputIndex, 10)
        };
      case "ChangeOutput":
        return {
          ...r,
          type: mt.Change
        };
      case "VariableOutput":
        return { ...r, type: mt.Variable };
      case "ContractCreated":
        return {
          ...r,
          type: mt.ContractCreated,
          contractId: r.contract
        };
      default:
        return Lf();
    }
  });
}
var to = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(e, t, r, n, s) {
    /** Transaction ID */
    Q(this, "id");
    /** Current provider */
    Q(this, "provider");
    /** Gas used on the transaction */
    Q(this, "gasUsed", x(0));
    /** The graphql Transaction with receipts object. */
    Q(this, "gqlTransaction");
    Q(this, "request");
    Q(this, "status");
    Q(this, "abis");
    this.submitTxSubscription = s, this.id = typeof e == "string" ? e : e.getTransactionId(r), this.provider = t, this.abis = n, this.request = typeof e == "string" ? void 0 : e;
  }
  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(e, t, r) {
    const n = await t.getChainId(), s = new to(e, t, n, r);
    return await s.fetch(), s;
  }
  applyMalleableSubscriptionFields(e) {
    const t = this.status;
    if (!t)
      return;
    const r = e;
    (t.type === "SuccessStatus" || t.type === "FailureStatus") && (r.inputs = r.inputs.map((n, s) => {
      var i;
      if ("txPointer" in n) {
        const a = (i = t.transaction.inputs) == null ? void 0 : i[s];
        return {
          ...n,
          txPointer: qr.decodeFromGqlScalar(a.txPointer)
        };
      }
      return n;
    }), r.outputs = N1(t.transaction.outputs), "receiptsRoot" in t.transaction && (r.receiptsRoot = t.transaction.receiptsRoot));
  }
  async getTransaction() {
    if (this.request) {
      const t = this.request.toTransaction();
      return this.applyMalleableSubscriptionFields(t), {
        tx: t,
        bytes: this.request.toTransactionBytes()
      };
    }
    const e = this.gqlTransaction ?? await this.fetch();
    return {
      tx: this.decodeTransaction(e),
      bytes: Y(e.rawPayload)
    };
  }
  getReceipts() {
    var t;
    const e = this.status ?? ((t = this.gqlTransaction) == null ? void 0 : t.status);
    switch (e == null ? void 0 : e.type) {
      case "SuccessStatus":
      case "FailureStatus":
        return e.receipts.map(Tr);
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
    const e = await this.provider.operations.getTransactionWithReceipts({
      transactionId: this.id
    });
    if (!e.transaction) {
      const t = await this.provider.operations.statusChange({
        transactionId: this.id
      });
      for await (const { statusChange: r } of t)
        if (r) {
          this.status = r;
          break;
        }
      return this.fetch();
    }
    return this.gqlTransaction = e.transaction, e.transaction;
  }
  /**
   * Decode the raw payload of the transaction.
   *
   * @param transactionWithReceipts - The transaction with receipts object.
   * @returns The decoded transaction.
   */
  decodeTransaction(e) {
    var t;
    return (t = new Ar().decode(
      Y(e.rawPayload),
      0
    )) == null ? void 0 : t[0];
  }
  /**
   * Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
   * fetch it from the provider
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns
   */
  async getTransactionSummary(e) {
    var b, S;
    const { tx: t, bytes: r } = await this.getTransaction(), { gasPerByte: n, gasPriceFactor: s, gasCosts: i, maxGasPerTx: a } = await this.provider.getGasConfig(), u = rA(this.status ?? ((b = this.gqlTransaction) == null ? void 0 : b.status)) ? x(0) : await this.provider.getLatestGasPrice(), A = (await this.provider.getChain()).consensusParameters.txParameters.maxInputs, p = await this.provider.getBaseAssetId();
    return Ii({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: t,
      transactionBytes: r,
      gqlTransactionStatus: this.status ?? ((S = this.gqlTransaction) == null ? void 0 : S.status),
      gasPerByte: n,
      gasPriceFactor: s,
      abiMap: e,
      maxInputs: A,
      gasCosts: i,
      maxGasPerTx: a,
      gasPrice: u,
      baseAssetId: p
    });
  }
  async waitForStatusChange() {
    var r, n;
    const e = (n = (r = this.gqlTransaction) == null ? void 0 : r.status) == null ? void 0 : n.type;
    if (e && e !== "SubmittedStatus")
      return;
    const t = this.submitTxSubscription ?? await this.provider.operations.statusChange({
      transactionId: this.id
    });
    for await (const s of t) {
      const i = "statusChange" in s ? s.statusChange : s.submitAndAwaitStatus;
      if (this.status = i, i.type === "SqueezedOutStatus")
        throw this.unsetResourceCache(), new C(
          D.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${i.reason}`
        );
      if (i.type !== "SubmittedStatus")
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
  async assembleResult(e) {
    var a;
    const t = await this.getTransactionSummary(e), r = {
      ...t
    };
    let n = [];
    this.abis && (n = Zo(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), r.logs = n);
    const { receipts: s } = r, i = this.status ?? ((a = this.gqlTransaction) == null ? void 0 : a.status);
    if ((i == null ? void 0 : i.type) === "FailureStatus") {
      this.unsetResourceCache();
      const { reason: o } = i;
      throw Yo({
        receipts: s,
        statusReason: o,
        logs: n
      });
    }
    return r;
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult(e) {
    return await this.waitForStatusChange(), this.assembleResult(e);
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait(e) {
    return this.waitForResult(e);
  }
  unsetResourceCache() {
    var e;
    (e = this.provider.cache) == null || e.unset(this.id);
  }
};
function D1(e, t) {
  const r = e.baseDelay ?? 150;
  switch (e.backoff) {
    case "linear":
      return r * t;
    case "fixed":
      return r;
    case "exponential":
    default:
      return 2 ** (t - 1) * r;
  }
}
function nA(e, t, r = 0) {
  return t === void 0 ? e : async (...n) => {
    var s;
    try {
      return await e(...n);
    } catch (i) {
      const a = i;
      if (((s = a.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw a;
      const o = r + 1;
      if (o > t.maxRetries)
        throw a;
      const u = D1(t, o);
      return await Rf(u), nA(e, t, o)(...n);
    }
  };
}
var Q1 = (e, t) => {
  switch (e) {
    case "not enough coins to fit the target":
      throw new C(
        D.NOT_ENOUGH_FUNDS,
        "The account(s) sending the transaction don't have enough funds to cover the transaction.",
        {},
        t
      );
    case "max number of coins is reached while trying to fit the target":
      throw new C(
        D.MAX_COINS_REACHED,
        "The account retrieving coins has exceeded the maximum number of coins per asset. Please consider combining your coins into a single UTXO.",
        {},
        t
      );
    default:
      throw new C(D.INVALID_REQUEST, e);
  }
}, zn = (e) => {
  const { paginationLimit: t, inputArgs: r = {} } = e, { first: n, last: s, after: i, before: a } = r;
  if (i && a)
    throw new C(
      D.INVALID_INPUT_PARAMETERS,
      'Pagination arguments "after" and "before" cannot be used together'
    );
  if ((n || 0) > t || (s || 0) > t)
    throw new C(
      D.INVALID_INPUT_PARAMETERS,
      `Pagination limit for this query cannot exceed ${t} items`
    );
  if (n && a)
    throw new C(
      D.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "first" with "before" is not supported'
    );
  if (s && i)
    throw new C(
      D.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "last" with "after" is not supported'
    );
  return !n && !s && (r.first = t), r;
}, f_ = 10, p_ = 512, sA = 60, F1 = 5, O1 = 2e4, M1 = 1.2, g_ = (e) => {
  const { name: t, daHeight: r, consensusParameters: n } = e, {
    contractParams: s,
    feeParams: i,
    predicateParams: a,
    scriptParams: o,
    txParams: u,
    gasCosts: A,
    baseAssetId: p,
    chainId: m,
    version: b
  } = n;
  return {
    name: t,
    baseChainHeight: x(r),
    consensusParameters: {
      version: b,
      chainId: x(m),
      baseAssetId: p,
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
        version: u.version,
        maxInputs: x(u.maxInputs),
        maxOutputs: x(u.maxOutputs),
        maxWitnesses: x(u.maxWitnesses),
        maxGasPerTx: x(u.maxGasPerTx),
        maxSize: x(u.maxSize),
        maxBytecodeSubsections: x(u.maxBytecodeSubsections)
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
      gasCosts: A
    }
  };
}, eo, iA, ye = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    Sr(this, eo), Nt(this, "operations"), Nt(this, "cache"), Nt(this, "url"), Nt(this, "urlWithoutAuth"), Nt(this, "consensusParametersTimestamp"), Nt(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0,
      headers: void 0
    });
    const { url: r, urlWithoutAuth: n, headers: s } = ye.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.url = e;
    const { FUELS: i } = L_, a = { ...s, ...t.headers, Source: `ts-sdk-${i}` };
    this.options = {
      ...this.options,
      ...t,
      headers: a
    }, this.operations = this.createOperations();
    const { resourceCacheTTL: o } = this.options;
    fr(o) ? o !== -1 ? this.cache = new d_(o) : this.cache = void 0 : this.cache = new d_(O1);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    ye.nodeInfoCache = {}, ye.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: r, headers: n } = e;
    return nA(async (...s) => {
      const i = s[0], a = s[1], o = r ? AbortSignal.timeout(r) : void 0;
      let u = {
        ...a,
        signal: o,
        headers: { ...a == null ? void 0 : a.headers, ...n }
      };
      return e.requestMiddleware && (u = await e.requestMiddleware(u)), e.fetch ? e.fetch(i, u, e) : fetch(i, u);
    }, t);
  }
  static extractBasicAuth(e) {
    let t;
    try {
      t = new URL(e);
    } catch (i) {
      throw new C(C.CODES.INVALID_URL, "Invalid URL provided.", { url: e }, i);
    }
    const r = t.username, n = t.password, s = `${t.origin}${t.pathname}`;
    return r && n ? {
      url: e,
      urlWithoutAuth: s,
      headers: { Authorization: `Basic ${btoa(`${r}:${n}`)}` }
    } : { url: e, urlWithoutAuth: e, headers: void 0 };
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
    return await this.init(), ye.chainInfoCache[this.urlWithoutAuth];
  }
  /**
   * Returns the `nodeInfo` for the current network.
   *
   * @returns the node information configuration.
   */
  async getNode() {
    return await this.init(), ye.nodeInfoCache[this.urlWithoutAuth];
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  async getGasConfig() {
    const {
      txParameters: { maxGasPerTx: e },
      predicateParameters: { maxGasPerPredicate: t },
      feeParameters: { gasPriceFactor: r, gasPerByte: n },
      gasCosts: s
    } = (await this.getChain()).consensusParameters;
    return {
      maxGasPerTx: e,
      maxGasPerPredicate: t,
      gasPriceFactor: r,
      gasPerByte: n,
      gasCosts: s
    };
  }
  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   *
   * @param url - The URL to connect to.
   * @param options - Additional options for the provider.
   */
  async connect(e, t) {
    const { url: r, urlWithoutAuth: n, headers: s } = ye.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.options = t ?? this.options, this.options = { ...this.options, headers: { ...this.options.headers, ...s } }, this.operations = this.createOperations(), await this.init();
  }
  /**
   * Return the chain and node information.
   * @param ignoreCache - If true, ignores the cache and re-fetch configs.
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo(e = !1) {
    let t, r;
    try {
      if (t = ye.nodeInfoCache[this.urlWithoutAuth], r = ye.chainInfoCache[this.urlWithoutAuth], e || (!t || !r))
        throw new Error("Jumps to the catch block and re-fetch");
    } catch {
      const s = await this.operations.getChainAndNodeInfo();
      t = {
        maxDepth: x(s.nodeInfo.maxDepth),
        maxTx: x(s.nodeInfo.maxTx),
        nodeVersion: s.nodeInfo.nodeVersion,
        utxoValidation: s.nodeInfo.utxoValidation,
        vmBacktrace: s.nodeInfo.vmBacktrace
      }, ye.ensureClientVersionIsSupported(t), r = g_(s.chain), ye.chainInfoCache[this.urlWithoutAuth] = r, ye.nodeInfoCache[this.urlWithoutAuth] = t, this.consensusParametersTimestamp = Date.now();
    }
    return {
      chain: r,
      nodeInfo: t
    };
  }
  /**
   * @hidden
   */
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: r, supportedVersion: n } = YA(e.nodeVersion);
    (!t || !r) && console.warn(
      `The Fuel Node that you are trying to connect to is using fuel-core version ${e.nodeVersion},
which is not supported by the version of the TS SDK that you are using.
Things may not work as expected.
Supported fuel-core version: ${n}.`
    );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   * @hidden
   */
  createOperations() {
    const e = ye.getFetchFn(this.options), t = new e0(this.urlWithoutAuth, {
      fetch: (s, i) => e(s.toString(), i || {}, this.options),
      responseMiddleware: (s) => {
        if ("response" in s) {
          const i = s.response;
          if (Array.isArray(i == null ? void 0 : i.errors))
            for (const a of i.errors)
              Q1(a.message, a);
        }
      }
    }), r = (s, i) => {
      const a = s.definitions.find((u) => u.kind === "OperationDefinition");
      return (a == null ? void 0 : a.operation) === "subscription" ? zl.create({
        url: this.urlWithoutAuth,
        query: s,
        fetchFn: (u, A) => e(u, A, this.options),
        variables: i
      }) : t.request(s, i);
    }, n = (s) => ({
      getBlobs(i) {
        const a = i.blobIds.map((p, m) => `$blobId${m}: BlobId!`).join(", "), o = i.blobIds.map((p, m) => `blob${m}: blob(id: $blobId${m}) { id }`).join(`
`), u = i.blobIds.reduce(
          (p, m, b) => (p[`blobId${b}`] = m, p),
          {}
        ), A = q`
          query getBlobs(${a}) {
            ${o}
          }
        `;
        return s(A, u);
      }
    });
    return { ...wv(r), ...n(r) };
  }
  /**
   * Returns the version of the connected node.
   *
   * @returns A promise that resolves to the version string.
   */
  async getVersion() {
    const {
      nodeInfo: { nodeVersion: e }
    } = await this.operations.getVersion();
    return e;
  }
  /**
   * Returns the latest block number.
   *
   * @returns A promise that resolves to the latest block number.
   */
  async getBlockNumber() {
    const {
      chain: {
        latestBlock: { height: e }
      }
    } = await this.operations.getLatestBlockHeight();
    return x(e);
  }
  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: x(e.maxDepth),
      maxTx: x(e.maxTx),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return ye.nodeInfoCache[this.urlWithoutAuth] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = g_(e);
    return ye.chainInfoCache[this.urlWithoutAuth] = t, t;
  }
  /**
   * Returns the chain ID for the current provider network.
   *
   * @returns A promise that resolves to the chain ID number.
   */
  async getChainId() {
    const {
      consensusParameters: { chainId: e }
    } = await this.getChain();
    return e.toNumber();
  }
  /**
   * Returns the base asset ID for the current provider network.
   *
   * @returns the base asset ID.
   */
  async getBaseAssetId() {
    const e = await this.getChain(), {
      consensusParameters: { baseAssetId: t }
    } = e;
    return t;
  }
  /**
   * @hidden
   */
  async validateTransaction(e) {
    const {
      consensusParameters: {
        txParameters: { maxInputs: t, maxOutputs: r }
      }
    } = await this.getChain();
    if (x(e.inputs.length).gt(t))
      throw new C(
        D.MAX_INPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of inputs. Tx inputs: ${e.inputs.length}, max inputs: ${t}`
      );
    if (x(e.outputs.length).gt(r))
      throw new C(
        D.MAX_OUTPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of outputs. Tx outputs: ${e.outputs.length}, max outputs: ${r}`
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
  async sendTransaction(e, { estimateTxDependencies: t = !0, enableAssetBurn: r } = {}) {
    const n = Se(e);
    Wl(
      await this.getBaseAssetId(),
      n,
      r
    ), t && await this.estimateTxDependencies(n), await this.validateTransaction(n);
    const s = Z(n.toTransactionBytes());
    let i;
    Ur(n) && (i = n.abis);
    const a = await this.operations.submitAndAwaitStatus({ encodedTransaction: s });
    Wa(this, eo, iA).call(this, n.inputs, n.getTransactionId(await this.getChainId()));
    const o = await this.getChainId();
    return new to(n, this, o, i, a);
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
  async dryRun(e, { utxoValidation: t, estimateTxDependencies: r = !0 } = {}) {
    const n = Se(e);
    if (r)
      return this.estimateTxDependencies(n);
    const s = Z(n.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: a, status: o }] = i;
    return { receipts: a.map(Tr), dryRunStatus: o };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @template T - The type of the transaction request object.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(e) {
    if (!!!e.inputs.find(
      (i) => "predicate" in i && i.predicate && !Uh(Y(i.predicate), Y("0x")) && new Ot(i.predicateGasUsed).isZero()
    ))
      return e;
    const r = Z(e.toTransactionBytes()), n = await this.operations.estimatePredicates({
      encodedTransaction: r
    }), {
      estimatePredicates: { inputs: s }
    } = n;
    return s && s.forEach((i, a) => {
      "predicateGasUsed" in i && x(i.predicateGasUsed).gt(0) && (e.inputs[a].predicateGasUsed = i.predicateGasUsed);
    }), e;
  }
  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimate transaction dependencies.
   */
  async estimateTxDependencies(e) {
    if (Gv(e))
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const r = [];
    let n = 0, s;
    await this.validateTransaction(e);
    for (let i = 0; i < f_; i++) {
      const {
        dryRun: [{ receipts: a, status: o }]
      } = await this.operations.dryRun({
        encodedTransactions: [Z(e.toTransactionBytes())],
        utxoValidation: !1,
        gasPrice: "0"
      });
      t = a.map(Tr), s = o;
      const { missingOutputVariables: u, missingOutputContractIds: A } = __(t);
      if ((u.length !== 0 || A.length !== 0) && Ur(e)) {
        n += u.length, e.addVariableOutputs(u.length), A.forEach(({ contractId: b }) => {
          e.addContractInputAndOutput(ct.fromString(b)), r.push(b);
        });
        const { maxFee: m } = await this.estimateTxGasAndFee({
          transactionRequest: e,
          gasPrice: x(0)
        });
        e.maxFee = m;
      } else
        break;
    }
    return {
      receipts: t,
      outputVariables: n,
      missingContractIds: r,
      dryRunStatus: s
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
  async estimateMultipleTxDependencies(e) {
    const t = e.map(() => ({
      receipts: [],
      outputVariables: 0,
      missingContractIds: [],
      dryRunStatus: void 0
    })), r = Be(e), n = /* @__PURE__ */ new Map();
    r.forEach((a, o) => {
      Ur(a) && n.set(o, Z(a.toTransactionBytes()));
    });
    let s = Array.from(n.keys()), i = 0;
    for (; s.length > 0 && i < f_; ) {
      const a = s.map(
        (A) => n.get(A)
      ), o = await this.operations.dryRun({
        encodedTransactions: a,
        utxoValidation: !1
      }), u = [];
      for (let A = 0; A < o.dryRun.length; A++) {
        const p = s[A], { receipts: m, status: b } = o.dryRun[A], S = t[p];
        S.receipts = m.map(Tr), S.dryRunStatus = b;
        const { missingOutputVariables: F, missingOutputContractIds: R } = __(
          S.receipts
        ), N = F.length > 0 || R.length > 0, O = r[p];
        if (N && Ur(O)) {
          S.outputVariables += F.length, O.addVariableOutputs(F.length), R.forEach(({ contractId: M }) => {
            O.addContractInputAndOutput(ct.fromString(M)), S.missingContractIds.push(M);
          });
          const { maxFee: z } = await this.estimateTxGasAndFee({
            transactionRequest: O
          });
          O.maxFee = z, n.set(p, Z(O.toTransactionBytes())), u.push(p);
        }
      }
      s = u, i += 1;
    }
    return t;
  }
  /**
   * Dry runs multiple transactions.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @param sendTransactionParams - The provider call parameters (optional).
   *
   * @returns A promise that resolves to an array of results for each transaction call.
   */
  async dryRunMultipleTransactions(e, { utxoValidation: t, estimateTxDependencies: r = !0 } = {}) {
    if (r)
      return this.estimateMultipleTxDependencies(e);
    const n = e.map((a) => Z(a.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: a, status: o }) => ({ receipts: a.map(Tr), dryRunStatus: o }));
  }
  async autoRefetchConfigs() {
    var i;
    if (Date.now() - (this.consensusParametersTimestamp ?? 0) < 6e4)
      return;
    if (!((i = ye.chainInfoCache) != null && i[this.urlWithoutAuth])) {
      await this.fetchChainAndNodeInfo(!0);
      return;
    }
    const r = ye.chainInfoCache[this.urlWithoutAuth], {
      consensusParameters: { version: n }
    } = r, {
      chain: {
        latestBlock: {
          header: { consensusParametersVersion: s }
        }
      }
    } = await this.operations.getConsensusParametersVersion();
    n !== s && await this.fetchChainAndNodeInfo(!0);
  }
  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param transactionRequest - The transaction request object.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(e) {
    const { transactionRequest: t } = e;
    let { gasPrice: r } = e;
    await this.autoRefetchConfigs();
    const n = await this.getChain(), { gasPriceFactor: s, maxGasPerTx: i } = await this.getGasConfig(), a = t.calculateMinGas(n);
    fr(r) || (r = await this.estimateGasPrice(10));
    const o = vn({
      gasPrice: x(r),
      gas: a,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let u = x(0);
    Ur(t) && (u = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = a, t.gasLimit = i.sub(
      t.calculateMaxGas(n, a)
    ), u = t.gasLimit));
    const A = t.calculateMaxGas(n, a), p = vn({
      gasPrice: x(r),
      gas: A,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: a,
      minFee: o,
      maxGas: A,
      maxFee: p,
      gasPrice: r,
      gasLimit: u
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
  async simulate(e, { estimateTxDependencies: t = !0 } = {}) {
    const r = Se(e);
    if (t)
      return this.estimateTxDependencies(r);
    const n = [Z(r.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: !0
    });
    return { receipts: s.map((a) => {
      const { id: o, receipts: u, status: A } = a, p = u.map(Tr);
      return { id: o, receipts: p, status: A };
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
  async getTransactionCost(e, { signatureCallback: t } = {}) {
    const r = Be(Se(e)), n = r.maxFee.eq(0), s = Ur(r);
    s && (r.gasLimit = x(0));
    const i = Be(r);
    let a = 0;
    if (t && Ur(i)) {
      const z = i.witnesses.length;
      await t(i), a = i.witnesses.length - z;
    }
    await this.estimatePredicates(i), r.updatePredicateGasUsed(i.inputs);
    let { maxFee: o, maxGas: u, minFee: A, minGas: p, gasPrice: m, gasLimit: b } = await this.estimateTxGasAndFee({
      transactionRequest: i
    }), S = [], F, R = [], N = 0, O = x(0);
    if (r.maxFee = o, s) {
      if (r.gasLimit = b, t && await t(r), { receipts: S, missingContractIds: R, outputVariables: N, dryRunStatus: F } = await this.estimateTxDependencies(r), F && "reason" in F)
        throw this.extractDryRunError(r, S, F);
      const { maxGasPerTx: z } = await this.getGasConfig(), M = yi(S);
      O = x(M.muln(M1)).max(z.sub(p)), r.gasLimit = O, { maxFee: o, maxGas: u, minFee: A, minGas: p, gasPrice: m } = await this.estimateTxGasAndFee({
        transactionRequest: r,
        gasPrice: m
      });
    }
    return {
      receipts: S,
      gasUsed: O,
      gasPrice: m,
      minGas: p,
      maxGas: u,
      minFee: A,
      maxFee: o,
      outputVariables: N,
      missingContractIds: R,
      addedSignatures: a,
      estimatedPredicates: r.inputs,
      dryRunStatus: F,
      updateMaxFee: n
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
  async getCoins(e, t, r) {
    const n = ct.fromAddressOrString(e), {
      coins: { edges: s, pageInfo: i }
    } = await this.operations.getCoins({
      ...zn({
        paginationLimit: p_,
        inputArgs: r
      }),
      filter: { owner: n.toB256(), assetId: t && Z(t) }
    });
    return {
      coins: s.map(({ node: o }) => ({
        id: o.utxoId,
        assetId: o.assetId,
        amount: x(o.amount),
        owner: n,
        blockCreated: x(o.blockCreated),
        txCreatedIdx: x(o.txCreatedIdx)
      })),
      pageInfo: i
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
  async getResourcesToSpend(e, t, r) {
    var u, A;
    const n = ct.fromAddressOrString(e), s = {
      messages: ((u = r == null ? void 0 : r.messages) == null ? void 0 : u.map((p) => Z(p))) || [],
      utxos: ((A = r == null ? void 0 : r.utxos) == null ? void 0 : A.map((p) => Z(p))) || []
    };
    if (this.cache) {
      const p = this.cache.getActiveData();
      s.messages.push(...p.messages), s.utxos.push(...p.utxos);
    }
    const i = {
      owner: n.toB256(),
      queryPerAsset: t.map(Po).map(({ assetId: p, amount: m, max: b }) => ({
        assetId: Z(p),
        amount: m.toString(10),
        max: b ? b.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((p) => {
      switch (p.type) {
        case "MessageCoin":
          return {
            amount: x(p.amount),
            assetId: p.assetId,
            daHeight: x(p.daHeight),
            sender: ct.fromAddressOrString(p.sender),
            recipient: ct.fromAddressOrString(p.recipient),
            nonce: p.nonce
          };
        case "Coin":
          return {
            id: p.utxoId,
            amount: x(p.amount),
            assetId: p.assetId,
            owner: n,
            blockCreated: x(p.blockCreated),
            txCreatedIdx: x(p.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((p) => !!p);
  }
  /**
   * Returns an array of blobIds that exist on chain, for a given array of blobIds.
   *
   * @param blobIds - blobIds to check.
   * @returns - A promise that resolves to an array of blobIds that exist on chain.
   */
  async getBlobs(e) {
    const t = await this.operations.getBlobs({ blobIds: e }), r = [];
    return Object.keys(t).forEach((n) => {
      const s = t[n];
      r.push((s == null ? void 0 : s.id) ?? null);
    }), r.filter((n) => n);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block or null.
   */
  async getBlock(e) {
    let t;
    if (e === "latest") {
      const {
        chain: { latestBlock: a }
      } = await this.operations.getLatestBlock();
      t = a;
    } else {
      const o = typeof e == "string" && e.length === 66 ? { blockId: e } : { height: x(e).toString(10) };
      t = (await this.operations.getBlock(o)).block;
    }
    if (!t)
      return null;
    const { header: r, height: n, id: s, transactions: i } = t;
    return {
      id: s,
      height: x(n),
      time: r.time,
      header: {
        applicationHash: r.applicationHash,
        daHeight: x(r.daHeight),
        eventInboxRoot: r.eventInboxRoot,
        messageOutboxRoot: r.messageOutboxRoot,
        prevRoot: r.prevRoot,
        stateTransitionBytecodeVersion: r.stateTransitionBytecodeVersion,
        transactionsCount: r.transactionsCount,
        transactionsRoot: r.transactionsRoot
      },
      transactionIds: i.map((a) => a.id)
    };
  }
  /**
   * Returns all the blocks matching the given parameters.
   *
   * @param params - The parameters to query blocks.
   * @returns A promise that resolves to the blocks.
   */
  async getBlocks(e) {
    const {
      blocks: { edges: t, pageInfo: r }
    } = await this.operations.getBlocks({
      ...zn({
        paginationLimit: F1,
        inputArgs: e
      })
    });
    return { blocks: t.map(({ node: s }) => ({
      id: s.id,
      height: x(s.height),
      time: s.header.time,
      header: {
        applicationHash: s.header.applicationHash,
        daHeight: x(s.header.daHeight),
        eventInboxRoot: s.header.eventInboxRoot,
        messageOutboxRoot: s.header.messageOutboxRoot,
        prevRoot: s.header.prevRoot,
        stateTransitionBytecodeVersion: s.header.stateTransitionBytecodeVersion,
        transactionsCount: s.header.transactionsCount,
        transactionsRoot: s.header.transactionsRoot
      },
      transactionIds: s.transactions.map((i) => i.id)
    })), pageInfo: r };
  }
  /**
   * Returns block matching the given ID or type, including transaction data.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlockWithTransactions(e) {
    let t;
    typeof e == "number" ? t = { blockHeight: x(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: r } = await this.operations.getBlockWithTransactions(t);
    return r ? {
      id: r.id,
      height: x(r.height, 10),
      time: r.header.time,
      header: {
        applicationHash: r.header.applicationHash,
        daHeight: x(r.header.daHeight),
        eventInboxRoot: r.header.eventInboxRoot,
        messageOutboxRoot: r.header.messageOutboxRoot,
        prevRoot: r.header.prevRoot,
        stateTransitionBytecodeVersion: r.header.stateTransitionBytecodeVersion,
        transactionsCount: r.header.transactionsCount,
        transactionsRoot: r.header.transactionsRoot
      },
      transactionIds: r.transactions.map((n) => n.id),
      transactions: r.transactions.map(
        (n) => {
          var s;
          return (s = new Ar().decode(Y(n.rawPayload), 0)) == null ? void 0 : s[0];
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
  async getTransaction(e) {
    var r;
    const { transaction: t } = await this.operations.getTransaction({ transactionId: e });
    if (!t)
      return null;
    try {
      return (r = new Ar().decode(
        Y(t.rawPayload),
        0
      )) == null ? void 0 : r[0];
    } catch (n) {
      if (n instanceof C && n.code === D.UNSUPPORTED_TRANSACTION_TYPE)
        return console.warn("Unsupported transaction type encountered"), null;
      throw n;
    }
  }
  /**
   * Retrieves transactions based on the provided pagination arguments.
   * @param paginationArgs - The pagination arguments for retrieving transactions.
   * @returns A promise that resolves to an object containing the retrieved transactions and pagination information.
   */
  async getTransactions(e) {
    const {
      transactions: { edges: t, pageInfo: r }
    } = await this.operations.getTransactions({
      ...zn({
        inputArgs: e,
        paginationLimit: sA
      })
    }), n = new Ar();
    return { transactions: t.map(({ node: { rawPayload: i } }) => {
      try {
        return n.decode(Y(i), 0)[0];
      } catch (a) {
        if (a instanceof C && a.code === D.UNSUPPORTED_TRANSACTION_TYPE)
          return console.warn("Unsupported transaction type encountered"), null;
        throw a;
      }
    }).filter((i) => i !== null), pageInfo: r };
  }
  /**
   * Get deployed contract with the given ID.
   *
   * @param contractId - ID of the contract.
   * @returns A promise that resolves to the contract.
   */
  async getContract(e) {
    const { contract: t } = await this.operations.getContract({ contractId: e });
    return t || null;
  }
  /**
   * Returns the balance for the given contract for the given asset ID.
   *
   * @param contractId - The contract ID to get the balance for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getContractBalance(e, t) {
    const { contractBalance: r } = await this.operations.getContractBalance({
      contract: ct.fromAddressOrString(e).toB256(),
      asset: Z(t)
    });
    return x(r.amount, 10);
  }
  /**
   * Returns the balance for the given owner for the given asset ID.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getBalance(e, t) {
    const { balance: r } = await this.operations.getBalance({
      owner: ct.fromAddressOrString(e).toB256(),
      assetId: Z(t)
    });
    return x(r.amount, 10);
  }
  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the balances.
   */
  async getBalances(e) {
    const {
      balances: { edges: t }
    } = await this.operations.getBalances({
      /**
       * The query parameters for this method were designed to support pagination,
       * but the current Fuel-Core implementation does not support pagination yet.
       */
      first: 1e4,
      filter: { owner: ct.fromAddressOrString(e).toB256() }
    });
    return { balances: t.map(({ node: n }) => ({
      assetId: n.assetId,
      amount: x(n.amount)
    })) };
  }
  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the messages.
   */
  async getMessages(e, t) {
    const {
      messages: { edges: r, pageInfo: n }
    } = await this.operations.getMessages({
      ...zn({
        inputArgs: t,
        paginationLimit: p_
      }),
      owner: ct.fromAddressOrString(e).toB256()
    });
    return {
      messages: r.map(({ node: i }) => ({
        messageId: Qr.getMessageId({
          sender: i.sender,
          recipient: i.recipient,
          nonce: i.nonce,
          amount: x(i.amount),
          data: i.data
        }),
        sender: ct.fromAddressOrString(i.sender),
        recipient: ct.fromAddressOrString(i.recipient),
        nonce: i.nonce,
        amount: x(i.amount),
        data: Qr.decodeData(i.data),
        daHeight: x(i.daHeight)
      })),
      pageInfo: n
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
  async getMessageProof(e, t, r, n) {
    let s = {
      transactionId: e,
      nonce: t
    };
    if (r && n)
      throw new C(
        D.INVALID_INPUT_PARAMETERS,
        "commitBlockId and commitBlockHeight cannot be used together"
      );
    r && (s = {
      ...s,
      commitBlockId: r
    }), n && (s = {
      ...s,
      // Conver BN into a number string required on the query
      // This should problably be fixed on the fuel client side
      commitBlockHeight: n.toNumber().toString()
    });
    const i = await this.operations.getMessageProof(s);
    if (!i.messageProof)
      return null;
    const {
      messageProof: a,
      messageBlockHeader: o,
      commitBlockHeader: u,
      blockProof: A,
      sender: p,
      recipient: m,
      amount: b,
      data: S
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: x(a.proofIndex),
        proofSet: a.proofSet
      },
      blockProof: {
        proofIndex: x(A.proofIndex),
        proofSet: A.proofSet
      },
      messageBlockHeader: {
        id: o.id,
        daHeight: x(o.daHeight),
        transactionsCount: Number(o.transactionsCount),
        transactionsRoot: o.transactionsRoot,
        height: x(o.height),
        prevRoot: o.prevRoot,
        time: o.time,
        applicationHash: o.applicationHash,
        messageReceiptCount: Number(o.messageReceiptCount),
        messageOutboxRoot: o.messageOutboxRoot,
        consensusParametersVersion: Number(o.consensusParametersVersion),
        eventInboxRoot: o.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(o.stateTransitionBytecodeVersion)
      },
      commitBlockHeader: {
        id: u.id,
        daHeight: x(u.daHeight),
        transactionsCount: Number(u.transactionsCount),
        transactionsRoot: u.transactionsRoot,
        height: x(u.height),
        prevRoot: u.prevRoot,
        time: u.time,
        applicationHash: u.applicationHash,
        messageReceiptCount: Number(u.messageReceiptCount),
        messageOutboxRoot: u.messageOutboxRoot,
        consensusParametersVersion: Number(u.consensusParametersVersion),
        eventInboxRoot: u.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(u.stateTransitionBytecodeVersion)
      },
      sender: ct.fromAddressOrString(p),
      recipient: ct.fromAddressOrString(m),
      nonce: t,
      amount: x(b),
      data: S
    };
  }
  /**
   * Get the latest gas price from the node.
   *
   * @returns A promise that resolves to the latest gas price.
   */
  async getLatestGasPrice() {
    const { latestGasPrice: e } = await this.operations.getLatestGasPrice();
    return x(e.gasPrice);
  }
  /**
   * Returns the estimate gas price for the given block horizon.
   *
   * @param blockHorizon - The block horizon to estimate gas price for.
   * @returns A promise that resolves to the estimated gas price.
   */
  async estimateGasPrice(e) {
    const { estimateGasPrice: t } = await this.operations.estimateGasPrice({
      blockHorizon: String(e)
    });
    return x(t.gasPrice);
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param nonce - The nonce of the message to get status from.
   * @returns A promise that resolves to the message status
   */
  async getMessageStatus(e) {
    return (await this.operations.getMessageStatus({ nonce: e })).messageStatus;
  }
  /**
   * Lets you produce blocks with custom timestamps and the block number of the last block produced.
   *
   * @param amount - The amount of blocks to produce.
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block (optional).
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(e, t) {
    const { produceBlocks: r } = await this.operations.produceBlocks({
      blocksToProduce: x(e).toString(10),
      startTimestamp: t ? ho.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return x(r);
  }
  /**
   * Check if the given ID is an account.
   *
   * @param id - The ID to check.
   * @returns A promise that resolves to the result of the check.
   */
  async isUserAccount(e) {
    const { contract: t, blob: r, transaction: n } = await this.operations.isUserAccount({
      blobId: e,
      contractId: e,
      transactionId: e
    });
    return !(t || r || n);
  }
  async getAddressType(e) {
    const { contract: t, blob: r, transaction: n } = await this.operations.isUserAccount({
      blobId: e,
      contractId: e,
      transactionId: e
    });
    return t ? "Contract" : r ? "Blob" : n ? "Transaction" : "Account";
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  async getTransactionResponse(e) {
    const t = await this.getChainId();
    return new to(e, this, t);
  }
  /**
   * Returns Message for given nonce.
   *
   * @param nonce - The nonce of the message to retrieve.
   * @returns A promise that resolves to the Message object or null.
   */
  async getMessageByNonce(e) {
    const { message: t } = await this.operations.getMessageByNonce({ nonce: e });
    return t ? {
      messageId: Qr.getMessageId({
        sender: t.sender,
        recipient: t.recipient,
        nonce: e,
        amount: x(t.amount),
        data: t.data
      }),
      sender: ct.fromAddressOrString(t.sender),
      recipient: ct.fromAddressOrString(t.recipient),
      nonce: e,
      amount: x(t.amount),
      data: Qr.decodeData(t.data),
      daHeight: x(t.daHeight)
    } : null;
  }
  /**
   * Get the relayed transaction for the given transaction ID.
   *
   * @param relayedTransactionId - The relayed transaction ID to get the response for.
   * @returns A promise that resolves to the relayed transaction.
   */
  async getRelayedTransactionStatus(e) {
    const { relayedTransactionStatus: t } = await this.operations.getRelayedTransactionStatus({
      relayedTransactionId: e
    });
    return t || null;
  }
  /**
   * @hidden
   */
  extractDryRunError(e, t, r) {
    const n = r;
    let s = [];
    return e.abis && (s = Zo(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), Yo({
      logs: s,
      receipts: t,
      statusReason: n.reason
    });
  }
}, ii = ye;
eo = /* @__PURE__ */ new WeakSet();
iA = function(e, t) {
  if (!this.cache)
    return;
  const r = e.reduce(
    (n, s) => (s.type === It.Coin ? n.utxos.push(s.id) : s.type === It.Message && n.messages.push(s.nonce), n),
    { utxos: [], messages: [] }
  );
  this.cache.set(t, r);
};
Nt(ii, "chainInfoCache", {});
Nt(ii, "nodeInfoCache", {});
async function UB(e) {
  const { id: t, provider: r, abiMap: n } = e, { transaction: s } = await r.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new C(
      D.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Ar().decode(
    Y(s.rawPayload),
    0
  );
  let a = [];
  s != null && s.status && "receipts" in s.status && (a = s.status.receipts);
  const o = a.map(Tr), {
    consensusParameters: {
      feeParameters: { gasPerByte: u, gasPriceFactor: A },
      txParameters: { maxInputs: p, maxGasPerTx: m },
      gasCosts: b
    }
  } = await r.getChain(), F = rA(s.status) ? x(0) : await r.getLatestGasPrice(), R = await r.getBaseAssetId();
  return {
    ...Ii({
      id: s.id,
      receipts: o,
      transaction: i,
      transactionBytes: Y(s.rawPayload),
      gqlTransactionStatus: s.status,
      gasPerByte: x(u),
      gasPriceFactor: x(A),
      abiMap: n,
      maxInputs: p,
      gasCosts: b,
      maxGasPerTx: m,
      gasPrice: F,
      baseAssetId: R
    })
  };
}
async function zB(e) {
  const { provider: t, transactionRequest: r, abiMap: n } = e, { receipts: s } = await t.dryRun(r), { gasPerByte: i, gasPriceFactor: a, gasCosts: o, maxGasPerTx: u } = await t.getGasConfig(), A = (await t.getChain()).consensusParameters.txParameters.maxInputs, p = r.toTransaction(), m = r.toTransactionBytes(), b = await t.getLatestGasPrice(), S = await t.getBaseAssetId();
  return Ii({
    id: r.getTransactionId(await t.getChainId()),
    receipts: s,
    transaction: p,
    transactionBytes: m,
    abiMap: n,
    gasPerByte: i,
    gasPriceFactor: a,
    maxInputs: A,
    gasCosts: o,
    maxGasPerTx: u,
    gasPrice: b,
    baseAssetId: S
  });
}
async function GB(e) {
  const { filters: t, provider: r, abiMap: n } = e, { owner: s, ...i } = t, a = zn({
    inputArgs: i,
    paginationLimit: sA
  }), { transactionsByOwner: o } = await r.operations.getTransactionsByOwner({
    ...a,
    owner: s
  }), { edges: u, pageInfo: A } = o, {
    consensusParameters: {
      feeParameters: { gasPerByte: p, gasPriceFactor: m },
      txParameters: { maxInputs: b, maxGasPerTx: S },
      gasCosts: F
    }
  } = await r.getChain(), R = await r.getLatestGasPrice(), N = await r.getBaseAssetId();
  return {
    transactions: u.map((z) => {
      const { node: M } = z, { id: U, rawPayload: P, status: H } = M, [X] = new Ar().decode(Y(P), 0);
      let V = [];
      M != null && M.status && "receipts" in M.status && (V = M.status.receipts);
      const k = V.map(Tr);
      return {
        ...Ii({
          id: U,
          receipts: k,
          transaction: X,
          transactionBytes: Y(P),
          gqlTransactionStatus: H,
          abiMap: n,
          gasPerByte: p,
          gasPriceFactor: m,
          maxInputs: b,
          gasCosts: F,
          maxGasPerTx: S,
          gasPrice: R,
          baseAssetId: N
        })
      };
    }),
    pageInfo: A
  };
}
var nt = {
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
}, L1 = (e) => {
  if (e === "ethereum")
    return nt.eth.sepolia;
  if (e === "fuel")
    return nt.fuel.testnet;
}, P1 = ({
  asset: e,
  chainId: t,
  networkType: r
}) => e.networks.find(
  (s) => s.chainId === t && s.type === r
), aA = ({
  asset: e,
  chainId: t,
  networkType: r
}) => {
  const { networks: n, ...s } = e, i = t ?? L1(r);
  if (i === void 0)
    return;
  const a = P1({
    asset: e,
    chainId: i,
    networkType: r
  });
  if (a)
    return {
      ...s,
      ...a
    };
}, VB = (e, t) => aA({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), YB = (e, t) => aA({
  asset: e,
  networkType: "fuel",
  chainId: t
}), k1 = "/", U1 = /^\/|\/$/g, z1 = (e = "") => e.replace(U1, "");
function G1(e, ...t) {
  const r = e != null, n = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(z1);
  return n && r && s.unshift(""), s.join(k1);
}
function V1(e, t = "./") {
  return e.map((r) => ({
    ...r,
    icon: G1(t, r.icon)
  }));
}
var Y1 = "https://cdn.fuel.network/assets/", H1 = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: nt.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: nt.eth.foundry,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: nt.eth.mainnet,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: nt.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xae78736cd615f374d3085123a210448e74fc6393",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xa2E3356610840701BDf5611a53974510Ae27E2e1",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x7a4EffD87C2f3C55CA251080b1343b605f327E3a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x5fD13359Ba15A84B76f7F87568309040176167cd",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x4041381e947CFD3D483d67a25C6aa9Dc924250c5",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x8CdF550C04Bc9B9F10938368349C9c8051A772b6",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x3f24E1d7a973867fC2A03fE199E5502514E0e11E",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xc96de26018a54d51c097160568752c4e3bd6c364",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xd9d920aa40f578ab794426f5c90f6c731d159def",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x83f20f44975d03b1b09e64809b757c47f942beea",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x82f5104b23FF2FA54C2345F821dAc9369e9E0B26",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x8c9532a60e0e7c6bbd2b2c1303f63ace1c3e9811",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0x84631c0d0081FDe56DeB72F6DE77abBbF6A9f93a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
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
        chainId: nt.eth.mainnet,
        address: "0xBEEF69Ac7870777598A04B2bd4771c71212E6aBc",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nt.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30",
        decimals: 9
      }
    ]
  }
], HB = V1(H1, Y1), w_ = (...e) => {
  const t = {};
  function r({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return e.forEach((n) => n.forEach(r)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, X1 = class {
}, Z1 = (e) => {
  const t = new rt("u64");
  return e.reduce((r, n) => {
    const { assetId: s, amount: i, contractId: a } = n, o = t.encode(i), u = at([
      ct.fromAddressOrString(a).toBytes(),
      o,
      Y(s)
    ]);
    return at([r, u]);
  }, new Uint8Array());
}, W1 = async (e) => {
  const t = Z1(e);
  await gi();
  let r = new Uint8Array();
  return e.forEach((n, s) => {
    const i = (Qa + dt + Zn) * s;
    r = at([
      r,
      // Load ScriptData into register 0x10.
      cl(16, 0, ul.ScriptData).to_bytes(),
      // Add the offset to 0x10 so it will point to the current contract ID, store in 0x11.
      tr(17, 16, i).to_bytes(),
      // Add CONTRACT_ID_LEN to 0x11 to point to the amount in the ScriptData, store in 0x12.
      tr(18, 17, Qa).to_bytes(),
      // Load word to the amount at 0x12 into register 0x13.
      Jn(19, 18, 0).to_bytes(),
      // Add WORD_SIZE to 0x12 to point to the asset ID in the ScriptData, store in 0x14.
      tr(20, 18, dt).to_bytes(),
      // Perform the transfer using contract ID in 0x11, amount in 0x13, and asset ID in 0x14.
      al(17, 19, 20).to_bytes()
    ]);
  }), r = at([r, Oo(1).to_bytes()]), { script: r, scriptData: t };
}, j1 = 5, Ei = class extends X1 {
  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   * @param connector - A FuelConnector instance (optional).
   */
  constructor(t, r, n) {
    super();
    /**
     * The address associated with the account.
     */
    Q(this, "address");
    /**
     * The provider used to interact with the network.
     */
    Q(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    Q(this, "_connector");
    this._provider = r, this._connector = n, this.address = ct.fromDynamicInput(t);
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
      throw new C(D.MISSING_PROVIDER, "Provider not set");
    return this._provider;
  }
  /**
   * Sets the provider for the account.
   *
   * @param provider - A Provider instance.
   */
  set provider(t) {
    this._provider = t;
  }
  /**
   * Changes the provider connection for the account.
   *
   * @param provider - A Provider instance.
   * @returns The updated Provider instance.
   */
  connect(t) {
    return this._provider = t, this.provider;
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - Quantities of resources to be obtained.
   * @param excludedIds - IDs of resources to be excluded from the query (optional).
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(t, r) {
    return this.provider.getResourcesToSpend(this.address, t, r);
  }
  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve (optional).
   * @returns A promise that resolves to an array of Coins.
   */
  async getCoins(t, r) {
    return this.provider.getCoins(this.address, t, r);
  }
  /**
   * Retrieves messages owned by the account.
   *
   * @returns A promise that resolves to an array of Messages.
   */
  async getMessages(t) {
    return this.provider.getMessages(this.address, t);
  }
  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for (optional).
   * @returns A promise that resolves to the balance amount.
   */
  async getBalance(t) {
    const r = t ?? await this.provider.getBaseAssetId();
    return await this.provider.getBalance(this.address, r);
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
  async fund(t, r) {
    var z;
    const { addedSignatures: n, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: a, gasPrice: o } = r, u = t.maxFee, A = await this.provider.getBaseAssetId(), p = ((z = i.find((M) => M.assetId === A)) == null ? void 0 : z.amount) || x(0), m = AE({
      amount: x(u),
      assetId: A,
      coinQuantities: i
    }), b = {};
    m.forEach(({ amount: M, assetId: U }) => {
      b[U] = {
        required: M,
        owned: x(0)
      };
    }), t.inputs.filter(tn).forEach((M) => {
      const P = Pr(M) ? String(M.assetId) : A;
      b[P] && (b[P].owned = b[P].owned.add(M.amount));
    });
    let S = [];
    Object.entries(b).forEach(([M, { owned: U, required: P }]) => {
      U.lt(P) && S.push({
        assetId: M,
        amount: P.sub(U)
      });
    });
    let F = S.length > 0, R = 0;
    for (; F && R < j1; ) {
      const M = await this.getResourcesToSpend(
        S,
        Mv(t.inputs, this.address)
      );
      t.addResources(M), t.updatePredicateGasUsed(s);
      const U = Be(t);
      if (n && Array.from({ length: n }).forEach(
        () => U.addEmptyWitness()
      ), !a) {
        F = !1;
        break;
      }
      const { maxFee: P } = await this.provider.estimateTxGasAndFee({
        transactionRequest: U,
        gasPrice: o
      }), H = Ov(
        t.inputs.filter(tn),
        A,
        A
      ), X = p.add(P);
      H.gt(X) ? F = !1 : S = [
        {
          amount: X.sub(H),
          assetId: A
        }
      ], R += 1;
    }
    if (F)
      throw new C(
        D.NOT_ENOUGH_FUNDS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
    await this.provider.validateTransaction(t), t.updatePredicateGasUsed(s);
    const N = Be(t);
    if (n && Array.from({ length: n }).forEach(() => N.addEmptyWitness()), !a)
      return t;
    const { maxFee: O } = await this.provider.estimateTxGasAndFee({
      transactionRequest: N,
      gasPrice: o
    });
    return t.maxFee = O, t;
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
  async createTransfer(t, r, n, s = {}) {
    let i = new Zr(s);
    return i = this.addTransfer(i, {
      destination: t,
      amount: r,
      assetId: n || await this.provider.getBaseAssetId()
    }), i = await this.estimateAndFundTransaction(i, s), i;
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
  async transfer(t, r, n, s = {}) {
    const i = await this.createTransfer(t, r, n, s);
    return this.sendTransaction(i, { estimateTxDependencies: !1 });
  }
  /**
   * Transfers multiple amounts of a token to multiple recipients.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @param txParams - Optional transaction parameters.
   * @returns A promise that resolves to a `TransactionResponse` object representing the transaction result.
   */
  async batchTransfer(t, r = {}) {
    let n = new Zr(r);
    return n = this.addBatchTransfer(n, t), n = await this.estimateAndFundTransaction(n, r), this.sendTransaction(n, { estimateTxDependencies: !1 });
  }
  /**
   * Adds a transfer to the given transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - The object representing the transfer to be made.
   * @returns The updated transaction request with the added transfer.
   */
  addTransfer(t, r) {
    const { destination: n, amount: s, assetId: i } = r;
    return this.validateTransferAmount(s), t.addCoinOutput(ct.fromAddressOrString(n), s, i), t;
  }
  /**
   * Adds multiple transfers to a script transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The updated script transaction request.
   */
  addBatchTransfer(t, r) {
    return r.forEach(({ destination: n, amount: s, assetId: i }) => {
      this.addTransfer(t, {
        destination: n,
        amount: s,
        assetId: i
      });
    }), t;
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
  async transferToContract(t, r, n, s = {}) {
    return this.batchTransferToContracts([{ amount: r, assetId: n, contractId: t }], s);
  }
  async batchTransferToContracts(t, r = {}) {
    let n = new Zr({
      ...r
    });
    const s = [], i = await this.provider.getBaseAssetId(), a = t.map((A) => {
      const p = x(A.amount), m = ct.fromAddressOrString(A.contractId), b = A.assetId ? Z(A.assetId) : i;
      if (p.lte(0))
        throw new C(
          D.INVALID_TRANSFER_AMOUNT,
          "Transfer amount must be a positive number."
        );
      return n.addContractInputAndOutput(m), s.push({ amount: p, assetId: b }), {
        amount: p,
        contractId: m.toB256(),
        assetId: b
      };
    }), { script: o, scriptData: u } = await W1(a);
    return n.script = o, n.scriptData = u, n = await this.estimateAndFundTransaction(n, r, { quantities: s }), this.sendTransaction(n);
  }
  /**
   * Withdraws an amount of the base asset to the base chain.
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(t, r, n = {}) {
    const s = ct.fromAddressOrString(t), i = Y(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), a = Y(
      "0x".concat(x(r).toHex().substring(2).padStart(16, "0"))
    ), u = { script: new Uint8Array([
      ...Y(zv.bytes),
      ...i,
      ...a
    ]), ...n }, A = await this.provider.getBaseAssetId();
    let p = new Zr(u);
    const m = [{ amount: x(r), assetId: A }], b = await this.getTransactionCost(p, { quantities: m });
    return p = this.validateGasLimitAndMaxFee({
      transactionRequest: p,
      gasUsed: b.gasUsed,
      maxFee: b.maxFee,
      txParams: n
    }), await this.fund(p, b), this.sendTransaction(p);
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
  async getTransactionCost(t, { signatureCallback: r, quantities: n = [] } = {}) {
    const s = Be(Se(t)), i = await this.provider.getBaseAssetId(), a = s.getCoinOutputsQuantities(), o = w_(a, n), u = [{ assetId: i, amount: x("100000000000000000") }], A = (b) => s.inputs.find((S) => S.type === It.Coin ? S.assetId === b : Hl(S) ? i === b : !1), p = (b, S) => {
      const F = A(b), R = S;
      F && "amount" in F ? F.amount = R : s.addResources(
        this.generateFakeResources([
          {
            amount: S,
            assetId: b
          }
        ])
      );
    };
    return w_(o, u).forEach(
      ({ amount: b, assetId: S }) => p(S, b)
    ), {
      ...await this.provider.getTransactionCost(s, {
        signatureCallback: r
      }),
      requiredQuantities: o
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
  async signMessage(t) {
    if (!this._connector)
      throw new C(D.MISSING_CONNECTOR, "A connector is required to sign messages.");
    return this._connector.signMessage(this.address.toString(), t);
  }
  /**
   * Signs a transaction from the account via the connector..
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature of the transaction.
   */
  async signTransaction(t) {
    if (!this._connector)
      throw new C(
        D.MISSING_CONNECTOR,
        "A connector is required to sign transactions."
      );
    return this._connector.signTransaction(this.address.toString(), t);
  }
  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(t, { estimateTxDependencies: r = !0, onBeforeSend: n, skipCustomFee: s = !1 } = {}) {
    if (this._connector)
      return this.provider.getTransactionResponse(
        await this._connector.sendTransaction(this.address.toString(), t, {
          onBeforeSend: n,
          skipCustomFee: s
        })
      );
    const i = Se(t);
    return r && await this.provider.estimateTxDependencies(i), this.provider.sendTransaction(i, {
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
  async simulateTransaction(t, { estimateTxDependencies: r = !0 } = {}) {
    const n = Se(t);
    return r && await this.provider.estimateTxDependencies(n), this.provider.simulate(n, { estimateTxDependencies: !1 });
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(t) {
    return t.map((r) => ({
      id: Z(Ue(Ps)),
      owner: this.address,
      blockCreated: x(1),
      txCreatedIdx: x(1),
      ...r
    }));
  }
  /** @hidden * */
  validateTransferAmount(t) {
    if (x(t).lte(0))
      throw new C(
        D.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
  }
  /** @hidden * */
  async estimateAndFundTransaction(t, r, n) {
    let s = t;
    const i = await this.getTransactionCost(s, n);
    return s = this.validateGasLimitAndMaxFee({
      transactionRequest: s,
      gasUsed: i.gasUsed,
      maxFee: i.maxFee,
      txParams: r
    }), s = await this.fund(s, i), s;
  }
  /** @hidden * */
  validateGasLimitAndMaxFee({
    gasUsed: t,
    maxFee: r,
    transactionRequest: n,
    txParams: { gasLimit: s, maxFee: i }
  }) {
    const a = Se(n);
    if (!fr(s))
      a.gasLimit = t;
    else if (t.gt(s))
      throw new C(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!fr(i))
      a.maxFee = r;
    else if (r.gt(i))
      throw new C(
        D.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${r}'.`
      );
    return a;
  }
}, Cn = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    Q(this, "address");
    Q(this, "publicKey");
    Q(this, "compressedPublicKey");
    Q(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = lr(e, 32);
    this.privateKey = Z(t), this.publicKey = Z(vr.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = Z(vr.getPublicKey(t, !0)), this.address = ct.fromPublicKey(this.publicKey);
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
  sign(e) {
    const t = vr.sign(Y(e), Y(this.privateKey)), r = lr(`0x${t.r.toString(16)}`, 32), n = lr(`0x${t.s.toString(16)}`, 32);
    return n[0] |= (t.recovery || 0) << 7, Z(at([r, n]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = vr.ProjectivePoint.fromHex(Y(this.compressedPublicKey)), r = vr.ProjectivePoint.fromHex(Y(e));
    return `0x${t.add(r).toHex(!0)}`;
  }
  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
  static recoverPublicKey(e, t) {
    const r = Y(t), n = r.slice(0, 32), s = r.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const o = new vr.Signature(BigInt(Z(n)), BigInt(Z(s))).addRecoveryBit(
      i
    ).recoverPublicKey(Y(e)).toRawBytes(!1).slice(1);
    return Z(o);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return ct.fromPublicKey(Cn.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? ze(at([Ue(32), Y(e)])) : Ue(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = vr.ProjectivePoint.fromHex(Y(e));
    return Z(t.toRawBytes(!1).slice(1));
  }
}, m_ = 13, y_ = 8, b_ = 1, ga = 32, J1 = 16, I_ = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function q1(e, t, r) {
  const n = Dr(I_(e), "hex"), s = ct.fromAddressOrString(t), i = Ue(ga), a = wh({
    password: Dr(r),
    salt: i,
    dklen: ga,
    n: 2 ** m_,
    r: y_,
    p: b_
  }), o = Ue(J1), u = await qp(n, a, o), A = Uint8Array.from([...a.subarray(16, 32), ...u]), p = mh(A), m = Mn(p, "hex"), b = {
    id: tg(),
    version: 3,
    address: I_(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: m,
      cipherparams: { iv: Mn(o, "hex") },
      ciphertext: Mn(u, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: ga,
        n: 2 ** m_,
        p: b_,
        r: y_,
        salt: Mn(i, "hex")
      }
    }
  };
  return JSON.stringify(b);
}
async function $1(e, t) {
  const r = JSON.parse(e), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: a, n: o, r: u, p: A, salt: p }
    }
  } = r, m = Dr(s, "hex"), b = Dr(i, "hex"), S = Dr(p, "hex"), F = Dr(t), R = wh({
    password: F,
    salt: S,
    n: o,
    p: A,
    r: u,
    dklen: a
  }), N = Uint8Array.from([...R.subarray(16, 32), ...m]), O = mh(N), z = Mn(O, "hex");
  if (n !== z)
    throw new C(
      D.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const M = await Jp(m, R, b);
  return Z(M);
}
var oA = class extends Ei {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, r) {
    const n = new Cn(t);
    super(n.address, r);
    /**
     * A function that returns the wallet's signer.
     */
    Q(this, "signer");
    this.signer = () => n;
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
  async signMessage(t) {
    const r = await this.signer().sign(rg(t));
    return Z(r);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const r = Se(t), n = await this.provider.getChainId(), s = r.getTransactionId(n), i = await this.signer().sign(s);
    return Z(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const r = Se(t), n = await this.signTransaction(r);
    return r.updateWitnessByOwner(this.address, n), r;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @param estimateTxDependencies - Whether to estimate the transaction dependencies.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: r = !1, enableAssetBurn: n } = {}) {
    const s = Se(t);
    return Wl(
      await this.provider.getBaseAssetId(),
      s,
      n
    ), r && await this.provider.estimateTxDependencies(s), this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(s),
      { estimateTxDependencies: !1, enableAssetBurn: n }
    );
  }
  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(t, { estimateTxDependencies: r = !0 } = {}) {
    const n = Se(t);
    return r && await this.provider.estimateTxDependencies(n), this.provider.dryRun(
      await this.populateTransactionWitnessesSignature(n),
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
  async encrypt(t) {
    return q1(this.privateKey, this.address, t);
  }
};
Nt(oA, "defaultPath", "m/44'/1179993420'/0'/0/0");
var ms = [
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
], K1 = /* @__PURE__ */ ((e) => (e.english = "english", e))(K1 || {});
function tC(e) {
  return (1 << e) - 1;
}
function cA(e) {
  return (1 << e) - 1 << 8 - e;
}
function wa(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function eC(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function rC(e) {
  const t = [0];
  let r = 11;
  for (let i = 0; i < e.length; i += 1)
    r > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], r -= 8) : (t[t.length - 1] <<= r, t[t.length - 1] |= e[i] >> 8 - r, t.push(e[i] & tC(8 - r)), r += 3);
  const n = e.length / 4, s = Y(Ce(e))[0] & cA(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
function nC(e, t) {
  const r = Math.ceil(11 * e.length / 8), n = Y(new Uint8Array(r));
  let s = 0;
  for (let A = 0; A < e.length; A += 1) {
    const p = t.indexOf(e[A].normalize("NFKD"));
    if (p === -1)
      throw new C(
        D.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[A]}' is not found in the provided wordlist.`
      );
    for (let m = 0; m < 11; m += 1)
      p & 1 << 10 - m && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, a = e.length / 3, o = cA(a);
  if ((Y(Ce(n.slice(0, i / 8)))[0] & o) !== (n[n.length - 1] & o))
    throw new C(
      D.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
var sC = gn("Bitcoin seed"), iC = "0x0488ade4", aC = "0x04358394", E_ = [12, 15, 18, 21, 24];
function v_(e) {
  if (e.length !== 2048)
    throw new C(
      D.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function oC(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new C(
      D.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function ma(e) {
  if (!E_.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${E_.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new C(D.INVALID_MNEMONIC, t);
  }
}
var Cr = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = ms) {
    Q(this, "wordlist");
    this.wordlist = e, v_(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return Cr.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return Cr.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = ms) {
    const r = wa(e);
    return ma(r), Z(nC(r, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = ms) {
    const r = Y(e);
    return v_(t), oC(r), rC(r).map((n) => t[n]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    ma(wa(e));
    const r = gn(eC(e)), n = gn(`mnemonic${t}`);
    return $p(r, n, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const r = Cr.mnemonicToSeed(e, t);
    return Cr.masterKeysFromSeed(r);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = wa(e);
    let r = 0;
    try {
      ma(t);
    } catch {
      return !1;
    }
    for (; r < t.length; ) {
      if (Cr.binarySearch(t[r]) === !1)
        return !1;
      r += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = ms;
    let r = 0, n = t.length - 1;
    for (; r <= n; ) {
      const s = Math.floor((r + n) / 2);
      if (t[s] === e)
        return !0;
      e < t[s] ? n = s - 1 : r = s + 1;
    }
    return !1;
  }
  /**
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, the default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static masterKeysFromSeed(e) {
    const t = Y(e);
    if (t.length < 16 || t.length > 64)
      throw new C(
        D.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return Y(yh("sha512", sC, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const r = Cr.masterKeysFromSeed(e), n = Y(t ? aC : iC), s = "0x00", i = "0x00000000", a = "0x00000000", o = r.slice(32), u = r.slice(0, 32), A = at([
      n,
      s,
      i,
      a,
      o,
      at(["0x00", u])
    ]), p = lo(Ce(Ce(A)), 0, 4);
    return $_(at([A, p]));
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
  static generate(e = 32, t = "") {
    const r = t ? Ce(at([Ue(e), Y(t)])) : Ue(e);
    return Cr.entropyToMnemonic(r);
  }
}, Wo = Cr, dA = 2147483648, uA = Z("0x0488ade4"), jo = Z("0x0488b21e"), _A = Z("0x04358394"), Jo = Z("0x043587cf");
function C_(e) {
  return $_(at([e, lo(Ce(Ce(e)), 0, 4)]));
}
function cC(e = !1, t = !1) {
  return e ? t ? Jo : jo : t ? _A : uA;
}
function dC(e) {
  return [jo, Jo].includes(Z(e.slice(0, 4)));
}
function uC(e) {
  return [uA, _A, jo, Jo].includes(
    Z(e.slice(0, 4))
  );
}
function _C(e, t = 0) {
  const r = e.split("/");
  if (r.length === 0 || r[0] === "m" && t !== 0)
    throw new C(D.HD_WALLET_ERROR, `invalid path - ${e}`);
  return r[0] === "m" && r.shift(), r.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + dA : parseInt(n, 10)
  );
}
var on = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    Q(this, "depth", 0);
    Q(this, "index", 0);
    Q(this, "fingerprint", Z("0x00000000"));
    Q(this, "parentFingerprint", Z("0x00000000"));
    Q(this, "privateKey");
    Q(this, "publicKey");
    Q(this, "chainCode");
    if (e.privateKey) {
      const t = new Cn(e.privateKey);
      this.publicKey = Z(t.compressedPublicKey), this.privateKey = Z(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new C(
          D.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = Z(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = lo(Kp(Ce(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
  deriveIndex(e) {
    const t = this.privateKey && Y(this.privateKey), r = Y(this.publicKey), n = Y(this.chainCode), s = new Uint8Array(37);
    if (e & dA) {
      if (!t)
        throw new C(
          D.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(Y(this.publicKey));
    s.set(lr(e, 4), 33);
    const i = Y(yh("sha512", n, s)), a = i.slice(0, 32), o = i.slice(32);
    if (t) {
      const m = x(a).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new on({
        privateKey: m,
        chainCode: o,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const A = new Cn(Z(a)).addPoint(r);
    return new on({
      publicKey: A,
      chainCode: o,
      index: e,
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
  derivePath(e) {
    return _C(e, this.depth).reduce((r, n) => r.deriveIndex(n), this);
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param isPublic - enable to export public extendedKey, it not required when HDWallet didn't have the privateKey.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  toExtendedKey(e = !1, t = !1) {
    if (this.depth >= 256)
      throw new C(
        D.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const r = cC(this.privateKey == null || e, t), n = Z(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = co(this.index, 4), a = this.chainCode, o = this.privateKey != null && !e ? at(["0x00", this.privateKey]) : this.publicKey, u = Y(at([r, n, s, i, a, o]));
    return C_(u);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Wo.masterKeysFromSeed(e);
    return new on({
      chainCode: Y(t.slice(32)),
      privateKey: Y(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = Z(lr(Qf(e))), r = Y(t), n = C_(r.slice(0, 78)) === e;
    if (r.length !== 82 || !uC(r))
      throw new C(D.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!n)
      throw new C(D.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = r[4], i = Z(r.slice(5, 9)), a = parseInt(Z(r.slice(9, 13)).substring(2), 16), o = Z(r.slice(13, 45)), u = r.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && a !== 0)
      throw new C(
        D.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (dC(r)) {
      if (u[0] !== 3)
        throw new C(D.HD_WALLET_ERROR, "Invalid public extended key.");
      return new on({
        publicKey: u,
        chainCode: o,
        index: a,
        depth: s,
        parentFingerprint: i
      });
    }
    if (u[0] !== 0)
      throw new C(D.HD_WALLET_ERROR, "Invalid private extended key.");
    return new on({
      privateKey: u.slice(1),
      chainCode: o,
      index: a,
      depth: s,
      parentFingerprint: i
    });
  }
}, ya = on, hA = class extends Ei {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Qe(e, this._provider);
  }
}, Qe = class extends oA {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Cn("0x00"), new hA(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = Cn.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Qe(t, e == null ? void 0 : e.provider);
  }
  /**
   * Create a Wallet Unlocked from a seed.
   *
   * @param seed - The seed phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromSeed(e, t, r) {
    const s = ya.fromSeed(e).derivePath(t || Qe.defaultPath);
    return new Qe(s.privateKey, r);
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
  static fromMnemonic(e, t, r, n) {
    const s = Wo.mnemonicToSeed(e, r), a = ya.fromSeed(s).derivePath(t || Qe.defaultPath);
    return new Qe(a.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const r = ya.fromExtendedKey(e);
    return new Qe(r.privateKey, t);
  }
  /**
   * Create a Wallet Unlocked from an encrypted JSON.
   *
   * @param jsonWallet - The encrypted JSON keystore.
   * @param password - The password to decrypt the JSON.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static async fromEncryptedJson(e, t, r) {
    const n = await $1(e, t);
    return new Qe(n, r);
  }
}, xe = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new hA(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Qe(e, t);
  }
};
Nt(xe, "generate", Qe.generate);
Nt(xe, "fromSeed", Qe.fromSeed);
Nt(xe, "fromMnemonic", Qe.fromMnemonic);
Nt(xe, "fromExtendedKey", Qe.fromExtendedKey);
Nt(xe, "fromEncryptedJson", Qe.fromEncryptedJson);
var hC = class {
  constructor() {
    Q(this, "storage", /* @__PURE__ */ new Map());
  }
  async getItem(e) {
    return await this.storage.get(e);
  }
  async setItem(e, t) {
    await this.storage.set(e, t);
  }
  async removeItem(e) {
    await this.storage.delete(e);
  }
  async clear() {
    await this.storage.clear();
  }
}, Gr, lA = class {
  constructor(e) {
    Sr(this, Gr, void 0), Nt(this, "pathKey", "{}"), Nt(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Nt(this, "numberOfAccounts", 0), We(this, Gr, e.secret || Wo.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Dt(this, Gr),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const r = xe.fromMnemonic(Dt(this, Gr), this.getDerivePath(t));
      e.push({
        publicKey: r.publicKey,
        address: r.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = xe.fromMnemonic(Dt(this, Gr), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const r = ct.fromAddressOrString(e);
    do {
      const n = xe.fromMnemonic(Dt(this, Gr), this.getDerivePath(t));
      if (n.address.equals(r))
        return n.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new C(
      D.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return xe.fromPrivateKey(t);
  }
};
Gr = /* @__PURE__ */ new WeakMap();
Nt(lA, "type", "mnemonic");
var Br, AA = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    Sr(this, Br, []), e.secret ? We(this, Br, [e.secret]) : We(this, Br, e.accounts || [xe.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Dt(this, Br)
    };
  }
  getPublicAccount(e) {
    const t = xe.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Dt(this, Br).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = xe.generate();
    return Dt(this, Br).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = ct.fromAddressOrString(e), r = Dt(this, Br).find(
      (n) => xe.fromPrivateKey(n).address.equals(t)
    );
    if (!r)
      throw new C(
        D.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return r;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return xe.fromPrivateKey(t);
  }
};
Br = /* @__PURE__ */ new WeakMap();
Nt(AA, "type", "privateKey");
var cr = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function dr(e, t) {
  if (!e)
    throw new C(D.WALLET_MANAGER_ERROR, t);
}
var Ne, Vr, $e, ro, fA, no, pA, gA = class extends Sl.EventEmitter {
  constructor(e) {
    super(), Sr(this, ro), Sr(this, no), Nt(this, "storage", new hC()), Nt(this, "STORAGE_KEY", "WalletManager"), Sr(this, Ne, []), Sr(this, Vr, ""), Sr(this, $e, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Dt(this, $e);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    dr(!Dt(this, $e), cr.wallet_not_unlocked);
    const t = Dt(this, Ne).find((r, n) => n === e);
    return dr(t, cr.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Dt(this, Ne).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Dt(this, Ne).flatMap(
      (e, t) => e.vault.getAccounts().map((r) => ({ ...r, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = ct.fromAddressOrString(e), r = Dt(this, Ne).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return dr(r, cr.address_not_found), r.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = ct.fromAddressOrString(e);
    dr(!Dt(this, $e), cr.wallet_not_unlocked);
    const r = Dt(this, Ne).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return dr(r, cr.address_not_found), r.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Dt(this, Ne)[(e == null ? void 0 : e.vaultId) || 0];
    await dr(t, cr.vault_not_found);
    const r = t.vault.addAccount();
    return await this.saveState(), r;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Dt(this, Ne).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), r = new t(e);
    We(this, Ne, Dt(this, Ne).concat({
      title: e.title,
      type: e.type,
      vault: r
    })), await this.saveState();
  }
  /**
   * Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
   * secrets.
   */
  lock() {
    We(this, $e, !0), We(this, Ne, []), We(this, Vr, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    We(this, Vr, e), We(this, $e, !1);
    try {
      await this.loadState(), this.emit("unlock");
    } catch (t) {
      throw await this.lock(), t;
    }
  }
  /**
   * Update WalletManager encryption passphrase
   */
  async updatePassphrase(e, t) {
    const r = Dt(this, $e);
    await this.unlock(e), We(this, Vr, t), await this.saveState(), await this.loadState(), r && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await dr(!Dt(this, $e), cr.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await Wp(Dt(this, Vr), JSON.parse(e));
      We(this, Ne, Wa(this, no, pA).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await dr(!Dt(this, $e), cr.wallet_not_unlocked);
    const e = await jp(Dt(this, Vr), {
      vaults: Wa(this, ro, fA).call(this, Dt(this, Ne))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = gA.Vaults.find((r) => r.type === e);
    return dr(t, cr.invalid_vault_type), t;
  }
}, lC = gA;
Ne = /* @__PURE__ */ new WeakMap();
Vr = /* @__PURE__ */ new WeakMap();
$e = /* @__PURE__ */ new WeakMap();
ro = /* @__PURE__ */ new WeakSet();
fA = function(e) {
  return e.map(({ title: t, type: r, vault: n }) => ({
    title: t,
    type: r,
    data: n.serialize()
  }));
};
no = /* @__PURE__ */ new WeakSet();
pA = function(e) {
  return e.map(({ title: t, type: r, data: n }) => {
    const s = this.getVaultClass(r);
    return {
      title: t,
      type: r,
      vault: new s(n)
    };
  });
};
Nt(lC, "Vaults", [lA, AA]);
var AC = class {
  constructor(e) {
    throw new C(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new C(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new C(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new C(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new C(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new C(D.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Nt(AC, "type");
var XB = class {
}, fC = 32, ve = 16, Pe = 17, sn = 18, pC = 8;
function wA(e) {
  const n = new DataView(e.buffer, 8, 8).getBigUint64(0, !1);
  return Number(n);
}
function gC(e, t) {
  const { RegId: r, Instruction: n } = Al, s = r.pc().to_u8(), i = r.sp().to_u8(), a = r.is().to_u8(), o = (R) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Xr(ve, s),
    // hold the address of the blob ID.
    tr(
      ve,
      ve,
      R * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Xr(Pe, i),
    // REG_GENERAL_USE to hold the size of the blob.
    Zs(sn, ve),
    // Push the blob contents onto the stack.
    Hn(ve, 0, sn, 1),
    // Move on to the data section length
    tr(ve, ve, fC),
    // load the size of the data section into REG_GENERAL_USE
    Jn(sn, ve, 0),
    // after we have read the length of the data section, we move the pointer to the actual
    // data by skipping WORD_SIZE bytes.
    tr(ve, ve, pC),
    // load the data section of the executable
    Hn(ve, 0, sn, 2),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    Ys(Pe, Pe, a),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    Xs(Pe, Pe, 4),
    // Jump to the start of the contract we loaded.
    Hs(Pe)
  ], u = (R) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Xr(ve, s),
    // hold the address of the blob ID.
    tr(
      ve,
      ve,
      R * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Xr(Pe, i),
    // REG_GENERAL_USE to hold the size of the blob.
    Zs(sn, ve),
    // Push the blob contents onto the stack.
    Hn(ve, 0, sn, 1),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    Ys(Pe, Pe, a),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    Xs(Pe, Pe, 4),
    // Jump to the start of the contract we loaded.
    Hs(Pe)
  ], A = wA(e);
  if (e.length < A)
    throw new Error(
      `Data section offset is out of bounds, offset: ${A}, binary length: ${e.length}`
    );
  const p = e.slice(A);
  if (p.length > 0) {
    const R = o(0).length;
    if (R > 65535)
      throw new Error("Too many instructions, exceeding u16::MAX.");
    const N = new Uint8Array(
      o(R).flatMap(
        (P) => Array.from(P.to_bytes())
      )
    ), O = new Uint8Array(t), z = new Uint8Array(8);
    new DataView(z.buffer).setBigUint64(0, BigInt(p.length), !1);
    const U = new Uint8Array([
      ...N,
      ...O,
      ...z
    ]);
    return {
      loaderBytecode: at([U, p]),
      blobOffset: U.length
    };
  }
  const m = u(0).length;
  if (m > 65535)
    throw new Error("Too many instructions, exceeding u16::MAX.");
  const b = new Uint8Array(
    u(m).flatMap(
      (R) => Array.from(R.to_bytes())
    )
  ), S = new Uint8Array(t);
  return { loaderBytecode: new Uint8Array([...b, ...S]) };
}
async function wC(e, t) {
  let r = x(0);
  const n = await e.provider.getChain(), s = await e.provider.estimateGasPrice(10), i = n.consensusParameters.feeParameters.gasPriceFactor, a = t.calculateMinGas(n), o = vn({
    gasPrice: s,
    gas: a,
    priceFactor: i,
    tip: t.tip
  }).add(1);
  if (r = r.add(o), r.gt(await e.getBalance()))
    throw new C(D.FUNDS_TOO_LOW, "Insufficient balance to deploy predicate.");
  const u = await e.getTransactionCost(t);
  return t.maxFee = u.maxFee, e.fund(t, u);
}
function mC(e, t) {
  const { configurables: r } = e, n = [];
  return r.forEach((s) => {
    n.push({ ...s, offset: s.offset - t });
  }), { ...e, configurables: n };
}
async function mA({
  deployer: e,
  bytecode: t,
  abi: r,
  loaderInstanceCallback: n
}) {
  const s = wA(Y(t)), i = t.slice(0, s), a = ze(i), o = new si({
    blobId: a,
    witnessIndex: 0,
    witnesses: [i]
  }), { loaderBytecode: u, blobOffset: A } = gC(
    Y(t),
    Y(a)
  ), p = i.length - (A || 0), m = mC(r, p), b = (await e.provider.getBlobs([a])).length > 0, S = n(u, m);
  if (b)
    return {
      waitForResult: () => Promise.resolve(S),
      blobId: a
    };
  const F = await wC(e, o);
  return {
    waitForResult: async () => {
      try {
        if ((await (await e.sendTransaction(F)).waitForResult()).status !== "success")
          throw new Error();
      } catch {
        throw new C(D.TRANSACTION_FAILED, "Failed to deploy predicate chunk");
      }
      return S;
    },
    blobId: a
  };
}
var yC = (e) => {
  const r = Y(e), n = W_(r, 16384), s = Tl(n.map((a) => Z(a)));
  return ze(at(["0x4655454C", s]));
}, ys = class extends Ei {
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
    bytecode: t,
    abi: r,
    provider: n,
    data: s,
    configurableConstants: i
  }) {
    const { predicateBytes: a, predicateInterface: o } = ys.processPredicateData(
      t,
      r,
      i
    ), u = ct.fromB256(yC(a));
    super(u, n);
    Q(this, "bytes");
    Q(this, "predicateData", []);
    Q(this, "interface");
    Q(this, "initialBytecode");
    Q(this, "configurableConstants");
    this.initialBytecode = Y(t), this.bytes = a, this.interface = o, this.configurableConstants = i, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const r = Se(t), n = this.getIndexFromPlaceholderWitness(r);
    return n !== -1 && r.removeWitness(n), r.inputs.filter(Xl).forEach((s) => {
      Ja(s, this.address) && (s.predicate = Z(this.bytes), s.predicateData = Z(this.getPredicateData()), s.witnessIndex = 0);
    }), r;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t) {
    const r = Se(t);
    return super.sendTransaction(r, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const r = Se(t);
    return super.simulateTransaction(r, { estimateTxDependencies: !1 });
  }
  getPredicateData() {
    var r;
    if (!this.predicateData.length)
      return new Uint8Array();
    const t = (r = this.interface) == null ? void 0 : r.functions.main;
    return (t == null ? void 0 : t.encodeArguments(this.predicateData)) || new Uint8Array();
  }
  /**
   * Creates a new Predicate instance from an existing Predicate instance.
   * @param overrides - The data and configurable constants to override.
   * @returns A new Predicate instance with the same bytecode, ABI and provider but with the ability to set the data and configurable constants.
   */
  toNewInstance(t = {}) {
    return new ys({
      bytecode: this.initialBytecode,
      abi: this.interface.jsonAbi,
      provider: this.provider,
      data: t.data ?? this.predicateData,
      configurableConstants: t.configurableConstants ?? this.configurableConstants
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
  static processPredicateData(t, r, n) {
    let s = Y(t);
    const i = new gr(r);
    if (i.functions.main === void 0)
      throw new C(
        D.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return n && Object.keys(n).length && (s = ys.setConfigurableConstants(
      s,
      n,
      i
    )), {
      predicateBytes: s,
      predicateInterface: i
    };
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(t, r) {
    return (await this.provider.getResourcesToSpend(
      this.address,
      t,
      r
    )).map((s) => ({
      ...s,
      predicate: Z(this.bytes),
      predicateData: Z(this.getPredicateData())
    }));
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(t) {
    return super.generateFakeResources(t).map((r) => ({
      ...r,
      predicate: Z(this.bytes),
      predicateData: Z(this.getPredicateData())
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
  static setConfigurableConstants(t, r, n) {
    const s = t;
    try {
      if (Object.keys(n.configurables).length === 0)
        throw new C(
          D.INVALID_CONFIGURABLE_CONSTANTS,
          "Predicate has no configurable constants to be set"
        );
      Object.entries(r).forEach(([i, a]) => {
        if (!(n != null && n.configurables[i]))
          throw new C(
            D.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${i}' found in the Predicate`
          );
        const { offset: o } = n.configurables[i], u = n.encodeConfigurable(i, a);
        s.set(u, o);
      });
    } catch (i) {
      throw new C(
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
  /**
   * Returns the index of the witness placeholder that was added to this predicate.
   * If no witness placeholder was added, it returns -1.
   * @param request - The transaction request.
   * @returns The index of the witness placeholder, or -1 if there is no witness placeholder.
   */
  getIndexFromPlaceholderWitness(t) {
    var i;
    const r = t.inputs.filter(tn).filter((a) => Ja(a, this.address));
    let n = -1;
    const s = r.find((a) => !a.predicate);
    return s && (n = s.witnessIndex, r.every((o) => !o.predicate) || (i = r[0]) != null && i.predicate && (n = -1)), n;
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
  async deploy(t) {
    return mA({
      deployer: t,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: (r, n) => new ys({
        bytecode: r,
        abi: n,
        provider: this.provider,
        data: this.predicateData
      })
    });
  }
}, yA = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(yA || {}), qo = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(qo || {}), bA = "FuelConnector", bC = class {
  constructor(e) {
    Q(this, "storage");
    this.storage = e;
  }
  async setItem(e, t) {
    this.storage.setItem(e, t);
  }
  async getItem(e) {
    return this.storage.getItem(e);
  }
  async removeItem(e) {
    this.storage.removeItem(e);
  }
  async clear() {
    this.storage.clear();
  }
}, IC = class extends Sl.EventEmitter {
  constructor() {
    super(...arguments);
    Q(this, "name", "");
    Q(this, "metadata", {});
    Q(this, "connected", !1);
    Q(this, "installed", !1);
    Q(this, "external", !0);
    Q(this, "events", qo);
  }
  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
  async signMessage(t, r) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
  async signTransaction(t, r) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
   * @returns The transaction id
   */
  async sendTransaction(t, r, n) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
  async addAssets(t) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
  async addAsset(t) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the add network process and return true if the network was added successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param networkUrl - The URL of the network to be added.
   * @returns Return true if the network was added successfully
   */
  async addNetwork(t) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the select network process and return true if the network has change successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param network - The network to be selected.
   * @returns Return true if the network was added successfully
   */
  async selectNetwork(t) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(t, r) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(t) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(t) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Event listener for the connector.
   *
   * @param eventName - The event name to listen
   * @param listener - The listener function
   */
  on(t, r) {
    return super.on(t, r), this;
  }
};
function EC(e, { cache: t, cacheTime: r, key: n }) {
  return async (...s) => {
    var a, o, u;
    if (t[n] && ((a = t[n]) != null && a.value))
      return (o = t[n]) == null ? void 0 : o.value;
    clearTimeout((u = t[n]) == null ? void 0 : u.timeout);
    const i = await e(...s);
    return t[n] = {
      timeout: Number(
        setTimeout(() => {
          t[n] = null;
        }, r)
      ),
      value: i
    }, i;
  };
}
function ZB(e) {
  window.dispatchEvent(
    new CustomEvent(bA, {
      detail: e
    })
  );
}
function vC() {
  const e = {};
  return e.promise = new Promise((t, r) => {
    e.reject = r, e.resolve = t;
  }), e;
}
async function bs(e, t = 1050) {
  const r = new Promise((n, s) => {
    setTimeout(() => {
      s(new C(C.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([r, e]);
}
var CC = 2e3, BC = 5e3, { warn: xC } = console, Gn = class extends IC {
  constructor(t = Gn.defaultConfig) {
    super();
    Q(this, "_storage", null);
    Q(this, "_connectors", []);
    Q(this, "_targetObject", null);
    Q(this, "_unsubscribes", []);
    Q(this, "_targetUnsubscribe", () => {
    });
    Q(this, "_pingCache", {});
    Q(this, "_currentConnector");
    Q(this, "_initializationPromise", null);
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    Q(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, r = bA;
      if (t != null && t.on)
        return t.on(r, this.addConnector), () => {
          var n;
          (n = t.off) == null || n.call(t, r, this.addConnector);
        };
      if (t != null && t.addEventListener) {
        const n = (s) => {
          this.addConnector(s.detail);
        };
        return t.addEventListener(r, n), () => {
          var s;
          (s = t.removeEventListener) == null || s.call(t, r, n);
        };
      }
      return () => {
      };
    });
    /**
     * Add a new connector to the list of connectors.
     */
    Q(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    Q(this, "triggerConnectorEvents", async () => {
      const [t, r, n] = await Promise.all([
        this.isConnected(),
        this.networks(),
        this.currentNetwork()
      ]);
      if (this.emit(this.events.connection, t), this.emit(this.events.networks, r), this.emit(this.events.currentNetwork, n), t) {
        const [s, i] = await Promise.all([
          this.accounts(),
          this.currentAccount()
        ]);
        this.emit(this.events.accounts, s), this.emit(this.events.currentAccount, i);
      }
    });
    /**
     * Get a connector from the list of connectors.
     */
    Q(this, "getConnector", (t) => this._connectors.find((r) => {
      const n = typeof t == "string" ? t : t.name;
      return r.name === n || r === t;
    }) || null);
    this.setMaxListeners(1e3), this._connectors = t.connectors ?? [], this._targetObject = this.getTargetObject(t.targetObject), this._storage = t.storage === void 0 ? this.getStorage() : t.storage, this.setupMethods(), this._initializationPromise = this.initialize();
  }
  async initialize() {
    try {
      const t = this.setDefaultConnector();
      this._targetUnsubscribe = this.setupConnectorListener(), await t;
    } catch {
      throw new C(D.INVALID_PROVIDER, "Error initializing Fuel Connector");
    }
  }
  async init() {
    return await this._initializationPromise, this;
  }
  /**
   * Return the target object to listen for global events.
   */
  getTargetObject(t) {
    return t || (typeof window < "u" ? window : typeof document < "u" ? document : null);
  }
  /**
   * Return the storage used.
   */
  getStorage() {
    if (typeof window < "u")
      return new bC(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var r, n;
    const t = await ((r = this._storage) == null ? void 0 : r.getItem(Gn.STORAGE_KEY)) || ((n = this._connectors[0]) == null ? void 0 : n.name);
    if (t)
      return this.selectConnector(t, {
        emitEvents: !1
      });
  }
  /**
   * Start listener for all the events of the current
   * connector and emit them to the Fuel instance
   */
  setupConnectorEvents(t) {
    if (!this._currentConnector)
      return;
    const r = this._currentConnector;
    this._unsubscribes.map((n) => n()), this._unsubscribes = t.map((n) => {
      const s = (...i) => this.emit(n, ...i);
      return r.on(n, s), () => r.off(n, s);
    });
  }
  /**
   * Call method from the current connector.
   */
  async callMethod(t, ...r) {
    const n = await this.hasConnector();
    if (await this.pingConnector(), !this._currentConnector || !n)
      throw new C(
        D.MISSING_CONNECTOR,
        `No connector selected for calling ${t}. Use hasConnector before executing other methods.`
      );
    if (typeof this._currentConnector[t] == "function")
      return this._currentConnector[t](...r);
  }
  /**
   * Create a method for each method proxy that is available on the Common interface
   * and call the method from the current connector.
   */
  setupMethods() {
    Object.values(yA).forEach((t) => {
      this[t] = async (...r) => this.callMethod(t, ...r);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const r = Date.now(), [n, s] = await Promise.allSettled([
      bs(t.isConnected()),
      bs(this.pingConnector(t))
    ]);
    return r < (t._latestUpdate || 0) || (t._latestUpdate = Date.now(), t.installed = s.status === "fulfilled" && s.value, t.connected = n.status === "fulfilled" && n.value), {
      installed: t.installed,
      connected: t.connected
    };
  }
  /**
   * Fetch the status of all connectors and set the installed and connected
   * status.
   */
  async fetchConnectorsStatus() {
    return Promise.all(
      this._connectors.map(async (t) => this.fetchConnectorStatus(t))
    );
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status. If no connector is provided it will ping the current connector.
   */
  async pingConnector(t) {
    const r = t || this._currentConnector;
    if (!r)
      return !1;
    try {
      return await EC(async () => bs(r.ping()), {
        key: r.name,
        cache: this._pingCache,
        cacheTime: BC
      })();
    } catch {
      throw new C(D.INVALID_PROVIDER, "Current connector is not available.");
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
  async selectConnector(t, r = {
    emitEvents: !0
  }) {
    var i, a;
    const n = this.getConnector(t);
    if (!n)
      return !1;
    if (((i = this._currentConnector) == null ? void 0 : i.name) === t)
      return !0;
    const { installed: s } = await this.fetchConnectorStatus(n);
    return s ? (this._currentConnector = n, this.emit(this.events.currentConnector, n), this.setupConnectorEvents(Object.values(qo)), await ((a = this._storage) == null ? void 0 : a.setItem(Gn.STORAGE_KEY, n.name)), r.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = vC();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), bs(t.promise, CC).then(() => !0).catch(() => !1);
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
  async getProvider(t) {
    return xC(
      "getProvider is deprecated and is going to be removed in the future, use getWallet instead."
    ), this._getProvider(t);
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   */
  async _getProvider(t) {
    let r;
    if (t && "getTransactionResponse" in t)
      r = t;
    else if (t && "chainId" in t && "url" in t)
      r = new ii(t.url);
    else {
      if (t)
        throw new C(D.INVALID_PROVIDER, "Provider is not valid.");
      {
        const n = await this.currentNetwork();
        r = new ii(n.url);
      }
    }
    return r;
  }
  /**
   * Return a Fuel Wallet Locked instance with extends features to work with
   * connectors.
   */
  async getWallet(t, r) {
    const n = await this._getProvider(r);
    return new Ei(t, n, this);
  }
  /**
   * Remove all open listeners this is useful when you want to
   * remove the Fuel instance and avoid memory leaks.
   */
  unsubscribe() {
    this._unsubscribes.map((t) => t()), this._targetUnsubscribe(), this.removeAllListeners();
  }
  /**
   * Clean all the data from the storage.
   */
  async clean() {
    var t;
    await ((t = this._storage) == null ? void 0 : t.removeItem(Gn.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, IA = Gn;
Nt(IA, "STORAGE_KEY", "fuel-current-connector");
Nt(IA, "defaultConfig", {});
var EA = class {
}, WB = class extends EA {
};
function B_(e, t) {
  if (!e)
    throw new C(D.TRANSACTION_ERROR, t);
}
function vA(e) {
  return e.reduce((t, r, n) => {
    const { program: s, externalAbis: i } = r.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var CA = (e, t, r) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = vA(r);
  return Zo(e, n, s);
}, Ke, O_, $o = (O_ = class {
  constructor(...e) {
    Ge(this, Ke);
    Je(this, Ke, e || []);
  }
  entries() {
    return Mt(this, Ke);
  }
  push(...e) {
    Mt(this, Ke).push(...e);
  }
  concat(e) {
    return Mt(this, Ke).concat(e);
  }
  extend(e) {
    Mt(this, Ke).push(...e);
  }
  toBytes() {
    return at(
      Mt(this, Ke).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return Z(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Mt(this, Ke), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Ke = new WeakMap(), O_), RC = (e) => xh + Bh({ maxInputs: e });
function SC(e) {
  const t = [...e.receipts];
  let r, n;
  if (t.forEach((i) => {
    i.type === ut.ScriptResult ? r = i : (i.type === ut.Return || i.type === ut.ReturnData || i.type === ut.Revert) && (n = i);
  }), !r || !n)
    throw new C(D.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: r.result,
    gasUsed: r.gasUsed,
    receipts: t,
    scriptResultReceipt: r,
    returnReceipt: n,
    callResult: e
  };
}
function Ko(e, t, r = []) {
  var n;
  try {
    const s = SC(e);
    return t(s);
  } catch (s) {
    if (s.code === D.SCRIPT_REVERTED) {
      const i = (n = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : n.reason;
      throw Yo({
        logs: r,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function TC(e, t, r) {
  return Ko(
    e,
    (n) => {
      if (n.returnReceipt.type === ut.Revert)
        throw new C(
          D.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(r)}`
        );
      if (n.returnReceipt.type !== ut.Return && n.returnReceipt.type !== ut.ReturnData) {
        const { type: i } = n.returnReceipt;
        throw new C(
          D.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: r,
            receipt: n.returnReceipt
          })}`
        );
      }
      let s;
      return n.returnReceipt.type === ut.Return && (s = n.returnReceipt.val), n.returnReceipt.type === ut.ReturnData && (s = t.func.decodeOutput(n.returnReceipt.data)[0]), s;
    },
    r
  );
}
var vi = class {
  /**
   * Creates an instance of the ScriptRequest class.
   *
   * @param bytes - The bytes of the script.
   * @param scriptDataEncoder - The script data encoder function.
   * @param scriptResultDecoder - The script result decoder function.
   */
  constructor(e, t, r) {
    /**
     * The bytes of the script.
     */
    Q(this, "bytes");
    /**
     * A function to encode the script data.
     */
    Q(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    Q(this, "scriptResultDecoder");
    this.bytes = Y(e), this.scriptDataEncoder = t, this.scriptResultDecoder = r;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return Bh({ maxInputs: t }) + xh + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return vi.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = Y(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return Ko(e, this.scriptResultDecoder, t);
  }
}, BA = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, NC = St, xA = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: r,
  assetIdOffset: n
}) => {
  const s = new $o(
    _n(16, e),
    _n(17, r),
    Jn(17, 17, 0),
    _n(18, n)
  );
  return t ? s.push(
    _n(19, t),
    Jn(19, 19, 0),
    Va(16, 17, 18, 19)
  ) : s.push(Va(16, 17, 18, h.cgas().to_u8())), s;
};
function x_(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new $o();
  for (let r = 0; r < e.length; r += 1)
    t.extend(xA(e[r]).entries());
  return t.push(Oo(1)), t.toBytes();
}
var DC = (e) => e === ut.Return || e === ut.ReturnData, QC = (e, t) => e.find(
  ({ type: r, id: n, to: s }) => r === ut.Call && n === NC && s === t
), FC = (e) => (t) => {
  if (xr(t.code) !== 0)
    throw new C(D.SCRIPT_REVERTED, "Transaction reverted.");
  const r = QC(
    t.receipts,
    e.toB256()
  ), n = x(r == null ? void 0 : r.is);
  return t.receipts.filter(({ type: i }) => DC(i)).flatMap((i) => n.eq(x(i.is)) ? i.type === ut.Return ? [new rt("u64").encode(i.val)] : i.type === ut.ReturnData ? [Y(i.data)] : [new Uint8Array()] : []);
}, OC = (e, t, r = []) => Ko(e, FC(t), r), MC = (e) => e.reduce(
  (t, r) => {
    const n = { ...BA };
    return r.gas && (n.gasForwardedOffset = 1), t + xA(n).byteLength();
  },
  L.size()
  // placeholder for single RET instruction which is added later
), LC = (e, t) => new vi(
  // Script to call the contract, start with stub size matching length of calls
  x_(new Array(e.length).fill(BA)),
  (r) => {
    var S;
    const n = r.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = MC(r), i = (8 - s % 8) % 8, a = s + i, o = RC(t.toNumber()) + a, u = [];
    let A = o;
    const p = [];
    for (let F = 0; F < n; F += 1) {
      const R = r[F], N = A, O = N + dt, z = O + Zn, M = z + Qa + dt + dt, U = M + R.fnSelectorBytes.byteLength, P = Y(R.data);
      let H = 0;
      p.push(new rt("u64").encode(R.amount || 0)), p.push(new st().encode(((S = R.assetId) == null ? void 0 : S.toString()) || St)), p.push(R.contractId.toBytes()), p.push(new rt("u64").encode(M)), p.push(new rt("u64").encode(U)), p.push(R.fnSelectorBytes), p.push(P), R.gas && (p.push(new rt("u64").encode(R.gas)), H = U + P.byteLength);
      const X = {
        amountOffset: N,
        assetIdOffset: O,
        gasForwardedOffset: H,
        callDataOffset: z
      };
      u.push(X), A = o + at(p).byteLength;
    }
    const m = x_(u);
    return { data: at(p), script: m };
  },
  () => [new Uint8Array()]
), RA = (e, t, r, n) => {
  var o;
  const s = (o = e[0]) == null ? void 0 : o.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return TC({ receipts: t }, s, n);
  const a = OC(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    n
  ).map((u, A) => {
    var m;
    const { func: p } = e[A].getCallConfig();
    return (m = p.decodeOutput(u)) == null ? void 0 : m[0];
  });
  return r ? a : a == null ? void 0 : a[0];
}, PC = async (e) => {
  var S;
  const { funcScope: t, isMultiCall: r, program: n, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: a } = i, o = Array.isArray(t) ? t : [t], u = (S = o[0]) == null ? void 0 : S.getCallConfig(), A = CA(a, u, o), p = RA(o, a, r, A), m = yi(a);
  return {
    isMultiCall: r,
    functionScopes: o,
    value: p,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: A,
    gasUsed: m
  };
}, ba = (e) => {
  var m;
  const { funcScopes: t, callResult: r, isMultiCall: n } = e, { receipts: s } = r, i = Array.isArray(t) ? t : [t], a = (m = i[0]) == null ? void 0 : m.getCallConfig(), o = CA(s, a, i), u = RA(i, s, n, o), A = yi(s);
  return {
    functionScopes: i,
    callResult: r,
    isMultiCall: n,
    gasUsed: A,
    value: u
  };
};
function kC(e) {
  const { program: t, args: r, forward: n, func: s, callParameters: i, externalAbis: a } = e.getCallConfig(), o = s.encodeArguments(r);
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
var SA = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    Q(this, "transactionRequest");
    Q(this, "program");
    Q(this, "functionInvocationScopes", []);
    Q(this, "txParameters");
    Q(this, "requiredCoins", []);
    Q(this, "isMultiCall", !1);
    Q(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    Q(this, "externalAbis", {});
    Q(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Zr();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    return this.functionInvocationScopes.map((e) => kC(e));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  async updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = await e.getChain(), r = LC(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(r, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (r) => this.transactionRequest.addContractInputAndOutput(ct.fromB256(r))
      );
    });
  }
  /**
   * Gets the required coins for the transaction.
   *
   * @returns An array of required coin quantities.
   */
  getRequiredCoins() {
    return this.calls.map((t) => ({
      assetId: String(t.assetId),
      amount: x(t.amount || 0)
    })).filter(({ assetId: t, amount: r }) => t && !x(r).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (r, { assetId: n, amount: s }) => {
      var a;
      const i = ((a = r.get(n)) == null ? void 0 : a.amount) || x(0);
      return r.set(n, {
        assetId: String(n),
        amount: i.add(s)
      });
    };
    this.requiredCoins = Array.from(
      e.reduce(t, /* @__PURE__ */ new Map()).values()
    );
  }
  /**
   * Adds a single call to the invocation scope.
   *
   * @param funcScope - The function scope to add.
   * @returns The current instance of the class.
   */
  addCall(e) {
    return this.addCalls([e]), this;
  }
  /**
   * Adds multiple calls to the invocation scope.
   *
   * @param funcScopes - An array of function scopes to add.
   * @returns The current instance of the class.
   */
  addCalls(e) {
    return this.functionInvocationScopes.push(...e), this.updateContractInputAndOutput(), this.updateRequiredCoins(), this;
  }
  /**
   * Prepares the transaction by updating the script request, required coins, and checking the gas limit.
   */
  async prepareTransaction() {
    await gi(), await this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Et.Script && (this.transactionRequest.abis = vA(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, r) => t.add(r.gas || 0), x(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new C(
        D.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost for dry running the transaction.
   *
   * @param options - Optional transaction cost options.
   * @returns The transaction cost details.
   */
  async getTransactionCost() {
    const e = Be(await this.getTransactionRequest());
    return (this.program.account ?? xe.generate({ provider: this.getProvider() })).getTransactionCost(e, {
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
    var a;
    let e = await this.getTransactionRequest();
    e = Be(e);
    const t = await this.getTransactionCost(), { gasUsed: r, missingContractIds: n, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, r, i), e.inputs = e.inputs.filter((o) => o.type !== It.Coin), n.forEach((o) => {
      e.addContractInputAndOutput(ct.fromString(o));
    }), e.addVariableOutputs(s), await ((a = this.program.account) == null ? void 0 : a.fund(e, t)), this.addSignersCallback && await this.addSignersCallback(e), e;
  }
  /**
   * Sets the transaction parameters.
   *
   * @param txParams - The transaction parameters to set.
   * @returns The current instance of the class.
   */
  txParams(e) {
    var r;
    this.txParameters = e;
    const t = this.transactionRequest;
    return t.tip = x(e.tip || t.tip), t.gasLimit = x(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? x(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? x(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
  }
  /**
   * Adds contracts to the invocation scope.
   *
   * @param contracts - An array of contracts to add.
   * @returns The current instance of the class.
   */
  addContracts(e) {
    return e.forEach((t) => {
      this.transactionRequest.addContractInputAndOutput(t.id), this.externalAbis[t.id.toB256()] = t.interface.jsonAbi;
    }), this;
  }
  /**
   * Adds an asset transfer to an Account on the contract call transaction request.
   *
   * @param transferParams - The object representing the transfer to be made.
   * @returns The current instance of the class.
   */
  addTransfer(e) {
    const { amount: t, destination: r, assetId: n } = e;
    return this.transactionRequest = this.transactionRequest.addCoinOutput(
      ct.fromAddressOrString(r),
      t,
      n
    ), this;
  }
  /**
   * Adds multiple transfers to the contract call transaction request.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The current instance of the class.
   */
  addBatchTransfer(e) {
    return e.forEach(({ destination: t, amount: r, assetId: n }) => {
      this.transactionRequest = this.transactionRequest.addCoinOutput(
        ct.fromAddressOrString(t),
        r,
        n
      );
    }), this;
  }
  addSigners(e) {
    return this.addSignersCallback = (t) => t.addAccountWitnesses(e), this;
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
    B_(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: t.id,
      waitForResult: async () => PC({
        funcScope: this.functionInvocationScopes,
        isMultiCall: this.isMultiCall,
        program: this.program,
        transactionResponse: t
      })
    };
  }
  /**
   * Simulates a transaction.
   *
   * @returns The result of the invocation call.
   */
  async simulate() {
    if (B_(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new C(
        D.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return ba({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return ba({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return ba({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
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
  async getTransactionId(e) {
    const t = e ?? await this.getProvider().getChainId();
    return (await this.getTransactionRequest()).getTransactionId(t);
  }
  /**
   * In case the gasLimit is *not* set by the user, this method sets a default value.
   */
  setDefaultTxParams(e, t, r) {
    var o, u;
    const n = fr((o = this.txParameters) == null ? void 0 : o.gasLimit) || this.hasCallParamsGasLimit, s = fr((u = this.txParameters) == null ? void 0 : u.maxFee), { gasLimit: i, maxFee: a } = e;
    if (!n)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new C(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = r;
    else if (r.gt(a))
      throw new C(
        D.MAX_FEE_TOO_LOW,
        `Max fee '${a}' is lower than the required: '${r}'.`
      );
  }
}, TA = class extends SA {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, r, n) {
    super(t, !1);
    Q(this, "func");
    Q(this, "callParameters");
    Q(this, "forward");
    Q(this, "args");
    this.func = r, this.args = n || [], this.setArguments(...n), super.addCall(this);
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
  setArguments(...t) {
    return this.args = t || [], this;
  }
  /**
   * Sets the call parameters for the function invocation.
   *
   * @param callParams - The call parameters.
   * @returns The instance of FunctionInvocationScope.
   * @throws If the function is not payable and forward is set.
   */
  callParams(t) {
    if (!this.hasCallParamsGasLimit && (t == null ? void 0 : t.gasLimit) !== void 0 && (this.hasCallParamsGasLimit = !0), this.callParameters = t, t != null && t.forward) {
      if (!this.func.attributes.find((r) => r.name === "payable"))
        throw new C(
          D.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Po(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, UC = class extends SA {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(e, t) {
    super(e, !0), this.addCalls(t);
  }
  /**
   * Adds a single function invocation scope to the multi-call invocation scope.
   *
   * @param funcScope - The function invocation scope.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCall(e) {
    return super.addCalls([e]);
  }
  /**
   * Adds multiple function invocation scopes to the multi-call invocation scope.
   *
   * @param funcScopes - An array of function invocation scopes.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCalls(e) {
    return super.addCalls(e);
  }
}, so = class {
  /**
   * Creates an instance of the Contract class.
   *
   * @param id - The contract's address.
   * @param abi - The contract's ABI (JSON ABI or Interface instance).
   * @param accountOrProvider - The account or provider for interaction.
   */
  constructor(e, t, r) {
    /**
     * The unique contract identifier.
     */
    Q(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    Q(this, "provider");
    /**
     * The contract's ABI interface.
     */
    Q(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    Q(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    Q(this, "functions", {});
    this.interface = t instanceof gr ? t : new gr(t), this.id = ct.fromAddressOrString(e), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), Object.keys(this.interface.functions).forEach((n) => {
      const s = this.interface.getFunction(n);
      Object.defineProperty(this.functions, s.name, {
        value: this.buildFunction(s),
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
  buildFunction(e) {
    return (() => {
      const t = (...r) => new TA(this, e, r);
      return Object.defineProperty(t, "isReadOnly", {
        value: () => e.isReadOnly(),
        writable: !1
      }), t;
    })();
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(e) {
    return new UC(this, e);
  }
  /**
   * Get the balance for a given asset ID for this contract.
   *
   * @param assetId - The specified asset ID.
   * @returns The balance of the contract for the specified asset.
   */
  getBalance(e) {
    return this.provider.getContractBalance(this.id, e);
  }
}, zC = class extends TA {
  constructor() {
    super(...arguments);
    Q(this, "scriptRequest");
  }
  async updateScriptRequest() {
    this.scriptRequest || await this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  async buildScriptRequest() {
    const t = this.program.bytes;
    if (!await this.program.provider.getChain())
      throw new C(
        C.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `new Provider()`"
      );
    this.scriptRequest = new vi(
      t,
      (n) => this.func.encodeArguments(n),
      () => []
    );
  }
}, GC = class extends EA {
}, VC = class extends GC {
  /**
   * Create a new instance of the Script class.
   *
   * @param bytecode - The compiled bytecode of the script.
   * @param abi - The ABI interface for the script.
   * @param account - The account associated with the script.
   */
  constructor(t, r, n) {
    super();
    /**
     * The compiled bytecode of the script.
     */
    Q(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    Q(this, "interface");
    /**
     * The account associated with the script.
     */
    Q(this, "account");
    /**
     * The script request object.
     */
    Q(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    Q(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    Q(this, "functions");
    this.bytes = Y(t), this.interface = new gr(r), this.provider = n.provider, this.account = n, this.functions = {
      main: (...s) => new zC(this, this.interface.getFunction("main"), s)
    };
  }
  /**
   * Set the configurable constants of the script.
   *
   * @param configurables - An object containing the configurable constants and their values.
   * @throws Will throw an error if the script has no configurable constants to be set or if an invalid constant is provided.
   * @returns This instance of the `Script`.
   */
  setConfigurableConstants(t) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new C(
          C.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          "The script does not have configurable constants to be set"
        );
      Object.entries(t).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new C(
            C.CODES.CONFIGURABLE_NOT_FOUND,
            `The script does not have a configurable constant named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n);
        this.bytes.set(i, s);
      });
    } catch (r) {
      throw new C(
        C.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${r.message}.`
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
  deploy(t) {
    return mA({
      deployer: t,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: (r, n) => new VC(r, n, this.account)
    });
  }
};
new vi(
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
function jB(e) {
  return e;
}
var YC = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(YC || {}), HC = Object.defineProperty, XC = (e, t) => {
  for (var r in t)
    HC(e, r, { get: t[r], enumerable: !0 });
}, ZC = (e) => {
  const { RegId: t, Instruction: r } = Al, n = 12, s = e.length, i = pr, a = at(e.map((u) => Y(u))), o = new $o(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    Xr(16, t.pc().to_u8()),
    // 0x10 to hold the address of the current blob id
    tr(16, 16, n * r.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    Xr(22, t.sp().to_u8()),
    // loop counter
    _n(19, s),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    Zs(17, 16),
    // push the blob contents onto the stack
    Hn(16, 0, 17, 1),
    // move on to the next blob
    tr(16, 16, i),
    // decrement the loop counter
    ol(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    dl(19, t.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    Ys(22, 22, t.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    Xs(22, 22, 4),
    // jump to the start of the contract we loaded
    Hs(22)
  ).toBytes();
  return at([o, a]);
}, WC = (e, t) => {
  const r = [];
  for (let n = 0, s = 0; n < e.length; n += t, s++) {
    let i = e.slice(n, n + t), a = i.length;
    a % dt !== 0 && (i = at([i, new Uint8Array(t - i.length)]), a = i.length), r.push({ id: s, size: a, bytecode: i });
  }
  return r;
}, jC = {};
XC(jC, {
  getContractId: () => QA,
  getContractRoot: () => NA,
  getContractStorageRoot: () => DA,
  hexlifyWithPrefix: () => io
});
var NA = (e) => {
  const r = Y(e), n = W_(r, 16384);
  return Tl(n.map((s) => Z(s)));
}, DA = (e) => {
  const t = new _E();
  return e.forEach(({ key: r, value: n }) => t.update(Ce(r), n)), t.root;
}, QA = (e, t, r) => {
  const n = NA(Y(e));
  return Ce(at(["0x4655454C", t, n, r]));
}, io = (e) => Z(e.startsWith("0x") ? e : `0x${e}`), R_ = 0.95, FA = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, r = null, n = []) {
    Q(this, "bytecode");
    Q(this, "interface");
    Q(this, "provider");
    Q(this, "account");
    Q(this, "storageSlots");
    this.bytecode = Y(e), t instanceof gr ? this.interface = t : this.interface = new gr(t), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), this.storageSlots = n;
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new FA(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    const t = ((e == null ? void 0 : e.storageSlots) ?? []).concat(this.storageSlots).map(({ key: o, value: u }) => ({
      key: io(o),
      value: io(u)
    })).filter((o, u, A) => A.findIndex((p) => p.key === o.key) === u).sort(({ key: o }, { key: u }) => o.localeCompare(u)), r = {
      salt: Ue(32),
      ...e ?? {},
      storageSlots: t
    };
    if (!this.provider)
      throw new C(
        D.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const n = (e == null ? void 0 : e.bytecode) || this.bytecode, s = r.stateRoot || DA(r.storageSlots), i = QA(n, r.salt, s), a = new qa({
      bytecodeWitnessIndex: 0,
      witnesses: [n],
      ...r
    });
    return a.addContractCreatedOutput(i, s), {
      contractId: i,
      transactionRequest: a
    };
  }
  /**
   * Takes a transaction request, estimates it and funds it.
   *
   * @param request - the request to fund.
   * @param options - options for funding the request.
   * @returns a funded transaction request.
   */
  async fundTransactionRequest(e, t = {}) {
    const r = this.getAccount(), { maxFee: n } = t, s = await r.getTransactionCost(e);
    if (fr(n)) {
      if (s.maxFee.gt(n))
        throw new C(
          D.MAX_FEE_TOO_LOW,
          `Max fee '${t.maxFee}' is lower than the required: '${s.maxFee}'.`
        );
    } else
      e.maxFee = s.maxFee;
    return await r.fund(e, s), e;
  }
  /**
   * Deploy a contract of any length with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deploy(e = {}) {
    const t = this.getAccount(), { consensusParameters: r } = await t.provider.getChain(), n = r.contractParameters.contractMaxSize.toNumber();
    return this.bytecode.length > n ? this.deployAsBlobTx(e) : this.deployAsCreateTx(e);
  }
  /**
   * Deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsCreateTx(e = {}) {
    const t = this.getAccount(), { consensusParameters: r } = await t.provider.getChain(), n = r.contractParameters.contractMaxSize.toNumber();
    if (this.bytecode.length > n)
      throw new C(
        D.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Please use `deployAsBlobTx` instead."
      );
    const { contractId: s, transactionRequest: i } = await this.prepareDeploy(e), a = await t.sendTransaction(i);
    return {
      contractId: s,
      waitForTransactionId: () => Promise.resolve(a.id),
      waitForResult: async () => {
        const u = await a.waitForResult();
        return { contract: new so(s, this.interface, t), transactionResult: u };
      }
    };
  }
  /**
   * Chunks and deploys a contract via a loader contract. Suitable for deploying contracts larger than the max contract size.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsBlobTx(e = {
    chunkSizeMultiplier: R_
  }) {
    const t = this.getAccount(), { configurableConstants: r, chunkSizeMultiplier: n } = e;
    r && this.setConfigurableConstants(r);
    const s = await this.getMaxChunkSize(e, n), i = WC(Y(this.bytecode), s).map((P) => {
      const H = this.blobTransactionRequest({
        ...e,
        bytecode: P.bytecode
      });
      return {
        ...P,
        transactionRequest: H,
        blobId: H.blobId
      };
    }), a = i.map(({ blobId: P }) => P), o = ZC(a), { contractId: u, transactionRequest: A } = this.createTransactionRequest({
      bytecode: o,
      ...e
    }), p = [...new Set(a)], m = await t.provider.getBlobs(p), b = p.filter((P) => !m.includes(P));
    let S = x(0);
    const F = await t.provider.getChain(), R = await t.provider.estimateGasPrice(10), N = F.consensusParameters.feeParameters.gasPriceFactor;
    for (const { transactionRequest: P, blobId: H } of i) {
      if (b.includes(H)) {
        const k = P.calculateMinGas(F), it = vn({
          gasPrice: R,
          gas: k,
          priceFactor: N,
          tip: P.tip
        }).add(1);
        S = S.add(it);
      }
      const X = A.calculateMinGas(F), V = vn({
        gasPrice: R,
        gas: X,
        priceFactor: N,
        tip: A.tip
      }).add(1);
      S = S.add(V);
    }
    if (S.gt(await t.getBalance()))
      throw new C(D.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    let O;
    const z = new Promise((P) => {
      O = P;
    });
    return { waitForResult: async () => {
      const P = [];
      for (const { blobId: k, transactionRequest: it } of i)
        if (!P.includes(k) && b.includes(k)) {
          const W = await this.fundTransactionRequest(
            it,
            e
          );
          let j;
          try {
            j = await (await t.sendTransaction(W)).waitForResult();
          } catch (v) {
            if (v.message.indexOf(`BlobId is already taken ${k}`) > -1) {
              P.push(k);
              continue;
            }
            throw new C(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          }
          if (!j.status || j.status !== $l.success)
            throw new C(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          P.push(k);
        }
      await this.fundTransactionRequest(A, e), O(A.getTransactionId(await t.provider.getChainId()));
      const X = await (await t.sendTransaction(A)).waitForResult();
      return { contract: new so(u, this.interface, t), transactionResult: X };
    }, contractId: u, waitForTransactionId: () => z };
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new C(
          D.CONFIGURABLE_NOT_FOUND,
          "Contract does not have configurables to be set"
        );
      Object.entries(e).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new C(
            D.CONFIGURABLE_NOT_FOUND,
            `Contract does not have a configurable named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n), a = Y(this.bytecode);
        a.set(i, s), this.bytecode = a;
      });
    } catch (t) {
      throw new C(
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new C(D.ACCOUNT_REQUIRED, "Account not assigned to contract.");
    return this.account;
  }
  async prepareDeploy(e) {
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: r, transactionRequest: n } = this.createTransactionRequest(e);
    return await this.fundTransactionRequest(n, e), {
      contractId: r,
      transactionRequest: n
    };
  }
  /**
   * Create a blob transaction request, used for deploying contract chunks.
   *
   * @param options - options for creating a blob transaction request.
   * @returns a populated BlobTransactionRequest.
   */
  blobTransactionRequest(e) {
    const { bytecode: t } = e;
    return new si({
      blobId: ze(t),
      witnessIndex: 0,
      witnesses: [t],
      ...e
    });
  }
  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  async getMaxChunkSize(e, t = R_) {
    if (t < 0 || t > 1)
      throw new C(
        D.INVALID_CHUNK_SIZE_MULTIPLIER,
        "Chunk size multiplier must be between 0 and 1"
      );
    const r = this.getAccount(), { consensusParameters: n } = await r.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber(), i = n.txParameters.maxSize.toNumber(), a = 64e3, o = i < s ? i : s, u = o < a ? o : a, A = this.blobTransactionRequest({
      ...e,
      bytecode: Ue(32)
    }).addResources(
      r.generateFakeResources([
        { assetId: await r.provider.getBaseAssetId(), amount: x(1) }
      ])
    ), p = (u - A.byteLength() - dt) * t;
    return Math.round(p / dt) * dt;
  }
}, JB = 9, qB = 3, $B = 9, KB = 9, t2 = 18, e2 = 15, r2 = 12, n2 = 9, s2 = "https://devnet.fuel.network/v1/graphql", i2 = "https://testnet.fuel.network/v1/graphql", JC = Object.defineProperty, qC = (e, t, r) => t in e ? JC(e, t, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: r
}) : e[t] = r, tc = (e, t, r) => (qC(e, typeof t != "symbol" ? t + "" : t, r), r), OA = {
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
}, $C = [
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
], ai = class extends so {
  constructor(e, t) {
    super(e, OA, t);
  }
};
tc(ai, "abi", OA);
tc(ai, "storageSlots", $C);
var MA = Mf(
  "H4sIAAAAAAAAA9Vbe3Abx3lfgCAFvayz+TAFSjaUUjJkRwosUQ4ly9IhIATSEM2DSVpUGBhg64c0cSyIlVQ5tsccN001aSZlHcdlO06GrtOp6z4GAB+C7T7YR2bUiTtlZhxbTeMWmiatFAst60YZqm6j/r5v93DHw4GOJ84f0QznFne73+5+j9/32FVgISxOCOEV/K/Dn7o259GuXRO/JcSQ8c6CML4nwkZJF8HFnWLovZLXeK/kOyG89+JbGN9C+BZe+q2uEfRE4LIBGiv1VHThdi0i5gJdGTHa7TW0WNNY4JLmoFfXE4jPi3T5ep/q112j337Vr8WIF3PV373nAol5YfTls6OG8Id6m9E3+DG0tVB5F96/onG7b0akejWh9XaMpWNhYcSnL44exPv49JzLnNtoTtDMpMvaR0FvmxHPaaPd6B/rGDMSxRCP7WmaMxJ5I10Wt47qYg2etxnR/CJ/i7Tj29nuSr/42Tlux3yYLygC36+aMxiIzotTuuck+LeD+If9hoxEIQS6MdDX8DxgRAudNvrzNvql96Hvl/TFJdDfaaPfDbo9oL8az7tBf8hGf8GiXxTL0/cuKPpPg36Hjf4R0O1V678H9E9b9IuaRX+m9X3on1f0HwD9XTb6Z0A3Cfrr8LwX9Ccs+jOWnOIzkm+16c8p+juXvl/9f0Z0GnonHP19CeqfigmR6hGeVER4jb5Z7FH7a+jL32Atf2tEp84ELoUxV9XYQzQWOnVO6pRvzIi+AhugdTehPVtpV8/r/TyPTcxWdIv246CfIf3dHNGEES0GjXihRHSq9+z5slrHBOYLy3XkJ7nN6zg7brar17F6c0AXYjP+lr5fNWW+x/4nqsc1PK3mHLLmLGatOaddxtSxboHPsGHF6/7Zc6MDGJNs1o347CJ4/i/pcrgEvl/AvOcCl3Teb+CCk5b/tmq5zVyE3P4cNP4C4/8S40+7y63uklr7GUtuReKXktuMfxm5tSq5ST10lVvdu6bcoON3KB0PGokpjTAq8H1nf8/vME4lcoRlQann+TFux9rnHLTfgQ2QzuCbbw57PgJcDIZ660lOYab/PejIBez77aq1vyH3nfdjfDePjxaL3I5gzmh+Pn1Z22P0Cr+kuRnYOTuEdjfhMeQziXYoFKsXkq9OPVxxCnbrH+3C2Eg75Dnt5geO0V5TPeBNr+ZJxTTowNkh6EAwlKzXoaunIb//hA4sQJb/ZcSnFqUO0J6ctPyHXXRgHuNeBY3XoAN/Bj08X0MHjigd6LZ0oPCSKXfIbX0qnhtMJXL3dXh891q2MA0ZOmmt/JaiFcR48If1qZPb0haOuNjCtiW2kBTe1CDah9U+0oXiaAbjUy0C6/A1xjRxqktsT0VzhxojQge+ebHGwB28pkLRiAi/EX8lyHyMgY/xmUnwYBp8nEmX9VkjMW0ELpLukS059c/7lotMNJtMwqD1b6D17+DtRcgEOFRLJit+6JQJYgoN6wG+G/l0OVOAXKbAk87ARYll1bbtnXKRaxFzn8U68BSvYDywwU2u3neVLM7bbDtj2fb0Ym3b9mxStl3xN9W27X3PtO2vCHHzc34zXhKTgeikCMTHRSAxJgJ9JWH052CP5h6dcZgI8B4jAnGOWIv1HjGiuU6JD851iTbqC7sKh8o+yCOX5XZ02mr3+PTAD4V4htZxNSwmsK7fxvruXhS0zhXmOuUasb5ESaTB38AVzHc1aPZfofo/Ze3Lc5HHDGNfh0qw+6q1fZL40QjdOdUt7sZTx3M1/Li3MdJEfthzB2JKrHMB6/RChjch1jpjrhnjd5PfAu40utCOUkzY2BsUpw6KGxt7gkRb0kvkzmHMesR2uuRx2Dm2i2XZB5s08TESlLgWoXgyn8EaQ6HedoqhbwC9bPqyuA7vgzXohVkGhLtl4CbRonZ0Ghhs0TIiGvkO2D3Fl9inTvtsIswtcjvG89WDHzrmg83ivfKf/P1wE2SSgRzB96uGKZenlFwq+iblWJL40RMkDBEUN2u9u0Q6Aru4gtjoqubUA7u+ZphGAnKFrpKtMW/KhPM5ndtxxNrqvRZDPM5xCPhJ+A7d4yfpHeaC3mVc9M4+H3x/lX1ka9nHSSH+2GYfrZgXtrhUP9AnyrqXhO4ZogUYqQMjpX4A16EfKzEHYgCao4r+J1ievGfSDciN2tEZWtcEyzPZZMoqCFn5+H0XvWcbPMftSJfVtmxwwYUXdVWyw94CV/BnyanOaa/gm2b2Z9wq+8YC0VxlLObSbONN+91vG29YfAcNwjXob+CdXLV+98Fe+pEfDaAP4jHCeEefWwL9ZI+78AcdMwTZ5QbYWJhzM9gYYbJjzK2Krr4M3U0c//RDt7hPvVsfznu2JjuMwBWd9m3YcGv/B+CbZxm+fYh8rzsXOITx/ZBzdOHjMgbMXwQtituADYiTONajGCxvWHEb7LYqbhMPKfzvlvg/NcZtxv9Cd6Udz8MnuuUHvqwt1pHzRwuUE9A4Fz/oOy79YIH8oBmPIp6nfMvN54tBRf+IlQtMEQ6qXGAqo74Beym2yl2PmOYG+t3WA9w7KPxtPR1jW7pBuzsLbJ7K7O7xzcN3NJDfgO3BZxTO23zGdYQHsG/KNf1tsQ5diyHeTMA+D5IdYr0xxLDURvxsHwteE35hXe2ob+SGVSylfFQ+KOOoKRm7ESaTXQ8SxhmQOWR6VXfqnN3WupdiXJblz3FUuV6H7/Nh3SEzPgbGdIf6pqFPYdKnbhfa12x+2MLPYdCGL8Yawbcm4l9I62mnusTN6ll/s3z61qea5jAfeHRC534x/KZ+8ll/M56w35zpI7EmrLWDeEE1CenfIANT9g6575R6Aru1dFnlOFV9Q8ofS9/C+UqecAO8QJ6RyMs19LBvzr7Y63uB7IJ1BjqK71m8H8f7SV4b6xJ8bDRntRO5jLWOnMyfUD8A35vS5Wwzy/0wyZL9KzC64l+vKX6vs8lSt+Mm4T/+6vHXAH+0gv2gigWYZ3GSo0Zy1G24tK46nhLjLn7wNHSklbARa2wNleFT4oypreyDh3MNqUO5FbAZ8lF+LdksmpMxHT7PQ/4J77xtg4NiywCYvPEBPTCUFVryAT2dhO/W0R9xGPvDcmYlYvBVWP9qrL+V6UfY32e4jbwO/VspXlE+fdzmx8wYxM4jpe+kiz5h2W+uFXF6Hb3Dk/kGGWFfLKMw+NYaSkyT/mH+9jmFp9D/Cp6afLPbFvI1Sx6Yw+A1S50l2hSbEF61ks6m+nL1sGWN/A7yFr/Rq/vBY9QVKZ/B3rm21GXV8qTsjnz4PsVjs2H/PNktchCOSRx5xXa2jzTHyeFQClg1nA8D47YcBz4Bo6j+cx68HKY8H+8fOt5NeZFpu2RDs0XLhmaGpM06/XHdE7LOCrsxx/WofJ/G9SAOYgwlGzpLORRjOHKjuxzr/W/269H8ONa0g2p4JmZSXNAC3mLN7ci9QqgD6Oa3VDRfrzB3DfD3DNqUI9hy2akh7O3T+DuGuuWQGVdBz9eCb7rE5yL5FunH4lN+zD+i1i1tn8ZR/MZx91mKq8kPUCyHmtL0S2bu6tjPd5SPJblCR4qEm5r0sVMU33Ebaxamz6DaO35/Vu1hFdqP2b7V0TfKeRojPs7XtaSuI+6MEW2su5KfgietDppPKJoRtB930HzCheYnZT7suq+vK99MMlD58BTlHKrOkfM76J+20Yf/RV32skiCp1TXMWVxI+Regoz2jsQ+EYHeTaBWAd63YJ4Z5LCuddl/VjUuo9KXfDS1Y1vw3qIPmYVtMtuFvRVr7O0zam+qpk97m6Y4w9wb9rGEr19SfKV9ZbCvg1h7ybGvIvb1ceyrDt9O2/bVWmNfL6l9Bd33ZdG37ws6QLVaVR8iG5mi2HCJjQS6eK2eQBfXfr5CY1CDq9iZrG25+doKX6geq+I9qrHPEu+xlgbCINTV3Hy6937l08flfqjvzEVuR4gPs5W9uceagmurWPfDdMYBXsbB5wTbYWXdUxR78t4hkwUlo1a0R13wYFzZ/GnL5gtk89C7Qg7P+4xelddzjq/wS557vGTm31jXKkULOIrzoMvaR4EZ5C/8CjMqfRn3VIwI7CLd4pgW63tPrU/Fi9OaWhvFKXJvsYzM/3mfM7LOETlB9TiV5z/A8bYL3zg+MvdPeSTe3YQzBML8f8J4lcdW1VPvUzVdqj2a9k28NuuYbYgbsqhjHqc6Jn5vIL5K3PCg5kQ6ZWG3ev/oM+SrKvGRx4yPbPm8p1TxxxTj0t7gD+Fbw1bcD9/UJTI1cHOD+t2EdovJV9s3wXqP8yz6bsMkE6c2mO9UP9gJ8yxK80q54BnTwvjzq9hQ+rVIkORO+sfxKugYKh9Y41jHLer3BrQ/4lg/favYKNeQQEvOi2dMC8l5cQ5jxcYUb1AOpM6uqmLkAGHJMrRs8a06H6hNawXRknENZGXlFmY9omasW6lxmTEu5nghOh1UMY5bfGvPexdteW+nzHuR61p5r8opeQ+o/9TOe08q3bblvaRPZt57xJb3XqxhUwWXvDdXO+8VXHems1Rb3gvfUzPv3eeS99r0H3jzwfLecSvvzVPOgTOjwiL22WnLe7nu6ZL3EnaZeS/VGSnvrYwFvU5uSz1PO/LeTpX3Up1c1iIJt6y8d/GnyE3DP2FuGv4wc1PozuhPmpui75M/T7lpla2q/MXFLt1qjr73qzkGoiUxgjqqqunX2+uqhLXQQ8Za9b1Bfa/47JEuTx31AY16uS7hrJPZ68LIoaz9OGq07ZRjNCd9c5TrNsrntpGIF/VHrj0G8dTxbAIfyBdQzkE1I1lb70esSfkdxhEekm+C7TRQX+SEK+zfIXuq4aOG2UX7Ixqo+WrIXbV6/qbqm1Sz5n7JDrOfhj5ezFfH3xQ97hPrYvxFP8qBSX/pnopZJxizycsNkxEPLJFziDCZ6o9LbRc1AZsOgG7IRQ/sdHE/pRrrHTWM4PI1DJu9Uz5LfKT4IQnMg79ifGWsz827nXdDrgXyTWwbZR5Ddwh4jPO8GH1zCmMXuD/OlEF30rRj51nmSeF73XYW63IXIj+vvpmY7Acmr6yNyfn53T0dhDcW3vYhRxqi857YmDwPBy7E8/N3xnzjsv6/xH7NuokNL71WTT4NvBy24iclX4opvmCLmW6kNvqQjo8tjY8RE1BthfYWz1GM6a3lr8CbF1zOZo+RDgHD6O6BjI8SeaqPUB0I/g9nNHxuDJrV9Gaqz40R/w2QLtSTn2lQe6Fza2o7zq1zYfY7/QUaI8+a+/OoUwW3wj5vBTbehvkn5fzI/6rn/3b1/MDqyrk17jOUg3tA607Q2gtaiBNqnVuLAy68CdnWaJ2H96MuUw5uAd1bQBe5W+6MPMt2XeOPXdZI9T5zjROgtRO0OkBrF2jBZmqucaPLGtdRrGDTgSG5Fjf51/P5tn18OqWJdCroSaegN1ey0F3o5tWM0/fYdFfI8+Cl9ctWaz/QQaplRsxaJp+VGdymPGA4twq1TIrp11AdXIv59OZYM/sXrmXCj7QNDuiqlimolskx1KcI42JzqGsKbiebKXYIaoj/if+obV6P2uYNqG020jm6rbZJd1a4tsn+2HxPbVqTdX6J89ZKrdPct73+uMRPAQNCzrMu8PcA+atUMixSg2FPqjfstdmzXe9x11BHHdbAXb3wGtDSLJlV0fwSywz+DndE5F2IQzncxQuvBY3rsF/IP4fzMvjtqrimvk+dWfOZ3zL+x4zpbBjvteIMC+NxT4vxmvDTxHjcBXHDeO9tDoynOLgGxnu3qhxW9pcYz3dE3THe+zUXjKe43sT40gfE+JILxo8B48MK4zEHY3zJwnjwZ5nzefhI1IoRb8UXdmsxDZiawx0g5z5WrKZarPTtFK9TjV5bCb1sw3MV363j+jR/O8/9UDfHeuncGvEI67c6l8N5bDVebFe1Kds5HuxT3SujGo/7fTTRoPwY6tmV2M3tTF/FEuy/KI7gengYdxICB6lgnRTPoha8Q4d8dKFvge6nN8I29KwIRurEvYhF78Y7GW9U3VWwxxvFKswZ5lhdCx0GD/rhryyf8wvKz9yv2g7bk/dFlsqhoYPthM8ouIZR4jbH9nxWQDhBcTvdeeUzC2DYuhTOyimnQx95V1jyl843TJmNm++hf42UE9HdaIV5VNOzMC/ZpW8Br0IbB0RggDFP3kdEvUiLDQicZzTzfWfUAVDLaWL68EvAP5ozByxpAR7cqO5KkK2a/oDupgL/2EaoLiTfo61s0vyG8wK33KgB90QqOa6qL+H+oFVf2oy9bcKaPkL1JZVPtqraxQTnTYy9aC+5LwKZLn+2pGIkyBr662I737HbDseflNPLGgV8WNVZkh3bcFcLdBGrVmORb4fCLcRjzD+ZS+B+OOfV0v4kJsD+3M5YQOPv+F6KvLO3AxiwhzAglVi4U+sJ4mxqYa/WG55L9S/chXrbHPA8C6wJhgabxzDXDUbMCPHv2OYxo0sPc/45BOzsGRwzDuFeOsWe6CvnBoOXYuMlFQdiPO7IXxZtqs4J3nfNGd068A41mMqdzgLdtwe+bXa904la4OdULbIFtRO6B9MFvqk7V1V9v6l0hWogpq5U7kBDV7ZDV4LQlU32WiSwFHfWKjhj6oJNXnXynBFxskM33yS9xJrWgkeEj3TGD/mg3rSsfOpvN+WjZPQpyGifxGlVVyNb7kPewPUAxlnEjqBVuVvr3Lvfo7CW7sJDVoQFU6Sf8Hmw1XjhTKWdKJCv4bW6+07PBcddbr5H6ND/keq71Pg/BZW71HRfP9iLOOEeYEKftG/3u9Sof2ypvm+Zp9pEJ2jsxvg9GN/tdt8S6zDv0VIOp2Su7l5KmX8MMm+DzDfwPVqpS83QJdJNA7pUuQPm0GM+h7DO4/iOlTqDWwiD5nrQDCzVI+iJFbsu55P31/bJ/oWfpU+GbDln+qA+GePeruWTf1b/sqPHTj+WPjEy+vCD9N+CxC8/eCJtf/f49NCf/NW3Wo/vXP/7r06u2ub76pu9W1viT24589bR7LmJvx+UfY/9yqMPjjK9o48ePXF05JGjn31QkrHoyT4bv7vq7RduWeV5nf8J7/7s9hd3bXj+pmv8T4jXHnvm8eZ/3Py1F1vevVzY+uQj536t9cwfPn167vdK+wIrb/qDgQMjjzzyiyO/9OnY6Oix0T17BniR9xw70S+XL764+Zt3fP7A9t/N/+ZE57Nf/vrLvkvPvzZ7cNOb//qZYwfLl18+uv/V/5j8h4eu+8Ku/xk+uePbe3/06xf23ZVr+sG7/m8Uv9HxR0fvemvl2vu9D6f3bfzxUz/47sbnHn7u7V/9ja6rX/3i3kfH/9To/dHLkms7/1c+d7yuns+r50H5vF19335ePtvfkM8W9X3lEfn0qff1n1PPDvV8Vj7rJuXT88b/AzdExjYINgAA"
), LA = class extends FA {
  constructor(e) {
    super(
      MA,
      ai.abi,
      e,
      ai.storageSlots
    );
  }
  static deploy(e, t = {}) {
    return new LA(e).deploy(t);
  }
}, KC = LA;
tc(KC, "bytecode", MA);
export {
  Zn as ASSET_ID_LEN,
  X1 as AbstractAccount,
  WB as AbstractContract,
  EA as AbstractProgram,
  QB as AbstractScriptRequest,
  Ei as Account,
  ct as Address,
  s1 as AddressType,
  ft as ArrayCoder,
  st as B256Coder,
  Cg as B512Coder,
  F1 as BLOCKS_PAGE_SIZE_LIMIT,
  Ot as BN,
  pr as BYTES_32,
  Sn as BaseTransactionRequest,
  oA as BaseWalletUnlocked,
  rt as BigNumberCoder,
  si as BlobTransactionRequest,
  xg as BooleanCoder,
  Rt as ByteArrayCoder,
  Rh as ByteCoder,
  nt as CHAIN_IDS,
  Qa as CONTRACT_ID_LEN,
  gB as CONTRACT_MAX_SIZE,
  i1 as ChainName,
  TB as ChangeOutputCollisionError,
  pt as Coder,
  YC as Commands,
  so as Contract,
  FA as ContractFactory,
  jC as ContractUtils,
  qa as CreateTransactionRequest,
  KB as DECIMAL_FUEL,
  n2 as DECIMAL_GWEI,
  e2 as DECIMAL_KWEI,
  r2 as DECIMAL_MWEI,
  t2 as DECIMAL_WEI,
  $B as DEFAULT_DECIMAL_UNITS,
  qB as DEFAULT_MIN_PRECISION,
  JB as DEFAULT_PRECISION,
  O1 as DEFAULT_RESOURCE_CACHE_TTL,
  s2 as DEVNET_NETWORK_URL,
  ho as DateTime,
  Ls as ENCODING_V1,
  pB as EmptyRoot,
  Sh as EnumCoder,
  D as ErrorCode,
  l0 as FAILED_ASSERT_EQ_SIGNAL,
  f0 as FAILED_ASSERT_NE_SIGNAL,
  A0 as FAILED_ASSERT_SIGNAL,
  h0 as FAILED_REQUIRE_SIGNAL,
  nl as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  vB as FAILED_UNKNOWN_SIGNAL,
  IA as Fuel,
  IC as FuelConnector,
  bA as FuelConnectorEventType,
  qo as FuelConnectorEventTypes,
  yA as FuelConnectorMethods,
  C as FuelError,
  TA as FunctionInvocationScope,
  M1 as GAS_USED_MODIFIER,
  ya as HDWallet,
  hB as INPUT_COIN_FIXED_SIZE,
  rr as InputCoder,
  Tc as InputCoinCoder,
  ks as InputContractCoder,
  Qr as InputMessageCoder,
  It as InputType,
  $o as InstructionSet,
  gr as Interface,
  K1 as Language,
  bC as LocalStorage,
  EB as MAX_PREDICATE_DATA_LENGTH,
  IB as MAX_PREDICATE_LENGTH,
  yB as MAX_SCRIPT_DATA_LENGTH,
  mB as MAX_SCRIPT_LENGTH,
  bB as MAX_STATIC_CONTRACTS,
  wB as MAX_WITNESSES,
  E_ as MNEMONIC_SIZES,
  hC as MemoryStorage,
  Wo as Mnemonic,
  lA as MnemonicVault,
  UC as MultiCallInvocationScope,
  Fv as NoWitnessAtIndexError,
  NB as NoWitnessByOwnerError,
  J as NumberCoder,
  n1 as OperationName,
  Qh as OptionCoder,
  Dc as OutputChangeCoder,
  nr as OutputCoder,
  Nc as OutputCoinCoder,
  Us as OutputContractCoder,
  Fc as OutputContractCreatedCoder,
  mt as OutputType,
  Qc as OutputVariableCoder,
  g0 as PANIC_DOC_URL,
  p0 as PANIC_REASONS,
  sr as PoliciesCoder,
  Xe as PolicyType,
  ys as Predicate,
  AA as PrivateKeyVault,
  ii as Provider,
  p_ as RESOURCES_PAGE_SIZE_LIMIT,
  Sg as RawSliceCoder,
  ut as ReceiptType,
  xh as SCRIPT_FIXED_SIZE,
  VC as Script,
  vi as ScriptRequest,
  Zr as ScriptTransactionRequest,
  Cn as Signer,
  ai as Src14OwnedProxy,
  KC as Src14OwnedProxyFactory,
  Eo as StdStringCoder,
  XB as StorageAbstract,
  Oc as StorageSlotCoder,
  Fh as StrSliceCoder,
  Tg as StringCoder,
  hi as StructCoder,
  i2 as TESTNET_NETWORK_URL,
  sA as TRANSACTIONS_PAGE_SIZE_LIMIT,
  Gc as TransactionBlobCoder,
  Ar as TransactionCoder,
  Pc as TransactionCreateCoder,
  kc as TransactionMintCoder,
  to as TransactionResponse,
  Lc as TransactionScriptCoder,
  $l as TransactionStatus,
  Et as TransactionType,
  r1 as TransactionTypeName,
  Uc as TransactionUpgradeCoder,
  zc as TransactionUploadCoder,
  Oh as TupleCoder,
  qr as TxPointerCoder,
  Ps as UTXO_ID_LEN,
  Mc as UpgradePurposeCoder,
  ke as UpgradePurposeTypeEnum,
  $a as UpgradeTransactionRequest,
  Ka as UploadTransactionRequest,
  fB as UtxoIdCoder,
  AC as Vault,
  Ng as VecCoder,
  dt as WORD_SIZE,
  xe as Wallet,
  hA as WalletLocked,
  lC as WalletManager,
  Qe as WalletUnlocked,
  ir as WitnessCoder,
  St as ZeroBytes32,
  AE as addAmountToCoinQuantities,
  $n as addOperation,
  Pn as addressify,
  Jv as aggregateInputsAmountsByAssetAndOwner,
  Y as arrayify,
  Dv as assemblePanicError,
  vv as assembleReceiptByType,
  Qv as assembleRevertError,
  Ii as assembleTransactionSummary,
  B_ as assert,
  Lf as assertUnreachable,
  HB as assets,
  x as bn,
  Dr as bufferFromString,
  SB as buildBlockExplorerUrl,
  ba as buildDryRunResult,
  PC as buildFunctionResult,
  EC as cacheFor,
  DB as cacheRequestInputsResources,
  Mv as cacheRequestInputsResourcesFromOwner,
  vn as calculateGasFee,
  Rv as calculateMetadataGasForTxBlob,
  Vl as calculateMetadataGasForTxCreate,
  Yl as calculateMetadataGasForTxScript,
  h_ as calculateMetadataGasForTxUpgrade,
  Sv as calculateMetadataGasForTxUpload,
  Tv as calculateMinGasForTxUpload,
  Vv as calculateTXFeeForSummary,
  Bh as calculateVmTxMemory,
  aB as capitalizeString,
  W_ as chunkAndPadBytes,
  Po as coinQuantityfy,
  uB as compressBytecode,
  yh as computeHmac,
  at as concat,
  di as concatBytes,
  lB as createAssetId,
  jB as createConfig,
  lo as dataSlice,
  Qf as decodeBase58,
  Mf as decompressBytecode,
  Wp as decrypt,
  Jp as decryptJsonWalletData,
  dB as defaultConsensusKey,
  cB as defaultSnapshotConfigs,
  vC as deferPromise,
  mA as deployScriptOrPredicate,
  ZB as dispatchFuelConnectorEvent,
  $_ as encodeBase58,
  jp as encrypt,
  qp as encryptJsonWalletData,
  ms as english,
  R1 as extractBurnedAssetsFromReceipts,
  RA as extractInvocationResult,
  x1 as extractMintedAssetsFromReceipts,
  Yo as extractTxError,
  nB as format,
  rB as formatUnits,
  Y1 as fuelAssetsBaseUrl,
  xv as gasUsedByInputs,
  vA as getAbisFromAllCalls,
  Ov as getAssetAmountInRequestInputs,
  VB as getAssetEth,
  YB as getAssetFuel,
  P1 as getAssetNetwork,
  aA as getAssetWithNetwork,
  Lv as getBurnableAssetCount,
  b1 as getContractCallOperations,
  C1 as getContractCreatedOperations,
  Zo as getDecodedLogs,
  L1 as getDefaultChainId,
  yi as getGasUsedFromReceipts,
  Xo as getInputAccountAddress,
  $v as getInputContractFromIndex,
  Jl as getInputFromAssetId,
  Ho as getInputsByType,
  Hv as getInputsByTypes,
  Xv as getInputsCoin,
  jl as getInputsCoinAndMessage,
  Wv as getInputsContract,
  Zv as getInputsMessage,
  Vo as getMaxGas,
  AB as getMessageId,
  Gl as getMinGas,
  Ma as getMintedAssetId,
  B1 as getOperations,
  hs as getOutputsByType,
  t1 as getOutputsChange,
  ql as getOutputsCoin,
  e1 as getOutputsContract,
  Kv as getOutputsContractCreated,
  LB as getOutputsVariable,
  v1 as getPayProducerOperations,
  yC as getPredicateRoot,
  zg as getRandomB256,
  qn as getReceiptsByType,
  u1 as getReceiptsCall,
  _1 as getReceiptsMessageOut,
  kB as getReceiptsTransferOut,
  __ as getReceiptsWithMissingData,
  Zl as getRequestInputResourceOwner,
  CA as getResultLogs,
  rA as getTotalFeeFromStatus,
  S1 as getTransactionStatusName,
  UB as getTransactionSummary,
  zB as getTransactionSummaryFromRequest,
  Kl as getTransactionTypeName,
  GB as getTransactionsSummaries,
  E1 as getTransferOperations,
  g1 as getWithdrawFromFuelOperations,
  PB as hasSameAssetId,
  ze as hash,
  rg as hashMessage,
  Z as hexlify,
  mv as inputify,
  ji as isAddress,
  Ln as isB256,
  bv as isCoin,
  fr as isDefined,
  Oa as isEvmAddress,
  A_ as isInputCoin,
  RB as isMessage,
  u_ as isMessageCoin,
  Sc as isPublicKey,
  BB as isRawCoin,
  xB as isRawMessage,
  Pr as isRequestInputCoin,
  Xl as isRequestInputCoinOrMessage,
  bi as isRequestInputMessage,
  Hl as isRequestInputMessageWithoutData,
  tn as isRequestInputResource,
  Ja as isRequestInputResourceFromOwner,
  FB as isTransactionTypeBlob,
  Gv as isTransactionTypeCreate,
  Ur as isTransactionTypeScript,
  OB as isTransactionTypeUpgrade,
  MB as isTransactionTypeUpload,
  Tn as isType,
  d1 as isTypeBlob,
  tA as isTypeCreate,
  a1 as isTypeMint,
  eA as isTypeScript,
  o1 as isTypeUpgrade,
  c1 as isTypeUpload,
  mh as keccak256,
  _B as keyFromPassword,
  sB as max,
  iB as multiply,
  Ug as normalizeB256,
  Nv as normalizeJSON,
  oB as normalizeString,
  yv as outputify,
  Vg as padFirst12BytesOfEvmAddress,
  $p as pbkdf2,
  Tr as processGqlReceipt,
  T1 as processGraphqlStatus,
  Ue as randomBytes,
  tg as randomUUID,
  H1 as rawAssets,
  Re as resolveGasDependentCosts,
  V1 as resolveIconPaths,
  l_ as returnZeroScript,
  Kp as ripemd160,
  wh as scrypt,
  Ce as sha256,
  Rf as sleep,
  Yg as sortPolicies,
  Mn as stringFromBuffer,
  Gg as toB256AddressEvm,
  lr as toBytes,
  eB as toFixed,
  co as toHex,
  xr as toNumber,
  gn as toUtf8Bytes,
  Ao as toUtf8String,
  Se as transactionRequestify,
  eg as uint64ToBytesBE,
  G1 as urlJoin,
  Wl as validateTransactionForAssetBurn,
  bs as withTimeout,
  zv as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
