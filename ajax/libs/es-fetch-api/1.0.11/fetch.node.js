import {
    polyfill as _polyfill,
    abortable as _abortable,
    json as _json,
    query as _query,
    POST as _POST,
    DELETE as _DELETE,
    form as _form,
    getApi as _getApi,
    method as _method,
    caches as _caches,
    file as _file,
    GET as _GET,
    methods as _methods,
    mode as _mode,
    credentials as _credentials,
    PATCH as _PATCH,
    PUT as _PUT,
    redirects as _redirects,
    WebApiContext as _WebApiContext,
    referrers as _referrers
} from './fetch.js'
import fetch from 'node-fetch'

export const polyfill = _polyfill
export const abortable = _abortable
export const json = _json
export const query = _query
export const POST = _POST
export const DELETE = _DELETE
export const form = _form
export const getApi = _getApi
export const method = _method
export const caches = _caches
export const file = _file
export const GET = _GET
export const methods = _methods
export const mode = _mode
export const credentials = _credentials
export const PATCH = _PATCH
export const PUT = _PUT
export const redirects = _redirects
export const WebApiContext = _WebApiContext
export const referrers = _referrers
polyfill(fetch)
