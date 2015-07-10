(function() {
  var XMLHttpRequest, exportDef, extend, initTime, isServer, log, now,
    __slice = [].slice;

  isServer = (typeof module !== "undefined" && module !== null) && !(typeof window !== "undefined" && window !== null ? window.module : void 0);

  if (isServer) {
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    now = function() {
      var time;
      time = process.hrtime();
      return (time[0] + time[1] / 1e9) * 1000;
    };
  } else {
    now = function() {
      var _ref, _ref1;
      return (_ref = (_ref1 = window.performance) != null ? typeof _ref1.now === "function" ? _ref1.now() : void 0 : void 0) != null ? _ref : +(new Date);
    };
  }

  initTime = +(new Date);

  extend = function() {
    var a, key, obj, objs, val, _i, _len;
    a = arguments[0], objs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = objs.length; _i < _len; _i++) {
      obj = objs[_i];
      for (key in obj) {
        val = obj[key];
        a[key] = val;
      }
    }
    return a;
  };

  log = function() {
    var msgs, _ref;
    msgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if ((typeof console !== "undefined" && console !== null ? (_ref = console.log) != null ? _ref.call : void 0 : void 0) != null) {
      return console.log.apply(console, msgs);
    }
  };

  log.error = function() {
    var msgs, _ref;
    msgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if ((typeof console !== "undefined" && console !== null ? (_ref = console.error) != null ? _ref.call : void 0 : void 0) != null) {
      return console.error.apply(console, msgs);
    }
  };

  exportDef = function() {
    var $tag, ACTIVE, HISTORY, TYPE_MAP, client, considerSending, defaults, enqueue, flush, key, latencySent, makeClient, makeRequest, maxTimeout, options, queue, round, sendQueue, sendTimeout, setOptions, tagOptions, updateActive, updateLatency, _i, _len, _ref, _ref1, _ref2;
    defaults = {
      host: '/bucky',
      maxInterval: 30000,
      aggregationInterval: 5000,
      decimalPrecision: 3,
      sendLatency: false,
      sample: 1,
      active: true
    };
    tagOptions = {};
    if (!isServer) {
      $tag = typeof document.querySelector === "function" ? document.querySelector('[data-bucky-host],[data-bucky-page],[data-bucky-requests]') : void 0;
      if ($tag) {
        tagOptions = {
          host: $tag.getAttribute('data-bucky-host'),
          pagePerformanceKey: $tag.getAttribute('data-bucky-page'),
          requestsKey: $tag.getAttribute('data-bucky-requests')
        };
        _ref = ['pagePerformanceKey', 'requestsKey'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          if (((_ref1 = tagOptions[key]) != null ? _ref1.toString().toLowerCase() : void 0) === 'true' || tagOptions[key] === '') {
            tagOptions[key] = true;
          } else if (((_ref2 = tagOptions[key]) != null ? _ref2.toString().toLowerCase : void 0) === 'false') {
            tagOptions[key] = null;
          }
        }
      }
    }
    options = extend({}, defaults, tagOptions);
    TYPE_MAP = {
      'timer': 'ms',
      'gauge': 'g',
      'counter': 'c'
    };
    ACTIVE = options.active;
    (updateActive = function() {
      return ACTIVE = options.active && Math.random() < options.sample;
    })();
    HISTORY = [];
    setOptions = function(opts) {
      extend(options, opts);
      if ('sample' in opts || 'active' in opts) {
        updateActive();
      }
      return options;
    };
    round = function(num, precision) {
      if (precision == null) {
        precision = options.decimalPrecision;
      }
      return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
    };
    queue = {};
    enqueue = function(path, value, type) {
      var count, _ref3;
      if (!ACTIVE) {
        return;
      }
      count = 1;
      if (path in queue) {
        if (type === 'counter') {
          value += queue[path].value;
        } else {
          count = (_ref3 = queue[path].count) != null ? _ref3 : count;
          count++;
          value = queue[path].value + (value - queue[path].value) / count;
        }
      }
      queue[path] = {
        value: value,
        type: type,
        count: count
      };
      return considerSending();
    };
    sendTimeout = null;
    maxTimeout = null;
    flush = function() {
      clearTimeout(sendTimeout);
      clearTimeout(maxTimeout);
      maxTimeout = null;
      sendTimeout = null;
      return sendQueue();
    };
    considerSending = function() {
      clearTimeout(sendTimeout);
      sendTimeout = setTimeout(flush, options.aggregationInterval);
      if (maxTimeout == null) {
        return maxTimeout = setTimeout(flush, options.maxInterval);
      }
    };
    makeRequest = function(data) {
      var body, corsSupport, match, name, origin, req, sameOrigin, sendStart, val, _ref3;
      corsSupport = isServer || (window.XMLHttpRequest && (window.XMLHttpRequest.defake || 'withCredentials' in new window.XMLHttpRequest()));
      if (isServer) {
        sameOrigin = true;
      } else {
        match = /^(https?:\/\/[^\/]+)/i.exec(options.host);
        if (match) {
          origin = match[1];
          if (origin === ("" + document.location.protocol + "//" + document.location.host)) {
            sameOrigin = true;
          } else {
            sameOrigin = false;
          }
        } else {
          sameOrigin = true;
        }
      }
      sendStart = now();
      body = '';
      for (name in data) {
        val = data[name];
        body += "" + name + ":" + val + "\n";
      }
      if (!sameOrigin && !corsSupport && ((typeof window !== "undefined" && window !== null ? window.XDomainRequest : void 0) != null)) {
        req = new window.XDomainRequest;
      } else {
        req = new ((_ref3 = typeof window !== "undefined" && window !== null ? window.XMLHttpRequest : void 0) != null ? _ref3 : XMLHttpRequest);
      }
      req.bucky = {
        track: false
      };
      req.open('POST', "" + options.host + "/v1/send", true);
      req.setRequestHeader('Content-Type', 'text/plain');
      req.addEventListener('load', function() {
        return updateLatency(now() - sendStart);
      }, false);
      req.send(body);
      return req;
    };
    sendQueue = function() {
      var out, point, value, _ref3;
      if (!ACTIVE) {
        log("Would send bucky queue");
        return;
      }
      out = {};
      for (key in queue) {
        point = queue[key];
        HISTORY.push({
          path: key,
          count: point.count,
          type: point.type,
          value: point.value
        });
        if (TYPE_MAP[point.type] == null) {
          log.error("Type " + point.type + " not understood by Bucky");
          continue;
        }
        value = point.value;
        if ((_ref3 = point.type) === 'gauge' || _ref3 === 'timer') {
          value = round(value);
        }
        out[key] = "" + value + "|" + TYPE_MAP[point.type];
        if (point.count !== 1) {
          out[key] += "@" + (round(1 / point.count, 5));
        }
      }
      makeRequest(out);
      return queue = {};
    };
    latencySent = false;
    updateLatency = function(time) {
      if (options.sendLatency && !latencySent) {
        enqueue('bucky.latency', time, 'timer');
        latencySent = true;
        return setTimeout(function() {
          return latencySent = false;
        }, 5 * 60 * 1000);
      }
    };
    makeClient = function(prefix) {
      var buildPath, count, exports, nextMakeClient, requests, send, sendPagePerformance, sentPerformanceData, timer, val;
      if (prefix == null) {
        prefix = '';
      }
      buildPath = function(path) {
        if (prefix != null ? prefix.length : void 0) {
          return prefix + '.' + path;
        } else {
          return path;
        }
      };
      send = function(path, value, type) {
        if (type == null) {
          type = 'gauge';
        }
        if ((value == null) || (path == null)) {
          log.error("Can't log " + path + ":" + value);
          return;
        }
        return enqueue(buildPath(path), value, type);
      };
      timer = {
        TIMES: {},
        send: function(path, duration) {
          return send(path, duration, 'timer');
        },
        time: function() {
          var action, args, ctx, done, path,
            _this = this;
          path = arguments[0], action = arguments[1], ctx = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
          timer.start(path);
          done = function() {
            return timer.stop(path);
          };
          args.splice(0, 0, done);
          return action.apply(ctx, args);
        },
        timeSync: function() {
          var action, args, ctx, path, ret;
          path = arguments[0], action = arguments[1], ctx = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
          timer.start(path);
          ret = action.apply(ctx, args);
          timer.stop(path);
          return ret;
        },
        wrap: function(path, action) {
          if (action != null) {
            return function() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return timer.timeSync.apply(timer, [path, action, this].concat(__slice.call(args)));
            };
          } else {
            return function(action) {
              return function() {
                var args;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                return timer.timeSync.apply(timer, [path, action, this].concat(__slice.call(args)));
              };
            };
          }
        },
        start: function(path) {
          return timer.TIMES[path] = now();
        },
        stop: function(path) {
          var duration;
          if (timer.TIMES[path] == null) {
            log.error("Timer " + path + " ended without having been started");
            return;
          }
          duration = now() - timer.TIMES[path];
          timer.TIMES[path] = void 0;
          return timer.send(path, duration);
        },
        stopwatch: function(prefix, start) {
          var last, _now;
          if (start != null) {
            _now = function() {
              return +(new Date);
            };
          } else {
            _now = now;
            start = _now();
          }
          last = start;
          return {
            mark: function(path, offset) {
              var end;
              if (offset == null) {
                offset = 0;
              }
              end = _now();
              if (prefix) {
                path = prefix + '.' + path;
              }
              return timer.send(path, end - start + offset);
            },
            split: function(path, offset) {
              var end;
              if (offset == null) {
                offset = 0;
              }
              end = _now();
              if (prefix) {
                path = prefix + '.' + path;
              }
              timer.send(path, end - last + offset);
              return last = end;
            }
          };
        },
        mark: function(path, time) {
          var start;
          if (time == null) {
            time = +(new Date);
          }
          start = timer.navigationStart();
          return timer.send(path, time - start);
        },
        navigationStart: function() {
          var _ref3, _ref4, _ref5;
          return (_ref3 = typeof window !== "undefined" && window !== null ? (_ref4 = window.performance) != null ? (_ref5 = _ref4.timing) != null ? _ref5.navigationStart : void 0 : void 0 : void 0) != null ? _ref3 : initTime;
        },
        responseEnd: function() {
          var _ref3, _ref4, _ref5;
          return (_ref3 = typeof window !== "undefined" && window !== null ? (_ref4 = window.performance) != null ? (_ref5 = _ref4.timing) != null ? _ref5.responseEnd : void 0 : void 0 : void 0) != null ? _ref3 : initTime;
        },
        now: function() {
          return now();
        }
      };
      count = function(path, count) {
        if (count == null) {
          count = 1;
        }
        return send(path, count, 'counter');
      };
      sentPerformanceData = false;
      sendPagePerformance = function(path) {
        var start, time, _ref3, _ref4, _ref5,
          _this = this;
        if ((typeof window !== "undefined" && window !== null ? (_ref3 = window.performance) != null ? _ref3.timing : void 0 : void 0) == null) {
          return false;
        }
        if (sentPerformanceData) {
          return false;
        }
        if (!path || path === true) {
          path = requests.urlToKey(document.location.toString()) + '.page';
        }
        if ((_ref4 = document.readyState) === 'uninitialized' || _ref4 === 'loading') {
          if (typeof window.addEventListener === "function") {
            window.addEventListener('load', function() {
              return setTimeout(function() {
                return sendPagePerformance.call(_this, path);
              }, 500);
            }, false);
          }
          return false;
        }
        sentPerformanceData = true;
        start = window.performance.timing.navigationStart;
        _ref5 = window.performance.timing;
        for (key in _ref5) {
          time = _ref5[key];
          if (typeof time === 'number') {
            timer.send("" + path + "." + key, time - start);
          }
        }
        return true;
      };
      requests = {
        transforms: {
          mapping: {
            guid: /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/ig,
            sha1: /\/[0-9a-f]{40}/ig,
            md5: /\/[0-9a-f]{32}/ig,
            id: /\/[0-9;_\-]+/g,
            email: /\/[^/]+@[^/]+/g,
            domain: [/\/[^/]+\.[a-z]{2,3}\//ig, '/']
          },
          enabled: ['guid', 'sha1', 'md5', 'id', 'email', 'domain'],
          enable: function(name, test, replacement) {
            if (replacement == null) {
              replacement = '';
            }
            if (test != null) {
              this.mapping[name] = [test, replacement];
            }
            return this.enabled.splice(0, 0, name);
          },
          disable: function(name) {
            var i, val, _ref3;
            _ref3 = this.enabled;
            for (i in _ref3) {
              val = _ref3[i];
              if (val === name) {
                this.enabled.splice(i, 1);
                return;
              }
            }
          }
        },
        sendReadyStateTimes: function(path, times) {
          var code, codeMapping, diffs, last, status, time, val, _results;
          if (times == null) {
            return;
          }
          codeMapping = {
            1: 'sending',
            2: 'headers',
            3: 'waiting',
            4: 'receiving'
          };
          diffs = {};
          last = null;
          for (code in times) {
            time = times[code];
            if ((last != null) && (codeMapping[code] != null)) {
              diffs[codeMapping[code]] = time - last;
            }
            last = time;
          }
          _results = [];
          for (status in diffs) {
            val = diffs[status];
            _results.push(timer.send("" + path + "." + status, val));
          }
          return _results;
        },
        urlToKey: function(url, type, root) {
          var host, mapping, mappingName, parsedUrl, path, stat, _j, _len1, _ref3, _ref4;
          url = url.replace(/https?:\/\//i, '');
          parsedUrl = /([^/:]*)(?::\d+)?(\/[^\?#]*)?.*/i.exec(url);
          host = parsedUrl[1];
          path = (_ref3 = parsedUrl[2]) != null ? _ref3 : '';
          _ref4 = requests.transforms.enabled;
          for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
            mappingName = _ref4[_j];
            mapping = requests.transforms.mapping[mappingName];
            if (mapping == null) {
              log.error("Bucky Error: Attempted to enable a mapping which is not defined: " + mappingName);
              continue;
            }
            if (typeof mapping === 'function') {
              path = mapping(path, url, type, root);
              continue;
            }
            if (mapping instanceof RegExp) {
              mapping = [mapping, ''];
            }
            path = path.replace(mapping[0], mapping[1]);
          }
          path = decodeURIComponent(path);
          path = path.replace(/[^a-zA-Z0-9\-\.\/ ]+/g, '_');
          stat = host + path.replace(/[\/ ]/g, '.');
          stat = stat.replace(/(^\.)|(\.$)/g, '');
          stat = stat.replace(/\.com/, '');
          stat = stat.replace(/www\./, '');
          if (root) {
            stat = root + '.' + stat;
          }
          if (type) {
            stat = stat + '.' + type.toLowerCase();
          }
          stat = stat.replace(/\.\./g, '.');
          return stat;
        },
        getFullUrl: function(url, location) {
          if (location == null) {
            location = document.location;
          }
          if (/^\//.test(url)) {
            return location.hostname + url;
          } else if (!/https?:\/\//i.test(url)) {
            return location.toString() + url;
          } else {
            return url;
          }
        },
        monitor: function(root) {
          var done, self, _XMLHttpRequest;
          if (!root || root === true) {
            root = requests.urlToKey(document.location.toString()) + '.requests';
          }
          self = this;
          done = function(_arg) {
            var dur, event, readyStateTimes, request, startTime, stat, type, url;
            type = _arg.type, url = _arg.url, event = _arg.event, request = _arg.request, readyStateTimes = _arg.readyStateTimes, startTime = _arg.startTime;
            if (startTime != null) {
              dur = now() - startTime;
            } else {
              return;
            }
            url = self.getFullUrl(url);
            stat = self.urlToKey(url, type, root);
            send(stat, dur, 'timer');
            self.sendReadyStateTimes(stat, readyStateTimes);
            if ((request != null ? request.status : void 0) != null) {
              if (request.status > 12000) {
                count("" + stat + ".0");
              } else if (request.status !== 0) {
                count("" + stat + "." + (request.status.toString().charAt(0)) + "xx");
              }
              return count("" + stat + "." + request.status);
            }
          };
          _XMLHttpRequest = window.XMLHttpRequest;
          return window.XMLHttpRequest = function() {
            var e, readyStateTimes, req, startTime, _open, _send;
            req = new _XMLHttpRequest;
            try {
              startTime = null;
              readyStateTimes = {};
              _open = req.open;
              req.open = function(type, url, async) {
                var e;
                try {
                  readyStateTimes[0] = now();
                  req.addEventListener('readystatechange', function() {
                    return readyStateTimes[req.readyState] = now();
                  }, false);
                  req.addEventListener('loadend', function(event) {
                    if ((req.bucky == null) || req.bucky.track !== false) {
                      return done({
                        type: type,
                        url: url,
                        event: event,
                        startTime: startTime,
                        readyStateTimes: readyStateTimes,
                        request: req
                      });
                    }
                  }, false);
                } catch (_error) {
                  e = _error;
                  log.error("Bucky error monitoring XHR open call", e);
                }
                return _open.apply(req, arguments);
              };
              _send = req.send;
              req.send = function() {
                startTime = now();
                return _send.apply(req, arguments);
              };
            } catch (_error) {
              e = _error;
              log.error("Bucky error monitoring XHR", e);
            }
            return req;
          };
        }
      };
      nextMakeClient = function(nextPrefix) {
        var path;
        if (nextPrefix == null) {
          nextPrefix = '';
        }
        path = prefix != null ? prefix : '';
        if (path && nextPrefix) {
          path += '.';
        }
        if (nextPrefix) {
          path += nextPrefix;
        }
        return makeClient(path);
      };
      exports = {
        send: send,
        count: count,
        timer: timer,
        now: now,
        requests: requests,
        sendPagePerformance: sendPagePerformance,
        flush: flush,
        setOptions: setOptions,
        options: options,
        history: HISTORY,
        active: ACTIVE
      };
      for (key in exports) {
        val = exports[key];
        nextMakeClient[key] = val;
      }
      return nextMakeClient;
    };
    client = makeClient();
    if (options.pagePerformanceKey) {
      client.sendPagePerformance(options.pagePerformanceKey);
    }
    if (options.requestsKey) {
      client.requests.monitor(options.requestsKey);
    }
    return client;
  };

  if (typeof define === 'function' && define.amd) {
    define(exportDef);
  } else if (typeof exports === 'object') {
    module.exports = exportDef();
  } else {
    window.Bucky = exportDef();
  }

}).call(this);
