(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet')) :
  typeof define === 'function' && define.amd ? define(['exports', 'leaflet'], factory) :
  (global = global || self, factory(global.GeoSearch = {}, global.L));
}(this, (function (exports, L) {
  L = L && Object.prototype.hasOwnProperty.call(L, 'default') ? L['default'] : L;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function createElement(element, className, parent, attributes) {
    if (className === void 0) {
      className = '';
    }

    if (attributes === void 0) {
      attributes = {};
    }

    var el = document.createElement(element);

    if (className) {
      el.className = className;
    }

    Object.keys(attributes).forEach(function (key) {
      if (typeof attributes[key] === 'function') {
        var type = key.indexOf('on') === 0 ? key.substr(2).toLowerCase() : key;
        el.addEventListener(type, attributes[key]);
      } else if (key === 'html') {
        el.innerHTML = attributes[key];
      } else if (key === 'text') {
        el.innerText = attributes[key];
      } else {
        el.setAttribute(key, attributes[key]);
      }
    });

    if (parent) {
      parent.appendChild(el);
    }

    return el;
  }
  function stopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  function createScriptElement(url, cb) {
    var script = createElement('script', null, document.body);
    script.setAttribute('type', 'text/javascript');
    return new Promise(function (resolve) {
      window[cb] = function (json) {
        script.remove();
        delete window[cb];
        resolve(json);
      };

      script.setAttribute('src', url);
    });
  }
  var cx = function cx() {
    for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
      classNames[_key] = arguments[_key];
    }

    return classNames.filter(Boolean).join(' ').trim();
  };
  function addClassName(element, className) {
    if (!element || !element.classList) {
      return;
    }

    var classNames = Array.isArray(className) ? className : [className];
    classNames.forEach(function (name) {
      if (!element.classList.contains(name)) {
        element.classList.add(name);
      }
    });
  }
  function removeClassName(element, className) {
    if (!element || !element.classList) {
      return;
    }

    var classNames = Array.isArray(className) ? className : [className];
    classNames.forEach(function (name) {
      if (element.classList.contains(name)) {
        element.classList.remove(name);
      }
    });
  }
  function replaceClassName(element, find, replace) {
    removeClassName(element, find);
    addClassName(element, replace);
  }

  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;
  var ARROW_DOWN_KEY = 40;
  var ARROW_UP_KEY = 38;
  var ARROW_LEFT_KEY = 37;
  var ARROW_RIGHT_KEY = 39;
  var SPECIAL_KEYS = [ENTER_KEY, ESCAPE_KEY, ARROW_DOWN_KEY, ARROW_UP_KEY, ARROW_LEFT_KEY, ARROW_RIGHT_KEY];

  var SearchElement = /*#__PURE__*/function () {
    function SearchElement(_ref) {
      var _this = this;

      var handleSubmit = _ref.handleSubmit,
          searchLabel = _ref.searchLabel,
          _ref$classNames = _ref.classNames,
          classNames = _ref$classNames === void 0 ? {} : _ref$classNames;
      this.hasError = false;
      this.container = createElement('div', cx('geosearch', classNames.container));
      this.form = createElement('form', ['', classNames.form].join(' '), this.container, {
        autocomplete: 'none',
        onClick: stopPropagation,
        onDblClick: stopPropagation,
        touchStart: stopPropagation,
        touchEnd: stopPropagation
      });
      this.input = createElement('input', ['glass', classNames.input].join(' '), this.form, {
        type: 'text',
        placeholder: searchLabel || 'search',
        onInput: this.onInput,
        onKeyUp: function onKeyUp(e) {
          return _this.onKeyUp(e);
        },
        onKeyPress: function onKeyPress(e) {
          return _this.onKeyPress(e);
        },
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onClick: function onClick() {
          _this.input.focus();

          _this.input.dispatchEvent(new Event('focus'));
        }
      });
      this.handleSubmit = handleSubmit;
    }

    var _proto = SearchElement.prototype;

    _proto.onFocus = function onFocus() {
      addClassName(this.form, 'active');
    };

    _proto.onBlur = function onBlur() {
      removeClassName(this.form, 'active');
    };

    _proto.onSubmit = function onSubmit(event) {
      try {
        var _this3 = this;

        stopPropagation(event);
        replaceClassName(_this3.container, 'error', 'pending');
        return Promise.resolve(_this3.handleSubmit({
          query: _this3.input.value
        })).then(function () {
          removeClassName(_this3.container, 'pending');
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _proto.onInput = function onInput() {
      if (!this.hasError) {
        return;
      }

      removeClassName(this.container, 'error');
      this.hasError = false;
    };

    _proto.onKeyUp = function onKeyUp(event) {
      if (event.keyCode !== ESCAPE_KEY) {
        return;
      }

      removeClassName(this.container, ['pending', 'active']);
      this.input.value = '';
      document.body.focus();
      document.body.blur();
    };

    _proto.onKeyPress = function onKeyPress(event) {
      if (event.keyCode !== ENTER_KEY) {
        return;
      }

      this.onSubmit(event);
    };

    _proto.setQuery = function setQuery(query) {
      this.input.value = query;
    };

    return SearchElement;
  }();

  var ResultList = /*#__PURE__*/function () {
    function ResultList(_ref) {
      var _this = this;

      var handleClick = _ref.handleClick,
          _ref$classNames = _ref.classNames,
          classNames = _ref$classNames === void 0 ? {} : _ref$classNames;
      this.selected = -1;
      this.results = [];

      this.onClick = function (event) {
        if (typeof _this.handleClick !== 'function') {
          return;
        }

        var target = event.target;

        if (!target || !_this.container.contains(target) || !target.hasAttribute('data-key')) {
          return;
        }

        var idx = Number(target.getAttribute('data-key'));

        _this.clear();

        _this.handleClick({
          result: _this.results[idx]
        });
      };

      this.handleClick = handleClick;
      this.container = createElement('div', cx('results', classNames.container));
      this.container.addEventListener('click', this.onClick, true);
      this.resultItem = createElement('div', cx(classNames.item));
    }

    var _proto = ResultList.prototype;

    _proto.render = function render(results, resultFormat) {
      var _this2 = this;

      if (results === void 0) {
        results = [];
      }

      this.clear();
      results.forEach(function (result, idx) {
        var child = _this2.resultItem.cloneNode(true);

        child.setAttribute('data-key', "" + idx);
        child.innerHTML = resultFormat({
          result: result
        });

        _this2.container.appendChild(child);
      });

      if (results.length > 0) {
        addClassName(this.container.parentElement, 'open');
        addClassName(this.container, 'active');
      }

      this.results = results;
    };

    _proto.select = function select(index) {
      Array.from(this.container.children).forEach(function (child, idx) {
        return idx === index ? addClassName(child, 'active') : removeClassName(child, 'active');
      });
      this.selected = index;
      return this.results[index];
    };

    _proto.count = function count() {
      return this.results ? this.results.length : 0;
    };

    _proto.clear = function clear() {
      this.selected = -1;

      while (this.container.lastChild) {
        this.container.removeChild(this.container.lastChild);
      }

      removeClassName(this.container.parentElement, 'open');
      removeClassName(this.container, 'active');
    };

    return ResultList;
  }();

  function debounce(cb, wait, immediate) {
    if (wait === void 0) {
      wait = 250;
    }

    if (immediate === void 0) {
      immediate = false;
    }

    var timeout;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(function () {
        timeout = null;

        if (!immediate) {
          cb.apply(void 0, args);
        }
      }, wait);

      if (immediate && !timeout) {
        cb.apply(void 0, args);
      }
    };
  }

  var defaultOptions = {
    position: 'topleft',
    style: 'button',
    showMarker: true,
    showPopup: false,
    popupFormat: function popupFormat(_ref) {
      var result = _ref.result;
      return "" + result.label;
    },
    resultFormat: function resultFormat(_ref2) {
      var result = _ref2.result;
      return "" + result.label;
    },
    marker: {
      icon: L && L.Icon ? new L.Icon.Default() : undefined,
      draggable: false
    },
    maxMarkers: 1,
    maxSuggestions: 5,
    retainZoomLevel: false,
    animateZoom: true,
    searchLabel: 'Enter address',
    notFoundMessage: 'Sorry, that address could not be found.',
    messageHideDelay: 3000,
    zoomLevel: 18,
    classNames: {
      container: 'leaflet-bar leaflet-control leaflet-control-geosearch',
      button: 'leaflet-bar-part leaflet-bar-part-single',
      resetButton: 'reset',
      msgbox: 'leaflet-bar message',
      form: '',
      input: ''
    },
    autoComplete: true,
    autoCompleteDelay: 250,
    autoClose: false,
    keepResult: false,
    updateMap: true
  };
  var UNINITIALIZED_ERR = 'Leaflet must be loaded before instantiating the GeoSearch control';
  var Control = {
    options: _extends({}, defaultOptions),
    classNames: _extends({}, defaultOptions.classNames),
    initialize: function initialize(options) {
      var _this = this;

      if (!L) {
        throw new Error(UNINITIALIZED_ERR);
      }

      if (!options.provider) {
        throw new Error('Provider is missing from options');
      }

      this.options = _extends({}, this.options, {}, options);
      this.classNames = _extends({}, this.classNames, {}, options.classNames);
      this.markers = new L.FeatureGroup();
      this.classNames.container += " leaflet-geosearch-" + this.options.style;
      this.searchElement = new SearchElement({
        searchLabel: this.options.searchLabel,
        classNames: {
          container: this.classNames.container,
          form: this.classNames.form,
          input: this.classNames.input
        },
        handleSubmit: function handleSubmit(result) {
          return _this.onSubmit(result);
        }
      });
      this.button = createElement('a', this.classNames.button, this.searchElement.container, {
        title: this.options.searchLabel,
        href: '#',
        onClick: function onClick(e) {
          return _this.onClick(e);
        }
      });
      L.DomEvent.disableClickPropagation(this.button);
      this.resetButton = createElement('a', this.classNames.resetButton, this.searchElement.form, {
        text: '×',
        href: '#',
        onClick: function onClick() {
          return _this.clearResults(null, true);
        }
      });
      L.DomEvent.disableClickPropagation(this.resetButton);

      if (this.options.autoComplete) {
        this.resultList = new ResultList({
          handleClick: function handleClick(_ref3) {
            var result = _ref3.result;
            _this.searchElement.input.value = result.label;

            _this.onSubmit({
              query: result.label,
              data: result
            });
          }
        });
        this.searchElement.form.appendChild(this.resultList.container);
        this.searchElement.input.addEventListener('keyup', debounce(function (e) {
          return _this.autoSearch(e);
        }, this.options.autoCompleteDelay), true);
        this.searchElement.input.addEventListener('keydown', function (e) {
          return _this.selectResult(e);
        }, true);
        this.searchElement.input.addEventListener('keydown', function (e) {
          return _this.clearResults(e, true);
        }, true);
      }

      this.searchElement.form.addEventListener('click', function (e) {
        e.preventDefault();
      }, false);
    },
    onAdd: function onAdd(map) {
      var _this$options = this.options,
          showMarker = _this$options.showMarker,
          style = _this$options.style;
      this.map = map;

      if (showMarker) {
        this.markers.addTo(map);
      }

      if (style === 'bar') {
        var root = map.getContainer().querySelector('.leaflet-control-container');
        this.container = createElement('div', 'leaflet-control-geosearch leaflet-geosearch-bar');
        this.container.appendChild(this.searchElement.form);
        root.appendChild(this.container);
      }

      L.DomEvent.disableClickPropagation(this.searchElement.form);
      return this.searchElement.container;
    },
    onRemove: function onRemove() {
      var _this$container;

      (_this$container = this.container) == null ? void 0 : _this$container.remove();
      return this;
    },
    onClick: function onClick(event) {
      event.preventDefault();
      event.stopPropagation();
      var _this$searchElement = this.searchElement,
          container = _this$searchElement.container,
          input = _this$searchElement.input;

      if (container.classList.contains('active')) {
        removeClassName(container, 'active');
        this.clearResults();
      } else {
        addClassName(container, 'active');
        input.focus();
      }
    },
    selectResult: function selectResult(event) {
      if ([ENTER_KEY, ARROW_DOWN_KEY, ARROW_UP_KEY].indexOf(event.keyCode) === -1) {
        return;
      }

      event.preventDefault();

      if (event.keyCode === ENTER_KEY) {
        var _item = this.resultList.select(this.resultList.selected);

        this.onSubmit({
          query: this.searchElement.input.value,
          data: _item
        });
        return;
      }

      var max = this.resultList.count() - 1;

      if (max < 0) {
        return;
      }

      var selected = this.resultList.selected;
      var next = event.keyCode === ARROW_DOWN_KEY ? selected + 1 : selected - 1;
      var idx = next < 0 ? max : next > max ? 0 : next;
      var item = this.resultList.select(idx);
      this.searchElement.input.value = item.label;
    },
    clearResults: function clearResults(event, force) {
      if (force === void 0) {
        force = false;
      }

      if (event && event.keyCode !== ESCAPE_KEY) {
        return;
      }

      var _this$options2 = this.options,
          keepResult = _this$options2.keepResult,
          autoComplete = _this$options2.autoComplete;

      if (force || !keepResult) {
        this.searchElement.input.value = '';
        this.markers.clearLayers();
      }

      if (autoComplete) {
        this.resultList.clear();
      }
    },
    autoSearch: function autoSearch(event) {
      try {
        var _this3 = this;

        if (SPECIAL_KEYS.indexOf(event.keyCode) > -1) {
          return Promise.resolve();
        }

        var query = event.target.value;
        var provider = _this3.options.provider;

        var _temp2 = function () {
          if (query.length) {
            return Promise.resolve(provider.search({
              query: query
            })).then(function (results) {
              results = results.slice(0, _this3.options.maxSuggestions);

              _this3.resultList.render(results, _this3.options.resultFormat);
            });
          } else {
            _this3.resultList.clear();
          }
        }();

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    onSubmit: function onSubmit(query) {
      try {
        var _this5 = this;

        var provider = _this5.options.provider;
        return Promise.resolve(provider.search(query)).then(function (results) {
          if (results && results.length > 0) {
            _this5.showResult(results[0], query);
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    showResult: function showResult(result, query) {
      var _this$options3 = this.options,
          autoClose = _this$options3.autoClose,
          updateMap = _this$options3.updateMap;
      var markers = this.markers.getLayers();

      if (markers.length >= this.options.maxMarkers) {
        this.markers.removeLayer(markers[0]);
      }

      var marker = this.addMarker(result, query);

      if (updateMap) {
        this.centerMap(result);
      }

      this.map.fireEvent('geosearch/showlocation', {
        location: result,
        marker: marker
      });

      if (autoClose) {
        this.closeResults();
      }
    },
    closeResults: function closeResults() {
      var container = this.searchElement.container;

      if (container.classList.contains('active')) {
        removeClassName(container, 'active');
      }

      this.clearResults();
    },
    addMarker: function addMarker(result, query) {
      var _this6 = this;

      var _this$options4 = this.options,
          options = _this$options4.marker,
          showPopup = _this$options4.showPopup,
          popupFormat = _this$options4.popupFormat;
      var marker = new L.Marker([result.y, result.x], options);
      var popupLabel = result.label;

      if (typeof popupFormat === 'function') {
        popupLabel = popupFormat({
          query: query,
          result: result
        });
      }

      marker.bindPopup(popupLabel);
      this.markers.addLayer(marker);

      if (showPopup) {
        marker.openPopup();
      }

      if (options.draggable) {
        marker.on('dragend', function (args) {
          _this6.map.fireEvent('geosearch/marker/dragend', {
            location: marker.getLatLng(),
            event: args
          });
        });
      }

      return marker;
    },
    centerMap: function centerMap(result) {
      var _this$options5 = this.options,
          retainZoomLevel = _this$options5.retainZoomLevel,
          animateZoom = _this$options5.animateZoom;
      var resultBounds = result.bounds ? new L.LatLngBounds(result.bounds) : new L.LatLng(result.y, result.x).toBounds(10);
      var bounds = resultBounds.isValid() ? resultBounds : this.markers.getBounds();

      if (!retainZoomLevel && resultBounds.isValid()) {
        this.map.fitBounds(bounds, {
          animate: animateZoom
        });
      } else {
        this.map.setView(bounds.getCenter(), this.getZoom(), {
          animate: animateZoom
        });
      }
    },
    getZoom: function getZoom() {
      var _this$options6 = this.options,
          retainZoomLevel = _this$options6.retainZoomLevel,
          zoomLevel = _this$options6.zoomLevel;
      return retainZoomLevel ? this.map.getZoom() : zoomLevel;
    }
  };
  function SearchControl() {
    if (!L) {
      throw new Error(UNINITIALIZED_ERR);
    }

    var LControl = L.Control.extend(Control);

    for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
      options[_key] = arguments[_key];
    }

    return _construct(LControl, options);
  }

  var RequestType;

  (function (RequestType) {
    RequestType[RequestType["SEARCH"] = 0] = "SEARCH";
    RequestType[RequestType["REVERSE"] = 1] = "REVERSE";
  })(RequestType || (RequestType = {}));

  var AbstractProvider = /*#__PURE__*/function () {
    function AbstractProvider(options) {
      if (options === void 0) {
        options = {};
      }

      this.options = options;
    }

    var _proto = AbstractProvider.prototype;

    _proto.getParamString = function getParamString(params) {
      if (params === void 0) {
        params = {};
      }

      var set = _extends({}, this.options.params, {}, params);

      return Object.keys(set).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(set[key]);
      }).join('&');
    };

    _proto.getUrl = function getUrl(url, params) {
      return url + "?" + this.getParamString(params);
    };

    _proto.search = function search(options) {
      try {
        var _this2 = this;

        var url = _this2.endpoint({
          query: options.query,
          type: RequestType.SEARCH
        });

        return Promise.resolve(fetch(url)).then(function (request) {
          return Promise.resolve(request.json()).then(function (json) {
            return _this2.parse({
              data: json
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return AbstractProvider;
  }();

  var Provider = /*#__PURE__*/function (_AbstractProvider) {
    _inheritsLoose(Provider, _AbstractProvider);

    function Provider() {
      return _AbstractProvider.apply(this, arguments) || this;
    }

    var _proto = Provider.prototype;

    _proto.endpoint = function endpoint() {
      return 'https://places-dsn.algolia.net/1/places/query';
    };

    _proto.findBestMatchLevelIndex = function findBestMatchLevelIndex(vms) {
      var match = vms.find(function (vm) {
        return vm.matchLevel === 'full';
      }) || vms.find(function (vm) {
        return vm.matchLevel === 'partial';
      });
      return match ? vms.indexOf(match) : 0;
    };

    _proto.getLabel = function getLabel(result) {
      var _result$locale_names, _result$city, _result$postcode, _result$country;

      return [(_result$locale_names = result.locale_names) == null ? void 0 : _result$locale_names["default"][this.findBestMatchLevelIndex(result._highlightResult.locale_names["default"])], (_result$city = result.city) == null ? void 0 : _result$city["default"][this.findBestMatchLevelIndex(result._highlightResult.city["default"])], result.administrative[this.findBestMatchLevelIndex(result._highlightResult.administrative)], (_result$postcode = result.postcode) == null ? void 0 : _result$postcode[this.findBestMatchLevelIndex(result._highlightResult.postcode)], (_result$country = result.country) == null ? void 0 : _result$country["default"]].filter(Boolean).join(', ');
    };

    _proto.parse = function parse(response) {
      var _this = this;

      return response.data.hits.map(function (r) {
        return {
          x: r._geoloc.lng,
          y: r._geoloc.lat,
          label: _this.getLabel(r),
          bounds: null,
          raw: r
        };
      });
    };

    _proto.search = function search(_ref) {
      var query = _ref.query;

      try {
        var _this3 = this;

        var params = typeof query === 'string' ? {
          query: query
        } : query;
        return Promise.resolve(fetch(_this3.endpoint(), {
          method: 'POST',
          body: JSON.stringify(_extends({}, _this3.options.params, {}, params))
        })).then(function (request) {
          return Promise.resolve(request.json()).then(function (json) {
            return _this3.parse({
              data: json
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return Provider;
  }(AbstractProvider);

  var BingProvider = /*#__PURE__*/function (_AbstractProvider) {
    _inheritsLoose(BingProvider, _AbstractProvider);

    function BingProvider() {
      var _this;

      _this = _AbstractProvider.apply(this, arguments) || this;
      _this.searchUrl = 'https://dev.virtualearth.net/REST/v1/Locations';
      return _this;
    }

    var _proto = BingProvider.prototype;

    _proto.endpoint = function endpoint(_ref) {
      var query = _ref.query,
          jsonp = _ref.jsonp;
      var params = typeof query === 'string' ? {
        q: query
      } : query;
      params.jsonp = jsonp;
      return this.getUrl(this.searchUrl, params);
    };

    _proto.parse = function parse(response) {
      if (response.data.resourceSets.length === 0) {
        return [];
      }

      return response.data.resourceSets[0].resources.map(function (r) {
        return {
          x: r.point.coordinates[1],
          y: r.point.coordinates[0],
          label: r.address.formattedAddress,
          bounds: [[r.bbox[0], r.bbox[1]], [r.bbox[2], r.bbox[3]]],
          raw: r
        };
      });
    };

    _proto.search = function search(_ref2) {
      var query = _ref2.query;

      try {
        var _this3 = this;

        var jsonp = "BING_JSONP_CB_" + Date.now();
        return Promise.resolve(createScriptElement(_this3.endpoint({
          query: query,
          jsonp: jsonp
        }), jsonp)).then(function (json) {
          return _this3.parse({
            data: json
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return BingProvider;
  }(AbstractProvider);

  var EsriProvider = /*#__PURE__*/function (_AbstractProvider) {
    _inheritsLoose(EsriProvider, _AbstractProvider);

    function EsriProvider() {
      var _this;

      _this = _AbstractProvider.apply(this, arguments) || this;
      _this.searchUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find';
      return _this;
    }

    var _proto = EsriProvider.prototype;

    _proto.endpoint = function endpoint(_ref) {
      var query = _ref.query;
      var params = typeof query === 'string' ? {
        text: query
      } : query;
      params.f = 'json';
      return this.getUrl(this.searchUrl, params);
    };

    _proto.parse = function parse(result) {
      return result.data.locations.map(function (r) {
        return {
          x: r.feature.geometry.x,
          y: r.feature.geometry.y,
          label: r.name,
          bounds: [[r.extent.ymin, r.extent.xmin], [r.extent.ymax, r.extent.xmax]],
          raw: r
        };
      });
    };

    return EsriProvider;
  }(AbstractProvider);

  var GoogleProvider = /*#__PURE__*/function (_AbstractProvider) {
    _inheritsLoose(GoogleProvider, _AbstractProvider);

    function GoogleProvider() {
      var _this;

      _this = _AbstractProvider.apply(this, arguments) || this;
      _this.searchUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
      return _this;
    }

    var _proto = GoogleProvider.prototype;

    _proto.endpoint = function endpoint(_ref) {
      var query = _ref.query;
      var params = typeof query === 'string' ? {
        address: query
      } : query;
      return this.getUrl(this.searchUrl, params);
    };

    _proto.parse = function parse(result) {
      return result.data.results.map(function (r) {
        return {
          x: r.geometry.location.lng,
          y: r.geometry.location.lat,
          label: r.formatted_address,
          bounds: [[r.geometry.viewport.southwest.lat, r.geometry.viewport.southwest.lng], [r.geometry.viewport.northeast.lat, r.geometry.viewport.northeast.lng]],
          raw: r
        };
      });
    };

    return GoogleProvider;
  }(AbstractProvider);

  var HereProvider = /*#__PURE__*/function (_AbstractProvider) {
    _inheritsLoose(HereProvider, _AbstractProvider);

    function HereProvider() {
      var _this;

      _this = _AbstractProvider.apply(this, arguments) || this;
      _this.searchUrl = 'https://geocode.search.hereapi.com/v1/geocode';
      return _this;
    }

    var _proto = HereProvider.prototype;

    _proto.endpoint = function endpoint(_ref) {
      var query = _ref.query;
      var params = typeof query === 'string' ? {
        q: query
      } : query;
      return this.getUrl(this.searchUrl, params);
    };

    _proto.parse = function parse(response) {
      return response.data.items.map(function (r) {
        return {
          x: r.position.lng,
          y: r.position.lat,
          label: r.address.label,
          bounds: null,
          raw: r
        };
      });
    };

    return HereProvider;
  }(AbstractProvider);

  var OpenStreetMapProvider = /*#__PURE__*/function (_AbstractProvider) {
    _inheritsLoose(OpenStreetMapProvider, _AbstractProvider);

    function OpenStreetMapProvider(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _AbstractProvider.call(this, options) || this;
      var host = 'https://nominatim.openstreetmap.org';
      _this.searchUrl = options.searchUrl || host + "/search";
      _this.reverseUrl = options.reverseUrl || host + "/reverse";
      return _this;
    }

    var _proto = OpenStreetMapProvider.prototype;

    _proto.endpoint = function endpoint(_ref) {
      var query = _ref.query,
          type = _ref.type;
      var params = typeof query === 'string' ? {
        q: query
      } : query;
      params.format = 'json';

      switch (type) {
        case RequestType.REVERSE:
          return this.getUrl(this.reverseUrl, params);

        default:
          return this.getUrl(this.searchUrl, params);
      }
    };

    _proto.parse = function parse(response) {
      var records = Array.isArray(response.data) ? response.data : [response.data];
      return records.map(function (r) {
        return {
          x: Number(r.lon),
          y: Number(r.lat),
          label: r.display_name,
          bounds: [[parseFloat(r.boundingbox[0]), parseFloat(r.boundingbox[2])], [parseFloat(r.boundingbox[1]), parseFloat(r.boundingbox[3])]],
          raw: r
        };
      });
    };

    return OpenStreetMapProvider;
  }(AbstractProvider);

  var LocationIQProvider = /*#__PURE__*/function (_OpenStreetMapProvide) {
    _inheritsLoose(LocationIQProvider, _OpenStreetMapProvide);

    function LocationIQProvider(options) {
      return _OpenStreetMapProvide.call(this, _extends({}, options, {
        searchUrl: "https://locationiq.org/v1/search.php",
        reverseUrl: "https://locationiq.org/v1/reverse.php"
      })) || this;
    }

    return LocationIQProvider;
  }(OpenStreetMapProvider);

  var OpenCageProvider = /*#__PURE__*/function (_AbstractProvider) {
    _inheritsLoose(OpenCageProvider, _AbstractProvider);

    function OpenCageProvider() {
      var _this;

      _this = _AbstractProvider.apply(this, arguments) || this;
      _this.searchUrl = 'https://api.opencagedata.com/geocode/v1/json';
      return _this;
    }

    var _proto = OpenCageProvider.prototype;

    _proto.endpoint = function endpoint(_ref) {
      var query = _ref.query;
      var params = typeof query === 'string' ? {
        q: query
      } : query;
      params.format = 'json';
      return this.getUrl(this.searchUrl, params);
    };

    _proto.parse = function parse(response) {
      return response.data.results.map(function (r) {
        return {
          x: r.geometry.lng,
          y: r.geometry.lat,
          label: r.formatted,
          bounds: [[r.bounds.southwest.lat, r.bounds.southwest.lng], [r.bounds.northeast.lat, r.bounds.northeast.lng]],
          raw: r
        };
      });
    };

    _proto.search = function search(options) {
      try {
        var _this3 = this;

        if (options.query.length < 2) {
          return Promise.resolve([]);
        }

        return Promise.resolve(_AbstractProvider.prototype.search.call(_this3, options));
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return OpenCageProvider;
  }(AbstractProvider);

  exports.AlgoliaProvider = Provider;
  exports.BingProvider = BingProvider;
  exports.EsriProvider = EsriProvider;
  exports.GeoSearchControl = SearchControl;
  exports.GoogleProvider = GoogleProvider;
  exports.HereProvider = HereProvider;
  exports.JsonProvider = AbstractProvider;
  exports.LocationIQProvider = LocationIQProvider;
  exports.OpenCageProvider = OpenCageProvider;
  exports.OpenStreetMapProvider = OpenStreetMapProvider;
  exports.SearchControl = SearchControl;
  exports.SearchElement = SearchElement;

})));
//# sourceMappingURL=geosearch.umd.js.map
