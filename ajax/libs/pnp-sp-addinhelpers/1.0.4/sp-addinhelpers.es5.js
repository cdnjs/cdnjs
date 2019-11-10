/**
@license
 * @pnp/sp-addinhelpers v1.0.4 - pnp - provides functionality for working within SharePoint add-ins
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https:github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { __extends } from 'tslib';
import { Logger } from '@pnp/logging';
import { extend, isUrlAbsolute, combinePaths, UrlException } from '@pnp/common';
import { SPRest, Web, Site } from '@pnp/sp';

var SPRequestExecutorUndefinedException = /** @class */ (function (_super) {
    __extends(SPRequestExecutorUndefinedException, _super);
    function SPRequestExecutorUndefinedException() {
        var _this = this;
        var msg = [
            "SP.RequestExecutor is undefined. ",
            "Load the SP.RequestExecutor.js library (/_layouts/15/SP.RequestExecutor.js) before loading the PnP JS Core library.",
        ].join(" ");
        _this = _super.call(this, msg) || this;
        _this.name = "SPRequestExecutorUndefinedException";
        Logger.error(_this);
        return _this;
    }
    return SPRequestExecutorUndefinedException;
}(Error));

/**
 * Makes requests using the SP.RequestExecutor library.
 */
var SPRequestExecutorClient = /** @class */ (function () {
    function SPRequestExecutorClient() {
        /**
         * Converts a SharePoint REST API response to a fetch API response.
         */
        this.convertToResponse = function (spResponse) {
            var responseHeaders = new Headers();
            if (typeof spResponse.headers !== "undefined") {
                for (var h in spResponse.headers) {
                    if (spResponse.headers[h]) {
                        responseHeaders.append(h, spResponse.headers[h]);
                    }
                }
            }
            // Cannot have an empty string body when creating a Response with status 204
            var body = spResponse.statusCode === 204 ? null : spResponse.body;
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
    SPRequestExecutorClient.prototype.fetch = function (url, options) {
        var _this = this;
        if (typeof SP === "undefined" || typeof SP.RequestExecutor === "undefined") {
            throw new SPRequestExecutorUndefinedException();
        }
        var addinWebUrl = url.substring(0, url.indexOf("/_api")), executor = new SP.RequestExecutor(addinWebUrl);
        var headers = {}, iterator, temp;
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
        return new Promise(function (resolve, reject) {
            var requestOptions = {
                error: function (error) {
                    reject(_this.convertToResponse(error));
                },
                headers: headers,
                method: options.method,
                success: function (response) {
                    resolve(_this.convertToResponse(response));
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
    };
    return SPRequestExecutorClient;
}());

var SPRestAddIn = /** @class */ (function (_super) {
    __extends(SPRestAddIn, _super);
    function SPRestAddIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Begins a cross-domain, host site scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    SPRestAddIn.prototype.crossDomainSite = function (addInWebUrl, hostWebUrl) {
        return this._cdImpl(Site, addInWebUrl, hostWebUrl, "site");
    };
    /**
     * Begins a cross-domain, host web scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    SPRestAddIn.prototype.crossDomainWeb = function (addInWebUrl, hostWebUrl) {
        return this._cdImpl(Web, addInWebUrl, hostWebUrl, "web");
    };
    /**
     * Implements the creation of cross domain REST urls
     *
     * @param factory The constructor of the object to create Site | Web
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     * @param urlPart String part to append to the url "site" | "web"
     */
    SPRestAddIn.prototype._cdImpl = function (factory, addInWebUrl, hostWebUrl, urlPart) {
        if (!isUrlAbsolute(addInWebUrl)) {
            throw new UrlException("The addInWebUrl parameter must be an absolute url.");
        }
        if (!isUrlAbsolute(hostWebUrl)) {
            throw new UrlException("The hostWebUrl parameter must be an absolute url.");
        }
        var url = combinePaths(addInWebUrl, "_api/SP.AppContextSite(@target)");
        var instance = new factory(url, urlPart);
        instance.query.add("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
        return instance.configure(this._options);
    };
    return SPRestAddIn;
}(SPRest));
var sp = new SPRestAddIn();

export { SPRequestExecutorClient, SPRequestExecutorUndefinedException, SPRestAddIn, sp };
//# sourceMappingURL=sp-addinhelpers.es5.js.map
