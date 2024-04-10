"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFetchConfigFromReq = exports.createFetchMiddleware = void 0;
const json_rpc_engine_1 = require("@metamask/json-rpc-engine");
const rpc_errors_1 = require("@metamask/rpc-errors");
const util_1 = require("./util");
const RETRIABLE_ERRORS = [
    // ignore server overload errors
    'Gateway timeout',
    'ETIMEDOUT',
    // ignore server sent html error pages
    // or truncated json responses
    'failed to parse response body',
    // ignore errors where http req failed to establish
    'Failed to fetch',
];
/**
 * Create middleware for sending a JSON-RPC request to the given RPC URL.
 *
 * @param options - Options
 * @param options.btoa - Generates a base64-encoded string from a binary string.
 * @param options.fetch - The `fetch` function; expected to be equivalent to `window.fetch`.
 * @param options.rpcUrl - The URL to send the request to.
 * @param options.originHttpHeaderKey - If provider, the origin field for each JSON-RPC request
 * will be attached to each outgoing fetch request under this header.
 * @returns The fetch middleware.
 */
function createFetchMiddleware({ 
// eslint-disable-next-line @typescript-eslint/no-shadow
btoa, 
// eslint-disable-next-line @typescript-eslint/no-shadow
fetch, rpcUrl, originHttpHeaderKey, venlyConnect, }) {
    return (0, json_rpc_engine_1.createAsyncMiddleware)((req, res, _next) => __awaiter(this, void 0, void 0, function* () {
        const { fetchUrl, fetchParams } = createFetchConfigFromReq({
            btoa,
            req,
            rpcUrl,
            originHttpHeaderKey,
        });
        // attempt request multiple times
        const maxAttempts = 5;
        const retryInterval = 1000;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                fetchParams.headers.Authorization = `Bearer ${venlyConnect.auth.token}`;
                const fetchRes = yield fetch(fetchUrl, fetchParams);
                // check for http errrors
                checkForHttpErrors(fetchRes);
                // parse response body
                const rawBody = yield fetchRes.text();
                let fetchBody;
                try {
                    fetchBody = JSON.parse(rawBody);
                }
                catch (_) {
                    throw new Error(`FetchMiddleware - failed to parse response body: "${rawBody}"`);
                }
                const result = parseResponse(fetchRes, fetchBody);
                // set result and exit retry loop
                res.result = result;
                return;
            }
            catch (err) {
                const errMsg = err.toString();
                const isRetriable = RETRIABLE_ERRORS.some((phrase) => errMsg.includes(phrase));
                // re-throw error if not retriable
                if (!isRetriable) {
                    throw err;
                }
            }
            // delay before retrying
            yield (0, util_1.timeout)(retryInterval);
        }
    }));
}
exports.createFetchMiddleware = createFetchMiddleware;
function checkForHttpErrors(fetchRes) {
    // check for errors
    switch (fetchRes.status) {
        case 405:
            throw rpc_errors_1.rpcErrors.methodNotFound();
        case 418:
            throw createRatelimitError();
        case 503:
        case 504:
            throw createTimeoutError();
        default:
            break;
    }
}
function parseResponse(fetchRes, body) {
    // check for error code
    if (fetchRes.status !== 200) {
        throw rpc_errors_1.rpcErrors.internal({
            message: `Non-200 status code: '${fetchRes.status}'`,
            data: body,
        });
    }
    // check for rpc error
    if (body.error) {
        throw rpc_errors_1.rpcErrors.internal({
            data: body.error,
        });
    }
    // return successful result
    return body.result;
}
/**
 * Generate `fetch` configuration for sending the given request to an RPC API.
 *
 * @param options - Options
 * @param options.btoa - Generates a base64-encoded string from a binary string.
 * @param options.rpcUrl - The URL to send the request to.
 * @param options.originHttpHeaderKey - If provider, the origin field for each JSON-RPC request
 * will be attached to each outgoing fetch request under this header.
 * @param options.req
 * @returns The fetch middleware.
 */
function createFetchConfigFromReq({ 
// eslint-disable-next-line @typescript-eslint/no-shadow
btoa, req, rpcUrl, originHttpHeaderKey, }) {
    const parsedUrl = new URL(rpcUrl);
    const fetchUrl = normalizeUrlFromParsed(parsedUrl);
    // prepare payload
    // copy only canonical json rpc properties
    const payload = {
        id: req.id,
        jsonrpc: req.jsonrpc,
        method: req.method,
        params: req.params,
    };
    // extract 'origin' parameter from request
    const originDomain = req.origin;
    // serialize request body
    const serializedPayload = JSON.stringify(payload);
    // configure fetch params
    const fetchParams = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: serializedPayload,
    };
    // encoded auth details as header (not allowed in fetch url)
    if (parsedUrl.username && parsedUrl.password) {
        const authString = `${parsedUrl.username}:${parsedUrl.password}`;
        const encodedAuth = btoa(authString);
        fetchParams.headers.Authorization = `Basic ${encodedAuth}`;
    }
    // optional: add request origin as header
    if (originHttpHeaderKey && originDomain) {
        fetchParams.headers[originHttpHeaderKey] = originDomain;
    }
    return { fetchUrl, fetchParams };
}
exports.createFetchConfigFromReq = createFetchConfigFromReq;
function normalizeUrlFromParsed(parsedUrl) {
    let result = '';
    result += parsedUrl.protocol;
    result += `//${parsedUrl.hostname}`;
    if (parsedUrl.port) {
        result += `:${parsedUrl.port}`;
    }
    result += `${parsedUrl.pathname}`;
    result += `${parsedUrl.search}`;
    return result;
}
function createRatelimitError() {
    return rpc_errors_1.rpcErrors.internal({ message: `Request is being rate limited.` });
}
function createTimeoutError() {
    let msg = `Gateway timeout. The request took too long to process. `;
    msg += `This can happen when querying logs over too wide a block range.`;
    return rpc_errors_1.rpcErrors.internal({ message: msg });
}
