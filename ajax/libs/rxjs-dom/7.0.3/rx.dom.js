// Copyright (c) Microsoft, Inc. All rights reserved. See License.txt in the project root for license information.

;(function (factory) {
  var objectTypes = {
    'function': true,
    'object': true
  };

  function checkGlobal(value) {
    return (value && value.Object === Object) ? value : null;
  }

  var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
  var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
  var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
  var freeSelf = checkGlobal(objectTypes[typeof self] && self);
  var freeWindow = checkGlobal(objectTypes[typeof window] && window);
  var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
  var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();

  // Because of build optimizers
  if (typeof define === 'function' && define.amd) {
    define(['rx'], function (Rx, exports) {
      return factory(root, exports, Rx);
    });
  } else if (typeof module === 'object' && module && module.exports === freeExports) {
    module.exports = factory(root, module.exports, require('rx'));
  } else {
    root.Rx = factory(root, {}, root.Rx);
  }
}.call(this, function (root, exp, Rx, undefined) {

  var Observable = Rx.Observable,
    ObservableBase = Rx.ObservableBase,
    AbstractObserver = Rx.internals.AbstractObserver,
    observerCreate = Rx.Observer.create,
    observableCreate = Rx.Observable.create,
    disposableCreate = Rx.Disposable.create,
    Disposable = Rx.Disposable,
    CompositeDisposable = Rx.CompositeDisposable,
    BinaryDisposable = Rx.BinaryDisposable,
    SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
    Subject = Rx.Subject,
    Scheduler = Rx.Scheduler,
    dom = Rx.DOM = {},
    hasOwnProperty = {}.hasOwnProperty,
    noop = Rx.helpers.noop,
    isFunction = Rx.helpers.isFunction,
    inherits = Rx.internals.inherits;

  var errorObj = {e: {}};

  function tryCatcherGen(tryCatchTarget) {
    return function tryCatcher() {
      try {
        return tryCatchTarget.apply(this, arguments);
      } catch (e) {
        errorObj.e = e;
        return errorObj;
      }
    };
  }

  function tryCatch(fn) {
    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
    return tryCatcherGen(fn);
  }

  function thrower(e) {
    throw e;
  }

  function CreateListenerDisposable(element, name, handler, useCapture) {
    this._e = element;
    this._n = name;
    this._fn = handler;
    this._u = useCapture;
    this._e.addEventListener(this._n, this._fn, this._u);
    this.isDisposed = false;
  }

  CreateListenerDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      this._e.removeEventListener(this._n, this._fn, this._u);
    }
  };

  function createListener (element, name, handler, useCapture) {
    if (element.addEventListener) {
      return new CreateListenerDisposable(element, name, handler, useCapture);
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

  var FromEventObservable = (function(__super__) {
    inherits(FromEventObservable, __super__);
    function FromEventObservable(element, eventName, selector, useCapture) {
      this._e = element;
      this._n = eventName;
      this._fn = selector;
      this._uc = useCapture;
      __super__.call(this);
    }

    function createHandler(o, fn) {
      return function handler() {
        var results = arguments[0];
        if (fn) {
          results = tryCatch(fn).apply(null, arguments);
          if (results === errorObj) { return o.onError(results.e); }
        }
        o.onNext(results);
      };
    }

    FromEventObservable.prototype.subscribeCore = function (o) {
      return createEventListener(
        this._e,
        this._n,
        createHandler(o, this._fn),
        this._uc);
    };

    return FromEventObservable;
  }(ObservableBase));

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
    return new FromEventObservable(element, eventName, selectorFn, useCapture).publish().refCount();
  };

  (function () {
    var events = 'blur focus focusin focusout load resize scroll unload click dblclick ' +
      'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
      'change select submit keydown keypress keyup error contextmenu input';

    if (root.PointerEvent) {
      events += ' pointerdown pointerup pointermove pointerover pointerout pointerenter pointerleave';
    }

    if (root.TouchEvent) {
      events += ' touchstart touchend touchmove touchcancel';
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

  var ReadyObservable = (function (__super__) {
    inherits(ReadyObservable, __super__);
    function ReadyObservable() {
      __super__.call(this);
    }

    function createHandler(o) {
      return function handler() {
        o.onNext();
        o.onCompleted();
      };
    }

    ReadyObservable.prototype.subscribeCore = function (o) {
      return new ReadyDisposable(o, createHandler(o));
    };

    function ReadyDisposable(o, fn) {
      this._o = o;
      this._fn = fn;
      this._addedHandlers = false;
      this.isDisposed = false;

      if (root.document.readyState === 'complete') {
        setTimeout(this._fn, 0);
      } else {
        this._addedHandlers = true;
        root.document.addEventListener( 'DOMContentLoaded', this._fn, false );
      }
    }

    ReadyDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        root.document.removeEventListener( 'DOMContentLoaded', this._fn, false );
      }
    };

    return ReadyObservable;
  }(ObservableBase));

  /**
   * Creates an observable sequence when the DOM is loaded
   * @returns {Observable} An observable sequence fired when the DOM is loaded
   */
  dom.ready = function () {
    return new ReadyObservable();
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
      xhr.withCredentials = true;
      return xhr;
    } else if (!!root.XDomainRequest) {
      return new XDomainRequest();
    } else {
      throw new Error('CORS is not supported by your browser');
    }
  }

  function normalizeAjaxSuccessEvent(e, xhr, settings) {
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

  var AjaxObservable = (function(__super__) {
    inherits(AjaxObservable, __super__);
    function AjaxObservable(settings) {
      this._settings = settings;
      __super__.call(this);
    }

    AjaxObservable.prototype.subscribeCore = function (o) {
      var state = { isDone: false };
      var xhr;

      var settings = this._settings;
      var normalizeError = settings.normalizeError;
      var normalizeSuccess = settings.normalizeSuccess;

      var processResponse = function(xhr, e){
        var status = xhr.status === 1223 ? 204 : xhr.status;
        if ((status >= 200 && status <= 300) || status === 0 || status === '') {
          o.onNext(normalizeSuccess(e, xhr, settings));
          o.onCompleted();
        } else {
          o.onError(settings.normalizeError(e, xhr, 'error'));
        }
        state.isDone = true;
      };

      try {
        xhr = settings.createXHR();
      } catch (err) {
        return o.onError(err);
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

        xhr.timeout = settings.timeout;
        xhr.ontimeout = function (e) {
          settings.progressObserver && settings.progressObserver.onError(e);
          o.onError(normalizeError(e, xhr, 'timeout'));
        };

        if(!!xhr.upload || (!('withCredentials' in xhr) && !!root.XDomainRequest)) {
          xhr.onload = function(e) {
            if(settings.progressObserver) {
              settings.progressObserver.onNext(e);
              settings.progressObserver.onCompleted();
            }
            processResponse(xhr, e);
          };

          if(settings.progressObserver) {
            xhr.onprogress = function(e) {
              settings.progressObserver.onNext(e);
            };
          }

          xhr.onerror = function(e) {
            settings.progressObserver && settings.progressObserver.onError(e);
            o.onError(normalizeError(e, xhr, 'error'));
            state.isDone = true;
          };

          xhr.onabort = function(e) {
            settings.progressObserver && settings.progressObserver.onError(e);
            o.onError(normalizeError(e, xhr, 'abort'));
            state.isDone = true;
          };
        } else {
          xhr.onreadystatechange = function (e) {
            xhr.readyState === 4 && processResponse(xhr, e);
          };
        }

        var contentType = settings.headers['Content-Type'] ||
            settings.headers['Content-type'] ||
            settings.headers['content-type'];
        if (settings.hasContent && contentType === 'application/x-www-form-urlencoded' && typeof settings.body !== 'string') {
          var newBody = [];
          for (var prop in settings.body) {
            if (hasOwnProperty.call(settings.body, prop)) {
              newBody.push(prop + '=' + settings.body[prop]);
            }
          }
          settings.body = newBody.join('&');
        }

        xhr.send(settings.hasContent && settings.body || null);
      } catch (e) {
        o.onError(e);
      }

      return new AjaxDisposable(state, xhr);
    };

    function AjaxDisposable(state, xhr) {
      this._state = state;
      this._xhr = xhr;
      this.isDisposed = false;
    }

    AjaxDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        if (!this._state.isDone && this._xhr.readyState !== 4) { this._xhr.abort(); }
      }
    };

    return AjaxObservable;
  }(ObservableBase));

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
      async: true,
      headers: {},
      responseType: 'text',
      timeout: 0,
      createXHR: function(){
        return this.crossDomain ? getCORSRequest() : getXMLHttpRequest()
      },
      normalizeError: normalizeAjaxErrorEvent,
      normalizeSuccess: normalizeAjaxSuccessEvent
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

    return new AjaxObservable(settings);
  };

  /**
   * Creates an observable sequence from an Ajax POST Request with the body.
   *
   * @param {String} url The URL to POST
   * @param {Object} body The body to POST
   * @returns {Observable} The observable sequence which contains the response from the Ajax POST.
   */
  dom.post = function (url, body) {
    var settings;
    if (typeof url === 'string') {
      settings = {url: url, body: body, method: 'POST' };
    } else if (typeof url === 'object') {
      settings = url;
      settings.method = 'POST';
    }
    return ajaxRequest(settings);
  };

  /**
   * Creates an observable sequence from an Ajax GET Request with the body.
   *
   * @param {String} url The URL to GET
   * @returns {Observable} The observable sequence which contains the response from the Ajax GET.
   */
  dom.get = function (url) {
    var settings;
    if (typeof url === 'string') {
      settings = {url: url };
    } else if (typeof url === 'object') {
      settings = url;
    }
    return ajaxRequest(settings);
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

  var destroy = (function () {
    var trash = 'document' in root && root.document.createElement('div');
    return function (element) {
      trash.appendChild(element);
      trash.innerHTML = '';
    };
  })();

  var ScriptObservable = (function(__super__) {
    inherits(ScriptObservable, __super__);
    function ScriptObservable(settings) {
      this._settings = settings;
      __super__.call(this);
    }

    ScriptObservable.id = 0;

    ScriptObservable.prototype.subscribeCore = function (o) {
      var settings = {
        jsonp: 'JSONPCallback',
        async: true,
        jsonpCallback: 'rxjsjsonpCallbacks' + 'callback_' + (ScriptObservable.id++).toString(36)
      };

      if(typeof this._settings === 'string') {
        settings.url = this._settings;
      } else {
        for(var prop in this._settings) {
          if(hasOwnProperty.call(this._settings, prop)) {
            settings[prop] = this._settings[prop];
          }
        }
      }

      var script = root.document.createElement('script');
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
          o.onNext({
            status: status,
            responseType: 'jsonp',
            response: data,
            originalEvent: e
          });

          o.onCompleted();
        }
        else {
          o.onError({
            type: 'error',
            status: status,
            originalEvent: e
          });
        }
      };

      script.onload = script.onreadystatechanged = script.onerror = handler;

      var head = root.document.getElementsByTagName('head')[0] || root.document.documentElement;
      head.insertBefore(script, head.firstChild);

      return new ScriptDisposable(script);
    };

    function ScriptDisposable(script) {
      this._script = script;
      this.isDisposed = false;
    }

    ScriptDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        this._script.onload = this._script.onreadystatechanged = this._script.onerror = null;
        destroy(this._script);
        this._script = null;
      }
    };

    return ScriptObservable;
  }(ObservableBase));

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
   dom.jsonpRequest = function (settings) {
     return new ScriptObservable(settings);
   };

  function socketClose(socket, closingObserver, code, reason) {
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

  var SocketObservable = (function (__super__) {
    inherits(SocketObservable, __super__);
    function SocketObservable(state, url, protocol, open, close) {
      this._state = state;
      this._url = url;
      this._protocol = protocol;
      this._open = open;
      this._close = close;
      __super__.call(this);
    }

    function createOpenHandler(open, socket) {
      return function openHandler(e) {
        open.onNext(e);
        open.onCompleted();
        socket.removeEventListener('open', openHandler, false);
      };
    }
    function createMsgHandler(o) { return function msgHandler(e) { o.onNext(e); }; }
    function createErrHandler(o) { return function errHandler(e) { o.onError(e); }; }
    function createCloseHandler(o) {
      return function closeHandler(e) {
        if (e.code !== 1000 || !e.wasClean) { return o.onError(e); }
        o.onCompleted();
      };
    }

    function SocketDisposable(socket, msgFn, errFn, closeFn, close) {
      this._socket = socket;
      this._msgFn = msgFn;
      this._errFn = errFn;
      this._closeFn = closeFn;
      this._close = close;
      this.isDisposed = false;
    }

    SocketDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        socketClose(this._socket, this._close);

        this._socket.removeEventListener('message', this._msgFn, false);
        this._socket.removeEventListener('error', this._errFn, false);
        this._socket.removeEventListener('close', this._closeFn, false);
      }
    };

    SocketObservable.prototype.subscribeCore = function (o) {
      this._state.socket = this._protocol ? new WebSocket(this._url, this._protocol) : new WebSocket(this._url);

      var openHandler = createOpenHandler(this._open, this._state.socket);
      var msgHandler = createMsgHandler(o);
      var errHandler = createErrHandler(o);
      var closeHandler = createCloseHandler(o);

      this._open && this._state.socket.addEventListener('open', openHandler, false);
      this._state.socket.addEventListener('message', msgHandler, false);
      this._state.socket.addEventListener('error', errHandler, false);
      this._state.socket.addEventListener('close', closeHandler, false);

      return new SocketDisposable(this._state.socket, msgHandler, errHandler, closeHandler, this._close);
    };

    return SocketObservable;
  }(ObservableBase));

  var SocketObserver = (function (__super__) {
    inherits(SocketObserver, __super__);
    function SocketObserver(state, close) {
      this._state = state;
      this._close = close;
      __super__.call(this);
    }

    SocketObserver.prototype.next = function (x) {
      this._state.socket && this._state.socket.readyState === WebSocket.OPEN && this._state.socket.send(x);
    };

    SocketObserver.prototype.error = function (e) {
      if (!e.code) {
        throw new Error('no code specified. be sure to pass { code: ###, reason: "" } to onError()');
      }
      socketClose(this._state.socket, this._close, e.code, e.reason || '');
    };

    SocketObserver.prototype.completed = function () {
      socketClose(this._state.socket, this._close, 1000, '');
    };

    return SocketObserver;
  }(AbstractObserver));

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
    var state = { socket: null };
    return Subject.create(
      new SocketObserver(state, closingObserver),
      new SocketObservable(state, url, protocol, openObserver, closingObserver)
    );
  };

  var WorkerObserver = (function (__super__) {
    inherits(WorkerObserver, __super__);
    function WorkerObserver(state) {
      this._state = state;
      __super__.call(this);
    }

    WorkerObserver.prototype.next = function (x) { this._state.worker && this._state.worker.postMessage(x); };
    WorkerObserver.prototype.error = function (e) { throw e; };
    WorkerObserver.prototype.completed = function () { };

    return WorkerObserver;
  }(AbstractObserver));

  var WorkerObservable = (function (__super__) {
    inherits(WorkerObservable, __super__);
    function WorkerObservable(state, url) {
      this._state = state;
      this._url = url;
      __super__.call(this);
    }

    function createMessageHandler(o) { return function messageHandler (e) { o.onNext(e); }; }
    function createErrHandler(o) { return function errHandler(e) { o.onError(e); }; }

    function WorkerDisposable(w, msgFn, errFn) {
      this._w = w;
      this._msgFn = msgFn;
      this._errFn = errFn;
      this.isDisposed = false;
    }

    WorkerDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        this._w.terminate();
        this._w.removeEventListener('message', this._msgFn, false);
        this._w.removeEventListener('error', this._errFn, false);
      }
    };

    WorkerObservable.prototype.subscribeCore = function (o) {
      this._state.worker = new root.Worker(this._url);

      var messageHandler = createMessageHandler(o);
      var errHandler = createErrHandler(o);

      this._state.worker.addEventListener('message', messageHandler, false);
      this._state.worker.addEventListener('error', errHandler, false);

      return new WorkerDisposable(this._state.worker, messageHandler, errHandler);
    };

    return WorkerObservable;
  }(ObservableBase));

  /**
   * Creates a Web Worker with a given URL as a Subject.
   *
   * @example
   * var worker = Rx.DOM.fromWebWorker('worker.js');
   *
   * @param {String} url The URL of the Web Worker.
   * @returns {Subject} A Subject wrapping the Web Worker.
   */
  dom.fromWorker = function (url) {
    if (!root.Worker) { throw new TypeError('Worker not implemented in your runtime.'); }
    var state = { worker: null };
    return Subject.create(new WorkerObserver(state), new WorkerObservable(state, url));
  };

  function getMutationObserver(next) {
    var M = root.MutationObserver || root.WebKitMutationObserver;
    return new M(next);
  }

  var MutationObserverObservable = (function (__super__) {
    inherits(MutationObserverObservable, __super__);
    function MutationObserverObservable(target, options) {
      this._target = target;
      this._options = options;
      __super__.call(this);
    }

    function InnerDisposable(mutationObserver) {
      this._m = mutationObserver;
      this.isDisposed = false;
    }

    InnerDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        this._m.disconnect();
      }
    };

    MutationObserverObservable.prototype.subscribeCore = function (o) {
      var mutationObserver = getMutationObserver(function (e) { o.onNext(e); });
      mutationObserver.observe(this._target, this._options);
      return new InnerDisposable(mutationObserver);
    };

    return MutationObserverObservable;
  }(ObservableBase));

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
    if (!(root.MutationObserver || root.WebKitMutationObserver)) { throw new TypeError('MutationObserver not implemented in your runtime.'); }
    return new MutationObserverObservable(target, options);
  };

  var CurrentPositionObservable = (function (__super__) {
    inherits(CurrentPositionObservable, __super__);
    function CurrentPositionObservable(opts) {
      this._opts = opts;
      __super__.call(this);
    }

    CurrentPositionObservable.prototype.subscribeCore = function (o) {
      root.navigator.geolocation.getCurrentPosition(
        function (data) {
          o.onNext(data);
          o.onCompleted();
        },
        function (e) { o.onError(e); },
        this._opts);
    };

    return CurrentPositionObservable;
  }(ObservableBase));

  var WatchPositionObservable = (function (__super__) {
    inherits(WatchPositionObservable, __super__);
    function WatchPositionObservable(opts) {
      this._opts = opts;
      __super__.call(this);
    }

    function WatchPositionDisposable(id) {
      this._id = id;
      this.isDisposed = false;
    }

    WatchPositionDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        root.navigator.geolocation.clearWatch(this._id);
      }
    };

    WatchPositionObservable.prototype.subscribeCore = function (o) {
      var watchId = root.navigator.geolocation.watchPosition(
        function (x) { o.onNext(x); },
        function (e) { o.onError(e); },
        this._opts);

      return new WatchPositionDisposable(watchId);
    };

    return WatchPositionObservable;
  }(ObservableBase));

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
      return new CurrentPositionObservable(geolocationOptions);
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
      return new WatchPositionObservable(geolocationOptions).publish().refCount();
    }
  };

  var FromReaderObservable = (function (__super__) {
    inherits(FromReaderObservable, __super__);
    function FromReaderObservable(readerFn, file, progressObserver, encoding) {
      this._readerFn  = readerFn;
      this._file = file;
      this._progressObserver = progressObserver;
      this._encoding = encoding;
      __super__.call(this);
    }

    function createLoadHandler(o, p) {
      return function loadHandler(e) {
        p && p.onCompleted();
        o.onNext(e.target.result);
        o.onCompleted();
      };
    }

    function createErrorHandler(o) { return function errorHandler (e) { o.onError(e.target.error); }; }
    function createProgressHandler(o) { return function progressHandler (e) { o.onNext(e); }; }

    function FromReaderDisposable(reader, progressObserver, loadHandler, errorHandler, progressHandler) {
      this._r = reader;
      this._po = progressObserver;
      this._lFn = loadHandler;
      this._eFn = errorHandler;
      this._pFn = progressHandler;
      this.isDisposed = false;
    }

    FromReaderDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this.isDisposed = true;
        this._r.readyState === root.FileReader.LOADING && this._r.abort();
        this._r.removeEventListener('load', this._lFn, false);
        this._r.removeEventListener('error', this._eFn, false);
        this._po && this._r.removeEventListener('progress', this._pFn, false);
      }
    };

    FromReaderObservable.prototype.subscribeCore = function (o) {
      var reader = new root.FileReader();

      var loadHandler = createLoadHandler(o, this._progressObserver);
      var errorHandler = createErrorHandler(o);
      var progressHandler = createProgressHandler(this._progressObserver);

      reader.addEventListener('load', loadHandler, false);
      reader.addEventListener('error', errorHandler, false);
      this._progressObserver && reader.addEventListener('progress', progressHandler, false);

      reader[this._readerFn](this._file, this._encoding);

      return new FromReaderDisposable(reader, this._progressObserver, loadHandler, errorHandler, progressHandler);
    };

    return FromReaderObservable;
  }(ObservableBase));

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

    return {
      /**
       * This method is used to read the file as an ArrayBuffer as an Observable stream.
       * @returns {Observable} An observable stream of an ArrayBuffer
       */
      asArrayBuffer : function() {
        return new FromReaderObservable('readAsArrayBuffer', file, progressObserver);
      },
      /**
       * This method is used to read the file as a binary data string as an Observable stream.
       * @returns {Observable} An observable stream of a binary data string.
       */
      asBinaryString : function() {
        return new FromReaderObservable('readAsBinaryString', file, progressObserver);
      },
      /**
       * This method is used to read the file as a URL of the file's data as an Observable stream.
       * @returns {Observable} An observable stream of a URL representing the file's data.
       */
      asDataURL : function() {
        return new FromReaderObservable('readAsDataURL', file, progressObserver);
      },
      /**
       * This method is used to read the file as a string as an Observable stream.
       * @returns {Observable} An observable stream of the string contents of the file.
       */
      asText : function(encoding) {
        return new FromReaderObservable('readAsText', file, progressObserver, encoding);
      }
    };
  };

  var EventSourceObservable = (function(__super__) {
    inherits(EventSourceObservable, __super__);
    function EventSourceObservable(url, open) {
      this._url = url;
      this._open = open;
      __super__.call(this);
    }

    function createOnOpen(o, source) {
      return function onOpen(e) {
        o.onNext(e);
        o.onCompleted();
        source.removeEventListener('open', onOpen, false);
      };
    }

    function createOnError(o) {
      return function onError(e) {
        if (e.readyState === EventSource.CLOSED) {
          o.onCompleted();
        } else {
          o.onError(e);
        }
      };
    }

    function createOnMessage(o) { return function onMessage(e) { o.onNext(e.data); }; }

    function EventSourceDisposable(s, errFn, msgFn) {
      this._s = s;
      this._errFn = errFn;
      this._msgFn = msgFn;
      this.isDisposed = false;
    }

    EventSourceDisposable.prototype.dispose = function () {
      if (!this.isDisposed) {
        this._s.removeEventListener('error', this._errFn, false);
        this._s.removeEventListener('message', this._msgFn, false);
        this._s.close();
      }
    };

    EventSourceObservable.prototype.subscribeCore = function (o) {
      var source = new EventSource(this._url);
      var onOpen = createOnOpen(this._open, source);
      var onError = createOnError(o);
      var onMessage = createOnMessage(o);

      this._open && source.addEventListener('open', onOpen, false);
      source.addEventListener('error', onError, false);
      source.addEventListener('message', onMessage, false);

      return new EventSourceDisposable(source, onError, onMessage);
    };

    return EventSourceObservable;
  }(ObservableBase));

  /**
   * This method wraps an EventSource as an observable sequence.
   * @param {String} url The url of the server-side script.
   * @param {Observer} [openObserver] An optional observer for the 'open' event for the server side event.
   * @returns {Observable} An observable sequence which represents the data from a server-side event.
   */
  dom.fromEventSource = function (url, openObserver) {
    if (!root.EventSource) { throw new TypeError('EventSource not implemented in your runtime.'); }
    return new EventSourceObservable(url, openObserver);
  };

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
    var RequestAnimationFrameScheduler = (function (__super__) {
      inherits(RequestAnimationFrameScheduler, __super__);
      function RequestAnimationFrameScheduler() {
        __super__.call(this);
      }

      function scheduleAction(disposable, action, scheduler, state) {
        return function schedule() {
          !disposable.isDisposed && disposable.setDisposable(Disposable._fixup(action(scheduler, state)));
        };
      }

      function ClearDisposable(method, id) {
        this._id = id;
        this._method = method;
        this.isDisposed = false;
      }

      ClearDisposable.prototype.dispose = function () {
        if (!this.isDisposed) {
          this.isDisposed = true;
          this._method.call(null, this._id);
        }
      };

      RequestAnimationFrameScheduler.prototype.schedule = function (state, action) {
        var disposable = new SingleAssignmentDisposable(),
            id = requestAnimFrame(scheduleAction(disposable, action, this, state));
        return new BinaryDisposable(disposable, new ClearDisposable(cancelAnimFrame, id));
      };

      RequestAnimationFrameScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
        if (dueTime === 0) { return this.schedule(state, action); }
        var disposable = new SingleAssignmentDisposable(),
            id = root.setTimeout(scheduleAction(disposable, action, this, state), dueTime);
        return new BinaryDisposable(disposable, new ClearDisposable(root.clearTimeout, id));
      };

      return RequestAnimationFrameScheduler;
    }(Scheduler));

    return new RequestAnimationFrameScheduler();
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

      var element = root.document.createElement('div');
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
        root.setImmediate(function () { runTask(id); });

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
        tasksByHandle[id] = action;
        root.postMessage(MSG_PREFIX + id, '*');
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

    var MicroTaskScheduler = (function (__super__) {
      inherits(MicroTaskScheduler, __super__);
      function MicroTaskScheduler() {
        __super__.call(this);
      }

      function scheduleAction(disposable, action, scheduler, state) {
        return function schedule() {
          !disposable.isDisposed && disposable.setDisposable(Disposable._fixup(action(scheduler, state)));
        };
      }

      function ClearDisposable(method, id) {
        this._id = id;
        this._method = method;
        this.isDisposed = false;
      }

      ClearDisposable.prototype.dispose = function () {
        if (!this.isDisposed) {
          this.isDisposed = true;
          this._method.call(null, this._id);
        }
      };

      MicroTaskScheduler.prototype.schedule = function (state, action) {
        var disposable = new SingleAssignmentDisposable(),
            id = scheduleMethod(scheduleAction(disposable, action, this, state));
        return new BinaryDisposable(disposable, new ClearDisposable(clearMethod, id));
      };

      MicroTaskScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
        if (dueTime === 0) { return this.schedule(state, action); }
        var disposable = new SingleAssignmentDisposable(),
            id = root.setTimeout(scheduleAction(disposable, action, this, state), dueTime);
        return new BinaryDisposable(disposable, new ClearDisposable(root.clearTimeout, id));
      };

      return MicroTaskScheduler;
    }(Scheduler));

    return new MicroTaskScheduler();
  }());

  return Rx;
}));