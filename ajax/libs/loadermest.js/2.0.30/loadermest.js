/*!
 * loaderMest.js  (https://github.com/mestoness/loaderMest.js)
 * Author : Ahmet Baki Memiş 
 * Licensed under MIT (https://github.com/mestoness/loaderMest.js/blob/master/LICENSE)
*/
    const loaderMest = (function() {
        'use strict';
        var loaderMest = {};
        loaderMest = function(defaultSettings) {
            var extend = function(defaults, options) {
                var extended = {};
                var prop;
                for (prop in defaults) {
                    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                        extended[prop] = defaults[prop];
                    }
                }
                for (prop in options) {
                    if (Object.prototype.hasOwnProperty.call(options, prop)) {
                        extended[prop] = options[prop];
                    }
                }
                return extended;
            };
            var settingsAll = extend({
                status: null,
                spinnerColor: "black",
                spinnerBackground: "white",
                spinnerSize: "3px"
            }, defaultSettings);
            if (settingsAll.status == true) {
                var styleLoaderMest = styleLoaderMest = document.createElement("style");
                styleLoaderMest.innerHTML = "/*loaderMest css*/:root{--spinnerColorMestLoader:black;--backgroundMestLoader:white;--spinnerSizeMestLoader:4px}.ns-page-loading{position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;-webkit-transition:all .4s .2s ease-in-out;transition:all .4s .2s ease-in-out;background-color:var(--backgroundMestLoader);z-index:9999;opacity:0;visibility:hidden}.ns-page-loading.active{opacity:1;visibility:visible}.ns-page-loading-inner{position:absolute;top:50%;left:0;width:100%;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:opacity .2s ease-in-out;transition:opacity .2s ease-in-out;opacity:0}.ns-page-loading.active>.ns-page-loading-inner{opacity:1}.ns-page-loading-inner>span{display:block;font-family:Inter,sans-serif;font-size:1rem;font-weight:400;color:var(--spinnerColorMestLoader)}.ns-page-spinner{display:inline-block;width:3.5rem;height:3.5rem;margin-bottom:.75rem;vertical-align:text-bottom;border:var(--spinnerSizeMestLoader) solid var(--spinnerColorMestLoader);border-right-color:transparent;border-radius:50%;-webkit-animation:spinner .9s linear infinite;animation:spinner .9s linear infinite}@-webkit-keyframes spinner{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}";
                document.querySelector("head").appendChild(styleLoaderMest);
                var loaderDiv = document.createElement("div");
                loaderDiv.innerHTML = '<div class="ns-page-loading active"><div class="ns-page-loading-inner"><div class="ns-page-spinner"></div></div></div>';
                document.querySelector("body").prepend(loaderDiv);
                var userStylesLoaderMest = document.createElement("style");
                userStylesLoaderMest.innerHTML = ":root{--spinnerColorMestLoader: " + settingsAll.spinnerColor + " !important;--backgroundMestLoader:" + settingsAll.spinnerBackground + "!important;--spinnerSizeMestLoader:" + settingsAll.spinnerSize + ";}}";
                document.querySelector("head").appendChild(userStylesLoaderMest);
                window.onload = function() {
                    setTimeout(function() {
                        document.querySelector(".ns-page-loading").classList.remove("active");
                    }, 100);
                    setTimeout(function() {
                        loaderDiv.remove();
                        userStylesLoaderMest.remove();
                        styleLoaderMest.remove();
                    }, 800);
                }
            }
        };
        return loaderMest;
    })();
