import globalThis from './global.js';
export default globalThis.crypto;
export function isCryptoKey(key) {
    if (typeof globalThis.CryptoKey === 'undefined') {
        return false;
    }
    return key != null && key instanceof globalThis.CryptoKey;
}
function getHashLength(hash) {
    return parseInt(hash === null || hash === void 0 ? void 0 : hash.name.substr(4), 10);
}
function getNamedCurve(alg) {
    switch (alg) {
        case 'ES256':
            return 'P-256';
        case 'ES384':
            return 'P-384';
        case 'ES512':
            return 'P-521';
    }
}
export function checkCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case undefined:
            break;
        case 'HS256':
        case 'HS384':
        case 'HS512': {
            if (key.algorithm.name !== 'HMAC') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be HMAC.`);
            }
            const expected = parseInt(alg.substr(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected) {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.hash must be SHA-${expected}.`);
            }
            break;
        }
        case 'RS256':
        case 'RS384':
        case 'RS512': {
            if (key.algorithm.name !== 'RSASSA-PKCS1-v1_5') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be RSASSA-PKCS1-v1_5.`);
            }
            const expected = parseInt(alg.substr(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected) {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.hash must be SHA-${expected}.`);
            }
            break;
        }
        case 'PS256':
        case 'PS384':
        case 'PS512': {
            if (key.algorithm.name !== 'RSA-PSS') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be RSA-PSS.`);
            }
            const expected = parseInt(alg.substr(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected) {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.hash must be SHA-${expected}.`);
            }
            break;
        }
        case 'EdDSA': {
            if (key.algorithm.name !== 'NODE-ED25519' && key.algorithm.name !== 'NODE-ED448') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be NODE-ED25519 or NODE-ED448.`);
            }
            break;
        }
        case 'ES256':
        case 'ES384':
        case 'ES512': {
            if (key.algorithm.name !== 'ECDSA') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be ECDSA.`);
            }
            const expected = getNamedCurve(alg);
            const actual = key.algorithm.namedCurve;
            if (actual !== expected) {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.namedCurve must be ${expected}.`);
            }
            break;
        }
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM': {
            if (key.algorithm.name !== 'AES-GCM') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be AES-GCM.`);
            }
            const expected = parseInt(alg.substr(1, 3), 10);
            const actual = key.algorithm.length;
            if (actual !== expected) {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.length must be ${expected}.`);
            }
            break;
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            if (key.algorithm.name !== 'AES-KW') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be AES-KW.`);
            }
            const expected = parseInt(alg.substr(1, 3), 10);
            const actual = key.algorithm.length;
            if (actual !== expected) {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.length must be ${expected}.`);
            }
            break;
        }
        case 'ECDH-ES':
            if (key.algorithm.name !== 'ECDH') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be ECDH.`);
            }
            break;
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW':
            if (key.algorithm.name !== 'PBKDF2') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be PBKDF2.`);
            }
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            if (key.algorithm.name !== 'RSA-OAEP') {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.name must be RSA-OAEP.`);
            }
            const expected = parseInt(alg.substr(9), 10) || 1;
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected) {
                throw new TypeError(`CryptoKey does not support this operation, its algorithm.hash must be SHA-${expected}.`);
            }
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
        let msg = 'CryptoKey does not support this operation, its usages must include ';
        if (usages.length > 2) {
            const last = usages.pop();
            msg += `one of ${usages.join(', ')}, or ${last}.`;
        }
        else if (usages.length === 2) {
            msg += `one of ${usages[0]} or ${usages[1]}.`;
        }
        else {
            msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
    }
}
