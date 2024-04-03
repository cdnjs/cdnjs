var LazyLoad = (function () {
  'use strict';

  const runningOnBrowser = typeof window !== "undefined";
  const isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
  const isHiDpi = runningOnBrowser && window.devicePixelRatio > 1;

  const defaultSettings = {
    elements_selector: ".lazy",
    container: isBot || runningOnBrowser ? document : null,
    threshold: 300,
    thresholds: null,
    data_src: "src",
    data_srcset: "srcset",
    data_sizes: "sizes",
    data_bg: "bg",
    data_bg_hidpi: "bg-hidpi",
    data_bg_multi: "bg-multi",
    data_bg_multi_hidpi: "bg-multi-hidpi",
    data_bg_set: "bg-set",
    data_poster: "poster",
    class_applied: "applied",
    class_loading: "loading",
    class_loaded: "loaded",
    class_error: "error",
    class_entered: "entered",
    class_exited: "exited",
    unobserve_completed: true,
    unobserve_entered: false,
    cancel_on_exit: true,
    callback_enter: null,
    callback_exit: null,
    callback_applied: null,
    callback_loading: null,
    callback_loaded: null,
    callback_error: null,
    callback_finish: null,
    callback_cancel: null,
    use_native: false,
    restore_on_error: false
  };
  const getExtendedSettings = customSettings => {
    return Object.assign({}, defaultSettings, customSettings);
  };

  /* Creates instance and notifies it through the window element */
  const createInstance = function (classObj, options) {
    let event;
    const eventString = "LazyLoad::Initialized";
    const instance = new classObj(options);
    try {
      // Works in modern browsers
      event = new CustomEvent(eventString, {
        detail: {
          instance
        }
      });
    } catch (err) {
      // Works in Internet Explorer (all versions)
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(eventString, false, false, {
        instance
      });
    }
    window.dispatchEvent(event);
  };

  /* Auto initialization of one or more instances of LazyLoad, depending on the
      options passed in (plain object or an array) */
  const autoInitialize = (classObj, options) => {
    if (!options) {
      return;
    }
    if (!options.length) {
      // Plain object
      createInstance(classObj, options);
    } else {
      // Array of objects
      for (let i = 0, optionsItem; optionsItem = options[i]; i += 1) {
        createInstance(classObj, optionsItem);
      }
    }
  };

  const SRC = "src";
  const SRCSET = "srcset";
  const SIZES = "sizes";
  const POSTER = "poster";
  const ORIGINALS = "llOriginalAttrs";
  const DATA = "data";

  const statusLoading = "loading";
  const statusLoaded = "loaded";
  const statusApplied = "applied";
  const statusEntered = "entered";
  const statusError = "error";
  const statusNative = "native";

  const dataPrefix = "data-";
  const statusDataName = "ll-status";
  const getData = (element, attribute) => {
    return element.getAttribute(dataPrefix + attribute);
  };
  const setData = (element, attribute, value) => {
    const attrName = dataPrefix + attribute;
    if (value === null) {
      element.removeAttribute(attrName);
      return;
    }
    element.setAttribute(attrName, value);
  };
  const getStatus = element => getData(element, statusDataName);
  const setStatus = (element, status) => setData(element, statusDataName, status);
  const resetStatus = element => setStatus(element, null);
  const hasEmptyStatus = element => getStatus(element) === null;
  const hasStatusLoading = element => getStatus(element) === statusLoading;
  const hasStatusError = element => getStatus(element) === statusError;
  const hasStatusNative = element => getStatus(element) === statusNative;
  const statusesAfterLoading = [statusLoading, statusLoaded, statusApplied, statusError];
  const hadStartedLoading = element => statusesAfterLoading.indexOf(getStatus(element)) >= 0;

  const safeCallback = (callback, arg1, arg2, arg3) => {
    if (!callback || typeof callback !== 'function') {
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

  const addClass = (element, className) => {
    if (!runningOnBrowser) {
      return;
    }
    if (className === "") {
      return;
    }
    element.classList.add(className);
  };
  const removeClass = (element, className) => {
    if (!runningOnBrowser) {
      return;
    }
    if (className === "") {
      return;
    }
    element.classList.remove(className);
  };

  const addTempImage = element => {
    element.llTempImage = document.createElement("IMG");
  };
  const deleteTempImage = element => {
    delete element.llTempImage;
  };
  const getTempImage = element => element.llTempImage;

  const unobserve = (element, instance) => {
    if (!instance) return;
    const observer = instance._observer;
    if (!observer) return;
    observer.unobserve(element);
  };
  const resetObserver = observer => {
    observer.disconnect();
  };
  const unobserveEntered = (element, settings, instance) => {
    if (settings.unobserve_entered) unobserve(element, instance);
  };

  const updateLoadingCount = (instance, delta) => {
    if (!instance) return;
    instance.loadingCount += delta;
  };
  const decreaseToLoadCount = instance => {
    if (!instance) return;
    instance.toLoadCount -= 1;
  };
  const setToLoadCount = (instance, value) => {
    if (!instance) return;
    instance.toLoadCount = value;
  };
  const isSomethingLoading = instance => instance.loadingCount > 0;
  const haveElementsToLoad = instance => instance.toLoadCount > 0;

  const getSourceTags = parentTag => {
    let sourceTags = [];
    for (let i = 0, childTag; childTag = parentTag.children[i]; i += 1) {
      if (childTag.tagName === "SOURCE") {
        sourceTags.push(childTag);
      }
    }
    return sourceTags;
  };
  const forEachPictureSource = (element, fn) => {
    const parent = element.parentNode;
    if (!parent || parent.tagName !== "PICTURE") {
      return;
    }
    let sourceTags = getSourceTags(parent);
    sourceTags.forEach(fn);
  };
  const forEachVideoSource = (element, fn) => {
    let sourceTags = getSourceTags(element);
    sourceTags.forEach(fn);
  };

  const attrsSrc = [SRC];
  const attrsSrcPoster = [SRC, POSTER];
  const attrsSrcSrcsetSizes = [SRC, SRCSET, SIZES];
  const attrsData = [DATA];
  const hasOriginalAttrs = element => !!element[ORIGINALS];
  const getOriginalAttrs = element => element[ORIGINALS];
  const deleteOriginalAttrs = element => delete element[ORIGINALS];

  // ## SAVE ##

  const setOriginalsObject = (element, attributes) => {
    if (hasOriginalAttrs(element)) {
      return;
    }
    const originals = {};
    attributes.forEach(attribute => {
      originals[attribute] = element.getAttribute(attribute);
    });
    element[ORIGINALS] = originals;
  };
  const saveOriginalBackgroundStyle = element => {
    if (hasOriginalAttrs(element)) {
      return;
    }
    element[ORIGINALS] = {
      backgroundImage: element.style.backgroundImage
    };
  };

  // ## RESTORE ##

  const setOrResetAttribute = (element, attrName, value) => {
    if (!value) {
      element.removeAttribute(attrName);
      return;
    }
    element.setAttribute(attrName, value);
  };
  const restoreOriginalAttrs = (element, attributes) => {
    if (!hasOriginalAttrs(element)) {
      return;
    }
    const originals = getOriginalAttrs(element);
    attributes.forEach(attribute => {
      setOrResetAttribute(element, attribute, originals[attribute]);
    });
  };
  const restoreOriginalBgImage = element => {
    if (!hasOriginalAttrs(element)) {
      return;
    }
    const originals = getOriginalAttrs(element);
    element.style.backgroundImage = originals.backgroundImage;
  };

  const manageApplied = (element, settings, instance) => {
    addClass(element, settings.class_applied);
    setStatus(element, statusApplied);
    // Instance is not provided when loading is called from static class
    if (!instance) return;
    if (settings.unobserve_completed) {
      // Unobserve now because we can't do it on load
      unobserve(element, settings);
    }
    safeCallback(settings.callback_applied, element, instance);
  };
  const manageLoading = (element, settings, instance) => {
    addClass(element, settings.class_loading);
    setStatus(element, statusLoading);
    // Instance is not provided when loading is called from static class
    if (!instance) return;
    updateLoadingCount(instance, +1);
    safeCallback(settings.callback_loading, element, instance);
  };
  const setAttributeIfValue = (element, attrName, value) => {
    if (!value) {
      return;
    }
    element.setAttribute(attrName, value);
  };
  const setImageAttributes = (element, settings) => {
    setAttributeIfValue(element, SIZES, getData(element, settings.data_sizes));
    setAttributeIfValue(element, SRCSET, getData(element, settings.data_srcset));
    setAttributeIfValue(element, SRC, getData(element, settings.data_src));
  };
  const setSourcesImg = (imgEl, settings) => {
    forEachPictureSource(imgEl, sourceTag => {
      setOriginalsObject(sourceTag, attrsSrcSrcsetSizes);
      setImageAttributes(sourceTag, settings);
    });
    setOriginalsObject(imgEl, attrsSrcSrcsetSizes);
    setImageAttributes(imgEl, settings);
  };
  const setSourcesIframe = (iframe, settings) => {
    setOriginalsObject(iframe, attrsSrc);
    setAttributeIfValue(iframe, SRC, getData(iframe, settings.data_src));
  };
  const setSourcesVideo = (videoEl, settings) => {
    forEachVideoSource(videoEl, sourceEl => {
      setOriginalsObject(sourceEl, attrsSrc);
      setAttributeIfValue(sourceEl, SRC, getData(sourceEl, settings.data_src));
    });
    setOriginalsObject(videoEl, attrsSrcPoster);
    setAttributeIfValue(videoEl, POSTER, getData(videoEl, settings.data_poster));
    setAttributeIfValue(videoEl, SRC, getData(videoEl, settings.data_src));
    videoEl.load();
  };
  const setSourcesObject = (object, settings) => {
    setOriginalsObject(object, attrsData);
    setAttributeIfValue(object, DATA, getData(object, settings.data_src));
  };
  const setBackground = (element, settings, instance) => {
    const bg1xValue = getData(element, settings.data_bg);
    const bgHiDpiValue = getData(element, settings.data_bg_hidpi);
    const bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
    if (!bgDataValue) return;
    element.style.backgroundImage = `url("${bgDataValue}")`;
    getTempImage(element).setAttribute(SRC, bgDataValue);
    manageLoading(element, settings, instance);
  };

  // NOTE: THE TEMP IMAGE TRICK CANNOT BE DONE WITH data-multi-bg
  // BECAUSE INSIDE ITS VALUES MUST BE WRAPPED WITH URL() AND ONE OF THEM
  // COULD BE A GRADIENT BACKGROUND IMAGE
  const setMultiBackground = (element, settings, instance) => {
    const bg1xValue = getData(element, settings.data_bg_multi);
    const bgHiDpiValue = getData(element, settings.data_bg_multi_hidpi);
    const bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
    if (!bgDataValue) {
      return;
    }
    element.style.backgroundImage = bgDataValue;
    manageApplied(element, settings, instance);
  };
  const setImgsetBackground = (element, settings, instance) => {
    const bgImgSetDataValue = getData(element, settings.data_bg_set);
    if (!bgImgSetDataValue) {
      return;
    }
    const imgSetValues = bgImgSetDataValue.split("|");
    let bgImageValues = imgSetValues.map(value => `image-set(${value})`);
    element.style.backgroundImage = bgImageValues.join();
    manageApplied(element, settings, instance);
  };
  const setSourcesFunctions = {
    IMG: setSourcesImg,
    IFRAME: setSourcesIframe,
    VIDEO: setSourcesVideo,
    OBJECT: setSourcesObject
  };
  const setSourcesNative = (element, settings) => {
    const setSourcesFunction = setSourcesFunctions[element.tagName];
    if (!setSourcesFunction) {
      return;
    }
    setSourcesFunction(element, settings);
  };
  const setSources = (element, settings, instance) => {
    const setSourcesFunction = setSourcesFunctions[element.tagName];
    if (!setSourcesFunction) {
      return;
    }
    setSourcesFunction(element, settings);
    manageLoading(element, settings, instance);
  };

  const elementsWithLoadEvent = ["IMG", "IFRAME", "VIDEO", "OBJECT"];
  const hasLoadEvent = element => elementsWithLoadEvent.indexOf(element.tagName) > -1;
  const checkFinish = (settings, instance) => {
    if (instance && !isSomethingLoading(instance) && !haveElementsToLoad(instance)) {
      safeCallback(settings.callback_finish, instance);
    }
  };
  const addEventListener = (element, eventName, handler) => {
    element.addEventListener(eventName, handler);
    element.llEvLisnrs[eventName] = handler;
  };
  const removeEventListener = (element, eventName, handler) => {
    element.removeEventListener(eventName, handler);
  };
  const hasEventListeners = element => {
    return !!element.llEvLisnrs;
  };
  const addEventListeners = (element, loadHandler, errorHandler) => {
    if (!hasEventListeners(element)) element.llEvLisnrs = {};
    const loadEventName = element.tagName === "VIDEO" ? "loadeddata" : "load";
    addEventListener(element, loadEventName, loadHandler);
    addEventListener(element, "error", errorHandler);
  };
  const removeEventListeners = element => {
    if (!hasEventListeners(element)) {
      return;
    }
    const eventListeners = element.llEvLisnrs;
    for (let eventName in eventListeners) {
      const handler = eventListeners[eventName];
      removeEventListener(element, eventName, handler);
    }
    delete element.llEvLisnrs;
  };
  const doneHandler = (element, settings, instance) => {
    deleteTempImage(element);
    updateLoadingCount(instance, -1);
    decreaseToLoadCount(instance);
    removeClass(element, settings.class_loading);
    if (settings.unobserve_completed) {
      unobserve(element, instance);
    }
  };
  const loadHandler = (event, element, settings, instance) => {
    const goingNative = hasStatusNative(element);
    doneHandler(element, settings, instance);
    addClass(element, settings.class_loaded);
    setStatus(element, statusLoaded);
    safeCallback(settings.callback_loaded, element, instance);
    if (!goingNative) checkFinish(settings, instance);
  };
  const errorHandler = (event, element, settings, instance) => {
    const goingNative = hasStatusNative(element);
    doneHandler(element, settings, instance);
    addClass(element, settings.class_error);
    setStatus(element, statusError);
    safeCallback(settings.callback_error, element, instance);
    if (settings.restore_on_error) restoreOriginalAttrs(element, attrsSrcSrcsetSizes);
    if (!goingNative) checkFinish(settings, instance);
  };
  const addOneShotEventListeners = (element, settings, instance) => {
    const elementToListenTo = getTempImage(element) || element;
    if (hasEventListeners(elementToListenTo)) {
      // This happens when loading is retried twice
      return;
    }
    const _loadHandler = event => {
      loadHandler(event, element, settings, instance);
      removeEventListeners(elementToListenTo);
    };
    const _errorHandler = event => {
      errorHandler(event, element, settings, instance);
      removeEventListeners(elementToListenTo);
    };
    addEventListeners(elementToListenTo, _loadHandler, _errorHandler);
  };

  const loadBackground = (element, settings, instance) => {
    addTempImage(element);
    addOneShotEventListeners(element, settings, instance);
    saveOriginalBackgroundStyle(element);
    setBackground(element, settings, instance);
    setMultiBackground(element, settings, instance);
    setImgsetBackground(element, settings, instance);
  };
  const loadRegular = (element, settings, instance) => {
    addOneShotEventListeners(element, settings, instance);
    setSources(element, settings, instance);
  };
  const load = (element, settings, instance) => {
    if (hasLoadEvent(element)) {
      loadRegular(element, settings, instance);
    } else {
      loadBackground(element, settings, instance);
    }
  };
  const loadNative = (element, settings, instance) => {
    element.setAttribute("loading", "lazy");
    addOneShotEventListeners(element, settings, instance);
    setSourcesNative(element, settings);
    setStatus(element, statusNative);
  };

  const removeImageAttributes = element => {
    element.removeAttribute(SRC);
    element.removeAttribute(SRCSET);
    element.removeAttribute(SIZES);
  };
  const resetSourcesImg = element => {
    forEachPictureSource(element, sourceTag => {
      removeImageAttributes(sourceTag);
    });
    removeImageAttributes(element);
  };

  const restoreImg = imgEl => {
    forEachPictureSource(imgEl, sourceEl => {
      restoreOriginalAttrs(sourceEl, attrsSrcSrcsetSizes);
    });
    restoreOriginalAttrs(imgEl, attrsSrcSrcsetSizes);
  };
  const restoreVideo = videoEl => {
    forEachVideoSource(videoEl, sourceEl => {
      restoreOriginalAttrs(sourceEl, attrsSrc);
    });
    restoreOriginalAttrs(videoEl, attrsSrcPoster);
    videoEl.load();
  };
  const restoreIframe = iframeEl => {
    restoreOriginalAttrs(iframeEl, attrsSrc);
  };
  const restoreObject = objectEl => {
    restoreOriginalAttrs(objectEl, attrsData);
  };
  const restoreFunctions = {
    IMG: restoreImg,
    IFRAME: restoreIframe,
    VIDEO: restoreVideo,
    OBJECT: restoreObject
  };
  const restoreAttributes = element => {
    const restoreFunction = restoreFunctions[element.tagName];
    if (!restoreFunction) {
      restoreOriginalBgImage(element);
      return;
    }
    restoreFunction(element);
  };
  const resetClasses = (element, settings) => {
    if (hasEmptyStatus(element) || hasStatusNative(element)) {
      return;
    }
    removeClass(element, settings.class_entered);
    removeClass(element, settings.class_exited);
    removeClass(element, settings.class_applied);
    removeClass(element, settings.class_loading);
    removeClass(element, settings.class_loaded);
    removeClass(element, settings.class_error);
  };
  const restore = (element, settings) => {
    restoreAttributes(element);
    resetClasses(element, settings);
    resetStatus(element);
    deleteOriginalAttrs(element);
  };

  const cancelLoading = (element, entry, settings, instance) => {
    if (!settings.cancel_on_exit) return;
    if (!hasStatusLoading(element)) return;
    if (element.tagName !== "IMG") return; //Works only on images
    removeEventListeners(element);
    resetSourcesImg(element);
    restoreImg(element);
    removeClass(element, settings.class_loading);
    updateLoadingCount(instance, -1);
    resetStatus(element);
    safeCallback(settings.callback_cancel, element, entry, instance);
  };

  const onEnter = (element, entry, settings, instance) => {
    const dontLoad = hadStartedLoading(element); /* Save status
                                                 before setting it, to prevent loading it again. Fixes #526. */
    setStatus(element, statusEntered);
    addClass(element, settings.class_entered);
    removeClass(element, settings.class_exited);
    unobserveEntered(element, settings, instance);
    safeCallback(settings.callback_enter, element, entry, instance);
    if (dontLoad) return;
    load(element, settings, instance);
  };
  const onExit = (element, entry, settings, instance) => {
    if (hasEmptyStatus(element)) return; //Ignore the first pass, at landing
    addClass(element, settings.class_exited);
    cancelLoading(element, entry, settings, instance);
    safeCallback(settings.callback_exit, element, entry, instance);
  };

  const tagsWithNativeLazy = ["IMG", "IFRAME", "VIDEO"];
  const shouldUseNative = settings => settings.use_native && "loading" in HTMLImageElement.prototype;
  const loadAllNative = (elements, settings, instance) => {
    elements.forEach(element => {
      if (tagsWithNativeLazy.indexOf(element.tagName) === -1) {
        return;
      }
      loadNative(element, settings, instance);
    });
    setToLoadCount(instance, 0);
  };

  const isIntersecting = entry => entry.isIntersecting || entry.intersectionRatio > 0;
  const getObserverSettings = settings => ({
    root: settings.container === document ? null : settings.container,
    rootMargin: settings.thresholds || settings.threshold + "px"
  });
  const intersectionHandler = (entries, settings, instance) => {
    entries.forEach(entry => isIntersecting(entry) ? onEnter(entry.target, entry, settings, instance) : onExit(entry.target, entry, settings, instance));
  };
  const observeElements = (observer, elements) => {
    elements.forEach(element => {
      observer.observe(element);
    });
  };
  const updateObserver = (observer, elementsToObserve) => {
    resetObserver(observer);
    observeElements(observer, elementsToObserve);
  };
  const setObserver = (settings, instance) => {
    if (shouldUseNative(settings)) {
      return;
    }
    instance._observer = new IntersectionObserver(entries => {
      intersectionHandler(entries, settings, instance);
    }, getObserverSettings(settings));
  };

  const toArray = nodeSet => Array.prototype.slice.call(nodeSet);
  const queryElements = settings => settings.container.querySelectorAll(settings.elements_selector);
  const excludeManagedElements = elements => toArray(elements).filter(hasEmptyStatus);
  const hasError = element => hasStatusError(element);
  const filterErrorElements = elements => toArray(elements).filter(hasError);
  const getElementsToLoad = (elements, settings) => excludeManagedElements(elements || queryElements(settings));

  const retryLazyLoad = (settings, instance) => {
    const errorElements = filterErrorElements(queryElements(settings));
    errorElements.forEach(element => {
      removeClass(element, settings.class_error);
      resetStatus(element);
    });
    instance.update();
  };
  const setOnlineCheck = (settings, instance) => {
    if (!runningOnBrowser) {
      return;
    }
    instance._onlineHandler = () => {
      retryLazyLoad(settings, instance);
    };
    window.addEventListener("online", instance._onlineHandler);
  };
  const resetOnlineCheck = instance => {
    if (!runningOnBrowser) {
      return;
    }
    window.removeEventListener("online", instance._onlineHandler);
  };

  const LazyLoad = function (customSettings, elements) {
    const settings = getExtendedSettings(customSettings);
    this._settings = settings;
    this.loadingCount = 0;
    setObserver(settings, this);
    setOnlineCheck(settings, this);
    this.update(elements);
  };
  LazyLoad.prototype = {
    update: function (givenNodeset) {
      const settings = this._settings;
      const elementsToLoad = getElementsToLoad(givenNodeset, settings);
      setToLoadCount(this, elementsToLoad.length);
      if (isBot) {
        this.loadAll(elementsToLoad);
        return;
      }
      if (shouldUseNative(settings)) {
        loadAllNative(elementsToLoad, settings, this);
        return;
      }
      updateObserver(this._observer, elementsToLoad);
    },
    destroy: function () {
      // Observer
      if (this._observer) {
        this._observer.disconnect();
      }
      // Clean handlers
      resetOnlineCheck(this);
      // Clean custom attributes on elements
      queryElements(this._settings).forEach(element => {
        deleteOriginalAttrs(element);
      });
      // Delete all internal props
      delete this._observer;
      delete this._settings;
      delete this._onlineHandler;
      delete this.loadingCount;
      delete this.toLoadCount;
    },
    loadAll: function (elements) {
      const settings = this._settings;
      const elementsToLoad = getElementsToLoad(elements, settings);
      elementsToLoad.forEach(element => {
        unobserve(element, this);
        load(element, settings, this);
      });
    },
    restoreAll: function () {
      const settings = this._settings;
      queryElements(settings).forEach(element => {
        restore(element, settings);
      });
    }
  };
  LazyLoad.load = (element, customSettings) => {
    const settings = getExtendedSettings(customSettings);
    load(element, settings);
  };
  LazyLoad.resetStatus = element => {
    resetStatus(element);
  };

  // Automatic instances creation if required (useful for async script loading)
  if (runningOnBrowser) {
    autoInitialize(LazyLoad, window.lazyLoadOptions);
  }

  return LazyLoad;

})();
