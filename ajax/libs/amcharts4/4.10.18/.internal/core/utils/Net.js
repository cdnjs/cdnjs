/**
 * A collection of network-related functions
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import * as $type from "./Type";
/**
 * Loads an external file via its URL.
 *
 * Please note that this is an asynchronous function.
 *
 * It will not return the result, but rather a `Promise`.
 *
 * You can use the `await` notion, or `then()`.
 *
 * ```TypeScript
 * // Using await
 * let response = await Net.load( "http://www.my.com/data.json" );
 * console.log( response.response );
 *
 * // Using then()
 * Net.load( "http://www.my.com/data.json" ).then( ( response ) => {
 *   console.log( response.response );
 * } );
 * ```
 * ```JavaScript
 * // Using then()
 * Net.load( "http://www.my.com/data.json" ).then( function( response ) {
 *   console.log( response.response );
 * } );
 * ```
 *
 * @async
 * @param url      URL for the file to load
 * @param target   A target element that is requesting the net load
 * @param options  Request options
 * @return Result (Promise)
 */
export function load(url, target, options) {
    return new Promise(function (success, error) {
        // Is return type Blob?
        var isBlob = $type.hasValue(options) && options.responseType == "blob";
        // Create request and set up handlers
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = void 0;
                var blob_1;
                if (isBlob) {
                    blob_1 = xhr.response;
                    readBlob(blob_1).then(function (response) {
                        var output = {
                            xhr: xhr,
                            error: false,
                            response: response,
                            blob: blob_1,
                            type: xhr.getResponseHeader("Content-Type"),
                            target: target
                        };
                        success(output);
                    });
                    return;
                }
                else {
                    response = xhr.responseText || xhr.response;
                }
                var output = {
                    xhr: xhr,
                    error: false,
                    response: response,
                    blob: blob_1,
                    type: xhr.getResponseHeader("Content-Type"),
                    target: target
                };
                success(output);
            }
            else {
                error({
                    xhr: xhr,
                    error: true,
                    type: xhr.getResponseHeader("Content-Type"),
                    target: target
                });
            }
        };
        xhr.onerror = function () {
            error({
                xhr: xhr,
                error: true,
                type: xhr.getResponseHeader("Content-Type"),
                target: target
            });
        };
        // Open request
        xhr.open("GET", url, true);
        if (options && options.withCredentials) {
            xhr.withCredentials = true;
        }
        // Process options
        if ($type.hasValue(options)) {
            if ($type.hasValue(options.requestHeaders)) {
                for (var i = 0; i < options.requestHeaders.length; i++) {
                    var header = options.requestHeaders[i];
                    xhr.setRequestHeader(header.key, header.value);
                }
            }
            if ($type.hasValue(options.responseType)) {
                xhr.responseType = options.responseType;
            }
        }
        // Send request
        xhr.send();
    });
}
/**
 * Returns textual representation of a Blob object.
 *
 * @param   blob  Target blob
 * @return        Text promise
 */
export function readBlob(blob) {
    return new Promise(function (success, error) {
        var reader = new FileReader();
        reader.onload = function (event) {
            success(reader.result);
        };
        reader.onerror = function (e) {
            error(e);
        };
        reader.readAsText(blob);
    });
}
//# sourceMappingURL=Net.js.map