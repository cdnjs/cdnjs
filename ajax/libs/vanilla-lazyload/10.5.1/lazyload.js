var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.LazyLoad = factory();
})(this, function () {
    'use strict';

    var getInstanceSettings = function getInstanceSettings(customSettings) {
        var defaultSettings = {
            elements_selector: "img",
            container: document,
            threshold: 300,
            data_src: "src",
            data_srcset: "srcset",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            callback_load: null,
            callback_error: null,
            callback_set: null,
            callback_enter: null
        };

        return _extends({}, defaultSettings, customSettings);
    };

    var dataPrefix = "data-";

    var getData = function getData(element, attribute) {
        return element.getAttribute(dataPrefix + attribute);
    };

    var setData = function setData(element, attribute, value) {
        return element.setAttribute(dataPrefix + attribute, value);
    };

    var purgeElements = function purgeElements(elements) {
        return elements.filter(function (element) {
            return !getData(element, "was-processed");
        });
    };

    /* Creates instance and notifies it through the window element */
    var createInstance = function createInstance(classObj, options) {
        var event;
        var eventString = "LazyLoad::Initialized";
        var instance = new classObj(options);
        try {
            // Works in modern browsers
            event = new CustomEvent(eventString, { detail: { instance: instance } });
        } catch (err) {
            // Works in Internet Explorer (all versions)
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventString, false, false, { instance: instance });
        }
        window.dispatchEvent(event);
    };

    /* Auto initialization of one or more instances of lazyload, depending on the 
        options passed in (plain object or an array) */
    var autoInitialize = function autoInitialize(classObj, options) {
        if (!options.length) {
            // Plain object
            createInstance(classObj, options);
        } else {
            // Array of objects
            for (var i = 0, optionsItem; optionsItem = options[i]; i += 1) {
                createInstance(classObj, optionsItem);
            }
        }
    };

    var setSourcesForPicture = function setSourcesForPicture(element, settings) {
        var dataSrcSet = settings.data_srcset;

        var parent = element.parentNode;
        if (parent.tagName !== "PICTURE") {
            return;
        }
        for (var i = 0, pictureChild; pictureChild = parent.children[i]; i += 1) {
            if (pictureChild.tagName === "SOURCE") {
                var sourceSrcset = getData(pictureChild, dataSrcSet);
                if (sourceSrcset) {
                    pictureChild.setAttribute("srcset", sourceSrcset);
                }
            }
        }
    };

    var setSources = function setSources(element, settings) {
        var dataSrc = settings.data_src,
            dataSrcSet = settings.data_srcset;

        var tagName = element.tagName;
        var elementSrc = getData(element, dataSrc);
        if (tagName === "IMG") {
            setSourcesForPicture(element, settings);
            var imgSrcset = getData(element, dataSrcSet);
            if (imgSrcset) {
                element.setAttribute("srcset", imgSrcset);
            }
            if (elementSrc) {
                element.setAttribute("src", elementSrc);
            }
            return;
        }
        if (tagName === "IFRAME") {
            if (elementSrc) {
                element.setAttribute("src", elementSrc);
            }
            return;
        }
        if (elementSrc) {
            element.style.backgroundImage = 'url("' + elementSrc + '")';
        }
    };

    var runningOnBrowser = typeof window !== "undefined";

    var supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;

    var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");

    var addClass = function addClass(element, className) {
        if (supportsClassList) {
            element.classList.add(className);
            return;
        }
        element.className += (element.className ? " " : "") + className;
    };

    var removeClass = function removeClass(element, className) {
        if (supportsClassList) {
            element.classList.remove(className);
            return;
        }
        element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
    };

    var callCallback = function callCallback(callback, argument) {
        if (callback) {
            callback(argument);
        }
    };

    var loadString = "load";
    var errorString = "error";

    var removeListeners = function removeListeners(element, loadHandler, errorHandler) {
        element.removeEventListener(loadString, loadHandler);
        element.removeEventListener(errorString, errorHandler);
    };

    var addOneShotListeners = function addOneShotListeners(element, settings) {
        var onLoad = function onLoad(event) {
            onEvent(event, true, settings);
            removeListeners(element, onLoad, onError);
        };
        var onError = function onError(event) {
            onEvent(event, false, settings);
            removeListeners(element, onLoad, onError);
        };
        element.addEventListener(loadString, onLoad);
        element.addEventListener(errorString, onError);
    };

    var onEvent = function onEvent(event, success, settings) {
        var element = event.target;
        removeClass(element, settings.class_loading);
        addClass(element, success ? settings.class_loaded : settings.class_error); // Setting loaded or error class
        callCallback(success ? settings.callback_load : settings.callback_error, element); // Calling loaded or error callback
    };

    var revealElement = function revealElement(element, settings) {
        callCallback(settings.callback_enter, element);
        if (["IMG", "IFRAME"].indexOf(element.tagName) > -1) {
            addOneShotListeners(element, settings);
            addClass(element, settings.class_loading);
        }
        setSources(element, settings);
        setData(element, "was-processed", true);
        callCallback(settings.callback_set, element);
    };

    /* entry.isIntersecting needs fallback because is null on some versions of MS Edge, and
       entry.intersectionRatio is not enough alone because it could be 0 on some intersecting elements */
    var isIntersecting = function isIntersecting(element) {
        return element.isIntersecting || element.intersectionRatio > 0;
    };

    var LazyLoad = function LazyLoad(customSettings, elements) {
        this._settings = getInstanceSettings(customSettings);
        this._setObserver();
        this.update(elements);
    };

    LazyLoad.prototype = {
        _setObserver: function _setObserver() {
            var _this = this;

            if (!supportsIntersectionObserver) {
                return;
            }

            var settings = this._settings;
            var observerSettings = {
                root: settings.container === document ? null : settings.container,
                rootMargin: settings.threshold + "px"
            };
            var revealIntersectingElements = function revealIntersectingElements(entries) {
                entries.forEach(function (entry) {
                    if (isIntersecting(entry)) {
                        var element = entry.target;
                        revealElement(element, _this._settings);
                        _this._observer.unobserve(element);
                    }
                });
                _this._elements = purgeElements(_this._elements);
            };
            this._observer = new IntersectionObserver(revealIntersectingElements, observerSettings);
        },

        update: function update(elements) {
            var _this2 = this;

            var settings = this._settings;
            var nodeSet = elements || settings.container.querySelectorAll(settings.elements_selector);

            this._elements = purgeElements(Array.prototype.slice.call(nodeSet)); // nodeset to array for IE compatibility
            if (this._observer) {
                this._elements.forEach(function (element) {
                    _this2._observer.observe(element);
                });
                return;
            }
            // Fallback: load all elements at once
            this._elements.forEach(function (element) {
                revealElement(element, settings);
            });
            this._elements = purgeElements(this._elements);
        },

        destroy: function destroy() {
            var _this3 = this;

            if (this._observer) {
                purgeElements(this._elements).forEach(function (element) {
                    _this3._observer.unobserve(element);
                });
                this._observer = null;
            }
            this._elements = null;
            this._settings = null;
        }
    };

    /* Automatic instances creation if required (useful for async script loading!) */
    var autoInitOptions = window.lazyLoadOptions;
    if (runningOnBrowser && autoInitOptions) {
        autoInitialize(LazyLoad, autoInitOptions);
    }

    return LazyLoad;
});