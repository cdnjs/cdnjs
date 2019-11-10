/**
@license
 * @pnp/sp-addinhelpers v1.0.4-2 - pnp - provides functionality for working within SharePoint add-ins
 * MIT (https://github.com/pnp/pnp/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnp/
 * source: https://github.com/pnp/pnp
 * bugs: https://github.com/pnp/pnp/issues
 */
import { UrlException, Util } from '@pnp/common';
import { Logger } from '@pnp/logging';
import { SPRest, Site, Web } from '@pnp/sp';

class SPRequestExecutorUndefinedException extends Error {
    constructor() {
        const msg = [
            "SP.RequestExecutor is undefined. ",
            "Load the SP.RequestExecutor.js library (/_layouts/15/SP.RequestExecutor.js) before loading the PnP JS Core library.",
        ].join(" ");
        super(msg);
        this.name = "SPRequestExecutorUndefinedException";
        Logger.error(this);
    }
}

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
            if (typeof spResponse.headers !== "undefined") {
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
        if (typeof SP === "undefined" || typeof SP.RequestExecutor === "undefined") {
            throw new SPRequestExecutorUndefinedException();
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
                requestOptions = Util.extend(requestOptions, { body: options.body });
            }
            else {
                requestOptions = Util.extend(requestOptions, { binaryStringRequestBody: true });
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
        if (!Util.isUrlAbsolute(addInWebUrl)) {
            throw new UrlException("The addInWebUrl parameter must be an absolute url.");
        }
        if (!Util.isUrlAbsolute(hostWebUrl)) {
            throw new UrlException("The hostWebUrl parameter must be an absolute url.");
        }
        const url = Util.combinePaths(addInWebUrl, "_api/SP.AppContextSite(@target)");
        const instance = new factory(url, urlPart);
        instance.query.add("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
        return instance.configure(this._options);
    }
}
const sp$1 = new SPRestAddIn();

export { SPRequestExecutorClient, SPRequestExecutorUndefinedException, SPRestAddIn, sp$1 as sp };
//# sourceMappingURL=sp-addinhelpers.js.map
