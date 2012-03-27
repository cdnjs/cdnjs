(function() {
  
/*!
  * Reqwest! A x-browser general purpose XHR connection manager
  * copyright Dustin Diaz 2011
  * https://github.com/ded/reqwest
  * license MIT
  */
!
function(context, win) {

    var twoHundo = /^20\d$/,
        doc = document,
        byTag = 'getElementsByTagName',
        contentType = 'Content-Type',
        head = doc[byTag]('head')[0],
        uniqid = 0,
        lastValue // data stored by the most recent JSONP callback
        , xhr = ('XMLHttpRequest' in win) ?
        function() {
            return new XMLHttpRequest()
        } : function() {
            return new ActiveXObject('Microsoft.XMLHTTP')
        }

        function readyState(o, success, error) {
            return function() {
                if (o && o.readyState == 4) {
                    if (twoHundo.test(o.status)) {
                        success(o)
                    } else {
                        error(o)
                    }
                }
            }
        }

        function setHeaders(http, o) {
            var headers = o.headers || {}
            headers.Accept = headers.Accept || 'text/javascript, text/html, application/xml, text/xml, */*'

            // breaks cross-origin requests with legacy browsers
            if (!o.crossOrigin) {
                headers['X-Requested-With'] = headers['X-Requested-With'] || 'XMLHttpRequest'
            }

            if (o.data) {
                headers[contentType] = headers[contentType] || 'application/x-www-form-urlencoded'
            }
            for (var h in headers) {
                headers.hasOwnProperty(h) && http.setRequestHeader(h, headers[h], false)
            }
        }

        function getCallbackName(o) {
            var callbackVar = o.jsonpCallback || "callback"
            if (o.url.slice(-(callbackVar.length + 2)) == (callbackVar + "=?")) {
                // Generate a guaranteed unique callback name
                var callbackName = "reqwest_" + uniqid++

                // Replace the ? in the URL with the generated name
                o.url = o.url.substr(0, o.url.length - 1) + callbackName
                return callbackName
            } else {
                // Find the supplied callback name
                var regex = new RegExp(callbackVar + "=([\\w]+)")
                return o.url.match(regex)[1]
            }
        }

        // Store the data returned by the most recent callback


        function generalCallback(data) {
            lastValue = data
        }

        function getRequest(o, fn, err) {
            function onload() {
                // Call the user callback with the last value stored
                // and clean up values and scripts.
                o.success && o.success(lastValue)
                lastValue = undefined
                head.removeChild(script);
            }
            if (o.type == 'jsonp') {
                var script = doc.createElement('script')

                // Add the global callback
                win[getCallbackName(o)] = generalCallback;

                // Setup our script element
                script.type = 'text/javascript'
                script.src = o.url
                script.async = true

                script.onload = onload
                // onload for IE
                script.onreadystatechange = function() {
                    /^loaded|complete$/.test(script.readyState) && onload()
                }

                // Add the script to the DOM head
                head.appendChild(script)
            } else {
                var http = xhr()
                http.open(o.method || 'GET', typeof o == 'string' ? o : o.url, true)
                setHeaders(http, o)
                http.onreadystatechange = readyState(http, fn, err)
                o.before && o.before(http)
                http.send(o.data || null)
                return http
            }
        }

        function Reqwest(o, fn) {
            this.o = o
            this.fn = fn
            init.apply(this, arguments)
        }

        function setType(url) {
            if (/\.json($|\?)/.test(url)) {
                return 'json'
            }
            if (/\.jsonp($|\?)/.test(url)) {
                return 'jsonp'
            }
            if (/\.js($|\?)/.test(url)) {
                return 'js'
            }
            if (/\.html?($|\?)/.test(url)) {
                return 'html'
            }
            if (/\.xml($|\?)/.test(url)) {
                return 'xml'
            }
            return 'js'
        }

        function init(o, fn) {
            this.url = typeof o == 'string' ? o : o.url
            this.timeout = null
            var type = o.type || setType(this.url),
                self = this
                fn = fn ||
                function() {}

                if (o.timeout) {
                    this.timeout = setTimeout(function() {
                        self.abort()
                        error()
                    }, o.timeout)
                }

                function complete(resp) {
                    o.complete && o.complete(resp)
                }

                function success(resp) {
                    o.timeout && clearTimeout(self.timeout) && (self.timeout = null)
                    var r = resp.responseText

                    if (r) {
                        switch (type) {
                        case 'json':
                            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
                            break;
                        case 'js':
                            resp = eval(r)
                            break;
                        case 'html':
                            resp = r
                            break;
                        }
                    }

                    fn(resp)
                    o.success && o.success(resp)
                    complete(resp)
                }

                function error(resp) {
                    o.error && o.error(resp)
                    complete(resp)
                }

                this.request = getRequest(o, success, error)
        }

        Reqwest.prototype = {
            abort: function() {
                this.request.abort()
            }

            ,
            retry: function() {
                init.call(this, this.o, this.fn)
            }
        }

        function reqwest(o, fn) {
            return new Reqwest(o, fn)
        }

        function enc(v) {
            return encodeURIComponent(v)
        }

        function serial(el) {
            var n = el.name
            // don't serialize elements that are disabled or without a name
            if (el.disabled || !n) {
                return ''
            }
            n = enc(n)
            switch (el.tagName.toLowerCase()) {
            case 'input':
                switch (el.type) {
                    // silly wabbit
                case 'reset':
                case 'button':
                case 'image':
                case 'file':
                    return ''
                case 'checkbox':
                case 'radio':
                    return el.checked ? n + '=' + (el.value ? enc(el.value) : true) + '&' : ''
                default:
                    // text hidden password submit
                    return n + '=' + (el.value ? enc(el.value) : '') + '&'
                }
                break;
            case 'textarea':
                return n + '=' + enc(el.value) + '&'
            case 'select':
                // @todo refactor beyond basic single selected value case
                return n + '=' + enc(el.options[el.selectedIndex].value) + '&'
            }
            return ''
        }

        reqwest.serialize = function(form) {
            var fields = [form[byTag]('input'), form[byTag]('select'), form[byTag]('textarea')],
                serialized = []

                for (var i = 0, l = fields.length; i < l; ++i) {
                    for (var j = 0, l2 = fields[i].length; j < l2; ++j) {
                        serialized.push(serial(fields[i][j]))
                    }
                }
                return serialized.join('').replace(/&$/, '')
        }

        reqwest.serializeArray = function(f) {
            for (var pairs = this.serialize(f).split('&'), i = 0, l = pairs.length, r = [], o; i < l; i++) {
                pairs[i] && (o = pairs[i].split('=')) && r.push({
                    name: o[0],
                    value: o[1]
                })
            }
            return r
        }

        var old = context.reqwest
    reqwest.noConflict = function() {
        context.reqwest = old
        return this
    }

    // defined as extern for Closure Compilation
    if (typeof module !== 'undefined') module.exports = reqwest
    context['reqwest'] = reqwest

}(this, window)

;
  var buildParams, param, prefixes, r20, rbracket;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (typeof exports !== "undefined" && exports !== null ? exports : this).reqwest = typeof window !== "undefined" && window !== null ? window.reqwest : reqwest;
  rbracket = /\[\]$/;
  r20 = /%20/g;
  param = function(a) {
    var add, k, name, s, v, value;
    s = [];
    add = function(key, value) {
      if (typeof value === 'function') {
        value = value();
      }
      return s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };
    if (Batman.typeOf(a) === 'Array') {
      for (value in a) {
        name = a[value];
        add(name, value);
      }
    } else {
      for (k in a) {
        v = a[k];
        buildParams(k, v, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  buildParams = function(prefix, obj, add) {
    var i, name, v, _len, _results, _results2;
    if (Batman.typeOf(obj) === 'Array') {
      _results = [];
      for (i = 0, _len = obj.length; i < _len; i++) {
        v = obj[i];
        _results.push(rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + (typeof v === "object" || Batman.typeOf(v) === 'Array' ? i : "") + "]", v, add));
      }
      return _results;
    } else if ((obj != null) && typeof obj === "object") {
      _results2 = [];
      for (name in obj) {
        _results2.push(buildParams(prefix + "[" + name + "]", obj[name], add));
      }
      return _results2;
    } else {
      return add(prefix, obj);
    }
  };
  Batman.Request.prototype.send = function(data) {
    var options, params, xhr, _ref;
    if (data == null) {
      data = this.get('data');
    }
    this.fire('loading');
    options = {
      url: this.get('url'),
      method: this.get('method'),
      type: this.get('type'),
      headers: {},
      success: __bind(function(response) {
        this.set('response', response);
        this.set('status', (typeof xhr !== "undefined" && xhr !== null ? xhr.status : void 0) || 200);
        return this.fire('success', response);
      }, this),
      error: __bind(function(xhr) {
        this.set('response', xhr.responseText || xhr.content);
        this.set('status', xhr.status);
        xhr.request = this;
        return this.fire('error', xhr);
      }, this),
      complete: __bind(function() {
        return this.fire('loaded');
      }, this)
    };
    if (!this.get('formData')) {
      options.headers['Content-type'] = this.get('contentType');
    }
    if ((_ref = options.method) === 'PUT' || _ref === 'POST') {
      if (this.get('formData')) {
        options.data = this.constructor.objectToFormData(data);
      } else {
        options.data = param(data);
      }
    } else if (options.method === 'GET' && (params = param(data))) {
      options.url += "?" + params;
    }
    return xhr = (reqwest(options)).request;
  };
  prefixes = ['Webkit', 'Moz', 'O', 'ms', ''];
  Batman.mixins.animation = {
    initialize: function() {
      var prefix, _i, _len;
      for (_i = 0, _len = prefixes.length; _i < _len; _i++) {
        prefix = prefixes[_i];
        this.style["" + prefix + "Transform"] = 'scale(0, 0)';
        this.style.opacity = 0;
        this.style["" + prefix + "TransitionProperty"] = "" + (prefix ? '-' + prefix.toLowerCase() + '-' : '') + "transform, opacity";
        this.style["" + prefix + "TransitionDuration"] = "0.8s, 0.55s";
        this.style["" + prefix + "TransformOrigin"] = "left top";
      }
      return this;
    },
    show: function(addToParent) {
      var show, _ref, _ref2;
      show = __bind(function() {
        var prefix, _i, _len;
        this.style.opacity = 1;
        for (_i = 0, _len = prefixes.length; _i < _len; _i++) {
          prefix = prefixes[_i];
          this.style["" + prefix + "Transform"] = 'scale(1, 1)';
        }
        return this;
      }, this);
      if (addToParent) {
        if ((_ref = addToParent.append) != null) {
          _ref.appendChild(this);
        }
        if ((_ref2 = addToParent.before) != null) {
          _ref2.parentNode.insertBefore(this, addToParent.before);
        }
        setTimeout(show, 0);
      } else {
        show();
      }
      return this;
    },
    hide: function(shouldRemove) {
      var prefix, _i, _len;
      this.style.opacity = 0;
      for (_i = 0, _len = prefixes.length; _i < _len; _i++) {
        prefix = prefixes[_i];
        this.style["" + prefix + "Transform"] = 'scale(0, 0)';
      }
      if (shouldRemove) {
        setTimeout((__bind(function() {
          var _ref;
          return (_ref = this.parentNode) != null ? _ref.removeChild(this) : void 0;
        }, this)), 600);
      }
      return this;
    }
  };
}).call(this);
