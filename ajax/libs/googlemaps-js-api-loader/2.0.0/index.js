/*
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function setScriptSrc(script, src) {
    script.src = src;
}

/*
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */


const bootstrap = bootstrapParams => {
  var bootstrapPromise;
  var script;
  var bootstrapParamsKey;
  var PRODUCT_NAME = "The Google Maps JavaScript API";
  var GOOGLE = "google";
  var IMPORT_API_NAME = "importLibrary";
  var PENDING_BOOTSTRAP_KEY = "__ib__";
  var doc = document;
  var global_ = window;
  var google_ = global_[GOOGLE] || (global_[GOOGLE] = {});
  var namespace = google_.maps || (google_.maps = {});
  var libraries = new Set();
  var searchParams = new URLSearchParams();
  var triggerBootstrap = () => bootstrapPromise || (bootstrapPromise = new Promise(async(resolve, reject) => {
    await (script = doc.createElement("script"));
    searchParams.set("libraries", [...libraries] + "");
    for (bootstrapParamsKey in bootstrapParams) {
      searchParams.set(bootstrapParamsKey.replace(/[A-Z]/g, g => "_" + g[0].toLowerCase()), bootstrapParams[bootstrapParamsKey]);
    }
    searchParams.set("callback", GOOGLE + ".maps." + PENDING_BOOTSTRAP_KEY);
    setScriptSrc(script, "https://maps.googleapis.com/maps/api/js?" + searchParams);
    namespace[PENDING_BOOTSTRAP_KEY] = resolve;
    script.onerror = () => bootstrapPromise = reject(Error(PRODUCT_NAME + " could not load."));
    script.nonce = doc.querySelector("script[nonce]")?.nonce || "";
    doc.head.append(script);
  }));
  namespace[IMPORT_API_NAME] ? console.warn(PRODUCT_NAME + " only loads once. Ignoring:", bootstrapParams) : namespace[IMPORT_API_NAME] = (libraryName, ...args) => libraries.add(libraryName) && triggerBootstrap().then(() => namespace[IMPORT_API_NAME](libraryName, ...args));
};

const MSG_DEPRECATED_LOADER = "The Loader class is no longer available in this version." +
    "\nPlease use the new functional API: setOptions() and importLibrary()." +
    "\nFor more information, see the updated documentation at: " +
    "https://github.com/googlemaps/js-api-loader/blob/main/README.md";
const MSG_REPEATED_SET_OPTIONS = (options) => `The setOptions() function should only be called once. The options passed ` +
    `to the additional call (${JSON.stringify(options)}) will be ignored.`;
const MSG_IMPORT_LIBRARY_EXISTS = (options) => `The google.maps.importLibrary() function is already defined, and ` +
    `@googlemaps/js-api-loader will use the existing function instead of ` +
    `overwriting it. The options passed to setOptions ` +
    `(${JSON.stringify(options)}) will be ignored.`;
const MSG_SET_OPTIONS_NOT_CALLED = "No options were set before calling importLibrary. Make sure to configure " +
    "the loader using setOptions().";
const MSG_SCRIPT_ELEMENT_EXISTS = "There already is a script loading the Google Maps JavaScript " +
    "API, and no google.maps.importLibrary function is defined. " +
    "@googlemaps/js-api-loader will proceed to bootstrap the API " +
    "with the specified options, but the existing script might cause " +
    "problems using the API. Make sure to remove the script " +
    "loading the API.";
const logDevWarning = process.env.NODE_ENV !== "production"
    ? (message) => {
        console.warn(`[@googlemaps/js-api-loader] ${message}`);
    }
    : () => { };
const logDevNotice = process.env.NODE_ENV !== "production"
    ? (message) => {
        console.info(`[@googlemaps/js-api-loader] ${message}`);
    }
    : () => { };

/*
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
/**
 * @deprecated Use the new functional API: `setOptions()` and `importLibrary()`.
 * See the migration guide for more details: MIGRATION.md
 */
class Loader {
    constructor(...args) {
        throw new Error(`[@googlemaps/js-api-loader]: ${MSG_DEPRECATED_LOADER}`);
    }
}

/*
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let setOptionsWasCalled_ = false;
/**
 * Sets the options for the Maps JavaScript API.
 *
 * Has to be called before any library is loaded.
 *
 * See https://developers.google.com/maps/documentation/javascript/load-maps-js-api#required_parameters
 * for the full documentation of available options.
 *
 * @param options The options to set.
 */
function setOptions(options) {
    if (setOptionsWasCalled_) {
        logDevWarning(MSG_REPEATED_SET_OPTIONS(options));
        return;
    }
    installImportLibrary_(options);
    setOptionsWasCalled_ = true;
}
async function importLibrary(libraryName) {
    if (!setOptionsWasCalled_) {
        logDevWarning(MSG_SET_OPTIONS_NOT_CALLED);
    }
    if (!window?.google?.maps?.importLibrary) {
        throw new Error("google.maps.importLibrary is not installed.");
    }
    return (await google.maps.importLibrary(libraryName));
}
/**
 * The installImportLibrary_ function makes sure that a usable version of the
 * `google.maps.importLibrary` function exists.
 */
function installImportLibrary_(options) {
    const importLibraryExists = Boolean(window.google?.maps?.importLibrary);
    if (importLibraryExists) {
        logDevNotice(MSG_IMPORT_LIBRARY_EXISTS(options));
    }
    else if (process.env.NODE_ENV !== "production") {
        const scriptEl = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
        if (scriptEl) {
            logDevWarning(MSG_SCRIPT_ELEMENT_EXISTS);
        }
    }
    // If the google.maps.importLibrary function already exists, bootstrap()
    // won't do anything, so we won't call it
    if (!importLibraryExists) {
        bootstrap(options);
    }
}

export { Loader, importLibrary, setOptions };
//# sourceMappingURL=index.js.map
