// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

;(function (factory) {
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  var root = (objectTypes[typeof window] && window) || this,
    freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
    freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
    moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
    freeGlobal = objectTypes[typeof global] && global;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  // Because of build optimizers
  if (typeof define === 'function' && define.amd) {
    define(['rx', 'exports'], function (Rx, exports) {
      root.Rx = factory(root, exports, Rx);
      return root.Rx;
    });
  } else if (typeof module === 'object' && module && module.exports === freeExports) {
    module.exports = factory(root, module.exports, require('rx'));
  } else {
    root.Rx = factory(root, {}, root.Rx);
  }
}.call(this, function (root, exp, Rx, undefined) {

  var Observable = Rx.Observable,
    observableProto = Observable.prototype,
    AnonymousObservable = Rx.AnonymousObservable,
    observerCreate = Rx.Observer.create,
    disposableCreate = Rx.Disposable.create,
    CompositeDisposable = Rx.CompositeDisposable,
    SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
    AsyncSubject = Rx.AsyncSubject,
    Subject = Rx.Subject,
    Scheduler = Rx.Scheduler,
    defaultNow = (function () { return !!Date.now ? Date.now : function () { return +new Date; }; }()),
    dom = Rx.DOM = {},
    hasOwnProperty = {}.hasOwnProperty,
    noop = Rx.helpers.noop,
    isFunction = Rx.helpers.isFunction;

  function createListener (element, name, handler, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(name, handler, useCapture);
      return disposableCreate(function () {
        element.removeEventListener(name, handler, useCapture);
      });
    }
    throw new Error('No listener found');
  }

  function createEventListener (el, eventName, handler, useCapture) {
    var disposables = new CompositeDisposable();

    // Asume NodeList or HTMLCollection
    var toStr = Object.prototype.toString;
    if (toStr.call(el) === '[object NodeList]' || toStr.call(el) === '[object HTMLCollection]') {
      for (var i = 0, len = el.length; i < len; i++) {
        disposables.add(createEventListener(el.item(i), eventName, handler, useCapture));
      }
    } else if (el) {
      disposables.add(createListener(el, eventName, handler, useCapture));
    }
    return disposables;
  }

  /**
   * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
   * @param {Object} element The DOMElement or NodeList to attach a listener.
   * @param {String} eventName The event name to attach the observable sequence.
   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
   * @param {Boolean} [useCapture] If true, useCapture indicates that the user wishes to initiate capture. After initiating capture, all events of the specified type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. Events which are bubbling upward through the tree will not trigger a listener designated to use capture
   * @returns {Observable} An observable sequence of events from the specified element and the specified event.
   */
  var fromEvent = dom.fromEvent = function (element, eventName, selector, useCapture) {
    var selectorFn = isFunction(selector) ? selector : null;
    typeof selector === 'boolean' && (useCapture = selector);
    typeof useCapture === 'undefined' && (useCapture = false);
    return new AnonymousObservable(function (observer) {
      return createEventListener(
        element,
        eventName,
        function handler () {
          var results = arguments[0];

          if (selectorFn) {
            var results = tryCatch(selectorFn).apply(null, arguments);
            if (results === errorObj) { return observer.onError(results.e); }
          }

          observer.onNext(results);
        },
        useCapture);
    }).publish().refCount();
  };

  (function () {
    var events = "blur focus focusin focusout load resize scroll unload click dblclick " +
      "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
      "change select submit keydown keypress keyup error contextmenu";

    if (root.PointerEvent) {
      events += " pointerdown pointerup pointermove pointerover pointerout pointerenter pointerleave";
    }

    if (root.TouchEvent) {
      events += " touchstart touchend touchmove touchcancel";
    }

    events = events.split(' ');

    for(var i = 0, len = events.length; i < len; i++) {
      (function (e) {
        dom[e] = function (element, selector, useCapture) {
          return fromEvent(element, e, selector, useCapture);
        };
      }(events[i]))
    }
  }());

  /**
   * Creates an observable sequence when the DOM is loaded
   * @returns {Observable} An observable sequence fired when the DOM is loaded
   */
  dom.ready = function () {
    return new AnonymousObservable(function (observer) {
      var addedHandlers = false;

      function handler () {
        observer.onNext();
        observer.onCompleted();
      }

      if (document.readyState === 'complete') {
        setTimeout(handler, 0);
      } else {
        addedHandlers = true;
        document.addEventListener( 'DOMContentLoaded', handler, false );
        root.addEventListener( 'load', handler, false );
      }

      return function () {
        if (!addedHandlers) { return; }
        document.removeEventListener( 'DOMContentLoaded', handler, false );
        root.removeEventListener( 'load', handler, false );
      };
    });
  };


  // Gets the proper XMLHttpRequest for support for older IE
  function getXMLHttpRequest() {
    if (root.XMLHttpRequest) {
      return new root.XMLHttpRequest();
    } else {
      var progId;
      try {
        var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
        for(var i = 0; i < 3; i++) {
          try {
            progId = progIds[i];
            if (new root.ActiveXObject(progId)) {
              break;
            }
          } catch(e) { }
        }
        return new root.ActiveXObject(progId);
      } catch (e) {
        throw new Error('XMLHttpRequest is not supported by your browser');
      }
    }
  }

  // Get CORS support even for older IE
  function getCORSRequest() {
    var xhr = new root.XMLHttpRequest();
    if ('withCredentials' in xhr) {
      return xhr;
    } else if (!!root.XDomainRequest) {
      return new XDomainRequest();
    } else {
      throw new Error('CORS is not supported by your browser');
    }
  }

function normalizeAjaxLoadEvent(e, xhr, settings) {
    var response = ('response' in xhr) ? xhr.response : xhr.responseText;
    response = settings.responseType === 'json' ? JSON.parse(response) : response;
    return {
      response: response,
      status: xhr.status,
      responseType: xhr.responseType,
      xhr: xhr,
      originalEvent: e
    };
  }

  function normalizeAjaxErrorEvent(e, xhr, type) {
    return {
      type: type,
      status: xhr.status,
      xhr: xhr,
      originalEvent: e
    };
  }

  /**
   * Creates an observable for an Ajax request with either a settings object with url, headers, etc or a string for a URL.
   *
   * @example
   *   source = Rx.DOM.ajax('/products');
   *   source = Rx.DOM.ajax( url: 'products', method: 'GET' });
   *
   * @param {Object} settings Can be one of the following:
   *
   *  A string of the URL to make the Ajax call.
   *  An object with the following properties
   *   - url: URL of the request
   *   - body: The body of the request
   *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
   *   - async: Whether the request is async
   *   - headers: Optional headers
   *   - crossDomain: true if a cross domain request, else false
   *
   * @returns {Observable} An observable sequence containing the XMLHttpRequest.
  */
  var ajaxRequest = dom.ajax = function (options) {
    var settings = {
      method: 'GET',
      crossDomain: false,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async: true,
      headers: {},
      responseType: 'text'
    };

    if(typeof options === 'string') {
      settings.url = options;
    } else {
      for(var prop in options) {
        if(hasOwnProperty.call(options, prop)) {
          settings[prop] = options[prop];
        }
      }
    }

    if (!settings.crossDomain && !settings.headers['X-Requested-With']) {
      settings.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
    settings.hasContent = settings.body !== undefined;

    return new AnonymousObservable(function (observer) {
      var isDone = false;

      try {
        var xhr = settings.crossDomain ? getCORSRequest() : getXMLHttpRequest();
      } catch (err) {
        observer.onError(err);
      }

      try {
        if (settings.user) {
          xhr.open(settings.method, settings.url, settings.async, settings.user, settings.password);
        } else {
          xhr.open(settings.method, settings.url, settings.async);
        }

        var headers = settings.headers;
        for (var header in headers) {
          if (hasOwnProperty.call(headers, header)) {
            xhr.setRequestHeader(header, headers[header]);
          }
        }

        if(!!xhr.upload || (!('withCredentials' in xhr) && !!root.XDomainRequest)) {
          xhr.onload = function(e) {
            if(settings.progressObserver) {
              settings.progressObserver.onNext(e);
              settings.progressObserver.onCompleted();
            }
            observer.onNext(normalizeAjaxLoadEvent(e, xhr, settings));
            observer.onCompleted();
            isDone = true;
          };

          if(settings.progressObserver) {
            xhr.onprogress = function(e) {
              settings.progressObserver.onNext(e);
            };
          }

          xhr.onerror = function(e) {
            settings.progressObserver && settings.progressObserver.onError(e);
            observer.onError(normalizeAjaxErrorEvent(e, xhr, 'error'));
            isDone = true;
          };

          xhr.onabort = function(e) {
            settings.progressObserver && settings.progressObserver.onError(e);
            observer.onError(normalizeAjaxErrorEvent(e, xhr, 'abort'));
            isDone = true;
          };
        } else {

          xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
              var status = xhr.status == 1223 ? 204 : xhr.status;
              if ((status >= 200 && status <= 300) || status === 0 || status === '') {
                observer.onNext(normalizeAjaxLoadEvent(e, xhr, settings));
                observer.onCompleted();
              } else {
                observer.onError(normalizeAjaxErrorEvent(e, xhr, 'error'));
              }
              isDone = true;
            }
          };
        }

        xhr.send(settings.hasContent && settings.body || null);
      } catch (e) {
        observer.onError(e);
      }

      return function () {
        if (!isDone && xhr.readyState !== 4) { xhr.abort(); }
      };
    });
  };

  /**
   * Creates an observable sequence from an Ajax POST Request with the body.
   *
   * @param {String} url The URL to POST
   * @param {Object} body The body to POST
   * @returns {Observable} The observable sequence which contains the response from the Ajax POST.
   */
  dom.post = function (url, body) {
    return ajaxRequest({ url: url, body: body, method: 'POST' });
  };

  /**
   * Creates an observable sequence from an Ajax GET Request with the body.
   *
   * @param {String} url The URL to GET
   * @returns {Observable} The observable sequence which contains the response from the Ajax GET.
   */
  var observableGet = dom.get = function (url) {
    return ajaxRequest({ url: url });
  };

  /**
   * Creates an observable sequence from JSON from an Ajax request
   *
   * @param {String} url The URL to GET
   * @returns {Observable} The observable sequence which contains the parsed JSON.
   */
  dom.getJSON = function (url) {
    if (!root.JSON && typeof root.JSON.parse !== 'function') { throw new TypeError('JSON is not supported in your runtime.'); }
    return ajaxRequest({url: url, responseType: 'json'}).map(function (x) {
      return x.response;
    });
  };

  /** @private
   * Destroys the current element
   */
  var destroy = (function () {
    var trash = document.createElement('div');
    return function (element) {
      trash.appendChild(element);
      trash.innerHTML = '';
    };
  })();

  /**
   * Creates an observable JSONP Request with the specified settings.
   * @param {Object} settings Can be one of the following:
   *
   *  A string of the URL to make the JSONP call with the JSONPCallback=? in the url.
   *  An object with the following properties
   *   - url: URL of the request
   *   - jsonp: The named callback parameter for the JSONP call
   *   - jsonpCallback: Callback to execute. For when the JSONP callback can't be changed
   *
   * @returns {Observable} A cold observable containing the results from the JSONP call.
   */
   dom.jsonpRequest = (function() {
     var id = 0;

     return function(options) {
       return new AnonymousObservable(function(observer) {

         var callbackId = 'callback_' + (id++).toString(36);

         var settings = {
           jsonp: 'JSONPCallback',
           async: true,
           jsonpCallback: 'rxjsjsonpCallbacks' + callbackId
         };

         if(typeof options === 'string') {
           settings.url = options;
         } else {
           for(var prop in options) {
             if(hasOwnProperty.call(options, prop)) {
               settings[prop] = options[prop];
             }
           }
         }

         var script = document.createElement('script');
         script.type = 'text/javascript';
         script.async = settings.async;
         script.src = settings.url.replace(settings.jsonp, settings.jsonpCallback);

         root[settings.jsonpCallback] = function(data) {
           root[settings.jsonpCallback].called = true;
           root[settings.jsonpCallback].data = data;
         };

         var handler = function(e) {
           if(e.type === 'load' && !root[settings.jsonpCallback].called) {
             e = { type: 'error' };
           }
           var status = e.type === 'error' ? 400 : 200;
           var data = root[settings.jsonpCallback].data;

           if(status === 200) {
             observer.onNext({
               status: status,
               responseType: 'jsonp',
               response: data,
               originalEvent: e
             });

             observer.onCompleted();
           }
           else {
             observer.onError({
               type: 'error',
               status: status,
               originalEvent: e
             });
           }
         };

         script.onload = script.onreadystatechanged = script.onerror = handler;

         var head = document.getElementsByTagName('head')[0] || document.documentElement;
         head.insertBefore(script, head.firstChild);

         return function() {
           script.onload = script.onreadystatechanged = script.onerror = null;
           destroy(script);
           script = null;
         };
       });
     }
   }());

   /**
   * Creates a WebSocket Subject with a given URL, protocol and an optional observer for the open event.
   *
   * @example
   *  var socket = Rx.DOM.fromWebSocket('http://localhost:8080', 'stock-protocol', openObserver, closingObserver);
   *
   * @param {String} url The URL of the WebSocket.
   * @param {String} protocol The protocol of the WebSocket.
   * @param {Observer} [openObserver] An optional Observer to capture the open event.
   * @param {Observer} [closingObserver] An optional Observer to capture the moment before the underlying socket is closed.
   * @returns {Subject} An observable sequence wrapping a WebSocket.
   */
  dom.fromWebSocket = function (url, protocol, openObserver, closingObserver) {
    if (!WebSocket) { throw new TypeError('WebSocket not implemented in your runtime.'); }

    var socket;

    function socketClose(code, reason) {
      if (socket) {
        if (closingObserver) {
          closingObserver.onNext();
          closingObserver.onCompleted();
        }
        if (!code) {
          socket.close();
        } else {
          socket.close(code, reason);
        }
      }
    }

    var observable = new AnonymousObservable(function (obs) {
      socket = protocol ? new WebSocket(url, protocol) : new WebSocket(url);

      function openHandler(e) {
        openObserver.onNext(e);
        openObserver.onCompleted();
        socket.removeEventListener('open', openHandler, false);
      }
      function messageHandler(e) { obs.onNext(e); }
      function errHandler(e) { obs.onError(e); }
      function closeHandler(e) {
        if (e.code !== 1000 || !e.wasClean) { return obs.onError(e); }
        obs.onCompleted();
      }

      openObserver && socket.addEventListener('open', openHandler, false);
      socket.addEventListener('message', messageHandler, false);
      socket.addEventListener('error', errHandler, false);
      socket.addEventListener('close', closeHandler, false);

      return function () {
        socketClose();

        socket.removeEventListener('message', messageHandler, false);
        socket.removeEventListener('error', errHandler, false);
        socket.removeEventListener('close', closeHandler, false);
      };
    });

    var observer = observerCreate(
      function (data) {
        socket && socket.readyState === WebSocket.OPEN && socket.send(data);
      },
      function(e) {
        if (!e.code) {
          throw new Error('no code specified. be sure to pass { code: ###, reason: "" } to onError()');
        }
        socketClose(e.code, e.reason || '');
      },
      function() {
        socketClose(1000, '');
      }
    );

    return Subject.create(observer, observable);
  };

  /**
   * Creates a Web Worker with a given URL as a Subject.
   *
   * @example
   * var worker = Rx.DOM.fromWebWorker('worker.js');
   *
   * @param {String} url The URL of the Web Worker.
   * @returns {Subject} A Subject wrapping the Web Worker.
   */
  dom.fromWebWorker = function (url) {
    if (!root.Worker) { throw new TypeError('Worker not implemented in your runtime.'); }
    var worker = new root.Worker(url);

    var observable = new AnonymousObservable(function (obs) {

      function messageHandler(data) { obs.onNext(data); }
      function errHandler(err) { obs.onError(err); }

      worker.addEventListener('message', messageHandler, false);
      worker.addEventListener('error', errHandler, false);

      return function () {
        worker.close();
        worker.removeEventListener('message', messageHandler, false);
        worker.removeEventListener('error', errHandler, false);
      };
    });

    var observer = observerCreate(function (data) {
      worker.postMessage(data);
    });

    return Subject.create(observer, observable);
  };

  /**
   * This method wraps an EventSource as an observable sequence.
   * @param {String} url The url of the server-side script.
   * @param {Observer} [openObserver] An optional observer for the 'open' event for the server side event.
   * @returns {Observable} An observable sequence which represents the data from a server-side event.
   */
  dom.fromEventSource = function (url, openObserver) {
    if (!root.EventSource) { throw new TypeError('EventSource not implemented in your runtime.'); }
    return new AnonymousObservable(function (observer) {
      var source = new root.EventSource(url);

      function onOpen(e) {
        openObserver.onNext(e);
        openObserver.onCompleted();
        source.removeEventListener('open', onOpen, false);
      }

      function onError(e) {
        if (e.readyState === EventSource.CLOSED) {
          observer.onCompleted();
        } else {
          observer.onError(e);
        }
      }

      function onMessage(e) {
        observer.onNext(e);
      }

      openObserver && source.addEventListener('open', onOpen, false);
      source.addEventListener('error', onError, false);
      source.addEventListener('message', onMessage, false);

      return function () {
        source.removeEventListener('error', onError, false);
        source.removeEventListener('message', onMessage, false);
        source.close();
      };
    });
  };

  /**
   * Creates an observable sequence from a Mutation Observer.
   * MutationObserver provides developers a way to react to changes in a DOM.
   * @example
   *  Rx.DOM.fromMutationObserver(document.getElementById('foo'), { attributes: true, childList: true, characterData: true });
   *
   * @param {Object} target The Node on which to obserave DOM mutations.
   * @param {Object} options A MutationObserverInit object, specifies which DOM mutations should be reported.
   * @returns {Observable} An observable sequence which contains mutations on the given DOM target.
   */
  dom.fromMutationObserver = function (target, options) {
    var BrowserMutationObserver = root.MutationObserver || root.WebKitMutationObserver;
    if (!BrowserMutationObserver) { throw new TypeError('MutationObserver not implemented in your runtime.'); }
    return observableCreate(function (observer) {
      var mutationObserver = new BrowserMutationObserver(observer.onNext.bind(observer));
      mutationObserver.observe(target, options);

      return mutationObserver.disconnect.bind(mutationObserver);
    });
  };

  // Get the right animation frame method
  var requestAnimFrame, cancelAnimFrame;
  if (root.requestAnimationFrame) {
    requestAnimFrame = root.requestAnimationFrame;
    cancelAnimFrame = root.cancelAnimationFrame;
  } else if (root.mozRequestAnimationFrame) {
    requestAnimFrame = root.mozRequestAnimationFrame;
    cancelAnimFrame = root.mozCancelAnimationFrame;
  } else if (root.webkitRequestAnimationFrame) {
    requestAnimFrame = root.webkitRequestAnimationFrame;
    cancelAnimFrame = root.webkitCancelAnimationFrame;
  } else if (root.msRequestAnimationFrame) {
    requestAnimFrame = root.msRequestAnimationFrame;
    cancelAnimFrame = root.msCancelAnimationFrame;
  } else if (root.oRequestAnimationFrame) {
    requestAnimFrame = root.oRequestAnimationFrame;
    cancelAnimFrame = root.oCancelAnimationFrame;
  } else {
    requestAnimFrame = function(cb) { root.setTimeout(cb, 1000 / 60); };
    cancelAnimFrame = root.clearTimeout;
  }

  /**
   * Gets a scheduler that schedules schedules work on the requestAnimationFrame for immediate actions.
   */
  Scheduler.requestAnimationFrame = (function () {

    function scheduleNow(state, action) {
      var scheduler = this,
        disposable = new SingleAssignmentDisposable();
      var id = requestAnimFrame(function () {
        !disposable.isDisposed && (disposable.setDisposable(action(scheduler, state)));
      });
      return new CompositeDisposable(disposable, disposableCreate(function () {
        cancelAnimFrame(id);
      }));
    }

    function scheduleRelative(state, dueTime, action) {
      var scheduler = this, dt = Scheduler.normalize(dueTime);
      if (dt === 0) { return scheduler.scheduleWithState(state, action); }
      var disposable = new SingleAssignmentDisposable();
      var id = root.setTimeout(function () {
        if (!disposable.isDisposed) {
          disposable.setDisposable(action(scheduler, state));
        }
      }, dt);
      return new CompositeDisposable(disposable, disposableCreate(function () {
        root.clearTimeout(id);
      }));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
    }

    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);

  }());

  /**
   * Scheduler that uses a MutationObserver changes as the scheduling mechanism
   */
  Scheduler.microtask = (function () {

    var nextHandle = 1, tasksByHandle = {}, currentlyRunning = false, scheduleMethod;

    function clearMethod(handle) {
      delete tasksByHandle[handle];
    }

    function runTask(handle) {
      if (currentlyRunning) {
        root.setTimeout(function () { runTask(handle) }, 0);
      } else {
        var task = tasksByHandle[handle];
        if (task) {
          currentlyRunning = true;
          try {
            task();
          } catch (e) {
            throw e;
          } finally {
            clearMethod(handle);
            currentlyRunning = false;
          }
        }
      }
    }

    function postMessageSupported () {
      // Ensure not in a worker
      if (!root.postMessage || root.importScripts) { return false; }
      var isAsync = false, oldHandler = root.onmessage;
      // Test for async
      root.onmessage = function () { isAsync = true; };
      root.postMessage('', '*');
      root.onmessage = oldHandler;

      return isAsync;
    }

    // Use in order, setImmediate, nextTick, postMessage, MessageChannel, script readystatechanged, setTimeout
    var BrowserMutationObserver = root.MutationObserver || root.WebKitMutationObserver;
    if (!!BrowserMutationObserver) {

      var PREFIX = 'drainqueue_';

      var observer = new BrowserMutationObserver(function(mutations) {
        mutations.forEach(function (mutation) {
          runTask(mutation.attributeName.substring(PREFIX.length));
        })
      });

      var element = document.createElement('div');
      observer.observe(element, { attributes: true });

      // Prevent leaks
      root.addEventListener('unload', function () {
        observer.disconnect();
        observer = null;
      }, false);

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        element.setAttribute(PREFIX + id, 'drainQueue');
        return id;
      };
    } else if (typeof root.setImmediate === 'function') {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        root.setImmediate(function () {
          runTask(id);
        });

        return id;
      };
    } else if (postMessageSupported()) {
      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();

      function onGlobalPostMessage(event) {
        // Only if we're a match to avoid any other global events
        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
          runTask(event.data.substring(MSG_PREFIX.length));
        }
      }

      if (root.addEventListener) {
        root.addEventListener('message', onGlobalPostMessage, false);
      } else if (root.attachEvent){
        root.attachEvent('onmessage', onGlobalPostMessage);
      }

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[currentId] = action;
        root.postMessage(MSG_PREFIX + currentId, '*');
        return id;
      };
    } else if (!!root.MessageChannel) {
      var channel = new root.MessageChannel();

      channel.port1.onmessage = function (event) {
        runTask(event.data);
      };

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        channel.port2.postMessage(id);
        return id;
      };
    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {

      scheduleMethod = function (action) {
        var scriptElement = root.document.createElement('script');
        var id = nextHandle++;
        tasksByHandle[id] = action;

        scriptElement.onreadystatechange = function () {
          runTask(id);
          scriptElement.onreadystatechange = null;
          scriptElement.parentNode.removeChild(scriptElement);
          scriptElement = null;
        };
        root.document.documentElement.appendChild(scriptElement);

        return id;
      };

    } else {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        root.setTimeout(function () {
          runTask(id);
        }, 0);

        return id;
      };
    }

    function scheduleNow(state, action) {

      var scheduler = this,
        disposable = new SingleAssignmentDisposable();

      var id = scheduleMethod(function () {
        !disposable.isDisposed && (disposable.setDisposable(action(scheduler, state)));
      });

      return new CompositeDisposable(disposable, disposableCreate(function () {
        clearMethod(id);
      }));
    }

    function scheduleRelative(state, dueTime, action) {
      var scheduler = this, dt = Scheduler.normalize(dueTime);
      if (dt === 0) { return scheduler.scheduleWithState(state, action); }
      var disposable = new SingleAssignmentDisposable();
      var id = root.setTimeout(function () {
        if (!disposable.isDisposed) {
          disposable.setDisposable(action(scheduler, state));
        }
      }, dt);
      return new CompositeDisposable(disposable, disposableCreate(function () {
        root.clearTimeout(id);
      }));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
    }

    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);
  }());

  Rx.DOM.geolocation = {
    /**
    * Obtains the geographic position, in terms of latitude and longitude coordinates, of the device.
    * @param {Object} [geolocationOptions] An object literal to specify one or more of the following attributes and desired values:
    *   - enableHighAccuracy: Specify true to obtain the most accurate position possible, or false to optimize in favor of performance and power consumption.
    *   - timeout: An Integer value that indicates the time, in milliseconds, allowed for obtaining the position.
    *              If timeout is Infinity, (the default value) the location request will not time out.
    *              If timeout is zero (0) or negative, the results depend on the behavior of the location provider.
    *   - maximumAge: An Integer value indicating the maximum age, in milliseconds, of cached position information.
    *                 If maximumAge is non-zero, and a cached position that is no older than maximumAge is available, the cached position is used instead of obtaining an updated location.
    *                 If maximumAge is zero (0), watchPosition always tries to obtain an updated position, even if a cached position is already available.
    *                 If maximumAge is Infinity, any cached position is used, regardless of its age, and watchPosition only tries to obtain an updated position if no cached position data exists.
    * @returns {Observable} An observable sequence with the geographical location of the device running the client.
    */
    getCurrentPosition: function (geolocationOptions) {
      if (!root.navigator && !root.navigation.geolocation) { throw new TypeError('geolocation not available'); }

      return new AnonymousObservable(function (observer) {
        root.navigator.geolocation.getCurrentPosition(
          function (data) {
            observer.onNext(data);
            observer.onCompleted();
          },
          observer.onError.bind(observer),
          geolocationOptions);
      });
    },

    /**
    * Begins listening for updates to the current geographical location of the device running the client.
    * @param {Object} [geolocationOptions] An object literal to specify one or more of the following attributes and desired values:
    *   - enableHighAccuracy: Specify true to obtain the most accurate position possible, or false to optimize in favor of performance and power consumption.
    *   - timeout: An Integer value that indicates the time, in milliseconds, allowed for obtaining the position.
    *              If timeout is Infinity, (the default value) the location request will not time out.
    *              If timeout is zero (0) or negative, the results depend on the behavior of the location provider.
    *   - maximumAge: An Integer value indicating the maximum age, in milliseconds, of cached position information.
    *                 If maximumAge is non-zero, and a cached position that is no older than maximumAge is available, the cached position is used instead of obtaining an updated location.
    *                 If maximumAge is zero (0), watchPosition always tries to obtain an updated position, even if a cached position is already available.
    *                 If maximumAge is Infinity, any cached position is used, regardless of its age, and watchPosition only tries to obtain an updated position if no cached position data exists.
    * @returns {Observable} An observable sequence with the current geographical location of the device running the client.
    */
    watchPosition: function (geolocationOptions) {
      if (!root.navigator && !root.navigation.geolocation) { throw new TypeError('geolocation not available'); }

      return new AnonymousObservable(function (observer) {
        var watchId = root.navigator.geolocation.watchPosition(
          observer.onNext.bind(observer),
          observer.onError.bind(observer),
          geolocationOptions);

        return function () {
          root.navigator.geolocation.clearWatch(watchId);
        };
      }).publish().refCount();
    }
  };

  /**
   * The FileReader object lets web applications asynchronously read the contents of
   * files (or raw data buffers) stored on the user's computer, using File or Blob objects
   * to specify the file or data to read as an observable sequence.
   * @param {String} file The file to read.
   * @param {Observer} An observer to watch for progress.
   * @returns {Object} An object which contains methods for reading the data.
   */
  dom.fromReader = function(file, progressObserver) {
    if (!root.FileReader) { throw new TypeError('FileReader not implemented in your runtime.'); }

    function _fromReader(readerFn, file, encoding) {
      return new AnonymousObservable(function(observer) {
        var reader = new root.FileReader();
        var subject = new AsyncSubject();

        function loadHandler(e) {
          progressObserver && progressObserver.onCompleted();
          subject.onNext(e.target.result);
          subject.onCompleted();
        }

        function errorHandler(e) { subject.onError(e.target.error); }
        function progressHandler(e) { progressObserver.onNext(e); }

        reader.addEventListener('load', loadHandler, false);
        reader.addEventListener('error', errorHandler, false);
        progressObserver && reader.addEventListener('progress', progressHandler, false);

        reader[readerFn](file, encoding);

        return new CompositeDisposable(subject.subscribe(observer), disposableCreate(function () {
          reader.readyState == root.FileReader.LOADING && reader.abort();
          reader.removeEventListener('load', loadHandler, false);
          reader.removeEventListener('error', errorHandler, false);
          progressObserver && reader.removeEventListener('progress', progressHandler, false);
        }));
      });
    }

    return {
      /**
       * This method is used to read the file as an ArrayBuffer as an Observable stream.
       * @returns {Observable} An observable stream of an ArrayBuffer
       */
      asArrayBuffer : function() {
        return _fromReader('readAsArrayBuffer', file);
      },
      /**
       * This method is used to read the file as a binary data string as an Observable stream.
       * @returns {Observable} An observable stream of a binary data string.
       */
      asBinaryString : function() {
        return _fromReader('readAsBinaryString', file);
      },
      /**
       * This method is used to read the file as a URL of the file's data as an Observable stream.
       * @returns {Observable} An observable stream of a URL representing the file's data.
       */
      asDataURL : function() {
        return _fromReader('readAsDataURL', file);
      },
      /**
       * This method is used to read the file as a string as an Observable stream.
       * @returns {Observable} An observable stream of the string contents of the file.
       */
      asText : function(encoding) {
        return _fromReader('readAsText', file, encoding);
      }
    };
  };

  return Rx;
}));