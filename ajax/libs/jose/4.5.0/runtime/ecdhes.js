import { encoder, concat, uint32be, lengthAndInput, concatKdf } from '../lib/buffer_utils.js';
import crypto, { isCryptoKey } from './webcrypto.js';
import { checkEncCryptoKey } from '../lib/crypto_key.js';
import digest from './digest.js';
import invalidKeyInput from '../lib/invalid_key_input.js';
import { types } from './is_key_like.js';
export async function deriveKey(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    if (!isCryptoKey(publicKey)) {
        throw new TypeError(invalidKeyInput(publicKey, ...types));
    }
    checkEncCryptoKey(publicKey, 'ECDH-ES');
    if (!isCryptoKey(privateKey)) {
        throw new TypeError(invalidKeyInput(privateKey, ...types));
    }
    checkEncCryptoKey(privateKey, 'ECDH-ES', 'deriveBits', 'deriveKey');
    const value = concat(lengthAndInput(encoder.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
    if (!privateKey.usages.includes('deriveBits')) {
        throw new TypeError('ECDH-ES private key "usages" must include "deriveBits"');
    }
    const sharedSecret = new Uint8Array(await crypto.subtle.deriveBits({
        name: 'ECDH',
        public: publicKey,
    }, privateKey, Math.ceil(parseInt(privateKey.algorithm.namedCurve.slice(-3), 10) / 8) << 3));
    return concatKdf(digest, sharedSecret, keyLength, value);
}
export async function generateEpk(key) {
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, ...types));
    }
    return crypto.subtle.generateKey(key.algorithm, true, ['deriveBits']);
}
export function ecdhAllowed(key) {
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, ...types));
    }
    return ['P-256', 'P-384', 'P-521'].includes(key.algorithm.namedCurve);
}
