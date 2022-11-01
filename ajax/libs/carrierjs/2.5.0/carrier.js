/*!
 * Carrier.js
 * v2.5.0 - 2022-11-01
 * (c) Ritik Chourasiya;  License
 * Created by: Ritik Chourasiya
 */

"use strict";
let db = null;

let helpers = {
    isObjectEmpty: (object = {}) => {
        return Object.keys(object).length === 0 && object.constructor === Object;
    },

    isEmpty: (a) => {
        if(a === undefined || a === null || a.length === 0) return true;
        else return false;
    },

    getAllResponseHeaders: (req = {}) => {
        if(helpers.isObjectEmpty(req)) return req;

        let resHeaders = req.getAllResponseHeaders();
        let sendHeaders = {};
        
        var resultArr = resHeaders.split('\r\n');

        resultArr.forEach((header) => {
            let headerArr = header.split(': ');
            if(headerArr.length > 1) sendHeaders[headerArr[0]] = headerArr[1];
        });

        return sendHeaders;
    }
}

let displayErrorMessage = (message) => {
    console.error(new Error(message));
    return;
}

// Handle IndexedDb 
let DB = {
    // create indexedDB instance
    createDB: () => {
        let promise = new Promise((resolve, reject) => {
            const request = indexedDB.open('carrierjs');
    
            //on upgrade needed
            request.onupgradeneeded = e => {
                db = e.target.result;
                const responsesDB = db.createObjectStore("responses", {keyPath: "url"})
            }
    
            //on success 
            request.onsuccess = e => {
                db = e.target.result;
                // db.name = "responses";
                resolve();
            }
    
            //on error
            request.onerror = e => {
                console.log("onError", e);
            }
        });
    
        return promise;
    },

    // check db has response data, if yes then return it;
    hasResponse: (url = null) => {
        let promise = new Promise(function(resolve, reject) {
            if(!url) {
                displayErrorMessage("Invalid url");
                return;
            };
    
            const tx = db.transaction("responses","readonly")
            const requestStore = tx.objectStore("responses")
            const request = requestStore.get(url);
            let res = undefined;
            request.onsuccess = e => {
    
                res = e.target.result;
                resolve(res);
            };
        });
    
        return promise;
    },

    // add response to db, and return it;
    addResponse: (response) => {
        let promise = new Promise(function(resolve, reject) {
    
            const tx = db.transaction("responses", "readwrite")
            tx.onerror = e => console.log(e.target);
            const responseStore = tx.objectStore("responses");
            responseStore.add(response);
            resolve(response);
        });
        return promise;
    },

    // update response to db, and return it;
    updateResponse: (response) => {
        let promise = new Promise((resolve, reject) => {
            const tx = db.transaction("responses", "readwrite")
            tx.onerror = e => console.log(e.target);
            const responseStore = tx.objectStore("responses");
            responseStore.put(response);
            resolve(response);
        });
    
        return promise;
    },
}

let handleOptions = {
    setRequestHeader: (req, headers = {}) => {
        if(helpers.isObjectEmpty(headers)) return;

        for (const header in headers) req.setRequestHeader(header, headers[header]);
    },
    setRequestParams: (url, params = {}) => {
        if(helpers.isObjectEmpty(params)) return url;
        url = url.slice(-1) === '/' ? url.slice(0, url.length - 1) : url;
        let query = '?';
        for (const param in params) query += `${param}=${params[param]}&`;
        return encodeURI(url+query.slice(0, query.length - 1));
    }
}

let carrier = {
    get: function(url = null, refresh = false, options = {}) {

        let promise = new Promise(async (resolve, reject) =>{

            if(helpers.isEmpty(url)) {
                reject({name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND"});
                return;
            }

            await DB.createDB();
            let response = await DB.hasResponse(url);

            if(!refresh && response) {
                resolve(response);
            } else {

                let req = new XMLHttpRequest();
                req.responseType = 'json';

                if(options.params) {
                    url = handleOptions.setRequestParams(url, options.params);
                }

                //Open the request
                req.open("GET", url);
                
                if(options.headers) {
                    handleOptions.setRequestHeader(req, options.headers);
                }

                if (options.timeout) {
                    req.timeout = options.timeout;
                }

                req.send();

                req.onload = async () => {

                    // Response Object
                    const res = {
                        response: req.response,
                        headers: helpers.getAllResponseHeaders(req),
                        request: req.readyState,
                        url: req.responseURL,
                        status: req.status,
                        type: 'json'
                    };

                    if(req.status === 200) {

                        if(response) {
                            await DB.updateResponse(res);
                        }
                        
                        if(!response) {
                            await DB.addResponse(res);
                        }

                        resolve(res);
                    }

                    if(req.status === 404) {
                        reject({name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", 
                            response: res, url: req.responseURL});
                    }
                }

                // Handle minor network error
                req.onerror = () => {
                    reject({name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR"});
                }
            }
        });

        return promise;
    },

    post: function(url = null, data = null, options = {}) {
        let promise = new Promise((resolve, reject) =>{

            if(helpers.isEmpty(url)) {
                reject({name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND"});
                return;
            }

            let req = new XMLHttpRequest();
            req.responseType = 'json';

            if(options.params) {
                url = handleOptions.setRequestParams(url, options.params);
            }

            req.open("POST", url);

            if(options.headers) {
                handleOptions.setRequestHeader(req, options.headers);
            }

            if (options.timeout) {
                req.timeout = options.timeout;
            }

            req.send(JSON.stringify(data) || null);

            req.onload = () => {
                // Response Object
                const res = {
                    response: req.response,
                    headers: helpers.getAllResponseHeaders(req),
                    request: req.readyState,
                    url: req.responseURL,
                    status: req.status,
                    type: 'json'
                };

                if(req.status === 200 || req.status === 201) {
                    resolve(res);
                }

                if(req.status === 404) {
                    reject({name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", 
                        response: res, url: req.responseURL});
                }
            }

            // Handle minor network error
            req.onerror = () => {
                reject({name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR"});
            }
        });

        return promise;
    },
    
    put: function(url = null, data = null, options = {}) {
        let promise = new Promise((resolve, reject) =>{
            
            if(helpers.isEmpty(url)) {
                reject({name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND"});
                return;
            }

            let req = new XMLHttpRequest();
            req.responseType = 'json';

            if(options.params) {
                url = handleOptions.setRequestParams(url, options.params);
            }

            req.open("PUT", url);

            if(options.headers) {
                handleOptions.setRequestHeader(req, options.headers);
            }

            if (options.timeout) {
                req.timeout = options.timeout;
            }

            req.send(JSON.stringify(data) || null);

            req.onload = () => {
                // Response Object
                const res = {
                    response: req.response,
                    headers: helpers.getAllResponseHeaders(req),
                    request: req.readyState,
                    url: req.responseURL,
                    status: req.status,
                    type: 'json'
                };

                if(req.status === 200 || req.status === 201) {
                    resolve(res);
                }

                if(req.status === 404) {
                    reject({name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", 
                        response: res, url: req.responseURL});
                }
            }

            // Handle minor network error
            req.onerror = () => {
                reject({name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR"});
            }
        });

        return promise;
    },
    patch: function(url = null, data = null, options = {}) {
        let promise = new Promise((resolve, reject) =>{
            
            if(helpers.isEmpty(url)) {
                reject({name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND"});
                return;
            }

            let req = new XMLHttpRequest();
            req.responseType = 'json';

            if(options.params) {
                url = handleOptions.setRequestParams(url, options.params);
            }
            
            req.open("PATCH", url);

            if(options.headers) {
                handleOptions.setRequestHeader(req, options.headers);
            }

            if (options.timeout) {
                req.timeout = options.timeout;
            }

            req.send(JSON.stringify(data) || null);

            req.onload = () => {
                // Response Object
                const res = {
                    response: req.response,
                    headers: helpers.getAllResponseHeaders(req),
                    request: req.readyState,
                    url: req.responseURL,
                    status: req.status,
                    type: 'json'
                };

                if(req.status === 200 || req.status === 201) {
                    resolve(res);
                }

                if(req.status === 404) {
                    reject({name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", 
                        response: res, url: req.responseURL});
                }
            }

            // Handle minor network error
            req.onerror = () => {
                reject({name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR"});
            }
        });

        return promise;
    },
    delete: function(url = null, data = null, options = {}) {
        let promise = new Promise((resolve, reject) =>{
            
            if(helpers.isEmpty(url)) {
                reject({name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND"});
                return;
            }

            let req = new XMLHttpRequest();
            req.responseType = 'json';

            if(options.params) {
                url = handleOptions.setRequestParams(url, options.params);
            }
            
            req.open("DELETE", url);
            
            if(options.headers) {
                handleOptions.setRequestHeader(req, options.headers);
            }

            if (options.timeout) {
                req.timeout = options.timeout;
            }

            req.send(JSON.stringify(data) || null);

            req.onload = () => {
                // Response Object
                const res = {
                    response: req.response,
                    headers: helpers.getAllResponseHeaders(req),
                    request: req.readyState,
                    url: req.responseURL,
                    status: req.status,
                    type: 'json'
                };

                if(req.status === 200 || req.status === 201) {
                    resolve(res);
                }

                if(req.status === 404) {
                    reject({name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", 
                        response: res, url: req.responseURL});
                }
            }

            // Handle minor network error
            req.onerror = () => {
                reject({name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR"});
            }
        });

        return promise;
    },
}

!function () {
    if(typeof module === 'object' && module.exports) {
        module.exports = carrier;
    } else if(typeof define === 'function' && define.amd) {
        define(carrier);
    } else if(typeof module === 'undefined') {
        globalThis.carrier = carrier;
    }

    (async () => {
        await DB.createDB();
    })();
}();