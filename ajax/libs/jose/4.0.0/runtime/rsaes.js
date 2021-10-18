import subtleAlgorithm from './subtle_rsaes.js';
import bogusWebCrypto from './bogus.js';
import crypto, { isCryptoKey } from './webcrypto.js';
import checkKeyLength from './check_key_length.js';
import invalidKeyInput from './invalid_key_input.js';
export const encrypt = async (alg, key, cek) => {
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, 'CryptoKey'));
    }
    checkKeyLength(alg, key);
    if (key.usages.includes('encrypt')) {
        return new Uint8Array(await crypto.subtle.encrypt(subtleAlgorithm(alg), key, cek));
    }
    if (key.usages.includes('wrapKey')) {
        const cryptoKeyCek = await crypto.subtle.importKey('raw', cek, ...bogusWebCrypto);
        return new Uint8Array(await crypto.subtle.wrapKey('raw', cryptoKeyCek, key, subtleAlgorithm(alg)));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
};
export const decrypt = async (alg, key, encryptedKey) => {
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, 'CryptoKey'));
    }
    checkKeyLength(alg, key);
    if (key.usages.includes('decrypt')) {
        return new Uint8Array(await crypto.subtle.decrypt(subtleAlgorithm(alg), key, encryptedKey));
    }
    if (key.usages.includes('unwrapKey')) {
        const cryptoKeyCek = await crypto.subtle.unwrapKey('raw', encryptedKey, key, subtleAlgorithm(alg), ...bogusWebCrypto);
        return new Uint8Array(await crypto.subtle.exportKey('raw', cryptoKeyCek));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
};
