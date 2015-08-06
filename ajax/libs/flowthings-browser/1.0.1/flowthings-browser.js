void function(root, factory) {
  var XHR = function() {
    var test;
    try {
      test = new XMLHttpRequest();
    } catch(e) {
      test = {};
    }
    if (test.withCredentials != null) {
      return XMLHttpRequest;
    }
    if (typeof XDomainRequest != 'undefined') {
      return XDomainRequest;
    }
    throw new Error('Cross-domain requests are required');
  }();
  var WS = function() {
    if (typeof WebSocket != 'undefined') {
      return WebSocket;
    }
    return null;
  }();
  function init(exports) {
    return factory(exports, WS, XHR);
  }
  if (typeof define === 'function' && define.amd) {
    define(['exports'], init);
  } else if (typeof exports === 'object') {
    init(exports);
  } else {
    init(root.flowthings = {});
  }
}(this, function(flowthings, WebSocket, XHR) {
  extend(flowthings, {
    API: API,
    APIClient: APIClient,
    WebSocketClient: WebSocketClient,
    promisify: promisify,
    options: {
      secure: true,
      host: 'api.flowthings.io',
      wsHost: 'ws.flowthings.io',
      version: '0.1',
      transform: callbackTransform,
      serializer: JSON
    }
  });

  function API(options) {
    var opts = extend({}, flowthings.options, options);
    return APIClient(opts, request(opts.serializer), WebSocket);
  }

  function APIClient(options, request, Socket) {
    function _request(_options, callback) {
      var opts = {
        url: mkUrl({
          secure: options.secure,
          host: options.host,
          version: options.version,
          account: options.account,
          path: _options.path
        }),
        method: _options.method,
        params: mkParams(_options.params),
        data: _options.data,
        headers: { 'X-Auth-Token': options.token }
      };
      return options.transform(function(_callback) {
        return request(opts, _callback);
      }, callback);
    }
    return {
      request: _request,
      ws: WebSocketClient(options, request, Socket),
      flow: Service(_request, '/flow', [FindableMixin]),
      drop: extend(
        ServiceFactory(_request, '/drop', [FindableMixin, UpdateableMixin]),
        Service(_request, '/drop', [CreateableMixin]))
    };
  }

  function WebSocketClient(options, request, Socket) {
    var conn = null;
    var subs = {};
    var reps = {};
    var queue = [];
    var connected = false;
    var msgId = 1;
    var timer;

    var client = {
      connect: connect,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      send: send,
      __receive: receive,
      __flush: flush
    };

    function connect(callback) {
      return options.transform(function(_callback) {
        if (connected) {
          return _callback(null, client);
        }
        return request({
          url: mkWsUrl('http', options),
          method: 'POST',
          headers: {
            'X-Auth-Account': options.account,
            'X-Auth-Token': options.token
          }
        }, function(err, resp) {
          if (err) {
            return _callback(err, null);
          }
          var url = mkWsUrl('ws', options) + '/' + resp.body.id + '/ws';
          conn = extend(new Socket(url), {
            onopen: onopen,
            onmessage: onmessage,
            onerror: onerror,
            onclose: onclose
          });
          client.__socket = conn;
          return _callback(null, client);
        });
      }, callback);
    }
    function onopen() {
      connected = true;
      timer = setTimeout(heartbeat, 30000);
      flush();
      if (client.onopen) {
        client.onopen();
      }
    }
    function onmessage(e) {
      receive(e.data);
      if (client.onmessage) {
        client.onmessage(e.data);
      }
    }
    function onerror() {
      cleanup();
      if (client.onerror) {
        client.onerror();
      }
    }
    function onclose(e) {
      cleanup();
      if (client.onclose) {
        client.onclose(e);
      }
    }
    function subscribe(path, handler, callback) {
      function resolve(err, res) {
        if (subs.hasOwnProperty(path)) {
          var sub = subs[path];
          var pending = sub.pending.slice();
          if (err != null) {
            delete subs[path];
            forEach(pending, function(p) { p.callback(err, null) });
          } else {
            delete sub.pending;
            sub.result = res;
            forEach(pending, function(p) { sub.handlers.push(p.handler) });
            forEach(pending, function(p) { p.callback(null, res) });
          }
        }
      }
      return options.transform(function(_callback) {
        if (subs.hasOwnProperty(path)) {
          var sub = subs[path];
          if (sub.pending) {
            sub.pending = sub.pending.concat({
              handler: handler,
              callback: _callback || function(){}
            });
          } else {
            sub.handlers.push(handler);
            _callback(null, sub.result);
          }
        } else {
          var sub = subs[path] = {
            result: null,
            handlers: [],
            pending: [{
              handler: handler,
              callback: _callback || function(){}
            }],
          };
          _send(mkAction('drop', 'subscribe', path), resolve);
        }
      }, callback);
    }
    function unsubscribe(path, handler, callback) {
      return options.transform(function(_callback) {
        if (subs.hasOwnProperty(path)) {
          var sub = subs[path];
          if (sub.pending) {
            sub.pending = sub.pending.filter(function(p) {
              return p.handler !== handler;
            });
          } else {
            sub.handlers = sub.handlers.filter(function(h) {
              return h !== handler;
            });
          }
          if (sub.pending && !sub.pending.length || !sub.handlers.length) {
            _send(mkAction('drop', 'subscribe', path), function(err, res) {
              if (res != null) {
                delete subs[path];
              }
              _callback(err, res);
            });
          } else {
            _callback(null, {});
          }
        }
      }, callback);
    }
    function flush() {
      while (queue.length) {
        queue.shift()();
      }
    }
    function _send(msg, callback) {
      if (callback) {
        msg = extend({}, msg, { msgId: msgId++ });
      }
      function run() {
        conn.send(options.serializer.stringify(msg));
      }
      if (msg.msgId) {
        reps[msg.msgId] = callback;
      }
      if (connected) {
        run();
      } else {
        queue.push(run);
      }
    }
    function send(msg, callback) {
      return options.transform(function(_callback) {
        _send(msg, _callback);
      }, callback);
    }
    function receive(str) {
      var msg = options.serializer.parse(str);
      if (msg.type === 'message') {
        function dispatch(handler) {
          handler(msg.value);
        }
        if (subs.hasOwnProperty(msg.value.flowId)) {
          forEach(subs[msg.value.flowId].handlers, dispatch);
        }
        if (subs.hasOwnProperty(msg.value.path)) {
          forEach(subs[msg.value.path].handlers, dispatch);
        }
      } else {
        var id = msg.head.msgId;
        if (reps.hasOwnProperty(id)) {
          if (msg.head.ok) {
            reps[id](null, msg.body);
          } else {
            reps[id](msg, null);
          }
          delete reps[id];
        }
      }
    }
    function cleanup() {
      var _reps = reps;
      clearTimeout(timer);
      connected = false;
      conn  = null;
      subs  = {};
      reps  = {};
      queue = [];
      msgId = 1;
      forEach(_reps, function(rep) {
        rep(new Error('Connection interrupted'), null);
      });
    }
    function heartbeat() {
      if (conn) {
        _send({ type: 'heartbeat' });
        timer = setTimeout(heartbeat, 30000);
      }
    }
    return client;
  }

  function FindableMixin(request, path) {
    function read(id, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = null;
      }
      return request({ method: 'GET', path: path + '/' + id, params: params }, callback);
    }
    function readMany(ids, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = null;
      }
      return request({ method: 'MGET', path: path, data: ids, params: params }, callback);
    }
    function findMany(params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = null;
      }
      return request({ method: 'GET', path: path, params: params }, callback);
    }
    function find(_0, _1, _2) {
      if (isString(_0)) {
        return read(_0, _1);
      }
      if (isArray(_0)) {
        return readMany(_0, _1, _2);
      }
      return findMany(_0, _1);
    }
    return {
      read: read,
      readMany: readMany,
      findMany: findMany,
      find: find
    };
  }

  function CreateableMixin(request, path) {
    function create(model, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = null;
      }
      return request({ method: 'POST', path: path, data: model, params: params }, callback);
    }
    return {
      create: create
    };
  }

  function UpdateableMixin(request, path) {
    var createable = CreateableMixin(request, path);

    function update(model, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = null;
      }
      return request({ method: 'PUT', path: path + '/' + model.id, data: model, params: params }, callback);
    }
    function save(model, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = null;
      }
      if (model.id) {
        return update(model, params, callback);
      }
      return createable.create(model, params, callback);
    }
    return extend(createable, {
      update: update,
      save: save
    });
  }

  function Service(request, path, mixins) {
    var service = {};
    forEach(mixins, function(mixin) {
      extend(service, mixin(request, path));
    });
    return service;
  }

  function ServiceFactory(request, path, mixins) {
    return function(context) {
      return Service(request, path + '/' + context, mixins);
    };
  }

  function request(serializer) {
    return function(options, callback) {
      var xhr = new XHR();
      xhr.open(options.method, options.url + mkQuery(options.params), true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && callback) {
          var json;
          try {
            json = serializer.parse(xhr.responseText);
          } catch (e) {
            return callback(e);
          }
          if (xhr.status >= 200 && xhr.status < 300) {
            return callback(null, json);
          } else {
            return callback(json, null);
          }
        }
      };
      forEach(options.headers, function(val, name) {
        xhr.setRequestHeader(name, val);
      });
      xhr.setRequestHeader('Accept', 'application/json');
      if (options.data) {
        var data = serializer.stringify(options.data);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
      } else {
        xhr.send();
      }
    }
  }

  function mkUrl(options) {
    return (options.secure ? 'https': 'http') + '://' +
      options.host + '/v' +
      options.version + '/' +
      options.account +
      options.path
  }

  function mkWsUrl(scheme, options) {
    return scheme + (options.secure ? 's' : '') + '://' + options.wsHost + '/session';
  }

  function mkQuery(params) {
    var qs = [];
    if (params) {
      forEach(params, function(val, name) {
        qs.push(name + '=' + encodeURIComponent(val.toString()));
      });
    }
    return qs.length ? '?' + qs.join('&') : '';
  }

  function mkAction(object, type, path) {
    var data = {
      object: object,
      type: type
    };
    if (path.charAt(0) === '/') {
      data.path = path;
    } else {
      data.flowId = path;
    }
    return data;
  }

  function mkParams(opts) {
    var params = {};

    forEach(opts, function(val, key) {
      switch (key) {
        case 'only':
          if (isArray(val)) {
            val = val.join(',');
          }
          break;
        case 'refs':
          val = val ? 1 : 0;
          break;
        case 'filter':
          if (!isString(val)) {
            val = mkFilter(val)
          }
          break;
      }
      params[key] = val;
    });

    return params;
  }

  function mkFilter(spec) {
    var ast = [];

    forEach(spec, function(val, key) {
      if (key === '$and') {
        ast.push([val.map(mkFilter).join('&&')]);
      }
      else if (key === '$or') {
        ast.push([val.map(mkFilter).join('||')]);
      }
      else if (isRegExp(val)) {
        ast.push([key, '=~', mkRegExp(val)]);
      }
      else if (val.hasOwnProperty('$regex')) {
        ast.push([key, '=~', mkEscapedRegExp(val.$regex)]);
      }
      else if (val.hasOwnProperty('$lt')) {
        ast.push([key, '<', JSON.stringify(val.$lt)]);
      }
      else if (val.hasOwnProperty('$lte')) {
        ast.push([key, '<=', JSON.stringify(val.$lte)]);
      }
      else if (val.hasOwnProperty('$gt')) {
        ast.push([key, '>', JSON.stringify(val.$gt)]);
      }
      else if (val.hasOwnProperty('$gte')) {
        ast.push([key, '>=', JSON.stringify(val.$gte)]);
      }
      else {
        ast.push([key, '==', JSON.stringify(val)]);
      }
    });

    return ast.map(function(a) {
      return '(' + a.join(' ') + ')'
    }).join('&&')
  }

  function mkRegExp(regex) {
    var str = regex.source;
    var flags = '';

    if (regex.global) {
      flags += 'g';
    }

    if (regex.ignoreCase) {
      flags += 'i';
    }

    if (regex.multiline) {
      flags += 'm';
    }

    return '/' + str + '/' + flags;
  }

  function mkEscapedRegExp(regex) {
    var str, flags;

    if (isArray(regex)) {
      str = reg[0];
      flags = reg[1] || '';
    } else {
      str = regex;
      flags = '';
    }

    return '/' + str.replace(/\//g, '\\/') + '/' + flags;
  }

  function callbackTransform(next, callback) {
    return next(callback);
  }

  function promisify(Promise) {
    return function promiseTransform(next) {
      return new Promise(function(resolve, reject) {
        next(function(err, resp) {
          if (err != null) {
            reject(err);
          } else {
            resolve(resp);
          }
        });
      });
    };
  }

  function isFunction(fn) {
    return typeof fn === 'function';
  }

  function isArray(arr) {
    return Array.isArray(arr);
  }

  function isString(str) {
    return typeof str === 'string' || Object.prototype.toString.call(str) === '[object String]';
  }

  function isRegExp(reg) {
    return typeof reg === 'object' && Object.prototype.toString.call(reg) === '[object RegExp]';
  }

  function extend() {
    var res = arguments[0] || {};
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (typeof src !== 'object') {
        continue;
      }
      for (var k in src) {
        if (src.hasOwnProperty(k)) {
          res[k] = src[k];
        }
      }
    }
    return res;
  }

  function forEach(obj, callback) {
    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        callback(obj[i], i, obj);
      }
    } else if (obj != null) {
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          callback(obj[k], k, obj);
        }
      }
    }
  }
});
