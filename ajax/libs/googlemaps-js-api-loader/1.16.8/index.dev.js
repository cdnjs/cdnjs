this.google = this.google || {};
this.google.maps = this.google.maps || {};
this.google.maps.plugins = this.google.maps.plugins || {};
this.google.maps.plugins.loader = (function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */

    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    // do not edit .js files directly - edit src/index.jst

    var fastDeepEqual = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == 'object' && typeof b == 'object') {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0;) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }

      // true if both NaN, false otherwise
      return a !== a && b !== b;
    };
    var isEqual = /*@__PURE__*/getDefaultExportFromCjs(fastDeepEqual);

    /**
     * Copyright 2019 Google LLC. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at.
     *
     *      Http://www.apache.org/licenses/LICENSE-2.0.
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const DEFAULT_ID = "__googleMapsScriptId";
    /**
     * The status of the [[Loader]].
     */
    exports.LoaderStatus = void 0;
    (function (LoaderStatus) {
      LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
      LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
      LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
      LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
    })(exports.LoaderStatus || (exports.LoaderStatus = {}));
    /**
     * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
     * dynamically using
     * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
     * It works by dynamically creating and appending a script node to the the
     * document head and wrapping the callback function so as to return a promise.
     *
     * ```
     * const loader = new Loader({
     *   apiKey: "",
     *   version: "weekly",
     *   libraries: ["places"]
     * });
     *
     * loader.load().then((google) => {
     *   const map = new google.maps.Map(...)
     * })
     * ```
     */
    class Loader {
      /**
       * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
       * using this library, instead the defaults are set by the Google Maps
       * JavaScript API server.
       *
       * ```
       * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
       * ```
       */
      constructor(_ref) {
        let {
          apiKey,
          authReferrerPolicy,
          channel,
          client,
          id = DEFAULT_ID,
          language,
          libraries = [],
          mapIds,
          nonce,
          region,
          retries = 3,
          url = "https://maps.googleapis.com/maps/api/js",
          version
        } = _ref;
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if (Loader.instance) {
          if (!isEqual(this.options, Loader.instance.options)) {
            throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
          }
          return Loader.instance;
        }
        Loader.instance = this;
      }
      get options() {
        return {
          version: this.version,
          apiKey: this.apiKey,
          channel: this.channel,
          client: this.client,
          id: this.id,
          libraries: this.libraries,
          language: this.language,
          region: this.region,
          mapIds: this.mapIds,
          nonce: this.nonce,
          url: this.url,
          authReferrerPolicy: this.authReferrerPolicy
        };
      }
      get status() {
        if (this.errors.length) {
          return exports.LoaderStatus.FAILURE;
        }
        if (this.done) {
          return exports.LoaderStatus.SUCCESS;
        }
        if (this.loading) {
          return exports.LoaderStatus.LOADING;
        }
        return exports.LoaderStatus.INITIALIZED;
      }
      get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
      }
      /**
       * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
       *
       * @ignore
       * @deprecated
       */
      createUrl() {
        let url = this.url;
        url += `?callback=__googleMapsCallback&loading=async`;
        if (this.apiKey) {
          url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
          url += `&channel=${this.channel}`;
        }
        if (this.client) {
          url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
          url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
          url += `&language=${this.language}`;
        }
        if (this.region) {
          url += `&region=${this.region}`;
        }
        if (this.version) {
          url += `&v=${this.version}`;
        }
        if (this.mapIds) {
          url += `&map_ids=${this.mapIds.join(",")}`;
        }
        if (this.authReferrerPolicy) {
          url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        }
        return url;
      }
      deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
          script.remove();
        }
      }
      /**
       * Load the Google Maps JavaScript API script and return a Promise.
       * @deprecated, use importLibrary() instead.
       */
      load() {
        return this.loadPromise();
      }
      /**
       * Load the Google Maps JavaScript API script and return a Promise.
       *
       * @ignore
       * @deprecated, use importLibrary() instead.
       */
      loadPromise() {
        return new Promise((resolve, reject) => {
          this.loadCallback(err => {
            if (!err) {
              resolve(window.google);
            } else {
              reject(err.error);
            }
          });
        });
      }
      importLibrary(name) {
        this.execute();
        return google.maps.importLibrary(name);
      }
      /**
       * Load the Google Maps JavaScript API script with a callback.
       * @deprecated, use importLibrary() instead.
       */
      loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
      }
      /**
       * Set the script on document.
       */
      setScript() {
        var _a, _b;
        if (document.getElementById(this.id)) {
          // TODO wrap onerror callback for cases where the script was loaded elsewhere
          this.callback();
          return;
        }
        const params = {
          key: this.apiKey,
          channel: this.channel,
          client: this.client,
          libraries: this.libraries.length && this.libraries,
          v: this.version,
          mapIds: this.mapIds,
          language: this.language,
          region: this.region,
          authReferrerPolicy: this.authReferrerPolicy
        };
        // keep the URL minimal:
        Object.keys(params).forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        key => !params[key] && delete params[key]);
        if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
          // tweaked copy of https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
          // which also sets the base url, the id, and the nonce
          /* eslint-disable */
          (g => {
            // @ts-ignore
            let h,
              a,
              k,
              p = "The Google Maps JavaScript API",
              c = "google",
              l = "importLibrary",
              q = "__ib__",
              m = document,
              b = window;
            // @ts-ignore
            b = b[c] || (b[c] = {});
            // @ts-ignore
            const d = b.maps || (b.maps = {}),
              r = new Set(),
              e = new URLSearchParams(),
              u = () =>
              // @ts-ignore
              h || (h = new Promise((f, n) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield a = m.createElement("script");
                a.id = this.id;
                e.set("libraries", [...r] + "");
                // @ts-ignore
                for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
                e.set("callback", c + ".maps." + q);
                a.src = this.url + `?` + e;
                d[q] = f;
                a.onerror = () => h = n(Error(p + " could not load."));
                // @ts-ignore
                a.nonce = this.nonce || ((_a = m.querySelector("script[nonce]")) === null || _a === void 0 ? void 0 : _a.nonce) || "";
                m.head.append(a);
              })));
            // @ts-ignore
            d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = function (f) {
              for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                n[_key - 1] = arguments[_key];
              }
              return r.add(f) && u().then(() => d[l](f, ...n));
            };
          })(params);
          /* eslint-enable */
        }
        // While most libraries populate the global namespace when loaded via bootstrap params,
        // this is not the case for "marker" when used with the inline bootstrap loader
        // (and maybe others in the future). So ensure there is an importLibrary for each:
        const libraryPromises = this.libraries.map(library => this.importLibrary(library));
        // ensure at least one library, to kick off loading...
        if (!libraryPromises.length) {
          libraryPromises.push(this.importLibrary("core"));
        }
        Promise.all(libraryPromises).then(() => this.callback(), error => {
          const event = new ErrorEvent("error", {
            error
          }); // for backwards compat
          this.loadErrorCallback(event);
        });
      }
      /**
       * Reset the loader state.
       */
      reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
      }
      resetIfRetryingFailed() {
        if (this.failed) {
          this.reset();
        }
      }
      loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
          const delay = this.errors.length * Math.pow(2, this.errors.length);
          console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
          setTimeout(() => {
            this.deleteScript();
            this.setScript();
          }, delay);
        } else {
          this.onerrorEvent = e;
          this.callback();
        }
      }
      callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach(cb => {
          cb(this.onerrorEvent);
        });
        this.callbacks = [];
      }
      execute() {
        this.resetIfRetryingFailed();
        if (this.loading) {
          // do nothing but wait
          return;
        }
        if (this.done) {
          this.callback();
        } else {
          // short circuit and warn if google.maps is already loaded
          if (window.google && window.google.maps && window.google.maps.version) {
            console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. " + "This may result in undesirable behavior as options and script parameters may not match.");
            this.callback();
            return;
          }
          this.loading = true;
          this.setScript();
        }
      }
    }

    exports.DEFAULT_ID = DEFAULT_ID;
    exports.Loader = Loader;

    return exports;

})({});
//# sourceMappingURL=index.dev.js.map
