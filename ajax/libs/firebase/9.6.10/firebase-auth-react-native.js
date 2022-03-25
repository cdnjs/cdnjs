import require$$0 from 'react-native';
import require$$2 from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
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

var rn = {};

var phone31a1067a = {};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

var tslib_es6 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	__extends: __extends,
	get __assign () { return __assign; },
	__rest: __rest,
	__decorate: __decorate,
	__param: __param,
	__metadata: __metadata,
	__awaiter: __awaiter,
	__generator: __generator,
	__createBinding: __createBinding,
	__exportStar: __exportStar,
	__values: __values,
	__read: __read,
	__spread: __spread,
	__spreadArrays: __spreadArrays,
	__spreadArray: __spreadArray,
	__await: __await,
	__asyncGenerator: __asyncGenerator,
	__asyncDelegator: __asyncDelegator,
	__asyncValues: __asyncValues,
	__makeTemplateObject: __makeTemplateObject,
	__importStar: __importStar,
	__importDefault: __importDefault,
	__classPrivateFieldGet: __classPrivateFieldGet,
	__classPrivateFieldSet: __classPrivateFieldSet
});

var require$$3 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
const CONSTANTS = {
    /**
     * @define {boolean} Whether this is the client Node.js SDK.
     */
    NODE_CLIENT: false,
    /**
     * @define {boolean} Whether this is the Admin Node.js SDK.
     */
    NODE_ADMIN: false,
    /**
     * Firebase SDK Version
     */
    SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 */
const assert = function (assertion, message) {
    if (!assertion) {
        throw assertionError(message);
    }
};
/**
 * Returns an Error object suitable for throwing.
 */
const assertionError = function (message) {
    return new Error('Firebase Database (' +
        CONSTANTS.SDK_VERSION +
        ') INTERNAL ASSERT FAILED: ' +
        message);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const stringToByteArray$1 = function (str) {
    // TODO(user): Use native implementations if/when available
    const out = [];
    let p = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if ((c & 0xfc00) === 0xd800 &&
            i + 1 < str.length &&
            (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */
const byteArrayToString = function (bytes) {
    // TODO(user): Use native implementations if/when available
    const out = [];
    let pos = 0, c = 0;
    while (pos < bytes.length) {
        const c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        }
        else if (c1 > 191 && c1 < 224) {
            const c2 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        }
        else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            const c2 = bytes[pos++];
            const c3 = bytes[pos++];
            const c4 = bytes[pos++];
            const u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                0x10000;
            out[c++] = String.fromCharCode(0xd800 + (u >> 10));
            out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
        }
        else {
            const c2 = bytes[pos++];
            const c3 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        }
    }
    return out.join('');
};
// We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()
const base64 = {
    /**
     * Maps bytes to characters.
     */
    byteToCharMap_: null,
    /**
     * Maps characters to bytes.
     */
    charToByteMap_: null,
    /**
     * Maps bytes to websafe characters.
     * @private
     */
    byteToCharMapWebSafe_: null,
    /**
     * Maps websafe characters to bytes.
     * @private
     */
    charToByteMapWebSafe_: null,
    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     */
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     */
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + '+/=';
    },
    /**
     * Our websafe alphabet.
     */
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + '-_.';
    },
    /**
     * Whether this browser supports the atob and btoa functions. This extension
     * started at Mozilla but is now implemented by many browsers. We use the
     * ASSUME_* variables to avoid pulling in the full useragent detection library
     * but still allowing the standard per-browser compilations.
     *
     */
    HAS_NATIVE_SUPPORT: typeof atob === 'function',
    /**
     * Base64-encode an array of bytes.
     *
     * @param input An array of bytes (numbers with
     *     value in [0, 255]) to encode.
     * @param webSafe Boolean indicating we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeByteArray(input, webSafe) {
        if (!Array.isArray(input)) {
            throw Error('encodeByteArray takes an array as a parameter');
        }
        this.init_();
        const byteToCharMap = webSafe
            ? this.byteToCharMapWebSafe_
            : this.byteToCharMap_;
        const output = [];
        for (let i = 0; i < input.length; i += 3) {
            const byte1 = input[i];
            const haveByte2 = i + 1 < input.length;
            const byte2 = haveByte2 ? input[i + 1] : 0;
            const haveByte3 = i + 2 < input.length;
            const byte3 = haveByte3 ? input[i + 2] : 0;
            const outByte1 = byte1 >> 2;
            const outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            let outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
            let outByte4 = byte3 & 0x3f;
            if (!haveByte3) {
                outByte4 = 64;
                if (!haveByte2) {
                    outByte3 = 64;
                }
            }
            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join('');
    },
    /**
     * Base64-encode a string.
     *
     * @param input A string to encode.
     * @param webSafe If true, we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeString(input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray$1(input), webSafe);
    },
    /**
     * Base64-decode a string.
     *
     * @param input to decode.
     * @param webSafe True if we should use the
     *     alternative alphabet.
     * @return string representing the decoded value.
     */
    decodeString(input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
    },
    /**
     * Base64-decode a string.
     *
     * In base-64 decoding, groups of four characters are converted into three
     * bytes.  If the encoder did not apply padding, the input length may not
     * be a multiple of 4.
     *
     * In this case, the last group will have fewer than 4 characters, and
     * padding will be inferred.  If the group has one or two characters, it decodes
     * to one byte.  If the group has three characters, it decodes to two bytes.
     *
     * @param input Input to decode.
     * @param webSafe True if we should use the web-safe alphabet.
     * @return bytes representing the decoded value.
     */
    decodeStringToByteArray(input, webSafe) {
        this.init_();
        const charToByteMap = webSafe
            ? this.charToByteMapWebSafe_
            : this.charToByteMap_;
        const output = [];
        for (let i = 0; i < input.length;) {
            const byte1 = charToByteMap[input.charAt(i++)];
            const haveByte2 = i < input.length;
            const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            const haveByte3 = i < input.length;
            const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            const haveByte4 = i < input.length;
            const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                throw Error();
            }
            const outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);
            if (byte3 !== 64) {
                const outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                output.push(outByte2);
                if (byte4 !== 64) {
                    const outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                    output.push(outByte3);
                }
            }
        }
        return output;
    },
    /**
     * Lazy static initialization function. Called before
     * accessing any of the static map variables.
     * @private
     */
    init_() {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            // We want quick mappings back and forth, so we precompute two maps.
            for (let i = 0; i < this.ENCODED_VALS.length; i++) {
                this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                this.charToByteMap_[this.byteToCharMap_[i]] = i;
                this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                // Be forgiving when decoding and correctly decode both encodings.
                if (i >= this.ENCODED_VALS_BASE.length) {
                    this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                    this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                }
            }
        }
    }
};
/**
 * URL-safe base64 encoding
 */
const base64Encode = function (str) {
    const utf8Bytes = stringToByteArray$1(str);
    return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */
const base64urlEncodeWithoutPadding = function (str) {
    // Use base64url encoding and remove padding in the end (dot characters).
    return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */
const base64Decode = function (str) {
    try {
        return base64.decodeString(str, true);
    }
    catch (e) {
        console.error('base64Decode failed: ', e);
    }
    return null;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            const dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (const prop in source) {
        // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
        if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}
function isValidKey(key) {
    return key !== '__proto__';
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Deferred {
    constructor() {
        this.reject = () => { };
        this.resolve = () => { };
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
    /**
     * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     */
    wrapCallback(callback) {
        return (error, value) => {
            if (error) {
                this.reject(error);
            }
            else {
                this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                this.promise.catch(() => { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    }
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createMockUserToken(token, projectId) {
    if (token.uid) {
        throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
    }
    // Unsecured JWTs use "none" as the algorithm.
    const header = {
        alg: 'none',
        type: 'JWT'
    };
    const project = projectId || 'demo-project';
    const iat = token.iat || 0;
    const sub = token.sub || token.user_id;
    if (!sub) {
        throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
    }
    const payload = Object.assign({ 
        // Set all required fields to decent defaults
        iss: `https://securetoken.google.com/${project}`, aud: project, iat, exp: iat + 3600, auth_time: iat, sub, user_id: sub, firebase: {
            sign_in_provider: 'custom',
            identities: {}
        } }, token);
    // Unsecured JWTs use the empty string as a signature.
    const signature = '';
    return [
        base64urlEncodeWithoutPadding(JSON.stringify(header)),
        base64urlEncodeWithoutPadding(JSON.stringify(payload)),
        signature
    ].join('.');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */
function getUA() {
    if (typeof navigator !== 'undefined' &&
        typeof navigator['userAgent'] === 'string') {
        return navigator['userAgent'];
    }
    else {
        return '';
    }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */
function isMobileCordova() {
    return (typeof window !== 'undefined' &&
        // @ts-ignore Setting up an broadly applicable index signature for Window
        // just to deal with this case would probably be a bad idea.
        !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
    try {
        return (Object.prototype.toString.call(global.process) === '[object process]');
    }
    catch (e) {
        return false;
    }
}
/**
 * Detect Browser Environment
 */
function isBrowser() {
    return typeof self === 'object' && self.self === self;
}
function isBrowserExtension() {
    const runtime = typeof chrome === 'object'
        ? chrome.runtime
        : typeof browser === 'object'
            ? browser.runtime
            : undefined;
    return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */
function isReactNative() {
    return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
}
/** Detects Electron apps. */
function isElectron() {
    return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */
function isIE() {
    const ua = getUA();
    return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */
function isUWP() {
    return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */
function isNodeSdk() {
    return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */
function isSafari() {
    return (!isNode() &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome'));
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
function isIndexedDBAvailable() {
    return typeof indexedDB === 'object';
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */
function validateIndexedDBOpenable() {
    return new Promise((resolve, reject) => {
        try {
            let preExist = true;
            const DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
            const request = self.indexedDB.open(DB_CHECK_NAME);
            request.onsuccess = () => {
                request.result.close();
                // delete database only when it doesn't pre-exist
                if (!preExist) {
                    self.indexedDB.deleteDatabase(DB_CHECK_NAME);
                }
                resolve(true);
            };
            request.onupgradeneeded = () => {
                preExist = false;
            };
            request.onerror = () => {
                var _a;
                reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
            };
        }
        catch (error) {
            reject(error);
        }
    });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */
function areCookiesEnabled() {
    if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
        return false;
    }
    return true;
}
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 */
function getGlobal() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('Unable to locate global object.');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // Typescript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if (e.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */
const ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
class FirebaseError extends Error {
    constructor(
    /** The error code for this error. */
    code, message, 
    /** Custom data for this error. */
    customData) {
        super(message);
        this.code = code;
        this.customData = customData;
        /** The custom name for all FirebaseErrors. */
        this.name = ERROR_NAME;
        // Fix For ES5
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, FirebaseError.prototype);
        // Maintains proper stack trace for where our error was thrown.
        // Only available on V8.
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorFactory.prototype.create);
        }
    }
}
class ErrorFactory {
    constructor(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
    }
    create(code, ...data) {
        const customData = data[0] || {};
        const fullCode = `${this.service}/${code}`;
        const template = this.errors[code];
        const message = template ? replaceTemplate(template, customData) : 'Error';
        // Service Name: Error message (service/code).
        const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
        const error = new FirebaseError(fullCode, fullMessage, customData);
        return error;
    }
}
function replaceTemplate(template, data) {
    return template.replace(PATTERN, (_, key) => {
        const value = data[key];
        return value != null ? String(value) : `<${key}?>`;
    });
}
const PATTERN = /\{\$([^}]+)}/g;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
    return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
    return JSON.stringify(data);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const decode = function (token) {
    let header = {}, claims = {}, data = {}, signature = '';
    try {
        const parts = token.split('.');
        header = jsonEval(base64Decode(parts[0]) || '');
        claims = jsonEval(base64Decode(parts[1]) || '');
        signature = parts[2];
        data = claims['d'] || {};
        delete claims['d'];
    }
    catch (e) { }
    return {
        header,
        claims,
        data,
        signature
    };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const isValidTimestamp = function (token) {
    const claims = decode(token).claims;
    const now = Math.floor(new Date().getTime() / 1000);
    let validSince = 0, validUntil = 0;
    if (typeof claims === 'object') {
        if (claims.hasOwnProperty('nbf')) {
            validSince = claims['nbf'];
        }
        else if (claims.hasOwnProperty('iat')) {
            validSince = claims['iat'];
        }
        if (claims.hasOwnProperty('exp')) {
            validUntil = claims['exp'];
        }
        else {
            // token will expire after 24h by default
            validUntil = validSince + 86400;
        }
    }
    return (!!now &&
        !!validSince &&
        !!validUntil &&
        now >= validSince &&
        now <= validUntil);
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const issuedAtTime = function (token) {
    const claims = decode(token).claims;
    if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
        return claims['iat'];
    }
    return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const isValidFormat = function (token) {
    const decoded = decode(token), claims = decoded.claims;
    return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const isAdmin = function (token) {
    const claims = decode(token).claims;
    return typeof claims === 'object' && claims['admin'] === true;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function contains(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key];
    }
    else {
        return undefined;
    }
}
function isEmpty(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function map(obj, fn, contextObj) {
    const res = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[key] = fn.call(contextObj, obj[key], key, obj);
        }
    }
    return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    for (const k of aKeys) {
        if (!bKeys.includes(k)) {
            return false;
        }
        const aProp = a[k];
        const bProp = b[k];
        if (isObject(aProp) && isObject(bProp)) {
            if (!deepEqual(aProp, bProp)) {
                return false;
            }
        }
        else if (aProp !== bProp) {
            return false;
        }
    }
    for (const k of bKeys) {
        if (!aKeys.includes(k)) {
            return false;
        }
    }
    return true;
}
function isObject(thing) {
    return thing !== null && typeof thing === 'object';
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */
function querystring(querystringParams) {
    const params = [];
    for (const [key, value] of Object.entries(querystringParams)) {
        if (Array.isArray(value)) {
            value.forEach(arrayVal => {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
            });
        }
        else {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    }
    return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */
function querystringDecode(querystring) {
    const obj = {};
    const tokens = querystring.replace(/^\?/, '').split('&');
    tokens.forEach(token => {
        if (token) {
            const [key, value] = token.split('=');
            obj[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    });
    return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */
function extractQuerystring(url) {
    const queryStart = url.indexOf('?');
    if (!queryStart) {
        return '';
    }
    const fragmentStart = url.indexOf('#', queryStart);
    return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */
class Sha1 {
    constructor() {
        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @private
         */
        this.chain_ = [];
        /**
         * A buffer holding the partially computed hash result.
         * @private
         */
        this.buf_ = [];
        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @private
         */
        this.W_ = [];
        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @private
         */
        this.pad_ = [];
        /**
         * @private {number}
         */
        this.inbuf_ = 0;
        /**
         * @private {number}
         */
        this.total_ = 0;
        this.blockSize = 512 / 8;
        this.pad_[0] = 128;
        for (let i = 1; i < this.blockSize; ++i) {
            this.pad_[i] = 0;
        }
        this.reset();
    }
    reset() {
        this.chain_[0] = 0x67452301;
        this.chain_[1] = 0xefcdab89;
        this.chain_[2] = 0x98badcfe;
        this.chain_[3] = 0x10325476;
        this.chain_[4] = 0xc3d2e1f0;
        this.inbuf_ = 0;
        this.total_ = 0;
    }
    /**
     * Internal compress helper function.
     * @param buf Block to compress.
     * @param offset Offset of the block in the buffer.
     * @private
     */
    compress_(buf, offset) {
        if (!offset) {
            offset = 0;
        }
        const W = this.W_;
        // get 16 big endian words
        if (typeof buf === 'string') {
            for (let i = 0; i < 16; i++) {
                // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                // have a bug that turns the post-increment ++ operator into pre-increment
                // during JIT compilation.  We have code that depends heavily on SHA-1 for
                // correctness and which is affected by this bug, so I've removed all uses
                // of post-increment ++ in which the result value is used.  We can revert
                // this change once the Safari bug
                // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                // most clients have been updated.
                W[i] =
                    (buf.charCodeAt(offset) << 24) |
                        (buf.charCodeAt(offset + 1) << 16) |
                        (buf.charCodeAt(offset + 2) << 8) |
                        buf.charCodeAt(offset + 3);
                offset += 4;
            }
        }
        else {
            for (let i = 0; i < 16; i++) {
                W[i] =
                    (buf[offset] << 24) |
                        (buf[offset + 1] << 16) |
                        (buf[offset + 2] << 8) |
                        buf[offset + 3];
                offset += 4;
            }
        }
        // expand to 80 words
        for (let i = 16; i < 80; i++) {
            const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
        }
        let a = this.chain_[0];
        let b = this.chain_[1];
        let c = this.chain_[2];
        let d = this.chain_[3];
        let e = this.chain_[4];
        let f, k;
        // TODO(user): Try to unroll this loop to speed up the computation.
        for (let i = 0; i < 80; i++) {
            if (i < 40) {
                if (i < 20) {
                    f = d ^ (b & (c ^ d));
                    k = 0x5a827999;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0x6ed9eba1;
                }
            }
            else {
                if (i < 60) {
                    f = (b & c) | (d & (b | c));
                    k = 0x8f1bbcdc;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0xca62c1d6;
                }
            }
            const t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
            e = d;
            d = c;
            c = ((b << 30) | (b >>> 2)) & 0xffffffff;
            b = a;
            a = t;
        }
        this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
        this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
        this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
        this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
        this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
    }
    update(bytes, length) {
        // TODO(johnlenz): tighten the function signature and remove this check
        if (bytes == null) {
            return;
        }
        if (length === undefined) {
            length = bytes.length;
        }
        const lengthMinusBlock = length - this.blockSize;
        let n = 0;
        // Using local instead of member variables gives ~5% speedup on Firefox 16.
        const buf = this.buf_;
        let inbuf = this.inbuf_;
        // The outer while loop should execute at most twice.
        while (n < length) {
            // When we have no data in the block to top up, we can directly process the
            // input buffer (assuming it contains sufficient data). This gives ~25%
            // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
            // the data is provided in large chunks (or in multiples of 64 bytes).
            if (inbuf === 0) {
                while (n <= lengthMinusBlock) {
                    this.compress_(bytes, n);
                    n += this.blockSize;
                }
            }
            if (typeof bytes === 'string') {
                while (n < length) {
                    buf[inbuf] = bytes.charCodeAt(n);
                    ++inbuf;
                    ++n;
                    if (inbuf === this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
            else {
                while (n < length) {
                    buf[inbuf] = bytes[n];
                    ++inbuf;
                    ++n;
                    if (inbuf === this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
        }
        this.inbuf_ = inbuf;
        this.total_ += length;
    }
    /** @override */
    digest() {
        const digest = [];
        let totalBits = this.total_ * 8;
        // Add pad 0x80 0x00*.
        if (this.inbuf_ < 56) {
            this.update(this.pad_, 56 - this.inbuf_);
        }
        else {
            this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        }
        // Add # bits.
        for (let i = this.blockSize - 1; i >= 56; i--) {
            this.buf_[i] = totalBits & 255;
            totalBits /= 256; // Don't use bit-shifting here!
        }
        this.compress_(this.buf_);
        let n = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 24; j >= 0; j -= 8) {
                digest[n] = (this.chain_[i] >> j) & 255;
                ++n;
            }
        }
        return digest;
    }
}

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    const proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
class ObserverProxy {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    constructor(executor, onNoObservers) {
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task
            .then(() => {
            executor(this);
        })
            .catch(e => {
            this.error(e);
        });
    }
    next(value) {
        this.forEachObserver((observer) => {
            observer.next(value);
        });
    }
    error(error) {
        this.forEachObserver((observer) => {
            observer.error(error);
        });
        this.close(error);
    }
    complete() {
        this.forEachObserver((observer) => {
            observer.complete();
        });
        this.close();
    }
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber sychronously to their
     *   call to subscribe().
     */
    subscribe(nextOrObserver, error, complete) {
        let observer;
        if (nextOrObserver === undefined &&
            error === undefined &&
            complete === undefined) {
            throw new Error('Missing Observer.');
        }
        // Assemble an Observer object when passed as callback functions.
        if (implementsAnyMethods(nextOrObserver, [
            'next',
            'error',
            'complete'
        ])) {
            observer = nextOrObserver;
        }
        else {
            observer = {
                next: nextOrObserver,
                error,
                complete
            };
        }
        if (observer.next === undefined) {
            observer.next = noop;
        }
        if (observer.error === undefined) {
            observer.error = noop;
        }
        if (observer.complete === undefined) {
            observer.complete = noop;
        }
        const unsub = this.unsubscribeOne.bind(this, this.observers.length);
        // Attempt to subscribe to a terminated Observable - we
        // just respond to the Observer with the final error or complete
        // event.
        if (this.finalized) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(() => {
                try {
                    if (this.finalError) {
                        observer.error(this.finalError);
                    }
                    else {
                        observer.complete();
                    }
                }
                catch (e) {
                    // nothing
                }
                return;
            });
        }
        this.observers.push(observer);
        return unsub;
    }
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
    unsubscribeOne(i) {
        if (this.observers === undefined || this.observers[i] === undefined) {
            return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== undefined) {
            this.onNoObservers(this);
        }
    }
    forEachObserver(fn) {
        if (this.finalized) {
            // Already closed by previous event....just eat the additional values.
            return;
        }
        // Since sendOne calls asynchronously - there is no chance that
        // this.observers will become undefined.
        for (let i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
        }
    }
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
    sendOne(i, fn) {
        // Execute the callback asynchronously
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(() => {
            if (this.observers !== undefined && this.observers[i] !== undefined) {
                try {
                    fn(this.observers[i]);
                }
                catch (e) {
                    // Ignore exceptions raised in Observers or missing methods of an
                    // Observer.
                    // Log error to console. b/31404806
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(e);
                    }
                }
            }
        });
    }
    close(err) {
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        if (err !== undefined) {
            this.finalError = err;
        }
        // Proxy is no longer needed - garbage collect references
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(() => {
            this.observers = undefined;
            this.onNoObservers = undefined;
        });
    }
}
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types
function async(fn, onError) {
    return (...args) => {
        Promise.resolve(true)
            .then(() => {
            fn(...args);
        })
            .catch((error) => {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    for (const method of methods) {
        if (method in obj && typeof obj[method] === 'function') {
            return true;
        }
    }
    return false;
}
function noop() {
    // do nothing
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */
const validateArgCount = function (fnName, minCount, maxCount, argCount) {
    let argError;
    if (argCount < minCount) {
        argError = 'at least ' + minCount;
    }
    else if (argCount > maxCount) {
        argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
    }
    if (argError) {
        const error = fnName +
            ' failed: Was called with ' +
            argCount +
            (argCount === 1 ? ' argument.' : ' arguments.') +
            ' Expects ' +
            argError +
            '.';
        throw new Error(error);
    }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argName) {
    return `${fnName} failed: ${argName} argument `;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */
function validateNamespace(fnName, namespace, optional) {
    if (optional && !namespace) {
        return;
    }
    if (typeof namespace !== 'string') {
        //TODO: I should do more validation here. We only allow certain chars in namespaces.
        throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
    }
}
function validateCallback(fnName, argumentName, 
// eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
    if (optional && !callback) {
        return;
    }
    if (typeof callback !== 'function') {
        throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
    }
}
function validateContextObject(fnName, argumentName, context, optional) {
    if (optional && !context) {
        return;
    }
    if (typeof context !== 'object' || context === null) {
        throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
const stringToByteArray = function (str) {
    const out = [];
    let p = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        // Is this the lead surrogate in a surrogate pair?
        if (c >= 0xd800 && c <= 0xdbff) {
            const high = c - 0xd800; // the high 10 bits.
            i++;
            assert(i < str.length, 'Surrogate pair missing trail surrogate.');
            const low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
            c = 0x10000 + (high << 10) + low;
        }
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if (c < 65536) {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
const stringLength = function (str) {
    let p = 0;
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        if (c < 128) {
            p++;
        }
        else if (c < 2048) {
            p += 2;
        }
        else if (c >= 0xd800 && c <= 0xdbff) {
            // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
            p += 4;
            i++; // skip trail surrogate.
        }
        else {
            p += 3;
        }
    }
    return p;
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The amount of milliseconds to exponentially increase.
 */
const DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */
const DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */
const MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.
/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */
const RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */
function calculateBackoffMillis(backoffCount, intervalMillis = DEFAULT_INTERVAL_MILLIS, backoffFactor = DEFAULT_BACKOFF_FACTOR) {
    // Calculates an exponentially increasing value.
    // Deviation: calculates value from count and a constant interval, so we only need to save value
    // and count to restore state.
    const currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount);
    // A random "fuzz" to avoid waves of retries.
    // Deviation: randomFactor is required.
    const randomWait = Math.round(
    // A fraction of the backoff value to add/subtract.
    // Deviation: changes multiplication order to improve readability.
    RANDOM_FACTOR *
        currBaseValue *
        // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
        // if we add or subtract.
        (Math.random() - 0.5) *
        2);
    // Limits backoff to max to avoid effectively permanent backoff.
    return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provide English ordinal letters after a number
 */
function ordinal(i) {
    if (!Number.isFinite(i)) {
        return `${i}`;
    }
    return i + indicator(i);
}
function indicator(i) {
    i = Math.abs(i);
    const cent = i % 100;
    if (cent >= 10 && cent <= 20) {
        return 'th';
    }
    const dec = i % 10;
    if (dec === 1) {
        return 'st';
    }
    if (dec === 2) {
        return 'nd';
    }
    if (dec === 3) {
        return 'rd';
    }
    return 'th';
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getModularInstance(service) {
    if (service && service._delegate) {
        return service._delegate;
    }
    else {
        return service;
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
function promisifyRequest(request, errorMessage) {
    return new Promise((resolve, reject) => {
        request.onsuccess = event => {
            resolve(event.target.result);
        };
        request.onerror = event => {
            var _a;
            reject(`${errorMessage}: ${(_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message}`);
        };
    });
}
/**
 * @internal
 */
class DBWrapper {
    constructor(_db) {
        this._db = _db;
        this.objectStoreNames = this._db.objectStoreNames;
    }
    transaction(storeNames, mode) {
        return new TransactionWrapper(this._db.transaction.call(this._db, storeNames, mode));
    }
    createObjectStore(storeName, options) {
        return new ObjectStoreWrapper(this._db.createObjectStore(storeName, options));
    }
    close() {
        this._db.close();
    }
}
/**
 * @internal
 */
class TransactionWrapper {
    constructor(_transaction) {
        this._transaction = _transaction;
        this.complete = new Promise((resolve, reject) => {
            this._transaction.oncomplete = function () {
                resolve();
            };
            this._transaction.onerror = () => {
                reject(this._transaction.error);
            };
            this._transaction.onabort = () => {
                reject(this._transaction.error);
            };
        });
    }
    objectStore(storeName) {
        return new ObjectStoreWrapper(this._transaction.objectStore(storeName));
    }
}
/**
 * @internal
 */
class ObjectStoreWrapper {
    constructor(_store) {
        this._store = _store;
    }
    index(name) {
        return new IndexWrapper(this._store.index(name));
    }
    createIndex(name, keypath, options) {
        return new IndexWrapper(this._store.createIndex(name, keypath, options));
    }
    get(key) {
        const request = this._store.get(key);
        return promisifyRequest(request, 'Error reading from IndexedDB');
    }
    put(value, key) {
        const request = this._store.put(value, key);
        return promisifyRequest(request, 'Error writing to IndexedDB');
    }
    delete(key) {
        const request = this._store.delete(key);
        return promisifyRequest(request, 'Error deleting from IndexedDB');
    }
    clear() {
        const request = this._store.clear();
        return promisifyRequest(request, 'Error clearing IndexedDB object store');
    }
}
/**
 * @internal
 */
class IndexWrapper {
    constructor(_index) {
        this._index = _index;
    }
    get(key) {
        const request = this._index.get(key);
        return promisifyRequest(request, 'Error reading from IndexedDB');
    }
}
/**
 * @internal
 */
function openDB(dbName, dbVersion, upgradeCallback) {
    return new Promise((resolve, reject) => {
        try {
            const request = indexedDB.open(dbName, dbVersion);
            request.onsuccess = event => {
                resolve(new DBWrapper(event.target.result));
            };
            request.onerror = event => {
                var _a;
                reject(`Error opening indexedDB: ${(_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message}`);
            };
            request.onupgradeneeded = event => {
                upgradeCallback(new DBWrapper(request.result), event.oldVersion, event.newVersion, new TransactionWrapper(request.transaction));
            };
        }
        catch (e) {
            reject(`Error opening indexedDB: ${e.message}`);
        }
    });
}
/**
 * @internal
 */
async function deleteDB(dbName) {
    return new Promise((resolve, reject) => {
        try {
            const request = indexedDB.deleteDatabase(dbName);
            request.onsuccess = () => {
                resolve();
            };
            request.onerror = event => {
                var _a;
                reject(`Error deleting indexedDB database "${dbName}": ${(_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message}`);
            };
        }
        catch (e) {
            reject(`Error deleting indexedDB database "${dbName}": ${e.message}`);
        }
    });
}

var index_esm2017 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	CONSTANTS: CONSTANTS,
	DBWrapper: DBWrapper,
	Deferred: Deferred,
	ErrorFactory: ErrorFactory,
	FirebaseError: FirebaseError,
	MAX_VALUE_MILLIS: MAX_VALUE_MILLIS,
	RANDOM_FACTOR: RANDOM_FACTOR,
	Sha1: Sha1,
	areCookiesEnabled: areCookiesEnabled,
	assert: assert,
	assertionError: assertionError,
	async: async,
	base64: base64,
	base64Decode: base64Decode,
	base64Encode: base64Encode,
	base64urlEncodeWithoutPadding: base64urlEncodeWithoutPadding,
	calculateBackoffMillis: calculateBackoffMillis,
	contains: contains,
	createMockUserToken: createMockUserToken,
	createSubscribe: createSubscribe,
	decode: decode,
	deepCopy: deepCopy,
	deepEqual: deepEqual,
	deepExtend: deepExtend,
	deleteDB: deleteDB,
	errorPrefix: errorPrefix,
	extractQuerystring: extractQuerystring,
	getGlobal: getGlobal,
	getModularInstance: getModularInstance,
	getUA: getUA,
	isAdmin: isAdmin,
	isBrowser: isBrowser,
	isBrowserExtension: isBrowserExtension,
	isElectron: isElectron,
	isEmpty: isEmpty,
	isIE: isIE,
	isIndexedDBAvailable: isIndexedDBAvailable,
	isMobileCordova: isMobileCordova,
	isNode: isNode,
	isNodeSdk: isNodeSdk,
	isReactNative: isReactNative,
	isSafari: isSafari,
	isUWP: isUWP,
	isValidFormat: isValidFormat,
	isValidTimestamp: isValidTimestamp,
	issuedAtTime: issuedAtTime,
	jsonEval: jsonEval,
	map: map,
	openDB: openDB,
	ordinal: ordinal,
	querystring: querystring,
	querystringDecode: querystringDecode,
	safeGet: safeGet,
	stringLength: stringLength,
	stringToByteArray: stringToByteArray,
	stringify: stringify,
	validateArgCount: validateArgCount,
	validateCallback: validateCallback,
	validateContextObject: validateContextObject,
	validateIndexedDBOpenable: validateIndexedDBOpenable,
	validateNamespace: validateNamespace
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(index_esm2017);

var index_cjs$1 = {};

Object.defineProperty(index_cjs$1, '__esModule', { value: true });

var tslib$2 = require$$3;
var util$1 = require$$1;

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
var Component = /** @class */ (function () {
    /**
     *
     * @param name The public service name, e.g. app, auth, firestore, database
     * @param instanceFactory Service factory responsible for creating the public interface
     * @param type whether the service provided by the component is public or private
     */
    function Component(name, instanceFactory, type) {
        this.name = name;
        this.instanceFactory = instanceFactory;
        this.type = type;
        this.multipleInstances = false;
        /**
         * Properties to be added to the service namespace
         */
        this.serviceProps = {};
        this.instantiationMode = "LAZY" /* LAZY */;
        this.onInstanceCreated = null;
    }
    Component.prototype.setInstantiationMode = function (mode) {
        this.instantiationMode = mode;
        return this;
    };
    Component.prototype.setMultipleInstances = function (multipleInstances) {
        this.multipleInstances = multipleInstances;
        return this;
    };
    Component.prototype.setServiceProps = function (props) {
        this.serviceProps = props;
        return this;
    };
    Component.prototype.setInstanceCreatedCallback = function (callback) {
        this.onInstanceCreated = callback;
        return this;
    };
    return Component;
}());

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_ENTRY_NAME = '[DEFAULT]';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */
var Provider = /** @class */ (function () {
    function Provider(name, container) {
        this.name = name;
        this.container = container;
        this.component = null;
        this.instances = new Map();
        this.instancesDeferred = new Map();
        this.instancesOptions = new Map();
        this.onInitCallbacks = new Map();
    }
    /**
     * @param identifier A provider can provide mulitple instances of a service
     * if this.component.multipleInstances is true.
     */
    Provider.prototype.get = function (identifier) {
        // if multipleInstances is not supported, use the default name
        var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        if (!this.instancesDeferred.has(normalizedIdentifier)) {
            var deferred = new util$1.Deferred();
            this.instancesDeferred.set(normalizedIdentifier, deferred);
            if (this.isInitialized(normalizedIdentifier) ||
                this.shouldAutoInitialize()) {
                // initialize the service if it can be auto-initialized
                try {
                    var instance = this.getOrInitializeService({
                        instanceIdentifier: normalizedIdentifier
                    });
                    if (instance) {
                        deferred.resolve(instance);
                    }
                }
                catch (e) {
                    // when the instance factory throws an exception during get(), it should not cause
                    // a fatal error. We just return the unresolved promise in this case.
                }
            }
        }
        return this.instancesDeferred.get(normalizedIdentifier).promise;
    };
    Provider.prototype.getImmediate = function (options) {
        var _a;
        // if multipleInstances is not supported, use the default name
        var normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
        var optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
        if (this.isInitialized(normalizedIdentifier) ||
            this.shouldAutoInitialize()) {
            try {
                return this.getOrInitializeService({
                    instanceIdentifier: normalizedIdentifier
                });
            }
            catch (e) {
                if (optional) {
                    return null;
                }
                else {
                    throw e;
                }
            }
        }
        else {
            // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
            if (optional) {
                return null;
            }
            else {
                throw Error("Service " + this.name + " is not available");
            }
        }
    };
    Provider.prototype.getComponent = function () {
        return this.component;
    };
    Provider.prototype.setComponent = function (component) {
        var e_1, _a;
        if (component.name !== this.name) {
            throw Error("Mismatching Component " + component.name + " for Provider " + this.name + ".");
        }
        if (this.component) {
            throw Error("Component for " + this.name + " has already been provided");
        }
        this.component = component;
        // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)
        if (!this.shouldAutoInitialize()) {
            return;
        }
        // if the service is eager, initialize the default instance
        if (isComponentEager(component)) {
            try {
                this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME });
            }
            catch (e) {
                // when the instance factory for an eager Component throws an exception during the eager
                // initialization, it should not cause a fatal error.
                // TODO: Investigate if we need to make it configurable, because some component may want to cause
                // a fatal error in this case?
            }
        }
        try {
            // Create service instances for the pending promises and resolve them
            // NOTE: if this.multipleInstances is false, only the default instance will be created
            // and all promises with resolve with it regardless of the identifier.
            for (var _b = tslib$2.__values(this.instancesDeferred.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = tslib$2.__read(_c.value, 2), instanceIdentifier = _d[0], instanceDeferred = _d[1];
                var normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                try {
                    // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
                    var instance = this.getOrInitializeService({
                        instanceIdentifier: normalizedIdentifier
                    });
                    instanceDeferred.resolve(instance);
                }
                catch (e) {
                    // when the instance factory throws an exception, it should not cause
                    // a fatal error. We just leave the promise unresolved.
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Provider.prototype.clearInstance = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        this.instancesDeferred.delete(identifier);
        this.instancesOptions.delete(identifier);
        this.instances.delete(identifier);
    };
    // app.delete() will call this method on every provider to delete the services
    // TODO: should we mark the provider as deleted?
    Provider.prototype.delete = function () {
        return tslib$2.__awaiter(this, void 0, void 0, function () {
            var services;
            return tslib$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        services = Array.from(this.instances.values());
                        return [4 /*yield*/, Promise.all(tslib$2.__spreadArray(tslib$2.__spreadArray([], tslib$2.__read(services
                                .filter(function (service) { return 'INTERNAL' in service; }) // legacy services
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                .map(function (service) { return service.INTERNAL.delete(); }))), tslib$2.__read(services
                                .filter(function (service) { return '_delete' in service; }) // modularized services
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                .map(function (service) { return service._delete(); }))))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Provider.prototype.isComponentSet = function () {
        return this.component != null;
    };
    Provider.prototype.isInitialized = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        return this.instances.has(identifier);
    };
    Provider.prototype.getOptions = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        return this.instancesOptions.get(identifier) || {};
    };
    Provider.prototype.initialize = function (opts) {
        var e_2, _a;
        if (opts === void 0) { opts = {}; }
        var _b = opts.options, options = _b === void 0 ? {} : _b;
        var normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
        if (this.isInitialized(normalizedIdentifier)) {
            throw Error(this.name + "(" + normalizedIdentifier + ") has already been initialized");
        }
        if (!this.isComponentSet()) {
            throw Error("Component " + this.name + " has not been registered yet");
        }
        var instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier,
            options: options
        });
        try {
            // resolve any pending promise waiting for the service instance
            for (var _c = tslib$2.__values(this.instancesDeferred.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = tslib$2.__read(_d.value, 2), instanceIdentifier = _e[0], instanceDeferred = _e[1];
                var normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                if (normalizedIdentifier === normalizedDeferredIdentifier) {
                    instanceDeferred.resolve(instance);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return instance;
    };
    /**
     *
     * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
     * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
     *
     * @param identifier An optional instance identifier
     * @returns a function to unregister the callback
     */
    Provider.prototype.onInit = function (callback, identifier) {
        var _a;
        var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        var existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
        existingCallbacks.add(callback);
        this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
        var existingInstance = this.instances.get(normalizedIdentifier);
        if (existingInstance) {
            callback(existingInstance, normalizedIdentifier);
        }
        return function () {
            existingCallbacks.delete(callback);
        };
    };
    /**
     * Invoke onInit callbacks synchronously
     * @param instance the service instance`
     */
    Provider.prototype.invokeOnInitCallbacks = function (instance, identifier) {
        var e_3, _a;
        var callbacks = this.onInitCallbacks.get(identifier);
        if (!callbacks) {
            return;
        }
        try {
            for (var callbacks_1 = tslib$2.__values(callbacks), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
                var callback = callbacks_1_1.value;
                try {
                    callback(instance, identifier);
                }
                catch (_b) {
                    // ignore errors in the onInit callback
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (callbacks_1_1 && !callbacks_1_1.done && (_a = callbacks_1.return)) _a.call(callbacks_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    Provider.prototype.getOrInitializeService = function (_a) {
        var instanceIdentifier = _a.instanceIdentifier, _b = _a.options, options = _b === void 0 ? {} : _b;
        var instance = this.instances.get(instanceIdentifier);
        if (!instance && this.component) {
            instance = this.component.instanceFactory(this.container, {
                instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
                options: options
            });
            this.instances.set(instanceIdentifier, instance);
            this.instancesOptions.set(instanceIdentifier, options);
            /**
             * Invoke onInit listeners.
             * Note this.component.onInstanceCreated is different, which is used by the component creator,
             * while onInit listeners are registered by consumers of the provider.
             */
            this.invokeOnInitCallbacks(instance, instanceIdentifier);
            /**
             * Order is important
             * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
             * makes `isInitialized()` return true.
             */
            if (this.component.onInstanceCreated) {
                try {
                    this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
                }
                catch (_c) {
                    // ignore errors in the onInstanceCreatedCallback
                }
            }
        }
        return instance || null;
    };
    Provider.prototype.normalizeInstanceIdentifier = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        if (this.component) {
            return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
        }
        else {
            return identifier; // assume multiple instances are supported before the component is provided.
        }
    };
    Provider.prototype.shouldAutoInitialize = function () {
        return (!!this.component &&
            this.component.instantiationMode !== "EXPLICIT" /* EXPLICIT */);
    };
    return Provider;
}());
// undefined should be passed to the service factory for the default instance
function normalizeIdentifierForFactory(identifier) {
    return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
    return component.instantiationMode === "EAGER" /* EAGER */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */
var ComponentContainer = /** @class */ (function () {
    function ComponentContainer(name) {
        this.name = name;
        this.providers = new Map();
    }
    /**
     *
     * @param component Component being added
     * @param overwrite When a component with the same name has already been registered,
     * if overwrite is true: overwrite the existing component with the new component and create a new
     * provider with the new component. It can be useful in tests where you want to use different mocks
     * for different tests.
     * if overwrite is false: throw an exception
     */
    ComponentContainer.prototype.addComponent = function (component) {
        var provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            throw new Error("Component " + component.name + " has already been registered with " + this.name);
        }
        provider.setComponent(component);
    };
    ComponentContainer.prototype.addOrOverwriteComponent = function (component) {
        var provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            // delete the existing provider from the container, so we can register the new component
            this.providers.delete(component.name);
        }
        this.addComponent(component);
    };
    /**
     * getProvider provides a type safe interface where it can only be called with a field name
     * present in NameServiceMapping interface.
     *
     * Firebase SDKs providing services should extend NameServiceMapping interface to register
     * themselves.
     */
    ComponentContainer.prototype.getProvider = function (name) {
        if (this.providers.has(name)) {
            return this.providers.get(name);
        }
        // create a Provider for a service that hasn't registered with Firebase
        var provider = new Provider(name, this);
        this.providers.set(name, provider);
        return provider;
    };
    ComponentContainer.prototype.getProviders = function () {
        return Array.from(this.providers.values());
    };
    return ComponentContainer;
}());

index_cjs$1.Component = Component;
index_cjs$1.ComponentContainer = ComponentContainer;
index_cjs$1.Provider = Provider;

var index_cjs = {};

(function (exports) {

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require$$3;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
/**
 * A container for all of the Logger instances
 */
var instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */
exports.LogLevel = void 0;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(exports.LogLevel || (exports.LogLevel = {}));
var levelStringToEnum = {
    'debug': exports.LogLevel.DEBUG,
    'verbose': exports.LogLevel.VERBOSE,
    'info': exports.LogLevel.INFO,
    'warn': exports.LogLevel.WARN,
    'error': exports.LogLevel.ERROR,
    'silent': exports.LogLevel.SILENT
};
/**
 * The default log level
 */
var defaultLogLevel = exports.LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
var ConsoleMethod = (_a = {},
    _a[exports.LogLevel.DEBUG] = 'log',
    _a[exports.LogLevel.VERBOSE] = 'log',
    _a[exports.LogLevel.INFO] = 'info',
    _a[exports.LogLevel.WARN] = 'warn',
    _a[exports.LogLevel.ERROR] = 'error',
    _a);
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
var defaultLogHandler = function (instance, logType) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (logType < instance.logLevel) {
        return;
    }
    var now = new Date().toISOString();
    var method = ConsoleMethod[logType];
    if (method) {
        console[method].apply(console, tslib.__spreadArray(["[" + now + "]  " + instance.name + ":"], args));
    }
    else {
        throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
    }
};
var Logger = /** @class */ (function () {
    /**
     * Gives you an instance of a Logger to capture messages according to
     * Firebase's logging scheme.
     *
     * @param name The name that the logs will be associated with
     */
    function Logger(name) {
        this.name = name;
        /**
         * The log level of the given Logger instance.
         */
        this._logLevel = defaultLogLevel;
        /**
         * The main (internal) log handler for the Logger instance.
         * Can be set to a new function in internal package code but not by user.
         */
        this._logHandler = defaultLogHandler;
        /**
         * The optional, additional, user-defined log handler for the Logger instance.
         */
        this._userLogHandler = null;
        /**
         * Capture the current instance for later use
         */
        instances.push(this);
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function () {
            return this._logLevel;
        },
        set: function (val) {
            if (!(val in exports.LogLevel)) {
                throw new TypeError("Invalid value \"" + val + "\" assigned to `logLevel`");
            }
            this._logLevel = val;
        },
        enumerable: false,
        configurable: true
    });
    // Workaround for setter/getter having to be the same type.
    Logger.prototype.setLogLevel = function (val) {
        this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
    };
    Object.defineProperty(Logger.prototype, "logHandler", {
        get: function () {
            return this._logHandler;
        },
        set: function (val) {
            if (typeof val !== 'function') {
                throw new TypeError('Value assigned to `logHandler` must be a function');
            }
            this._logHandler = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "userLogHandler", {
        get: function () {
            return this._userLogHandler;
        },
        set: function (val) {
            this._userLogHandler = val;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * The functions below are all based on the `console` interface
     */
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.DEBUG], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.DEBUG], args));
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.VERBOSE], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.VERBOSE], args));
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.INFO], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.INFO], args));
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.WARN], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.WARN], args));
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.ERROR], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.ERROR], args));
    };
    return Logger;
}());
function setLogLevel(level) {
    instances.forEach(function (inst) {
        inst.setLogLevel(level);
    });
}
function setUserLogHandler(logCallback, options) {
    var _loop_1 = function (instance) {
        var customLogLevel = null;
        if (options && options.level) {
            customLogLevel = levelStringToEnum[options.level];
        }
        if (logCallback === null) {
            instance.userLogHandler = null;
        }
        else {
            instance.userLogHandler = function (instance, level) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                var message = args
                    .map(function (arg) {
                    if (arg == null) {
                        return null;
                    }
                    else if (typeof arg === 'string') {
                        return arg;
                    }
                    else if (typeof arg === 'number' || typeof arg === 'boolean') {
                        return arg.toString();
                    }
                    else if (arg instanceof Error) {
                        return arg.message;
                    }
                    else {
                        try {
                            return JSON.stringify(arg);
                        }
                        catch (ignored) {
                            return null;
                        }
                    }
                })
                    .filter(function (arg) { return arg; })
                    .join(' ');
                if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
                    logCallback({
                        level: exports.LogLevel[level].toLowerCase(),
                        message: message,
                        args: args,
                        type: instance.name
                    });
                }
            };
        }
    };
    for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
        var instance = instances_1[_i];
        _loop_1(instance);
    }
}

exports.Logger = Logger;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;

}(index_cjs));

var tslib$1 = require$$3;
var util = require$$1;
var app$1 = require$$2;
var component = index_cjs$1;
var logger = index_cjs;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _debugErrorMap() {
    var _a;
    return _a = {},
        _a["admin-restricted-operation" /* ADMIN_ONLY_OPERATION */] = 'This operation is restricted to administrators only.',
        _a["argument-error" /* ARGUMENT_ERROR */] = '',
        _a["app-not-authorized" /* APP_NOT_AUTHORIZED */] = "This app, identified by the domain where it's hosted, is not " +
            'authorized to use Firebase Authentication with the provided API key. ' +
            'Review your key configuration in the Google API console.',
        _a["app-not-installed" /* APP_NOT_INSTALLED */] = 'The requested mobile application corresponding to the identifier (' +
            'Android package name or iOS bundle ID) provided is not installed on ' +
            'this device.',
        _a["captcha-check-failed" /* CAPTCHA_CHECK_FAILED */] = 'The reCAPTCHA response token provided is either invalid, expired, ' +
            'already used or the domain associated with it does not match the list ' +
            'of whitelisted domains.',
        _a["code-expired" /* CODE_EXPIRED */] = 'The SMS code has expired. Please re-send the verification code to try ' +
            'again.',
        _a["cordova-not-ready" /* CORDOVA_NOT_READY */] = 'Cordova framework is not ready.',
        _a["cors-unsupported" /* CORS_UNSUPPORTED */] = 'This browser is not supported.',
        _a["credential-already-in-use" /* CREDENTIAL_ALREADY_IN_USE */] = 'This credential is already associated with a different user account.',
        _a["custom-token-mismatch" /* CREDENTIAL_MISMATCH */] = 'The custom token corresponds to a different audience.',
        _a["requires-recent-login" /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */] = 'This operation is sensitive and requires recent authentication. Log in ' +
            'again before retrying this request.',
        _a["dependent-sdk-initialized-before-auth" /* DEPENDENT_SDK_INIT_BEFORE_AUTH */] = 'Another Firebase SDK was initialized and is trying to use Auth before Auth is ' +
            'initialized. Please be sure to call `initializeAuth` or `getAuth` before ' +
            'starting any other Firebase SDK.',
        _a["dynamic-link-not-activated" /* DYNAMIC_LINK_NOT_ACTIVATED */] = 'Please activate Dynamic Links in the Firebase Console and agree to the terms and ' +
            'conditions.',
        _a["email-change-needs-verification" /* EMAIL_CHANGE_NEEDS_VERIFICATION */] = 'Multi-factor users must always have a verified email.',
        _a["email-already-in-use" /* EMAIL_EXISTS */] = 'The email address is already in use by another account.',
        _a["emulator-config-failed" /* EMULATOR_CONFIG_FAILED */] = 'Auth instance has already been used to make a network call. Auth can ' +
            'no longer be configured to use the emulator. Try calling ' +
            '"connectAuthEmulator()" sooner.',
        _a["expired-action-code" /* EXPIRED_OOB_CODE */] = 'The action code has expired.',
        _a["cancelled-popup-request" /* EXPIRED_POPUP_REQUEST */] = 'This operation has been cancelled due to another conflicting popup being opened.',
        _a["internal-error" /* INTERNAL_ERROR */] = 'An internal AuthError has occurred.',
        _a["invalid-app-credential" /* INVALID_APP_CREDENTIAL */] = 'The phone verification request contains an invalid application verifier.' +
            ' The reCAPTCHA token response is either invalid or expired.',
        _a["invalid-app-id" /* INVALID_APP_ID */] = 'The mobile app identifier is not registed for the current project.',
        _a["invalid-user-token" /* INVALID_AUTH */] = "This user's credential isn't valid for this project. This can happen " +
            "if the user's token has been tampered with, or if the user isn't for " +
            'the project associated with this API key.',
        _a["invalid-auth-event" /* INVALID_AUTH_EVENT */] = 'An internal AuthError has occurred.',
        _a["invalid-verification-code" /* INVALID_CODE */] = 'The SMS verification code used to create the phone auth credential is ' +
            'invalid. Please resend the verification code sms and be sure to use the ' +
            'verification code provided by the user.',
        _a["invalid-continue-uri" /* INVALID_CONTINUE_URI */] = 'The continue URL provided in the request is invalid.',
        _a["invalid-cordova-configuration" /* INVALID_CORDOVA_CONFIGURATION */] = 'The following Cordova plugins must be installed to enable OAuth sign-in: ' +
            'cordova-plugin-buildinfo, cordova-universal-links-plugin, ' +
            'cordova-plugin-browsertab, cordova-plugin-inappbrowser and ' +
            'cordova-plugin-customurlscheme.',
        _a["invalid-custom-token" /* INVALID_CUSTOM_TOKEN */] = 'The custom token format is incorrect. Please check the documentation.',
        _a["invalid-dynamic-link-domain" /* INVALID_DYNAMIC_LINK_DOMAIN */] = 'The provided dynamic link domain is not configured or authorized for the current project.',
        _a["invalid-email" /* INVALID_EMAIL */] = 'The email address is badly formatted.',
        _a["invalid-emulator-scheme" /* INVALID_EMULATOR_SCHEME */] = 'Emulator URL must start with a valid scheme (http:// or https://).',
        _a["invalid-api-key" /* INVALID_API_KEY */] = 'Your API key is invalid, please check you have copied it correctly.',
        _a["invalid-cert-hash" /* INVALID_CERT_HASH */] = 'The SHA-1 certificate hash provided is invalid.',
        _a["invalid-credential" /* INVALID_IDP_RESPONSE */] = 'The supplied auth credential is malformed or has expired.',
        _a["invalid-message-payload" /* INVALID_MESSAGE_PAYLOAD */] = 'The email template corresponding to this action contains invalid characters in its message. ' +
            'Please fix by going to the Auth email templates section in the Firebase Console.',
        _a["invalid-multi-factor-session" /* INVALID_MFA_SESSION */] = 'The request does not contain a valid proof of first factor successful sign-in.',
        _a["invalid-oauth-provider" /* INVALID_OAUTH_PROVIDER */] = 'EmailAuthProvider is not supported for this operation. This operation ' +
            'only supports OAuth providers.',
        _a["invalid-oauth-client-id" /* INVALID_OAUTH_CLIENT_ID */] = 'The OAuth client ID provided is either invalid or does not match the ' +
            'specified API key.',
        _a["unauthorized-domain" /* INVALID_ORIGIN */] = 'This domain is not authorized for OAuth operations for your Firebase ' +
            'project. Edit the list of authorized domains from the Firebase console.',
        _a["invalid-action-code" /* INVALID_OOB_CODE */] = 'The action code is invalid. This can happen if the code is malformed, ' +
            'expired, or has already been used.',
        _a["wrong-password" /* INVALID_PASSWORD */] = 'The password is invalid or the user does not have a password.',
        _a["invalid-persistence-type" /* INVALID_PERSISTENCE */] = 'The specified persistence type is invalid. It can only be local, session or none.',
        _a["invalid-phone-number" /* INVALID_PHONE_NUMBER */] = 'The format of the phone number provided is incorrect. Please enter the ' +
            'phone number in a format that can be parsed into E.164 format. E.164 ' +
            'phone numbers are written in the format [+][country code][subscriber ' +
            'number including area code].',
        _a["invalid-provider-id" /* INVALID_PROVIDER_ID */] = 'The specified provider ID is invalid.',
        _a["invalid-recipient-email" /* INVALID_RECIPIENT_EMAIL */] = 'The email corresponding to this action failed to send as the provided ' +
            'recipient email address is invalid.',
        _a["invalid-sender" /* INVALID_SENDER */] = 'The email template corresponding to this action contains an invalid sender email or name. ' +
            'Please fix by going to the Auth email templates section in the Firebase Console.',
        _a["invalid-verification-id" /* INVALID_SESSION_INFO */] = 'The verification ID used to create the phone auth credential is invalid.',
        _a["invalid-tenant-id" /* INVALID_TENANT_ID */] = "The Auth instance's tenant ID is invalid.",
        _a["missing-android-pkg-name" /* MISSING_ANDROID_PACKAGE_NAME */] = 'An Android Package Name must be provided if the Android App is required to be installed.',
        _a["auth-domain-config-required" /* MISSING_AUTH_DOMAIN */] = 'Be sure to include authDomain when calling firebase.initializeApp(), ' +
            'by following the instructions in the Firebase console.',
        _a["missing-app-credential" /* MISSING_APP_CREDENTIAL */] = 'The phone verification request is missing an application verifier ' +
            'assertion. A reCAPTCHA response token needs to be provided.',
        _a["missing-verification-code" /* MISSING_CODE */] = 'The phone auth credential was created with an empty SMS verification code.',
        _a["missing-continue-uri" /* MISSING_CONTINUE_URI */] = 'A continue URL must be provided in the request.',
        _a["missing-iframe-start" /* MISSING_IFRAME_START */] = 'An internal AuthError has occurred.',
        _a["missing-ios-bundle-id" /* MISSING_IOS_BUNDLE_ID */] = 'An iOS Bundle ID must be provided if an App Store ID is provided.',
        _a["missing-or-invalid-nonce" /* MISSING_OR_INVALID_NONCE */] = 'The request does not contain a valid nonce. This can occur if the ' +
            'SHA-256 hash of the provided raw nonce does not match the hashed nonce ' +
            'in the ID token payload.',
        _a["missing-multi-factor-info" /* MISSING_MFA_INFO */] = 'No second factor identifier is provided.',
        _a["missing-multi-factor-session" /* MISSING_MFA_SESSION */] = 'The request is missing proof of first factor successful sign-in.',
        _a["missing-phone-number" /* MISSING_PHONE_NUMBER */] = 'To send verification codes, provide a phone number for the recipient.',
        _a["missing-verification-id" /* MISSING_SESSION_INFO */] = 'The phone auth credential was created with an empty verification ID.',
        _a["app-deleted" /* MODULE_DESTROYED */] = 'This instance of FirebaseApp has been deleted.',
        _a["multi-factor-info-not-found" /* MFA_INFO_NOT_FOUND */] = 'The user does not have a second factor matching the identifier provided.',
        _a["multi-factor-auth-required" /* MFA_REQUIRED */] = 'Proof of ownership of a second factor is required to complete sign-in.',
        _a["account-exists-with-different-credential" /* NEED_CONFIRMATION */] = 'An account already exists with the same email address but different ' +
            'sign-in credentials. Sign in using a provider associated with this ' +
            'email address.',
        _a["network-request-failed" /* NETWORK_REQUEST_FAILED */] = 'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',
        _a["no-auth-event" /* NO_AUTH_EVENT */] = 'An internal AuthError has occurred.',
        _a["no-such-provider" /* NO_SUCH_PROVIDER */] = 'User was not linked to an account with the given provider.',
        _a["null-user" /* NULL_USER */] = 'A null user object was provided as the argument for an operation which ' +
            'requires a non-null user object.',
        _a["operation-not-allowed" /* OPERATION_NOT_ALLOWED */] = 'The given sign-in provider is disabled for this Firebase project. ' +
            'Enable it in the Firebase console, under the sign-in method tab of the ' +
            'Auth section.',
        _a["operation-not-supported-in-this-environment" /* OPERATION_NOT_SUPPORTED */] = 'This operation is not supported in the environment this application is ' +
            'running on. "location.protocol" must be http, https or chrome-extension' +
            ' and web storage must be enabled.',
        _a["popup-blocked" /* POPUP_BLOCKED */] = 'Unable to establish a connection with the popup. It may have been blocked by the browser.',
        _a["popup-closed-by-user" /* POPUP_CLOSED_BY_USER */] = 'The popup has been closed by the user before finalizing the operation.',
        _a["provider-already-linked" /* PROVIDER_ALREADY_LINKED */] = 'User can only be linked to one identity for the given provider.',
        _a["quota-exceeded" /* QUOTA_EXCEEDED */] = "The project's quota for this operation has been exceeded.",
        _a["redirect-cancelled-by-user" /* REDIRECT_CANCELLED_BY_USER */] = 'The redirect operation has been cancelled by the user before finalizing.',
        _a["redirect-operation-pending" /* REDIRECT_OPERATION_PENDING */] = 'A redirect sign-in operation is already pending.',
        _a["rejected-credential" /* REJECTED_CREDENTIAL */] = 'The request contains malformed or mismatching credentials.',
        _a["second-factor-already-in-use" /* SECOND_FACTOR_ALREADY_ENROLLED */] = 'The second factor is already enrolled on this account.',
        _a["maximum-second-factor-count-exceeded" /* SECOND_FACTOR_LIMIT_EXCEEDED */] = 'The maximum allowed number of second factors on a user has been exceeded.',
        _a["tenant-id-mismatch" /* TENANT_ID_MISMATCH */] = "The provided tenant ID does not match the Auth instance's tenant ID",
        _a["timeout" /* TIMEOUT */] = 'The operation has timed out.',
        _a["user-token-expired" /* TOKEN_EXPIRED */] = "The user's credential is no longer valid. The user must sign in again.",
        _a["too-many-requests" /* TOO_MANY_ATTEMPTS_TRY_LATER */] = 'We have blocked all requests from this device due to unusual activity. ' +
            'Try again later.',
        _a["unauthorized-continue-uri" /* UNAUTHORIZED_DOMAIN */] = 'The domain of the continue URL is not whitelisted.  Please whitelist ' +
            'the domain in the Firebase console.',
        _a["unsupported-first-factor" /* UNSUPPORTED_FIRST_FACTOR */] = 'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
        _a["unsupported-persistence-type" /* UNSUPPORTED_PERSISTENCE */] = 'The current environment does not support the specified persistence type.',
        _a["unsupported-tenant-operation" /* UNSUPPORTED_TENANT_OPERATION */] = 'This operation is not supported in a multi-tenant context.',
        _a["unverified-email" /* UNVERIFIED_EMAIL */] = 'The operation requires a verified email.',
        _a["user-cancelled" /* USER_CANCELLED */] = 'The user did not grant your application the permissions it requested.',
        _a["user-not-found" /* USER_DELETED */] = 'There is no user record corresponding to this identifier. The user may ' +
            'have been deleted.',
        _a["user-disabled" /* USER_DISABLED */] = 'The user account has been disabled by an administrator.',
        _a["user-mismatch" /* USER_MISMATCH */] = 'The supplied credentials do not correspond to the previously signed in user.',
        _a["user-signed-out" /* USER_SIGNED_OUT */] = '',
        _a["weak-password" /* WEAK_PASSWORD */] = 'The password must be 6 characters long or more.',
        _a["web-storage-unsupported" /* WEB_STORAGE_UNSUPPORTED */] = 'This browser is not supported or 3rd party cookies and data may be disabled.',
        _a["already-initialized" /* ALREADY_INITIALIZED */] = 'initializeAuth() has already been called with ' +
            'different options. To avoid this error, call initializeAuth() with the ' +
            'same options as when it was originally called, or call getAuth() to return the' +
            ' already initialized instance.',
        _a;
}
function _prodErrorMap() {
    var _a;
    // We will include this one message in the prod error map since by the very
    // nature of this error, developers will never be able to see the message
    // using the debugErrorMap (which is installed during auth initialization).
    return _a = {},
        _a["dependent-sdk-initialized-before-auth" /* DEPENDENT_SDK_INIT_BEFORE_AUTH */] = 'Another Firebase SDK was initialized and is trying to use Auth before Auth is ' +
            'initialized. Please be sure to call `initializeAuth` or `getAuth` before ' +
            'starting any other Firebase SDK.',
        _a;
}
/**
 * A verbose error map with detailed descriptions for most error codes.
 *
 * See discussion at {@link AuthErrorMap}
 *
 * @public
 */
var debugErrorMap$1 = _debugErrorMap;
/**
 * A minimal error map with all verbose error messages stripped.
 *
 * See discussion at {@link AuthErrorMap}
 *
 * @public
 */
var prodErrorMap$1 = _prodErrorMap;
var _DEFAULT_AUTH_ERROR_FACTORY = new util.ErrorFactory('auth', 'Firebase', _prodErrorMap());
/**
 * A map of potential `Auth` error codes, for easier comparison with errors
 * thrown by the SDK.
 *
 * @remarks
 * Note that you can't tree-shake individual keys
 * in the map, so by using the map you might substantially increase your
 * bundle size.
 *
 * @public
 */
var AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY = {
    ADMIN_ONLY_OPERATION: 'auth/admin-restricted-operation',
    ARGUMENT_ERROR: 'auth/argument-error',
    APP_NOT_AUTHORIZED: 'auth/app-not-authorized',
    APP_NOT_INSTALLED: 'auth/app-not-installed',
    CAPTCHA_CHECK_FAILED: 'auth/captcha-check-failed',
    CODE_EXPIRED: 'auth/code-expired',
    CORDOVA_NOT_READY: 'auth/cordova-not-ready',
    CORS_UNSUPPORTED: 'auth/cors-unsupported',
    CREDENTIAL_ALREADY_IN_USE: 'auth/credential-already-in-use',
    CREDENTIAL_MISMATCH: 'auth/custom-token-mismatch',
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'auth/requires-recent-login',
    DEPENDENT_SDK_INIT_BEFORE_AUTH: 'auth/dependent-sdk-initialized-before-auth',
    DYNAMIC_LINK_NOT_ACTIVATED: 'auth/dynamic-link-not-activated',
    EMAIL_CHANGE_NEEDS_VERIFICATION: 'auth/email-change-needs-verification',
    EMAIL_EXISTS: 'auth/email-already-in-use',
    EMULATOR_CONFIG_FAILED: 'auth/emulator-config-failed',
    EXPIRED_OOB_CODE: 'auth/expired-action-code',
    EXPIRED_POPUP_REQUEST: 'auth/cancelled-popup-request',
    INTERNAL_ERROR: 'auth/internal-error',
    INVALID_API_KEY: 'auth/invalid-api-key',
    INVALID_APP_CREDENTIAL: 'auth/invalid-app-credential',
    INVALID_APP_ID: 'auth/invalid-app-id',
    INVALID_AUTH: 'auth/invalid-user-token',
    INVALID_AUTH_EVENT: 'auth/invalid-auth-event',
    INVALID_CERT_HASH: 'auth/invalid-cert-hash',
    INVALID_CODE: 'auth/invalid-verification-code',
    INVALID_CONTINUE_URI: 'auth/invalid-continue-uri',
    INVALID_CORDOVA_CONFIGURATION: 'auth/invalid-cordova-configuration',
    INVALID_CUSTOM_TOKEN: 'auth/invalid-custom-token',
    INVALID_DYNAMIC_LINK_DOMAIN: 'auth/invalid-dynamic-link-domain',
    INVALID_EMAIL: 'auth/invalid-email',
    INVALID_EMULATOR_SCHEME: 'auth/invalid-emulator-scheme',
    INVALID_IDP_RESPONSE: 'auth/invalid-credential',
    INVALID_MESSAGE_PAYLOAD: 'auth/invalid-message-payload',
    INVALID_MFA_SESSION: 'auth/invalid-multi-factor-session',
    INVALID_OAUTH_CLIENT_ID: 'auth/invalid-oauth-client-id',
    INVALID_OAUTH_PROVIDER: 'auth/invalid-oauth-provider',
    INVALID_OOB_CODE: 'auth/invalid-action-code',
    INVALID_ORIGIN: 'auth/unauthorized-domain',
    INVALID_PASSWORD: 'auth/wrong-password',
    INVALID_PERSISTENCE: 'auth/invalid-persistence-type',
    INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
    INVALID_PROVIDER_ID: 'auth/invalid-provider-id',
    INVALID_RECIPIENT_EMAIL: 'auth/invalid-recipient-email',
    INVALID_SENDER: 'auth/invalid-sender',
    INVALID_SESSION_INFO: 'auth/invalid-verification-id',
    INVALID_TENANT_ID: 'auth/invalid-tenant-id',
    MFA_INFO_NOT_FOUND: 'auth/multi-factor-info-not-found',
    MFA_REQUIRED: 'auth/multi-factor-auth-required',
    MISSING_ANDROID_PACKAGE_NAME: 'auth/missing-android-pkg-name',
    MISSING_APP_CREDENTIAL: 'auth/missing-app-credential',
    MISSING_AUTH_DOMAIN: 'auth/auth-domain-config-required',
    MISSING_CODE: 'auth/missing-verification-code',
    MISSING_CONTINUE_URI: 'auth/missing-continue-uri',
    MISSING_IFRAME_START: 'auth/missing-iframe-start',
    MISSING_IOS_BUNDLE_ID: 'auth/missing-ios-bundle-id',
    MISSING_OR_INVALID_NONCE: 'auth/missing-or-invalid-nonce',
    MISSING_MFA_INFO: 'auth/missing-multi-factor-info',
    MISSING_MFA_SESSION: 'auth/missing-multi-factor-session',
    MISSING_PHONE_NUMBER: 'auth/missing-phone-number',
    MISSING_SESSION_INFO: 'auth/missing-verification-id',
    MODULE_DESTROYED: 'auth/app-deleted',
    NEED_CONFIRMATION: 'auth/account-exists-with-different-credential',
    NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
    NULL_USER: 'auth/null-user',
    NO_AUTH_EVENT: 'auth/no-auth-event',
    NO_SUCH_PROVIDER: 'auth/no-such-provider',
    OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
    OPERATION_NOT_SUPPORTED: 'auth/operation-not-supported-in-this-environment',
    POPUP_BLOCKED: 'auth/popup-blocked',
    POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
    PROVIDER_ALREADY_LINKED: 'auth/provider-already-linked',
    QUOTA_EXCEEDED: 'auth/quota-exceeded',
    REDIRECT_CANCELLED_BY_USER: 'auth/redirect-cancelled-by-user',
    REDIRECT_OPERATION_PENDING: 'auth/redirect-operation-pending',
    REJECTED_CREDENTIAL: 'auth/rejected-credential',
    SECOND_FACTOR_ALREADY_ENROLLED: 'auth/second-factor-already-in-use',
    SECOND_FACTOR_LIMIT_EXCEEDED: 'auth/maximum-second-factor-count-exceeded',
    TENANT_ID_MISMATCH: 'auth/tenant-id-mismatch',
    TIMEOUT: 'auth/timeout',
    TOKEN_EXPIRED: 'auth/user-token-expired',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'auth/too-many-requests',
    UNAUTHORIZED_DOMAIN: 'auth/unauthorized-continue-uri',
    UNSUPPORTED_FIRST_FACTOR: 'auth/unsupported-first-factor',
    UNSUPPORTED_PERSISTENCE: 'auth/unsupported-persistence-type',
    UNSUPPORTED_TENANT_OPERATION: 'auth/unsupported-tenant-operation',
    UNVERIFIED_EMAIL: 'auth/unverified-email',
    USER_CANCELLED: 'auth/user-cancelled',
    USER_DELETED: 'auth/user-not-found',
    USER_DISABLED: 'auth/user-disabled',
    USER_MISMATCH: 'auth/user-mismatch',
    USER_SIGNED_OUT: 'auth/user-signed-out',
    WEAK_PASSWORD: 'auth/weak-password',
    WEB_STORAGE_UNSUPPORTED: 'auth/web-storage-unsupported',
    ALREADY_INITIALIZED: 'auth/already-initialized'
};

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logClient = new logger.Logger('@firebase/auth');
function _logError(msg) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (logClient.logLevel <= logger.LogLevel.ERROR) {
        logClient.error.apply(logClient, tslib$1.__spreadArray(["Auth (" + app$1.SDK_VERSION + "): " + msg], args));
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _fail(authOrCode) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    throw createErrorInternal.apply(void 0, tslib$1.__spreadArray([authOrCode], rest));
}
function _createError(authOrCode) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return createErrorInternal.apply(void 0, tslib$1.__spreadArray([authOrCode], rest));
}
function _errorWithCustomMessage(auth, code, message) {
    var _a;
    var errorMap = tslib$1.__assign(tslib$1.__assign({}, prodErrorMap$1()), (_a = {}, _a[code] = message, _a));
    var factory = new util.ErrorFactory('auth', 'Firebase', errorMap);
    return factory.create(code, {
        appName: auth.name,
    });
}
function _assertInstanceOf(auth, object, instance) {
    var constructorInstance = instance;
    if (!(object instanceof constructorInstance)) {
        if (constructorInstance.name !== object.constructor.name) {
            _fail(auth, "argument-error" /* ARGUMENT_ERROR */);
        }
        throw _errorWithCustomMessage(auth, "argument-error" /* ARGUMENT_ERROR */, "Type of " + object.constructor.name + " does not match expected instance." +
            "Did you pass a reference from a different Auth SDK?");
    }
}
function createErrorInternal(authOrCode) {
    var _a;
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    if (typeof authOrCode !== 'string') {
        var code = rest[0];
        var fullParams = tslib$1.__spreadArray([], rest.slice(1));
        if (fullParams[0]) {
            fullParams[0].appName = authOrCode.name;
        }
        return (_a = authOrCode._errorFactory).create.apply(_a, tslib$1.__spreadArray([code], fullParams));
    }
    return _DEFAULT_AUTH_ERROR_FACTORY.create.apply(_DEFAULT_AUTH_ERROR_FACTORY, tslib$1.__spreadArray([authOrCode], rest));
}
function _assert(assertion, authOrCode) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    if (!assertion) {
        throw createErrorInternal.apply(void 0, tslib$1.__spreadArray([authOrCode], rest));
    }
}
/**
 * Unconditionally fails, throwing an internal error with the given message.
 *
 * @param failure type of failure encountered
 * @throws Error
 */
function debugFail(failure) {
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
    var message = "INTERNAL ASSERTION FAILED: " + failure;
    _logError(message);
    // NOTE: We don't use FirebaseError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
    throw new Error(message);
}
/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * @param assertion
 * @param message
 */
function debugAssert(assertion, message) {
    if (!assertion) {
        debugFail(message);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var instanceCache = new Map();
function _getInstance(cls) {
    debugAssert(cls instanceof Function, 'Expected a class definition');
    var instance = instanceCache.get(cls);
    if (instance) {
        debugAssert(instance instanceof cls, 'Instance stored in cache mismatched with class');
        return instance;
    }
    instance = new cls();
    instanceCache.set(cls, instance);
    return instance;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Initializes an {@link Auth} instance with fine-grained control over
 * {@link Dependencies}.
 *
 * @remarks
 *
 * This function allows more control over the {@link Auth} instance than
 * {@link getAuth}. `getAuth` uses platform-specific defaults to supply
 * the {@link Dependencies}. In general, `getAuth` is the easiest way to
 * initialize Auth and works for most use cases. Use `initializeAuth` if you
 * need control over which persistence layer is used, or to minimize bundle
 * size if you're not using either `signInWithPopup` or `signInWithRedirect`.
 *
 * For example, if your app only uses anonymous accounts and you only want
 * accounts saved for the current session, initialize `Auth` with:
 *
 * ```js
 * const auth = initializeAuth(app, {
 *   persistence: browserSessionPersistence,
 *   popupRedirectResolver: undefined,
 * });
 * ```
 *
 * @public
 */
function initializeAuth$1(app$1$1, deps) {
    var provider = app$1._getProvider(app$1$1, 'auth');
    if (provider.isInitialized()) {
        var auth_1 = provider.getImmediate();
        var initialOptions = provider.getOptions();
        if (util.deepEqual(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
            return auth_1;
        }
        else {
            _fail(auth_1, "already-initialized" /* ALREADY_INITIALIZED */);
        }
    }
    var auth = provider.initialize({ options: deps });
    return auth;
}
function _initializeAuthInstance(auth, deps) {
    var persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
    var hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
    if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
        auth._updateErrorMap(deps.errorMap);
    }
    // This promise is intended to float; auth initialization happens in the
    // background, meanwhile the auth object may be used by the app.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getCurrentUrl() {
    var _a;
    return (typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href)) || '';
}
function _isHttpOrHttps() {
    return _getCurrentScheme() === 'http:' || _getCurrentScheme() === 'https:';
}
function _getCurrentScheme() {
    var _a;
    return (typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol)) || null;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Determine whether the browser is working online
 */
function _isOnline() {
    if (typeof navigator !== 'undefined' &&
        navigator &&
        'onLine' in navigator &&
        typeof navigator.onLine === 'boolean' &&
        // Apply only for traditional web apps and Chrome extensions.
        // This is especially true for Cordova apps which have unreliable
        // navigator.onLine behavior unless cordova-plugin-network-information is
        // installed which overwrites the native navigator.onLine value and
        // defines navigator.connection.
        (_isHttpOrHttps() || util.isBrowserExtension() || 'connection' in navigator)) {
        return navigator.onLine;
    }
    // If we can't determine the state, assume it is online.
    return true;
}
function _getUserLanguage() {
    if (typeof navigator === 'undefined') {
        return null;
    }
    var navigatorLanguage = navigator;
    return (
    // Most reliable, but only supported in Chrome/Firefox.
    (navigatorLanguage.languages && navigatorLanguage.languages[0]) ||
        // Supported in most browsers, but returns the language of the browser
        // UI, not the language set in browser settings.
        navigatorLanguage.language ||
        // Couldn't determine language.
        null);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A structure to help pick between a range of long and short delay durations
 * depending on the current environment. In general, the long delay is used for
 * mobile environments whereas short delays are used for desktop environments.
 */
var Delay = /** @class */ (function () {
    function Delay(shortDelay, longDelay) {
        this.shortDelay = shortDelay;
        this.longDelay = longDelay;
        // Internal error when improperly initialized.
        debugAssert(longDelay > shortDelay, 'Short delay should be less than long delay!');
        this.isMobile = util.isMobileCordova() || util.isReactNative();
    }
    Delay.prototype.get = function () {
        if (!_isOnline()) {
            // Pick the shorter timeout.
            return Math.min(5000 /* OFFLINE */, this.shortDelay);
        }
        // If running in a mobile environment, return the long delay, otherwise
        // return the short delay.
        // This could be improved in the future to dynamically change based on other
        // variables instead of just reading the current environment.
        return this.isMobile ? this.longDelay : this.shortDelay;
    };
    return Delay;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _emulatorUrl(config, path) {
    debugAssert(config.emulator, 'Emulator should always be set here');
    var url = config.emulator.url;
    if (!path) {
        return url;
    }
    return "" + url + (path.startsWith('/') ? path.slice(1) : path);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var FetchProvider = /** @class */ (function () {
    function FetchProvider() {
    }
    FetchProvider.initialize = function (fetchImpl, headersImpl, responseImpl) {
        this.fetchImpl = fetchImpl;
        if (headersImpl) {
            this.headersImpl = headersImpl;
        }
        if (responseImpl) {
            this.responseImpl = responseImpl;
        }
    };
    FetchProvider.fetch = function () {
        if (this.fetchImpl) {
            return this.fetchImpl;
        }
        if (typeof self !== 'undefined' && 'fetch' in self) {
            return self.fetch;
        }
        debugFail('Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
    };
    FetchProvider.headers = function () {
        if (this.headersImpl) {
            return this.headersImpl;
        }
        if (typeof self !== 'undefined' && 'Headers' in self) {
            return self.Headers;
        }
        debugFail('Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
    };
    FetchProvider.response = function () {
        if (this.responseImpl) {
            return this.responseImpl;
        }
        if (typeof self !== 'undefined' && 'Response' in self) {
            return self.Response;
        }
        debugFail('Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
    };
    return FetchProvider;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$1;
/**
 * Map from errors returned by the server to errors to developer visible errors
 */
var SERVER_ERROR_MAP = (_a$1 = {},
    // Custom token errors.
    _a$1["CREDENTIAL_MISMATCH" /* CREDENTIAL_MISMATCH */] = "custom-token-mismatch" /* CREDENTIAL_MISMATCH */,
    // This can only happen if the SDK sends a bad request.
    _a$1["MISSING_CUSTOM_TOKEN" /* MISSING_CUSTOM_TOKEN */] = "internal-error" /* INTERNAL_ERROR */,
    // Create Auth URI errors.
    _a$1["INVALID_IDENTIFIER" /* INVALID_IDENTIFIER */] = "invalid-email" /* INVALID_EMAIL */,
    // This can only happen if the SDK sends a bad request.
    _a$1["MISSING_CONTINUE_URI" /* MISSING_CONTINUE_URI */] = "internal-error" /* INTERNAL_ERROR */,
    // Sign in with email and password errors (some apply to sign up too).
    _a$1["INVALID_PASSWORD" /* INVALID_PASSWORD */] = "wrong-password" /* INVALID_PASSWORD */,
    // This can only happen if the SDK sends a bad request.
    _a$1["MISSING_PASSWORD" /* MISSING_PASSWORD */] = "internal-error" /* INTERNAL_ERROR */,
    // Sign up with email and password errors.
    _a$1["EMAIL_EXISTS" /* EMAIL_EXISTS */] = "email-already-in-use" /* EMAIL_EXISTS */,
    _a$1["PASSWORD_LOGIN_DISABLED" /* PASSWORD_LOGIN_DISABLED */] = "operation-not-allowed" /* OPERATION_NOT_ALLOWED */,
    // Verify assertion for sign in with credential errors:
    _a$1["INVALID_IDP_RESPONSE" /* INVALID_IDP_RESPONSE */] = "invalid-credential" /* INVALID_IDP_RESPONSE */,
    _a$1["INVALID_PENDING_TOKEN" /* INVALID_PENDING_TOKEN */] = "invalid-credential" /* INVALID_IDP_RESPONSE */,
    _a$1["FEDERATED_USER_ID_ALREADY_LINKED" /* FEDERATED_USER_ID_ALREADY_LINKED */] = "credential-already-in-use" /* CREDENTIAL_ALREADY_IN_USE */,
    // This can only happen if the SDK sends a bad request.
    _a$1["MISSING_REQ_TYPE" /* MISSING_REQ_TYPE */] = "internal-error" /* INTERNAL_ERROR */,
    // Send Password reset email errors:
    _a$1["EMAIL_NOT_FOUND" /* EMAIL_NOT_FOUND */] = "user-not-found" /* USER_DELETED */,
    _a$1["RESET_PASSWORD_EXCEED_LIMIT" /* RESET_PASSWORD_EXCEED_LIMIT */] = "too-many-requests" /* TOO_MANY_ATTEMPTS_TRY_LATER */,
    _a$1["EXPIRED_OOB_CODE" /* EXPIRED_OOB_CODE */] = "expired-action-code" /* EXPIRED_OOB_CODE */,
    _a$1["INVALID_OOB_CODE" /* INVALID_OOB_CODE */] = "invalid-action-code" /* INVALID_OOB_CODE */,
    // This can only happen if the SDK sends a bad request.
    _a$1["MISSING_OOB_CODE" /* MISSING_OOB_CODE */] = "internal-error" /* INTERNAL_ERROR */,
    // Operations that require ID token in request:
    _a$1["CREDENTIAL_TOO_OLD_LOGIN_AGAIN" /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */] = "requires-recent-login" /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */,
    _a$1["INVALID_ID_TOKEN" /* INVALID_ID_TOKEN */] = "invalid-user-token" /* INVALID_AUTH */,
    _a$1["TOKEN_EXPIRED" /* TOKEN_EXPIRED */] = "user-token-expired" /* TOKEN_EXPIRED */,
    _a$1["USER_NOT_FOUND" /* USER_NOT_FOUND */] = "user-token-expired" /* TOKEN_EXPIRED */,
    // Other errors.
    _a$1["TOO_MANY_ATTEMPTS_TRY_LATER" /* TOO_MANY_ATTEMPTS_TRY_LATER */] = "too-many-requests" /* TOO_MANY_ATTEMPTS_TRY_LATER */,
    // Phone Auth related errors.
    _a$1["INVALID_CODE" /* INVALID_CODE */] = "invalid-verification-code" /* INVALID_CODE */,
    _a$1["INVALID_SESSION_INFO" /* INVALID_SESSION_INFO */] = "invalid-verification-id" /* INVALID_SESSION_INFO */,
    _a$1["INVALID_TEMPORARY_PROOF" /* INVALID_TEMPORARY_PROOF */] = "invalid-credential" /* INVALID_IDP_RESPONSE */,
    _a$1["MISSING_SESSION_INFO" /* MISSING_SESSION_INFO */] = "missing-verification-id" /* MISSING_SESSION_INFO */,
    _a$1["SESSION_EXPIRED" /* SESSION_EXPIRED */] = "code-expired" /* CODE_EXPIRED */,
    // Other action code errors when additional settings passed.
    // MISSING_CONTINUE_URI is getting mapped to INTERNAL_ERROR above.
    // This is OK as this error will be caught by client side validation.
    _a$1["MISSING_ANDROID_PACKAGE_NAME" /* MISSING_ANDROID_PACKAGE_NAME */] = "missing-android-pkg-name" /* MISSING_ANDROID_PACKAGE_NAME */,
    _a$1["UNAUTHORIZED_DOMAIN" /* UNAUTHORIZED_DOMAIN */] = "unauthorized-continue-uri" /* UNAUTHORIZED_DOMAIN */,
    // getProjectConfig errors when clientId is passed.
    _a$1["INVALID_OAUTH_CLIENT_ID" /* INVALID_OAUTH_CLIENT_ID */] = "invalid-oauth-client-id" /* INVALID_OAUTH_CLIENT_ID */,
    // User actions (sign-up or deletion) disabled errors.
    _a$1["ADMIN_ONLY_OPERATION" /* ADMIN_ONLY_OPERATION */] = "admin-restricted-operation" /* ADMIN_ONLY_OPERATION */,
    // Multi factor related errors.
    _a$1["INVALID_MFA_PENDING_CREDENTIAL" /* INVALID_MFA_PENDING_CREDENTIAL */] = "invalid-multi-factor-session" /* INVALID_MFA_SESSION */,
    _a$1["MFA_ENROLLMENT_NOT_FOUND" /* MFA_ENROLLMENT_NOT_FOUND */] = "multi-factor-info-not-found" /* MFA_INFO_NOT_FOUND */,
    _a$1["MISSING_MFA_ENROLLMENT_ID" /* MISSING_MFA_ENROLLMENT_ID */] = "missing-multi-factor-info" /* MISSING_MFA_INFO */,
    _a$1["MISSING_MFA_PENDING_CREDENTIAL" /* MISSING_MFA_PENDING_CREDENTIAL */] = "missing-multi-factor-session" /* MISSING_MFA_SESSION */,
    _a$1["SECOND_FACTOR_EXISTS" /* SECOND_FACTOR_EXISTS */] = "second-factor-already-in-use" /* SECOND_FACTOR_ALREADY_ENROLLED */,
    _a$1["SECOND_FACTOR_LIMIT_EXCEEDED" /* SECOND_FACTOR_LIMIT_EXCEEDED */] = "maximum-second-factor-count-exceeded" /* SECOND_FACTOR_LIMIT_EXCEEDED */,
    // Blocking functions related errors.
    _a$1["BLOCKING_FUNCTION_ERROR_RESPONSE" /* BLOCKING_FUNCTION_ERROR_RESPONSE */] = "internal-error" /* INTERNAL_ERROR */,
    _a$1);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_API_TIMEOUT_MS = new Delay(30000, 60000);
function _addTidIfNecessary(auth, request) {
    if (auth.tenantId && !request.tenantId) {
        return tslib$1.__assign(tslib$1.__assign({}, request), { tenantId: auth.tenantId });
    }
    return request;
}
function _performApiRequest(auth, method, path, request, customErrorMap) {
    if (customErrorMap === void 0) { customErrorMap = {}; }
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performFetchWithErrorHandling(auth, customErrorMap, function () { return tslib$1.__awaiter(_this, void 0, void 0, function () {
                    var body, params, query, headers;
                    return tslib$1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {};
                                params = {};
                                if (request) {
                                    if (method === "GET" /* GET */) {
                                        params = request;
                                    }
                                    else {
                                        body = {
                                            body: JSON.stringify(request)
                                        };
                                    }
                                }
                                query = util.querystring(tslib$1.__assign({ key: auth.config.apiKey }, params)).slice(1);
                                return [4 /*yield*/, auth._getAdditionalHeaders()];
                            case 1:
                                headers = _a.sent();
                                headers["Content-Type" /* CONTENT_TYPE */] = 'application/json';
                                if (auth.languageCode) {
                                    headers["X-Firebase-Locale" /* X_FIREBASE_LOCALE */] = auth.languageCode;
                                }
                                return [2 /*return*/, FetchProvider.fetch()(_getFinalTarget(auth, auth.config.apiHost, path, query), tslib$1.__assign({ method: method,
                                        headers: headers, referrerPolicy: 'no-referrer' }, body))];
                        }
                    });
                }); })];
        });
    });
}
function _performFetchWithErrorHandling(auth, customErrorMap, fetchFn) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var errorMap, networkTimeout, response, json, errorMessage, _a, serverErrorCode, serverErrorMessage, authError, e_1;
        return tslib$1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    auth._canInitEmulator = false;
                    errorMap = tslib$1.__assign(tslib$1.__assign({}, SERVER_ERROR_MAP), customErrorMap);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    networkTimeout = new NetworkTimeout(auth);
                    return [4 /*yield*/, Promise.race([
                            fetchFn(),
                            networkTimeout.promise
                        ])];
                case 2:
                    response = _b.sent();
                    // If we've reached this point, the fetch succeeded and the networkTimeout
                    // didn't throw; clear the network timeout delay so that Node won't hang
                    networkTimeout.clearNetworkTimeout();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _b.sent();
                    if ('needConfirmation' in json) {
                        throw _makeTaggedError(auth, "account-exists-with-different-credential" /* NEED_CONFIRMATION */, json);
                    }
                    if (response.ok && !('errorMessage' in json)) {
                        return [2 /*return*/, json];
                    }
                    else {
                        errorMessage = response.ok ? json.errorMessage : json.error.message;
                        _a = errorMessage.split(' : '), serverErrorCode = _a[0], serverErrorMessage = _a[1];
                        if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED" /* FEDERATED_USER_ID_ALREADY_LINKED */) {
                            throw _makeTaggedError(auth, "credential-already-in-use" /* CREDENTIAL_ALREADY_IN_USE */, json);
                        }
                        else if (serverErrorCode === "EMAIL_EXISTS" /* EMAIL_EXISTS */) {
                            throw _makeTaggedError(auth, "email-already-in-use" /* EMAIL_EXISTS */, json);
                        }
                        authError = errorMap[serverErrorCode] ||
                            serverErrorCode
                                .toLowerCase()
                                .replace(/[_\s]+/g, '-');
                        if (serverErrorMessage) {
                            throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
                        }
                        else {
                            _fail(auth, authError);
                        }
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    if (e_1 instanceof util.FirebaseError) {
                        throw e_1;
                    }
                    _fail(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function _performSignInRequest(auth, method, path, request, customErrorMap) {
    if (customErrorMap === void 0) { customErrorMap = {}; }
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var serverResponse;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _performApiRequest(auth, method, path, request, customErrorMap)];
                case 1:
                    serverResponse = (_a.sent());
                    if ('mfaPendingCredential' in serverResponse) {
                        _fail(auth, "multi-factor-auth-required" /* MFA_REQUIRED */, {
                            _serverResponse: serverResponse
                        });
                    }
                    return [2 /*return*/, serverResponse];
            }
        });
    });
}
function _getFinalTarget(auth, host, path, query) {
    var base = "" + host + path + "?" + query;
    if (!auth.config.emulator) {
        return auth.config.apiScheme + "://" + base;
    }
    return _emulatorUrl(auth.config, base);
}
var NetworkTimeout = /** @class */ (function () {
    function NetworkTimeout(auth) {
        var _this = this;
        this.auth = auth;
        // Node timers and browser timers are fundamentally incompatible, but we
        // don't care about the value here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.timer = null;
        this.promise = new Promise(function (_, reject) {
            _this.timer = setTimeout(function () {
                return reject(_createError(_this.auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */));
            }, DEFAULT_API_TIMEOUT_MS.get());
        });
    }
    NetworkTimeout.prototype.clearNetworkTimeout = function () {
        clearTimeout(this.timer);
    };
    return NetworkTimeout;
}());
function _makeTaggedError(auth, code, response) {
    var errorParams = {
        appName: auth.name
    };
    if (response.email) {
        errorParams.email = response.email;
    }
    if (response.phoneNumber) {
        errorParams.phoneNumber = response.phoneNumber;
    }
    var error = _createError(auth, code, errorParams);
    // We know customData is defined on error because errorParams is defined
    error.customData._tokenResponse = response;
    return error;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function deleteAccount(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:delete" /* DELETE_ACCOUNT */, request)];
        });
    });
}
function deleteLinkedAccounts(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:update" /* SET_ACCOUNT_INFO */, request)];
        });
    });
}
function getAccountInfo(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:lookup" /* GET_ACCOUNT_INFO */, request)];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function utcTimestampToDateString(utcTimestamp) {
    if (!utcTimestamp) {
        return undefined;
    }
    try {
        // Convert to date object.
        var date = new Date(Number(utcTimestamp));
        // Test date is valid.
        if (!isNaN(date.getTime())) {
            // Convert to UTC date string.
            return date.toUTCString();
        }
    }
    catch (e) {
        // Do nothing. undefined will be returned.
    }
    return undefined;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
 *
 * @remarks
 * Returns the current token if it has not expired or if it will not expire in the next five
 * minutes. Otherwise, this will refresh the token and return a new one.
 *
 * @param user - The user.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */
function getIdToken$1(user, forceRefresh) {
    if (forceRefresh === void 0) { forceRefresh = false; }
    return util.getModularInstance(user).getIdToken(forceRefresh);
}
/**
 * Returns a deserialized JSON Web Token (JWT) used to identitfy the user to a Firebase service.
 *
 * @remarks
 * Returns the current token if it has not expired or if it will not expire in the next five
 * minutes. Otherwise, this will refresh the token and return a new one.
 *
 * @param user - The user.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */
function getIdTokenResult$1(user, forceRefresh) {
    if (forceRefresh === void 0) { forceRefresh = false; }
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal, token, claims, firebase, signInProvider;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, userInternal.getIdToken(forceRefresh)];
                case 1:
                    token = _a.sent();
                    claims = _parseToken(token);
                    _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error" /* INTERNAL_ERROR */);
                    firebase = typeof claims.firebase === 'object' ? claims.firebase : undefined;
                    signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_provider'];
                    return [2 /*return*/, {
                            claims: claims,
                            token: token,
                            authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
                            issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
                            expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
                            signInProvider: signInProvider || null,
                            signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_second_factor']) || null
                        }];
            }
        });
    });
}
function secondsStringToMilliseconds(seconds) {
    return Number(seconds) * 1000;
}
function _parseToken(token) {
    var _a = token.split('.'), algorithm = _a[0], payload = _a[1], signature = _a[2];
    if (algorithm === undefined ||
        payload === undefined ||
        signature === undefined) {
        _logError('JWT malformed, contained fewer than 3 sections');
        return null;
    }
    try {
        var decoded = util.base64Decode(payload);
        if (!decoded) {
            _logError('Failed to decode base64 JWT payload');
            return null;
        }
        return JSON.parse(decoded);
    }
    catch (e) {
        _logError('Caught error parsing JWT payload as JSON', e);
        return null;
    }
}
/**
 * Extract expiresIn TTL from a token by subtracting the expiration from the issuance.
 */
function _tokenExpiresIn(token) {
    var parsedToken = _parseToken(token);
    _assert(parsedToken, "internal-error" /* INTERNAL_ERROR */);
    _assert(typeof parsedToken.exp !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
    _assert(typeof parsedToken.iat !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
    return Number(parsedToken.exp) - Number(parsedToken.iat);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _logoutIfInvalidated(user, promise, bypassAuthState) {
    if (bypassAuthState === void 0) { bypassAuthState = false; }
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var e_1;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (bypassAuthState) {
                        return [2 /*return*/, promise];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 6]);
                    return [4 /*yield*/, promise];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    if (!(e_1 instanceof util.FirebaseError && isUserInvalidated(e_1))) return [3 /*break*/, 5];
                    if (!(user.auth.currentUser === user)) return [3 /*break*/, 5];
                    return [4 /*yield*/, user.auth.signOut()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: throw e_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function isUserInvalidated(_a) {
    var code = _a.code;
    return (code === "auth/" + "user-disabled" /* USER_DISABLED */ ||
        code === "auth/" + "user-token-expired" /* TOKEN_EXPIRED */);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ProactiveRefresh = /** @class */ (function () {
    function ProactiveRefresh(user) {
        this.user = user;
        this.isRunning = false;
        // Node timers and browser timers return fundamentally different types.
        // We don't actually care what the value is but TS won't accept unknown and
        // we can't cast properly in both environments.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.timerId = null;
        this.errorBackoff = 30000 /* RETRY_BACKOFF_MIN */;
    }
    ProactiveRefresh.prototype._start = function () {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        this.schedule();
    };
    ProactiveRefresh.prototype._stop = function () {
        if (!this.isRunning) {
            return;
        }
        this.isRunning = false;
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
        }
    };
    ProactiveRefresh.prototype.getInterval = function (wasError) {
        var _a;
        if (wasError) {
            var interval = this.errorBackoff;
            this.errorBackoff = Math.min(this.errorBackoff * 2, 960000 /* RETRY_BACKOFF_MAX */);
            return interval;
        }
        else {
            // Reset the error backoff
            this.errorBackoff = 30000 /* RETRY_BACKOFF_MIN */;
            var expTime = (_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0;
            var interval = expTime - Date.now() - 300000 /* OFFSET */;
            return Math.max(0, interval);
        }
    };
    ProactiveRefresh.prototype.schedule = function (wasError) {
        var _this = this;
        if (wasError === void 0) { wasError = false; }
        if (!this.isRunning) {
            // Just in case...
            return;
        }
        var interval = this.getInterval(wasError);
        this.timerId = setTimeout(function () { return tslib$1.__awaiter(_this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.iteration()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, interval);
    };
    ProactiveRefresh.prototype.iteration = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var e_1;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.user.getIdToken(true)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        // Only retry on network errors
                        if (e_1.code === "auth/" + "network-request-failed" /* NETWORK_REQUEST_FAILED */) {
                            this.schedule(/* wasError */ true);
                        }
                        return [2 /*return*/];
                    case 3:
                        this.schedule();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProactiveRefresh;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var UserMetadata = /** @class */ (function () {
    function UserMetadata(createdAt, lastLoginAt) {
        this.createdAt = createdAt;
        this.lastLoginAt = lastLoginAt;
        this._initializeTime();
    }
    UserMetadata.prototype._initializeTime = function () {
        this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
        this.creationTime = utcTimestampToDateString(this.createdAt);
    };
    UserMetadata.prototype._copy = function (metadata) {
        this.createdAt = metadata.createdAt;
        this.lastLoginAt = metadata.lastLoginAt;
        this._initializeTime();
    };
    UserMetadata.prototype.toJSON = function () {
        return {
            createdAt: this.createdAt,
            lastLoginAt: this.lastLoginAt
        };
    };
    return UserMetadata;
}());

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _reloadWithoutSaving(user) {
    var _a;
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var auth, idToken, response, coreAccount, newProviderData, providerData, oldIsAnonymous, newIsAnonymous, isAnonymous, updates;
        return tslib$1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    auth = user.auth;
                    return [4 /*yield*/, user.getIdToken()];
                case 1:
                    idToken = _b.sent();
                    return [4 /*yield*/, _logoutIfInvalidated(user, getAccountInfo(auth, { idToken: idToken }))];
                case 2:
                    response = _b.sent();
                    _assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error" /* INTERNAL_ERROR */);
                    coreAccount = response.users[0];
                    user._notifyReloadListener(coreAccount);
                    newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length)
                        ? extractProviderData(coreAccount.providerUserInfo)
                        : [];
                    providerData = mergeProviderData(user.providerData, newProviderData);
                    oldIsAnonymous = user.isAnonymous;
                    newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
                    isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
                    updates = {
                        uid: coreAccount.localId,
                        displayName: coreAccount.displayName || null,
                        photoURL: coreAccount.photoUrl || null,
                        email: coreAccount.email || null,
                        emailVerified: coreAccount.emailVerified || false,
                        phoneNumber: coreAccount.phoneNumber || null,
                        tenantId: coreAccount.tenantId || null,
                        providerData: providerData,
                        metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
                        isAnonymous: isAnonymous
                    };
                    Object.assign(user, updates);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Reloads user account data, if signed in.
 *
 * @param user - The user.
 *
 * @public
 */
function reload$1(user) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, _reloadWithoutSaving(userInternal)];
                case 1:
                    _a.sent();
                    // Even though the current user hasn't changed, update
                    // current user will trigger a persistence update w/ the
                    // new info.
                    return [4 /*yield*/, userInternal.auth._persistUserIfCurrent(userInternal)];
                case 2:
                    // Even though the current user hasn't changed, update
                    // current user will trigger a persistence update w/ the
                    // new info.
                    _a.sent();
                    userInternal.auth._notifyListenersIfCurrent(userInternal);
                    return [2 /*return*/];
            }
        });
    });
}
function mergeProviderData(original, newData) {
    var deduped = original.filter(function (o) { return !newData.some(function (n) { return n.providerId === o.providerId; }); });
    return tslib$1.__spreadArray(tslib$1.__spreadArray([], deduped), newData);
}
function extractProviderData(providers) {
    return providers.map(function (_a) {
        var providerId = _a.providerId, provider = tslib$1.__rest(_a, ["providerId"]);
        return {
            providerId: providerId,
            uid: provider.rawId || '',
            displayName: provider.displayName || null,
            email: provider.email || null,
            phoneNumber: provider.phoneNumber || null,
            photoURL: provider.photoUrl || null
        };
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function requestStsToken(auth, refreshToken) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var response;
        var _this = this;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _performFetchWithErrorHandling(auth, {}, function () { return tslib$1.__awaiter(_this, void 0, void 0, function () {
                        var body, _a, tokenApiHost, apiKey, url, headers;
                        return tslib$1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    body = util.querystring({
                                        'grant_type': 'refresh_token',
                                        'refresh_token': refreshToken
                                    }).slice(1);
                                    _a = auth.config, tokenApiHost = _a.tokenApiHost, apiKey = _a.apiKey;
                                    url = _getFinalTarget(auth, tokenApiHost, "/v1/token" /* TOKEN */, "key=" + apiKey);
                                    return [4 /*yield*/, auth._getAdditionalHeaders()];
                                case 1:
                                    headers = _b.sent();
                                    headers["Content-Type" /* CONTENT_TYPE */] = 'application/x-www-form-urlencoded';
                                    return [2 /*return*/, FetchProvider.fetch()(url, {
                                            method: "POST" /* POST */,
                                            headers: headers,
                                            body: body
                                        })];
                            }
                        });
                    }); })];
                case 1:
                    response = _a.sent();
                    // The response comes back in snake_case. Convert to camel:
                    return [2 /*return*/, {
                            accessToken: response.access_token,
                            expiresIn: response.expires_in,
                            refreshToken: response.refresh_token
                        }];
            }
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * We need to mark this class as internal explicitly to exclude it in the public typings, because
 * it references AuthInternal which has a circular dependency with UserInternal.
 *
 * @internal
 */
var StsTokenManager = /** @class */ (function () {
    function StsTokenManager() {
        this.refreshToken = null;
        this.accessToken = null;
        this.expirationTime = null;
    }
    Object.defineProperty(StsTokenManager.prototype, "isExpired", {
        get: function () {
            return (!this.expirationTime ||
                Date.now() > this.expirationTime - 30000 /* TOKEN_REFRESH */);
        },
        enumerable: false,
        configurable: true
    });
    StsTokenManager.prototype.updateFromServerResponse = function (response) {
        _assert(response.idToken, "internal-error" /* INTERNAL_ERROR */);
        _assert(typeof response.idToken !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
        _assert(typeof response.refreshToken !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
        var expiresIn = 'expiresIn' in response && typeof response.expiresIn !== 'undefined'
            ? Number(response.expiresIn)
            : _tokenExpiresIn(response.idToken);
        this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
    };
    StsTokenManager.prototype.getToken = function (auth, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _assert(!this.accessToken || this.refreshToken, auth, "user-token-expired" /* TOKEN_EXPIRED */);
                        if (!forceRefresh && this.accessToken && !this.isExpired) {
                            return [2 /*return*/, this.accessToken];
                        }
                        if (!this.refreshToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refresh(auth, this.refreshToken)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.accessToken];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    StsTokenManager.prototype.clearRefreshToken = function () {
        this.refreshToken = null;
    };
    StsTokenManager.prototype.refresh = function (auth, oldToken) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var _a, accessToken, refreshToken, expiresIn;
            return tslib$1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, requestStsToken(auth, oldToken)];
                    case 1:
                        _a = _b.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken, expiresIn = _a.expiresIn;
                        this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
                        return [2 /*return*/];
                }
            });
        });
    };
    StsTokenManager.prototype.updateTokensAndExpiration = function (accessToken, refreshToken, expiresInSec) {
        this.refreshToken = refreshToken || null;
        this.accessToken = accessToken || null;
        this.expirationTime = Date.now() + expiresInSec * 1000;
    };
    StsTokenManager.fromJSON = function (appName, object) {
        var refreshToken = object.refreshToken, accessToken = object.accessToken, expirationTime = object.expirationTime;
        var manager = new StsTokenManager();
        if (refreshToken) {
            _assert(typeof refreshToken === 'string', "internal-error" /* INTERNAL_ERROR */, {
                appName: appName
            });
            manager.refreshToken = refreshToken;
        }
        if (accessToken) {
            _assert(typeof accessToken === 'string', "internal-error" /* INTERNAL_ERROR */, {
                appName: appName
            });
            manager.accessToken = accessToken;
        }
        if (expirationTime) {
            _assert(typeof expirationTime === 'number', "internal-error" /* INTERNAL_ERROR */, {
                appName: appName
            });
            manager.expirationTime = expirationTime;
        }
        return manager;
    };
    StsTokenManager.prototype.toJSON = function () {
        return {
            refreshToken: this.refreshToken,
            accessToken: this.accessToken,
            expirationTime: this.expirationTime
        };
    };
    StsTokenManager.prototype._assign = function (stsTokenManager) {
        this.accessToken = stsTokenManager.accessToken;
        this.refreshToken = stsTokenManager.refreshToken;
        this.expirationTime = stsTokenManager.expirationTime;
    };
    StsTokenManager.prototype._clone = function () {
        return Object.assign(new StsTokenManager(), this.toJSON());
    };
    StsTokenManager.prototype._performRefresh = function () {
        return debugFail('not implemented');
    };
    return StsTokenManager;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function assertStringOrUndefined(assertion, appName) {
    _assert(typeof assertion === 'string' || typeof assertion === 'undefined', "internal-error" /* INTERNAL_ERROR */, { appName: appName });
}
var UserImpl = /** @class */ (function () {
    function UserImpl(_a) {
        var uid = _a.uid, auth = _a.auth, stsTokenManager = _a.stsTokenManager, opt = tslib$1.__rest(_a, ["uid", "auth", "stsTokenManager"]);
        // For the user object, provider is always Firebase.
        this.providerId = "firebase" /* FIREBASE */;
        this.proactiveRefresh = new ProactiveRefresh(this);
        this.reloadUserInfo = null;
        this.reloadListener = null;
        this.uid = uid;
        this.auth = auth;
        this.stsTokenManager = stsTokenManager;
        this.accessToken = stsTokenManager.accessToken;
        this.displayName = opt.displayName || null;
        this.email = opt.email || null;
        this.emailVerified = opt.emailVerified || false;
        this.phoneNumber = opt.phoneNumber || null;
        this.photoURL = opt.photoURL || null;
        this.isAnonymous = opt.isAnonymous || false;
        this.tenantId = opt.tenantId || null;
        this.providerData = opt.providerData ? tslib$1.__spreadArray([], opt.providerData) : [];
        this.metadata = new UserMetadata(opt.createdAt || undefined, opt.lastLoginAt || undefined);
    }
    UserImpl.prototype.getIdToken = function (forceRefresh) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var accessToken;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh))];
                    case 1:
                        accessToken = _a.sent();
                        _assert(accessToken, this.auth, "internal-error" /* INTERNAL_ERROR */);
                        if (!(this.accessToken !== accessToken)) return [3 /*break*/, 3];
                        this.accessToken = accessToken;
                        return [4 /*yield*/, this.auth._persistUserIfCurrent(this)];
                    case 2:
                        _a.sent();
                        this.auth._notifyListenersIfCurrent(this);
                        _a.label = 3;
                    case 3: return [2 /*return*/, accessToken];
                }
            });
        });
    };
    UserImpl.prototype.getIdTokenResult = function (forceRefresh) {
        return getIdTokenResult$1(this, forceRefresh);
    };
    UserImpl.prototype.reload = function () {
        return reload$1(this);
    };
    UserImpl.prototype._assign = function (user) {
        if (this === user) {
            return;
        }
        _assert(this.uid === user.uid, this.auth, "internal-error" /* INTERNAL_ERROR */);
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        this.email = user.email;
        this.emailVerified = user.emailVerified;
        this.phoneNumber = user.phoneNumber;
        this.isAnonymous = user.isAnonymous;
        this.tenantId = user.tenantId;
        this.providerData = user.providerData.map(function (userInfo) { return (tslib$1.__assign({}, userInfo)); });
        this.metadata._copy(user.metadata);
        this.stsTokenManager._assign(user.stsTokenManager);
    };
    UserImpl.prototype._clone = function (auth) {
        return new UserImpl(tslib$1.__assign(tslib$1.__assign({}, this), { auth: auth, stsTokenManager: this.stsTokenManager._clone() }));
    };
    UserImpl.prototype._onReload = function (callback) {
        // There should only ever be one listener, and that is a single instance of MultiFactorUser
        _assert(!this.reloadListener, this.auth, "internal-error" /* INTERNAL_ERROR */);
        this.reloadListener = callback;
        if (this.reloadUserInfo) {
            this._notifyReloadListener(this.reloadUserInfo);
            this.reloadUserInfo = null;
        }
    };
    UserImpl.prototype._notifyReloadListener = function (userInfo) {
        if (this.reloadListener) {
            this.reloadListener(userInfo);
        }
        else {
            // If no listener is subscribed yet, save the result so it's available when they do subscribe
            this.reloadUserInfo = userInfo;
        }
    };
    UserImpl.prototype._startProactiveRefresh = function () {
        this.proactiveRefresh._start();
    };
    UserImpl.prototype._stopProactiveRefresh = function () {
        this.proactiveRefresh._stop();
    };
    UserImpl.prototype._updateTokensIfNecessary = function (response, reload) {
        if (reload === void 0) { reload = false; }
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var tokensRefreshed;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokensRefreshed = false;
                        if (response.idToken &&
                            response.idToken !== this.stsTokenManager.accessToken) {
                            this.stsTokenManager.updateFromServerResponse(response);
                            tokensRefreshed = true;
                        }
                        if (!reload) return [3 /*break*/, 2];
                        return [4 /*yield*/, _reloadWithoutSaving(this)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.auth._persistUserIfCurrent(this)];
                    case 3:
                        _a.sent();
                        if (tokensRefreshed) {
                            this.auth._notifyListenersIfCurrent(this);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserImpl.prototype.delete = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var idToken;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIdToken()];
                    case 1:
                        idToken = _a.sent();
                        return [4 /*yield*/, _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken: idToken }))];
                    case 2:
                        _a.sent();
                        this.stsTokenManager.clearRefreshToken();
                        // TODO: Determine if cancellable-promises are necessary to use in this class so that delete()
                        //       cancels pending actions...
                        return [2 /*return*/, this.auth.signOut()];
                }
            });
        });
    };
    UserImpl.prototype.toJSON = function () {
        return tslib$1.__assign(tslib$1.__assign({ uid: this.uid, email: this.email || undefined, emailVerified: this.emailVerified, displayName: this.displayName || undefined, isAnonymous: this.isAnonymous, photoURL: this.photoURL || undefined, phoneNumber: this.phoneNumber || undefined, tenantId: this.tenantId || undefined, providerData: this.providerData.map(function (userInfo) { return (tslib$1.__assign({}, userInfo)); }), stsTokenManager: this.stsTokenManager.toJSON(), 
            // Redirect event ID must be maintained in case there is a pending
            // redirect event.
            _redirectEventId: this._redirectEventId }, this.metadata.toJSON()), { 
            // Required for compatibility with the legacy SDK (go/firebase-auth-sdk-persistence-parsing):
            apiKey: this.auth.config.apiKey, appName: this.auth.name });
    };
    Object.defineProperty(UserImpl.prototype, "refreshToken", {
        get: function () {
            return this.stsTokenManager.refreshToken || '';
        },
        enumerable: false,
        configurable: true
    });
    UserImpl._fromJSON = function (auth, object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : undefined;
        var email = (_b = object.email) !== null && _b !== void 0 ? _b : undefined;
        var phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : undefined;
        var photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : undefined;
        var tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : undefined;
        var _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : undefined;
        var createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : undefined;
        var lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : undefined;
        var uid = object.uid, emailVerified = object.emailVerified, isAnonymous = object.isAnonymous, providerData = object.providerData, plainObjectTokenManager = object.stsTokenManager;
        _assert(uid && plainObjectTokenManager, auth, "internal-error" /* INTERNAL_ERROR */);
        var stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
        _assert(typeof uid === 'string', auth, "internal-error" /* INTERNAL_ERROR */);
        assertStringOrUndefined(displayName, auth.name);
        assertStringOrUndefined(email, auth.name);
        _assert(typeof emailVerified === 'boolean', auth, "internal-error" /* INTERNAL_ERROR */);
        _assert(typeof isAnonymous === 'boolean', auth, "internal-error" /* INTERNAL_ERROR */);
        assertStringOrUndefined(phoneNumber, auth.name);
        assertStringOrUndefined(photoURL, auth.name);
        assertStringOrUndefined(tenantId, auth.name);
        assertStringOrUndefined(_redirectEventId, auth.name);
        assertStringOrUndefined(createdAt, auth.name);
        assertStringOrUndefined(lastLoginAt, auth.name);
        var user = new UserImpl({
            uid: uid,
            auth: auth,
            email: email,
            emailVerified: emailVerified,
            displayName: displayName,
            isAnonymous: isAnonymous,
            photoURL: photoURL,
            phoneNumber: phoneNumber,
            tenantId: tenantId,
            stsTokenManager: stsTokenManager,
            createdAt: createdAt,
            lastLoginAt: lastLoginAt
        });
        if (providerData && Array.isArray(providerData)) {
            user.providerData = providerData.map(function (userInfo) { return (tslib$1.__assign({}, userInfo)); });
        }
        if (_redirectEventId) {
            user._redirectEventId = _redirectEventId;
        }
        return user;
    };
    /**
     * Initialize a User from an idToken server response
     * @param auth
     * @param idTokenResponse
     */
    UserImpl._fromIdTokenResponse = function (auth, idTokenResponse, isAnonymous) {
        if (isAnonymous === void 0) { isAnonymous = false; }
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var stsTokenManager, user;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stsTokenManager = new StsTokenManager();
                        stsTokenManager.updateFromServerResponse(idTokenResponse);
                        user = new UserImpl({
                            uid: idTokenResponse.localId,
                            auth: auth,
                            stsTokenManager: stsTokenManager,
                            isAnonymous: isAnonymous
                        });
                        // Updates the user info and data and resolves with a user instance.
                        return [4 /*yield*/, _reloadWithoutSaving(user)];
                    case 1:
                        // Updates the user info and data and resolves with a user instance.
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return UserImpl;
}());

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var InMemoryPersistence = /** @class */ (function () {
    function InMemoryPersistence() {
        this.type = "NONE" /* NONE */;
        this.storage = {};
    }
    InMemoryPersistence.prototype._isAvailable = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    InMemoryPersistence.prototype._set = function (key, value) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                this.storage[key] = value;
                return [2 /*return*/];
            });
        });
    };
    InMemoryPersistence.prototype._get = function (key) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var value;
            return tslib$1.__generator(this, function (_a) {
                value = this.storage[key];
                return [2 /*return*/, value === undefined ? null : value];
            });
        });
    };
    InMemoryPersistence.prototype._remove = function (key) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                delete this.storage[key];
                return [2 /*return*/];
            });
        });
    };
    InMemoryPersistence.prototype._addListener = function (_key, _listener) {
        // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
        return;
    };
    InMemoryPersistence.prototype._removeListener = function (_key, _listener) {
        // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
        return;
    };
    InMemoryPersistence.type = 'NONE';
    return InMemoryPersistence;
}());
/**
 * An implementation of {@link Persistence} of type 'NONE'.
 *
 * @public
 */
var inMemoryPersistence$1 = InMemoryPersistence;

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _persistenceKeyName(key, apiKey, appName) {
    return "firebase" /* PERSISTENCE */ + ":" + key + ":" + apiKey + ":" + appName;
}
var PersistenceUserManager = /** @class */ (function () {
    function PersistenceUserManager(persistence, auth, userKey) {
        this.persistence = persistence;
        this.auth = auth;
        this.userKey = userKey;
        var _a = this.auth, config = _a.config, name = _a.name;
        this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name);
        this.fullPersistenceKey = _persistenceKeyName("persistence" /* PERSISTENCE_USER */, config.apiKey, name);
        this.boundEventHandler = auth._onStorageEvent.bind(auth);
        this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
    }
    PersistenceUserManager.prototype.setCurrentUser = function (user) {
        return this.persistence._set(this.fullUserKey, user.toJSON());
    };
    PersistenceUserManager.prototype.getCurrentUser = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var blob;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.persistence._get(this.fullUserKey)];
                    case 1:
                        blob = _a.sent();
                        return [2 /*return*/, blob ? UserImpl._fromJSON(this.auth, blob) : null];
                }
            });
        });
    };
    PersistenceUserManager.prototype.removeCurrentUser = function () {
        return this.persistence._remove(this.fullUserKey);
    };
    PersistenceUserManager.prototype.savePersistenceForRedirect = function () {
        return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
    };
    PersistenceUserManager.prototype.setPersistence = function (newPersistence) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var currentUser;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.persistence === newPersistence) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        return [4 /*yield*/, this.removeCurrentUser()];
                    case 2:
                        _a.sent();
                        this.persistence = newPersistence;
                        if (currentUser) {
                            return [2 /*return*/, this.setCurrentUser(currentUser)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PersistenceUserManager.prototype.delete = function () {
        this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
    };
    PersistenceUserManager.create = function (auth, persistenceHierarchy, userKey) {
        if (userKey === void 0) { userKey = "authUser" /* AUTH_USER */; }
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var availablePersistences, selectedPersistence, key, userToMigrate, _i, persistenceHierarchy_1, persistence, blob, user, migrationHierarchy;
            var _this = this;
            return tslib$1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!persistenceHierarchy.length) {
                            return [2 /*return*/, new PersistenceUserManager(_getInstance(inMemoryPersistence$1), auth, userKey)];
                        }
                        return [4 /*yield*/, Promise.all(persistenceHierarchy.map(function (persistence) { return tslib$1.__awaiter(_this, void 0, void 0, function () {
                                return tslib$1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, persistence._isAvailable()];
                                        case 1:
                                            if (_a.sent()) {
                                                return [2 /*return*/, persistence];
                                            }
                                            return [2 /*return*/, undefined];
                                    }
                                });
                            }); }))];
                    case 1:
                        availablePersistences = (_b.sent()).filter(function (persistence) { return persistence; });
                        selectedPersistence = availablePersistences[0] ||
                            _getInstance(inMemoryPersistence$1);
                        key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name);
                        userToMigrate = null;
                        _i = 0, persistenceHierarchy_1 = persistenceHierarchy;
                        _b.label = 2;
                    case 2:
                        if (!(_i < persistenceHierarchy_1.length)) return [3 /*break*/, 7];
                        persistence = persistenceHierarchy_1[_i];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, persistence._get(key)];
                    case 4:
                        blob = _b.sent();
                        if (blob) {
                            user = UserImpl._fromJSON(auth, blob);
                            if (persistence !== selectedPersistence) {
                                userToMigrate = user;
                            }
                            selectedPersistence = persistence;
                            return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        migrationHierarchy = availablePersistences.filter(function (p) { return p._shouldAllowMigration; });
                        // If the persistence does _not_ allow migration, just finish off here
                        if (!selectedPersistence._shouldAllowMigration ||
                            !migrationHierarchy.length) {
                            return [2 /*return*/, new PersistenceUserManager(selectedPersistence, auth, userKey)];
                        }
                        selectedPersistence = migrationHierarchy[0];
                        if (!userToMigrate) return [3 /*break*/, 9];
                        // This normally shouldn't throw since chosenPersistence.isAvailable() is true, but if it does
                        // we'll just let it bubble to surface the error.
                        return [4 /*yield*/, selectedPersistence._set(key, userToMigrate.toJSON())];
                    case 8:
                        // This normally shouldn't throw since chosenPersistence.isAvailable() is true, but if it does
                        // we'll just let it bubble to surface the error.
                        _b.sent();
                        _b.label = 9;
                    case 9: 
                    // Attempt to clear the key in other persistences but ignore errors. This helps prevent issues
                    // such as users getting stuck with a previous account after signing out and refreshing the tab.
                    return [4 /*yield*/, Promise.all(persistenceHierarchy.map(function (persistence) { return tslib$1.__awaiter(_this, void 0, void 0, function () {
                            return tslib$1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(persistence !== selectedPersistence)) return [3 /*break*/, 4];
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, persistence._remove(key)];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _b.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 10:
                        // Attempt to clear the key in other persistences but ignore errors. This helps prevent issues
                        // such as users getting stuck with a previous account after signing out and refreshing the tab.
                        _b.sent();
                        return [2 /*return*/, new PersistenceUserManager(selectedPersistence, auth, userKey)];
                }
            });
        });
    };
    return PersistenceUserManager;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Determine the browser for the purposes of reporting usage to the API
 */
function _getBrowserName(userAgent) {
    var ua = userAgent.toLowerCase();
    if (ua.includes('opera/') || ua.includes('opr/') || ua.includes('opios/')) {
        return "Opera" /* OPERA */;
    }
    else if (_isIEMobile(ua)) {
        // Windows phone IEMobile browser.
        return "IEMobile" /* IEMOBILE */;
    }
    else if (ua.includes('msie') || ua.includes('trident/')) {
        return "IE" /* IE */;
    }
    else if (ua.includes('edge/')) {
        return "Edge" /* EDGE */;
    }
    else if (_isFirefox(ua)) {
        return "Firefox" /* FIREFOX */;
    }
    else if (ua.includes('silk/')) {
        return "Silk" /* SILK */;
    }
    else if (_isBlackBerry(ua)) {
        // Blackberry browser.
        return "Blackberry" /* BLACKBERRY */;
    }
    else if (_isWebOS(ua)) {
        // WebOS default browser.
        return "Webos" /* WEBOS */;
    }
    else if (_isSafari(ua)) {
        return "Safari" /* SAFARI */;
    }
    else if ((ua.includes('chrome/') || _isChromeIOS(ua)) &&
        !ua.includes('edge/')) {
        return "Chrome" /* CHROME */;
    }
    else if (_isAndroid(ua)) {
        // Android stock browser.
        return "Android" /* ANDROID */;
    }
    else {
        // Most modern browsers have name/version at end of user agent string.
        var re = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
        var matches = userAgent.match(re);
        if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
            return matches[1];
        }
    }
    return "Other" /* OTHER */;
}
function _isFirefox(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    return /firefox\//i.test(ua);
}
function _isSafari(userAgent) {
    if (userAgent === void 0) { userAgent = util.getUA(); }
    var ua = userAgent.toLowerCase();
    return (ua.includes('safari/') &&
        !ua.includes('chrome/') &&
        !ua.includes('crios/') &&
        !ua.includes('android'));
}
function _isChromeIOS(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    return /crios\//i.test(ua);
}
function _isIEMobile(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    return /iemobile/i.test(ua);
}
function _isAndroid(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    return /android/i.test(ua);
}
function _isBlackBerry(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    return /blackberry/i.test(ua);
}
function _isWebOS(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    return /webos/i.test(ua);
}
function _isIOS(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    return /iphone|ipad|ipod/i.test(ua);
}
function _isIOS7Or8(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    return (/(iPad|iPhone|iPod).*OS 7_\d/i.test(ua) ||
        /(iPad|iPhone|iPod).*OS 8_\d/i.test(ua));
}
function _isIOSStandalone(ua) {
    var _a;
    if (ua === void 0) { ua = util.getUA(); }
    return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
}
function _isIE10() {
    return util.isIE() && document.documentMode === 10;
}
function _isMobileBrowser(ua) {
    if (ua === void 0) { ua = util.getUA(); }
    // TODO: implement getBrowserName equivalent for OS.
    return (_isIOS(ua) ||
        _isAndroid(ua) ||
        _isWebOS(ua) ||
        _isBlackBerry(ua) ||
        /windows phone/i.test(ua) ||
        _isIEMobile(ua));
}
function _isIframe() {
    try {
        // Check that the current window is not the top window.
        // If so, return true.
        return !!(window && window !== window.top);
    }
    catch (e) {
        return false;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * Determine the SDK version string
 */
function _getClientVersion(clientPlatform, frameworks) {
    if (frameworks === void 0) { frameworks = []; }
    var reportedPlatform;
    switch (clientPlatform) {
        case "Browser" /* BROWSER */:
            // In a browser environment, report the browser name.
            reportedPlatform = _getBrowserName(util.getUA());
            break;
        case "Worker" /* WORKER */:
            // Technically a worker runs from a browser but we need to differentiate a
            // worker from a browser.
            // For example: Chrome-Worker/JsCore/4.9.1/FirebaseCore-web.
            reportedPlatform = _getBrowserName(util.getUA()) + "-" + clientPlatform;
            break;
        default:
            reportedPlatform = clientPlatform;
    }
    var reportedFrameworks = frameworks.length
        ? frameworks.join(',')
        : 'FirebaseCore-web'; /* default value if no other framework is used */
    return reportedPlatform + "/" + "JsCore" /* CORE */ + "/" + app$1.SDK_VERSION + "/" + reportedFrameworks;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AuthImpl = /** @class */ (function () {
    function AuthImpl(app, heartbeatServiceProvider, config) {
        this.app = app;
        this.heartbeatServiceProvider = heartbeatServiceProvider;
        this.config = config;
        this.currentUser = null;
        this.emulatorConfig = null;
        this.operations = Promise.resolve();
        this.authStateSubscription = new Subscription(this);
        this.idTokenSubscription = new Subscription(this);
        this.redirectUser = null;
        this.isProactiveRefreshEnabled = false;
        // Any network calls will set this to true and prevent subsequent emulator
        // initialization
        this._canInitEmulator = true;
        this._isInitialized = false;
        this._deleted = false;
        this._initializationPromise = null;
        this._popupRedirectResolver = null;
        this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
        // Tracks the last notified UID for state change listeners to prevent
        // repeated calls to the callbacks. Undefined means it's never been
        // called, whereas null means it's been called with a signed out user
        this.lastNotifiedUid = undefined;
        this.languageCode = null;
        this.tenantId = null;
        this.settings = { appVerificationDisabledForTesting: false };
        this.frameworks = [];
        this.name = app.name;
        this.clientVersion = config.sdkClientVersion;
    }
    AuthImpl.prototype._initializeWithPersistence = function (persistenceHierarchy, popupRedirectResolver) {
        var _this = this;
        if (popupRedirectResolver) {
            this._popupRedirectResolver = _getInstance(popupRedirectResolver);
        }
        // Have to check for app deletion throughout initialization (after each
        // promise resolution)
        this._initializationPromise = this.queue(function () { return tslib$1.__awaiter(_this, void 0, void 0, function () {
            var _a;
            var _b, _c;
            return tslib$1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this._deleted) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, PersistenceUserManager.create(this, persistenceHierarchy)];
                    case 1:
                        _a.persistenceManager = _d.sent();
                        if (this._deleted) {
                            return [2 /*return*/];
                        }
                        if (!((_b = this._popupRedirectResolver) === null || _b === void 0 ? void 0 : _b._shouldInitProactively)) return [3 /*break*/, 5];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this._popupRedirectResolver._initialize(this)];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.initializeCurrentUser(popupRedirectResolver)];
                    case 6:
                        _d.sent();
                        this.lastNotifiedUid = ((_c = this.currentUser) === null || _c === void 0 ? void 0 : _c.uid) || null;
                        if (this._deleted) {
                            return [2 /*return*/];
                        }
                        this._isInitialized = true;
                        return [2 /*return*/];
                }
            });
        }); });
        return this._initializationPromise;
    };
    /**
     * If the persistence is changed in another window, the user manager will let us know
     */
    AuthImpl.prototype._onStorageEvent = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var user;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._deleted) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.assertedPersistence.getCurrentUser()];
                    case 1:
                        user = _a.sent();
                        if (!this.currentUser && !user) {
                            // No change, do nothing (was signed out and remained signed out).
                            return [2 /*return*/];
                        }
                        if (!(this.currentUser && user && this.currentUser.uid === user.uid)) return [3 /*break*/, 3];
                        // Data update, simply copy data changes.
                        this._currentUser._assign(user);
                        // If tokens changed from previous user tokens, this will trigger
                        // notifyAuthListeners_.
                        return [4 /*yield*/, this.currentUser.getIdToken()];
                    case 2:
                        // If tokens changed from previous user tokens, this will trigger
                        // notifyAuthListeners_.
                        _a.sent();
                        return [2 /*return*/];
                    case 3: 
                    // Update current Auth state. Either a new login or logout.
                    return [4 /*yield*/, this._updateCurrentUser(user)];
                    case 4:
                        // Update current Auth state. Either a new login or logout.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthImpl.prototype.initializeCurrentUser = function (popupRedirectResolver) {
        var _a;
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var storedUser, redirectUserEventId, storedUserEventId, result;
            return tslib$1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.assertedPersistence.getCurrentUser()];
                    case 1:
                        storedUser = (_b.sent());
                        if (!(popupRedirectResolver && this.config.authDomain)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getOrInitRedirectPersistenceManager()];
                    case 2:
                        _b.sent();
                        redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
                        storedUserEventId = storedUser === null || storedUser === void 0 ? void 0 : storedUser._redirectEventId;
                        return [4 /*yield*/, this.tryRedirectSignIn(popupRedirectResolver)];
                    case 3:
                        result = _b.sent();
                        // If the stored user (i.e. the old "currentUser") has a redirectId that
                        // matches the redirect user, then we want to initially sign in with the
                        // new user object from result.
                        // TODO(samgho): More thoroughly test all of this
                        if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) &&
                            (result === null || result === void 0 ? void 0 : result.user)) {
                            storedUser = result.user;
                        }
                        _b.label = 4;
                    case 4:
                        // If no user in persistence, there is no current user. Set to null.
                        if (!storedUser) {
                            return [2 /*return*/, this.directlySetCurrentUser(null)];
                        }
                        if (!storedUser._redirectEventId) {
                            // This isn't a redirect user, we can reload and bail
                            // This will also catch the redirected user, if available, as that method
                            // strips the _redirectEventId
                            return [2 /*return*/, this.reloadAndSetCurrentUserOrClear(storedUser)];
                        }
                        _assert(this._popupRedirectResolver, this, "argument-error" /* ARGUMENT_ERROR */);
                        return [4 /*yield*/, this.getOrInitRedirectPersistenceManager()];
                    case 5:
                        _b.sent();
                        // If the redirect user's event ID matches the current user's event ID,
                        // DO NOT reload the current user, otherwise they'll be cleared from storage.
                        // This is important for the reauthenticateWithRedirect() flow.
                        if (this.redirectUser &&
                            this.redirectUser._redirectEventId === storedUser._redirectEventId) {
                            return [2 /*return*/, this.directlySetCurrentUser(storedUser)];
                        }
                        return [2 /*return*/, this.reloadAndSetCurrentUserOrClear(storedUser)];
                }
            });
        });
    };
    AuthImpl.prototype.tryRedirectSignIn = function (redirectResolver) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true)];
                    case 2:
                        // We know this._popupRedirectResolver is set since redirectResolver
                        // is passed in. The _completeRedirectFn expects the unwrapped extern.
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _a.sent();
                        // Swallow any errors here; the code can retrieve them in
                        // getRedirectResult().
                        return [4 /*yield*/, this._setRedirectUser(null)];
                    case 4:
                        // Swallow any errors here; the code can retrieve them in
                        // getRedirectResult().
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    AuthImpl.prototype.reloadAndSetCurrentUserOrClear = function (user) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var e_3;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _reloadWithoutSaving(user)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        if (e_3.code !== "auth/" + "network-request-failed" /* NETWORK_REQUEST_FAILED */) {
                            // Something's wrong with the user's token. Log them out and remove
                            // them from storage
                            return [2 /*return*/, this.directlySetCurrentUser(null)];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, this.directlySetCurrentUser(user)];
                }
            });
        });
    };
    AuthImpl.prototype.useDeviceLanguage = function () {
        this.languageCode = _getUserLanguage();
    };
    AuthImpl.prototype._delete = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                this._deleted = true;
                return [2 /*return*/];
            });
        });
    };
    AuthImpl.prototype.updateCurrentUser = function (userExtern) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var user;
            return tslib$1.__generator(this, function (_a) {
                user = userExtern
                    ? util.getModularInstance(userExtern)
                    : null;
                if (user) {
                    _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token" /* INVALID_AUTH */);
                }
                return [2 /*return*/, this._updateCurrentUser(user && user._clone(this))];
            });
        });
    };
    AuthImpl.prototype._updateCurrentUser = function (user) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib$1.__generator(this, function (_a) {
                if (this._deleted) {
                    return [2 /*return*/];
                }
                if (user) {
                    _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch" /* TENANT_ID_MISMATCH */);
                }
                return [2 /*return*/, this.queue(function () { return tslib$1.__awaiter(_this, void 0, void 0, function () {
                        return tslib$1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.directlySetCurrentUser(user)];
                                case 1:
                                    _a.sent();
                                    this.notifyAuthListeners();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    AuthImpl.prototype.signOut = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.redirectPersistenceManager || this._popupRedirectResolver)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setRedirectUser(null)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._updateCurrentUser(null)];
                }
            });
        });
    };
    AuthImpl.prototype.setPersistence = function (persistence) {
        var _this = this;
        return this.queue(function () { return tslib$1.__awaiter(_this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.assertedPersistence.setPersistence(_getInstance(persistence))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AuthImpl.prototype._getPersistence = function () {
        return this.assertedPersistence.persistence.type;
    };
    AuthImpl.prototype._updateErrorMap = function (errorMap) {
        this._errorFactory = new util.ErrorFactory('auth', 'Firebase', errorMap());
    };
    AuthImpl.prototype.onAuthStateChanged = function (nextOrObserver, error, completed) {
        return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
    };
    AuthImpl.prototype.onIdTokenChanged = function (nextOrObserver, error, completed) {
        return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
    };
    AuthImpl.prototype.toJSON = function () {
        var _a;
        return {
            apiKey: this.config.apiKey,
            authDomain: this.config.authDomain,
            appName: this.name,
            currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
        };
    };
    AuthImpl.prototype._setRedirectUser = function (user, popupRedirectResolver) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var redirectManager;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOrInitRedirectPersistenceManager(popupRedirectResolver)];
                    case 1:
                        redirectManager = _a.sent();
                        return [2 /*return*/, user === null
                                ? redirectManager.removeCurrentUser()
                                : redirectManager.setCurrentUser(user)];
                }
            });
        });
    };
    AuthImpl.prototype.getOrInitRedirectPersistenceManager = function (popupRedirectResolver) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var resolver, _a, _b;
            return tslib$1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.redirectPersistenceManager) return [3 /*break*/, 3];
                        resolver = (popupRedirectResolver && _getInstance(popupRedirectResolver)) ||
                            this._popupRedirectResolver;
                        _assert(resolver, this, "argument-error" /* ARGUMENT_ERROR */);
                        _a = this;
                        return [4 /*yield*/, PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser" /* REDIRECT_USER */)];
                    case 1:
                        _a.redirectPersistenceManager = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.redirectPersistenceManager.getCurrentUser()];
                    case 2:
                        _b.redirectUser =
                            _c.sent();
                        _c.label = 3;
                    case 3: return [2 /*return*/, this.redirectPersistenceManager];
                }
            });
        });
    };
    AuthImpl.prototype._redirectUserForId = function (id) {
        var _a, _b;
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib$1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this._isInitialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.queue(function () { return tslib$1.__awaiter(_this, void 0, void 0, function () { return tslib$1.__generator(this, function (_a) {
                                return [2 /*return*/];
                            }); }); })];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) {
                            return [2 /*return*/, this._currentUser];
                        }
                        if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) {
                            return [2 /*return*/, this.redirectUser];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AuthImpl.prototype._persistUserIfCurrent = function (user) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib$1.__generator(this, function (_a) {
                if (user === this.currentUser) {
                    return [2 /*return*/, this.queue(function () { return tslib$1.__awaiter(_this, void 0, void 0, function () { return tslib$1.__generator(this, function (_a) {
                            return [2 /*return*/, this.directlySetCurrentUser(user)];
                        }); }); })];
                }
                return [2 /*return*/];
            });
        });
    };
    /** Notifies listeners only if the user is current */
    AuthImpl.prototype._notifyListenersIfCurrent = function (user) {
        if (user === this.currentUser) {
            this.notifyAuthListeners();
        }
    };
    AuthImpl.prototype._key = function () {
        return this.config.authDomain + ":" + this.config.apiKey + ":" + this.name;
    };
    AuthImpl.prototype._startProactiveRefresh = function () {
        this.isProactiveRefreshEnabled = true;
        if (this.currentUser) {
            this._currentUser._startProactiveRefresh();
        }
    };
    AuthImpl.prototype._stopProactiveRefresh = function () {
        this.isProactiveRefreshEnabled = false;
        if (this.currentUser) {
            this._currentUser._stopProactiveRefresh();
        }
    };
    Object.defineProperty(AuthImpl.prototype, "_currentUser", {
        /** Returns the current user cast as the internal type */
        get: function () {
            return this.currentUser;
        },
        enumerable: false,
        configurable: true
    });
    AuthImpl.prototype.notifyAuthListeners = function () {
        var _a, _b;
        if (!this._isInitialized) {
            return;
        }
        this.idTokenSubscription.next(this.currentUser);
        var currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
        if (this.lastNotifiedUid !== currentUid) {
            this.lastNotifiedUid = currentUid;
            this.authStateSubscription.next(this.currentUser);
        }
    };
    AuthImpl.prototype.registerStateListener = function (subscription, nextOrObserver, error, completed) {
        var _this = this;
        if (this._deleted) {
            return function () { };
        }
        var cb = typeof nextOrObserver === 'function'
            ? nextOrObserver
            : nextOrObserver.next.bind(nextOrObserver);
        var promise = this._isInitialized
            ? Promise.resolve()
            : this._initializationPromise;
        _assert(promise, this, "internal-error" /* INTERNAL_ERROR */);
        // The callback needs to be called asynchronously per the spec.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        promise.then(function () { return cb(_this.currentUser); });
        if (typeof nextOrObserver === 'function') {
            return subscription.addObserver(nextOrObserver, error, completed);
        }
        else {
            return subscription.addObserver(nextOrObserver);
        }
    };
    /**
     * Unprotected (from race conditions) method to set the current user. This
     * should only be called from within a queued callback. This is necessary
     * because the queue shouldn't rely on another queued callback.
     */
    AuthImpl.prototype.directlySetCurrentUser = function (user) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.currentUser && this.currentUser !== user) {
                            this._currentUser._stopProactiveRefresh();
                            if (user && this.isProactiveRefreshEnabled) {
                                user._startProactiveRefresh();
                            }
                        }
                        this.currentUser = user;
                        if (!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.assertedPersistence.setCurrentUser(user)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.assertedPersistence.removeCurrentUser()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthImpl.prototype.queue = function (action) {
        // In case something errors, the callback still should be called in order
        // to keep the promise chain alive
        this.operations = this.operations.then(action, action);
        return this.operations;
    };
    Object.defineProperty(AuthImpl.prototype, "assertedPersistence", {
        get: function () {
            _assert(this.persistenceManager, this, "internal-error" /* INTERNAL_ERROR */);
            return this.persistenceManager;
        },
        enumerable: false,
        configurable: true
    });
    AuthImpl.prototype._logFramework = function (framework) {
        if (!framework || this.frameworks.includes(framework)) {
            return;
        }
        this.frameworks.push(framework);
        // Sort alphabetically so that "FirebaseCore-web,FirebaseUI-web" and
        // "FirebaseUI-web,FirebaseCore-web" aren't viewed as different.
        this.frameworks.sort();
        this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
    };
    AuthImpl.prototype._getFrameworks = function () {
        return this.frameworks;
    };
    AuthImpl.prototype._getAdditionalHeaders = function () {
        var _a;
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var headers, heartbeatsHeader;
            var _b;
            return tslib$1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        headers = (_b = {},
                            _b["X-Client-Version" /* X_CLIENT_VERSION */] = this.clientVersion,
                            _b);
                        if (this.app.options.appId) {
                            headers["X-Firebase-gmpid" /* X_FIREBASE_GMPID */] = this.app.options.appId;
                        }
                        return [4 /*yield*/, ((_a = this.heartbeatServiceProvider.getImmediate({
                                optional: true,
                            })) === null || _a === void 0 ? void 0 : _a.getHeartbeatsHeader())];
                    case 1:
                        heartbeatsHeader = _c.sent();
                        if (heartbeatsHeader) {
                            headers["X-Firebase-Client" /* X_FIREBASE_CLIENT */] = heartbeatsHeader;
                        }
                        return [2 /*return*/, headers];
                }
            });
        });
    };
    return AuthImpl;
}());
/**
 * Method to be used to cast down to our private implmentation of Auth.
 * It will also handle unwrapping from the compat type if necessary
 *
 * @param auth Auth object passed in from developer
 */
function _castAuth(auth) {
    return util.getModularInstance(auth);
}
/** Helper class to wrap subscriber logic */
var Subscription = /** @class */ (function () {
    function Subscription(auth) {
        var _this = this;
        this.auth = auth;
        this.observer = null;
        this.addObserver = util.createSubscribe(function (observer) { return (_this.observer = observer); });
    }
    Object.defineProperty(Subscription.prototype, "next", {
        get: function () {
            _assert(this.observer, this.auth, "internal-error" /* INTERNAL_ERROR */);
            return this.observer.next.bind(this.observer);
        },
        enumerable: false,
        configurable: true
    });
    return Subscription;
}());

/**
 * Changes the {@link Auth} instance to communicate with the Firebase Auth Emulator, instead of production
 * Firebase Auth services.
 *
 * @remarks
 * This must be called synchronously immediately following the first call to
 * {@link initializeAuth}.  Do not use with production credentials as emulator
 * traffic is not encrypted.
 *
 *
 * @example
 * ```javascript
 * connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param url - The URL at which the emulator is running (eg, 'http://localhost:9099').
 * @param options - Optional. `options.disableWarnings` defaults to `false`. Set it to
 * `true` to disable the warning banner attached to the DOM.
 *
 * @public
 */
function connectAuthEmulator$1(auth, url, options) {
    var authInternal = _castAuth(auth);
    _assert(authInternal._canInitEmulator, authInternal, "emulator-config-failed" /* EMULATOR_CONFIG_FAILED */);
    _assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme" /* INVALID_EMULATOR_SCHEME */);
    var disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
    var protocol = extractProtocol(url);
    var _a = extractHostAndPort(url), host = _a.host, port = _a.port;
    var portStr = port === null ? '' : ":" + port;
    // Always replace path with "/" (even if input url had no path at all, or had a different one).
    authInternal.config.emulator = { url: protocol + "//" + host + portStr + "/" };
    authInternal.settings.appVerificationDisabledForTesting = true;
    authInternal.emulatorConfig = Object.freeze({
        host: host,
        port: port,
        protocol: protocol.replace(':', ''),
        options: Object.freeze({ disableWarnings: disableWarnings })
    });
    if (!disableWarnings) {
        emitEmulatorWarning();
    }
}
function extractProtocol(url) {
    var protocolEnd = url.indexOf(':');
    return protocolEnd < 0 ? '' : url.substr(0, protocolEnd + 1);
}
function extractHostAndPort(url) {
    var protocol = extractProtocol(url);
    var authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length)); // Between // and /, ? or #.
    if (!authority) {
        return { host: '', port: null };
    }
    var hostAndPort = authority[2].split('@').pop() || ''; // Strip out "username:password@".
    var bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);
    if (bracketedIPv6) {
        var host = bracketedIPv6[1];
        return { host: host, port: parsePort(hostAndPort.substr(host.length + 1)) };
    }
    else {
        var _a = hostAndPort.split(':'), host = _a[0], port = _a[1];
        return { host: host, port: parsePort(port) };
    }
}
function parsePort(portStr) {
    if (!portStr) {
        return null;
    }
    var port = Number(portStr);
    if (isNaN(port)) {
        return null;
    }
    return port;
}
function emitEmulatorWarning() {
    function attachBanner() {
        var el = document.createElement('p');
        var sty = el.style;
        el.innerText =
            'Running in emulator mode. Do not use with production credentials.';
        sty.position = 'fixed';
        sty.width = '100%';
        sty.backgroundColor = '#ffffff';
        sty.border = '.1em solid #000000';
        sty.color = '#b50000';
        sty.bottom = '0px';
        sty.left = '0px';
        sty.margin = '0px';
        sty.zIndex = '10000';
        sty.textAlign = 'center';
        el.classList.add('firebase-emulator-warning');
        document.body.appendChild(el);
    }
    if (typeof console !== 'undefined' && typeof console.info === 'function') {
        console.info('WARNING: You are using the Auth Emulator,' +
            ' which is intended for local testing only.  Do not use with' +
            ' production credentials.');
    }
    if (typeof window !== 'undefined' &&
        typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', attachBanner);
        }
        else {
            attachBanner();
        }
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface that represents the credentials returned by an {@link AuthProvider}.
 *
 * @remarks
 * Implementations specify the details about each auth provider's credential requirements.
 *
 * @public
 */
var AuthCredential$1 = /** @class */ (function () {
    /** @internal */
    function AuthCredential(
    /**
     * The authentication provider ID for the credential.
     *
     * @remarks
     * For example, 'facebook.com', or 'google.com'.
     */
    providerId, 
    /**
     * The authentication sign in method for the credential.
     *
     * @remarks
     * For example, {@link SignInMethod}.EMAIL_PASSWORD, or
     * {@link SignInMethod}.EMAIL_LINK. This corresponds to the sign-in method
     * identifier as returned in {@link fetchSignInMethodsForEmail}.
     */
    signInMethod) {
        this.providerId = providerId;
        this.signInMethod = signInMethod;
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns a JSON-serializable representation of this object.
     */
    AuthCredential.prototype.toJSON = function () {
        return debugFail('not implemented');
    };
    /** @internal */
    AuthCredential.prototype._getIdTokenResponse = function (_auth) {
        return debugFail('not implemented');
    };
    /** @internal */
    AuthCredential.prototype._linkToIdToken = function (_auth, _idToken) {
        return debugFail('not implemented');
    };
    /** @internal */
    AuthCredential.prototype._getReauthenticationResolver = function (_auth) {
        return debugFail('not implemented');
    };
    return AuthCredential;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function resetPassword(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:resetPassword" /* RESET_PASSWORD */, _addTidIfNecessary(auth, request))];
        });
    });
}
function updateEmailPassword(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:update" /* SET_ACCOUNT_INFO */, request)];
        });
    });
}
function applyActionCode$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:update" /* SET_ACCOUNT_INFO */, _addTidIfNecessary(auth, request))];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function signInWithPassword(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithPassword" /* SIGN_IN_WITH_PASSWORD */, _addTidIfNecessary(auth, request))];
        });
    });
}
function sendOobCode(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:sendOobCode" /* SEND_OOB_CODE */, _addTidIfNecessary(auth, request))];
        });
    });
}
function sendEmailVerification$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, sendOobCode(auth, request)];
        });
    });
}
function sendPasswordResetEmail$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, sendOobCode(auth, request)];
        });
    });
}
function sendSignInLinkToEmail$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, sendOobCode(auth, request)];
        });
    });
}
function verifyAndChangeEmail(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, sendOobCode(auth, request)];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function signInWithEmailLink$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithEmailLink" /* SIGN_IN_WITH_EMAIL_LINK */, _addTidIfNecessary(auth, request))];
        });
    });
}
function signInWithEmailLinkForLinking(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithEmailLink" /* SIGN_IN_WITH_EMAIL_LINK */, _addTidIfNecessary(auth, request))];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface that represents the credentials returned by {@link EmailAuthProvider} for
 * {@link ProviderId}.PASSWORD
 *
 * @remarks
 * Covers both {@link SignInMethod}.EMAIL_PASSWORD and
 * {@link SignInMethod}.EMAIL_LINK.
 *
 * @public
 */
var EmailAuthCredential$1 = /** @class */ (function (_super) {
    tslib$1.__extends(EmailAuthCredential, _super);
    /** @internal */
    function EmailAuthCredential(
    /** @internal */
    _email, 
    /** @internal */
    _password, signInMethod, 
    /** @internal */
    _tenantId) {
        if (_tenantId === void 0) { _tenantId = null; }
        var _this = _super.call(this, "password" /* PASSWORD */, signInMethod) || this;
        _this._email = _email;
        _this._password = _password;
        _this._tenantId = _tenantId;
        return _this;
    }
    /** @internal */
    EmailAuthCredential._fromEmailAndPassword = function (email, password) {
        return new EmailAuthCredential(email, password, "password" /* EMAIL_PASSWORD */);
    };
    /** @internal */
    EmailAuthCredential._fromEmailAndCode = function (email, oobCode, tenantId) {
        if (tenantId === void 0) { tenantId = null; }
        return new EmailAuthCredential(email, oobCode, "emailLink" /* EMAIL_LINK */, tenantId);
    };
    /** {@inheritdoc AuthCredential.toJSON} */
    EmailAuthCredential.prototype.toJSON = function () {
        return {
            email: this._email,
            password: this._password,
            signInMethod: this.signInMethod,
            tenantId: this._tenantId
        };
    };
    /**
     * Static method to deserialize a JSON representation of an object into an {@link  AuthCredential}.
     *
     * @param json - Either `object` or the stringified representation of the object. When string is
     * provided, `JSON.parse` would be called first.
     *
     * @returns If the JSON input does not represent an {@link AuthCredential}, null is returned.
     */
    EmailAuthCredential.fromJSON = function (json) {
        var obj = typeof json === 'string' ? JSON.parse(json) : json;
        if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
            if (obj.signInMethod === "password" /* EMAIL_PASSWORD */) {
                return this._fromEmailAndPassword(obj.email, obj.password);
            }
            else if (obj.signInMethod === "emailLink" /* EMAIL_LINK */) {
                return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
            }
        }
        return null;
    };
    /** @internal */
    EmailAuthCredential.prototype._getIdTokenResponse = function (auth) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                switch (this.signInMethod) {
                    case "password" /* EMAIL_PASSWORD */:
                        return [2 /*return*/, signInWithPassword(auth, {
                                returnSecureToken: true,
                                email: this._email,
                                password: this._password
                            })];
                    case "emailLink" /* EMAIL_LINK */:
                        return [2 /*return*/, signInWithEmailLink$1(auth, {
                                email: this._email,
                                oobCode: this._password
                            })];
                    default:
                        _fail(auth, "internal-error" /* INTERNAL_ERROR */);
                }
                return [2 /*return*/];
            });
        });
    };
    /** @internal */
    EmailAuthCredential.prototype._linkToIdToken = function (auth, idToken) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                switch (this.signInMethod) {
                    case "password" /* EMAIL_PASSWORD */:
                        return [2 /*return*/, updateEmailPassword(auth, {
                                idToken: idToken,
                                returnSecureToken: true,
                                email: this._email,
                                password: this._password
                            })];
                    case "emailLink" /* EMAIL_LINK */:
                        return [2 /*return*/, signInWithEmailLinkForLinking(auth, {
                                idToken: idToken,
                                email: this._email,
                                oobCode: this._password
                            })];
                    default:
                        _fail(auth, "internal-error" /* INTERNAL_ERROR */);
                }
                return [2 /*return*/];
            });
        });
    };
    /** @internal */
    EmailAuthCredential.prototype._getReauthenticationResolver = function (auth) {
        return this._getIdTokenResponse(auth);
    };
    return EmailAuthCredential;
}(AuthCredential$1));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function signInWithIdp(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithIdp" /* SIGN_IN_WITH_IDP */, _addTidIfNecessary(auth, request))];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IDP_REQUEST_URI$1 = 'http://localhost';
/**
 * Represents the OAuth credentials returned by an {@link OAuthProvider}.
 *
 * @remarks
 * Implementations specify the details about each auth provider's credential requirements.
 *
 * @public
 */
var OAuthCredential$1 = /** @class */ (function (_super) {
    tslib$1.__extends(OAuthCredential, _super);
    function OAuthCredential() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pendingToken = null;
        return _this;
    }
    /** @internal */
    OAuthCredential._fromParams = function (params) {
        var cred = new OAuthCredential(params.providerId, params.signInMethod);
        if (params.idToken || params.accessToken) {
            // OAuth 2 and either ID token or access token.
            if (params.idToken) {
                cred.idToken = params.idToken;
            }
            if (params.accessToken) {
                cred.accessToken = params.accessToken;
            }
            // Add nonce if available and no pendingToken is present.
            if (params.nonce && !params.pendingToken) {
                cred.nonce = params.nonce;
            }
            if (params.pendingToken) {
                cred.pendingToken = params.pendingToken;
            }
        }
        else if (params.oauthToken && params.oauthTokenSecret) {
            // OAuth 1 and OAuth token with token secret
            cred.accessToken = params.oauthToken;
            cred.secret = params.oauthTokenSecret;
        }
        else {
            _fail("argument-error" /* ARGUMENT_ERROR */);
        }
        return cred;
    };
    /** {@inheritdoc AuthCredential.toJSON}  */
    OAuthCredential.prototype.toJSON = function () {
        return {
            idToken: this.idToken,
            accessToken: this.accessToken,
            secret: this.secret,
            nonce: this.nonce,
            pendingToken: this.pendingToken,
            providerId: this.providerId,
            signInMethod: this.signInMethod
        };
    };
    /**
     * Static method to deserialize a JSON representation of an object into an
     * {@link  AuthCredential}.
     *
     * @param json - Input can be either Object or the stringified representation of the object.
     * When string is provided, JSON.parse would be called first.
     *
     * @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
     */
    OAuthCredential.fromJSON = function (json) {
        var obj = typeof json === 'string' ? JSON.parse(json) : json;
        var providerId = obj.providerId, signInMethod = obj.signInMethod, rest = tslib$1.__rest(obj, ["providerId", "signInMethod"]);
        if (!providerId || !signInMethod) {
            return null;
        }
        var cred = new OAuthCredential(providerId, signInMethod);
        cred.idToken = rest.idToken || undefined;
        cred.accessToken = rest.accessToken || undefined;
        cred.secret = rest.secret;
        cred.nonce = rest.nonce;
        cred.pendingToken = rest.pendingToken || null;
        return cred;
    };
    /** @internal */
    OAuthCredential.prototype._getIdTokenResponse = function (auth) {
        var request = this.buildRequest();
        return signInWithIdp(auth, request);
    };
    /** @internal */
    OAuthCredential.prototype._linkToIdToken = function (auth, idToken) {
        var request = this.buildRequest();
        request.idToken = idToken;
        return signInWithIdp(auth, request);
    };
    /** @internal */
    OAuthCredential.prototype._getReauthenticationResolver = function (auth) {
        var request = this.buildRequest();
        request.autoCreate = false;
        return signInWithIdp(auth, request);
    };
    OAuthCredential.prototype.buildRequest = function () {
        var request = {
            requestUri: IDP_REQUEST_URI$1,
            returnSecureToken: true
        };
        if (this.pendingToken) {
            request.pendingToken = this.pendingToken;
        }
        else {
            var postBody = {};
            if (this.idToken) {
                postBody['id_token'] = this.idToken;
            }
            if (this.accessToken) {
                postBody['access_token'] = this.accessToken;
            }
            if (this.secret) {
                postBody['oauth_token_secret'] = this.secret;
            }
            postBody['providerId'] = this.providerId;
            if (this.nonce && !this.pendingToken) {
                postBody['nonce'] = this.nonce;
            }
            request.postBody = util.querystring(postBody);
        }
        return request;
    };
    return OAuthCredential;
}(AuthCredential$1));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
function sendPhoneVerificationCode(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:sendVerificationCode" /* SEND_VERIFICATION_CODE */, _addTidIfNecessary(auth, request))];
        });
    });
}
function signInWithPhoneNumber$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithPhoneNumber" /* SIGN_IN_WITH_PHONE_NUMBER */, _addTidIfNecessary(auth, request))];
        });
    });
}
function linkWithPhoneNumber$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var response;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithPhoneNumber" /* SIGN_IN_WITH_PHONE_NUMBER */, _addTidIfNecessary(auth, request))];
                case 1:
                    response = _a.sent();
                    if (response.temporaryProof) {
                        throw _makeTaggedError(auth, "account-exists-with-different-credential" /* NEED_CONFIRMATION */, response);
                    }
                    return [2 /*return*/, response];
            }
        });
    });
}
var VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = (_a = {},
    _a["USER_NOT_FOUND" /* USER_NOT_FOUND */] = "user-not-found" /* USER_DELETED */,
    _a);
function verifyPhoneNumberForExisting(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var apiRequest;
        return tslib$1.__generator(this, function (_a) {
            apiRequest = tslib$1.__assign(tslib$1.__assign({}, request), { operation: 'REAUTH' });
            return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithPhoneNumber" /* SIGN_IN_WITH_PHONE_NUMBER */, _addTidIfNecessary(auth, apiRequest), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_)];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents the credentials returned by {@link PhoneAuthProvider}.
 *
 * @public
 */
var PhoneAuthCredential$1 = /** @class */ (function (_super) {
    tslib$1.__extends(PhoneAuthCredential, _super);
    function PhoneAuthCredential(params) {
        var _this = _super.call(this, "phone" /* PHONE */, "phone" /* PHONE */) || this;
        _this.params = params;
        return _this;
    }
    /** @internal */
    PhoneAuthCredential._fromVerification = function (verificationId, verificationCode) {
        return new PhoneAuthCredential({ verificationId: verificationId, verificationCode: verificationCode });
    };
    /** @internal */
    PhoneAuthCredential._fromTokenResponse = function (phoneNumber, temporaryProof) {
        return new PhoneAuthCredential({ phoneNumber: phoneNumber, temporaryProof: temporaryProof });
    };
    /** @internal */
    PhoneAuthCredential.prototype._getIdTokenResponse = function (auth) {
        return signInWithPhoneNumber$1(auth, this._makeVerificationRequest());
    };
    /** @internal */
    PhoneAuthCredential.prototype._linkToIdToken = function (auth, idToken) {
        return linkWithPhoneNumber$1(auth, tslib$1.__assign({ idToken: idToken }, this._makeVerificationRequest()));
    };
    /** @internal */
    PhoneAuthCredential.prototype._getReauthenticationResolver = function (auth) {
        return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
    };
    /** @internal */
    PhoneAuthCredential.prototype._makeVerificationRequest = function () {
        var _a = this.params, temporaryProof = _a.temporaryProof, phoneNumber = _a.phoneNumber, verificationId = _a.verificationId, verificationCode = _a.verificationCode;
        if (temporaryProof && phoneNumber) {
            return { temporaryProof: temporaryProof, phoneNumber: phoneNumber };
        }
        return {
            sessionInfo: verificationId,
            code: verificationCode
        };
    };
    /** {@inheritdoc AuthCredential.toJSON} */
    PhoneAuthCredential.prototype.toJSON = function () {
        var obj = {
            providerId: this.providerId
        };
        if (this.params.phoneNumber) {
            obj.phoneNumber = this.params.phoneNumber;
        }
        if (this.params.temporaryProof) {
            obj.temporaryProof = this.params.temporaryProof;
        }
        if (this.params.verificationCode) {
            obj.verificationCode = this.params.verificationCode;
        }
        if (this.params.verificationId) {
            obj.verificationId = this.params.verificationId;
        }
        return obj;
    };
    /** Generates a phone credential based on a plain object or a JSON string. */
    PhoneAuthCredential.fromJSON = function (json) {
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }
        var _a = json, verificationId = _a.verificationId, verificationCode = _a.verificationCode, phoneNumber = _a.phoneNumber, temporaryProof = _a.temporaryProof;
        if (!verificationCode &&
            !verificationId &&
            !phoneNumber &&
            !temporaryProof) {
            return null;
        }
        return new PhoneAuthCredential({
            verificationId: verificationId,
            verificationCode: verificationCode,
            phoneNumber: phoneNumber,
            temporaryProof: temporaryProof
        });
    };
    return PhoneAuthCredential;
}(AuthCredential$1));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Maps the mode string in action code URL to Action Code Info operation.
 *
 * @param mode
 */
function parseMode(mode) {
    switch (mode) {
        case 'recoverEmail':
            return "RECOVER_EMAIL" /* RECOVER_EMAIL */;
        case 'resetPassword':
            return "PASSWORD_RESET" /* PASSWORD_RESET */;
        case 'signIn':
            return "EMAIL_SIGNIN" /* EMAIL_SIGNIN */;
        case 'verifyEmail':
            return "VERIFY_EMAIL" /* VERIFY_EMAIL */;
        case 'verifyAndChangeEmail':
            return "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */;
        case 'revertSecondFactorAddition':
            return "REVERT_SECOND_FACTOR_ADDITION" /* REVERT_SECOND_FACTOR_ADDITION */;
        default:
            return null;
    }
}
/**
 * Helper to parse FDL links
 *
 * @param url
 */
function parseDeepLink(url) {
    var link = util.querystringDecode(util.extractQuerystring(url))['link'];
    // Double link case (automatic redirect).
    var doubleDeepLink = link
        ? util.querystringDecode(util.extractQuerystring(link))['deep_link_id']
        : null;
    // iOS custom scheme links.
    var iOSDeepLink = util.querystringDecode(util.extractQuerystring(url))['deep_link_id'];
    var iOSDoubleDeepLink = iOSDeepLink
        ? util.querystringDecode(util.extractQuerystring(iOSDeepLink))['link']
        : null;
    return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
}
/**
 * A utility class to parse email action URLs such as password reset, email verification,
 * email link sign in, etc.
 *
 * @public
 */
var ActionCodeURL$1 = /** @class */ (function () {
    /**
     * @param actionLink - The link from which to extract the URL.
     * @returns The {@link ActionCodeURL} object, or null if the link is invalid.
     *
     * @internal
     */
    function ActionCodeURL(actionLink) {
        var _a, _b, _c, _d, _e, _f;
        var searchParams = util.querystringDecode(util.extractQuerystring(actionLink));
        var apiKey = (_a = searchParams["apiKey" /* API_KEY */]) !== null && _a !== void 0 ? _a : null;
        var code = (_b = searchParams["oobCode" /* CODE */]) !== null && _b !== void 0 ? _b : null;
        var operation = parseMode((_c = searchParams["mode" /* MODE */]) !== null && _c !== void 0 ? _c : null);
        // Validate API key, code and mode.
        _assert(apiKey && code && operation, "argument-error" /* ARGUMENT_ERROR */);
        this.apiKey = apiKey;
        this.operation = operation;
        this.code = code;
        this.continueUrl = (_d = searchParams["continueUrl" /* CONTINUE_URL */]) !== null && _d !== void 0 ? _d : null;
        this.languageCode = (_e = searchParams["languageCode" /* LANGUAGE_CODE */]) !== null && _e !== void 0 ? _e : null;
        this.tenantId = (_f = searchParams["tenantId" /* TENANT_ID */]) !== null && _f !== void 0 ? _f : null;
    }
    /**
     * Parses the email action link string and returns an {@link ActionCodeURL} if the link is valid,
     * otherwise returns null.
     *
     * @param link  - The email action link string.
     * @returns The {@link ActionCodeURL} object, or null if the link is invalid.
     *
     * @public
     */
    ActionCodeURL.parseLink = function (link) {
        var actionLink = parseDeepLink(link);
        try {
            return new ActionCodeURL(actionLink);
        }
        catch (_a) {
            return null;
        }
    };
    return ActionCodeURL;
}());
/**
 * Parses the email action link string and returns an {@link ActionCodeURL} if
 * the link is valid, otherwise returns null.
 *
 * @public
 */
function parseActionCodeURL$1(link) {
    return ActionCodeURL$1.parseLink(link);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating {@link EmailAuthCredential}.
 *
 * @public
 */
var EmailAuthProvider$1 = /** @class */ (function () {
    function EmailAuthProvider() {
        /**
         * Always set to {@link ProviderId}.PASSWORD, even for email link.
         */
        this.providerId = EmailAuthProvider.PROVIDER_ID;
    }
    /**
     * Initialize an {@link AuthCredential} using an email and password.
     *
     * @example
     * ```javascript
     * const authCredential = EmailAuthProvider.credential(email, password);
     * const userCredential = await signInWithCredential(auth, authCredential);
     * ```
     *
     * @example
     * ```javascript
     * const userCredential = await signInWithEmailAndPassword(auth, email, password);
     * ```
     *
     * @param email - Email address.
     * @param password - User account password.
     * @returns The auth provider credential.
     */
    EmailAuthProvider.credential = function (email, password) {
        return EmailAuthCredential$1._fromEmailAndPassword(email, password);
    };
    /**
     * Initialize an {@link AuthCredential} using an email and an email link after a sign in with
     * email link operation.
     *
     * @example
     * ```javascript
     * const authCredential = EmailAuthProvider.credentialWithLink(auth, email, emailLink);
     * const userCredential = await signInWithCredential(auth, authCredential);
     * ```
     *
     * @example
     * ```javascript
     * await sendSignInLinkToEmail(auth, email);
     * // Obtain emailLink from user.
     * const userCredential = await signInWithEmailLink(auth, email, emailLink);
     * ```
     *
     * @param auth - The {@link Auth} instance used to verify the link.
     * @param email - Email address.
     * @param emailLink - Sign-in email link.
     * @returns - The auth provider credential.
     */
    EmailAuthProvider.credentialWithLink = function (email, emailLink) {
        var actionCodeUrl = ActionCodeURL$1.parseLink(emailLink);
        _assert(actionCodeUrl, "argument-error" /* ARGUMENT_ERROR */);
        return EmailAuthCredential$1._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
    };
    /**
     * Always set to {@link ProviderId}.PASSWORD, even for email link.
     */
    EmailAuthProvider.PROVIDER_ID = "password" /* PASSWORD */;
    /**
     * Always set to {@link SignInMethod}.EMAIL_PASSWORD.
     */
    EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password" /* EMAIL_PASSWORD */;
    /**
     * Always set to {@link SignInMethod}.EMAIL_LINK.
     */
    EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink" /* EMAIL_LINK */;
    return EmailAuthProvider;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The base class for all Federated providers (OAuth (including OIDC), SAML).
 *
 * This class is not meant to be instantiated directly.
 *
 * @public
 */
var FederatedAuthProvider = /** @class */ (function () {
    /**
     * Constructor for generic OAuth providers.
     *
     * @param providerId - Provider for which credentials should be generated.
     */
    function FederatedAuthProvider(providerId) {
        this.providerId = providerId;
        /** @internal */
        this.defaultLanguageCode = null;
        /** @internal */
        this.customParameters = {};
    }
    /**
     * Set the language gode.
     *
     * @param languageCode - language code
     */
    FederatedAuthProvider.prototype.setDefaultLanguage = function (languageCode) {
        this.defaultLanguageCode = languageCode;
    };
    /**
     * Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in
     * operations.
     *
     * @remarks
     * For a detailed list, check the reserved required OAuth 2.0 parameters such as `client_id`,
     * `redirect_uri`, `scope`, `response_type`, and `state` are not allowed and will be ignored.
     *
     * @param customOAuthParameters - The custom OAuth parameters to pass in the OAuth request.
     */
    FederatedAuthProvider.prototype.setCustomParameters = function (customOAuthParameters) {
        this.customParameters = customOAuthParameters;
        return this;
    };
    /**
     * Retrieve the current list of {@link CustomParameters}.
     */
    FederatedAuthProvider.prototype.getCustomParameters = function () {
        return this.customParameters;
    };
    return FederatedAuthProvider;
}());

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Common code to all OAuth providers. This is separate from the
 * {@link OAuthProvider} so that child providers (like
 * {@link GoogleAuthProvider}) don't inherit the `credential` instance method.
 * Instead, they rely on a static `credential` method.
 */
var BaseOAuthProvider = /** @class */ (function (_super) {
    tslib$1.__extends(BaseOAuthProvider, _super);
    function BaseOAuthProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @internal */
        _this.scopes = [];
        return _this;
    }
    /**
     * Add an OAuth scope to the credential.
     *
     * @param scope - Provider OAuth scope to add.
     */
    BaseOAuthProvider.prototype.addScope = function (scope) {
        // If not already added, add scope to list.
        if (!this.scopes.includes(scope)) {
            this.scopes.push(scope);
        }
        return this;
    };
    /**
     * Retrieve the current list of OAuth scopes.
     */
    BaseOAuthProvider.prototype.getScopes = function () {
        return tslib$1.__spreadArray([], this.scopes);
    };
    return BaseOAuthProvider;
}(FederatedAuthProvider));
/**
 * Provider for generating generic {@link OAuthCredential}.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new OAuthProvider('google.com');
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('profile');
 * provider.addScope('email');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a OAuth Access Token for the provider.
 *   const credential = provider.credentialFromResult(auth, result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new OAuthProvider('google.com');
 * provider.addScope('profile');
 * provider.addScope('email');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a OAuth Access Token for the provider.
 * const credential = provider.credentialFromResult(auth, result);
 * const token = credential.accessToken;
 * ```
 * @public
 */
var OAuthProvider$1 = /** @class */ (function (_super) {
    tslib$1.__extends(OAuthProvider, _super);
    function OAuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates an {@link OAuthCredential} from a JSON string or a plain object.
     * @param json - A plain object or a JSON string
     */
    OAuthProvider.credentialFromJSON = function (json) {
        var obj = typeof json === 'string' ? JSON.parse(json) : json;
        _assert('providerId' in obj && 'signInMethod' in obj, "argument-error" /* ARGUMENT_ERROR */);
        return OAuthCredential$1._fromParams(obj);
    };
    /**
     * Creates a {@link OAuthCredential} from a generic OAuth provider's access token or ID token.
     *
     * @remarks
     * The raw nonce is required when an ID token with a nonce field is provided. The SHA-256 hash of
     * the raw nonce must match the nonce field in the ID token.
     *
     * @example
     * ```javascript
     * // `googleUser` from the onsuccess Google Sign In callback.
     * // Initialize a generate OAuth provider with a `google.com` providerId.
     * const provider = new OAuthProvider('google.com');
     * const credential = provider.credential({
     *   idToken: googleUser.getAuthResponse().id_token,
     * });
     * const result = await signInWithCredential(credential);
     * ```
     *
     * @param params - Either the options object containing the ID token, access token and raw nonce
     * or the ID token string.
     */
    OAuthProvider.prototype.credential = function (params) {
        return this._credential(tslib$1.__assign(tslib$1.__assign({}, params), { nonce: params.rawNonce }));
    };
    /** An internal credential method that accepts more permissive options */
    OAuthProvider.prototype._credential = function (params) {
        _assert(params.idToken || params.accessToken, "argument-error" /* ARGUMENT_ERROR */);
        // For OAuthCredential, sign in method is same as providerId.
        return OAuthCredential$1._fromParams(tslib$1.__assign(tslib$1.__assign({}, params), { providerId: this.providerId, signInMethod: this.providerId }));
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
    OAuthProvider.credentialFromResult = function (userCredential) {
        return OAuthProvider.oauthCredentialFromTaggedObject(userCredential);
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
    OAuthProvider.credentialFromError = function (error) {
        return OAuthProvider.oauthCredentialFromTaggedObject((error.customData || {}));
    };
    OAuthProvider.oauthCredentialFromTaggedObject = function (_a) {
        var tokenResponse = _a._tokenResponse;
        if (!tokenResponse) {
            return null;
        }
        var _b = tokenResponse, oauthIdToken = _b.oauthIdToken, oauthAccessToken = _b.oauthAccessToken, oauthTokenSecret = _b.oauthTokenSecret, pendingToken = _b.pendingToken, nonce = _b.nonce, providerId = _b.providerId;
        if (!oauthAccessToken &&
            !oauthTokenSecret &&
            !oauthIdToken &&
            !pendingToken) {
            return null;
        }
        if (!providerId) {
            return null;
        }
        try {
            return new OAuthProvider(providerId)._credential({
                idToken: oauthIdToken,
                accessToken: oauthAccessToken,
                nonce: nonce,
                pendingToken: pendingToken
            });
        }
        catch (e) {
            return null;
        }
    };
    return OAuthProvider;
}(BaseOAuthProvider));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.FACEBOOK.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('user_birthday');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Facebook Access Token.
 *   const credential = FacebookAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new FacebookAuthProvider();
 * provider.addScope('user_birthday');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Facebook Access Token.
 * const credential = FacebookAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 *
 * @public
 */
var FacebookAuthProvider$1 = /** @class */ (function (_super) {
    tslib$1.__extends(FacebookAuthProvider, _super);
    function FacebookAuthProvider() {
        return _super.call(this, "facebook.com" /* FACEBOOK */) || this;
    }
    /**
     * Creates a credential for Facebook.
     *
     * @example
     * ```javascript
     * // `event` from the Facebook auth.authResponseChange callback.
     * const credential = FacebookAuthProvider.credential(event.authResponse.accessToken);
     * const result = await signInWithCredential(credential);
     * ```
     *
     * @param accessToken - Facebook access token.
     */
    FacebookAuthProvider.credential = function (accessToken) {
        return OAuthCredential$1._fromParams({
            providerId: FacebookAuthProvider.PROVIDER_ID,
            signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
            accessToken: accessToken
        });
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
    FacebookAuthProvider.credentialFromResult = function (userCredential) {
        return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
    FacebookAuthProvider.credentialFromError = function (error) {
        return FacebookAuthProvider.credentialFromTaggedObject((error.customData || {}));
    };
    FacebookAuthProvider.credentialFromTaggedObject = function (_a) {
        var tokenResponse = _a._tokenResponse;
        if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
            return null;
        }
        if (!tokenResponse.oauthAccessToken) {
            return null;
        }
        try {
            return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
        }
        catch (_b) {
            return null;
        }
    };
    /** Always set to {@link SignInMethod}.FACEBOOK. */
    FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com" /* FACEBOOK */;
    /** Always set to {@link ProviderId}.FACEBOOK. */
    FacebookAuthProvider.PROVIDER_ID = "facebook.com" /* FACEBOOK */;
    return FacebookAuthProvider;
}(BaseOAuthProvider));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an an {@link OAuthCredential} for {@link ProviderId}.GOOGLE.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new GoogleAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('profile');
 * provider.addScope('email');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Google Access Token.
 *   const credential = GoogleAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new GoogleAuthProvider();
 * provider.addScope('profile');
 * provider.addScope('email');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Google Access Token.
 * const credential = GoogleAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 *
 * @public
 */
var GoogleAuthProvider$1 = /** @class */ (function (_super) {
    tslib$1.__extends(GoogleAuthProvider, _super);
    function GoogleAuthProvider() {
        var _this = _super.call(this, "google.com" /* GOOGLE */) || this;
        _this.addScope('profile');
        return _this;
    }
    /**
     * Creates a credential for Google. At least one of ID token and access token is required.
     *
     * @example
     * ```javascript
     * // \`googleUser\` from the onsuccess Google Sign In callback.
     * const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
     * const result = await signInWithCredential(credential);
     * ```
     *
     * @param idToken - Google ID token.
     * @param accessToken - Google access token.
     */
    GoogleAuthProvider.credential = function (idToken, accessToken) {
        return OAuthCredential$1._fromParams({
            providerId: GoogleAuthProvider.PROVIDER_ID,
            signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
            idToken: idToken,
            accessToken: accessToken
        });
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
    GoogleAuthProvider.credentialFromResult = function (userCredential) {
        return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
    GoogleAuthProvider.credentialFromError = function (error) {
        return GoogleAuthProvider.credentialFromTaggedObject((error.customData || {}));
    };
    GoogleAuthProvider.credentialFromTaggedObject = function (_a) {
        var tokenResponse = _a._tokenResponse;
        if (!tokenResponse) {
            return null;
        }
        var _b = tokenResponse, oauthIdToken = _b.oauthIdToken, oauthAccessToken = _b.oauthAccessToken;
        if (!oauthIdToken && !oauthAccessToken) {
            // This could be an oauth 1 credential or a phone credential
            return null;
        }
        try {
            return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
        }
        catch (_c) {
            return null;
        }
    };
    /** Always set to {@link SignInMethod}.GOOGLE. */
    GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com" /* GOOGLE */;
    /** Always set to {@link ProviderId}.GOOGLE. */
    GoogleAuthProvider.PROVIDER_ID = "google.com" /* GOOGLE */;
    return GoogleAuthProvider;
}(BaseOAuthProvider));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GITHUB.
 *
 * @remarks
 * GitHub requires an OAuth 2.0 redirect, so you can either handle the redirect directly, or use
 * the {@link signInWithPopup} handler:
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new GithubAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('repo');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Github Access Token.
 *   const credential = GithubAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new GithubAuthProvider();
 * provider.addScope('repo');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Github Access Token.
 * const credential = GithubAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 * @public
 */
var GithubAuthProvider$1 = /** @class */ (function (_super) {
    tslib$1.__extends(GithubAuthProvider, _super);
    function GithubAuthProvider() {
        return _super.call(this, "github.com" /* GITHUB */) || this;
    }
    /**
     * Creates a credential for Github.
     *
     * @param accessToken - Github access token.
     */
    GithubAuthProvider.credential = function (accessToken) {
        return OAuthCredential$1._fromParams({
            providerId: GithubAuthProvider.PROVIDER_ID,
            signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
            accessToken: accessToken
        });
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
    GithubAuthProvider.credentialFromResult = function (userCredential) {
        return GithubAuthProvider.credentialFromTaggedObject(userCredential);
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
    GithubAuthProvider.credentialFromError = function (error) {
        return GithubAuthProvider.credentialFromTaggedObject((error.customData || {}));
    };
    GithubAuthProvider.credentialFromTaggedObject = function (_a) {
        var tokenResponse = _a._tokenResponse;
        if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
            return null;
        }
        if (!tokenResponse.oauthAccessToken) {
            return null;
        }
        try {
            return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
        }
        catch (_b) {
            return null;
        }
    };
    /** Always set to {@link SignInMethod}.GITHUB. */
    GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com" /* GITHUB */;
    /** Always set to {@link ProviderId}.GITHUB. */
    GithubAuthProvider.PROVIDER_ID = "github.com" /* GITHUB */;
    return GithubAuthProvider;
}(BaseOAuthProvider));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var IDP_REQUEST_URI = 'http://localhost';
/**
 * @public
 */
var SAMLAuthCredential = /** @class */ (function (_super) {
    tslib$1.__extends(SAMLAuthCredential, _super);
    /** @internal */
    function SAMLAuthCredential(providerId, pendingToken) {
        var _this = _super.call(this, providerId, providerId) || this;
        _this.pendingToken = pendingToken;
        return _this;
    }
    /** @internal */
    SAMLAuthCredential.prototype._getIdTokenResponse = function (auth) {
        var request = this.buildRequest();
        return signInWithIdp(auth, request);
    };
    /** @internal */
    SAMLAuthCredential.prototype._linkToIdToken = function (auth, idToken) {
        var request = this.buildRequest();
        request.idToken = idToken;
        return signInWithIdp(auth, request);
    };
    /** @internal */
    SAMLAuthCredential.prototype._getReauthenticationResolver = function (auth) {
        var request = this.buildRequest();
        request.autoCreate = false;
        return signInWithIdp(auth, request);
    };
    /** {@inheritdoc AuthCredential.toJSON}  */
    SAMLAuthCredential.prototype.toJSON = function () {
        return {
            signInMethod: this.signInMethod,
            providerId: this.providerId,
            pendingToken: this.pendingToken
        };
    };
    /**
     * Static method to deserialize a JSON representation of an object into an
     * {@link  AuthCredential}.
     *
     * @param json - Input can be either Object or the stringified representation of the object.
     * When string is provided, JSON.parse would be called first.
     *
     * @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
     */
    SAMLAuthCredential.fromJSON = function (json) {
        var obj = typeof json === 'string' ? JSON.parse(json) : json;
        var providerId = obj.providerId, signInMethod = obj.signInMethod, pendingToken = obj.pendingToken;
        if (!providerId ||
            !signInMethod ||
            !pendingToken ||
            providerId !== signInMethod) {
            return null;
        }
        return new SAMLAuthCredential(providerId, pendingToken);
    };
    /**
     * Helper static method to avoid exposing the constructor to end users.
     *
     * @internal
     */
    SAMLAuthCredential._create = function (providerId, pendingToken) {
        return new SAMLAuthCredential(providerId, pendingToken);
    };
    SAMLAuthCredential.prototype.buildRequest = function () {
        return {
            requestUri: IDP_REQUEST_URI,
            returnSecureToken: true,
            pendingToken: this.pendingToken
        };
    };
    return SAMLAuthCredential;
}(AuthCredential$1));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SAML_PROVIDER_PREFIX = 'saml.';
/**
 * An {@link AuthProvider} for SAML.
 *
 * @public
 */
var SAMLAuthProvider$1 = /** @class */ (function (_super) {
    tslib$1.__extends(SAMLAuthProvider, _super);
    /**
     * Constructor. The providerId must start with "saml."
     * @param providerId - SAML provider ID.
     */
    function SAMLAuthProvider(providerId) {
        var _this = this;
        _assert(providerId.startsWith(SAML_PROVIDER_PREFIX), "argument-error" /* ARGUMENT_ERROR */);
        _this = _super.call(this, providerId) || this;
        return _this;
    }
    /**
     * Generates an {@link AuthCredential} from a {@link UserCredential} after a
     * successful SAML flow completes.
     *
     * @remarks
     *
     * For example, to get an {@link AuthCredential}, you could write the
     * following code:
     *
     * ```js
     * const userCredential = await signInWithPopup(auth, samlProvider);
     * const credential = SAMLAuthProvider.credentialFromResult(userCredential);
     * ```
     *
     * @param userCredential - The user credential.
     */
    SAMLAuthProvider.credentialFromResult = function (userCredential) {
        return SAMLAuthProvider.samlCredentialFromTaggedObject(userCredential);
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
    SAMLAuthProvider.credentialFromError = function (error) {
        return SAMLAuthProvider.samlCredentialFromTaggedObject((error.customData || {}));
    };
    /**
     * Creates an {@link AuthCredential} from a JSON string or a plain object.
     * @param json - A plain object or a JSON string
     */
    SAMLAuthProvider.credentialFromJSON = function (json) {
        var credential = SAMLAuthCredential.fromJSON(json);
        _assert(credential, "argument-error" /* ARGUMENT_ERROR */);
        return credential;
    };
    SAMLAuthProvider.samlCredentialFromTaggedObject = function (_a) {
        var tokenResponse = _a._tokenResponse;
        if (!tokenResponse) {
            return null;
        }
        var _b = tokenResponse, pendingToken = _b.pendingToken, providerId = _b.providerId;
        if (!pendingToken || !providerId) {
            return null;
        }
        try {
            return SAMLAuthCredential._create(providerId, pendingToken);
        }
        catch (e) {
            return null;
        }
    };
    return SAMLAuthProvider;
}(FederatedAuthProvider));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.TWITTER.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new TwitterAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Twitter Access Token and Secret.
 *   const credential = TwitterAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 *   const secret = credential.secret;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new TwitterAuthProvider();
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Twitter Access Token and Secret.
 * const credential = TwitterAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * const secret = credential.secret;
 * ```
 *
 * @public
 */
var TwitterAuthProvider$1 = /** @class */ (function (_super) {
    tslib$1.__extends(TwitterAuthProvider, _super);
    function TwitterAuthProvider() {
        return _super.call(this, "twitter.com" /* TWITTER */) || this;
    }
    /**
     * Creates a credential for Twitter.
     *
     * @param token - Twitter access token.
     * @param secret - Twitter secret.
     */
    TwitterAuthProvider.credential = function (token, secret) {
        return OAuthCredential$1._fromParams({
            providerId: TwitterAuthProvider.PROVIDER_ID,
            signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
            oauthToken: token,
            oauthTokenSecret: secret
        });
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
     *
     * @param userCredential - The user credential.
     */
    TwitterAuthProvider.credentialFromResult = function (userCredential) {
        return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
    };
    /**
     * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
     * thrown during a sign-in, link, or reauthenticate operation.
     *
     * @param userCredential - The user credential.
     */
    TwitterAuthProvider.credentialFromError = function (error) {
        return TwitterAuthProvider.credentialFromTaggedObject((error.customData || {}));
    };
    TwitterAuthProvider.credentialFromTaggedObject = function (_a) {
        var tokenResponse = _a._tokenResponse;
        if (!tokenResponse) {
            return null;
        }
        var _b = tokenResponse, oauthAccessToken = _b.oauthAccessToken, oauthTokenSecret = _b.oauthTokenSecret;
        if (!oauthAccessToken || !oauthTokenSecret) {
            return null;
        }
        try {
            return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
        }
        catch (_c) {
            return null;
        }
    };
    /** Always set to {@link SignInMethod}.TWITTER. */
    TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com" /* TWITTER */;
    /** Always set to {@link ProviderId}.TWITTER. */
    TwitterAuthProvider.PROVIDER_ID = "twitter.com" /* TWITTER */;
    return TwitterAuthProvider;
}(BaseOAuthProvider));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function signUp(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signUp" /* SIGN_UP */, _addTidIfNecessary(auth, request))];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var UserCredentialImpl = /** @class */ (function () {
    function UserCredentialImpl(params) {
        this.user = params.user;
        this.providerId = params.providerId;
        this._tokenResponse = params._tokenResponse;
        this.operationType = params.operationType;
    }
    UserCredentialImpl._fromIdTokenResponse = function (auth, operationType, idTokenResponse, isAnonymous) {
        if (isAnonymous === void 0) { isAnonymous = false; }
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var user, providerId, userCred;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous)];
                    case 1:
                        user = _a.sent();
                        providerId = providerIdForResponse(idTokenResponse);
                        userCred = new UserCredentialImpl({
                            user: user,
                            providerId: providerId,
                            _tokenResponse: idTokenResponse,
                            operationType: operationType
                        });
                        return [2 /*return*/, userCred];
                }
            });
        });
    };
    UserCredentialImpl._forOperation = function (user, operationType, response) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var providerId;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user._updateTokensIfNecessary(response, /* reload */ true)];
                    case 1:
                        _a.sent();
                        providerId = providerIdForResponse(response);
                        return [2 /*return*/, new UserCredentialImpl({
                                user: user,
                                providerId: providerId,
                                _tokenResponse: response,
                                operationType: operationType
                            })];
                }
            });
        });
    };
    return UserCredentialImpl;
}());
function providerIdForResponse(response) {
    if (response.providerId) {
        return response.providerId;
    }
    if ('phoneNumber' in response) {
        return "phone" /* PHONE */;
    }
    return null;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Asynchronously signs in as an anonymous user.
 *
 * @remarks
 * If there is already an anonymous user signed in, that user will be returned; otherwise, a
 * new anonymous user identity will be created and returned.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */
function signInAnonymously$1(auth) {
    var _a;
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var authInternal, response, userCredential;
        return tslib$1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    authInternal = _castAuth(auth);
                    return [4 /*yield*/, authInternal._initializationPromise];
                case 1:
                    _b.sent();
                    if ((_a = authInternal.currentUser) === null || _a === void 0 ? void 0 : _a.isAnonymous) {
                        // If an anonymous user is already signed in, no need to sign them in again.
                        return [2 /*return*/, new UserCredentialImpl({
                                user: authInternal.currentUser,
                                providerId: null,
                                operationType: "signIn" /* SIGN_IN */
                            })];
                    }
                    return [4 /*yield*/, signUp(authInternal, {
                            returnSecureToken: true
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* SIGN_IN */, response, true)];
                case 3:
                    userCredential = _b.sent();
                    return [4 /*yield*/, authInternal._updateCurrentUser(userCredential.user)];
                case 4:
                    _b.sent();
                    return [2 /*return*/, userCredential];
            }
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MultiFactorError = /** @class */ (function (_super) {
    tslib$1.__extends(MultiFactorError, _super);
    function MultiFactorError(auth, error, operationType, user) {
        var _a;
        var _this = _super.call(this, error.code, error.message) || this;
        _this.operationType = operationType;
        _this.user = user;
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(_this, MultiFactorError.prototype);
        _this.customData = {
            appName: auth.name,
            tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : undefined,
            _serverResponse: error.customData._serverResponse,
            operationType: operationType,
        };
        return _this;
    }
    MultiFactorError._fromErrorAndOperation = function (auth, error, operationType, user) {
        return new MultiFactorError(auth, error, operationType, user);
    };
    return MultiFactorError;
}(util.FirebaseError));
function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
    var idTokenProvider = operationType === "reauthenticate" /* REAUTHENTICATE */
        ? credential._getReauthenticationResolver(auth)
        : credential._getIdTokenResponse(auth);
    return idTokenProvider.catch(function (error) {
        if (error.code === "auth/" + "multi-factor-auth-required" /* MFA_REQUIRED */) {
            throw MultiFactorError._fromErrorAndOperation(auth, error, operationType, user);
        }
        throw error;
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Takes a set of UserInfo provider data and converts it to a set of names
 */
function providerDataAsNames(providerData) {
    return new Set(providerData
        .map(function (_a) {
        var providerId = _a.providerId;
        return providerId;
    })
        .filter(function (pid) { return !!pid; }));
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Unlinks a provider from a user account.
 *
 * @param user - The user.
 * @param providerId - The provider to unlink.
 *
 * @public
 */
function unlink$1(user, providerId) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal, providerUserInfo, _a, _b, providersLeft;
        var _c;
        return tslib$1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, _assertLinkedStatus(true, userInternal, providerId)];
                case 1:
                    _d.sent();
                    _a = deleteLinkedAccounts;
                    _b = [userInternal.auth];
                    _c = {};
                    return [4 /*yield*/, userInternal.getIdToken()];
                case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_c.idToken = _d.sent(),
                            _c.deleteProvider = [providerId],
                            _c)]))];
                case 3:
                    providerUserInfo = (_d.sent()).providerUserInfo;
                    providersLeft = providerDataAsNames(providerUserInfo || []);
                    userInternal.providerData = userInternal.providerData.filter(function (pd) {
                        return providersLeft.has(pd.providerId);
                    });
                    if (!providersLeft.has("phone" /* PHONE */)) {
                        userInternal.phoneNumber = null;
                    }
                    return [4 /*yield*/, userInternal.auth._persistUserIfCurrent(userInternal)];
                case 4:
                    _d.sent();
                    return [2 /*return*/, userInternal];
            }
        });
    });
}
function _link(user, credential, bypassAuthState) {
    if (bypassAuthState === void 0) { bypassAuthState = false; }
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var response, _a, _b, _c, _d, _e;
        return tslib$1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = _logoutIfInvalidated;
                    _b = [user];
                    _d = (_c = credential)._linkToIdToken;
                    _e = [user.auth];
                    return [4 /*yield*/, user.getIdToken()];
                case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_d.apply(_c, _e.concat([_f.sent()])), bypassAuthState]))];
                case 2:
                    response = _f.sent();
                    return [2 /*return*/, UserCredentialImpl._forOperation(user, "link" /* LINK */, response)];
            }
        });
    });
}
function _assertLinkedStatus(expected, user, provider) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var providerIds, code;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _reloadWithoutSaving(user)];
                case 1:
                    _a.sent();
                    providerIds = providerDataAsNames(user.providerData);
                    code = expected === false
                        ? "provider-already-linked" /* PROVIDER_ALREADY_LINKED */
                        : "no-such-provider" /* NO_SUCH_PROVIDER */;
                    _assert(providerIds.has(provider) === expected, user.auth, code);
                    return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _reauthenticate(user, credential, bypassAuthState) {
    if (bypassAuthState === void 0) { bypassAuthState = false; }
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var auth, operationType, response, parsed, localId, e_1;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    auth = user.auth;
                    operationType = "reauthenticate" /* REAUTHENTICATE */;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState)];
                case 2:
                    response = _a.sent();
                    _assert(response.idToken, auth, "internal-error" /* INTERNAL_ERROR */);
                    parsed = _parseToken(response.idToken);
                    _assert(parsed, auth, "internal-error" /* INTERNAL_ERROR */);
                    localId = parsed.sub;
                    _assert(user.uid === localId, auth, "user-mismatch" /* USER_MISMATCH */);
                    return [2 /*return*/, UserCredentialImpl._forOperation(user, operationType, response)];
                case 3:
                    e_1 = _a.sent();
                    // Convert user deleted error into user mismatch
                    if ((e_1 === null || e_1 === void 0 ? void 0 : e_1.code) === "auth/" + "user-not-found" /* USER_DELETED */) {
                        _fail(auth, "user-mismatch" /* USER_MISMATCH */);
                    }
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _signInWithCredential(auth, credential, bypassAuthState) {
    if (bypassAuthState === void 0) { bypassAuthState = false; }
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var operationType, response, userCredential;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    operationType = "signIn" /* SIGN_IN */;
                    return [4 /*yield*/, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(auth, operationType, response)];
                case 2:
                    userCredential = _a.sent();
                    if (!!bypassAuthState) return [3 /*break*/, 4];
                    return [4 /*yield*/, auth._updateCurrentUser(userCredential.user)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, userCredential];
            }
        });
    });
}
/**
 * Asynchronously signs in with the given credentials.
 *
 * @remarks
 * An {@link AuthProvider} can be used to generate the credential.
 *
 * @param auth - The {@link Auth} instance.
 * @param credential - The auth credential.
 *
 * @public
 */
function signInWithCredential$1(auth, credential) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _signInWithCredential(_castAuth(auth), credential)];
        });
    });
}
/**
 * Links the user account with the given credentials.
 *
 * @remarks
 * An {@link AuthProvider} can be used to generate the credential.
 *
 * @param user - The user.
 * @param credential - The auth credential.
 *
 * @public
 */
function linkWithCredential$1(user, credential) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, _assertLinkedStatus(false, userInternal, credential.providerId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, _link(userInternal, credential)];
            }
        });
    });
}
/**
 * Re-authenticates a user using a fresh credential.
 *
 * @remarks
 * Use before operations such as {@link updatePassword} that require tokens from recent sign-in
 * attempts. This method can be used to recover from a `CREDENTIAL_TOO_OLD_LOGIN_AGAIN` error.
 *
 * @param user - The user.
 * @param credential - The auth credential.
 *
 * @public
 */
function reauthenticateWithCredential$1(user, credential) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _reauthenticate(util.getModularInstance(user), credential)];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function signInWithCustomToken$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithCustomToken" /* SIGN_IN_WITH_CUSTOM_TOKEN */, _addTidIfNecessary(auth, request))];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Asynchronously signs in using a custom token.
 *
 * @remarks
 * Custom tokens are used to integrate Firebase Auth with existing auth systems, and must
 * be generated by an auth backend using the
 * {@link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#createcustomtoken | createCustomToken}
 * method in the {@link https://firebase.google.com/docs/auth/admin | Admin SDK} .
 *
 * Fails with an error if the token is invalid, expired, or not accepted by the Firebase Auth service.
 *
 * @param auth - The {@link Auth} instance.
 * @param customToken - The custom token to sign in with.
 *
 * @public
 */
function signInWithCustomToken$2(auth, customToken) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var authInternal, response, cred;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authInternal = _castAuth(auth);
                    return [4 /*yield*/, signInWithCustomToken$1(authInternal, {
                            token: customToken,
                            returnSecureToken: true
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* SIGN_IN */, response)];
                case 2:
                    cred = _a.sent();
                    return [4 /*yield*/, authInternal._updateCurrentUser(cred.user)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, cred];
            }
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MultiFactorInfoImpl = /** @class */ (function () {
    function MultiFactorInfoImpl(factorId, response) {
        this.factorId = factorId;
        this.uid = response.mfaEnrollmentId;
        this.enrollmentTime = new Date(response.enrolledAt).toUTCString();
        this.displayName = response.displayName;
    }
    MultiFactorInfoImpl._fromServerResponse = function (auth, enrollment) {
        if ('phoneInfo' in enrollment) {
            return PhoneMultiFactorInfoImpl._fromServerResponse(auth, enrollment);
        }
        return _fail(auth, "internal-error" /* INTERNAL_ERROR */);
    };
    return MultiFactorInfoImpl;
}());
var PhoneMultiFactorInfoImpl = /** @class */ (function (_super) {
    tslib$1.__extends(PhoneMultiFactorInfoImpl, _super);
    function PhoneMultiFactorInfoImpl(response) {
        var _this = _super.call(this, "phone" /* PHONE */, response) || this;
        _this.phoneNumber = response.phoneInfo;
        return _this;
    }
    PhoneMultiFactorInfoImpl._fromServerResponse = function (_auth, enrollment) {
        return new PhoneMultiFactorInfoImpl(enrollment);
    };
    return PhoneMultiFactorInfoImpl;
}(MultiFactorInfoImpl));

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings) {
    var _a;
    _assert(((_a = actionCodeSettings.url) === null || _a === void 0 ? void 0 : _a.length) > 0, auth, "invalid-continue-uri" /* INVALID_CONTINUE_URI */);
    _assert(typeof actionCodeSettings.dynamicLinkDomain === 'undefined' ||
        actionCodeSettings.dynamicLinkDomain.length > 0, auth, "invalid-dynamic-link-domain" /* INVALID_DYNAMIC_LINK_DOMAIN */);
    request.continueUrl = actionCodeSettings.url;
    request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
    request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;
    if (actionCodeSettings.iOS) {
        _assert(actionCodeSettings.iOS.bundleId.length > 0, auth, "missing-ios-bundle-id" /* MISSING_IOS_BUNDLE_ID */);
        request.iOSBundleId = actionCodeSettings.iOS.bundleId;
    }
    if (actionCodeSettings.android) {
        _assert(actionCodeSettings.android.packageName.length > 0, auth, "missing-android-pkg-name" /* MISSING_ANDROID_PACKAGE_NAME */);
        request.androidInstallApp = actionCodeSettings.android.installApp;
        request.androidMinimumVersionCode =
            actionCodeSettings.android.minimumVersion;
        request.androidPackageName = actionCodeSettings.android.packageName;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sends a password reset email to the given email address.
 *
 * @remarks
 * To complete the password reset, call {@link confirmPasswordReset} with the code supplied in
 * the email sent to the user, along with the new password specified by the user.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendPasswordResetEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain code from user.
 * await confirmPasswordReset('user@example.com', code);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */
function sendPasswordResetEmail$2(auth, email, actionCodeSettings) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var authModular, request;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authModular = util.getModularInstance(auth);
                    request = {
                        requestType: "PASSWORD_RESET" /* PASSWORD_RESET */,
                        email: email
                    };
                    if (actionCodeSettings) {
                        _setActionCodeSettingsOnRequest(authModular, request, actionCodeSettings);
                    }
                    return [4 /*yield*/, sendPasswordResetEmail$1(authModular, request)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Completes the password reset process, given a confirmation code and new password.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A confirmation code sent to the user.
 * @param newPassword - The new password.
 *
 * @public
 */
function confirmPasswordReset$1(auth, oobCode, newPassword) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resetPassword(util.getModularInstance(auth), {
                        oobCode: oobCode,
                        newPassword: newPassword
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Applies a verification code sent to the user by email or other out-of-band mechanism.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A verification code sent to the user.
 *
 * @public
 */
function applyActionCode$2(auth, oobCode) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, applyActionCode$1(util.getModularInstance(auth), { oobCode: oobCode })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Checks a verification code sent to the user by email or other out-of-band mechanism.
 *
 * @returns metadata about the code.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A verification code sent to the user.
 *
 * @public
 */
function checkActionCode$1(auth, oobCode) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var authModular, response, operation, multiFactorInfo;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authModular = util.getModularInstance(auth);
                    return [4 /*yield*/, resetPassword(authModular, { oobCode: oobCode })];
                case 1:
                    response = _a.sent();
                    operation = response.requestType;
                    _assert(operation, authModular, "internal-error" /* INTERNAL_ERROR */);
                    switch (operation) {
                        case "EMAIL_SIGNIN" /* EMAIL_SIGNIN */:
                            break;
                        case "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */:
                            _assert(response.newEmail, authModular, "internal-error" /* INTERNAL_ERROR */);
                            break;
                        case "REVERT_SECOND_FACTOR_ADDITION" /* REVERT_SECOND_FACTOR_ADDITION */:
                            _assert(response.mfaInfo, authModular, "internal-error" /* INTERNAL_ERROR */);
                        // fall through
                        default:
                            _assert(response.email, authModular, "internal-error" /* INTERNAL_ERROR */);
                    }
                    multiFactorInfo = null;
                    if (response.mfaInfo) {
                        multiFactorInfo = MultiFactorInfoImpl._fromServerResponse(_castAuth(authModular), response.mfaInfo);
                    }
                    return [2 /*return*/, {
                            data: {
                                email: (response.requestType === "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */
                                    ? response.newEmail
                                    : response.email) || null,
                                previousEmail: (response.requestType === "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */
                                    ? response.email
                                    : response.newEmail) || null,
                                multiFactorInfo: multiFactorInfo
                            },
                            operation: operation
                        }];
            }
        });
    });
}
/**
 * Checks a password reset code sent to the user by email or other out-of-band mechanism.
 *
 * @returns the user's email address if valid.
 *
 * @param auth - The {@link Auth} instance.
 * @param code - A verification code sent to the user.
 *
 * @public
 */
function verifyPasswordResetCode$1(auth, code) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var data;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkActionCode$1(util.getModularInstance(auth), code)];
                case 1:
                    data = (_a.sent()).data;
                    // Email should always be present since a code was sent to it
                    return [2 /*return*/, data.email];
            }
        });
    });
}
/**
 * Creates a new user account associated with the specified email address and password.
 *
 * @remarks
 * On successful creation of the user account, this user will also be signed in to your application.
 *
 * User account creation can fail if the account already exists or the password is invalid.
 *
 * Note: The email address acts as a unique identifier for the user and enables an email-based
 * password reset. This function will create a new user account and set the initial user password.
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param password - The user's chosen password.
 *
 * @public
 */
function createUserWithEmailAndPassword$1(auth, email, password) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var authInternal, response, userCredential;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authInternal = _castAuth(auth);
                    return [4 /*yield*/, signUp(authInternal, {
                            returnSecureToken: true,
                            email: email,
                            password: password
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* SIGN_IN */, response)];
                case 2:
                    userCredential = _a.sent();
                    return [4 /*yield*/, authInternal._updateCurrentUser(userCredential.user)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, userCredential];
            }
        });
    });
}
/**
 * Asynchronously signs in using an email and password.
 *
 * @remarks
 * Fails with an error if the email address and password do not match.
 *
 * Note: The user's password is NOT the password used to access the user's email account. The
 * email address serves as a unique identifier for the user, and the password is used to access
 * the user's account in your Firebase project. See also: {@link createUserWithEmailAndPassword}.
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The users email address.
 * @param password - The users password.
 *
 * @public
 */
function signInWithEmailAndPassword$1(auth, email, password) {
    return signInWithCredential$1(util.getModularInstance(auth), EmailAuthProvider$1.credential(email, password));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sends a sign-in email link to the user with the specified email.
 *
 * @remarks
 * The sign-in operation has to always be completed in the app unlike other out of band email
 * actions (password reset and email verifications). This is because, at the end of the flow,
 * the user is expected to be signed in and their Auth state persisted within the app.
 *
 * To complete sign in with the email link, call {@link signInWithEmailLink} with the email
 * address and the email link supplied in the email sent to the user.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain emailLink from the user.
 * if(isSignInWithEmailLink(auth, emailLink)) {
 *   await signInWithEmailLink(auth, 'user@example.com', emailLink);
 * }
 * ```
 *
 * @param authInternal - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */
function sendSignInLinkToEmail$2(auth, email, actionCodeSettings) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var authModular, request;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authModular = util.getModularInstance(auth);
                    request = {
                        requestType: "EMAIL_SIGNIN" /* EMAIL_SIGNIN */,
                        email: email
                    };
                    _assert(actionCodeSettings.handleCodeInApp, authModular, "argument-error" /* ARGUMENT_ERROR */);
                    if (actionCodeSettings) {
                        _setActionCodeSettingsOnRequest(authModular, request, actionCodeSettings);
                    }
                    return [4 /*yield*/, sendSignInLinkToEmail$1(authModular, request)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Checks if an incoming link is a sign-in with email link suitable for {@link signInWithEmailLink}.
 *
 * @param auth - The {@link Auth} instance.
 * @param emailLink - The link sent to the user's email address.
 *
 * @public
 */
function isSignInWithEmailLink$1(auth, emailLink) {
    var actionCodeUrl = ActionCodeURL$1.parseLink(emailLink);
    return (actionCodeUrl === null || actionCodeUrl === void 0 ? void 0 : actionCodeUrl.operation) === "EMAIL_SIGNIN" /* EMAIL_SIGNIN */;
}
/**
 * Asynchronously signs in using an email and sign-in email link.
 *
 * @remarks
 * If no link is passed, the link is inferred from the current URL.
 *
 * Fails with an error if the email address is invalid or OTP in email link expires.
 *
 * Note: Confirm the link is a sign-in email link before calling this method firebase.auth.Auth.isSignInWithEmailLink.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain emailLink from the user.
 * if(isSignInWithEmailLink(auth, emailLink)) {
 *   await signInWithEmailLink(auth, 'user@example.com', emailLink);
 * }
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param emailLink - The link sent to the user's email address.
 *
 * @public
 */
function signInWithEmailLink$2(auth, email, emailLink) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var authModular, credential;
        return tslib$1.__generator(this, function (_a) {
            authModular = util.getModularInstance(auth);
            credential = EmailAuthProvider$1.credentialWithLink(email, emailLink || _getCurrentUrl());
            // Check if the tenant ID in the email link matches the tenant ID on Auth
            // instance.
            _assert(credential._tenantId === (authModular.tenantId || null), authModular, "tenant-id-mismatch" /* TENANT_ID_MISMATCH */);
            return [2 /*return*/, signInWithCredential$1(authModular, credential)];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createAuthUri(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:createAuthUri" /* CREATE_AUTH_URI */, _addTidIfNecessary(auth, request))];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Gets the list of possible sign in methods for the given email address.
 *
 * @remarks
 * This is useful to differentiate methods of sign-in for the same provider, eg.
 * {@link EmailAuthProvider} which has 2 methods of sign-in,
 * {@link SignInMethod}.EMAIL_PASSWORD and
 * {@link SignInMethod}.EMAIL_LINK.
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 *
 * @public
 */
function fetchSignInMethodsForEmail$1(auth, email) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var continueUri, request, signinMethods;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    continueUri = _isHttpOrHttps() ? _getCurrentUrl() : 'http://localhost';
                    request = {
                        identifier: email,
                        continueUri: continueUri
                    };
                    return [4 /*yield*/, createAuthUri(util.getModularInstance(auth), request)];
                case 1:
                    signinMethods = (_a.sent()).signinMethods;
                    return [2 /*return*/, signinMethods || []];
            }
        });
    });
}
/**
 * Sends a verification email to a user.
 *
 * @remarks
 * The verification process is completed by calling {@link applyActionCode}.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendEmailVerification(user, actionCodeSettings);
 * // Obtain code from the user.
 * await applyActionCode(auth, code);
 * ```
 *
 * @param user - The user.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */
function sendEmailVerification$2(user, actionCodeSettings) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal, idToken, request, email;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, user.getIdToken()];
                case 1:
                    idToken = _a.sent();
                    request = {
                        requestType: "VERIFY_EMAIL" /* VERIFY_EMAIL */,
                        idToken: idToken
                    };
                    if (actionCodeSettings) {
                        _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
                    }
                    return [4 /*yield*/, sendEmailVerification$1(userInternal.auth, request)];
                case 2:
                    email = (_a.sent()).email;
                    if (!(email !== user.email)) return [3 /*break*/, 4];
                    return [4 /*yield*/, user.reload()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Sends a verification email to a new email address.
 *
 * @remarks
 * The user's email will be updated to the new one after being verified.
 *
 * If you have a custom email action handler, you can complete the verification process by calling
 * {@link applyActionCode}.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await verifyBeforeUpdateEmail(user, 'newemail@example.com', actionCodeSettings);
 * // Obtain code from the user.
 * await applyActionCode(auth, code);
 * ```
 *
 * @param user - The user.
 * @param newEmail - The new email address to be verified before update.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */
function verifyBeforeUpdateEmail$1(user, newEmail, actionCodeSettings) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal, idToken, request, email;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, user.getIdToken()];
                case 1:
                    idToken = _a.sent();
                    request = {
                        requestType: "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */,
                        idToken: idToken,
                        newEmail: newEmail
                    };
                    if (actionCodeSettings) {
                        _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
                    }
                    return [4 /*yield*/, verifyAndChangeEmail(userInternal.auth, request)];
                case 2:
                    email = (_a.sent()).email;
                    if (!(email !== user.email)) return [3 /*break*/, 4];
                    // If the local copy of the email on user is outdated, reload the
                    // user.
                    return [4 /*yield*/, user.reload()];
                case 3:
                    // If the local copy of the email on user is outdated, reload the
                    // user.
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function updateProfile$1(auth, request) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:update" /* SET_ACCOUNT_INFO */, request)];
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Updates a user's profile data.
 *
 * @param user - The user.
 * @param profile - The profile's `displayName` and `photoURL` to update.
 *
 * @public
 */
function updateProfile$2(user, _a) {
    var displayName = _a.displayName, photoUrl = _a.photoURL;
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal, idToken, profileRequest, response, passwordProvider;
        return tslib$1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (displayName === undefined && photoUrl === undefined) {
                        return [2 /*return*/];
                    }
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, userInternal.getIdToken()];
                case 1:
                    idToken = _b.sent();
                    profileRequest = {
                        idToken: idToken,
                        displayName: displayName,
                        photoUrl: photoUrl,
                        returnSecureToken: true
                    };
                    return [4 /*yield*/, _logoutIfInvalidated(userInternal, updateProfile$1(userInternal.auth, profileRequest))];
                case 2:
                    response = _b.sent();
                    userInternal.displayName = response.displayName || null;
                    userInternal.photoURL = response.photoUrl || null;
                    passwordProvider = userInternal.providerData.find(function (_a) {
                        var providerId = _a.providerId;
                        return providerId === "password" /* PASSWORD */;
                    });
                    if (passwordProvider) {
                        passwordProvider.displayName = userInternal.displayName;
                        passwordProvider.photoURL = userInternal.photoURL;
                    }
                    return [4 /*yield*/, userInternal._updateTokensIfNecessary(response)];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Updates the user's email address.
 *
 * @remarks
 * An email will be sent to the original email address (if it was set) that allows to revoke the
 * email address change, in order to protect them from account hijacking.
 *
 * Important: this is a security sensitive operation that requires the user to have recently signed
 * in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 * @param newEmail - The new email address.
 *
 * @public
 */
function updateEmail$1(user, newEmail) {
    return updateEmailOrPassword(util.getModularInstance(user), newEmail, null);
}
/**
 * Updates the user's password.
 *
 * @remarks
 * Important: this is a security sensitive operation that requires the user to have recently signed
 * in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 * @param newPassword - The new password.
 *
 * @public
 */
function updatePassword$1(user, newPassword) {
    return updateEmailOrPassword(util.getModularInstance(user), null, newPassword);
}
function updateEmailOrPassword(user, email, password) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var auth, idToken, request, response;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    auth = user.auth;
                    return [4 /*yield*/, user.getIdToken()];
                case 1:
                    idToken = _a.sent();
                    request = {
                        idToken: idToken,
                        returnSecureToken: true
                    };
                    if (email) {
                        request.email = email;
                    }
                    if (password) {
                        request.password = password;
                    }
                    return [4 /*yield*/, _logoutIfInvalidated(user, updateEmailPassword(auth, request))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, user._updateTokensIfNecessary(response, /* reload */ true)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Parse the `AdditionalUserInfo` from the ID token response.
 *
 */
function _fromIdTokenResponse(idTokenResponse) {
    var _a, _b;
    if (!idTokenResponse) {
        return null;
    }
    var providerId = idTokenResponse.providerId;
    var profile = idTokenResponse.rawUserInfo
        ? JSON.parse(idTokenResponse.rawUserInfo)
        : {};
    var isNewUser = idTokenResponse.isNewUser ||
        idTokenResponse.kind === "identitytoolkit#SignupNewUserResponse" /* SignupNewUser */;
    if (!providerId && (idTokenResponse === null || idTokenResponse === void 0 ? void 0 : idTokenResponse.idToken)) {
        var signInProvider = (_b = (_a = _parseToken(idTokenResponse.idToken)) === null || _a === void 0 ? void 0 : _a.firebase) === null || _b === void 0 ? void 0 : _b['sign_in_provider'];
        if (signInProvider) {
            var filteredProviderId = signInProvider !== "anonymous" /* ANONYMOUS */ &&
                signInProvider !== "custom" /* CUSTOM */
                ? signInProvider
                : null;
            // Uses generic class in accordance with the legacy SDK.
            return new GenericAdditionalUserInfo(isNewUser, filteredProviderId);
        }
    }
    if (!providerId) {
        return null;
    }
    switch (providerId) {
        case "facebook.com" /* FACEBOOK */:
            return new FacebookAdditionalUserInfo(isNewUser, profile);
        case "github.com" /* GITHUB */:
            return new GithubAdditionalUserInfo(isNewUser, profile);
        case "google.com" /* GOOGLE */:
            return new GoogleAdditionalUserInfo(isNewUser, profile);
        case "twitter.com" /* TWITTER */:
            return new TwitterAdditionalUserInfo(isNewUser, profile, idTokenResponse.screenName || null);
        case "custom" /* CUSTOM */:
        case "anonymous" /* ANONYMOUS */:
            return new GenericAdditionalUserInfo(isNewUser, null);
        default:
            return new GenericAdditionalUserInfo(isNewUser, providerId, profile);
    }
}
var GenericAdditionalUserInfo = /** @class */ (function () {
    function GenericAdditionalUserInfo(isNewUser, providerId, profile) {
        if (profile === void 0) { profile = {}; }
        this.isNewUser = isNewUser;
        this.providerId = providerId;
        this.profile = profile;
    }
    return GenericAdditionalUserInfo;
}());
var FederatedAdditionalUserInfoWithUsername = /** @class */ (function (_super) {
    tslib$1.__extends(FederatedAdditionalUserInfoWithUsername, _super);
    function FederatedAdditionalUserInfoWithUsername(isNewUser, providerId, profile, username) {
        var _this = _super.call(this, isNewUser, providerId, profile) || this;
        _this.username = username;
        return _this;
    }
    return FederatedAdditionalUserInfoWithUsername;
}(GenericAdditionalUserInfo));
var FacebookAdditionalUserInfo = /** @class */ (function (_super) {
    tslib$1.__extends(FacebookAdditionalUserInfo, _super);
    function FacebookAdditionalUserInfo(isNewUser, profile) {
        return _super.call(this, isNewUser, "facebook.com" /* FACEBOOK */, profile) || this;
    }
    return FacebookAdditionalUserInfo;
}(GenericAdditionalUserInfo));
var GithubAdditionalUserInfo = /** @class */ (function (_super) {
    tslib$1.__extends(GithubAdditionalUserInfo, _super);
    function GithubAdditionalUserInfo(isNewUser, profile) {
        return _super.call(this, isNewUser, "github.com" /* GITHUB */, profile, typeof (profile === null || profile === void 0 ? void 0 : profile.login) === 'string' ? profile === null || profile === void 0 ? void 0 : profile.login : null) || this;
    }
    return GithubAdditionalUserInfo;
}(FederatedAdditionalUserInfoWithUsername));
var GoogleAdditionalUserInfo = /** @class */ (function (_super) {
    tslib$1.__extends(GoogleAdditionalUserInfo, _super);
    function GoogleAdditionalUserInfo(isNewUser, profile) {
        return _super.call(this, isNewUser, "google.com" /* GOOGLE */, profile) || this;
    }
    return GoogleAdditionalUserInfo;
}(GenericAdditionalUserInfo));
var TwitterAdditionalUserInfo = /** @class */ (function (_super) {
    tslib$1.__extends(TwitterAdditionalUserInfo, _super);
    function TwitterAdditionalUserInfo(isNewUser, profile, screenName) {
        return _super.call(this, isNewUser, "twitter.com" /* TWITTER */, profile, screenName) || this;
    }
    return TwitterAdditionalUserInfo;
}(FederatedAdditionalUserInfoWithUsername));
/**
 * Extracts provider specific {@link AdditionalUserInfo} for the given credential.
 *
 * @param userCredential - The user credential.
 *
 * @public
 */
function getAdditionalUserInfo$1(userCredential) {
    var _a = userCredential, user = _a.user, _tokenResponse = _a._tokenResponse;
    if (user.isAnonymous && !_tokenResponse) {
        // Handle the special case where signInAnonymously() gets called twice.
        // No network call is made so there's nothing to actually fill this in
        return {
            providerId: null,
            isNewUser: false,
            profile: null
        };
    }
    return _fromIdTokenResponse(_tokenResponse);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Non-optional auth methods.
/**
 * Changes the type of persistence on the {@link Auth} instance for the currently saved
 * `Auth` session and applies this type of persistence for future sign-in requests, including
 * sign-in with redirect requests.
 *
 * @remarks
 * This makes it easy for a user signing in to specify whether their session should be
 * remembered or not. It also makes it easier to never persist the `Auth` state for applications
 * that are shared by other users or have sensitive data.
 *
 * @example
 * ```javascript
 * setPersistence(auth, browserSessionPersistence);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param persistence - The {@link Persistence} to use.
 * @returns A `Promise` that resolves once the persistence change has completed
 *
 * @public
 */
function setPersistence$1(auth, persistence) {
    return util.getModularInstance(auth).setPersistence(persistence);
}
/**
 * Adds an observer for changes to the signed-in user's ID token, which includes sign-in,
 * sign-out, and token refresh events.
 *
 * @param auth - The {@link Auth} instance.
 * @param nextOrObserver - callback triggered on change.
 * @param error - callback triggered on error.
 * @param completed - callback triggered when observer is removed.
 *
 * @public
 */
function onIdTokenChanged$1(auth, nextOrObserver, error, completed) {
    return util.getModularInstance(auth).onIdTokenChanged(nextOrObserver, error, completed);
}
/**
 * Adds an observer for changes to the user's sign-in state.
 *
 * @remarks
 * To keep the old behavior, see {@link onIdTokenChanged}.
 *
 * @param auth - The {@link Auth} instance.
 * @param nextOrObserver - callback triggered on change.
 * @param error - callback triggered on error.
 * @param completed - callback triggered when observer is removed.
 *
 * @public
 */
function onAuthStateChanged$1(auth, nextOrObserver, error, completed) {
    return util.getModularInstance(auth).onAuthStateChanged(nextOrObserver, error, completed);
}
/**
 * Sets the current language to the default device/browser preference.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */
function useDeviceLanguage$1(auth) {
    util.getModularInstance(auth).useDeviceLanguage();
}
/**
 * Asynchronously sets the provided user as {@link Auth.currentUser} on the
 * {@link Auth} instance.
 *
 * @remarks
 * A new instance copy of the user provided will be made and set as currentUser.
 *
 * This will trigger {@link onAuthStateChanged} and {@link onIdTokenChanged} listeners
 * like other sign in methods.
 *
 * The operation fails with an error if the user to be updated belongs to a different Firebase
 * project.
 *
 * @param auth - The {@link Auth} instance.
 * @param user - The new {@link User}.
 *
 * @public
 */
function updateCurrentUser$1(auth, user) {
    return util.getModularInstance(auth).updateCurrentUser(user);
}
/**
 * Signs out the current user.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */
function signOut$1(auth) {
    return util.getModularInstance(auth).signOut();
}
/**
 * Deletes and signs out the user.
 *
 * @remarks
 * Important: this is a security-sensitive operation that requires the user to have recently
 * signed in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 *
 * @public
 */
function deleteUser$1(user) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            return [2 /*return*/, util.getModularInstance(user).delete()];
        });
    });
}

var MultiFactorSessionImpl = /** @class */ (function () {
    function MultiFactorSessionImpl(type, credential) {
        this.type = type;
        this.credential = credential;
    }
    MultiFactorSessionImpl._fromIdtoken = function (idToken) {
        return new MultiFactorSessionImpl("enroll" /* ENROLL */, idToken);
    };
    MultiFactorSessionImpl._fromMfaPendingCredential = function (mfaPendingCredential) {
        return new MultiFactorSessionImpl("signin" /* SIGN_IN */, mfaPendingCredential);
    };
    MultiFactorSessionImpl.prototype.toJSON = function () {
        var _a;
        var key = this.type === "enroll" /* ENROLL */
            ? 'idToken'
            : 'pendingCredential';
        return {
            multiFactorSession: (_a = {},
                _a[key] = this.credential,
                _a)
        };
    };
    MultiFactorSessionImpl.fromJSON = function (obj) {
        var _a, _b;
        if (obj === null || obj === void 0 ? void 0 : obj.multiFactorSession) {
            if ((_a = obj.multiFactorSession) === null || _a === void 0 ? void 0 : _a.pendingCredential) {
                return MultiFactorSessionImpl._fromMfaPendingCredential(obj.multiFactorSession.pendingCredential);
            }
            else if ((_b = obj.multiFactorSession) === null || _b === void 0 ? void 0 : _b.idToken) {
                return MultiFactorSessionImpl._fromIdtoken(obj.multiFactorSession.idToken);
            }
        }
        return null;
    };
    return MultiFactorSessionImpl;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MultiFactorResolverImpl = /** @class */ (function () {
    function MultiFactorResolverImpl(session, hints, signInResolver) {
        this.session = session;
        this.hints = hints;
        this.signInResolver = signInResolver;
    }
    /** @internal */
    MultiFactorResolverImpl._fromError = function (authExtern, error) {
        var _this = this;
        var auth = _castAuth(authExtern);
        var serverResponse = error.customData._serverResponse;
        var hints = (serverResponse.mfaInfo || []).map(function (enrollment) {
            return MultiFactorInfoImpl._fromServerResponse(auth, enrollment);
        });
        _assert(serverResponse.mfaPendingCredential, auth, "internal-error" /* INTERNAL_ERROR */);
        var session = MultiFactorSessionImpl._fromMfaPendingCredential(serverResponse.mfaPendingCredential);
        return new MultiFactorResolverImpl(session, hints, function (assertion) { return tslib$1.__awaiter(_this, void 0, void 0, function () {
            var mfaResponse, idTokenResponse, _a, userCredential;
            return tslib$1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, assertion._process(auth, session)];
                    case 1:
                        mfaResponse = _b.sent();
                        // Clear out the unneeded fields from the old login response
                        delete serverResponse.mfaInfo;
                        delete serverResponse.mfaPendingCredential;
                        idTokenResponse = tslib$1.__assign(tslib$1.__assign({}, serverResponse), { idToken: mfaResponse.idToken, refreshToken: mfaResponse.refreshToken });
                        _a = error.operationType;
                        switch (_a) {
                            case "signIn" /* SIGN_IN */: return [3 /*break*/, 2];
                            case "reauthenticate" /* REAUTHENTICATE */: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(auth, error.operationType, idTokenResponse)];
                    case 3:
                        userCredential = _b.sent();
                        return [4 /*yield*/, auth._updateCurrentUser(userCredential.user)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, userCredential];
                    case 5:
                        _assert(error.user, auth, "internal-error" /* INTERNAL_ERROR */);
                        return [2 /*return*/, UserCredentialImpl._forOperation(error.user, error.operationType, idTokenResponse)];
                    case 6:
                        _fail(auth, "internal-error" /* INTERNAL_ERROR */);
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    MultiFactorResolverImpl.prototype.resolveSignIn = function (assertionExtern) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var assertion;
            return tslib$1.__generator(this, function (_a) {
                assertion = assertionExtern;
                return [2 /*return*/, this.signInResolver(assertion)];
            });
        });
    };
    return MultiFactorResolverImpl;
}());
/**
 * Provides a {@link MultiFactorResolver} suitable for completion of a
 * multi-factor flow.
 *
 * @param auth - The {@link Auth} instance.
 * @param error - The {@link MultiFactorError} raised during a sign-in, or
 * reauthentication operation.
 *
 * @public
 */
function getMultiFactorResolver$1(auth, error) {
    var _a;
    var authModular = util.getModularInstance(auth);
    var errorInternal = error;
    _assert(error.customData.operationType, authModular, "argument-error" /* ARGUMENT_ERROR */);
    _assert((_a = errorInternal.customData._serverResponse) === null || _a === void 0 ? void 0 : _a.mfaPendingCredential, authModular, "argument-error" /* ARGUMENT_ERROR */);
    return MultiFactorResolverImpl._fromError(authModular, errorInternal);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function startEnrollPhoneMfa(auth, request) {
    return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaEnrollment:start" /* START_PHONE_MFA_ENROLLMENT */, _addTidIfNecessary(auth, request));
}
function finalizeEnrollPhoneMfa(auth, request) {
    return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaEnrollment:finalize" /* FINALIZE_PHONE_MFA_ENROLLMENT */, _addTidIfNecessary(auth, request));
}
function withdrawMfa(auth, request) {
    return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaEnrollment:withdraw" /* WITHDRAW_MFA */, _addTidIfNecessary(auth, request));
}

var MultiFactorUserImpl = /** @class */ (function () {
    function MultiFactorUserImpl(user) {
        var _this = this;
        this.user = user;
        this.enrolledFactors = [];
        user._onReload(function (userInfo) {
            if (userInfo.mfaInfo) {
                _this.enrolledFactors = userInfo.mfaInfo.map(function (enrollment) {
                    return MultiFactorInfoImpl._fromServerResponse(user.auth, enrollment);
                });
            }
        });
    }
    MultiFactorUserImpl._fromUser = function (user) {
        return new MultiFactorUserImpl(user);
    };
    MultiFactorUserImpl.prototype.getSession = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib$1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = MultiFactorSessionImpl)._fromIdtoken;
                        return [4 /*yield*/, this.user.getIdToken()];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    MultiFactorUserImpl.prototype.enroll = function (assertionExtern, displayName) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var assertion, session, finalizeMfaResponse;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assertion = assertionExtern;
                        return [4 /*yield*/, this.getSession()];
                    case 1:
                        session = (_a.sent());
                        return [4 /*yield*/, _logoutIfInvalidated(this.user, assertion._process(this.user.auth, session, displayName))];
                    case 2:
                        finalizeMfaResponse = _a.sent();
                        // New tokens will be issued after enrollment of the new second factors.
                        // They need to be updated on the user.
                        return [4 /*yield*/, this.user._updateTokensIfNecessary(finalizeMfaResponse)];
                    case 3:
                        // New tokens will be issued after enrollment of the new second factors.
                        // They need to be updated on the user.
                        _a.sent();
                        // The user needs to be reloaded to get the new multi-factor information
                        // from server. USER_RELOADED event will be triggered and `enrolledFactors`
                        // will be updated.
                        return [2 /*return*/, this.user.reload()];
                }
            });
        });
    };
    MultiFactorUserImpl.prototype.unenroll = function (infoOrUid) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var mfaEnrollmentId, idToken, idTokenResponse, e_1;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mfaEnrollmentId = typeof infoOrUid === 'string' ? infoOrUid : infoOrUid.uid;
                        return [4 /*yield*/, this.user.getIdToken()];
                    case 1:
                        idToken = _a.sent();
                        return [4 /*yield*/, _logoutIfInvalidated(this.user, withdrawMfa(this.user.auth, {
                                idToken: idToken,
                                mfaEnrollmentId: mfaEnrollmentId
                            }))];
                    case 2:
                        idTokenResponse = _a.sent();
                        // Remove the second factor from the user's list.
                        this.enrolledFactors = this.enrolledFactors.filter(function (_a) {
                            var uid = _a.uid;
                            return uid !== mfaEnrollmentId;
                        });
                        // Depending on whether the backend decided to revoke the user's session,
                        // the tokenResponse may be empty. If the tokens were not updated (and they
                        // are now invalid), reloading the user will discover this and invalidate
                        // the user's state accordingly.
                        return [4 /*yield*/, this.user._updateTokensIfNecessary(idTokenResponse)];
                    case 3:
                        // Depending on whether the backend decided to revoke the user's session,
                        // the tokenResponse may be empty. If the tokens were not updated (and they
                        // are now invalid), reloading the user will discover this and invalidate
                        // the user's state accordingly.
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.user.reload()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        if (e_1.code !== "auth/" + "user-token-expired" /* TOKEN_EXPIRED */) {
                            throw e_1;
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return MultiFactorUserImpl;
}());
var multiFactorUserCache = new WeakMap();
/**
 * The {@link MultiFactorUser} corresponding to the user.
 *
 * @remarks
 * This is used to access all multi-factor properties and operations related to the user.
 *
 * @param user - The user.
 *
 * @public
 */
function multiFactor$1(user) {
    var userModular = util.getModularInstance(user);
    if (!multiFactorUserCache.has(userModular)) {
        multiFactorUserCache.set(userModular, MultiFactorUserImpl._fromUser(userModular));
    }
    return multiFactorUserCache.get(userModular);
}

var name = "@firebase/auth";
var version = "0.19.11";

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AuthInterop = /** @class */ (function () {
    function AuthInterop(auth) {
        this.auth = auth;
        this.internalListeners = new Map();
    }
    AuthInterop.prototype.getUid = function () {
        var _a;
        this.assertAuthConfigured();
        return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
    };
    AuthInterop.prototype.getToken = function (forceRefresh) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var accessToken;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assertAuthConfigured();
                        return [4 /*yield*/, this.auth._initializationPromise];
                    case 1:
                        _a.sent();
                        if (!this.auth.currentUser) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.auth.currentUser.getIdToken(forceRefresh)];
                    case 2:
                        accessToken = _a.sent();
                        return [2 /*return*/, { accessToken: accessToken }];
                }
            });
        });
    };
    AuthInterop.prototype.addAuthTokenListener = function (listener) {
        this.assertAuthConfigured();
        if (this.internalListeners.has(listener)) {
            return;
        }
        var unsubscribe = this.auth.onIdTokenChanged(function (user) {
            var _a;
            listener(((_a = user) === null || _a === void 0 ? void 0 : _a.stsTokenManager.accessToken) || null);
        });
        this.internalListeners.set(listener, unsubscribe);
        this.updateProactiveRefresh();
    };
    AuthInterop.prototype.removeAuthTokenListener = function (listener) {
        this.assertAuthConfigured();
        var unsubscribe = this.internalListeners.get(listener);
        if (!unsubscribe) {
            return;
        }
        this.internalListeners.delete(listener);
        unsubscribe();
        this.updateProactiveRefresh();
    };
    AuthInterop.prototype.assertAuthConfigured = function () {
        _assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth" /* DEPENDENT_SDK_INIT_BEFORE_AUTH */);
    };
    AuthInterop.prototype.updateProactiveRefresh = function () {
        if (this.internalListeners.size > 0) {
            this.auth._startProactiveRefresh();
        }
        else {
            this.auth._stopProactiveRefresh();
        }
    };
    return AuthInterop;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getVersionForPlatform(clientPlatform) {
    switch (clientPlatform) {
        case "Node" /* NODE */:
            return 'node';
        case "ReactNative" /* REACT_NATIVE */:
            return 'rn';
        case "Worker" /* WORKER */:
            return 'webworker';
        case "Cordova" /* CORDOVA */:
            return 'cordova';
        default:
            return undefined;
    }
}
/** @internal */
function registerAuth(clientPlatform) {
    app$1._registerComponent(new component.Component("auth" /* AUTH */, function (container, _a) {
        var deps = _a.options;
        var app = container.getProvider('app').getImmediate();
        var heartbeatServiceProvider = container.getProvider('heartbeat');
        var _b = app.options, apiKey = _b.apiKey, authDomain = _b.authDomain;
        return (function (app, heartbeatServiceProvider) {
            _assert(apiKey && !apiKey.includes(':'), "invalid-api-key" /* INVALID_API_KEY */, { appName: app.name });
            // Auth domain is optional if IdP sign in isn't being used
            _assert(!(authDomain === null || authDomain === void 0 ? void 0 : authDomain.includes(':')), "argument-error" /* ARGUMENT_ERROR */, {
                appName: app.name
            });
            var config = {
                apiKey: apiKey,
                authDomain: authDomain,
                clientPlatform: clientPlatform,
                apiHost: "identitytoolkit.googleapis.com" /* API_HOST */,
                tokenApiHost: "securetoken.googleapis.com" /* TOKEN_API_HOST */,
                apiScheme: "https" /* API_SCHEME */,
                sdkClientVersion: _getClientVersion(clientPlatform)
            };
            var authInstance = new AuthImpl(app, heartbeatServiceProvider, config);
            _initializeAuthInstance(authInstance, deps);
            return authInstance;
        })(app, heartbeatServiceProvider);
    }, "PUBLIC" /* PUBLIC */)
        /**
         * Auth can only be initialized by explicitly calling getAuth() or initializeAuth()
         * For why we do this, See go/firebase-next-auth-init
         */
        .setInstantiationMode("EXPLICIT" /* EXPLICIT */)
        /**
         * Because all firebase products that depend on auth depend on auth-internal directly,
         * we need to initialize auth-internal after auth is initialized to make it available to other firebase products.
         */
        .setInstanceCreatedCallback(function (container, _instanceIdentifier, _instance) {
        var authInternalProvider = container.getProvider("auth-internal" /* AUTH_INTERNAL */);
        authInternalProvider.initialize();
    }));
    app$1._registerComponent(new component.Component("auth-internal" /* AUTH_INTERNAL */, function (container) {
        var auth = _castAuth(container.getProvider("auth" /* AUTH */).getImmediate());
        return (function (auth) { return new AuthInterop(auth); })(auth);
    }, "PRIVATE" /* PRIVATE */).setInstantiationMode("EXPLICIT" /* EXPLICIT */));
    app$1.registerVersion(name, version, getVersionForPlatform(clientPlatform));
    // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
    app$1.registerVersion(name, version, 'cjs5');
}

var STORAGE_AVAILABLE_KEY = '__sak';

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An enum of factors that may be used for multifactor authentication.
 *
 * @public
 */
var FactorId$1 = {
    /** Phone as second factor */
    PHONE: 'phone'
};
/**
 * Enumeration of supported providers.
 *
 * @public
 */
var ProviderId$1 = {
    /** Facebook provider ID */
    FACEBOOK: 'facebook.com',
    /** GitHub provider ID */
    GITHUB: 'github.com',
    /** Google provider ID */
    GOOGLE: 'google.com',
    /** Password provider */
    PASSWORD: 'password',
    /** Phone provider */
    PHONE: 'phone',
    /** Twitter provider ID */
    TWITTER: 'twitter.com'
};
/**
 * Enumeration of supported sign-in methods.
 *
 * @public
 */
var SignInMethod$1 = {
    /** Email link sign in method */
    EMAIL_LINK: 'emailLink',
    /** Email/password sign in method */
    EMAIL_PASSWORD: 'password',
    /** Facebook sign in method */
    FACEBOOK: 'facebook.com',
    /** GitHub sign in method */
    GITHUB: 'github.com',
    /** Google sign in method */
    GOOGLE: 'google.com',
    /** Phone sign in method */
    PHONE: 'phone',
    /** Twitter sign in method */
    TWITTER: 'twitter.com'
};
/**
 * Enumeration of supported operation types.
 *
 * @public
 */
var OperationType$1 = {
    /** Operation involving linking an additional provider to an already signed-in user. */
    LINK: 'link',
    /** Operation involving using a provider to reauthenticate an already signed-in user. */
    REAUTHENTICATE: 'reauthenticate',
    /** Operation involving signing in a user. */
    SIGN_IN: 'signIn'
};
/**
 * An enumeration of the possible email action types.
 *
 * @public
 */
var ActionCodeOperation$1 = {
    /** The email link sign-in action. */
    EMAIL_SIGNIN: 'EMAIL_SIGNIN',
    /** The password reset action. */
    PASSWORD_RESET: 'PASSWORD_RESET',
    /** The email revocation action. */
    RECOVER_EMAIL: 'RECOVER_EMAIL',
    /** The revert second factor addition email action. */
    REVERT_SECOND_FACTOR_ADDITION: 'REVERT_SECOND_FACTOR_ADDITION',
    /** The revert second factor addition email action. */
    VERIFY_AND_CHANGE_EMAIL: 'VERIFY_AND_CHANGE_EMAIL',
    /** The email verification action. */
    VERIFY_EMAIL: 'VERIFY_EMAIL'
};

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function startSignInPhoneMfa(auth, request) {
    return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaSignIn:start" /* START_PHONE_MFA_SIGN_IN */, _addTidIfNecessary(auth, request));
}
function finalizeSignInPhoneMfa(auth, request) {
    return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaSignIn:finalize" /* FINALIZE_PHONE_MFA_SIGN_IN */, _addTidIfNecessary(auth, request));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getRecaptchaParams(auth) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _performApiRequest(auth, "GET" /* GET */, "/v1/recaptchaParams" /* GET_RECAPTCHA_PARAM */)];
                case 1: return [2 /*return*/, ((_a.sent()).recaptchaSiteKey || '')];
            }
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Lazy accessor for window, since the compat layer won't tree shake this out,
 * we need to make sure not to mess with window unless we have to
 */
function _window() {
    return window;
}
function _setWindowLocation(url) {
    _window().location.href = url;
}

/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _isWorker() {
    return (typeof _window()['WorkerGlobalScope'] !== 'undefined' &&
        typeof _window()['importScripts'] === 'function');
}
function _getActiveServiceWorker() {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var registration;
        return tslib$1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) {
                        return [2 /*return*/, null];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.serviceWorker.ready];
                case 2:
                    registration = _b.sent();
                    return [2 /*return*/, registration.active];
                case 3:
                    _b.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function _getServiceWorkerController() {
    var _a;
    return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
}
function _getWorkerGlobalScope() {
    return _isWorker() ? self : null;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getScriptParentElement() {
    var _a, _b;
    return (_b = (_a = document.getElementsByTagName('head')) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
}
function _loadJS(url) {
    // TODO: consider adding timeout support & cancellation
    return new Promise(function (resolve, reject) {
        var el = document.createElement('script');
        el.setAttribute('src', url);
        el.onload = resolve;
        el.onerror = function (e) {
            var error = _createError("internal-error" /* INTERNAL_ERROR */);
            error.customData = e;
            reject(error);
        };
        el.type = 'text/javascript';
        el.charset = 'UTF-8';
        getScriptParentElement().appendChild(el);
    });
}
function _generateCallbackName(prefix) {
    return "__" + prefix + Math.floor(Math.random() * 1000000);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _SOLVE_TIME_MS = 500;
var _EXPIRATION_TIME_MS = 60000;
var _WIDGET_ID_START = 1000000000000;
var MockReCaptcha = /** @class */ (function () {
    function MockReCaptcha(auth) {
        this.auth = auth;
        this.counter = _WIDGET_ID_START;
        this._widgets = new Map();
    }
    MockReCaptcha.prototype.render = function (container, parameters) {
        var id = this.counter;
        this._widgets.set(id, new MockWidget(container, this.auth.name, parameters || {}));
        this.counter++;
        return id;
    };
    MockReCaptcha.prototype.reset = function (optWidgetId) {
        var _a;
        var id = optWidgetId || _WIDGET_ID_START;
        void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.delete());
        this._widgets.delete(id);
    };
    MockReCaptcha.prototype.getResponse = function (optWidgetId) {
        var _a;
        var id = optWidgetId || _WIDGET_ID_START;
        return ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.getResponse()) || '';
    };
    MockReCaptcha.prototype.execute = function (optWidgetId) {
        var _a;
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var id;
            return tslib$1.__generator(this, function (_b) {
                id = optWidgetId || _WIDGET_ID_START;
                void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.execute());
                return [2 /*return*/, ''];
            });
        });
    };
    return MockReCaptcha;
}());
var MockWidget = /** @class */ (function () {
    function MockWidget(containerOrId, appName, params) {
        var _this = this;
        this.params = params;
        this.timerId = null;
        this.deleted = false;
        this.responseToken = null;
        this.clickHandler = function () {
            _this.execute();
        };
        var container = typeof containerOrId === 'string'
            ? document.getElementById(containerOrId)
            : containerOrId;
        _assert(container, "argument-error" /* ARGUMENT_ERROR */, { appName: appName });
        this.container = container;
        this.isVisible = this.params.size !== 'invisible';
        if (this.isVisible) {
            this.execute();
        }
        else {
            this.container.addEventListener('click', this.clickHandler);
        }
    }
    MockWidget.prototype.getResponse = function () {
        this.checkIfDeleted();
        return this.responseToken;
    };
    MockWidget.prototype.delete = function () {
        this.checkIfDeleted();
        this.deleted = true;
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
        this.container.removeEventListener('click', this.clickHandler);
    };
    MockWidget.prototype.execute = function () {
        var _this = this;
        this.checkIfDeleted();
        if (this.timerId) {
            return;
        }
        this.timerId = window.setTimeout(function () {
            _this.responseToken = generateRandomAlphaNumericString(50);
            var _a = _this.params, callback = _a.callback, expiredCallback = _a["expired-callback"];
            if (callback) {
                try {
                    callback(_this.responseToken);
                }
                catch (e) { }
            }
            _this.timerId = window.setTimeout(function () {
                _this.timerId = null;
                _this.responseToken = null;
                if (expiredCallback) {
                    try {
                        expiredCallback();
                    }
                    catch (e) { }
                }
                if (_this.isVisible) {
                    _this.execute();
                }
            }, _EXPIRATION_TIME_MS);
        }, _SOLVE_TIME_MS);
    };
    MockWidget.prototype.checkIfDeleted = function () {
        if (this.deleted) {
            throw new Error('reCAPTCHA mock was already deleted!');
        }
    };
    return MockWidget;
}());
function generateRandomAlphaNumericString(len) {
    var chars = [];
    var allowedChars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < len; i++) {
        chars.push(allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)));
    }
    return chars.join('');
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// ReCaptcha will load using the same callback, so the callback function needs
// to be kept around
var _JSLOAD_CALLBACK = _generateCallbackName('rcb');
var NETWORK_TIMEOUT_DELAY = new Delay(30000, 60000);
var RECAPTCHA_BASE = 'https://www.google.com/recaptcha/api.js?';
/**
 * Loader for the GReCaptcha library. There should only ever be one of this.
 */
var ReCaptchaLoaderImpl = /** @class */ (function () {
    function ReCaptchaLoaderImpl() {
        this.hostLanguage = '';
        this.counter = 0;
        this.librarySeparatelyLoaded = !!_window().grecaptcha;
    }
    ReCaptchaLoaderImpl.prototype.load = function (auth, hl) {
        var _this = this;
        if (hl === void 0) { hl = ''; }
        _assert(isHostLanguageValid(hl), auth, "argument-error" /* ARGUMENT_ERROR */);
        if (this.shouldResolveImmediately(hl)) {
            return Promise.resolve(_window().grecaptcha);
        }
        return new Promise(function (resolve, reject) {
            var networkTimeout = _window().setTimeout(function () {
                reject(_createError(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */));
            }, NETWORK_TIMEOUT_DELAY.get());
            _window()[_JSLOAD_CALLBACK] = function () {
                _window().clearTimeout(networkTimeout);
                delete _window()[_JSLOAD_CALLBACK];
                var recaptcha = _window().grecaptcha;
                if (!recaptcha) {
                    reject(_createError(auth, "internal-error" /* INTERNAL_ERROR */));
                    return;
                }
                // Wrap the greptcha render function so that we know if the developer has
                // called it separately
                var render = recaptcha.render;
                recaptcha.render = function (container, params) {
                    var widgetId = render(container, params);
                    _this.counter++;
                    return widgetId;
                };
                _this.hostLanguage = hl;
                resolve(recaptcha);
            };
            var url = RECAPTCHA_BASE + "?" + util.querystring({
                onload: _JSLOAD_CALLBACK,
                render: 'explicit',
                hl: hl
            });
            _loadJS(url).catch(function () {
                clearTimeout(networkTimeout);
                reject(_createError(auth, "internal-error" /* INTERNAL_ERROR */));
            });
        });
    };
    ReCaptchaLoaderImpl.prototype.clearedOneInstance = function () {
        this.counter--;
    };
    ReCaptchaLoaderImpl.prototype.shouldResolveImmediately = function (hl) {
        // We can resolve immediately if:
        //   • grecaptcha is already defined AND (
        //     1. the requested language codes are the same OR
        //     2. there exists already a ReCaptcha on the page
        //     3. the library was already loaded by the app
        // In cases (2) and (3), we _can't_ reload as it would break the recaptchas
        // that are already in the page
        return (!!_window().grecaptcha &&
            (hl === this.hostLanguage ||
                this.counter > 0 ||
                this.librarySeparatelyLoaded));
    };
    return ReCaptchaLoaderImpl;
}());
function isHostLanguageValid(hl) {
    return hl.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(hl);
}
var MockReCaptchaLoaderImpl = /** @class */ (function () {
    function MockReCaptchaLoaderImpl() {
    }
    MockReCaptchaLoaderImpl.prototype.load = function (auth) {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            return tslib$1.__generator(this, function (_a) {
                return [2 /*return*/, new MockReCaptcha(auth)];
            });
        });
    };
    MockReCaptchaLoaderImpl.prototype.clearedOneInstance = function () { };
    return MockReCaptchaLoaderImpl;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var RECAPTCHA_VERIFIER_TYPE = 'recaptcha';
var DEFAULT_PARAMS = {
    theme: 'light',
    type: 'image'
};
/**
 * An {@link https://www.google.com/recaptcha/ | reCAPTCHA}-based application verifier.
 *
 * @public
 */
var RecaptchaVerifier = /** @class */ (function () {
    /**
     *
     * @param containerOrId - The reCAPTCHA container parameter.
     *
     * @remarks
     * This has different meaning depending on whether the reCAPTCHA is hidden or visible. For a
     * visible reCAPTCHA the container must be empty. If a string is used, it has to correspond to
     * an element ID. The corresponding element must also must be in the DOM at the time of
     * initialization.
     *
     * @param parameters - The optional reCAPTCHA parameters.
     *
     * @remarks
     * Check the reCAPTCHA docs for a comprehensive list. All parameters are accepted except for
     * the sitekey. Firebase Auth backend provisions a reCAPTCHA for each project and will
     * configure this upon rendering. For an invisible reCAPTCHA, a size key must have the value
     * 'invisible'.
     *
     * @param authExtern - The corresponding Firebase {@link Auth} instance.
     *
     * @remarks
     * If none is provided, the default Firebase {@link Auth} instance is used. A Firebase {@link Auth} instance
     * must be initialized with an API key, otherwise an error will be thrown.
     */
    function RecaptchaVerifier(containerOrId, parameters, authExtern) {
        if (parameters === void 0) { parameters = tslib$1.__assign({}, DEFAULT_PARAMS); }
        this.parameters = parameters;
        /**
         * The application verifier type.
         *
         * @remarks
         * For a reCAPTCHA verifier, this is 'recaptcha'.
         */
        this.type = RECAPTCHA_VERIFIER_TYPE;
        this.destroyed = false;
        this.widgetId = null;
        this.tokenChangeListeners = new Set();
        this.renderPromise = null;
        this.recaptcha = null;
        this.auth = _castAuth(authExtern);
        this.isInvisible = this.parameters.size === 'invisible';
        _assert(typeof document !== 'undefined', this.auth, "operation-not-supported-in-this-environment" /* OPERATION_NOT_SUPPORTED */);
        var container = typeof containerOrId === 'string'
            ? document.getElementById(containerOrId)
            : containerOrId;
        _assert(container, this.auth, "argument-error" /* ARGUMENT_ERROR */);
        this.container = container;
        this.parameters.callback = this.makeTokenCallback(this.parameters.callback);
        this._recaptchaLoader = this.auth.settings.appVerificationDisabledForTesting
            ? new MockReCaptchaLoaderImpl()
            : new ReCaptchaLoaderImpl();
        this.validateStartingState();
        // TODO: Figure out if sdk version is needed
    }
    /**
     * Waits for the user to solve the reCAPTCHA and resolves with the reCAPTCHA token.
     *
     * @returns A Promise for the reCAPTCHA token.
     */
    RecaptchaVerifier.prototype.verify = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var id, recaptcha, response;
            var _this = this;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assertNotDestroyed();
                        return [4 /*yield*/, this.render()];
                    case 1:
                        id = _a.sent();
                        recaptcha = this.getAssertedRecaptcha();
                        response = recaptcha.getResponse(id);
                        if (response) {
                            return [2 /*return*/, response];
                        }
                        return [2 /*return*/, new Promise(function (resolve) {
                                var tokenChange = function (token) {
                                    if (!token) {
                                        return; // Ignore token expirations.
                                    }
                                    _this.tokenChangeListeners.delete(tokenChange);
                                    resolve(token);
                                };
                                _this.tokenChangeListeners.add(tokenChange);
                                if (_this.isInvisible) {
                                    recaptcha.execute(id);
                                }
                            })];
                }
            });
        });
    };
    /**
     * Renders the reCAPTCHA widget on the page.
     *
     * @returns A Promise that resolves with the reCAPTCHA widget ID.
     */
    RecaptchaVerifier.prototype.render = function () {
        var _this = this;
        try {
            this.assertNotDestroyed();
        }
        catch (e) {
            // This method returns a promise. Since it's not async (we want to return the
            // _same_ promise if rendering is still occurring), the API surface should
            // reject with the error rather than just throw
            return Promise.reject(e);
        }
        if (this.renderPromise) {
            return this.renderPromise;
        }
        this.renderPromise = this.makeRenderPromise().catch(function (e) {
            _this.renderPromise = null;
            throw e;
        });
        return this.renderPromise;
    };
    /** @internal */
    RecaptchaVerifier.prototype._reset = function () {
        this.assertNotDestroyed();
        if (this.widgetId !== null) {
            this.getAssertedRecaptcha().reset(this.widgetId);
        }
    };
    /**
     * Clears the reCAPTCHA widget from the page and destroys the instance.
     */
    RecaptchaVerifier.prototype.clear = function () {
        var _this = this;
        this.assertNotDestroyed();
        this.destroyed = true;
        this._recaptchaLoader.clearedOneInstance();
        if (!this.isInvisible) {
            this.container.childNodes.forEach(function (node) {
                _this.container.removeChild(node);
            });
        }
    };
    RecaptchaVerifier.prototype.validateStartingState = function () {
        _assert(!this.parameters.sitekey, this.auth, "argument-error" /* ARGUMENT_ERROR */);
        _assert(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error" /* ARGUMENT_ERROR */);
        _assert(typeof document !== 'undefined', this.auth, "operation-not-supported-in-this-environment" /* OPERATION_NOT_SUPPORTED */);
    };
    RecaptchaVerifier.prototype.makeTokenCallback = function (existing) {
        var _this = this;
        return function (token) {
            _this.tokenChangeListeners.forEach(function (listener) { return listener(token); });
            if (typeof existing === 'function') {
                existing(token);
            }
            else if (typeof existing === 'string') {
                var globalFunc = _window()[existing];
                if (typeof globalFunc === 'function') {
                    globalFunc(token);
                }
            }
        };
    };
    RecaptchaVerifier.prototype.assertNotDestroyed = function () {
        _assert(!this.destroyed, this.auth, "internal-error" /* INTERNAL_ERROR */);
    };
    RecaptchaVerifier.prototype.makeRenderPromise = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var container, guaranteedEmpty;
            return tslib$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        if (!this.widgetId) {
                            container = this.container;
                            if (!this.isInvisible) {
                                guaranteedEmpty = document.createElement('div');
                                container.appendChild(guaranteedEmpty);
                                container = guaranteedEmpty;
                            }
                            this.widgetId = this.getAssertedRecaptcha().render(container, this.parameters);
                        }
                        return [2 /*return*/, this.widgetId];
                }
            });
        });
    };
    RecaptchaVerifier.prototype.init = function () {
        return tslib$1.__awaiter(this, void 0, void 0, function () {
            var _a, siteKey;
            return tslib$1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _assert(_isHttpOrHttps() && !_isWorker(), this.auth, "internal-error" /* INTERNAL_ERROR */);
                        return [4 /*yield*/, domReady()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this._recaptchaLoader.load(this.auth, this.auth.languageCode || undefined)];
                    case 2:
                        _a.recaptcha = _b.sent();
                        return [4 /*yield*/, getRecaptchaParams(this.auth)];
                    case 3:
                        siteKey = _b.sent();
                        _assert(siteKey, this.auth, "internal-error" /* INTERNAL_ERROR */);
                        this.parameters.sitekey = siteKey;
                        return [2 /*return*/];
                }
            });
        });
    };
    RecaptchaVerifier.prototype.getAssertedRecaptcha = function () {
        _assert(this.recaptcha, this.auth, "internal-error" /* INTERNAL_ERROR */);
        return this.recaptcha;
    };
    return RecaptchaVerifier;
}());
function domReady() {
    var resolver = null;
    return new Promise(function (resolve) {
        if (document.readyState === 'complete') {
            resolve();
            return;
        }
        // Document not ready, wait for load before resolving.
        // Save resolver, so we can remove listener in case it was externally
        // cancelled.
        resolver = function () { return resolve(); };
        window.addEventListener('load', resolver);
    }).catch(function (e) {
        if (resolver) {
            window.removeEventListener('load', resolver);
        }
        throw e;
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ConfirmationResultImpl = /** @class */ (function () {
    function ConfirmationResultImpl(verificationId, onConfirmation) {
        this.verificationId = verificationId;
        this.onConfirmation = onConfirmation;
    }
    ConfirmationResultImpl.prototype.confirm = function (verificationCode) {
        var authCredential = PhoneAuthCredential$1._fromVerification(this.verificationId, verificationCode);
        return this.onConfirmation(authCredential);
    };
    return ConfirmationResultImpl;
}());
/**
 * Asynchronously signs in using a phone number.
 *
 * @remarks
 * This method sends a code via SMS to the given
 * phone number, and returns a {@link ConfirmationResult}. After the user
 * provides the code sent to their phone, call {@link ConfirmationResult.confirm}
 * with the code to sign the user in.
 *
 * For abuse prevention, this method also requires a {@link ApplicationVerifier}.
 * This SDK includes a reCAPTCHA-based implementation, {@link RecaptchaVerifier}.
 * This function can work on other platforms that do not support the
 * {@link RecaptchaVerifier} (like React Native), but you need to use a
 * third-party {@link ApplicationVerifier} implementation.
 *
 * @example
 * ```javascript
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
 * const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
 * // Obtain a verificationCode from the user.
 * const credential = await confirmationResult.confirm(verificationCode);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */
function signInWithPhoneNumber$2(auth, phoneNumber, appVerifier) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var authInternal, verificationId;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authInternal = _castAuth(auth);
                    return [4 /*yield*/, _verifyPhoneNumber(authInternal, phoneNumber, util.getModularInstance(appVerifier))];
                case 1:
                    verificationId = _a.sent();
                    return [2 /*return*/, new ConfirmationResultImpl(verificationId, function (cred) {
                            return signInWithCredential$1(authInternal, cred);
                        })];
            }
        });
    });
}
/**
 * Links the user account with the given phone number.
 *
 * @param user - The user.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */
function linkWithPhoneNumber$2(user, phoneNumber, appVerifier) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal, verificationId;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, _assertLinkedStatus(false, userInternal, "phone" /* PHONE */)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _verifyPhoneNumber(userInternal.auth, phoneNumber, util.getModularInstance(appVerifier))];
                case 2:
                    verificationId = _a.sent();
                    return [2 /*return*/, new ConfirmationResultImpl(verificationId, function (cred) {
                            return linkWithCredential$1(userInternal, cred);
                        })];
            }
        });
    });
}
/**
 * Re-authenticates a user using a fresh phone credential.
 *
 * @remarks Use before operations such as {@link updatePassword} that require tokens from recent sign-in attempts.
 *
 * @param user - The user.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */
function reauthenticateWithPhoneNumber$1(user, phoneNumber, appVerifier) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var userInternal, verificationId;
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInternal = util.getModularInstance(user);
                    return [4 /*yield*/, _verifyPhoneNumber(userInternal.auth, phoneNumber, util.getModularInstance(appVerifier))];
                case 1:
                    verificationId = _a.sent();
                    return [2 /*return*/, new ConfirmationResultImpl(verificationId, function (cred) {
                            return reauthenticateWithCredential$1(userInternal, cred);
                        })];
            }
        });
    });
}
/**
 * Returns a verification ID to be used in conjunction with the SMS code that is sent.
 *
 */
function _verifyPhoneNumber(auth, options, verifier) {
    var _a;
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        var recaptchaToken, phoneInfoOptions, session, response, mfaEnrollmentId, response, sessionInfo;
        return tslib$1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, verifier.verify()];
                case 1:
                    recaptchaToken = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, , 10, 11]);
                    _assert(typeof recaptchaToken === 'string', auth, "argument-error" /* ARGUMENT_ERROR */);
                    _assert(verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error" /* ARGUMENT_ERROR */);
                    phoneInfoOptions = void 0;
                    if (typeof options === 'string') {
                        phoneInfoOptions = {
                            phoneNumber: options
                        };
                    }
                    else {
                        phoneInfoOptions = options;
                    }
                    if (!('session' in phoneInfoOptions)) return [3 /*break*/, 7];
                    session = phoneInfoOptions.session;
                    if (!('phoneNumber' in phoneInfoOptions)) return [3 /*break*/, 4];
                    _assert(session.type === "enroll" /* ENROLL */, auth, "internal-error" /* INTERNAL_ERROR */);
                    return [4 /*yield*/, startEnrollPhoneMfa(auth, {
                            idToken: session.credential,
                            phoneEnrollmentInfo: {
                                phoneNumber: phoneInfoOptions.phoneNumber,
                                recaptchaToken: recaptchaToken
                            }
                        })];
                case 3:
                    response = _b.sent();
                    return [2 /*return*/, response.phoneSessionInfo.sessionInfo];
                case 4:
                    _assert(session.type === "signin" /* SIGN_IN */, auth, "internal-error" /* INTERNAL_ERROR */);
                    mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) ||
                        phoneInfoOptions.multiFactorUid;
                    _assert(mfaEnrollmentId, auth, "missing-multi-factor-info" /* MISSING_MFA_INFO */);
                    return [4 /*yield*/, startSignInPhoneMfa(auth, {
                            mfaPendingCredential: session.credential,
                            mfaEnrollmentId: mfaEnrollmentId,
                            phoneSignInInfo: {
                                recaptchaToken: recaptchaToken
                            }
                        })];
                case 5:
                    response = _b.sent();
                    return [2 /*return*/, response.phoneResponseInfo.sessionInfo];
                case 6: return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, sendPhoneVerificationCode(auth, {
                        phoneNumber: phoneInfoOptions.phoneNumber,
                        recaptchaToken: recaptchaToken
                    })];
                case 8:
                    sessionInfo = (_b.sent()).sessionInfo;
                    return [2 /*return*/, sessionInfo];
                case 9: return [3 /*break*/, 11];
                case 10:
                    verifier._reset();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
/**
 * Updates the user's phone number.
 *
 * @example
 * ```
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
 * const provider = new PhoneAuthProvider(auth);
 * const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
 * // Obtain the verificationCode from the user.
 * const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
 * await updatePhoneNumber(user, phoneCredential);
 * ```
 *
 * @param user - The user.
 * @param credential - A credential authenticating the new phone number.
 *
 * @public
 */
function updatePhoneNumber$1(user, credential) {
    return tslib$1.__awaiter(this, void 0, void 0, function () {
        return tslib$1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _link(util.getModularInstance(user), credential)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for generating an {@link PhoneAuthCredential}.
 *
 * @example
 * ```javascript
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
 * const provider = new PhoneAuthProvider(auth);
 * const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
 * // Obtain the verificationCode from the user.
 * const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
 * const userCredential = await signInWithCredential(auth, phoneCredential);
 * ```
 *
 * @public
 */
var PhoneAuthProvider$1 = /** @class */ (function () {
    /**
     * @param auth - The Firebase {@link Auth} instance in which sign-ins should occur.
     *
     */
    function PhoneAuthProvider(auth) {
        /** Always set to {@link ProviderId}.PHONE. */
        this.providerId = PhoneAuthProvider.PROVIDER_ID;
        this.auth = _castAuth(auth);
    }
    /**
     *
     * Starts a phone number authentication flow by sending a verification code to the given phone
     * number.
     *
     * @example
     * ```javascript
     * const provider = new PhoneAuthProvider(auth);
     * const verificationId = await provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
     * // Obtain verificationCode from the user.
     * const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
     * const userCredential = await signInWithCredential(auth, authCredential);
     * ```
     *
     * @example
     * An alternative flow is provided using the `signInWithPhoneNumber` method.
     * ```javascript
     * const confirmationResult = signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
     * // Obtain verificationCode from the user.
     * const userCredential = confirmationResult.confirm(verificationCode);
     * ```
     *
     * @param phoneInfoOptions - The user's {@link PhoneInfoOptions}. The phone number should be in
     * E.164 format (e.g. +16505550101).
     * @param applicationVerifier - For abuse prevention, this method also requires a
     * {@link ApplicationVerifier}. This SDK includes a reCAPTCHA-based implementation,
     * {@link RecaptchaVerifier}.
     *
     * @returns A Promise for a verification ID that can be passed to
     * {@link PhoneAuthProvider.credential} to identify this flow..
     */
    PhoneAuthProvider.prototype.verifyPhoneNumber = function (phoneOptions, applicationVerifier) {
        return _verifyPhoneNumber(this.auth, phoneOptions, util.getModularInstance(applicationVerifier));
    };
    /**
     * Creates a phone auth credential, given the verification ID from
     * {@link PhoneAuthProvider.verifyPhoneNumber} and the code that was sent to the user's
     * mobile device.
     *
     * @example
     * ```javascript
     * const provider = new PhoneAuthProvider(auth);
     * const verificationId = provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
     * // Obtain verificationCode from the user.
     * const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
     * const userCredential = signInWithCredential(auth, authCredential);
     * ```
     *
     * @example
     * An alternative flow is provided using the `signInWithPhoneNumber` method.
     * ```javascript
     * const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
     * // Obtain verificationCode from the user.
     * const userCredential = await confirmationResult.confirm(verificationCode);
     * ```
     *
     * @param verificationId - The verification ID returned from {@link PhoneAuthProvider.verifyPhoneNumber}.
     * @param verificationCode - The verification code sent to the user's mobile device.
     *
     * @returns The auth provider credential.
     */
    PhoneAuthProvider.credential = function (verificationId, verificationCode) {
        return PhoneAuthCredential$1._fromVerification(verificationId, verificationCode);
    };
    /**
     * Generates an {@link AuthCredential} from a {@link UserCredential}.
     * @param userCredential - The user credential.
     */
    PhoneAuthProvider.credentialFromResult = function (userCredential) {
        var credential = userCredential;
        return PhoneAuthProvider.credentialFromTaggedObject(credential);
    };
    /**
     * Returns an {@link AuthCredential} when passed an error.
     *
     * @remarks
     *
     * This method works for errors like
     * `auth/account-exists-with-different-credentials`. This is useful for
     * recovering when attempting to set a user's phone number but the number
     * in question is already tied to another account. For example, the following
     * code tries to update the current user's phone number, and if that
     * fails, links the user with the account associated with that number:
     *
     * ```js
     * const provider = new PhoneAuthProvider(auth);
     * const verificationId = await provider.verifyPhoneNumber(number, verifier);
     * try {
     *   const code = ''; // Prompt the user for the verification code
     *   await updatePhoneNumber(
     *       auth.currentUser,
     *       PhoneAuthProvider.credential(verificationId, code));
     * } catch (e) {
     *   if (e.code === 'auth/account-exists-with-different-credential') {
     *     const cred = PhoneAuthProvider.credentialFromError(e);
     *     await linkWithCredential(auth.currentUser, cred);
     *   }
     * }
     *
     * // At this point, auth.currentUser.phoneNumber === number.
     * ```
     *
     * @param error - The error to generate a credential from.
     */
    PhoneAuthProvider.credentialFromError = function (error) {
        return PhoneAuthProvider.credentialFromTaggedObject((error.customData || {}));
    };
    PhoneAuthProvider.credentialFromTaggedObject = function (_a) {
        var tokenResponse = _a._tokenResponse;
        if (!tokenResponse) {
            return null;
        }
        var _b = tokenResponse, phoneNumber = _b.phoneNumber, temporaryProof = _b.temporaryProof;
        if (phoneNumber && temporaryProof) {
            return PhoneAuthCredential$1._fromTokenResponse(phoneNumber, temporaryProof);
        }
        return null;
    };
    /** Always set to {@link ProviderId}.PHONE. */
    PhoneAuthProvider.PROVIDER_ID = "phone" /* PHONE */;
    /** Always set to {@link SignInMethod}.PHONE. */
    PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone" /* PHONE */;
    return PhoneAuthProvider;
}());

var MultiFactorAssertionImpl = /** @class */ (function () {
    function MultiFactorAssertionImpl(factorId) {
        this.factorId = factorId;
    }
    MultiFactorAssertionImpl.prototype._process = function (auth, session, displayName) {
        switch (session.type) {
            case "enroll" /* ENROLL */:
                return this._finalizeEnroll(auth, session.credential, displayName);
            case "signin" /* SIGN_IN */:
                return this._finalizeSignIn(auth, session.credential);
            default:
                return debugFail('unexpected MultiFactorSessionType');
        }
    };
    return MultiFactorAssertionImpl;
}());

/**
 * {@inheritdoc PhoneMultiFactorAssertion}
 *
 * @public
 */
var PhoneMultiFactorAssertionImpl = /** @class */ (function (_super) {
    tslib$1.__extends(PhoneMultiFactorAssertionImpl, _super);
    function PhoneMultiFactorAssertionImpl(credential) {
        var _this = _super.call(this, "phone" /* PHONE */) || this;
        _this.credential = credential;
        return _this;
    }
    /** @internal */
    PhoneMultiFactorAssertionImpl._fromCredential = function (credential) {
        return new PhoneMultiFactorAssertionImpl(credential);
    };
    /** @internal */
    PhoneMultiFactorAssertionImpl.prototype._finalizeEnroll = function (auth, idToken, displayName) {
        return finalizeEnrollPhoneMfa(auth, {
            idToken: idToken,
            displayName: displayName,
            phoneVerificationInfo: this.credential._makeVerificationRequest()
        });
    };
    /** @internal */
    PhoneMultiFactorAssertionImpl.prototype._finalizeSignIn = function (auth, mfaPendingCredential) {
        return finalizeSignInPhoneMfa(auth, {
            mfaPendingCredential: mfaPendingCredential,
            phoneVerificationInfo: this.credential._makeVerificationRequest()
        });
    };
    return PhoneMultiFactorAssertionImpl;
}(MultiFactorAssertionImpl));
/**
 * Provider for generating a {@link PhoneMultiFactorAssertion}.
 *
 * @public
 */
var PhoneMultiFactorGenerator$1 = /** @class */ (function () {
    function PhoneMultiFactorGenerator() {
    }
    /**
     * Provides a {@link PhoneMultiFactorAssertion} to confirm ownership of the phone second factor.
     *
     * @param phoneAuthCredential - A credential provided by {@link PhoneAuthProvider.credential}.
     * @returns A {@link PhoneMultiFactorAssertion} which can be used with
     * {@link MultiFactorResolver.resolveSignIn}
     */
    PhoneMultiFactorGenerator.assertion = function (credential) {
        return PhoneMultiFactorAssertionImpl._fromCredential(credential);
    };
    /**
     * The identifier of the phone second factor: `phone`.
     */
    PhoneMultiFactorGenerator.FACTOR_ID = 'phone';
    return PhoneMultiFactorGenerator;
}());

phone31a1067a.AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY = AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY;
phone31a1067a.ActionCodeOperation = ActionCodeOperation$1;
phone31a1067a.ActionCodeURL = ActionCodeURL$1;
phone31a1067a.AuthCredential = AuthCredential$1;
phone31a1067a.AuthImpl = AuthImpl;
phone31a1067a.BaseOAuthProvider = BaseOAuthProvider;
phone31a1067a.Delay = Delay;
phone31a1067a.EmailAuthCredential = EmailAuthCredential$1;
phone31a1067a.EmailAuthProvider = EmailAuthProvider$1;
phone31a1067a.FacebookAuthProvider = FacebookAuthProvider$1;
phone31a1067a.FactorId = FactorId$1;
phone31a1067a.FederatedAuthProvider = FederatedAuthProvider;
phone31a1067a.FetchProvider = FetchProvider;
phone31a1067a.GithubAuthProvider = GithubAuthProvider$1;
phone31a1067a.GoogleAuthProvider = GoogleAuthProvider$1;
phone31a1067a.OAuthCredential = OAuthCredential$1;
phone31a1067a.OAuthProvider = OAuthProvider$1;
phone31a1067a.OperationType = OperationType$1;
phone31a1067a.PhoneAuthCredential = PhoneAuthCredential$1;
phone31a1067a.PhoneAuthProvider = PhoneAuthProvider$1;
phone31a1067a.PhoneMultiFactorGenerator = PhoneMultiFactorGenerator$1;
phone31a1067a.ProviderId = ProviderId$1;
phone31a1067a.RecaptchaVerifier = RecaptchaVerifier;
phone31a1067a.SAMLAuthCredential = SAMLAuthCredential;
phone31a1067a.SAMLAuthProvider = SAMLAuthProvider$1;
phone31a1067a.STORAGE_AVAILABLE_KEY = STORAGE_AVAILABLE_KEY;
phone31a1067a.SignInMethod = SignInMethod$1;
phone31a1067a.TwitterAuthProvider = TwitterAuthProvider$1;
phone31a1067a.UserImpl = UserImpl;
phone31a1067a._assert = _assert;
phone31a1067a._assertInstanceOf = _assertInstanceOf;
phone31a1067a._assertLinkedStatus = _assertLinkedStatus;
phone31a1067a._castAuth = _castAuth;
phone31a1067a._createError = _createError;
phone31a1067a._emulatorUrl = _emulatorUrl;
phone31a1067a._fail = _fail;
phone31a1067a._generateCallbackName = _generateCallbackName;
phone31a1067a._getActiveServiceWorker = _getActiveServiceWorker;
phone31a1067a._getClientVersion = _getClientVersion;
phone31a1067a._getCurrentUrl = _getCurrentUrl;
phone31a1067a._getInstance = _getInstance;
phone31a1067a._getServiceWorkerController = _getServiceWorkerController;
phone31a1067a._getWorkerGlobalScope = _getWorkerGlobalScope;
phone31a1067a._isAndroid = _isAndroid;
phone31a1067a._isChromeIOS = _isChromeIOS;
phone31a1067a._isFirefox = _isFirefox;
phone31a1067a._isIE10 = _isIE10;
phone31a1067a._isIOS = _isIOS;
phone31a1067a._isIOS7Or8 = _isIOS7Or8;
phone31a1067a._isIOSStandalone = _isIOSStandalone;
phone31a1067a._isIframe = _isIframe;
phone31a1067a._isMobileBrowser = _isMobileBrowser;
phone31a1067a._isSafari = _isSafari;
phone31a1067a._isWorker = _isWorker;
phone31a1067a._link = _link;
phone31a1067a._loadJS = _loadJS;
phone31a1067a._performApiRequest = _performApiRequest;
phone31a1067a._persistenceKeyName = _persistenceKeyName;
phone31a1067a._reauthenticate = _reauthenticate;
phone31a1067a._setWindowLocation = _setWindowLocation;
phone31a1067a._signInWithCredential = _signInWithCredential;
phone31a1067a._window = _window;
phone31a1067a.applyActionCode = applyActionCode$2;
phone31a1067a.checkActionCode = checkActionCode$1;
phone31a1067a.confirmPasswordReset = confirmPasswordReset$1;
phone31a1067a.connectAuthEmulator = connectAuthEmulator$1;
phone31a1067a.createUserWithEmailAndPassword = createUserWithEmailAndPassword$1;
phone31a1067a.debugAssert = debugAssert;
phone31a1067a.debugErrorMap = debugErrorMap$1;
phone31a1067a.deleteUser = deleteUser$1;
phone31a1067a.fetchSignInMethodsForEmail = fetchSignInMethodsForEmail$1;
phone31a1067a.getAdditionalUserInfo = getAdditionalUserInfo$1;
phone31a1067a.getIdToken = getIdToken$1;
phone31a1067a.getIdTokenResult = getIdTokenResult$1;
phone31a1067a.getMultiFactorResolver = getMultiFactorResolver$1;
phone31a1067a.inMemoryPersistence = inMemoryPersistence$1;
phone31a1067a.initializeAuth = initializeAuth$1;
phone31a1067a.isSignInWithEmailLink = isSignInWithEmailLink$1;
phone31a1067a.linkWithCredential = linkWithCredential$1;
phone31a1067a.linkWithPhoneNumber = linkWithPhoneNumber$2;
phone31a1067a.multiFactor = multiFactor$1;
phone31a1067a.onAuthStateChanged = onAuthStateChanged$1;
phone31a1067a.onIdTokenChanged = onIdTokenChanged$1;
phone31a1067a.parseActionCodeURL = parseActionCodeURL$1;
phone31a1067a.prodErrorMap = prodErrorMap$1;
phone31a1067a.reauthenticateWithCredential = reauthenticateWithCredential$1;
phone31a1067a.reauthenticateWithPhoneNumber = reauthenticateWithPhoneNumber$1;
phone31a1067a.registerAuth = registerAuth;
phone31a1067a.reload = reload$1;
phone31a1067a.sendEmailVerification = sendEmailVerification$2;
phone31a1067a.sendPasswordResetEmail = sendPasswordResetEmail$2;
phone31a1067a.sendSignInLinkToEmail = sendSignInLinkToEmail$2;
phone31a1067a.setPersistence = setPersistence$1;
phone31a1067a.signInAnonymously = signInAnonymously$1;
phone31a1067a.signInWithCredential = signInWithCredential$1;
phone31a1067a.signInWithCustomToken = signInWithCustomToken$2;
phone31a1067a.signInWithEmailAndPassword = signInWithEmailAndPassword$1;
phone31a1067a.signInWithEmailLink = signInWithEmailLink$2;
phone31a1067a.signInWithIdp = signInWithIdp;
phone31a1067a.signInWithPhoneNumber = signInWithPhoneNumber$2;
phone31a1067a.signOut = signOut$1;
phone31a1067a.unlink = unlink$1;
phone31a1067a.updateCurrentUser = updateCurrentUser$1;
phone31a1067a.updateEmail = updateEmail$1;
phone31a1067a.updatePassword = updatePassword$1;
phone31a1067a.updatePhoneNumber = updatePhoneNumber$1;
phone31a1067a.updateProfile = updateProfile$2;
phone31a1067a.useDeviceLanguage = useDeviceLanguage$1;
phone31a1067a.verifyBeforeUpdateEmail = verifyBeforeUpdateEmail$1;
phone31a1067a.verifyPasswordResetCode = verifyPasswordResetCode$1;

Object.defineProperty(rn, '__esModule', { value: true });

var ReactNative = require$$0;
var app = require$$2;
var phone = phone31a1067a;
var tslib = require$$3;




function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var ReactNative__namespace = /*#__PURE__*/_interopNamespace(ReactNative);

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a persistence object that wraps `AsyncStorage` imported from
 * `react-native` or `@react-native-community/async-storage`, and can
 * be used in the persistence dependency field in {@link initializeAuth}.
 *
 * @public
 */
function getReactNativePersistence(storage) {
    var _a;
    // In the _getInstance() implementation (see src/core/persistence/index.ts),
    // we expect each "externs.Persistence" object passed to us by the user to
    // be able to be instantiated (as a class) using "new". That function also
    // expects the constructor to be empty. Since ReactNativeStorage requires the
    // underlying storage layer, we need to be able to create subclasses
    // (closures, esentially) that have the storage layer but empty constructor.
    return _a = /** @class */ (function () {
            function class_1() {
                this.type = "LOCAL" /* LOCAL */;
            }
            class_1.prototype._isAvailable = function () {
                return tslib.__awaiter(this, void 0, void 0, function () {
                    return tslib.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                if (!storage) {
                                    return [2 /*return*/, false];
                                }
                                return [4 /*yield*/, storage.setItem(phone.STORAGE_AVAILABLE_KEY, '1')];
                            case 1:
                                _b.sent();
                                return [4 /*yield*/, storage.removeItem(phone.STORAGE_AVAILABLE_KEY)];
                            case 2:
                                _b.sent();
                                return [2 /*return*/, true];
                            case 3:
                                _b.sent();
                                return [2 /*return*/, false];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
            class_1.prototype._set = function (key, value) {
                return storage.setItem(key, JSON.stringify(value));
            };
            class_1.prototype._get = function (key) {
                return tslib.__awaiter(this, void 0, void 0, function () {
                    var json;
                    return tslib.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, storage.getItem(key)];
                            case 1:
                                json = _a.sent();
                                return [2 /*return*/, json ? JSON.parse(json) : null];
                        }
                    });
                });
            };
            class_1.prototype._remove = function (key) {
                return storage.removeItem(key);
            };
            class_1.prototype._addListener = function (_key, _listener) {
                // Listeners are not supported for React Native storage.
                return;
            };
            class_1.prototype._removeListener = function (_key, _listener) {
                // Listeners are not supported for React Native storage.
                return;
            };
            return class_1;
        }()),
        _a.type = 'LOCAL',
        _a;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An implementation of {@link Persistence} of type 'LOCAL' for use in React
 * Native environments.
 *
 * @public
 */
var reactNativeLocalPersistence = getReactNativePersistence({
    getItem: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Called inline to avoid deprecation warnings on startup.
        return (_a = ReactNative__namespace.AsyncStorage).getItem.apply(_a, args);
    },
    setItem: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Called inline to avoid deprecation warnings on startup.
        return (_a = ReactNative__namespace.AsyncStorage).setItem.apply(_a, args);
    },
    removeItem: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Called inline to avoid deprecation warnings on startup.
        return (_a = ReactNative__namespace.AsyncStorage).removeItem.apply(_a, args);
    },
});
function getAuth(app$1) {
    if (app$1 === void 0) { app$1 = app.getApp(); }
    var provider = app._getProvider(app$1, 'auth');
    if (provider.isInitialized()) {
        return provider.getImmediate();
    }
    return phone.initializeAuth(app$1, {
        persistence: reactNativeLocalPersistence
    });
}
phone.registerAuth("ReactNative" /* REACT_NATIVE */);

var ActionCodeOperation = rn.ActionCodeOperation = phone.ActionCodeOperation;
var ActionCodeURL = rn.ActionCodeURL = phone.ActionCodeURL;
var AuthCredential = rn.AuthCredential = phone.AuthCredential;
var AuthErrorCodes = rn.AuthErrorCodes = phone.AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY;
var EmailAuthCredential = rn.EmailAuthCredential = phone.EmailAuthCredential;
var EmailAuthProvider = rn.EmailAuthProvider = phone.EmailAuthProvider;
var FacebookAuthProvider = rn.FacebookAuthProvider = phone.FacebookAuthProvider;
var FactorId = rn.FactorId = phone.FactorId;
var GithubAuthProvider = rn.GithubAuthProvider = phone.GithubAuthProvider;
var GoogleAuthProvider = rn.GoogleAuthProvider = phone.GoogleAuthProvider;
var OAuthCredential = rn.OAuthCredential = phone.OAuthCredential;
var OAuthProvider = rn.OAuthProvider = phone.OAuthProvider;
var OperationType = rn.OperationType = phone.OperationType;
var PhoneAuthCredential = rn.PhoneAuthCredential = phone.PhoneAuthCredential;
var PhoneAuthProvider = rn.PhoneAuthProvider = phone.PhoneAuthProvider;
var PhoneMultiFactorGenerator = rn.PhoneMultiFactorGenerator = phone.PhoneMultiFactorGenerator;
var ProviderId = rn.ProviderId = phone.ProviderId;
var SAMLAuthProvider = rn.SAMLAuthProvider = phone.SAMLAuthProvider;
var SignInMethod = rn.SignInMethod = phone.SignInMethod;
var TwitterAuthProvider = rn.TwitterAuthProvider = phone.TwitterAuthProvider;
var applyActionCode = rn.applyActionCode = phone.applyActionCode;
var checkActionCode = rn.checkActionCode = phone.checkActionCode;
var confirmPasswordReset = rn.confirmPasswordReset = phone.confirmPasswordReset;
var connectAuthEmulator = rn.connectAuthEmulator = phone.connectAuthEmulator;
var createUserWithEmailAndPassword = rn.createUserWithEmailAndPassword = phone.createUserWithEmailAndPassword;
var debugErrorMap = rn.debugErrorMap = phone.debugErrorMap;
var deleteUser = rn.deleteUser = phone.deleteUser;
var fetchSignInMethodsForEmail = rn.fetchSignInMethodsForEmail = phone.fetchSignInMethodsForEmail;
var getAdditionalUserInfo = rn.getAdditionalUserInfo = phone.getAdditionalUserInfo;
var getIdToken = rn.getIdToken = phone.getIdToken;
var getIdTokenResult = rn.getIdTokenResult = phone.getIdTokenResult;
var getMultiFactorResolver = rn.getMultiFactorResolver = phone.getMultiFactorResolver;
var inMemoryPersistence = rn.inMemoryPersistence = phone.inMemoryPersistence;
var initializeAuth = rn.initializeAuth = phone.initializeAuth;
var isSignInWithEmailLink = rn.isSignInWithEmailLink = phone.isSignInWithEmailLink;
var linkWithCredential = rn.linkWithCredential = phone.linkWithCredential;
var linkWithPhoneNumber = rn.linkWithPhoneNumber = phone.linkWithPhoneNumber;
var multiFactor = rn.multiFactor = phone.multiFactor;
var onAuthStateChanged = rn.onAuthStateChanged = phone.onAuthStateChanged;
var onIdTokenChanged = rn.onIdTokenChanged = phone.onIdTokenChanged;
var parseActionCodeURL = rn.parseActionCodeURL = phone.parseActionCodeURL;
var prodErrorMap = rn.prodErrorMap = phone.prodErrorMap;
var reauthenticateWithCredential = rn.reauthenticateWithCredential = phone.reauthenticateWithCredential;
var reauthenticateWithPhoneNumber = rn.reauthenticateWithPhoneNumber = phone.reauthenticateWithPhoneNumber;
var reload = rn.reload = phone.reload;
var sendEmailVerification = rn.sendEmailVerification = phone.sendEmailVerification;
var sendPasswordResetEmail = rn.sendPasswordResetEmail = phone.sendPasswordResetEmail;
var sendSignInLinkToEmail = rn.sendSignInLinkToEmail = phone.sendSignInLinkToEmail;
var setPersistence = rn.setPersistence = phone.setPersistence;
var signInAnonymously = rn.signInAnonymously = phone.signInAnonymously;
var signInWithCredential = rn.signInWithCredential = phone.signInWithCredential;
var signInWithCustomToken = rn.signInWithCustomToken = phone.signInWithCustomToken;
var signInWithEmailAndPassword = rn.signInWithEmailAndPassword = phone.signInWithEmailAndPassword;
var signInWithEmailLink = rn.signInWithEmailLink = phone.signInWithEmailLink;
var signInWithPhoneNumber = rn.signInWithPhoneNumber = phone.signInWithPhoneNumber;
var signOut = rn.signOut = phone.signOut;
var unlink = rn.unlink = phone.unlink;
var updateCurrentUser = rn.updateCurrentUser = phone.updateCurrentUser;
var updateEmail = rn.updateEmail = phone.updateEmail;
var updatePassword = rn.updatePassword = phone.updatePassword;
var updatePhoneNumber = rn.updatePhoneNumber = phone.updatePhoneNumber;
var updateProfile = rn.updateProfile = phone.updateProfile;
var useDeviceLanguage = rn.useDeviceLanguage = phone.useDeviceLanguage;
var verifyBeforeUpdateEmail = rn.verifyBeforeUpdateEmail = phone.verifyBeforeUpdateEmail;
var verifyPasswordResetCode = rn.verifyPasswordResetCode = phone.verifyPasswordResetCode;
var getAuth_1 = rn.getAuth = getAuth;
var getReactNativePersistence_1 = rn.getReactNativePersistence = getReactNativePersistence;
var reactNativeLocalPersistence_1 = rn.reactNativeLocalPersistence = reactNativeLocalPersistence;

export { ActionCodeOperation, ActionCodeURL, AuthCredential, AuthErrorCodes, EmailAuthCredential, EmailAuthProvider, FacebookAuthProvider, FactorId, GithubAuthProvider, GoogleAuthProvider, OAuthCredential, OAuthProvider, OperationType, PhoneAuthCredential, PhoneAuthProvider, PhoneMultiFactorGenerator, ProviderId, SAMLAuthProvider, SignInMethod, TwitterAuthProvider, rn as __moduleExports, applyActionCode, checkActionCode, confirmPasswordReset, connectAuthEmulator, createUserWithEmailAndPassword, debugErrorMap, deleteUser, fetchSignInMethodsForEmail, getAdditionalUserInfo, getAuth_1 as getAuth, getIdToken, getIdTokenResult, getMultiFactorResolver, getReactNativePersistence_1 as getReactNativePersistence, inMemoryPersistence, initializeAuth, isSignInWithEmailLink, linkWithCredential, linkWithPhoneNumber, multiFactor, onAuthStateChanged, onIdTokenChanged, parseActionCodeURL, prodErrorMap, reactNativeLocalPersistence_1 as reactNativeLocalPersistence, reauthenticateWithCredential, reauthenticateWithPhoneNumber, reload, sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, setPersistence, signInAnonymously, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, signInWithEmailLink, signInWithPhoneNumber, signOut, unlink, updateCurrentUser, updateEmail, updatePassword, updatePhoneNumber, updateProfile, useDeviceLanguage, verifyBeforeUpdateEmail, verifyPasswordResetCode };

//# sourceMappingURL=firebase-auth-react-native.js.map
