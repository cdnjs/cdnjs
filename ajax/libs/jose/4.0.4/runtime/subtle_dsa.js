import { isCloudflareWorkers, isNodeJs } from './global.js';
import { JOSENotSupported } from '../util/errors.js';
export default function subtleDsa(alg, crv) {
    switch (alg) {
        case 'HS256':
            return { hash: { name: 'SHA-256' }, name: 'HMAC' };
        case 'HS384':
            return { hash: { name: 'SHA-384' }, name: 'HMAC' };
        case 'HS512':
            return { hash: { name: 'SHA-512' }, name: 'HMAC' };
        case 'PS256':
            return {
                hash: { name: 'SHA-256' },
                name: 'RSA-PSS',
                saltLength: 256 >> 3,
            };
        case 'PS384':
            return {
                hash: { name: 'SHA-384' },
                name: 'RSA-PSS',
                saltLength: 384 >> 3,
            };
        case 'PS512':
            return {
                hash: { name: 'SHA-512' },
                name: 'RSA-PSS',
                saltLength: 512 >> 3,
            };
        case 'RS256':
            return { hash: { name: 'SHA-256' }, name: 'RSASSA-PKCS1-v1_5' };
        case 'RS384':
            return { hash: { name: 'SHA-384' }, name: 'RSASSA-PKCS1-v1_5' };
        case 'RS512':
            return { hash: { name: 'SHA-512' }, name: 'RSASSA-PKCS1-v1_5' };
        case 'ES256':
            return { hash: { name: 'SHA-256' }, name: 'ECDSA', namedCurve: 'P-256' };
        case 'ES384':
            return { hash: { name: 'SHA-384' }, name: 'ECDSA', namedCurve: 'P-384' };
        case 'ES512':
            return { hash: { name: 'SHA-512' }, name: 'ECDSA', namedCurve: 'P-521' };
        case (isCloudflareWorkers() || isNodeJs()) && 'EdDSA':
            return { name: crv, namedCurve: crv };
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}
