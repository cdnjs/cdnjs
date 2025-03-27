//! otpauth 9.3.6 | (c) Héctor Molinero Fernández | MIT | https://github.com/hectorm/otpauth
//! noble-hashes 1.6.1 | (c) Paul Miller | MIT | https://github.com/paulmillr/noble-hashes
/// <reference types="./otpauth.d.ts" />
// @ts-nocheck
import { hmac } from '@noble/hashes/hmac';
import { sha1 } from '@noble/hashes/sha1';
import { sha224, sha256, sha384, sha512 } from '@noble/hashes/sha2';
import { sha3_224, sha3_256, sha3_384, sha3_512 } from '@noble/hashes/sha3';

/**
 * Converts an integer to an Uint8Array.
 * @param {number} num Integer.
 * @returns {Uint8Array} Uint8Array.
 */ const uintDecode = (num)=>{
    const buf = new ArrayBuffer(8);
    const arr = new Uint8Array(buf);
    let acc = num;
    for(let i = 7; i >= 0; i--){
        if (acc === 0) break;
        arr[i] = acc & 255;
        acc -= arr[i];
        acc /= 256;
    }
    return arr;
};

/**
 * "globalThis" ponyfill.
 * @see [A horrifying globalThis polyfill in universal JavaScript](https://mathiasbynens.be/notes/globalthis)
 * @type {Object.<string, *>}
 */ const globalScope = (()=>{
    if (typeof globalThis === "object") return globalThis;
    else {
        Object.defineProperty(Object.prototype, "__GLOBALTHIS__", {
            get () {
                return this;
            },
            configurable: true
        });
        try {
            // @ts-expect-error
            // eslint-disable-next-line no-undef
            if (typeof __GLOBALTHIS__ !== "undefined") return __GLOBALTHIS__;
        } finally{
            // @ts-expect-error
            delete Object.prototype.__GLOBALTHIS__;
        }
    }
    // Still unable to determine "globalThis", fall back to a naive method.
    if (typeof self !== "undefined") return self;
    else if (typeof window !== "undefined") return window;
    else if (typeof global !== "undefined") return global;
    return undefined;
})();

/**
 * @noble/hashes hash functions.
 * @type {Object.<string, sha1|sha224|sha256|sha384|sha512|sha3_224|sha3_256|sha3_384|sha3_512>}
 */ const nobleHashes = {
    SHA1: sha1,
    SHA224: sha224,
    SHA256: sha256,
    SHA384: sha384,
    SHA512: sha512,
    "SHA3-224": sha3_224,
    "SHA3-256": sha3_256,
    "SHA3-384": sha3_384,
    "SHA3-512": sha3_512
};
/**
 * Canonicalizes a hash algorithm name.
 * @param {string} algorithm Hash algorithm name.
 * @returns {"SHA1"|"SHA224"|"SHA256"|"SHA384"|"SHA512"|"SHA3-224"|"SHA3-256"|"SHA3-384"|"SHA3-512"} Canonicalized hash algorithm name.
 */ const canonicalizeAlgorithm = (algorithm)=>{
    switch(true){
        case /^(?:SHA-?1|SSL3-SHA1)$/i.test(algorithm):
            return "SHA1";
        case /^SHA(?:2?-)?224$/i.test(algorithm):
            return "SHA224";
        case /^SHA(?:2?-)?256$/i.test(algorithm):
            return "SHA256";
        case /^SHA(?:2?-)?384$/i.test(algorithm):
            return "SHA384";
        case /^SHA(?:2?-)?512$/i.test(algorithm):
            return "SHA512";
        case /^SHA3-224$/i.test(algorithm):
            return "SHA3-224";
        case /^SHA3-256$/i.test(algorithm):
            return "SHA3-256";
        case /^SHA3-384$/i.test(algorithm):
            return "SHA3-384";
        case /^SHA3-512$/i.test(algorithm):
            return "SHA3-512";
        default:
            throw new TypeError(`Unknown hash algorithm: ${algorithm}`);
    }
};
/**
 * Calculates an HMAC digest.
 * @param {string} algorithm Algorithm.
 * @param {Uint8Array} key Key.
 * @param {Uint8Array} message Message.
 * @returns {Uint8Array} Digest.
 */ const hmacDigest = (algorithm, key, message)=>{
    if (hmac) {
        const hash = nobleHashes[algorithm] ?? nobleHashes[canonicalizeAlgorithm(algorithm)];
        return hmac(hash, key, message);
    } else {
        throw new Error("Missing HMAC function");
    }
};

/**
 * RFC 4648 base32 alphabet without pad.
 * @type {string}
 */ const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
/**
 * Converts a base32 string to an Uint8Array (RFC 4648).
 * @see [LinusU/base32-decode](https://github.com/LinusU/base32-decode)
 * @param {string} str Base32 string.
 * @returns {Uint8Array} Uint8Array.
 */ const base32Decode = (str)=>{
    // Remove spaces (although they are not allowed by the spec, some issuers add them for readability).
    str = str.replace(/ /g, "");
    // Canonicalize to all upper case and remove padding if it exists.
    let end = str.length;
    while(str[end - 1] === "=")--end;
    str = (end < str.length ? str.substring(0, end) : str).toUpperCase();
    const buf = new ArrayBuffer(str.length * 5 / 8 | 0);
    const arr = new Uint8Array(buf);
    let bits = 0;
    let value = 0;
    let index = 0;
    for(let i = 0; i < str.length; i++){
        const idx = ALPHABET.indexOf(str[i]);
        if (idx === -1) throw new TypeError(`Invalid character found: ${str[i]}`);
        value = value << 5 | idx;
        bits += 5;
        if (bits >= 8) {
            bits -= 8;
            arr[index++] = value >>> bits;
        }
    }
    return arr;
};
/**
 * Converts an Uint8Array to a base32 string (RFC 4648).
 * @see [LinusU/base32-encode](https://github.com/LinusU/base32-encode)
 * @param {Uint8Array} arr Uint8Array.
 * @returns {string} Base32 string.
 */ const base32Encode = (arr)=>{
    let bits = 0;
    let value = 0;
    let str = "";
    for(let i = 0; i < arr.length; i++){
        value = value << 8 | arr[i];
        bits += 8;
        while(bits >= 5){
            str += ALPHABET[value >>> bits - 5 & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        str += ALPHABET[value << 5 - bits & 31];
    }
    return str;
};

/**
 * Converts a hexadecimal string to an Uint8Array.
 * @param {string} str Hexadecimal string.
 * @returns {Uint8Array} Uint8Array.
 */ const hexDecode = (str)=>{
    // Remove spaces (although they are not allowed by the spec, some issuers add them for readability).
    str = str.replace(/ /g, "");
    const buf = new ArrayBuffer(str.length / 2);
    const arr = new Uint8Array(buf);
    for(let i = 0; i < str.length; i += 2){
        arr[i / 2] = parseInt(str.substring(i, i + 2), 16);
    }
    return arr;
};
/**
 * Converts an Uint8Array to a hexadecimal string.
 * @param {Uint8Array} arr Uint8Array.
 * @returns {string} Hexadecimal string.
 */ const hexEncode = (arr)=>{
    let str = "";
    for(let i = 0; i < arr.length; i++){
        const hex = arr[i].toString(16);
        if (hex.length === 1) str += "0";
        str += hex;
    }
    return str.toUpperCase();
};

/**
 * Converts a Latin-1 string to an Uint8Array.
 * @param {string} str Latin-1 string.
 * @returns {Uint8Array} Uint8Array.
 */ const latin1Decode = (str)=>{
    const buf = new ArrayBuffer(str.length);
    const arr = new Uint8Array(buf);
    for(let i = 0; i < str.length; i++){
        arr[i] = str.charCodeAt(i) & 0xff;
    }
    return arr;
};
/**
 * Converts an Uint8Array to a Latin-1 string.
 * @param {Uint8Array} arr Uint8Array.
 * @returns {string} Latin-1 string.
 */ const latin1Encode = (arr)=>{
    let str = "";
    for(let i = 0; i < arr.length; i++){
        str += String.fromCharCode(arr[i]);
    }
    return str;
};

/**
 * TextEncoder instance.
 * @type {TextEncoder|null}
 */ const ENCODER = globalScope.TextEncoder ? new globalScope.TextEncoder() : null;
/**
 * TextDecoder instance.
 * @type {TextDecoder|null}
 */ const DECODER = globalScope.TextDecoder ? new globalScope.TextDecoder() : null;
/**
 * Converts an UTF-8 string to an Uint8Array.
 * @param {string} str String.
 * @returns {Uint8Array} Uint8Array.
 */ const utf8Decode = (str)=>{
    if (!ENCODER) {
        throw new Error("Encoding API not available");
    }
    return ENCODER.encode(str);
};
/**
 * Converts an Uint8Array to an UTF-8 string.
 * @param {Uint8Array} arr Uint8Array.
 * @returns {string} String.
 */ const utf8Encode = (arr)=>{
    if (!DECODER) {
        throw new Error("Encoding API not available");
    }
    return DECODER.decode(arr);
};

/**
 * Returns random bytes.
 * @param {number} size Size.
 * @returns {Uint8Array} Random bytes.
 */ const randomBytes = (size)=>{
    if (globalScope.crypto?.getRandomValues) {
        return globalScope.crypto.getRandomValues(new Uint8Array(size));
    } else {
        throw new Error("Cryptography API not available");
    }
};

/**
 * OTP secret key.
 */ class Secret {
    /**
   * Converts a Latin-1 string to a Secret object.
   * @param {string} str Latin-1 string.
   * @returns {Secret} Secret object.
   */ static fromLatin1(str) {
        return new Secret({
            buffer: latin1Decode(str).buffer
        });
    }
    /**
   * Converts an UTF-8 string to a Secret object.
   * @param {string} str UTF-8 string.
   * @returns {Secret} Secret object.
   */ static fromUTF8(str) {
        return new Secret({
            buffer: utf8Decode(str).buffer
        });
    }
    /**
   * Converts a base32 string to a Secret object.
   * @param {string} str Base32 string.
   * @returns {Secret} Secret object.
   */ static fromBase32(str) {
        return new Secret({
            buffer: base32Decode(str).buffer
        });
    }
    /**
   * Converts a hexadecimal string to a Secret object.
   * @param {string} str Hexadecimal string.
   * @returns {Secret} Secret object.
   */ static fromHex(str) {
        return new Secret({
            buffer: hexDecode(str).buffer
        });
    }
    /**
   * Secret key buffer.
   * @deprecated For backward compatibility, the "bytes" property should be used instead.
   * @type {ArrayBufferLike}
   */ get buffer() {
        return this.bytes.buffer;
    }
    /**
   * Latin-1 string representation of secret key.
   * @type {string}
   */ get latin1() {
        Object.defineProperty(this, "latin1", {
            enumerable: true,
            writable: false,
            configurable: false,
            value: latin1Encode(this.bytes)
        });
        return this.latin1;
    }
    /**
   * UTF-8 string representation of secret key.
   * @type {string}
   */ get utf8() {
        Object.defineProperty(this, "utf8", {
            enumerable: true,
            writable: false,
            configurable: false,
            value: utf8Encode(this.bytes)
        });
        return this.utf8;
    }
    /**
   * Base32 string representation of secret key.
   * @type {string}
   */ get base32() {
        Object.defineProperty(this, "base32", {
            enumerable: true,
            writable: false,
            configurable: false,
            value: base32Encode(this.bytes)
        });
        return this.base32;
    }
    /**
   * Hexadecimal string representation of secret key.
   * @type {string}
   */ get hex() {
        Object.defineProperty(this, "hex", {
            enumerable: true,
            writable: false,
            configurable: false,
            value: hexEncode(this.bytes)
        });
        return this.hex;
    }
    /**
   * Creates a secret key object.
   * @param {Object} [config] Configuration options.
   * @param {ArrayBufferLike} [config.buffer] Secret key buffer.
   * @param {number} [config.size=20] Number of random bytes to generate, ignored if 'buffer' is provided.
   */ constructor({ buffer, size = 20 } = {}){
        /**
     * Secret key.
     * @type {Uint8Array}
     * @readonly
     */ this.bytes = typeof buffer === "undefined" ? randomBytes(size) : new Uint8Array(buffer);
        // Prevent the "bytes" property from being modified.
        Object.defineProperty(this, "bytes", {
            enumerable: true,
            writable: false,
            configurable: false,
            value: this.bytes
        });
    }
}

/**
 * Returns true if a is equal to b, without leaking timing information that would allow an attacker to guess one of the values.
 * @param {string} a String a.
 * @param {string} b String b.
 * @returns {boolean} Equality result.
 */ const timingSafeEqual = (a, b)=>{
    {
        if (a.length !== b.length) {
            throw new TypeError("Input strings must have the same length");
        }
        let i = -1;
        let out = 0;
        while(++i < a.length){
            out |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return out === 0;
    }
};

/**
 * HOTP: An HMAC-based One-time Password Algorithm.
 * @see [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226)
 */ class HOTP {
    /**
   * Default configuration.
   * @type {{
   *   issuer: string,
   *   label: string,
   *   issuerInLabel: boolean,
   *   algorithm: string,
   *   digits: number,
   *   counter: number
   *   window: number
   * }}
   */ static get defaults() {
        return {
            issuer: "",
            label: "OTPAuth",
            issuerInLabel: true,
            algorithm: "SHA1",
            digits: 6,
            counter: 0,
            window: 1
        };
    }
    /**
   * Generates an HOTP token.
   * @param {Object} config Configuration options.
   * @param {Secret} config.secret Secret key.
   * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
   * @param {number} [config.digits=6] Token length.
   * @param {number} [config.counter=0] Counter value.
   * @returns {string} Token.
   */ static generate({ secret, algorithm = HOTP.defaults.algorithm, digits = HOTP.defaults.digits, counter = HOTP.defaults.counter }) {
        const digest = hmacDigest(algorithm, secret.bytes, uintDecode(counter));
        const offset = digest[digest.byteLength - 1] & 15;
        const otp = ((digest[offset] & 127) << 24 | (digest[offset + 1] & 255) << 16 | (digest[offset + 2] & 255) << 8 | digest[offset + 3] & 255) % 10 ** digits;
        return otp.toString().padStart(digits, "0");
    }
    /**
   * Generates an HOTP token.
   * @param {Object} [config] Configuration options.
   * @param {number} [config.counter=this.counter++] Counter value.
   * @returns {string} Token.
   */ generate({ counter = this.counter++ } = {}) {
        return HOTP.generate({
            secret: this.secret,
            algorithm: this.algorithm,
            digits: this.digits,
            counter
        });
    }
    /**
   * Validates an HOTP token.
   * @param {Object} config Configuration options.
   * @param {string} config.token Token value.
   * @param {Secret} config.secret Secret key.
   * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
   * @param {number} [config.digits=6] Token length.
   * @param {number} [config.counter=0] Counter value.
   * @param {number} [config.window=1] Window of counter values to test.
   * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
   */ static validate({ token, secret, algorithm, digits = HOTP.defaults.digits, counter = HOTP.defaults.counter, window = HOTP.defaults.window }) {
        // Return early if the token length does not match the digit number.
        if (token.length !== digits) return null;
        let delta = null;
        const check = (/** @type {number} */ i)=>{
            const generatedToken = HOTP.generate({
                secret,
                algorithm,
                digits,
                counter: i
            });
            if (timingSafeEqual(token, generatedToken)) {
                delta = i - counter;
            }
        };
        check(counter);
        for(let i = 1; i <= window && delta === null; ++i){
            check(counter - i);
            if (delta !== null) break;
            check(counter + i);
            if (delta !== null) break;
        }
        return delta;
    }
    /**
   * Validates an HOTP token.
   * @param {Object} config Configuration options.
   * @param {string} config.token Token value.
   * @param {number} [config.counter=this.counter] Counter value.
   * @param {number} [config.window=1] Window of counter values to test.
   * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
   */ validate({ token, counter = this.counter, window }) {
        return HOTP.validate({
            token,
            secret: this.secret,
            algorithm: this.algorithm,
            digits: this.digits,
            counter,
            window
        });
    }
    /**
   * Returns a Google Authenticator key URI.
   * @returns {string} URI.
   */ toString() {
        const e = encodeURIComponent;
        return "otpauth://hotp/" + `${this.issuer.length > 0 ? this.issuerInLabel ? `${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?`}` + `secret=${e(this.secret.base32)}&` + `algorithm=${e(this.algorithm)}&` + `digits=${e(this.digits)}&` + `counter=${e(this.counter)}`;
    }
    /**
   * Creates an HOTP object.
   * @param {Object} [config] Configuration options.
   * @param {string} [config.issuer=''] Account provider.
   * @param {string} [config.label='OTPAuth'] Account label.
   * @param {boolean} [config.issuerInLabel=true] Include issuer prefix in label.
   * @param {Secret|string} [config.secret=Secret] Secret key.
   * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
   * @param {number} [config.digits=6] Token length.
   * @param {number} [config.counter=0] Initial counter value.
   */ constructor({ issuer = HOTP.defaults.issuer, label = HOTP.defaults.label, issuerInLabel = HOTP.defaults.issuerInLabel, secret = new Secret(), algorithm = HOTP.defaults.algorithm, digits = HOTP.defaults.digits, counter = HOTP.defaults.counter } = {}){
        /**
     * Account provider.
     * @type {string}
     */ this.issuer = issuer;
        /**
     * Account label.
     * @type {string}
     */ this.label = label;
        /**
     * Include issuer prefix in label.
     * @type {boolean}
     */ this.issuerInLabel = issuerInLabel;
        /**
     * Secret key.
     * @type {Secret}
     */ this.secret = typeof secret === "string" ? Secret.fromBase32(secret) : secret;
        /**
     * HMAC hashing algorithm.
     * @type {string}
     */ this.algorithm = canonicalizeAlgorithm(algorithm);
        /**
     * Token length.
     * @type {number}
     */ this.digits = digits;
        /**
     * Initial counter value.
     * @type {number}
     */ this.counter = counter;
    }
}

/**
 * TOTP: Time-Based One-Time Password Algorithm.
 * @see [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238)
 */ class TOTP {
    /**
   * Default configuration.
   * @type {{
   *   issuer: string,
   *   label: string,
   *   issuerInLabel: boolean,
   *   algorithm: string,
   *   digits: number,
   *   period: number
   *   window: number
   * }}
   */ static get defaults() {
        return {
            issuer: "",
            label: "OTPAuth",
            issuerInLabel: true,
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            window: 1
        };
    }
    /**
   * Generates a TOTP token.
   * @param {Object} config Configuration options.
   * @param {Secret} config.secret Secret key.
   * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
   * @param {number} [config.digits=6] Token length.
   * @param {number} [config.period=30] Token time-step duration.
   * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
   * @returns {string} Token.
   */ static generate({ secret, algorithm, digits, period = TOTP.defaults.period, timestamp = Date.now() }) {
        return HOTP.generate({
            secret,
            algorithm,
            digits,
            counter: Math.floor(timestamp / 1000 / period)
        });
    }
    /**
   * Generates a TOTP token.
   * @param {Object} [config] Configuration options.
   * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
   * @returns {string} Token.
   */ generate({ timestamp = Date.now() } = {}) {
        return TOTP.generate({
            secret: this.secret,
            algorithm: this.algorithm,
            digits: this.digits,
            period: this.period,
            timestamp
        });
    }
    /**
   * Validates a TOTP token.
   * @param {Object} config Configuration options.
   * @param {string} config.token Token value.
   * @param {Secret} config.secret Secret key.
   * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
   * @param {number} [config.digits=6] Token length.
   * @param {number} [config.period=30] Token time-step duration.
   * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
   * @param {number} [config.window=1] Window of counter values to test.
   * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
   */ static validate({ token, secret, algorithm, digits, period = TOTP.defaults.period, timestamp = Date.now(), window }) {
        return HOTP.validate({
            token,
            secret,
            algorithm,
            digits,
            counter: Math.floor(timestamp / 1000 / period),
            window
        });
    }
    /**
   * Validates a TOTP token.
   * @param {Object} config Configuration options.
   * @param {string} config.token Token value.
   * @param {number} [config.timestamp=Date.now] Timestamp value in milliseconds.
   * @param {number} [config.window=1] Window of counter values to test.
   * @returns {number|null} Token delta or null if it is not found in the search window, in which case it should be considered invalid.
   */ validate({ token, timestamp, window }) {
        return TOTP.validate({
            token,
            secret: this.secret,
            algorithm: this.algorithm,
            digits: this.digits,
            period: this.period,
            timestamp,
            window
        });
    }
    /**
   * Returns a Google Authenticator key URI.
   * @returns {string} URI.
   */ toString() {
        const e = encodeURIComponent;
        return "otpauth://totp/" + `${this.issuer.length > 0 ? this.issuerInLabel ? `${e(this.issuer)}:${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?issuer=${e(this.issuer)}&` : `${e(this.label)}?`}` + `secret=${e(this.secret.base32)}&` + `algorithm=${e(this.algorithm)}&` + `digits=${e(this.digits)}&` + `period=${e(this.period)}`;
    }
    /**
   * Creates a TOTP object.
   * @param {Object} [config] Configuration options.
   * @param {string} [config.issuer=''] Account provider.
   * @param {string} [config.label='OTPAuth'] Account label.
   * @param {boolean} [config.issuerInLabel=true] Include issuer prefix in label.
   * @param {Secret|string} [config.secret=Secret] Secret key.
   * @param {string} [config.algorithm='SHA1'] HMAC hashing algorithm.
   * @param {number} [config.digits=6] Token length.
   * @param {number} [config.period=30] Token time-step duration.
   */ constructor({ issuer = TOTP.defaults.issuer, label = TOTP.defaults.label, issuerInLabel = TOTP.defaults.issuerInLabel, secret = new Secret(), algorithm = TOTP.defaults.algorithm, digits = TOTP.defaults.digits, period = TOTP.defaults.period } = {}){
        /**
     * Account provider.
     * @type {string}
     */ this.issuer = issuer;
        /**
     * Account label.
     * @type {string}
     */ this.label = label;
        /**
     * Include issuer prefix in label.
     * @type {boolean}
     */ this.issuerInLabel = issuerInLabel;
        /**
     * Secret key.
     * @type {Secret}
     */ this.secret = typeof secret === "string" ? Secret.fromBase32(secret) : secret;
        /**
     * HMAC hashing algorithm.
     * @type {string}
     */ this.algorithm = canonicalizeAlgorithm(algorithm);
        /**
     * Token length.
     * @type {number}
     */ this.digits = digits;
        /**
     * Token time-step duration.
     * @type {number}
     */ this.period = period;
    }
}

/**
 * Key URI regex (otpauth://TYPE/[ISSUER:]LABEL?PARAMETERS).
 * @type {RegExp}
 */ const OTPURI_REGEX = /^otpauth:\/\/([ht]otp)\/(.+)\?([A-Z0-9.~_-]+=[^?&]*(?:&[A-Z0-9.~_-]+=[^?&]*)*)$/i;
/**
 * RFC 4648 base32 alphabet with pad.
 * @type {RegExp}
 */ const SECRET_REGEX = /^[2-7A-Z]+=*$/i;
/**
 * Regex for supported algorithms.
 * @type {RegExp}
 */ const ALGORITHM_REGEX = /^SHA(?:1|224|256|384|512|3-224|3-256|3-384|3-512)$/i;
/**
 * Integer regex.
 * @type {RegExp}
 */ const INTEGER_REGEX = /^[+-]?\d+$/;
/**
 * Positive integer regex.
 * @type {RegExp}
 */ const POSITIVE_INTEGER_REGEX = /^\+?[1-9]\d*$/;
/**
 * HOTP/TOTP object/string conversion.
 * @see [Key URI Format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format)
 */ class URI {
    /**
   * Parses a Google Authenticator key URI and returns an HOTP/TOTP object.
   * @param {string} uri Google Authenticator Key URI.
   * @returns {HOTP|TOTP} HOTP/TOTP object.
   */ static parse(uri) {
        let uriGroups;
        try {
            uriGroups = uri.match(OTPURI_REGEX);
        // eslint-disable-next-line no-unused-vars
        } catch (_) {
        /* Handled below */ }
        if (!Array.isArray(uriGroups)) {
            throw new URIError("Invalid URI format");
        }
        // Extract URI groups.
        const uriType = uriGroups[1].toLowerCase();
        const uriLabel = uriGroups[2].split(/(?::|%3A) *(.+)/i, 2).map(decodeURIComponent);
        /** @type {Object.<string, string>} */ const uriParams = uriGroups[3].split("&").reduce((acc, cur)=>{
            const pairArr = cur.split(/=(.*)/, 2).map(decodeURIComponent);
            const pairKey = pairArr[0].toLowerCase();
            const pairVal = pairArr[1];
            /** @type {Object.<string, string>} */ const pairAcc = acc;
            pairAcc[pairKey] = pairVal;
            return pairAcc;
        }, {});
        // 'OTP' will be instantiated with 'config' argument.
        let OTP;
        const config = {};
        if (uriType === "hotp") {
            OTP = HOTP;
            // Counter: required
            if (typeof uriParams.counter !== "undefined" && INTEGER_REGEX.test(uriParams.counter)) {
                config.counter = parseInt(uriParams.counter, 10);
            } else {
                throw new TypeError("Missing or invalid 'counter' parameter");
            }
        } else if (uriType === "totp") {
            OTP = TOTP;
            // Period: optional
            if (typeof uriParams.period !== "undefined") {
                if (POSITIVE_INTEGER_REGEX.test(uriParams.period)) {
                    config.period = parseInt(uriParams.period, 10);
                } else {
                    throw new TypeError("Invalid 'period' parameter");
                }
            }
        } else {
            throw new TypeError("Unknown OTP type");
        }
        // Label: required
        // Issuer: optional
        if (typeof uriParams.issuer !== "undefined") {
            config.issuer = uriParams.issuer;
        }
        if (uriLabel.length === 2) {
            config.label = uriLabel[1];
            if (typeof config.issuer === "undefined" || config.issuer === "") {
                config.issuer = uriLabel[0];
            } else if (uriLabel[0] === "") {
                config.issuerInLabel = false;
            }
        } else {
            config.label = uriLabel[0];
            if (typeof config.issuer !== "undefined" && config.issuer !== "") {
                config.issuerInLabel = false;
            }
        }
        // Secret: required
        if (typeof uriParams.secret !== "undefined" && SECRET_REGEX.test(uriParams.secret)) {
            config.secret = uriParams.secret;
        } else {
            throw new TypeError("Missing or invalid 'secret' parameter");
        }
        // Algorithm: optional
        if (typeof uriParams.algorithm !== "undefined") {
            if (ALGORITHM_REGEX.test(uriParams.algorithm)) {
                config.algorithm = uriParams.algorithm;
            } else {
                throw new TypeError("Invalid 'algorithm' parameter");
            }
        }
        // Digits: optional
        if (typeof uriParams.digits !== "undefined") {
            if (POSITIVE_INTEGER_REGEX.test(uriParams.digits)) {
                config.digits = parseInt(uriParams.digits, 10);
            } else {
                throw new TypeError("Invalid 'digits' parameter");
            }
        }
        return new OTP(config);
    }
    /**
   * Converts an HOTP/TOTP object to a Google Authenticator key URI.
   * @param {HOTP|TOTP} otp HOTP/TOTP object.
   * @returns {string} Google Authenticator Key URI.
   */ static stringify(otp) {
        if (otp instanceof HOTP || otp instanceof TOTP) {
            return otp.toString();
        }
        throw new TypeError("Invalid 'HOTP/TOTP' object");
    }
}

/**
 * Library version.
 * @type {string}
 */ const version = "9.3.6";

export { HOTP, Secret, TOTP, URI, version };
