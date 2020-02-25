/**
 * @license
 * v1.3.9
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2020 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { extend, isUrlAbsolute, combine } from '@pnp/common';
import { SPRest, Web, Site } from '@pnp/sp';

/**
 * Makes requests using the SP.RequestExecutor library.
 */
class SPRequestExecutorClient {
    constructor() {
        /**
         * Converts a SharePoint REST API response to a fetch API response.
         */
        this.convertToResponse = (spResponse) => {
            const responseHeaders = new Headers();
            if (spResponse.headers !== undefined) {
                for (const h in spResponse.headers) {
                    if (spResponse.headers[h]) {
                        responseHeaders.append(h, spResponse.headers[h]);
                    }
                }
            }
            // Cannot have an empty string body when creating a Response with status 204
            const body = spResponse.statusCode === 204 ? null : spResponse.body;
            return new Response(body, {
                headers: responseHeaders,
                status: spResponse.statusCode,
                statusText: spResponse.statusText,
            });
        };
    }
    /**
     * Fetches a URL using the SP.RequestExecutor library.
     */
    fetch(url, options) {
        if (SP === undefined || SP.RequestExecutor === undefined) {
            throw Error("SP.RequestExecutor is undefined. Load the SP.RequestExecutor.js library (/_layouts/15/SP.RequestExecutor.js) before loading the PnP JS Core library.");
        }
        const addinWebUrl = url.substring(0, url.indexOf("/_api")), executor = new SP.RequestExecutor(addinWebUrl);
        let headers = {}, iterator, temp;
        if (options.headers && options.headers instanceof Headers) {
            iterator = options.headers.entries();
            temp = iterator.next();
            while (!temp.done) {
                headers[temp.value[0]] = temp.value[1];
                temp = iterator.next();
            }
        }
        else {
            headers = options.headers;
        }
        return new Promise((resolve, reject) => {
            let requestOptions = {
                error: (error) => {
                    reject(this.convertToResponse(error));
                },
                headers: headers,
                method: options.method,
                success: (response) => {
                    resolve(this.convertToResponse(response));
                },
                url: url,
            };
            if (options.body) {
                requestOptions = extend(requestOptions, { body: options.body });
            }
            else {
                requestOptions = extend(requestOptions, { binaryStringRequestBody: true });
            }
            executor.executeAsync(requestOptions);
        });
    }
}

class SPRestAddIn extends SPRest {
    /**
     * Begins a cross-domain, host site scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    crossDomainSite(addInWebUrl, hostWebUrl) {
        return this._cdImpl(Site, addInWebUrl, hostWebUrl, "site");
    }
    /**
     * Begins a cross-domain, host web scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    crossDomainWeb(addInWebUrl, hostWebUrl) {
        return this._cdImpl(Web, addInWebUrl, hostWebUrl, "web");
    }
    /**
     * Implements the creation of cross domain REST urls
     *
     * @param factory The constructor of the object to create Site | Web
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     * @param urlPart String part to append to the url "site" | "web"
     */
    _cdImpl(factory, addInWebUrl, hostWebUrl, urlPart) {
        if (!isUrlAbsolute(addInWebUrl)) {
            throw Error("The addInWebUrl parameter must be an absolute url.");
        }
        if (!isUrlAbsolute(hostWebUrl)) {
            throw Error("The hostWebUrl parameter must be an absolute url.");
        }
        const url = combine(addInWebUrl, "_api/SP.AppContextSite(@target)");
        const instance = new factory(url, urlPart);
        instance.query.set("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
        return instance.configure(this._options);
    }
}
const sp = new SPRestAddIn();

export { SPRequestExecutorClient, SPRestAddIn, sp };
//# sourceMappingURL=sp-addinhelpers.js.map
