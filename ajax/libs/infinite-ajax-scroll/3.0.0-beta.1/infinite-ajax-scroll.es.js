/**
 * Infinite Ajax Scroll v3.0.0-beta.1
 * Turn your existing pagination into infinite scrolling pages with ease
 *
 * Commercial use requires one-time purchase of a commercial license
 * https://infiniteajaxscroll.com/docs/license.html
 *
 * Copyright 2014-2019 Webcreate (Jeroen Fiege)
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
  logger: true
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

  return bottom - scrollYBottom;
}

// @todo 1) verify that this is NOT shared among multiple instances
// @todo 2) fill in these values on bind instead of zeroing them all
var lastScroll = {
  y: 0,
  x: 0,
  deltaY: 0,
  deltaX: 0
};

function calculateScroll(scrollContainer) {
  var scroll = getScrollPosition(scrollContainer);

  scroll.deltaY = scroll.y - (lastScroll ? lastScroll.y : scroll.y);
  scroll.deltaX = scroll.x - (lastScroll ? lastScroll.x : scroll.x);

  lastScroll = scroll;

  return scroll;
}

function scrollHandler() {
  var scroll = calculateScroll(this.scrollContainer);

  this.emitter.emit('scrolled', {scroll: scroll});

  this.measure();
}

function resizeHandler() {
  var scroll = calculateScroll(this.scrollContainer);

  this.emitter.emit('resized', {scroll: scroll});

  this.measure();
}

var lastResponse = document;
var nextUrl;

function nextHandler(pageIndex) {
  var ias = this;

  var nextEl = $(ias.options.next, lastResponse)[0];

  if (!nextEl) {
    return;
  }

  nextUrl = nextEl.href;

  return ias.load(nextUrl)
      .then(function (data) {
        lastResponse = data.xhr.response;

        var nextEl = $(ias.options.next, lastResponse)[0];

        return ias.append(data.items)
            .then(function () {
              return !!nextEl;
            });
      });
}

var defaults$1 = {
  element: undefined,
  hide: false
};

function expand(options) {
  if (typeof options === 'string') {
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

  if (!this.options.hide) {
    return;
  }

  Assert.singleElement(this.options.element, 'pagination.element');

  ias.on('binded', this.hide.bind(this));
  ias.on('unbinded', this.restore.bind(this));
};

Pagination.prototype.hide = function hide () {
  var el = $(this.options.element)[0];

  this.originalDisplayStyle = window.getComputedStyle(el).display;

  el.style.display = 'none';
};

Pagination.prototype.restore = function restore () {
  var el = $(this.options.element)[0];

  el.style.display = this.originalDisplayStyle;
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
  if (typeof options === 'string') {
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

  Assert.singleElement(this.options.element, 'spinner.element');

  this.element = $(this.options.element)[0]; // @todo should we really cache this?
  this.hideFn = this.options.hide;
  this.showFn = this.options.show;

  ias.on('binded', this.bind.bind(this));
  ias.on('binded', this.hide.bind(this));
};

Spinner.prototype.bind = function bind () {
  var startTime, endTime, diff, delay, self = this, ias = this.ias;

  ias.on('next', function () {
    startTime = +new Date();

    self.show();
  });

  ias.on('last', function () {
    self.hide();
  });

  // setup delay
  ias.on('append', function (event) {
    endTime = +new Date();
    diff = endTime - startTime;

    delay = Math.max(0, self.options.delay - diff);

    // original executor
    var executor = event.executor;

    // wrap executor with delay
    event.executor = function (resolve) {
      setTimeout(function () {
        // turn hide function into promise
        Promise.resolve(self.hide()).then(function () {
          executor(resolve);
        });
      }, delay);
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
  // scrolled: () => {
  //   console.log('Scrolled');
  // },
  // resized: () => {
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

  ias.on('binded', this.binded.bind(this));
  ias.on('next', this.next.bind(this));
  ias.on('scrolled', this.scrolled.bind(this));
  ias.on('resized', this.scrolled.bind(this));
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

  var url;
  var title;

  // @todo can be moved inside appended when eventStack is implemented
  var loaded = function (event) {
    // @todo event.xhr.response.title only works in case of responseType = "document"
    url = event.url;
    title = event.xhr.response.title;
  };

  this.ias.once('loaded', loaded);

  this.ias.once('appended', function () {
    this$1.pageBreaks.push({
      pageIndex: nextEvent.pageIndex,
      url: url,
      title: title,
      sentinel: this$1.ias.sentinel()
    });

    this$1.update();

    // @todo can be removed when eventStack is implemented
    this$1.ias.off('loaded', loaded);
  });
};

Paging.prototype.scrolled = function scrolled (event) {
  this.update(event.scroll.y);
};

Paging.prototype.update = function update (scrollTop) {
  this.currentScrollTop = scrollTop || this.currentScrollTop;

  var pageBreak = getPageBreak(this.pageBreaks, this.currentScrollTop, this.ias.scrollContainer);

  if (pageBreak && pageBreak.pageIndex !== this.currentPageIndex) {
    this.ias.emitter.emit('page', pageBreak);

    this.currentPageIndex = pageBreak.pageIndex;
  }
};

var scrollListener;
var resizeListener;

var InfiniteAjaxScroll = function InfiniteAjaxScroll(container, options) {
  if ( options === void 0 ) options = {};

  Assert.singleElement(container, 'container');

  this.container = $(container)[0];
  this.options = extend({}, defaults, options);
  this.emitter = new Emitter();
  this.scrollContainer = this.options.scrollContainer;

  if (this.options.scrollContainer !== window) {
    Assert.singleElement(this.options.scrollContainer, 'options.scrollContainer');

    this.scrollContainer = $(this.options.scrollContainer)[0];
  }

  this.nextHandler = nextHandler;
  if (typeof this.options.next === 'function') {
    this.nextHandler = this.options.next;
  }

  this.binded = false;
  this.paused = false;
  this.pageIndex = this.sentinel() ? 0 : -1;

  this.on('hit', this.next);

  this.pagination = new Pagination(this, this.options.pagination);
  this.spinner = new Spinner(this, this.options.spinner);
  this.logger = new Logger(this, this.options.logger);
  this.paging = new Paging(this);

  // @todo review this logic when prefill support is added
  this.on('binded', this.measure);

  if (this.options.bind) {
    // @todo on document.ready?
    this.bind();
  }
};

InfiniteAjaxScroll.prototype.bind = function bind () {
  if (this.binded) {
    return;
  }

  scrollListener = throttle(scrollHandler, 200).bind(this);
  resizeListener = throttle(resizeHandler, 200).bind(this);

  this.scrollContainer.addEventListener('scroll', scrollListener);
  this.scrollContainer.addEventListener('resize', resizeListener);

  this.binded = true;

  this.emitter.emit('binded');
};

InfiniteAjaxScroll.prototype.unbind = function unbind () {
  if (!this.binded) {
    return;
  }

  this.scrollContainer.removeEventListener('resize', resizeListener);
  this.scrollContainer.removeEventListener('scroll', scrollListener);

  this.binded = false;

  this.emitter.emit('unbinded');
};

InfiniteAjaxScroll.prototype.next = function next () {
    var this$1 = this;

  this.pause();

  var event = {
    pageIndex: this.pageIndex + 1,
  };

  this.emitter.emit('next', event);

  Promise.resolve(this.nextHandler(event.pageIndex))
      .then(function (result) {
        if (!result) {
          this$1.emitter.emit('last');

          return;
        }

        this$1.pageIndex = event.pageIndex;
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

        ias.emitter.emit('loaded', {items: items, url: url, xhr: xhr});

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

    ias.emitter.emit('load', {url: url, xhr: xhr});

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

  // @todo move fragment creation into executor?
  var insert = document.createDocumentFragment();

  items.forEach(function (item) {
    insert.appendChild(item);
  });

  var executor = function (resolve) {
    var last = ias.sentinel();
    var sibling = last ? last.nextSibling : null;

    window.requestAnimationFrame(function () {
      parent.insertBefore(insert, sibling);

      resolve({items: items, parent: parent});

      ias.emitter.emit('appended', {items: items, parent: parent});
    });
  };

  var event = {
    items: items,
    parent: parent,
    executor: executor,
  };

  ias.emitter.emit('append', event);

  return new Promise(event.executor);
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

  if (distance <= 0) {
    this.emitter.emit('hit', {distance: distance});
  }
};

InfiniteAjaxScroll.prototype.on = function on (event, callback) {
  this.emitter.on(event, callback, this);

  if (event === 'binded' && this.binded) {
    callback.bind(this)();
  }
};

InfiniteAjaxScroll.prototype.off = function off (event, callback) {
  this.emitter.off(event, callback, this);
};

InfiniteAjaxScroll.prototype.once = function once (event, callback) {
  this.emitter.once(event, callback, this);

  if (event === 'binded' && this.binded) {
    callback.bind(this)();
  }
};

export default InfiniteAjaxScroll;
