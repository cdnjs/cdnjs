/* Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function (root, factory) {
 'use strict';
 if (typeof define === 'function' && define.amd) {
  define('pdfjs-dist/web/pdf_viewer', [
   'exports',
   'pdfjs-dist/build/pdf'
  ], factory);
 } else if (typeof exports !== 'undefined') {
  factory(exports, require('../build/pdf.js'));
 } else {
  factory(root.pdfjsDistWebPDFViewer = {}, root.pdfjsDistBuildPdf);
 }
}(this, function (exports, pdfjsLib) {
 'use strict';
 var pdfViewerLibs = { pdfjsWebPDFJS: pdfjsLib };
 (function () {
  (function (root, factory) {
   factory(root.pdfjsWebPDFRenderingQueue = {});
  }(this, function (exports) {
   var CLEANUP_TIMEOUT = 30000;
   var RenderingStates = {
    INITIAL: 0,
    RUNNING: 1,
    PAUSED: 2,
    FINISHED: 3
   };
   var PDFRenderingQueue = function PDFRenderingQueueClosure() {
    function PDFRenderingQueue() {
     this.pdfViewer = null;
     this.pdfThumbnailViewer = null;
     this.onIdle = null;
     this.highestPriorityPage = null;
     this.idleTimeout = null;
     this.printing = false;
     this.isThumbnailViewEnabled = false;
    }
    PDFRenderingQueue.prototype = {
     setViewer: function PDFRenderingQueue_setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
     },
     setThumbnailViewer: function PDFRenderingQueue_setThumbnailViewer(pdfThumbnailViewer) {
      this.pdfThumbnailViewer = pdfThumbnailViewer;
     },
     isHighestPriority: function PDFRenderingQueue_isHighestPriority(view) {
      return this.highestPriorityPage === view.renderingId;
     },
     renderHighestPriority: function PDFRenderingQueue_renderHighestPriority(currentlyVisiblePages) {
      if (this.idleTimeout) {
       clearTimeout(this.idleTimeout);
       this.idleTimeout = null;
      }
      if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
       return;
      }
      if (this.pdfThumbnailViewer && this.isThumbnailViewEnabled) {
       if (this.pdfThumbnailViewer.forceRendering()) {
        return;
       }
      }
      if (this.printing) {
       return;
      }
      if (this.onIdle) {
       this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
      }
     },
     getHighestPriority: function PDFRenderingQueue_getHighestPriority(visible, views, scrolledDown) {
      var visibleViews = visible.views;
      var numVisible = visibleViews.length;
      if (numVisible === 0) {
       return false;
      }
      for (var i = 0; i < numVisible; ++i) {
       var view = visibleViews[i].view;
       if (!this.isViewFinished(view)) {
        return view;
       }
      }
      if (scrolledDown) {
       var nextPageIndex = visible.last.id;
       if (views[nextPageIndex] && !this.isViewFinished(views[nextPageIndex])) {
        return views[nextPageIndex];
       }
      } else {
       var previousPageIndex = visible.first.id - 2;
       if (views[previousPageIndex] && !this.isViewFinished(views[previousPageIndex])) {
        return views[previousPageIndex];
       }
      }
      return null;
     },
     isViewFinished: function PDFRenderingQueue_isViewFinished(view) {
      return view.renderingState === RenderingStates.FINISHED;
     },
     renderView: function PDFRenderingQueue_renderView(view) {
      var state = view.renderingState;
      switch (state) {
      case RenderingStates.FINISHED:
       return false;
      case RenderingStates.PAUSED:
       this.highestPriorityPage = view.renderingId;
       view.resume();
       break;
      case RenderingStates.RUNNING:
       this.highestPriorityPage = view.renderingId;
       break;
      case RenderingStates.INITIAL:
       this.highestPriorityPage = view.renderingId;
       var continueRendering = function () {
        this.renderHighestPriority();
       }.bind(this);
       view.draw().then(continueRendering, continueRendering);
       break;
      }
      return true;
     }
    };
    return PDFRenderingQueue;
   }();
   exports.RenderingStates = RenderingStates;
   exports.PDFRenderingQueue = PDFRenderingQueue;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebDownloadManager = {}, root.pdfjsWebPDFJS);
  }(this, function (exports, pdfjsLib) {
   function download(blobUrl, filename) {
    var a = document.createElement('a');
    if (a.click) {
     a.href = blobUrl;
     a.target = '_parent';
     if ('download' in a) {
      a.download = filename;
     }
     (document.body || document.documentElement).appendChild(a);
     a.click();
     a.parentNode.removeChild(a);
    } else {
     if (window.top === window && blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
      var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
      blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
     }
     window.open(blobUrl, '_parent');
    }
   }
   function DownloadManager() {
   }
   DownloadManager.prototype = {
    downloadUrl: function DownloadManager_downloadUrl(url, filename) {
     if (!pdfjsLib.createValidAbsoluteUrl(url, 'http://example.com')) {
      return;
     }
     download(url + '#pdfjs.action=download', filename);
    },
    downloadData: function DownloadManager_downloadData(data, filename, contentType) {
     if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([data], { type: contentType }), filename);
     }
     var blobUrl = pdfjsLib.createObjectURL(data, contentType, pdfjsLib.PDFJS.disableCreateObjectURL);
     download(blobUrl, filename);
    },
    download: function DownloadManager_download(blob, url, filename) {
     if (!URL) {
      this.downloadUrl(url, filename);
      return;
     }
     if (navigator.msSaveBlob) {
      if (!navigator.msSaveBlob(blob, filename)) {
       this.downloadUrl(url, filename);
      }
      return;
     }
     var blobUrl = URL.createObjectURL(blob);
     download(blobUrl, filename);
    }
   };
   exports.DownloadManager = DownloadManager;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebUIUtils = {}, root.pdfjsWebPDFJS);
  }(this, function (exports, pdfjsLib) {
   var CSS_UNITS = 96.0 / 72.0;
   var DEFAULT_SCALE_VALUE = 'auto';
   var DEFAULT_SCALE = 1.0;
   var MIN_SCALE = 0.25;
   var MAX_SCALE = 10.0;
   var UNKNOWN_SCALE = 0;
   var MAX_AUTO_SCALE = 1.25;
   var SCROLLBAR_PADDING = 40;
   var VERTICAL_PADDING = 5;
   var RendererType = {
    CANVAS: 'canvas',
    SVG: 'svg'
   };
   var mozL10n = document.mozL10n || document.webL10n;
   var PDFJS = pdfjsLib.PDFJS;
   PDFJS.disableFullscreen = PDFJS.disableFullscreen === undefined ? false : PDFJS.disableFullscreen;
   PDFJS.useOnlyCssZoom = PDFJS.useOnlyCssZoom === undefined ? false : PDFJS.useOnlyCssZoom;
   PDFJS.maxCanvasPixels = PDFJS.maxCanvasPixels === undefined ? 16777216 : PDFJS.maxCanvasPixels;
   PDFJS.disableHistory = PDFJS.disableHistory === undefined ? false : PDFJS.disableHistory;
   PDFJS.disableTextLayer = PDFJS.disableTextLayer === undefined ? false : PDFJS.disableTextLayer;
   PDFJS.ignoreCurrentPositionOnZoom = PDFJS.ignoreCurrentPositionOnZoom === undefined ? false : PDFJS.ignoreCurrentPositionOnZoom;
   PDFJS.locale = PDFJS.locale === undefined ? navigator.language : PDFJS.locale;
   function getOutputScale(ctx) {
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    var pixelRatio = devicePixelRatio / backingStoreRatio;
    return {
     sx: pixelRatio,
     sy: pixelRatio,
     scaled: pixelRatio !== 1
    };
   }
   function scrollIntoView(element, spot, skipOverflowHiddenElements) {
    var parent = element.offsetParent;
    if (!parent) {
     console.error('offsetParent is not set -- cannot scroll');
     return;
    }
    var checkOverflow = skipOverflowHiddenElements || false;
    var offsetY = element.offsetTop + element.clientTop;
    var offsetX = element.offsetLeft + element.clientLeft;
    while (parent.clientHeight === parent.scrollHeight || checkOverflow && getComputedStyle(parent).overflow === 'hidden') {
     if (parent.dataset._scaleY) {
      offsetY /= parent.dataset._scaleY;
      offsetX /= parent.dataset._scaleX;
     }
     offsetY += parent.offsetTop;
     offsetX += parent.offsetLeft;
     parent = parent.offsetParent;
     if (!parent) {
      return;
     }
    }
    if (spot) {
     if (spot.top !== undefined) {
      offsetY += spot.top;
     }
     if (spot.left !== undefined) {
      offsetX += spot.left;
      parent.scrollLeft = offsetX;
     }
    }
    parent.scrollTop = offsetY;
   }
   function watchScroll(viewAreaElement, callback) {
    var debounceScroll = function debounceScroll(evt) {
     if (rAF) {
      return;
     }
     rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
      rAF = null;
      var currentY = viewAreaElement.scrollTop;
      var lastY = state.lastY;
      if (currentY !== lastY) {
       state.down = currentY > lastY;
      }
      state.lastY = currentY;
      callback(state);
     });
    };
    var state = {
     down: true,
     lastY: viewAreaElement.scrollTop,
     _eventHandler: debounceScroll
    };
    var rAF = null;
    viewAreaElement.addEventListener('scroll', debounceScroll, true);
    return state;
   }
   function parseQueryString(query) {
    var parts = query.split('&');
    var params = {};
    for (var i = 0, ii = parts.length; i < ii; ++i) {
     var param = parts[i].split('=');
     var key = param[0].toLowerCase();
     var value = param.length > 1 ? param[1] : null;
     params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return params;
   }
   function binarySearchFirstItem(items, condition) {
    var minIndex = 0;
    var maxIndex = items.length - 1;
    if (items.length === 0 || !condition(items[maxIndex])) {
     return items.length;
    }
    if (condition(items[minIndex])) {
     return minIndex;
    }
    while (minIndex < maxIndex) {
     var currentIndex = minIndex + maxIndex >> 1;
     var currentItem = items[currentIndex];
     if (condition(currentItem)) {
      maxIndex = currentIndex;
     } else {
      minIndex = currentIndex + 1;
     }
    }
    return minIndex;
   }
   function approximateFraction(x) {
    if (Math.floor(x) === x) {
     return [
      x,
      1
     ];
    }
    var xinv = 1 / x;
    var limit = 8;
    if (xinv > limit) {
     return [
      1,
      limit
     ];
    } else if (Math.floor(xinv) === xinv) {
     return [
      1,
      xinv
     ];
    }
    var x_ = x > 1 ? xinv : x;
    var a = 0, b = 1, c = 1, d = 1;
    while (true) {
     var p = a + c, q = b + d;
     if (q > limit) {
      break;
     }
     if (x_ <= p / q) {
      c = p;
      d = q;
     } else {
      a = p;
      b = q;
     }
    }
    if (x_ - a / b < c / d - x_) {
     return x_ === x ? [
      a,
      b
     ] : [
      b,
      a
     ];
    } else {
     return x_ === x ? [
      c,
      d
     ] : [
      d,
      c
     ];
    }
   }
   function roundToDivide(x, div) {
    var r = x % div;
    return r === 0 ? x : Math.round(x - r + div);
   }
   function getVisibleElements(scrollEl, views, sortByVisibility) {
    var top = scrollEl.scrollTop, bottom = top + scrollEl.clientHeight;
    var left = scrollEl.scrollLeft, right = left + scrollEl.clientWidth;
    function isElementBottomBelowViewTop(view) {
     var element = view.div;
     var elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
     return elementBottom > top;
    }
    var visible = [], view, element;
    var currentHeight, viewHeight, hiddenHeight, percentHeight;
    var currentWidth, viewWidth;
    var firstVisibleElementInd = views.length === 0 ? 0 : binarySearchFirstItem(views, isElementBottomBelowViewTop);
    for (var i = firstVisibleElementInd, ii = views.length; i < ii; i++) {
     view = views[i];
     element = view.div;
     currentHeight = element.offsetTop + element.clientTop;
     viewHeight = element.clientHeight;
     if (currentHeight > bottom) {
      break;
     }
     currentWidth = element.offsetLeft + element.clientLeft;
     viewWidth = element.clientWidth;
     if (currentWidth + viewWidth < left || currentWidth > right) {
      continue;
     }
     hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, currentHeight + viewHeight - bottom);
     percentHeight = (viewHeight - hiddenHeight) * 100 / viewHeight | 0;
     visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view: view,
      percent: percentHeight
     });
    }
    var first = visible[0];
    var last = visible[visible.length - 1];
    if (sortByVisibility) {
     visible.sort(function (a, b) {
      var pc = a.percent - b.percent;
      if (Math.abs(pc) > 0.001) {
       return -pc;
      }
      return a.id - b.id;
     });
    }
    return {
     first: first,
     last: last,
     views: visible
    };
   }
   function noContextMenuHandler(e) {
    e.preventDefault();
   }
   function getPDFFileNameFromURL(url) {
    var reURI = /^(?:([^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
    var reFilename = /[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
    var splitURI = reURI.exec(url);
    var suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);
    if (suggestedFilename) {
     suggestedFilename = suggestedFilename[0];
     if (suggestedFilename.indexOf('%') !== -1) {
      try {
       suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
      } catch (e) {
      }
     }
    }
    return suggestedFilename || 'document.pdf';
   }
   function normalizeWheelEventDelta(evt) {
    var delta = Math.sqrt(evt.deltaX * evt.deltaX + evt.deltaY * evt.deltaY);
    var angle = Math.atan2(evt.deltaY, evt.deltaX);
    if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
     delta = -delta;
    }
    var MOUSE_DOM_DELTA_PIXEL_MODE = 0;
    var MOUSE_DOM_DELTA_LINE_MODE = 1;
    var MOUSE_PIXELS_PER_LINE = 30;
    var MOUSE_LINES_PER_PAGE = 30;
    if (evt.deltaMode === MOUSE_DOM_DELTA_PIXEL_MODE) {
     delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
    } else if (evt.deltaMode === MOUSE_DOM_DELTA_LINE_MODE) {
     delta /= MOUSE_LINES_PER_PAGE;
    }
    return delta;
   }
   var animationStarted = new Promise(function (resolve) {
    window.requestAnimationFrame(resolve);
   });
   var localized = new Promise(function (resolve, reject) {
    if (!mozL10n) {
     resolve();
     return;
    }
    if (mozL10n.getReadyState() !== 'loading') {
     resolve();
     return;
    }
    window.addEventListener('localized', function localized(evt) {
     resolve();
    });
   });
   var EventBus = function EventBusClosure() {
    function EventBus() {
     this._listeners = Object.create(null);
    }
    EventBus.prototype = {
     on: function EventBus_on(eventName, listener) {
      var eventListeners = this._listeners[eventName];
      if (!eventListeners) {
       eventListeners = [];
       this._listeners[eventName] = eventListeners;
      }
      eventListeners.push(listener);
     },
     off: function EventBus_on(eventName, listener) {
      var eventListeners = this._listeners[eventName];
      var i;
      if (!eventListeners || (i = eventListeners.indexOf(listener)) < 0) {
       return;
      }
      eventListeners.splice(i, 1);
     },
     dispatch: function EventBus_dispath(eventName) {
      var eventListeners = this._listeners[eventName];
      if (!eventListeners || eventListeners.length === 0) {
       return;
      }
      var args = Array.prototype.slice.call(arguments, 1);
      eventListeners.slice(0).forEach(function (listener) {
       listener.apply(null, args);
      });
     }
    };
    return EventBus;
   }();
   var ProgressBar = function ProgressBarClosure() {
    function clamp(v, min, max) {
     return Math.min(Math.max(v, min), max);
    }
    function ProgressBar(id, opts) {
     this.visible = true;
     this.div = document.querySelector(id + ' .progress');
     this.bar = this.div.parentNode;
     this.height = opts.height || 100;
     this.width = opts.width || 100;
     this.units = opts.units || '%';
     this.div.style.height = this.height + this.units;
     this.percent = 0;
    }
    ProgressBar.prototype = {
     updateBar: function ProgressBar_updateBar() {
      if (this._indeterminate) {
       this.div.classList.add('indeterminate');
       this.div.style.width = this.width + this.units;
       return;
      }
      this.div.classList.remove('indeterminate');
      var progressSize = this.width * this._percent / 100;
      this.div.style.width = progressSize + this.units;
     },
     get percent() {
      return this._percent;
     },
     set percent(val) {
      this._indeterminate = isNaN(val);
      this._percent = clamp(val, 0, 100);
      this.updateBar();
     },
     setWidth: function ProgressBar_setWidth(viewer) {
      if (viewer) {
       var container = viewer.parentNode;
       var scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
       if (scrollbarWidth > 0) {
        this.bar.setAttribute('style', 'width: calc(100% - ' + scrollbarWidth + 'px);');
       }
      }
     },
     hide: function ProgressBar_hide() {
      if (!this.visible) {
       return;
      }
      this.visible = false;
      this.bar.classList.add('hidden');
      document.body.classList.remove('loadingInProgress');
     },
     show: function ProgressBar_show() {
      if (this.visible) {
       return;
      }
      this.visible = true;
      document.body.classList.add('loadingInProgress');
      this.bar.classList.remove('hidden');
     }
    };
    return ProgressBar;
   }();
   exports.CSS_UNITS = CSS_UNITS;
   exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
   exports.DEFAULT_SCALE = DEFAULT_SCALE;
   exports.MIN_SCALE = MIN_SCALE;
   exports.MAX_SCALE = MAX_SCALE;
   exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
   exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
   exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
   exports.VERTICAL_PADDING = VERTICAL_PADDING;
   exports.RendererType = RendererType;
   exports.mozL10n = mozL10n;
   exports.EventBus = EventBus;
   exports.ProgressBar = ProgressBar;
   exports.getPDFFileNameFromURL = getPDFFileNameFromURL;
   exports.noContextMenuHandler = noContextMenuHandler;
   exports.parseQueryString = parseQueryString;
   exports.getVisibleElements = getVisibleElements;
   exports.roundToDivide = roundToDivide;
   exports.approximateFraction = approximateFraction;
   exports.getOutputScale = getOutputScale;
   exports.scrollIntoView = scrollIntoView;
   exports.watchScroll = watchScroll;
   exports.binarySearchFirstItem = binarySearchFirstItem;
   exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
   exports.animationStarted = animationStarted;
   exports.localized = localized;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebDOMEvents = {}, root.pdfjsWebUIUtils);
  }(this, function (exports, uiUtils) {
   var EventBus = uiUtils.EventBus;
   function attachDOMEventsToEventBus(eventBus) {
    eventBus.on('documentload', function () {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('documentload', true, true, {});
     window.dispatchEvent(event);
    });
    eventBus.on('pagerendered', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('pagerendered', true, true, {
      pageNumber: e.pageNumber,
      cssTransform: e.cssTransform
     });
     e.source.div.dispatchEvent(event);
    });
    eventBus.on('textlayerrendered', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('textlayerrendered', true, true, { pageNumber: e.pageNumber });
     e.source.textLayerDiv.dispatchEvent(event);
    });
    eventBus.on('pagechange', function (e) {
     var event = document.createEvent('UIEvents');
     event.initUIEvent('pagechange', true, true, window, 0);
     event.pageNumber = e.pageNumber;
     e.source.container.dispatchEvent(event);
    });
    eventBus.on('pagesinit', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('pagesinit', true, true, null);
     e.source.container.dispatchEvent(event);
    });
    eventBus.on('pagesloaded', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('pagesloaded', true, true, { pagesCount: e.pagesCount });
     e.source.container.dispatchEvent(event);
    });
    eventBus.on('scalechange', function (e) {
     var event = document.createEvent('UIEvents');
     event.initUIEvent('scalechange', true, true, window, 0);
     event.scale = e.scale;
     event.presetValue = e.presetValue;
     e.source.container.dispatchEvent(event);
    });
    eventBus.on('updateviewarea', function (e) {
     var event = document.createEvent('UIEvents');
     event.initUIEvent('updateviewarea', true, true, window, 0);
     event.location = e.location;
     e.source.container.dispatchEvent(event);
    });
    eventBus.on('find', function (e) {
     if (e.source === window) {
      return;
     }
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('find' + e.type, true, true, {
      query: e.query,
      phraseSearch: e.phraseSearch,
      caseSensitive: e.caseSensitive,
      highlightAll: e.highlightAll,
      findPrevious: e.findPrevious
     });
     window.dispatchEvent(event);
    });
    eventBus.on('attachmentsloaded', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('attachmentsloaded', true, true, { attachmentsCount: e.attachmentsCount });
     e.source.container.dispatchEvent(event);
    });
    eventBus.on('sidebarviewchanged', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('sidebarviewchanged', true, true, { view: e.view });
     e.source.outerContainer.dispatchEvent(event);
    });
    eventBus.on('pagemode', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('pagemode', true, true, { mode: e.mode });
     e.source.pdfViewer.container.dispatchEvent(event);
    });
    eventBus.on('namedaction', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('namedaction', true, true, { action: e.action });
     e.source.pdfViewer.container.dispatchEvent(event);
    });
    eventBus.on('presentationmodechanged', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('presentationmodechanged', true, true, {
      active: e.active,
      switchInProgress: e.switchInProgress
     });
     window.dispatchEvent(event);
    });
    eventBus.on('outlineloaded', function (e) {
     var event = document.createEvent('CustomEvent');
     event.initCustomEvent('outlineloaded', true, true, { outlineCount: e.outlineCount });
     e.source.container.dispatchEvent(event);
    });
   }
   var globalEventBus = null;
   function getGlobalEventBus() {
    if (globalEventBus) {
     return globalEventBus;
    }
    globalEventBus = new EventBus();
    attachDOMEventsToEventBus(globalEventBus);
    return globalEventBus;
   }
   exports.attachDOMEventsToEventBus = attachDOMEventsToEventBus;
   exports.getGlobalEventBus = getGlobalEventBus;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebPDFFindController = {}, root.pdfjsWebUIUtils);
  }(this, function (exports, uiUtils) {
   var scrollIntoView = uiUtils.scrollIntoView;
   var FindStates = {
    FIND_FOUND: 0,
    FIND_NOTFOUND: 1,
    FIND_WRAPPED: 2,
    FIND_PENDING: 3
   };
   var FIND_SCROLL_OFFSET_TOP = -50;
   var FIND_SCROLL_OFFSET_LEFT = -400;
   var CHARACTERS_TO_NORMALIZE = {
    '\u2018': '\'',
    '\u2019': '\'',
    '\u201A': '\'',
    '\u201B': '\'',
    '\u201C': '"',
    '\u201D': '"',
    '\u201E': '"',
    '\u201F': '"',
    '\u00BC': '1/4',
    '\u00BD': '1/2',
    '\u00BE': '3/4'
   };
   var PDFFindController = function PDFFindControllerClosure() {
    function PDFFindController(options) {
     this.pdfViewer = options.pdfViewer || null;
     this.onUpdateResultsCount = null;
     this.onUpdateState = null;
     this.reset();
     var replace = Object.keys(CHARACTERS_TO_NORMALIZE).join('');
     this.normalizationRegex = new RegExp('[' + replace + ']', 'g');
    }
    PDFFindController.prototype = {
     reset: function PDFFindController_reset() {
      this.startedTextExtraction = false;
      this.extractTextPromises = [];
      this.pendingFindMatches = Object.create(null);
      this.active = false;
      this.pageContents = [];
      this.pageMatches = [];
      this.pageMatchesLength = null;
      this.matchCount = 0;
      this.selected = {
       pageIdx: -1,
       matchIdx: -1
      };
      this.offset = {
       pageIdx: null,
       matchIdx: null
      };
      this.pagesToSearch = null;
      this.resumePageIdx = null;
      this.state = null;
      this.dirtyMatch = false;
      this.findTimeout = null;
      this.firstPagePromise = new Promise(function (resolve) {
       this.resolveFirstPage = resolve;
      }.bind(this));
     },
     normalize: function PDFFindController_normalize(text) {
      return text.replace(this.normalizationRegex, function (ch) {
       return CHARACTERS_TO_NORMALIZE[ch];
      });
     },
     _prepareMatches: function PDFFindController_prepareMatches(matchesWithLength, matches, matchesLength) {
      function isSubTerm(matchesWithLength, currentIndex) {
       var currentElem, prevElem, nextElem;
       currentElem = matchesWithLength[currentIndex];
       nextElem = matchesWithLength[currentIndex + 1];
       if (currentIndex < matchesWithLength.length - 1 && currentElem.match === nextElem.match) {
        currentElem.skipped = true;
        return true;
       }
       for (var i = currentIndex - 1; i >= 0; i--) {
        prevElem = matchesWithLength[i];
        if (prevElem.skipped) {
         continue;
        }
        if (prevElem.match + prevElem.matchLength < currentElem.match) {
         break;
        }
        if (prevElem.match + prevElem.matchLength >= currentElem.match + currentElem.matchLength) {
         currentElem.skipped = true;
         return true;
        }
       }
       return false;
      }
      var i, len;
      matchesWithLength.sort(function (a, b) {
       return a.match === b.match ? a.matchLength - b.matchLength : a.match - b.match;
      });
      for (i = 0, len = matchesWithLength.length; i < len; i++) {
       if (isSubTerm(matchesWithLength, i)) {
        continue;
       }
       matches.push(matchesWithLength[i].match);
       matchesLength.push(matchesWithLength[i].matchLength);
      }
     },
     calcFindPhraseMatch: function PDFFindController_calcFindPhraseMatch(query, pageIndex, pageContent) {
      var matches = [];
      var queryLen = query.length;
      var matchIdx = -queryLen;
      while (true) {
       matchIdx = pageContent.indexOf(query, matchIdx + queryLen);
       if (matchIdx === -1) {
        break;
       }
       matches.push(matchIdx);
      }
      this.pageMatches[pageIndex] = matches;
     },
     calcFindWordMatch: function PDFFindController_calcFindWordMatch(query, pageIndex, pageContent) {
      var matchesWithLength = [];
      var queryArray = query.match(/\S+/g);
      var subquery, subqueryLen, matchIdx;
      for (var i = 0, len = queryArray.length; i < len; i++) {
       subquery = queryArray[i];
       subqueryLen = subquery.length;
       matchIdx = -subqueryLen;
       while (true) {
        matchIdx = pageContent.indexOf(subquery, matchIdx + subqueryLen);
        if (matchIdx === -1) {
         break;
        }
        matchesWithLength.push({
         match: matchIdx,
         matchLength: subqueryLen,
         skipped: false
        });
       }
      }
      if (!this.pageMatchesLength) {
       this.pageMatchesLength = [];
      }
      this.pageMatchesLength[pageIndex] = [];
      this.pageMatches[pageIndex] = [];
      this._prepareMatches(matchesWithLength, this.pageMatches[pageIndex], this.pageMatchesLength[pageIndex]);
     },
     calcFindMatch: function PDFFindController_calcFindMatch(pageIndex) {
      var pageContent = this.normalize(this.pageContents[pageIndex]);
      var query = this.normalize(this.state.query);
      var caseSensitive = this.state.caseSensitive;
      var phraseSearch = this.state.phraseSearch;
      var queryLen = query.length;
      if (queryLen === 0) {
       return;
      }
      if (!caseSensitive) {
       pageContent = pageContent.toLowerCase();
       query = query.toLowerCase();
      }
      if (phraseSearch) {
       this.calcFindPhraseMatch(query, pageIndex, pageContent);
      } else {
       this.calcFindWordMatch(query, pageIndex, pageContent);
      }
      this.updatePage(pageIndex);
      if (this.resumePageIdx === pageIndex) {
       this.resumePageIdx = null;
       this.nextPageMatch();
      }
      if (this.pageMatches[pageIndex].length > 0) {
       this.matchCount += this.pageMatches[pageIndex].length;
       this.updateUIResultsCount();
      }
     },
     extractText: function PDFFindController_extractText() {
      if (this.startedTextExtraction) {
       return;
      }
      this.startedTextExtraction = true;
      this.pageContents = [];
      var extractTextPromisesResolves = [];
      var numPages = this.pdfViewer.pagesCount;
      for (var i = 0; i < numPages; i++) {
       this.extractTextPromises.push(new Promise(function (resolve) {
        extractTextPromisesResolves.push(resolve);
       }));
      }
      var self = this;
      function extractPageText(pageIndex) {
       self.pdfViewer.getPageTextContent(pageIndex).then(function textContentResolved(textContent) {
        var textItems = textContent.items;
        var str = [];
        for (var i = 0, len = textItems.length; i < len; i++) {
         str.push(textItems[i].str);
        }
        self.pageContents.push(str.join(''));
        extractTextPromisesResolves[pageIndex](pageIndex);
        if (pageIndex + 1 < self.pdfViewer.pagesCount) {
         extractPageText(pageIndex + 1);
        }
       });
      }
      extractPageText(0);
     },
     executeCommand: function PDFFindController_executeCommand(cmd, state) {
      if (this.state === null || cmd !== 'findagain') {
       this.dirtyMatch = true;
      }
      this.state = state;
      this.updateUIState(FindStates.FIND_PENDING);
      this.firstPagePromise.then(function () {
       this.extractText();
       clearTimeout(this.findTimeout);
       if (cmd === 'find') {
        this.findTimeout = setTimeout(this.nextMatch.bind(this), 250);
       } else {
        this.nextMatch();
       }
      }.bind(this));
     },
     updatePage: function PDFFindController_updatePage(index) {
      if (this.selected.pageIdx === index) {
       this.pdfViewer.currentPageNumber = index + 1;
      }
      var page = this.pdfViewer.getPageView(index);
      if (page.textLayer) {
       page.textLayer.updateMatches();
      }
     },
     nextMatch: function PDFFindController_nextMatch() {
      var previous = this.state.findPrevious;
      var currentPageIndex = this.pdfViewer.currentPageNumber - 1;
      var numPages = this.pdfViewer.pagesCount;
      this.active = true;
      if (this.dirtyMatch) {
       this.dirtyMatch = false;
       this.selected.pageIdx = this.selected.matchIdx = -1;
       this.offset.pageIdx = currentPageIndex;
       this.offset.matchIdx = null;
       this.hadMatch = false;
       this.resumePageIdx = null;
       this.pageMatches = [];
       this.matchCount = 0;
       this.pageMatchesLength = null;
       var self = this;
       for (var i = 0; i < numPages; i++) {
        this.updatePage(i);
        if (!(i in this.pendingFindMatches)) {
         this.pendingFindMatches[i] = true;
         this.extractTextPromises[i].then(function (pageIdx) {
          delete self.pendingFindMatches[pageIdx];
          self.calcFindMatch(pageIdx);
         });
        }
       }
      }
      if (this.state.query === '') {
       this.updateUIState(FindStates.FIND_FOUND);
       return;
      }
      if (this.resumePageIdx) {
       return;
      }
      var offset = this.offset;
      this.pagesToSearch = numPages;
      if (offset.matchIdx !== null) {
       var numPageMatches = this.pageMatches[offset.pageIdx].length;
       if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
        this.hadMatch = true;
        offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
        this.updateMatch(true);
        return;
       }
       this.advanceOffsetPage(previous);
      }
      this.nextPageMatch();
     },
     matchesReady: function PDFFindController_matchesReady(matches) {
      var offset = this.offset;
      var numMatches = matches.length;
      var previous = this.state.findPrevious;
      if (numMatches) {
       this.hadMatch = true;
       offset.matchIdx = previous ? numMatches - 1 : 0;
       this.updateMatch(true);
       return true;
      } else {
       this.advanceOffsetPage(previous);
       if (offset.wrapped) {
        offset.matchIdx = null;
        if (this.pagesToSearch < 0) {
         this.updateMatch(false);
         return true;
        }
       }
       return false;
      }
     },
     updateMatchPosition: function PDFFindController_updateMatchPosition(pageIndex, index, elements, beginIdx) {
      if (this.selected.matchIdx === index && this.selected.pageIdx === pageIndex) {
       var spot = {
        top: FIND_SCROLL_OFFSET_TOP,
        left: FIND_SCROLL_OFFSET_LEFT
       };
       scrollIntoView(elements[beginIdx], spot, true);
      }
     },
     nextPageMatch: function PDFFindController_nextPageMatch() {
      if (this.resumePageIdx !== null) {
       console.error('There can only be one pending page.');
      }
      do {
       var pageIdx = this.offset.pageIdx;
       var matches = this.pageMatches[pageIdx];
       if (!matches) {
        this.resumePageIdx = pageIdx;
        break;
       }
      } while (!this.matchesReady(matches));
     },
     advanceOffsetPage: function PDFFindController_advanceOffsetPage(previous) {
      var offset = this.offset;
      var numPages = this.extractTextPromises.length;
      offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
      offset.matchIdx = null;
      this.pagesToSearch--;
      if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
       offset.pageIdx = previous ? numPages - 1 : 0;
       offset.wrapped = true;
      }
     },
     updateMatch: function PDFFindController_updateMatch(found) {
      var state = FindStates.FIND_NOTFOUND;
      var wrapped = this.offset.wrapped;
      this.offset.wrapped = false;
      if (found) {
       var previousPage = this.selected.pageIdx;
       this.selected.pageIdx = this.offset.pageIdx;
       this.selected.matchIdx = this.offset.matchIdx;
       state = wrapped ? FindStates.FIND_WRAPPED : FindStates.FIND_FOUND;
       if (previousPage !== -1 && previousPage !== this.selected.pageIdx) {
        this.updatePage(previousPage);
       }
      }
      this.updateUIState(state, this.state.findPrevious);
      if (this.selected.pageIdx !== -1) {
       this.updatePage(this.selected.pageIdx);
      }
     },
     updateUIResultsCount: function PDFFindController_updateUIResultsCount() {
      if (this.onUpdateResultsCount) {
       this.onUpdateResultsCount(this.matchCount);
      }
     },
     updateUIState: function PDFFindController_updateUIState(state, previous) {
      if (this.onUpdateState) {
       this.onUpdateState(state, previous, this.matchCount);
      }
     }
    };
    return PDFFindController;
   }();
   exports.FindStates = FindStates;
   exports.PDFFindController = PDFFindController;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebPDFHistory = {}, root.pdfjsWebDOMEvents);
  }(this, function (exports, domEvents) {
   function PDFHistory(options) {
    this.linkService = options.linkService;
    this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
    this.initialized = false;
    this.initialDestination = null;
    this.initialBookmark = null;
   }
   PDFHistory.prototype = {
    initialize: function pdfHistoryInitialize(fingerprint) {
     this.initialized = true;
     this.reInitialized = false;
     this.allowHashChange = true;
     this.historyUnlocked = true;
     this.isViewerInPresentationMode = false;
     this.previousHash = window.location.hash.substring(1);
     this.currentBookmark = '';
     this.currentPage = 0;
     this.updatePreviousBookmark = false;
     this.previousBookmark = '';
     this.previousPage = 0;
     this.nextHashParam = '';
     this.fingerprint = fingerprint;
     this.currentUid = this.uid = 0;
     this.current = {};
     var state = window.history.state;
     if (this._isStateObjectDefined(state)) {
      if (state.target.dest) {
       this.initialDestination = state.target.dest;
      } else {
       this.initialBookmark = state.target.hash;
      }
      this.currentUid = state.uid;
      this.uid = state.uid + 1;
      this.current = state.target;
     } else {
      if (state && state.fingerprint && this.fingerprint !== state.fingerprint) {
       this.reInitialized = true;
      }
      this._pushOrReplaceState({ fingerprint: this.fingerprint }, true);
     }
     var self = this;
     window.addEventListener('popstate', function pdfHistoryPopstate(evt) {
      if (!self.historyUnlocked) {
       return;
      }
      if (evt.state) {
       self._goTo(evt.state);
       return;
      }
      if (self.uid === 0) {
       var previousParams = self.previousHash && self.currentBookmark && self.previousHash !== self.currentBookmark ? {
        hash: self.currentBookmark,
        page: self.currentPage
       } : { page: 1 };
       replacePreviousHistoryState(previousParams, function () {
        updateHistoryWithCurrentHash();
       });
      } else {
       updateHistoryWithCurrentHash();
      }
     }, false);
     function updateHistoryWithCurrentHash() {
      self.previousHash = window.location.hash.slice(1);
      self._pushToHistory({ hash: self.previousHash }, false, true);
      self._updatePreviousBookmark();
     }
     function replacePreviousHistoryState(params, callback) {
      self.historyUnlocked = false;
      self.allowHashChange = false;
      window.addEventListener('popstate', rewriteHistoryAfterBack);
      history.back();
      function rewriteHistoryAfterBack() {
       window.removeEventListener('popstate', rewriteHistoryAfterBack);
       window.addEventListener('popstate', rewriteHistoryAfterForward);
       self._pushToHistory(params, false, true);
       history.forward();
      }
      function rewriteHistoryAfterForward() {
       window.removeEventListener('popstate', rewriteHistoryAfterForward);
       self.allowHashChange = true;
       self.historyUnlocked = true;
       callback();
      }
     }
     function pdfHistoryBeforeUnload() {
      var previousParams = self._getPreviousParams(null, true);
      if (previousParams) {
       var replacePrevious = !self.current.dest && self.current.hash !== self.previousHash;
       self._pushToHistory(previousParams, false, replacePrevious);
       self._updatePreviousBookmark();
      }
      window.removeEventListener('beforeunload', pdfHistoryBeforeUnload, false);
     }
     window.addEventListener('beforeunload', pdfHistoryBeforeUnload, false);
     window.addEventListener('pageshow', function pdfHistoryPageShow(evt) {
      window.addEventListener('beforeunload', pdfHistoryBeforeUnload, false);
     }, false);
     self.eventBus.on('presentationmodechanged', function (e) {
      self.isViewerInPresentationMode = e.active;
     });
    },
    clearHistoryState: function pdfHistory_clearHistoryState() {
     this._pushOrReplaceState(null, true);
    },
    _isStateObjectDefined: function pdfHistory_isStateObjectDefined(state) {
     return state && state.uid >= 0 && state.fingerprint && this.fingerprint === state.fingerprint && state.target && state.target.hash ? true : false;
    },
    _pushOrReplaceState: function pdfHistory_pushOrReplaceState(stateObj, replace) {
     if (replace) {
      window.history.replaceState(stateObj, '', document.URL);
     } else {
      window.history.pushState(stateObj, '', document.URL);
     }
    },
    get isHashChangeUnlocked() {
     if (!this.initialized) {
      return true;
     }
     return this.allowHashChange;
    },
    _updatePreviousBookmark: function pdfHistory_updatePreviousBookmark() {
     if (this.updatePreviousBookmark && this.currentBookmark && this.currentPage) {
      this.previousBookmark = this.currentBookmark;
      this.previousPage = this.currentPage;
      this.updatePreviousBookmark = false;
     }
    },
    updateCurrentBookmark: function pdfHistoryUpdateCurrentBookmark(bookmark, pageNum) {
     if (this.initialized) {
      this.currentBookmark = bookmark.substring(1);
      this.currentPage = pageNum | 0;
      this._updatePreviousBookmark();
     }
    },
    updateNextHashParam: function pdfHistoryUpdateNextHashParam(param) {
     if (this.initialized) {
      this.nextHashParam = param;
     }
    },
    push: function pdfHistoryPush(params, isInitialBookmark) {
     if (!(this.initialized && this.historyUnlocked)) {
      return;
     }
     if (params.dest && !params.hash) {
      params.hash = this.current.hash && this.current.dest && this.current.dest === params.dest ? this.current.hash : this.linkService.getDestinationHash(params.dest).split('#')[1];
     }
     if (params.page) {
      params.page |= 0;
     }
     if (isInitialBookmark) {
      var target = window.history.state.target;
      if (!target) {
       this._pushToHistory(params, false);
       this.previousHash = window.location.hash.substring(1);
      }
      this.updatePreviousBookmark = this.nextHashParam ? false : true;
      if (target) {
       this._updatePreviousBookmark();
      }
      return;
     }
     if (this.nextHashParam) {
      if (this.nextHashParam === params.hash) {
       this.nextHashParam = null;
       this.updatePreviousBookmark = true;
       return;
      } else {
       this.nextHashParam = null;
      }
     }
     if (params.hash) {
      if (this.current.hash) {
       if (this.current.hash !== params.hash) {
        this._pushToHistory(params, true);
       } else {
        if (!this.current.page && params.page) {
         this._pushToHistory(params, false, true);
        }
        this.updatePreviousBookmark = true;
       }
      } else {
       this._pushToHistory(params, true);
      }
     } else if (this.current.page && params.page && this.current.page !== params.page) {
      this._pushToHistory(params, true);
     }
    },
    _getPreviousParams: function pdfHistory_getPreviousParams(onlyCheckPage, beforeUnload) {
     if (!(this.currentBookmark && this.currentPage)) {
      return null;
     } else if (this.updatePreviousBookmark) {
      this.updatePreviousBookmark = false;
     }
     if (this.uid > 0 && !(this.previousBookmark && this.previousPage)) {
      return null;
     }
     if (!this.current.dest && !onlyCheckPage || beforeUnload) {
      if (this.previousBookmark === this.currentBookmark) {
       return null;
      }
     } else if (this.current.page || onlyCheckPage) {
      if (this.previousPage === this.currentPage) {
       return null;
      }
     } else {
      return null;
     }
     var params = {
      hash: this.currentBookmark,
      page: this.currentPage
     };
     if (this.isViewerInPresentationMode) {
      params.hash = null;
     }
     return params;
    },
    _stateObj: function pdfHistory_stateObj(params) {
     return {
      fingerprint: this.fingerprint,
      uid: this.uid,
      target: params
     };
    },
    _pushToHistory: function pdfHistory_pushToHistory(params, addPrevious, overwrite) {
     if (!this.initialized) {
      return;
     }
     if (!params.hash && params.page) {
      params.hash = 'page=' + params.page;
     }
     if (addPrevious && !overwrite) {
      var previousParams = this._getPreviousParams();
      if (previousParams) {
       var replacePrevious = !this.current.dest && this.current.hash !== this.previousHash;
       this._pushToHistory(previousParams, false, replacePrevious);
      }
     }
     this._pushOrReplaceState(this._stateObj(params), overwrite || this.uid === 0);
     this.currentUid = this.uid++;
     this.current = params;
     this.updatePreviousBookmark = true;
    },
    _goTo: function pdfHistory_goTo(state) {
     if (!(this.initialized && this.historyUnlocked && this._isStateObjectDefined(state))) {
      return;
     }
     if (!this.reInitialized && state.uid < this.currentUid) {
      var previousParams = this._getPreviousParams(true);
      if (previousParams) {
       this._pushToHistory(this.current, false);
       this._pushToHistory(previousParams, false);
       this.currentUid = state.uid;
       window.history.back();
       return;
      }
     }
     this.historyUnlocked = false;
     if (state.target.dest) {
      this.linkService.navigateTo(state.target.dest);
     } else {
      this.linkService.setHash(state.target.hash);
     }
     this.currentUid = state.uid;
     if (state.uid > this.uid) {
      this.uid = state.uid;
     }
     this.current = state.target;
     this.updatePreviousBookmark = true;
     var currentHash = window.location.hash.substring(1);
     if (this.previousHash !== currentHash) {
      this.allowHashChange = false;
     }
     this.previousHash = currentHash;
     this.historyUnlocked = true;
    },
    back: function pdfHistoryBack() {
     this.go(-1);
    },
    forward: function pdfHistoryForward() {
     this.go(1);
    },
    go: function pdfHistoryGo(direction) {
     if (this.initialized && this.historyUnlocked) {
      var state = window.history.state;
      if (direction === -1 && state && state.uid > 0) {
       window.history.back();
      } else if (direction === 1 && state && state.uid < this.uid - 1) {
       window.history.forward();
      }
     }
    }
   };
   exports.PDFHistory = PDFHistory;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebPDFLinkService = {}, root.pdfjsWebUIUtils, root.pdfjsWebDOMEvents);
  }(this, function (exports, uiUtils, domEvents) {
   var parseQueryString = uiUtils.parseQueryString;
   var PageNumberRegExp = /^\d+$/;
   function isPageNumber(str) {
    return PageNumberRegExp.test(str);
   }
   var PDFLinkService = function PDFLinkServiceClosure() {
    function PDFLinkService(options) {
     options = options || {};
     this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
     this.baseUrl = null;
     this.pdfDocument = null;
     this.pdfViewer = null;
     this.pdfHistory = null;
     this._pagesRefCache = null;
    }
    PDFLinkService.prototype = {
     setDocument: function PDFLinkService_setDocument(pdfDocument, baseUrl) {
      this.baseUrl = baseUrl;
      this.pdfDocument = pdfDocument;
      this._pagesRefCache = Object.create(null);
     },
     setViewer: function PDFLinkService_setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
     },
     setHistory: function PDFLinkService_setHistory(pdfHistory) {
      this.pdfHistory = pdfHistory;
     },
     get pagesCount() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
     },
     get page() {
      return this.pdfViewer.currentPageNumber;
     },
     set page(value) {
      this.pdfViewer.currentPageNumber = value;
     },
     navigateTo: function PDFLinkService_navigateTo(dest) {
      var destString = '';
      var self = this;
      var goToDestination = function (destRef) {
       var pageNumber;
       if (destRef instanceof Object) {
        pageNumber = self._cachedPageNumber(destRef);
       } else if ((destRef | 0) === destRef) {
        pageNumber = destRef + 1;
       } else {
        console.error('PDFLinkService_navigateTo: "' + destRef + '" is not a valid destination reference.');
        return;
       }
       if (pageNumber) {
        if (pageNumber < 1 || pageNumber > self.pagesCount) {
         console.error('PDFLinkService_navigateTo: "' + pageNumber + '" is a non-existent page number.');
         return;
        }
        self.pdfViewer.scrollPageIntoView({
         pageNumber: pageNumber,
         destArray: dest
        });
        if (self.pdfHistory) {
         self.pdfHistory.push({
          dest: dest,
          hash: destString,
          page: pageNumber
         });
        }
       } else {
        self.pdfDocument.getPageIndex(destRef).then(function (pageIndex) {
         self.cachePageRef(pageIndex + 1, destRef);
         goToDestination(destRef);
        }).catch(function () {
         console.error('PDFLinkService_navigateTo: "' + destRef + '" is not a valid page reference.');
         return;
        });
       }
      };
      var destinationPromise;
      if (typeof dest === 'string') {
       destString = dest;
       destinationPromise = this.pdfDocument.getDestination(dest);
      } else {
       destinationPromise = Promise.resolve(dest);
      }
      destinationPromise.then(function (destination) {
       dest = destination;
       if (!(destination instanceof Array)) {
        console.error('PDFLinkService_navigateTo: "' + destination + '" is not a valid destination array.');
        return;
       }
       goToDestination(destination[0]);
      });
     },
     getDestinationHash: function PDFLinkService_getDestinationHash(dest) {
      if (typeof dest === 'string') {
       return this.getAnchorUrl('#' + (isPageNumber(dest) ? 'nameddest=' : '') + escape(dest));
      }
      if (dest instanceof Array) {
       var str = JSON.stringify(dest);
       return this.getAnchorUrl('#' + escape(str));
      }
      return this.getAnchorUrl('');
     },
     getAnchorUrl: function PDFLinkService_getAnchorUrl(anchor) {
      return (this.baseUrl || '') + anchor;
     },
     setHash: function PDFLinkService_setHash(hash) {
      var pageNumber, dest;
      if (hash.indexOf('=') >= 0) {
       var params = parseQueryString(hash);
       if ('search' in params) {
        this.eventBus.dispatch('findfromurlhash', {
         source: this,
         query: params['search'].replace(/"/g, ''),
         phraseSearch: params['phrase'] === 'true'
        });
       }
       if ('nameddest' in params) {
        if (this.pdfHistory) {
         this.pdfHistory.updateNextHashParam(params.nameddest);
        }
        this.navigateTo(params.nameddest);
        return;
       }
       if ('page' in params) {
        pageNumber = params.page | 0 || 1;
       }
       if ('zoom' in params) {
        var zoomArgs = params.zoom.split(',');
        var zoomArg = zoomArgs[0];
        var zoomArgNumber = parseFloat(zoomArg);
        if (zoomArg.indexOf('Fit') === -1) {
         dest = [
          null,
          { name: 'XYZ' },
          zoomArgs.length > 1 ? zoomArgs[1] | 0 : null,
          zoomArgs.length > 2 ? zoomArgs[2] | 0 : null,
          zoomArgNumber ? zoomArgNumber / 100 : zoomArg
         ];
        } else {
         if (zoomArg === 'Fit' || zoomArg === 'FitB') {
          dest = [
           null,
           { name: zoomArg }
          ];
         } else if (zoomArg === 'FitH' || zoomArg === 'FitBH' || (zoomArg === 'FitV' || zoomArg === 'FitBV')) {
          dest = [
           null,
           { name: zoomArg },
           zoomArgs.length > 1 ? zoomArgs[1] | 0 : null
          ];
         } else if (zoomArg === 'FitR') {
          if (zoomArgs.length !== 5) {
           console.error('PDFLinkService_setHash: ' + 'Not enough parameters for \'FitR\'.');
          } else {
           dest = [
            null,
            { name: zoomArg },
            zoomArgs[1] | 0,
            zoomArgs[2] | 0,
            zoomArgs[3] | 0,
            zoomArgs[4] | 0
           ];
          }
         } else {
          console.error('PDFLinkService_setHash: \'' + zoomArg + '\' is not a valid zoom value.');
         }
        }
       }
       if (dest) {
        this.pdfViewer.scrollPageIntoView({
         pageNumber: pageNumber || this.page,
         destArray: dest,
         allowNegativeOffset: true
        });
       } else if (pageNumber) {
        this.page = pageNumber;
       }
       if ('pagemode' in params) {
        this.eventBus.dispatch('pagemode', {
         source: this,
         mode: params.pagemode
        });
       }
      } else {
       if (isPageNumber(hash) && hash <= this.pagesCount) {
        console.warn('PDFLinkService_setHash: specifying a page number ' + 'directly after the hash symbol (#) is deprecated, ' + 'please use the "#page=' + hash + '" form instead.');
        this.page = hash | 0;
       }
       dest = unescape(hash);
       try {
        dest = JSON.parse(dest);
        if (!(dest instanceof Array)) {
         dest = dest.toString();
        }
       } catch (ex) {
       }
       if (typeof dest === 'string' || isValidExplicitDestination(dest)) {
        if (this.pdfHistory) {
         this.pdfHistory.updateNextHashParam(dest);
        }
        this.navigateTo(dest);
        return;
       }
       console.error('PDFLinkService_setHash: \'' + unescape(hash) + '\' is not a valid destination.');
      }
     },
     executeNamedAction: function PDFLinkService_executeNamedAction(action) {
      switch (action) {
      case 'GoBack':
       if (this.pdfHistory) {
        this.pdfHistory.back();
       }
       break;
      case 'GoForward':
       if (this.pdfHistory) {
        this.pdfHistory.forward();
       }
       break;
      case 'NextPage':
       if (this.page < this.pagesCount) {
        this.page++;
       }
       break;
      case 'PrevPage':
       if (this.page > 1) {
        this.page--;
       }
       break;
      case 'LastPage':
       this.page = this.pagesCount;
       break;
      case 'FirstPage':
       this.page = 1;
       break;
      default:
       break;
      }
      this.eventBus.dispatch('namedaction', {
       source: this,
       action: action
      });
     },
     cachePageRef: function PDFLinkService_cachePageRef(pageNum, pageRef) {
      var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
      this._pagesRefCache[refStr] = pageNum;
     },
     _cachedPageNumber: function PDFLinkService_cachedPageNumber(pageRef) {
      var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
      return this._pagesRefCache && this._pagesRefCache[refStr] || null;
     }
    };
    function isValidExplicitDestination(dest) {
     if (!(dest instanceof Array)) {
      return false;
     }
     var destLength = dest.length, allowNull = true;
     if (destLength < 2) {
      return false;
     }
     var page = dest[0];
     if (!(typeof page === 'object' && typeof page.num === 'number' && (page.num | 0) === page.num && typeof page.gen === 'number' && (page.gen | 0) === page.gen) && !(typeof page === 'number' && (page | 0) === page && page >= 0)) {
      return false;
     }
     var zoom = dest[1];
     if (!(typeof zoom === 'object' && typeof zoom.name === 'string')) {
      return false;
     }
     switch (zoom.name) {
     case 'XYZ':
      if (destLength !== 5) {
       return false;
      }
      break;
     case 'Fit':
     case 'FitB':
      return destLength === 2;
     case 'FitH':
     case 'FitBH':
     case 'FitV':
     case 'FitBV':
      if (destLength !== 3) {
       return false;
      }
      break;
     case 'FitR':
      if (destLength !== 6) {
       return false;
      }
      allowNull = false;
      break;
     default:
      return false;
     }
     for (var i = 2; i < destLength; i++) {
      var param = dest[i];
      if (!(typeof param === 'number' || allowNull && param === null)) {
       return false;
      }
     }
     return true;
    }
    return PDFLinkService;
   }();
   var SimpleLinkService = function SimpleLinkServiceClosure() {
    function SimpleLinkService() {
    }
    SimpleLinkService.prototype = {
     get page() {
      return 0;
     },
     set page(value) {
     },
     navigateTo: function (dest) {
     },
     getDestinationHash: function (dest) {
      return '#';
     },
     getAnchorUrl: function (hash) {
      return '#';
     },
     setHash: function (hash) {
     },
     executeNamedAction: function (action) {
     },
     cachePageRef: function (pageNum, pageRef) {
     }
    };
    return SimpleLinkService;
   }();
   exports.PDFLinkService = PDFLinkService;
   exports.SimpleLinkService = SimpleLinkService;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebPDFPageView = {}, root.pdfjsWebUIUtils, root.pdfjsWebPDFRenderingQueue, root.pdfjsWebDOMEvents, root.pdfjsWebPDFJS);
  }(this, function (exports, uiUtils, pdfRenderingQueue, domEvents, pdfjsLib) {
   var CSS_UNITS = uiUtils.CSS_UNITS;
   var DEFAULT_SCALE = uiUtils.DEFAULT_SCALE;
   var getOutputScale = uiUtils.getOutputScale;
   var approximateFraction = uiUtils.approximateFraction;
   var roundToDivide = uiUtils.roundToDivide;
   var RendererType = uiUtils.RendererType;
   var RenderingStates = pdfRenderingQueue.RenderingStates;
   var TEXT_LAYER_RENDER_DELAY = 200;
   var PDFPageView = function PDFPageViewClosure() {
    function PDFPageView(options) {
     var container = options.container;
     var id = options.id;
     var scale = options.scale;
     var defaultViewport = options.defaultViewport;
     var renderingQueue = options.renderingQueue;
     var textLayerFactory = options.textLayerFactory;
     var annotationLayerFactory = options.annotationLayerFactory;
     var enhanceTextSelection = options.enhanceTextSelection || false;
     var renderInteractiveForms = options.renderInteractiveForms || false;
     this.id = id;
     this.renderingId = 'page' + id;
     this.pageLabel = null;
     this.rotation = 0;
     this.scale = scale || DEFAULT_SCALE;
     this.viewport = defaultViewport;
     this.pdfPageRotate = defaultViewport.rotation;
     this.hasRestrictedScaling = false;
     this.enhanceTextSelection = enhanceTextSelection;
     this.renderInteractiveForms = renderInteractiveForms;
     this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
     this.renderingQueue = renderingQueue;
     this.textLayerFactory = textLayerFactory;
     this.annotationLayerFactory = annotationLayerFactory;
     this.renderer = options.renderer || RendererType.CANVAS;
     this.paintTask = null;
     this.paintedViewport = null;
     this.renderingState = RenderingStates.INITIAL;
     this.resume = null;
     this.error = null;
     this.onBeforeDraw = null;
     this.onAfterDraw = null;
     this.textLayer = null;
     this.zoomLayer = null;
     this.annotationLayer = null;
     var div = document.createElement('div');
     div.id = 'pageContainer' + this.id;
     div.className = 'page';
     div.style.width = Math.floor(this.viewport.width) + 'px';
     div.style.height = Math.floor(this.viewport.height) + 'px';
     div.setAttribute('data-page-number', this.id);
     this.div = div;
     container.appendChild(div);
    }
    PDFPageView.prototype = {
     setPdfPage: function PDFPageView_setPdfPage(pdfPage) {
      this.pdfPage = pdfPage;
      this.pdfPageRotate = pdfPage.rotate;
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = pdfPage.getViewport(this.scale * CSS_UNITS, totalRotation);
      this.stats = pdfPage.stats;
      this.reset();
     },
     destroy: function PDFPageView_destroy() {
      this.zoomLayer = null;
      this.reset();
      if (this.pdfPage) {
       this.pdfPage.cleanup();
      }
     },
     reset: function PDFPageView_reset(keepZoomLayer, keepAnnotations) {
      this.cancelRendering();
      var div = this.div;
      div.style.width = Math.floor(this.viewport.width) + 'px';
      div.style.height = Math.floor(this.viewport.height) + 'px';
      var childNodes = div.childNodes;
      var currentZoomLayerNode = keepZoomLayer && this.zoomLayer || null;
      var currentAnnotationNode = keepAnnotations && this.annotationLayer && this.annotationLayer.div || null;
      for (var i = childNodes.length - 1; i >= 0; i--) {
       var node = childNodes[i];
       if (currentZoomLayerNode === node || currentAnnotationNode === node) {
        continue;
       }
       div.removeChild(node);
      }
      div.removeAttribute('data-loaded');
      if (currentAnnotationNode) {
       this.annotationLayer.hide();
      } else {
       this.annotationLayer = null;
      }
      if (this.canvas && !currentZoomLayerNode) {
       this.canvas.width = 0;
       this.canvas.height = 0;
       delete this.canvas;
      }
      if (this.svg) {
       delete this.svg;
      }
      if (!currentZoomLayerNode) {
       this.paintedViewport = null;
      }
      this.loadingIconDiv = document.createElement('div');
      this.loadingIconDiv.className = 'loadingIcon';
      div.appendChild(this.loadingIconDiv);
     },
     update: function PDFPageView_update(scale, rotation) {
      this.scale = scale || this.scale;
      if (typeof rotation !== 'undefined') {
       this.rotation = rotation;
      }
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = this.viewport.clone({
       scale: this.scale * CSS_UNITS,
       rotation: totalRotation
      });
      if (this.svg) {
       this.cssTransform(this.svg, true);
       this.eventBus.dispatch('pagerendered', {
        source: this,
        pageNumber: this.id,
        cssTransform: true
       });
       return;
      }
      var isScalingRestricted = false;
      if (this.canvas && pdfjsLib.PDFJS.maxCanvasPixels > 0) {
       var outputScale = this.outputScale;
       if ((Math.floor(this.viewport.width) * outputScale.sx | 0) * (Math.floor(this.viewport.height) * outputScale.sy | 0) > pdfjsLib.PDFJS.maxCanvasPixels) {
        isScalingRestricted = true;
       }
      }
      if (this.canvas) {
       if (pdfjsLib.PDFJS.useOnlyCssZoom || this.hasRestrictedScaling && isScalingRestricted) {
        this.cssTransform(this.canvas, true);
        this.eventBus.dispatch('pagerendered', {
         source: this,
         pageNumber: this.id,
         cssTransform: true
        });
        return;
       }
       if (!this.zoomLayer) {
        this.zoomLayer = this.canvas.parentNode;
        this.zoomLayer.style.position = 'absolute';
       }
      }
      if (this.zoomLayer) {
       this.cssTransform(this.zoomLayer.firstChild);
      }
      this.reset(true, true);
     },
     cancelRendering: function PDFPageView_cancelRendering() {
      if (this.paintTask) {
       this.paintTask.cancel();
       this.paintTask = null;
      }
      this.renderingState = RenderingStates.INITIAL;
      this.resume = null;
      if (this.textLayer) {
       this.textLayer.cancel();
       this.textLayer = null;
      }
     },
     updatePosition: function PDFPageView_updatePosition() {
      if (this.textLayer) {
       this.textLayer.render(TEXT_LAYER_RENDER_DELAY);
      }
     },
     cssTransform: function PDFPageView_transform(target, redrawAnnotations) {
      var CustomStyle = pdfjsLib.CustomStyle;
      var width = this.viewport.width;
      var height = this.viewport.height;
      var div = this.div;
      target.style.width = target.parentNode.style.width = div.style.width = Math.floor(width) + 'px';
      target.style.height = target.parentNode.style.height = div.style.height = Math.floor(height) + 'px';
      var relativeRotation = this.viewport.rotation - this.paintedViewport.rotation;
      var absRotation = Math.abs(relativeRotation);
      var scaleX = 1, scaleY = 1;
      if (absRotation === 90 || absRotation === 270) {
       scaleX = height / width;
       scaleY = width / height;
      }
      var cssTransform = 'rotate(' + relativeRotation + 'deg) ' + 'scale(' + scaleX + ',' + scaleY + ')';
      CustomStyle.setProp('transform', target, cssTransform);
      if (this.textLayer) {
       var textLayerViewport = this.textLayer.viewport;
       var textRelativeRotation = this.viewport.rotation - textLayerViewport.rotation;
       var textAbsRotation = Math.abs(textRelativeRotation);
       var scale = width / textLayerViewport.width;
       if (textAbsRotation === 90 || textAbsRotation === 270) {
        scale = width / textLayerViewport.height;
       }
       var textLayerDiv = this.textLayer.textLayerDiv;
       var transX, transY;
       switch (textAbsRotation) {
       case 0:
        transX = transY = 0;
        break;
       case 90:
        transX = 0;
        transY = '-' + textLayerDiv.style.height;
        break;
       case 180:
        transX = '-' + textLayerDiv.style.width;
        transY = '-' + textLayerDiv.style.height;
        break;
       case 270:
        transX = '-' + textLayerDiv.style.width;
        transY = 0;
        break;
       default:
        console.error('Bad rotation value.');
        break;
       }
       CustomStyle.setProp('transform', textLayerDiv, 'rotate(' + textAbsRotation + 'deg) ' + 'scale(' + scale + ', ' + scale + ') ' + 'translate(' + transX + ', ' + transY + ')');
       CustomStyle.setProp('transformOrigin', textLayerDiv, '0% 0%');
      }
      if (redrawAnnotations && this.annotationLayer) {
       this.annotationLayer.render(this.viewport, 'display');
      }
     },
     get width() {
      return this.viewport.width;
     },
     get height() {
      return this.viewport.height;
     },
     getPagePoint: function PDFPageView_getPagePoint(x, y) {
      return this.viewport.convertToPdfPoint(x, y);
     },
     draw: function PDFPageView_draw() {
      if (this.renderingState !== RenderingStates.INITIAL) {
       console.error('Must be in new state before drawing');
       this.reset();
      }
      this.renderingState = RenderingStates.RUNNING;
      var self = this;
      var pdfPage = this.pdfPage;
      var viewport = this.viewport;
      var div = this.div;
      var canvasWrapper = document.createElement('div');
      canvasWrapper.style.width = div.style.width;
      canvasWrapper.style.height = div.style.height;
      canvasWrapper.classList.add('canvasWrapper');
      if (this.annotationLayer && this.annotationLayer.div) {
       div.insertBefore(canvasWrapper, this.annotationLayer.div);
      } else {
       div.appendChild(canvasWrapper);
      }
      var textLayerDiv = null;
      var textLayer = null;
      if (this.textLayerFactory) {
       textLayerDiv = document.createElement('div');
       textLayerDiv.className = 'textLayer';
       textLayerDiv.style.width = canvasWrapper.style.width;
       textLayerDiv.style.height = canvasWrapper.style.height;
       if (this.annotationLayer && this.annotationLayer.div) {
        div.insertBefore(textLayerDiv, this.annotationLayer.div);
       } else {
        div.appendChild(textLayerDiv);
       }
       textLayer = this.textLayerFactory.createTextLayerBuilder(textLayerDiv, this.id - 1, this.viewport, this.enhanceTextSelection);
      }
      this.textLayer = textLayer;
      var renderContinueCallback = null;
      if (this.renderingQueue) {
       renderContinueCallback = function renderContinueCallback(cont) {
        if (!self.renderingQueue.isHighestPriority(self)) {
         self.renderingState = RenderingStates.PAUSED;
         self.resume = function resumeCallback() {
          self.renderingState = RenderingStates.RUNNING;
          cont();
         };
         return;
        }
        cont();
       };
      }
      var finishPaintTask = function finishPaintTask(error) {
       if (paintTask === self.paintTask) {
        self.paintTask = null;
       }
       if (error === 'cancelled') {
        self.error = null;
        return;
       }
       self.renderingState = RenderingStates.FINISHED;
       if (self.loadingIconDiv) {
        div.removeChild(self.loadingIconDiv);
        delete self.loadingIconDiv;
       }
       if (self.zoomLayer) {
        var zoomLayerCanvas = self.zoomLayer.firstChild;
        zoomLayerCanvas.width = 0;
        zoomLayerCanvas.height = 0;
        if (div.contains(self.zoomLayer)) {
         div.removeChild(self.zoomLayer);
        }
        self.zoomLayer = null;
       }
       self.error = error;
       self.stats = pdfPage.stats;
       if (self.onAfterDraw) {
        self.onAfterDraw();
       }
       self.eventBus.dispatch('pagerendered', {
        source: self,
        pageNumber: self.id,
        cssTransform: false
       });
      };
      var paintTask = this.renderer === RendererType.SVG ? this.paintOnSvg(canvasWrapper) : this.paintOnCanvas(canvasWrapper);
      paintTask.onRenderContinue = renderContinueCallback;
      this.paintTask = paintTask;
      var resultPromise = paintTask.promise.then(function () {
       finishPaintTask(null);
       if (textLayer) {
        pdfPage.getTextContent({ normalizeWhitespace: true }).then(function textContentResolved(textContent) {
         textLayer.setTextContent(textContent);
         textLayer.render(TEXT_LAYER_RENDER_DELAY);
        });
       }
      }, function (reason) {
       finishPaintTask(reason);
       throw reason;
      });
      if (this.annotationLayerFactory) {
       if (!this.annotationLayer) {
        this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(div, pdfPage, this.renderInteractiveForms);
       }
       this.annotationLayer.render(this.viewport, 'display');
      }
      div.setAttribute('data-loaded', true);
      if (this.onBeforeDraw) {
       this.onBeforeDraw();
      }
      return resultPromise;
     },
     paintOnCanvas: function (canvasWrapper) {
      var resolveRenderPromise, rejectRenderPromise;
      var promise = new Promise(function (resolve, reject) {
       resolveRenderPromise = resolve;
       rejectRenderPromise = reject;
      });
      var result = {
       promise: promise,
       onRenderContinue: function (cont) {
        cont();
       },
       cancel: function () {
        renderTask.cancel();
       }
      };
      var self = this;
      var pdfPage = this.pdfPage;
      var viewport = this.viewport;
      var canvas = document.createElement('canvas');
      canvas.id = 'page' + this.id;
      canvas.setAttribute('hidden', 'hidden');
      var isCanvasHidden = true;
      var showCanvas = function () {
       if (isCanvasHidden) {
        canvas.removeAttribute('hidden');
        isCanvasHidden = false;
       }
      };
      canvasWrapper.appendChild(canvas);
      this.canvas = canvas;
      canvas.mozOpaque = true;
      var ctx = canvas.getContext('2d', { alpha: false });
      var outputScale = getOutputScale(ctx);
      this.outputScale = outputScale;
      if (pdfjsLib.PDFJS.useOnlyCssZoom) {
       var actualSizeViewport = viewport.clone({ scale: CSS_UNITS });
       outputScale.sx *= actualSizeViewport.width / viewport.width;
       outputScale.sy *= actualSizeViewport.height / viewport.height;
       outputScale.scaled = true;
      }
      if (pdfjsLib.PDFJS.maxCanvasPixels > 0) {
       var pixelsInViewport = viewport.width * viewport.height;
       var maxScale = Math.sqrt(pdfjsLib.PDFJS.maxCanvasPixels / pixelsInViewport);
       if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
        outputScale.sx = maxScale;
        outputScale.sy = maxScale;
        outputScale.scaled = true;
        this.hasRestrictedScaling = true;
       } else {
        this.hasRestrictedScaling = false;
       }
      }
      var sfx = approximateFraction(outputScale.sx);
      var sfy = approximateFraction(outputScale.sy);
      canvas.width = roundToDivide(viewport.width * outputScale.sx, sfx[0]);
      canvas.height = roundToDivide(viewport.height * outputScale.sy, sfy[0]);
      canvas.style.width = roundToDivide(viewport.width, sfx[1]) + 'px';
      canvas.style.height = roundToDivide(viewport.height, sfy[1]) + 'px';
      this.paintedViewport = viewport;
      var transform = !outputScale.scaled ? null : [
       outputScale.sx,
       0,
       0,
       outputScale.sy,
       0,
       0
      ];
      var renderContext = {
       canvasContext: ctx,
       transform: transform,
       viewport: this.viewport,
       renderInteractiveForms: this.renderInteractiveForms
      };
      var renderTask = this.pdfPage.render(renderContext);
      renderTask.onContinue = function (cont) {
       showCanvas();
       if (result.onRenderContinue) {
        result.onRenderContinue(cont);
       } else {
        cont();
       }
      };
      renderTask.promise.then(function pdfPageRenderCallback() {
       showCanvas();
       resolveRenderPromise(undefined);
      }, function pdfPageRenderError(error) {
       showCanvas();
       rejectRenderPromise(error);
      });
      return result;
     },
     paintOnSvg: function PDFPageView_paintOnSvg(wrapper) {
      var cancelled = false;
      var ensureNotCancelled = function () {
       if (cancelled) {
        throw 'cancelled';
       }
      };
      var self = this;
      var pdfPage = this.pdfPage;
      var SVGGraphics = pdfjsLib.SVGGraphics;
      var actualSizeViewport = this.viewport.clone({ scale: CSS_UNITS });
      var promise = pdfPage.getOperatorList().then(function (opList) {
       ensureNotCancelled();
       var svgGfx = new SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
       return svgGfx.getSVG(opList, actualSizeViewport).then(function (svg) {
        ensureNotCancelled();
        self.svg = svg;
        self.paintedViewport = actualSizeViewport;
        svg.style.width = wrapper.style.width;
        svg.style.height = wrapper.style.height;
        self.renderingState = RenderingStates.FINISHED;
        wrapper.appendChild(svg);
       });
      });
      return {
       promise: promise,
       onRenderContinue: function (cont) {
        cont();
       },
       cancel: function () {
        cancelled = true;
       }
      };
     },
     setPageLabel: function PDFView_setPageLabel(label) {
      this.pageLabel = typeof label === 'string' ? label : null;
      if (this.pageLabel !== null) {
       this.div.setAttribute('data-page-label', this.pageLabel);
      } else {
       this.div.removeAttribute('data-page-label');
      }
     }
    };
    return PDFPageView;
   }();
   exports.PDFPageView = PDFPageView;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebTextLayerBuilder = {}, root.pdfjsWebDOMEvents, root.pdfjsWebPDFJS);
  }(this, function (exports, domEvents, pdfjsLib) {
   var EXPAND_DIVS_TIMEOUT = 300;
   var TextLayerBuilder = function TextLayerBuilderClosure() {
    function TextLayerBuilder(options) {
     this.textLayerDiv = options.textLayerDiv;
     this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
     this.textContent = null;
     this.renderingDone = false;
     this.pageIdx = options.pageIndex;
     this.pageNumber = this.pageIdx + 1;
     this.matches = [];
     this.viewport = options.viewport;
     this.textDivs = [];
     this.findController = options.findController || null;
     this.textLayerRenderTask = null;
     this.enhanceTextSelection = options.enhanceTextSelection;
     this._bindMouse();
    }
    TextLayerBuilder.prototype = {
     _finishRendering: function TextLayerBuilder_finishRendering() {
      this.renderingDone = true;
      if (!this.enhanceTextSelection) {
       var endOfContent = document.createElement('div');
       endOfContent.className = 'endOfContent';
       this.textLayerDiv.appendChild(endOfContent);
      }
      this.eventBus.dispatch('textlayerrendered', {
       source: this,
       pageNumber: this.pageNumber,
       numTextDivs: this.textDivs.length
      });
     },
     render: function TextLayerBuilder_render(timeout) {
      if (!this.textContent || this.renderingDone) {
       return;
      }
      this.cancel();
      this.textDivs = [];
      var textLayerFrag = document.createDocumentFragment();
      this.textLayerRenderTask = pdfjsLib.renderTextLayer({
       textContent: this.textContent,
       container: textLayerFrag,
       viewport: this.viewport,
       textDivs: this.textDivs,
       timeout: timeout,
       enhanceTextSelection: this.enhanceTextSelection
      });
      this.textLayerRenderTask.promise.then(function () {
       this.textLayerDiv.appendChild(textLayerFrag);
       this._finishRendering();
       this.updateMatches();
      }.bind(this), function (reason) {
      });
     },
     cancel: function TextLayerBuilder_cancel() {
      if (this.textLayerRenderTask) {
       this.textLayerRenderTask.cancel();
       this.textLayerRenderTask = null;
      }
     },
     setTextContent: function TextLayerBuilder_setTextContent(textContent) {
      this.cancel();
      this.textContent = textContent;
     },
     convertMatches: function TextLayerBuilder_convertMatches(matches, matchesLength) {
      var i = 0;
      var iIndex = 0;
      var bidiTexts = this.textContent.items;
      var end = bidiTexts.length - 1;
      var queryLen = this.findController === null ? 0 : this.findController.state.query.length;
      var ret = [];
      if (!matches) {
       return ret;
      }
      for (var m = 0, len = matches.length; m < len; m++) {
       var matchIdx = matches[m];
       while (i !== end && matchIdx >= iIndex + bidiTexts[i].str.length) {
        iIndex += bidiTexts[i].str.length;
        i++;
       }
       if (i === bidiTexts.length) {
        console.error('Could not find a matching mapping');
       }
       var match = {
        begin: {
         divIdx: i,
         offset: matchIdx - iIndex
        }
       };
       if (matchesLength) {
        matchIdx += matchesLength[m];
       } else {
        matchIdx += queryLen;
       }
       while (i !== end && matchIdx > iIndex + bidiTexts[i].str.length) {
        iIndex += bidiTexts[i].str.length;
        i++;
       }
       match.end = {
        divIdx: i,
        offset: matchIdx - iIndex
       };
       ret.push(match);
      }
      return ret;
     },
     renderMatches: function TextLayerBuilder_renderMatches(matches) {
      if (matches.length === 0) {
       return;
      }
      var bidiTexts = this.textContent.items;
      var textDivs = this.textDivs;
      var prevEnd = null;
      var pageIdx = this.pageIdx;
      var isSelectedPage = this.findController === null ? false : pageIdx === this.findController.selected.pageIdx;
      var selectedMatchIdx = this.findController === null ? -1 : this.findController.selected.matchIdx;
      var highlightAll = this.findController === null ? false : this.findController.state.highlightAll;
      var infinity = {
       divIdx: -1,
       offset: undefined
      };
      function beginText(begin, className) {
       var divIdx = begin.divIdx;
       textDivs[divIdx].textContent = '';
       appendTextToDiv(divIdx, 0, begin.offset, className);
      }
      function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
       var div = textDivs[divIdx];
       var content = bidiTexts[divIdx].str.substring(fromOffset, toOffset);
       var node = document.createTextNode(content);
       if (className) {
        var span = document.createElement('span');
        span.className = className;
        span.appendChild(node);
        div.appendChild(span);
        return;
       }
       div.appendChild(node);
      }
      var i0 = selectedMatchIdx, i1 = i0 + 1;
      if (highlightAll) {
       i0 = 0;
       i1 = matches.length;
      } else if (!isSelectedPage) {
       return;
      }
      for (var i = i0; i < i1; i++) {
       var match = matches[i];
       var begin = match.begin;
       var end = match.end;
       var isSelected = isSelectedPage && i === selectedMatchIdx;
       var highlightSuffix = isSelected ? ' selected' : '';
       if (this.findController) {
        this.findController.updateMatchPosition(pageIdx, i, textDivs, begin.divIdx);
       }
       if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
        if (prevEnd !== null) {
         appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
        }
        beginText(begin);
       } else {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
       }
       if (begin.divIdx === end.divIdx) {
        appendTextToDiv(begin.divIdx, begin.offset, end.offset, 'highlight' + highlightSuffix);
       } else {
        appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, 'highlight begin' + highlightSuffix);
        for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
         textDivs[n0].className = 'highlight middle' + highlightSuffix;
        }
        beginText(end, 'highlight end' + highlightSuffix);
       }
       prevEnd = end;
      }
      if (prevEnd) {
       appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
      }
     },
     updateMatches: function TextLayerBuilder_updateMatches() {
      if (!this.renderingDone) {
       return;
      }
      var matches = this.matches;
      var textDivs = this.textDivs;
      var bidiTexts = this.textContent.items;
      var clearedUntilDivIdx = -1;
      for (var i = 0, len = matches.length; i < len; i++) {
       var match = matches[i];
       var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
       for (var n = begin, end = match.end.divIdx; n <= end; n++) {
        var div = textDivs[n];
        div.textContent = bidiTexts[n].str;
        div.className = '';
       }
       clearedUntilDivIdx = match.end.divIdx + 1;
      }
      if (this.findController === null || !this.findController.active) {
       return;
      }
      var pageMatches, pageMatchesLength;
      if (this.findController !== null) {
       pageMatches = this.findController.pageMatches[this.pageIdx] || null;
       pageMatchesLength = this.findController.pageMatchesLength ? this.findController.pageMatchesLength[this.pageIdx] || null : null;
      }
      this.matches = this.convertMatches(pageMatches, pageMatchesLength);
      this.renderMatches(this.matches);
     },
     _bindMouse: function TextLayerBuilder_bindMouse() {
      var div = this.textLayerDiv;
      var self = this;
      var expandDivsTimer = null;
      div.addEventListener('mousedown', function (e) {
       if (self.enhanceTextSelection && self.textLayerRenderTask) {
        self.textLayerRenderTask.expandTextDivs(true);
        if (expandDivsTimer) {
         clearTimeout(expandDivsTimer);
         expandDivsTimer = null;
        }
        return;
       }
       var end = div.querySelector('.endOfContent');
       if (!end) {
        return;
       }
       var adjustTop = e.target !== div;
       adjustTop = adjustTop && window.getComputedStyle(end).getPropertyValue('-moz-user-select') !== 'none';
       if (adjustTop) {
        var divBounds = div.getBoundingClientRect();
        var r = Math.max(0, (e.pageY - divBounds.top) / divBounds.height);
        end.style.top = (r * 100).toFixed(2) + '%';
       }
       end.classList.add('active');
      });
      div.addEventListener('mouseup', function (e) {
       if (self.enhanceTextSelection && self.textLayerRenderTask) {
        expandDivsTimer = setTimeout(function () {
         if (self.textLayerRenderTask) {
          self.textLayerRenderTask.expandTextDivs(false);
         }
         expandDivsTimer = null;
        }, EXPAND_DIVS_TIMEOUT);
        return;
       }
       var end = div.querySelector('.endOfContent');
       if (!end) {
        return;
       }
       end.style.top = '';
       end.classList.remove('active');
      });
     }
    };
    return TextLayerBuilder;
   }();
   function DefaultTextLayerFactory() {
   }
   DefaultTextLayerFactory.prototype = {
    createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport, enhanceTextSelection) {
     return new TextLayerBuilder({
      textLayerDiv: textLayerDiv,
      pageIndex: pageIndex,
      viewport: viewport,
      enhanceTextSelection: enhanceTextSelection
     });
    }
   };
   exports.TextLayerBuilder = TextLayerBuilder;
   exports.DefaultTextLayerFactory = DefaultTextLayerFactory;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebAnnotationLayerBuilder = {}, root.pdfjsWebUIUtils, root.pdfjsWebPDFLinkService, root.pdfjsWebPDFJS);
  }(this, function (exports, uiUtils, pdfLinkService, pdfjsLib) {
   var mozL10n = uiUtils.mozL10n;
   var SimpleLinkService = pdfLinkService.SimpleLinkService;
   var AnnotationLayerBuilder = function AnnotationLayerBuilderClosure() {
    function AnnotationLayerBuilder(options) {
     this.pageDiv = options.pageDiv;
     this.pdfPage = options.pdfPage;
     this.renderInteractiveForms = options.renderInteractiveForms;
     this.linkService = options.linkService;
     this.downloadManager = options.downloadManager;
     this.div = null;
    }
    AnnotationLayerBuilder.prototype = {
     render: function AnnotationLayerBuilder_render(viewport, intent) {
      var self = this;
      var parameters = { intent: intent === undefined ? 'display' : intent };
      this.pdfPage.getAnnotations(parameters).then(function (annotations) {
       viewport = viewport.clone({ dontFlip: true });
       parameters = {
        viewport: viewport,
        div: self.div,
        annotations: annotations,
        page: self.pdfPage,
        renderInteractiveForms: self.renderInteractiveForms,
        linkService: self.linkService,
        downloadManager: self.downloadManager
       };
       if (self.div) {
        pdfjsLib.AnnotationLayer.update(parameters);
       } else {
        if (annotations.length === 0) {
         return;
        }
        self.div = document.createElement('div');
        self.div.className = 'annotationLayer';
        self.pageDiv.appendChild(self.div);
        parameters.div = self.div;
        pdfjsLib.AnnotationLayer.render(parameters);
        if (typeof mozL10n !== 'undefined') {
         mozL10n.translate(self.div);
        }
       }
      });
     },
     hide: function AnnotationLayerBuilder_hide() {
      if (!this.div) {
       return;
      }
      this.div.setAttribute('hidden', 'true');
     }
    };
    return AnnotationLayerBuilder;
   }();
   function DefaultAnnotationLayerFactory() {
   }
   DefaultAnnotationLayerFactory.prototype = {
    createAnnotationLayerBuilder: function (pageDiv, pdfPage, renderInteractiveForms) {
     return new AnnotationLayerBuilder({
      pageDiv: pageDiv,
      pdfPage: pdfPage,
      renderInteractiveForms: renderInteractiveForms,
      linkService: new SimpleLinkService()
     });
    }
   };
   exports.AnnotationLayerBuilder = AnnotationLayerBuilder;
   exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;
  }));
  (function (root, factory) {
   factory(root.pdfjsWebPDFViewer = {}, root.pdfjsWebUIUtils, root.pdfjsWebPDFPageView, root.pdfjsWebPDFRenderingQueue, root.pdfjsWebTextLayerBuilder, root.pdfjsWebAnnotationLayerBuilder, root.pdfjsWebPDFLinkService, root.pdfjsWebDOMEvents, root.pdfjsWebPDFJS);
  }(this, function (exports, uiUtils, pdfPageView, pdfRenderingQueue, textLayerBuilder, annotationLayerBuilder, pdfLinkService, domEvents, pdfjsLib) {
   var UNKNOWN_SCALE = uiUtils.UNKNOWN_SCALE;
   var SCROLLBAR_PADDING = uiUtils.SCROLLBAR_PADDING;
   var VERTICAL_PADDING = uiUtils.VERTICAL_PADDING;
   var MAX_AUTO_SCALE = uiUtils.MAX_AUTO_SCALE;
   var CSS_UNITS = uiUtils.CSS_UNITS;
   var DEFAULT_SCALE = uiUtils.DEFAULT_SCALE;
   var DEFAULT_SCALE_VALUE = uiUtils.DEFAULT_SCALE_VALUE;
   var RendererType = uiUtils.RendererType;
   var scrollIntoView = uiUtils.scrollIntoView;
   var watchScroll = uiUtils.watchScroll;
   var getVisibleElements = uiUtils.getVisibleElements;
   var PDFPageView = pdfPageView.PDFPageView;
   var RenderingStates = pdfRenderingQueue.RenderingStates;
   var PDFRenderingQueue = pdfRenderingQueue.PDFRenderingQueue;
   var TextLayerBuilder = textLayerBuilder.TextLayerBuilder;
   var AnnotationLayerBuilder = annotationLayerBuilder.AnnotationLayerBuilder;
   var SimpleLinkService = pdfLinkService.SimpleLinkService;
   var PresentationModeState = {
    UNKNOWN: 0,
    NORMAL: 1,
    CHANGING: 2,
    FULLSCREEN: 3
   };
   var DEFAULT_CACHE_SIZE = 10;
   var PDFViewer = function pdfViewer() {
    function PDFPageViewBuffer(size) {
     var data = [];
     this.push = function cachePush(view) {
      var i = data.indexOf(view);
      if (i >= 0) {
       data.splice(i, 1);
      }
      data.push(view);
      if (data.length > size) {
       data.shift().destroy();
      }
     };
     this.resize = function (newSize) {
      size = newSize;
      while (data.length > size) {
       data.shift().destroy();
      }
     };
    }
    function isSameScale(oldScale, newScale) {
     if (newScale === oldScale) {
      return true;
     }
     if (Math.abs(newScale - oldScale) < 1e-15) {
      return true;
     }
     return false;
    }
    function PDFViewer(options) {
     this.container = options.container;
     this.viewer = options.viewer || options.container.firstElementChild;
     this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
     this.linkService = options.linkService || new SimpleLinkService();
     this.downloadManager = options.downloadManager || null;
     this.removePageBorders = options.removePageBorders || false;
     this.enhanceTextSelection = options.enhanceTextSelection || false;
     this.renderInteractiveForms = options.renderInteractiveForms || false;
     this.renderer = options.renderer || RendererType.CANVAS;
     this.defaultRenderingQueue = !options.renderingQueue;
     if (this.defaultRenderingQueue) {
      this.renderingQueue = new PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
     } else {
      this.renderingQueue = options.renderingQueue;
     }
     this.scroll = watchScroll(this.container, this._scrollUpdate.bind(this));
     this.presentationModeState = PresentationModeState.UNKNOWN;
     this._resetView();
     if (this.removePageBorders) {
      this.viewer.classList.add('removePageBorders');
     }
    }
    PDFViewer.prototype = {
     get pagesCount() {
      return this._pages.length;
     },
     getPageView: function (index) {
      return this._pages[index];
     },
     get pageViewsReady() {
      return this._pageViewsReady;
     },
     get currentPageNumber() {
      return this._currentPageNumber;
     },
     set currentPageNumber(val) {
      if ((val | 0) !== val) {
       throw new Error('Invalid page number.');
      }
      if (!this.pdfDocument) {
       this._currentPageNumber = val;
       return;
      }
      this._setCurrentPageNumber(val, true);
     },
     _setCurrentPageNumber: function PDFViewer_setCurrentPageNumber(val, resetCurrentPageView) {
      if (this._currentPageNumber === val) {
       if (resetCurrentPageView) {
        this._resetCurrentPageView();
       }
       return;
      }
      if (!(0 < val && val <= this.pagesCount)) {
       console.error('PDFViewer_setCurrentPageNumber: "' + val + '" is out of bounds.');
       return;
      }
      var arg = {
       source: this,
       pageNumber: val,
       pageLabel: this._pageLabels && this._pageLabels[val - 1]
      };
      this._currentPageNumber = val;
      this.eventBus.dispatch('pagechanging', arg);
      this.eventBus.dispatch('pagechange', arg);
      if (resetCurrentPageView) {
       this._resetCurrentPageView();
      }
     },
     get currentPageLabel() {
      return this._pageLabels && this._pageLabels[this._currentPageNumber - 1];
     },
     set currentPageLabel(val) {
      var pageNumber = val | 0;
      if (this._pageLabels) {
       var i = this._pageLabels.indexOf(val);
       if (i >= 0) {
        pageNumber = i + 1;
       }
      }
      this.currentPageNumber = pageNumber;
     },
     get currentScale() {
      return this._currentScale !== UNKNOWN_SCALE ? this._currentScale : DEFAULT_SCALE;
     },
     set currentScale(val) {
      if (isNaN(val)) {
       throw new Error('Invalid numeric scale');
      }
      if (!this.pdfDocument) {
       this._currentScale = val;
       this._currentScaleValue = val !== UNKNOWN_SCALE ? val.toString() : null;
       return;
      }
      this._setScale(val, false);
     },
     get currentScaleValue() {
      return this._currentScaleValue;
     },
     set currentScaleValue(val) {
      if (!this.pdfDocument) {
       this._currentScale = isNaN(val) ? UNKNOWN_SCALE : val;
       this._currentScaleValue = val.toString();
       return;
      }
      this._setScale(val, false);
     },
     get pagesRotation() {
      return this._pagesRotation;
     },
     set pagesRotation(rotation) {
      if (!(typeof rotation === 'number' && rotation % 90 === 0)) {
       throw new Error('Invalid pages rotation angle.');
      }
      this._pagesRotation = rotation;
      if (!this.pdfDocument) {
       return;
      }
      for (var i = 0, l = this._pages.length; i < l; i++) {
       var pageView = this._pages[i];
       pageView.update(pageView.scale, rotation);
      }
      this._setScale(this._currentScaleValue, true);
      if (this.defaultRenderingQueue) {
       this.update();
      }
     },
     setDocument: function (pdfDocument) {
      if (this.pdfDocument) {
       this._cancelRendering();
       this._resetView();
      }
      this.pdfDocument = pdfDocument;
      if (!pdfDocument) {
       return;
      }
      var pagesCount = pdfDocument.numPages;
      var self = this;
      var resolvePagesPromise;
      var pagesPromise = new Promise(function (resolve) {
       resolvePagesPromise = resolve;
      });
      this.pagesPromise = pagesPromise;
      pagesPromise.then(function () {
       self._pageViewsReady = true;
       self.eventBus.dispatch('pagesloaded', {
        source: self,
        pagesCount: pagesCount
       });
      });
      var isOnePageRenderedResolved = false;
      var resolveOnePageRendered = null;
      var onePageRendered = new Promise(function (resolve) {
       resolveOnePageRendered = resolve;
      });
      this.onePageRendered = onePageRendered;
      var bindOnAfterAndBeforeDraw = function (pageView) {
       pageView.onBeforeDraw = function pdfViewLoadOnBeforeDraw() {
        self._buffer.push(this);
       };
       pageView.onAfterDraw = function pdfViewLoadOnAfterDraw() {
        if (!isOnePageRenderedResolved) {
         isOnePageRenderedResolved = true;
         resolveOnePageRendered();
        }
       };
      };
      var firstPagePromise = pdfDocument.getPage(1);
      this.firstPagePromise = firstPagePromise;
      return firstPagePromise.then(function (pdfPage) {
       var scale = this.currentScale;
       var viewport = pdfPage.getViewport(scale * CSS_UNITS);
       for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
        var textLayerFactory = null;
        if (!pdfjsLib.PDFJS.disableTextLayer) {
         textLayerFactory = this;
        }
        var pageView = new PDFPageView({
         container: this.viewer,
         eventBus: this.eventBus,
         id: pageNum,
         scale: scale,
         defaultViewport: viewport.clone(),
         renderingQueue: this.renderingQueue,
         textLayerFactory: textLayerFactory,
         annotationLayerFactory: this,
         enhanceTextSelection: this.enhanceTextSelection,
         renderInteractiveForms: this.renderInteractiveForms,
         renderer: this.renderer
        });
        bindOnAfterAndBeforeDraw(pageView);
        this._pages.push(pageView);
       }
       var linkService = this.linkService;
       onePageRendered.then(function () {
        if (!pdfjsLib.PDFJS.disableAutoFetch) {
         var getPagesLeft = pagesCount;
         for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          pdfDocument.getPage(pageNum).then(function (pageNum, pdfPage) {
           var pageView = self._pages[pageNum - 1];
           if (!pageView.pdfPage) {
            pageView.setPdfPage(pdfPage);
           }
           linkService.cachePageRef(pageNum, pdfPage.ref);
           getPagesLeft--;
           if (!getPagesLeft) {
            resolvePagesPromise();
           }
          }.bind(null, pageNum));
         }
        } else {
         resolvePagesPromise();
        }
       });
       self.eventBus.dispatch('pagesinit', { source: self });
       if (this.defaultRenderingQueue) {
        this.update();
       }
       if (this.findController) {
        this.findController.resolveFirstPage();
       }
      }.bind(this));
     },
     setPageLabels: function PDFViewer_setPageLabels(labels) {
      if (!this.pdfDocument) {
       return;
      }
      if (!labels) {
       this._pageLabels = null;
      } else if (!(labels instanceof Array && this.pdfDocument.numPages === labels.length)) {
       this._pageLabels = null;
       console.error('PDFViewer_setPageLabels: Invalid page labels.');
      } else {
       this._pageLabels = labels;
      }
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
       var pageView = this._pages[i];
       var label = this._pageLabels && this._pageLabels[i];
       pageView.setPageLabel(label);
      }
     },
     _resetView: function () {
      this._pages = [];
      this._currentPageNumber = 1;
      this._currentScale = UNKNOWN_SCALE;
      this._currentScaleValue = null;
      this._pageLabels = null;
      this._buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
      this._location = null;
      this._pagesRotation = 0;
      this._pagesRequests = [];
      this._pageViewsReady = false;
      this.viewer.textContent = '';
     },
     _scrollUpdate: function PDFViewer_scrollUpdate() {
      if (this.pagesCount === 0) {
       return;
      }
      this.update();
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
       this._pages[i].updatePosition();
      }
     },
     _setScaleDispatchEvent: function pdfViewer_setScaleDispatchEvent(newScale, newValue, preset) {
      var arg = {
       source: this,
       scale: newScale,
       presetValue: preset ? newValue : undefined
      };
      this.eventBus.dispatch('scalechanging', arg);
      this.eventBus.dispatch('scalechange', arg);
     },
     _setScaleUpdatePages: function pdfViewer_setScaleUpdatePages(newScale, newValue, noScroll, preset) {
      this._currentScaleValue = newValue.toString();
      if (isSameScale(this._currentScale, newScale)) {
       if (preset) {
        this._setScaleDispatchEvent(newScale, newValue, true);
       }
       return;
      }
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
       this._pages[i].update(newScale);
      }
      this._currentScale = newScale;
      if (!noScroll) {
       var page = this._currentPageNumber, dest;
       if (this._location && !pdfjsLib.PDFJS.ignoreCurrentPositionOnZoom && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
        page = this._location.pageNumber;
        dest = [
         null,
         { name: 'XYZ' },
         this._location.left,
         this._location.top,
         null
        ];
       }
       this.scrollPageIntoView({
        pageNumber: page,
        destArray: dest,
        allowNegativeOffset: true
       });
      }
      this._setScaleDispatchEvent(newScale, newValue, preset);
      if (this.defaultRenderingQueue) {
       this.update();
      }
     },
     _setScale: function PDFViewer_setScale(value, noScroll) {
      var scale = parseFloat(value);
      if (scale > 0) {
       this._setScaleUpdatePages(scale, value, noScroll, false);
      } else {
       var currentPage = this._pages[this._currentPageNumber - 1];
       if (!currentPage) {
        return;
       }
       var hPadding = this.isInPresentationMode || this.removePageBorders ? 0 : SCROLLBAR_PADDING;
       var vPadding = this.isInPresentationMode || this.removePageBorders ? 0 : VERTICAL_PADDING;
       var pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale;
       var pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;
       switch (value) {
       case 'page-actual':
        scale = 1;
        break;
       case 'page-width':
        scale = pageWidthScale;
        break;
       case 'page-height':
        scale = pageHeightScale;
        break;
       case 'page-fit':
        scale = Math.min(pageWidthScale, pageHeightScale);
        break;
       case 'auto':
        var isLandscape = currentPage.width > currentPage.height;
        var horizontalScale = isLandscape ? Math.min(pageHeightScale, pageWidthScale) : pageWidthScale;
        scale = Math.min(MAX_AUTO_SCALE, horizontalScale);
        break;
       default:
        console.error('PDFViewer_setScale: "' + value + '" is an unknown zoom value.');
        return;
       }
       this._setScaleUpdatePages(scale, value, noScroll, true);
      }
     },
     _resetCurrentPageView: function () {
      if (this.isInPresentationMode) {
       this._setScale(this._currentScaleValue, true);
      }
      var pageView = this._pages[this._currentPageNumber - 1];
      scrollIntoView(pageView.div);
     },
     scrollPageIntoView: function PDFViewer_scrollPageIntoView(params) {
      if (!this.pdfDocument) {
       return;
      }
      if (arguments.length > 1 || typeof params === 'number') {
       console.warn('Call of scrollPageIntoView() with obsolete signature.');
       var paramObj = {};
       if (typeof params === 'number') {
        paramObj.pageNumber = params;
       }
       if (arguments[1] instanceof Array) {
        paramObj.destArray = arguments[1];
       }
       params = paramObj;
      }
      var pageNumber = params.pageNumber || 0;
      var dest = params.destArray || null;
      var allowNegativeOffset = params.allowNegativeOffset || false;
      if (this.isInPresentationMode || !dest) {
       this._setCurrentPageNumber(pageNumber, true);
       return;
      }
      var pageView = this._pages[pageNumber - 1];
      if (!pageView) {
       console.error('PDFViewer_scrollPageIntoView: ' + 'Invalid "pageNumber" parameter.');
       return;
      }
      var x = 0, y = 0;
      var width = 0, height = 0, widthScale, heightScale;
      var changeOrientation = pageView.rotation % 180 === 0 ? false : true;
      var pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / CSS_UNITS;
      var pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / CSS_UNITS;
      var scale = 0;
      switch (dest[1].name) {
      case 'XYZ':
       x = dest[2];
       y = dest[3];
       scale = dest[4];
       x = x !== null ? x : 0;
       y = y !== null ? y : pageHeight;
       break;
      case 'Fit':
      case 'FitB':
       scale = 'page-fit';
       break;
      case 'FitH':
      case 'FitBH':
       y = dest[2];
       scale = 'page-width';
       if (y === null && this._location) {
        x = this._location.left;
        y = this._location.top;
       }
       break;
      case 'FitV':
      case 'FitBV':
       x = dest[2];
       width = pageWidth;
       height = pageHeight;
       scale = 'page-height';
       break;
      case 'FitR':
       x = dest[2];
       y = dest[3];
       width = dest[4] - x;
       height = dest[5] - y;
       var hPadding = this.removePageBorders ? 0 : SCROLLBAR_PADDING;
       var vPadding = this.removePageBorders ? 0 : VERTICAL_PADDING;
       widthScale = (this.container.clientWidth - hPadding) / width / CSS_UNITS;
       heightScale = (this.container.clientHeight - vPadding) / height / CSS_UNITS;
       scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
       break;
      default:
       console.error('PDFViewer_scrollPageIntoView: \'' + dest[1].name + '\' is not a valid destination type.');
       return;
      }
      if (scale && scale !== this._currentScale) {
       this.currentScaleValue = scale;
      } else if (this._currentScale === UNKNOWN_SCALE) {
       this.currentScaleValue = DEFAULT_SCALE_VALUE;
      }
      if (scale === 'page-fit' && !dest[4]) {
       scrollIntoView(pageView.div);
       return;
      }
      var boundingRect = [
       pageView.viewport.convertToViewportPoint(x, y),
       pageView.viewport.convertToViewportPoint(x + width, y + height)
      ];
      var left = Math.min(boundingRect[0][0], boundingRect[1][0]);
      var top = Math.min(boundingRect[0][1], boundingRect[1][1]);
      if (!allowNegativeOffset) {
       left = Math.max(left, 0);
       top = Math.max(top, 0);
      }
      scrollIntoView(pageView.div, {
       left: left,
       top: top
      });
     },
     _updateLocation: function (firstPage) {
      var currentScale = this._currentScale;
      var currentScaleValue = this._currentScaleValue;
      var normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
      var pageNumber = firstPage.id;
      var pdfOpenParams = '#page=' + pageNumber;
      pdfOpenParams += '&zoom=' + normalizedScaleValue;
      var currentPageView = this._pages[pageNumber - 1];
      var container = this.container;
      var topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
      var intLeft = Math.round(topLeft[0]);
      var intTop = Math.round(topLeft[1]);
      pdfOpenParams += ',' + intLeft + ',' + intTop;
      this._location = {
       pageNumber: pageNumber,
       scale: normalizedScaleValue,
       top: intTop,
       left: intLeft,
       pdfOpenParams: pdfOpenParams
      };
     },
     update: function PDFViewer_update() {
      var visible = this._getVisiblePages();
      var visiblePages = visible.views;
      if (visiblePages.length === 0) {
       return;
      }
      var suggestedCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * visiblePages.length + 1);
      this._buffer.resize(suggestedCacheSize);
      this.renderingQueue.renderHighestPriority(visible);
      var currentId = this._currentPageNumber;
      var firstPage = visible.first;
      for (var i = 0, ii = visiblePages.length, stillFullyVisible = false; i < ii; ++i) {
       var page = visiblePages[i];
       if (page.percent < 100) {
        break;
       }
       if (page.id === currentId) {
        stillFullyVisible = true;
        break;
       }
      }
      if (!stillFullyVisible) {
       currentId = visiblePages[0].id;
      }
      if (!this.isInPresentationMode) {
       this._setCurrentPageNumber(currentId);
      }
      this._updateLocation(firstPage);
      this.eventBus.dispatch('updateviewarea', {
       source: this,
       location: this._location
      });
     },
     containsElement: function (element) {
      return this.container.contains(element);
     },
     focus: function () {
      this.container.focus();
     },
     get isInPresentationMode() {
      return this.presentationModeState === PresentationModeState.FULLSCREEN;
     },
     get isChangingPresentationMode() {
      return this.presentationModeState === PresentationModeState.CHANGING;
     },
     get isHorizontalScrollbarEnabled() {
      return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
     },
     _getVisiblePages: function () {
      if (!this.isInPresentationMode) {
       return getVisibleElements(this.container, this._pages, true);
      } else {
       var visible = [];
       var currentPage = this._pages[this._currentPageNumber - 1];
       visible.push({
        id: currentPage.id,
        view: currentPage
       });
       return {
        first: currentPage,
        last: currentPage,
        views: visible
       };
      }
     },
     cleanup: function () {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
       if (this._pages[i] && this._pages[i].renderingState !== RenderingStates.FINISHED) {
        this._pages[i].reset();
       }
      }
     },
     _cancelRendering: function PDFViewer_cancelRendering() {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
       if (this._pages[i]) {
        this._pages[i].cancelRendering();
       }
      }
     },
     _ensurePdfPageLoaded: function (pageView) {
      if (pageView.pdfPage) {
       return Promise.resolve(pageView.pdfPage);
      }
      var pageNumber = pageView.id;
      if (this._pagesRequests[pageNumber]) {
       return this._pagesRequests[pageNumber];
      }
      var promise = this.pdfDocument.getPage(pageNumber).then(function (pdfPage) {
       pageView.setPdfPage(pdfPage);
       this._pagesRequests[pageNumber] = null;
       return pdfPage;
      }.bind(this));
      this._pagesRequests[pageNumber] = promise;
      return promise;
     },
     forceRendering: function (currentlyVisiblePages) {
      var visiblePages = currentlyVisiblePages || this._getVisiblePages();
      var pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, this.scroll.down);
      if (pageView) {
       this._ensurePdfPageLoaded(pageView).then(function () {
        this.renderingQueue.renderView(pageView);
       }.bind(this));
       return true;
      }
      return false;
     },
     getPageTextContent: function (pageIndex) {
      return this.pdfDocument.getPage(pageIndex + 1).then(function (page) {
       return page.getTextContent({ normalizeWhitespace: true });
      });
     },
     createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport, enhanceTextSelection) {
      return new TextLayerBuilder({
       textLayerDiv: textLayerDiv,
       eventBus: this.eventBus,
       pageIndex: pageIndex,
       viewport: viewport,
       findController: this.isInPresentationMode ? null : this.findController,
       enhanceTextSelection: this.isInPresentationMode ? false : enhanceTextSelection
      });
     },
     createAnnotationLayerBuilder: function (pageDiv, pdfPage, renderInteractiveForms) {
      return new AnnotationLayerBuilder({
       pageDiv: pageDiv,
       pdfPage: pdfPage,
       renderInteractiveForms: renderInteractiveForms,
       linkService: this.linkService,
       downloadManager: this.downloadManager
      });
     },
     setFindController: function (findController) {
      this.findController = findController;
     },
     getPagesOverview: function () {
      return this._pages.map(function (pageView) {
       var viewport = pageView.pdfPage.getViewport(1);
       return {
        width: viewport.width,
        height: viewport.height
       };
      });
     }
    };
    return PDFViewer;
   }();
   exports.PresentationModeState = PresentationModeState;
   exports.PDFViewer = PDFViewer;
  }));
 }.call(pdfViewerLibs));
 var PDFJS = pdfjsLib.PDFJS;
 PDFJS.PDFViewer = pdfViewerLibs.pdfjsWebPDFViewer.PDFViewer;
 PDFJS.PDFPageView = pdfViewerLibs.pdfjsWebPDFPageView.PDFPageView;
 PDFJS.PDFLinkService = pdfViewerLibs.pdfjsWebPDFLinkService.PDFLinkService;
 PDFJS.TextLayerBuilder = pdfViewerLibs.pdfjsWebTextLayerBuilder.TextLayerBuilder;
 PDFJS.DefaultTextLayerFactory = pdfViewerLibs.pdfjsWebTextLayerBuilder.DefaultTextLayerFactory;
 PDFJS.AnnotationLayerBuilder = pdfViewerLibs.pdfjsWebAnnotationLayerBuilder.AnnotationLayerBuilder;
 PDFJS.DefaultAnnotationLayerFactory = pdfViewerLibs.pdfjsWebAnnotationLayerBuilder.DefaultAnnotationLayerFactory;
 PDFJS.PDFHistory = pdfViewerLibs.pdfjsWebPDFHistory.PDFHistory;
 PDFJS.PDFFindController = pdfViewerLibs.pdfjsWebPDFFindController.PDFFindController;
 PDFJS.EventBus = pdfViewerLibs.pdfjsWebUIUtils.EventBus;
 PDFJS.DownloadManager = pdfViewerLibs.pdfjsWebDownloadManager.DownloadManager;
 PDFJS.ProgressBar = pdfViewerLibs.pdfjsWebUIUtils.ProgressBar;
 exports.PDFJS = PDFJS;
}));