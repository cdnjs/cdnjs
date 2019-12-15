/*! ImgCache-Promise.js

   ImgCache.js wrapper using Promise.
   This version takes care of calling the init method for you.

   Copyright 2014-2017 Christophe BENOIT

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/*jslint browser:true*/

var ImgCachePromise = {};

(function (ImgCache, Promise) {
  'use strict';
  var
    initPerformed = false,
    init = function () {
      if (!initPerformed) {
        return new Promise(function (resolve, reject) {
          ImgCache.init(function() {
            initPerformed = true;
            resolve();
          }, reject);
        });
      } else {
        return Promise.resolve();
      }
    },
    initCheck = function () {
      return init()
    };

  ImgCachePromise.cacheFile = function (url, progress) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.cacheFile(url, resolve, reject, progress);
      });
    });
  };

  ImgCachePromise.getCachedFile = function (url) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.getCachedFile(
          url,
          function(img_src, file_entry) {
            if (file_entry === null) {
              reject();
            } else {
              resolve(file_entry);
            }
          }
        );
      });
    });
  };

  ImgCachePromise.isCached = function (url) {
    return ImgCachePromise.getCachedFile(url);
  };

  ImgCachePromise.getCachedFileURL = function (url) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.getCachedFileURL(
          url,
          function(img_src, file_url) {
            if (file_url === null) {
              reject();
            } else {
              resolve(file_url);
            }
          }
        );
      });
    });
  };

  // $img: jQuery or DOM element for the <img/> element
  ImgCachePromise.useCachedFile = function ($img) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.useCachedFile($img, resolve, reject);
      });
    });
  };

  // $img: jQuery or DOM element for the <img/> element
  ImgCachePromise.useCachedFileWithSource = function ($img, url) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.useCachedFileWithSource($img, url, resolve, reject);
      });
    });
  };

  ImgCachePromise.useOnlineFile = function($img) {
    return initCheck()
    .then(function () {
      return ImgCache.useOnlineFile($img);
    });
  };

  ImgCachePromise.clearCache = function() {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.clearCache(resolve, reject);
      });
    });
  };

  ImgCachePromise.isBackgroundCached = function($div) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve) {
        ImgCache.isBackgroundCached($div, resolve);
      });
    });
  };

  ImgCachePromise.cacheBackground = function($div, progress) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.cacheBackground($div, resolve, reject, progress);
      });
    });
  };

  ImgCachePromise.useCachedBackground = function($div) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.useCachedBackground($div, resolve, reject);
      });
    });
  };

  ImgCachePromise.useBackgroundOnlineFile = function($div) {
    return initCheck()
    .then(function () {
      return ImgCache.useBackgroundOnlineFile($div);
    });
  };

  ImgCachePromise.removeFile = function(url) {
    return initCheck()
    .then(function () {
      return new Promise(function (resolve, reject) {
        ImgCache.removeFile(url, resolve, reject);
      });
    });
  };

  // getCurrentSize: call directly using ImgCache

}) (window.ImgCache, window.Promise);
