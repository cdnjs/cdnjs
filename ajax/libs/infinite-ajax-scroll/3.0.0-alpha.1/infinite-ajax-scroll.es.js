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
  spinner: false
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

function scrollHandler() {
  this.emitter.emit('scrolled');

  this.measure();
}

function resizeHandler() {
  this.emitter.emit('resized');

  this.measure();
}

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
  this.pageIndex = 0;

  this.on('hit', this.next);

  this.pagination = new Pagination(this, this.options.pagination);
  this.spinner = new Spinner(this, this.options.spinner);

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
    pageIndex: this.pageIndex,
  };

  this.emitter.emit('next', event);

  Promise.resolve(this.nextHandler(event.pageIndex))
      .then(function (result) {
        if (!result) {
          this$1.emitter.emit('last');

          return;
        }

        this$1.pageIndex++;
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
        }

        ias.emitter.emit('loaded', {items: items, url: url, xhr: xhr});

        resolve({items: items, url: url, xhr: xhr});
      } else {
        // @todo this console.error the best approach?
        console.error('Request failed');

        reject(xhr);
      }
    };

    // FIXME: make no-caching configurable
    // @see https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
    url = url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();

    xhr.open('GET', url, true);
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

    parent.insertBefore(insert, sibling);

    window.requestAnimationFrame(function () {
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
    throw new Error(("Item \"" + (this.options.item) + "\" not found"));
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

  var distance = getDistanceToFold(this.sentinel(), this.scrollContainer);

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
