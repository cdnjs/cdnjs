/*
Copyright 2014, modulex-io@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 06:48:57 GMT
*/
modulex.add("io", ["util","dom","querystring","event-custom","promise","url","ua","event-dom"], function(require, exports, module) {
var _util_ = require("util");
var dom = require("dom");
var _querystring_ = require("querystring");
var eventCustom = require("event-custom");
var promise = require("promise");
var _url_ = require("url");
var ua = require("ua");
var eventDom = require("event-dom");
/*
combined modules:
io
io/form-serializer
io/base
io/xhr-transport
io/xhr-transport-base
io/xdr-flash-transport
io/sub-domain-transport
io/script-transport
io/jsonp
io/form
io/iframe-transport
io/methods
*/
var ioFormSerializer, ioBase, ioXhrTransportBase, ioXdrFlashTransport, ioSubDomainTransport, ioScriptTransport, ioJsonp, ioForm, ioIframeTransport, ioMethods, ioXhrTransport, _io_;
ioFormSerializer = function (exports) {
  /**
   * @ignore
   * form data  serialization util
   * @author yiminghe@gmail.com
   */
  var util = _util_;
  var Dom = dom;
  var querystring = _querystring_;
  var rselectTextarea = /^(?:select|textarea)/i, rCRLF = /\r?\n/g, FormSerializer, rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
  function normalizeCRLF(v) {
    return v.replace(rCRLF, '\r\n');
  }
  FormSerializer = {
    /**
     * form serialization
     * @method
     * @param {HTMLElement[]|HTMLElement|Node} forms form elements
     * @return {String} serialized string represent form elements
     * @param {Boolean}[serializeArray=false] See {@link KISSY#method-param} 同名参数
     * @member IO
     * @static
     */
    serialize: function (forms, serializeArray) {
      // 名值键值对序列化,数组元素名字前不加 []
      return querystring.stringify(FormSerializer.getFormData(forms), undefined, undefined, serializeArray || false);
    },
    getFormData: function (forms) {
      var elements = [], data = {};
      util.each(Dom.query(forms), function (el) {
        // form 取其表单元素集合
        // 其他直接取自身
        var subs = el.elements ? elementsToArray(el.elements) : [el];
        elements.push.apply(elements, subs);
      });
      // 对表单元素进行过滤，具备有效值的才保留
      elements = util.filter(elements, function (el) {
        // 有名字
        return el.name && // 不被禁用
        !el.disabled && // radio,checkbox 被选择了
        (el.checked || // select 或者 textarea
        rselectTextarea.test(el.nodeName) || // input 类型
        rinput.test(el.type));
      });
      util.each(elements, function (el) {
        var val = Dom.val(el), vs;
        // <select></select> select nothing!
        // #297
        if (val === null) {
          return;
        }
        // 字符串换行平台归一化
        if (util.isArray(val)) {
          val = util.map(val, normalizeCRLF);
        } else {
          val = normalizeCRLF(val);
        }
        vs = data[el.name];
        if (vs === undefined) {
          data[el.name] = val;
          return;
        }
        if (!util.isArray(vs)) {
          // 多个元素重名时搞成数组
          vs = data[el.name] = [vs];
        }
        vs.push.apply(vs, util.makeArray(val));
      });
      return data;
    }
  };
  // do not pass form.elements to S.makeArray ie678 bug
  function elementsToArray(elements) {
    var ret = [];
    for (var i = 0; i < elements.length; i++) {
      ret.push(elements[i]);
    }
    return ret;
  }
  exports = FormSerializer;
  return exports;
}();
ioBase = function (exports) {
  /**
   * @ignore
   * a scalable client io framework
   * @author yiminghe@gmail.com
   */
  var util = _util_;
  var querystring = _querystring_;
  /*global CustomEvent:true*/
  var CustomEvent = eventCustom;
  var XPromise = promise;
  var url = _url_;
  var rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/, rspace = /\s+/, mirror = function (s) {
      return s;
    }, rnoContent = /^(?:GET|HEAD)$/, locationHref = location.href, locationUrl = url.parse(locationHref), isLocal = rlocalProtocol.test(locationUrl.protocol), transports = {}, defaultConfig = {
      type: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async: true,
      serializeArray: true,
      processData: true,
      accepts: {
        xml: 'application/xml, text/xml',
        html: 'text/html',
        text: 'text/plain',
        json: 'application/json, text/javascript',
        '*': '*/*'
      },
      converters: {
        text: {
          json: util.parseJson,
          html: mirror,
          text: mirror,
          xml: util.parseXML
        }
      },
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      }
    };
  defaultConfig.converters.html = defaultConfig.converters.text;
  function setUpConfig(c) {
    // deep mix,exclude context!
    var context = c.context;
    delete c.context;
    c = util.mix(util.clone(defaultConfig), c, { deep: true });
    c.context = context || c;
    var data, uri, type = c.type, dataType = c.dataType;
    uri = c.uri = url.parse(url.resolve(locationHref, c.url), true);
    // see method _getUrlForSend
    uri.query = {};
    if (!('crossDomain' in c)) {
      c.crossDomain = !(uri.protocol === locationUrl.protocol && uri.host === locationUrl.host);
    }
    type = c.type = type.toUpperCase();
    c.hasContent = !rnoContent.test(type);
    if (c.processData && (data = c.data) && typeof data !== 'string') {
      // normalize to string
      c.data = querystring.stringify(data, undefined, undefined, c.serializeArray);
    }
    // 数据类型处理链，一步步将前面的数据类型转化成最后一个
    dataType = c.dataType = util.trim(dataType || '*').split(rspace);
    if (!('cache' in c) && util.inArray(dataType[0], [
        'script',
        'jsonp'
      ])) {
      c.cache = false;
    }
    if (!c.hasContent) {
      if (c.data) {
        util.mix(uri.query, querystring.parse(c.data));
      }
      if (c.cache === false) {
        uri.query._ksTS = util.now() + '_' + util.guid();
      }
    }
    return c;
  }
  /**
   * Return a io object and send request by config.
   *
   * @class IO
   * @extends Promise
   *
   * @cfg {String} url
   * request destination
   *
   * @cfg {String} type request type.
   * eg: 'get','post'
   * Default to: 'get'
   *
   * @cfg {String} contentType
   * Default to: 'application/x-www-form-urlencoded; charset=UTF-8'
   * Data will always be transmitted to the server using UTF-8 charset
   *
   * @cfg {Object} accepts
   * Default to: depends on DataType.
   * The content type sent in request header that tells the server
   * what kind of response it will accept in return.
   * It is recommended to do so once in the {@link IO#method-setupConfig}
   *
   * @cfg {Boolean} async
   * Default to: true
   * whether request is sent asynchronously
   *
   * @cfg {Boolean} cache
   * Default to: true ,false for dataType 'script' and 'jsonp'
   * if set false,will append _ksTs=Date.now() to url automatically
   *
   * @cfg {Object} contents
   * a name-regexp map to determine request data's dataType
   * It is recommended to do so once in the {@link IO#method-setupConfig}
   *
   * @cfg {Object} context
   * specify the context of this request 's callback (success,error,complete)
   *
   * @cfg {Object} converters
   * Default to: {text:{json:Json.parse,html:mirror,text:mirror,xml:parseXML}}
   * specified how to transform one dataType to another dataType
   * It is recommended to do so once in the {@link IO#method-setupConfig}
   *
   * @cfg {Boolean} crossDomain
   * Default to: false for same-domain request,true for cross-domain request
   * if server-side jsonp redirect to another domain, you should set this to true.
   * if you want use script for jsonp for same domain request, you should set this to true.
   *
   * @cfg {Object} data
   * Data sent to server.if processData is true,data will be serialized to String type.
   * if value if an Array, serialization will be based on serializeArray.
   *
   * @cfg {String} dataType
   * return data as a specified type
   * Default to: Based on server contentType header
   * 'xml' : a XML document
   * 'text'/'html': raw server data
   * 'script': evaluate the return data as script
   * 'json': parse the return data as json and return the result as final data
   * 'jsonp': load json data via jsonp
   *
   * @cfg {Object} headers
   * additional name-value header to send along with this request.
   *
   * @cfg {String} jsonp
   * Default to: 'callback'
   * Override the callback function name in a jsonp request. eg:
   * set 'callback2' , then jsonp url will append  'callback2=?'.
   *
   * @cfg {String} jsonpCallback
   * Specify the callback function name for a jsonp request.
   * set this value will replace the auto generated function name.
   * eg:
   * set 'customCall' , then jsonp url will append 'callback=customCall'
   *
   * @cfg {String} mimeType
   * override xhr 's mime type
   *
   * @cfg {String} ifModified
   * whether enter if modified mode.
   * Defaults to false.
   *
   * @cfg {Boolean} processData
   * Default to: true
   * whether data will be serialized as String
   *
   * @cfg {String} scriptCharset
   * only for dataType 'jsonp' and 'script' and 'get' type.
   * force the script to certain charset.
   *
   * @cfg {Function} beforeSend
   * beforeSend(io,config)
   * callback function called before the request is sent.this function has 2 arguments
   *
   * 1. current KISSY io object
   *
   * 2. current io config
   *
   * note: can be used for add progress event listener for native xhr's upload attribute
   * see <a href='http://www.w3.org/TR/XMLHttpRequest/#event-xhr-progress'>XMLHttpRequest2</a>
   *
   * @cfg {Function} success
   * success(data,textStatus,xhr)
   * callback function called if the request succeeds.this function has 3 arguments
   *
   * 1. data returned from this request with type specified by dataType
   *
   * 2. status of this request with type String
   *
   * 3. io object of this request , for details {@link IO}
   *
   * @cfg {Function} error
   * success(data,textStatus,xhr)
   * callback function called if the request occurs error.this function has 3 arguments
   *
   * 1. null value
   *
   * 2. status of this request with type String,such as 'timeout','Not Found','parsererror:...'
   *
   * 3. io object of this request , for details {@link IO}
   *
   * @cfg {Function} complete
   * success(data,textStatus,xhr)
   * callback function called if the request finished(success or error).this function has 3 arguments
   *
   * 1. null value if error occurs or data returned from server
   *
   * 2. status of this request with type String,such as success:'ok',
   * error:'timeout','Not Found','parsererror:...'
   *
   * 3. io object of this request , for details {@link IO}
   *
   * @cfg {Number} timeout
   * Set a timeout(in seconds) for this request.if will call error when timeout
   *
   * @cfg {Boolean} serializeArray
   * whether add [] to data's name when data's value is array in serialization
   *
   * @cfg {Object} xhrFields
   * name-value to set to native xhr.set as xhrFields:{withCredentials:true}
   * note: withCredentials defaults to true.
   *
   * @cfg {String} username
   * a username tobe used in response to HTTP access authentication request
   *
   * @cfg {String} password
   * a password tobe used in response to HTTP access authentication request
   *
   * @cfg {Object} xdr
   * cross domain request config object, contains sub config:
   *
   * xdr.src
   * Default to: KISSY 's flash url
   * flash sender url
   *
   * xdr.use
   * if set to 'use', it will always use flash for cross domain request even in chrome/firefox
   *
   * xdr.subDomain
   * cross sub domain request config object
   *
   * xdr.subDomain.proxy
   * proxy page, eg:
   * a.t.cn/a.htm send request to b.t.cn/b.htm:
   *
   * 1. a.htm set <code> document.domain='t.cn' </code>
   *
   * 2. b.t.cn/proxy.htm 's content is <code> &lt;script>document.domain='t.cn'&lt;/script> </code>
   *
   * 3. in a.htm , call <code> IO({xdr:{subDomain:{proxy:'/proxy.htm'}}}) </code>
   *
   */
  function IO(c) {
    var self = this;
    if (!(self instanceof IO)) {
      return new IO(c);
    }
    // Promise.call(self);
    IO.superclass.constructor.call(self);
    XPromise.Defer(self);
    self.userConfig = c;
    c = setUpConfig(c);
    util.mix(self, {
      // 结构化数据，如 json
      responseData: null,
      /**
       * config of current IO instance.
       * @member IO
       * @property config
       * @type Object
       */
      config: c || {},
      timeoutTimer: null,
      /**
       * String typed data returned from server
       * @type String
       */
      responseText: null,
      /**
       * xml typed data returned from server
       * @type String
       */
      responseXML: null,
      responseHeadersString: '',
      responseHeaders: null,
      requestHeaders: {},
      /**
       * readyState of current request
       * 0: initialized
       * 1: send
       * 4: completed
       * @type Number
       */
      readyState: 0,
      state: 0,
      /**
       * HTTP statusText of current request
       * @type String
       */
      statusText: null,
      /**
       * HTTP Status Code of current request
       * eg:
       * 200: ok
       * 404: Not Found
       * 500: Server Error
       * @type String
       */
      status: 0,
      transport: null
    });
    var TransportConstructor, transport;
    /**
     * fired before generating request object
     * @event start
     * @member IO
     * @static
     * @param {Event.CustomEvent.Object} e
     * @param {IO} e.io current io
     */
    IO.fire('start', {
      // 兼容
      ajaxConfig: c,
      io: self
    });
    TransportConstructor = transports[c.dataType[0]] || transports['*'];
    transport = new TransportConstructor(self);
    self.transport = transport;
    if (c.contentType) {
      self.setRequestHeader('Content-Type', c.contentType);
    }
    var dataType = c.dataType[0], i, timeout = c.timeout, context = c.context, headers = c.headers, accepts = c.accepts;
    // Set the Accepts header for the server, depending on the dataType
    self.setRequestHeader('Accept', dataType && accepts[dataType] ? accepts[dataType] + (dataType === '*' ? '' : ', */*; q=0.01') : accepts['*']);
    // Check for headers option
    for (i in headers) {
      self.setRequestHeader(i, headers[i]);
    }
    // allow setup native listener
    // such as xhr.upload.addEventListener('progress', function (ev) {})
    if (c.beforeSend && c.beforeSend.call(context, self, c) === false) {
      return self;
    }
    self.readyState = 1;
    /**
     * fired before sending request
     * @event send
     * @member IO
     * @static
     * @param {Event.CustomEvent.Object} e
     * @param {IO} e.io current io
     */
    IO.fire('send', {
      // 兼容
      ajaxConfig: c,
      io: self
    });
    // Timeout
    if (c.async && timeout > 0) {
      self.timeoutTimer = setTimeout(function () {
        self.abort('timeout');
      }, timeout * 1000);
    }
    try {
      // flag as sending
      self.state = 1;
      transport.send();
    } catch (e) {
      if ('@DEBUG@') {
        console.error(e.stack || e);
        setTimeout(function () {
          throw e;
        }, 0);
      }
      // Propagate exception as error if not done
      if (self.state < 2) {
        self._ioReady(0 - 1, e.message || 'send error');
      }
    }
    return self;
  }
  util.mix(IO, CustomEvent.Target);
  util.mix(IO, {
    /**
     * whether current application is a local application
     * (protocal is file://,widget://,about://)
     * @type {Boolean}
     * @member IO
     * @static
     */
    isLocal: isLocal,
    /**
     * name-value object that set default config value for io class
     * @param {Object} setting
     * @member IO
     * @static
     */
    setupConfig: function (setting) {
      util.mix(defaultConfig, setting, { deep: true });
    },
    /**
     * @private
     * @member IO
     * @static
     */
    setupTransport: function (name, fn) {
      transports[name] = fn;
    },
    /**
     * @private
     * @member IO
     * @static
     */
    getTransport: function (name) {
      return transports[name];
    },
    /**
     * get default config value for io request
     * @return {Object}
     * @member IO
     * @static
     */
    getConfig: function () {
      return defaultConfig;
    }
  });
  exports = IO;
  return exports;
}();
ioXhrTransportBase = function (exports) {
  var util = _util_;
  var url = _url_;
  var querystring = _querystring_;
  var IO = ioBase;
  var UA = ua;
  var OK_CODE = 200, supportCORS, win = window, XDomainRequest_ = UA.ieMode > 7 && win.XDomainRequest, NO_CONTENT_CODE = 204, NOT_FOUND_CODE = 404, NO_CONTENT_CODE2 = 1223, XhrTransportBase = { proto: {} }, lastModifiedCached = {}, eTagCached = {};
  IO.__lastModifiedCached = lastModifiedCached;
  IO.__eTagCached = eTagCached;
  XhrTransportBase.nativeXhr = win.ActiveXObject ? function (crossDomain, refWin) {
    if (!supportCORS && crossDomain && XDomainRequest_) {
      return new XDomainRequest_();
    }
    return !IO.isLocal && createStandardXHR(crossDomain, refWin) || createActiveXHR(crossDomain, refWin);
  } : createStandardXHR;
  supportCORS = XhrTransportBase.supportCORS = 'withCredentials' in XhrTransportBase.nativeXhr();
  function createStandardXHR(_, refWin) {
    try {
      return new (refWin || win).XMLHttpRequest();
    } catch (e) {
    }
    return undefined;
  }
  function createActiveXHR(_, refWin) {
    try {
      return new (refWin || win).ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {
    }
    return undefined;
  }
  XhrTransportBase.XDomainRequest_ = XDomainRequest_;
  function isInstanceOfXDomainRequest(xhr) {
    return XDomainRequest_ && xhr instanceof XDomainRequest_;
  }
  function getIfModifiedKey(c) {
    var ifModified = c.ifModified, ifModifiedKey;
    if (ifModified) {
      ifModifiedKey = c.uri;
      if (c.cache === false) {
        ifModifiedKey = util.clone(ifModifiedKey);
        delete ifModifiedKey.query._ksTS;
      }
      ifModifiedKey = url.stringify(ifModifiedKey);
    }
    return ifModifiedKey;
  }
  util.mix(XhrTransportBase.proto, {
    sendInternal: function () {
      var self = this, io = self.io, c = io.config, nativeXhr = self.nativeXhr, files = c.files, type = files ? 'post' : c.type, async = c.async, username, mimeType = io.mimeType, requestHeaders = io.requestHeaders || {}, url = io._getUrlForSend(), xhrFields, ifModifiedKey = getIfModifiedKey(c), cacheValue, i;
      if (ifModifiedKey) {
        if (cacheValue = lastModifiedCached[ifModifiedKey]) {
          requestHeaders['If-Modified-Since'] = cacheValue;
        }
        if (cacheValue = eTagCached[ifModifiedKey]) {
          requestHeaders['If-None-Match'] = cacheValue;
        }
      }
      if (username = c.username) {
        nativeXhr.open(type, url, async, username, c.password);
      } else {
        nativeXhr.open(type, url, async);
      }
      xhrFields = c.xhrFields || {};
      if ('withCredentials' in xhrFields) {
        if (!supportCORS) {
          delete xhrFields.withCredentials;
        }
      }
      for (i in xhrFields) {
        try {
          nativeXhr[i] = xhrFields[i];
        } catch (e) {
        }
      }
      if (mimeType && nativeXhr.overrideMimeType) {
        nativeXhr.overrideMimeType(mimeType);
      }
      var xRequestHeader = requestHeaders['X-Requested-With'];
      if (xRequestHeader === false) {
        delete requestHeaders['X-Requested-With'];
      }
      if (typeof nativeXhr.setRequestHeader !== 'undefined') {
        for (i in requestHeaders) {
          nativeXhr.setRequestHeader(i, requestHeaders[i]);
        }
      }
      var sendContent = c.hasContent && c.data || null;
      if (files) {
        var originalSentContent = sendContent, data = {};
        if (originalSentContent) {
          data = querystring.parse(originalSentContent);
        }
        data = util.mix(data, files);
        sendContent = new FormData();
        util.each(data, function (vs, k) {
          if (util.isArray(vs)) {
            util.each(vs, function (v) {
              sendContent.append(k + (c.serializeArray ? '[]' : ''), v);
            });
          } else {
            sendContent.append(k, vs);
          }
        });
      }
      nativeXhr.send(sendContent);
      if (!async || nativeXhr.readyState === 4) {
        self._callback();
      } else {
        if (isInstanceOfXDomainRequest(nativeXhr)) {
          nativeXhr.onload = function () {
            nativeXhr.readyState = 4;
            nativeXhr.status = 200;
            self._callback();
          };
          nativeXhr.onerror = function () {
            nativeXhr.readyState = 4;
            nativeXhr.status = 500;
            self._callback();
          };
        } else {
          nativeXhr.onreadystatechange = function () {
            self._callback();
          };
        }
      }
    },
    abort: function () {
      this._callback(0, 1);
    },
    _callback: function (event, abort) {
      var self = this, nativeXhr = self.nativeXhr, io = self.io, ifModifiedKey, lastModified, eTag, statusText, xml, c = io.config;
      try {
        if (abort || nativeXhr.readyState === 4) {
          if (isInstanceOfXDomainRequest(nativeXhr)) {
            nativeXhr.onerror = util.noop;
            nativeXhr.onload = util.noop;
          } else {
            nativeXhr.onreadystatechange = util.noop;
          }
          if (abort) {
            if (nativeXhr.readyState !== 4) {
              nativeXhr.abort();
            }
          } else {
            ifModifiedKey = getIfModifiedKey(c);
            var status = nativeXhr.status;
            if (!isInstanceOfXDomainRequest(nativeXhr)) {
              io.responseHeadersString = nativeXhr.getAllResponseHeaders();
            }
            if (ifModifiedKey) {
              lastModified = nativeXhr.getResponseHeader('Last-Modified');
              eTag = nativeXhr.getResponseHeader('ETag');
              if (lastModified) {
                lastModifiedCached[ifModifiedKey] = lastModified;
              }
              if (eTag) {
                eTagCached[eTag] = eTag;
              }
            }
            xml = nativeXhr.responseXML;
            if (xml && xml.documentElement) {
              io.responseXML = xml;
            }
            var text = io.responseText = nativeXhr.responseText;
            if (c.files && text) {
              var bodyIndex, lastBodyIndex;
              if ((bodyIndex = text.indexOf('<body>')) !== -1) {
                lastBodyIndex = text.lastIndexOf('</body>');
                if (lastBodyIndex === -1) {
                  lastBodyIndex = text.length;
                }
                text = text.slice(bodyIndex + 6, lastBodyIndex);
              }
              io.responseText = util.unEscapeHtml(text);
            }
            try {
              statusText = nativeXhr.statusText;
            } catch (e) {
              statusText = '';
            }
            if (!status && IO.isLocal && !c.crossDomain) {
              status = io.responseText ? OK_CODE : NOT_FOUND_CODE;
            } else if (status === NO_CONTENT_CODE2) {
              status = NO_CONTENT_CODE;
            }
            io._ioReady(status, statusText);
          }
        }
      } catch (e) {
        if ('@DEBUG@') {
          console.error(e.stack || e);
          setTimeout(function () {
            throw e;
          }, 0);
        }
        nativeXhr.onreadystatechange = util.noop;
        if (!abort) {
          io._ioReady(0 - 1, e.message || 'process error');
        }
      }
    }
  });
  exports = XhrTransportBase;
  return exports;
}();
ioXdrFlashTransport = function (exports) {
  var util = _util_;
  var IO = ioBase, Dom = dom;
  var maps = {}, ID = 'io_swf', flash, doc = document, init = false;
  var ioName = util.guid('IO' + +new Date());
  window[ioName] = IO;
  function _swf(uri, _, uid) {
    if (init) {
      return;
    }
    init = true;
    var o = '<object id="' + ID + '" type="application/x-shockwave-flash" data="' + uri + '" width="0" height="0">' + '<param name="movie" value="' + uri + '" />' + '<param name="FlashVars" value="yid=' + _ + '&uid=' + uid + '&host=' + ioName + '" />' + '<param name="allowScriptAccess" value="always" />' + '</object>', c = doc.createElement('div');
    Dom.prepend(c, doc.body || doc.documentElement);
    c.innerHTML = o;
  }
  function XdrFlashTransport(io) {
    this.io = io;
  }
  util.augment(XdrFlashTransport, {
    send: function () {
      var self = this, io = self.io, c = io.config, xdr = c.xdr || {};
      if (!xdr.src) {
        xdr.src = IO._swf;
      }
      _swf(xdr.src, 1, 1);
      if (!flash) {
        setTimeout(function () {
          self.send();
        }, 200);
        return;
      }
      self._uid = util.guid();
      maps[self._uid] = self;
      flash.send(io._getUrlForSend(), {
        id: self._uid,
        uid: self._uid,
        method: c.type,
        data: c.hasContent && c.data || {}
      });
    },
    abort: function () {
      flash.abort(this._uid);
    },
    _xdrResponse: function (e, o) {
      var self = this, ret, id = o.id, responseText, c = o.c, io = self.io;
      if (c && (responseText = c.responseText)) {
        io.responseText = decodeURI(responseText);
      }
      switch (e) {
      case 'success':
        ret = {
          status: 200,
          statusText: 'success'
        };
        delete maps[id];
        break;
      case 'abort':
        delete maps[id];
        break;
      case 'timeout':
      case 'transport error':
      case 'failure':
        delete maps[id];
        ret = {
          status: 'status' in c ? c.status : 500,
          statusText: c.statusText || e
        };
        break;
      }
      if (ret) {
        io._ioReady(ret.status, ret.statusText);
      }
    }
  });
  IO.applyTo = function (_, cmd, args) {
    var cmds = cmd.split('.').slice(1), func = IO;
    util.each(cmds, function (c) {
      func = func[c];
    });
    func.apply(null, args);
  };
  IO.xdrReady = function () {
    flash = doc.getElementById(ID);
  };
  IO.xdrResponse = function (e, o) {
    var xhr = maps[o.uid];
    if (xhr) {
      xhr._xdrResponse(e, o);
    }
  };
  exports = XdrFlashTransport;
  return exports;
}();
ioSubDomainTransport = function (exports) {
  var util = _util_;
  var DomEvent = eventDom, url = _url_, Dom = dom, XhrTransportBase = ioXhrTransportBase;
  var PROXY_PAGE = '/sub_domain_proxy.html', doc = document, iframeMap = {};
  function SubDomainTransport(io) {
    var self = this, c = io.config;
    self.io = io;
    c.crossDomain = false;
  }
  util.augment(SubDomainTransport, XhrTransportBase.proto, {
    send: function () {
      var self = this, c = self.io.config, uri = c.uri, hostname = uri.hostname, iframe, iframeUri, iframeDesc = iframeMap[hostname];
      var proxy = PROXY_PAGE;
      if (c.xdr && c.xdr.subDomain && c.xdr.subDomain.proxy) {
        proxy = c.xdr.subDomain.proxy;
      }
      if (iframeDesc && iframeDesc.ready) {
        self.nativeXhr = XhrTransportBase.nativeXhr(0, iframeDesc.iframe.contentWindow);
        if (self.nativeXhr) {
          self.sendInternal();
        } else {
          console.error('io: document.domain not set correctly!');
        }
        return;
      }
      if (!iframeDesc) {
        iframeDesc = iframeMap[hostname] = {};
        iframe = iframeDesc.iframe = doc.createElement('iframe');
        Dom.css(iframe, {
          position: 'absolute',
          left: '-9999px',
          top: '-9999px'
        });
        Dom.prepend(iframe, doc.body || doc.documentElement);
        iframeUri = {};
        iframeUri.protocol = uri.protocol;
        iframeUri.host = uri.host;
        iframeUri.pathname = proxy;
        iframe.src = url.stringify(iframeUri);
      } else {
        iframe = iframeDesc.iframe;
      }
      DomEvent.on(iframe, 'load', _onLoad, self);
    }
  });
  function _onLoad() {
    var self = this, c = self.io.config, uri = c.uri, hostname = uri.hostname, iframeDesc = iframeMap[hostname];
    iframeDesc.ready = 1;
    DomEvent.detach(iframeDesc.iframe, 'load', _onLoad, self);
    self.send();
  }
  exports = SubDomainTransport;
  return exports;
}();
ioScriptTransport = function (exports) {
  var util = _util_;
  var IO = ioBase;
  var OK_CODE = 200, ERROR_CODE = 500;
  IO.setupConfig({
    accepts: { script: 'text/javascript, ' + 'application/javascript, ' + 'application/ecmascript, ' + 'application/x-ecmascript' },
    contents: { script: /javascript|ecmascript/ },
    converters: {
      text: {
        script: function (text) {
          util.globalEval(text);
          return text;
        }
      }
    }
  });
  function ScriptTransport(io) {
    var config = io.config, self = this;
    if (!config.crossDomain) {
      return new (IO.getTransport('*'))(io);
    }
    self.io = io;
    return self;
  }
  util.augment(ScriptTransport, {
    send: function () {
      var self = this, io = self.io, c = io.config;
      self.script = require.load(io._getUrlForSend(), {
        charset: c.scriptCharset,
        success: function () {
          self._callback('success');
        },
        error: function () {
          self._callback('error');
        }
      });
    },
    _callback: function (event, abort) {
      var self = this, script = self.script, io = self.io;
      if (!script) {
        return;
      }
      self.script = undefined;
      if (abort) {
        return;
      }
      if (event !== 'error') {
        io._ioReady(OK_CODE, 'success');
      } else if (event === 'error') {
        io._ioReady(ERROR_CODE, 'script error');
      }
    },
    abort: function () {
      this._callback(0, 1);
    }
  });
  IO.setupTransport('script', ScriptTransport);
  return exports;
}();
ioJsonp = function (exports) {
  var util = _util_;
  var IO = ioBase;
  var win = window;
  IO.setupConfig({
    jsonp: 'callback',
    jsonpCallback: function () {
      return util.guid('jsonp');
    }
  });
  IO.on('start', function (e) {
    var io = e.io, c = io.config, dataType = c.dataType;
    if (dataType[0] === 'jsonp') {
      delete c.contentType;
      var response, cJsonpCallback = c.jsonpCallback, converters, jsonpCallback = typeof cJsonpCallback === 'function' ? cJsonpCallback() : cJsonpCallback, previous = win[jsonpCallback];
      c.uri.query[c.jsonp] = jsonpCallback;
      win[jsonpCallback] = function (r) {
        if (arguments.length > 1) {
          r = util.makeArray(arguments);
        }
        response = [r];
      };
      io.fin(function () {
        win[jsonpCallback] = previous;
        if (previous === undefined) {
          try {
            delete win[jsonpCallback];
          } catch (e) {
          }
        } else if (response) {
          previous(response[0]);
        }
      });
      converters = c.converters;
      converters.script = converters.script || {};
      converters.script.json = function () {
        if (!response) {
          throw new Error('not call jsonpCallback: ' + jsonpCallback);
        }
        return response[0];
      };
      dataType.length = 2;
      dataType[0] = 'script';
      dataType[1] = 'json';
    }
  });
  return exports;
}();
ioForm = function (exports) {
  var util = _util_;
  var IO = ioBase;
  var Dom = dom;
  var querystring = _querystring_;
  var FormSerializer = ioFormSerializer;
  var win = window, slice = Array.prototype.slice, FormData = win.FormData;
  IO.on('start', function (e) {
    var io = e.io, form, d, dataType, formParam, data, c = io.config, tmpForm = c.form;
    if (tmpForm) {
      form = Dom.get(tmpForm);
      data = c.data;
      var isUpload = false;
      var files = {};
      var inputs = Dom.query('input', form);
      for (var i = 0, l = inputs.length; i < l; i++) {
        var input = inputs[i];
        if (input.type.toLowerCase() === 'file') {
          isUpload = true;
          if (!FormData) {
            break;
          }
          var selected = slice.call(input.files, 0);
          files[Dom.attr(input, 'name')] = selected.length > 1 ? selected : selected[0] || null;
        }
      }
      if (isUpload && FormData) {
        c.files = c.files || {};
        util.mix(c.files, files);
        delete c.contentType;
      }
      if (!isUpload || FormData) {
        formParam = FormSerializer.getFormData(form);
        if (c.hasContent) {
          formParam = querystring.stringify(formParam, undefined, undefined, c.serializeArray);
          if (data) {
            c.data += '&' + formParam;
          } else {
            c.data = formParam;
          }
        } else {
          util.mix(c.uri.query, formParam);
        }
      } else {
        dataType = c.dataType;
        d = dataType[0];
        if (d === '*') {
          d = 'text';
        }
        dataType.length = 2;
        dataType[0] = 'iframe';
        dataType[1] = d;
      }
    }
  });
  return exports;
}();
ioIframeTransport = function (exports) {
  var util = _util_, querystring = _querystring_, Dom = dom, IO = ioBase;
  var DomEvent = eventDom;
  var UA = ua;
  var doc = document, OK_CODE = 200, ERROR_CODE = 500, BREATH_INTERVAL = 30, iframeConverter = util.clone(IO.getConfig().converters.text);
  iframeConverter.json = function (str) {
    return util.parseJson(util.unEscapeHtml(str));
  };
  IO.setupConfig({
    converters: {
      iframe: iframeConverter,
      text: {
        iframe: function (text) {
          return text;
        }
      },
      xml: {
        iframe: function (xml) {
          return xml;
        }
      }
    }
  });
  function createIframe(xhr) {
    var id = util.guid('io-iframe'), iframe, src = Dom.getEmptyIframeSrc();
    iframe = xhr.iframe = Dom.create('<iframe ' + (src ? ' src="' + src + '" ' : '') + ' id="' + id + '"' + ' name="' + id + '"' + ' style="position:absolute;left:-9999px;top:-9999px;"/>');
    Dom.prepend(iframe, doc.body || doc.documentElement);
    return iframe;
  }
  function addDataToForm(query, form, serializeArray) {
    var ret = [], isArray, i, e;
    util.each(query, function (data, k) {
      isArray = util.isArray(data);
      if (!isArray) {
        data = [data];
      }
      for (i = 0; i < data.length; i++) {
        e = doc.createElement('input');
        e.type = 'hidden';
        e.name = k + (isArray && serializeArray ? '[]' : '');
        e.value = data[i];
        Dom.append(e, form);
        ret.push(e);
      }
    });
    return ret;
  }
  function removeFieldsFromData(fields) {
    Dom.remove(fields);
  }
  function IframeTransport(io) {
    this.io = io;
  }
  util.augment(IframeTransport, {
    send: function () {
      var self = this, io = self.io, c = io.config, fields, iframe, query, data = c.data, form = Dom.get(c.form);
      self.attrs = {
        target: Dom.attr(form, 'target') || '',
        action: Dom.attr(form, 'action') || '',
        encoding: Dom.attr(form, 'encoding'),
        enctype: Dom.attr(form, 'enctype'),
        method: Dom.attr(form, 'method')
      };
      self.form = form;
      iframe = createIframe(io);
      Dom.attr(form, {
        target: iframe.id,
        action: io._getUrlForSend(),
        method: 'post',
        enctype: 'multipart/form-data',
        encoding: 'multipart/form-data'
      });
      if (data) {
        query = querystring.parse(data);
      }
      if (query) {
        fields = addDataToForm(query, form, c.serializeArray);
      }
      self.fields = fields;
      function go() {
        DomEvent.on(iframe, 'load error', self._callback, self);
        form.submit();
      }
      if (UA.ie === 6) {
        setTimeout(go, 0);
      } else {
        go();
      }
    },
    _callback: function (event) {
      var self = this, form = self.form, io = self.io, eventType = event.type, iframeDoc, iframe = io.iframe;
      if (!iframe) {
        return;
      }
      if (eventType === 'abort' && UA.ie === 6) {
        setTimeout(function () {
          Dom.attr(form, self.attrs);
        }, 0);
      } else {
        Dom.attr(form, self.attrs);
      }
      removeFieldsFromData(this.fields);
      DomEvent.detach(iframe);
      setTimeout(function () {
        Dom.remove(iframe);
      }, BREATH_INTERVAL);
      io.iframe = null;
      if (eventType === 'load') {
        try {
          iframeDoc = iframe.contentWindow.document;
          if (iframeDoc && iframeDoc.body) {
            io.responseText = Dom.html(iframeDoc.body);
            if (util.startsWith(io.responseText, '<?xml')) {
              io.responseText = undefined;
            }
          }
          if (iframeDoc && iframeDoc.XMLDocument) {
            io.responseXML = iframeDoc.XMLDocument;
          } else {
            io.responseXML = iframeDoc;
          }
          if (iframeDoc) {
            io._ioReady(OK_CODE, 'success');
          } else {
            io._ioReady(ERROR_CODE, 'parser error');
          }
        } catch (e) {
          io._ioReady(ERROR_CODE, 'parser error');
        }
      } else if (eventType === 'error') {
        io._ioReady(ERROR_CODE, 'error');
      }
    },
    abort: function () {
      this._callback({ type: 'abort' });
    }
  });
  IO.setupTransport('iframe', IframeTransport);
  return exports;
}();
ioMethods = function (exports) {
  var util = _util_;
  var XPromise = promise, IO = ioBase;
  var url = _url_;
  var OK_CODE = 200, MULTIPLE_CHOICES = 300, NOT_MODIFIED = 304, HEADER_REG = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm;
  function handleResponseData(io) {
    var text = io.responseText, xml = io.responseXML, c = io.config, converts = c.converters, type, contentType, responseData, contents = c.contents, dataType = c.dataType;
    if (text || xml) {
      contentType = io.mimeType || io.getResponseHeader('Content-Type');
      while (dataType[0] === '*') {
        dataType.shift();
      }
      if (!dataType.length) {
        for (type in contents) {
          if (contents[type].test(contentType)) {
            if (dataType[0] !== type) {
              dataType.unshift(type);
            }
            break;
          }
        }
      }
      dataType[0] = dataType[0] || 'text';
      for (var dataTypeIndex = 0; dataTypeIndex < dataType.length; dataTypeIndex++) {
        if (dataType[dataTypeIndex] === 'text' && text !== undefined) {
          responseData = text;
          break;
        } else if (dataType[dataTypeIndex] === 'xml' && xml !== undefined) {
          responseData = xml;
          break;
        }
      }
      if (!responseData) {
        var rawData = {
          text: text,
          xml: xml
        };
        util.each([
          'text',
          'xml'
        ], function (prevType) {
          var type = dataType[0], converter = converts[prevType] && converts[prevType][type];
          if (converter && rawData[prevType]) {
            dataType.unshift(prevType);
            responseData = prevType === 'text' ? text : xml;
            return false;
          }
          return undefined;
        });
      }
    }
    var prevType = dataType[0];
    for (var i = 1; i < dataType.length; i++) {
      type = dataType[i];
      var converter = converts[prevType] && converts[prevType][type];
      if (!converter) {
        throw new Error('no covert for ' + prevType + ' => ' + type);
      }
      responseData = converter(responseData);
      prevType = type;
    }
    io.responseData = responseData;
  }
  util.extend(IO, XPromise, {
    setRequestHeader: function (name, value) {
      var self = this;
      self.requestHeaders[name] = value;
      return self;
    },
    getAllResponseHeaders: function () {
      var self = this;
      return self.state === 2 ? self.responseHeadersString : null;
    },
    getResponseHeader: function (name) {
      var match, responseHeaders, self = this;
      name = name.toLowerCase();
      if (self.state === 2) {
        if (!(responseHeaders = self.responseHeaders)) {
          responseHeaders = self.responseHeaders = {};
          while (match = HEADER_REG.exec(self.responseHeadersString)) {
            responseHeaders[match[1].toLowerCase()] = match[2];
          }
        }
        match = responseHeaders[name];
      }
      return match === undefined ? null : match;
    },
    overrideMimeType: function (type) {
      var self = this;
      if (!self.state) {
        self.mimeType = type;
      }
      return self;
    },
    abort: function (statusText) {
      var self = this;
      statusText = statusText || 'abort';
      if (self.transport) {
        self.transport.abort(statusText);
      }
      self._ioReady(0, statusText);
      return self;
    },
    getNativeXhr: function () {
      var transport = this.transport;
      if (transport) {
        return transport.nativeXhr;
      }
      return null;
    },
    _ioReady: function (status, statusText) {
      var self = this;
      if (self.state === 2) {
        return;
      }
      self.state = 2;
      self.readyState = 4;
      var isSuccess;
      if (status >= OK_CODE && status < MULTIPLE_CHOICES || status === NOT_MODIFIED) {
        if (status === NOT_MODIFIED) {
          statusText = 'not modified';
          isSuccess = true;
        } else {
          try {
            handleResponseData(self);
            statusText = 'success';
            isSuccess = true;
          } catch (e) {
            if ('@DEBUG@') {
              console.error(e.stack || e);
              setTimeout(function () {
                throw e;
              }, 0);
            }
            statusText = e.message || 'parser error';
          }
        }
      } else {
        if (status < 0) {
          status = 0;
        }
      }
      self.status = status;
      self.statusText = statusText;
      var defer = self.defer, config = self.config, timeoutTimer;
      if (timeoutTimer = self.timeoutTimer) {
        clearTimeout(timeoutTimer);
        self.timeoutTimer = 0;
      }
      var handler = isSuccess ? 'success' : 'error', h, v = [
          self.responseData,
          statusText,
          self
        ], context = config.context, eventObject = {
          ajaxConfig: config,
          io: self
        };
      if (h = config[handler]) {
        h.apply(context, v);
      }
      if (h = config.complete) {
        h.apply(context, v);
      }
      IO.fire(handler, eventObject);
      IO.fire('complete', eventObject);
      defer[isSuccess ? 'resolve' : 'reject'](v);
    },
    _getUrlForSend: function () {
      var c = this.config, uri = c.uri;
      var search = uri.search || '';
      delete uri.search;
      if (search && !util.isEmptyObject(uri.query)) {
        search = '&' + search.substring(1);
      }
      return url.stringify(uri, c.serializeArray) + search;
    }
  });
  return exports;
}();
ioXhrTransport = function (exports) {
  var util = _util_;
  var IO = ioBase, XhrTransportBase = ioXhrTransportBase, XdrFlashTransport = ioXdrFlashTransport, SubDomainTransport = ioSubDomainTransport;
  var doc = document, XDomainRequest_ = XhrTransportBase.XDomainRequest_;
  function isSubDomain(hostname) {
    return doc.domain && util.endsWith(hostname, doc.domain);
  }
  function XhrTransport(io) {
    var c = io.config, crossDomain = c.crossDomain, self = this, xhr, xdrCfg = c.xdr || {}, subDomain = xdrCfg.subDomain = xdrCfg.subDomain || {};
    self.io = io;
    if (crossDomain && !XhrTransportBase.supportCORS) {
      if (isSubDomain(c.uri.hostname)) {
        if (subDomain.proxy !== false) {
          return new SubDomainTransport(io);
        }
      }
      if (String(xdrCfg.use) === 'flash' || !XDomainRequest_) {
        return new XdrFlashTransport(io);
      }
    }
    xhr = self.nativeXhr = XhrTransportBase.nativeXhr(crossDomain);
    return self;
  }
  util.augment(XhrTransport, XhrTransportBase.proto, {
    send: function () {
      this.sendInternal();
    }
  });
  IO.setupTransport('*', XhrTransport);
  return exports;
}();
_io_ = function (exports) {
  var serializer = ioFormSerializer;
  var IO = ioBase;
  var util = _util_;
  function get(url, data, callback, dataType, type) {
    if (typeof data === 'function') {
      dataType = callback;
      callback = data;
      data = undefined;
    }
    return IO({
      type: type || 'get',
      url: url,
      data: data,
      complete: callback,
      dataType: dataType
    });
  }
  util.mix(IO, {
    version: '1.0.1',
    _swf: require.toUrl('./io.swf'),
    serialize: serializer.serialize,
    getFormData: serializer.getFormData,
    get: get,
    post: function (url, data, callback, dataType) {
      if (typeof data === 'function') {
        dataType = callback;
        callback = data;
        data = undefined;
      }
      return get(url, data, callback, dataType, 'post');
    },
    jsonp: function (url, data, callback) {
      if (typeof data === 'function') {
        callback = data;
        data = undefined;
      }
      return get(url, data, callback, 'jsonp');
    },
    getScript: require.load,
    getJSON: function (url, data, callback) {
      if (typeof data === 'function') {
        callback = data;
        data = undefined;
      }
      return get(url, data, callback, 'json');
    },
    upload: function (url, form, data, callback, dataType) {
      if (typeof data === 'function') {
        dataType = callback;
        callback = data;
        data = undefined;
      }
      return IO({
        url: url,
        type: 'post',
        dataType: dataType,
        form: form,
        data: data,
        complete: callback
      });
    }
  });
  exports = IO;
  return exports;
}();
module.exports = _io_;
});