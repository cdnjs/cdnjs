"use strict";

exports.__esModule = true;
exports.default = exports.ImageUriCache = void 0;

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const dataUriPattern = /^data:/;

class ImageUriCache {
  static has(uri) {
    const entries = ImageUriCache._entries;
    const isDataUri = dataUriPattern.test(uri);
    return isDataUri || Boolean(entries[uri]);
  }

  static add(uri) {
    const entries = ImageUriCache._entries;
    const lastUsedTimestamp = Date.now();

    if (entries[uri]) {
      entries[uri].lastUsedTimestamp = lastUsedTimestamp;
      entries[uri].refCount += 1;
    } else {
      entries[uri] = {
        lastUsedTimestamp,
        refCount: 1
      };
    }
  }

  static remove(uri) {
    const entries = ImageUriCache._entries;

    if (entries[uri]) {
      entries[uri].refCount -= 1;
    } // Free up entries when the cache is "full"


    ImageUriCache._cleanUpIfNeeded();
  }

  static _cleanUpIfNeeded() {
    const entries = ImageUriCache._entries;
    const imageUris = Object.keys(entries);

    if (imageUris.length + 1 > ImageUriCache._maximumEntries) {
      let leastRecentlyUsedKey;
      let leastRecentlyUsedEntry;
      imageUris.forEach(uri => {
        const entry = entries[uri];

        if ((!leastRecentlyUsedEntry || entry.lastUsedTimestamp < leastRecentlyUsedEntry.lastUsedTimestamp) && entry.refCount === 0) {
          leastRecentlyUsedKey = uri;
          leastRecentlyUsedEntry = entry;
        }
      });

      if (leastRecentlyUsedKey) {
        delete entries[leastRecentlyUsedKey];
      }
    }
  }

}

exports.ImageUriCache = ImageUriCache;
ImageUriCache._maximumEntries = 256;
ImageUriCache._entries = {};
let id = 0;
const requests = {};
const ImageLoader = {
  abort(requestId) {
    let image = requests["" + requestId];

    if (image) {
      image.onerror = null;
      image.onload = null;
      image = null;
      delete requests["" + requestId];
    }
  },

  getSize(uri, success, failure) {
    let complete = false;
    const interval = setInterval(callback, 16);
    const requestId = ImageLoader.load(uri, callback, errorCallback);

    function callback() {
      const image = requests["" + requestId];

      if (image) {
        const naturalHeight = image.naturalHeight,
              naturalWidth = image.naturalWidth;

        if (naturalHeight && naturalWidth) {
          success(naturalWidth, naturalHeight);
          complete = true;
        }
      }

      if (complete) {
        ImageLoader.abort(requestId);
        clearInterval(interval);
      }
    }

    function errorCallback() {
      if (typeof failure === 'function') {
        failure();
      }

      ImageLoader.abort(requestId);
      clearInterval(interval);
    }
  },

  has(uri) {
    return ImageUriCache.has(uri);
  },

  load(uri, onLoad, onError) {
    id += 1;
    const image = new window.Image();
    image.onerror = onError;

    image.onload = e => {
      // avoid blocking the main thread
      const onDecode = () => onLoad({
        nativeEvent: e
      });

      if (typeof image.decode === 'function') {
        // Safari currently throws exceptions when decoding svgs.
        // We want to catch that error and allow the load handler
        // to be forwarded to the onLoad handler in this case
        image.decode().then(onDecode, onDecode);
      } else {
        setTimeout(onDecode, 0);
      }
    };

    image.src = uri;
    requests["" + id] = image;
    return id;
  },

  prefetch(uri) {
    return new Promise((resolve, reject) => {
      ImageLoader.load(uri, () => {
        // Add the uri to the cache so it can be immediately displayed when used
        // but also immediately remove it to correctly reflect that it has no active references
        ImageUriCache.add(uri);
        ImageUriCache.remove(uri);
        resolve();
      }, reject);
    });
  },

  queryCache(uris) {
    const result = {};
    uris.forEach(u => {
      if (ImageUriCache.has(u)) {
        result[u] = 'disk/memory';
      }
    });
    return Promise.resolve(result);
  }

};
var _default = ImageLoader;
exports.default = _default;