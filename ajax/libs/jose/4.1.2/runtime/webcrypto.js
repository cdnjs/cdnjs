import globalThis from './global.js';
export default globalThis.crypto;
export function isCryptoKey(key) {
    if (typeof globalThis.CryptoKey === 'undefined') {
        return false;
    }
    return key != null && key instanceof globalThis.CryptoKey;
}
