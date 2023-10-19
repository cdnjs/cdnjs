// ----------------------------------------------------------------------------
// Carrier.js - v2.5.0 - 2022-11-01
// (c) Ritik Chourasiya; License
// Created by: Ritik Chourasiya
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Enable strict mode to catch common coding mistakes
// ----------------------------------------------------------------------------
"use strict";

// ----------------------------------------------------------------------------
// Initialize a variable 'db' to be used for IndexedDB
// ----------------------------------------------------------------------------
let db = null;

// ----------------------------------------------------------------------------
// Define a helper object containing utility functions
// ----------------------------------------------------------------------------
let helpers = {
  // Check if an object is empty
  isObjectEmpty: (object = {}) => {
    return Object.keys(object).length === 0 && object.constructor === Object;
  },

  // Check if a value is empty (undefined, null, or an empty array)
  isEmpty: (a) => {
    return a === undefined || a === null || a.length === 0;
  },

  // Extract and parse all response headers from an XMLHttpRequest object
  getAllResponseHeaders: (req = {}) => {
    if (helpers.isObjectEmpty(req)) return req;

    let resHeaders = req.getAllResponseHeaders();
    let sendHeaders = {};

    // Split and parse each header, storing them in 'sendHeaders' object
    var resultArr = resHeaders.split('\r\n');
    resultArr.forEach((header) => {
      let headerArr = header.split(': ');
      if (headerArr.length > 1) sendHeaders[headerArr[0]] = headerArr[1];
    });

    return sendHeaders;
  }
};

// ----------------------------------------------------------------------------
// Define a function to display error messages in the console
// ----------------------------------------------------------------------------
let displayErrorMessage = (message) => {
  console.error(new Error(message));
  return;
};

// ----------------------------------------------------------------------------
// Handle IndexedDB operations using the 'DB' object
// ----------------------------------------------------------------------------
let DB = {
  // Create an IndexedDB instance
  createDB: () => {
    let promise = new Promise((resolve, reject) => {
      const request = indexedDB.open('carrierjs');

      // Handle database upgrade if needed
      request.onupgradeneeded = e => {
        db = e.target.result;
        const responsesDB = db.createObjectStore("responses", { keyPath: "url" });
      }

      // Handle successful database open
      request.onsuccess = e => {
        db = e.target.result;
        resolve();
      }

      // Handle database open error
      request.onerror = e => {
        console.log("onError", e);
      }
    });

    return promise;
  },

  // Check if the database has a response for a given URL
  hasResponse: (url = null) => {
    let promise = new Promise(function (resolve, reject) {
      if (!url) {
        displayErrorMessage("Invalid url");
        return;
      };

      const tx = db.transaction("responses", "readonly")
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

  // Add a response to the database and return it
  addResponse: (response) => {
    let promise = new Promise(function (resolve, reject) {
      const tx = db.transaction("responses", "readwrite")
      tx.onerror = e => console.log(e.target);
      const responseStore = tx.objectStore("responses");
      responseStore.add(response);
      resolve(response);
    });
    return promise;
  },

  // Update a response in the database and return it
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
};

// ----------------------------------------------------------------------------
// Define an object 'handleOptions' to handle request options
// ----------------------------------------------------------------------------
let handleOptions = {
  // Set request headers based on the provided headers object
  setRequestHeader: (req, headers = {}) => {
    if (helpers.isObjectEmpty(headers)) return;

    for (const header in headers) req.setRequestHeader(header, headers[header]);
  },

  // Set request parameters (e.g., query string) based on the provided parameters object
  setRequestParams: (url, params = {}) => {
    if (helpers.isObjectEmpty(params)) return url;
    url = url.slice(-1) === '/' ? url.slice(0, url.length - 1) : url;
    let query = '?';
    for (const param in params) query += `${param}=${params[param]}&`;
    return encodeURI(url + query.slice(0, query.length - 1));
  }
};

// ----------------------------------------------------------------------------
// Define the 'carrier' object for making HTTP requests
// ----------------------------------------------------------------------------
let carrier = {
  // Define a 'get' method for making GET requests
  get: function (url = null, refresh = false, options = {}) {
    let promise = new Promise(async (resolve, reject) => {

      if (helpers.isEmpty(url)) {
        reject({ name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND" });
        return;
      }

      await DB.createDB();
      let response = await DB.hasResponse(url);

      if (!refresh && response) {
        resolve(response);
      } else {

        let req = new XMLHttpRequest();
        req.responseType = 'json';

        if (options.params) {
          url = handleOptions.setRequestParams(url, options.params);
        }

        // Open the request
        req.open("GET", url);

        if (options.headers) {
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

          if (req.status === 200) {

            if (response) {
              await DB.updateResponse(res);
            }

            if (!response) {
              await DB.addResponse(res);
            }

            resolve(res);
          }

          if (req.status === 404) {
            reject({ name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", response: res, url: req.responseURL });
          }
        }

        // Handle minor network error
        req.onerror = () => {
          reject({ name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR" });
        }
      }
    });

    return promise;
  },

  // Define a 'post' method for making POST requests
  post: function (url = null, data = null, options = {}) {
    let promise = new Promise((resolve, reject) => {

      if (helpers.isEmpty(url)) {
        reject({ name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND" });
        return;
      }

      let req = new XMLHttpRequest();
      req.responseType = 'json';

      if (options.params) {
        url = handleOptions.setRequestParams(url, options.params);
      }

      req.open("POST", url);

      if (options.headers) {
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

        if (req.status === 200 || req.status === 201) {
          resolve(res);
        }

        if (req.status === 404) {
          reject({ name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", response: res, url: req.responseURL });
        }
      }

      // Handle minor network error
      req.onerror = () => {
        reject({ name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR" });
      }
    });

    return promise;
  },

  // Define a 'put' method for making PUT requests
  put: function (url = null, data = null, options = {}) {
    let promise = new Promise((resolve, reject) => {

      if (helpers.isEmpty(url)) {
        reject({ name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND" });
        return;
      }

      let req = new XMLHttpRequest();
      req.responseType = 'json';

      if (options.params) {
        url = handleOptions.setRequestParams(url, options.params);
      }

      req.open("PUT", url);

      if (options.headers) {
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

        if (req.status === 200 || req.status === 201) {
          resolve(res);
        }

        if (req.status === 404) {
          reject({ name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", response: res, url: req.responseURL });
        }
      }

      // Handle minor network error
      req.onerror = () => {
        reject({ name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR" });
      }
    });

    return promise;
  },

  // Define a 'patch' method for making PATCH requests
  patch: function (url = null, data = null, options = {}) {
    let promise = new Promise((resolve, reject) => {

      if (helpers.isEmpty(url)) {
        reject({ name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND" });
        return;
      }

      let req = new XMLHttpRequest();
      req.responseType = 'json';

      if (options.params) {
        url = handleOptions.setRequestParams(url, options.params);
      }

      req.open("PATCH", url);

      if (options.headers) {
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

        if (req.status === 200 || req.status === 201) {
          resolve(res);
        }

        if (req.status === 404) {
          reject({ name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", response: res, url: req.responseURL });
        }
      }

      // Handle minor network error
      req.onerror = () => {
        reject({ name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR" });
      }
    });

    return promise;
  },

  // Define a 'delete' method for making DELETE requests
  delete: function (url = null, data = null, options = {}) {
    let promise = new Promise((resolve, reject) => {

      if (helpers.isEmpty(url)) {
        reject({ name: "CarrierError", message: "Url is required to make request", code: "NOT_FOUND" });
        return;
      }

      let req = new XMLHttpRequest();
      req.responseType = 'json';

      if (options.params) {
        url = handleOptions.setRequestParams(url, options.params);
      }

      req.open("DELETE", url);

      if (options.headers) {
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

        if (req.status === 200 || req.status === 201) {
          resolve(res);
        }

        if (req.status === 404) {
          reject({ name: "CarrierError", request: req, message: "Request failed with status code 404", code: "BAD_REQUEST", response: res, url: req.responseURL });
        }
      }

      // Handle minor network error
      req.onerror = () => {
        reject({ name: "CarrierError", request: req, message: "Network Error", code: "NETWORK_ERROR" });
      }
    });

    return promise;
  },
};

// ----------------------------------------------------------------------------
// Define a self-invoking function to export the 'carrier' object based on the environment
// ----------------------------------------------------------------------------
(function () {
  // Export 'carrier' as a module in a Node.js environment
  if (typeof module === 'object' && module.exports) {
    module.exports = carrier;
  }
  // Export 'carrier' as an AMD module
  else if (typeof define === 'function' && define.amd) {
    define(carrier);
  }
  // Export 'carrier' as a global variable
  else if (typeof module === 'undefined') {
    globalThis.carrier = carrier;
  }

  // Create the IndexedDB instance when the script is loaded
  (async () => {
    try {
      await DB.createDB();
    } catch (error) {
      console.error('Error initializing IndexedDB:', error);
    }
  })();
})();
