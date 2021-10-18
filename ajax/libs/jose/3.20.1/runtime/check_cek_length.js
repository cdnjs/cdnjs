import { JWEInvalid, JOSENotSupported } from '../util/errors.js';
import { isCryptoKey } from './webcrypto.js';
const checkCekLength = (enc, cek) => {
    let expected;
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            expected = parseInt(enc.substr(-3), 10);
            if (!(cek instanceof Uint8Array)) {
                throw new TypeError(`${enc} content encryption requires Uint8Array as key input`);
            }
            break;
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            expected = parseInt(enc.substr(1, 3), 10);
            break;
        default:
            throw new JOSENotSupported(`Content Encryption Algorithm ${enc} is not supported either by JOSE or your javascript runtime`);
    }
    if (cek instanceof Uint8Array) {
        if (cek.length << 3 !== expected) {
            throw new JWEInvalid('Invalid Content Encryption Key length');
        }
        return;
    }
    if (isCryptoKey(cek)) {
        const { length } = cek.algorithm;
        if (length !== expected) {
            throw new JWEInvalid('Invalid Content Encryption Key length');
        }
        return;
    }
    throw new TypeError('Invalid Content Encryption Key type');
};
export default checkCekLength;
