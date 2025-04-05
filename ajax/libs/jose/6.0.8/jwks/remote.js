import { JOSEError, JWKSNoMatchingKey, JWKSTimeout } from '../util/errors.js';
import { createLocalJWKSet } from './local.js';
import isObject from '../lib/is_object.js';
function isCloudflareWorkers() {
    return (typeof WebSocketPair !== 'undefined' ||
        (typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers') ||
        (typeof EdgeRuntime !== 'undefined' && EdgeRuntime === 'vercel'));
}
let USER_AGENT;
if (typeof navigator === 'undefined' || !navigator.userAgent?.startsWith?.('Mozilla/5.0 ')) {
    const NAME = 'jose';
    const VERSION = 'v6.0.8';
    USER_AGENT = `${NAME}/${VERSION}`;
}
export const customFetch = Symbol();
async function fetchJwks(url, headers, signal, fetchImpl = fetch) {
    const response = await fetchImpl(url, {
        method: 'GET',
        signal,
        redirect: 'manual',
        headers,
    }).catch((err) => {
        if (err.name === 'TimeoutError') {
            throw new JWKSTimeout();
        }
        throw err;
    });
    if (response.status !== 200) {
        throw new JOSEError('Expected 200 OK from the JSON Web Key Set HTTP response');
    }
    try {
        return await response.json();
    }
    catch {
        throw new JOSEError('Failed to parse the JSON Web Key Set HTTP response as JSON');
    }
}
export const jwksCache = Symbol();
function isFreshJwksCache(input, cacheMaxAge) {
    if (typeof input !== 'object' || input === null) {
        return false;
    }
    if (!('uat' in input) || typeof input.uat !== 'number' || Date.now() - input.uat >= cacheMaxAge) {
        return false;
    }
    if (!('jwks' in input) ||
        !isObject(input.jwks) ||
        !Array.isArray(input.jwks.keys) ||
        !Array.prototype.every.call(input.jwks.keys, isObject)) {
        return false;
    }
    return true;
}
class RemoteJWKSet {
    _url;
    _timeoutDuration;
    _cooldownDuration;
    _cacheMaxAge;
    _jwksTimestamp;
    _pendingFetch;
    _headers;
    [customFetch];
    _local;
    _cache;
    constructor(url, options) {
        if (!(url instanceof URL)) {
            throw new TypeError('url must be an instance of URL');
        }
        this._url = new URL(url.href);
        this._timeoutDuration =
            typeof options?.timeoutDuration === 'number' ? options?.timeoutDuration : 5000;
        this._cooldownDuration =
            typeof options?.cooldownDuration === 'number' ? options?.cooldownDuration : 30000;
        this._cacheMaxAge = typeof options?.cacheMaxAge === 'number' ? options?.cacheMaxAge : 600000;
        this._headers = new Headers(options?.headers);
        if (USER_AGENT && !this._headers.has('User-Agent')) {
            this._headers.set('User-Agent', USER_AGENT);
        }
        if (!this._headers.has('accept')) {
            this._headers.set('accept', 'application/json');
            this._headers.append('accept', 'application/jwk-set+json');
        }
        this[customFetch] = options?.[customFetch];
        if (options?.[jwksCache] !== undefined) {
            this._cache = options?.[jwksCache];
            if (isFreshJwksCache(options?.[jwksCache], this._cacheMaxAge)) {
                this._jwksTimestamp = this._cache.uat;
                this._local = createLocalJWKSet(this._cache.jwks);
            }
        }
    }
    coolingDown() {
        return typeof this._jwksTimestamp === 'number'
            ? Date.now() < this._jwksTimestamp + this._cooldownDuration
            : false;
    }
    fresh() {
        return typeof this._jwksTimestamp === 'number'
            ? Date.now() < this._jwksTimestamp + this._cacheMaxAge
            : false;
    }
    async getKey(protectedHeader, token) {
        if (!this._local || !this.fresh()) {
            await this.reload();
        }
        try {
            return await this._local(protectedHeader, token);
        }
        catch (err) {
            if (err instanceof JWKSNoMatchingKey) {
                if (this.coolingDown() === false) {
                    await this.reload();
                    return this._local(protectedHeader, token);
                }
            }
            throw err;
        }
    }
    async reload() {
        if (this._pendingFetch && isCloudflareWorkers()) {
            this._pendingFetch = undefined;
        }
        this._pendingFetch ||= fetchJwks(this._url.href, this._headers, AbortSignal.timeout(this._timeoutDuration), this[customFetch])
            .then((json) => {
            this._local = createLocalJWKSet(json);
            if (this._cache) {
                this._cache.uat = Date.now();
                this._cache.jwks = json;
            }
            this._jwksTimestamp = Date.now();
            this._pendingFetch = undefined;
        })
            .catch((err) => {
            this._pendingFetch = undefined;
            throw err;
        });
        await this._pendingFetch;
    }
}
export function createRemoteJWKSet(url, options) {
    const set = new RemoteJWKSet(url, options);
    const remoteJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
    Object.defineProperties(remoteJWKSet, {
        coolingDown: {
            get: () => set.coolingDown(),
            enumerable: true,
            configurable: false,
        },
        fresh: {
            get: () => set.fresh(),
            enumerable: true,
            configurable: false,
        },
        reload: {
            value: () => set.reload(),
            enumerable: true,
            configurable: false,
            writable: false,
        },
        reloading: {
            get: () => !!set._pendingFetch,
            enumerable: true,
            configurable: false,
        },
        jwks: {
            value: () => set._local?.jwks(),
            enumerable: true,
            configurable: false,
            writable: false,
        },
    });
    return remoteJWKSet;
}
