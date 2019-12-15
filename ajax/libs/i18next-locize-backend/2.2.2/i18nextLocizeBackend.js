(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.i18nextLocizeBackend = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function getLastOfPath(object, path, Empty) {
    function cleanKey(key) {
      return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
    }

    var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');

    while (stack.length > 1) {
      if (!object) return {};
      var key = cleanKey(stack.shift());
      if (!object[key] && Empty) object[key] = new Empty();
      object = object[key];
    }

    if (!object) return {};
    return {
      obj: object,
      k: cleanKey(stack.shift())
    };
  }

  function setPath(object, path, newValue) {
    var _getLastOfPath = getLastOfPath(object, path, Object),
        obj = _getLastOfPath.obj,
        k = _getLastOfPath.k;

    obj[k] = newValue;
  }
  function pushPath(object, path, newValue, concat) {
    var _getLastOfPath2 = getLastOfPath(object, path, Object),
        obj = _getLastOfPath2.obj,
        k = _getLastOfPath2.k;

    obj[k] = obj[k] || [];
    if (concat) obj[k] = obj[k].concat(newValue);
    if (!concat) obj[k].push(newValue);
  }
  function getPath(object, path) {
    var _getLastOfPath3 = getLastOfPath(object, path),
        obj = _getLastOfPath3.obj,
        k = _getLastOfPath3.k;

    if (!obj) return undefined;
    return obj[k];
  }
  var regexp = new RegExp('\{\{(.+?)\}\}', 'g');

  function makeString(object) {
    if (object == null) return '';
    return '' + object;
  }

  function interpolate(str, data, lng) {
    var match, value;

    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    } // regular escape on demand


    while (match = regexp.exec(str)) {
      value = match[1].trim();
      if (typeof value !== 'string') value = makeString(value);
      if (!value) value = '';
      value = regexSafe(value);
      str = str.replace(match[0], data[value] || value);
      regexp.lastIndex = 0;
    }

    return str;
  }
  function isMissingOption(obj, props) {
    return props.reduce(function (mem, p) {
      if (mem) return mem;

      if (!obj || !obj[p] || typeof obj[p] !== 'string' || !obj[p].toLowerCase() === p.toLowerCase()) {
        var err = "i18next-locize-backend :: got \"".concat(obj[p], "\" in options for ").concat(p, " which is invalid.");
        console.warn(err);
        return err;
      }

      return false;
    }, false);
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function ajax(url, options, callback, data, cache) {
    try {
      var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
      x.open(data ? 'POST' : 'GET', url, 1);

      if (!options.crossDomain) {
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }

      if (options.authorize && options.apiKey) {
        x.setRequestHeader('Authorization', options.apiKey);
      }

      if (data || options.setContentTypeJSON) {
        x.setRequestHeader('Content-type', 'application/json');
      }

      x.onreadystatechange = function () {
        x.readyState > 3 && callback && callback(x.responseText, x);
      };

      x.send(JSON.stringify(data));
    } catch (e) {
      typeof window !== 'undefined' && window.console && console.log(e);
    }
  }

  function getDefaults() {
    return {
      loadPath: 'https://api.locize.io/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      privatePath: 'https://api.locize.io/private/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      pullPath: 'https://api.locize.io/pull/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      getLanguagesPath: 'https://api.locize.io/languages/{{projectId}}',
      addPath: 'https://api.locize.io/missing/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      updatePath: 'https://api.locize.io/update/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      referenceLng: 'en',
      crossDomain: true,
      setContentTypeJSON: false,
      version: 'latest',
      pull: false,
      "private": false,
      whitelistThreshold: 0.9,
      failLoadingOnEmptyJSON: false,
      // useful if using chained backend
      allowedAddOrUpdateHosts: ['localhost'],
      onSaved: false
    };
  }

  var I18NextLocizeBackend =
  /*#__PURE__*/
  function () {
    function I18NextLocizeBackend(services, options, callback) {
      _classCallCheck(this, I18NextLocizeBackend);

      if (services && services.projectId) {
        this.init(null, services, {}, options);
      } else {
        this.init(null, options, {}, callback);
      }

      this.type = 'backend';
    }

    _createClass(I18NextLocizeBackend, [{
      key: "init",
      value: function init(services) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var i18nextOptions = arguments.length > 2 ? arguments[2] : undefined;
        var callback = arguments.length > 3 ? arguments[3] : undefined;
        this.options = _objectSpread({}, getDefaults(), {}, this.options, {}, options); // initial

        this.services = services;
        if (this.options.pull) console.warn('deprecated: pull will be removed in future versions and should be replaced with locize private versions');
        var hostname = typeof window !== 'undefined' && window.location && window.location.hostname;

        if (hostname) {
          this.isAddOrUpdateAllowed = typeof this.options.allowedAddOrUpdateHosts === 'function' ? this.options.allowedAddOrUpdateHosts(hostname) : this.options.allowedAddOrUpdateHosts.indexOf(hostname) > -1;
          if (i18nextOptions.saveMissing && !this.isAddOrUpdateAllowed) services && services.logger && services.logger.warn("locize-backend: will not save missings because the host \"".concat(hostname, "\" was not in the list of allowedAddOrUpdateHosts: ").concat(this.options.allowedAddOrUpdateHosts.join(', '), " (matches need to be exact)."));
        } else {
          this.isAddOrUpdateAllowed = true;
        }

        if (typeof callback === 'function') {
          this.getOptions(function (err, opts) {
            if (err) return callback(err);
            _this.options.referenceLng = options.referenceLng || opts.referenceLng || _this.options.referenceLng;
            callback(null, opts);
          });
        }

        this.queuedWrites = {};
        this.debouncedProcess = debounce(this.process, 10000);
      }
    }, {
      key: "getLanguages",
      value: function getLanguages(callback) {
        var isMissing = isMissingOption(this.options, ['projectId']);
        if (isMissing) return callback(new Error(isMissing));
        var url = interpolate(this.options.getLanguagesPath, {
          projectId: this.options.projectId
        });
        this.loadUrl(url, {}, callback);
      }
    }, {
      key: "getOptions",
      value: function getOptions(callback) {
        var _this2 = this;

        this.getLanguages(function (err, data) {
          if (err) return callback(err);
          var keys = Object.keys(data);
          if (!keys.length) return callback(new Error('was unable to load languages via API'));
          var referenceLng = keys.reduce(function (mem, k) {
            var item = data[k];
            if (item.isReferenceLanguage) mem = k;
            return mem;
          }, '');
          var whitelist = keys.reduce(function (mem, k) {
            var item = data[k];
            if (item.translated[_this2.options.version] && item.translated[_this2.options.version] >= _this2.options.whitelistThreshold) mem.push(k);
            return mem;
          }, []);
          var hasRegion = keys.reduce(function (mem, k) {
            if (k.indexOf('-') > -1) return true;
            return mem;
          }, false);
          callback(null, {
            fallbackLng: referenceLng,
            referenceLng: referenceLng,
            whitelist: whitelist,
            load: hasRegion ? 'all' : 'languageOnly'
          });
        });
      }
    }, {
      key: "read",
      value: function read(language, namespace, callback) {
        var url;
        var options = {};

        if (this.options["private"]) {
          var isMissing = isMissingOption(this.options, ['projectId', 'version', 'apiKey']);
          if (isMissing) return callback(new Error(isMissing), false);
          url = interpolate(this.options.privatePath, {
            lng: language,
            ns: namespace,
            projectId: this.options.projectId,
            version: this.options.version
          });
          options = {
            authorize: true
          };
        } else if (this.options.pull) {
          var _isMissing = isMissingOption(this.options, ['projectId', 'version', 'apiKey']);

          if (_isMissing) return callback(new Error(_isMissing), false);
          url = interpolate(this.options.pullPath, {
            lng: language,
            ns: namespace,
            projectId: this.options.projectId,
            version: this.options.version
          });
          options = {
            authorize: true
          };
        } else {
          var _isMissing2 = isMissingOption(this.options, ['projectId', 'version']);

          if (_isMissing2) return callback(new Error(_isMissing2), false);
          url = interpolate(this.options.loadPath, {
            lng: language,
            ns: namespace,
            projectId: this.options.projectId,
            version: this.options.version
          });
        }

        this.loadUrl(url, options, callback);
      }
    }, {
      key: "loadUrl",
      value: function loadUrl(url, options, callback) {
        var _this3 = this;

        ajax(url, _objectSpread({}, this.options, {}, options), function (data, xhr) {
          if (xhr.status >= 500 && xhr.status < 600) return callback('failed loading ' + url, true
          /* retry */
          );
          if (xhr.status >= 400 && xhr.status < 500) return callback('failed loading ' + url, false
          /* no retry */
          );
          var ret, err;

          try {
            ret = JSON.parse(data);
          } catch (e) {
            err = 'failed parsing ' + url + ' to json';
          }

          if (err) return callback(err, false);
          if (_this3.options.failLoadingOnEmptyJSON && !Object.keys(ret).length) return callback('loaded result empty for ' + url, false);
          callback(null, ret);
        });
      }
    }, {
      key: "create",
      value: function create(languages, namespace, key, fallbackValue, callback, options) {
        var _this4 = this;

        if (!callback) callback = function callback() {}; // missing options

        var isMissing = isMissingOption(this.options, ['projectId', 'version', 'apiKey', 'referenceLng']);
        if (isMissing) return callback(new Error(isMissing)); // unallowed host

        if (!this.isAddOrUpdateAllowed) return callback('host is not allowed to create key.');
        if (typeof languages === 'string') languages = [languages];

        if (languages.filter(function (l) {
          return l === _this4.options.referenceLng;
        }).length < 1) {
          this.services && this.services.logger && this.services.logger.warn("locize-backend: will not save missings because the reference language \"".concat(this.options.referenceLng, "\" was not in the list of to save languages: ").concat(languages.join(', '), " (open your site in the reference language to save missings)."));
        }

        languages.forEach(function (lng) {
          if (lng === _this4.options.referenceLng) _this4.queue.call(_this4, _this4.options.referenceLng, namespace, key, fallbackValue, callback, options);
        });
      }
    }, {
      key: "update",
      value: function update(languages, namespace, key, fallbackValue, callback, options) {
        var _this5 = this;

        if (!callback) callback = function callback() {}; // missing options

        var isMissing = isMissingOption(this.options, ['projectId', 'version', 'apiKey', 'referenceLng']);
        if (isMissing) return callback(new Error(isMissing));
        if (!this.isAddOrUpdateAllowed) return callback('host is not allowed to update key.');
        if (!options) options = {};
        if (typeof languages === 'string') languages = [languages]; // mark as update

        options.isUpdate = true;
        languages.forEach(function (lng) {
          if (lng === _this5.options.referenceLng) _this5.queue.call(_this5, _this5.options.referenceLng, namespace, key, fallbackValue, callback, options);
        });
      }
    }, {
      key: "write",
      value: function write(lng, namespace) {
        var _this6 = this;

        var lock = getPath(this.queuedWrites, ['locks', lng, namespace]);
        if (lock) return;
        var missingUrl = interpolate(this.options.addPath, {
          lng: lng,
          ns: namespace,
          projectId: this.options.projectId,
          version: this.options.version
        });
        var updatesUrl = interpolate(this.options.updatePath, {
          lng: lng,
          ns: namespace,
          projectId: this.options.projectId,
          version: this.options.version
        });
        var missings = getPath(this.queuedWrites, [lng, namespace]);
        setPath(this.queuedWrites, [lng, namespace], []);

        if (missings.length) {
          // lock
          setPath(this.queuedWrites, ['locks', lng, namespace], true);
          var hasMissing = false;
          var hasUpdates = false;
          var payloadMissing = {};
          var payloadUpdate = {};
          missings.forEach(function (item) {
            var value = item.options && item.options.tDescription ? {
              value: item.fallbackValue || '',
              context: {
                text: item.options.tDescription
              }
            } : item.fallbackValue || '';

            if (item.options && item.options.isUpdate) {
              if (!hasUpdates) hasUpdates = true;
              payloadUpdate[item.key] = value;
            } else {
              if (!hasMissing) hasMissing = true;
              payloadMissing[item.key] = value;
            }
          });
          var todo = 0;
          if (hasMissing) todo++;
          if (hasUpdates) todo++;

          var doneOne = function doneOne() {
            todo--;

            if (!todo) {
              // unlock
              setPath(_this6.queuedWrites, ['locks', lng, namespace], false);
              missings.forEach(function (missing) {
                if (missing.callback) missing.callback();
              }); // emit notification onSaved

              if (_this6.options.onSaved) _this6.options.onSaved(lng, namespace); // rerun

              _this6.debouncedProcess(lng, namespace);
            }
          };

          if (!todo) doneOne();

          if (hasMissing) {
            ajax(missingUrl, _objectSpread({}, {
              authorize: true
            }, {}, this.options), function (data, xhr) {
              //const statusCode = xhr.status.toString();
              // TODO: if statusCode === 4xx do log
              doneOne();
            }, payloadMissing);
          }

          if (hasUpdates) {
            ajax(updatesUrl, _objectSpread({}, {
              authorize: true
            }, {}, this.options), function (data, xhr) {
              //const statusCode = xhr.status.toString();
              // TODO: if statusCode === 4xx do log
              doneOne();
            }, payloadUpdate);
          }
        }
      }
    }, {
      key: "process",
      value: function process() {
        var _this7 = this;

        Object.keys(this.queuedWrites).forEach(function (lng) {
          if (lng === 'locks') return;
          Object.keys(_this7.queuedWrites[lng]).forEach(function (ns) {
            var todo = _this7.queuedWrites[lng][ns];

            if (todo.length) {
              _this7.write(lng, ns);
            }
          });
        });
      }
    }, {
      key: "queue",
      value: function queue(lng, namespace, key, fallbackValue, callback, options) {
        pushPath(this.queuedWrites, [lng, namespace], {
          key: key,
          fallbackValue: fallbackValue || '',
          callback: callback,
          options: options
        });
        this.debouncedProcess();
      }
    }]);

    return I18NextLocizeBackend;
  }();

  I18NextLocizeBackend.type = 'backend';

  return I18NextLocizeBackend;

})));
