import bogusWebCrypto from './bogus.js';
import crypto, { isCryptoKey } from './webcrypto.js';
import invalidKeyInput from './invalid_key_input.js';
function checkKeySize(key, alg) {
    if (key.algorithm.length !== parseInt(alg.substr(1, 3), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
}
function getCryptoKey(key, usage) {
    if (isCryptoKey(key)) {
        return key;
    }
    if (key instanceof Uint8Array) {
        return crypto.subtle.importKey('raw', key, 'AES-KW', true, [usage]);
    }
    throw new TypeError(invalidKeyInput(key, 'CryptoKey', 'Uint8Array'));
}
export const wrap = async (alg, key, cek) => {
    const cryptoKey = await getCryptoKey(key, 'wrapKey');
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await crypto.subtle.importKey('raw', cek, ...bogusWebCrypto);
    return new Uint8Array(await crypto.subtle.wrapKey('raw', cryptoKeyCek, cryptoKey, 'AES-KW'));
};
export const unwrap = async (alg, key, encryptedKey) => {
    const cryptoKey = await getCryptoKey(key, 'unwrapKey');
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await crypto.subtle.unwrapKey('raw', encryptedKey, cryptoKey, 'AES-KW', ...bogusWebCrypto);
    return new Uint8Array(await crypto.subtle.exportKey('raw', cryptoKeyCek));
};
