/*! jQuery REST Client - v0.0.2 - 2013-01-19
* https://github.com/jpillora/jquery.rest
* Copyright (c) 2013 Jaime Pillora; Licensed MIT */

(function() {
  'use strict';

  var Cache, Resource, Verb, defaultOpts, encode64, error, inheritExtend, s, stringify;

  error = function(msg) {
    throw "ERROR: jquery.rest: " + msg;
  };

  s = function(n) {
    var t;
    t = "";
    n *= 2;
    while ((n--) > 0) {
      t += " ";
    }
    return t;
  };

  encode64 = function(s) {
    if (!window.btoa) {
      error("You need a polyfill for 'btoa' to use basic auth.");
    }
    return window.btoa(s);
  };

  stringify = function(obj) {
    if (!window.JSON) {
      error("You need a polyfill for 'JSON' to use stringify.");
    }
    return window.JSON.stringify(obj);
  };

  inheritExtend = function(a, b) {
    var F;
    F = function() {};
    F.prototype = a;
    return $.extend(true, new F(), b);
  };

  defaultOpts = {
    url: '',
    cache: 0,
    cachableTypes: ['GET'],
    stringifyData: false,
    password: null,
    username: null,
    verbs: {
      'create': 'POST',
      'read': 'GET',
      'update': 'PUT',
      'delete': 'DELETE'
    },
    ajax: {
      dataType: 'json'
    }
  };

  Cache = (function() {

    function Cache(parent) {
      this.parent = parent;
      this.c = {};
    }

    Cache.prototype.valid = function(date) {
      var diff;
      diff = new Date().getTime() - date.getTime();
      return diff <= this.parent.opts.cache * 1000;
    };

    Cache.prototype.key = function(obj) {
      return stringify(obj);
    };

    Cache.prototype.get = function(key) {
      var result;
      result = this.c[key];
      if (!result) {
        return;
      }
      if (this.valid(result.entry)) {
        return result.data;
      }
    };

    Cache.prototype.put = function(key, data) {
      return this.c[key] = {
        entry: new Date(),
        data: data
      };
    };

    Cache.prototype.clear = function(regexp) {
      var _this = this;
      if (regexp) {
        return $.each(this.c, function(k, v) {
          if (k.match(regexp)) {
            return delete _this.c[k];
          }
        });
      } else {
        return this.c = {};
      }
    };

    return Cache;

  })();

  Verb = (function() {

    function Verb(data) {
      var type;
      this.name = data.name, type = data.type, this.parent = data.parent, this.url = data.url;
      if (!this.name) {
        error("name required");
      }
      if (!type) {
        error("type required");
      }
      if (!this.parent) {
        error("parent required");
      }
      if (this.parent[this.name]) {
        error("Cannot add Verb: '" + name + "' already exists");
      }
      this.type = type.toUpperCase();
      this.opts = inheritExtend(this.parent.opts, data);
      this.root = this.parent.root;
      this.custom = !defaultOpts.verbs[this.name];
      this.call = $.proxy(this.call, this);
      this.call.instance = this;
    }

    Verb.prototype.call = function() {
      var r;
      r = this.parent.extractUrlData(this.type, arguments);
      if (this.custom) {
        r.url += this.url || this.name;
      }
      return this.parent.ajax.call(this, this.type, r.url, r.data);
    };

    Verb.prototype.show = function(d) {
      return console.log(s(d) + this.name + ": " + this.type);
    };

    return Verb;

  })();

  Resource = (function() {

    function Resource(data) {
      if (data == null) {
        data = {};
      }
      if (data.parent) {
        this.constructChild(data);
      } else {
        this.constructRoot(data);
      }
    }

    Resource.prototype.constructRoot = function(data) {
      if (data == null) {
        data = {};
      }
      if ('string' === $.type(data)) {
        this.url = data;
        data = {};
      }
      this.opts = inheritExtend(defaultOpts, data);
      if (!this.url) {
        this.url = this.opts.url;
      }
      this.urlNoId = this.url;
      this.cache = new Cache(this);
      this.numParents = 0;
      this.root = this;
      return this.name = data.name || 'ROOT';
    };

    Resource.prototype.constructChild = function(data) {
      this.parent = data.parent, this.name = data.name;
      if (!(this.parent instanceof Resource)) {
        this.error("Invalid parent");
      }
      if (!this.name) {
        this.error("name required");
      }
      if (this.parent[this.name]) {
        this.error("'" + name + "' already exists");
      }
      this.root = this.parent.root;
      this.opts = inheritExtend(this.parent.opts, data);
      this.numParents = this.parent.numParents + 1;
      this.urlNoId = this.parent.url + ("" + (data.url || this.name) + "/");
      this.url = this.urlNoId + (":ID_" + this.numParents + "/");
      $.each(this.opts.verbs, $.proxy(this.addVerb, this));
      if (this["delete"]) {
        return this.del = this["delete"];
      }
    };

    Resource.prototype.add = function(data) {
      if ('string' === $.type(data)) {
        data = {
          name: data
        };
      }
      if (!$.isPlainObject(data)) {
        error("Invalid data. Must be an object or string.");
      }
      data.parent = this;
      return this[data.name] = new Resource(data);
    };

    Resource.prototype.addVerb = function(data, type) {
      if (type === null) {
        return;
      }
      if ('string' === $.type(data)) {
        data = {
          name: data
        };
      }
      if (!$.isPlainObject(data)) {
        error("Invalid data. Must be an object or string.");
      }
      if (type) {
        data.type = type;
      }
      data.parent = this;
      return this[data.name] = new Verb(data).call;
    };

    Resource.prototype.error = function(msg) {
      return error("Cannot add Resource: " + msg);
    };

    Resource.prototype.show = function(d) {
      var _this = this;
      if (d == null) {
        d = 0;
      }
      if (d > 15) {
        error("Recurrsion Fail");
      }
      if (this.name) {
        console.log(s(d) + this.name + ": " + this.url);
      }
      $.each(this, function(name, fn) {
        if (fn.instance instanceof Verb && name !== 'del') {
          return fn.instance.show(d + 1);
        }
      });
      $.each(this, function(name, res) {
        if (name !== "parent" && name !== "root" && res instanceof Resource) {
          return res.show(d + 1);
        }
      });
      return null;
    };

    Resource.prototype.toString = function() {
      return this.name;
    };

    Resource.prototype.extractUrlData = function(name, args) {
      var arg, canUrl, canUrlNoId, data, i, id, ids, msg, numIds, t, url, _i, _j, _len, _len1;
      ids = [];
      data = null;
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        t = $.type(arg);
        if (t === 'string' || t === 'number') {
          ids.push(arg);
        } else if ($.isPlainObject(arg) && data === null) {
          data = arg;
        } else {
          error(("Invalid parameter: " + arg + " (" + t + ").") + " Must be strings or ints (IDs) followed by one optional plain object (data).");
        }
      }
      numIds = ids.length;
      canUrl = name !== 'create';
      canUrlNoId = name !== 'update' && name !== 'delete';
      url = null;
      if (canUrl && numIds === this.numParents) {
        url = this.url;
      }
      if (canUrlNoId && numIds === this.numParents - 1) {
        url = this.urlNoId;
      }
      if (url === null) {
        if (canUrlNoId) {
          msg = this.numParents - 1;
        }
        if (canUrl) {
          msg = (msg ? msg + ' or ' : '') + this.numParents;
        }
        error("Invalid number of ID parameters, required " + msg + ", provided " + numIds);
      }
      for (i = _j = 0, _len1 = ids.length; _j < _len1; i = ++_j) {
        id = ids[i];
        url = url.replace(new RegExp("\/:ID_" + (i + 1) + "\/"), "/" + id + "/");
      }
      return {
        url: url,
        data: data
      };
    };

    Resource.prototype.ajax = function(type, url, data, headers) {
      var ajaxOpts, encoded, key, req, useCache,
        _this = this;
      if (headers == null) {
        headers = {};
      }
      if (!type) {
        error("type missing");
      }
      if (!url) {
        error("url missing");
      }
      if (this.opts.username && this.opts.password) {
        encoded = encode64(this.opts.username + ":" + this.opts.password);
        headers.Authorization = "Basic " + encoded;
      }
      if (data && this.opts.stringifyData) {
        data = stringify(data);
      }
      ajaxOpts = {
        url: url,
        type: type,
        headers: headers
      };
      if (data) {
        ajaxOpts.data = data;
      }
      ajaxOpts = $.extend(true, {}, this.opts.ajax, ajaxOpts);
      useCache = this.opts.cache && $.inArray(type, this.opts.cachableTypes) >= 0;
      if (useCache) {
        key = this.root.cache.key(ajaxOpts);
        req = this.root.cache.get(key);
        if (req) {
          return req;
        }
      }
      req = $.ajax(ajaxOpts);
      if (useCache) {
        req.complete(function() {
          return _this.root.cache.put(key, req);
        });
      }
      return req;
    };

    return Resource;

  })();

  Resource.defaults = defaultOpts;

  $.RestClient = Resource;

}).call(this);
