import crypto, { isCryptoKey } from './webcrypto.js';
import invalidKeyInput from './invalid_key_input.js';
export default function getCryptoKey(alg, key, usage) {
    if (isCryptoKey(key)) {
        return key;
    }
    if (key instanceof Uint8Array) {
        if (!alg.startsWith('HS')) {
            throw new TypeError(invalidKeyInput(key, 'CryptoKey'));
        }
        return crypto.subtle.importKey('raw', key, { hash: { name: `SHA-${alg.substr(-3)}` }, name: 'HMAC' }, false, [usage]);
    }
    throw new TypeError(invalidKeyInput(key, 'CryptoKey', 'Uint8Array'));
}
