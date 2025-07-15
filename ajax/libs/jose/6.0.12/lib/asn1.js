import invalidKeyInput from './invalid_key_input.js';
import { encodeBase64, decodeBase64 } from '../lib/base64.js';
import { JOSENotSupported } from '../util/errors.js';
import { isCryptoKey, isKeyObject } from './is_key_like.js';
const formatPEM = (b64, descriptor) => {
    const newlined = (b64.match(/.{1,64}/g) || []).join('\n');
    return `-----BEGIN ${descriptor}-----\n${newlined}\n-----END ${descriptor}-----`;
};
const genericExport = async (keyType, keyFormat, key) => {
    if (isKeyObject(key)) {
        if (key.type !== keyType) {
            throw new TypeError(`key is not a ${keyType} key`);
        }
        return key.export({ format: 'pem', type: keyFormat });
    }
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, 'CryptoKey', 'KeyObject'));
    }
    if (!key.extractable) {
        throw new TypeError('CryptoKey is not extractable');
    }
    if (key.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
    }
    return formatPEM(encodeBase64(new Uint8Array(await crypto.subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
};
export const toSPKI = (key) => {
    return genericExport('public', 'spki', key);
};
export const toPKCS8 = (key) => {
    return genericExport('private', 'pkcs8', key);
};
const getNamedCurve = (keyData) => {
    const patterns = Object.entries({
        'P-256': [0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07],
        'P-384': [0x06, 0x05, 0x2b, 0x81, 0x04, 0x00, 0x22],
        'P-521': [0x06, 0x05, 0x2b, 0x81, 0x04, 0x00, 0x23],
    });
    const maxPatternLen = Math.max(...patterns.map(([, bytes]) => bytes.length));
    for (let i = 0; i <= keyData.byteLength - maxPatternLen; i++) {
        for (const [curve, bytes] of patterns) {
            if (i <= keyData.byteLength - bytes.length) {
                if (keyData.subarray(i, i + bytes.length).every((byte, idx) => byte === bytes[idx])) {
                    return curve;
                }
            }
        }
    }
    return undefined;
};
const genericImport = async (keyFormat, keyData, alg, options) => {
    let algorithm;
    let keyUsages;
    const isPublic = keyFormat === 'spki';
    const getSignatureUsages = () => (isPublic ? ['verify'] : ['sign']);
    const getEncryptionUsages = () => isPublic ? ['encrypt', 'wrapKey'] : ['decrypt', 'unwrapKey'];
    switch (alg) {
        case 'PS256':
        case 'PS384':
        case 'PS512':
            algorithm = { name: 'RSA-PSS', hash: `SHA-${alg.slice(-3)}` };
            keyUsages = getSignatureUsages();
            break;
        case 'RS256':
        case 'RS384':
        case 'RS512':
            algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: `SHA-${alg.slice(-3)}` };
            keyUsages = getSignatureUsages();
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            algorithm = {
                name: 'RSA-OAEP',
                hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
            };
            keyUsages = getEncryptionUsages();
            break;
        case 'ES256':
        case 'ES384':
        case 'ES512': {
            const curveMap = { ES256: 'P-256', ES384: 'P-384', ES512: 'P-521' };
            algorithm = { name: 'ECDSA', namedCurve: curveMap[alg] };
            keyUsages = getSignatureUsages();
            break;
        }
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW': {
            const namedCurve = getNamedCurve(keyData);
            algorithm = namedCurve ? { name: 'ECDH', namedCurve } : { name: 'X25519' };
            keyUsages = isPublic ? [] : ['deriveBits'];
            break;
        }
        case 'Ed25519':
        case 'EdDSA':
            algorithm = { name: 'Ed25519' };
            keyUsages = getSignatureUsages();
            break;
        default:
            throw new JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
    }
    return crypto.subtle.importKey(keyFormat, keyData, algorithm, options?.extractable ?? (isPublic ? true : false), keyUsages);
};
export const fromPKCS8 = (pem, alg, options) => {
    const keyData = decodeBase64(pem.replace(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, ''));
    return genericImport('pkcs8', keyData, alg, options);
};
export const fromSPKI = (pem, alg, options) => {
    const keyData = decodeBase64(pem.replace(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, ''));
    return genericImport('spki', keyData, alg, options);
};
function spkiFromX509(buf) {
    let pos = 0;
    const parseLength = () => {
        const first = buf[pos++];
        if (first & 0x80) {
            const lengthOfLength = first & 0x7f;
            let length = 0;
            for (let i = 0; i < lengthOfLength; i++) {
                length = (length << 8) | buf[pos++];
            }
            return length;
        }
        return first;
    };
    const skipElement = (count = 1) => {
        if (count <= 0)
            return;
        pos++;
        const length = parseLength();
        pos += length;
        if (count > 1) {
            skipElement(count - 1);
        }
    };
    if (buf[pos++] !== 0x30)
        throw new Error('Invalid certificate structure');
    parseLength();
    if (buf[pos++] !== 0x30)
        throw new Error('Invalid tbsCertificate structure');
    parseLength();
    if (buf[pos] === 0xa0) {
        skipElement(6);
    }
    else {
        skipElement(5);
    }
    const spkiStart = pos;
    if (buf[pos++] !== 0x30)
        throw new Error('Invalid SPKI structure');
    const spkiContentLength = parseLength();
    return buf.subarray(spkiStart, spkiStart + spkiContentLength + (pos - spkiStart));
}
function extractX509SPKI(x509) {
    const base64Content = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '');
    const derBytes = decodeBase64(base64Content);
    return spkiFromX509(derBytes);
}
export const fromX509 = (pem, alg, options) => {
    let spki;
    try {
        spki = extractX509SPKI(pem);
    }
    catch (cause) {
        throw new TypeError('Failed to parse the X.509 certificate', { cause });
    }
    return genericImport('spki', spki, alg, options);
};
