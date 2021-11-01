import digest from '../runtime/digest.js';
import { encode as base64url } from '../runtime/base64url.js';
import { JOSENotSupported, JWKInvalid } from '../util/errors.js';
import { encoder } from '../lib/buffer_utils.js';
import isObject from '../lib/is_object.js';
const check = (value, description) => {
    if (typeof value !== 'string' || !value) {
        throw new JWKInvalid(`${description} missing or invalid`);
    }
};
export async function calculateJwkThumbprint(jwk, digestAlgorithm = 'sha256') {
    if (!isObject(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    let components;
    switch (jwk.kty) {
        case 'EC':
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
            break;
        case 'OKP':
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
            break;
        case 'RSA':
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
            break;
        case 'oct':
            check(jwk.k, '"k" (Key Value) Parameter');
            components = { k: jwk.k, kty: jwk.kty };
            break;
        default:
            throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encoder.encode(JSON.stringify(components));
    return base64url(await digest(digestAlgorithm, data));
}
