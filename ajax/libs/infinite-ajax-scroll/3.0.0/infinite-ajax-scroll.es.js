/**
 * Infinite Ajax Scroll v3.0.0
 * Turn your existing pagination into infinite scrolling pages with ease
 *
 * Commercial use requires one-time purchase of a commercial license
 * https://infiniteajaxscroll.com/docs/license.html
 *
 * Copyright 2014-2021 Webcreate (Jeroen Fiege)
 * https://infiniteajaxscroll.com
 */
import $ from 'tealight';
import extend from 'extend';
import throttle from 'lodash.throttle';
import Emitter from 'tiny-emitter';

var defaults$3 = {
  item: undefined,
  next: undefined,
  pagination: undefined,
  responseType: 'document',
  bind: true,
  scrollContainer: window,
  spinner: false,
  logger: true,
  loadOnScroll: true,
  negativeMargin: 0,
  trigger: false,
  prefill: true,
};

/* eslint no-console: "off" */

var Assert = {
  singleElement: function singleElement(elementOrSelector, property) {
    var $element = $(elementOrSelector);

    if ($element.length > 1) {
      throw new Error(("Expected single element for \"" + property + "\""));
    }

    if ($element.length === 0) {
      throw new Error(("Element \"" + elementOrSelector + "\" not found for \"" + property + "\""));
    }
  },
  anyElement: function anyElement(elementOrSelector, property) {
    var $element = $(elementOrSelector);

    if ($element.length === 0) {
      throw new Error(("Element \"" + elementOrSelector + "\" not found for \"" + property + "\""));
    }
  },
  warn: function warn(fn) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    try {
      fn.apply(void 0, args);
    } catch (e) {
      if (console && console.warn) {
        console.warn(e.message);
      }
    }
  }
};

function getScrollPosition(el) {
  if (el !== window) {
    return {
      x: el.scrollLeft,
      y: el.scrollTop,
    };
  }

  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

  return {
    x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
    y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
  };
}

function getRootRect(el) {
  var rootRect;

  if (el !== window) {
    rootRect = el.getBoundingClientRect();
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;

    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }

  return rootRect;
}

function getDistanceToFold(sentinel, scrollContainerScrollPosition, scrollContainerRootRect) {
  var rootRect = scrollContainerRootRect;

  // this means the container the doesn't have any items yet - it's empty
  if (!sentinel) {
    return rootRect.height * -1;
  }

  var scrollYTop = scrollContainerScrollPosition.y;
  var boundingRect = sentinel.getBoundingClientRect();

  var scrollYBottom = scrollYTop + rootRect.height;
  var bottom = scrollYTop + boundingRect.bottom - rootRect.top;

  return Math.trunc(bottom - scrollYBottom);
}

var APPEND = 'append';
var APPENDED = 'appended';
var BINDED = 'binded';
var UNBINDED = 'unbinded';
var HIT = 'hit';
var LOAD = 'load';
var LOADED = 'loaded';
var ERROR = 'error';
var LAST = 'last';
var NEXT = 'next';
var NEXTED = 'nexted';
var READY = 'ready';
var SCROLLED = 'scrolled';
var RESIZED = 'resized';
var PAGE = 'page';
var PREFILL = 'prefill';
var PREFILLED = 'prefilled';

var events = {
  APPEND: APPEND,
  APPENDED: APPENDED,
  BINDED: BINDED,
  UNBINDED: UNBINDED,
  HIT: HIT,
  LOAD: LOAD,
  LOADED: LOADED,
  ERROR: ERROR,
  LAST: LAST,
  NEXT: NEXT,
  NEXTED: NEXTED,
  READY: READY,
  SCROLLED: SCROLLED,
  RESIZED: RESIZED,
  PAGE: PAGE,
  PREFILL: PREFILL,
  PREFILLED: PREFILLED,
};

var defaultLastScroll = {
  y: 0,
  x: 0,
  deltaY: 0,
  deltaX: 0
};

function calculateScroll(scrollContainer, lastScroll) {
  var scroll = getScrollPosition(scrollContainer);

  scroll.deltaY = scroll.y - (lastScroll ? lastScroll.y : scroll.y);
  scroll.deltaX = scroll.x - (lastScroll ? lastScroll.x : scroll.x);

  return scroll;
}

function scrollHandler() {
  var ias = this;
  var lastScroll = ias._lastScroll || defaultLastScroll;

  var scroll = ias._lastScroll = calculateScroll(ias.scrollContainer, lastScroll);

  this.emitter.emit(SCROLLED, {scroll: scroll});
}

function resizeHandler() {
  var ias = this;
  var lastScroll = ias._lastScroll || defaultLastScroll;

  var scroll = ias._lastScroll = calculateScroll(ias.scrollContainer, lastScroll);

  this.emitter.emit(RESIZED, {scroll: scroll});
}

function nextHandler(pageIndex) {
  var ias = this;
  var lastResponse = ias._lastResponse || document;

  var nextEl = $(ias.options.next, lastResponse)[0];

  if (!nextEl) {
    Assert.warn(Assert.singleElement, ias.options.next, 'options.next');

    return;
  }

  var nextUrl = nextEl.href;

  return ias.load(nextUrl)
    .then(function (data) {
      lastResponse = ias._lastResponse = data.xhr.response;

      var nextEl = $(ias.options.next, lastResponse)[0];

      return ias.append(data.items)
        .then(function () {
          return !!nextEl;
        })
        .then(function (hasNextEl) {
          // only warn for first page, because at some point it's expected that there is no next element
          if (!hasNextEl && pageIndex <= 1 && console && console.warn) {
            console.warn(("Element \"" + (ias.options.next) + "\" not found for \"options.next\" on \"" + (data.url) + "\""));
          }

          return hasNextEl;
        });
    });
}

var defaults$2 = {
  element: undefined,
  hide: false
};

function expand$3(options) {
  if (typeof options === 'string' || (typeof options === 'object' && options.nodeType === Node.ELEMENT_NODE)) {
    options = {
      element: options,
      hide: true,
    };
  } else if (typeof options === 'boolean') {
    options = {
      element: undefined,
      hide: options,
    };
  }

  return options;
}

var Pagination = function Pagination(ias, options) {
  this.options = extend({}, defaults$2, expand$3(options));
  this.originalDisplayStyles = new WeakMap();

  if (!this.options.hide) {
    return;
  }

  Assert.warn(Assert.anyElement, this.options.element, 'pagination.element');

  ias.on(BINDED, this.hide.bind(this));
  ias.on(UNBINDED, this.restore.bind(this));
};

Pagination.prototype.hide = function hide () {
    var this$1$1 = this;

  var els = $(this.options.element);

  els.forEach(function (el) {
    this$1$1.originalDisplayStyles.set(el, window.getComputedStyle(el).display);

    el.style.display = 'none';
  });
};

Pagination.prototype.restore = function restore () {
    var this$1$1 = this;

  var els = $(this.options.element);

  els.forEach(function (el) {
    el.style.display = this$1$1.originalDisplayStyles.get(el) || 'block';
  });
};

var defaults$1 = {
  element: undefined,
  delay: 600,
  show: function (element) {
    element.style.opacity = '1';
  },
  hide: function (element) {
    element.style.opacity = '0';
  }
};

function expand$2(options) {
  if (typeof options === 'string' || (typeof options === 'object' && options.nodeType === Node.ELEMENT_NODE)) {
    options = {
      element: options,
    };
  }

  return options;
}

var Spinner = function Spinner(ias, options) {
  // no spinner wanted
  if (options === false) {
    return;
  }

  this.ias = ias;
  this.options = extend({}, defaults$1, expand$2(options));

  if (this.options.element !== undefined) {
    Assert.singleElement(this.options.element, 'spinner.element');
  }

  this.element = $(this.options.element)[0]; // @todo should we really cache this?
  this.hideFn = this.options.hide;
  this.showFn = this.options.show;

  ias.on(BINDED, this.bind.bind(this));
  ias.on(BINDED, this.hide.bind(this));
};

Spinner.prototype.bind = function bind () {
  var startTime, endTime, diff, delay, self = this, ias = this.ias;

  ias.on(NEXT, function () {
    startTime = +new Date();

    self.show();
  });

  ias.on(LAST, function () {
    self.hide();
  });

  // setup delay
  ias.on(APPEND, function (event) {
    endTime = +new Date();
    diff = endTime - startTime;

    delay = Math.max(0, self.options.delay - diff);

    var _appendFn = event.appendFn.bind({});

    event.appendFn = function(items, parent, last) {
      return new Promise(function (resolve) {
        setTimeout(function() {
          self.hide().then(function() {
            _appendFn(items, parent, last);
            resolve();
          });
        }, delay);
      });
    };
  });
};

Spinner.prototype.show = function show () {
  return Promise.resolve(this.showFn(this.element));
};

Spinner.prototype.hide = function hide () {
  return Promise.resolve(this.hideFn(this.element));
};

/* eslint no-console: "off" */

var defaultLogger = {
  hit: function () {
    console.log("Hit scroll threshold");
  },
  binded: function () {
    console.log("Binded event handlers");
  },
  unbinded: function () {
    console.log("Unbinded event handlers");
  },
  // scrolled: (event) => {
  //   console.log('Scrolled');
  // },
  // resized: (event) => {
  //   console.log('Resized');
  // },
  next: function (event) {
    console.log(("Next page triggered [pageIndex=" + (event.pageIndex) + "]"));
  },
  nexted: function (event) {
    console.log(("Next page completed [pageIndex=" + (event.pageIndex) + "]"));
  },
  load: function (event) {
    console.log(("Start loading " + (event.url)));
  },
  loaded: function () {
    console.log("Finished loading");
  },
  append: function () {
    console.log("Start appending items");
  },
  appended: function (event) {
    console.log(("Finished appending " + (event.items.length) + " item(s)"));
  },
  last: function () {
    console.log("No more pages left to load");
  },
  page: function (event) {
    console.log(("Page changed [pageIndex=" + (event.pageIndex) + "]"));
  },
  prefill: function (event) {
    console.log("Start prefilling");
  },
  prefilled: function (event) {
    console.log("Finished prefilling");
  },
};

function expand$1(options) {
  if (options === true) {
    options = defaultLogger;
  }

  return options;
}

var Logger = function Logger(ias, options) {
  // no logger wanted
  if (options === false) {
    return;
  }

  var logger = expand$1(options);

  Object.keys(logger).forEach(function (key) {
    ias.on(key, logger[key]);
  });
};

function getPageBreak(pageBreaks, scrollTop, scrollContainer) {
  var rootRect = getRootRect(scrollContainer);
  var scrollBottom = scrollTop + rootRect.height;

  for (var b = pageBreaks.length - 1; b >= 0; b--) {
    var bottom = pageBreaks[b].sentinel.getBoundingClientRect().bottom + scrollTop;

    if (scrollBottom > bottom) {
      var x = Math.min(b + 1, pageBreaks.length - 1);

      return pageBreaks[x];
    }
  }

  return pageBreaks[0];
}

var Paging = function Paging(ias) {
  this.ias = ias;
  this.pageBreaks = [];
  this.currentPageIndex = ias.pageIndex;
  this.currentScrollTop = 0;

  ias.on(BINDED, this.binded.bind(this));
  ias.on(NEXT, this.next.bind(this));
  ias.on(SCROLLED, this.scrolled.bind(this));
  ias.on(RESIZED, this.scrolled.bind(this));
};

Paging.prototype.binded = function binded () {
  var sentinel = this.ias.sentinel();
  if (!sentinel) {
    return;
  }

  this.pageBreaks.push({
    pageIndex: this.currentPageIndex,
    url: document.location.toString(),
    title: document.title,
    sentinel: this.ias.sentinel()
  });
};

Paging.prototype.next = function next () {
    var this$1$1 = this;

  var url = document.location.toString();
  var title = document.title;

  var loaded = function (event) {
    url = event.url;

    if (event.xhr.response) {
      title = event.xhr.response.title;
    }
  };

  this.ias.once(LOADED, loaded);

  this.ias.once(NEXTED, function (event) {
    this$1$1.pageBreaks.push({
      pageIndex: event.pageIndex,
      url: url,
      title: title,
      sentinel: this$1$1.ias.sentinel()
    });

    this$1$1.update();

    this$1$1.ias.off(LOADED, loaded);
  });
};

Paging.prototype.scrolled = function scrolled (event) {
  this.update(event.scroll.y);
};

Paging.prototype.update = function update (scrollTop) {
  this.currentScrollTop = scrollTop || this.currentScrollTop;

  var pageBreak = getPageBreak(this.pageBreaks, this.currentScrollTop, this.ias.scrollContainer);

  if (pageBreak && pageBreak.pageIndex !== this.currentPageIndex) {
    this.ias.emitter.emit(PAGE, pageBreak);

    this.currentPageIndex = pageBreak.pageIndex;
  }
};

var defaults = {
  element: undefined,
  when: function (pageIndex) { return true; },
  show: function (element) {
    element.style.opacity = '1';
  },
  hide: function (element) {
    element.style.opacity = '0';
  }
};

function expand(options) {
  if (typeof options === 'string' || typeof options === 'function' || (typeof options === 'object' && options.nodeType === Node.ELEMENT_NODE)) {
    options = {
      element: options,
    };
  }

  if (typeof options.element === 'function') {
    options.element = options.element();
  }

  // expand array to a function, e.g.:
  // [0, 1, 2] -> function(pageIndex) { /* return true when pageIndex in [0, 1, 2] */ }
  if (options.when && Array.isArray(options.when)) {
    var when = options.when;
    options.when = function(pageIndex) {
      return when.indexOf(pageIndex) !== -1;
    };
  }

  return options;
}

var Trigger = function Trigger(ias, options) {
  var this$1$1 = this;

  // no trigger wanted
  if (options === false) {
    return;
  }

  this.ias = ias;
  this.options = extend({}, defaults, expand(options));

  if (this.options.element !== undefined) {
    Assert.singleElement(this.options.element, 'trigger.element');
  }

  this.element = $(this.options.element)[0]; // @todo should we really cache this?
  this.hideFn = this.options.hide;
  this.showFn = this.options.show;
  this.voter = this.options.when;
  this.showing = undefined;
  this.enabled = undefined;

  ias.on(BINDED, this.bind.bind(this));
  ias.on(UNBINDED, this.unbind.bind(this));
  ias.on(HIT, this.hit.bind(this));
  ias.on(NEXT, function (e) { return this$1$1.ias.once(APPENDED, function () { return this$1$1.update(e.pageIndex); }); });
};

Trigger.prototype.bind = function bind () {
  this.hide();
  this.update(this.ias.pageIndex);

  this.element.addEventListener('click', this.clickHandler.bind(this));
};

Trigger.prototype.unbind = function unbind () {
  this.element.removeEventListener('click', this.clickHandler.bind(this));
};

Trigger.prototype.clickHandler = function clickHandler () {
  this.hide().then(this.ias.next.bind(this.ias));
};

Trigger.prototype.update = function update (pageIndex) {
  this.enabled = this.voter(pageIndex);

  if (this.enabled) {
    this.ias.disableLoadOnScroll();
  } else {
    this.ias.enableLoadOnScroll();
  }
};

Trigger.prototype.hit = function hit () {
  if (!this.enabled) {
    return;
  }

  this.show();
};

Trigger.prototype.show = function show () {
  if (this.showing) {
    return;
  }

  this.showing = true;

  return Promise.resolve(this.showFn(this.element));
};

Trigger.prototype.hide = function hide () {
  if (!this.showing && this.showing !== undefined) {
    return;
  }

  this.showing = false;

  return Promise.resolve(this.hideFn(this.element));
};

function appendFn(items, parent, last) {
  var sibling = last ? last.nextSibling : null;
  var insert = document.createDocumentFragment();

  items.forEach(function (item) {
    insert.appendChild(item);
  });

  parent.insertBefore(insert, sibling);
}

/* eslint no-console: "off" */

var NativeResizeObserver = window.ResizeObserver;

var EventListenerResizeObserver = function EventListenerResizeObserver(el, listener) {
  this.el = el;
  this.listener = listener;
};

EventListenerResizeObserver.prototype.observe = function observe () {
  this.el.addEventListener('resize', this.listener);
};

EventListenerResizeObserver.prototype.unobserve = function unobserve () {
  this.el.removeEventListener('resize', this.listener);
};

var NativeWrapperResizeObserver = function NativeWrapperResizeObserver(el, listener) {
  this.el = el;
  this.listener = listener;
  this.ro = new NativeResizeObserver(this.listener);
};

NativeWrapperResizeObserver.prototype.observe = function observe () {
  this.ro.observe(this.el);
};

NativeWrapperResizeObserver.prototype.unobserve = function unobserve () {
  this.ro.unobserve();
};

var PollingResizeObserver = function PollingResizeObserver(el, listener) {
  this.el = el;
  this.listener = listener;
  this.interval = null;
  this.lastHeight = null;
};

PollingResizeObserver.prototype.pollHeight = function pollHeight () {
  var height = Math.trunc(getRootRect(this.el).height);

  if (this.lastHeight !== null && this.lastHeight !== height) {
    this.listener();
  }

  this.lastHeight = height;
};

PollingResizeObserver.prototype.observe = function observe () {
  this.interval = setInterval(this.pollHeight.bind(this), 200);
};

PollingResizeObserver.prototype.unobserve = function unobserve () {
  clearInterval(this.interval);
};

function ResizeObserverFactory(ias, el) {
  var listener = throttle(resizeHandler, 200).bind(ias);

  if (el === window) {
    return new EventListenerResizeObserver(el, listener);
  }

  if (NativeResizeObserver) {
    return new NativeWrapperResizeObserver(el, listener);
  }

  if (console && console.warn) {
    console.warn('ResizeObserver not supported. Falling back on polling.');
  }

  return new PollingResizeObserver(el, listener);
}

var Prefill = function Prefill(ias, options) {
  this.ias = ias;
  this.enabled = options;
};

Prefill.prototype.prefill = function prefill () {
    var this$1$1 = this;

  if (!this.enabled) {
    return;
  }

  var distance = this.ias.distance();

  if (distance > 0) {
    return;
  }

  this.ias.emitter.emit(events.PREFILL);

  return this._prefill().then(function () {
    this$1$1.ias.emitter.emit(events.PREFILLED);

    // @todo reevaluate if we should actually call `measure` here.
    this$1$1.ias.measure();
  });
};

Prefill.prototype._prefill = function _prefill () {
    var this$1$1 = this;

  return this.ias.next().then(function (hasNextUrl) {
    if (!hasNextUrl) {
      return;
    }

    var distance = this$1$1.ias.distance();

    if (distance < 0) {
      return this$1$1._prefill();
    }
  });
};

var InfiniteAjaxScroll = function InfiniteAjaxScroll(container, options) {
  var this$1$1 = this;
  if ( options === void 0 ) options = {};

  Assert.singleElement(container, 'container');

  this.container = $(container)[0];
  this.options = extend({}, defaults$3, options);
  this.emitter = new Emitter();

  this.options.loadOnScroll ? this.enableLoadOnScroll() : this.disableLoadOnScroll();
  this.negativeMargin = Math.abs(this.options.negativeMargin);

  this.scrollContainer = this.options.scrollContainer;
  if (this.options.scrollContainer !== window) {
    Assert.singleElement(this.options.scrollContainer, 'options.scrollContainer');

    this.scrollContainer = $(this.options.scrollContainer)[0];
  }

  this.nextHandler = nextHandler;

  if (this.options.next === false) {
    this.nextHandler = function() {};
  } else if (typeof this.options.next === 'function') {
    this.nextHandler = this.options.next;
  }

  this.resizeObserver = ResizeObserverFactory(this, this.scrollContainer);
  this._scrollListener = throttle(scrollHandler, 200).bind(this);

  this.ready = false;
  this.bindOnReady = true;
  this.binded = false;
  this.paused = false;
  this.pageIndex = this.sentinel() ? 0 : -1;

  this.on(HIT, function () {
    if (!this$1$1.loadOnScroll) {
      return;
    }

    this$1$1.next();
  });

  this.on(SCROLLED, this.measure);
  this.on(RESIZED, this.measure);

  // initialize extensions
  this.pagination = new Pagination(this, this.options.pagination);
  this.spinner = new Spinner(this, this.options.spinner);
  this.logger = new Logger(this, this.options.logger);
  this.paging = new Paging(this);
  this.trigger = new Trigger(this, this.options.trigger);
  this.prefill = new Prefill(this, this.options.prefill);

  // prefill/measure after all plugins are done binding
  this.on(BINDED, this.prefill.prefill.bind(this.prefill));

  var ready = function () {
    if (this$1$1.ready) {
      return;
    }

    this$1$1.ready = true;

    this$1$1.emitter.emit(READY);

    if (this$1$1.bindOnReady && this$1$1.options.bind) {
      this$1$1.bind();
    }
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(ready, 1);
  } else {
    window.addEventListener('DOMContentLoaded', ready);
  }
};

InfiniteAjaxScroll.prototype.bind = function bind () {
  if (this.binded) {
    return;
  }

  // If we manually call bind before the dom is ready, we assume that we want
  // to take control over the bind flow.
  if (!this.ready) {
    this.bindOnReady = false;
  }

  this.scrollContainer.addEventListener('scroll', this._scrollListener);
  this.resizeObserver.observe();

  this.binded = true;

  this.emitter.emit(BINDED);
};

InfiniteAjaxScroll.prototype.unbind = function unbind () {
  if (!this.binded) {
    if (!this.ready) {
      this.once(BINDED, this.unbind);
    }

    return;
  }

  this.resizeObserver.unobserve();
  this.scrollContainer.removeEventListener('scroll', this._scrollListener);

  this.binded = false;

  this.emitter.emit(UNBINDED);
};

InfiniteAjaxScroll.prototype.next = function next () {
    var this$1$1 = this;

  if (!this.binded) {
    if (!this.ready) {
      return this.once(BINDED, this.next);
    }

    return;
  }

  this.pause();

  var pageIndex = this.pageIndex + 1;

  this.emitter.emit(NEXT, {pageIndex: this.pageIndex + 1});

  return Promise.resolve(this.nextHandler(pageIndex))
    .then(function (hasNextUrl) {
      this$1$1.pageIndex = pageIndex;

      if (!hasNextUrl) {
        this$1$1.emitter.emit(LAST);

        return;
      }

      this$1$1.resume();
    }).then(function () {
      this$1$1.emitter.emit(NEXTED, {pageIndex: this$1$1.pageIndex});
    });
};

/**
 * @param {string} url
 * @returns {Promise} returns LOADED event on success
 */
InfiniteAjaxScroll.prototype.load = function load (url) {
  var ias = this;

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    var loadEvent = {
      url: url,
      xhr: xhr,
      method: 'GET',
      body: null,
      nocache: false,
      responseType: ias.options.responseType,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    };

    // event properties are mutable
    ias.emitter.emit(LOAD, loadEvent);

    var finalUrl = loadEvent.url;
    var method = loadEvent.method;
    var responseType = loadEvent.responseType;
    var headers = loadEvent.headers;
    var body = loadEvent.body;

    if (!loadEvent.nocache) {
      // @see https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
      finalUrl = finalUrl + ((/\?/).test(finalUrl) ? "&" : "?") + (new Date()).getTime();
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }

      if (xhr.status === 0) ;
      else if (xhr.status === 200) {
        var items = xhr.response;

        if (responseType === 'document') {
          items = $(ias.options.item, xhr.response);
          // @todo assert there actually are items in the response
        }

        // we don't use a shared loadedEvent variable here, because these values should be immutable

        ias.emitter.emit(LOADED, {items: items, url: finalUrl, xhr: xhr});

        resolve({items: items, url: finalUrl, xhr: xhr});
      } else {
        ias.emitter.emit(ERROR, {url: finalUrl, method: method, xhr: xhr});

        reject(xhr);
      }
    };

    xhr.onerror = function() {
      ias.emitter.emit(ERROR, {url: finalUrl, method: method, xhr: xhr});

      reject(xhr);
    };

    xhr.open(method, finalUrl, true);
    xhr.responseType = responseType;

    for (var header in headers) {
      xhr.setRequestHeader(header, headers[header]);
    }

    xhr.send(body);
  });
};

/**
 * @param {array<Element>} items
 * @param {Element|null} parent
 */
InfiniteAjaxScroll.prototype.append = function append (items, parent) {
  var ias = this;
  parent = parent || ias.container;

  var event = {
    items: items,
    parent: parent,
    appendFn: appendFn
  };

  ias.emitter.emit(APPEND, event);

  var executor = function (resolve) {
    window.requestAnimationFrame(function () {
      Promise.resolve(event.appendFn(event.items, event.parent, ias.sentinel())).then(function () {
        resolve({items: items, parent: parent});
      });
    });
  };

  return (new Promise(executor)).then(function (event) {
    ias.emitter.emit(APPENDED, event);
  });
};

InfiniteAjaxScroll.prototype.sentinel = function sentinel () {
  var items = $(this.options.item, this.container);

  if (!items.length) {
    return null;
  }

  return items[items.length-1];
};

InfiniteAjaxScroll.prototype.pause = function pause () {
  this.paused = true;
};

InfiniteAjaxScroll.prototype.resume = function resume () {
  this.paused = false;
};

InfiniteAjaxScroll.prototype.enableLoadOnScroll = function enableLoadOnScroll () {
  this.loadOnScroll = true;
};

InfiniteAjaxScroll.prototype.disableLoadOnScroll = function disableLoadOnScroll () {
  this.loadOnScroll = false;
};

InfiniteAjaxScroll.prototype.distance = function distance (rootRect, sentinel) {
  var _rootRect = rootRect || getRootRect(this.scrollContainer);

  var _sentinel = sentinel || this.sentinel();

  var scrollPosition = getScrollPosition(this.scrollContainer);

  var distance = getDistanceToFold(_sentinel, scrollPosition, _rootRect);

  // apply negative margin
  distance -= this.negativeMargin;

  return distance;
};

InfiniteAjaxScroll.prototype.measure = function measure () {
  if (this.paused) {
    return;
  }

  var rootRect = getRootRect(this.scrollContainer);

  // When the scroll container has no height, this could indicate that
  // the element is not visible (display = none). Without a height
  // we cannot calculate the distance to fold. On the other hand we don't
  // have to, because it's not visible anyway. Our resize observer will
  // monitor the height, once it's greater than 0 everything will resume as normal.
  if (rootRect.height === 0) {
    // @todo DX: show warning in console that this is happening
    return;
  }

  var sentinel = this.sentinel();

  var distance = this.distance(rootRect, sentinel);

  if (distance <= 0) {
    this.emitter.emit(HIT, {distance: distance});
  }
};

InfiniteAjaxScroll.prototype.on = function on (event, callback) {
  this.emitter.on(event, callback, this);

  if (event === BINDED && this.binded) {
    callback.bind(this)();
  }
};

InfiniteAjaxScroll.prototype.off = function off (event, callback) {
  this.emitter.off(event, callback, this);
};

InfiniteAjaxScroll.prototype.once = function once (event, callback) {
    var this$1$1 = this;

  return new Promise(function (resolve) {
    this$1$1.emitter.once(event, function() { Promise.resolve(callback.apply(this, arguments)).then(resolve); }, this$1$1);

    if (event === BINDED && this$1$1.binded) {
      callback.bind(this$1$1)();
      resolve();
    }
  })
};

export { InfiniteAjaxScroll as default };
