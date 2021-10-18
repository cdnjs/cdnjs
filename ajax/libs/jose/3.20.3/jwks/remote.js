import fetchJwks from '../runtime/fetch_jwks.js';
import { importJWK } from '../key/import.js';
import { JWKSInvalid, JOSENotSupported, JWKSNoMatchingKey, JWKSMultipleMatchingKeys, } from '../util/errors.js';
import isObject from '../lib/is_object.js';
function getKtyFromAlg(alg) {
    switch (typeof alg === 'string' && alg.substr(0, 2)) {
        case 'RS':
        case 'PS':
            return 'RSA';
        case 'ES':
            return 'EC';
        case 'Ed':
            return 'OKP';
        default:
            throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
    }
}
function isJWKLike(key) {
    return isObject(key);
}
class RemoteJWKSet {
    constructor(url, options) {
        this._cached = new WeakMap();
        if (!(url instanceof URL)) {
            throw new TypeError('url must be an instance of URL');
        }
        this._url = new URL(url.href);
        this._options = { agent: options === null || options === void 0 ? void 0 : options.agent };
        this._timeoutDuration =
            typeof (options === null || options === void 0 ? void 0 : options.timeoutDuration) === 'number' ? options === null || options === void 0 ? void 0 : options.timeoutDuration : 5000;
        this._cooldownDuration =
            typeof (options === null || options === void 0 ? void 0 : options.cooldownDuration) === 'number' ? options === null || options === void 0 ? void 0 : options.cooldownDuration : 30000;
    }
    coolingDown() {
        if (!this._cooldownStarted) {
            return false;
        }
        return Date.now() < this._cooldownStarted + this._cooldownDuration;
    }
    async getKey(protectedHeader) {
        if (!this._jwks) {
            await this.reload();
        }
        const candidates = this._jwks.keys.filter((jwk) => {
            let candidate = jwk.kty === getKtyFromAlg(protectedHeader.alg);
            if (candidate && typeof protectedHeader.kid === 'string') {
                candidate = protectedHeader.kid === jwk.kid;
            }
            if (candidate && typeof jwk.alg === 'string') {
                candidate = protectedHeader.alg === jwk.alg;
            }
            if (candidate && typeof jwk.use === 'string') {
                candidate = jwk.use === 'sig';
            }
            if (candidate && Array.isArray(jwk.key_ops)) {
                candidate = jwk.key_ops.includes('verify');
            }
            if (candidate && protectedHeader.alg === 'EdDSA') {
                candidate = jwk.crv === 'Ed25519' || jwk.crv === 'Ed448';
            }
            if (candidate) {
                switch (protectedHeader.alg) {
                    case 'ES256':
                        candidate = jwk.crv === 'P-256';
                        break;
                    case 'ES256K':
                        candidate = jwk.crv === 'secp256k1';
                        break;
                    case 'ES384':
                        candidate = jwk.crv === 'P-384';
                        break;
                    case 'ES512':
                        candidate = jwk.crv === 'P-521';
                        break;
                    default:
                }
            }
            return candidate;
        });
        const { 0: jwk, length } = candidates;
        if (length === 0) {
            if (this.coolingDown() === false) {
                await this.reload();
                return this.getKey(protectedHeader);
            }
            throw new JWKSNoMatchingKey();
        }
        else if (length !== 1) {
            throw new JWKSMultipleMatchingKeys();
        }
        const cached = this._cached.get(jwk) || this._cached.set(jwk, {}).get(jwk);
        if (cached[protectedHeader.alg] === undefined) {
            const keyObject = await importJWK({ ...jwk, ext: true }, protectedHeader.alg);
            if (keyObject instanceof Uint8Array || keyObject.type !== 'public') {
                throw new JWKSInvalid('JSON Web Key Set members must be public keys');
            }
            cached[protectedHeader.alg] = keyObject;
        }
        return cached[protectedHeader.alg];
    }
    async reload() {
        if (!this._pendingFetch) {
            this._pendingFetch = fetchJwks(this._url, this._timeoutDuration, this._options)
                .then((json) => {
                if (typeof json !== 'object' ||
                    !json ||
                    !Array.isArray(json.keys) ||
                    !json.keys.every(isJWKLike)) {
                    throw new JWKSInvalid('JSON Web Key Set malformed');
                }
                this._jwks = { keys: json.keys };
                this._cooldownStarted = Date.now();
                this._pendingFetch = undefined;
            })
                .catch((err) => {
                this._pendingFetch = undefined;
                throw err;
            });
        }
        await this._pendingFetch;
    }
}
function createRemoteJWKSet(url, options) {
    return RemoteJWKSet.prototype.getKey.bind(new RemoteJWKSet(url, options));
}
export { createRemoteJWKSet };
export default createRemoteJWKSet;
