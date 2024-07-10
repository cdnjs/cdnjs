import { decode } from './base64url.js';
import importJWK from './jwk_to_key.js';
const normalizeSecretKey = (k) => decode(k);
export const normalizePublicKey = async (key, alg) => {
    if (key?.[Symbol.toStringTag] === 'KeyObject') {
        let jwk = key.export({ format: 'jwk' });
        delete jwk.d;
        delete jwk.dp;
        delete jwk.dq;
        delete jwk.p;
        delete jwk.q;
        delete jwk.qi;
        if (jwk.k) {
            return normalizeSecretKey(jwk.k);
        }
        return importJWK({ ...jwk, alg });
    }
    return key;
};
export const normalizePrivateKey = async (key, alg) => {
    if (key?.[Symbol.toStringTag] === 'KeyObject') {
        let jwk = key.export({ format: 'jwk' });
        if (jwk.k) {
            return normalizeSecretKey(jwk.k);
        }
        return importJWK({ ...jwk, alg });
    }
    return key;
};
