/**
 * Infinite Ajax Scroll v3.0.0-beta.6
 * Turn your existing pagination into infinite scrolling pages with ease
 *
 * Commercial use requires one-time purchase of a commercial license
 * https://infiniteajaxscroll.com/docs/license.html
 *
 * Copyright 2014-2020 Webcreate (Jeroen Fiege)
 * https://infiniteajaxscroll.com
 */
import $ from 'tealight';
import extend from 'extend';
import throttle from 'lodash.throttle';
import Emitter from 'tiny-emitter';

var defaults = {
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
};

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

function getDistanceToFold(el, scrollContainer) {
  var scroll = getScrollPosition(scrollContainer);
  var rootRect = getRootRect(scrollContainer);
  var boundingRect = el.getBoundingClientRect();

  var scrollYBottom = scroll.y + rootRect.height;
  var bottom = scroll.y + boundingRect.bottom - rootRect.top;

  return Math.trunc(bottom - scrollYBottom);
}

var APPEND = 'append';
var APPENDED = 'appended';
var BINDED = 'binded';
var UNBINDED = 'unbinded';
var HIT = 'hit';
var LOAD = 'load';
var LOADED = 'loaded';
var LAST = 'last';
var NEXT = 'next';
var SCROLLED = 'scrolled';
var RESIZED = 'resized';
var PAGE = 'page';

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

var defaults$1 = {
  element: undefined,
  hide: false
};

function expand(options) {
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
  this.options = extend({}, defaults$1, expand(options));
  this.originalDisplayStyles = new WeakMap();

  if (!this.options.hide) {
    return;
  }

  Assert.warn(Assert.anyElement, this.options.element, 'pagination.element');

  ias.on(BINDED, this.hide.bind(this));
  ias.on(UNBINDED, this.restore.bind(this));
};

Pagination.prototype.hide = function hide () {
    var this$1 = this;

  var els = $(this.options.element);

  els.forEach(function (el) {
    this$1.originalDisplayStyles.set(el, window.getComputedStyle(el).display);

    el.style.display = 'none';
  });
};

Pagination.prototype.restore = function restore () {
    var this$1 = this;

  var els = $(this.options.element);

  els.forEach(function (el) {
    el.style.display = this$1.originalDisplayStyles.get(el) || 'block';
  });
};

var defaults$2 = {
  element: undefined,
  delay: 600,
  show: function (element) {
    element.style.opacity = '1';
  },
  hide: function (element) {
    element.style.opacity = '0';
  }
};

function expand$1(options) {
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
  this.options = extend({}, defaults$2, expand$1(options));

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

    // copy original append function
    var appendFn = event.appendFn;

    // wrap append function with delay
    event.appendFn = function (items, parent, last) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          // turn hide function into promise
          Promise.resolve(self.hide()).then(function () {
            appendFn(items, parent, last);

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
  }
};

function expand$2(options) {
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

  var logger = expand$2(options);

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

Paging.prototype.next = function next (nextEvent) {
    var this$1 = this;

  var url = document.location.toString();
  var title = document.title;

  // @todo can be moved inside appended when eventStack is implemented
  var loaded = function (event) {
    url = event.url;

    if (event.xhr.response) {
      title = event.xhr.response.title;
    }
  };

  this.ias.once(LOADED, loaded);

  this.ias.once(APPENDED, function () {
    this$1.pageBreaks.push({
      pageIndex: nextEvent.pageIndex,
      url: url,
      title: title,
      sentinel: this$1.ias.sentinel()
    });

    this$1.update();

    // @todo can be removed when eventStack is implemented
    this$1.ias.off(LOADED, loaded);
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

var defaults$3 = {
  element: undefined,
  when: function (pageIndex) { return true; },
  show: function (element) {
    element.style.opacity = '1';
  },
  hide: function (element) {
    element.style.opacity = '0';
  }
};

function expand$3(options) {
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
  var this$1 = this;

  // no trigger wanted
  if (options === false) {
    return;
  }

  this.ias = ias;
  this.options = extend({}, defaults$3, expand$3(options));

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
  ias.on(NEXT, function (e) { return this$1.ias.once(APPENDED, function () { return this$1.update(e.pageIndex); }); });
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
    var this$1 = this;

  this.hide().then(function () { return this$1.ias.next(); });
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

var InfiniteAjaxScroll = function InfiniteAjaxScroll(container, options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  Assert.singleElement(container, 'container');

  this.container = $(container)[0];
  this.options = extend({}, defaults, options);
  this.emitter = new Emitter();

  // @todo might need to call enableLoadOnScroll (or disableLoadOnScroll)
  //     instead of injecting the value right away
  this.loadOnScroll = this.options.loadOnScroll;
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

  this.binded = false;
  this.paused = false;
  this.pageIndex = this.sentinel() ? 0 : -1;

  this.on(HIT, function () {
    if (!this$1.loadOnScroll) {
      return;
    }

    this$1.next();
  });

  this.on(SCROLLED, this.measure);
  this.on(RESIZED, this.measure);

  // initialize extensions
  this.pagination = new Pagination(this, this.options.pagination);
  this.spinner = new Spinner(this, this.options.spinner);
  this.logger = new Logger(this, this.options.logger);
  this.paging = new Paging(this);
  this.trigger = new Trigger(this, this.options.trigger);

  // @todo review this logic when prefill support is added
  // measure after all plugins are done binding
  this.on(BINDED, this.measure);

  if (this.options.bind) {
    // @todo on document.ready? (window.addEventListener('DOMContentLoaded'))
    this.bind();
  }
};

InfiniteAjaxScroll.prototype.bind = function bind () {
  if (this.binded) {
    return;
  }

  this._scrollListener = throttle(scrollHandler, 200).bind(this);
  this._resizeListener = throttle(resizeHandler, 200).bind(this);

  this.scrollContainer.addEventListener('scroll', this._scrollListener);
  this.scrollContainer.addEventListener('resize', this._resizeListener);

  this.binded = true;

  this.emitter.emit(BINDED);
};

InfiniteAjaxScroll.prototype.unbind = function unbind () {
  if (!this.binded) {
    return;
  }

  this.scrollContainer.removeEventListener('resize', this._resizeListener);
  this.scrollContainer.removeEventListener('scroll', this._scrollListener);

  this.binded = false;

  this.emitter.emit(UNBINDED);
};

InfiniteAjaxScroll.prototype.next = function next () {
    var this$1 = this;

  this.pause();

  var event = {
    pageIndex: this.pageIndex + 1,
  };

  this.emitter.emit(NEXT, event);

  return Promise.resolve(this.nextHandler(event.pageIndex))
      .then(function (result) {
        this$1.pageIndex = event.pageIndex;

        if (!result) {
          this$1.emitter.emit(LAST);

          return;
        }

        this$1.resume();
      })
  ;
};

InfiniteAjaxScroll.prototype.load = function load (url) {
  var ias = this;

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }

      if (xhr.status === 200) {
        var items = xhr.response;

        if (ias.options.responseType === 'document') {
          items = $(ias.options.item, xhr.response);
          // @todo assert there actually are items in the response
        }

        ias.emitter.emit(LOADED, {items: items, url: url, xhr: xhr});

        resolve({items: items, url: url, xhr: xhr});
      } else {
        // @todo is console.error the best approach?
        console.error('Request failed');

        reject(xhr);
      }
    };

    // FIXME: make no-caching configurable
    // @see https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
    var nocacheUrl = url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();

    xhr.open('GET', nocacheUrl, true);
    xhr.responseType = ias.options.responseType;
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // @todo define event variable and pass that around so it can be manipulated

    ias.emitter.emit(LOAD, {url: url, xhr: xhr});

    xhr.send();
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

  this.measure();
};

InfiniteAjaxScroll.prototype.enableLoadOnScroll = function enableLoadOnScroll () {
  this.loadOnScroll = true;
};

InfiniteAjaxScroll.prototype.disableLoadOnScroll = function disableLoadOnScroll () {
  this.loadOnScroll = false;
};

InfiniteAjaxScroll.prototype.measure = function measure () {
  if (this.paused) {
    return;
  }

  var distance = 0;
  var sentinel = this.sentinel();

  // @todo review this logic when prefill support is added
  if (sentinel) {
    distance = getDistanceToFold(sentinel, this.scrollContainer);
  }

  // apply negative margin
  distance -= this.negativeMargin;

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
  this.emitter.once(event, callback, this);

  if (event === BINDED && this.binded) {
    callback.bind(this)();
  }
};

export default InfiniteAjaxScroll;
