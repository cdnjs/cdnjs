function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

define(function () {
  'use strict';

  var runningOnBrowser = typeof window !== "undefined";
  var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
  var supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;
  var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");
  var defaultSettings = {
    elements_selector: "img",
    container: isBot || runningOnBrowser ? document : null,
    threshold: 300,
    thresholds: null,
    data_src: "src",
    data_srcset: "srcset",
    data_sizes: "sizes",
    data_bg: "bg",
    class_loading: "loading",
    class_loaded: "loaded",
    class_error: "error",
    load_delay: 0,
    auto_unobserve: true,
    callback_enter: null,
    callback_exit: null,
    callback_reveal: null,
    callback_loaded: null,
    callback_error: null,
    callback_finish: null,
    use_native: false
  };

  var getInstanceSettings = function getInstanceSettings(customSettings) {
    return _extends({}, defaultSettings, customSettings);
  };
  /* Creates instance and notifies it through the window element */


  var createInstance = function createInstance(classObj, options) {
    var event;
    var eventString = "LazyLoad::Initialized";
    var instance = new classObj(options);

    try {
      // Works in modern browsers
      event = new CustomEvent(eventString, {
        detail: {
          instance: instance
        }
      });
    } catch (err) {
      // Works in Internet Explorer (all versions)
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(eventString, false, false, {
        instance: instance
      });
    }

    window.dispatchEvent(event);
  };
  /* Auto initialization of one or more instances of lazyload, depending on the 
      options passed in (plain object or an array) */


  function autoInitialize(classObj, options) {
    if (!options) {
      return;
    }

    if (!options.length) {
      // Plain object
      createInstance(classObj, options);
    } else {
      // Array of objects
      for (var i = 0, optionsItem; optionsItem = options[i]; i += 1) {
        createInstance(classObj, optionsItem);
      }
    }
  }

  var dataPrefix = "data-";
  var processedDataName = "was-processed";
  var timeoutDataName = "ll-timeout";
  var trueString = "true";

  var getData = function getData(element, attribute) {
    return element.getAttribute(dataPrefix + attribute);
  };

  var setData = function setData(element, attribute, value) {
    var attrName = dataPrefix + attribute;

    if (value === null) {
      element.removeAttribute(attrName);
      return;
    }

    element.setAttribute(attrName, value);
  };

  var resetWasProcessedData = function resetWasProcessedData(element) {
    return setData(element, processedDataName, null);
  };

  var setWasProcessedData = function setWasProcessedData(element) {
    return setData(element, processedDataName, trueString);
  };

  var getWasProcessedData = function getWasProcessedData(element) {
    return getData(element, processedDataName) === trueString;
  };

  var setTimeoutData = function setTimeoutData(element, value) {
    return setData(element, timeoutDataName, value);
  };

  var getTimeoutData = function getTimeoutData(element) {
    return getData(element, timeoutDataName);
  };

  var purgeProcessedElements = function purgeProcessedElements(elements) {
    return elements.filter(function (element) {
      return !getWasProcessedData(element);
    });
  };

  var purgeOneElement = function purgeOneElement(elements, elementToPurge) {
    return elements.filter(function (element) {
      return element !== elementToPurge;
    });
  };

  var safeCallback = function safeCallback(callback, arg1, arg2, arg3) {
    if (!callback) {
      return;
    }

    if (arg3 !== undefined) {
      callback(arg1, arg2, arg3);
      return;
    }

    if (arg2 !== undefined) {
      callback(arg1, arg2);
      return;
    }

    callback(arg1);
  };

  var updateLoadingCount = function updateLoadingCount(instance, plusMinus) {
    instance._loadingCount += plusMinus;

    if (instance._elements.length === 0 && instance._loadingCount === 0) {
      safeCallback(instance._settings.callback_finish, instance);
    }
  };

  var getSourceTags = function getSourceTags(parentTag) {
    var sourceTags = [];

    for (var i = 0, childTag; childTag = parentTag.children[i]; i += 1) {
      if (childTag.tagName === "SOURCE") {
        sourceTags.push(childTag);
      }
    }

    return sourceTags;
  };

  var setAttributeIfValue = function setAttributeIfValue(element, attrName, value) {
    if (!value) {
      return;
    }

    element.setAttribute(attrName, value);
  };

  var setImageAttributes = function setImageAttributes(element, settings) {
    setAttributeIfValue(element, "sizes", getData(element, settings.data_sizes));
    setAttributeIfValue(element, "srcset", getData(element, settings.data_srcset));
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
  };

  var setSourcesImg = function setSourcesImg(element, settings) {
    var parent = element.parentNode;

    if (parent && parent.tagName === "PICTURE") {
      var sourceTags = getSourceTags(parent);
      sourceTags.forEach(function (sourceTag) {
        setImageAttributes(sourceTag, settings);
      });
    }

    setImageAttributes(element, settings);
  };

  var setSourcesIframe = function setSourcesIframe(element, settings) {
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
  };

  var setSourcesVideo = function setSourcesVideo(element, settings) {
    var sourceTags = getSourceTags(element);
    sourceTags.forEach(function (sourceTag) {
      setAttributeIfValue(sourceTag, "src", getData(sourceTag, settings.data_src));
    });
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
    element.load();
  };

  var setSourcesBgImage = function setSourcesBgImage(element, settings) {
    var srcDataValue = getData(element, settings.data_src);
    var bgDataValue = getData(element, settings.data_bg);

    if (srcDataValue) {
      element.style.backgroundImage = "url(\"".concat(srcDataValue, "\")");
    }

    if (bgDataValue) {
      element.style.backgroundImage = bgDataValue;
    }
  };

  var setSourcesFunctions = {
    IMG: setSourcesImg,
    IFRAME: setSourcesIframe,
    VIDEO: setSourcesVideo
  };

  var setSources = function setSources(element, instance) {
    var settings = instance._settings;
    var tagName = element.tagName;
    var setSourcesFunction = setSourcesFunctions[tagName];

    if (setSourcesFunction) {
      setSourcesFunction(element, settings);
      updateLoadingCount(instance, 1);
      instance._elements = purgeOneElement(instance._elements, element);
      return;
    }

    setSourcesBgImage(element, settings);
  };

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

  var genericLoadEventName = "load";
  var mediaLoadEventName = "loadeddata";
  var errorEventName = "error";

  var addEventListener = function addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler);
  };

  var removeEventListener = function removeEventListener(element, eventName, handler) {
    element.removeEventListener(eventName, handler);
  };

  var addEventListeners = function addEventListeners(element, loadHandler, errorHandler) {
    addEventListener(element, genericLoadEventName, loadHandler);
    addEventListener(element, mediaLoadEventName, loadHandler);
    addEventListener(element, errorEventName, errorHandler);
  };

  var removeEventListeners = function removeEventListeners(element, loadHandler, errorHandler) {
    removeEventListener(element, genericLoadEventName, loadHandler);
    removeEventListener(element, mediaLoadEventName, loadHandler);
    removeEventListener(element, errorEventName, errorHandler);
  };

  var eventHandler = function eventHandler(event, success, instance) {
    var settings = instance._settings;
    var className = success ? settings.class_loaded : settings.class_error;
    var callback = success ? settings.callback_loaded : settings.callback_error;
    var element = event.target;
    removeClass(element, settings.class_loading);
    addClass(element, className);
    safeCallback(callback, element, instance);
    updateLoadingCount(instance, -1);
  };

  var addOneShotEventListeners = function addOneShotEventListeners(element, instance) {
    var loadHandler = function loadHandler(event) {
      eventHandler(event, true, instance);
      removeEventListeners(element, loadHandler, errorHandler);
    };

    var errorHandler = function errorHandler(event) {
      eventHandler(event, false, instance);
      removeEventListeners(element, loadHandler, errorHandler);
    };

    addEventListeners(element, loadHandler, errorHandler);
  };

  var managedTags = ["IMG", "IFRAME", "VIDEO"];

  var onEnter = function onEnter(element, entry, instance) {
    var settings = instance._settings;
    safeCallback(settings.callback_enter, element, entry, instance);

    if (!settings.load_delay) {
      revealAndUnobserve(element, instance);
      return;
    }

    delayLoad(element, instance);
  };

  var revealAndUnobserve = function revealAndUnobserve(element, instance) {
    var observer = instance._observer;
    revealElement(element, instance);

    if (observer && instance._settings.auto_unobserve) {
      observer.unobserve(element);
    }
  };

  var onExit = function onExit(element, entry, instance) {
    var settings = instance._settings;
    safeCallback(settings.callback_exit, element, entry, instance);

    if (!settings.load_delay) {
      return;
    }

    cancelDelayLoad(element);
  };

  var cancelDelayLoad = function cancelDelayLoad(element) {
    var timeoutId = getTimeoutData(element);

    if (!timeoutId) {
      return; // do nothing if timeout doesn't exist
    }

    clearTimeout(timeoutId);
    setTimeoutData(element, null);
  };

  var delayLoad = function delayLoad(element, instance) {
    var loadDelay = instance._settings.load_delay;
    var timeoutId = getTimeoutData(element);

    if (timeoutId) {
      return; // do nothing if timeout already set
    }

    timeoutId = setTimeout(function () {
      revealAndUnobserve(element, instance);
      cancelDelayLoad(element);
    }, loadDelay);
    setTimeoutData(element, timeoutId);
  };

  var revealElement = function revealElement(element, instance, force) {
    var settings = instance._settings;

    if (!force && getWasProcessedData(element)) {
      return; // element has already been processed and force wasn't true
    }

    if (managedTags.indexOf(element.tagName) > -1) {
      addOneShotEventListeners(element, instance);
      addClass(element, settings.class_loading);
    }

    setSources(element, instance);
    setWasProcessedData(element);
    safeCallback(settings.callback_reveal, element, instance);
    safeCallback(settings.callback_set, element, instance);
  };

  var isIntersecting = function isIntersecting(entry) {
    return entry.isIntersecting || entry.intersectionRatio > 0;
  };

  var getObserverSettings = function getObserverSettings(settings) {
    return {
      root: settings.container === document ? null : settings.container,
      rootMargin: settings.thresholds || settings.threshold + "px"
    };
  };

  var setObserver = function setObserver(instance) {
    if (!supportsIntersectionObserver) {
      return false;
    }

    instance._observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        return isIntersecting(entry) ? onEnter(entry.target, entry, instance) : onExit(entry.target, entry, instance);
      });
    }, getObserverSettings(instance._settings));
    return true;
  };

  var nativeLazyTags = ["IMG", "IFRAME"];

  var shouldUseNative = function shouldUseNative(settings) {
    return settings.use_native && "loading" in HTMLImageElement.prototype;
  };

  var loadAllNative = function loadAllNative(instance) {
    instance._elements.forEach(function (element) {
      if (nativeLazyTags.indexOf(element.tagName) === -1) {
        return;
      }

      element.setAttribute("loading", "lazy");
      revealElement(element, instance);
    });
  };

  var nodeSetToArray = function nodeSetToArray(nodeSet) {
    return Array.prototype.slice.call(nodeSet);
  };

  var queryElements = function queryElements(settings) {
    return settings.container.querySelectorAll(settings.elements_selector);
  };

  var getElements = function getElements(elements, settings) {
    return purgeProcessedElements(nodeSetToArray(elements || queryElements(settings)));
  };

  var retryLazyLoad = function retryLazyLoad(instance) {
    var settings = instance._settings;
    var errorElements = settings.container.querySelectorAll("." + settings.class_error);

    _toConsumableArray(errorElements).forEach(function (element) {
      removeClass(element, settings.class_error);
      resetWasProcessedData(element);
    });

    instance.update();
  };

  var setOnlineCheck = function setOnlineCheck(instance) {
    if (!runningOnBrowser) {
      return;
    }

    window.addEventListener("online", function (event) {
      retryLazyLoad(instance);
    });
  };

  var LazyLoad = function LazyLoad(customSettings, elements) {
    this._settings = getInstanceSettings(customSettings);
    this._loadingCount = 0;
    setObserver(this);
    this.update(elements);
    setOnlineCheck(this);
  };

  LazyLoad.prototype = {
    update: function update(elements) {
      var _this = this;

      var settings = this._settings;
      this._elements = getElements(elements, settings);

      if (isBot || !this._observer) {
        this.loadAll();
        return;
      }

      if (shouldUseNative(settings)) {
        loadAllNative(this);
        this._elements = getElements(elements, settings);
      }

      this._elements.forEach(function (element) {
        _this._observer.observe(element);
      });
    },
    destroy: function destroy() {
      var _this2 = this;

      if (this._observer) {
        this._elements.forEach(function (element) {
          _this2._observer.unobserve(element);
        });

        this._observer = null;
      }

      this._elements = null;
      this._settings = null;
    },
    load: function load(element, force) {
      revealElement(element, this, force);
    },
    loadAll: function loadAll() {
      var _this3 = this;

      this._elements.forEach(function (element) {
        revealAndUnobserve(element, _this3);
      });
    }
  };
  /* Automatic instances creation if required (useful for async script loading) */

  if (runningOnBrowser) {
    autoInitialize(LazyLoad, window.lazyLoadOptions);
  }

  return LazyLoad;
});