/*! QImgCache.js

   ImgCache.js wrapper using Q (https://github.com/kriskowal/q) to use promises.
   This version takes care of calling the init method for you.

   Copyright 2014-2015 Christophe BENOIT

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

var QImgCache = {};

(function (ImgCache, Q) {

    'use strict';

    var
        initPromise = null,
        init = function () {
            if (initPromise === null) {
                initPromise = Q.defer();
                ImgCache.init(
                    function () {
                        initPromise.resolve();
                    },
                    function () {
                        initPromise.reject();
                    }
                );
            }
            return initPromise.promise;
        },
        initCheck = function (func) {
            var def = Q.defer();
            init()
            .then(function () {
                func(def);
            })
            .fail(function () {
                def.reject();
            });
            return def.promise;
        };

    QImgCache.cacheFile = function (url) {
        return initCheck(function (def) {
            ImgCache.cacheFile(
                url,
                function () {
                    def.resolve();
                },
                function () {
                    def.reject();
                },
                function (progressEvent) {
                    def.notify(progressEvent);
                }
            );
        });
    };

    QImgCache.getCachedFile = function (url) {
        return initCheck(function (def) {
            ImgCache.getCachedFile(
                url,
                function(img_src, file_entry) {
                    if (file_entry === null) {
                        def.reject();
                    } else {
                        def.resolve(file_entry);
                    }
                }
            );
        });
    };

    QImgCache.isCached = function (url) {
        return QImgCache.getCachedFile(url);
    };

    QImgCache.getCachedFileURL = function (url) {
        return initCheck(function (def) {
            ImgCache.getCachedFileURL(
                url,
                function(img_src, file_url) {
                    if (file_url === null) {
                        def.reject();
                    } else {
                        def.resolve(file_url);
                    }
                }
            );
        });
    };

    // $img: jQuery or DOM element for the <img/> element
    QImgCache.useCachedFile = function ($img) {
        return initCheck(function (def) {
            ImgCache.useCachedFile(
                $img,
                function($element) {
                    def.resolve($element);
                },
                function($element) {
                    def.reject($element);
                }
            );
        });
    };

    // $img: jQuery or DOM element for the <img/> element
    QImgCache.useCachedFileWithSource = function ($img, url) {
        return initCheck(function (def) {
            ImgCache.useCachedFileWithSource(
                $img,
                url,
                function($element) {
                    def.resolve($element);
                },
                function($element) {
                    def.reject($element);
                }
            );
        });
    };

    QImgCache.useOnlineFile = function($img) {
        return initCheck(function (def) {
            ImgCache.useOnlineFile($img);
            def.resolve();
        });
    };

    QImgCache.clearCache = function() {
        return initCheck(function (def) {
            ImgCache.clearCache(
                function() {
                    def.resolve();
                },
                function() {
                    def.reject();
                }
            );
        });
    };

    QImgCache.isBackgroundCached = function($div) {
        return initCheck(function(def) {
            ImgCache.isBackgroundCached(
                $div,
                function(isCached) {
                    def.resolve(isCached);
                }
            );
        });
    };

    QImgCache.cacheBackground = function($div) {
        return initCheck(function(def) {
            ImgCache.cacheBackground(
                $div,
                function() {
                    def.resolve();
                },
                function() {
                    def.reject();
                },
                function (progressEvent) {
                    def.notify(progressEvent);
                }
            );
        });
    };

    QImgCache.useCachedBackground = function($div) {
        return initCheck(function(def) {
            ImgCache.useCachedBackground(
                $div,
                function($element) {
                    def.resolve($element);
                },
                function($element) {
                    def.reject($element);
                }
            );
        });
    };

    QImgCache.useBackgroundOnlineFile = function($div) {
        return initCheck(function (def) {
            ImgCache.useBackgroundOnlineFile($div);
            def.resolve();
        });
    };

    QImgCache.removeFile = function(url) {
        return initCheck(function(def) {
            ImgCache.removeFile(
                url,
                function() {
                    def.resolve();
                },
                function() {
                    def.reject();
                }
            );
        });
    };

    // getCurrentSize: call directly using ImgCache

}) (window.ImgCache, window.Q);
