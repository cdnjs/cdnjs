var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _block, _blocks, _bytes, _finalized, _first, _h0, _h1, _h2, _h3, _h4, _h5, _h6, _h7, _hashed, _hBytes, _is224, _lastByteIndex, _start, _inner, _is224_1, _oKeyPad, _sharedMemory;
const BKDRHash = function (str) {
    var seed = 131;
    var seed2 = 137;
    var hash = 0;
    str += 'x';
    var MAX_SAFE_INTEGER = Math.floor(9007199254740991 / seed2);
    for (let i = 0; i < str.length; i++) {
        if (hash > MAX_SAFE_INTEGER) {
            hash = Math.floor(hash / seed2);
        }
        hash = hash * seed + str.charCodeAt(i);
    }
    return hash;
};
const HEX_CHARS = "0123456789abcdef".split("");
const EXTRA = [
    -2147483648,
    8388608,
    32768,
    128
];
const SHIFT = [
    24,
    16,
    8,
    0
];
const K = [
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
    3329325298,
];
const blocks = [];
class Sha256 {
    constructor(is2241 = false, sharedMemory1 = false) {
        _block.set(this, void 0);
        _blocks.set(this, void 0);
        _bytes.set(this, void 0);
        _finalized.set(this, void 0);
        _first.set(this, void 0);
        _h0.set(this, void 0);
        _h1.set(this, void 0);
        _h2.set(this, void 0);
        _h3.set(this, void 0);
        _h4.set(this, void 0);
        _h5.set(this, void 0);
        _h6.set(this, void 0);
        _h7.set(this, void 0);
        _hashed.set(this, void 0);
        _hBytes.set(this, void 0);
        _is224.set(this, void 0);
        _lastByteIndex.set(this, 0);
        _start.set(this, void 0);
        this.init(is2241, sharedMemory1);
    }
    init(is224, sharedMemory) {
        if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            __classPrivateFieldSet(this, _blocks, blocks);
        }
        else {
            __classPrivateFieldSet(this, _blocks, [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]);
        }
        if (is224) {
            __classPrivateFieldSet(this, _h0, 3238371032);
            __classPrivateFieldSet(this, _h1, 914150663);
            __classPrivateFieldSet(this, _h2, 812702999);
            __classPrivateFieldSet(this, _h3, 4144912697);
            __classPrivateFieldSet(this, _h4, 4290775857);
            __classPrivateFieldSet(this, _h5, 1750603025);
            __classPrivateFieldSet(this, _h6, 1694076839);
            __classPrivateFieldSet(this, _h7, 3204075428);
        }
        else {
            __classPrivateFieldSet(this, _h0, 1779033703);
            __classPrivateFieldSet(this, _h1, 3144134277);
            __classPrivateFieldSet(this, _h2, 1013904242);
            __classPrivateFieldSet(this, _h3, 2773480762);
            __classPrivateFieldSet(this, _h4, 1359893119);
            __classPrivateFieldSet(this, _h5, 2600822924);
            __classPrivateFieldSet(this, _h6, 528734635);
            __classPrivateFieldSet(this, _h7, 1541459225);
        }
        __classPrivateFieldSet(this, _block, __classPrivateFieldSet(this, _start, __classPrivateFieldSet(this, _bytes, __classPrivateFieldSet(this, _hBytes, 0))));
        __classPrivateFieldSet(this, _finalized, __classPrivateFieldSet(this, _hashed, false));
        __classPrivateFieldSet(this, _first, true);
        __classPrivateFieldSet(this, _is224, is224);
    }
    update(message) {
        if (__classPrivateFieldGet(this, _finalized)) {
            return this;
        }
        let msg;
        if (message instanceof ArrayBuffer) {
            msg = new Uint8Array(message);
        }
        else {
            msg = message;
        }
        let index = 0;
        const length = msg.length;
        const blocks1 = __classPrivateFieldGet(this, _blocks);
        while (index < length) {
            let i;
            if (__classPrivateFieldGet(this, _hashed)) {
                __classPrivateFieldSet(this, _hashed, false);
                blocks1[0] = __classPrivateFieldGet(this, _block);
                blocks1[16] = blocks1[1] = blocks1[2] = blocks1[3] = blocks1[4] = blocks1[5] = blocks1[6] = blocks1[7] = blocks1[8] = blocks1[9] = blocks1[10] = blocks1[11] = blocks1[12] = blocks1[13] = blocks1[14] = blocks1[15] = 0;
            }
            if (typeof msg !== "string") {
                for (i = __classPrivateFieldGet(this, _start); index < length && i < 64; ++index) {
                    blocks1[i >> 2] |= msg[index] << SHIFT[(i++) & 3];
                }
            }
            else {
                for (i = __classPrivateFieldGet(this, _start); index < length && i < 64; ++index) {
                    let code = msg.charCodeAt(index);
                    if (code < 128) {
                        blocks1[i >> 2] |= code << SHIFT[(i++) & 3];
                    }
                    else if (code < 2048) {
                        blocks1[i >> 2] |= (192 | code >> 6) << SHIFT[(i++) & 3];
                        blocks1[i >> 2] |= (128 | code & 63) << SHIFT[(i++) & 3];
                    }
                    else if (code < 55296 || code >= 57344) {
                        blocks1[i >> 2] |= (224 | code >> 12) << SHIFT[(i++) & 3];
                        blocks1[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[(i++) & 3];
                        blocks1[i >> 2] |= (128 | code & 63) << SHIFT[(i++) & 3];
                    }
                    else {
                        code = 65536 + ((code & 1023) << 10 | msg.charCodeAt(++index) & 1023);
                        blocks1[i >> 2] |= (240 | code >> 18) << SHIFT[(i++) & 3];
                        blocks1[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[(i++) & 3];
                        blocks1[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[(i++) & 3];
                        blocks1[i >> 2] |= (128 | code & 63) << SHIFT[(i++) & 3];
                    }
                }
            }
            __classPrivateFieldSet(this, _lastByteIndex, i);
            __classPrivateFieldSet(this, _bytes, __classPrivateFieldGet(this, _bytes) + (i - __classPrivateFieldGet(this, _start)));
            if (i >= 64) {
                __classPrivateFieldSet(this, _block, blocks1[16]);
                __classPrivateFieldSet(this, _start, i - 64);
                this.hash();
                __classPrivateFieldSet(this, _hashed, true);
            }
            else {
                __classPrivateFieldSet(this, _start, i);
            }
        }
        if (__classPrivateFieldGet(this, _bytes) > 4294967295) {
            __classPrivateFieldSet(this, _hBytes, __classPrivateFieldGet(this, _hBytes) + (__classPrivateFieldGet(this, _bytes) / 4294967296 << 0));
            __classPrivateFieldSet(this, _bytes, __classPrivateFieldGet(this, _bytes) % 4294967296);
        }
        return this;
    }
    finalize() {
        if (__classPrivateFieldGet(this, _finalized)) {
            return;
        }
        __classPrivateFieldSet(this, _finalized, true);
        const blocks1 = __classPrivateFieldGet(this, _blocks);
        const i = __classPrivateFieldGet(this, _lastByteIndex);
        blocks1[16] = __classPrivateFieldGet(this, _block);
        blocks1[i >> 2] |= EXTRA[i & 3];
        __classPrivateFieldSet(this, _block, blocks1[16]);
        if (i >= 56) {
            if (!__classPrivateFieldGet(this, _hashed)) {
                this.hash();
            }
            blocks1[0] = __classPrivateFieldGet(this, _block);
            blocks1[16] = blocks1[1] = blocks1[2] = blocks1[3] = blocks1[4] = blocks1[5] = blocks1[6] = blocks1[7] = blocks1[8] = blocks1[9] = blocks1[10] = blocks1[11] = blocks1[12] = blocks1[13] = blocks1[14] = blocks1[15] = 0;
        }
        blocks1[14] = __classPrivateFieldGet(this, _hBytes) << 3 | __classPrivateFieldGet(this, _bytes) >>> 29;
        blocks1[15] = __classPrivateFieldGet(this, _bytes) << 3;
        this.hash();
    }
    hash() {
        let a = __classPrivateFieldGet(this, _h0);
        let b = __classPrivateFieldGet(this, _h1);
        let c = __classPrivateFieldGet(this, _h2);
        let d = __classPrivateFieldGet(this, _h3);
        let e = __classPrivateFieldGet(this, _h4);
        let f = __classPrivateFieldGet(this, _h5);
        let g = __classPrivateFieldGet(this, _h6);
        let h = __classPrivateFieldGet(this, _h7);
        const blocks1 = __classPrivateFieldGet(this, _blocks);
        let s0;
        let s1;
        let maj;
        let t1;
        let t2;
        let ch;
        let ab;
        let da;
        let cd;
        let bc;
        for (let j = 16; j < 64; ++j) {
            t1 = blocks1[j - 15];
            s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
            t1 = blocks1[j - 2];
            s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
            blocks1[j] = blocks1[j - 16] + s0 + blocks1[j - 7] + s1 << 0;
        }
        bc = b & c;
        for (let j1 = 0; j1 < 64; j1 += 4) {
            if (__classPrivateFieldGet(this, _first)) {
                if (__classPrivateFieldGet(this, _is224)) {
                    ab = 300032;
                    t1 = blocks1[0] - 1413257819;
                    h = t1 - 150054599 << 0;
                    d = t1 + 24177077 << 0;
                }
                else {
                    ab = 704751109;
                    t1 = blocks1[0] - 210244248;
                    h = t1 - 1521486534 << 0;
                    d = t1 + 143694565 << 0;
                }
                __classPrivateFieldSet(this, _first, false);
            }
            else {
                s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
                s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
                ab = a & b;
                maj = ab ^ a & c ^ bc;
                ch = e & f ^ ~e & g;
                t1 = h + s1 + ch + K[j1] + blocks1[j1];
                t2 = s0 + maj;
                h = d + t1 << 0;
                d = t1 + t2 << 0;
            }
            s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
            s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
            da = d & a;
            maj = da ^ d & b ^ ab;
            ch = h & e ^ ~h & f;
            t1 = g + s1 + ch + K[j1 + 1] + blocks1[j1 + 1];
            t2 = s0 + maj;
            g = c + t1 << 0;
            c = t1 + t2 << 0;
            s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
            s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
            cd = c & d;
            maj = cd ^ c & a ^ da;
            ch = g & h ^ ~g & e;
            t1 = f + s1 + ch + K[j1 + 2] + blocks1[j1 + 2];
            t2 = s0 + maj;
            f = b + t1 << 0;
            b = t1 + t2 << 0;
            s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
            s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
            bc = b & c;
            maj = bc ^ b & d ^ cd;
            ch = f & g ^ ~f & h;
            t1 = e + s1 + ch + K[j1 + 3] + blocks1[j1 + 3];
            t2 = s0 + maj;
            e = a + t1 << 0;
            a = t1 + t2 << 0;
        }
        __classPrivateFieldSet(this, _h0, __classPrivateFieldGet(this, _h0) + a << 0);
        __classPrivateFieldSet(this, _h1, __classPrivateFieldGet(this, _h1) + b << 0);
        __classPrivateFieldSet(this, _h2, __classPrivateFieldGet(this, _h2) + c << 0);
        __classPrivateFieldSet(this, _h3, __classPrivateFieldGet(this, _h3) + d << 0);
        __classPrivateFieldSet(this, _h4, __classPrivateFieldGet(this, _h4) + e << 0);
        __classPrivateFieldSet(this, _h5, __classPrivateFieldGet(this, _h5) + f << 0);
        __classPrivateFieldSet(this, _h6, __classPrivateFieldGet(this, _h6) + g << 0);
        __classPrivateFieldSet(this, _h7, __classPrivateFieldGet(this, _h7) + h << 0);
    }
    hex() {
        this.finalize();
        const h0 = __classPrivateFieldGet(this, _h0);
        const h1 = __classPrivateFieldGet(this, _h1);
        const h2 = __classPrivateFieldGet(this, _h2);
        const h3 = __classPrivateFieldGet(this, _h3);
        const h4 = __classPrivateFieldGet(this, _h4);
        const h5 = __classPrivateFieldGet(this, _h5);
        const h6 = __classPrivateFieldGet(this, _h6);
        const h7 = __classPrivateFieldGet(this, _h7);
        let hex = HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >> 28 & 15] + HEX_CHARS[h4 >> 24 & 15] + HEX_CHARS[h4 >> 20 & 15] + HEX_CHARS[h4 >> 16 & 15] + HEX_CHARS[h4 >> 12 & 15] + HEX_CHARS[h4 >> 8 & 15] + HEX_CHARS[h4 >> 4 & 15] + HEX_CHARS[h4 & 15] + HEX_CHARS[h5 >> 28 & 15] + HEX_CHARS[h5 >> 24 & 15] + HEX_CHARS[h5 >> 20 & 15] + HEX_CHARS[h5 >> 16 & 15] + HEX_CHARS[h5 >> 12 & 15] + HEX_CHARS[h5 >> 8 & 15] + HEX_CHARS[h5 >> 4 & 15] + HEX_CHARS[h5 & 15] + HEX_CHARS[h6 >> 28 & 15] + HEX_CHARS[h6 >> 24 & 15] + HEX_CHARS[h6 >> 20 & 15] + HEX_CHARS[h6 >> 16 & 15] + HEX_CHARS[h6 >> 12 & 15] + HEX_CHARS[h6 >> 8 & 15] + HEX_CHARS[h6 >> 4 & 15] + HEX_CHARS[h6 & 15];
        if (!__classPrivateFieldGet(this, _is224)) {
            hex += HEX_CHARS[h7 >> 28 & 15] + HEX_CHARS[h7 >> 24 & 15] + HEX_CHARS[h7 >> 20 & 15] + HEX_CHARS[h7 >> 16 & 15] + HEX_CHARS[h7 >> 12 & 15] + HEX_CHARS[h7 >> 8 & 15] + HEX_CHARS[h7 >> 4 & 15] + HEX_CHARS[h7 & 15];
        }
        return hex;
    }
    toString() {
        return this.hex();
    }
    digest() {
        this.finalize();
        const h0 = __classPrivateFieldGet(this, _h0);
        const h1 = __classPrivateFieldGet(this, _h1);
        const h2 = __classPrivateFieldGet(this, _h2);
        const h3 = __classPrivateFieldGet(this, _h3);
        const h4 = __classPrivateFieldGet(this, _h4);
        const h5 = __classPrivateFieldGet(this, _h5);
        const h6 = __classPrivateFieldGet(this, _h6);
        const h7 = __classPrivateFieldGet(this, _h7);
        const arr = [
            h0 >> 24 & 255,
            h0 >> 16 & 255,
            h0 >> 8 & 255,
            h0 & 255,
            h1 >> 24 & 255,
            h1 >> 16 & 255,
            h1 >> 8 & 255,
            h1 & 255,
            h2 >> 24 & 255,
            h2 >> 16 & 255,
            h2 >> 8 & 255,
            h2 & 255,
            h3 >> 24 & 255,
            h3 >> 16 & 255,
            h3 >> 8 & 255,
            h3 & 255,
            h4 >> 24 & 255,
            h4 >> 16 & 255,
            h4 >> 8 & 255,
            h4 & 255,
            h5 >> 24 & 255,
            h5 >> 16 & 255,
            h5 >> 8 & 255,
            h5 & 255,
            h6 >> 24 & 255,
            h6 >> 16 & 255,
            h6 >> 8 & 255,
            h6 & 255,
        ];
        if (!__classPrivateFieldGet(this, _is224)) {
            arr.push(h7 >> 24 & 255, h7 >> 16 & 255, h7 >> 8 & 255, h7 & 255);
        }
        return arr;
    }
    array() {
        return this.digest();
    }
    arrayBuffer() {
        this.finalize();
        const buffer = new ArrayBuffer(__classPrivateFieldGet(this, _is224) ? 28 : 32);
        const dataView = new DataView(buffer);
        dataView.setUint32(0, __classPrivateFieldGet(this, _h0));
        dataView.setUint32(4, __classPrivateFieldGet(this, _h1));
        dataView.setUint32(8, __classPrivateFieldGet(this, _h2));
        dataView.setUint32(12, __classPrivateFieldGet(this, _h3));
        dataView.setUint32(16, __classPrivateFieldGet(this, _h4));
        dataView.setUint32(20, __classPrivateFieldGet(this, _h5));
        dataView.setUint32(24, __classPrivateFieldGet(this, _h6));
        if (!__classPrivateFieldGet(this, _is224)) {
            dataView.setUint32(28, __classPrivateFieldGet(this, _h7));
        }
        return buffer;
    }
}
_block = new WeakMap(), _blocks = new WeakMap(), _bytes = new WeakMap(), _finalized = new WeakMap(), _first = new WeakMap(), _h0 = new WeakMap(), _h1 = new WeakMap(), _h2 = new WeakMap(), _h3 = new WeakMap(), _h4 = new WeakMap(), _h5 = new WeakMap(), _h6 = new WeakMap(), _h7 = new WeakMap(), _hashed = new WeakMap(), _hBytes = new WeakMap(), _is224 = new WeakMap(), _lastByteIndex = new WeakMap(), _start = new WeakMap();
class HmacSha256 extends Sha256 {
    constructor(secretKey, is2242 = false, sharedMemory2 = false) {
        super(is2242, sharedMemory2);
        _inner.set(this, void 0);
        _is224_1.set(this, void 0);
        _oKeyPad.set(this, void 0);
        _sharedMemory.set(this, void 0);
        let key;
        if (typeof secretKey === "string") {
            const bytes = [];
            const length = secretKey.length;
            let index = 0;
            for (let i = 0; i < length; ++i) {
                let code = secretKey.charCodeAt(i);
                if (code < 128) {
                    bytes[index++] = code;
                }
                else if (code < 2048) {
                    bytes[index++] = 192 | code >> 6;
                    bytes[index++] = 128 | code & 63;
                }
                else if (code < 55296 || code >= 57344) {
                    bytes[index++] = 224 | code >> 12;
                    bytes[index++] = 128 | code >> 6 & 63;
                    bytes[index++] = 128 | code & 63;
                }
                else {
                    code = 65536 + ((code & 1023) << 10 | secretKey.charCodeAt(++i) & 1023);
                    bytes[index++] = 240 | code >> 18;
                    bytes[index++] = 128 | code >> 12 & 63;
                    bytes[index++] = 128 | code >> 6 & 63;
                    bytes[index++] = 128 | code & 63;
                }
            }
            key = bytes;
        }
        else {
            if (secretKey instanceof ArrayBuffer) {
                key = new Uint8Array(secretKey);
            }
            else {
                key = secretKey;
            }
        }
        if (key.length > 64) {
            key = new Sha256(is2242, true).update(key).array();
        }
        const oKeyPad = [];
        const iKeyPad = [];
        for (let i = 0; i < 64; ++i) {
            const b = key[i] || 0;
            oKeyPad[i] = 92 ^ b;
            iKeyPad[i] = 54 ^ b;
        }
        this.update(iKeyPad);
        __classPrivateFieldSet(this, _oKeyPad, oKeyPad);
        __classPrivateFieldSet(this, _inner, true);
        __classPrivateFieldSet(this, _is224_1, is2242);
        __classPrivateFieldSet(this, _sharedMemory, sharedMemory2);
    }
    finalize() {
        super.finalize();
        if (__classPrivateFieldGet(this, _inner)) {
            __classPrivateFieldSet(this, _inner, false);
            const innerHash = this.array();
            super.init(__classPrivateFieldGet(this, _is224_1), __classPrivateFieldGet(this, _sharedMemory));
            this.update(__classPrivateFieldGet(this, _oKeyPad));
            this.update(innerHash);
            super.finalize();
        }
    }
}
_inner = new WeakMap(), _is224_1 = new WeakMap(), _oKeyPad = new WeakMap(), _sharedMemory = new WeakMap();
function Sha256ToInt(s) {
    const sha256 = new Sha256();
    sha256.update(s);
    return parseInt(sha256.hex().substring(0, 8), 16);
}
const RGB2HEX = function (RGBArray) {
    var hex = '#';
    RGBArray.forEach(function (value) {
        if (value < 16) {
            hex += 0;
        }
        hex += value.toString(16);
    });
    return hex;
};
const HSL2RGB = function (H, S, L) {
    H /= 360;
    var q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    var p = 2 * L - q;
    return [
        H + 1 / 3,
        H,
        H - 1 / 3
    ].map(function (color) {
        if (color < 0) {
            color++;
        }
        if (color > 1) {
            color--;
        }
        if (color < 1 / 6) {
            color = p + (q - p) * 6 * color;
        }
        else if (color < 0.5) {
            color = q;
        }
        else if (color < 2 / 3) {
            color = p + (q - p) * 6 * (2 / 3 - color);
        }
        else {
            color = p;
        }
        return Math.round(color * 255);
    });
};
class ColorHash {
    constructor(options = {}) {
        const [L, S] = [
            options.lightness,
            options.saturation
        ].map(function (param) {
            param = param !== undefined ? param : [
                0.35,
                0.5,
                0.65
            ];
            return Array.isArray(param) ? param.concat() : [
                param
            ];
        });
        this.L = L;
        this.S = S;
        if (typeof options.hue === 'number') {
            options.hue = {
                min: options.hue,
                max: options.hue
            };
        }
        if (typeof options.hue === 'object' && !Array.isArray(options.hue)) {
            options.hue = [
                options.hue
            ];
        }
        if (typeof options.hue === 'undefined') {
            options.hue = [];
        }
        this.hueRanges = options.hue.map(function (range) {
            return {
                min: typeof range.min === 'undefined' ? 0 : range.min,
                max: typeof range.max === 'undefined' ? 360 : range.max
            };
        });
        this.hash = Sha256ToInt;
        if (typeof options.hash === 'function') {
            this.hash = options.hash;
        }
        if (options.hash === 'bkdr') {
            this.hash = BKDRHash;
        }
    }
    hsl(str) {
        var H, S1, L1;
        var hash = this.hash(str);
        var hueResolution = 727;
        if (this.hueRanges.length) {
            const range = this.hueRanges[hash % this.hueRanges.length];
            H = hash / this.hueRanges.length % hueResolution * (range.max - range.min) / hueResolution + range.min;
        }
        else {
            H = hash % 359;
        }
        hash = Math.ceil(hash / 360);
        S1 = this.S[hash % this.S.length];
        hash = Math.ceil(hash / this.S.length);
        L1 = this.L[hash % this.L.length];
        return [
            H,
            S1,
            L1
        ];
    }
    rgb(str) {
        var hsl = this.hsl(str);
        return HSL2RGB.apply(this, hsl);
    }
    hex(str) {
        var rgb = this.rgb(str);
        return RGB2HEX(rgb);
    }
}
export { ColorHash as default };
