(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jose = {}));
})(this, (function (exports) { 'use strict';

  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // dist/webapi/util/base64url.js
  var base64url_exports = {};
  __export(base64url_exports, {
    decode: () => decode,
    encode: () => encode
  });

  // dist/webapi/lib/buffer_utils.js
  var encoder = new TextEncoder();
  var decoder = new TextDecoder();
  var MAX_INT32 = 2 ** 32;
  function concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    for (const buffer of buffers) {
      buf.set(buffer, i);
      i += buffer.length;
    }
    return buf;
  }
  function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
      throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([value >>> 24, value >>> 16, value >>> 8, value & 255], offset);
  }
  function uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
  }
  function uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
  }

  // dist/webapi/lib/base64.js
  function encodeBase64(input) {
    if (Uint8Array.prototype.toBase64) {
      return input.toBase64();
    }
    const CHUNK_SIZE = 32768;
    const arr = [];
    for (let i = 0; i < input.length; i += CHUNK_SIZE) {
      arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join(""));
  }
  function decodeBase64(encoded) {
    if (Uint8Array.fromBase64) {
      return Uint8Array.fromBase64(encoded);
    }
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  // dist/webapi/util/base64url.js
  function decode(input) {
    if (Uint8Array.fromBase64) {
      return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), {
        alphabet: "base64url"
      });
    }
    let encoded = input;
    if (encoded instanceof Uint8Array) {
      encoded = decoder.decode(encoded);
    }
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
    try {
      return decodeBase64(encoded);
    } catch {
      throw new TypeError("The input to be decoded is not correctly encoded.");
    }
  }
  function encode(input) {
    let unencoded = input;
    if (typeof unencoded === "string") {
      unencoded = encoder.encode(unencoded);
    }
    if (Uint8Array.prototype.toBase64) {
      return unencoded.toBase64({ alphabet: "base64url", omitPadding: true });
    }
    return encodeBase64(unencoded).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }

  // dist/webapi/util/errors.js
  var errors_exports = {};
  __export(errors_exports, {
    JOSEAlgNotAllowed: () => JOSEAlgNotAllowed,
    JOSEError: () => JOSEError,
    JOSENotSupported: () => JOSENotSupported,
    JWEDecryptionFailed: () => JWEDecryptionFailed,
    JWEInvalid: () => JWEInvalid,
    JWKInvalid: () => JWKInvalid,
    JWKSInvalid: () => JWKSInvalid,
    JWKSMultipleMatchingKeys: () => JWKSMultipleMatchingKeys,
    JWKSNoMatchingKey: () => JWKSNoMatchingKey,
    JWKSTimeout: () => JWKSTimeout,
    JWSInvalid: () => JWSInvalid,
    JWSSignatureVerificationFailed: () => JWSSignatureVerificationFailed,
    JWTClaimValidationFailed: () => JWTClaimValidationFailed,
    JWTExpired: () => JWTExpired,
    JWTInvalid: () => JWTInvalid
  });
  var JOSEError = class extends Error {
    static code = "ERR_JOSE_GENERIC";
    code = "ERR_JOSE_GENERIC";
    constructor(message2, options) {
      super(message2, options);
      this.name = this.constructor.name;
      Error.captureStackTrace?.(this, this.constructor);
    }
  };
  var JWTClaimValidationFailed = class extends JOSEError {
    static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    claim;
    reason;
    payload;
    constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
      super(message2, { cause: { claim, reason, payload } });
      this.claim = claim;
      this.reason = reason;
      this.payload = payload;
    }
  };
  var JWTExpired = class extends JOSEError {
    static code = "ERR_JWT_EXPIRED";
    code = "ERR_JWT_EXPIRED";
    claim;
    reason;
    payload;
    constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
      super(message2, { cause: { claim, reason, payload } });
      this.claim = claim;
      this.reason = reason;
      this.payload = payload;
    }
  };
  var JOSEAlgNotAllowed = class extends JOSEError {
    static code = "ERR_JOSE_ALG_NOT_ALLOWED";
    code = "ERR_JOSE_ALG_NOT_ALLOWED";
  };
  var JOSENotSupported = class extends JOSEError {
    static code = "ERR_JOSE_NOT_SUPPORTED";
    code = "ERR_JOSE_NOT_SUPPORTED";
  };
  var JWEDecryptionFailed = class extends JOSEError {
    static code = "ERR_JWE_DECRYPTION_FAILED";
    code = "ERR_JWE_DECRYPTION_FAILED";
    constructor(message2 = "decryption operation failed", options) {
      super(message2, options);
    }
  };
  var JWEInvalid = class extends JOSEError {
    static code = "ERR_JWE_INVALID";
    code = "ERR_JWE_INVALID";
  };
  var JWSInvalid = class extends JOSEError {
    static code = "ERR_JWS_INVALID";
    code = "ERR_JWS_INVALID";
  };
  var JWTInvalid = class extends JOSEError {
    static code = "ERR_JWT_INVALID";
    code = "ERR_JWT_INVALID";
  };
  var JWKInvalid = class extends JOSEError {
    static code = "ERR_JWK_INVALID";
    code = "ERR_JWK_INVALID";
  };
  var JWKSInvalid = class extends JOSEError {
    static code = "ERR_JWKS_INVALID";
    code = "ERR_JWKS_INVALID";
  };
  var JWKSNoMatchingKey = class extends JOSEError {
    static code = "ERR_JWKS_NO_MATCHING_KEY";
    code = "ERR_JWKS_NO_MATCHING_KEY";
    constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
      super(message2, options);
    }
  };
  var JWKSMultipleMatchingKeys = class extends JOSEError {
    [Symbol.asyncIterator];
    static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
      super(message2, options);
    }
  };
  var JWKSTimeout = class extends JOSEError {
    static code = "ERR_JWKS_TIMEOUT";
    code = "ERR_JWKS_TIMEOUT";
    constructor(message2 = "request timed out", options) {
      super(message2, options);
    }
  };
  var JWSSignatureVerificationFailed = class extends JOSEError {
    static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    constructor(message2 = "signature verification failed", options) {
      super(message2, options);
    }
  };

  // dist/webapi/lib/iv.js
  function bitLength(alg) {
    switch (alg) {
      case "A128GCM":
      case "A128GCMKW":
      case "A192GCM":
      case "A192GCMKW":
      case "A256GCM":
      case "A256GCMKW":
        return 96;
      case "A128CBC-HS256":
      case "A192CBC-HS384":
      case "A256CBC-HS512":
        return 128;
      default:
        throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
  }
  var iv_default = (alg) => crypto.getRandomValues(new Uint8Array(bitLength(alg) >> 3));

  // dist/webapi/lib/check_iv_length.js
  var check_iv_length_default = (enc, iv) => {
    if (iv.length << 3 !== bitLength(enc)) {
      throw new JWEInvalid("Invalid Initialization Vector length");
    }
  };

  // dist/webapi/lib/check_cek_length.js
  var check_cek_length_default = (cek, expected) => {
    const actual = cek.byteLength << 3;
    if (actual !== expected) {
      throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
    }
  };

  // dist/webapi/lib/crypto_key.js
  function unusable(name, prop = "algorithm.name") {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
  }
  function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
  }
  function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
  }
  function getNamedCurve(alg) {
    switch (alg) {
      case "ES256":
        return "P-256";
      case "ES384":
        return "P-384";
      case "ES512":
        return "P-521";
      default:
        throw new Error("unreachable");
    }
  }
  function checkUsage(key, usage) {
    if (usage && !key.usages.includes(usage)) {
      throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
    }
  }
  function checkSigCryptoKey(key, alg, usage) {
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512": {
        if (!isAlgorithm(key.algorithm, "HMAC"))
          throw unusable("HMAC");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "RS256":
      case "RS384":
      case "RS512": {
        if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
          throw unusable("RSASSA-PKCS1-v1_5");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "PS256":
      case "PS384":
      case "PS512": {
        if (!isAlgorithm(key.algorithm, "RSA-PSS"))
          throw unusable("RSA-PSS");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "Ed25519":
      case "EdDSA": {
        if (!isAlgorithm(key.algorithm, "Ed25519"))
          throw unusable("Ed25519");
        break;
      }
      case "ES256":
      case "ES384":
      case "ES512": {
        if (!isAlgorithm(key.algorithm, "ECDSA"))
          throw unusable("ECDSA");
        const expected = getNamedCurve(alg);
        const actual = key.algorithm.namedCurve;
        if (actual !== expected)
          throw unusable(expected, "algorithm.namedCurve");
        break;
      }
      default:
        throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usage);
  }
  function checkEncCryptoKey(key, alg, usage) {
    switch (alg) {
      case "A128GCM":
      case "A192GCM":
      case "A256GCM": {
        if (!isAlgorithm(key.algorithm, "AES-GCM"))
          throw unusable("AES-GCM");
        const expected = parseInt(alg.slice(1, 4), 10);
        const actual = key.algorithm.length;
        if (actual !== expected)
          throw unusable(expected, "algorithm.length");
        break;
      }
      case "A128KW":
      case "A192KW":
      case "A256KW": {
        if (!isAlgorithm(key.algorithm, "AES-KW"))
          throw unusable("AES-KW");
        const expected = parseInt(alg.slice(1, 4), 10);
        const actual = key.algorithm.length;
        if (actual !== expected)
          throw unusable(expected, "algorithm.length");
        break;
      }
      case "ECDH": {
        switch (key.algorithm.name) {
          case "ECDH":
          case "X25519":
            break;
          default:
            throw unusable("ECDH or X25519");
        }
        break;
      }
      case "PBES2-HS256+A128KW":
      case "PBES2-HS384+A192KW":
      case "PBES2-HS512+A256KW":
        if (!isAlgorithm(key.algorithm, "PBKDF2"))
          throw unusable("PBKDF2");
        break;
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512": {
        if (!isAlgorithm(key.algorithm, "RSA-OAEP"))
          throw unusable("RSA-OAEP");
        const expected = parseInt(alg.slice(9), 10) || 1;
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      default:
        throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usage);
  }

  // dist/webapi/lib/invalid_key_input.js
  function message(msg, actual, ...types) {
    types = types.filter(Boolean);
    if (types.length > 2) {
      const last = types.pop();
      msg += `one of type ${types.join(", ")}, or ${last}.`;
    } else if (types.length === 2) {
      msg += `one of type ${types[0]} or ${types[1]}.`;
    } else {
      msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
      msg += ` Received ${actual}`;
    } else if (typeof actual === "function" && actual.name) {
      msg += ` Received function ${actual.name}`;
    } else if (typeof actual === "object" && actual != null) {
      if (actual.constructor?.name) {
        msg += ` Received an instance of ${actual.constructor.name}`;
      }
    }
    return msg;
  }
  var invalid_key_input_default = (actual, ...types) => {
    return message("Key must be ", actual, ...types);
  };
  function withAlg(alg, actual, ...types) {
    return message(`Key for the ${alg} algorithm must be `, actual, ...types);
  }

  // dist/webapi/lib/is_key_like.js
  function assertCryptoKey(key) {
    if (!isCryptoKey(key)) {
      throw new Error("CryptoKey instance expected");
    }
  }
  function isCryptoKey(key) {
    return key?.[Symbol.toStringTag] === "CryptoKey";
  }
  function isKeyObject(key) {
    return key?.[Symbol.toStringTag] === "KeyObject";
  }
  var is_key_like_default = (key) => {
    return isCryptoKey(key) || isKeyObject(key);
  };

  // dist/webapi/lib/decrypt.js
  async function timingSafeEqual(a, b) {
    if (!(a instanceof Uint8Array)) {
      throw new TypeError("First argument must be a buffer");
    }
    if (!(b instanceof Uint8Array)) {
      throw new TypeError("Second argument must be a buffer");
    }
    const algorithm = { name: "HMAC", hash: "SHA-256" };
    const key = await crypto.subtle.generateKey(algorithm, false, ["sign"]);
    const aHmac = new Uint8Array(await crypto.subtle.sign(algorithm, key, a));
    const bHmac = new Uint8Array(await crypto.subtle.sign(algorithm, key, b));
    let out = 0;
    let i = -1;
    while (++i < 32) {
      out |= aHmac[i] ^ bHmac[i];
    }
    return out === 0;
  }
  async function cbcDecrypt(enc, cek, ciphertext, iv, tag2, aad) {
    if (!(cek instanceof Uint8Array)) {
      throw new TypeError(invalid_key_input_default(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["decrypt"]);
    const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
      hash: `SHA-${keySize << 1}`,
      name: "HMAC"
    }, false, ["sign"]);
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const expectedTag = new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    let macCheckPassed;
    try {
      macCheckPassed = await timingSafeEqual(tag2, expectedTag);
    } catch {
    }
    if (!macCheckPassed) {
      throw new JWEDecryptionFailed();
    }
    let plaintext;
    try {
      plaintext = new Uint8Array(await crypto.subtle.decrypt({ iv, name: "AES-CBC" }, encKey, ciphertext));
    } catch {
    }
    if (!plaintext) {
      throw new JWEDecryptionFailed();
    }
    return plaintext;
  }
  async function gcmDecrypt(enc, cek, ciphertext, iv, tag2, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
      encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["decrypt"]);
    } else {
      checkEncCryptoKey(cek, enc, "decrypt");
      encKey = cek;
    }
    try {
      return new Uint8Array(await crypto.subtle.decrypt({
        additionalData: aad,
        iv,
        name: "AES-GCM",
        tagLength: 128
      }, encKey, concat(ciphertext, tag2)));
    } catch {
      throw new JWEDecryptionFailed();
    }
  }
  var decrypt_default = async (enc, cek, ciphertext, iv, tag2, aad) => {
    if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
      throw new TypeError(invalid_key_input_default(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
    }
    if (!iv) {
      throw new JWEInvalid("JWE Initialization Vector missing");
    }
    if (!tag2) {
      throw new JWEInvalid("JWE Authentication Tag missing");
    }
    check_iv_length_default(enc, iv);
    switch (enc) {
      case "A128CBC-HS256":
      case "A192CBC-HS384":
      case "A256CBC-HS512":
        if (cek instanceof Uint8Array)
          check_cek_length_default(cek, parseInt(enc.slice(-3), 10));
        return cbcDecrypt(enc, cek, ciphertext, iv, tag2, aad);
      case "A128GCM":
      case "A192GCM":
      case "A256GCM":
        if (cek instanceof Uint8Array)
          check_cek_length_default(cek, parseInt(enc.slice(1, 4), 10));
        return gcmDecrypt(enc, cek, ciphertext, iv, tag2, aad);
      default:
        throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
    }
  };

  // dist/webapi/lib/is_disjoint.js
  var is_disjoint_default = (...headers) => {
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
      return true;
    }
    let acc;
    for (const header of sources) {
      const parameters = Object.keys(header);
      if (!acc || acc.size === 0) {
        acc = new Set(parameters);
        continue;
      }
      for (const parameter of parameters) {
        if (acc.has(parameter)) {
          return false;
        }
        acc.add(parameter);
      }
    }
    return true;
  };

  // dist/webapi/lib/is_object.js
  function isObjectLike(value) {
    return typeof value === "object" && value !== null;
  }
  var is_object_default = (input) => {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
      return false;
    }
    if (Object.getPrototypeOf(input) === null) {
      return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
  };

  // dist/webapi/lib/aeskw.js
  function checkKeySize(key, alg) {
    if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
      throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
  }
  function getCryptoKey(key, alg, usage) {
    if (key instanceof Uint8Array) {
      return crypto.subtle.importKey("raw", key, "AES-KW", true, [usage]);
    }
    checkEncCryptoKey(key, alg, usage);
    return key;
  }
  async function wrap(alg, key, cek) {
    const cryptoKey = await getCryptoKey(key, alg, "wrapKey");
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await crypto.subtle.importKey("raw", cek, { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
    return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
  }
  async function unwrap(alg, key, encryptedKey) {
    const cryptoKey = await getCryptoKey(key, alg, "unwrapKey");
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
    return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
  }

  // dist/webapi/lib/digest.js
  var digest_default = async (algorithm, data) => {
    const subtleDigest = `SHA-${algorithm.slice(-3)}`;
    return new Uint8Array(await crypto.subtle.digest(subtleDigest, data));
  };

  // dist/webapi/lib/ecdhes.js
  function lengthAndInput(input) {
    return concat(uint32be(input.length), input);
  }
  async function concatKdf(secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for (let iter = 0; iter < iterations; iter++) {
      const buf = new Uint8Array(4 + secret.length + value.length);
      buf.set(uint32be(iter + 1));
      buf.set(secret, 4);
      buf.set(value, 4 + secret.length);
      res.set(await digest_default("sha256", buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
  }
  async function deriveKey(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    checkEncCryptoKey(publicKey, "ECDH");
    checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
    const value = concat(lengthAndInput(encoder.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
    let length;
    if (publicKey.algorithm.name === "X25519") {
      length = 256;
    } else {
      length = Math.ceil(parseInt(publicKey.algorithm.namedCurve.slice(-3), 10) / 8) << 3;
    }
    const sharedSecret = new Uint8Array(await crypto.subtle.deriveBits({
      name: publicKey.algorithm.name,
      public: publicKey
    }, privateKey, length));
    return concatKdf(sharedSecret, keyLength, value);
  }
  function allowed(key) {
    switch (key.algorithm.namedCurve) {
      case "P-256":
      case "P-384":
      case "P-521":
        return true;
      default:
        return key.algorithm.name === "X25519";
    }
  }

  // dist/webapi/lib/pbes2kw.js
  function getCryptoKey2(key, alg) {
    if (key instanceof Uint8Array) {
      return crypto.subtle.importKey("raw", key, "PBKDF2", false, ["deriveBits"]);
    }
    checkEncCryptoKey(key, alg, "deriveBits");
    return key;
  }
  var concatSalt = (alg, p2sInput) => concat(encoder.encode(alg), new Uint8Array([0]), p2sInput);
  async function deriveKey2(p2s, alg, p2c, key) {
    if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
      throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
    }
    const salt = concatSalt(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10);
    const subtleAlg = {
      hash: `SHA-${alg.slice(8, 11)}`,
      iterations: p2c,
      name: "PBKDF2",
      salt
    };
    const cryptoKey = await getCryptoKey2(key, alg);
    return new Uint8Array(await crypto.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
  }
  async function wrap2(alg, key, cek, p2c = 2048, p2s = crypto.getRandomValues(new Uint8Array(16))) {
    const derived = await deriveKey2(p2s, alg, p2c, key);
    const encryptedKey = await wrap(alg.slice(-6), derived, cek);
    return { encryptedKey, p2c, p2s: encode(p2s) };
  }
  async function unwrap2(alg, key, encryptedKey, p2c, p2s) {
    const derived = await deriveKey2(p2s, alg, p2c, key);
    return unwrap(alg.slice(-6), derived, encryptedKey);
  }

  // dist/webapi/lib/check_key_length.js
  var check_key_length_default = (alg, key) => {
    if (alg.startsWith("RS") || alg.startsWith("PS")) {
      const { modulusLength } = key.algorithm;
      if (typeof modulusLength !== "number" || modulusLength < 2048) {
        throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
      }
    }
  };

  // dist/webapi/lib/rsaes.js
  var subtleAlgorithm = (alg) => {
    switch (alg) {
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512":
        return "RSA-OAEP";
      default:
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
  };
  async function encrypt(alg, key, cek) {
    checkEncCryptoKey(key, alg, "encrypt");
    check_key_length_default(alg, key);
    return new Uint8Array(await crypto.subtle.encrypt(subtleAlgorithm(alg), key, cek));
  }
  async function decrypt(alg, key, encryptedKey) {
    checkEncCryptoKey(key, alg, "decrypt");
    check_key_length_default(alg, key);
    return new Uint8Array(await crypto.subtle.decrypt(subtleAlgorithm(alg), key, encryptedKey));
  }

  // dist/webapi/lib/cek.js
  function bitLength2(alg) {
    switch (alg) {
      case "A128GCM":
        return 128;
      case "A192GCM":
        return 192;
      case "A256GCM":
      case "A128CBC-HS256":
        return 256;
      case "A192CBC-HS384":
        return 384;
      case "A256CBC-HS512":
        return 512;
      default:
        throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
  }
  var cek_default = (alg) => crypto.getRandomValues(new Uint8Array(bitLength2(alg) >> 3));

  // dist/webapi/lib/asn1.js
  var formatPEM = (b64, descriptor) => {
    const newlined = (b64.match(/.{1,64}/g) || []).join("\n");
    return `-----BEGIN ${descriptor}-----
${newlined}
-----END ${descriptor}-----`;
  };
  var genericExport = async (keyType, keyFormat, key) => {
    if (isKeyObject(key)) {
      if (key.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
      }
      return key.export({ format: "pem", type: keyFormat });
    }
    if (!isCryptoKey(key)) {
      throw new TypeError(invalid_key_input_default(key, "CryptoKey", "KeyObject"));
    }
    if (!key.extractable) {
      throw new TypeError("CryptoKey is not extractable");
    }
    if (key.type !== keyType) {
      throw new TypeError(`key is not a ${keyType} key`);
    }
    return formatPEM(encodeBase64(new Uint8Array(await crypto.subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
  };
  var toSPKI = (key) => {
    return genericExport("public", "spki", key);
  };
  var toPKCS8 = (key) => {
    return genericExport("private", "pkcs8", key);
  };
  var findOid = (keyData, oid, from = 0) => {
    if (from === 0) {
      oid.unshift(oid.length);
      oid.unshift(6);
    }
    const i = keyData.indexOf(oid[0], from);
    if (i === -1)
      return false;
    const sub = keyData.subarray(i, i + oid.length);
    if (sub.length !== oid.length)
      return false;
    return sub.every((value, index) => value === oid[index]) || findOid(keyData, oid, i + 1);
  };
  var getNamedCurve2 = (keyData) => {
    switch (true) {
      case findOid(keyData, [42, 134, 72, 206, 61, 3, 1, 7]):
        return "P-256";
      case findOid(keyData, [43, 129, 4, 0, 34]):
        return "P-384";
      case findOid(keyData, [43, 129, 4, 0, 35]):
        return "P-521";
      default:
        return void 0;
    }
  };
  var genericImport = async (replace, keyFormat, pem, alg, options) => {
    let algorithm;
    let keyUsages;
    const keyData = new Uint8Array(atob(pem.replace(replace, "")).split("").map((c) => c.charCodeAt(0)));
    const isPublic = keyFormat === "spki";
    switch (alg) {
      case "PS256":
      case "PS384":
      case "PS512":
        algorithm = { name: "RSA-PSS", hash: `SHA-${alg.slice(-3)}` };
        keyUsages = isPublic ? ["verify"] : ["sign"];
        break;
      case "RS256":
      case "RS384":
      case "RS512":
        algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${alg.slice(-3)}` };
        keyUsages = isPublic ? ["verify"] : ["sign"];
        break;
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512":
        algorithm = {
          name: "RSA-OAEP",
          hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`
        };
        keyUsages = isPublic ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
        break;
      case "ES256":
        algorithm = { name: "ECDSA", namedCurve: "P-256" };
        keyUsages = isPublic ? ["verify"] : ["sign"];
        break;
      case "ES384":
        algorithm = { name: "ECDSA", namedCurve: "P-384" };
        keyUsages = isPublic ? ["verify"] : ["sign"];
        break;
      case "ES512":
        algorithm = { name: "ECDSA", namedCurve: "P-521" };
        keyUsages = isPublic ? ["verify"] : ["sign"];
        break;
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        const namedCurve = getNamedCurve2(keyData);
        algorithm = namedCurve?.startsWith("P-") ? { name: "ECDH", namedCurve } : { name: "X25519" };
        keyUsages = isPublic ? [] : ["deriveBits"];
        break;
      }
      case "Ed25519":
      case "EdDSA":
        algorithm = { name: "Ed25519" };
        keyUsages = isPublic ? ["verify"] : ["sign"];
        break;
      default:
        throw new JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
    }
    return crypto.subtle.importKey(keyFormat, keyData, algorithm, options?.extractable ?? (isPublic ? true : false), keyUsages);
  };
  var fromPKCS8 = (pem, alg, options) => {
    return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", pem, alg, options);
  };
  var fromSPKI = (pem, alg, options) => {
    return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "spki", pem, alg, options);
  };
  function getElement(seq) {
    const result = [];
    let next = 0;
    while (next < seq.length) {
      const nextPart = parseElement(seq.subarray(next));
      result.push(nextPart);
      next += nextPart.byteLength;
    }
    return result;
  }
  function parseElement(bytes) {
    let position = 0;
    let tag2 = bytes[0] & 31;
    position++;
    if (tag2 === 31) {
      tag2 = 0;
      while (bytes[position] >= 128) {
        tag2 = tag2 * 128 + bytes[position] - 128;
        position++;
      }
      tag2 = tag2 * 128 + bytes[position] - 128;
      position++;
    }
    let length = 0;
    if (bytes[position] < 128) {
      length = bytes[position];
      position++;
    } else if (length === 128) {
      length = 0;
      while (bytes[position + length] !== 0 || bytes[position + length + 1] !== 0) {
        if (length > bytes.byteLength) {
          throw new TypeError("invalid indefinite form length");
        }
        length++;
      }
      const byteLength2 = position + length + 2;
      return {
        byteLength: byteLength2,
        contents: bytes.subarray(position, position + length),
        raw: bytes.subarray(0, byteLength2)
      };
    } else {
      const numberOfDigits = bytes[position] & 127;
      position++;
      length = 0;
      for (let i = 0; i < numberOfDigits; i++) {
        length = length * 256 + bytes[position];
        position++;
      }
    }
    const byteLength = position + length;
    return {
      byteLength,
      contents: bytes.subarray(position, byteLength),
      raw: bytes.subarray(0, byteLength)
    };
  }
  function spkiFromX509(buf) {
    const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
    return encodeBase64(tbsCertificate[tbsCertificate[0].raw[0] === 160 ? 6 : 5].raw);
  }
  var createPublicKey;
  function getSPKI(x509) {
    try {
      createPublicKey ??= globalThis.process?.getBuiltinModule?.("node:crypto")?.createPublicKey;
    } catch {
      createPublicKey = 0;
    }
    if (createPublicKey) {
      try {
        return new createPublicKey(x509).export({ format: "pem", type: "spki" });
      } catch {
      }
    }
    const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, "");
    const raw = decodeBase64(pem);
    return formatPEM(spkiFromX509(raw), "PUBLIC KEY");
  }
  var fromX509 = (pem, alg, options) => {
    let spki;
    try {
      spki = getSPKI(pem);
    } catch (cause) {
      throw new TypeError("Failed to parse the X.509 certificate", { cause });
    }
    return fromSPKI(spki, alg, options);
  };

  // dist/webapi/lib/jwk_to_key.js
  function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch (jwk.kty) {
      case "RSA": {
        switch (jwk.alg) {
          case "PS256":
          case "PS384":
          case "PS512":
            algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            algorithm = {
              name: "RSA-OAEP",
              hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
            };
            keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      case "EC": {
        switch (jwk.alg) {
          case "ES256":
            algorithm = { name: "ECDSA", namedCurve: "P-256" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ES384":
            algorithm = { name: "ECDSA", namedCurve: "P-384" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ES512":
            algorithm = { name: "ECDSA", namedCurve: "P-521" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            algorithm = { name: "ECDH", namedCurve: jwk.crv };
            keyUsages = jwk.d ? ["deriveBits"] : [];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      case "OKP": {
        switch (jwk.alg) {
          case "Ed25519":
          case "EdDSA":
            algorithm = { name: "Ed25519" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            algorithm = { name: jwk.crv };
            keyUsages = jwk.d ? ["deriveBits"] : [];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return { algorithm, keyUsages };
  }
  var jwk_to_key_default = async (jwk) => {
    if (!jwk.alg) {
      throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    const { algorithm, keyUsages } = subtleMapping(jwk);
    const keyData = { ...jwk };
    delete keyData.alg;
    delete keyData.use;
    return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? (jwk.d ? false : true), jwk.key_ops ?? keyUsages);
  };

  // dist/webapi/key/import.js
  async function importSPKI(spki, alg, options) {
    if (typeof spki !== "string" || spki.indexOf("-----BEGIN PUBLIC KEY-----") !== 0) {
      throw new TypeError('"spki" must be SPKI formatted string');
    }
    return fromSPKI(spki, alg, options);
  }
  async function importX509(x509, alg, options) {
    if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) {
      throw new TypeError('"x509" must be X.509 formatted string');
    }
    return fromX509(x509, alg, options);
  }
  async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) {
      throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
    }
    return fromPKCS8(pkcs8, alg, options);
  }
  async function importJWK(jwk, alg, options) {
    if (!is_object_default(jwk)) {
      throw new TypeError("JWK must be an object");
    }
    let ext;
    alg ??= jwk.alg;
    ext ??= options?.extractable ?? jwk.ext;
    switch (jwk.kty) {
      case "oct":
        if (typeof jwk.k !== "string" || !jwk.k) {
          throw new TypeError('missing "k" (Key Value) Parameter value');
        }
        return decode(jwk.k);
      case "RSA":
        if ("oth" in jwk && jwk.oth !== void 0) {
          throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
        }
      case "EC":
      case "OKP":
        return jwk_to_key_default({ ...jwk, alg, ext });
      default:
        throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
  }

  // dist/webapi/lib/encrypt.js
  async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    if (!(cek instanceof Uint8Array)) {
      throw new TypeError(invalid_key_input_default(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["encrypt"]);
    const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
      hash: `SHA-${keySize << 1}`,
      name: "HMAC"
    }, false, ["sign"]);
    const ciphertext = new Uint8Array(await crypto.subtle.encrypt({
      iv,
      name: "AES-CBC"
    }, encKey, plaintext));
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const tag2 = new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    return { ciphertext, tag: tag2, iv };
  }
  async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
      encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
    } else {
      checkEncCryptoKey(cek, enc, "encrypt");
      encKey = cek;
    }
    const encrypted = new Uint8Array(await crypto.subtle.encrypt({
      additionalData: aad,
      iv,
      name: "AES-GCM",
      tagLength: 128
    }, encKey, plaintext));
    const tag2 = encrypted.slice(-16);
    const ciphertext = encrypted.slice(0, -16);
    return { ciphertext, tag: tag2, iv };
  }
  var encrypt_default = async (enc, plaintext, cek, iv, aad) => {
    if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
      throw new TypeError(invalid_key_input_default(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
    }
    if (iv) {
      check_iv_length_default(enc, iv);
    } else {
      iv = iv_default(enc);
    }
    switch (enc) {
      case "A128CBC-HS256":
      case "A192CBC-HS384":
      case "A256CBC-HS512":
        if (cek instanceof Uint8Array) {
          check_cek_length_default(cek, parseInt(enc.slice(-3), 10));
        }
        return cbcEncrypt(enc, plaintext, cek, iv, aad);
      case "A128GCM":
      case "A192GCM":
      case "A256GCM":
        if (cek instanceof Uint8Array) {
          check_cek_length_default(cek, parseInt(enc.slice(1, 4), 10));
        }
        return gcmEncrypt(enc, plaintext, cek, iv, aad);
      default:
        throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
    }
  };

  // dist/webapi/lib/aesgcmkw.js
  async function wrap3(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    const wrapped = await encrypt_default(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return {
      encryptedKey: wrapped.ciphertext,
      iv: encode(wrapped.iv),
      tag: encode(wrapped.tag)
    };
  }
  async function unwrap3(alg, key, encryptedKey, iv, tag2) {
    const jweAlgorithm = alg.slice(0, 7);
    return decrypt_default(jweAlgorithm, key, encryptedKey, iv, tag2, new Uint8Array(0));
  }

  // dist/webapi/lib/decrypt_key_management.js
  var decrypt_key_management_default = async (alg, key, encryptedKey, joseHeader, options) => {
    switch (alg) {
      case "dir": {
        if (encryptedKey !== void 0)
          throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
        return key;
      }
      case "ECDH-ES":
        if (encryptedKey !== void 0)
          throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        if (!is_object_default(joseHeader.epk))
          throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
        assertCryptoKey(key);
        if (!allowed(key))
          throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
        const epk = await importJWK(joseHeader.epk, alg);
        assertCryptoKey(epk);
        let partyUInfo;
        let partyVInfo;
        if (joseHeader.apu !== void 0) {
          if (typeof joseHeader.apu !== "string")
            throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
          try {
            partyUInfo = decode(joseHeader.apu);
          } catch {
            throw new JWEInvalid("Failed to base64url decode the apu");
          }
        }
        if (joseHeader.apv !== void 0) {
          if (typeof joseHeader.apv !== "string")
            throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
          try {
            partyVInfo = decode(joseHeader.apv);
          } catch {
            throw new JWEInvalid("Failed to base64url decode the apv");
          }
        }
        const sharedSecret = await deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? bitLength2(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
        if (alg === "ECDH-ES")
          return sharedSecret;
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        return unwrap(alg.slice(-6), sharedSecret, encryptedKey);
      }
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        assertCryptoKey(key);
        return decrypt(alg, key, encryptedKey);
      }
      case "PBES2-HS256+A128KW":
      case "PBES2-HS384+A192KW":
      case "PBES2-HS512+A256KW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        if (typeof joseHeader.p2c !== "number")
          throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
        const p2cLimit = options?.maxPBES2Count || 1e4;
        if (joseHeader.p2c > p2cLimit)
          throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
        if (typeof joseHeader.p2s !== "string")
          throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
        let p2s;
        try {
          p2s = decode(joseHeader.p2s);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the p2s");
        }
        return unwrap2(alg, key, encryptedKey, joseHeader.p2c, p2s);
      }
      case "A128KW":
      case "A192KW":
      case "A256KW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        return unwrap(alg, key, encryptedKey);
      }
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW": {
        if (encryptedKey === void 0)
          throw new JWEInvalid("JWE Encrypted Key missing");
        if (typeof joseHeader.iv !== "string")
          throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
        if (typeof joseHeader.tag !== "string")
          throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
        let iv;
        try {
          iv = decode(joseHeader.iv);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the iv");
        }
        let tag2;
        try {
          tag2 = decode(joseHeader.tag);
        } catch {
          throw new JWEInvalid("Failed to base64url decode the tag");
        }
        return unwrap3(alg, key, encryptedKey, iv, tag2);
      }
      default: {
        throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
      }
    }
  };

  // dist/webapi/lib/validate_crit.js
  var validate_crit_default = (Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) => {
    if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
      throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === void 0) {
      return /* @__PURE__ */ new Set();
    }
    if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
      throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== void 0) {
      recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    } else {
      recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
      if (!recognized.has(parameter)) {
        throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
      }
      if (joseHeader[parameter] === void 0) {
        throw new Err(`Extension Header Parameter "${parameter}" is missing`);
      }
      if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
        throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
      }
    }
    return new Set(protectedHeader.crit);
  };

  // dist/webapi/lib/validate_algorithms.js
  var validate_algorithms_default = (option, algorithms) => {
    if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
      throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
      return void 0;
    }
    return new Set(algorithms);
  };

  // dist/webapi/lib/is_jwk.js
  function isJWK(key) {
    return is_object_default(key) && typeof key.kty === "string";
  }
  function isPrivateJWK(key) {
    return key.kty !== "oct" && typeof key.d === "string";
  }
  function isPublicJWK(key) {
    return key.kty !== "oct" && typeof key.d === "undefined";
  }
  function isSecretJWK(key) {
    return key.kty === "oct" && typeof key.k === "string";
  }

  // dist/webapi/lib/normalize_key.js
  var cache;
  var handleJWK = async (key, jwk, alg, freeze = false) => {
    cache ||= /* @__PURE__ */ new WeakMap();
    let cached = cache.get(key);
    if (cached?.[alg]) {
      return cached[alg];
    }
    const cryptoKey = await jwk_to_key_default({ ...jwk, alg });
    if (freeze)
      Object.freeze(key);
    if (!cached) {
      cache.set(key, { [alg]: cryptoKey });
    } else {
      cached[alg] = cryptoKey;
    }
    return cryptoKey;
  };
  var handleKeyObject = (keyObject, alg) => {
    cache ||= /* @__PURE__ */ new WeakMap();
    let cached = cache.get(keyObject);
    if (cached?.[alg]) {
      return cached[alg];
    }
    const isPublic = keyObject.type === "public";
    const extractable = isPublic ? true : false;
    let cryptoKey;
    if (keyObject.asymmetricKeyType === "x25519") {
      switch (alg) {
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          break;
        default:
          throw new TypeError("given KeyObject instance cannot be used for this algorithm");
      }
      cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, isPublic ? [] : ["deriveBits"]);
    }
    if (keyObject.asymmetricKeyType === "ed25519") {
      if (alg !== "EdDSA" && alg !== "Ed25519") {
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
      }
      cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [
        isPublic ? "verify" : "sign"
      ]);
    }
    if (keyObject.asymmetricKeyType === "rsa") {
      let hash;
      switch (alg) {
        case "RSA-OAEP":
          hash = "SHA-1";
          break;
        case "RS256":
        case "PS256":
        case "RSA-OAEP-256":
          hash = "SHA-256";
          break;
        case "RS384":
        case "PS384":
        case "RSA-OAEP-384":
          hash = "SHA-384";
          break;
        case "RS512":
        case "PS512":
        case "RSA-OAEP-512":
          hash = "SHA-512";
          break;
        default:
          throw new TypeError("given KeyObject instance cannot be used for this algorithm");
      }
      if (alg.startsWith("RSA-OAEP")) {
        return keyObject.toCryptoKey({
          name: "RSA-OAEP",
          hash
        }, extractable, isPublic ? ["encrypt"] : ["decrypt"]);
      }
      cryptoKey = keyObject.toCryptoKey({
        name: alg.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
        hash
      }, extractable, [isPublic ? "verify" : "sign"]);
    }
    if (keyObject.asymmetricKeyType === "ec") {
      const nist = /* @__PURE__ */ new Map([
        ["prime256v1", "P-256"],
        ["secp384r1", "P-384"],
        ["secp521r1", "P-521"]
      ]);
      const namedCurve = nist.get(keyObject.asymmetricKeyDetails?.namedCurve);
      if (!namedCurve) {
        throw new TypeError("given KeyObject instance cannot be used for this algorithm");
      }
      if (alg === "ES256" && namedCurve === "P-256") {
        cryptoKey = keyObject.toCryptoKey({
          name: "ECDSA",
          namedCurve
        }, extractable, [isPublic ? "verify" : "sign"]);
      }
      if (alg === "ES384" && namedCurve === "P-384") {
        cryptoKey = keyObject.toCryptoKey({
          name: "ECDSA",
          namedCurve
        }, extractable, [isPublic ? "verify" : "sign"]);
      }
      if (alg === "ES512" && namedCurve === "P-521") {
        cryptoKey = keyObject.toCryptoKey({
          name: "ECDSA",
          namedCurve
        }, extractable, [isPublic ? "verify" : "sign"]);
      }
      if (alg.startsWith("ECDH-ES")) {
        cryptoKey = keyObject.toCryptoKey({
          name: "ECDH",
          namedCurve
        }, extractable, isPublic ? [] : ["deriveBits"]);
      }
    }
    if (!cryptoKey) {
      throw new TypeError("given KeyObject instance cannot be used for this algorithm");
    }
    if (!cached) {
      cache.set(keyObject, { [alg]: cryptoKey });
    } else {
      cached[alg] = cryptoKey;
    }
    return cryptoKey;
  };
  var normalize_key_default = async (key, alg) => {
    if (key instanceof Uint8Array) {
      return key;
    }
    if (isCryptoKey(key)) {
      return key;
    }
    if (isKeyObject(key)) {
      if (key.type === "secret") {
        return key.export();
      }
      if ("toCryptoKey" in key && typeof key.toCryptoKey === "function") {
        try {
          return handleKeyObject(key, alg);
        } catch (err) {
          if (err instanceof TypeError) {
            throw err;
          }
        }
      }
      let jwk = key.export({ format: "jwk" });
      return handleJWK(key, jwk, alg);
    }
    if (isJWK(key)) {
      if (key.k) {
        return decode(key.k);
      }
      return handleJWK(key, key, alg, true);
    }
    throw new Error("unreachable");
  };

  // dist/webapi/lib/check_key_type.js
  var tag = (key) => key?.[Symbol.toStringTag];
  var jwkMatchesOp = (alg, key, usage) => {
    if (key.use !== void 0) {
      let expected;
      switch (usage) {
        case "sign":
        case "verify":
          expected = "sig";
          break;
        case "encrypt":
        case "decrypt":
          expected = "enc";
          break;
      }
      if (key.use !== expected) {
        throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
      }
    }
    if (key.alg !== void 0 && key.alg !== alg) {
      throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
    }
    if (Array.isArray(key.key_ops)) {
      let expectedKeyOp;
      switch (true) {
        case (usage === "sign" || usage === "verify"):
        case alg === "dir":
        case alg.includes("CBC-HS"):
          expectedKeyOp = usage;
          break;
        case alg.startsWith("PBES2"):
          expectedKeyOp = "deriveBits";
          break;
        case /^A\d{3}(?:GCM)?(?:KW)?$/.test(alg):
          if (!alg.includes("GCM") && alg.endsWith("KW")) {
            expectedKeyOp = usage === "encrypt" ? "wrapKey" : "unwrapKey";
          } else {
            expectedKeyOp = usage;
          }
          break;
        case (usage === "encrypt" && alg.startsWith("RSA")):
          expectedKeyOp = "wrapKey";
          break;
        case usage === "decrypt":
          expectedKeyOp = alg.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          break;
      }
      if (expectedKeyOp && key.key_ops?.includes?.(expectedKeyOp) === false) {
        throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
      }
    }
    return true;
  };
  var symmetricTypeCheck = (alg, key, usage) => {
    if (key instanceof Uint8Array)
      return;
    if (isJWK(key)) {
      if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
        return;
      throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
    }
    if (!is_key_like_default(key)) {
      throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
    }
    if (key.type !== "secret") {
      throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
    }
  };
  var asymmetricTypeCheck = (alg, key, usage) => {
    if (isJWK(key)) {
      switch (usage) {
        case "decrypt":
        case "sign":
          if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
            return;
          throw new TypeError(`JSON Web Key for this operation be a private JWK`);
        case "encrypt":
        case "verify":
          if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
            return;
          throw new TypeError(`JSON Web Key for this operation be a public JWK`);
      }
    }
    if (!is_key_like_default(key)) {
      throw new TypeError(withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
    }
    if (key.type === "secret") {
      throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (key.type === "public") {
      switch (usage) {
        case "sign":
          throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
        case "decrypt":
          throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
      }
    }
    if (key.type === "private") {
      switch (usage) {
        case "verify":
          throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
        case "encrypt":
          throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
      }
    }
  };
  var check_key_type_default = (alg, key, usage) => {
    const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A(?:128|192|256)(?:GCM)?(?:KW)?$/.test(alg) || /^A(?:128|192|256)CBC-HS(?:256|384|512)$/.test(alg);
    if (symmetric) {
      symmetricTypeCheck(alg, key, usage);
    } else {
      asymmetricTypeCheck(alg, key, usage);
    }
  };

  // dist/webapi/jwe/flattened/decrypt.js
  async function flattenedDecrypt(jwe, key, options) {
    if (!is_object_default(jwe)) {
      throw new JWEInvalid("Flattened JWE must be an object");
    }
    if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) {
      throw new JWEInvalid("JOSE Header missing");
    }
    if (jwe.iv !== void 0 && typeof jwe.iv !== "string") {
      throw new JWEInvalid("JWE Initialization Vector incorrect type");
    }
    if (typeof jwe.ciphertext !== "string") {
      throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
    }
    if (jwe.tag !== void 0 && typeof jwe.tag !== "string") {
      throw new JWEInvalid("JWE Authentication Tag incorrect type");
    }
    if (jwe.protected !== void 0 && typeof jwe.protected !== "string") {
      throw new JWEInvalid("JWE Protected Header incorrect type");
    }
    if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") {
      throw new JWEInvalid("JWE Encrypted Key incorrect type");
    }
    if (jwe.aad !== void 0 && typeof jwe.aad !== "string") {
      throw new JWEInvalid("JWE AAD incorrect type");
    }
    if (jwe.header !== void 0 && !is_object_default(jwe.header)) {
      throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
    }
    if (jwe.unprotected !== void 0 && !is_object_default(jwe.unprotected)) {
      throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
    }
    let parsedProt;
    if (jwe.protected) {
      try {
        const protectedHeader2 = decode(jwe.protected);
        parsedProt = JSON.parse(decoder.decode(protectedHeader2));
      } catch {
        throw new JWEInvalid("JWE Protected Header is invalid");
      }
    }
    if (!is_disjoint_default(parsedProt, jwe.header, jwe.unprotected)) {
      throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...parsedProt,
      ...jwe.header,
      ...jwe.unprotected
    };
    validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== void 0) {
      throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
    }
    if (typeof enc !== "string" || !enc) {
      throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
    }
    const keyManagementAlgorithms = options && validate_algorithms_default("keyManagementAlgorithms", options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options && validate_algorithms_default("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2")) {
      throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
      throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== void 0) {
      try {
        encryptedKey = decode(jwe.encrypted_key);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the encrypted_key");
      }
    }
    let resolvedKey = false;
    if (typeof key === "function") {
      key = await key(parsedProt, jwe);
      resolvedKey = true;
    }
    check_key_type_default(alg === "dir" ? enc : alg, key, "decrypt");
    const k = await normalize_key_default(key, alg);
    let cek;
    try {
      cek = await decrypt_key_management_default(alg, k, encryptedKey, joseHeader, options);
    } catch (err) {
      if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) {
        throw err;
      }
      cek = cek_default(enc);
    }
    let iv;
    let tag2;
    if (jwe.iv !== void 0) {
      try {
        iv = decode(jwe.iv);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the iv");
      }
    }
    if (jwe.tag !== void 0) {
      try {
        tag2 = decode(jwe.tag);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the tag");
      }
    }
    const protectedHeader = encoder.encode(jwe.protected ?? "");
    let additionalData;
    if (jwe.aad !== void 0) {
      additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(jwe.aad));
    } else {
      additionalData = protectedHeader;
    }
    let ciphertext;
    try {
      ciphertext = decode(jwe.ciphertext);
    } catch {
      throw new JWEInvalid("Failed to base64url decode the ciphertext");
    }
    const plaintext = await decrypt_default(enc, cek, ciphertext, iv, tag2, additionalData);
    const result = { plaintext };
    if (jwe.protected !== void 0) {
      result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== void 0) {
      try {
        result.additionalAuthenticatedData = decode(jwe.aad);
      } catch {
        throw new JWEInvalid("Failed to base64url decode the aad");
      }
    }
    if (jwe.unprotected !== void 0) {
      result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== void 0) {
      result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
      return { ...result, key: k };
    }
    return result;
  }

  // dist/webapi/jwe/compact/decrypt.js
  async function compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
      jwe = decoder.decode(jwe);
    }
    if (typeof jwe !== "string") {
      throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag2, length } = jwe.split(".");
    if (length !== 5) {
      throw new JWEInvalid("Invalid Compact JWE");
    }
    const decrypted = await flattenedDecrypt({
      ciphertext,
      iv: iv || void 0,
      protected: protectedHeader,
      tag: tag2 || void 0,
      encrypted_key: encryptedKey || void 0
    }, key, options);
    const result = { plaintext: decrypted.plaintext, protectedHeader: decrypted.protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: decrypted.key };
    }
    return result;
  }

  // dist/webapi/jwe/general/decrypt.js
  async function generalDecrypt(jwe, key, options) {
    if (!is_object_default(jwe)) {
      throw new JWEInvalid("General JWE must be an object");
    }
    if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(is_object_default)) {
      throw new JWEInvalid("JWE Recipients missing or incorrect type");
    }
    if (!jwe.recipients.length) {
      throw new JWEInvalid("JWE Recipients has no members");
    }
    for (const recipient of jwe.recipients) {
      try {
        return await flattenedDecrypt({
          aad: jwe.aad,
          ciphertext: jwe.ciphertext,
          encrypted_key: recipient.encrypted_key,
          header: recipient.header,
          iv: jwe.iv,
          protected: jwe.protected,
          tag: jwe.tag,
          unprotected: jwe.unprotected
        }, key, options);
      } catch {
      }
    }
    throw new JWEDecryptionFailed();
  }

  // dist/webapi/lib/private_symbols.js
  var unprotected = Symbol();

  // dist/webapi/lib/key_to_jwk.js
  async function keyToJWK(key) {
    if (isKeyObject(key)) {
      if (key.type === "secret") {
        key = key.export();
      } else {
        return key.export({ format: "jwk" });
      }
    }
    if (key instanceof Uint8Array) {
      return {
        kty: "oct",
        k: encode(key)
      };
    }
    if (!isCryptoKey(key)) {
      throw new TypeError(invalid_key_input_default(key, "CryptoKey", "KeyObject", "Uint8Array"));
    }
    if (!key.extractable) {
      throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
    }
    const { ext, key_ops, alg, use, ...jwk } = await crypto.subtle.exportKey("jwk", key);
    return jwk;
  }

  // dist/webapi/key/export.js
  async function exportSPKI(key) {
    return toSPKI(key);
  }
  async function exportPKCS8(key) {
    return toPKCS8(key);
  }
  async function exportJWK(key) {
    return keyToJWK(key);
  }

  // dist/webapi/lib/encrypt_key_management.js
  var encrypt_key_management_default = async (alg, enc, key, providedCek, providedParameters = {}) => {
    let encryptedKey;
    let parameters;
    let cek;
    switch (alg) {
      case "dir": {
        cek = key;
        break;
      }
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        assertCryptoKey(key);
        if (!allowed(key)) {
          throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
        }
        const { apu, apv } = providedParameters;
        let ephemeralKey;
        if (providedParameters.epk) {
          ephemeralKey = await normalize_key_default(providedParameters.epk, alg);
        } else {
          ephemeralKey = (await crypto.subtle.generateKey(key.algorithm, true, ["deriveBits"])).privateKey;
        }
        const { x, y, crv, kty } = await exportJWK(ephemeralKey);
        const sharedSecret = await deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? bitLength2(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
        parameters = { epk: { x, crv, kty } };
        if (kty === "EC")
          parameters.epk.y = y;
        if (apu)
          parameters.apu = encode(apu);
        if (apv)
          parameters.apv = encode(apv);
        if (alg === "ECDH-ES") {
          cek = sharedSecret;
          break;
        }
        cek = providedCek || cek_default(enc);
        const kwAlg = alg.slice(-6);
        encryptedKey = await wrap(kwAlg, sharedSecret, cek);
        break;
      }
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512": {
        cek = providedCek || cek_default(enc);
        assertCryptoKey(key);
        encryptedKey = await encrypt(alg, key, cek);
        break;
      }
      case "PBES2-HS256+A128KW":
      case "PBES2-HS384+A192KW":
      case "PBES2-HS512+A256KW": {
        cek = providedCek || cek_default(enc);
        const { p2c, p2s } = providedParameters;
        ({ encryptedKey, ...parameters } = await wrap2(alg, key, cek, p2c, p2s));
        break;
      }
      case "A128KW":
      case "A192KW":
      case "A256KW": {
        cek = providedCek || cek_default(enc);
        encryptedKey = await wrap(alg, key, cek);
        break;
      }
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW": {
        cek = providedCek || cek_default(enc);
        const { iv } = providedParameters;
        ({ encryptedKey, ...parameters } = await wrap3(alg, key, cek, iv));
        break;
      }
      default: {
        throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
      }
    }
    return { cek, encryptedKey, parameters };
  };

  // dist/webapi/jwe/flattened/encrypt.js
  var FlattenedEncrypt = class {
    #plaintext;
    #protectedHeader;
    #sharedUnprotectedHeader;
    #unprotectedHeader;
    #aad;
    #cek;
    #iv;
    #keyManagementParameters;
    constructor(plaintext) {
      if (!(plaintext instanceof Uint8Array)) {
        throw new TypeError("plaintext must be an instance of Uint8Array");
      }
      this.#plaintext = plaintext;
    }
    setKeyManagementParameters(parameters) {
      if (this.#keyManagementParameters) {
        throw new TypeError("setKeyManagementParameters can only be called once");
      }
      this.#keyManagementParameters = parameters;
      return this;
    }
    setProtectedHeader(protectedHeader) {
      if (this.#protectedHeader) {
        throw new TypeError("setProtectedHeader can only be called once");
      }
      this.#protectedHeader = protectedHeader;
      return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
      if (this.#sharedUnprotectedHeader) {
        throw new TypeError("setSharedUnprotectedHeader can only be called once");
      }
      this.#sharedUnprotectedHeader = sharedUnprotectedHeader;
      return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
      if (this.#unprotectedHeader) {
        throw new TypeError("setUnprotectedHeader can only be called once");
      }
      this.#unprotectedHeader = unprotectedHeader;
      return this;
    }
    setAdditionalAuthenticatedData(aad) {
      this.#aad = aad;
      return this;
    }
    setContentEncryptionKey(cek) {
      if (this.#cek) {
        throw new TypeError("setContentEncryptionKey can only be called once");
      }
      this.#cek = cek;
      return this;
    }
    setInitializationVector(iv) {
      if (this.#iv) {
        throw new TypeError("setInitializationVector can only be called once");
      }
      this.#iv = iv;
      return this;
    }
    async encrypt(key, options) {
      if (!this.#protectedHeader && !this.#unprotectedHeader && !this.#sharedUnprotectedHeader) {
        throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
      }
      if (!is_disjoint_default(this.#protectedHeader, this.#unprotectedHeader, this.#sharedUnprotectedHeader)) {
        throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
      }
      const joseHeader = {
        ...this.#protectedHeader,
        ...this.#unprotectedHeader,
        ...this.#sharedUnprotectedHeader
      };
      validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, this.#protectedHeader, joseHeader);
      if (joseHeader.zip !== void 0) {
        throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
      }
      const { alg, enc } = joseHeader;
      if (typeof alg !== "string" || !alg) {
        throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
      }
      if (typeof enc !== "string" || !enc) {
        throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
      }
      let encryptedKey;
      if (this.#cek && (alg === "dir" || alg === "ECDH-ES")) {
        throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
      }
      check_key_type_default(alg === "dir" ? enc : alg, key, "encrypt");
      let cek;
      {
        let parameters;
        const k = await normalize_key_default(key, alg);
        ({ cek, encryptedKey, parameters } = await encrypt_key_management_default(alg, enc, k, this.#cek, this.#keyManagementParameters));
        if (parameters) {
          if (options && unprotected in options) {
            if (!this.#unprotectedHeader) {
              this.setUnprotectedHeader(parameters);
            } else {
              this.#unprotectedHeader = { ...this.#unprotectedHeader, ...parameters };
            }
          } else if (!this.#protectedHeader) {
            this.setProtectedHeader(parameters);
          } else {
            this.#protectedHeader = { ...this.#protectedHeader, ...parameters };
          }
        }
      }
      let additionalData;
      let protectedHeader;
      let aadMember;
      if (this.#protectedHeader) {
        protectedHeader = encoder.encode(encode(JSON.stringify(this.#protectedHeader)));
      } else {
        protectedHeader = encoder.encode("");
      }
      if (this.#aad) {
        aadMember = encode(this.#aad);
        additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(aadMember));
      } else {
        additionalData = protectedHeader;
      }
      const { ciphertext, tag: tag2, iv } = await encrypt_default(enc, this.#plaintext, cek, this.#iv, additionalData);
      const jwe = {
        ciphertext: encode(ciphertext)
      };
      if (iv) {
        jwe.iv = encode(iv);
      }
      if (tag2) {
        jwe.tag = encode(tag2);
      }
      if (encryptedKey) {
        jwe.encrypted_key = encode(encryptedKey);
      }
      if (aadMember) {
        jwe.aad = aadMember;
      }
      if (this.#protectedHeader) {
        jwe.protected = decoder.decode(protectedHeader);
      }
      if (this.#sharedUnprotectedHeader) {
        jwe.unprotected = this.#sharedUnprotectedHeader;
      }
      if (this.#unprotectedHeader) {
        jwe.header = this.#unprotectedHeader;
      }
      return jwe;
    }
  };

  // dist/webapi/jwe/general/encrypt.js
  var IndividualRecipient = class {
    #parent;
    unprotectedHeader;
    key;
    options;
    constructor(enc, key, options) {
      this.#parent = enc;
      this.key = key;
      this.options = options;
    }
    setUnprotectedHeader(unprotectedHeader) {
      if (this.unprotectedHeader) {
        throw new TypeError("setUnprotectedHeader can only be called once");
      }
      this.unprotectedHeader = unprotectedHeader;
      return this;
    }
    addRecipient(...args) {
      return this.#parent.addRecipient(...args);
    }
    encrypt(...args) {
      return this.#parent.encrypt(...args);
    }
    done() {
      return this.#parent;
    }
  };
  var GeneralEncrypt = class {
    #plaintext;
    #recipients = [];
    #protectedHeader;
    #unprotectedHeader;
    #aad;
    constructor(plaintext) {
      this.#plaintext = plaintext;
    }
    addRecipient(key, options) {
      const recipient = new IndividualRecipient(this, key, { crit: options?.crit });
      this.#recipients.push(recipient);
      return recipient;
    }
    setProtectedHeader(protectedHeader) {
      if (this.#protectedHeader) {
        throw new TypeError("setProtectedHeader can only be called once");
      }
      this.#protectedHeader = protectedHeader;
      return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
      if (this.#unprotectedHeader) {
        throw new TypeError("setSharedUnprotectedHeader can only be called once");
      }
      this.#unprotectedHeader = sharedUnprotectedHeader;
      return this;
    }
    setAdditionalAuthenticatedData(aad) {
      this.#aad = aad;
      return this;
    }
    async encrypt() {
      if (!this.#recipients.length) {
        throw new JWEInvalid("at least one recipient must be added");
      }
      if (this.#recipients.length === 1) {
        const [recipient] = this.#recipients;
        const flattened = await new FlattenedEncrypt(this.#plaintext).setAdditionalAuthenticatedData(this.#aad).setProtectedHeader(this.#protectedHeader).setSharedUnprotectedHeader(this.#unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).encrypt(recipient.key, { ...recipient.options });
        const jwe2 = {
          ciphertext: flattened.ciphertext,
          iv: flattened.iv,
          recipients: [{}],
          tag: flattened.tag
        };
        if (flattened.aad)
          jwe2.aad = flattened.aad;
        if (flattened.protected)
          jwe2.protected = flattened.protected;
        if (flattened.unprotected)
          jwe2.unprotected = flattened.unprotected;
        if (flattened.encrypted_key)
          jwe2.recipients[0].encrypted_key = flattened.encrypted_key;
        if (flattened.header)
          jwe2.recipients[0].header = flattened.header;
        return jwe2;
      }
      let enc;
      for (let i = 0; i < this.#recipients.length; i++) {
        const recipient = this.#recipients[i];
        if (!is_disjoint_default(this.#protectedHeader, this.#unprotectedHeader, recipient.unprotectedHeader)) {
          throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
        }
        const joseHeader = {
          ...this.#protectedHeader,
          ...this.#unprotectedHeader,
          ...recipient.unprotectedHeader
        };
        const { alg } = joseHeader;
        if (typeof alg !== "string" || !alg) {
          throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (alg === "dir" || alg === "ECDH-ES") {
          throw new JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
        }
        if (typeof joseHeader.enc !== "string" || !joseHeader.enc) {
          throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        if (!enc) {
          enc = joseHeader.enc;
        } else if (enc !== joseHeader.enc) {
          throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
        }
        validate_crit_default(JWEInvalid, /* @__PURE__ */ new Map(), recipient.options.crit, this.#protectedHeader, joseHeader);
        if (joseHeader.zip !== void 0) {
          throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
        }
      }
      const cek = cek_default(enc);
      const jwe = {
        ciphertext: "",
        iv: "",
        recipients: [],
        tag: ""
      };
      for (let i = 0; i < this.#recipients.length; i++) {
        const recipient = this.#recipients[i];
        const target = {};
        jwe.recipients.push(target);
        const joseHeader = {
          ...this.#protectedHeader,
          ...this.#unprotectedHeader,
          ...recipient.unprotectedHeader
        };
        const p2c = joseHeader.alg.startsWith("PBES2") ? 2048 + i : void 0;
        if (i === 0) {
          const flattened = await new FlattenedEncrypt(this.#plaintext).setAdditionalAuthenticatedData(this.#aad).setContentEncryptionKey(cek).setProtectedHeader(this.#protectedHeader).setSharedUnprotectedHeader(this.#unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).setKeyManagementParameters({ p2c }).encrypt(recipient.key, {
            ...recipient.options,
            [unprotected]: true
          });
          jwe.ciphertext = flattened.ciphertext;
          jwe.iv = flattened.iv;
          jwe.tag = flattened.tag;
          if (flattened.aad)
            jwe.aad = flattened.aad;
          if (flattened.protected)
            jwe.protected = flattened.protected;
          if (flattened.unprotected)
            jwe.unprotected = flattened.unprotected;
          target.encrypted_key = flattened.encrypted_key;
          if (flattened.header)
            target.header = flattened.header;
          continue;
        }
        const alg = recipient.unprotectedHeader?.alg || this.#protectedHeader?.alg || this.#unprotectedHeader?.alg;
        check_key_type_default(alg === "dir" ? enc : alg, recipient.key, "encrypt");
        const k = await normalize_key_default(recipient.key, alg);
        const { encryptedKey, parameters } = await encrypt_key_management_default(alg, enc, k, cek, { p2c });
        target.encrypted_key = encode(encryptedKey);
        if (recipient.unprotectedHeader || parameters)
          target.header = { ...recipient.unprotectedHeader, ...parameters };
      }
      return jwe;
    }
  };

  // dist/webapi/lib/subtle_dsa.js
  var subtle_dsa_default = (alg, algorithm) => {
    const hash = `SHA-${alg.slice(-3)}`;
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512":
        return { hash, name: "HMAC" };
      case "PS256":
      case "PS384":
      case "PS512":
        return { hash, name: "RSA-PSS", saltLength: parseInt(alg.slice(-3), 10) >> 3 };
      case "RS256":
      case "RS384":
      case "RS512":
        return { hash, name: "RSASSA-PKCS1-v1_5" };
      case "ES256":
      case "ES384":
      case "ES512":
        return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
      case "Ed25519":
      case "EdDSA":
        return { name: "Ed25519" };
      default:
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
  };

  // dist/webapi/lib/get_sign_verify_key.js
  var get_sign_verify_key_default = async (alg, key, usage) => {
    if (key instanceof Uint8Array) {
      if (!alg.startsWith("HS")) {
        throw new TypeError(invalid_key_input_default(key, "CryptoKey", "KeyObject", "JSON Web Key"));
      }
      return crypto.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
    }
    checkSigCryptoKey(key, alg, usage);
    return key;
  };

  // dist/webapi/lib/verify.js
  var verify_default = async (alg, key, signature, data) => {
    const cryptoKey = await get_sign_verify_key_default(alg, key, "verify");
    check_key_length_default(alg, cryptoKey);
    const algorithm = subtle_dsa_default(alg, cryptoKey.algorithm);
    try {
      return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
    } catch {
      return false;
    }
  };

  // dist/webapi/jws/flattened/verify.js
  async function flattenedVerify(jws, key, options) {
    if (!is_object_default(jws)) {
      throw new JWSInvalid("Flattened JWS must be an object");
    }
    if (jws.protected === void 0 && jws.header === void 0) {
      throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== void 0 && typeof jws.protected !== "string") {
      throw new JWSInvalid("JWS Protected Header incorrect type");
    }
    if (jws.payload === void 0) {
      throw new JWSInvalid("JWS Payload missing");
    }
    if (typeof jws.signature !== "string") {
      throw new JWSInvalid("JWS Signature missing or incorrect type");
    }
    if (jws.header !== void 0 && !is_object_default(jws.header)) {
      throw new JWSInvalid("JWS Unprotected Header incorrect type");
    }
    let parsedProt = {};
    if (jws.protected) {
      try {
        const protectedHeader = decode(jws.protected);
        parsedProt = JSON.parse(decoder.decode(protectedHeader));
      } catch {
        throw new JWSInvalid("JWS Protected Header is invalid");
      }
    }
    if (!is_disjoint_default(parsedProt, jws.header)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...parsedProt,
      ...jws.header
    };
    const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
      b64 = parsedProt.b64;
      if (typeof b64 !== "boolean") {
        throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
      throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (b64) {
      if (typeof jws.payload !== "string") {
        throw new JWSInvalid("JWS Payload must be a string");
      }
    } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
      throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
    }
    let resolvedKey = false;
    if (typeof key === "function") {
      key = await key(parsedProt, jws);
      resolvedKey = true;
    }
    check_key_type_default(alg, key, "verify");
    const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
    let signature;
    try {
      signature = decode(jws.signature);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the signature");
    }
    const k = await normalize_key_default(key, alg);
    const verified = await verify_default(alg, k, signature, data);
    if (!verified) {
      throw new JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
      try {
        payload = decode(jws.payload);
      } catch {
        throw new JWSInvalid("Failed to base64url decode the payload");
      }
    } else if (typeof jws.payload === "string") {
      payload = encoder.encode(jws.payload);
    } else {
      payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== void 0) {
      result.protectedHeader = parsedProt;
    }
    if (jws.header !== void 0) {
      result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
      return { ...result, key: k };
    }
    return result;
  }

  // dist/webapi/jws/compact/verify.js
  async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
      jws = decoder.decode(jws);
    }
    if (typeof jws !== "string") {
      throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
    if (length !== 3) {
      throw new JWSInvalid("Invalid Compact JWS");
    }
    const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
    const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: verified.key };
    }
    return result;
  }

  // dist/webapi/jws/general/verify.js
  async function generalVerify(jws, key, options) {
    if (!is_object_default(jws)) {
      throw new JWSInvalid("General JWS must be an object");
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(is_object_default)) {
      throw new JWSInvalid("JWS Signatures missing or incorrect type");
    }
    for (const signature of jws.signatures) {
      try {
        return await flattenedVerify({
          header: signature.header,
          payload: jws.payload,
          protected: signature.protected,
          signature: signature.signature
        }, key, options);
      } catch {
      }
    }
    throw new JWSSignatureVerificationFailed();
  }

  // dist/webapi/lib/epoch.js
  var epoch_default = (date) => Math.floor(date.getTime() / 1e3);

  // dist/webapi/lib/secs.js
  var minute = 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var year = day * 365.25;
  var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
  var secs_default = (str) => {
    const matched = REGEX.exec(str);
    if (!matched || matched[4] && matched[1]) {
      throw new TypeError("Invalid time period format");
    }
    const value = parseFloat(matched[2]);
    const unit = matched[3].toLowerCase();
    let numericDate;
    switch (unit) {
      case "sec":
      case "secs":
      case "second":
      case "seconds":
      case "s":
        numericDate = Math.round(value);
        break;
      case "minute":
      case "minutes":
      case "min":
      case "mins":
      case "m":
        numericDate = Math.round(value * minute);
        break;
      case "hour":
      case "hours":
      case "hr":
      case "hrs":
      case "h":
        numericDate = Math.round(value * hour);
        break;
      case "day":
      case "days":
      case "d":
        numericDate = Math.round(value * day);
        break;
      case "week":
      case "weeks":
      case "w":
        numericDate = Math.round(value * week);
        break;
      default:
        numericDate = Math.round(value * year);
        break;
    }
    if (matched[1] === "-" || matched[4] === "ago") {
      return -numericDate;
    }
    return numericDate;
  };

  // dist/webapi/lib/jwt_claims_set.js
  function validateInput(label, input) {
    if (!Number.isFinite(input)) {
      throw new TypeError(`Invalid ${label} input`);
    }
    return input;
  }
  var normalizeTyp = (value) => {
    if (value.includes("/")) {
      return value.toLowerCase();
    }
    return `application/${value.toLowerCase()}`;
  };
  var checkAudiencePresence = (audPayload, audOption) => {
    if (typeof audPayload === "string") {
      return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
      return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
  };
  function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
    let payload;
    try {
      payload = JSON.parse(decoder.decode(encodedPayload));
    } catch {
    }
    if (!is_object_default(payload)) {
      throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
    }
    const { typ } = options;
    if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
      throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
    }
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
    const presenceCheck = [...requiredClaims];
    if (maxTokenAge !== void 0)
      presenceCheck.push("iat");
    if (audience !== void 0)
      presenceCheck.push("aud");
    if (subject !== void 0)
      presenceCheck.push("sub");
    if (issuer !== void 0)
      presenceCheck.push("iss");
    for (const claim of new Set(presenceCheck.reverse())) {
      if (!(claim in payload)) {
        throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
      }
    }
    if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
      throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
    }
    if (subject && payload.sub !== subject) {
      throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
    }
    if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
      throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
    }
    let tolerance;
    switch (typeof options.clockTolerance) {
      case "string":
        tolerance = secs_default(options.clockTolerance);
        break;
      case "number":
        tolerance = options.clockTolerance;
        break;
      case "undefined":
        tolerance = 0;
        break;
      default:
        throw new TypeError("Invalid clockTolerance option type");
    }
    const { currentDate } = options;
    const now = epoch_default(currentDate || /* @__PURE__ */ new Date());
    if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
      throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
    }
    if (payload.nbf !== void 0) {
      if (typeof payload.nbf !== "number") {
        throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
      }
      if (payload.nbf > now + tolerance) {
        throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
      }
    }
    if (payload.exp !== void 0) {
      if (typeof payload.exp !== "number") {
        throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
      }
      if (payload.exp <= now - tolerance) {
        throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
      }
    }
    if (maxTokenAge) {
      const age = now - payload.iat;
      const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
      if (age - tolerance > max) {
        throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
      }
      if (age < 0 - tolerance) {
        throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
      }
    }
    return payload;
  }
  var JWTClaimsBuilder = class {
    #payload;
    constructor(payload) {
      if (!is_object_default(payload)) {
        throw new TypeError("JWT Claims Set MUST be an object");
      }
      this.#payload = structuredClone(payload);
    }
    data() {
      return encoder.encode(JSON.stringify(this.#payload));
    }
    get iss() {
      return this.#payload.iss;
    }
    set iss(value) {
      this.#payload.iss = value;
    }
    get sub() {
      return this.#payload.sub;
    }
    set sub(value) {
      this.#payload.sub = value;
    }
    get aud() {
      return this.#payload.aud;
    }
    set aud(value) {
      this.#payload.aud = value;
    }
    set jti(value) {
      this.#payload.jti = value;
    }
    set nbf(value) {
      if (typeof value === "number") {
        this.#payload.nbf = validateInput("setNotBefore", value);
      } else if (value instanceof Date) {
        this.#payload.nbf = validateInput("setNotBefore", epoch_default(value));
      } else {
        this.#payload.nbf = epoch_default(/* @__PURE__ */ new Date()) + secs_default(value);
      }
    }
    set exp(value) {
      if (typeof value === "number") {
        this.#payload.exp = validateInput("setExpirationTime", value);
      } else if (value instanceof Date) {
        this.#payload.exp = validateInput("setExpirationTime", epoch_default(value));
      } else {
        this.#payload.exp = epoch_default(/* @__PURE__ */ new Date()) + secs_default(value);
      }
    }
    set iat(value) {
      if (typeof value === "undefined") {
        this.#payload.iat = epoch_default(/* @__PURE__ */ new Date());
      } else if (value instanceof Date) {
        this.#payload.iat = validateInput("setIssuedAt", epoch_default(value));
      } else if (typeof value === "string") {
        this.#payload.iat = validateInput("setIssuedAt", epoch_default(/* @__PURE__ */ new Date()) + secs_default(value));
      } else {
        this.#payload.iat = validateInput("setIssuedAt", value);
      }
    }
  };

  // dist/webapi/jwt/verify.js
  async function jwtVerify(jwt, key, options) {
    const verified = await compactVerify(jwt, key, options);
    if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
      throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    const payload = validateClaimsSet(verified.protectedHeader, verified.payload, options);
    const result = { payload, protectedHeader: verified.protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: verified.key };
    }
    return result;
  }

  // dist/webapi/jwt/decrypt.js
  async function jwtDecrypt(jwt, key, options) {
    const decrypted = await compactDecrypt(jwt, key, options);
    const payload = validateClaimsSet(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) {
      throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', payload, "iss", "mismatch");
    }
    if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) {
      throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', payload, "sub", "mismatch");
    }
    if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
      throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', payload, "aud", "mismatch");
    }
    const result = { payload, protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: decrypted.key };
    }
    return result;
  }

  // dist/webapi/jwe/compact/encrypt.js
  var CompactEncrypt = class {
    #flattened;
    constructor(plaintext) {
      this.#flattened = new FlattenedEncrypt(plaintext);
    }
    setContentEncryptionKey(cek) {
      this.#flattened.setContentEncryptionKey(cek);
      return this;
    }
    setInitializationVector(iv) {
      this.#flattened.setInitializationVector(iv);
      return this;
    }
    setProtectedHeader(protectedHeader) {
      this.#flattened.setProtectedHeader(protectedHeader);
      return this;
    }
    setKeyManagementParameters(parameters) {
      this.#flattened.setKeyManagementParameters(parameters);
      return this;
    }
    async encrypt(key, options) {
      const jwe = await this.#flattened.encrypt(key, options);
      return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join(".");
    }
  };

  // dist/webapi/lib/sign.js
  var sign_default = async (alg, key, data) => {
    const cryptoKey = await get_sign_verify_key_default(alg, key, "sign");
    check_key_length_default(alg, cryptoKey);
    const signature = await crypto.subtle.sign(subtle_dsa_default(alg, cryptoKey.algorithm), cryptoKey, data);
    return new Uint8Array(signature);
  };

  // dist/webapi/jws/flattened/sign.js
  var FlattenedSign = class {
    #payload;
    #protectedHeader;
    #unprotectedHeader;
    constructor(payload) {
      if (!(payload instanceof Uint8Array)) {
        throw new TypeError("payload must be an instance of Uint8Array");
      }
      this.#payload = payload;
    }
    setProtectedHeader(protectedHeader) {
      if (this.#protectedHeader) {
        throw new TypeError("setProtectedHeader can only be called once");
      }
      this.#protectedHeader = protectedHeader;
      return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
      if (this.#unprotectedHeader) {
        throw new TypeError("setUnprotectedHeader can only be called once");
      }
      this.#unprotectedHeader = unprotectedHeader;
      return this;
    }
    async sign(key, options) {
      if (!this.#protectedHeader && !this.#unprotectedHeader) {
        throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
      }
      if (!is_disjoint_default(this.#protectedHeader, this.#unprotectedHeader)) {
        throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
      }
      const joseHeader = {
        ...this.#protectedHeader,
        ...this.#unprotectedHeader
      };
      const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, this.#protectedHeader, joseHeader);
      let b64 = true;
      if (extensions.has("b64")) {
        b64 = this.#protectedHeader.b64;
        if (typeof b64 !== "boolean") {
          throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
      }
      const { alg } = joseHeader;
      if (typeof alg !== "string" || !alg) {
        throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
      }
      check_key_type_default(alg, key, "sign");
      let payload = this.#payload;
      if (b64) {
        payload = encoder.encode(encode(payload));
      }
      let protectedHeader;
      if (this.#protectedHeader) {
        protectedHeader = encoder.encode(encode(JSON.stringify(this.#protectedHeader)));
      } else {
        protectedHeader = encoder.encode("");
      }
      const data = concat(protectedHeader, encoder.encode("."), payload);
      const k = await normalize_key_default(key, alg);
      const signature = await sign_default(alg, k, data);
      const jws = {
        signature: encode(signature),
        payload: ""
      };
      if (b64) {
        jws.payload = decoder.decode(payload);
      }
      if (this.#unprotectedHeader) {
        jws.header = this.#unprotectedHeader;
      }
      if (this.#protectedHeader) {
        jws.protected = decoder.decode(protectedHeader);
      }
      return jws;
    }
  };

  // dist/webapi/jws/compact/sign.js
  var CompactSign = class {
    #flattened;
    constructor(payload) {
      this.#flattened = new FlattenedSign(payload);
    }
    setProtectedHeader(protectedHeader) {
      this.#flattened.setProtectedHeader(protectedHeader);
      return this;
    }
    async sign(key, options) {
      const jws = await this.#flattened.sign(key, options);
      if (jws.payload === void 0) {
        throw new TypeError("use the flattened module for creating JWS with b64: false");
      }
      return `${jws.protected}.${jws.payload}.${jws.signature}`;
    }
  };

  // dist/webapi/jws/general/sign.js
  var IndividualSignature = class {
    #parent;
    protectedHeader;
    unprotectedHeader;
    options;
    key;
    constructor(sig, key, options) {
      this.#parent = sig;
      this.key = key;
      this.options = options;
    }
    setProtectedHeader(protectedHeader) {
      if (this.protectedHeader) {
        throw new TypeError("setProtectedHeader can only be called once");
      }
      this.protectedHeader = protectedHeader;
      return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
      if (this.unprotectedHeader) {
        throw new TypeError("setUnprotectedHeader can only be called once");
      }
      this.unprotectedHeader = unprotectedHeader;
      return this;
    }
    addSignature(...args) {
      return this.#parent.addSignature(...args);
    }
    sign(...args) {
      return this.#parent.sign(...args);
    }
    done() {
      return this.#parent;
    }
  };
  var GeneralSign = class {
    #payload;
    #signatures = [];
    constructor(payload) {
      this.#payload = payload;
    }
    addSignature(key, options) {
      const signature = new IndividualSignature(this, key, options);
      this.#signatures.push(signature);
      return signature;
    }
    async sign() {
      if (!this.#signatures.length) {
        throw new JWSInvalid("at least one signature must be added");
      }
      const jws = {
        signatures: [],
        payload: ""
      };
      for (let i = 0; i < this.#signatures.length; i++) {
        const signature = this.#signatures[i];
        const flattened = new FlattenedSign(this.#payload);
        flattened.setProtectedHeader(signature.protectedHeader);
        flattened.setUnprotectedHeader(signature.unprotectedHeader);
        const { payload, ...rest } = await flattened.sign(signature.key, signature.options);
        if (i === 0) {
          jws.payload = payload;
        } else if (jws.payload !== payload) {
          throw new JWSInvalid("inconsistent use of JWS Unencoded Payload (RFC7797)");
        }
        jws.signatures.push(rest);
      }
      return jws;
    }
  };

  // dist/webapi/jwt/sign.js
  var SignJWT = class {
    #protectedHeader;
    #jwt;
    constructor(payload = {}) {
      this.#jwt = new JWTClaimsBuilder(payload);
    }
    setIssuer(issuer) {
      this.#jwt.iss = issuer;
      return this;
    }
    setSubject(subject) {
      this.#jwt.sub = subject;
      return this;
    }
    setAudience(audience) {
      this.#jwt.aud = audience;
      return this;
    }
    setJti(jwtId) {
      this.#jwt.jti = jwtId;
      return this;
    }
    setNotBefore(input) {
      this.#jwt.nbf = input;
      return this;
    }
    setExpirationTime(input) {
      this.#jwt.exp = input;
      return this;
    }
    setIssuedAt(input) {
      this.#jwt.iat = input;
      return this;
    }
    setProtectedHeader(protectedHeader) {
      this.#protectedHeader = protectedHeader;
      return this;
    }
    async sign(key, options) {
      const sig = new CompactSign(this.#jwt.data());
      sig.setProtectedHeader(this.#protectedHeader);
      if (Array.isArray(this.#protectedHeader?.crit) && this.#protectedHeader.crit.includes("b64") && this.#protectedHeader.b64 === false) {
        throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
      }
      return sig.sign(key, options);
    }
  };

  // dist/webapi/jwt/encrypt.js
  var EncryptJWT = class {
    #cek;
    #iv;
    #keyManagementParameters;
    #protectedHeader;
    #replicateIssuerAsHeader;
    #replicateSubjectAsHeader;
    #replicateAudienceAsHeader;
    #jwt;
    constructor(payload = {}) {
      this.#jwt = new JWTClaimsBuilder(payload);
    }
    setIssuer(issuer) {
      this.#jwt.iss = issuer;
      return this;
    }
    setSubject(subject) {
      this.#jwt.sub = subject;
      return this;
    }
    setAudience(audience) {
      this.#jwt.aud = audience;
      return this;
    }
    setJti(jwtId) {
      this.#jwt.jti = jwtId;
      return this;
    }
    setNotBefore(input) {
      this.#jwt.nbf = input;
      return this;
    }
    setExpirationTime(input) {
      this.#jwt.exp = input;
      return this;
    }
    setIssuedAt(input) {
      this.#jwt.iat = input;
      return this;
    }
    setProtectedHeader(protectedHeader) {
      if (this.#protectedHeader) {
        throw new TypeError("setProtectedHeader can only be called once");
      }
      this.#protectedHeader = protectedHeader;
      return this;
    }
    setKeyManagementParameters(parameters) {
      if (this.#keyManagementParameters) {
        throw new TypeError("setKeyManagementParameters can only be called once");
      }
      this.#keyManagementParameters = parameters;
      return this;
    }
    setContentEncryptionKey(cek) {
      if (this.#cek) {
        throw new TypeError("setContentEncryptionKey can only be called once");
      }
      this.#cek = cek;
      return this;
    }
    setInitializationVector(iv) {
      if (this.#iv) {
        throw new TypeError("setInitializationVector can only be called once");
      }
      this.#iv = iv;
      return this;
    }
    replicateIssuerAsHeader() {
      this.#replicateIssuerAsHeader = true;
      return this;
    }
    replicateSubjectAsHeader() {
      this.#replicateSubjectAsHeader = true;
      return this;
    }
    replicateAudienceAsHeader() {
      this.#replicateAudienceAsHeader = true;
      return this;
    }
    async encrypt(key, options) {
      const enc = new CompactEncrypt(this.#jwt.data());
      if (this.#protectedHeader && (this.#replicateIssuerAsHeader || this.#replicateSubjectAsHeader || this.#replicateAudienceAsHeader)) {
        this.#protectedHeader = {
          ...this.#protectedHeader,
          iss: this.#replicateIssuerAsHeader ? this.#jwt.iss : void 0,
          sub: this.#replicateSubjectAsHeader ? this.#jwt.sub : void 0,
          aud: this.#replicateAudienceAsHeader ? this.#jwt.aud : void 0
        };
      }
      enc.setProtectedHeader(this.#protectedHeader);
      if (this.#iv) {
        enc.setInitializationVector(this.#iv);
      }
      if (this.#cek) {
        enc.setContentEncryptionKey(this.#cek);
      }
      if (this.#keyManagementParameters) {
        enc.setKeyManagementParameters(this.#keyManagementParameters);
      }
      return enc.encrypt(key, options);
    }
  };

  // dist/webapi/jwk/thumbprint.js
  var check = (value, description) => {
    if (typeof value !== "string" || !value) {
      throw new JWKInvalid(`${description} missing or invalid`);
    }
  };
  async function calculateJwkThumbprint(key, digestAlgorithm) {
    let jwk;
    if (isJWK(key)) {
      jwk = key;
    } else if (is_key_like_default(key)) {
      jwk = await exportJWK(key);
    } else {
      throw new TypeError(invalid_key_input_default(key, "CryptoKey", "KeyObject", "JSON Web Key"));
    }
    digestAlgorithm ??= "sha256";
    if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") {
      throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch (jwk.kty) {
      case "EC":
        check(jwk.crv, '"crv" (Curve) Parameter');
        check(jwk.x, '"x" (X Coordinate) Parameter');
        check(jwk.y, '"y" (Y Coordinate) Parameter');
        components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
        break;
      case "OKP":
        check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
        check(jwk.x, '"x" (Public Key) Parameter');
        components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
        break;
      case "RSA":
        check(jwk.e, '"e" (Exponent) Parameter');
        check(jwk.n, '"n" (Modulus) Parameter');
        components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
        break;
      case "oct":
        check(jwk.k, '"k" (Key Value) Parameter');
        components = { k: jwk.k, kty: jwk.kty };
        break;
      default:
        throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encoder.encode(JSON.stringify(components));
    return encode(await digest_default(digestAlgorithm, data));
  }
  async function calculateJwkThumbprintUri(key, digestAlgorithm) {
    digestAlgorithm ??= "sha256";
    const thumbprint = await calculateJwkThumbprint(key, digestAlgorithm);
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
  }

  // dist/webapi/jwk/embedded.js
  async function EmbeddedJWK(protectedHeader, token) {
    const joseHeader = {
      ...protectedHeader,
      ...token?.header
    };
    if (!is_object_default(joseHeader.jwk)) {
      throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
    }
    const key = await importJWK({ ...joseHeader.jwk, ext: true }, joseHeader.alg);
    if (key instanceof Uint8Array || key.type !== "public") {
      throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
    }
    return key;
  }

  // dist/webapi/jwks/local.js
  function getKtyFromAlg(alg) {
    switch (typeof alg === "string" && alg.slice(0, 2)) {
      case "RS":
      case "PS":
        return "RSA";
      case "ES":
        return "EC";
      case "Ed":
        return "OKP";
      default:
        throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
    }
  }
  function isJWKSLike(jwks) {
    return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
  }
  function isJWKLike(key) {
    return is_object_default(key);
  }
  var LocalJWKSet = class {
    #jwks;
    #cached = /* @__PURE__ */ new WeakMap();
    constructor(jwks) {
      if (!isJWKSLike(jwks)) {
        throw new JWKSInvalid("JSON Web Key Set malformed");
      }
      this.#jwks = structuredClone(jwks);
    }
    jwks() {
      return this.#jwks;
    }
    async getKey(protectedHeader, token) {
      const { alg, kid } = { ...protectedHeader, ...token?.header };
      const kty = getKtyFromAlg(alg);
      const candidates = this.#jwks.keys.filter((jwk2) => {
        let candidate = kty === jwk2.kty;
        if (candidate && typeof kid === "string") {
          candidate = kid === jwk2.kid;
        }
        if (candidate && typeof jwk2.alg === "string") {
          candidate = alg === jwk2.alg;
        }
        if (candidate && typeof jwk2.use === "string") {
          candidate = jwk2.use === "sig";
        }
        if (candidate && Array.isArray(jwk2.key_ops)) {
          candidate = jwk2.key_ops.includes("verify");
        }
        if (candidate) {
          switch (alg) {
            case "ES256":
              candidate = jwk2.crv === "P-256";
              break;
            case "ES384":
              candidate = jwk2.crv === "P-384";
              break;
            case "ES512":
              candidate = jwk2.crv === "P-521";
              break;
            case "Ed25519":
            case "EdDSA":
              candidate = jwk2.crv === "Ed25519";
              break;
          }
        }
        return candidate;
      });
      const { 0: jwk, length } = candidates;
      if (length === 0) {
        throw new JWKSNoMatchingKey();
      }
      if (length !== 1) {
        const error = new JWKSMultipleMatchingKeys();
        const _cached = this.#cached;
        error[Symbol.asyncIterator] = async function* () {
          for (const jwk2 of candidates) {
            try {
              yield await importWithAlgCache(_cached, jwk2, alg);
            } catch {
            }
          }
        };
        throw error;
      }
      return importWithAlgCache(this.#cached, jwk, alg);
    }
  };
  async function importWithAlgCache(cache2, jwk, alg) {
    const cached = cache2.get(jwk) || cache2.set(jwk, {}).get(jwk);
    if (cached[alg] === void 0) {
      const key = await importJWK({ ...jwk, ext: true }, alg);
      if (key instanceof Uint8Array || key.type !== "public") {
        throw new JWKSInvalid("JSON Web Key Set members must be public keys");
      }
      cached[alg] = key;
    }
    return cached[alg];
  }
  function createLocalJWKSet(jwks) {
    const set = new LocalJWKSet(jwks);
    const localJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
    Object.defineProperties(localJWKSet, {
      jwks: {
        value: () => structuredClone(set.jwks()),
        enumerable: false,
        configurable: false,
        writable: false
      }
    });
    return localJWKSet;
  }

  // dist/webapi/jwks/remote.js
  function isCloudflareWorkers() {
    return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
  }
  var USER_AGENT;
  if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) {
    const NAME = "jose";
    const VERSION = "v6.0.11";
    USER_AGENT = `${NAME}/${VERSION}`;
  }
  var customFetch = Symbol();
  async function fetchJwks(url, headers, signal, fetchImpl = fetch) {
    const response = await fetchImpl(url, {
      method: "GET",
      signal,
      redirect: "manual",
      headers
    }).catch((err) => {
      if (err.name === "TimeoutError") {
        throw new JWKSTimeout();
      }
      throw err;
    });
    if (response.status !== 200) {
      throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
    }
    try {
      return await response.json();
    } catch {
      throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
    }
  }
  var jwksCache = Symbol();
  function isFreshJwksCache(input, cacheMaxAge) {
    if (typeof input !== "object" || input === null) {
      return false;
    }
    if (!("uat" in input) || typeof input.uat !== "number" || Date.now() - input.uat >= cacheMaxAge) {
      return false;
    }
    if (!("jwks" in input) || !is_object_default(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, is_object_default)) {
      return false;
    }
    return true;
  }
  var RemoteJWKSet = class {
    #url;
    #timeoutDuration;
    #cooldownDuration;
    #cacheMaxAge;
    #jwksTimestamp;
    #pendingFetch;
    #headers;
    #customFetch;
    #local;
    #cache;
    constructor(url, options) {
      if (!(url instanceof URL)) {
        throw new TypeError("url must be an instance of URL");
      }
      this.#url = new URL(url.href);
      this.#timeoutDuration = typeof options?.timeoutDuration === "number" ? options?.timeoutDuration : 5e3;
      this.#cooldownDuration = typeof options?.cooldownDuration === "number" ? options?.cooldownDuration : 3e4;
      this.#cacheMaxAge = typeof options?.cacheMaxAge === "number" ? options?.cacheMaxAge : 6e5;
      this.#headers = new Headers(options?.headers);
      if (USER_AGENT && !this.#headers.has("User-Agent")) {
        this.#headers.set("User-Agent", USER_AGENT);
      }
      if (!this.#headers.has("accept")) {
        this.#headers.set("accept", "application/json");
        this.#headers.append("accept", "application/jwk-set+json");
      }
      this.#customFetch = options?.[customFetch];
      if (options?.[jwksCache] !== void 0) {
        this.#cache = options?.[jwksCache];
        if (isFreshJwksCache(options?.[jwksCache], this.#cacheMaxAge)) {
          this.#jwksTimestamp = this.#cache.uat;
          this.#local = createLocalJWKSet(this.#cache.jwks);
        }
      }
    }
    pendingFetch() {
      return !!this.#pendingFetch;
    }
    coolingDown() {
      return typeof this.#jwksTimestamp === "number" ? Date.now() < this.#jwksTimestamp + this.#cooldownDuration : false;
    }
    fresh() {
      return typeof this.#jwksTimestamp === "number" ? Date.now() < this.#jwksTimestamp + this.#cacheMaxAge : false;
    }
    jwks() {
      return this.#local?.jwks();
    }
    async getKey(protectedHeader, token) {
      if (!this.#local || !this.fresh()) {
        await this.reload();
      }
      try {
        return await this.#local(protectedHeader, token);
      } catch (err) {
        if (err instanceof JWKSNoMatchingKey) {
          if (this.coolingDown() === false) {
            await this.reload();
            return this.#local(protectedHeader, token);
          }
        }
        throw err;
      }
    }
    async reload() {
      if (this.#pendingFetch && isCloudflareWorkers()) {
        this.#pendingFetch = void 0;
      }
      this.#pendingFetch ||= fetchJwks(this.#url.href, this.#headers, AbortSignal.timeout(this.#timeoutDuration), this.#customFetch).then((json) => {
        this.#local = createLocalJWKSet(json);
        if (this.#cache) {
          this.#cache.uat = Date.now();
          this.#cache.jwks = json;
        }
        this.#jwksTimestamp = Date.now();
        this.#pendingFetch = void 0;
      }).catch((err) => {
        this.#pendingFetch = void 0;
        throw err;
      });
      await this.#pendingFetch;
    }
  };
  function createRemoteJWKSet(url, options) {
    const set = new RemoteJWKSet(url, options);
    const remoteJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
    Object.defineProperties(remoteJWKSet, {
      coolingDown: {
        get: () => set.coolingDown(),
        enumerable: true,
        configurable: false
      },
      fresh: {
        get: () => set.fresh(),
        enumerable: true,
        configurable: false
      },
      reload: {
        value: () => set.reload(),
        enumerable: true,
        configurable: false,
        writable: false
      },
      reloading: {
        get: () => set.pendingFetch(),
        enumerable: true,
        configurable: false
      },
      jwks: {
        value: () => set.jwks(),
        enumerable: true,
        configurable: false,
        writable: false
      }
    });
    return remoteJWKSet;
  }

  // dist/webapi/jwt/unsecured.js
  var UnsecuredJWT = class {
    #jwt;
    constructor(payload = {}) {
      this.#jwt = new JWTClaimsBuilder(payload);
    }
    encode() {
      const header = encode(JSON.stringify({ alg: "none" }));
      const payload = encode(this.#jwt.data());
      return `${header}.${payload}.`;
    }
    setIssuer(issuer) {
      this.#jwt.iss = issuer;
      return this;
    }
    setSubject(subject) {
      this.#jwt.sub = subject;
      return this;
    }
    setAudience(audience) {
      this.#jwt.aud = audience;
      return this;
    }
    setJti(jwtId) {
      this.#jwt.jti = jwtId;
      return this;
    }
    setNotBefore(input) {
      this.#jwt.nbf = input;
      return this;
    }
    setExpirationTime(input) {
      this.#jwt.exp = input;
      return this;
    }
    setIssuedAt(input) {
      this.#jwt.iat = input;
      return this;
    }
    static decode(jwt, options) {
      if (typeof jwt !== "string") {
        throw new JWTInvalid("Unsecured JWT must be a string");
      }
      const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split(".");
      if (length !== 3 || signature !== "") {
        throw new JWTInvalid("Invalid Unsecured JWT");
      }
      let header;
      try {
        header = JSON.parse(decoder.decode(decode(encodedHeader)));
        if (header.alg !== "none")
          throw new Error();
      } catch {
        throw new JWTInvalid("Invalid Unsecured JWT");
      }
      const payload = validateClaimsSet(header, decode(encodedPayload), options);
      return { payload, header };
    }
  };

  // dist/webapi/util/decode_protected_header.js
  function decodeProtectedHeader(token) {
    let protectedB64u;
    if (typeof token === "string") {
      const parts = token.split(".");
      if (parts.length === 3 || parts.length === 5) {
        [protectedB64u] = parts;
      }
    } else if (typeof token === "object" && token) {
      if ("protected" in token) {
        protectedB64u = token.protected;
      } else {
        throw new TypeError("Token does not contain a Protected Header");
      }
    }
    try {
      if (typeof protectedB64u !== "string" || !protectedB64u) {
        throw new Error();
      }
      const result = JSON.parse(decoder.decode(decode(protectedB64u)));
      if (!is_object_default(result)) {
        throw new Error();
      }
      return result;
    } catch {
      throw new TypeError("Invalid Token or Protected Header formatting");
    }
  }

  // dist/webapi/util/decode_jwt.js
  function decodeJwt(jwt) {
    if (typeof jwt !== "string")
      throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
    const { 1: payload, length } = jwt.split(".");
    if (length === 5)
      throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
    if (length !== 3)
      throw new JWTInvalid("Invalid JWT");
    if (!payload)
      throw new JWTInvalid("JWTs must contain a payload");
    let decoded;
    try {
      decoded = decode(payload);
    } catch {
      throw new JWTInvalid("Failed to base64url decode the payload");
    }
    let result;
    try {
      result = JSON.parse(decoder.decode(decoded));
    } catch {
      throw new JWTInvalid("Failed to parse the decoded payload as JSON");
    }
    if (!is_object_default(result))
      throw new JWTInvalid("Invalid JWT Claims Set");
    return result;
  }

  // dist/webapi/key/generate_key_pair.js
  function getModulusLengthOption(options) {
    const modulusLength = options?.modulusLength ?? 2048;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
    }
    return modulusLength;
  }
  async function generateKeyPair(alg, options) {
    let algorithm;
    let keyUsages;
    switch (alg) {
      case "PS256":
      case "PS384":
      case "PS512":
        algorithm = {
          name: "RSA-PSS",
          hash: `SHA-${alg.slice(-3)}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["sign", "verify"];
        break;
      case "RS256":
      case "RS384":
      case "RS512":
        algorithm = {
          name: "RSASSA-PKCS1-v1_5",
          hash: `SHA-${alg.slice(-3)}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["sign", "verify"];
        break;
      case "RSA-OAEP":
      case "RSA-OAEP-256":
      case "RSA-OAEP-384":
      case "RSA-OAEP-512":
        algorithm = {
          name: "RSA-OAEP",
          hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
          publicExponent: new Uint8Array([1, 0, 1]),
          modulusLength: getModulusLengthOption(options)
        };
        keyUsages = ["decrypt", "unwrapKey", "encrypt", "wrapKey"];
        break;
      case "ES256":
        algorithm = { name: "ECDSA", namedCurve: "P-256" };
        keyUsages = ["sign", "verify"];
        break;
      case "ES384":
        algorithm = { name: "ECDSA", namedCurve: "P-384" };
        keyUsages = ["sign", "verify"];
        break;
      case "ES512":
        algorithm = { name: "ECDSA", namedCurve: "P-521" };
        keyUsages = ["sign", "verify"];
        break;
      case "Ed25519":
      case "EdDSA": {
        keyUsages = ["sign", "verify"];
        algorithm = { name: "Ed25519" };
        break;
      }
      case "ECDH-ES":
      case "ECDH-ES+A128KW":
      case "ECDH-ES+A192KW":
      case "ECDH-ES+A256KW": {
        keyUsages = ["deriveBits"];
        const crv = options?.crv ?? "P-256";
        switch (crv) {
          case "P-256":
          case "P-384":
          case "P-521": {
            algorithm = { name: "ECDH", namedCurve: crv };
            break;
          }
          case "X25519":
            algorithm = { name: "X25519" };
            break;
          default:
            throw new JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, and X25519");
        }
        break;
      }
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, keyUsages);
  }

  // dist/webapi/key/generate_secret.js
  async function generateSecret(alg, options) {
    let length;
    let algorithm;
    let keyUsages;
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512":
        length = parseInt(alg.slice(-3), 10);
        algorithm = { name: "HMAC", hash: `SHA-${length}`, length };
        keyUsages = ["sign", "verify"];
        break;
      case "A128CBC-HS256":
      case "A192CBC-HS384":
      case "A256CBC-HS512":
        length = parseInt(alg.slice(-3), 10);
        return crypto.getRandomValues(new Uint8Array(length >> 3));
      case "A128KW":
      case "A192KW":
      case "A256KW":
        length = parseInt(alg.slice(1, 4), 10);
        algorithm = { name: "AES-KW", length };
        keyUsages = ["wrapKey", "unwrapKey"];
        break;
      case "A128GCMKW":
      case "A192GCMKW":
      case "A256GCMKW":
      case "A128GCM":
      case "A192GCM":
      case "A256GCM":
        length = parseInt(alg.slice(1, 4), 10);
        algorithm = { name: "AES-GCM", length };
        keyUsages = ["encrypt", "decrypt"];
        break;
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, keyUsages);
  }

  // dist/webapi/index.js
  var cryptoRuntime = "WebCryptoAPI";

  exports.CompactEncrypt = CompactEncrypt;
  exports.CompactSign = CompactSign;
  exports.EmbeddedJWK = EmbeddedJWK;
  exports.EncryptJWT = EncryptJWT;
  exports.FlattenedEncrypt = FlattenedEncrypt;
  exports.FlattenedSign = FlattenedSign;
  exports.GeneralEncrypt = GeneralEncrypt;
  exports.GeneralSign = GeneralSign;
  exports.SignJWT = SignJWT;
  exports.UnsecuredJWT = UnsecuredJWT;
  exports.base64url = base64url_exports;
  exports.calculateJwkThumbprint = calculateJwkThumbprint;
  exports.calculateJwkThumbprintUri = calculateJwkThumbprintUri;
  exports.compactDecrypt = compactDecrypt;
  exports.compactVerify = compactVerify;
  exports.createLocalJWKSet = createLocalJWKSet;
  exports.createRemoteJWKSet = createRemoteJWKSet;
  exports.cryptoRuntime = cryptoRuntime;
  exports.customFetch = customFetch;
  exports.decodeJwt = decodeJwt;
  exports.decodeProtectedHeader = decodeProtectedHeader;
  exports.errors = errors_exports;
  exports.exportJWK = exportJWK;
  exports.exportPKCS8 = exportPKCS8;
  exports.exportSPKI = exportSPKI;
  exports.flattenedDecrypt = flattenedDecrypt;
  exports.flattenedVerify = flattenedVerify;
  exports.generalDecrypt = generalDecrypt;
  exports.generalVerify = generalVerify;
  exports.generateKeyPair = generateKeyPair;
  exports.generateSecret = generateSecret;
  exports.importJWK = importJWK;
  exports.importPKCS8 = importPKCS8;
  exports.importSPKI = importSPKI;
  exports.importX509 = importX509;
  exports.jwksCache = jwksCache;
  exports.jwtDecrypt = jwtDecrypt;
  exports.jwtVerify = jwtVerify;

}));
