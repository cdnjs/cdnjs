import { Util } from '@pnp/common';
import { LogLevel, Logger } from '@pnp/logging';

class SPRequestExecutorUndefinedException extends Error {
    constructor() {
        const msg = [
            "SP.RequestExecutor is undefined. ",
            "Load the SP.RequestExecutor.js library (/_layouts/15/SP.RequestExecutor.js) before loading the PnP JS Core library.",
        ].join(" ");
        super(msg);
        this.name = "SPRequestExecutorUndefinedException";
        Logger.log({ data: {}, level: LogLevel.Error, message: `[${this.name}]::${this.message}` });
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
            // issue #256, Cannot have an empty string body when creating a Response with status 204
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

export { SPRequestExecutorClient };
//# sourceMappingURL=sp-addinhelpers.js.map
