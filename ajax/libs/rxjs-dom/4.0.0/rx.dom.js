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
    define(['./rx', 'exports'], function (Rx, exports) {
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
    disposableCreate = Rx.Disposable.create,
    CompositeDisposable = Rx.CompositeDisposable,
    SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
    AsynsSubject = Rx.AsynsSubject,
    Subject = Rx.Subject,
    Scheduler = Rx.Scheduler,
    defaultNow = (function () { return !!Date.now ? Date.now : function () { return +new Date; }; }()),
    dom = Rx.DOM = {},
    hasOwnProperty = {}.hasOwnProperty,
    noop = Rx.helpers.noop;

  function createListener (element, name, handler) {
    if (element.addEventListener) {
      element.addEventListener(name, handler, false);
      return disposableCreate(function () {
        element.removeEventListener(name, handler, false);
      });
    }
    throw new Error('No listener found');
  }

  function createEventListener (el, eventName, handler) {
    var disposables = new CompositeDisposable();

    // Asume NodeList
    if (Object.prototype.toString.call(el) === '[object NodeList]') {
      for (var i = 0, len = el.length; i < len; i++) {
        disposables.add(createEventListener(el.item(i), eventName, handler));
      }
    } else if (el) {
      disposables.add(createListener(el, eventName, handler));
    }

    return disposables;
  }

  /**
   * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
   *
   * @example
   *   var source = Rx.DOM.fromEvent(element, 'mouseup');
   * 
   * @param {Object} element The DOMElement or NodeList to attach a listener.
   * @param {String} eventName The event name to attach the observable sequence.
   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.     
   * @returns {Observable} An observable sequence of events from the specified element and the specified event.
   */
  var fromEvent = dom.fromEvent = function (element, eventName, selector) {

    return new AnonymousObservable(function (observer) {
      return createEventListener(
        element, 
        eventName, 
        function handler (e) { 
          var results = e;

          if (selector) {
            try {
              results = selector(arguments);
            } catch (err) {
              observer.onError(err);
              return
            }
          }

          observer.onNext(results); 
        });
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
        dom[e] = function (element, selector) {
          return fromEvent(element, e, selector);
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
      function handler () {
        observer.onNext();
        observer.onCompleted();
      }

      if (document.readyState === 'complete') {
        setTimeout(handler, 0);
      } else {
        document.addEventListener( 'DOMContentLoaded', handler, false );
        root.addEventListener( 'load', handler, false );
      }

      return function () {
        document.removeEventListener( 'DOMContentLoaded', handler, false );
        root.removeEventListener( 'load', handler, false );
      };
    }).publish().refCount();
  };


  /* @private 
   * Gets the proper XMLHttpRequest for support for older IE 
   */
  function getXMLHttpRequest() {
    if (root.XMLHttpRequest) {
      return new root.XMLHttpRequest;
    } else {
      try {
        return new root.ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        throw new Error('XMLHttpRequest is not supported by your browser');
      }
    }
  }

  /**
   * Creates a cold observable for an Ajax request with either a settings object with url, headers, etc or a string for a URL.
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
   *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
   *   - async: Whether the request is async
   *   - headers: Optional headers
   *
   * @returns {Observable} An observable sequence containing the XMLHttpRequest.
  */
  var ajaxRequest = dom.ajax = function (settings) {
    return new AnonymousObservable(function (observer) {
      var isDone = false;
      if (typeof settings === 'string') {
        settings = { method: 'GET', url: settings, async: true };
      }
      settings.method || (settings.method = 'GET');
      if (settings.async === undefined) {
        settings.async = true;
      }

      var xhr;
      try {
        xhr = getXMLHttpRequest();
      } catch (err) {
        observer.onError(err);
      }

      try {
        if (settings.user) {
          xhr.open(settings.method, settings.url, settings.async, settings.user, settings.password);
        } else {
          xhr.open(settings.method, settings.url, settings.async);
        }

        if (settings.headers) {
          var headers = settings.headers;
          for (var header in headers) {
            if (hasOwnProperty.call(headers, header)) {
              xhr.setRequestHeader(header, headers[header]);
            }
          }
        }

        xhr.onreadystatechange = xhr.onload = function () {
          if (xhr.readyState === 4) {
            var status = xhr.status;
            if ((status >= 200 && status <= 300) || status === 0 || status === '') {
              observer.onNext(xhr);
              observer.onCompleted();
            } else {
              observer.onError(xhr);
            }

            isDone = true;
          }
        };

        xhr.onerror = function () {
          observer.onError(xhr);
        };

        xhr.send(settings.body || null);
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
    return ajaxRequest({ url: url, body: body, method: 'POST', async: true });
  };
  
  /**
   * Creates an observable sequence from an Ajax GET Request with the body.
   *
   * @param {String} url The URL to GET
   * @returns {Observable} The observable sequence which contains the response from the Ajax GET.
   */   
  var observableGet = dom.get = function (url) {
    return ajaxRequest({ url: url, method: 'GET', async: true });
  };

  
  if (typeof JSON !== 'undefined' && typeof JSON.parse === 'function') {
    /**
     * Creates an observable sequence from JSON from an Ajax request
     *
     * @param {String} url The URL to GET
     * @returns {Observable} The observable sequence which contains the parsed JSON.
     */       
    dom.getJSON = function (url) {
      return observableGet(url).map(function (xhr) {
        return JSON.parse(xhr.responseText);
      });
    };            
  }    

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
   * Creates a cold observable JSONP Request with the specified settings.
   *
   * @example 
   *   source = Rx.DOM.jsonpRequest('http://www.bing.com/?q=foo&JSONPRequest=?');
   *   source = Rx.DOM.jsonpRequest( url: 'http://bing.com/?q=foo', jsonp: 'JSONPRequest' });
   *
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
  dom.jsonpRequest = (function () {
    var uniqueId = 0;
    var defaultCallback = function _defaultCallback(observer, data) {
      observer.onNext(data);
      observer.onCompleted();
    };

    return function (settings) {
      return new AnonymousObservable(function (observer) {
        typeof settings === 'string' && (settings = { url: settings });
        !settings.jsonp && (settings.jsonp = 'JSONPCallback');

        var head = document.getElementsByTagName('head')[0] || document.documentElement,
          tag = document.createElement('script'),
          handler = 'rxjscallback' + uniqueId++;
          
        var prevFn;
        if (typeof settings.jsonpCallback === 'string') {
          handler = settings.jsonpCallback;
          prevFn = root[handler];
        }

        settings.url = settings.url.replace('=' + settings.jsonp, '=' + handler);

        root[handler] = function(data) {
          if (prevFn && typeof prevFn === 'function') {
            prevFn(observer, data);
          } else {
            defaultCallback(observer, data);
          }
        };

        var cleanup = function _cleanup() {
          tag.onload = tag.onreadystatechange = null;
          head && tag.parentNode && destroy(tag);
          tag = undefined;
          root[handler] = prevFn;
        };

        tag.src = settings.url;
        tag.async = true;
        tag.onload = tag.onreadystatechange = function (_, abort) {
          if ( abort || !tag.readyState || /loaded|complete/.test(tag.readyState) ) {
            cleanup();
          }
        };  
        head.insertBefore(tag, head.firstChild);

        return function () {
          if (!tag) { return; }
          cleanup();
        };
      });
    };
  })();
  if (!!root.WebSocket) {
     /**
     * Creates a WebSocket Subject with a given URL, protocol and an optional observer for the open event.
     * 
     * @example
     *  var socket = Rx.DOM.fromWebSocket('http://localhost:8080', 'stock-protocol', function(e) { ... });
     *  var socket = Rx.DOM.fromWebSocket('http://localhost:8080', 'stock-protocol', observer);
     *
     * @param {String} url The URL of the WebSocket.
     * @param {String} protocol The protocol of the WebSocket.
     * @param {Observer} [openObserver] An optional Observer to capture the open event.
     * @returns {Subject} An observable sequence wrapping a WebSocket.
     */
    dom.fromWebSocket = function (url, protocol, openObserver) {
      var socket = new root.WebSocket(url, protocol);

      var observable = new AnonymousObservable(function (obs) {
          if (observerOrOnNext) {
            socket.onopen = function (openEvent) {
              openObserver.onNext(openEvent);
              openObserver.onCompleted();
            };
          }

          socket.onmessage = function (data) { obs.onNext(data); };
          socket.onerror = function (err) { obs.onError(err); };
          socket.onclose = function () { obs.onCompleted(); };

          return function () {
            socket.close();
          };
      });

      var observer = observerCreate(function (data) {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(data);
        }
      });

      return Subject.create(observer, observable);
    };       
  }


  if (!!root.Worker) {
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
      var worker = new root.Worker(url);

      var observable = new AnonymousObservable(function (obs) {
        worker.onmessage = function (data) {
          obs.onNext(data);
        };

        worker.onerror = function (err) {
          obs.onError(err);
        };

        return function () {
          worker.close();
        };
      });

      var observer = observerCreate(function (data) {
        worker.postMessage(data);
      });

      return Subject.create(observer, observable);
    };      
  }

    if (window.MutationObserver) {

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

            return observableCreate(function (observer) {
                var mutationObserver = new MutationObserver(function (mutations) {
                    observer.onNext(mutations);
                });

                mutationObserver.observe(target, options);

                return function () {
                    mutationObserver.disconnect();
                };
            });

        };

    }

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
      var scheduler = this,
        dt = Scheduler.normalize(dueTime);
        
      if (dt === 0) { return scheduler.scheduleWithState(state, action); }

      var disposable = new SingleAssignmentDisposable(),
          id;
      var scheduleFunc = function () {
        if (id) { cancelAnimFrame(id); }
        if (dt - scheduler.now() <= 0) {
          !disposable.isDisposed && (disposable.setDisposable(action(scheduler, state)));
        } else {
          id = requestAnimFrame(scheduleFunc);
        }
      };

      id = requestAnimFrame(scheduleFunc);

      return new CompositeDisposable(disposable, disposableCreate(function () {
        cancelAnimFrame(id);
      }));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
    }

    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);        

  }());
  
// Check for mutation observer
var BrowserMutationObserver = root.MutationObserver || root.WebKitMutationObserver;
if (BrowserMutationObserver) {

  /**
   * Scheduler that uses a MutationObserver changes as the scheduling mechanism
   */
  Scheduler.mutationObserver = (function () {

    var queue = [], queueId = 0;

    var observer = new BrowserMutationObserver(function() {
      var toProcess = queue.slice(0);
      queue = [];

      toProcess.forEach(function (func) {
        func();
      });
    });

    var element = document.createElement('div');
    observer.observe(element, { attributes: true });

    // Prevent leaks
    root.addEventListener('unload', function () {
      observer.disconnect();
      observer = null;
    }, false);

    function scheduleMethod (action) {
      var id = queueId++;
      queue[id] = action;
      element.setAttribute('drainQueue', 'drainQueue');
      return id;
    }

    function clearMethod (id) {
      delete queue[id];
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
      var scheduler = this,
        dt = Scheduler.normalize(dueTime);

      if (dt === 0) {
        return scheduler.scheduleWithState(state, action);
      }

      var disposable = new SingleAssignmentDisposable(),
        id;
      var scheduleFunc = function () {
        if (id) { clearMethod(id); }
        if (dt - scheduler.now() <= 0) {
          !disposable.isDisposed && (disposable.setDisposable(action(scheduler, state)));
        } else {
          id = scheduleMethod(scheduleFunc);
        }
      };

      id = scheduleMethod(scheduleFunc);

      return new CompositeDisposable(disposable, disposableCreate(function () {
        clearMethod(id);
      }));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
    }

    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);  
  }());
}


  if ('navigator' in root && 'geolocation' in root.navigator) {
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
        return new AnonymousObservable(function (observer) {
          root.navigator.geolocation.getCurrentPosition(
            observer.onNext.bind(observer), 
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
    }
  }

  return Rx;
}));